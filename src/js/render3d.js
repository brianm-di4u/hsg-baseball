// The 3D view (three.js r186, vendored): loads on demand after the 2D game is up, then stages the duel
// (catcher's-eye camera), the play-by-play broadcast view of each timeline, and the title flyover.
// Falls back to the 2D renderer (render.js) when WebGL is missing, the load fails, or ?gl=0.
// The 2D canvas stays on top for overlays (zone, meter, cursor, call banner, effects) through R3.p3().
import { PARKS, BASES, spots, FIELD_POS, fenceDist, polar } from './park.js';
import { pitchPoint, RELEASE } from './pitch.js';
import { ballAt } from './flight.js';
import { setThree as setW, buildPark, lookFor, drawScoreboard, W3, glowTex as glowTex3 } from './world3d.js';
import { setThree as setA, loadActors, loadPlayers, makeActor, useV3, setLod, setShadow, dress, pose, place, setAcc, setNumber, boneWorld, clipDur, showRegions } from './actors3d.js';
import { timelineBall } from './render.js';

let T = null;
export const R3 = { ok: false, loading: false, failed: false, reason: '', quality: 'high', renderer: null, scene: null, cam: null, W: 0, H: 0, park: null, parks: new Map(), actors: [], ball: null, trail: null, t0: performance.now(), view: '', sw: '' };
// Painted textures packed by shared/test-harness/art-pack.mjs (assets/*.webp). Only these are requested.
export const ART = ['ridges-day', 'ridges-golden', 'ridges-night', 'grass-tile', 'clay-tile', 'planks-tile', 'crowd-modern', 'crowd-historic'];
export const ART_READY = [];

function param(k) { try { return new URLSearchParams(location.search).get(k); } catch (e) { return null; } }
export function want3d() {
  if (param('gl') === '0') { R3.reason = 'off by ?gl=0'; return false; }
  try { const c = document.createElement('canvas'); if (!c.getContext('webgl2')) { R3.reason = 'no WebGL2'; return false; } } catch (e) { R3.reason = 'no WebGL2'; return false; }
  return true;
}
function loadScript(src) {
  return new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.async = true; s.onload = res; s.onerror = () => rej(new Error(`load ${src}`)); document.head.appendChild(s); });
}
function loadImg(name) {
  return new Promise((res) => { const im = new Image(); im.onload = () => (im.decode ? im.decode().catch(() => {}) : Promise.resolve()).then(() => res([name, im])); im.onerror = () => res([name, null]); im.src = (window.DS_ART && window.DS_ART[name]) || `assets/${name}.webp`; });
}

// Boot: called once from main.js; onReady redraws in 3D.
export async function init3d(stage, onReady, art = []) {
  if (R3.ok || R3.loading) return;
  R3.loading = true;
  try {
    if (!window.THREE) await loadScript('vendor/three-r186.min.js');
    // ?players=<pack> swaps in another player pack (the phase-2 ceiling ladder: assets/ceiling-*.js)
    const pk = param('players');
    if (!window.DS_MODELS) await loadScript(pk && /^[\w-]+$/.test(pk) ? `assets/${pk}.js` : 'assets/models.js');
    T = window.THREE; setW(T); setA(T);
    // from file:// local images taint canvases and WebGL refuses them, so use the data-URL pack there
    if (location.protocol === 'file:' && art.length && param('art') !== '0' && !window.DS_ART) await loadScript('assets/art.js').catch(() => {});
    const imgs = param('art') === '0' ? [] : await Promise.all(art.map(loadImg));
    for (const [n, im] of imgs) if (im) W3.img[n] = im;
    ART_READY.push(...imgs.filter(([, im]) => im).map(([n]) => n));
    const cv = document.createElement('canvas'); cv.id = 'gl'; cv.setAttribute('aria-hidden', 'true');
    stage.insertBefore(cv, stage.firstChild);
    const r = new T.WebGLRenderer({ canvas: cv, antialias: true, powerPreference: 'high-performance' });
    const gl = r.getContext(), dbg = gl.getExtension('WEBGL_debug_renderer_info');
    const gpu = String(gl.getParameter(dbg ? dbg.UNMASKED_RENDERER_WEBGL : gl.RENDERER) || '');
    R3.gpu = gpu;
    const soft = /swiftshader|llvmpipe|software|basic render/i.test(gpu); R3.soft = soft;
    const q = param('q');
    R3.quality = q === 'low' || q === 'high' ? q : soft ? 'low' : (matchMedia && matchMedia('(pointer: coarse)').matches ? 'medium' : 'high');
    W3.quality = R3.quality;
    r.outputColorSpace = T.SRGBColorSpace; r.toneMapping = T.ACESFilmicToneMapping;
    r.shadowMap.enabled = R3.quality !== 'low'; r.shadowMap.type = T.PCFSoftShadowMap;
    R3.renderer = r; R3.canvas = cv;
    await loadActors();
    R3.scene = new T.Scene();
    R3.cam = new T.PerspectiveCamera(30, 1, 0.5, 12000);
    // lights
    R3.hemi = new T.HemisphereLight('#ffffff', '#445533', 1); R3.scene.add(R3.hemi);
    // a soft fill from the camera's side (no shadows): faces and dark uniforms keep their form against the sun
    R3.fill = new T.DirectionalLight('#FFF4E6', 0.4); R3.scene.add(R3.fill); R3.scene.add(R3.fill.target);
    R3.sun = new T.DirectionalLight('#ffffff', 2.5); R3.sun.castShadow = r.shadowMap.enabled;
    R3.sun.shadow.mapSize.set(R3.quality === 'high' ? 2048 : 1024, R3.quality === 'high' ? 2048 : 1024);
    R3.sun.shadow.bias = -0.0003; R3.sun.shadow.normalBias = 0.06; // a large normal bias detaches shadows from the feet
    R3.scene.add(R3.sun); R3.scene.add(R3.sun.target);
    // actors: 9 fielders, batter, 3 runners, umpire, two base coaches
    for (let i = 0; i < 16; i++) R3.actors.push(makeActor(R3.scene, i));
    if (+param('tex') > 0) detailMaps(+param('tex')); // ceiling test: what texture detail on every player costs
    // ball, its shadow and trail
    const seam = document.createElement('canvas'); seam.width = 128; seam.height = 64; const sx = seam.getContext('2d');
    sx.fillStyle = '#FBFBF5'; sx.fillRect(0, 0, 128, 64); sx.strokeStyle = '#C8452B'; sx.lineWidth = 3;
    sx.beginPath(); for (let i = 0; i <= 128; i += 2) { const y = 32 + 18 * Math.sin(i / 128 * Math.PI * 4); i ? sx.lineTo(i, y) : sx.moveTo(i, y); } sx.stroke();
    const st = new T.CanvasTexture(seam); st.colorSpace = T.SRGBColorSpace;
    R3.ball = new T.Mesh(new T.SphereGeometry(0.125, 16, 12), new T.MeshStandardMaterial({ map: st, roughness: 0.45, emissive: '#FFFFFF', emissiveIntensity: 0.18 }));
    R3.ball.castShadow = true; R3.scene.add(R3.ball);
    const sh = document.createElement('canvas'); sh.width = sh.height = 64; const shx = sh.getContext('2d');
    const gr = shx.createRadialGradient(32, 32, 2, 32, 32, 32); gr.addColorStop(0, 'rgba(0,0,0,0.55)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); shx.fillStyle = gr; shx.fillRect(0, 0, 64, 64);
    R3.ballShadow = new T.Mesh(new T.PlaneGeometry(1, 1), new T.MeshBasicMaterial({ map: new T.CanvasTexture(sh), transparent: true, depthWrite: false }));
    R3.ballShadow.rotation.x = -Math.PI / 2; R3.scene.add(R3.ballShadow);
    // contact shadows: a soft dark spot under each foot (two per actor, one instanced draw), shrinking as a foot lifts
    const cg = new T.PlaneGeometry(1, 1); cg.rotateX(-Math.PI / 2);
    R3.contact = new T.InstancedMesh(cg, new T.MeshBasicMaterial({ map: R3.ballShadow.material.map, color: '#000000', transparent: true, opacity: 0.72, depthWrite: false, fog: false }), 32);
    R3.contact.frustumCulled = false; R3.contact.renderOrder = 1; R3.scene.add(R3.contact);
    const N = 28, tg = new T.BufferGeometry();
    tg.setAttribute('position', new T.Float32BufferAttribute(new Float32Array(N * 2 * 3), 3));
    tg.setAttribute('color', new T.Float32BufferAttribute(new Float32Array(N * 2 * 4), 4));
    const idx = []; for (let i = 0; i < N - 1; i++) { const a = i * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); } tg.setIndex(idx);
    R3.trail = new T.Mesh(tg, new T.MeshBasicMaterial({ vertexColors: true, transparent: true, depthWrite: false, side: T.DoubleSide, blending: T.AdditiveBlending, fog: false }));
    R3.trail.frustumCulled = false; R3.trail.N = N; R3.scene.add(R3.trail);
    // Gator Splash: droplets and a ripple ring, positioned from play time (reproducible frames)
    const NS = 90, sg = new T.BufferGeometry(); sg.setAttribute('position', new T.Float32BufferAttribute(new Float32Array(NS * 3), 3));
    R3.splash = new T.Points(sg, new T.PointsMaterial({ color: '#DDF3F6', size: 1.1, transparent: true, opacity: 0.9, depthWrite: false })); R3.splash.frustumCulled = false; R3.splash.visible = false; R3.scene.add(R3.splash);
    R3.ripple = new T.Mesh(new T.RingGeometry(0.8, 1, 40), new T.MeshBasicMaterial({ color: '#F2FBFC', transparent: true, depthWrite: false, side: T.DoubleSide }));
    R3.ripple.rotation.x = -Math.PI / 2; R3.ripple.visible = false; R3.scene.add(R3.ripple);
    R3.flash = new T.Sprite(new T.SpriteMaterial({ map: glowTex3(), color: '#FFF6DA', transparent: true, depthWrite: false, depthTest: false, blending: T.AdditiveBlending, fog: false }));
    R3.flash.visible = false; R3.scene.add(R3.flash);
    R3.splashV = Array.from({ length: NS }, (_, i) => { const a = i * 2.39996, s = 0.35 + ((i * 7919) % 97) / 97; return [Math.cos(a) * 9 * s, 22 + 18 * ((i * 104729) % 89) / 89, Math.sin(a) * 9 * s]; });
    R3.ok = true; R3.loading = false;
    window.__R3 = R3; // debug handle (renderer stats in tools/shots3d.mjs)
    resize3d();
    onReady && onReady();
    R3.onPlayers = onReady;
    loadPlayerPack();
  } catch (e) {
    R3.loading = false; R3.failed = true; R3.reason = String(e && e.message || e);
    const c = document.getElementById('gl'); if (c) c.remove();
    onReady && onReady();
  }
}

export function resize3d() {
  if (!R3.ok) return;
  const r = R3.canvas.parentElement.getBoundingClientRect();
  R3.W = Math.max(1, Math.round(r.width)); R3.H = Math.max(1, Math.round(r.height));
  const dprMax = R3.quality === 'high' ? 2 : R3.quality === 'medium' ? 1.35 : R3.soft ? 0.6 : 1; // software GL: a reduced internal resolution keeps it playable
  R3.renderer.setPixelRatio(Math.min(dprMax, window.devicePixelRatio || 1));
  R3.renderer.setSize(R3.W, R3.H, false);
  R3.cam.aspect = R3.W / R3.H; R3.cam.updateProjectionMatrix();
}

// ---------------------------------------------------------------- v3 players
// The realistic players arrive after the game is up: assets/players-<tier>.js (medium: the two coarser levels and
// 1k skin maps; high: all three and 2k maps). Until then, and on the low tier, everyone is the v2 player.
// tools/pack-players.mjs lists the packs it built in DS_MODELS.packs, so the game never asks for a missing file.
export async function loadPlayerPack() {
  const tier = R3.quality === 'high' ? 'high' : 'medium', packs = (window.DS_MODELS && window.DS_MODELS.packs) || [];
  if (R3.quality === 'low' || param('v3') === '0' || param('players') || !packs.includes(tier) || R3.playersLoading) return;
  R3.playersLoading = true;
  try {
    if (!window.DS_PLAYERS || window.DS_PLAYERS.tier !== tier) await loadScript(`assets/players-${tier}.js`);
    await loadPlayers(window.DS_PLAYERS);
    R3.v3 = tier;
    applyPlayers();
    try { R3.renderer.compile(R3.scene, R3.cam); } catch (e) { /* compiled lazily instead */ }
    R3.onPlayers && R3.onPlayers();
  } catch (e) { R3.v3err = String(e && e.message || e); }
  R3.playersLoading = false;
}
// The tier decides who gets v3 bodies and how fine they may get (lodMax).
function applyPlayers() {
  const on = !!R3.v3 && R3.quality !== 'low';
  for (const a of R3.actors) { useV3(a, on); a.lodMax = R3.quality === 'high' ? 0 : 1; a.fabric = R3.quality === 'high'; a.dressKey = null; }
}
// Contact shadows under the feet of every visible player (feet: ankle and toe bones of each side).
const CF = [['foot_l', 'ball_l', 'footL'], ['foot_r', 'ball_r', 'footR']];
const CT = {};
function contactPass() {
  if (!CT.m) Object.assign(CT, { m: new T.Matrix4(), p: new T.Vector3(), q: new T.Vector3(), g: new T.Vector3(), at: new T.Vector3(), sc: new T.Vector3(), one: new T.Quaternion() });
  const { m, p, q, g, at, sc, one } = CT;
  R3.scene.updateMatrixWorld(); // once; then every bone's matrixWorld is current
  let n = 0;
  for (const a of R3.actors) {
    if (!a.wrap.visible || !a.mesh || !a.mesh.castShadow) continue;
    g.setFromMatrixPosition(a.wrap.matrixWorld);
    for (const [ank, toe, v2] of CF) {
      const b = a.bones[ank] || a.bones[v2], t = a.bones[toe];
      if (!b) continue;
      p.setFromMatrixPosition(b.matrixWorld); if (t) { q.setFromMatrixPosition(t.matrixWorld); p.add(q).multiplyScalar(0.5); }
      const lift = Math.max(0, p.y - g.y - 0.2), s = Math.max(0, 1.5 - lift * 0.9);
      if (s <= 0.05) continue;
      m.compose(at.set(p.x, g.y + 0.06, p.z), one, sc.set(s, 1, s * 1.5));
      R3.contact.setMatrixAt(n++, m);
    }
  }
  R3.contact.count = n; R3.contact.instanceMatrix.needsUpdate = true;
}
// Detail by on-screen height: a player taller than LOD_PX[0] px on screen gets LOD0, taller than LOD_PX[1] LOD1. From
// tools/fidelity.mjs: LOD1 stays within ~4 points of LOD0's pixel error from 360 px down; LOD2 only pays off when tiny.
export const LOD_PX = [200, 45];
const LP = { p: null };
function lodPass() {
  const f = (R3.H / 2) / Math.tan(R3.cam.fov * Math.PI / 360), p = (LP.p = LP.p || new T.Vector3());
  for (const a of R3.actors) {
    if (!a.wrap.visible || !a.v3) continue;
    p.copy(a.wrap.position); p.y += 3;
    const px = 6.2 * f / Math.max(0.1, p.distanceTo(R3.cam.position));
    setLod(a, px > LOD_PX[0] ? 0 : px > LOD_PX[1] ? 1 : 2);
  }
}

// ---------------------------------------------------------------- park + lights
function usePark(key, night) {
  const k = `${key}|${night ? 1 : 0}`;
  if (R3.parkKey === k) return R3.park;
  if (R3.park) R3.scene.remove(R3.park.root);
  if (!R3.parks.has(k)) R3.parks.set(k, buildPark(key, night));
  const P = R3.parks.get(k);
  R3.scene.add(P.root); R3.park = P; R3.parkKey = k;
  if (!P.compiled) { P.compiled = true; try { R3.renderer.compile(R3.scene, R3.cam); } catch (e) { /* compiled lazily instead */ } } // no mid-play shader hitches
  const L = P.L;
  R3.hemi.color.set(L.hemi[0]); R3.hemi.groundColor.set(L.hemi[1]); R3.hemi.intensity = L.hemiI;
  R3.sun.color.set(L.sun); R3.sun.intensity = L.sunI;
  R3.scene.fog = new T.Fog(L.fog, 900, 5200);
  R3.renderer.toneMappingExposure = L.exposure;
  return P;
}
function aimSun(cx, cz, span) {
  const L = R3.park.L, s = R3.sun;
  s.target.position.set(cx, 0, cz);
  s.position.set(cx + L.sunPos[0], L.sunPos[1], cz + L.sunPos[2]);
  const c = s.shadow.camera; c.left = -span; c.right = span; c.top = span; c.bottom = -span; c.near = 10; c.far = 2000; c.updateProjectionMatrix();
}

// ---------------------------------------------------------------- helpers
const g2t = (x, y, z = 0) => new T.Vector3(x, z, -y);
const lerp = (a, b, u) => a + (b - a) * u;
const clamp01 = (v) => Math.max(0, Math.min(1, v));
// ambient time (idle sways, water): wall clock, unless a capture froze it (__game.act('clock', ms))
const amb = () => (R3.frozen != null ? R3.frozen : performance.now() - R3.t0) / 1000;
function teamsOf(g) { const fT = g.half === 0 ? g.teams[0] : g.teams[1], bT = g.half === 0 ? g.teams[1] : g.teams[0]; return { fT, bT }; }
function byId(g, id) { for (const t of g.teams) { const p = t.roster.find((q) => q.id === id); if (p) return p; } return null; }
const UMP_KIT = { jersey: '#2A2F3A', trim: '#2A2F3A', pants: '#5A5E66', cap: '#1B1E26', sock: '#111111', num: '#FFFFFF' };
function show(actor, on) { actor.wrap.visible = on; if (actor.ring) actor.ring.visible = false; }
// Broadcast-style ground ring under a player in the field view: runners gold (red when out), the
// fielder with the ball white, everyone else a dim team color. Hidden again by show() each frame.
function marker(actor, color, opacity) {
  if (!actor.ring) {
    actor.ring = new T.Mesh(new T.RingGeometry(1.5, 2.3, 32), new T.MeshBasicMaterial({ transparent: true, depthWrite: false, fog: false }));
    actor.ring.rotation.x = -Math.PI / 2; actor.ring.position.y = 0.12; actor.ring.renderOrder = 2;
    actor.wrap.add(actor.ring);
  }
  const s = Math.max(1, R3.cam.position.distanceTo(actor.wrap.position) / 140); // stays readable from the high camera
  actor.ring.scale.setScalar(s);
  actor.ring.material.color.set(color); actor.ring.material.opacity = opacity; actor.ring.visible = true;
}
function setTrail(points) {
  const tr = R3.trail, N = tr.N, pos = tr.geometry.attributes.position.array, col = tr.geometry.attributes.color.array;
  const camP = R3.cam.position;
  if (!points || points.length < 2) { tr.visible = false; return; }
  tr.visible = true;
  for (let i = 0; i < N; i++) {
    const p = points[Math.min(points.length - 1, Math.floor(i / (N - 1) * (points.length - 1)))];
    const q = points[Math.min(points.length - 1, Math.floor(i / (N - 1) * (points.length - 1)) + 1)] || p;
    const dir = new T.Vector3().subVectors(q, p); const view = new T.Vector3().subVectors(p, camP);
    const side = new T.Vector3().crossVectors(dir, view).normalize();
    const u = i / (N - 1), w = 0.11 * u * Math.max(1, view.length() / 60);
    pos.set([p.x + side.x * w, p.y + side.y * w, p.z + side.z * w, p.x - side.x * w, p.y - side.y * w, p.z - side.z * w], i * 6);
    const a = u * u * 0.55;
    col.set([1, 0.97, 0.85, a, 1, 0.97, 0.85, a], i * 8);
  }
  tr.geometry.attributes.position.needsUpdate = true; tr.geometry.attributes.color.needsUpdate = true;
}
function placeBall(b, big = 1) {
  if (!b) { R3.ball.visible = false; R3.ballShadow.visible = false; return; }
  R3.ball.visible = true; R3.ballShadow.visible = true;
  R3.ball.position.copy(g2t(b.x, b.y, Math.max(0.12, b.z)));
  R3.ballBig = big;
  const s = ballScale();
  R3.ball.rotation.set(b.y * 0.9, 0, b.x * 0.3); // spin from position, so a frame is reproducible
  R3.ballShadow.position.set(R3.ball.position.x, 0.08, R3.ball.position.z);
  sizeBallShadow(s, b.z);
}
// The ball keeps a minimum on-screen size (about 5 px across) from wherever the camera is.
function ballScale() {
  const d = R3.ball.position.distanceTo(R3.cam.position);
  const px = (R3.H / 2) / Math.tan(R3.cam.fov * Math.PI / 360) / d * 0.25; // ball diameter in px at true size
  const s = Math.max(1, (R3.ballBig * 5) / Math.max(0.01, px));
  R3.ball.scale.setScalar(s);
  return s;
}
function sizeBallShadow(s, bz) {
  const ss = 0.7 * s * (1 + Math.min(2, bz / 30)); R3.ballShadow.scale.set(ss, ss, 1);
  R3.ballShadow.material.opacity = Math.max(0.15, 1 - bz / 120);
}
// Two-bone arm IK: bend the elbow so shoulder-to-hand spans the target's distance, then swing the upper arm onto it.
function ikArm(actor, side, target) {
  const up = actor.bones[`upperarm${side}`], fo = actor.bones[`forearm${side}`], ha = actor.bones[`hand${side}`];
  if (!up || !fo || !ha || actor.mirror) return; // mirrored (left-handed) rigs: rotations under a negative scale don't compose; skip
  actor.wrap.updateMatrixWorld(true);
  const S = new T.Vector3(), E = new T.Vector3(), W = new T.Vector3();
  up.getWorldPosition(S); fo.getWorldPosition(E); ha.getWorldPosition(W);
  const a = S.distanceTo(E), b = E.distanceTo(W), d = Math.max(Math.abs(a - b) + 1e-3, Math.min(a + b - 1e-3, S.distanceTo(target)));
  const u = S.clone().sub(E), v = W.clone().sub(E), n = new T.Vector3().crossVectors(u, v);
  if (n.lengthSq() < 1e-8) n.set(0, 0, 1); n.normalize();
  const cur = u.angleTo(v), want = Math.acos(Math.max(-1, Math.min(1, (a * a + b * b - d * d) / (2 * a * b))));
  const dq = new T.Quaternion().setFromAxisAngle(n, want - cur);
  const pw = new T.Quaternion(); fo.parent.getWorldQuaternion(pw);
  const bw = new T.Quaternion(); fo.getWorldQuaternion(bw);
  fo.quaternion.copy(pw.invert().multiply(dq).multiply(bw));
  fo.updateMatrixWorld(true);
  reachArm(actor, side, target, 1);
}
// The swing clip's first LOAD seconds are the load and stride (mocap): played while the pitch is on its way, so the
// batter strides into the ball, then the swing proper runs from the swing start to contact.
const LOAD = 0.12;
function loadAt(g, pt) { const f = g.phaseT / (pt.T * g.scale); return LOAD * clamp01((f - 0.25) / 0.6); }
// The batter's free (left) hand on the handle, just below the right hand on the bat's axis.
function gripBat(actor) {
  const bat = actor.bones.bat;
  if (!bat || !actor.v3) return;
  actor.wrap.updateMatrixWorld(true);
  const h = new T.Vector3(), q = new T.Quaternion(); bat.getWorldPosition(h); bat.getWorldQuaternion(q);
  const ax = new T.Vector3(0, 1, 0).applyQuaternion(q); // bone axis (glTF bones point along +Y)
  ikArm(actor, 'L', h.addScaledVector(ax, -0.22));
}
// Rotate a 2-bone arm's upper bone so its hand moves toward a world target.
function reachArm(actor, side, target, amount = 1) {
  const up = actor.bones[`upperarm${side}`], hand = actor.bones[`hand${side}`];
  if (!up || !hand || amount <= 0) return;
  actor.wrap.updateMatrixWorld(true);
  const s = new T.Vector3(), h = new T.Vector3(); up.getWorldPosition(s); hand.getWorldPosition(h);
  const v0 = h.clone().sub(s).normalize(), v1 = target.clone().sub(s).normalize();
  const dq = new T.Quaternion().setFromUnitVectors(v0, v1);
  dq.slerp(new T.Quaternion(), 1 - amount);
  const pw = new T.Quaternion(); up.parent.getWorldQuaternion(pw);
  const bw = new T.Quaternion(); up.getWorldQuaternion(bw);
  up.quaternion.copy(pw.clone().invert().multiply(dq).multiply(bw));
  up.updateMatrixWorld(true);
}

// ---------------------------------------------------------------- cameras
// Batting (and watching): the catcher's eye, low behind the plate, so the zone is big and clear.
// Pitching: the broadcast center-field telephoto over the pitcher's shoulder (batter, catcher and
// umpire in view). Both keep the zone readable; the overlay canvas projects through whichever is live.
const CAMS = {
  bat: [[5.4, 11.5, 2.6, 47, 0, -60], [6.4, 12.5, -1.4, 62, 0, -60]],
  cf: [[15, -188, 2.9, 4.6, -5.5, 0], [14, -168, 2.6, 4.6, -3.2, 0]],
};
// The duel camera's pose (a pure function of the kind and the aspect), so the field camera can ease out of it
// without depending on which frames happened to render.
function duelPose(kind) {
  const portrait = R3.H > R3.W;
  const o = (window.__cam && window.__cam[portrait ? 1 : 0]) || CAMS[kind][portrait ? 1 : 0];
  return { p: new T.Vector3(o[4] || 0, o[0], o[1]), l: new T.Vector3(0, o[2], o[5] ?? -60), fov: o[3] };
}
function duelCamera(kind) {
  const c = R3.cam, d = duelPose(kind);
  c.fov = d.fov; c.position.copy(d.p); c.lookAt(d.l); c.updateProjectionMatrix();
}
function fieldCamera(g, tl, t, park, ui) {
  if (ui && ui.replay) return replayCamera(tl, t);
  // home run: once the ball is gone, cut to the batter's trot from a low infield camera
  if (g.play.f.hr) {
    const land = tl.ball[tl.ball.length - 1][0], id = Object.keys(tl.runners).find((k) => tl.runners[k][0].b === 0);
    if (id && t > land + 0.5) {
      const [x, y] = baseXY(runnerAt(tl.runners[id], t).b), c = R3.cam, portrait = R3.H > R3.W;
      const ax = x * 0.55, ay = y * 0.55 + 30; // inside the diamond, toward the mound
      c.fov = portrait ? 50 : 30; c.position.copy(g2t(ax + (ax - x) * 0.6, ay + (ay - y) * 0.6, 9));
      c.lookAt(g2t(x, y, 3.2)); c.updateProjectionMatrix();
      return { tx: x, ty: y };
    }
  }
  // a broadcast "high home" camera that leans toward the ball; derived from play time only
  const portrait = R3.H > R3.W;
  let sx = 0, sy = 0, sz = 0, n = 0;
  for (let k = 0; k <= 6; k++) { const b = timelineBall(tl, Math.max(0, t - k * 0.12)); sx += b.x; sy += b.y; sz += b.z; n++; }
  const bx = sx / n, by = sy / n, bz = sz / n;
  const intro = clamp01(t / 0.7), ease = intro * intro * (3 - 2 * intro);
  const reach = Math.hypot(bx, by);
  const tx = lerp(0, bx, 0.7), ty = lerp(70, Math.max(30, by), 0.65), tz = Math.min(90, bz * 0.62); // look up with high flies so the ball stays in frame
  // closer and tighter than a stadium's high-home camera: fielders read at about 30 px instead of 20
  const dist = (portrait ? 130 : 150) + reach * 0.3, h = 54 + reach * 0.15;
  const dirx = tx / Math.max(1, Math.hypot(tx, ty + 40)), diry = (ty + 40) / Math.max(1, Math.hypot(tx, ty + 40));
  const px = tx - dirx * dist * 0.5, py = ty - diry * dist, pz = h;
  const c = R3.cam;
  // start from the duel camera and pull out
  const d0 = duelPose(ui && ui.userPitches ? 'cf' : 'bat');
  const p1 = g2t(px, py, pz), l1 = g2t(tx, ty, tz);
  c.position.lerpVectors(d0.p, p1, ease);
  const look = new T.Vector3().lerpVectors(d0.l, l1, ease);
  c.fov = lerp(d0.fov || 40, portrait ? 54 : 34, ease);
  c.lookAt(look); c.updateProjectionMatrix();
  return { tx, ty };
}
// Replays: a low camera on the first-base side that pans with the ball, like a second broadcast angle.
function replayCamera(tl, t) {
  const b = timelineBall(tl, Math.max(0, t - 0.1)), portrait = R3.H > R3.W, c = R3.cam;
  c.fov = portrait ? 58 : 38;
  c.position.copy(g2t(72, 28, 12)); // foul ground beside first base, inside the wall
  c.lookAt(g2t(lerp(30, b.x, 0.85), lerp(70, b.y, 0.85), Math.min(60, b.z * 0.8)));
  c.updateProjectionMatrix();
  return { tx: b.x, ty: b.y };
}
function titleCamera(t) {
  const c = R3.cam, a = -0.6 + Math.sin(t * 0.05) * 0.5;
  const portrait = R3.H > R3.W;
  c.fov = portrait ? 60 : 36;
  c.position.copy(g2t(Math.sin(a) * 300, 150 - Math.cos(a) * 330, 70));
  c.lookAt(g2t(0, 150, 0)); c.updateProjectionMatrix();
}

// ---------------------------------------------------------------- staging
function stageFielders(g, park, fT, poseFor) {
  const sp = spots(park);
  FIELD_POS.forEach((pos, i) => {
    const a = R3.actors[i], P = fT.roster[i === 0 ? fT.pitcher : i - 1] || fT.roster[0];
    show(a, true); dress(a, fT.kit, { skin: P.skin, id: P.id });
    setNumber(a, P.num, fT.kit, fT.team);
    poseFor(a, pos, i, sp[pos], P);
  });
}

function duelScene(g, ui) {
  const park = PARKS[g.park] || PARKS.home;
  usePark(park.key, g.night);
  const cfCam = !!ui.userPitches;
  R3.camKind = cfCam ? 'cf' : 'bat';
  duelCamera(cfCam ? 'cf' : 'bat'); aimSun(0, -40, 110);
  const { fT, bT } = teamsOf(g);
  const tA = amb();
  const pt = g.pitch;
  // fielders
  stageFielders(g, park, fT, (a, pos, i, xy, P) => {
    if (pos === 'P') {
      setAcc(a, ['cap', 'glove']);
      let t = 0;
      if (g.phase === 'windup') t = Math.min(0.9, g.phaseT) * 0.963;
      else if (['flight', 'result', 'umpwait', 'play'].includes(g.phase) && pt) t = 0.867 + (g.phase === 'flight' ? g.phaseT : 0.6);
      place(a, 0, 60.5, 0.8, 0, 0, P.throws === 'L');
      pose(a, 'pitch', t);
    } else if (pos === 'C') {
      setAcc(a, ['helmet', 'mask', 'gear', 'shinguard.L', 'shinguard.R', 'glove']);
      showRegions(a, cfCam ? null : ['glove']); // catcher's-eye view: only the mitt, first person
      setShadow(a, cfCam);
      place(a, 0, -2.6, 0, 0, 60, false);
      pose(a, 'crouch', tA + 0.3);
      // the mitt rides to the pitch as it arrives; in the catcher's-eye view it only appears for the catch
      let mx = 0.2, mz = 1.25, f = 0;
      if (pt && ['flight', 'result', 'umpwait'].includes(g.phase)) {
        f = g.phase === 'flight' ? clamp01(g.phaseT / (pt.T * g.scale)) : 1;
        const u = clamp01((f - 0.35) / 0.6);
        mx = lerp(mx, pt.px * 0.95, u); mz = lerp(mz, pt.pz - 0.05, u);
      }
      reachArm(a, 'L', g2t(mx, -1.2, mz), 1);
      if (!cfCam) show(a, false); // the camera is the catcher's eye
    } else {
      setAcc(a, ['cap', 'glove']);
      place(a, xy[0], xy[1], 0, 0, 0, P.throws === 'L');
      pose(a, 'ready', tA + i * 0.37);
    }
  });
  // batter
  const B = bT.roster[bT.lineup[bT.order]];
  const bat = R3.actors[9]; show(bat, true); dress(bat, bT.kit, { skin: B.skin, id: B.id });
  const club = !!bT.team.club; // 1900s-style barnstorming clubs bat in caps: helmets came decades later
  setAcc(bat, [club ? 'cap' : 'helmet', 'bat']);
  const side = B.bats === 'L' ? 1 : -1;
  // the batter faces the plate: from x = ∓3 toward x = 0
  const bx = R3.H > R3.W ? 2.4 : 3.0; // portrait: step the batter in a little so he stays on screen
  place(bat, side * bx, 0.3, 0, 0, 0.3, B.bats === 'L');
  const sw = g.swing || (g.aiSwing && g.phase !== 'pre' ? g.aiSwing : null);
  const bunting = (g.bunt && ui.userBats) || (sw && sw.bunt);
  if (bunting && g.phase !== 'result') pose(bat, 'bat_bunt', tA);
  else if (sw && pt && ['flight', 'result', 'play', 'umpwait'].includes(g.phase)) {
    const T0 = pt.T * g.scale;
    const st = g.swing ? g.swing.at : T0 + (sw.u || 0) * ui.W - 0.1 * g.scale;
    const k = (0.267 - LOAD) / (0.1 * g.scale); // the swing proper, from the end of the load to contact at 0.267
    const ct = g.phase === 'flight' ? LOAD + (g.phaseT - st) * k : 0.9;
    if (ct < LOAD) pose(bat, 'bat_swing', loadAt(g, pt)); else pose(bat, 'bat_swing', ct);
  } else if (pt && g.phase === 'flight') pose(bat, 'bat_swing', loadAt(g, pt)); // load and stride while the pitch comes
  else pose(bat, 'bat_stance', tA);
  gripBat(bat);
  setNumber(bat, B.num, bT.kit, bT.team);
  // runners on base, leading off toward the next base
  for (let k = 0; k < 3; k++) {
    const a = R3.actors[10 + k], id = g.bases[k];
    if (!id) { show(a, false); continue; }
    const P = byId(g, id) || B; show(a, true); dress(a, bT.kit, { skin: P.skin, id: P.id }); setAcc(a, [club ? 'cap' : 'helmet']); setNumber(a, P.num, bT.kit, bT.team);
    const b0 = BASES[k + 1], b1 = BASES[(k + 2) % 4], lead = k === 2 ? 6 : 10;
    const L = Math.hypot(b1[0] - b0[0], b1[1] - b0[1]);
    const x = b0[0] + (b1[0] - b0[0]) / L * lead, y = b0[1] + (b1[1] - b0[1]) / L * lead;
    place(a, x, y, 0, 0, 60.5, false); pose(a, 'ready', tA + k);
  }
  // umpire and base coaches
  const u = R3.actors[13]; show(u, true); dress(u, UMP_KIT, { skin: '#C68B62', umpire: true }); setAcc(u, ['mask', 'gear', 'cap']);
  place(u, side * 0.7, -5.8, 0, 0, 60, false); pose(u, 'ump', tA); // looks over the catcher's inside shoulder
  show(u, cfCam);
  for (const [i, s] of [[14, -1], [15, 1]]) {
    const a = R3.actors[i], P = bT.roster[(i * 3) % bT.roster.length]; show(a, true); dress(a, bT.kit, { skin: P.skin, id: P.id }); setAcc(a, ['cap']);
    place(a, s * 82, 66, 0, 0, 0, false); pose(a, 'idle', tA + i);
  }
  // the pitch
  let ballPts = null, ball = null;
  if (pt && (g.phase === 'flight' || g.phase === 'umpwait' || (g.phase === 'result' && !g.play))) {
    const T0 = pt.T * g.scale;
    const f = g.phase === 'flight' ? g.phaseT / T0 : 1;
    if (f < 1.02) {
      const b = pitchPoint(pt, Math.min(f, 1.02));
      // leave from the pitcher's hand: blend the first stretch from the hand bone
      if (f < 0.12) {
        const hand = boneWorld(R3.actors[0], 'hand.R'), u2 = f / 0.12;
        b.x = lerp(hand.x, b.x, u2); b.z = lerp(hand.y, b.z, u2); b.y = lerp(-hand.z, b.y, u2);
      }
      ball = b;
      ballPts = [];
      for (let k = 8; k >= 0; k--) { const q = pitchPoint(pt, Math.max(0, Math.min(f, 1) - k * 0.025)); ballPts.push(g2t(q.x, q.y, q.z)); }
    } else if (cfCam) { // in the catcher's mitt
      const m = boneWorld(R3.actors[1], 'glove'); ball = { x: m.x, y: -m.z, z: m.y };
    }
  }
  placeBall(ball, 1.1);
  setTrail(g.phase === 'flight' ? ballPts : null);
}

function fieldScene(g, ui) {
  const park = PARKS[g.park] || PARKS.home;
  usePark(park.key, g.night);
  const tl = g.play.out.timeline, t = ui.playT ?? 0;
  fieldCamera(g, tl, t, park, ui);
  aimSun(0, -170, 330);
  const { fT, bT } = teamsOf(g);
  const tA = amb();
  const b = timelineBall(tl, t);
  // who threw / caught
  const thr = tl.throws.find((th) => t >= th.t0 - 0.45 && t <= th.t0 + 0.4);
  let carry = null; // [actor, bone]: the ball is drawn there, not at the sim's point (which sits at the fielder's feet)
  stageFielders(g, park, fT, (a, pos, i, xy, P) => {
    setAcc(a, pos === 'C' ? ['helmet', 'mask', 'gear', 'shinguard.L', 'shinguard.R', 'glove'] : ['cap', 'glove']);
    const path = tl.fielders[pos];
    const p = pathAt(path, t) || { x: xy[0], y: xy[1] }, p2 = pathAt(path, t + 0.15) || p;
    const vx = p2.x - p.x, vy = p2.y - p.y, sp = Math.hypot(vx, vy) / 0.15;
    const hold = tl.holds.find((h) => h.pos === pos && t >= h.t0 - 0.35 && t <= h.t0 + 0.6);
    const throwing = thr && Math.hypot(thr.from[0] - p.x, thr.from[1] - p.y) < 6;
    const hasBall = throwing || tl.holds.some((h) => h.pos === pos && t >= h.t0 && !tl.throws.some((th) => th.t0 > h.t0 && th.t0 <= t));
    marker(a, hasBall ? '#FFFFFF' : fT.kit.trim === '#FFFFFF' ? fT.kit.cap : fT.kit.trim, hasBall ? 0.95 : 0.5);
    if (throwing) {
      place(a, p.x, p.y, 0, thr.to[0], thr.to[1], P.throws === 'L');
      pose(a, 'throw', 0.333 + (t - thr.t0));
      if (t < thr.t0) carry = [a, 'hand.R']; // in the throwing hand until release
    } else if (hold) {
      place(a, p.x, p.y, 0, 0, 0, P.throws === 'L');
      const high = (ballAt({ s: tl.ball }, hold.t0).z || 0) > 3.5;
      pose(a, high ? 'catch_high' : 'field_ground', 0.2 + (t - hold.t0 + 0.35) * 0.9);
      // the glove goes to the ball as it arrives (two-bone IK on the glove arm), then stays with it
      if (t < hold.t0 + 0.15) { const bp = g2t(b.x, b.y, Math.max(0.3, b.z)), gp = boneWorld(a, 'glove'); if (bp.distanceTo(gp) < 7) ikArm(a, 'L', bp); }
      if (t >= hold.t0) carry = [a, 'glove']; // caught: in the mitt
    } else if (sp > 1.5) {
      place(a, p.x, p.y, 0, p.x + vx, p.y + vy, false);
      pose(a, 'run', t * Math.min(1.25, sp / 18) + i * 0.1);
    } else {
      place(a, p.x, p.y, pos === 'P' ? 0.8 : 0, b.x, b.y, P.throws === 'L');
      pose(a, pos === 'C' ? 'crouch' : 'ready', tA + i * 0.37, pos === 'C' ? null : null);
    }
    if (hasBall && !carry && !throwing) carry = [a, 'glove'];
  });
  // runners (the batter is one of them)
  const ids = Object.keys(tl.runners);
  for (let k = 0; k < 4; k++) {
    const a = R3.actors[9 + k], id = ids[k];
    if (!id) { show(a, false); continue; }
    const r = runnerAt(tl.runners[id], t);
    if (r.gone) { show(a, false); continue; }
    const P = byId(g, id) || bT.roster[0]; show(a, true); dress(a, bT.kit, { skin: P.skin, id: P.id }); setAcc(a, [bT.team.club ? 'cap' : 'helmet']);
    const keys = tl.runners[id];
    if (keys[0].b === 0 && t < 0.5 && !keys[0].out) { // the batter finishes the swing before he runs
      const L = P.bats === 'L', side = L ? 1 : -1;
      setAcc(a, [bT.team.club ? 'cap' : 'helmet', 'bat']);
      place(a, side * 3, 0.3, 0, 0, 0.3, L); pose(a, g.play.res && g.play.res.bunt ? 'bat_bunt' : 'bat_swing', 0.27 + t * 1.3); gripBat(a);
      setNumber(a, P.num, bT.kit, bT.team);
      continue;
    }
    const [x, y] = baseXY(r.b), [x2, y2] = baseXY(Math.min(r.b + 0.05, 4));
    const moving = runnerAt(tl.runners[id], t + 0.1).b !== r.b;
    place(a, x, y, 0, moving ? x2 : 0, moving ? y2 : 60, false);
    if (moving) pose(a, 'run', t * 1.2 + k * 0.2);
    else if (r.scored) pose(a, 'cheer', tA);
    else pose(a, 'idle', tA + k);
    setNumber(a, P.num, bT.kit, bT.team);
    marker(a, r.out ? '#FF6B5A' : '#FFD84D', 0.95);
  }
  const u = R3.actors[13]; show(u, true); dress(u, UMP_KIT, { skin: '#C68B62', umpire: true }); setAcc(u, ['mask', 'gear', 'cap']);
  place(u, 0.4, -5.4, 0, b.x, b.y, false); pose(u, 'idle', tA);
  for (const i of [14, 15]) show(R3.actors[i], false);
  if (t < 0.65 && R3.camKind !== 'cf' && !ui.replay) { show(R3.actors[1], false); show(u, false); } // still at the catcher's eye: they'd fill the lens
  // Gator Splash at the ball's landing spot in the farm pond
  const S = tl.ball, last = S[S.length - 1];
  const ts = g.play.out.gator ? t - last[0] : -1;
  R3.splash.visible = R3.ripple.visible = ts >= 0 && ts < 2.2;
  if (R3.splash.visible) {
    const pa = R3.splash.geometry.attributes.position, o = g2t(last[1], last[2], 0.3);
    R3.splashV.forEach(([vx, vy, vz], i) => { const y = vy * ts - 16 * ts * ts; pa.setXYZ(i, o.x + vx * ts, Math.max(0.2, o.y + y), o.z + vz * ts); });
    pa.needsUpdate = true; R3.splash.material.opacity = Math.max(0, 0.95 - ts * 0.4);
    R3.ripple.position.set(o.x, 0.25, o.z); R3.ripple.scale.setScalar(2 + ts * 14); R3.ripple.material.opacity = Math.max(0, 0.8 - ts * 0.36);
  }
  // a quick flash where bat meets ball
  R3.flash.visible = t < 0.18 && !g.play.res.bunt;
  if (R3.flash.visible) { const u = t / 0.18; R3.flash.position.copy(g2t(0, 1.2, 2.8)); R3.flash.scale.setScalar(3 + u * 7); R3.flash.material.opacity = 1 - u; }
  // ball + trail
  const held = carry && boneWorld(carry[0], carry[1]);
  placeBall(ts >= 0 ? null : held ? { x: held.x, y: -held.z, z: held.y } : b, 1.6);
  const pts = []; for (let k = 10; k >= 0; k--) { const q = timelineBall(tl, Math.max(0, t - k * 0.035)); pts.push(g2t(q.x, q.y, q.z)); }
  setTrail(b.z > 1 ? pts : null);
}

function titleScene(t) {
  usePark('home', false);
  titleCamera(t); aimSun(0, -170, 330);
  const park = PARKS.home, sp = spots(park), tA = amb();
  const kit = { jersey: '#F4F1EA', trim: '#8E2F1F', pants: '#F4F1EA', cap: '#8E2F1F', sock: '#8E2F1F', num: '#8E2F1F' };
  FIELD_POS.forEach((pos, i) => {
    const a = R3.actors[i]; show(a, true); dress(a, kit, { skin: ['#F1C9A5', '#C68863', '#7D4A2A', '#E0AC86'][i % 4], id: `title-${i}` });
    setAcc(a, pos === 'C' ? ['helmet', 'mask', 'gear', 'shinguard.L', 'shinguard.R', 'glove'] : ['cap', 'glove']);
    place(a, sp[pos][0], sp[pos][1], pos === 'P' ? 0.8 : 0, 0, 0, false);
    pose(a, pos === 'C' ? 'crouch' : pos === 'P' ? 'pitch' : 'ready', pos === 'P' ? (tA % 3) * 0.5 : tA + i * 0.37);
  });
  for (let i = 9; i < 16; i++) show(R3.actors[i], false);
  placeBall(null); setTrail(null);
}

// timeline helpers (same interpolation as the 2D view)
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

// ---------------------------------------------------------------- frame
// Adaptive quality: while frames come back to back (the live loop), watch the median interval. If a
// device can't hold ~40 fps, step down a preset: high → medium (smaller shadows, pixel ratio ≤ 1.5)
// → low (no shadows, pixel ratio 1). Never steps up again in the session; ?q= pins a preset.
const GOV = { last: 0, d: [], until: 0 };
function govern() {
  const now = performance.now(), dt = now - GOV.last; GOV.last = now;
  // frames over 0.2 s are test steps or tab switches, not the device's pace; a frozen clock means a capture
  if (param('q') || R3.quality === 'low' || R3.frozen != null || R3.pinned || dt > 200) { GOV.d.length = 0; return; }
  GOV.d.push(dt);
  if (GOV.d.length < 150 || now < GOV.until) return;
  const s = GOV.d.slice().sort((a, b) => a - b), med = s[s.length >> 1];
  GOV.d.length = 0;
  if (med > 24) setQuality(R3.quality === 'high' ? 'medium' : 'low');
}
export function setQuality(q) {
  R3.quality = q; R3.governed = (R3.governed || 0) + 1; GOV.until = performance.now() + 2000;
  const sh = q !== 'low';
  if (R3.renderer.shadowMap.enabled !== sh) { R3.renderer.shadowMap.enabled = sh; R3.scene.traverse((o) => { if (o.material) [].concat(o.material).forEach((m) => { m.needsUpdate = true; }); }); }
  R3.sun.castShadow = sh;
  applyPlayers();
  if (q !== 'low' && !R3.v3) loadPlayerPack();
  const ms = q === 'high' ? 2048 : 1024;
  if (R3.sun.shadow.mapSize.x !== ms) { R3.sun.shadow.mapSize.set(ms, ms); if (R3.sun.shadow.map) { R3.sun.shadow.map.dispose(); R3.sun.shadow.map = null; } }
  resize3d();
}

export function render3d(mode, g, ui, titleT = 0) {
  if (!R3.ok) return false;
  const cpu0 = performance.now();
  govern();
  R3.splash.visible = R3.ripple.visible = R3.flash.visible = false;
  if (R3.W !== Math.round(R3.canvas.parentElement.getBoundingClientRect().width)) resize3d();
  if (mode === 'title') titleScene(titleT);
  else if (mode === 'field') fieldScene(g, ui);
  else duelScene(g, ui);
  if (g && R3.park && R3.park.board) {
    drawScoreboard(R3.park.board, { home: g.teams[0].team.abbr, away: g.teams[1].team.abbr, hs: g.teams[0].score, as: g.teams[1].score, inn: g.inning, top: g.half === 0, b: g.balls, s: g.strikes, o: g.outs });
  }
  if (W3.water) W3.water.color.setHSL(0.52, 0.27, 0.4 + 0.02 * Math.sin(amb() * 2));
  if (R3.look) closeCamera(R3.look);
  { const f = R3.fill, c = R3.cam; f.position.copy(c.position).add(new T.Vector3(0, 30, 0)); c.getWorldDirection(f.target.position); f.target.position.multiplyScalar(100).add(c.position); f.intensity = 0.3 * R3.sun.intensity; f.visible = R3.quality === 'high'; } // phones: one light fewer per pixel (skin keeps its own light floor)
  // structures the camera sits behind (the press box, from the high-home field camera) would fill the frame: hide them
  if (R3.park && R3.park.camHide) {
    const cd = Math.hypot(R3.cam.position.x, R3.cam.position.z), p = new T.Vector3();
    for (const o of R3.park.camHide) {
      o.getWorldPosition(p); const pd = Math.hypot(p.x, p.z);
      const behind = (R3.cam.position.x * p.x + R3.cam.position.z * p.z) / Math.max(1, cd * pd) > 0.8 && cd > pd - 8; // same side of home, farther out
      o.visible = !(behind && R3.cam.position.y > 15);
    }
  }
  lodPass();
  contactPass();
  gpuTimer(true);
  R3.renderer.render(R3.scene, R3.cam);
  gpuTimer(false);
  R3.cpuMs = performance.now() - cpu0;
  R3.view = mode;
  R3.visible = R3.actors.filter((a) => a.wrap.visible).length;
  return true;
}

// Game coords (ft) → CSS px in the stage, plus px per foot at that depth (like render.js proj()).
const pv = { v: null };
export function p3(x, y, z) {
  const v = (pv.v = pv.v || new T.Vector3()).set(x, z, -y);
  const d = v.clone().applyMatrix4(R3.cam.matrixWorldInverse).z;
  v.project(R3.cam);
  const f = (R3.H / 2) / Math.tan(R3.cam.fov * Math.PI / 360);
  return [(v.x + 1) / 2 * R3.W, (1 - v.y) / 2 * R3.H, f / Math.max(0.01, -d)];
}
// CSS px → plate plane (game y = 0): {x, z}
export function screenToPlate3(sx, sy) {
  if (R3.view !== 'duel') { duelCamera(R3.camKind || 'bat'); R3.cam.updateMatrixWorld(); } // aiming before the first duel frame
  const ndc = new T.Vector2(sx / R3.W * 2 - 1, -(sy / R3.H * 2 - 1));
  const ray = new T.Raycaster(); ray.setFromCamera(ndc, R3.cam);
  const pl = new T.Plane(new T.Vector3(0, 0, 1), 0), hit = new T.Vector3();
  if (!ray.ray.intersectPlane(pl, hit)) return { x: 0, z: 2.5 };
  return { x: hit.x, z: hit.y };
}
// ---------------------------------------------------------------- review and profiling hooks
// Synthetic albedo-detail and normal maps of a given size on every player (measurement only, ?tex=1024).
function detailMaps(n) {
  const c = document.createElement('canvas'); c.width = c.height = n; const x = c.getContext('2d'), d = x.createImageData(n, n);
  for (let i = 0; i < n * n; i++) { const v = 200 + ((i * 2654435761) >>> 24) % 56; d.data.set([v, v, v, 255], i * 4); }
  x.putImageData(d, 0, 0);
  const map = new T.CanvasTexture(c); map.colorSpace = T.SRGBColorSpace; map.generateMipmaps = true; map.anisotropy = 4;
  const nc = document.createElement('canvas'); nc.width = nc.height = n; const nx = nc.getContext('2d'); nx.fillStyle = '#8080FF'; nx.fillRect(0, 0, n, n);
  for (let i = 0; i < 400; i++) { nx.fillStyle = `rgb(${110 + (i * 37) % 40},${110 + (i * 53) % 40},255)`; nx.fillRect((i * 97) % n, (i * 61) % n, n / 32, n / 32); }
  const nmap = new T.CanvasTexture(nc);
  for (const a of R3.actors) { a.mat.map = map; a.mat.normalMap = nmap; a.mat.needsUpdate = true; }
}
// Close-up camera (captures): frames one actor, or one part of it, `width` feet across, from `yaw`
// radians around its facing (0 = in front) and `pitch` radians above. Targets: a role (pitcher,
// catcher, 1B … RF, batter, runner1-3, ump) or an actor index, with an optional part:
// body, head, hands, feet, bat, glove ('batter:hands').
const ROLE = { pitcher: 0, catcher: 1, '1B': 2, '2B': 3, SS: 4, '3B': 5, LF: 6, CF: 7, RF: 8, batter: 9, runner1: 10, runner2: 11, runner3: 12, ump: 13 };
const PART = { head: ['head'], hands: ['hand.L', 'hand.R'], feet: ['foot.L', 'foot.R'], bat: ['bat'], glove: ['glove'] };
export function camLook(target, width = 8, pitch = 0.12, yaw = 0.5) {
  if (!target) { R3.look = null; return true; }
  const [who, part = 'body'] = String(target).split(':');
  const a = R3.actors[ROLE[who] ?? +who];
  if (!a || !a.wrap.visible) return false;
  R3.look = { a, part, width, pitch, yaw };
  return true;
}
function closeCamera(L) {
  const a = L.a; a.wrap.updateMatrixWorld(true);
  const p = new T.Vector3();
  if (PART[L.part]) { const v = new T.Vector3(); for (const n of PART[L.part]) p.add(boneWorld(a, n, v)); p.divideScalar(PART[L.part].length); }
  else { a.wrap.getWorldPosition(p); p.y += 3.1; }
  const fov = 30, dist = (L.width / 2) / Math.tan(fov * Math.PI / 360) / Math.min(1, R3.W / R3.H);
  const face = a.wrap.rotation.y + L.yaw; // the model faces +Z at rest
  const c = R3.cam; c.fov = fov;
  c.position.set(p.x + Math.sin(face) * Math.cos(L.pitch) * dist, p.y + Math.sin(L.pitch) * dist, p.z + Math.cos(face) * Math.cos(L.pitch) * dist);
  c.lookAt(p); c.updateProjectionMatrix();
  if (R3.ball.visible) sizeBallShadow(ballScale(), R3.ball.position.y); // sized for the close camera, not the one it replaced
}
// The WebGL frame alone (no 2D overlay or HUD) as a PNG data URL, rendered now: read back in the same task.
export function glShot() {
  if (!R3.ok) return null;
  R3.renderer.render(R3.scene, R3.cam);
  return R3.canvas.toDataURL('image/png');
}
// GPU time per frame from EXT_disjoint_timer_query_webgl2 (when the browser exposes it).
const GT = { ext: undefined, q: [], ms: [] };
function gpuTimer(start) {
  if (!R3.profile) return;
  const gl = R3.renderer.getContext();
  if (GT.ext === undefined) GT.ext = gl.getExtension('EXT_disjoint_timer_query_webgl2');
  if (!GT.ext) return;
  if (start) {
    for (let i = GT.q.length - 1; i >= 0; i--) { const q = GT.q[i]; if (gl.getQueryParameter(q, gl.QUERY_RESULT_AVAILABLE)) { if (!gl.getParameter(GT.ext.GPU_DISJOINT_EXT)) GT.ms.push(gl.getQueryParameter(q, gl.QUERY_RESULT) / 1e6); gl.deleteQuery(q); GT.q.splice(i, 1); } }
    if (GT.ms.length > 120) GT.ms.splice(0, GT.ms.length - 120);
    GT.cur = gl.createQuery(); gl.beginQuery(GT.ext.TIME_ELAPSED_EXT, GT.cur);
  } else if (GT.cur) { gl.endQuery(GT.ext.TIME_ELAPSED_EXT); GT.q.push(GT.cur); GT.cur = null; }
}
// Profiling on/off; returns the mean GPU ms of the recent frames (null when unsupported).
export function gfxProfile(on = true) {
  R3.profile = on; const ms = GT.ms.slice(); GT.ms.length = 0;
  return { supported: GT.ext ? true : GT.ext === undefined ? null : false, frames: ms.length, all: ms.length ? +(ms.reduce((s, x) => s + x, 0) / ms.length).toFixed(3) : null };
}
export function gfxInfo() {
  const i = R3.renderer ? R3.renderer.info : null;
  return { ok: R3.ok, quality: R3.quality, soft: !!R3.soft, renderer: R3.gpu || '', calls: i ? i.render.calls : 0, tris: i ? i.render.triangles : 0,
    geometries: i ? i.memory.geometries : 0, textures: i ? i.memory.textures : 0, programs: i && i.programs ? i.programs.length : 0, cpuMs: +(R3.cpuMs || 0).toFixed(2), actors: R3.visible || 0, governed: R3.governed || 0 };
}
export { RELEASE, polar, fenceDist };
