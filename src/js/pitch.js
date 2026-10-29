// Pitch types, location with control error, and the duel-view path. Plate coordinates in feet from
// the catcher's view: x across (+ = first-base side), z up from the ground.
import { gauss, clamp, rnd } from './util.js';

export const ZONE = { x: 0.83, z0: 1.55, z1: 3.45 }; // plate half-width incl. ball radius; knees to letters
export const PITCHES = {
  FB: { key: 'FB', name: 'Fastball', dv: 0, bx: -0.15, bz: 0.1, arc: 1.1 },
  CH: { key: 'CH', name: 'Changeup', dv: -9, bx: -0.38, bz: -0.5, arc: 1.7 },
  SL: { key: 'SL', name: 'Slider', dv: -7, bx: 0.55, bz: -0.25, arc: 1.4 },
  CB: { key: 'CB', name: 'Curveball', dv: -14, bx: 0.35, bz: -0.9, arc: 2.6 },
};
export const RELEASE = { x: 1.7, y: 54, z: 5.6 };

export const inZone = (px, pz) => Math.abs(px) <= ZONE.x && pz >= ZONE.z0 && pz <= ZONE.z1;
export function outside(px, pz) { // distance outside the zone rectangle (0 inside)
  const dx = Math.max(0, Math.abs(px) - ZONE.x), dz = Math.max(0, ZONE.z0 - pz, pz - ZONE.z1);
  return Math.hypot(dx, dz);
}

// Fatigue: 0 fresh, rising past 85% of stamina.
export function fatigue(p, count) {
  return clamp((count - p.stamina * 0.85) / (p.stamina * 0.4), 0, 1);
}

// Build a pitch. target {x,z}; acc 0..1 meter accuracy (AI uses its own); exact skips control error.
export function makePitch(o, pitcher, type, target, acc, count, exact = false) {
  const P = PITCHES[type] || PITCHES.FB;
  const fat = fatigue(pitcher, count);
  const hand = pitcher.throws === 'L' ? -1 : 1;
  const mph = Math.round((pitcher.velo + P.dv + (acc - 0.5) * 3 - fat * 4 + gauss(o) * 0.8) * 10) / 10;
  const sig = (0.17 + 0.4 * (1 - pitcher.control)) * (1.6 - 0.8 * acc) * (1 + fat * 0.8);
  const brk = 0.7 + 0.6 * pitcher.stuff;
  const bx = P.bx * brk * hand, bz = P.bz * brk;
  const px = exact ? target.x : target.x + gauss(o) * sig;
  const pz = exact ? target.z : target.z + gauss(o) * sig * 0.9;
  const T = 55 / (mph * 1.4667) * 1.04; // real seconds release → plate (slight slowdown)
  return {
    type, mph, px: clamp(px, -3.2, 3.2), pz: clamp(pz, -0.2, 6), T, bx, bz, arc: P.arc,
    relX: -RELEASE.x * hand, relZ: RELEASE.z, target: { ...target }, acc,
    deception: 1 + pitcher.stuff * 0.35 + (acc - 0.5) * 0.3, fat,
  };
}

// Point along the pitch at flight fraction f (0 release → 1 plate): {x, y, z}
export function pitchPoint(p, f) {
  const g = clamp(f, 0, 1.15);
  return {
    x: p.relX + (p.px - p.bx - p.relX) * g + p.bx * g * g,
    y: RELEASE.y * (1 - g),
    z: p.relZ + (p.pz - p.bz - p.relZ) * g + p.bz * g * g + p.arc * 4 * g * (1 - g) * 0.35,
  };
}

// AI pitcher: choose a type and a target region from the count.
export function aiChoosePitch(o, pitcher, balls, strikes, last) {
  const reps = pitcher.reps;
  const w = reps.map((t) => {
    let v = t === 'FB' ? 0.5 : 0.22;
    if (balls >= 2 && strikes < 2 && t === 'FB') v += 0.3; // behind: establish the fastball
    if (strikes === 2 && t !== 'FB') v += 0.15; // ahead: chase pitch
    if (last && last.type === t && t !== 'FB') v *= 0.6;
    return v;
  });
  let r = rnd(o) * w.reduce((a, b) => a + b, 0), type = reps[0];
  for (let i = 0; i < reps.length; i++) { r -= w[i]; if (r <= 0) { type = reps[i]; break; } }
  let zoneP = 0.6;
  if (balls === 3) zoneP = 0.86; else if (balls === 2 && strikes < 2) zoneP = 0.7;
  if (strikes === 2 && balls < 2) zoneP = 0.3;
  const inside = rnd(o) < zoneP;
  let x, z;
  if (inside) { // favor the edges of the zone
    x = (rnd(o) * 2 - 1) * ZONE.x * 0.85; z = ZONE.z0 + 0.15 + rnd(o) * (ZONE.z1 - ZONE.z0 - 0.3);
  } else { // just off the plate, or low for breaking balls
    const s = rnd(o);
    if (type === 'CB' || type === 'CH' || s < 0.3) { x = (rnd(o) * 2 - 1) * 0.7; z = ZONE.z0 - 0.35 - rnd(o) * 0.5; }
    else if (s < 0.75) { x = (rnd(o) < 0.5 ? -1 : 1) * (ZONE.x + 0.15 + rnd(o) * 0.35); z = ZONE.z0 + rnd(o) * (ZONE.z1 - ZONE.z0); }
    else { x = (rnd(o) * 2 - 1) * 0.6; z = ZONE.z1 + 0.3 + rnd(o) * 0.4; }
  }
  // aim the release so the break carries it to the target
  return { type, target: { x, z } };
}
