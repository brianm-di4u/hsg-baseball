// The play resolver. Given a batted-ball flight, the defense and the runners, it decides who fields the
// ball, whether it is caught, where it is thrown and how far every runner gets. It returns an outcome
// for the rules engine and a timeline the renderer plays back. Deterministic for a given RNG state.
import { rnd, norm, phi } from './util.js';
import { BASES, INFIELD, angleOf, fenceDist } from './park.js';

const NUM = { P: 1, C: 2, '1B': 3, '2B': 4, '3B': 5, SS: 6, LF: 7, CF: 8, RF: 9 };
const hyp = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
export const runSpeed = (p) => 24 + 6 * p.speed;
const fieldSpeed = (p, pos) => (pos === 'C' ? 17 : pos === 'P' ? 19 : INFIELD.has(pos) ? 20 : 19) + 6 * p.speed;
const throwSpeed = (p, pos) => (INFIELD.has(pos) ? 98 : 90) + 24 * p.arm;
const BASE_POS = (k) => BASES[k % 4];

export function direction(th) {
  if (th < -30) return 'left'; if (th < -12) return 'left-center'; if (th <= 12) return 'center'; if (th <= 30) return 'right-center'; return 'right';
}

// Earliest standing and diving intercepts of the ball for one fielder.
function intercept(f, S, fromIdx, ground, park, delay = 0) {
  const inf = INFIELD.has(f.pos);
  // reaction + first-step acceleration; the pitcher is still finishing his follow-through
  const react = delay + (f.pos === 'P' ? 0.62 : ground ? (inf ? 0.64 : 0.7) : (inf ? 0.62 : 1.1));
  const spd = fieldSpeed(f.p, f.pos), reach = f.pos === 'P' ? 3 : ground && inf ? 3.2 : 4.5, dive = inf ? 2.6 : 5;
  let stand = null, diving = null;
  for (let i = fromIdx; i < S.length; i++) {
    const [t, x, y, z] = S[i];
    if (t < react) continue;
    const r = Math.hypot(x, y);
    const top = !inf && r > fenceDist(park, angleOf(x, y)) - 10 ? 9.5 : inf ? 7.5 : 6.8; // leap at the wall
    if (z > top) continue;
    if (inf && ground && f.pos !== 'C' && r > Math.hypot(f.x, f.y) + 4) break; // the grounder got past him
    const d = Math.hypot(x - f.x, y - f.y), run = spd * (t - react);
    if (d - reach <= run) { stand = { i, t, x, y, z, d, react, spd, margin: run + reach - d }; break; }
    if (!diving && d - reach - dive <= run) diving = { i, t, x, y, z, d, react, spd };
  }
  return { stand, diving };
}

// ctx: {park, f (flight), fielders[{pos,p,x,y}], bases[3] runner players or null, batter, outs,
//       aggr (offense margin s), steal {base} or null, bunt, isUser}
export function resolve(o, ctx) {
  const { park, f, fielders, outs } = ctx;
  const S = f.s;
  const aggr = ctx.aggr ?? 0.3;
  const TL = { ball: [], holds: [], fielders: {}, runners: {}, throws: [], calls: [], dur: 0 };
  const fpath = (pos, t, xy) => { (TL.fielders[pos] = TL.fielders[pos] || [{ t: 0, x: fielders.find((q) => q.pos === pos).x, y: fielders.find((q) => q.pos === pos).y }]).push({ t, x: xy[0], y: xy[1] }); };
  const rpath = (id, t, b, extra) => { (TL.runners[id] = TL.runners[id] || []).push({ t, b, ...extra }); };
  const call = (t, text, kind = 'info') => TL.calls.push({ t, text, kind });
  const ev = { outs: [], runs: [], error: null, hit: 0, desc: '', kind: '', rbi: 0, fielder: null, caught: false, dp: false, sf: false, infieldFly: false, sac: false, foulOut: false };

  // ---------- runners at contact
  const R = [];
  if (ctx.batter) R.push({ id: ctx.batter.id, p: ctx.batter, b0: 0, batter: true });
  ctx.bases.forEach((p, i) => { if (p) R.push({ id: p.id, p, b0: i + 1 }); });
  const occ = (k) => R.some((r) => r.b0 === k);
  for (const r of R) { // forced: every base behind is occupied
    r.forced = r.batter || (r.b0 === 1) || (r.b0 === 2 && occ(1)) || (r.b0 === 3 && occ(1) && occ(2));
    r.v = runSpeed(r.p);
    r.t0 = r.batter ? (ctx.bunt ? 0.35 : 0.5) : (outs === 2 ? 0 : 0.12);
    r.head = r.batter ? 0 : 0.12; // primary lead off the bag
    if (ctx.steal && ctx.steal.base === r.b0) { r.head = 0.3; r.t0 = 0; } // hit-and-run: a third of the way at contact
    rpath(r.id, 0, r.b0 + r.head);
  }
  const arrive = (r, k, from = r.b0 + r.head, t0 = r.t0) => t0 + (k - from) * 90 / r.v + 0.25 * Math.max(0, Math.ceil(k - from - 1e-6) - 1);
  const thrower = (pos) => fielders.find((q) => q.pos === pos);

  // ---------- home run (the trot is sped up for play)
  if (f.hr) {
    const tl = S[S.length - 1][0];
    TL.ball = S;
    for (const r of R) { const ta = r.t0 + 0.4 + (4 - r.b0) * 90 / (r.v * 1.15); rpath(r.id, ta, 4, { score: true }); ev.runs.push({ id: r.id, t: ta }); }
    call(Math.min(tl, 2.2), `HOME RUN · ${f.hrDist} FT`, 'hr');
    Object.assign(ev, { kind: 'hr', hit: 4, desc: `Home run to ${direction(f.spray)}, ${f.hrDist} ft`, rbi: R.length });
    TL.dur = Math.max(tl + 0.5, ...ev.runs.map((x) => x.t)) + 0.4;
    return finish(ev, TL, R, ctx);
  }

  // ---------- who fields it
  const landI = f.landed ? f.landed.i : S.length;
  const cand = fielders.map((fl) => ({ fl, ...intercept(fl, S, 0, f.la < 10, park) }));
  const airStand = cand.filter((c) => c.stand && c.stand.i < landI).sort((a, b) => a.stand.t - b.stand.t || a.stand.d - b.stand.d);
  const airDive = cand.filter((c) => c.diving && c.diving.i < landI && !(c.stand && c.stand.i < landI)).sort((a, b) => a.diving.t - b.diving.t);
  let fielded = null, caught = false, delay = 0, errorPos = null, diveMiss = null;
  // infielders give way to an outfielder coming in on shallow flies (the outfielder has the easier catch)
  let pick = airStand[0];
  if (pick && INFIELD.has(pick.fl.pos)) { const of = airStand.find((c) => !INFIELD.has(c.fl.pos)); if (of && of.stand.t - pick.stand.t < 0.5) pick = of; }
  if (pick && pick.fl.pos === 'P' && airStand.length > 1) pick = airStand.find((c) => c.fl.pos !== 'P'); // pitcher yields pop-ups
  if (pick) {
    const onRun = pick.stand.margin < 5 && pick.stand.t > 1.2; // a catch on the run at the end of his range
    const ok = rnd(o) < (onRun ? 0.66 + 0.24 * pick.fl.p.glove : 0.968 + 0.022 * pick.fl.p.glove);
    if (ok) { fielded = { c: pick, at: pick.stand }; caught = true; }
    else { if (!onRun) errorPos = pick.fl.pos; diveMiss = pick.fl.pos; }
  } else if (airDive.length && !f.foul) {
    const d = airDive[0];
    if (rnd(o) < 0.32 + 0.38 * d.fl.p.glove) { fielded = { c: d, at: d.diving, dive: true }; caught = true; }
    else diveMiss = d.fl.pos;
  }
  if (!caught && !fielded) {
    if (f.foul && !fielded) { // foul ball, not caught
      const dI = Math.min(S.length - 1, f.decide + 12);
      TL.ball = S.slice(0, dI + 1);
      for (const c of cand) if (c.stand || c.diving) { const a = c.stand || c.diving; fpath(c.fl.pos, Math.min(a.t, S[dI][0]), [c.fl.x + (a.x - c.fl.x) * 0.5, c.fl.y + (a.y - c.fl.y) * 0.5]); }
      for (const r of R) rpath(r.id, 0.8, r.b0);
      call(0.6, 'FOUL', 'foul');
      Object.assign(ev, { kind: 'foul', desc: 'Foul ball' });
      TL.dur = S[dI][0] + 0.4;
      return { ...ev, timeline: TL, bases: ctx.bases.map((p) => (p ? p.id : null)) };
    }
    // grounder / ball that fell in: first to reach it on the ground
    const g = fielders.map((fl) => ({ fl, ...intercept(fl, S, Math.min(landI, S.length - 1), true, park, fl.pos === diveMiss ? 1.0 : 0) }))
      .filter((c) => c.stand || c.diving);
    g.sort((a, b) => (a.stand ? a.stand.t : 99) - (b.stand ? b.stand.t : 99));
    let best = g.find((c) => c.stand);
    const gd = g.filter((c) => c.diving && INFIELD.has(c.fl.pos) && (!best || c.diving.t < best.stand.t - 0.15)).sort((a, b) => a.diving.t - b.diving.t)[0];
    if (gd && Math.hypot(gd.diving.x, gd.diving.y) < 170 && rnd(o) < 0.42 + 0.3 * gd.fl.p.glove) { fielded = { c: gd, at: gd.diving, dive: true }; delay = 0.55; }
    else if (best) fielded = { c: best, at: best.stand };
    else { // nobody can reach it (ball stops): nearest fielder walks to the resting spot
      const l = S[S.length - 1];
      const nn = fielders.map((fl) => ({ fl, d: Math.hypot(l[1] - fl.x, l[2] - fl.y) })).sort((a, b) => a.d - b.d)[0];
      const spd = fieldSpeed(nn.fl.p, nn.fl.pos);
      fielded = { c: { fl: nn.fl }, at: { i: S.length - 1, t: Math.max(l[0], 0.3 + nn.d / spd), x: l[1], y: l[2], z: 0, d: nn.d, react: 0.3, spd } };
    }
    if (fielded && !fielded.dive && INFIELD.has(fielded.c.fl.pos) && Math.hypot(fielded.at.x, fielded.at.y) < 170 && !errorPos) {
      if (rnd(o) >= 0.912 + 0.05 * fielded.c.fl.p.glove) { errorPos = fielded.c.fl.pos; delay = 0.8 + rnd(o) * 0.6; }
    }
  }
  const F = fielded.c.fl, A = fielded.at;
  const P = [A.x, A.y];
  if (!caught && !INFIELD.has(fielded.c.fl.pos)) delay += 0.5; // gather a ball on the ground in the outfield
  const tF = A.t + delay;
  ev.fielder = F.pos;
  // the ball up to the fielder
  TL.ball = S.slice(0, A.i + 1);
  const reachT = Math.min(A.t, A.react + Math.max(0, A.d - 4.5) / A.spd);
  fpath(F.pos, A.react, [F.x, F.y]); fpath(F.pos, Math.max(A.react + 0.01, reachT), P);
  if (delay) fpath(F.pos, tF, P);
  TL.holds.push({ t0: A.t, t1: 99, pos: F.pos });
  const fieldedFoul = !caught && A.i < f.decide && Math.abs(angleOf(A.x, A.y)) > 45 && Math.hypot(A.x, A.y) < 95;
  if (!caught && (f.foul || fieldedFoul)) {
    for (const r of R) rpath(r.id, 0.8, r.b0);
    call(Math.min(tF, 1.2), 'FOUL', 'foul');
    Object.assign(ev, { kind: 'foul', desc: 'Foul ball' });
    TL.dur = tF + 0.4;
    return { ...ev, timeline: TL, bases: ctx.bases.map((p) => (p ? p.id : null)) };
  }

  // covering fielders
  const leftSide = P[0] < 0;
  const cover = { 1: F.pos === '1B' ? (F.pos === 'P' ? '2B' : 'P') : '1B', 2: leftSide ? (F.pos === '2B' ? 'SS' : '2B') : (F.pos === 'SS' ? '2B' : 'SS'), 3: F.pos === '3B' ? (ctx.bunt ? 'SS' : 'P') : '3B', 0: F.pos === 'C' ? 'P' : 'C' };
  const coverT = {};
  for (const k of [1, 2, 3, 0]) {
    const pos = cover[k]; if (pos === F.pos || !pos) continue;
    const fl = thrower(pos); const d = hyp([fl.x, fl.y], BASE_POS(k));
    const t = 0.25 + d / fieldSpeed(fl.p, pos);
    coverT[k] = t; fpath(pos, t, BASE_POS(k));
  }
  for (const pos of ['LF', 'CF', 'RF']) if (pos !== F.pos && !Object.values(cover).includes(pos)) {
    const fl = thrower(pos); fpath(pos, tF, [fl.x + (P[0] - fl.x) * 0.4, fl.y + (P[1] - fl.y) * 0.4]);
  }

  // throw timing from P to base k
  const tSpd = throwSpeed(F.p, F.pos);
  const inf = INFIELD.has(F.pos) && Math.hypot(P[0], P[1]) < 170;
  const throwArrive = (k, from = P, t0 = tF, spd = tSpd, transfer = inf ? 0.65 : 0.75) => {
    const d = hyp(from, BASE_POS(k));
    if (inf && d < 9) return t0 + d / 20; // step on the bag
    const relay = d > 230 ? 0.55 : 0;
    return Math.max(t0 + transfer + relay + d / spd, coverT[k] || 0);
  };
  const doThrow = (k, t0, from, t1) => { TL.throws.push({ t0, t1, from: [...from], to: BASE_POS(k) }); };
  const outAt = (r, k, t, force, how) => { ev.outs.push({ id: r.id, base: k, t, force, how }); r.out = true; r.final = null; rpath(r.id, t, Math.min(k, 3.999), { out: true }); call(t, 'OUT', 'out'); };
  const safeAt = (r, k, t) => { r.final = k; rpath(r.id, t, k, k === 4 ? { score: true } : undefined); if (k === 4) ev.runs.push({ id: r.id, t }); };

  // ---------- caught in the air
  if (caught) {
    const t = A.t;
    const foul = Math.abs(angleOf(A.x, A.y)) > 45;
    ev.caught = true; ev.foulOut = foul;
    const outsNow = outs + 1;
    const batter = R.find((r) => r.batter);
    outAt(batter, 0, t, false, 'catch'); rpath(batter.id, 0.55, 0); rpath(batter.id, t, 0.6, { out: true });
    TL.runners[batter.id] = [{ t: 0, b: 0 }, { t: 0.55, b: 0 }, { t, b: Math.min(0.7, (t - 0.55) * batter.v / 90) }, { t: t + 0.01, b: Math.min(0.7, (t - 0.55) * batter.v / 90), out: true }];
    const la = f.la, deep = Math.hypot(A.x, A.y);
    const kindTxt = foul ? 'Foul out' : la < 18 ? 'Line out' : (deep < 170 ? 'Pop out' : 'Fly out');
    ev.desc = `${kindTxt} to ${F.pos}${fielded.dive ? ' (diving)' : ''}`;
    ev.kind = 'out';
    let thrown = false;
    const runners = R.filter((r) => !r.batter).sort((a, b) => b.b0 - a.b0);
    for (const r of runners) {
      if (outsNow >= 3) { safeAt(r, r.b0, t); continue; }
      // line drive caught by an infielder: chance to double off a runner who leaned
      if (la < 18 && INFIELD.has(F.pos) && !thrown && rnd(o) < 0.22) {
        const ta = throwArrive(r.b0, P, t, tSpd, 0.3);
        doThrow(r.b0, t + 0.3, P, ta); thrown = true; ev.dp = true;
        rpath(r.id, t, r.b0 + 0.12); outAt(r, r.b0, ta, false, 'doubled off'); continue;
      }
      const tagGo = (k) => {
        if (k > 4) return false;
        if (R.some((q) => q !== r && !q.out && (q.final ?? q.b0) === k && k !== 4)) return false;
        const est = t + 0.15 + 90 / r.v + norm(o) * 0.25;
        return deep > 160 && est + aggr < throwArrive(k, P, t);
      };
      if ((r.b0 === 3 || (r.b0 === 2 && deep > 270 && A.x > -60)) && !thrown && tagGo(r.b0 + 1)) {
        const k = r.b0 + 1, ta = t + 0.15 + 90 / r.v, tt = throwArrive(k, P, t);
        rpath(r.id, t, r.b0);
        doThrow(k, t + 0.5, P, tt); thrown = true;
        if (tt + (k === 4 ? 0.12 : 0.08) < ta + norm(o) * 0.08) outAt(r, k, tt, false, 'tag');
        else { safeAt(r, k, ta); if (k === 4) { ev.sf = true; ev.rbi++; } }
      } else { rpath(r.id, t * 0.5, r.b0 + (outs < 2 ? 0.15 : 0)); safeAt(r, r.b0, t + 0.6); }
    }
    if (ev.sf) ev.desc = `Sacrifice fly to ${F.pos}`;
    if (ev.dp) ev.desc = `Line drive double play, ${F.pos}`;
    TL.dur = Math.max(t + 0.9, ...TL.throws.map((x) => x.t1 + 0.4), ...Object.values(TL.runners).map((p) => p[p.length - 1].t + 0.3));
    return finish(ev, TL, R, ctx);
  }

  // ---------- ground ball in the infield
  const batter = R.find((r) => r.batter);
  if (inf) {
    const runners = R.slice().sort((a, b) => b.b0 - a.b0);
    // non-forced runners decide on contact
    for (const r of runners) {
      if (r.forced) { r.target = r.b0 + 1; continue; }
      if (outs === 2) { r.target = r.b0 + 1; continue; }
      if (r.b0 === 2) r.target = P[0] > -10 ? 3 : 2;
      else if (r.b0 === 3) r.target = (P[0] > 15 || Math.hypot(P[0], P[1]) > 135) && rnd(o) < 0.7 ? 4 : 3;
      if (R.some((q) => q !== r && q.b0 === r.target && q.target === q.b0)) r.target = r.b0;
    }
    const opts = runners.filter((r) => r.target > r.b0).map((r) => {
      const ta = throwArrive(r.target), tr = arrive(r, r.target);
      const force = r.forced;
      const m = tr - (ta + (force ? 0 : 0.12));
      return { r, k: r.target, ta, tr, force, p: phi(m / 0.1) };
    });
    let choice = null;
    const lead = opts.filter((x) => x.k > 1).sort((a, b) => b.k - a.k)[0];
    const first = opts.find((x) => x.k === 1);
    if (outs === 2) choice = opts.slice().sort((a, b) => (b.p + (b.force ? 0.15 : 0)) - (a.p + (a.force ? 0.15 : 0)))[0]; // two outs: the surest out
    else if (lead && lead.p >= (lead.force ? 0.7 : 0.85)) choice = lead;
    else if (first && first.p >= 0.03) choice = first;
    else choice = opts.slice().sort((a, b) => b.p - a.p)[0];
    if (choice && choice.p < 0.03 && choice.k === 1) choice = null; // no play: infield hit
    const occupied = new Set();
    let outsNow = outs;
    if (choice && errorPos) { // bobbled: everyone safe, error only if the out was there without the bobble
      const clean = phi((choice.tr - (choice.ta - delay)) / 0.1);
      if (clean < 0.5) errorPos = null;
      choice = null;
    }
    if (choice) {
      const tThrowStart = choice.ta - hyp(P, BASE_POS(choice.k)) / tSpd;
      if (hyp(P, BASE_POS(choice.k)) >= 9) doThrow(choice.k, Math.max(tF, tThrowStart), P, choice.ta);
      const isOut = choice.ta + (choice.force ? 0 : 0.12) < choice.tr + norm(o) * 0.07;
      if (rnd(o) < 0.025 && hyp(P, BASE_POS(choice.k)) >= 9) { // throwing error
        errorPos = F.pos; call(choice.ta, 'WILD THROW', 'safe');
        for (const r of runners) { const k = Math.min(4, r.target + 1); safeAt(r, k, arrive(r, k)); }
        ev.kind = 'error'; ev.desc = `Throwing error, E${NUM[F.pos]}`;
      } else {
        if (isOut) { outAt(choice.r, choice.k, choice.ta, choice.force, choice.force ? 'force' : 'tag'); outsNow++; }
        else { call(choice.tr, 'SAFE', 'safe'); }
        // double play relay
        let dp = false;
        if (isOut && choice.k >= 2 && choice.force && outsNow < 3) {
          const b1 = opts.find((x) => x.k === 1);
          if (b1) {
            const pivot = thrower(cover[choice.k % 4] || F.pos);
            const t1 = throwArrive(1, BASE_POS(choice.k), choice.ta, throwSpeed(pivot.p, pivot.pos), 0.38);
            if (t1 < b1.tr + norm(o) * 0.07) { doThrow(1, choice.ta + 0.38, BASE_POS(choice.k), t1); outAt(b1.r, 1, t1, true, 'force'); outsNow++; dp = true; ev.dp = true; }
          }
        }
        for (const r of runners) {
          if (r.out) continue;
          const k = r.target;
          if (outsNow >= 3) { r.final = r.b0 && k > r.b0 ? k : r.b0; rpath(r.id, arrive(r, Math.max(r.b0, k)), Math.max(r.b0, k)); continue; }
          safeAt(r, k, arrive(r, k));
        }
        const path = (x) => TL.throws.map(() => '').length;
        void path;
        const seq = [NUM[F.pos]];
        if (choice && isOut && hyp(P, BASE_POS(choice.k)) >= 9) seq.push(NUM[cover[choice.k % 4] || F.pos]);
        if (dp) seq.push(NUM[cover[1] || '1B']);
        const seqTxt = choice.k === 1 && isOut && hyp(P, BASE_POS(1)) < 9 ? `${NUM[F.pos]}U` : seq.join('-');
        if (dp) ev.desc = `Double play, ${seqTxt}`;
        else if (isOut && choice.r.batter) ev.desc = ctx.bunt && R.length > 1 && outs < 2 ? `Sacrifice bunt, ${seqTxt}` : `Ground out, ${seqTxt}`;
        else if (isOut) ev.desc = `Fielder's choice, ${seqTxt}`;
        else ev.desc = `Infield single to ${F.pos}`;
        if (ctx.bunt && isOut && choice.r.batter && R.length > 1 && outs < 2) ev.sac = true;
        ev.kind = isOut || dp ? 'out' : 'hit';
        if (!isOut && choice.r.batter) ev.hit = 1;
        if (!isOut && !choice.r.batter) { ev.kind = 'fc'; ev.desc = `Fielder's choice, all safe`; }
      }
    } else {
      for (const r of runners) safeAt(r, r.target, arrive(r, r.target));
      if (errorPos) { ev.kind = 'error'; ev.desc = `Reached on error, E${NUM[errorPos]}`; }
      else { ev.kind = 'hit'; ev.hit = 1; ev.desc = ctx.bunt ? 'Bunt single' : `Infield single to ${F.pos}`; call(arrive(batter, 1), 'SAFE', 'safe'); }
    }
    void occupied;
    ev.error = errorPos;
    TL.dur = Math.max(tF + 0.8, ...TL.throws.map((x) => x.t1 + 0.5), ...Object.values(TL.runners).map((p) => p[p.length - 1].t + 0.3));
    return finish(ev, TL, R, ctx);
  }

  // ---------- ball in the outfield (or dropped): runners take what they can
  const lead = R.slice().sort((a, b) => b.b0 - a.b0);
  const landT = f.landed ? f.landed.t : tF;
  const fly = f.la >= 20 && outs < 2;
  let ahead = 5;
  for (const r of lead) {
    // on a fly ball that falls in, runners were halfway and break at the landing
    let from = r.b0 + r.head, t0 = r.t0;
    if (fly && !r.batter) { from = r.b0 + (r.b0 === 3 ? 0.05 : 0.45); t0 = Math.max(landT - 0.15, 0); }
    r.from = from; r.st = t0;
    const minK = r.batter ? 1 : r.forced ? r.b0 + 1 : r.b0;
    let K = minK;
    for (let k = minK + 1; k <= 4; k++) {
      if (k >= ahead && k !== 4) break;
      const est = arrive(r, k, from, t0) + norm(o) * 0.22;
      if (est + aggr + (errorPos ? -0.6 : 0) < throwArrive(k)) K = k; else break;
    }
    if (ahead <= 4 && K >= ahead && K !== 4) K = ahead - 1;
    r.target = Math.max(K, minK);
    ahead = r.target;
  }
  // defense throws at the best chance
  const tries = lead.filter((r) => r.target > (r.batter ? 0 : r.b0)).map((r) => {
    const ta = throwArrive(r.target), tr = arrive(r, r.target, r.from, r.st);
    return { r, ta, tr, p: phi((tr - (ta + 0.1)) / 0.12) };
  }).sort((a, b) => b.p - a.p);
  const tgt = tries[0] && tries[0].p > 0.06 ? tries[0] : null;
  const cutK = tgt ? tgt.r.target : Math.min(4, (lead[0] ? lead[0].target : 1) + 1);
  const tThrow = throwArrive(cutK);
  const relay = hyp(P, BASE_POS(cutK)) > 230;
  if (relay) {
    const mid = [(P[0] + BASE_POS(cutK)[0]) / 2, (P[1] + BASE_POS(cutK)[1]) / 2];
    const tm = tF + 0.6 + hyp(P, mid) / tSpd;
    TL.throws.push({ t0: tF + 0.6, t1: tm, from: [...P], to: mid }); TL.throws.push({ t0: tm + 0.45, t1: tThrow, from: mid, to: BASE_POS(cutK) });
    const cut = Math.abs(P[0]) < 60 ? (P[0] < 0 ? 'SS' : '2B') : P[0] < 0 ? 'SS' : '2B';
    fpath(cut, tm - 0.1, mid);
  } else TL.throws.push({ t0: tF + 0.6, t1: tThrow, from: [...P], to: BASE_POS(cutK) });
  let outsNow = outs;
  for (const r of lead) {
    const k = r.target;
    if (r.from !== r.b0 + r.head) rpath(r.id, r.st, r.from);
    const tr = arrive(r, k, r.from, r.st);
    if (tgt && tgt.r === r && outsNow < 3) {
      if (tgt.ta + 0.1 < tr + norm(o) * 0.08) { outAt(r, k, tgt.ta, false, 'tag'); outsNow++; continue; }
      call(tr, 'SAFE', 'safe');
    }
    if (outsNow >= 3 && !r.out) { r.final = r.b0; continue; }
    safeAt(r, k, tr);
  }
  const bk = batter.out ? 0 : batter.final || 1;
  ev.hit = errorPos ? 0 : bk;
  if (f.groundRule) { // bounced over the fence: two bases for everyone
    TL.calls = []; ev.outs = []; ev.runs = [];
    for (const r of lead) { r.out = false; const k = Math.min(4, (r.batter ? 0 : r.b0) + 2); TL.runners[r.id] = [{ t: 0, b: r.b0 }, { t: arrive(r, k), b: k, score: k === 4 }]; r.final = k; if (k === 4) ev.runs.push({ id: r.id, t: arrive(r, k) }); }
    ev.hit = 2; TL.throws = [];
    call(1.5, 'GROUND-RULE DOUBLE', 'hit');
  }
  const names = ['', 'Single', 'Double', 'Triple', 'Inside-the-park home run'];
  const dir = direction(angleOf(P[0], P[1]));
  if (errorPos && !f.groundRule) { ev.kind = 'error'; ev.desc = `${batter.out ? 'Out' : 'Reached'} on error, E${NUM[errorPos]}`; }
  else if (batter.out) { ev.kind = 'out'; ev.desc = `${names[batter.target] || 'Hit'} to ${dir}, out at ${['home', 'first', 'second', 'third'][batter.target % 4]}`; ev.hit = 0; ev.kind = 'out'; }
  else { ev.kind = 'hit'; ev.desc = f.groundRule ? `Ground-rule double to ${dir}` : `${names[bk]} to ${dir}${fielded.dive ? ' (diving try)' : ''}`; if (!f.groundRule) call(Math.min(tF, 3), names[bk].toUpperCase(), 'hit'); }
  if (batter.out && ev.outs.length) ev.hit = batter.target - 1; // thrown out stretching: credit the hit he had
  ev.error = errorPos;
  TL.dur = Math.max(tF + 1, ...TL.throws.map((x) => x.t1 + 0.5), ...Object.values(TL.runners).map((p) => p[p.length - 1].t + 0.3));
  return finish(ev, TL, R, ctx);
}

// Apply the scoring rule (no runs on a third-out force) and compute the resulting bases.
function finish(ev, TL, R, ctx) {
  const outsBefore = ctx.outs;
  ev.outs.sort((a, b) => a.t - b.t);
  const total = outsBefore + ev.outs.length;
  if (total >= 3) {
    const third = ev.outs[2 - outsBefore];
    const noRuns = third && (third.force || third.base === 1 && R.find((r) => r.id === third.id && r.batter));
    ev.runs = ev.runs.filter((x) => !noRuns && x.t < third.t);
    ev.inningOver = true;
  }
  const bases = [null, null, null];
  if (!ev.inningOver) for (const r of R) if (!r.out && r.final >= 1 && r.final <= 3) bases[r.final - 1] = r.id;
  ev.bases = bases;
  if (ev.kind !== 'hr') ev.rbi = ev.error || ev.dp ? 0 : ev.runs.length;
  ev.timeline = TL;
  return ev;
}
