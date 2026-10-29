// Batted-ball flight: fixed-step drag + lift (concept after Nathan's trajectory calculator; our own
// game coefficients), bounces, roll, fence and wall. Samples are [t, x, y, z] every 1/60 s.
import { fenceDist, fenceHeight, angleOf, D2R, MOUND } from './park.js';

const G = 32.17, KD = 0.0019, KL = 0.00055, DT = 1 / 120;
const ROLL = { grass: 9, turf: 7 }, DIRT = 15;

export function fly(park, ev, la, spray) {
  const v0 = ev * 1.4667;
  const vh0 = v0 * Math.cos(la * D2R);
  let x = 0, y = 2, z = 3;
  let vx = vh0 * Math.sin(spray * D2R), vy = vh0 * Math.cos(spray * D2R), vz = v0 * Math.sin(la * D2R);
  const lift = la > 4 ? KL : 0;
  const out = [];
  let t = 0, k = 0, bounces = 0, rolling = false, landed = null, hr = false, hrDist = 0, wall = false, grd = false, foulDecided = null;
  let decide = null; // sample index where fair/foul is decided
  while (t < 12) {
    if (k % 2 === 0) out.push([+t.toFixed(4), x, y, z]);
    k++;
    const s = Math.hypot(vx, vy, vz), vh = Math.hypot(vx, vy);
    if (!rolling) {
      vx += (-KD * s * vx) * DT; vy += (-KD * s * vy) * DT;
      vz += (-G - KD * s * vz + (bounces === 0 ? lift * s * vh : 0)) * DT;
    } else {
      const r0 = Math.hypot(x - MOUND[0], y - MOUND[1]);
      const dec = (r0 < 95 && park.surface !== 'turf' ? DIRT : ROLL[park.surface] || 11) * DT;
      if (vh <= dec) { vx = vy = 0; out.push([+(t + DT).toFixed(4), x, y, 0]); break; }
      vx -= vx / vh * dec; vy -= vy / vh * dec;
    }
    x += vx * DT; y += vy * DT; z += vz * DT; t += DT;
    const r = Math.hypot(x, y), th = angleOf(x, y);
    if (z <= 0 && !rolling) {
      z = 0;
      if (!landed) landed = { t, x, y, r, th, i: out.length };
      bounces++;
      if (Math.abs(vz) > 5 && bounces < 6) { const keep = Math.abs(vz) < 0.35 * vh ? 0.88 : 0.72; vz = -vz * (park.surface === 'turf' ? 0.42 : 0.36); vx *= keep; vy *= keep; }
      else { vz = 0; rolling = true; }
    }
    // fair/foul: a ball landing beyond the bases is decided where it lands; otherwise when it passes the bases
    if (decide === null) {
      if (landed && landed.r > 95) { decide = landed.i; foulDecided = Math.abs(landed.th) > 45; }
      else if (landed && r > 95) { decide = out.length; foulDecided = Math.abs(th) > 45; }
    }
    if (Math.abs(th) <= 46 && r >= fenceDist(park, th) && !hr && !grd && !wall) {
      const H = fenceHeight(park, th);
      if (z > H) {
        if (!landed) { hr = true; } else { grd = true; out.push([+t.toFixed(4), x, y, z]); break; }
      } else {
        wall = true;
        const ux = x / r, uy = y / r, vr = vx * ux + vy * uy, tx = -uy, ty = ux, vt = vx * tx + vy * ty;
        const nvr = -0.35 * vr, nvt = 0.6 * vt;
        vx = nvr * ux + nvt * tx; vy = nvr * uy + nvt * ty; vz *= 0.5;
        const R = fenceDist(park, th) - 0.6; x = ux * R; y = uy * R;
      }
    }
    if (hr && z <= 0) { hrDist = Math.hypot(x, y); out.push([+t.toFixed(4), x, y, 0]); break; }
    if (foulDecided && landed) { out.push([+t.toFixed(4), x, y, z]); break; } // dead ball
    if (r > 600) break;
  }
  if (decide === null) { // stopped in the infield: decided where it rests
    const last = out[out.length - 1];
    decide = out.length - 1; foulDecided = Math.abs(angleOf(last[1], last[2])) > 45 || last[2] < 0;
  }
  return { s: out, landed, hr, hrDist: hr ? Math.round(hrDist) : 0, wall, groundRule: grd, foul: !hr && foulDecided, decide, ev, la, spray };
}

// Ball state at time t (linear between samples).
export function ballAt(f, t) {
  const s = f.s;
  if (t <= s[0][0]) return { x: s[0][1], y: s[0][2], z: s[0][3] };
  for (let i = 1; i < s.length; i++) {
    if (s[i][0] >= t) {
      const a = s[i - 1], b = s[i], u = (t - a[0]) / (b[0] - a[0] || 1);
      return { x: a[1] + (b[1] - a[1]) * u, y: a[2] + (b[2] - a[2]) * u, z: a[3] + (b[3] - a[3]) * u };
    }
  }
  const l = s[s.length - 1];
  return { x: l[1], y: l[2], z: l[3] };
}
