// 3D ballparks (three.js): the field surface, walls, stands, light towers, scoreboard, trees, painted
// Ouachita ridges, sky and, at the historic-style park, Whittington Avenue and the alligator farm.
// World axes: three X = game x (toward first base), three Y = up, three Z = −game y (center field is −Z).
// Units are feet, like the sim. Built once per park + lighting and cached.
import { PARKS, BASES, fenceDist, fenceHeight, polar, D2R, MOUND } from './park.js';

let T = null;
export const W3 = { tex: {}, img: {}, quality: 'high' };
export const V3 = (x, y, z = 0) => new T.Vector3(x, z, -y);

// Lighting presets. day: midday high-school game; golden: late-afternoon spring training; night: under the lights.
export const LOOKS = {
  home: { sky: ['#4F93D6', '#CFE3EE'], sun: '#FFF1D6', sunI: 2.6, hemi: ['#CFE6FF', '#5E7A3E'], hemiI: 1.1, fog: '#C9DCE6', ridge: 'ridges-day', grass: '#4E9A3F', grass2: '#428A36', foul: '#3F7F35', dirt: '#B86A3E', track: '#A7643F', wall: '#1F4A33', wallTop: '#E6B422', crowd: 'crowd-modern', exposure: 0.88, sunPos: [-400, 600, 110] },
  majestic: { sky: ['#3F86CF', '#D2E6F0'], sun: '#FFF3DE', sunI: 2.7, hemi: ['#D2E8FF', '#3F7A40'], hemiI: 1.1, fog: '#CADDE7', ridge: 'ridges-day', grass: '#2E9A4A', grass2: '#27893F', foul: '#25803C', dirt: '#B5653A', track: '#8E5636', wall: '#173F30', wallTop: '#D4A017', crowd: 'crowd-modern', turf: true, exposure: 0.88, sunPos: [-380, 620, 100] },
  historic: { sky: ['#7FB2D6', '#F2D9A8'], sun: '#FFD9A0', sunI: 2.9, hemi: ['#F4DDB8', '#6C6A3A'], hemiI: 0.95, fog: '#E8D3AE', ridge: 'ridges-golden', grass: '#6F9C46', grass2: '#668F3F', foul: '#6A8E40', dirt: '#B98A5C', track: '#A47A50', wall: '#4B5A3A', wallTop: '#5A3E24', crowd: 'crowd-historic', wood: true, exposure: 0.92, sunPos: [-420, 300, 120] },
  night: { sky: ['#0B1430', '#2C3C66'], sun: '#E8EEFF', sunI: 1.0, hemi: ['#4A5A88', '#1A2416'], hemiI: 0.55, fog: '#121A30', ridge: 'ridges-night', exposure: 1.05, sunPos: [60, 380, 160], night: true },
};
export function lookFor(parkKey, night) {
  const base = LOOKS[parkKey] || LOOKS.home;
  return night ? { ...base, ...LOOKS.night, grass: base.grass, grass2: base.grass2, foul: base.foul, dirt: base.dirt, track: base.track, wall: base.wall, wallTop: base.wallTop, crowd: base.crowd, turf: base.turf, wood: base.wood } : base;
}

// ---------------------------------------------------------------- textures
export function setThree(t) { T = t; }
function canvas(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
function texFrom(img, repeat = 1, srgb = true) {
  const t = new T.Texture(img);
  t.wrapS = t.wrapT = T.RepeatWrapping; t.repeat.set(repeat, repeat);
  if (srgb) t.colorSpace = T.SRGBColorSpace;
  t.anisotropy = W3.quality === 'low' ? 1 : 8; t.needsUpdate = true;
  return t;
}
export function imgTex(name, repeat = 1) {
  if (!W3.img[name]) return null;
  const k = `${name}|${repeat}`;
  if (!W3.tex[k]) W3.tex[k] = texFrom(W3.img[name], repeat);
  return W3.tex[k];
}
// Fallback grain when a painted tile is missing (or ?art=0): soft value noise.
function noiseTex(k, base, amp) {
  if (W3.tex[k]) return W3.tex[k];
  const c = canvas(256, 256), x = c.getContext('2d');
  x.fillStyle = base; x.fillRect(0, 0, 256, 256);
  let s = 7; const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < 2600; i++) { x.fillStyle = `rgba(${r() < 0.5 ? '0,0,0' : '255,255,255'},${amp * r()})`; x.fillRect(r() * 256, r() * 256, 1 + r() * 3, 1 + r() * 3); }
  return (W3.tex[k] = texFrom(c, 1));
}

// ---------------------------------------------------------------- field surface (painted top-down map)
const MAP = { x0: -330, x1: 330, y0: -130, y1: 530 };
function fieldMap(park, L) {
  const S = W3.quality === 'low' ? 1024 : 2048, cv = canvas(S, S), c = cv.getContext('2d');
  const k = S / (MAP.x1 - MAP.x0);
  const P = (x, y) => [(x - MAP.x0) * k, (MAP.y1 - y) * k];
  const far = (th, r) => P(...polar(r, th));
  c.fillStyle = L.foul; c.fillRect(0, 0, S, S);
  // fair fan with mow pattern (checkerboard of two diagonal directions), turf gets tighter stripes
  c.save();
  c.beginPath(); c.moveTo(...P(0, 0));
  for (let th = -45; th <= 45; th += 1) c.lineTo(...far(th, fenceDist(park, th) - 12));
  c.closePath(); c.clip();
  c.fillStyle = L.grass; c.fillRect(0, 0, S, S);
  if (!L.wood) {
    const st = (L.turf ? 15 : 24) * k;
    c.translate(...P(0, 0)); c.rotate(-Math.PI / 4);
    c.globalAlpha = L.turf ? 0.32 : 0.36; for (let i = -40; i < 40; i++) for (let j = -40; j < 40; j++) if ((i + j) & 1) { c.fillStyle = L.grass2; c.fillRect(i * st, j * st, st, st); } c.globalAlpha = 1;
  } else { // sun-baked spring grass: patchy
    let s = 11; const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
    for (let i = 0; i < 900; i++) { c.fillStyle = `rgba(${r() < 0.5 ? '120,110,60' : '70,110,50'},0.12)`; const [x, y] = P(-300 + r() * 600, r() * 420); c.beginPath(); c.ellipse(x, y, 6 + r() * 30, 4 + r() * 16, r() * 3, 0, Math.PI * 2); c.fill(); }
  }
  c.restore();
  // foul-territory mow lines parallel to the lines (subtle)
  // warning track
  c.strokeStyle = L.track; c.lineWidth = 13 * k; c.beginPath();
  for (let th = -47; th <= 47; th += 1) { const p = far(th, fenceDist(park, Math.max(-45, Math.min(45, th))) - 6.5); th === -47 ? c.moveTo(...p) : c.lineTo(...p); } c.stroke();
  // infield
  const m = P(0, 60.5);
  if (L.turf) { // turf infield with dirt cutouts
    c.fillStyle = shadeHex(L.grass, -0.05); c.beginPath(); c.arc(...m, 95 * k, 0, Math.PI * 2); c.fill();
    c.strokeStyle = '#B07A55'; c.lineWidth = 7 * k; c.beginPath(); c.moveTo(...P(0, 0)); for (const b of [BASES[1], BASES[2], BASES[3]]) c.lineTo(...P(...b)); c.closePath(); c.stroke();
    c.fillStyle = L.dirt;
    for (const b of BASES.slice(1)) { c.beginPath(); c.arc(...P(...b), 13 * k, 0, Math.PI * 2); c.fill(); }
  } else {
    c.fillStyle = L.dirt; c.beginPath(); c.arc(...m, 95 * k, 0, Math.PI * 2); c.fill();
    // infield grass with rounded corners at the bases
    c.fillStyle = L.wood ? '#6A9541' : L.grass;
    c.beginPath(); [[0, 9], [55, 63.6], [0, 118], [-55, 63.6]].forEach(([x, y], i) => (i ? c.lineTo(...P(x, y)) : c.moveTo(...P(x, y)))); c.closePath(); c.fill();
    if (!L.wood) { c.save(); c.clip(); c.translate(...P(0, 0)); c.rotate(-Math.PI / 4); const st = 9 * k; for (let i = -30; i < 30; i++) for (let j = -30; j < 30; j++) if ((i + j) & 1) { c.globalAlpha = 0.5; c.fillStyle = L.grass2; c.fillRect(i * st, j * st, st, st); c.globalAlpha = 1; } c.restore(); }
    c.fillStyle = L.dirt;
    for (const b of [BASES[1], BASES[3]]) { c.beginPath(); c.arc(...P(...b), 12 * k, 0, Math.PI * 2); c.fill(); }
    // base paths (the dirt lane from home to first and third)
    c.strokeStyle = L.dirt; c.lineWidth = 6 * k; c.beginPath(); c.moveTo(...P(...BASES[3])); c.lineTo(...P(0, 0)); c.lineTo(...P(...BASES[1])); c.stroke();
  }
  c.fillStyle = L.dirt; c.beginPath(); c.arc(...m, 9 * k, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.arc(...P(0, 0), 13 * k, 0, Math.PI * 2); c.fill();
  // chalk: foul lines to the poles, a coach's box each side
  c.strokeStyle = 'rgba(250,250,246,0.95)'; c.lineWidth = Math.max(2, 0.5 * k);
  for (const s of [-1, 1]) { const d = fenceDist(park, s * 45); c.beginPath(); c.moveTo(...P(0, 0)); c.lineTo(...P(s * d * Math.SQRT1_2, d * Math.SQRT1_2)); c.stroke(); }
  for (const s of [-1, 1]) { c.strokeRect(...P(s * 78 - 5, 52 + (s > 0 ? 0 : 0)), 10 * k, 20 * k); }
  // on-deck circles
  c.fillStyle = 'rgba(0,0,0,0.12)';
  for (const s of [-1, 1]) { c.beginPath(); c.arc(...P(s * 42, -22), 2.5 * k, 0, Math.PI * 2); c.fill(); }
  const t = texFrom(cv, 1); t.wrapS = t.wrapT = T.ClampToEdgeWrapping; t.repeat.set(1, 1);
  return t;
}
function shadeHex(h, a) {
  const n = parseInt(h.slice(1), 16); let r = n >> 16, g = (n >> 8) & 255, b = n & 255;
  const f = (v) => Math.round(a < 0 ? v * (1 + a) : v + (255 - v) * a);
  return `#${((1 << 24) | (f(r) << 16) | (f(g) << 8) | f(b)).toString(16).slice(1)}`;
}

// Mean linear luminance of a painted tile (so its detail averages to 1 and only adds grain).
function meanLum(name) {
  const im = W3.img[name];
  if (!im) return 0.5;
  const c = canvas(32, 32), x = c.getContext('2d'); x.drawImage(im, 0, 0, 32, 32);
  let d; try { d = x.getImageData(0, 0, 32, 32).data; } catch (e) { return 0.2; } // a tainted image: assume a mid tone
  let s = 0;
  const lin = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  for (let i = 0; i < d.length; i += 4) s += 0.299 * lin(d[i]) + 0.587 * lin(d[i + 1]) + 0.114 * lin(d[i + 2]);
  return Math.max(0.02, s / 1024);
}
// Ground material: the painted map plus a world-space detail tile (grass or clay, chosen by hue).
function groundMaterial(map) {
  const grass = imgTex('grass-tile') || noiseTex('n-grass', '#808080', 0.18);
  const clay = imgTex('clay-tile') || noiseTex('n-clay', '#808080', 0.22);
  const mat = new T.MeshStandardMaterial({ map, roughness: 0.95, metalness: 0 });
  mat.onBeforeCompile = (sh) => {
    sh.uniforms.tGrass = { value: grass }; sh.uniforms.tClay = { value: clay };
    sh.uniforms.gMean = { value: meanLum('grass-tile') }; sh.uniforms.cMean = { value: meanLum('clay-tile') };
    sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying vec2 vWxz;')
      .replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvWxz = (modelMatrix * vec4(transformed, 1.0)).xz;');
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nvarying vec2 vWxz; uniform sampler2D tGrass; uniform sampler2D tClay; uniform float gMean; uniform float cMean;')
      .replace('#include <map_fragment>', `#include <map_fragment>
        vec3 gd = texture2D(tGrass, vWxz / 9.0).rgb; vec3 cd = texture2D(tClay, vWxz / 7.0).rgb;
        float dirt = smoothstep(0.02, 0.12, diffuseColor.r - diffuseColor.g);
        float lg = dot(gd, vec3(0.299, 0.587, 0.114)), lc = dot(cd, vec3(0.299, 0.587, 0.114));
        float det = mix(lg / gMean, lc / cMean, dirt); // luminance only, so the painted map keeps its hue
        diffuseColor.rgb *= mix(1.0, clamp(det, 0.55, 1.5), 0.6);`);
  };
  return mat;
}

// ---------------------------------------------------------------- helpers
const box = (w, h, d, mat) => new T.Mesh(new T.BoxGeometry(w, h, d), mat);
function at(o, x, y, z = 0) { o.position.copy(V3(x, y, z)); return o; }
function std(color, o = {}) { return new T.MeshStandardMaterial({ color, roughness: 0.85, metalness: 0, ...o }); }
function label(text, o = {}) {
  const c = canvas(o.w || 256, o.h || 128), x = c.getContext('2d');
  if (o.bg) { x.fillStyle = o.bg; x.fillRect(0, 0, c.width, c.height); }
  x.fillStyle = o.color || '#FFFFFF'; x.font = o.font || '900 96px "Arial Black", Impact, sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.fillText(text, c.width / 2, c.height / 2 + 4);
  const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; t.anisotropy = 4;
  return t;
}

// The field boundary: fair fence (θ −45…45), foul walls parallel to the lines, the backstop arc.
function boundary(park) {
  const pts = [];
  const off = 38; // foul wall distance from the line
  const pole = (s) => polar(fenceDist(park, s * 45), s * 45);
  // from the left-field pole down the third-base side to the backstop, around, up the first-base side
  const side = (s, from, to, step) => { for (let t = from; s * 0 + (step > 0 ? t <= to : t >= to); t += step) pts.push([s * (t * Math.SQRT1_2 + off * Math.SQRT1_2), t * Math.SQRT1_2 - off * Math.SQRT1_2]); };
  side(-1, fenceDist(park, -45), 30, -10);
  for (let a = 225 + 10; a <= 315 - 10; a += 6) { const r = 58; pts.push([r * Math.cos(a * D2R), r * Math.sin(a * D2R) + 4]); }
  side(1, 30, fenceDist(park, 45), 10);
  return { foul: pts, pole };
}

// ---------------------------------------------------------------- walls
function wallRibbon(points, heights, mat, uScale = 8) {
  const pos = [], uv = [], idx = [];
  let u = 0;
  for (let i = 0; i < points.length; i++) {
    if (i) u += Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]);
    const p = V3(points[i][0], points[i][1], 0), q = V3(points[i][0], points[i][1], heights[i]);
    pos.push(p.x, p.y, p.z, q.x, q.y, q.z); uv.push(u / uScale, 0, u / uScale, heights[i] / uScale);
    if (i) { const a = (i - 1) * 2; idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3); }
  }
  const g = new T.BufferGeometry();
  g.setAttribute('position', new T.Float32BufferAttribute(pos, 3)); g.setAttribute('uv', new T.Float32BufferAttribute(uv, 2)); g.setIndex(idx); g.computeVertexNormals();
  const m = new T.Mesh(g, mat); m.castShadow = true; m.receiveShadow = true;
  return m;
}
function padTex(color, top, wood) {
  if (wood && W3.img['planks-tile']) return imgTex('planks-tile', 1);
  const c = canvas(256, 256), x = c.getContext('2d');
  x.fillStyle = color; x.fillRect(0, 0, 256, 256);
  if (wood) { x.strokeStyle = 'rgba(0,0,0,0.3)'; for (let i = 0; i < 256; i += 32) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, 256); x.stroke(); } }
  else { x.fillStyle = 'rgba(255,255,255,0.05)'; x.fillRect(0, 0, 256, 120); x.strokeStyle = 'rgba(0,0,0,0.35)'; x.lineWidth = 3; x.beginPath(); x.moveTo(1, 0); x.lineTo(1, 256); x.stroke(); }
  const t = texFrom(c, 1);
  return t;
}

// ---------------------------------------------------------------- stands, dugouts, towers
function crowdMat(L) {
  const t = imgTex(L.crowd);
  if (t) { const c = t.clone(); c.needsUpdate = true; return new T.MeshStandardMaterial({ map: c, roughness: 1 }); }
  const k = `crowd-proc|${L.wood ? 1 : 0}`;
  if (!W3.tex[k]) W3.tex[k] = texFrom(crowdCanvas(L.wood), 1);
  const c = W3.tex[k].clone(); c.needsUpdate = true;
  return new T.MeshStandardMaterial({ map: c, roughness: 1 });
}
// Procedural crowd (fallback for the painted strip): six rows of seated fans, heads, shirts and hats.
function crowdCanvas(old) {
  const W = 1024, H = 256, cv = canvas(W, H), x = cv.getContext('2d');
  x.fillStyle = old ? '#7A6046' : '#8E959E'; x.fillRect(0, 0, W, H);
  const shirts = old ? ['#E9E2D0', '#CBBE9F', '#3B3A3F', '#5A4A3A', '#8C7B62', '#F3EEE2', '#2F3B4F'] : ['#8E2F1F', '#1F2F5C', '#2E6A3C', '#D4A017', '#F4F1EA', '#3A3F48', '#C8452B', '#5B7FA6', '#7A2E5A', '#E6B422'];
  const skins = ['#F1C9A5', '#E0AC86', '#C68863', '#A86B45', '#7D4A2A', '#5A3420'];
  let s = 9; const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
  for (let row = 0; row < 6; row++) {
    const y = H - 18 - row * 40, step = 17;
    x.fillStyle = old ? '#5E4630' : '#B9BEC4'; x.fillRect(0, y + 10, W, 6); // bench board
    for (let px = (row % 2) * 8; px < W; px += step + r() * 6) {
      if (r() < 0.12) continue; // empty seat
      const sh = shirts[Math.floor(r() * shirts.length)], sk = skins[Math.floor(r() * skins.length)];
      x.fillStyle = sh; x.beginPath(); x.ellipse(px, y + 2, 7, 11, 0, 0, Math.PI * 2); x.fill();
      x.fillStyle = sk; x.beginPath(); x.arc(px, y - 13, 5.5, 0, Math.PI * 2); x.fill();
      const hat = old ? r() < 0.75 : r() < 0.35;
      if (hat) { x.fillStyle = old ? (r() < 0.5 ? '#D9C79A' : '#3A3330') : shirts[Math.floor(r() * shirts.length)]; x.fillRect(px - 7, y - 19, 14, 4); x.fillRect(px - 5, y - 23, 10, 5); }
      if (r() < 0.12) { x.strokeStyle = sk; x.lineWidth = 3; x.beginPath(); x.moveTo(px + 5, y - 4); x.lineTo(px + 9, y - 22); x.stroke(); } // a cheering arm
    }
  }
  return cv;
}
// A bank of seating along a base line a→b (game coords): rows rise away from the field.
// Built in a local frame (x along the bank, y up, z away from the field), then placed with a basis matrix.
function seating(group, a, b, rows, L, o = {}) {
  const A = V3(a[0], a[1], 0), Bv = V3(b[0], b[1], 0);
  const xAx = Bv.clone().sub(A); const len = xAx.length(); xAx.normalize();
  const yAx = new T.Vector3(0, 1, 0);
  let zAx = new T.Vector3().crossVectors(xAx, yAx).normalize(); // horizontal normal
  const mid = A.clone().add(Bv).multiplyScalar(0.5);
  if (zAx.dot(mid) < 0) zAx.negate(); // away from home plate (the origin)
  const base = o.base || 3, rise = o.rise || 1.6, run = o.run || 2.6, D = rows * run, H = base + rows * rise;
  const holder = new T.Group();
  const basis = new T.Matrix4().makeBasis(xAx, yAx, zAx); basis.setPosition(A);
  holder.matrixAutoUpdate = false; holder.matrix.copy(basis);
  // stepped structure: shape in (depth, height), extruded along the bank
  const shape = new T.Shape(); shape.moveTo(0, 0); shape.lineTo(0, base);
  for (let r = 0; r < rows; r++) { shape.lineTo(r * run, base + (r + 1) * rise); shape.lineTo((r + 1) * run, base + (r + 1) * rise); }
  shape.lineTo(D, 0); shape.closePath();
  const geo = new T.ExtrudeGeometry(shape, { depth: len, bevelEnabled: false });
  geo.applyMatrix4(new T.Matrix4().set(0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1)); // (depth, h, len) → (len, h, depth)
  geo.computeVertexNormals();
  const struct = new T.Mesh(geo, o.structMat || std(L.wood ? '#8A6A44' : '#9AA0A8', { roughness: 0.7, metalness: L.wood ? 0 : 0.3, side: T.DoubleSide }));
  struct.castShadow = true; struct.receiveShadow = true; holder.add(struct);
  // the crowd: one inclined textured quad resting on the steps
  const cm = crowdMat(L);
  if (cm.map) { cm.map.repeat.set(Math.max(1, Math.round(len / 75)), Math.max(1, Math.round(rows / 6))); cm.map.wrapT = T.RepeatWrapping; } // the strip holds ~6 rows, ~75 ft wide at true scale
  const slope = Math.hypot(D, rows * rise);
  const crowd = new T.Mesh(new T.PlaneGeometry(len, slope), cm);
  crowd.position.set(len / 2, base + rows * rise / 2 + 1.4, D / 2);
  crowd.rotation.set(-(Math.PI / 2 - Math.atan2(rows * rise, D)), Math.PI, 0, 'YXZ');
  crowd.receiveShadow = true; holder.add(crowd);
  if (o.roof) {
    const roof = new T.Mesh(new T.PlaneGeometry(len + 4, D + 8), std(L.wood ? '#5E4A33' : '#C9CDD2', { side: T.DoubleSide, roughness: 0.8 }));
    roof.rotation.x = -Math.PI / 2 - 0.12; roof.position.set(len / 2, H + 9, D / 2 + 1); roof.castShadow = true; holder.add(roof);
    const postM = std(L.wood ? '#4A3824' : '#8A9098');
    for (let s = 0; s <= len + 0.1; s += o.postGap || 16) for (const dz of [0.5, D + 2]) {
      const ph = H + 9 + (dz > 1 ? 1 : 0); const post = box(0.7, ph, 0.7, postM); post.position.set(s, ph / 2, dz); post.castShadow = true; holder.add(post);
    }
    if (L.wood) { const fas = box(len + 4, 2.4, 0.4, std('#E9DFC6')); fas.position.set(len / 2, H + 8.6, -2.6); holder.add(fas); }
  }
  if (o.box) {
    const w = Math.min(40, len * 0.5);
    const pb = box(w, 9, 12, std(L.wood ? '#7B5B3A' : '#D7DADF')); pb.position.set(len / 2, H + 4.5, D - 4); pb.castShadow = true; holder.add(pb);
    const win = box(w - 2, 3, 0.3, std('#20303A', { roughness: 0.2, metalness: 0.4 })); win.position.set(len / 2, H + 5.5, D - 10.2); holder.add(win);
  }
  if (o.brace) { // 1912 Hot Springs photos: unroofed plank stands, a solid board front wall, X-braced timber frame behind
    const wm = new T.MeshStandardMaterial({ map: imgTex('planks-tile', 1) || null, color: imgTex('planks-tile') ? '#C9B08A' : '#8A6A44', roughness: 0.95 });
    const front = box(len, base + 0.8, 0.5, wm); front.position.set(len / 2, (base + 0.8) / 2, -0.3); front.castShadow = true; holder.add(front);
    const tim = std('#5E4630');
    for (let s = 0; s + 12 <= len + 0.1; s += 12) {
      for (const z of [D + 0.4]) {
        for (const [x0, x1] of [[s, s + 12], [s + 12, s]]) {
          const dx = x1 - x0, L2 = Math.hypot(dx, H);
          const b = box(0.5, L2, 0.5, tim); b.position.set((x0 + x1) / 2, H / 2, z); b.rotation.z = Math.atan2(-dx, H); b.castShadow = true; holder.add(b);
        }
        const post = box(0.8, H, 0.8, tim); post.position.set(s, H / 2, z); holder.add(post);
      }
    }
  }
  group.add(holder);
  return holder;
}

// The historic grandstand was "built into the side of a mountain" (Hot Springs Baseball Trail): a wooded
// slope rising behind home plate toward Sugarloaf Mountain (research/historic-park-visuals.md §2, §6).
function hillside(group, L) {
  const geo = new T.PlaneGeometry(900, 520, 36, 20);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), v = pos.getY(i); // v: −260 (near) … 260 (far)
    const u = (v + 260) / 520;
    pos.setZ(i, Math.pow(u, 1.3) * 190 + 8 * Math.sin(x * 0.02) * u);
  }
  geo.computeVertexNormals();
  const m = new T.Mesh(geo, std(L.night ? '#1D261A' : '#6B6A45', { roughness: 1 }));
  m.rotation.x = -Math.PI / 2; m.rotation.z = Math.PI; m.position.copy(V3(0, -370, -2)); m.receiveShadow = true;
  group.add(m);
  // pines and bare hardwoods scattered up the slope
  const n = W3.quality === 'low' ? 60 : 160;
  const pine = new T.InstancedMesh(new T.ConeGeometry(1, 1, 7).translate(0, 0.5, 0), std(L.night ? '#16261A' : '#3A5634', { roughness: 1 }), n);
  const oak = new T.InstancedMesh(new T.IcosahedronGeometry(1, 1), std(L.night ? '#1E2A1E' : '#8C8273', { roughness: 1, flatShading: true }), n);
  const mm = new T.Matrix4(), q = new T.Quaternion(), s = new T.Vector3();
  let sd = 17; const r = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < n; i++) {
    const x = -420 + r() * 840, yy = -150 - r() * 470, u = (-110 - yy) / 520;
    if (u < 0.05) continue;
    const h = Math.pow(Math.max(0, u), 1.3) * 190 + 8 * Math.sin(x * 0.02) * u;
    const ph = 26 + r() * 22, w = 8 + r() * 5;
    mm.compose(V3(x, yy, h), q, s.set(w, ph, w)); pine.setMatrixAt(i, mm);
    mm.compose(V3(x + 14, yy - 9, h + 12), q, s.set(10, 9, 10)); oak.setMatrixAt(i, mm);
  }
  group.add(pine); group.add(oak);
}

// The steel Rix Tower (1906 to the 1970s; about 165 ft) on Hot Springs Mountain, east of the park and
// in line of sight per USGS terrain (research/historic-park-visuals.md §8). Seen far off over left-center.
function rixTower(group, L) {
  const g = new T.Group(), m = std(L.night ? '#2A2E36' : '#7C8088', { metalness: 0.4, roughness: 0.6 });
  const H = 165;
  for (const [x, z] of [[-9, -9], [9, -9], [9, 9], [-9, 9]]) {
    const leg = new T.Mesh(new T.CylinderGeometry(0.9, 1.4, H, 5), m);
    leg.position.set(x * 0.6, H / 2, z * 0.6); leg.rotation.set(z * 0.004, 0, -x * 0.004); g.add(leg);
  }
  for (let y = 20; y < H; y += 24) { const ring = box(13, 1.2, 13, m); ring.position.y = y; ring.scale.set(1 - y / H * 0.4, 1, 1 - y / H * 0.4); g.add(ring); }
  const deck = box(20, 6, 20, std(L.night ? '#3A3020' : '#8A7A62')); deck.position.y = H + 3; g.add(deck);
  const cap = new T.Mesh(new T.ConeGeometry(14, 12, 4), std('#5A4A3A')); cap.position.y = H + 12; cap.rotation.y = Math.PI / 4; g.add(cap);
  const [x, y] = polar(2300, -45); // due east of the park; the batter faces south-east
  g.position.copy(V3(x, y, 95)); g.scale.setScalar(1.6);
  group.add(g);
}

function dugout(group, s, L) {
  // sunk along the foul wall, between home and the base
  const g = new T.Group();
  const conc = std(L.wood ? '#6E5A40' : '#8C8F93');
  const back = box(34, 7, 1, conc); back.position.set(0, 2, -5); g.add(back);
  const roof = box(36, 0.8, 7, std(L.wood ? '#5A4630' : L.wall)); roof.position.set(0, 5.6, -1.6); roof.castShadow = true; g.add(roof);
  const lip = box(36, 1.6, 0.6, std(L.wood ? '#E9DFC6' : L.wallTop)); lip.position.set(0, 5.1, 1.7); g.add(lip);
  const bench = box(30, 1.2, 1.6, std('#5A3A22')); bench.position.set(0, 1.2, -3.8); g.add(bench);
  const floor = box(34, 0.4, 7, std('#3A3A38')); floor.position.set(0, -1.6, -1.6); g.add(floor);
  const inner = box(34, 6, 6, std('#141414', { roughness: 1 })); inner.position.set(0, 1.2, -2.2); g.add(inner);
  const t = 62, off = 45;
  const x = s * (t * Math.SQRT1_2 + off * Math.SQRT1_2), y = t * Math.SQRT1_2 - off * Math.SQRT1_2;
  g.position.copy(V3(x, y, 0));
  g.rotation.y = s > 0 ? Math.PI / 4 + Math.PI : -Math.PI / 4 + Math.PI;
  group.add(g);
}

function tower(group, x, y, h, L, wood) {
  const g = new T.Group();
  const poleM = std(wood ? '#5A4128' : '#9097A0', { metalness: wood ? 0 : 0.5, roughness: wood ? 0.9 : 0.5 });
  const pole = new T.Mesh(new T.CylinderGeometry(wood ? 0.9 : 1.1, wood ? 1.3 : 1.6, h, 8), poleM);
  pole.position.y = h / 2; pole.castShadow = true; g.add(pole);
  const lampOn = !!L.night;
  const lampM = new T.MeshStandardMaterial({ color: lampOn ? '#FFFFFF' : '#E8E4D8', emissive: lampOn ? '#FFF6D8' : '#000000', emissiveIntensity: lampOn ? 3 : 0, roughness: 0.4 });
  const frameM = std(wood ? '#4A3520' : '#6A707A', { metalness: 0.4 });
  const cols = wood ? 4 : 5, rows = wood ? 2 : 4;
  const frame = box(cols * 3.2 + 1, rows * 3.2 + 1, 1, frameM); frame.position.y = h + rows * 1.6; g.add(frame);
  for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
    const lamp = new T.Mesh(new T.CylinderGeometry(1.25, 1.25, 0.8, 12), lampM);
    lamp.rotation.x = Math.PI / 2; lamp.position.set((i - (cols - 1) / 2) * 3.2, h + 1.6 + j * 3.2, 0.7); g.add(lamp);
  }
  if (wood) for (const yy of [h - 6, h - 14]) { const arm = box(cols * 3.2 + 4, 0.6, 0.6, poleM); arm.position.y = yy; g.add(arm); }
  if (lampOn) {
    const spr = new T.Sprite(new T.SpriteMaterial({ map: glowTex(), color: '#FFF3CC', transparent: true, depthWrite: false, blending: T.AdditiveBlending, opacity: 0.9, fog: false }));
    spr.scale.set(70, 70, 1); spr.position.set(0, h + rows * 1.6, 3); g.add(spr);
  }
  g.position.copy(V3(x, y, 0));
  g.lookAt(0, h * 0.6, -120); // face the infield
  g.rotation.x = 0; g.rotation.z = 0;
  group.add(g);
  return g;
}
export function glowTex() {
  if (W3.tex.glow) return W3.tex.glow;
  const c = canvas(128, 128), x = c.getContext('2d');
  const gr = x.createRadialGradient(64, 64, 2, 64, 64, 64); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.25, 'rgba(255,240,200,0.55)'); gr.addColorStop(1, 'rgba(255,240,200,0)');
  x.fillStyle = gr; x.fillRect(0, 0, 128, 128);
  return (W3.tex.glow = new T.CanvasTexture(c));
}

// ---------------------------------------------------------------- scoreboard (live)
export function makeScoreboard(group, L, x, y, wood) {
  const cv = canvas(512, 256);
  const tex = new T.CanvasTexture(cv); tex.colorSpace = T.SRGBColorSpace; tex.anisotropy = 4;
  const g = new T.Group();
  const face = new T.Mesh(new T.PlaneGeometry(64, 32), new T.MeshStandardMaterial({ map: tex, emissive: '#FFFFFF', emissiveMap: tex, emissiveIntensity: L.night ? 0.9 : 0.35, roughness: 0.8 }));
  face.position.y = 30; g.add(face);
  const frame = box(67, 35, 1.5, std(wood ? '#3F4A30' : '#1D2A22')); frame.position.set(0, 30, -0.9); frame.castShadow = true; g.add(frame);
  for (const s of [-1, 1]) { const leg = box(1.6, 14, 1.6, std(wood ? '#4A3824' : '#5A6068')); leg.position.set(s * 22, 7, -1); g.add(leg); }
  g.position.copy(V3(x, y, 0));
  g.lookAt(0, 30, 40);
  group.add(g);
  return { cv, tex, wood, key: '' };
}
export function drawScoreboard(sb, st) {
  const key = JSON.stringify(st);
  if (!sb || sb.key === key) return;
  sb.key = key;
  const c = sb.cv.getContext('2d'), W = 512, H = 256;
  c.fillStyle = sb.wood ? '#2F3A26' : '#0F1A14'; c.fillRect(0, 0, W, H);
  c.strokeStyle = sb.wood ? '#E9DFC6' : '#D4A017'; c.lineWidth = 6; c.strokeRect(6, 6, W - 12, H - 12);
  const digit = sb.wood ? '#F3E9D2' : '#FFD84D';
  c.font = `900 ${sb.wood ? 30 : 32}px ${sb.wood ? 'Georgia, serif' : '"Arial Black", Impact, sans-serif'}`; c.textBaseline = 'middle';
  c.fillStyle = sb.wood ? '#E9DFC6' : '#FFFFFF'; c.textAlign = 'left';
  c.fillText(st.away || 'VISITOR', 26, 70); c.fillText(st.home || 'HOME', 26, 130);
  c.textAlign = 'center';
  for (const [v, y] of [[st.as, 70], [st.hs, 130]]) { c.fillStyle = sb.wood ? '#1E241A' : '#000000'; c.fillRect(W - 120, y - 26, 92, 52); c.fillStyle = digit; c.fillText(String(v ?? 0), W - 74, y + 2); }
  c.font = `800 26px ${sb.wood ? 'Georgia, serif' : 'system-ui, sans-serif'}`; c.fillStyle = sb.wood ? '#E9DFC6' : '#FFFFFF'; c.textAlign = 'left';
  c.fillText(`INN ${st.inn || 1}${st.top ? ' ▲' : ' ▼'}`, 26, 200);
  const dots = (lbl, n, max, x, col) => { c.fillStyle = sb.wood ? '#E9DFC6' : '#FFFFFF'; c.fillText(lbl, x, 200); for (let i = 0; i < max; i++) { c.fillStyle = i < n ? col : '#2A322C'; c.beginPath(); c.arc(x + 34 + i * 26, 200, 9, 0, Math.PI * 2); c.fill(); } };
  dots('B', st.b, 3, 190, '#8FE3A8'); dots('S', st.s, 2, 300, digit); dots('O', st.o, 2, 390, '#FF8A7A');
  sb.tex.needsUpdate = true;
}

// ---------------------------------------------------------------- trees, ridges, sky
function trees(group, park, L, gator) {
  const n = W3.quality === 'low' ? 220 : 760;
  const pineG = new T.ConeGeometry(1, 1, 7); pineG.translate(0, 0.5, 0);
  const oakG = new T.IcosahedronGeometry(1, 1);
  const trunkG = new T.CylinderGeometry(0.5, 0.7, 1, 5); trunkG.translate(0, 0.5, 0);
  const dark = !!L.night;
  const bare = L.wood; // March at the historic park: bare grey hardwoods among dark pines (research/historic-park-visuals.md §7)
  const pineM = std(dark ? '#22382A' : L.wood ? '#3A5634' : '#3C6A3A', { roughness: 1 });
  const oakM = std(dark ? '#284030' : bare ? '#9AA76A' : '#5C8A44', { roughness: 1 }); // historic: late-March budding hardwoods
  const trunkM = std('#4A3622');
  const pines = new T.InstancedMesh(pineG, pineM, n), oaks = new T.InstancedMesh(oakG, oakM, n), trunks = new T.InstancedMesh(trunkG, trunkM, n * 2);
  const m = new T.Matrix4(), q = new T.Quaternion(), s = new T.Vector3(), p = new T.Vector3();
  let seed = 3; const r = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  let ip = 0, io = 0, it = 0;
  const col = new T.Color();
  for (let i = 0; i < n * 2 && (ip < n || io < n); i++) {
    const th = -180 + r() * 360;
    const inFair = Math.abs(th) <= 60;
    const base = inFair ? fenceDist(park, Math.max(-45, Math.min(45, th))) + 55 : 240;
    const rr = base + Math.pow(r(), 1.6) * 780; // dense near the fence, thinning out toward the ridges
    if (gator && th > 8 && th < 58 && rr < base + 190) continue; // street and the farm
    if (Math.abs(th + 25) < 7 && rr < base + 60) continue; // scoreboard
    const [x, y] = polar(rr, th);
    if (!inFair && y > -60 && Math.abs(x) < 200 && y < 230) continue;
    const pine = r() < 0.6;
    const h = pine ? 26 + r() * 20 : 18 + r() * 14, w = pine ? 9 + r() * 5 : 12 + r() * 9;
    p.copy(V3(x, y, 0));
    if (pine && ip < n) {
      q.setFromAxisAngle(new T.Vector3(0, 1, 0), r() * 6); s.set(w, h * 0.85, w); m.compose(p.clone().setY(h * 0.15), q, s); pines.setMatrixAt(ip, m);
      col.set(pineM.color).offsetHSL(0, 0, (r() - 0.5) * 0.08); pines.setColorAt(ip, col); ip++;
    } else if (!pine && io < n) {
      q.identity(); s.set(w, w * 0.85, w); m.compose(p.clone().setY(h * 0.55), q, s); oaks.setMatrixAt(io, m);
      col.set(oakM.color).offsetHSL((r() - 0.5) * 0.04, 0, (r() - 0.5) * 0.1); oaks.setColorAt(io, col); io++;
    } else continue;
    if (it < n * 2) { s.set(1.2, h * (pine ? 0.25 : 0.4), 1.2); q.identity(); m.compose(p, q, s); trunks.setMatrixAt(it++, m); }
  }
  pines.count = ip; oaks.count = io; trunks.count = it;
  for (const im of [pines, oaks]) { im.castShadow = false; im.receiveShadow = false; group.add(im); }
  group.add(trunks);
}

function ridges(group, L) {
  const t = imgTex(L.ridge);
  const R = 2600, H = 900; // ridges fill the strip's lower ~55%: tops rise ~8–10° above the horizon, like the Ouachitas from the valley
  const mats = [];
  if (t) {
    const tex = t.clone(); tex.needsUpdate = true; tex.wrapS = T.RepeatWrapping; tex.repeat.set(5, 1); tex.wrapT = T.ClampToEdgeWrapping;
    const m = new T.MeshBasicMaterial({ map: tex, transparent: true, alphaTest: 0.02, side: T.BackSide, fog: false, depthWrite: false });
    // trim the keyed halo off the ridge tops, and fade the strip's bottom edge into the forest floor
    m.onBeforeCompile = (sh) => { sh.fragmentShader = sh.fragmentShader.replace('#include <map_fragment>', '#include <map_fragment>\ndiffuseColor.a = smoothstep(0.45, 0.95, diffuseColor.a) * smoothstep(0.0, 0.12, vMapUv.y);'); };
    if (L.night) m.color.setScalar(0.62); // the night painting reads too bright next to the dark 3D trees
    mats.push(m);
  } else {
    const c = canvas(1024, 256), x = c.getContext('2d');
    const layer = (y0, amp, col, f) => { x.fillStyle = col; x.beginPath(); x.moveTo(0, 256); for (let i = 0; i <= 1024; i += 8) x.lineTo(i, y0 - amp * (0.5 + 0.5 * Math.sin(i * f) * Math.cos(i * f * 0.37 + 1))); x.lineTo(1024, 256); x.fill(); };
    layer(150, 50, L.night ? '#22304A' : '#A9BCC6', 0.011); layer(180, 40, L.night ? '#18243A' : '#7C9A88', 0.017); layer(212, 30, L.night ? '#101A26' : '#4E7348', 0.023);
    const tex = new T.CanvasTexture(c); tex.colorSpace = T.SRGBColorSpace; tex.wrapS = T.RepeatWrapping; tex.repeat.set(5, 1);
    mats.push(new T.MeshBasicMaterial({ map: tex, transparent: true, side: T.BackSide, fog: false }));
  }
  const geo = new T.CylinderGeometry(R, R, H, 96, 1, true);
  const cyl = new T.Mesh(geo, mats[0]);
  cyl.position.set(0, H / 2 - 40, -200);
  cyl.renderOrder = -1;
  group.add(cyl);
}

function sky(group, L) {
  const geo = new T.SphereGeometry(5200, 32, 16);
  const mat = new T.ShaderMaterial({
    side: T.BackSide, depthWrite: false, fog: false,
    uniforms: { top: { value: new T.Color(L.sky[0]) }, hor: { value: new T.Color(L.sky[1]) }, sunDir: { value: new T.Vector3(...L.sunPos).normalize() }, night: { value: L.night ? 1 : 0 }, clouds: { value: W3.quality === 'low' ? 0 : 1 } },
    vertexShader: 'varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: `uniform vec3 top; uniform vec3 hor; uniform vec3 sunDir; uniform float night; uniform float clouds; varying vec3 vP;
      float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      void main(){ float y = max(vP.y, 0.0); vec3 c = mix(hor, top, pow(y, 0.55));
        float s = max(dot(vP, sunDir), 0.0); c += (1.0 - night) * vec3(1.0, 0.85, 0.6) * (pow(s, 64.0) * 0.6 + pow(s, 6.0) * 0.12);
        // soft fair-weather cloud bands (day only)
        vec2 q = vP.xz / max(0.12, vP.y) * 1.3; float n = 0.0; vec2 pp = q; if (clouds > 0.5) for (int i = 0; i < 4; i++){ vec2 f = fract(pp), ii = floor(pp); f = f*f*(3.0-2.0*f);
          float a = mix(mix(h(ii), h(ii+vec2(1,0)), f.x), mix(h(ii+vec2(0,1)), h(ii+vec2(1,1)), f.x), f.y); n += a / pow(2.0, float(i)); pp *= 2.03; }
        float cl = smoothstep(0.95, 1.35, n) * smoothstep(0.02, 0.25, vP.y) * (1.0 - night);
        c = mix(c, vec3(1.0, 0.98, 0.95), cl * 0.75);
        if (night > 0.5) { vec3 cell = floor(vP * 420.0); float st = step(0.9975, h(cell.xy + cell.z * 17.0)) * smoothstep(0.05, 0.4, vP.y); c += vec3(st * 0.9); }
        gl_FragColor = vec4(c, 1.0); }`,
  });
  const m = new T.Mesh(geo, mat); m.renderOrder = -2;
  group.add(m);
}

// ---------------------------------------------------------------- the alligator farm (historic park)
function alligatorFarm(group, park, L) {
  const g = new T.Group();
  // Whittington Avenue: an asphalt band behind the right-field fence
  const road = [];
  for (let th = 2; th <= 62; th += 3) road.push(th);
  const ribbon = (r0, r1, mat, y = 0.05) => {
    const pos = [], idx = [];
    road.forEach((th, i) => { const a = V3(...polar(fenceDist(park, Math.min(45, th)) + r0, th), y), b = V3(...polar(fenceDist(park, Math.min(45, th)) + r1, th), y); pos.push(a.x, a.y, a.z, b.x, b.y, b.z); if (i) { const k = (i - 1) * 2; idx.push(k, k + 1, k + 2, k + 1, k + 3, k + 2); } });
    const geo = new T.BufferGeometry(); geo.setAttribute('position', new T.Float32BufferAttribute(pos, 3)); geo.setIndex(idx); geo.computeVertexNormals();
    const m = new T.Mesh(geo, mat); m.receiveShadow = true; g.add(m); return m;
  };
  ribbon(10, 40, std('#5E5B55', { roughness: 0.95 }));
  ribbon(24.4, 25.6, std('#D9C98A'), 0.08); // center line
  // the farm (after a c.1924 photo): a horizontal-plank board fence, pools with curved white concrete
  // edges, a dirt basking bank, and an office with a sign board (research/historic-park-visuals.md §10)
  const fpts = []; for (let th = 10; th <= 58; th += 2) fpts.push(polar(fenceDist(park, Math.min(45, th)) + 46, th));
  const boardC = canvas(64, 64), bx = boardC.getContext('2d');
  bx.fillStyle = '#B79E78'; bx.fillRect(0, 0, 64, 64); bx.fillStyle = '#7E6A4E'; for (let yy = 0; yy < 64; yy += 16) bx.fillRect(0, yy, 64, 2);
  const boardT = texFrom(boardC, 1);
  g.add(wallRibbon(fpts, fpts.map(() => 5.5), new T.MeshStandardMaterial({ map: boardT, roughness: 0.95, side: T.DoubleSide }), 5.5));
  const sand = new T.Mesh(new T.CircleGeometry(1, 40), std('#C8B48A', { roughness: 1 }));
  const c0 = polar(fenceDist(park, 30) + 105, 30); sand.position.copy(V3(c0[0], c0[1], 0.06)); sand.rotation.x = -Math.PI / 2; sand.scale.set(85, 55, 1); sand.rotation.z = 0.4; sand.receiveShadow = true; g.add(sand);
  const water = new T.MeshStandardMaterial({ color: '#4E7F86', roughness: 0.15, metalness: 0.1, transparent: true, opacity: 0.92 });
  W3.water = water;
  for (const [th, dr, sx, sz, rot] of [[24, 95, 46, 26, 0.5], [38, 120, 34, 22, -0.3]]) {
    const p = polar(fenceDist(park, Math.min(45, th)) + dr, th);
    const pond = new T.Mesh(new T.CircleGeometry(1, 40), water);
    pond.position.copy(V3(p[0], p[1], 0.12)); pond.rotation.x = -Math.PI / 2; pond.rotation.z = rot; pond.scale.set(sx, sz, 1); g.add(pond);
    const rim = new T.Mesh(new T.RingGeometry(1, 1.1, 48), std('#EDEAE0', { roughness: 0.7 })); rim.position.copy(pond.position).setY(0.14); rim.rotation.copy(pond.rotation); rim.scale.copy(pond.scale); g.add(rim);
  }
  // gators basking on the sand and floating in the ponds
  const gm = std('#3D4A2E', { roughness: 0.7 });
  let sd = 5; const r = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < 14; i++) {
    const th = 16 + r() * 30, dr = 70 + r() * 70;
    const p = polar(fenceDist(park, Math.min(45, th)) + dr, th);
    const gt = gatorMesh(gm); gt.position.copy(V3(p[0], p[1], 0.3)); gt.rotation.y = r() * 6.28; gt.scale.setScalar(0.9 + r() * 0.5); g.add(gt);
  }
  // office with a sign board (game art; no real logo)
  const op = polar(fenceDist(park, 52) + 60, 52);
  const office = new T.Group();
  const walls = box(30, 12, 18, std('#E6D9B8')); walls.position.y = 6; walls.castShadow = true; office.add(walls);
  const roof = new T.Mesh(new T.ConeGeometry(19, 7, 4), std('#7A3A28')); roof.position.y = 15.5; roof.rotation.y = Math.PI / 4; roof.scale.set(1.15, 1, 0.75); roof.castShadow = true; office.add(roof);
  const sign = new T.Mesh(new T.PlaneGeometry(34, 7), new T.MeshStandardMaterial({ map: label('ALLIGATOR FARM', { w: 1024, h: 210, bg: '#F3E9D2', color: '#2E5436', font: '900 92px Georgia, "Times New Roman", serif' }), roughness: 0.8 }));
  sign.position.set(0, 22, 0); office.add(sign);
  for (const s of [-1, 1]) { const post = box(0.8, 10, 0.8, std('#4A3824')); post.position.set(s * 14, 17, -0.6); office.add(post); }
  office.position.copy(V3(op[0], op[1], 0));
  office.lookAt(0, 0, 0); office.rotation.x = 0; office.rotation.z = 0;
  g.add(office);
  group.add(g);
}
export function gatorMesh(mat) {
  const g = new T.Group();
  const body = new T.Mesh(new T.CapsuleGeometry(1.1, 5, 4, 8), mat); body.rotation.z = Math.PI / 2; body.scale.set(1, 1, 0.55); body.position.y = 0.4; g.add(body);
  const head = new T.Mesh(new T.BoxGeometry(3.2, 0.7, 1.3), mat); head.position.set(4.2, 0.45, 0); g.add(head);
  const tail = new T.Mesh(new T.ConeGeometry(0.9, 6, 6), mat); tail.rotation.z = Math.PI / 2; tail.position.set(-5.5, 0.35, 0); tail.scale.set(1, 1, 0.5); g.add(tail);
  for (const [x, z] of [[2, 1], [2, -1], [-1.8, 1], [-1.8, -1]]) { const leg = box(0.5, 0.5, 0.8, mat); leg.position.set(x, 0.15, z * 1.1); g.add(leg); }
  g.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  return g;
}

// Merge the park's static meshes that share a material (and shadow flags) into one mesh each:
// hundreds of posts, boards, gators and roof panels become a few dozen draw calls.
function batchStatic(root) {
  root.updateMatrixWorld(true);
  const groups = new Map(), victims = [];
  root.traverse((o) => {
    if (!o.isMesh || o.isInstancedMesh || o.isSkinnedMesh || !o.visible || Array.isArray(o.material)) return;
    const m = o.material;
    if (m.isShaderMaterial || m.transparent || m.map && m.map.isCanvasTexture && m.emissiveMap) return; // sky, decals, glass, the live scoreboard
    const k = `${m.uuid}|${o.castShadow ? 1 : 0}|${o.receiveShadow ? 1 : 0}`;
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k).push(o);
  });
  for (const list of groups.values()) {
    if (list.length < 2) continue;
    const geos = list.map((o) => {
      let g = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone();
      g.applyMatrix4(o.matrixWorld);
      if (!g.attributes.normal) g.computeVertexNormals();
      if (!g.attributes.uv) g.setAttribute('uv', new T.Float32BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
      for (const n of Object.keys(g.attributes)) if (!['position', 'normal', 'uv'].includes(n)) g.deleteAttribute(n);
      g.morphAttributes = {};
      return g;
    });
    const merged = T.mergeGeometries(geos, false);
    if (!merged) continue;
    const mesh = new T.Mesh(merged, list[0].material);
    mesh.castShadow = list[0].castShadow; mesh.receiveShadow = list[0].receiveShadow;
    root.add(mesh);
    victims.push(...list);
  }
  for (const o of victims) o.parent.remove(o);
  // groups emptied by the merge are left as harmless empty nodes
}

// ---------------------------------------------------------------- build a park
export function buildPark(parkKey, night) {
  const park = PARKS[parkKey] || PARKS.home, L = lookFor(parkKey, night);
  const root = new T.Group(); root.name = `park-${parkKey}-${night ? 'n' : 'd'}`;
  sky(root, L);
  ridges(root, L);
  // ground: painted map over the playing area, plain grass beyond
  const mapTex = fieldMap(park, L);
  const gw = MAP.x1 - MAP.x0, gh = MAP.y1 - MAP.y0;
  const field = new T.Mesh(new T.PlaneGeometry(gw, gh), groundMaterial(mapTex));
  field.rotation.x = -Math.PI / 2; field.position.copy(V3((MAP.x0 + MAP.x1) / 2, (MAP.y0 + MAP.y1) / 2, 0)); field.receiveShadow = true; root.add(field);
  const outer = new T.Mesh(new T.RingGeometry(320, 3000, 64, 1), groundMaterial(noiseTex('n-outer', L.wood ? '#6E8A44' : '#4D7A3C', 0)));
  outer.material.map = null; outer.material.color = new T.Color(night ? '#16241A' : L.wood ? '#4E5E34' : '#33532F'); outer.material.needsUpdate = true; // forest floor under the tree band
  outer.rotation.x = -Math.PI / 2; outer.position.copy(V3(0, 200, -0.2)); outer.receiveShadow = true; root.add(outer);
  // mound, plate, rubber, bases, batter's boxes
  const clayM = std(L.dirt, { roughness: 1 });
  const mound = new T.Mesh(new T.CylinderGeometry(8.6, 9.2, 0.8, 32), clayM); mound.position.copy(V3(0, 60.5, 0.35)); mound.receiveShadow = true; root.add(mound);
  const rubber = box(2, 0.2, 0.5, std('#FAFAF6')); rubber.position.copy(V3(0, 60.5, 0.82)); root.add(rubber);
  const plateShape = new T.Shape([[-0.71, 0], [0.71, 0], [0.71, 0.71], [0, 1.42], [-0.71, 0.71]].map(([x, y]) => new T.Vector2(x, y)));
  const plate = new T.Mesh(new T.ShapeGeometry(plateShape), std('#F7F7F2', { roughness: 0.6 }));
  plate.rotation.x = -Math.PI / 2; plate.position.set(0, 0.05, 0); plate.scale.set(1, -1, 1); root.add(plate);
  const baseM = std('#FBFBF7', { roughness: 0.6 });
  for (const b of BASES.slice(1)) { const bb = box(1.25, 0.3, 1.25, baseM); bb.position.copy(V3(b[0], b[1], 0.15)); bb.rotation.y = Math.PI / 4; bb.castShadow = true; root.add(bb); }
  const chalk = new T.MeshBasicMaterial({ color: '#F4F2EA', transparent: true, opacity: 0.92 });
  const line = (x0, y0, x1, y1, w = 0.28) => { const L2 = Math.hypot(x1 - x0, y1 - y0); const m = new T.Mesh(new T.PlaneGeometry(w, L2), chalk); m.rotation.x = -Math.PI / 2; m.rotation.z = Math.atan2(x1 - x0, y1 - y0); m.position.copy(V3((x0 + x1) / 2, (y0 + y1) / 2, 0.06)); root.add(m); };
  for (const s of [-1, 1]) {
    const xi = s * 1.2, xo = s * 5.2;
    line(xi, -3, xi, 3); line(xo, -3, xo, 3); line(xi, -3, xo, -3); line(xi, 3, xo, 3);
    line(s * 4.4, 4.4, s * 90 * Math.SQRT1_2 + s * 0, 90 * Math.SQRT1_2); // first stretch of each foul line, crisp near the camera
  }
  line(-1.7, -3, -1.7, -11); line(1.7, -3, 1.7, -11); line(-1.7, -11, 1.7, -11); // catcher's box
  // walls
  const B = boundary(park);
  const fair = []; for (let th = -45; th <= 45; th += 1.5) fair.push(polar(fenceDist(park, th), th));
  const hts = fair.map((p) => fenceHeight(park, Math.atan2(p[0], p[1]) / D2R));
  const wallT = padTex(L.wall, L.wallTop, L.wood);
  const wallM = new T.MeshStandardMaterial({ map: wallT, color: L.wood ? '#C9B79A' : '#FFFFFF', roughness: 0.9 });
  root.add(wallRibbon(fair, hts, wallM, L.wood ? 10 : 6));
  const capPts = fair.map((p, i) => p), capM = std(L.wallTop);
  const cap = wallRibbon(capPts, hts.map((h) => h + 0.6), capM, 10); cap.position.y = 0; root.add(cap);
  // move the cap ribbon so only its top 0.6 ft shows: a second ribbon starting at h
  cap.geometry.dispose(); root.remove(cap);
  { const pos = [], idx = []; capPts.forEach((p, i) => { const a = V3(p[0], p[1], hts[i]), b = V3(p[0], p[1], hts[i] + 0.7); pos.push(a.x, a.y, a.z, b.x, b.y, b.z); if (i) { const k = (i - 1) * 2; idx.push(k, k + 2, k + 1, k + 1, k + 2, k + 3); } });
    const geo = new T.BufferGeometry(); geo.setAttribute('position', new T.Float32BufferAttribute(pos, 3)); geo.setIndex(idx); geo.computeVertexNormals();
    const m = new T.Mesh(geo, new T.MeshStandardMaterial({ color: L.wallTop, roughness: 0.6, side: T.DoubleSide })); root.add(m); }
  root.add(wallRibbon(B.foul, B.foul.map(() => 4), new T.MeshStandardMaterial({ map: wallT, color: L.wood ? '#C9B79A' : '#FFFFFF', roughness: 0.9 }), 6));
  // backstop netting
  const netC = canvas(64, 64), nx = netC.getContext('2d'); nx.strokeStyle = 'rgba(25,25,25,0.55)'; nx.lineWidth = 1.5; nx.strokeRect(0, 0, 64, 64);
  const netT = new T.CanvasTexture(netC); netT.wrapS = netT.wrapT = T.RepeatWrapping;
  const back = []; for (let a = 225 + 4; a <= 315 - 4; a += 5) back.push([62 * Math.cos(a * D2R), 62 * Math.sin(a * D2R) + 4]);
  const net = wallRibbon(back, back.map(() => 30), new T.MeshBasicMaterial({ map: netT, transparent: true, side: T.DoubleSide, depthWrite: false }), 0.5);
  net.castShadow = false; root.add(net);
  // distance markers
  for (const th of [-45, -22.5, 22.5, 45]) { // center field has the batter's eye instead of a number
    const d = Math.round(fenceDist(park, th)), [x, y] = polar(fenceDist(park, th) - 1.2, th);
    const m = new T.Mesh(new T.PlaneGeometry(13.5, 4.5), new T.MeshBasicMaterial({ map: label(String(d), { w: 384,  color: L.wood ? '#F3E9D2' : '#FFFFFF', font: '900 104px "Arial Black", Impact, sans-serif' }), transparent: true }));
    m.position.copy(V3(x, y, Math.min(fenceHeight(park, th) * 0.55, 6.5))); m.lookAt(0, m.position.y, 0); root.add(m);
  }
  // the batter's eye: a dark screen beyond the center-field fence so hitters can pick up the pitch
  { const eye = []; for (let th = -7; th <= 7; th += 1) eye.push(polar(fenceDist(park, th) + 6, th));
    root.add(wallRibbon(eye, eye.map(() => (L.wood ? 18 : 26)), std(L.wood ? '#3B4A33' : '#1C3527', { roughness: 1 }), 10)); }
  // foul poles
  for (const s of [-1, 1]) {
    const [x, y] = polar(fenceDist(park, s * 45) + 0.5, s * 45);
    const pole = new T.Mesh(new T.CylinderGeometry(0.35, 0.45, 60, 8), std('#F2C744', { roughness: 0.5 })); pole.position.copy(V3(x, y, 30)); pole.castShadow = true; root.add(pole);
    const flag = box(0.15, 26, 3, std('#F2C744')); flag.position.copy(V3(x, y, 40)); flag.position.x += s * 1.6; root.add(flag);
  }
  // stands
  const wood = !!L.wood;
  if (parkKey === 'historic') {
    // covered wooden grandstand wrapping home plate, open bleachers down both lines
    const arc = [[-62, 30], [-40, -38], [0, -60], [40, -38], [62, 30]];
    for (let i = 0; i < arc.length - 1; i++) seating(root, [arc[i][0] * 1.25, arc[i][1] * 1.18 - 4], [arc[i + 1][0] * 1.25, arc[i + 1][1] * 1.18 - 4], 12, L, { base: 4, structMat: std('#A69E8C', { roughness: 0.95, side: T.DoubleSide }) }); // concrete bleachers built into the hillside (the surviving "Wolves Den")
    for (const s of [-1, 1]) seating(root, [s * 112, 52], [s * 205, 145], 7, L, { base: 3, brace: true }); // plank bleachers down the lines (typical of the era)
  } else {
    const big = parkKey === 'majestic';
    const arc = [[-62, 34], [-36, -40], [36, -40], [62, 34]];
    for (let i = 0; i < arc.length - 1; i++) seating(root, [arc[i][0] * 1.22, arc[i][1] * 1.2 - 5], [arc[i + 1][0] * 1.22, arc[i + 1][1] * 1.2 - 5], big ? 12 : 8, L, { roof: big && i === 1, box: i === 1, base: 4 });
    for (const s of [-1, 1]) seating(root, [s * 108, 50], [s * (big ? 215 : 175), big ? 155 : 118], big ? 8 : 6, L, { base: 3 });
  }
  dugout(root, -1, L); dugout(root, 1, L);
  // light towers
  // fair side: [angle, feet beyond the fence]; foul side (|angle| > 46): [angle, feet from home], kept well outside the foul wall
  const towerSpots = parkKey === 'historic' ? [[-64, 215], [64, 215], [-24, 50], [24, 50], [-100, 150], [100, 150]]
    : parkKey === 'majestic' ? [[-64, 225], [64, 225], [-20, 55], [20, 55], [-100, 160], [100, 160]] : [[-64, 205], [64, 205], [-18, 45], [18, 45]];
  for (const [th, extra] of towerSpots) {
    const r = Math.abs(th) > 46 ? extra : fenceDist(park, th) + extra;
    const [x, y] = polar(r, th);
    const th3 = wood ? 62 : parkKey === 'majestic' ? 90 : 75;
    tower(root, x, y, th3, L, wood);
    if (L.night) { // each bank throws a pool of light onto the field; the key light stays dim
      const sp = new T.SpotLight('#FFF4DC', 1.5, 0, 0.42, 0.75, 0);
      sp.position.copy(V3(x, y, th3 + 6)); sp.target.position.copy(V3(x * 0.35, y * 0.42 + 20, 0));
      root.add(sp); root.add(sp.target);
    }
  }
  // scoreboard in left-center, beyond the fence
  const sbp = polar(fenceDist(park, -25) + 28, -25);
  const board = makeScoreboard(root, L, sbp[0], sbp[1], wood);
  trees(root, park, L, !!park.gator);
  if (park.gator) { alligatorFarm(root, park, L); hillside(root, L); rixTower(root, L); }
  batchStatic(root);
  return { root, park, L, board };
}
export { MOUND };
