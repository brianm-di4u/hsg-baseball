// Ballplayers in 3D: one Blender-made skinned mesh (art-src/blender/player.py) cloned per actor, team
// colors through a palette shader (region id in the vertex color), accessories shown or hidden by
// scaling their bones, and poses driven from game time (not wall-clock), so any frame is reproducible.
let T = null;
const A = { proto: null, clips: {}, ready: false };
export const ACC = ['cap', 'helmet', 'mask', 'gear', 'shinguard.L', 'shinguard.R', 'glove', 'bat'];
// region ids (must match art-src/blender/player.py REG)
const RG = { jersey: 0, pants: 1, sock: 2, skin: 3, cap: 4, helmet: 5, shoe: 6, belt: 7, under: 8, glove: 9, bat: 10, dark: 11, gear: 12, white: 13, hair: 14, trim: 15 };

export function setThree(t) { T = t; }
function b64ToBuf(b64) {
  const s = atob(b64), u = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i);
  return u.buffer;
}
export function loadActors() {
  return new Promise((res, rej) => {
    const src = window.DS_MODELS && window.DS_MODELS.player;
    if (!src) { rej(new Error('player model missing')); return; }
    new T.GLTFLoader().parse(b64ToBuf(src), '', (gltf) => {
      A.proto = gltf.scene;
      for (const c of gltf.animations) A.clips[c.name] = c;
      A.ready = true; res(A);
    }, rej);
  });
}

// Palette material: MeshStandardMaterial whose diffuse comes from uPal[region].
function paletteMaterial() {
  const m = new T.MeshStandardMaterial({ vertexColors: true, roughness: 0.72, metalness: 0 });
  const pal = Array.from({ length: 16 }, () => new T.Vector4(1, 1, 1, 0.7));
  const vis = new Array(16).fill(1);
  m.userData.pal = pal; m.userData.vis = vis;
  m.onBeforeCompile = (sh) => {
    sh.uniforms.uPal = { value: pal }; sh.uniforms.uVis = { value: vis };
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', '#include <common>\nuniform vec4 uPal[16]; uniform float uVis[16];')
      .replace('#include <color_fragment>', 'int rid = int(clamp(vColor.r * 16.0, 0.0, 15.0)); vec4 pc = uPal[rid]; if (uVis[rid] < 0.5) discard; diffuseColor.rgb = pc.rgb;')
      .replace('#include <roughnessmap_fragment>', '#include <roughnessmap_fragment>\nroughnessFactor = pc.a;');
  };
  m.customProgramCacheKey = () => 'ds-palette';
  return m;
}
const lin = (hex) => new T.Color(hex);
function setPal(mat, region, hex, rough = 0.72) { const c = lin(hex); mat.userData.pal[region].set(c.r, c.g, c.b, rough); }

export const SKINS = ['#F1C9A5', '#E0AC83', '#C68B62', '#8D5A3C', '#5E3B26'];
// kit: {jersey, trim, pants, cap, sock, num}; o: {skin, hair, umpire, gear}
export function dress(actor, kit, o = {}) {
  const m = actor.mat;
  const dk = `${kit.jersey}|${kit.pants}|${kit.sock}|${kit.cap}|${kit.trim}|${o.skin}|${o.umpire ? 1 : 0}`;
  showRegions(actor, null); actor.mesh.castShadow = true;
  if (actor.dressKey === dk) return; // palette unchanged since last frame
  actor.dressKey = dk;
  setPal(m, RG.jersey, kit.jersey, kit.wool ? 0.9 : 0.68); setPal(m, RG.pants, kit.pants, kit.wool ? 0.9 : 0.7);
  setPal(m, RG.sock, kit.sock); setPal(m, RG.cap, kit.cap, 0.8); setPal(m, RG.helmet, kit.cap, 0.28);
  setPal(m, RG.under, o.umpire ? kit.jersey : kit.trim, 0.8); setPal(m, RG.trim, kit.trim);
  setPal(m, RG.skin, o.skin || '#C68B62', 0.6); setPal(m, RG.shoe, o.umpire ? '#111111' : '#16161A', 0.45); setPal(m, RG.belt, o.umpire ? '#111111' : '#1E1E22', 0.5);
  setPal(m, RG.glove, '#8A5528', 0.55); setPal(m, RG.white, '#F3F0E8', 0.45); setPal(m, RG.bat, '#D6B07A', 0.45); setPal(m, RG.dark, '#18181C', 0.5);
  setPal(m, RG.gear, o.umpire ? '#202124' : kit.cap, 0.4); setPal(m, RG.hair, o.hair || '#2A1D14', 0.85);
  actor.kit = kit;
  showRegions(actor, null);
  actor.mesh.castShadow = true;
}

export function makeActor(scene) {
  const root = T.cloneSkinned(A.proto);
  const mat = paletteMaterial();
  let mesh = null;
  root.traverse((o) => { if (o.isSkinnedMesh) { o.material = mat; o.castShadow = true; o.receiveShadow = true; o.frustumCulled = false; mesh = o; } });
  const bones = {};
  root.traverse((o) => { if (o.isBone) bones[o.name] = o; });
  const wrap = new T.Group(); wrap.add(root);
  const mixer = new T.AnimationMixer(root);
  const acts = {};
  for (const [n, c] of Object.entries(A.clips)) { const a = mixer.clipAction(c); a.play(); a.enabled = false; a.setEffectiveWeight(0); acts[n] = a; }
  scene.add(wrap);
  const actor = { wrap, root, mesh, mat, bones, mixer, acts, show: new Set(), mirror: false, numTex: null };
  setAcc(actor, ['cap', 'glove']);
  if (bones.chest) { actor.numMesh = decal(actor, 0.95, 0.95, false); actor.wordMesh = decal(actor, 1.15, 0.3, true); actor.numMesh.visible = actor.wordMesh.visible = false; } // rest pose: measure once
  return actor;
}
// Bones are named as in Blender ('upperarm.L' becomes 'upperarmL' in three.js).
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
  for (const n of ACC) { const b = actor.bones[bn(n)]; if (b) { const s = actor.show.has(n) ? 1 : 0.0001; b.scale.set(s, s, s); } }
}
const LOOPS = new Set(['idle', 'ready', 'bat_stance', 'bat_bunt', 'crouch', 'ump', 'run', 'cheer']);
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
  actor.mirror = mirror;
  if (actor.numMesh) actor.numMesh.scale.x = actor.wordMesh.scale.x = mirror ? -1 : 1; // decals read the right way round
}

// Jersey decals: the number on the back and the school (or club) name across the front, two small planes
// on the chest bone. Their bone-local directions are measured once in the rest pose.
const decalCache = new Map();
function decalTex(key, w, h, draw) {
  if (!decalCache.has(key)) {
    const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h);
    const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; t.anisotropy = 4; decalCache.set(key, t);
  }
  return decalCache.get(key);
}
function decal(actor, w, h, front) {
  const chest = actor.bones.chest;
  const m = new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshStandardMaterial({ transparent: true, roughness: 0.75, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 }));
  actor.wrap.updateMatrixWorld(true);
  const q = new T.Quaternion(); chest.getWorldQuaternion(q);
  const dir = new T.Vector3(0, 0, front ? 1 : -1).applyQuaternion(q.invert()).normalize(); // the model faces +Z at rest
  const up = new T.Vector3(0, 1, 0);
  m.position.copy(up.multiplyScalar(front ? 0.3 : 0.32)).addScaledVector(dir, front ? 0.47 : 0.45);
  m.quaternion.setFromUnitVectors(new T.Vector3(0, 0, 1), dir);
  chest.add(m);
  return m;
}
export function setNumber(actor, num, kit, team) {
  if (!actor.bones.chest) return;
  if (!actor.numMesh) return;
  actor.numMesh.visible = true;
  const key = `${num}|${kit.num}|${kit.trim}|${team ? team.key : ''}|${actor.mirror ? 1 : 0}`;
  if (actor.numKey === key) return;
  actor.numKey = key;
  actor.numMesh.material.map = decalTex(`n|${num}|${kit.num}|${kit.trim}`, 128, 128, (x) => {
    x.font = '900 92px "Arial Black", Impact, sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
    x.lineWidth = 8; x.strokeStyle = kit.trim || '#000'; x.strokeText(String(num), 64, 70); x.fillStyle = kit.num || '#000'; x.fillText(String(num), 64, 70);
  });
  const word = team ? String(team.club ? team.short : (team.short || team.name)).toUpperCase() : '';
  actor.wordMesh.visible = !!word;
  const font = (n) => `900 ${n}px Georgia, "Times New Roman", serif`;
  if (word) actor.wordMesh.material.map = decalTex(`w|${word}|${kit.num}`, 256, 64, (x, W, H) => {
    let fs = 44; x.font = font(fs);
    while (x.measureText(word).width > W - 12 && fs > 18) { fs -= 2; x.font = font(fs); }
    x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = kit.num || '#000'; x.fillText(word, W / 2, H / 2 + 2);
  });
  for (const m of [actor.numMesh, actor.wordMesh]) { m.material.needsUpdate = true; m.scale.x = actor.mirror ? -1 : 1; }
}

// World position of a bone (three coords).
const tmp = { v: null };
export function boneWorld(actor, name, out) { const b = actor.bones[bn(name)]; out = out || new T.Vector3(); if (b) b.getWorldPosition(out); return out; }
export { A as ACTORS };
