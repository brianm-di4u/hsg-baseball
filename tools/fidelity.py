# Character fidelity metrics (VISUAL-PLAN-3.md, phase 4), headless Blender. Run through tools/fidelity.mjs.
#
#   blender -b art-src/blender/players/out/body-<build>.blend --python tools/fidelity.py -- --out reviews/loop-N/fidelity.json
#       [--ref art-src/samples/reference-renders/mpfb2_athlete] [--heights 360,140,60]
#
# 1. Shape against the reference: LOD0 in its bind pose, accessories removed, framed exactly like the reference
#    turnarounds (feet on the ground, 1.12 × height, 30° vertical FOV). Silhouette IoU of the front and side masks
#    against the reference's masks (the uniform's ease makes 1.0 unreachable; the trend is what counts).
# 2. Detail levels at game sizes: each LOD rendered three-quarter at the on-screen heights the game uses (duel
#    batter ≈ 360 px, broadcast ≈ 140 px, wide ≈ 60 px), compared with LOD0 rendered 4× larger and box-filtered:
#    the share of the player's pixels off by more than 12/255 in any channel. LOD0's own number is the aliasing floor.
import bmesh, bpy, json, math, os, sys
import numpy as np
from mathutils import Vector

argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
opt = lambda k, d: next((argv[i + 1] for i, a in enumerate(argv) if a == f'--{k}'), d)
OUT = os.path.abspath(opt('out', 'fidelity.json'))
REF = os.path.abspath(opt('ref', os.path.join(os.path.dirname(bpy.data.filepath), '..', '..', '..', 'samples', 'reference-renders', 'mpfb2_athlete')))
HEIGHTS = [int(x) for x in opt('heights', '360,140,60').split(',')]
TMP = os.path.join(os.path.dirname(OUT), '_fidelity'); os.makedirs(TMP, exist_ok=True)
ACC = {'cap', 'helmet', 'mask', 'gear', 'shinguard_l', 'shinguard_r', 'glove', 'bat'}

sc = bpy.context.scene
rig = bpy.data.objects['Rig']
rig.data.pose_position = 'REST'
for o in bpy.data.objects:
    for m in o.modifiers:
        if m.type == 'ARMATURE': m.use_deform_preserve_volume = False
lods = sorted([o for o in bpy.data.objects if o.name.startswith('LOD')], key=lambda o: o.name)
# drop the accessories (rigid parts weighted to their own bones)
for o in lods:
    names = {g.index: g.name for g in o.vertex_groups}
    bm = bmesh.new(); bm.from_mesh(o.data); dl = bm.verts.layers.deform.active
    gone = [v for v in bm.verts if any(names.get(i) in ACC and w > 0.5 for i, w in v[dl].items())]
    bmesh.ops.delete(bm, geom=gone, context='VERTS'); bm.to_mesh(o.data); bm.free()
# region palette (a home uniform), as in art-src/blender/players/preview_players.py
PAL = {0: (0.95, 0.94, 0.9), 1: (0.95, 0.94, 0.9), 2: (0.45, 0.08, 0.06), 3: (0.78, 0.55, 0.42), 4: (0.45, 0.08, 0.06), 5: (0.45, 0.08, 0.06),
       6: (0.05, 0.05, 0.06), 7: (0.07, 0.07, 0.08), 8: (0.45, 0.08, 0.06), 9: (0.5, 0.3, 0.13), 10: (0.82, 0.68, 0.45), 11: (0.06, 0.06, 0.07),
       12: (0.45, 0.08, 0.06), 13: (0.95, 0.95, 0.95), 14: (0.15, 0.1, 0.07), 15: (0.45, 0.08, 0.06)}
for o in lods:
    col = o.data.color_attributes['region']
    show = o.data.color_attributes.new('show', 'BYTE_COLOR', 'CORNER')
    for i, d in enumerate(col.data): show.data[i].color = (*PAL.get(int(d.color[0] * 16), (1, 0, 1)), 1)
    o.data.color_attributes.active_color = show

sc.render.engine = 'BLENDER_WORKBENCH'
sc.display.shading.light = 'STUDIO'; sc.display.shading.color_type = 'VERTEX'
sc.render.film_transparent = True
sc.render.image_settings.file_format = 'PNG'; sc.render.image_settings.color_mode = 'RGBA'
cam = bpy.data.objects.new('fcam', bpy.data.cameras.new('fcam')); sc.collection.objects.link(cam); sc.camera = cam
cam.data.sensor_fit = 'VERTICAL'; cam.data.angle = math.radians(30)

dg = bpy.context.evaluated_depsgraph_get()
pts = [o.matrix_world @ v.co for v in lods[0].evaluated_get(dg).to_mesh().vertices]
H = max(p.z for p in pts) - min(p.z for p in pts); z0 = min(p.z for p in pts)
cx = (max(p.x for p in pts) + min(p.x for p in pts)) / 2; cy = (max(p.y for p in pts) + min(p.y for p in pts)) / 2

def frame(yaw_deg, frame_h, cz):
    d = (frame_h / 2) / math.tan(math.radians(15))
    a = math.radians(yaw_deg)
    t = Vector((cx, cy, cz))
    cam.location = t + Vector((math.sin(a) * d, -math.cos(a) * d, 0))
    cam.rotation_euler = (t - cam.location).to_track_quat('-Z', 'Y').to_euler()

def render(o, w, h, name):
    for x in lods: x.hide_render = x is not o
    sc.render.resolution_x, sc.render.resolution_y = w, h
    sc.render.filepath = os.path.join(TMP, name + '.png'); bpy.ops.render.render(write_still=True)
    im = bpy.data.images.load(sc.render.filepath); a = np.array(im.pixels[:], dtype=np.float32).reshape(h, w, 4)[::-1]
    bpy.data.images.remove(im); return a

def load_mask(path):
    im = bpy.data.images.load(path); w, h = im.size
    a = np.array(im.pixels[:], dtype=np.float32).reshape(h, w, 4)[::-1]; bpy.data.images.remove(im)
    return a[..., 3] > 0.5 if a[..., 3].min() < 0.99 else a[..., 0] > 0.5

rows = []
# 1. shape against the reference
ref_ok = os.path.exists(REF + '_front_mask.png')
shape = {}
if ref_ok:
    sc.display.render_aa = '8'
    for view, yaw in (('front', 0), ('side', 90)):
        frame(yaw, 1.12 * H, z0 + H / 2)
        a = render(lods[0], 1024, 1024, f'shape-{view}')
        m = a[..., 3] > 0.5; r = load_mask(f'{REF}_{view}_mask.png')
        if r.shape != m.shape: r = r[:m.shape[0], :m.shape[1]]
        shape[view] = float((m & r).sum() / max(1, (m | r).sum()))
        rows.append({'model': f'LOD0 vs reference ({view})', 'distance': 'turnaround', 'px': 1024, 'iou': shape[view], 'err': float((m ^ r).sum() / max(1, (m | r).sum()) * 100)})

# 2. detail levels at game sizes
def down(a, k):
    h, w = a.shape[0] // k, a.shape[1] // k
    return a[:h * k, :w * k].reshape(h, k, w, k, 4).mean(axis=(1, 3))
for px in HEIGHTS:
    fh = 1.12 * H; h = int(round(px * 1.12)); w = int(round(h * 0.6))
    frame(40, fh, z0 + H / 2)
    sc.display.render_aa = '8'
    truth = down(render(lods[0], w * 4, h * 4, f'truth-{px}'), 4)
    tm = truth[..., 3] > 0.5
    for i, o in enumerate(lods):
        a = render(o, w, h, f'L{i}-{px}')
        m = a[..., 3] > 0.5; u = tm | m
        diff = np.abs(a[..., :3] * a[..., 3:4] - truth[..., :3] * truth[..., 3:4]).max(axis=2) > 12 / 255
        rows.append({'model': f'LOD{i}', 'distance': f'{px} px tall', 'px': px, 'iou': float((tm & m).sum() / max(1, u.sum())), 'err': float((diff & u).sum() / max(1, u.sum()) * 100)})

res = {'method': ('Silhouette IoU of LOD0 (bind pose, no accessories) against the reference turnaround masks; then each LOD at the '
                  'game\'s on-screen heights against LOD0 rendered 4× and box-filtered (pixel error = share of the player\'s pixels off '
                  'by > 12/255; LOD0\'s own row is the aliasing floor). Workbench, region palette, three-quarter view.'),
       'reference': os.path.basename(REF), 'height_ft': H, 'shape': shape, 'rows': rows}
with open(OUT, 'w', encoding='utf-8') as f: json.dump(res, f, indent=1)
print('FIDELITY', json.dumps(shape), [(r['model'], r['px'], round(r['err'], 1)) for r in rows])
