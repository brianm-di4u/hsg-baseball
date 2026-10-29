// Season: a spring schedule against county schools and fictional towns, simple standings, and an
// 8-team state bracket in the school's classification. Semifinals at Lakeside High School and the
// final at Majestic Park (the 2026 co-hosts). Other teams' games are quick rating draws.
import { COUNTY, FICTIONAL, team, kitFor, CLASS_RANK } from './data.js';
import { makeRoster, teamRating } from './roster.js';
import { hash, rnd, shuffle } from './util.js';
import { createGame, simToEnd } from './game.js';

export const ROUNDS = ['Quarterfinal', 'Semifinal', 'State final'];
export const ROUND_SITE = (r, homeKey) => (r === 0 ? `${team(homeKey).short} home field` : r === 1 ? 'Lakeside High School (2026 co-host)' : 'Majestic Park');

// Roster for a team in a season (fictional towns take the user's class).
export function sideFor(key, cls, seed, side) {
  const t = team(key);
  const roster = makeRoster(key, t.cls || cls, seed, { old: !!t.club, base: t.club ? 0.56 : undefined });
  return { team: t, roster, kit: kitFor(t, side) };
}
const rating = (key, cls, seed) => teamRating(makeRoster(key, team(key).cls || cls, seed));

export function createSeason({ school, length = 'short', seed = 1 }) {
  const me = team(school), o = { rs: hash(`season|${school}|${seed}`) | 0 };
  const county = shuffle(o, COUNTY.filter((t) => t.key !== school).map((t) => t.key));
  const towns = shuffle(o, FICTIONAL.map((t) => t.key));
  const n = length === 'full' ? 14 : 8;
  const nc = length === 'full' ? 6 : 4;
  const opps = [...county.slice(0, nc), ...towns.slice(0, n - nc)];
  shuffle(o, opps);
  const league = [school, ...new Set(opps)].slice(0, 8);
  const S = {
    v: 1, school, cls: me.cls, seed, length, rs: o.rs, week: 0, w: 0, l: 0, phase: 'regular', done: false, champion: false,
    games: opps.map((opp, i) => ({ opp, home: i % 2 === 0, played: false, us: 0, them: 0 })),
    table: Object.fromEntries(league.map((k) => [k, { w: 0, l: 0 }])), bracket: null,
  };
  return S;
}

export const nextGame = (S) => (S.phase === 'regular' ? S.games.find((x) => !x.played) : S.phase === 'bracket' ? S.bracket.cur : null);

// Record the user's result, play the rest of the week by ratings, advance the phase.
export function recordResult(S, us, them) {
  const g = nextGame(S);
  if (!g) return;
  g.played = true; g.us = us; g.them = them;
  const won = us > them;
  if (S.phase === 'regular') {
    won ? S.w++ : S.l++;
    const tb = S.table;
    if (tb[S.school]) won ? tb[S.school].w++ : tb[S.school].l++;
    if (tb[g.opp]) won ? tb[g.opp].l++ : tb[g.opp].w++;
    const others = Object.keys(tb).filter((k) => k !== S.school && k !== g.opp);
    shuffle(S, others);
    for (let i = 0; i + 1 < others.length; i += 2) {
      const a = others[i], b = others[i + 1];
      const pa = 0.5 + (rating(a, S.cls, S.seed) - rating(b, S.cls, S.seed)) / 40;
      if (rnd(S) < pa) { tb[a].w++; tb[b].l++; } else { tb[b].w++; tb[a].l++; }
    }
    S.week++;
    if (S.games.every((x) => x.played)) startBracket(S);
  } else if (S.phase === 'bracket') {
    const B = S.bracket;
    g.played = true; g.won = won;
    won ? S.w++ : S.l++;
    B.results.push({ round: B.round, a: S.school, b: g.opp, us, them, won });
    if (!won) { S.phase = 'over'; S.done = true; B.out = B.round; simRestOfBracket(S); return; }
    if (B.round === 2) { S.phase = 'over'; S.done = true; S.champion = true; return; }
    advanceBracket(S);
  }
}

function startBracket(S) {
  const o = { rs: hash(`bracket|${S.school}|${S.seed}`) | 0 };
  const sameClass = COUNTY.filter((t) => t.cls === S.cls && t.key !== S.school).map((t) => t.key);
  const towns = shuffle(o, FICTIONAL.map((t) => t.key));
  const field = [S.school, ...sameClass, ...towns].slice(0, 8);
  // seeds: the user by win %, others by rating
  const pct = S.w / Math.max(1, S.w + S.l);
  const scored = field.map((k) => ({ k, s: k === S.school ? 0.35 + pct * 0.5 : 0.4 + (rating(k, S.cls, S.seed) - 50) / 60 + rnd(o) * 0.15 }));
  scored.sort((a, b) => b.s - a.s);
  const seeds = scored.map((x) => x.k);
  const pairs = [[0, 7], [3, 4], [2, 5], [1, 6]].map(([a, b]) => [seeds[a], seeds[b]]);
  S.bracket = { seeds, rounds: [pairs], results: [], round: 0, cur: null, out: null };
  S.phase = 'bracket';
  setCur(S);
}
function setCur(S) {
  const B = S.bracket, pair = B.rounds[B.round].find((p) => p.includes(S.school));
  const opp = pair[0] === S.school ? pair[1] : pair[0];
  const higher = B.seeds.indexOf(S.school) < B.seeds.indexOf(opp);
  B.cur = { opp, home: B.round === 0 ? higher : higher, round: B.round, site: ROUND_SITE(B.round, higher ? S.school : opp), venue: B.round === 2 ? 'majestic' : 'home', played: false, us: 0, them: 0 };
}
function quickWinner(S, a, b) {
  const pa = 0.5 + (rating(a, S.cls, S.seed) - rating(b, S.cls, S.seed)) / 40;
  return rnd(S) < pa ? a : b;
}
function advanceBracket(S) {
  const B = S.bracket, pairs = B.rounds[B.round];
  const winners = pairs.map((p) => (p.includes(S.school) ? S.school : quickWinner(S, p[0], p[1])));
  B.rounds[B.round].winners = winners;
  B.winners = B.winners || [];
  B.winners[B.round] = winners;
  const next = [];
  for (let i = 0; i < winners.length; i += 2) next.push([winners[i], winners[i + 1]]);
  B.round++;
  B.rounds[B.round] = next;
  setCur(S);
}
function simRestOfBracket(S) {
  const B = S.bracket;
  B.winners = B.winners || [];
  for (let r = B.round; r < 3; r++) {
    const pairs = B.rounds[r];
    const w = pairs.map((p) => (r === B.round && p.includes(S.school) ? (p[0] === S.school ? p[1] : p[0]) : quickWinner(S, p[0], p[1])));
    B.winners[r] = w;
    if (r < 2) { const next = []; for (let i = 0; i < w.length; i += 2) next.push([w[i], w[i + 1]]); B.rounds[r + 1] = next; }
  }
  B.champ = B.winners[2] && B.winners[2][0];
}

// Simulate the user's next game instantly with the real engine.
export function simUserGame(S, innings = 7) {
  const gm = nextGame(S);
  if (!gm) return null;
  const home = gm.home ? S.school : gm.opp, away = gm.home ? gm.opp : S.school;
  const g = createGame({ home: sideFor(home, S.cls, S.seed, 'home'), away: sideFor(away, S.cls, S.seed, 'away'), seed: hash(`${S.school}|${S.week}|${S.phase}|${S.w}${S.l}`), innings, user: -1, park: gm.venue === 'majestic' ? 'majestic' : 'home' });
  simToEnd(g);
  const us = gm.home ? g.teams[0].score : g.teams[1].score, them = gm.home ? g.teams[1].score : g.teams[0].score;
  recordResult(S, us, them);
  return { us, them };
}

export function standings(S) {
  return Object.entries(S.table).map(([k, r]) => ({ k, ...r, pct: r.w / Math.max(1, r.w + r.l) })).sort((a, b) => b.pct - a.pct || b.w - a.w);
}
export { CLASS_RANK };
