// Field geometry in feet. Home plate at (0,0); +y toward center field; +x toward first base.
// Spray angle θ in degrees: 0 = straight away center, −45 = left-field line, +45 = right-field line.
export const D2R = Math.PI / 180;
export const BASES = [[0, 0], [63.64, 63.64], [0, 127.28], [-63.64, 63.64]]; // home, 1B, 2B, 3B
export const MOUND = [0, 60.5];

// Fences: distance (ft) and height (ft) at θ = −45, −22.5, 0, 22.5, 45.
// Only the historic-style park's 340 / 400 / 260 come from a source (Whittington Park, Wikipedia via
// research/baseball-spring-training.md); every other number is a game dimension.
export const PARKS = {
  home: { key: 'home', name: 'Home field', dist: [320, 355, 380, 355, 320], height: [8, 8, 8, 8, 8], surface: 'grass', note: 'game dimensions' },
  majestic: { key: 'majestic', name: 'Majestic Park', dist: [330, 365, 395, 365, 330], height: [10, 10, 10, 10, 10], surface: 'turf', note: 'game dimensions; rebuilt 2021, five fields, 1,500 seats' },
  historic: { key: 'historic', name: 'Historic-style park', dist: [340, 372, 400, 318, 260], height: [10, 10, 12, 18, 24], surface: 'grass', note: 'after Whittington Park: 340 ft left, 400 ft center, 260 ft right; fence heights are game values', gator: true },
};

function interp(arr, th) {
  const u = (Math.max(-45, Math.min(45, th)) + 45) / 22.5;
  const i = Math.min(3, Math.floor(u)), f = u - i;
  const s = (1 - Math.cos(f * Math.PI)) / 2;
  return arr[i] + (arr[i + 1] - arr[i]) * s;
}
export const fenceDist = (park, th) => interp(park.dist, th);
export const fenceHeight = (park, th) => interp(park.height, th);
export const angleOf = (x, y) => Math.atan2(x, y) / D2R;
export const polar = (r, th) => [r * Math.sin(th * D2R), r * Math.cos(th * D2R)];
export const isFairXY = (x, y) => y >= -0.5 && Math.abs(angleOf(x, y)) <= 45;

// Fielder starting spots by position for a park.
export function spots(park) {
  const of = (th, k) => polar(fenceDist(park, th) * k, th);
  return {
    P: [0, 58], C: [0, -3.5], '1B': polar(108, 37), '2B': polar(146, 14), SS: polar(146, -13), '3B': polar(110, -37),
    LF: of(-28, 0.8), CF: of(0, 0.8), RF: of(28, park.dist[4] < 300 ? 0.86 : 0.8),
  };
}
export const FIELD_POS = ['P', 'C', '1B', '2B', 'SS', '3B', 'LF', 'CF', 'RF'];
export const INFIELD = new Set(['P', 'C', '1B', '2B', 'SS', '3B']);
