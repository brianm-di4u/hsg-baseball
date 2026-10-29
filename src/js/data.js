// Team and venue definitions: the seven real Garland County schools (setting only, from
// shared/data/schools.json), fictional out-of-county towns, the two fictional Spring Training clubs,
// and the parks. Player-facing facts come from data/facts.json (audited bank ids).
import { contrast, shade } from './util.js';

/* global SCHOOLS, FACTS */
const RAW = typeof SCHOOLS !== 'undefined' ? SCHOOLS : globalThis.SCHOOLS;
const FACT_RAW = typeof FACTS !== 'undefined' ? FACTS : globalThis.FACTS;

export const CLASS_RANK = { '6A': 6, '5A': 5, '4A': 4, '3A': 3, '2A': 2 };

export const COUNTY = RAW.schools.map((s) => ({
  key: s.id,
  name: s.name,
  short: s.short,
  abbr: s.abbr,
  city: s.city,
  mascot: s.mascot,
  mascotConcept: s.mascotConcept,
  colorNames: s.colorNames,
  colorsConfirmed: s.colorsConfirmed,
  colors: { ...s.colors },
  cls: s.classification.baseball,
  tier: s.tier,
  crest: s.id,
  fictional: false,
  // schools.json lists no confirmed baseball field names: always show the generic text
  field: `${s.short} home field`,
  fieldNote: s.venues && s.venues.baseball && s.venues.baseball.note ? s.venues.baseball.note : null,
}));

// Fictional towns (shared list with Spa City Hoops). None is a real school.
const TOWNS = [
  ['cinderbrook', 'Cinderbrook', 'Foxes', '#8A3B12', '#F2C14E'],
  ['quartz-hollow', 'Quartz Hollow', 'Miners', '#3D4A57', '#E3E6EA'],
  ['bluemist', 'Bluemist', 'Herons', '#1D5F7A', '#BFE3EE'],
  ['ironleaf', 'Ironleaf', 'Owls', '#2F3B2A', '#C9B458'],
  ['hollowpine', 'Hollowpine', 'Hawks', '#20553A', '#E8DDBF'],
  ['redclay', 'Redclay', 'Bison', '#7E2A1E', '#E7D3B0'],
  ['kettle-ford', 'Kettle Ford', 'Otters', '#4A3A6B', '#E9B949'],
  ['marrow-creek', 'Marrow Creek', 'Badgers', '#2B2B2B', '#D96C3A'],
  ['ambergrove', 'Ambergrove', 'Comets', '#5B2C83', '#F0A830'],
  ['lanternfield', 'Lanternfield', 'Knights', '#183A63', '#D9D9D9'],
  ['copperbend', 'Copperbend', 'Coyotes', '#6A3B1F', '#DDA15E'],
  ['fernhaven', 'Fernhaven', 'Falcons', '#245E52', '#F4E3B2'],
  ['saltlick', 'Saltlick', 'Rangers', '#5C1F2E', '#C7CED6'],
  ['thistledown', 'Thistledown', 'Stags', '#3E2F5B', '#9FD3C7'],
];
const abbrOf = (town) => (town.includes(' ') ? town.split(' ').map((w) => w[0]).join('') : town.slice(0, 3).toUpperCase());
export const FICTIONAL = TOWNS.map(([key, town, mascot, primary, secondary]) => ({
  key, name: `${town} High School`, short: town, abbr: abbrOf(town), city: `${town} (fictional town)`, mascot,
  mascotConcept: 'monogram shield', colorNames: null, colorsConfirmed: false, colors: { primary, secondary, accent: '#FFFFFF' },
  cls: null, tier: 'mid', crest: 'mono', fictional: true, field: `${town} field`, fieldNote: null,
}));

// Spring Training mode: two invented barnstorming clubs in cream wool (linen-postcard palette).
export const CLUBS = [
  { key: 'steam-valley', name: 'Steam Valley Nine', short: 'Steam Valley', abbr: 'SVN', city: 'fictional barnstorming club', mascot: 'Nine',
    colors: { primary: '#1F2F5C', secondary: '#F3E9D2', accent: '#C8452B' }, crest: 'mono', fictional: true, club: true, cls: null, tier: 'mid', field: 'historic-style park' },
  { key: 'barnstormers', name: 'Ouachita Barnstormers', short: 'Barnstormers', abbr: 'OBS', city: 'fictional barnstorming club', mascot: 'Barnstormers',
    colors: { primary: '#8E2F1F', secondary: '#F3E9D2', accent: '#1F2F5C' }, crest: 'mono', fictional: true, club: true, cls: null, tier: 'mid', field: 'historic-style park' },
];

const ALL = new Map([...COUNTY, ...FICTIONAL, ...CLUBS].map((t) => [t.key, t]));
export const team = (key) => ALL.get(key);
export const allTeams = () => [...ALL.values()];

export const RIVALRIES = RAW.rivalries.map((r) => ({ teams: r.teams, label: r.label }));
export function rivalry(a, b) {
  return RIVALRIES.find((r) => r.teams.includes(a) && r.teams.includes(b)) || null;
}

export const FINALS = {
  name: RAW.venues.baseballFinals.name,
  facts: RAW.venues.baseballFinals.facts.slice(),
  semis: 'Lakeside High School',
};
export const FACTS_LIST = (FACT_RAW && FACT_RAW.facts) || [];
export const fact = (id) => FACTS_LIST.find((f) => f.id === id) || null;

// Uniforms. Home wears light, away wears dark; Spring Training clubs wear cream wool with colored trim.
export function kitFor(t, side) {
  const c = t.colors;
  if (t.club) return { jersey: '#EFE4CB', trim: c.primary, num: c.primary, pants: '#E6D9BC', cap: c.primary, sock: c.accent, light: true, wool: true };
  const light = '#F4F1EA';
  if (side === 'home') {
    const num = contrast(c.primary, light) >= 3 ? c.primary : shade(c.primary, -0.5);
    return { jersey: light, trim: c.primary, num, pants: light, cap: c.primary, sock: c.primary, light: true };
  }
  const num = contrast(c.secondary, c.primary) >= 3 ? c.secondary : '#FFFFFF';
  return { jersey: c.primary, trim: c.secondary, num, pants: '#D9D4C8', cap: c.primary, sock: c.primary, light: false };
}
