// Ballplayers in 3D. Two generations of model share this code:
// - v2 (assets/models.js, always loaded): one Blender-made capsule player (art-src/blender/player.py), the low tier
//   and the fallback while the v3 pack loads.
// - v3 (assets/players-<tier>.js, loaded after the game is up): realistic CC0 bodies in three builds with up to three
//   levels of detail each on one rig (art-src/blender/players/build_players.py). The skin carries a detail map.
// Each actor holds one "form" per body build; dress() picks the player's build and render3d's LOD pass its detail
// level. Team colors come through a palette shader (region id in the vertex color), accessories are shown or hidden
// by scaling their bones, and poses are driven from game time (not wall-clock), so any frame is reproducible.
let T = null;
const A = { proto: null, clips: {}, ready: false, v3: null };
export const ACC = ['cap', 'helmet', 'mask', 'gear', 'shinguard.L', 'shinguard.R', 'glove', 'bat'];
// region ids (must match art-src/blender/player.py and players/build_players.py REG)
const RG = { jersey: 0, pants: 1, sock: 2, skin: 3, cap: 4, helmet: 5, shoe: 6, belt: 7, under: 8, glove: 9, bat: 10, dark: 11, gear: 12, white: 13, hair: 14, trim: 15 };
// v2 bone names (three.js drops the dot: 'upperarm.L' → 'upperarmL') → v3 (the MPFB2 game-engine rig)
const V3BONE = { root: 'Root', hips: 'pelvis', spine: 'spine_01', chest: 'spine_03', neck: 'neck_01', head: 'head',
  upperarmL: 'upperarm_l', forearmL: 'lowerarm_l', handL: 'hand_l', upperarmR: 'upperarm_r', forearmR: 'lowerarm_r', handR: 'hand_r',
  thighL: 'thigh_l', shinL: 'calf_l', footL: 'foot_l', thighR: 'thigh_r', shinR: 'calf_r', footR: 'foot_r',
  cap: 'cap', helmet: 'helmet', mask: 'mask', gear: 'gear', shinguardL: 'shinguard_l', shinguardR: 'shinguard_r', glove: 'glove', bat: 'bat' };
export const BUILDS = ['lean', 'average', 'stocky'];

export function setThree(t) { T = t; }
function b64ToBuf(b64) {
  const s = atob(b64), u = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i);
  return u.buffer;
}
const parse = (b64) => new Promise((res, rej) => new T.GLTFLoader().parse(b64ToBuf(b64), '', res, rej));
export async function loadActors() {
  const src = window.DS_MODELS && window.DS_MODELS.player;
  if (!src) throw new Error('player model missing');
  const gltf = await parse(src);
  A.proto = gltf.scene;
  for (const c of gltf.animations) A.clips[c.name] = c;
  A.ready = true;
  return A;
}

// The v3 pack (window.DS_PLAYERS, from assets/players-<tier>.js): {tier, meta, glb: {build: b64}, skin: {light, dark}}.
// Clips ship once (with the average build) and bind to every build by bone name; the pelvis position track is scaled
// to each build's hip height.
export async function loadPlayers(pack) {
  const v3 = { meta: pack.meta, builds: {}, clips: {}, skin: {} };
  for (const b of BUILDS) if (pack.glb[b]) v3.builds[b] = await parse(pack.glb[b]);
  const src = v3.builds.average || Object.values(v3.builds)[0];
  const hip = (b) => (pack.meta.variants[b] ? pack.meta.variants[b].hipHeight : 1);
  for (const b of Object.keys(v3.builds)) {
    const k = hip(b) / hip('average');
    v3.clips[b] = {};
    for (const c of src.animations) {
      // rotations only, plus the pelvis's travel: the exporter also writes every bone's position and scale, which the
      // mixer would otherwise evaluate every frame for nothing (accessory scale is set by pose())
      const cl = c.clone();
      cl.tracks = cl.tracks.filter((tr) => tr.name.endsWith('.quaternion') || tr.name === 'pelvis.position');
      if (k !== 1) for (const tr of cl.tracks) if (tr.name === 'pelvis.position') {
        const v = tr.values.slice(); for (let i = 0; i < v.length; i++) v[i] *= k; tr.values = v;
      }
      v3.clips[b][c.name] = cl.optimize();
    }
  }
  for (const [k, url] of Object.entries(pack.skin || {})) {
    const im = new Image(); im.src = url; await im.decode();
    const t = new T.Texture(im); t.flipY = false; t.anisotropy = 4; t.needsUpdate = true;
    if (k === 'fabric') { t.wrapS = t.wrapT = T.RepeatWrapping; t.repeat.set(28, 28); v3.fabric = t; continue; } // a normal map: linear, tiled
    t.colorSpace = T.SRGBColorSpace;
    v3.skin[k] = t;
  }
  A.v3 = v3;
  pack.glb = null; pack.skin = null; // the parsed models are all that's needed: let the multi-MB base64 strings go
  return v3;
}

// Palette material: MeshStandardMaterial whose diffuse comes from uPal[region]; on skin, times the skin detail map.
function paletteMaterial() {
  const m = new T.MeshStandardMaterial({ vertexColors: true, roughness: 0.72, metalness: 0 });
  const pal = Array.from({ length: 16 }, () => new T.Vector4(1, 1, 1, 0.7));
  const vis = new Array(16).fill(1);
  m.userData.pal = pal; m.userData.vis = vis;
  m.onBeforeCompile = (sh) => {
    sh.uniforms.uPal = { value: pal }; sh.uniforms.uVis = { value: vis };
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', '#include <common>\nuniform vec4 uPal[16]; uniform float uVis[16];')
      .replace('#include <map_fragment>', '')
      .replace('#include <color_fragment>', `int rid = int(clamp(vColor.r * 16.0, 0.0, 15.0)); vec4 pc = uPal[rid]; if (uVis[rid] < 0.5) discard; diffuseColor.rgb *= pc.rgb;
#ifdef USE_MAP
if (rid == ${RG.skin}) diffuseColor.rgb *= texture2D(map, vMapUv).rgb * 2.0; // the detail map is stored at half scale
#endif`)
      .replace('#include <roughnessmap_fragment>', '#include <roughnessmap_fragment>\nroughnessFactor = pc.a;')
      // the fabric normal map (high tier) only on cloth: jersey, pants, socks, undershirt, trim
      .replace('#include <normal_fragment_maps>', 'vec3 nBase = normal;\n#include <normal_fragment_maps>\nif (!(rid == 0 || rid == 1 || rid == 2 || rid == 8 || rid == 15)) normal = nBase;')
      // skin keeps a little of its own light: faces under a brim or a helmet still show eyes and brows
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>\nif (rid == ${RG.skin}) totalEmissiveRadiance += diffuseColor.rgb * mix(0.26, 0.08, clamp(dot(diffuseColor.rgb, vec3(0.3, 0.59, 0.11)) * 2.5, 0.0, 1.0)) + vec3(0.045, 0.034, 0.027) * 0.8;`);
  };
  m.customProgramCacheKey = () => 'ds-palette';
  return m;
}
const lin = (hex) => new T.Color(hex);
function setPal(mat, region, hex, rough = 0.72) { const c = lin(hex); mat.userData.pal[region].set(c.r, c.g, c.b, rough); }

export const SKINS = ['#F1C9A5', '#E0AC83', '#C68B62', '#8D5A3C', '#5E3B26'];
const lum = (hex) => { const c = lin(hex); return 0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b; };
const hashStr = (s) => { let h = 2166136261; for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619); return h >>> 0; };
// kit: {jersey, trim, pants, cap, sock, num}; o: {skin, hair, umpire, id}. The player's id picks his build.
export function dress(actor, kit, o = {}) {
  if (actor.v3) useForm(actor, o.umpire ? 'stocky' : BUILDS[hashStr(String(o.id ?? actor.i)) % BUILDS.length]);
  const m = actor.mat;
  const dk = `${kit.jersey}|${kit.pants}|${kit.sock}|${kit.cap}|${kit.trim}|${o.skin}|${o.umpire ? 1 : 0}`;
  showRegions(actor, null); setShadow(actor, true);
  if (actor.dressKey === dk) return; // palette unchanged since last frame
  actor.dressKey = dk;
  setPal(m, RG.jersey, kit.jersey, kit.wool ? 0.9 : 0.68); setPal(m, RG.pants, kit.pants, kit.wool ? 0.9 : 0.7);
  setPal(m, RG.sock, kit.sock); setPal(m, RG.cap, kit.cap, 0.8); setPal(m, RG.helmet, kit.cap, 0.62); // glossy, but a brim facing the sun no longer blows out white
  setPal(m, RG.under, o.umpire ? kit.jersey : kit.trim, 0.8); setPal(m, RG.trim, kit.trim);
  setPal(m, RG.skin, o.skin || '#C68B62', 0.6); setPal(m, RG.shoe, o.umpire ? '#111111' : '#16161A', 0.45); setPal(m, RG.belt, o.umpire ? '#111111' : '#1E1E22', 0.5);
  setPal(m, RG.glove, '#8A5528', 0.55); setPal(m, RG.white, '#E4DED2', 0.45); // eye whites (only the eyes use it): a touch below paper white setPal(m, RG.bat, '#D6B07A', 0.45); setPal(m, RG.dark, '#18181C', 0.5);
  setPal(m, RG.gear, o.umpire ? '#202124' : kit.cap, 0.4); setPal(m, RG.hair, o.hair || '#2A1D14', 0.85);
  if (actor.v3) { // light skin tones tint the light detail map, dark tones the dark one
    const t = A.v3.skin[lum(o.skin || '#C68B62') > 0.25 ? 'light' : 'dark'] || null;
    if (m.map !== t) { m.map = t; m.needsUpdate = true; }
    const n = actor.fabric ? A.v3.fabric || null : null;
    if (m.normalMap !== n) { m.normalMap = n; m.normalScale.set(0.6, 0.6); m.needsUpdate = true; }
  }
  actor.kit = kit;
}

// Shadow-map depth for players that leaves out caps and helmets: a brim's sun shadow would black out the face
// under it (headwear stays lit and visible; only its shadow goes).
let depthMat = null;
function shadowDepth() {
  if (depthMat) return depthMat;
  depthMat = new T.MeshDepthMaterial({ depthPacking: T.RGBADepthPacking });
  depthMat.onBeforeCompile = (sh) => {
    sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nattribute vec4 color; varying float vRid;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvRid = color.r;');
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nvarying float vRid;')
      .replace('void main() {', `void main() {\nint rid = int(clamp(vRid * 16.0, 0.0, 15.0)); if (rid == ${RG.cap} || rid == ${RG.helmet}) discard;`);
  };
  depthMat.customProgramCacheKey = () => 'ds-depth-noheadwear';
  return depthMat;
}
// A form: one rigged body (its own skeleton, mixer and clip actions) with one or more detail levels.
function makeForm(proto, clips, mat) {
  const root = T.cloneSkinned(proto);
  const lods = [], skinDecals = {};
  root.traverse((o) => {
    if (!o.isSkinnedMesh) return;
    if (o.name.startsWith('DECAL_')) { // v3: lettering and number skinned onto the jersey (attachDecals gives them a material)
      o.geometry.boundingSphere = new T.Sphere(new T.Vector3(0, 3.2, 0), 5.2); o.frustumCulled = true; o.visible = false;
      skinDecals[{ DECAL_FRONT: 'word', DECAL_BACK: 'num', DECAL_PLACKET: 'btn' }[o.name] || 'num'] = o; return;
    }
    o.material = mat; o.castShadow = true; o.receiveShadow = true; o.customDepthMaterial = shadowDepth();
    // a fixed bound around the player in any pose (feet): a skinned mesh can't be culled by its rest-pose box
    o.geometry.boundingSphere = new T.Sphere(new T.Vector3(0, 3.2, 0), 5.2); o.frustumCulled = true;
    const m = /LOD(\d)/.exec(o.name); lods[m ? +m[1] : lods.length] = o;
  });
  const bones = {};
  root.traverse((o) => { if (o.isBone) bones[o.name] = o; });
  // the feet's rest heights above the soles (bind pose, feet on the ground): grounding measures the soles from them
  root.updateMatrixWorld(true);
  const feet = [];
  for (const n of ['foot_l', 'foot_r', 'ball_l', 'ball_r', 'footL', 'footR']) if (bones[n]) { const p = new T.Vector3(); bones[n].getWorldPosition(p); root.worldToLocal(p); feet.push([bones[n], p.y]); }
  // and each foot's rest orientation in the root's space, for planting it flat (heel, ball and edges down)
  const footQ = {}, rinv = new T.Matrix4().copy(root.matrixWorld).invert(), fm = new T.Matrix4(), sc = new T.Vector3(), ps = new T.Vector3();
  for (const n of ['foot_l', 'foot_r']) if (bones[n]) { const q = new T.Quaternion(); fm.multiplyMatrices(rinv, bones[n].matrixWorld).decompose(ps, q, sc); footQ[n] = q; }
  // the clavicles' bind rotations (local), from the skin's bind matrices: the clips key them, so the live pose can't tell
  const sk = lods.find(Boolean)?.skeleton, bindQ = {};
  if (sk) for (const n of ['clavicle_l', 'clavicle_r']) {
    const i = sk.bones.findIndex((b) => b.name === n); if (i < 0) continue;
    const pi = sk.bones.indexOf(sk.bones[i].parent), w = new T.Matrix4().copy(sk.boneInverses[i]).invert();
    if (pi >= 0) w.premultiply(sk.boneInverses[pi]);
    const q = new T.Quaternion(); w.decompose(new T.Vector3(), q, new T.Vector3()); bindQ[n] = q;
  }
  const mixer = new T.AnimationMixer(root);
  const acts = {};
  for (const [n, c] of Object.entries(clips)) { const a = mixer.clipAction(c); a.play(); a.enabled = false; a.setEffectiveWeight(0); acts[n] = a; }
  return { root, lods, bones, mixer, acts, feet, footQ, bindQ, skinDecals, lod: 0 }; // lods[k] is LODk; a tier's pack may leave out the finest
}
export function makeActor(scene, i = 0) {
  const wrap = new T.Group();
  scene.add(wrap);
  const actor = { i, wrap, mat: paletteMaterial(), forms: {}, form: null, show: new Set(), mirror: false, v3: false, lodMax: 2 };
  actor.forms.v2 = makeForm(A.proto, A.clips, actor.mat);
  useForm(actor, 'v2');
  setAcc(actor, ['cap', 'glove']);
  return actor;
}
// Gives an actor the v3 bodies (after loadPlayers), or takes them away (the low tier); the v2 form always stays.
export function useV3(actor, on) {
  on = on && !!A.v3;
  if (actor.v3 === on) return;
  actor.v3 = on; actor.dressKey = null; actor.numKey = null;
  if (!on && actor.mat.map) { actor.mat.map = null; actor.mat.needsUpdate = true; }
  useForm(actor, on ? 'average' : 'v2');
}
function useForm(actor, key) {
  // v3 builds are made the first time an actor needs them (most actors only ever wear one or two)
  if (!actor.forms[key] && key !== 'v2' && A.v3 && A.v3.builds[key]) actor.forms[key] = makeForm(A.v3.builds[key].scene, A.v3.clips[key], actor.mat);
  const f = actor.forms[key];
  if (!f || actor.form === f) return;
  if (actor.form) actor.wrap.remove(actor.form.root);
  actor.wrap.add(f.root);
  actor.form = f; actor.formKey = key; actor.root = f.root; actor.mixer = f.mixer; actor.acts = f.acts;
  // bones under both naming schemes, so staging code written against v2 names keeps working
  actor.bones = { ...f.bones };
  if (key !== 'v2') for (const [v2, v3] of Object.entries(V3BONE)) if (f.bones[v3]) actor.bones[v2] = f.bones[v3];
  f.root.scale.x = 1; attachDecals(actor); // before mirroring: decals are measured on the unmirrored rest pose
  f.root.scale.x = actor.mirror ? -1 : 1;
  setLod(actor, f.lod);
}
// Detail level: 0 = full. The nearest level this form has at or below that detail, within the actor's cap.
export function setLod(actor, n) {
  const f = actor.form, L = f.lods;
  n = Math.max(0, Math.min(n, actor.lodMax, L.length - 1));
  while (!L[n] && n < L.length - 1) n++;
  while (!L[n] && n > 0) n--;
  f.lod = n;
  L.forEach((m, k) => { if (m) m.visible = k === n; });
  actor.mesh = L[n];
}
export function setShadow(actor, on) { for (const m of actor.form.lods) if (m) m.castShadow = on; }
const bn = (n) => n.replace('.', '');
export function setAcc(actor, list) { actor.show = new Set(list); }
// Draw only some regions (null = all), e.g. just the catcher's mitt in the catcher's-eye view.
export function showRegions(actor, list) {
  const v = actor.mat.userData.vis;
  for (let i = 0; i < 16; i++) v[i] = list ? 0 : 1;
  if (list) for (const n of list) v[RG[n]] = 1;
}
// Pose: clip at time t (seconds), optionally blended with a second clip at weight w.
export function pose(actor, name, t, name2 = null, t2 = 0, w2 = 0) {
  for (const a of Object.values(actor.acts)) { a.enabled = false; a.setEffectiveWeight(0); }
  const set = (n, tt, w) => { const a = actor.acts[n]; if (!a) return; const d = a.getClip().duration; a.enabled = true; a.setEffectiveWeight(w); a.time = a.loop === T.LoopRepeat && isLoop(n) ? ((tt % d) + d) % d : Math.max(0, Math.min(d - 1e-4, tt)); };
  set(name, t, 1 - (name2 ? w2 : 0));
  if (name2) set(name2, t2, w2);
  actor.mixer.update(0);
  if (actor.v3) settleShoulders(actor);
  const loose = name === 'run' ? 0.7 : 0.25; // a runner's hands close to loose fists
  // bat hands grip; the gloved hand stays open, each finger inside its stall (the glove is shaped on the open hand)
  if (actor.v3) curlFingers(actor, actor.show.has('bat') ? 1 : actor.show.has('glove') ? 0 : loose, actor.show.has('bat') ? 1 : loose);
  ground(actor, !FLIGHT.has(name));
  if (actor.v3) { const w = (PLANTED.has(name) ? 1 - (name2 ? w2 : 0) : 0) + (name2 && PLANTED.has(name2) ? w2 : 0); if (w > 0) plantFeet(actor, w); }
  for (const n of ACC) { const b = actor.bones[bn(n)]; if (b) { const s = actor.show.has(n) ? 1 : 0.0001; b.scale.set(s, s, s); } }
  // the catcher's chest protector covers the jersey front: its lettering and buttons would draw through it
  const open = !actor.show.has('gear'), sd = actor.form.skinDecals;
  if (actor.wordMesh && actor.wordMesh.material) actor.wordMesh.material.visible = open; // every tier's lettering (low's flat decals too)
  if (sd && sd.btn && sd.btn.material) sd.btn.material.visible = open && actor.lodMax === 0; // high tier only: a draw call per player the phone tier can't spare for buttons it can barely show
  // hair stays under a cap or helmet (v3 hair is real geometry and would poke through)
  if (actor.v3) { const v = actor.mat.userData.vis; if (v[RG.skin]) v[RG.hair] = actor.show.has('helmet') || actor.show.has('cap') ? 0 : 1; } // hair would poke through; the cap covers the nape
}
const LOOPS = new Set(['idle', 'ready', 'bat_stance', 'bat_bunt', 'crouch', 'ump', 'run', 'cheer']);
// Finger curl (v3 hands; the clips don't key fingers): 0 = the rest pose's open hand, 1 = a fist round a bat handle.
// Each joint bends about the bone's local X axis; the thumb folds in less.
const FINGERS = ['index', 'middle', 'ring', 'pinky'], CURL = [0.95, 1.2, 0.85], cq = { q: null, x: null };
export let CURL_SIGN = 1;
function curlFingers(actor, l, r) {
  const q = (cq.q = cq.q || new T.Quaternion()), x = (cq.x = cq.x || new T.Vector3(1, 0, 0));
  for (const [s, k] of [['l', l], ['r', r]]) {
    for (const f of FINGERS) for (let j = 1; j <= 3; j++) {
      const b = actor.bones[`${f}_0${j}_${s}`]; if (!b) continue;
      q.setFromAxisAngle(x, CURL_SIGN * k * CURL[j - 1]); b.quaternion.copy(rest(actor, b)).multiply(q); // from rest: the clips don't key fingers
    }
    for (let j = 2; j <= 3; j++) { const b = actor.bones[`thumb_0${j}_${s}`]; if (b) { q.setFromAxisAngle(x, CURL_SIGN * k * 0.5); b.quaternion.copy(rest(actor, b)).multiply(q); } }
  }
}
const rest = (actor, b) => { const r = (actor.form.restQ = actor.form.restQ || {}); return r[b.name] || (r[b.name] = b.quaternion.clone()); };
// Clips whose feet may both leave the ground (run strides, the cheer's hop): no grounding.
const FLIGHT = new Set(['run', 'cheer']);
// Foot grounding: shift the body so its lowest sole rests on the ground (the wrap's floor), whatever the clip's own
// hip height does. The clips were keyed for another skeleton, so without this the feet hover or sink.
const gp = { v: null };
function ground(actor, on) {
  const f = actor.form, r = f.root;
  r.position.y = 0;
  if (!on || !f.feet.length) return;
  actor.wrap.updateMatrixWorld(true);
  const p = (gp.v = gp.v || new T.Vector3()), inv = (gp.m = gp.m || new T.Matrix4()).copy(actor.wrap.matrixWorld).invert();
  let low = Infinity;
  for (const [b, h] of f.feet) { p.setFromMatrixPosition(b.matrixWorld).applyMatrix4(inv); low = Math.min(low, p.y - h); }
  r.position.y = -low;
}
// Foot planting (v3, standing clips): grounding rests the lowest sole on the ground, but the mocap leaves the other
// foot, or a toe, an inch or so up. A foot within PLANT ft of the ground comes down flat onto it: two-bone leg IK
// bends the knee to lower the ankle, then the foot pitches so heel and ball both rest on the ground. Worked in the
// body's own space (no mirror there), so left-handed rigs plant too; w blends it in and out with the clip.
const PLANTED = new Set(['idle', 'ready', 'bat_stance', 'bat_bunt', 'ump']), PLANT = 0.3; // not the catcher's crouch: on the balls of the feet
const pk = { inv: null, m: null, q: null, qb: null, v: [] };
function rootSpace(b, pos, q) { // a bone's position and rotation in the form root's space
  pk.m.multiplyMatrices(pk.inv, b.matrixWorld);
  if (pos) pos.setFromMatrixPosition(pk.m);
  if (q) pk.m.decompose(pk.v[5], q, pk.v[6]);
}
function turnBone(b, dq) { // rotate a bone by dq, given in root space
  rootSpace(b.parent, null, pk.q); rootSpace(b, null, pk.qb);
  b.quaternion.copy(pk.q.invert().multiply(dq).multiply(pk.qb));
  b.updateMatrixWorld(true);
}
plantFeet.init = () => { pk.inv = new T.Matrix4(); pk.m = new T.Matrix4(); pk.q = new T.Quaternion(); pk.qb = new T.Quaternion(); pk.dq = new T.Quaternion(); for (let i = 0; i < 8; i++) pk.v.push(new T.Vector3()); };
function plantFeet(actor, w) {
  const f = actor.form, B = f.bones;
  if (!pk.inv) plantFeet.init();
  const restH = (f.restH = f.restH || Object.fromEntries(f.feet.map(([b, h]) => [b.name, h])));
  actor.wrap.updateMatrixWorld(true);
  pk.inv.copy(f.root.matrixWorld).invert();
  const [H, K, A, P, Tg] = pk.v, gY = pk.v[7].setFromMatrixPosition(actor.wrap.matrixWorld).applyMatrix4(pk.inv).y;
  for (const s of ['l', 'r']) {
    const th = B[`thigh_${s}`], ca = B[`calf_${s}`], ft = B[`foot_${s}`], ba = B[`ball_${s}`];
    if (!th || !ca || !ft || !ba) continue;
    const hA = restH[ft.name], hB = restH[ba.name];
    rootSpace(th, H); rootSpace(ca, K); rootSpace(ft, A); rootSpace(ba, P);
    const lift = Math.min(A.y - hA, P.y - hB) - gY;
    if (lift > PLANT || lift < -PLANT) continue; // a raised foot (stride, kick) stays up
    // the knee: bend so the hip-to-ankle distance reaches the planted ankle
    Tg.copy(A); Tg.y += (gY + hA - A.y) * w;
    const a = H.distanceTo(K), b = K.distanceTo(A), d = Math.max(Math.abs(a - b) + 1e-3, Math.min(a + b - 1e-3, H.distanceTo(Tg)));
    const u = H.clone().sub(K), v = A.clone().sub(K), n = new T.Vector3().crossVectors(u, v);
    if (n.lengthSq() > 1e-8) {
      n.normalize();
      const want = Math.acos(Math.max(-1, Math.min(1, (a * a + b * b - d * d) / (2 * a * b))));
      turnBone(ca, pk.dq.setFromAxisAngle(n, want - u.angleTo(v)));
    }
    // the hip: swing the leg so the ankle lands on the target
    rootSpace(ft, A);
    turnBone(th, pk.dq.setFromUnitVectors(u.copy(A).sub(H).normalize(), v.copy(Tg).sub(H).normalize()));
    // the foot: back to its rest orientation (sole flat: heel, ball and both edges down), keeping the clip's heading
    const q0 = f.footQ[ft.name]; if (!q0) continue;
    rootSpace(ft, A, pk.qb);
    const now = u.set(0, 1, 0).applyQuaternion(pk.qb), was = v.set(0, 1, 0).applyQuaternion(q0); // heading: along the foot bone, now vs at rest
    const yaw = Math.atan2(now.x, now.z) - Math.atan2(was.x, was.z);
    const want = pk.q.setFromAxisAngle(H.set(0, 1, 0), yaw).multiply(q0);
    want.copy(pk.qb.clone().slerp(want, w));
    turnBone(ft, pk.dq.copy(want).multiply(pk.qb.invert()));
    ba.quaternion.slerp(rest(actor, ba), w); // toes flat too (the mocap curls them into the dirt)
  }
}
// Shoulders: the mocap retarget lifts both clavicles 25-30° above the rig's rest (the CMU shoulder joints sit
// elsewhere), a permanent shrug that puts the shoulder joints at neck height: padded-looking shoulders, no neck.
// Take each clavicle most of the way back to its bind rotation, then turn the upper arm back so the arm keeps
// the clip's direction in the body.
const SHRUG_KEEP = 0.25;
function settleShoulders(actor) {
  const f = actor.form, B = f.bones;
  if (!f.bindQ || !f.bindQ.clavicle_l) return;
  if (!pk.inv) plantFeet.init();
  actor.wrap.updateMatrixWorld(true);
  pk.inv.copy(f.root.matrixWorld).invert();
  for (const s of ['l', 'r']) {
    const cl = B[`clavicle_${s}`], ua = B[`upperarm_${s}`], q0 = f.bindQ[`clavicle_${s}`];
    if (!cl || !ua || !q0) continue;
    const before = (pk.ua = pk.ua || new T.Quaternion()); rootSpace(ua, null, before);
    cl.quaternion.slerp(q0, 1 - SHRUG_KEEP); cl.updateMatrixWorld(true);
    rootSpace(ua, null, pk.qb);
    turnBone(ua, pk.dq.copy(before).multiply(pk.qb.invert()));
  }
}
const isLoop = (n) => LOOPS.has(n);
export const clipDur = (n) => (A.clips[n] ? A.clips[n].duration : 1);

// Place an actor at game coords (x, y) on the ground, facing a game-space heading (radians, 0 = toward
// center field/+y; the model faces +Z in three, which is −game y, so heading is applied accordingly).
export function place(actor, x, y, z, faceX, faceY, mirror = false) {
  actor.wrap.position.set(x, z, -y);
  const dx = faceX - x, dy = faceY - y;
  actor.wrap.rotation.set(0, Math.atan2(dx, -dy), 0);
  // three model faces +Z; target direction in three is (dx, −dy) → yaw = atan2(dx, −dy)
  actor.root.scale.set(mirror ? -1 : 1, 1, 1);
  const flipped = !!actor.mirror !== !!mirror;
  actor.mirror = mirror;
  if (flipped && actor.numArgs) setNumber(actor, ...actor.numArgs); // the number and lettering follow the rig's handedness now, not next frame
  if (actor.numMesh && !(actor.form.decals && actor.form.decals.skinned)) actor.numMesh.scale.x = actor.wordMesh.scale.x = mirror ? -1 : 1; // decals read the right way round
}

// Jersey decals: the number on the back and the school (or club) name across the front, two small planes on the
// chest bone of each form. Their bone-local directions are measured once in the rest pose; v3 forms take the chest's
// front and back depth from the pack's meta.
const decalCache = new Map();
function decalTex(key, w, h, draw) {
  if (!decalCache.has(key)) {
    const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h);
    const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; t.anisotropy = 4; decalCache.set(key, t);
  }
  return decalCache.get(key);
}
// the placket's buttons: six small pale buttons down a narrow strip (the strip's UVs run up its length)
let btnTex = null;
function buttonsTex() {
  if (btnTex) return btnTex;
  const c = document.createElement('canvas'); c.width = 32; c.height = 512; const x = c.getContext('2d');
  for (let i = 0; i < 6; i++) {
    const y = 512 - (i + 0.5) * (512 / 6);
    x.fillStyle = 'rgba(0,0,0,0.35)'; x.beginPath(); x.arc(16, y + 1.5, 9.5, 0, Math.PI * 2); x.fill();
    x.fillStyle = '#F2EEE4'; x.beginPath(); x.arc(16, y, 8.5, 0, Math.PI * 2); x.fill();
    x.fillStyle = 'rgba(0,0,0,0.3)'; for (const [dx, dy] of [[-2.5, -2.5], [2.5, -2.5], [-2.5, 2.5], [2.5, 2.5]]) { x.beginPath(); x.arc(16 + dx, y + dy, 1.2, 0, Math.PI * 2); x.fill(); }
  }
  btnTex = new T.CanvasTexture(c); btnTex.flipY = false; btnTex.colorSpace = T.SRGBColorSpace; btnTex.anisotropy = 4;
  return btnTex;
}
function attachDecals(actor) {
  const f = actor.form, chest = actor.bones.chest;
  if (!chest) return;
  if (!f.decals && f.skinDecals.word && f.skinDecals.num) { // wrapped on the jersey, bending with it
    // drawn 0.12 ft nearer the camera than they are: the coarse decal grid can't follow every bulge of the cloth
    // under it (the placket piping cut through letters), but an arm in front still hides them
    const mk = () => { const m = new T.MeshStandardMaterial({ transparent: true, roughness: 0.75, depthWrite: false, side: T.DoubleSide });
      m.onBeforeCompile = (sh) => { sh.vertexShader = sh.vertexShader.replace('#include <project_vertex>', '#include <project_vertex>\nmvPosition.xyz += normalize(-mvPosition.xyz) * 0.12; gl_Position = projectionMatrix * mvPosition;'); };
      m.customProgramCacheKey = () => 'ds-decal-pull'; return m; };
    f.skinDecals.num.material = mk(); f.skinDecals.word.material = mk();
    if (f.skinDecals.btn) { const b = f.skinDecals.btn; b.material = mk(); b.material.map = buttonsTex(); b.visible = true; }
    f.decals = { num: f.skinDecals.num, word: f.skinDecals.word, skinned: true };
  }
  if (!f.decals) {
    const v = A.v3 && actor.formKey !== 'v2' ? A.v3.meta.variants[actor.formKey] : null;
    f.decals = { num: decal(actor, chest, 0.95, 0.95, false, v && v.chest), word: decal(actor, chest, 1.15, 0.3, true, v && v.chest) };
    f.decals.num.visible = f.decals.word.visible = false;
  }
  const was = actor.numMesh;
  actor.numMesh = f.decals.num; actor.wordMesh = f.decals.word;
  if (was && was !== f.decals.num) { actor.numKey = null; was.visible = false; } // setNumber redraws on the new form
}
function decal(actor, chest, w, h, front, d) {
  const m = new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshStandardMaterial({ transparent: true, roughness: 0.75, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 }));
  // the chest's rest orientation relative to the form's root (the actor may already be placed and turned)
  const root = actor.form.root; root.updateMatrixWorld(true);
  const qr = new T.Quaternion(), q = new T.Quaternion(); root.getWorldQuaternion(qr); chest.getWorldQuaternion(q);
  q.premultiply(qr.invert()).invert();
  const dir = new T.Vector3(0, 0, front ? 1 : -1).applyQuaternion(q).normalize(); // the model faces +Z at rest
  const up = new T.Vector3(0, 1, 0).applyQuaternion(q).normalize();
  const upBy = d ? (front ? d.upFront : d.upBack) : (front ? 0.3 : 0.32), out = d ? (front ? d.front : d.back) : (front ? 0.47 : 0.45);
  m.position.copy(up.multiplyScalar(upBy)).addScaledVector(dir, out);
  m.quaternion.setFromUnitVectors(new T.Vector3(0, 0, 1), dir);
  if (d && !front) m.geometry.scale(-1, 1, 1); // v3's chest bone is rolled differently: the back number would read mirrored
  chest.add(m);
  return m;
}
export function setNumber(actor, num, kit, team) {
  if (!actor.numMesh) return;
  actor.numArgs = [num, kit, team];
  actor.numMesh.visible = true;
  const key = `${num}|${kit.num}|${kit.trim}|${kit.jersey}|${team ? team.key : ''}|${actor.mirror ? 1 : 0}`;
  if (actor.numKey === key) return;
  actor.numKey = key;
  actor.numMesh.material.map = decalTex(`n|${num}|${kit.num}|${kit.trim}`, 128, 128, (x) => {
    x.font = '900 92px "Arial Black", Impact, sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
    x.lineWidth = 8; x.strokeStyle = kit.trim || '#000'; x.strokeText(String(num), 64, 70); x.fillStyle = kit.num || '#000'; x.fillText(String(num), 64, 70);
  });
  const word = team ? String(team.club ? team.short : (team.short || team.name)).toUpperCase() : '';
  actor.wordMesh.visible = !!word;
  const font = (n) => `900 ${n}px Georgia, "Times New Roman", serif`;
  // sewn lettering: outlined in the jersey colour, so a letter crossing the placket piping (often the same colour) still reads
  if (word) actor.wordMesh.material.map = decalTex(`w|${word}|${kit.num}|${kit.jersey}`, 512, 128, (x, W, H) => {
    let fs = 88; x.font = font(fs);
    while (x.measureText(word).width > W - 40 && fs > 36) { fs -= 4; x.font = font(fs); }
    x.textAlign = 'center'; x.textBaseline = 'middle'; x.lineJoin = 'round';
    x.lineWidth = Math.round(fs * 0.1); x.strokeStyle = kit.jersey || '#FFF'; x.strokeText(word, W / 2, H / 2 + 4);
    x.fillStyle = kit.num || '#000'; x.fillText(word, W / 2, H / 2 + 4);
  });
  const skinned = actor.form.decals && actor.form.decals.skinned;
  for (const m of [actor.numMesh, actor.wordMesh]) {
    m.material.needsUpdate = true;
    if (!skinned) m.scale.x = actor.mirror ? -1 : 1;
    else if (m.material.map) m.material.map = forSkin(m.material.map, actor.mirror); // glTF UVs; a mirrored rig draws the text mirrored
  }
}
// A decal texture for the skinned decals (cached): glTF UVs want flipY off; on a mirrored (left-handed) rig the text
// is also drawn left-right flipped, which the mirrored geometry turns back round.
const skinCache = new Map();
function forSkin(t, mirror) {
  const k = `${t.uuid}|${mirror ? 1 : 0}`;
  if (!skinCache.has(k)) {
    const f = t.clone(); f.flipY = false;
    if (mirror) { f.wrapS = T.RepeatWrapping; f.repeat.x = -1; f.offset.x = 1; }
    f.needsUpdate = true; skinCache.set(k, f);
  }
  return skinCache.get(k);
}

// World position of a bone (three coords).
export function boneWorld(actor, name, out) { const b = actor.bones[bn(name)]; out = out || new T.Vector3(); if (b) b.getWorldPosition(out); return out; }
export { A as ACTORS };
