// The rules engine and phase machine. Pure (no DOM): main.js drives it in real time; tools/balance.mjs
// and season sims drive it instantly with autoPitch().
import { rnd, norm, clamp } from './util.js';
import { PARKS, spots, FIELD_POS, angleOf } from './park.js';
import { makePitch, aiChoosePitch, inZone, outside, fatigue, PITCHES } from './pitch.js';
import { contact, aiDecide, autoAim, windowSec, grade, SWING_LAG, DIFF } from './contact.js';
import { fly } from './flight.js';
import { resolve, runSpeed } from './resolve.js';
import { makeLineup, fullName } from './roster.js';

export const DT = 1 / 60;
export const SCALE = { real: 1.0, normal: 1.45, relaxed: 1.9 };
export const AGGR = { safe: 0.6, normal: 0.3, aggressive: 0.05 };
const WINDUP = 0.9;

const blankBat = () => ({ pa: 0, ab: 0, h: 0, d: 0, tr: 0, hr: 0, rbi: 0, bb: 0, k: 0, r: 0, sb: 0, cs: 0, hbp: 0, sf: 0 });
const blankPit = () => ({ outs: 0, h: 0, r: 0, bb: 0, k: 0, pc: 0, hr: 0 });

// side: {team (data.js entry), roster, kit}
export function createGame(o) {
  const g = {
    v: 1, mode: o.mode || 'exhibition', rs: (o.seed ?? 1) | 0, seed: o.seed ?? 1,
    park: o.park || 'home', rules: { innings: o.innings ?? 7, runRule: o.runRule ?? true },
    diff: o.difficulty || 'varsity', scale: SCALE[o.pitchSpeed || 'normal'] || 1.45, aim: o.aim || 'auto', aggr: o.aggr || 'normal',
    user: o.user ?? 0, autoBreak: !!o.autoBreak, quickResult: !!o.quick,
    teams: [o.home, o.away].map((s, i) => {
      const lineup = makeLineup(s.roster);
      return {
        key: s.team.key, side: i, team: s.team, roster: s.roster, kit: s.kit, lineup, order: 0,
        pitcher: 9, bullpen: [10, 11], used: [9], score: 0, hits: 0, errors: 0, lob: 0, line: [],
        bat: Object.fromEntries(s.roster.map((p) => [p.id, blankBat()])), pit: Object.fromEntries(s.roster.slice(9).map((p) => [p.id, blankPit()])),
        pc: {},
      };
    }),
    inning: 1, half: 0, outs: 0, balls: 0, strikes: 0, bases: [null, null, null], runsHalf: 0,
    phase: 'pre', t: 0, phaseT: 0, pitch: null, lastPitch: null, swing: null, aiSwing: null, play: null, result: null,
    meter: null, sel: 0, aimX: 0, aimZ: 2.5, target: { x: 0, z: 2.5 }, bunt: false, stealCall: false, stealing: null,
    log: [], ev: [], over: false, winner: null, walkoff: false, runRuled: false, forced: null, forceContact: null,
    calls: [], banner: null, gator: 0, longest: 0, pitchNo: 0, paNo: 0, lastPlay: null, lastCall: null,
  };
  for (const t of g.teams) t.line = [];
  if (o.situation) applySituation(g, o.situation);
  return g;
}

export function applySituation(g, s) {
  if (s.inning != null) g.inning = s.inning;
  if (s.half != null) g.half = s.half;
  if (s.outs != null) g.outs = s.outs;
  if (s.balls != null) g.balls = s.balls;
  if (s.strikes != null) g.strikes = s.strikes;
  if (s.score) { g.teams[0].score = s.score[0]; g.teams[1].score = s.score[1]; }
  if (s.bases) { // true = put the next hitters in the order there
    const T = battingTeam(g);
    g.bases = s.bases.map((b, i) => (b ? (typeof b === 'string' ? b : T.roster[T.lineup[(T.order + 8 - i) % 9]].id) : null));
  }
  if (s.order != null) battingTeam(g).order = s.order;
  if (s.pitchCount != null) { const D = fieldingTeam(g); D.pc[D.roster[D.pitcher].id] = s.pitchCount; }
  for (const t of g.teams) while (t.line.length < g.inning - (t.side === 1 ? 0 : (g.half === 1 ? 0 : 1))) t.line.push(0);
}

export const battingTeam = (g) => g.teams[g.half === 0 ? 1 : 0];
export const fieldingTeam = (g) => g.teams[g.half === 0 ? 0 : 1];
export const batter = (g) => { const T = battingTeam(g); return T.roster[T.lineup[T.order]]; };
export const pitcher = (g) => { const T = fieldingTeam(g); return T.roster[T.pitcher]; };
export const userBats = (g) => g.user >= 0 && battingTeam(g).side === g.user;
export const userPitches = (g) => g.user >= 0 && fieldingTeam(g).side === g.user;
export const byId = (g, id) => { for (const t of g.teams) { const p = t.roster.find((q) => q.id === id); if (p) return p; } return null; };
export const parkOf = (g) => PARKS[g.park] || PARKS.home;
const emit = (g, type, data = {}) => { g.ev.push({ type, ...data }); };
const say = (g, text, kind = 'info') => { g.lastCall = text; g.log.push(text); if (g.log.length > 60) g.log.shift(); emit(g, 'say', { text, kind }); };

export function defense(g) {
  const T = fieldingTeam(g), sp = spots(parkOf(g));
  return FIELD_POS.map((pos, i) => {
    const p = pos === 'P' ? T.roster[T.pitcher] : T.roster[i - 1]; // roster 0..7 = C,1B,2B,SS,3B,LF,CF,RF
    return { pos, p, x: sp[pos][0], y: sp[pos][1] };
  });
}

// ---------------------------------------------------------------- pitch lifecycle
export function stealable(g) {
  if (g.bases[0] && !g.bases[1]) return 1;
  if (g.bases[1] && !g.bases[2] && !g.bases[0]) return 2;
  return 0;
}

// Begin a pitch. spec {type, target{x,z}, acc, exact}
export function startPitch(g, spec) {
  const P = pitcher(g), T = fieldingTeam(g);
  const pc = (T.pc[P.id] || 0);
  g.pitch = makePitch(g, P, spec.type, spec.target, spec.acc ?? 0.55, pc, !!spec.exact);
  if (g.lastPitch && Math.abs(g.lastPitch.mph - g.pitch.mph) >= 8) g.pitch.deception += 0.18;
  T.pc[P.id] = pc + 1;
  T.pit[P.id].pc++;
  g.pitchNo++;
  // steals: the user's call, or the AI's
  g.stealing = null;
  const sb = stealable(g);
  if (sb && g.outs < 3) {
    const runner = byId(g, g.bases[sb - 1]);
    const wantAI = !userBats(g) && runner.speed > 0.55 && g.strikes < 2 && rnd(g) < 0.08 + (runner.speed - 0.55) * 0.5 && !(g.balls === 3 && g.strikes === 2);
    if ((userBats(g) && g.stealCall) || (!userBats(g) && wantAI)) g.stealing = { base: sb, id: runner.id };
  }
  g.stealCall = false;
  g.swing = null; g.aiSwing = null; g.result = null;
  // the AI batter decides now (its swing time is drawn from its timing error)
  if (!userBats(g)) {
    const B = batter(g);
    const wantBunt = aiWantsBunt(g);
    const d = wantBunt ? { u: norm(g) * 0.8, dx: norm(g) * 0.12, dz: norm(g) * 0.15, bunt: true } : aiDecide(g, B, g.pitch, g.balls, g.strikes, aiDiff(g, 'bat'));
    if (d && (wantBunt && Math.abs(outside(g.pitch.px, g.pitch.pz)) < 0.4 || !wantBunt)) g.aiSwing = d;
  }
  g.phase = 'windup'; g.phaseT = 0;
  emit(g, 'windup');
}

function aiWantsBunt(g) {
  if (g.strikes >= 2 || g.outs >= 2 || !(g.bases[0] || g.bases[1]) || g.bases[2]) return false;
  const B = batter(g), T = battingTeam(g), late = g.inning >= g.rules.innings - 1;
  const close = Math.abs(g.teams[0].score - g.teams[1].score) <= 1;
  return late && close && B.power < 0.5 && T.lineup.indexOf(T.roster.indexOf(B)) >= 6 && rnd(g) < 0.5;
}
// difficulty tilts the AI side that faces the user
function aiDiff(g, role) {
  if (g.user < 0) return 1;
  const d = { rookie: 1.25, varsity: 1, allstate: 0.85 }[g.diff] || 1;
  return role === 'bat' ? d : 1 / d;
}

// Duration (game seconds) of the pitch flight.
export const flightTime = (g) => g.pitch.T * g.scale;
export const windowGame = (g) => windowSec(batter(g), DIFF[g.diff] || 1) * g.scale;

// The user swings at game time g.phaseT during the flight.
export function userSwing(g, aim) {
  if (g.phase !== 'flight' || g.swing) return null;
  const W = windowGame(g);
  const u = (g.phaseT + SWING_LAG * g.scale - flightTime(g)) / W;
  let dx, dz;
  if (g.aim === 'auto' && !aim) ({ dx, dz } = autoAim(g, g.pitch));
  else { const a = aim || { x: g.aimX, z: g.aimZ }; dx = a.x - g.pitch.px; dz = g.pitch.pz - a.z; }
  g.swing = { u, dx, dz, at: g.phaseT, bunt: g.bunt, grade: grade(u) };
  emit(g, 'swing', { grade: g.swing.grade });
  return g.swing;
}

// Resolve the pitch once it reaches the plate (or the bat). Returns the result kind.
export function completePitch(g) {
  const B = batter(g), pt = g.pitch;
  let sw = g.swing || g.aiSwing;
  if (g.swing && g.swing.bunt === undefined) sw.bunt = g.bunt;
  let res;
  if (sw) {
    res = contact(g, { u: sw.u, dx: sw.dx, dz: sw.dz, batter: B, pitch: pt, bunt: !!sw.bunt });
    if (g.forceContact && res.kind !== 'inplay') res = { kind: 'inplay', grade: 'GOOD', q: 0.8, ...g.forceContact };
    else if (g.forceContact) Object.assign(res, g.forceContact);
  } else if (g.forceContact) {
    res = { kind: 'inplay', grade: 'GOOD', q: 0.8, ...g.forceContact };
  } else res = { kind: 'take' };
  g.forceContact = null;
  g.lastPitch = pt;
  if (sw) emit(g, res.kind === 'inplay' || res.kind === 'foul' ? 'crack' : 'whiff', { grade: res.grade, q: res.q || 0 });
  g.result = res;
  if (res.kind === 'take') return takeResult(g);
  if (res.kind === 'whiff') return strike(g, sw.bunt ? 'bunt missed' : 'swinging');
  if (res.kind === 'foul') {
    if (res.bunt && g.strikes === 2) return strikeout(g, 'foul bunt');
    if (g.strikes < 2) g.strikes++;
    say(g, res.tip ? 'Foul tip' : 'Foul ball', 'foul');
    g.stealing = null;
    g.play = null;
    return 'foul';
  }
  // in play
  const f = fly(parkOf(g), res.ev, res.la, res.spray);
  const bats = battingTeam(g);
  const ctx = { park: parkOf(g), f, fielders: defense(g), bases: g.bases.map((id) => (id ? byId(g, id) : null)), batter: B, outs: g.outs, aggr: userBats(g) ? AGGR[g.aggr] : AGGR.normal * 0.4, steal: g.stealing, bunt: !!res.bunt };
  const out = resolve(g, ctx);
  if (out.kind === 'foul') {
    if (res.bunt && g.strikes === 2) { g.play = { f, out, res }; return strikeout(g, 'foul bunt'); }
    if (g.strikes < 2) g.strikes++;
    g.play = { f, out, res };
    say(g, 'Foul ball', 'foul');
    g.stealing = null;
    return 'foulplay';
  }
  // infield fly rule (game rule): pop-up in the infield, runners on 1st and 2nd, fewer than two outs
  const land = f.landed;
  if (!f.hr && res.la > 45 && land && land.r < 165 && !f.foul && g.bases[0] && g.bases[1] && g.outs < 2) {
    out.infieldFly = true;
    if (!out.caught) { out.outs = [{ id: B.id, base: 0, t: 1, force: false, how: 'infield fly' }]; out.runs = []; out.bases = g.bases.slice(); out.kind = 'out'; out.hit = 0; out.error = null; out.rbi = 0; }
    out.desc = `Infield fly rule: batter out (${out.fielder})`;
    out.timeline.calls.unshift({ t: Math.min(1.2, land.t * 0.5), text: 'INFIELD FLY', kind: 'out' });
  }
  if (f.hr && parkOf(g).gator && res.spray > 18) { out.gator = true; out.timeline.calls.push({ t: Math.min(3, land ? land.t : 2.5), text: 'GATOR SPLASH!', kind: 'hr' }); }
  void bats;
  g.play = { f, out, res };
  return 'inplay';
}

function takeResult(g) {
  const pt = g.pitch, B = batter(g);
  const side = B.bats === 'L' ? 1 : -1; // batter stands on the third-base side (x<0) if right-handed
  const body = side * pt.px > 1.95 && side * pt.px < 3.1 && pt.pz > 0.4 && pt.pz < 5.2;
  if (body && rnd(g) < 0.7) return hbp(g);
  if (inZone(pt.px, pt.pz)) return strike(g, 'looking');
  return ball(g);
}

function strike(g, how) {
  if (g.strikes >= 2) return strikeout(g, how);
  g.strikes++;
  say(g, `Strike ${g.strikes === 1 ? 'one' : 'two'}${how === 'swinging' ? ', swinging' : how === 'looking' ? ', called' : ''}`, 'strike');
  runSteal(g);
  return 'strike';
}
function strikeout(g, how) {
  const B = batter(g), bt = battingTeam(g).bat[B.id], P = pitcher(g), pt = fieldingTeam(g).pit[P.id];
  bt.pa++; bt.ab++; bt.k++; pt.k++; pt.outs++;
  g.outs++;
  say(g, how === 'looking' ? 'Strike three, called. Strikeout!' : how === 'foul bunt' ? 'Foul bunt with two strikes: strikeout' : 'Strike three, swinging. Strikeout!', 'out');
  emit(g, 'k', { how });
  if (g.outs < 3) runSteal(g);
  endPA(g);
  return 'strikeout';
}
function ball(g) {
  const pt = g.pitch;
  if (g.balls >= 3) return walk(g, 'Ball four. Walk');
  g.balls++;
  const wild = (pt.pz < 0.4 || Math.abs(pt.px) > 2.1) && g.bases.some(Boolean) && rnd(g) < 0.5;
  say(g, `Ball ${['one', 'two', 'three'][g.balls - 1]}`, 'ball');
  if (wild) { wildPitch(g); g.stealing = null; }
  else runSteal(g);
  return 'ball';
}
function walk(g, text) {
  const B = batter(g), T = battingTeam(g), bt = T.bat[B.id], P = pitcher(g), pt = fieldingTeam(g).pit[P.id];
  bt.pa++; bt.bb++; pt.bb++;
  g.stealing = null;
  forceAdvance(g, B.id);
  say(g, text, 'ball');
  endPA(g);
  return 'walk';
}
function hbp(g) {
  const B = batter(g), T = battingTeam(g), bt = T.bat[B.id];
  bt.pa++; bt.hbp++;
  g.stealing = null;
  forceAdvance(g, B.id);
  say(g, 'Hit by pitch. Take your base', 'ball');
  endPA(g);
  return 'hbp';
}
function forceAdvance(g, id) {
  const b = g.bases.slice();
  if (b[0]) { if (b[1]) { if (b[2]) scoreRun(g, b[2], true); b[2] = b[1]; } b[1] = b[0]; }
  b[0] = id;
  g.bases = b;
  checkWalkoff(g);
}
function wildPitch(g) {
  const b = g.bases.slice();
  if (b[2]) scoreRun(g, b[2], false);
  g.bases = [null, b[0], b[1]];
  say(g, 'Wild pitch! Runners advance', 'safe');
  emit(g, 'wild');
  checkWalkoff(g);
}
function scoreRun(g, id, rbi) {
  const T = battingTeam(g);
  T.score++; g.runsHalf++;
  T.line[g.inning - 1] = (T.line[g.inning - 1] || 0) + 1;
  T.bat[id].r++;
  if (rbi) T.bat[batter(g).id].rbi++;
  const P = pitcher(g); fieldingTeam(g).pit[P.id].r++;
  emit(g, 'run', { id });
}

// The catcher's throw on a steal (when the ball isn't put in play).
function runSteal(g) {
  const st = g.stealing; g.stealing = null;
  if (!st || g.outs >= 3) return;
  const R = byId(g, st.id), C = fieldingTeam(g).roster[0], pt = g.pitch;
  if (g.bases[st.base - 1] !== st.id || g.bases[st.base]) return;
  const tRun = 0.35 + (90 - 12) / runSpeed(R) + 0.2; // jump, run, slide
  const dist = st.base === 1 ? 127.3 : 90;
  const tDef = 1.25 + pt.T + 0.7 + dist / (100 + 30 * C.arm); // delivery, flight, catcher pop
  const safe = tRun < tDef + norm(g) * 0.14;
  const T = battingTeam(g);
  const to = st.base + 1;
  g.steal = { base: st.base, to, safe, id: st.id };
  if (safe) {
    g.bases[st.base - 1] = null; g.bases[to - 1] = st.id; T.bat[st.id].sb++;
    say(g, `Stolen base! Safe at ${to === 2 ? 'second' : 'third'}`, 'safe');
  } else {
    g.bases[st.base - 1] = null; T.bat[st.id].cs++; g.outs++; fieldingTeam(g).pit[pitcher(g).id].outs++;
    say(g, `Caught stealing ${to === 2 ? 'second' : 'third'}`, 'out');
    if (g.outs >= 3) { g.halfOver = true; }
  }
  emit(g, 'steal', { safe });
}

// Apply a resolved ball in play.
export function applyPlay(g) {
  const { out, f } = g.play;
  const B = batter(g), T = battingTeam(g), D = fieldingTeam(g), bt = T.bat[B.id], P = pitcher(g), pt = D.pit[P.id];
  bt.pa++;
  if (!out.sf && !out.sac) bt.ab++;
  if (out.sf) bt.sf++;
  if (out.hit) { bt.h++; T.hits++; pt.h++; if (out.hit === 2) bt.d++; if (out.hit === 3) bt.tr++; if (out.hit === 4) { bt.hr++; pt.hr++; } }
  if (out.error) D.errors++;
  // walk-off: in the last inning or later, home team: count only the runs needed (all on a home run)
  let runs = out.runs.slice().sort((a, b) => a.t - b.t);
  const home = g.teams[0], away = g.teams[1];
  if (g.half === 1 && g.inning >= g.rules.innings && out.kind !== 'hr') {
    const need = away.score - home.score + 1;
    if (need > 0 && runs.length >= need) runs = runs.slice(0, need);
  }
  for (const r of runs) scoreRun(g, r.id, false);
  if (!out.dp && !out.error) bt.rbi += out.kind === 'hr' ? runs.length : runs.length;
  const nOuts = Math.min(3 - g.outs, out.outs.length);
  g.outs += nOuts; pt.outs += nOuts;
  g.bases = g.outs >= 3 ? [null, null, null] : out.bases.slice();
  const dist = f.hr ? f.hrDist : 0;
  if (dist > g.longest) g.longest = dist;
  if (out.gator) g.gator++;
  g.lastPlay = { desc: out.desc, kind: out.kind, hit: out.hit, hr: f.hr, dist, ev: Math.round(f.ev), la: Math.round(f.la), spray: Math.round(f.spray), gator: !!out.gator, dp: out.dp, sf: out.sf, error: out.error, infieldFly: !!out.infieldFly, runs: runs.length, outs: nOuts, fielder: out.fielder, caught: out.caught };
  say(g, out.desc + (runs.length && out.kind !== 'hr' ? ` (${runs.length} run${runs.length > 1 ? 's' : ''} score${runs.length > 1 ? '' : 's'})` : ''), out.kind === 'hr' || out.kind === 'hit' ? 'hit' : out.kind === 'out' ? 'out' : 'info');
  emit(g, 'played', { kind: out.kind, hr: f.hr, gator: !!out.gator, runs: runs.length });
  endPA(g);
  checkWalkoff(g);
}

function checkWalkoff(g) {
  if (g.half === 1 && g.inning >= g.rules.innings && g.teams[0].score > g.teams[1].score && !g.over) {
    g.over = true; g.walkoff = true; g.winner = 0;
    say(g, 'Walk-off! Ballgame!', 'hit');
    emit(g, 'walkoff');
  }
}

function endPA(g) {
  g.balls = 0; g.strikes = 0; g.bunt = false; g.paNo++;
  const T = battingTeam(g);
  T.order = (T.order + 1) % 9;
  if (g.outs >= 3) g.halfOver = true;
  bullpenCheck(g);
}

function bullpenCheck(g) {
  const D = fieldingTeam(g), P = D.roster[D.pitcher];
  const pc = D.pc[P.id] || 0;
  if (!D.bullpen.length || g.outs >= 3) return;
  if (pc >= P.stamina || (g.runsHalf >= 4 && pc > 20) || fatigue(P, pc) > 0.75) {
    D.pitcher = D.bullpen.shift(); D.used.push(D.pitcher);
    const np = D.roster[D.pitcher];
    say(g, `Pitching change: ${fullName(np)} in for ${D.team.short}`, 'info');
    emit(g, 'sub', { team: D.side, id: np.id });
  }
}

// After a half inning: change sides, check the end of the game.
export function endHalf(g) {
  const T = battingTeam(g);
  T.lob += g.bases.filter(Boolean).length;
  if (!T.line[g.inning - 1]) T.line[g.inning - 1] = T.line[g.inning - 1] || 0;
  g.halfOver = false; g.outs = 0; g.balls = 0; g.strikes = 0; g.bases = [null, null, null]; g.runsHalf = 0; g.bunt = false; g.stealing = null;
  const home = g.teams[0].score, away = g.teams[1].score, n = g.rules.innings;
  const rrInn = n >= 7 ? 5 : n >= 5 ? 3 : 99;
  if (g.half === 0) {
    if (g.inning >= n && home > away) return finishGame(g, 0);
    if (g.rules.runRule && g.inning >= rrInn && home - away >= 10) return finishGame(g, 0, true);
    g.half = 1;
  } else {
    if (g.inning >= n && home !== away) return finishGame(g, home > away ? 0 : 1);
    if (g.rules.runRule && g.inning >= rrInn && Math.abs(home - away) >= 10) return finishGame(g, home > away ? 0 : 1, true);
    if (g.inning >= 20) return finishGame(g, home >= away ? 0 : 1);
    g.half = 0; g.inning++;
  }
  const B = battingTeam(g); while (B.line.length < g.inning - 1) B.line.push(0);
  return false;
}
function finishGame(g, w, runRule = false) {
  g.over = true; g.winner = w; g.runRuled = runRule;
  say(g, runRule ? 'Run rule: the game is over' : 'Ballgame!', 'info');
  emit(g, 'final');
  return true;
}

// ---------------------------------------------------------------- instant simulation (AI vs AI)
export function aiPitchSpec(g) {
  const P = pitcher(g);
  const c = aiChoosePitch(g, P, g.balls, g.strikes, g.lastPitch);
  return { type: c.type, target: c.target, acc: 0.5 + norm(g) * 0.12 };
}
// One full pitch with no rendering. Returns the result kind.
export function autoPitch(g, userProxy = null) {
  if (g.over) return null;
  startPitch(g, aiPitchSpec(g));
  if (userProxy && userBats(g)) { // simulated human: timing error σ in windows, auto aim, takes balls well outside
    const take = outside(g.pitch.px, g.pitch.pz) > userProxy.chase || (!inZone(g.pitch.px, g.pitch.pz) && rnd(g) < 0.35) || (g.strikes < 2 && rnd(g) < 0.15);
    // a human times the fastball: off-speed pitches make him early by about half the speed gap
    const Wr = windowSec(batter(g), DIFF[g.diff] || 1), tFB = 55 / (pitcher(g).velo * 1.4667) * 1.04;
    if (!take) { const { dx, dz } = autoAim(g, g.pitch); g.swing = { u: (norm(g) * userProxy.sigmaT / g.scale - 0.5 * (g.pitch.T - tFB)) / Wr, dx, dz, bunt: false }; }
    g.aiSwing = null;
  }
  const r = completePitch(g);
  if (r === 'inplay') applyPlay(g);
  if (g.halfOver && !g.over) endHalf(g);
  return r;
}
export function simToEnd(g, userProxy) {
  let n = 0;
  while (!g.over && n < 1500) { autoPitch(g, userProxy); g.ev.length = 0; n++; }
  return g;
}

export function topPerformer(g, side) {
  const T = g.teams[side];
  let best = null, bs = -1;
  for (const i of T.lineup) {
    const p = T.roster[i], s = T.bat[p.id];
    const sc = s.h * 2 + s.hr * 4 + s.rbi * 1.5 + s.bb + s.sb + s.d + s.tr * 2;
    if (sc > bs) { bs = sc; best = { p, s }; }
  }
  return best;
}

export { PITCHES, angleOf, clamp };
