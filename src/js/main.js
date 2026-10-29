// Boot, fixed-step loop, the live pitch-by-pitch phase machine, scenes, season and challenge flow,
// saves, and the window.__game test hooks.
import { team, CLUBS, FACTS_LIST, fact } from './data.js';
import { fullName } from './roster.js';
import { PITCHES, inZone, ZONE } from './pitch.js';
import { SWING_LAG } from './contact.js';
import { DT, SCALE, createGame, battingTeam, fieldingTeam, batter, pitcher, userBats, userPitches, startPitch, userSwing, completePitch, applyPlay, endHalf, aiPitchSpec, flightTime, windowGame, stealable, applySituation, simToEnd } from './game.js';
import { createSeason, nextGame, recordResult, simUserGame, sideFor } from './season.js';
import { challenge, starsFor } from './challenges.js';
import { R, initRender, resize, drawDuel, drawField, drawTitle, begin, clear, stepFx, burst, confetti, hitFlash, screenToPlate, zoneRect } from './render.js';
import { initInput, heldAim } from './input.js';
import { R3, want3d, init3d, render3d, p3, screenToPlate3, resize3d, ART, ART_READY } from './render3d.js';
import { unlock, play, setVolume, setOn } from './audio.js';
import { loadSave, writeSave, store, hash, clamp } from './util.js';
import * as UI from './ui.js';

const $ = (s) => document.querySelector(s);
const DEFAULTS = { sound: true, vol: 0.5, motion: 'auto', text: 100, theme: 'auto', difficulty: 'varsity', aim: 'auto', pitchSpeed: 'normal', innings: 7, springInnings: 5, runRule: true, aggr: 'normal', zone: true, ring: false, autoMeter: false, facts: true, gfx: '3d' };
const state = {
  scene: 'title', stack: [], settings: { ...DEFAULTS }, season: null,
  save: { stars: {}, album: [], trophies: [], records: { longest: 0, splashes: 0 } },
  mode: null, game: null, paused: false, helpTab: 'controls', seed: 0, busy: 0,
  pick: { home: 'hot-springs', away: 'lakeside', side: 'home', park: 'home', school: 'hot-springs', length: 'short', club: 'steam-valley' },
  chal: null, chalResult: null, chalPending: null, replay: null, lastReplay: null, breakFact: null, showBox: false, lastOpts: null, live: { playT: 0, resT: 0, halfT: 0, snap: true, calls: 0, next: null, umpCall: null, aiForce: null }, fxN: 0, titleT: 0,
};

// ---------------------------------------------------------------- saves
function persist() {
  writeSave({ v: 1, settings: state.settings, season: state.season, stars: state.save.stars, album: state.save.album, trophies: state.save.trophies, records: state.save.records });
}
function restore() {
  const s = loadSave();
  if (!s || s.v !== 1) return;
  Object.assign(state.settings, s.settings || {});
  state.season = s.season || null;
  state.save.stars = s.stars || {};
  state.save.album = s.album || [];
  state.save.trophies = s.trophies || [];
  state.save.records = { longest: 0, splashes: 0, ...(s.records || {}) };
  if (state.season) state.pick.school = state.season.school;
}

// ---------------------------------------------------------------- settings
const mq = (q) => { try { return window.matchMedia(q).matches; } catch (e) { return false; } };
const reducedMotion = () => state.settings.motion === 'on' || (state.settings.motion === 'auto' && mq('(prefers-reduced-motion: reduce)'));
function applySettings() {
  const s = state.settings;
  document.documentElement.style.fontSize = `${s.text}%`;
  const dark = s.theme === 'dark' || (s.theme === 'auto' && mq('(prefers-color-scheme: dark)'));
  document.body.classList.toggle('theme-dark', dark);
  document.body.classList.toggle('theme-light', !dark);
  document.body.classList.toggle('reduced', reducedMotion());
  R.reduced = reducedMotion();
  setOn(s.sound); setVolume(s.vol);
  const g = state.game;
  if (g) { g.scale = SCALE[s.pitchSpeed] || 1.45; g.aim = s.aim; g.aggr = s.aggr; g.diff = s.difficulty; }
}

// ---------------------------------------------------------------- game setup
function makeGame(o) {
  const home = o.homeSide || sideFor(o.home, o.cls, o.rosterSeed ?? 1, 'home');
  const away = o.awaySide || sideFor(o.away, o.cls, o.rosterSeed ?? 1, 'away');
  const user = o.user === 'away' ? 1 : o.user === 'none' ? -1 : 0;
  const s = state.settings;
  const g = createGame({
    mode: o.mode, home, away, seed: o.seed ?? (state.seed || (Date.now() & 0xffff)), user, park: o.park || 'home',
    innings: o.innings ?? s.innings, runRule: o.runRule ?? s.runRule, difficulty: s.difficulty, pitchSpeed: s.pitchSpeed, aim: s.aim, aggr: s.aggr,
    situation: o.situation, autoBreak: !!o.autoBreak,
  });
  g.night = !!o.night;
  return g;
}
function enterGame(g, mode, opts) {
  state.game = g; state.mode = mode; state.lastOpts = opts; state.showBox = false; state.paused = !!(opts && opts.paused);
  state.replay = null; state.lastReplay = null;
  Object.assign(state.live, { playT: 0, resT: 0, halfT: 0, snap: true, calls: 0, next: null, umpCall: null, aiForce: null });
  g.sel = 0; g.target = { x: 0, z: 2.5 }; g.aimX = 0; g.aimZ = 2.5;
  clearTimeout(gradeTimer); { const gr = $('#grade'); if (gr) gr.hidden = true; }
  go('game', false);
}
function newExhibition(o = {}) {
  const p = state.pick;
  const opts = { mode: 'exhibition', home: o.home || p.home, away: o.away || p.away, user: o.user || p.side, park: o.park || p.park, innings: o.innings, seed: o.seed, situation: o.situation, paused: o.paused, night: !!o.night };
  enterGame(makeGame(opts), 'exhibition', opts);
}
function newSpring(o = {}) {
  const mine = o.club || state.pick.club, other = CLUBS.find((c) => c.key !== mine).key;
  const opts = { mode: 'spring', home: mine, away: other, user: o.user || 'home', park: 'historic', innings: o.innings ?? state.settings.springInnings, seed: o.seed, situation: o.situation, paused: o.paused };
  enterGame(makeGame(opts), 'spring', opts);
}

// ---------------------------------------------------------------- season
function startSeason(o = {}) {
  state.season = createSeason({ school: o.school || state.pick.school, length: o.length || state.pick.length, seed: o.seed ?? (state.seed || (Date.now() & 0xfff)) });
  persist();
  go('hub', false);
}
function playSeasonGame(o = {}) {
  const S = state.season, gm = nextGame(S);
  if (!gm) return;
  const final = S.phase === 'bracket' && S.bracket.round === 2;
  const opts = { mode: 'season', home: gm.home ? S.school : gm.opp, away: gm.home ? gm.opp : S.school, cls: S.cls, rosterSeed: S.seed, user: gm.home ? 'home' : 'away', park: gm.venue === 'majestic' ? 'majestic' : 'home', night: final, seed: o.seed ?? hash(`${S.school}|${S.week}|${S.phase}|${S.w}${S.l}`), paused: o.paused, situation: o.situation };
  enterGame(makeGame(opts), 'season', opts);
}
function afterSeasonGame() {
  const g = state.game, S = state.season, ut = g.user;
  const wasFinal = S.phase === 'bracket' && S.bracket.round === 2;
  recordResult(S, g.teams[ut].score, g.teams[1 - ut].score);
  state.game = null;
  if (S.champion && wasFinal) {
    state.save.trophies.push({ school: S.school, cls: S.cls, record: `${S.w}-${S.l}` });
    persist(); go('champion', false); fxConfetti(); play('win'); return;
  }
  persist(); go('hub', false);
}
function simSeason(all) {
  const S = state.season;
  if (all) { while (S.phase === 'regular') simUserGame(S, state.settings.innings); }
  else simUserGame(S, state.settings.innings);
  persist();
  if (S.champion) { state.save.trophies.push({ school: S.school, cls: S.cls, record: `${S.w}-${S.l}` }); persist(); go('champion', false); fxConfetti(); return; }
  render();
}

// ---------------------------------------------------------------- challenges
function startChallenge(id, o = {}) {
  const c = challenge(id);
  if (!c) return;
  state.chal = { c, tally: { hits: 0, points: 0, longest: 0, correct: 0, pitches: 0, outs: 0, runs: 0, won: false, faced: 0, reached: 0 } };
  const opts = { mode: 'challenge', user: c.user || 'home', park: c.park, innings: 7, runRule: false, seed: o.seed ?? (state.seed || 4242), paused: o.paused };
  if (c.club) { opts.home = 'steam-valley'; opts.away = 'barnstormers'; }
  else { opts.home = c.school; opts.away = c.opp; }
  if (c.kind === 'sit') opts.situation = c.situation;
  const g = makeGame(opts);
  if (c.kind === 'practice' || c.kind === 'ump') {
    const D = g.teams[1], P = D.roster[9];
    if (c.bp) Object.assign(P, { velo: 68, control: 0.97, stuff: 0.1, reps: ['FB'], stamina: 999 });
    const T = g.teams[0];
    if (c.slugger) Object.assign(T.roster[T.lineup[3]], { power: 0.97, contact: 0.8, bats: 'L' });
    g.half = 1; // the user's team bats (home, bottom half)
    if (c.slugger) T.order = 3;
    if (c.kind === 'ump') { g.user = -1; g.umpire = true; }
  }
  g.chal = c.id;
  state.chal.startScore = [g.teams[0].score, g.teams[1].score]; state.chal.startPA = g.paNo;
  enterGame(g, 'challenge', opts);
}
function finishChallenge(extra = {}) {
  const ch = state.chal, c = ch.c, t = { ...ch.tally, ...extra };
  const n = starsFor(c, t);
  const best = Math.max(n, state.save.stars[c.id] || 0);
  state.save.stars[c.id] = best;
  persist();
  let text = '';
  if (c.metric === 'hits') text = `${t.hits} hits in ${c.pitches} pitches.`;
  else if (c.metric === 'correct') text = `${t.correct} of ${c.pitches} calls right.`;
  else if (c.metric === 'points') text = `${t.points} points (${t.hr || 0} home runs, ${t.splash || 0} Gator Splashes).`;
  else if (c.metric === 'longest') text = t.longest ? `Longest home run: ${t.longest} ft. (Legend says Ruth's 1918 drive went about 573 ft, measured in 2011; it can't be confirmed with complete certainty.)` : 'No home run this time.';
  else if (c.metric === 'jam') text = `${t.runs} run${t.runs === 1 ? '' : 's'} scored in the inning.`;
  else text = t.won ? 'You did it.' : 'The inning got away.';
  state.chalResult = { c, stars: n, best: best > n ? best : 0, text };
  state.game.over = true;
  if (n) play('win');
  go('chalResult', false);
}

// ---------------------------------------------------------------- facts
function pickFact(ctx) {
  const pool = FACTS_LIST.filter((f) => f.album !== 'history');
  const pref = ctx === 'finals' ? pool.filter((f) => f.tag === 'Majestic Park') : pool;
  const unseen = pref.filter((f) => !state.save.album.includes(f.id));
  const list = unseen.length ? unseen : pref;
  const g = state.game;
  const i = hash(`${g ? g.seed : 0}|${g ? g.inning : 0}|${state.save.album.length}`) % list.length;
  const f = list[i];
  if (!state.save.album.includes(f.id)) { state.save.album.push(f.id); persist(); }
  return f;
}

// ---------------------------------------------------------------- the live phase machine
const ui = () => ({ zone: state.settings.zone && !(state.game && state.game.umpire && state.game.phase !== 'result'), ring: state.settings.ring, aim: state.settings.aim, userBats: state.game && userBats(state.game), userPitches: state.game && userPitches(state.game), night: state.game && state.game.night, W: state.game && state.game.pitch ? windowGame(state.game) : 0.06, playT: state.live.playT, snap: state.live.snap, reveal: state.game && (state.game.umpire || !state.game.swing) });

function preDelay(g) { return g.chal && challenge(g.chal).kind === 'practice' ? 0.7 : userBats(g) ? 1.0 : 0.8; }
function bpSpec(g) { return { type: 'FB', target: { x: (g.rs % 7 - 3) * 0.12, z: 2.3 + (g.rs % 5) * 0.12 }, acc: 0.9 }; }

function liveTick() {
  const g = state.game, L = state.live;
  if (!g || g.over && g.phase !== 'result' && g.phase !== 'play') return;
  const [ax, az] = heldAim();
  if (ax || az) {
    if (userPitches(g) && g.phase === 'pre') { g.target.x = clamp(g.target.x + ax * 1.8 * DT, -2, 2); g.target.z = clamp(g.target.z + az * 1.8 * DT, 0.6, 4.4); }
    else if (userBats(g) && g.phase !== 'play') { g.aimX = clamp(g.aimX + ax * 2.2 * DT, -1.6, 1.6); g.aimZ = clamp(g.aimZ + az * 2.2 * DT, 1.0, 4.0); }
  }
  g.phaseT += DT;
  switch (g.phase) {
    case 'pre': {
      if (userPitches(g)) {
        if (g.meter && !g.meter.done) { g.meter.t += DT; if (g.meter.t > 1.25) releaseMeter(0.15); }
        break;
      }
      if (g.phaseT >= preDelay(g)) {
        const c = g.chal && challenge(g.chal);
        let spec = L.aiForce ? { type: L.aiForce.type || 'FB', target: { x: L.aiForce.x, z: L.aiForce.z }, acc: 1, exact: true } : c && c.bp ? bpSpec(g) : aiPitchSpec(g);
        if (c && c.kind === 'ump') { const s = aiPitchSpec(g); spec = { ...s, target: { x: clamp(s.target.x, -1.3, 1.3), z: clamp(s.target.z, 1.1, 3.9) } }; }
        L.aiForce = null;
        startPitch(g, spec);
        if (g.umpire || (c && c.kind === 'ump')) g.aiSwing = null;
      }
      break;
    }
    case 'windup':
      if (g.phaseT >= 0.9) { g.phase = 'flight'; g.phaseT = 0; }
      break;
    case 'flight': {
      const Tg = flightTime(g);
      let rt = Tg + 0.12 * g.scale;
      if (g.swing) rt = clamp(g.swing.at + SWING_LAG * g.scale, Tg - 0.06 * g.scale, Tg + 0.12 * g.scale);
      else if (g.aiSwing) rt = Tg;
      if (g.phaseT >= rt) {
        if (g.umpire) { g.phase = 'umpwait'; g.phaseT = 0; play('pop'); announce('Your call: ball or strike?'); break; }
        const r = completePitch(g);
        afterComplete(r);
      }
      break;
    }
    case 'play': {
      const tl = g.play.out.timeline;
      const landed = g.play.f.hr && L.playT > (g.play.f.landed ? g.play.f.landed.t : 3);
      L.playT += DT * (L.ff ? 4 : landed ? 2.2 : 1);
      L.snap = false;
      for (; L.calls < tl.calls.length && tl.calls[L.calls].t <= L.playT; L.calls++) {
        const k = tl.calls[L.calls];
        play(k.kind === 'out' ? 'out' : k.kind === 'safe' ? 'safe' : k.kind === 'hr' ? 'cheer' : 'pop', { big: true });
        if (k.text === 'GATOR SPLASH!') { play('splash'); burst(R.W * 0.7, R.H * 0.2, '#7EC8E3', 26); }
        if (k.kind === 'hr') R.shake = 8;
      }
      if (L.playT >= tl.dur) {
        if (g.playKind === 'inplay') applyPlay(g);
        L.ff = false;
        g.phase = 'result'; g.phaseT = 0;
      }
      break;
    }
    case 'result': {
      const wait = g.play ? 1.3 : 0.85;
      if (g.phaseT >= wait) afterPitch();
      break;
    }
    case 'half':
      if (g.phaseT >= 1.6) {
        g.banner = null;
        const brk = g.half === 0 && !g.over; // a full inning just ended
        if (brk && (state.settings.facts || state.mode === 'spring') && !g.autoBreak && !g.chal) {
          state.breakFact = pickFact(state.mode === 'season' && state.season && state.season.phase === 'bracket' && state.season.bracket.round === 2 ? 'finals' : state.mode);
          g.phase = 'pre'; g.phaseT = 0;
          go('break', false);
          return;
        }
        g.phase = 'pre'; g.phaseT = 0;
      }
      break;
    default: break;
  }
  processEvents(g);
}

function afterComplete(r) {
  const g = state.game, L = state.live;
  g.playKind = r;
  if (r === 'inplay' || r === 'foulplay') {
    g.phase = 'play'; g.phaseT = 0; L.playT = 0; L.calls = 0; L.snap = true; R.cam = null;
    state.lastReplay = { play: g.play, half: g.half }; // kept for the replay (it never touches game state)
    hitFlash();
  } else { g.phase = 'result'; g.phaseT = 0; g.play = null; if (r !== 'foul') play('pop'); }
}

function afterPitch() {
  const g = state.game, ch = state.chal;
  const c = g.chal && challenge(g.chal);
  if (c && c.kind === 'practice') { practiceAfter(g, c); return; }
  if (c && c.kind === 'ump') { umpAfter(g, c); return; }
  if (c && c.kind === 'sit') {
    const t = ch.tally;
    if (g.over || g.halfOver) {
      const homeLead = g.teams[0].score - g.teams[1].score;
      t.won = (c.metric === 'walkoff' && g.over && g.winner === 0) || (c.metric === 'door' && homeLead > 0 && g.halfOver);
      t.kept = homeLead >= 0; t.inningOver = !!g.halfOver || g.over; t.runs = g.teams[1].score - ch.startScore[1];
      t.oneTwoThree = g.paNo - ch.startPA <= 3;
      finishChallenge(t); return;
    }
  }
  if (g.over) return toFinal();
  if (g.halfOver) {
    const over = endHalf(g);
    if (over) return toFinal();
    g.phase = 'half'; g.phaseT = 0;
    g.banner = g.half === 1 ? `Middle of the ${UI.ordinal(g.inning)}` : `End of the ${UI.ordinal(g.inning - 1)}`;
    announce(g.banner);
    render();
    return;
  }
  g.phase = 'pre'; g.phaseT = 0; g.play = null; g.swing = null;
}

function practiceAfter(g, c) {
  const t = state.chal.tally;
  const lp = g.play && g.playKind === 'inplay' ? g.lastPlay : null;
  t.pitches++;
  if (lp && lp.hit) t.hits++;
  if (c.id === 'gator' && (g.swing || g.playKind === 'inplay' || g.playKind === 'foul')) {
    if (lp && lp.hr) { t.points += lp.gator ? 2 : 1; t.hr = (t.hr || 0) + 1; if (lp.gator) t.splash = (t.splash || 0) + 1; }
    else t.outs++;
  }
  if (lp && lp.hr) { t.longest = Math.max(t.longest, lp.dist); state.save.records.longest = Math.max(state.save.records.longest, lp.dist); if (lp.gator) state.save.records.splashes++; }
  // reset the practice situation
  g.outs = 0; g.balls = 0; g.strikes = 0; g.bases = [null, null, null]; g.halfOver = false; g.over = false; g.half = 1;
  if (c.slugger) g.teams[0].order = 3;
  g.phase = 'pre'; g.phaseT = 0; g.play = null; g.swing = null;
  const done = c.outs ? t.outs >= c.outs || t.pitches >= 40 : t.pitches >= c.pitches;
  if (done) finishChallenge();
}
function umpAfter(g, c) {
  const t = state.chal.tally;
  t.pitches++;
  g.balls = 0; g.strikes = 0; g.outs = 0; g.bases = [null, null, null]; g.halfOver = false;
  g.phase = 'pre'; g.phaseT = 0; g.play = null;
  if (t.pitches >= c.pitches) finishChallenge();
}
function umpCall(call) {
  const g = state.game;
  if (!g || !g.umpire || g.phase !== 'umpwait') return;
  const truth = inZone(g.pitch.px, g.pitch.pz) ? 'strike' : 'ball';
  const ok = truth === call;
  if (ok) state.chal.tally.correct++;
  g.lastCall = `${ok ? 'Right call' : 'Missed it'}: ${truth}${ok ? '' : ` (you called ${call})`}`;
  announce(g.lastCall);
  play(ok ? 'safe' : 'groan');
  g.phase = 'result'; g.phaseT = 0; g.play = null; g.result = { kind: 'ump' };
  render();
}

function toFinal() {
  const g = state.game;
  g.phase = 'done';
  const won = g.user >= 0 && g.winner === g.user;
  if (won) { play('win'); fxConfetti(); } else if (g.user >= 0) play('groan');
  if (g.longest > state.save.records.longest) state.save.records.longest = g.longest;
  state.save.records.splashes += g.gator || 0;
  persist();
  go('final', false);
}

// Sounds, announcements and effects from engine events.
let pendingGrade = null;
function processEvents(g) {
  for (const e of g.ev) {
    if ((e.type === 'crack' || e.type === 'whiff') && pendingGrade) { showGrade(pendingGrade); pendingGrade = null; }
    if (e.type === 'say') { announce(e.text); if (e.kind === 'strike') play('strike'); else if (e.kind === 'ball') play('ball'); }
    else if (e.type === 'crack') play(e.grade === 'WAY EARLY' || e.grade === 'WAY LATE' ? 'foul' : 'crack', { q: e.q });
    else if (e.type === 'whiff') play('whiff');
    else if (e.type === 'run') play('cheer');
    else if (e.type === 'played' && e.runs >= 2) play('organ');
    else if (e.type === 'walkoff') play('win');
    else if (e.type === 'sub') play('click');
    else if (e.type === 'swing') pendingGrade = e.grade; // shown at bat-ball contact (or the miss), not at the press
    else if (e.type === 'windup') { const gr = $('#grade'); if (gr) gr.hidden = true; }
  }
  g.ev.length = 0;
}
let gradeTimer = 0;
function showGrade(text) {
  const el = $('#grade');
  if (!el) return;
  el.textContent = text; el.className = `grade g-${text.split(' ').pop().toLowerCase()}`; el.hidden = false;
  clearTimeout(gradeTimer); gradeTimer = setTimeout(() => { el.hidden = true; }, 900);
}

// ---------------------------------------------------------------- user intents
function primary() {
  const g = state.game;
  if (!g || state.scene !== 'game') return false;
  unlock();
  if (state.replay) { endReplay(); return true; }
  if (g.phase === 'play') { state.live.ff = true; return true; }
  if (userPitches(g) && g.phase === 'pre') {
    if (state.settings.autoMeter) { throwPitch(0.75); return true; }
    if (!g.meter) { g.meter = { t: 0, done: false }; play('meter'); }
    else if (!g.meter.done) releaseMeter(meterAcc(g.meter.t / 1.1));
    render(); return true;
  }
  if (userBats(g) && g.phase === 'flight') { userSwing(g); return true; }
  return false;
}
const meterAcc = (v) => { const d = v < 0.78 ? 0.78 - v : v > 0.86 ? v - 0.86 : 0; return clamp(1 - d / 0.35, 0, 1); };
function releaseMeter(acc) { const g = state.game; g.meter.done = true; g.meter.acc = acc; throwPitch(acc); }
function throwPitch(acc, o = {}) {
  const g = state.game, P = pitcher(g);
  const type = o.type || P.reps[clamp(g.sel, 0, P.reps.length - 1)];
  startPitch(g, { type, target: o.target || { ...g.target }, acc, exact: !!o.exact });
  g.meter = null;
  play('click');
}
function selectPitch(i) {
  const g = state.game;
  if (!g || !userPitches(g) || g.phase !== 'pre' || g.meter) return;
  const P = pitcher(g);
  if (i < P.reps.length) { g.sel = i; announce(`${PITCHES[P.reps[i]].name} selected`); render(); }
}
function toggleBunt() { const g = state.game; if (g && userBats(g) && g.phase === 'pre') { g.bunt = !g.bunt; announce(g.bunt ? 'Bunt on' : 'Bunt off'); render(); } }
function callSteal() { const g = state.game; if (g && userBats(g) && g.phase === 'pre' && stealable(g)) { g.stealCall = !g.stealCall; announce(g.stealCall ? 'Runner goes with the pitch' : 'Steal off'); render(); } }

// ---------------------------------------------------------------- scenes
const OVER_GAME = new Set(['game', 'pause', 'break', 'final', 'chalResult']);
const SCREENS = {
  title: UI.titleScreen, select: UI.selectScreen, spring: UI.springScreen, seasonSetup: UI.seasonSetupScreen, hub: UI.hubScreen, bracket: UI.bracketScreen,
  challenges: UI.challengesScreen, chalIntro: (st) => UI.chalIntro(st, challenge(st.chalPending)), chalResult: UI.chalResult, album: UI.albumScreen,
  help: UI.helpScreen, settings: UI.settingsScreen, pause: UI.pauseScreen, break: UI.breakScreen, final: UI.finalScreen, champion: UI.championScreen,
};
function go(scene, push = true) {
  if (push && state.scene !== scene) state.stack.push(state.scene);
  else if (!push) state.stack = scene === 'help' || scene === 'settings' ? state.stack : [];
  state.scene = scene;
  const keep = ['help', 'settings'].includes(scene) && state.stack.includes('pause');
  if (!OVER_GAME.has(scene) && !keep) { state.game = null; }
  document.body.dataset.scene = scene;
  render(true);
  kickLoop();
}
function back() { const prev = state.stack.pop() || 'title'; state.scene = prev; document.body.dataset.scene = prev; render(true); kickLoop(); }

let enterTimer = 0;
function render(enter = false) {
  const scr = $('#screen'), sc = state.scene;
  const f = SCREENS[sc];
  if (f && sc !== 'game') {
    scr.hidden = false;
    scr.innerHTML = f(state);
    if (enter && !R.reduced) {
      // busy until the panel's entry animation really ends (a slow frame can delay its start), with a fallback
      scr.classList.add('enter'); state.busy = 1; clearTimeout(enterTimer);
      const done = () => { clearTimeout(enterTimer); scr.classList.remove('enter'); state.busy = 0; };
      const panel = scr.querySelector('.panel');
      if (panel) panel.addEventListener('animationend', done, { once: true });
      enterTimer = setTimeout(done, panel ? 900 : 230);
    }
    if (enter) focusFirst(scr);
  } else { scr.hidden = true; scr.innerHTML = ''; }
  const g = state.game, inGame = !!g && OVER_GAME.has(sc);
  if (sc !== 'game') { const gr = $('#grade'); if (gr) gr.hidden = true; }
  $('#sb').hidden = !inGame; $('#pad').hidden = !inGame || sc !== 'game'; $('#b-pause').hidden = !inGame || sc !== 'game';
  if (inGame) hud();
  draw();
}
function focusFirst(scr) {
  for (const sel of ['[data-act="continue"]', '[data-act="resume"]', '.btn.primary', '.tab[aria-selected="true"]', 'button']) {
    const el = scr.querySelector(sel);
    if (el) { try { el.focus({ preventScroll: true }); } catch (e) { el.focus(); } return; }
  }
}

let lastHud = '';
function hud() {
  const g = state.game, B = batter(g), P = pitcher(g), bt = battingTeam(g).bat[B.id];
  const info = { pitcher: `${P.last}`, pc: fieldingTeam(g).pc[P.id] || 0, pcs: (fieldingTeam(g).pc[P.id] || 0) === 1 ? 'pitch' : 'pitches', batter: `${B.num} ${B.last}`, line: bt.ab || bt.bb ? `${bt.h}-for-${bt.ab}` : 'first time up' };
  const sb = UI.scoreboard(g, info);
  const role = g.umpire ? 'ump' : g.phase === 'play' || state.replay ? 'play' : userPitches(g) ? 'pitch' : userBats(g) ? 'bat' : 'watch';
  const pad = UI.pad(role, g, { canSteal: !!stealable(g) && g.phase === 'pre', pitcher: P });
  const key = sb + pad + (g.banner || '') + (g.lastCall || '') + (state.replay ? 'R' : '');
  if (key === lastHud) return;
  lastHud = key;
  $('#sb').innerHTML = sb;
  $('#pad').innerHTML = pad;
  $('#pad').dataset.role = role;
  const ban = $('#banner');
  const text = state.replay ? 'Replay' : g.phase === 'half' ? g.banner : g.phase === 'result' && !g.play ? g.lastCall : g.phase === 'umpwait' ? 'Ball or strike?' : null;
  ban.hidden = !text; ban.textContent = text || '';
  const tip = $('#tip');
  tip.textContent = role === 'bat' ? (state.settings.aim === 'aim' ? 'Arrows/mouse: aim · Space: swing · B: bunt · S: steal' : 'Space or click: swing · B: bunt · S: steal') : role === 'pitch' ? `1-${P.reps.length}: pitch · arrows/mouse: target · Space twice: meter` : role === 'ump' ? 'B: ball · S: strike' : role === 'play' ? 'F or Space: fast-forward' : '';
}

// Drawing: in 3D the WebGL view renders first and this canvas adds overlays. Outside the game loop,
// draw requests are coalesced into one animation frame (tests step the sim many times per frame).
let drawQueued = 0, inFrame = false;
function draw() {
  if (!R.c) return;
  if (use3d() && !inFrame) {
    if (drawQueued) return;
    // software GL (a frame costs ~100 ms): gather bursts of state changes into one redraw
    if (R3.soft) drawQueued = setTimeout(() => { drawQueued = 0; drawNow(); }, 120);
    else drawQueued = requestAnimationFrame(() => { drawQueued = 0; drawNow(); });
    return;
  }
  drawNow();
}
function drawNow() {
  begin();
  let g = state.game, u = g ? ui() : null;
  const inGame = g && OVER_GAME.has(state.scene);
  if (inGame && state.replay) { // replay: the saved play on a stand-in game object, from another camera
    g = Object.assign(Object.create(g), { play: state.replay.play, half: state.replay.half, phase: 'play' });
    u = { ...u, playT: state.replay.t, replay: true };
  }
  const field = inGame && (g.phase === 'play' || (g.phase === 'result' && g.play)) && g.play;
  if (use3d()) render3d(inGame ? (field ? 'field' : 'duel') : 'title', inGame ? g : null, u, R.reduced ? 0 : state.titleT);
  if (inGame) { if (field) drawField(g, u); else drawDuel(g, u); }
  else if (state.scene === 'title' || !g) drawTitle(R.reduced ? null : state.titleT);
  else clear();
}
// Graphics: the 3D view when it loaded and the player wants it, else the classic 2D canvas.
const use3d = () => R3.ok && state.settings.gfx !== '2d';
function applyGfx() {
  const on = use3d();
  R.p3 = on ? p3 : null; R.s2p = on ? screenToPlate3 : null;
  document.body.classList.toggle('gl', on);
  const c = document.getElementById('gl'); if (c) c.hidden = !on;
  if (state.settings.gfx !== '2d' && !R3.ok && !R3.loading && !R3.failed && want3d()) init3d($('#stage'), on3d, ART);
}
function on3d() {
  applyGfx();
  if (state.game && OVER_GAME.has(state.scene)) hud();
  draw(); // canvases only: menus keep their DOM (and any entry animation) as they are
}

// ---------------------------------------------------------------- loop
let raf = 0, last = 0, acc = 0, titleN = 0;
function wantsLoop() {
  if (state.scene === 'title') return !R.reduced;
  return state.scene === 'game' && !!state.game && !state.paused;
}
function kickLoop() { if (!raf && wantsLoop()) { last = performance.now(); acc = 0; raf = requestAnimationFrame(frame); } }
function frame(now) {
  raf = 0;
  if (!wantsLoop()) { draw(); return; }
  const dt = Math.min(0.1, (now - last) / 1000); last = now;
  inFrame = true;
  if (state.scene === 'title') { // the flyover; on software GL only every fourth frame, so menus stay responsive
    state.titleT += dt; titleN++;
    if (!R3.soft || !use3d() || titleN % 4 === 0) drawNow();
    inFrame = false; raf = requestAnimationFrame(frame); return;
  }
  acc += dt;
  let n = 0;
  while (acc >= DT && n < 6) { tickOnce(); acc -= DT; n++; }
  if (state.scene === 'game') { hud(); drawNow(); }
  inFrame = false;
  raf = requestAnimationFrame(frame);
}
function tickOnce() {
  if (state.scene !== 'game' || !state.game) return;
  if (state.replay) { state.replay.t += DT; if (state.replay.t >= state.replay.play.out.timeline.dur + 0.4) endReplay(); stepFx(DT); return; }
  liveTick();
  stepFx(DT);
}

// ---------------------------------------------------------------- clicks and keys
let padTouch = -1e9;
function onClick(e) {
  const el = e.target.closest('[data-act]');
  if (!el || el.disabled) return;
  if (e.type === 'click' && el.closest('#pad') && performance.now() - padTouch < 700) return;
  unlock();
  const act = el.dataset.act, arg = el.dataset.arg;
  const S = state.settings;
  const setS = (k, v) => { S[k] = v; applySettings(); persist(); render(); };
  play('click');
  switch (act) {
    case 'title': go('title', false); break;
    case 'back': back(); break;
    case 'help': go('help'); break;
    case 'helpTab': state.helpTab = arg; render(); { const t = $(`.tab[data-arg="${arg}"]`); if (t) t.focus(); } break;
    case 'settings': go('settings'); break;
    case 'select': go('select'); break;
    case 'springSetup': go('spring'); break;
    case 'challenges': go('challenges', false); break;
    case 'album': go('album'); break;
    case 'seasonSetup': go('seasonSetup'); break;
    case 'continueSeason': case 'hub': go('hub', false); break;
    case 'bracket': go('bracket', false); break;
    case 'pickHome': state.pick.home = arg; render(); break;
    case 'pickAway': state.pick.away = arg; render(); break;
    case 'pickSide': state.pick.side = arg; render(); break;
    case 'pickPark': state.pick.park = arg; render(); break;
    case 'pickSchool': state.pick.school = arg; render(); break;
    case 'pickLength': state.pick.length = arg; render(); break;
    case 'pickClub': state.pick.club = arg; render(); break;
    case 'startExhibition': newExhibition(); break;
    case 'startSpring': newSpring(); break;
    case 'startSeason': startSeason(); break;
    case 'playSeason': playSeasonGame(); break;
    case 'simSeason': simSeason(false); break;
    case 'simToBracket': simSeason(true); break;
    case 'afterSeasonGame': afterSeasonGame(); break;
    case 'chal': state.chalPending = arg; go('chalIntro', false); break;
    case 'chalGo': startChallenge(state.chalPending); break;
    case 'primary': primary(); break;
    case 'pitchType': selectPitch(+arg); break;
    case 'bunt': toggleBunt(); break;
    case 'steal': callSteal(); break;
    case 'skip': if (state.replay) endReplay(); else if (state.game && state.game.phase === 'play') state.live.ff = true; break;
    case 'replay': startReplay(); break;
    case 'ump': umpCall(arg); break;
    case 'pause': pauseGame(); break;
    case 'resume': case 'continue': resumeGame(); break;
    case 'quit': go(state.mode === 'season' ? 'hub' : state.mode === 'challenge' ? 'challenges' : 'title', false); break;
    case 'box': state.showBox = !state.showBox; render(); break;
    case 'rematch': if (state.mode === 'spring') newSpring({ ...state.lastOpts, seed: undefined }); else if (state.mode === 'challenge') startChallenge(state.chal.c.id); else newExhibition({ ...state.lastOpts, seed: undefined }); break;
    case 'setSound': setS('sound', arg === '1'); break;
    case 'setVol': setS('vol', +arg); break;
    case 'setMotion': setS('motion', arg); break;
    case 'setTheme': setS('theme', arg); break;
    case 'setText': setS('text', +arg); break;
    case 'setDiff': setS('difficulty', arg); break;
    case 'setAim': setS('aim', arg); break;
    case 'setSpeed': setS('pitchSpeed', arg); break;
    case 'setInnings': setS('innings', +arg); break;
    case 'setSpringInn': setS('springInnings', +arg); break;
    case 'setRunRule': setS('runRule', arg === '1'); break;
    case 'setAggr': setS('aggr', arg); break;
    case 'setZone': setS('zone', arg === '1'); break;
    case 'setRing': setS('ring', arg === '1'); break;
    case 'setMeter': setS('autoMeter', arg === '1'); break;
    case 'setFacts': setS('facts', arg === '1'); break;
    case 'setGfx': setS('gfx', arg); applyGfx(); draw(); break;
    default: break;
  }
}
function pauseGame() { if (state.scene !== 'game') return; state.paused = true; go('pause'); }
// Replay the last ball in play from a low first-base-side camera; play resumes where it was.
function startReplay() {
  const g = state.game;
  if (!g || !state.lastReplay || state.replay || !['pre', 'half'].includes(g.phase)) return false;
  state.replay = { ...state.lastReplay, t: 0 };
  if (state.scene !== 'game') { state.paused = false; state.stack = []; state.scene = 'game'; document.body.dataset.scene = 'game'; render(true); }
  announce('Replay'); lastHud = ''; hud(); kickLoop(); return true;
}
function endReplay() { state.replay = null; lastHud = ''; if (state.game) hud(); draw(); }
function resumeGame() { state.paused = false; state.stack = []; state.scene = 'game'; document.body.dataset.scene = 'game'; render(true); kickLoop(); }

function onKey(k, e) {
  const inScreen = state.scene !== 'game';
  if (k === 'escape') {
    if (state.scene === 'game') { pauseGame(); return true; }
    if (state.scene === 'pause' || state.scene === 'break') { resumeGame(); return true; }
    if (['help', 'settings'].includes(state.scene)) { back(); return true; }
    if (['select', 'spring', 'seasonSetup', 'challenges', 'album', 'hub'].includes(state.scene)) { go('title', false); return true; }
    return false;
  }
  if (inScreen) return false; // buttons handle Space/Enter themselves
  const g = state.game;
  if (g && g.umpire) { if (k === 'bunt') { umpCall('ball'); return true; } if (k === 'steal') { umpCall('strike'); return true; } }
  switch (k) {
    case 'primary': return primary();
    case 'p0': case 'p1': case 'p2': case 'p3': selectPitch(+k[1]); return true;
    case 'bunt': toggleBunt(); return true;
    case 'steal': callSteal(); return true;
    case 'skip': if (state.replay) endReplay(); else if (g && g.phase === 'play') state.live.ff = true; return true;
    case 'replay': return startReplay();
    case 'pause': pauseGame(); return true;
    default: return ['left', 'right', 'up', 'down'].includes(k);
  }
}
function aimAt(sx, sy, type) {
  const g = state.game;
  if (!g || state.scene !== 'game') return;
  const p = screenToPlate(sx, sy);
  if (userPitches(g) && g.phase === 'pre') { g.target.x = clamp(p.x, -2, 2); g.target.z = clamp(p.z, 0.6, 4.4); }
  else if (userBats(g) && state.settings.aim === 'aim' && g.phase !== 'play') { g.aimX = clamp(p.x, -1.6, 1.6); g.aimZ = clamp(p.z, 1.0, 4.0); }
  if (!raf) draw();
}

const live = () => $('#live');
let lastSaid = '';
function announce(text) { if (!text || text === lastSaid) return; lastSaid = text; const el = live(); if (el) el.textContent = text; }
function fxConfetti() { state.fxN = confetti(); if (state.fxN && !raf) { const tick = () => { stepFx(1 / 60); begin(); draw(); if (R.fx.length) requestAnimationFrame(tick); }; requestAnimationFrame(tick); } }

// ---------------------------------------------------------------- test hooks
function snapshot() {
  const g = state.game;
  let gs = null;
  if (g) {
    const B = batter(g), P = pitcher(g);
    gs = {
      mode: g.mode, inning: g.inning, half: g.half, outs: g.outs, balls: g.balls, strikes: g.strikes, bases: g.bases.map((b) => !!b), baseIds: g.bases.slice(),
      score: [g.teams[0].score, g.teams[1].score], hits: [g.teams[0].hits, g.teams[1].hits], errors: [g.teams[0].errors, g.teams[1].errors],
      line: g.teams.map((t) => t.line.slice()), phase: g.phase, phaseT: +g.phaseT.toFixed(3), user: g.user, userBats: userBats(g), userPitches: userPitches(g),
      batter: { id: B.id, name: fullName(B), bats: B.bats, pos: B.pos }, pitcher: { id: P.id, name: fullName(P), reps: P.reps.slice(), velo: P.velo, count: fieldingTeam(g).pc[P.id] || 0, stamina: P.stamina },
      pitch: g.pitch ? { type: g.pitch.type, mph: g.pitch.mph, px: +g.pitch.px.toFixed(3), pz: +g.pitch.pz.toFixed(3), target: g.pitch.target, acc: g.pitch.acc, T: g.pitch.T, bx: g.pitch.bx, bz: g.pitch.bz, inZone: inZone(g.pitch.px, g.pitch.pz) } : null,
      swing: g.swing ? { u: +g.swing.u.toFixed(3), grade: g.swing.grade, bunt: !!g.swing.bunt } : null, aiSwing: !!g.aiSwing, result: g.result ? { ...g.result } : null,
      lastCall: g.lastCall, lastPlay: g.lastPlay, playKind: g.playKind, playDur: g.play ? g.play.out.timeline.dur : 0, playT: state.live.playT,
      over: g.over, winner: g.winner, walkoff: g.walkoff, runRuled: g.runRuled, halfOver: !!g.halfOver, park: g.park, innings: g.rules.innings, scale: g.scale,
      sel: g.sel, target: g.target, aim: { x: g.aimX, z: g.aimZ }, meter: g.meter, bunt: g.bunt, stealCall: g.stealCall, steal: g.steal || null, log: g.log.slice(-8),
      teams: g.teams.map((t) => ({ key: t.key, name: t.team.name, abbr: t.team.abbr, fictional: !!t.team.fictional, club: !!t.team.club, cls: t.team.cls, players: t.roster.map(fullName), pitcherIdx: t.pitcher, used: t.used.slice() })),
      banner: g.banner, longest: g.longest, gator: g.gator, umpire: !!g.umpire, chal: g.chal || null, night: !!g.night, W: g.pitch ? windowGame(g) : null, flightT: g.pitch ? flightTime(g) : null,
    };
  }
  return {
    scene: state.scene, mode: state.mode, settings: { ...state.settings }, reduced: R.reduced, loop: !!raf || wantsLoop(), storage: store.ok, paused: state.paused,
    game: gs, season: state.season ? JSON.parse(JSON.stringify(state.season)) : null, stars: { ...state.save.stars }, album: state.save.album.slice(), trophies: state.save.trophies.slice(), records: { ...state.save.records },
    chal: state.chal ? { id: state.chal.c.id, tally: { ...state.chal.tally } } : null, chalResult: state.chalResult ? { id: state.chalResult.c.id, stars: state.chalResult.stars, text: state.chalResult.text } : null,
    breakFact: state.breakFact ? state.breakFact.id : null, fx: R.fx.length, view: { W: R.W, H: R.H }, pick: { ...state.pick },
    replay: state.replay ? { t: +state.replay.t.toFixed(3) } : null, canReplay: !!state.lastReplay,
    gfx: { mode: use3d() ? '3d' : '2d', quality: R3.quality, governed: R3.governed || 0, reason: R3.reason, view: R3.view, art: ART_READY.slice(), loading: R3.loading, park: R3.parkKey || null, cam: R3.view === 'duel' ? R3.camKind : R3.view, actors: R3.visible || 0, gpu: R3.gpu || '' },
  };
}

window.__game = {
  seed(n) { state.seed = n | 0; return true; },
  getState: () => snapshot(),
  setState(s) {
    if (s.settings) { Object.assign(state.settings, s.settings); applySettings(); persist(); }
    if (s.game && state.game) { applySituation(state.game, s.game); if (s.game.phase) { state.game.phase = s.game.phase; state.game.phaseT = 0; } }
    if (s.pick) Object.assign(state.pick, s.pick);
    render();
    return snapshot();
  },
  isIdle: () => !state.busy && !R3.loading && !drawQueued,
  step(n = 1) { for (let i = 0; i < n; i++) tickOnce(); if (state.scene === 'game') hud(); draw(); return snapshot(); },
  pause() { state.paused = true; return true; },
  resume() { state.paused = false; kickLoop(); return true; },
  scene(name) {
    if (['game', 'pause', 'break', 'final'].includes(name) && !state.game) newExhibition({ paused: true, seed: 3 });
    if (name === 'hub' || name === 'bracket') { if (!state.season) startSeason({ seed: 2 }); }
    if (name === 'final' && state.game && !state.game.over) { simToEnd(state.game); state.game.phase = 'done'; }
    if (name === 'break' && !state.breakFact) state.breakFact = FACTS_LIST[0];
    if (name === 'chalIntro' && !state.chalPending) state.chalPending = 'school';
    if (name === 'game') { state.paused = true; state.scene = 'game'; document.body.dataset.scene = 'game'; render(true); return snapshot(); }
    if (name === 'spring') { go('spring'); return snapshot(); }
    go(name, ['help', 'settings'].includes(name));
    return snapshot();
  },
  newGame(o = {}) {
    if (o.seed != null) state.seed = o.seed;
    if (o.mode === 'season') { startSeason(o); return snapshot(); }
    if (o.mode === 'spring') newSpring(o);
    else if (o.mode === 'challenge') startChallenge(o.id, o);
    else newExhibition(o);
    if (o.paused) state.paused = true;
    return snapshot();
  },
  act(name, ...a) {
    const g = state.game;
    switch (name) {
      case 'primary': primary(); break;
      case 'pitchType': selectPitch(a[0]); break;
      case 'aim': if (g) { if (userPitches(g)) g.target = { x: a[0], z: a[1] }; else { g.aimX = a[0]; g.aimZ = a[1]; } } break;
      case 'throw': if (g && g.phase === 'pre') { const o = a[0] || {}; if (o.type) { const i = pitcher(g).reps.indexOf(o.type); if (i >= 0) g.sel = i; } throwPitch(o.acc ?? 0.75, { type: o.type, target: o.x != null ? { x: o.x, z: o.z } : null, exact: !!o.exact }); } break;
      case 'aiPitch': state.live.aiForce = a[0] || { x: 0, z: 2.5 }; break;
      case 'swingAt': if (g && g.phase === 'flight') { // swing now with an exact timing error u (windows) and aim offset
        const W = windowGame(g), Tg = flightTime(g);
        g.phaseT = Math.max(g.phaseT, Tg + (a[0] || 0) * W - SWING_LAG * g.scale);
        const o = a[1] || {};
        userSwing(g, o.dx != null ? { x: g.pitch.px + o.dx, z: g.pitch.pz - (o.dz || 0) } : null);
      } break;
      case 'contact': if (g) g.forceContact = a[0]; break;
      case 'bunt': if (g) { g.bunt = a[0] ?? !g.bunt; } break;
      case 'steal': callSteal(); break;
      case 'skip': if (g && g.phase === 'play') { state.live.playT = g.play.out.timeline.dur; } break;
      case 'ump': umpCall(a[0]); break;
      case 'simGame': {
        const opts = a[0] || {};
        const sg = makeGame({ home: opts.home || 'hot-springs', away: opts.away || 'lakeside', user: 'none', seed: opts.seed ?? 9, innings: opts.innings ?? 7 });
        simToEnd(sg);
        return { score: [sg.teams[0].score, sg.teams[1].score], over: sg.over, inning: sg.inning, hits: [sg.teams[0].hits, sg.teams[1].hits], pa: sg.paNo };
      }
      case 'simNext': if (state.season) simSeason(false); break;
      case 'simToBracket': if (state.season) simSeason(true); break;
      case 'confetti': fxConfetti(); break;
      case 'chal': startChallenge(a[0], a[1] || {}); break;
      case 'tick': for (let i = 0; i < (a[0] || 1); i++) tickOnce(); break;
      case 'replay': startReplay(); if (state.replay && a[0] != null) state.replay.t = a[0]; break;
      case 'probe3d': { // plate point → screen → plate through the live camera (tests the overlay projection)
        if (!R.p3) return { error: 'no 3D' };
        drawNow(); const p = R.p3(a[0], 0, a[1]), q = R.s2p(p[0], p[1]); const z = zoneRect(); return { sx: p[0], sy: p[1], x: q.x, z: q.z, zone: z, W: R.W, H: R.H };
      }
      default: return { error: `unknown act ${name}` };
    }
    if (state.scene === 'game') hud();
    draw();
    return snapshot();
  },
};

// ---------------------------------------------------------------- boot
function boot() {
  restore();
  try { window.localStorage.setItem('hsg-diamond-probe', '1'); window.localStorage.removeItem('hsg-diamond-probe'); state.storageOk = true; } catch (e) { state.storageOk = false; store.ok = false; }
  applySettings();
  initRender($('#cv'));
  document.addEventListener('click', onClick);
  initInput($('#cv'), { key: onKey, aimAt });
  $('#b-pause').addEventListener('click', () => pauseGame());
  // touch: pad buttons act on touch-down (no click delay for the swing); the following click is ignored
  $('#pad').addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse') return;
    const el = e.target.closest('[data-act]');
    if (!el || el.disabled) return;
    e.preventDefault();
    padTouch = performance.now();
    onClick({ target: el });
  });
  window.addEventListener('resize', () => { resize(); resize3d(); draw(); });
  try { window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applySettings); window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', () => { applySettings(); kickLoop(); }); } catch (e) { /* old browsers */ }
  document.addEventListener('visibilitychange', () => { if (document.hidden && state.scene === 'game') pauseGame(); });
  go('title', false);
  if (state.settings.gfx !== '2d' && want3d()) init3d($('#stage'), on3d, ART);
}
boot();
export { state };
