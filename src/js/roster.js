// Fictional roster generator. Names are random pairings from generic pools; nothing comes from a real
// roster. Ratings are 0..1 game values (not real statistics).
import { hash, rnd, rint, pick, gauss, clamp, shuffle } from './util.js';
import { CLASS_RANK } from './data.js';

const FIRST = ['Avery', 'Bennett', 'Cal', 'Dante', 'Eli', 'Finn', 'Gabe', 'Hollis', 'Isaiah', 'Jalen', 'Kai', 'Landon', 'Marcus', 'Nico', 'Omar', 'Pierce', 'Quinn', 'Reid', 'Silas', 'Tate', 'Uriel', 'Vance', 'Wes', 'Xavier', 'Yusuf', 'Zeke', 'Andre', 'Brooks', 'Cyrus', 'Dorian', 'Ezra', 'Grady', 'Jace', 'Keon', 'Luis', 'Malik', 'Rowan', 'Theo', 'Darius', 'Mateo', 'Colt', 'Emmett', 'Hayden', 'Javier', 'Knox', 'Rafael', 'Sully', 'Trey'];
// Spring Training clubs get old-fashioned generic first names (no nicknames of real players).
const FIRST_OLD = ['Amos', 'Clement', 'Elmer', 'Horace', 'Otis', 'Virgil', 'Wendell', 'Chester', 'Harlan', 'Lyman', 'Ambrose', 'Rufus', 'Silas', 'Ezra', 'Homer', 'Jasper', 'Luther', 'Milo', 'Orville', 'Percy', 'Royal', 'Thaddeus', 'Wilbur', 'Arlo', 'Cyrus', 'Emory', 'Gideon', 'Ira', 'Lowell', 'Ned'];
const LAST = ['Abbott', 'Alvarez', 'Barlow', 'Beck', 'Bishop', 'Boone', 'Brennan', 'Calloway', 'Cantrell', 'Carver', 'Castillo', 'Coleman', 'Crane', 'Dalton', 'Delgado', 'Ellison', 'Farris', 'Fenwick', 'Fuller', 'Garrison', 'Greer', 'Hale', 'Harlan', 'Hayes', 'Holloway', 'Ingram', 'Jennings', 'Keller', 'Kirby', 'Lang', 'Lowell', 'Maddox', 'Mercer', 'Monroe', 'Nash', 'Navarro', 'Okafor', 'Pace', 'Pruitt', 'Quarles', 'Ramsey', 'Reyes', 'Rhodes', 'Sawyer', 'Sloan', 'Stroud', 'Talley', 'Tatum', 'Underwood', 'Vaughn', 'Voss', 'Whitaker', 'Wilder', 'Yates', 'Zamora', 'Pickett', 'Odum', 'Lyle', 'Doss', 'Embry', 'Ashby', 'Corley', 'Driscoll', 'Faulk', 'Gentry', 'Hollins', 'Kimbrough', 'Lockett', 'Mabry', 'Pittman', 'Satterfield', 'Tolliver'];
const SKIN = ['#F1C9A5', '#E0AC86', '#C68863', '#A86B45', '#7D4A2A', '#5A3420'];
const POS = ['C', '1B', '2B', 'SS', '3B', 'LF', 'CF', 'RF', 'DH'];
// Position rating biases: [contact, power, eye, speed, glove, arm]
const BIAS = {
  C: [-0.02, 0.03, 0, -0.1, 0.04, 0.08], '1B': [0.02, 0.1, 0.02, -0.08, -0.02, -0.06], '2B': [0.04, -0.06, 0.03, 0.05, 0.06, -0.02],
  SS: [0.02, -0.04, 0, 0.07, 0.1, 0.08], '3B': [0, 0.05, 0, -0.02, 0.04, 0.08], LF: [0.02, 0.05, 0, 0.02, -0.03, -0.04],
  CF: [0.03, 0, 0.03, 0.12, 0.08, 0.04], RF: [0, 0.07, 0, 0, 0, 0.1], DH: [0.04, 0.1, 0.02, -0.06, -0.15, -0.1],
};
const BASE = { 6: 0.6, 5: 0.57, 4: 0.53, 3: 0.5, 2: 0.47 };

// key: team key, cls: classification ('5A'…) or null (fictional: by tier), seed: roster seed, old: Spring Training names
export function makeRoster(teamKey, cls, seed = 1, o = {}) {
  const r0 = { rs: hash(`dia|${teamKey}|${seed}`) | 0 };
  const base = cls ? BASE[CLASS_RANK[cls] || 4] : (o.base ?? 0.53);
  const lasts = shuffle(r0, LAST.slice());
  const firsts = shuffle(r0, (o.old ? FIRST_OLD : FIRST).slice());
  const nums = shuffle(r0, Array.from({ length: 40 }, (_, i) => i + 1));
  const players = [];
  const rate = (lvl, b) => clamp(lvl + b + gauss(r0) * 0.07, 0.12, 0.97);
  for (let i = 0; i < 12; i++) {
    const pitcher = i >= 9;
    const pos = pitcher ? 'P' : POS[i];
    const lvl = clamp(base + gauss(r0) * 0.06 + (i === 9 ? 0.04 : 0), 0.25, 0.9);
    const b = BIAS[pos] || [0, 0, 0, 0, 0, 0];
    const p = {
      id: `${teamKey}-${i}`, first: firsts[i], last: lasts[i], num: nums[i], pos,
      grade: pick(r0, [9, 10, 11, 11, 12, 12]),
      bats: rnd(r0) < 0.3 ? 'L' : 'R', throws: rnd(r0) < (pitcher ? 0.28 : 0.1) ? 'L' : 'R',
      contact: rate(lvl, b[0]), power: rate(lvl - 0.04, b[1]), eye: rate(lvl, b[2]), speed: rate(lvl, b[3]),
      glove: rate(lvl + 0.04, b[4]), arm: rate(lvl, b[5]),
      skin: pick(r0, SKIN),
    };
    if (pitcher) {
      p.velo = Math.round(clamp(74 + (lvl - 0.4) * 22 + gauss(r0) * 2.5, 72, 90));
      p.control = rate(lvl, 0.02); p.stuff = rate(lvl, 0);
      p.stamina = i === 9 ? rint(r0, 90, 110) : rint(r0, 40, 60);
      const extra = shuffle(r0, ['CH', 'CB', 'SL']);
      p.reps = ['FB', ...extra.slice(0, i === 9 ? 3 : 2)];
      p.role = i === 9 ? 'SP' : 'RP';
    }
    p.ovr = Math.round(100 * (pitcher ? (p.control + p.stuff + (p.velo - 70) / 20) / 3 : (p.contact * 1.3 + p.power + p.eye * 0.7 + p.speed * 0.5 + p.glove * 0.5) / 4));
    players.push(p);
  }
  return players;
}

// Batting order for the nine position players (indices into the roster): speed + eye leads off,
// best hitters 2-4, then the rest.
export function makeLineup(roster) {
  const bats = roster.slice(0, 9).map((p, i) => ({ i, lead: p.speed * 0.5 + p.eye * 0.3 + p.contact * 0.4, hit: p.contact * 0.6 + p.power * 0.7 + p.eye * 0.2 }));
  const lead = bats.slice().sort((a, b) => b.lead - a.lead)[0];
  const rest = bats.filter((b) => b !== lead).sort((a, b) => b.hit - a.hit);
  return [lead.i, rest[1].i, rest[0].i, rest[2].i, ...rest.slice(3).map((b) => b.i)];
}

export const fullName = (p) => `${p.first} ${p.last}`;
export const teamRating = (roster) => Math.round(roster.reduce((a, p) => a + p.ovr, 0) / roster.length);
