// Swing → batted ball. Timing error u is measured in "windows" (W = the GOOD half-window), so the
// same model serves the player (real input), the AI batter (sampled error) and the balance tool.
import { clamp, rnd, norm } from './util.js';
import { ZONE, outside, inZone } from './pitch.js';

export const DIFF = { rookie: 1.35, varsity: 1.0, allstate: 0.8 };
export const SWING_LAG = 0.1; // real seconds from the press to the bat reaching the plate
export const cursorHalf = (b) => 0.33 + 0.12 * b.contact;

// Good half-window in real seconds.
export const windowSec = (b, diff = 1) => 0.04 * (0.85 + 0.35 * b.contact) * diff;

export function grade(u) {
  const a = Math.abs(u);
  if (a <= 0.4) return 'PERFECT';
  if (a <= 0.9) return 'GOOD';
  if (a <= 1.7) return u < 0 ? 'EARLY' : 'LATE';
  return u < 0 ? 'WAY EARLY' : 'WAY LATE';
}

// Where the auto-aim cursor sits relative to the ball: the cursor can't leave a band around the zone,
// so chasing pitches far off the plate misses or mis-hits.
export function autoAim(o, pitch) {
  const cx = clamp(pitch.px, -(ZONE.x + 0.2), ZONE.x + 0.2) + norm(o) * 0.14;
  const cz = clamp(pitch.pz, ZONE.z0 - 0.2, ZONE.z1 + 0.2);
  let vb = 0.02;
  if (pitch.pz < 2.2) vb -= 0.07; else if (pitch.pz > 3.0) vb += 0.06;
  if (pitch.type === 'CB' || pitch.type === 'CH') vb -= 0.05;
  return { dx: cx - pitch.px, dz: pitch.pz - cz + vb + norm(o) * 0.22 };
}

// The batted ball. side: +1 right-handed batter (late swings go to right field), −1 left-handed.
export function contact(o, { u, dx, dz, batter, pitch, bunt }) {
  const side = batter.bats === 'L' ? -1 : 1;
  const cw = cursorHalf(batter);
  const g = grade(u);
  if (bunt) {
    if (Math.abs(u) > 2.6 || Math.abs(dx) > cw + 0.25 || Math.abs(dz) > 0.7) return { kind: 'whiff', grade: g };
    const foulP = 0.22 + (inZone(pitch.px, pitch.pz) ? 0 : 0.25);
    if (rnd(o) < foulP) return { kind: 'foul', grade: g, bunt: true };
    return { kind: 'inplay', grade: g, bunt: true, ev: 18 + rnd(o) * 14, la: -14 + rnd(o) * 18, spray: clamp(norm(o) * 15 + side * 4, -40, 40), q: 0.3 };
  }
  if (Math.abs(u) > 1.7 || Math.abs(dx) > cw + 0.1 || Math.abs(dz) > 0.52) return { kind: 'whiff', grade: g };
  if (Math.abs(u) > 1.2 && rnd(o) < (Math.abs(u) - 1.2) / 0.5) return { kind: 'whiff', grade: g }; // barely early/late: usually a miss
  const q = Math.max(0, 1 - (Math.abs(u) / 1.7) ** 1.25) * (1 - 0.6 * (dx / (cw + 0.1)) ** 2) * (1 - 0.35 * (dz / 0.52) ** 2);
  const spray = side * u * 30 + norm(o) * 9;
  if (q < 0.12 || Math.abs(spray) > 46 || rnd(o) < clamp(0.72 - 0.55 * q, 0.15, 0.65)) return { kind: 'foul', grade: g, q, spray, tip: q < 0.12 };
  let la = 13 + 62 * dz + norm(o) * (11 + 5 * Math.abs(u));
  let ev = (90 + 28 * batter.power) * (0.46 + 0.54 * q) + 0.15 * (pitch.mph - 78) + norm(o) * 3;
  if (la > 45 || la < -12) ev *= 0.85;
  la = clamp(la, -35, 80);
  return { kind: 'inplay', grade: g, q, ev: clamp(ev, 20, 112), la, spray };
}

// AI batter: swing decision and its sampled swing.
export function aiDecide(o, batter, pitch, balls, strikes, diff = 1) {
  const d = outside(pitch.px, pitch.pz);
  let p;
  if (d === 0) p = 0.66 + (strikes === 2 ? 0.2 : 0) - (balls === 3 && strikes < 2 ? 0.12 : 0) - (balls === 0 && strikes === 0 ? 0.1 : 0);
  else p = (0.34 * (1 - batter.eye) + 0.1 + (strikes === 2 ? 0.14 : 0)) * Math.exp(-d / 0.5);
  if (rnd(o) >= p) return null;
  const dec = pitch.deception * (diff || 1);
  const u = norm(o) * 0.68 * (1.45 - batter.contact) * dec;
  const sgn = rnd(o) < 0.5 ? -1 : 1;
  const dx = sgn * (Math.abs(norm(o)) * 0.27 * (1.4 - batter.contact) * dec + 0.5 * Math.max(0, Math.abs(pitch.px) - ZONE.x));
  let vb = 0.02;
  if (pitch.pz < 2.2) vb -= 0.07; else if (pitch.pz > 3.0) vb += 0.06;
  if (pitch.type === 'CB' || pitch.type === 'CH') vb -= 0.05;
  const vOut = pitch.pz < ZONE.z0 ? pitch.pz - ZONE.z0 : pitch.pz > ZONE.z1 ? pitch.pz - ZONE.z1 : 0;
  const dz = vb + norm(o) * 0.2 * dec + vOut * 0.55;
  return { u, dx, dz };
}
