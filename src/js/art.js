// Procedural art: original geometric mascot crests (shared with Spa City Hoops), shape-built
// ballplayers, and the parks. Mascots follow each school's `mascotConcept` from schools.json.
// No logos are reproduced. Spring Training clubs use monogram shields.
import { shade, contrast } from './util.js';

const TAU = Math.PI * 2;

// ---------------------------------------------------------------- crests (unit space: −1..1)
function shieldPath(c) {
  c.beginPath();
  c.moveTo(-0.82, -0.86); c.lineTo(0.82, -0.86); c.lineTo(0.82, 0.05);
  c.quadraticCurveTo(0.78, 0.62, 0, 0.98); c.quadraticCurveTo(-0.78, 0.62, -0.82, 0.05); c.closePath();
}
const MASCOT = {
  'hot-springs'(c, p, s) { // crested helmet in profile: half-dome + arched crest of stacked chevrons + cheek guard
    c.fillStyle = s; c.beginPath(); c.moveTo(-0.55, 0.45); c.arc(0, 0.3, 0.55, Math.PI, 0); c.lineTo(0.55, 0.62); c.lineTo(0.22, 0.62); c.lineTo(0.22, 0.42); c.lineTo(-0.1, 0.42); c.lineTo(-0.1, 0.68); c.lineTo(-0.55, 0.68); c.closePath(); c.fill();
    c.fillStyle = p; c.fillRect(0.02, 0.18, 0.45, 0.1); // eye slot
    c.fillStyle = s;
    for (let k = 0; k < 6; k++) { // crest chevrons arching over the dome
      const a = Math.PI * (1.05 + k * 0.16), r = 0.82;
      const x = Math.cos(a) * r * 0.9, y = 0.25 + Math.sin(a) * r;
      c.save(); c.translate(x, y); c.rotate(a + Math.PI / 2);
      c.beginPath(); c.moveTo(-0.13, 0.05); c.lineTo(0, -0.12); c.lineTo(0.13, 0.05); c.lineTo(0.13, 0.13); c.lineTo(0, -0.02); c.lineTo(-0.13, 0.13); c.closePath(); c.fill(); c.restore();
    }
  },
  lakeside(c, p, s, a) { // ram head front-on: shield face, two spiral horns of concentric arcs
    c.fillStyle = s; c.beginPath(); c.moveTo(-0.32, -0.3); c.lineTo(0.32, -0.3); c.lineTo(0.26, 0.4); c.lineTo(0, 0.72); c.lineTo(-0.26, 0.4); c.closePath(); c.fill();
    c.strokeStyle = s; c.lineCap = 'round';
    for (const sx of [-1, 1]) for (let k = 0; k < 3; k++) {
      c.lineWidth = 0.13 - k * 0.025;
      c.beginPath(); c.arc(sx * 0.48, -0.12, 0.36 - k * 0.11, sx > 0 ? -Math.PI * 0.95 : -Math.PI * 0.05, sx > 0 ? Math.PI * 0.6 : Math.PI * 0.4, sx < 0); c.stroke();
    }
    c.fillStyle = p; c.beginPath(); c.arc(-0.12, 0.05, 0.05, 0, TAU); c.arc(0.12, 0.05, 0.05, 0, TAU); c.fill();
  },
  'lake-hamilton'(c, p, s) { // wolf head 3/4: two tall ear triangles, long muzzle wedge, notch eye
    c.fillStyle = s; c.beginPath();
    c.moveTo(-0.5, -0.1); c.lineTo(-0.38, -0.78); c.lineTo(-0.12, -0.28); c.lineTo(0.08, -0.32); c.lineTo(0.2, -0.86); c.lineTo(0.38, -0.2);
    c.lineTo(0.82, 0.18); c.lineTo(0.62, 0.34); c.lineTo(0.2, 0.36); c.lineTo(-0.1, 0.72); c.lineTo(-0.48, 0.38); c.closePath(); c.fill();
    c.fillStyle = p; c.beginPath(); c.moveTo(0.02, -0.06); c.lineTo(0.3, 0.02); c.lineTo(0.06, 0.08); c.closePath(); c.fill();
  },
  'fountain-lake'(c, p, s) { // cobra raised with hood spread: teardrop hood, diamond head, forked tongue
    c.fillStyle = s; c.beginPath(); c.moveTo(0, -0.8); c.bezierCurveTo(0.75, -0.4, 0.62, 0.45, 0, 0.85); c.bezierCurveTo(-0.62, 0.45, -0.75, -0.4, 0, -0.8); c.fill();
    c.fillStyle = p; c.beginPath(); c.moveTo(0, -0.5); c.lineTo(0.22, -0.2); c.lineTo(0, 0.12); c.lineTo(-0.22, -0.2); c.closePath(); c.fill();
    c.strokeStyle = p; c.lineWidth = 0.05; c.beginPath(); c.moveTo(0, 0.12); c.lineTo(0, 0.32); c.moveTo(0, 0.32); c.lineTo(-0.08, 0.42); c.moveTo(0, 0.32); c.lineTo(0.08, 0.42); c.stroke();
    c.fillStyle = s; c.beginPath(); c.arc(-0.08, -0.22, 0.035, 0, TAU); c.arc(0.08, -0.22, 0.035, 0, TAU); c.fill();
  },
  'cutter-morning-star'(c, p, s, a) { // eagle profile: hooked beak triangle, crest of three feather blades, round eye
    c.fillStyle = s; c.beginPath(); c.moveTo(-0.5, 0.7); c.quadraticCurveTo(-0.62, -0.1, -0.1, -0.42); c.lineTo(0.35, -0.3); c.lineTo(0.42, 0.25); c.quadraticCurveTo(0.05, 0.3, -0.05, 0.7); c.closePath(); c.fill();
    for (let k = 0; k < 3; k++) { c.beginPath(); c.moveTo(-0.3 + k * 0.05, -0.32); c.lineTo(-0.78 - k * 0.02, -0.72 + k * 0.3); c.lineTo(-0.2 + k * 0.08, -0.1 + k * 0.05); c.closePath(); c.fill(); }
    c.fillStyle = a || '#E6B422'; c.beginPath(); c.moveTo(0.35, -0.3); c.lineTo(0.85, -0.05); c.quadraticCurveTo(0.8, 0.22, 0.6, 0.25); c.lineTo(0.66, 0.05); c.lineTo(0.42, 0.06); c.closePath(); c.fill();
    c.fillStyle = p; c.beginPath(); c.arc(0.14, -0.14, 0.07, 0, TAU); c.fill();
  },
  jessieville(c, p, s) { // lion: hexagon face inside a ring of twelve flame-shaped mane points
    c.fillStyle = s;
    for (let k = 0; k < 12; k++) {
      const an = (k / 12) * TAU;
      c.beginPath(); c.moveTo(Math.cos(an - 0.22) * 0.48, Math.sin(an - 0.22) * 0.48);
      c.quadraticCurveTo(Math.cos(an) * 0.98, Math.sin(an) * 0.98, Math.cos(an + 0.3) * 0.86, Math.sin(an + 0.3) * 0.86);
      c.lineTo(Math.cos(an + 0.26) * 0.48, Math.sin(an + 0.26) * 0.48); c.closePath(); c.fill();
    }
    c.beginPath(); for (let k = 0; k < 6; k++) { const an = (k / 6) * TAU + Math.PI / 6; c.lineTo(Math.cos(an) * 0.5, Math.sin(an) * 0.5); } c.closePath(); c.fill();
    c.fillStyle = p; c.beginPath(); c.arc(-0.17, -0.06, 0.06, 0, TAU); c.arc(0.17, -0.06, 0.06, 0, TAU); c.fill();
    c.beginPath(); c.moveTo(-0.1, 0.14); c.lineTo(0.1, 0.14); c.lineTo(0, 0.26); c.closePath(); c.fill();
  },
  'mountain-pine'(c, p, s, a) { // friendly imp mark: pointed-ear shield, two short horn wedges, pitchfork-tail swash; no face
    c.fillStyle = s; c.beginPath(); c.moveTo(-0.5, -0.35); c.lineTo(-0.72, -0.6); c.lineTo(-0.38, -0.5); c.lineTo(0.38, -0.5); c.lineTo(0.72, -0.6); c.lineTo(0.5, -0.35);
    c.lineTo(0.46, 0.2); c.quadraticCurveTo(0.3, 0.55, 0, 0.62); c.quadraticCurveTo(-0.3, 0.55, -0.46, 0.2); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(-0.32, -0.5); c.lineTo(-0.2, -0.86); c.lineTo(-0.1, -0.5); c.closePath(); c.moveTo(0.1, -0.5); c.lineTo(0.2, -0.86); c.lineTo(0.32, -0.5); c.closePath(); c.fill();
    c.strokeStyle = s; c.lineWidth = 0.08; c.lineCap = 'round'; c.beginPath(); c.moveTo(0.3, 0.5); c.quadraticCurveTo(0.8, 0.6, 0.72, 0.1); c.stroke();
    c.fillStyle = s; c.beginPath(); c.moveTo(0.72, -0.08); c.lineTo(0.86, 0.12); c.lineTo(0.58, 0.12); c.closePath(); c.fill();
    c.fillStyle = a; c.fillRect(-0.3, -0.12, 0.6, 0.08);
  },
  mono(c, p, s, a, letter) {
    c.fillStyle = s; c.fillRect(-0.82, 0.18, 1.64, 0.14);
    c.font = '900 1.0px "Arial Black", Impact, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.fillText(letter, 0, -0.18);
  },
};

export const CREST_KEYS = Object.keys(MASCOT);

// Draw a crest badge centered at (cx, cy) with radius r.
export function drawCrest(c, team, cx, cy, r, opts = {}) {
  const { primary, secondary, accent } = team.colors;
  // keep contrast inside the badge: if secondary is too close to primary, use accent
  const fg = contrast(primary, secondary) >= 2.2 ? secondary : accent;
  c.save(); c.translate(cx, cy); c.scale(r, r);
  shieldPath(c); c.fillStyle = primary; c.fill();
  c.lineWidth = 0.09; c.strokeStyle = fg; c.stroke();
  shieldPath(c); c.save(); c.clip();
  c.scale(0.74, 0.74); c.translate(0, -0.02);
  const fn = MASCOT[team.crest] || MASCOT.mono;
  fn(c, primary, fg, accent, team.short[0]);
  c.restore();
  if (opts.ring) { c.lineWidth = 0.04; c.strokeStyle = 'rgba(0,0,0,0.35)'; shieldPath(c); c.stroke(); }
  c.restore();
}

// A crest as a data-URL image (for DOM menus), cached.
const crestCache = new Map();
export function crestURL(team, px = 64) {
  const k = `${team.key}|${px}`;
  if (crestCache.has(k)) return crestCache.get(k);
  let url = '';
  try {
    const cv = document.createElement('canvas'); cv.width = cv.height = px;
    drawCrest(cv.getContext('2d'), team, px / 2, px / 2, px * 0.46);
    url = cv.toDataURL();
  } catch (e) { url = ''; }
  crestCache.set(k, url);
  return url;
}


// ---------------------------------------------------------------- ballplayers (duel view)
// Foot point (x, y), s = px per ft. kit = team kit, look = {skin}. pose 0..1 animation.
function limb(c, x1, y1, x2, y2, w, col) { c.strokeStyle = col; c.lineWidth = w; c.lineCap = 'round'; c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke(); }

// Pitcher facing the camera. phase: 'set' | windup fraction 0..1 | 'follow'
export function drawPitcher(c, x, y, s, kit, skin, w, lefty) {
  const H = 6 * s, m = lefty ? -1 : 1;
  const lift = w > 0.2 && w < 0.6 ? Math.sin((w - 0.2) / 0.4 * Math.PI) : 0;
  const reach = w >= 0.6 ? Math.min(1, (w - 0.6) / 0.25) : 0;
  const hip = y - H * 0.47;
  // legs
  limb(c, x - 0.35 * s, hip, x - 0.55 * s - reach * 0.4 * s * m, y, 0.42 * s, kit.pants);
  limb(c, x + 0.35 * s, hip, x + (0.5 + lift * 0.2) * s, y - lift * 1.4 * s, 0.42 * s, kit.pants);
  c.fillStyle = kit.sock; c.fillRect(x - 0.75 * s, y - 0.5 * s, 0.4 * s, 0.4 * s); c.fillRect(x + 0.35 * s, y - 0.5 * s - lift * 1.4 * s, 0.4 * s, 0.4 * s);
  // torso
  c.fillStyle = kit.jersey; c.strokeStyle = kit.trim; c.lineWidth = Math.max(1, 0.08 * s);
  c.beginPath(); c.moveTo(x - 0.75 * s, hip - 0.1 * s); c.lineTo(x - 0.85 * s, y - H * 0.8); c.lineTo(x + 0.85 * s, y - H * 0.8); c.lineTo(x + 0.75 * s, hip - 0.1 * s); c.closePath(); c.fill(); c.stroke();
  // arms: glove arm in front, throwing arm back then forward
  const sh = y - H * 0.78;
  limb(c, x - 0.8 * s * m, sh, x - (0.6 - reach * 0.3) * s * m, sh + (0.9 - lift * 0.5) * s, 0.32 * s, kit.jersey);
  c.fillStyle = '#5A3A20'; c.beginPath(); c.arc(x - (0.6 - reach * 0.3) * s * m, sh + (1.0 - lift * 0.5) * s, 0.32 * s, 0, TAU); c.fill();
  const ax = x + (0.8 + (1 - reach) * 0.6 * (w > 0.3 ? 1 : 0)) * s * m, ay = sh - (w > 0.3 && w < 0.85 ? 1.3 : 0.2) * s;
  limb(c, x + 0.8 * s * m, sh, ax, ay, 0.32 * s, kit.jersey);
  c.fillStyle = skin; c.beginPath(); c.arc(ax, ay, 0.16 * s, 0, TAU); c.fill();
  // head and cap
  c.fillStyle = skin; c.beginPath(); c.arc(x, y - H * 0.88, 0.42 * s, 0, TAU); c.fill();
  c.fillStyle = kit.cap; c.beginPath(); c.arc(x, y - H * 0.9, 0.44 * s, Math.PI, 0); c.fill();
  c.fillRect(x - 0.5 * s, y - H * 0.9 - 0.02 * s, 1.0 * s, 0.14 * s);
}

// Batter seen from the catcher's side. side −1 = stands left (right-handed), +1 = right (left-handed).
// swing 0 (stance) → 1 (follow-through); bunt squares around.
export function drawBatter(c, x, y, s, kit, skin, side, swing, bunt) {
  const H = 6.1 * s;
  const hip = y - H * 0.5, sh = y - H * 0.8;
  limb(c, x - 0.45 * s, hip, x - 0.7 * s, y, 0.5 * s, kit.pants);
  limb(c, x + 0.45 * s, hip, x + 0.7 * s, y, 0.5 * s, kit.pants);
  c.fillStyle = kit.sock; c.fillRect(x - 0.95 * s, y - 0.55 * s, 0.5 * s, 0.45 * s); c.fillRect(x + 0.45 * s, y - 0.55 * s, 0.5 * s, 0.45 * s);
  c.fillStyle = kit.jersey; c.strokeStyle = kit.trim; c.lineWidth = Math.max(1, 0.08 * s);
  c.beginPath(); c.moveTo(x - 0.8 * s, hip); c.lineTo(x - 0.95 * s, sh); c.lineTo(x + 0.95 * s, sh); c.lineTo(x + 0.8 * s, hip); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = kit.num; c.font = `900 ${Math.round(0.9 * s)}px "Arial Black", Impact, sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle';
  c.fillText(String(kit.number ?? ''), x, (hip + sh) / 2);
  // hands and bat: the bat sweeps toward the plate (toward −side) through the swing
  const hx = x - side * (0.3 + swing * 0.9) * s, hy = sh + (0.4 + swing * 0.6) * s;
  limb(c, x - side * 0.7 * s, sh + 0.15 * s, hx, hy, 0.32 * s, kit.jersey);
  let ang;
  if (bunt) ang = side > 0 ? Math.PI : 0;
  else ang = (-Math.PI / 2 - side * 0.5) + (-side) * swing * 2.6;
  const L = 2.8 * s;
  const bx = hx + Math.cos(ang) * L * (bunt ? 0.6 : 1), by = hy + Math.sin(ang) * L * (bunt ? 0.6 : 1);
  c.strokeStyle = '#C9A26B'; c.lineWidth = 0.2 * s; c.lineCap = 'round'; c.beginPath(); c.moveTo(hx, hy); c.lineTo(bx, by); c.stroke();
  c.strokeStyle = '#B08850'; c.lineWidth = 0.3 * s; c.beginPath(); c.moveTo(hx + (bx - hx) * 0.55, hy + (by - hy) * 0.55); c.lineTo(bx, by); c.stroke();
  // helmet
  c.fillStyle = kit.cap; c.beginPath(); c.arc(x, sh - 0.55 * s, 0.55 * s, 0, TAU); c.fill();
  c.fillStyle = shade(kit.cap, 0.3); c.fillRect(x + side * 0.1 * s, sh - 0.6 * s, side * 0.5 * s, 0.25 * s);
}

// Small fielder figure (duel background) or field-view token.
export function drawMini(c, x, y, s, kit, skin) {
  const H = 6 * s;
  c.fillStyle = kit.pants; c.fillRect(x - 0.45 * s, y - H * 0.45, 0.9 * s, H * 0.45);
  c.fillStyle = kit.jersey; c.fillRect(x - 0.6 * s, y - H * 0.8, 1.2 * s, H * 0.38);
  c.fillStyle = skin; c.beginPath(); c.arc(x, y - H * 0.88, 0.4 * s, 0, TAU); c.fill();
  c.fillStyle = kit.cap; c.fillRect(x - 0.42 * s, y - H * 0.98, 0.84 * s, 0.28 * s);
}

// Top-down token for the field view: a jersey disc with a cap dot and an outline that reads on grass.
export function drawToken(c, x, y, r, kit, label, o = {}) {
  c.fillStyle = 'rgba(0,0,0,0.28)'; c.beginPath(); c.ellipse(x + r * 0.25, y + r * 0.35, r, r * 0.7, 0, 0, TAU); c.fill();
  c.fillStyle = kit.jersey; c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill();
  c.lineWidth = Math.max(1.5, r * 0.28); c.strokeStyle = o.ring || kit.trim; c.stroke();
  c.fillStyle = kit.cap; c.beginPath(); c.arc(x, y, r * 0.45, 0, TAU); c.fill();
  if (label && r >= 6) {
    c.font = `800 ${Math.round(Math.max(9, r * 1.05))}px system-ui, sans-serif`; c.textAlign = 'center'; c.textBaseline = 'top';
    c.lineWidth = 3; c.strokeStyle = 'rgba(0,0,0,0.75)'; c.strokeText(label, x, y + r + 1);
    c.fillStyle = '#FFFFFF'; c.fillText(label, x, y + r + 1);
  }
}

// ---------------------------------------------------------------- alligator (icon #40 style)
export function drawGator(c, x, y, L, col = '#3E5A3A', open = 0.25) {
  c.save(); c.translate(x, y);
  c.fillStyle = col;
  c.beginPath(); // long low body with a tail taper
  c.moveTo(-L * 0.5, 0); c.quadraticCurveTo(-L * 0.25, -L * 0.07, L * 0.15, -L * 0.07); c.lineTo(L * 0.28, -L * 0.05);
  c.lineTo(L * 0.5, -L * 0.05 - open * L * 0.08); c.lineTo(L * 0.33, -L * 0.015); c.lineTo(L * 0.5, -L * 0.005 + open * L * 0.03);
  c.lineTo(L * 0.28, L * 0.03); c.quadraticCurveTo(-L * 0.1, L * 0.05, -L * 0.5, 0); c.fill();
  c.strokeStyle = shade(col, -0.35); c.lineWidth = Math.max(1, L * 0.015); c.beginPath(); // zigzag ridged back
  for (let k = 0; k <= 10; k++) { const px = -L * 0.42 + k * L * 0.06; c.lineTo(px, -L * (k % 2 ? 0.075 : 0.045)); }
  c.stroke();
  c.fillStyle = '#F4E3B2'; c.beginPath(); c.arc(L * 0.24, -L * 0.065, Math.max(1, L * 0.012), 0, TAU); c.fill();
  // legs
  c.fillStyle = col; for (const lx of [-0.12, 0.12]) { c.fillRect(lx * L, L * 0.02, L * 0.05, L * 0.05); }
  c.restore();
}

// Wood-grain plank fill for historic grandstands and fences.
export function planks(c, x, y, w, h, col, vertical = false) {
  c.fillStyle = col; c.fillRect(x, y, w, h);
  c.strokeStyle = shade(col, -0.25); c.lineWidth = 1;
  c.beginPath();
  if (vertical) for (let k = x; k < x + w; k += 7) { c.moveTo(k, y); c.lineTo(k, y + h); }
  else for (let k = y; k < y + h; k += 6) { c.moveTo(x, k); c.lineTo(x + w, k); }
  c.stroke();
}
export { shade };
