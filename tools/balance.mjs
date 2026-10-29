#!/usr/bin/env node
// Plays N full AI-vs-AI games with the real rules engine in Node and checks the PRD §8 targets.
// Also plays a simulated human hitter (timing σ in windows, auto aim) to check the batting window.
// Exit 1 if a game fails to finish or a metric is outside its target.
//   node tools/balance.mjs [games=200] [innings=7]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const game = path.resolve(here, '..');
globalThis.SCHOOLS = JSON.parse(fs.readFileSync(path.join(game, 'shared/data/schools.json'), 'utf8'));
globalThis.FACTS = JSON.parse(fs.readFileSync(path.join(game, 'data/facts.json'), 'utf8'));
const imp = (f) => import(pathToFileURL(path.join(game, 'src/js', f)).href);
const { COUNTY, FICTIONAL, kitFor } = await imp('data.js');
const { makeRoster } = await imp('roster.js');
const { createGame, autoPitch } = await imp('game.js');

const N = +(process.argv[2] || 200), INN = +(process.argv[3] || 7);
const teams = [...COUNTY, ...FICTIONAL];
const side = (t, s, seed) => ({ team: t, roster: makeRoster(t.key, t.cls, seed), kit: kitFor(t, s) });

function run(n, proxy) {
  const A = { g: 0, runs: 0, pa: 0, ab: 0, h: 0, k: 0, bb: 0, hbp: 0, hr: 0, e: 0, dp: 0, pitches: 0, sb: 0, cs: 0, homeW: 0, extra: 0, rr: 0, d: 0, tr: 0, sf: 0, maxRuns: 0, shut: 0, bad: 0, userPA: 0, userH: 0, userAB: 0, userK: 0, bip: 0, ev: 0, la: 0, gb: 0, ld: 0, fb: 0, bh: 0, gbh: 0, ldh: 0, fbh: 0 };
  for (let i = 0; i < n; i++) {
    const a = teams[i % teams.length], b = teams[(i * 7 + 3) % teams.length] === a ? teams[(i + 1) % teams.length] : teams[(i * 7 + 3) % teams.length];
    const g = createGame({ home: side(a, 'home', 1), away: side(b, 'away', 1), seed: 5000 + i, innings: INN, user: proxy ? 1 : -1, park: i % 5 === 4 ? 'majestic' : 'home' });
    let dps = 0;
    const origLen = g.log.length; void origLen;
    let n = 0;
    while (!g.over && n++ < 1500) {
      const r = autoPitch(g, proxy); g.ev.length = 0;
      if (r === 'inplay' && g.lastPlay) { const p = g.lastPlay; A.bip++; A.ev += p.ev; A.la += p.la; const ty = p.la < 10 ? 'gb' : p.la < 25 ? 'ld' : 'fb'; A[ty]++; if (p.hit && p.hit < 4) { A.bh++; A[ty + 'h']++; } }
    }
    for (const l of g.log) if (/double play/i.test(l)) dps++;
    if (!g.over) { A.bad++; continue; }
    A.g++;
    for (const T of g.teams) {
      A.runs += T.score; A.e += T.errors; A.maxRuns = Math.max(A.maxRuns, T.score); if (T.score === 0) A.shut++;
      for (const s of Object.values(T.bat)) { A.pa += s.pa; A.ab += s.ab; A.h += s.h; A.k += s.k; A.bb += s.bb; A.hbp += s.hbp; A.hr += s.hr; A.sb += s.sb; A.cs += s.cs; A.d += s.d; A.tr += s.tr; A.sf += s.sf; }
      for (const s of Object.values(T.pit)) A.pitches += s.pc;
      if (proxy && T.side === 1) for (const s of Object.values(T.bat)) { A.userPA += s.pa; A.userH += s.h; A.userAB += s.ab; A.userK += s.k; }
    }
    A.dp += dps;
    if (g.winner === 0) A.homeW++;
    if (g.inning > INN) A.extra++;
    if (g.runRuled) A.rr++;
  }
  return A;
}

const t0 = Date.now();
const A = run(N, null);
const tg = A.g * 2;
const M = {
  'runs/team/game': [A.runs / tg, 4.0, 6.5],
  'batting avg': [A.h / A.ab, 0.25, 0.31],
  'K per PA': [A.k / A.pa, 0.15, 0.24],
  'BB+HBP per PA': [(A.bb + A.hbp) / A.pa, 0.08, 0.13],
  'HR/team/game': [A.hr / tg, 0.2, 0.8],
  'errors/team/game': [A.e / tg, 0.3, 1.5],
  'DP/team/game': [A.dp / tg, 0.2, 1.0],
  'pitches/team/game': [A.pitches / tg, 95, 135],
  'SB success': [A.sb / Math.max(1, A.sb + A.cs), 0.6, 0.85],
  'home win %': [A.homeW / A.g, 0.45, 0.6],
};
console.log(`${A.g}/${N} games finished, ${INN} innings, ${((Date.now() - t0) / 1000).toFixed(1)} s`);
let fail = A.bad > 0;
for (const [k, [v, lo, hi]] of Object.entries(M)) {
  const ok = v >= lo && v <= hi;
  if (!ok) fail = true;
  console.log(`${ok ? 'ok  ' : 'OUT '} ${k.padEnd(20)} ${v < 5 ? v.toFixed(3) : v.toFixed(1)}   target ${lo}–${hi}`);
}
console.log(`info: BIP ${A.bip}, avg EV ${(A.ev / A.bip).toFixed(1)} mph, LA ${(A.la / A.bip).toFixed(1)}°, GB/LD/FB ${(100 * A.gb / A.bip).toFixed(0)}/${(100 * A.ld / A.bip).toFixed(0)}/${(100 * A.fb / A.bip).toFixed(0)}%, BABIP ${(A.bh / (A.bip - A.hr)).toFixed(3)} (GB ${(A.gbh / A.gb).toFixed(3)}, LD ${(A.ldh / A.ld).toFixed(3)}, FB ${(A.fbh / A.fb).toFixed(3)})`);
console.log(`info: doubles ${(A.d / tg).toFixed(2)}, triples ${(A.tr / tg).toFixed(2)}, SF ${(A.sf / tg).toFixed(2)}, SB att ${((A.sb + A.cs) / tg).toFixed(2)}/team/game, extra-inning games ${A.extra}, run-rule games ${A.rr}, shutouts ${A.shut}, max runs ${A.maxRuns}`);

// simulated human at Varsity, Normal pitch speed: timing σ 50 ms of screen time, auto aim
const U = run(Math.min(N, 120), { sigmaT: 0.05, chase: 0.4 });
const uba = U.userH / U.userAB, uk = U.userK / U.userPA;
const uok = uba >= 0.22 && uba <= 0.34 && uk <= 0.3;
if (!uok) fail = true;
console.log(`${uok ? 'ok  ' : 'OUT '} simulated player (σ 50 ms): BA ${uba.toFixed(3)} (target .220–.340), K ${(uk * 100).toFixed(1)}% (≤ 30%)`);
for (const s of [0.03, 0.08]) { const V = run(60, { sigmaT: s, chase: 0.4 }); console.log(`info: simulated player σ ${s * 1000} ms: BA ${(V.userH / V.userAB).toFixed(3)}, K ${(100 * V.userK / V.userPA).toFixed(1)}%`); }
if (fail) { console.log('\nOUTLIERS PRESENT'); process.exit(1); }
console.log('\nall metrics in range');
