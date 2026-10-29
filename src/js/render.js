// Canvas rendering: the duel (catcher's camera) and the field (top-down timeline playback).
// Backdrops are cached per size/park; dynamic layers draw every frame while a game scene is live.
import { PARKS, BASES, fenceDist, fenceHeight, polar, spots, FIELD_POS, D2R } from './park.js';
import { ZONE, pitchPoint, RELEASE } from './pitch.js';
import { ballAt } from './flight.js';
import { drawPitcher, drawBatter, drawMini, drawToken, drawGator, planks, shade } from './art.js';
import { cursorHalf } from './contact.js';

const TAU = Math.PI * 2;
export const R = { cv: null, c: null, W: 0, H: 0, dpr: 1, reduced: false, cache: new Map(), fx: [], shake: 0, cam: null, linen: false, time: 0 };

export function initRender(cv) { R.cv = cv; R.c = cv.getContext('2d'); resize(); }
export function resize() {
  const r = R.cv.getBoundingClientRect();
  R.dpr = Math.min(2, window.devicePixelRatio || 1);
  R.W = Math.max(1, Math.round(r.width)); R.H = Math.max(1, Math.round(r.height));
  R.cv.width = Math.round(R.W * R.dpr); R.cv.height = Math.round(R.H * R.dpr);
  R.cache.clear();
}

// ---------------------------------------------------------------- palettes
function parkLook(park, night) {
  if (park.key === 'historic') return { sky: ['#9CC9DE', '#E9DDBB'], grass: '#6C9A45', grass2: '#618D3D', dirt: '#B9875A', wall: '#7A5634', wallTop: '#5A3E24', stands: '#8A6640', lines: '#F3E9D2', trees: '#4F6B3A' };
  if (park.key === 'majestic') return { sky: night ? ['#0E1630', '#3A3560'] : ['#5BA3D9', '#CFE6F2'], grass: '#2F9A4C', grass2: '#278A42', dirt: '#B5653A', wall: '#1E4D3A', wallTop: '#D4A017', stands: '#4A5160', lines: '#FFFFFF', trees: '#2F4F35' };
  return { sky: night ? ['#101830', '#3A4060'] : ['#6FB0E0', '#D6EBF5'], grass: '#3F8A3E', grass2: '#367C36', dirt: '#B5653A', wall: '#2E5436', wallTop: '#E6B422', stands: '#5B6270', lines: '#FFFFFF', trees: '#355E36' };
}

// ---------------------------------------------------------------- duel projection
function duelCam() {
  const W = R.W, H = R.H, portrait = H > W;
  const F = Math.min(H * (portrait ? 1.5 : 1.5), W * (portrait ? 2.4 : 1.2));
  return { cx: W / 2, hy: H * (portrait ? 0.36 : 0.33), F, C: 10, camH: 4.0, portrait };
}
export function proj(cam, X, Y, Z) {
  const d = Y + cam.C;
  return [cam.cx + X * cam.F / d, cam.hy - (Z - cam.camH) * cam.F / d, cam.F / d];
}

function duelBackdrop(park, look, home) {
  const key = `duel|${park.key}|${R.W}x${R.H}|${look.sky[0]}|${home.key}`;
  if (R.cache.has(key)) return R.cache.get(key);
  const cv = document.createElement('canvas'); cv.width = R.W * R.dpr; cv.height = R.H * R.dpr;
  const c = cv.getContext('2d'); c.scale(R.dpr, R.dpr);
  const cam = duelCam(), W = R.W, H = R.H;
  // sky
  const sky = c.createLinearGradient(0, 0, 0, cam.hy); sky.addColorStop(0, look.sky[0]); sky.addColorStop(1, look.sky[1]);
  c.fillStyle = sky; c.fillRect(0, 0, W, cam.hy + 2);
  // distant hills / trees
  c.fillStyle = look.trees;
  c.beginPath(); c.moveTo(0, cam.hy);
  for (let x = 0; x <= W; x += 16) c.lineTo(x, cam.hy - 22 - 10 * Math.sin(x * 0.021) - 7 * Math.sin(x * 0.057 + 1));
  c.lineTo(W, cam.hy); c.fill();
  // ground
  c.fillStyle = look.grass; c.fillRect(0, cam.hy, W, H - cam.hy);
  for (let y = 0; y < 420; y += 24) { // mow stripes in depth
    const a = proj(cam, 0, y, 0)[1], b = proj(cam, 0, y + 12, 0)[1];
    c.fillStyle = look.grass2; c.fillRect(0, b, W, a - b);
  }
  // light towers
  if (park.key !== 'home') {
    for (const th of [-52, -18, 18, 52]) {
      const [x, y] = polar(fenceDist(park, Math.max(-45, Math.min(45, th))) + 30, th);
      const b = proj(cam, x, y, 0), t = proj(cam, x, y, 70);
      c.strokeStyle = park.key === 'historic' ? '#5A3E24' : '#4A4F5A'; c.lineWidth = Math.max(1.5, t[2] * 1.2);
      c.beginPath(); c.moveTo(b[0], b[1]); c.lineTo(t[0], t[1]); c.stroke();
      const w = Math.max(10, t[2] * 14), h = Math.max(5, t[2] * 6);
      c.fillStyle = park.key === 'historic' ? '#5A3E24' : '#3A3F48'; c.fillRect(t[0] - w / 2, t[1] - h, w, h);
      c.fillStyle = look.sky[0] === '#0E1630' ? '#FFF6C8' : '#F4EBC8';
      for (let k = 0; k < 4; k++) c.fillRect(t[0] - w / 2 + 2 + k * (w - 4) / 4, t[1] - h + 2, (w - 4) / 4 - 2, h - 4);
      if (look.sky[0] === '#0E1630') { const gl = c.createRadialGradient(t[0], t[1] - h / 2, 2, t[0], t[1] - h / 2, w * 2); gl.addColorStop(0, 'rgba(255,246,200,0.55)'); gl.addColorStop(1, 'rgba(255,246,200,0)'); c.fillStyle = gl; c.fillRect(t[0] - w * 2, t[1] - h / 2 - w * 2, w * 4, w * 4); }
    }
  }
  // fence
  const fpts = [], tops = [];
  for (let th = -60; th <= 60; th += 2) {
    const a = Math.max(-45, Math.min(45, th));
    const Rr = fenceDist(park, a) + (Math.abs(th) > 45 ? (Math.abs(th) - 45) * -3 : 0), [x, y] = polar(Rr, th);
    if (y < 30) continue;
    fpts.push(proj(cam, x, y, 0)); tops.push(proj(cam, x, y, fenceHeight(park, a)));
  }
  c.beginPath(); fpts.forEach((p, i) => (i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])));
  for (let i = tops.length - 1; i >= 0; i--) c.lineTo(tops[i][0], tops[i][1]);
  c.closePath();
  if (park.key === 'historic') { c.save(); c.clip(); planks(c, 0, cam.hy - 60, W, 80, look.wall, true); c.restore(); } else { c.fillStyle = look.wall; c.fill(); }
  c.strokeStyle = look.wallTop; c.lineWidth = 2; c.beginPath(); tops.forEach((p, i) => (i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]))); c.stroke();
  // distance markers on the fence
  c.fillStyle = '#FFFFFF'; c.textAlign = 'center'; c.textBaseline = 'middle';
  for (const th of [-38, 0, 38]) {
    const [x, y] = polar(fenceDist(park, th) - 1, th), p = proj(cam, x, y, fenceHeight(park, th) * 0.5);
    c.font = `800 ${Math.max(8, Math.round(p[2] * 2.2))}px system-ui, sans-serif`;
    c.fillText(String(Math.round(fenceDist(park, th))), p[0], p[1]);
  }
  // infield dirt (circle around the mound) and the grass diamond
  const ring = (cx, cy, r, z = 0) => { const pts = []; for (let a = 0; a <= 360; a += 6) { const y = cy + r * Math.cos(a * D2R), x = cx + r * Math.sin(a * D2R); if (y > -8) pts.push(proj(cam, x, Math.max(-8, y), z)); } return pts; };
  const poly = (pts, col) => { c.fillStyle = col; c.beginPath(); pts.forEach((p, i) => (i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]))); c.closePath(); c.fill(); };
  poly(ring(0, 60.5, 95), look.dirt);
  const g1 = [[0, 8], [56, 63.6], [0, 119], [-56, 63.6]].map(([x, y]) => proj(cam, x, y, 0));
  poly(g1, look.grass);
  poly(ring(0, 60.5, 9), look.dirt);
  poly(ring(0, 0, 13), look.dirt);
  // foul lines and bases
  c.strokeStyle = look.lines; c.lineWidth = 2;
  for (const s of [-1, 1]) { const a = proj(cam, 0, 0, 0), b = proj(cam, s * 260, 260, 0); c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke(); }
  for (const [bx, by] of BASES.slice(1)) { const p = proj(cam, bx, by, 0); c.fillStyle = '#FFFFFF'; c.fillRect(p[0] - p[2] * 0.9, p[1] - p[2] * 0.4, p[2] * 1.8, p[2] * 0.8); }
  // rubber and plate
  { const p = proj(cam, 0, 60.5, 0.8); c.fillStyle = '#FFFFFF'; c.fillRect(p[0] - p[2], p[1] - p[2] * 0.15, p[2] * 2, p[2] * 0.3); }
  const plate = [[-0.71, 0], [0.71, 0], [0.71, 0.71], [0, 1.42], [-0.71, 0.71]].map(([x, y]) => proj(cam, x, y * 0.5, 0));
  poly(plate, '#F7F7F2');
  // batter's boxes
  c.strokeStyle = 'rgba(255,255,255,0.85)'; c.lineWidth = 2;
  for (const s of [-1, 1]) {
    const b = [[s * 1.2, -3], [s * 1.2, 3], [s * 5.2, 3], [s * 5.2, -3]].map(([x, y]) => proj(cam, x, Math.max(-6, y), 0));
    c.beginPath(); b.forEach((p, i) => (i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]))); c.closePath(); c.stroke();
  }
  if (park.key === 'historic') { // linen-postcard tone
    c.fillStyle = 'rgba(243,233,210,0.18)'; c.fillRect(0, 0, W, H);
  }
  R.cache.set(key, cv);
  return cv;
}

export function zoneRect(cam) {
  const a = proj(cam, -ZONE.x + 0.12, 0, ZONE.z1), b = proj(cam, ZONE.x - 0.12, 0, ZONE.z0);
  return { x: a[0], y: a[1], w: b[0] - a[0], h: b[1] - a[1] };
}
// Screen point → plate coordinates (for mouse/touch aiming).
export function screenToPlate(sx, sy) {
  const cam = duelCam();
  const k = cam.F / cam.C;
  return { x: (sx - cam.cx) / k, z: cam.camH - (sy - cam.hy) / k };
}

// ---------------------------------------------------------------- duel frame
export function drawDuel(g, ui) {
  const c = R.c, cam = duelCam(), park = PARKS[g.park] || PARKS.home;
  const look = parkLook(park, ui.night);
  c.drawImage(duelBackdrop(park, look, g.teams[0]), 0, 0, R.W, R.H);
  const fT = g.half === 0 ? g.teams[0] : g.teams[1], bT = g.half === 0 ? g.teams[1] : g.teams[0];
  const P = fT.roster[fT.pitcher], B = bT.roster[bT.lineup[bT.order]];
  // fielders in the background (far first)
  const sp = spots(park);
  const order = FIELD_POS.filter((p) => p !== 'P' && p !== 'C').sort((a, b) => sp[b][1] - sp[a][1]);
  for (const pos of order) { const [x, y] = sp[pos]; const p = proj(cam, x, y, 0); drawMini(c, p[0], p[1], p[2], fT.kit, fT.roster[FIELD_POS.indexOf(pos) - 1].skin); }
  // pitcher
  const mp = proj(cam, 0, 60.5, 0.8);
  let w = 0;
  if (g.phase === 'windup') w = Math.min(1, g.phaseT / 0.9);
  else if (g.phase === 'flight' || g.phase === 'result') w = 1;
  drawPitcher(c, mp[0], mp[1], mp[2], fT.kit, P.skin, w, P.throws === 'L');
  // the pitch
  const pt = g.pitch;
  let ball = null;
  if (pt && (g.phase === 'flight' || (g.phase === 'result' && !g.play))) {
    const T = pt.T * g.scale;
    const f = g.phase === 'flight' ? g.phaseT / T : 1;
    ball = pitchPoint(pt, Math.min(f, 1));
    if (f >= 1) { // the catcher's mitt takes it
      const m = proj(cam, pt.px, 0, pt.pz);
      c.fillStyle = '#6B4423'; c.beginPath(); c.arc(m[0], m[1], 0.32 * m[2], 0, TAU); c.fill();
      c.fillStyle = '#4A2E16'; c.beginPath(); c.arc(m[0], m[1], 0.18 * m[2], 0, TAU); c.fill();
    }
    // timing ring assist: shrinks onto the ball as it arrives
    if (ui.ring && g.phase === 'flight' && ui.userBats && f < 1) {
      const pp = proj(cam, pt.px, 0, pt.pz);
      c.strokeStyle = 'rgba(255,216,77,0.9)'; c.lineWidth = 3;
      c.beginPath(); c.arc(pp[0], pp[1], 6 + (1 - f) * 90, 0, TAU); c.stroke();
    }
  }
  // zone overlay
  const zr = zoneRect(cam);
  if (ui.zone) {
    c.strokeStyle = 'rgba(255,255,255,0.85)'; c.lineWidth = 2; c.strokeRect(zr.x, zr.y, zr.w, zr.h);
    c.strokeStyle = 'rgba(255,255,255,0.3)'; c.lineWidth = 1; c.beginPath();
    for (let k = 1; k < 3; k++) { c.moveTo(zr.x + zr.w * k / 3, zr.y); c.lineTo(zr.x + zr.w * k / 3, zr.y + zr.h); c.moveTo(zr.x, zr.y + zr.h * k / 3); c.lineTo(zr.x + zr.w, zr.y + zr.h * k / 3); }
    c.stroke();
  }
  // user pitching target
  if (ui.userPitches && (g.phase === 'pre' || g.phase === 'windup')) {
    const t = proj(cam, g.target.x, 0, g.target.z);
    c.strokeStyle = '#FFD84D'; c.lineWidth = 3;
    c.beginPath(); c.arc(t[0], t[1], 14, 0, TAU); c.moveTo(t[0] - 22, t[1]); c.lineTo(t[0] - 8, t[1]); c.moveTo(t[0] + 8, t[1]); c.lineTo(t[0] + 22, t[1]);
    c.moveTo(t[0], t[1] - 22); c.lineTo(t[0], t[1] - 8); c.moveTo(t[0], t[1] + 8); c.lineTo(t[0], t[1] + 22); c.stroke();
  }
  // batter
  const side = B.bats === 'L' ? 1 : -1;
  const bp = proj(cam, side * 3.1, 0.6, 0);
  if (cam.portrait) { bp[0] = cam.cx + side * R.W * 0.4; bp[2] *= 0.8; }
  let swing = 0;
  const sw = g.swing || (g.aiSwing && g.phase !== 'pre' ? g.aiSwing : null);
  if (sw && (g.phase === 'flight' || g.phase === 'result' || g.phase === 'play')) {
    const T = pt.T * g.scale;
    const st = g.swing ? g.swing.at : T + (sw.u || 0) * ui.W - 0.1 * g.scale;
    swing = sw.bunt ? 0 : Math.max(0, Math.min(1, (g.phaseT - st) / (0.18 * g.scale)));
    if (g.phase !== 'flight') swing = 1;
  }
  const bunting = (g.bunt && ui.userBats) || (sw && sw.bunt);
  // ball behind or in front of the batter? draw ball after batter when it's at the plate
  if (ball && ball.y > 6) drawBall(c, cam, ball);
  drawBatter(c, bp[0], bp[1], bp[2] * 0.74, { ...bT.kit, number: B.num }, B.skin, side, swing, bunting && g.phase !== 'result');
  if (ball && ball.y <= 6) drawBall(c, cam, ball);
  // contact cursor (aim mode)
  if (ui.userBats && ui.aim === 'aim' && g.phase !== 'play') {
    const cw = cursorHalf(B);
    const a = proj(cam, g.aimX - cw, 0, g.aimZ + 0.32), b = proj(cam, g.aimX + cw, 0, g.aimZ - 0.32);
    c.strokeStyle = '#4FC3FF'; c.lineWidth = 3; c.beginPath(); c.ellipse((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (b[0] - a[0]) / 2, (b[1] - a[1]) / 2, 0, 0, TAU); c.stroke();
    c.fillStyle = 'rgba(79,195,255,0.18)'; c.fill();
  }
  // umpire-school reveal / pitch location after a take
  if (ui.reveal && pt && g.phase === 'result') {
    const p = proj(cam, pt.px, 0, pt.pz);
    c.strokeStyle = '#FFD84D'; c.lineWidth = 3; c.beginPath(); c.arc(p[0], p[1], Math.max(5, 0.13 * p[2]), 0, TAU); c.stroke();
  }
  // pitch meter
  if (ui.userPitches && g.meter) drawMeter(c, g.meter.t / 1.1, g.meter.done);
  drawFx(c);
}

function drawBall(c, cam, b) {
  const g0 = proj(cam, b.x, b.y, 0), p = proj(cam, b.x, b.y, b.z);
  const r = Math.max(2.5, 0.125 * p[2]);
  c.fillStyle = 'rgba(0,0,0,0.25)'; c.beginPath(); c.ellipse(g0[0], g0[1], r, r * 0.4, 0, 0, TAU); c.fill();
  c.fillStyle = '#FBFBF6'; c.beginPath(); c.arc(p[0], p[1], r, 0, TAU); c.fill();
  c.strokeStyle = '#C8452B'; c.lineWidth = Math.max(1, r * 0.18); c.beginPath(); c.arc(p[0] - r * 0.9, p[1], r * 0.8, -0.8, 0.8); c.stroke();
  c.beginPath(); c.arc(p[0] + r * 0.9, p[1], r * 0.8, Math.PI - 0.8, Math.PI + 0.8); c.stroke();
}

function drawMeter(c, v, done) {
  const W = Math.min(360, R.W * 0.8), x = (R.W - W) / 2, y = R.H - 34, h = 16;
  c.fillStyle = 'rgba(20,18,31,0.85)'; c.fillRect(x - 8, y - 22, W + 16, h + 30);
  c.fillStyle = '#3A3550'; c.fillRect(x, y, W, h);
  c.fillStyle = '#8A7A3A'; c.fillRect(x + W * 0.6, y, W * 0.4, h);
  c.fillStyle = '#FFD84D'; c.fillRect(x + W * 0.78, y, W * 0.08, h);
  c.fillStyle = '#FFFFFF'; c.fillRect(x + W * Math.min(1, v) - 2, y - 4, 4, h + 8);
  c.font = '700 12px system-ui, sans-serif'; c.textAlign = 'left'; c.textBaseline = 'bottom'; c.fillStyle = '#FFF6E0';
  c.fillText(done ? 'Pitch away!' : 'Press again in the gold band', x, y - 4);
}

// ---------------------------------------------------------------- field view
function fieldCam(park) {
  const maxD = Math.max(...park.dist) + 40;
  const wx = Math.max(fenceDist(park, -45), fenceDist(park, 45)) * Math.sin(45 * D2R) + 50;
  const top = maxD, bot = -40;
  const k = Math.min(R.W / (2 * wx), R.H / (top - bot));
  return { k, ox: R.W / 2, oy: R.H - (-bot) * k - (R.H - (top - bot) * k) / 2 };
}
const wp = (cam, x, y) => [cam.ox + (x - (cam.cx || 0)) * cam.k, cam.oy - (y - (cam.cy || 0)) * cam.k];

function drawFieldBase(c, cam, park, look) {
  const k = cam.k;
  c.fillStyle = park.key === 'historic' ? '#B9A57A' : '#2E4733'; c.fillRect(0, 0, R.W, R.H); // surroundings

  // beyond the fence: trees (and the alligator farm across the street in the historic park)
  const far = (th, r) => wp(cam, ...polar(r, th));
  c.fillStyle = look.trees;
  c.beginPath(); for (let th = -60; th <= 60; th += 3) { const p = far(th, fenceDist(park, Math.max(-45, Math.min(45, th))) + 90); th === -60 ? c.moveTo(p[0], p[1]) : c.lineTo(p[0], p[1]); }
  for (let th = 60; th >= -60; th -= 3) { const p = far(th, fenceDist(park, Math.max(-45, Math.min(45, th))) + 8); c.lineTo(p[0], p[1]); } c.fill();
  if (park.gator) {
    // street, then the pens
    c.strokeStyle = '#8B8B86'; c.lineWidth = 16 * k; c.beginPath();
    for (let th = 5; th <= 60; th += 3) { const p = far(th, fenceDist(park, Math.min(45, th)) + 22); th === 5 ? c.moveTo(p[0], p[1]) : c.lineTo(p[0], p[1]); } c.stroke();
    const pen = far(36, fenceDist(park, 36) + 62);
    c.fillStyle = '#7E9C6A'; c.fillRect(pen[0] - 34 * k, pen[1] - 22 * k, 68 * k, 44 * k);
    c.fillStyle = '#5B86A0'; c.beginPath(); c.ellipse(pen[0], pen[1], 24 * k, 13 * k, 0.3, 0, TAU); c.fill();
    drawGator(c, pen[0] - 6 * k, pen[1] + 2 * k, 26 * k, '#3E5A3A', 0.2);
    c.strokeStyle = '#E6D9BC'; c.lineWidth = Math.max(1, 1.5 * k); c.strokeRect(pen[0] - 34 * k, pen[1] - 22 * k, 68 * k, 44 * k);
  }
  // field: foul territory + grass fan
  c.fillStyle = look.grass2;
  c.beginPath(); const h0 = wp(cam, 0, -30); c.moveTo(h0[0], h0[1]);
  for (let th = -60; th <= 60; th += 2) { const a = Math.max(-45, Math.min(45, th)); const p = far(th, fenceDist(park, a) + (Math.abs(th) > 45 ? -8 * (Math.abs(th) - 45) : 0)); c.lineTo(p[0], p[1]); }
  c.closePath(); c.fill();
  c.fillStyle = look.grass;
  c.beginPath(); const h1 = wp(cam, 0, 0); c.moveTo(h1[0], h1[1]);
  for (let th = -45; th <= 45; th += 1.5) { const p = far(th, fenceDist(park, th)); c.lineTo(p[0], p[1]); }
  c.closePath(); c.fill();
  // mow stripes
  c.save(); c.clip();
  c.fillStyle = look.grass2;
  const step = park.surface === 'turf' ? 14 : 22;
  for (let x = -400; x < 400; x += step * 2) {
    const a = wp(cam, x, 0), b = wp(cam, x + step, 0);
    c.save(); c.translate(h1[0], h1[1]); c.rotate(-Math.PI / 4); c.fillRect(a[0] - h1[0], -600, b[0] - a[0], 1200); c.restore();
  }
  c.restore();
  // warning track
  c.strokeStyle = shade(look.dirt, -0.05); c.lineWidth = 12 * k; c.beginPath();
  for (let th = -45; th <= 45; th += 1.5) { const p = far(th, fenceDist(park, th) - 7); th === -45 ? c.moveTo(p[0], p[1]) : c.lineTo(p[0], p[1]); } c.stroke();
  // fence
  c.strokeStyle = park.key === 'historic' ? '#5A3E24' : look.wall; c.lineWidth = Math.max(3, (park.key === 'historic' ? 4 : 3) * k);
  c.beginPath(); for (let th = -45; th <= 45; th += 1.5) { const p = far(th, fenceDist(park, th)); th === -45 ? c.moveTo(p[0], p[1]) : c.lineTo(p[0], p[1]); } c.stroke();
  // infield
  const m = wp(cam, 0, 60.5);
  c.fillStyle = look.dirt; c.beginPath(); c.arc(m[0], m[1], 95 * k, 0, TAU); c.fill();
  c.fillStyle = look.grass;
  c.beginPath(); [[0, 8], [56, 63.6], [0, 119], [-56, 63.6]].forEach(([x, y], i) => { const p = wp(cam, x, y); i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]); }); c.closePath(); c.fill();
  c.fillStyle = look.dirt; c.beginPath(); c.arc(m[0], m[1], 9 * k, 0, TAU); c.fill();
  const hp = wp(cam, 0, 0); c.beginPath(); c.arc(hp[0], hp[1], 13 * k, 0, TAU); c.fill();
  // lines
  c.strokeStyle = look.lines; c.lineWidth = Math.max(1.5, 0.8 * k);
  for (const s of [-1, 1]) { const b = wp(cam, s * fenceDist(park, s * 45) * Math.SQRT1_2, fenceDist(park, s * 45) * Math.SQRT1_2); c.beginPath(); c.moveTo(hp[0], hp[1]); c.lineTo(b[0], b[1]); c.stroke(); }
  for (const [bx, by] of BASES.slice(1)) { const p = wp(cam, bx, by); const s = Math.max(4, 2.5 * k); c.fillStyle = '#FFFFFF'; c.save(); c.translate(p[0], p[1]); c.rotate(Math.PI / 4); c.fillRect(-s / 2, -s / 2, s, s); c.restore(); }
  c.fillStyle = '#FFFFFF'; c.fillRect(hp[0] - Math.max(3, 1.4 * k), hp[1] - Math.max(3, 1.4 * k), Math.max(6, 2.8 * k), Math.max(6, 2.8 * k));
  // grandstand behind home
  c.fillStyle = park.key === 'historic' ? '#8A6640' : look.stands;
  c.beginPath(); c.arc(hp[0], hp[1], 70 * k, Math.PI * 0.15, Math.PI * 0.85); c.arc(hp[0], hp[1], 40 * k, Math.PI * 0.85, Math.PI * 0.15, true); c.fill();
}

// Interpolated positions from a timeline
function pathAt(path, t) {
  if (!path || !path.length) return null;
  if (t <= path[0].t) return path[0];
  for (let i = 1; i < path.length; i++) if (path[i].t >= t) { const a = path[i - 1], b = path[i], u = (t - a.t) / (b.t - a.t || 1); return { x: a.x + (b.x - a.x) * u, y: a.y + (b.y - a.y) * u }; }
  return path[path.length - 1];
}
function baseXY(b) {
  const s = Math.max(0, Math.min(3, Math.floor(b))), f = Math.min(1, b - s);
  const a = BASES[s], c = BASES[(s + 1) % 4];
  return [a[0] + (c[0] - a[0]) * f, a[1] + (c[1] - a[1]) * f];
}
function runnerAt(keys, t) {
  let prev = keys[0];
  for (let i = 1; i < keys.length; i++) {
    const k = keys[i];
    if (k.t >= t) { const u = (t - prev.t) / (k.t - prev.t || 1); return { b: prev.b + (k.b - prev.b) * u, out: false, gone: false }; }
    prev = k;
  }
  return { b: prev.b, out: !!prev.out, gone: (prev.out || prev.score) && t - prev.t > 0.7, scored: !!prev.score };
}
export function timelineBall(tl, t) {
  const S = tl.ball;
  const end = S.length ? S[S.length - 1][0] : 0;
  for (const th of tl.throws) if (t >= th.t0 && t <= th.t1) {
    const u = (t - th.t0) / (th.t1 - th.t0 || 1), d = Math.hypot(th.to[0] - th.from[0], th.to[1] - th.from[1]);
    return { x: th.from[0] + (th.to[0] - th.from[0]) * u, y: th.from[1] + (th.to[1] - th.from[1]) * u, z: 5 + Math.min(14, d / 18) * 4 * u * (1 - u) };
  }
  if (t <= end || !tl.throws.length) return ballAt({ s: S }, t);
  const done = tl.throws.filter((th) => th.t1 <= t).sort((a, b) => b.t1 - a.t1)[0];
  if (done && done.t1 >= end) return { x: done.to[0], y: done.to[1], z: 4 };
  return ballAt({ s: S }, end);
}

export function drawField(g, ui) {
  const c = R.c, park = PARKS[g.park] || PARKS.home, look = parkLook(park, ui.night);
  const base = fieldCam(park);
  const play = g.play, tl = play && play.out.timeline;
  const t = ui.playT ?? 0;
  // portrait camera: zoom toward the ball (not with reduced motion)
  let cam = { ...base, cx: 0, cy: 0 };
  if (!R.reduced && R.H > R.W && tl) {
    const b = timelineBall(tl, t);
    const tgt = { k: base.k * 1.5, cx: Math.max(-120, Math.min(120, b.x * 0.7)), cy: Math.max(185, Math.min(300, b.y * 0.6 + 150)) };
    if (!R.cam || ui.snap) R.cam = { k: base.k, cx: 0, cy: (R.H / 2 - base.oy) / -base.k };
    const e = 0.08;
    R.cam.k += (tgt.k - R.cam.k) * e; R.cam.cx += (tgt.cx - R.cam.cx) * e; R.cam.cy += (tgt.cy - R.cam.cy) * e;
    cam = { k: R.cam.k, ox: R.W / 2, oy: R.H / 2, cx: R.cam.cx, cy: R.cam.cy };
  }
  const sh = R.shake && !R.reduced ? [(Math.random() - 0.5) * R.shake, (Math.random() - 0.5) * R.shake] : [0, 0];
  c.save(); c.translate(sh[0], sh[1]);
  drawFieldBase(c, cam, park, look);
  const fT = g.half === 0 ? g.teams[0] : g.teams[1], bT = g.half === 0 ? g.teams[1] : g.teams[0];
  const tokR = Math.max(9, 5.4 * cam.k);
  const sp = spots(park);
  // fielders
  for (const pos of FIELD_POS) {
    const path = tl && tl.fielders[pos];
    const p = pathAt(path, t) || { x: sp[pos][0], y: sp[pos][1] };
    const s = wp(cam, p.x, p.y);
    drawToken(c, s[0], s[1], tokR, fT.kit, pos);
  }
  // runners
  if (tl) {
    for (const [id, keys] of Object.entries(tl.runners)) {
      const r = runnerAt(keys, t);
      if (r.gone) continue;
      const [x, y] = baseXY(r.b);
      const s = wp(cam, x, y);
      drawToken(c, s[0] + tokR * 0.6, s[1] - tokR * 0.6, tokR * 0.95, bT.kit, r.out ? 'OUT' : '', { ring: r.out ? '#FF6B6B' : '#FFD84D' });
    }
    // ball
    const b = timelineBall(tl, t);
    const gp = wp(cam, b.x, b.y), bp = wp(cam, b.x, b.y + 0); bp[1] -= b.z * cam.k * 0.55;
    const br = Math.max(4, 1.3 * cam.k * (1 + Math.min(1.2, b.z / 40)));
    c.fillStyle = 'rgba(0,0,0,0.35)'; c.beginPath(); c.ellipse(gp[0], gp[1], br, br * 0.6, 0, 0, TAU); c.fill();
    c.fillStyle = '#FFFFFF'; c.strokeStyle = '#1B1B1B'; c.lineWidth = 1; c.beginPath(); c.arc(bp[0], bp[1], br, 0, TAU); c.fill(); c.stroke();
    // calls
    const live = tl.calls.filter((k) => t >= k.t && t < k.t + 1.3).slice(-1)[0];
    if (live) callBanner(c, live.text, live.kind);
  }
  c.restore();
  drawFx(c);
}

function callBanner(c, text, kind) {
  const col = { out: '#FF8A7A', safe: '#8FE3A8', hr: '#FFD84D', hit: '#FFFFFF', foul: '#E9E2D2', info: '#FFFFFF' }[kind] || '#FFFFFF';
  const size = Math.round(Math.min(56, Math.max(26, R.W / 14)));
  c.font = `900 ${size}px "Arial Black", Impact, sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle';
  c.lineWidth = Math.max(4, size / 7); c.strokeStyle = 'rgba(10,9,16,0.85)'; c.strokeText(text, R.W / 2, R.H * 0.16);
  c.fillStyle = col; c.fillText(text, R.W / 2, R.H * 0.16);
}

// ---------------------------------------------------------------- effects
export function burst(x, y, col, n = 14) {
  if (R.reduced) return;
  for (let i = 0; i < n; i++) { const a = Math.random() * TAU, v = 60 + Math.random() * 160; R.fx.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 0.6, col, r: 2 + Math.random() * 2 }); }
}
export function confetti() {
  if (R.reduced) return 0;
  const cols = ['#FFD84D', '#FF6B6B', '#4FC3FF', '#5FD38A', '#FFFFFF'];
  for (let i = 0; i < 120; i++) R.fx.push({ x: Math.random() * R.W, y: -10 - Math.random() * R.H * 0.5, vx: (Math.random() - 0.5) * 40, vy: 60 + Math.random() * 90, life: 3.5, col: cols[i % 5], r: 3, conf: true });
  return R.fx.length;
}
export function hitFlash() { if (!R.reduced) { const cam = duelCam(); const z = zoneRect(cam); burst(z.x + z.w / 2, z.y + z.h / 2, '#FFF6E0', 18); } }
export function stepFx(dt) {
  for (const p of R.fx) { p.x += p.vx * dt; p.y += p.vy * dt; if (!p.conf) { p.vx *= 0.92; p.vy *= 0.92; } p.life -= dt; }
  R.fx = R.fx.filter((p) => p.life > 0);
  R.shake = Math.max(0, R.shake - dt * 30);
}
function drawFx(c) {
  for (const p of R.fx) { c.globalAlpha = Math.max(0, Math.min(1, p.life * 2)); c.fillStyle = p.col; c.fillRect(p.x - p.r, p.y - p.r, p.r * 2, p.r * 2); }
  c.globalAlpha = 1;
}

// ---------------------------------------------------------------- title backdrop (static, or a slow ball arc)
export function drawTitle(t, park = 'home') {
  const c = R.c, pk = PARKS[park], look = parkLook(pk, false);
  const base = fieldCam(pk);
  drawFieldBase(c, { ...base, cx: 0, cy: 0 }, pk, look);
  c.fillStyle = 'rgba(20,18,31,0.35)'; c.fillRect(0, 0, R.W, R.H);
  if (t != null) {
    const u = (t % 4) / 4;
    const x = -120 + 260 * u, y = 80 + 220 * u, z = 260 * 4 * u * (1 - u);
    const p = wp({ ...base, cx: 0, cy: 0 }, x, y);
    c.fillStyle = '#FFFFFF'; c.beginPath(); c.arc(p[0], p[1] - z * base.k * 0.4, 4, 0, TAU); c.fill();
  }
}

export function clear(col = '#14121F') { R.c.fillStyle = col; R.c.fillRect(0, 0, R.W, R.H); }
export function begin() { R.c.setTransform(R.dpr, 0, 0, R.dpr, 0, 0); }
export { RELEASE };
