# Diamond Springs ballplayer: one rigged, animated mesh shared by every player, umpire and runner.
#
#   "C:\Program Files\Blender Foundation\Blender 5.2\blender.exe" -b --python games/baseball/art-src/blender/player.py
#
# Builds art-src/blender/player.blend and exports art-src/blender/player.glb (packed into
# assets/models.js by tools/pack-models.mjs). Units are feet (the game's world unit); the character
# faces -Y, +X is the character's left. Every part is one mesh with a per-face "region" id in the
# color attribute (R = (id + 0.5) / 16); the game maps ids to team colors with a palette shader.
# Accessories (cap, helmet, bat, glove, catcher gear) hang off their own bones, so the game hides
# one by scaling its bone to zero (it vanishes from shadows too).
import bpy, bmesh, math, os
from mathutils import Vector, Quaternion, Euler, Matrix

HERE = os.path.dirname(os.path.abspath(__file__))
REG = dict(jersey=0, pants=1, sock=2, skin=3, cap=4, helmet=5, shoe=6, belt=7, under=8, glove=9, bat=10, dark=11, gear=12, white=13, hair=14, trim=15)

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
scene.render.fps = 30

# ------------------------------------------------------------------ armature
BONES = [  # name, head, tail, parent
    ('root', (0, 0, 0), (0, 0.6, 0), None),
    ('hips', (0, 0, 3.2), (0, 0, 3.7), 'root'),
    ('spine', (0, 0, 3.7), (0, 0, 4.3), 'hips'),
    ('chest', (0, 0, 4.3), (0, 0, 4.95), 'spine'),
    ('neck', (0, 0, 4.95), (0, 0, 5.25), 'chest'),
    ('head', (0, 0, 5.25), (0, 0, 6.05), 'neck'),
    ('upperarm.L', (0.74, 0, 4.78), (0.95, 0.02, 3.98), 'chest'),
    ('forearm.L', (0.95, 0.02, 3.98), (1.05, -0.06, 3.2), 'upperarm.L'),
    ('hand.L', (1.05, -0.06, 3.2), (1.08, -0.1, 2.86), 'forearm.L'),
    ('thigh.L', (0.34, 0, 3.15), (0.37, 0.02, 1.75), 'hips'),
    ('shin.L', (0.37, 0.02, 1.75), (0.39, 0.06, 0.34), 'thigh.L'),
    ('foot.L', (0.39, 0.06, 0.34), (0.4, -0.46, 0.1), 'shin.L'),
    ('cap', (0, 0.02, 5.95), (0, 0.02, 6.25), 'head'),
    ('helmet', (0, 0.04, 5.95), (0, 0.04, 6.25), 'head'),
    ('mask', (0, -0.42, 5.6), (0, -0.62, 5.6), 'head'),
    ('gear', (0, -0.42, 4.4), (0, -0.62, 4.4), 'chest'),
    ('shinguard.L', (0.38, -0.1, 1.5), (0.39, -0.1, 0.6), 'shin.L'),
    ('shinguard.R', (-0.38, -0.1, 1.5), (-0.39, -0.1, 0.6), 'shin.R'),
    ('glove', (1.09, -0.12, 2.95), (1.12, -0.12, 2.6), 'hand.L'),
    ('bat', (-1.09, -0.12, 3.0), (-1.09, -0.6, 3.0), 'hand.R'),
]
def mirror(b):
    n, h, t, p = b
    f = lambda v: (-v[0], v[1], v[2])
    return (n.replace('.L', '.R'), f(h), f(t), p.replace('.L', '.R') if p else p)
BONES = BONES[:9] + [mirror(b) for b in BONES[6:9]] + BONES[9:12] + [mirror(b) for b in BONES[9:12]] + BONES[12:]

arm_data = bpy.data.armatures.new('Rig')
rig = bpy.data.objects.new('Rig', arm_data)
scene.collection.objects.link(rig)
bpy.context.view_layer.objects.active = rig
bpy.ops.object.mode_set(mode='EDIT')
for n, h, t, p in BONES:
    eb = arm_data.edit_bones.new(n)
    eb.head, eb.tail = Vector(h), Vector(t)
    eb.roll = 0
    if p: eb.parent = arm_data.edit_bones[p]
    if n in ('hips',) or (p and n not in ('cap', 'helmet', 'mask', 'gear', 'glove', 'bat', 'shinguard.L', 'shinguard.R')):
        eb.use_connect = False
bpy.ops.object.mode_set(mode='OBJECT')

# ------------------------------------------------------------------ body (skin modifier)
def skin_body():
    V = [  # position, radius (x, y)
        ((0, 0, 3.28), (0.56, 0.42)),   # 0 pelvis
        ((0, 0, 3.78), (0.5, 0.38)),    # 1 waist
        ((0, 0, 4.32), (0.6, 0.42)),    # 2 chest
        ((0, 0, 4.78), (0.66, 0.42)),   # 3 shoulders line
        ((0, 0, 5.05), (0.21, 0.21)),   # 4 neck base
        ((0, 0.02, 5.32), (0.19, 0.19)),# 5 neck top
        ((0.74, 0, 4.78), (0.23, 0.23)),# 6 shoulder L
        ((0.95, 0.02, 3.98), (0.17, 0.17)), # 7 elbow L
        ((1.05, -0.06, 3.2), (0.13, 0.12)), # 8 wrist L
        ((1.08, -0.1, 2.9), (0.14, 0.09)),  # 9 hand L
        ((0.34, 0, 3.12), (0.33, 0.33)),    # 10 hip L
        ((0.37, 0.02, 1.75), (0.26, 0.26)), # 11 knee L
        ((0.39, 0.06, 0.36), (0.15, 0.16)), # 12 ankle L
        ((0.4, -0.42, 0.12), (0.14, 0.1)),  # 13 toe L
    ]
    E = [(0, 1), (1, 2), (2, 3), (3, 4), (4, 5), (3, 6), (6, 7), (7, 8), (8, 9), (0, 10), (10, 11), (11, 12), (12, 13)]
    n0 = len(V)
    for i in range(6, 14):
        (x, y, z), r = V[i]
        V.append(((-x, y, z), r))
    mp = {i: n0 + (i - 6) for i in range(6, 14)}
    for a, b in E[5:]:
        E.append((mp.get(a, a), mp.get(b, b)))
    me = bpy.data.meshes.new('Body')
    me.from_pydata([v[0] for v in V], E, [])
    ob = bpy.data.objects.new('Body', me)
    scene.collection.objects.link(ob)
    sk = ob.modifiers.new('Skin', 'SKIN')
    sk.use_smooth_shade = True
    for i, (p, r) in enumerate(V):
        me.skin_vertices[0].data[i].radius = r
    me.skin_vertices[0].data[0].use_root = True
    sub = ob.modifiers.new('Sub', 'SUBSURF'); sub.levels = 2; sub.render_levels = 2
    bpy.context.view_layer.objects.active = ob
    bpy.ops.object.modifier_apply(modifier='Skin')
    bpy.ops.object.modifier_apply(modifier='Sub')
    return ob

def region_body(c):
    x, y, z = c
    ax = abs(x)
    if z < 0.44: return REG['shoe']
    if z < 1.3: return REG['sock']
    if (ax > 0.78 and z < 4.9) or (ax > 0.62 and 3.9 < z < 4.9):  # arms (not the outer thigh)
        if z < 3.22: return REG['skin']
        if z < 4.2: return REG['under']
        return REG['jersey']
    if z < 3.08: return REG['pants']
    if z < 3.3: return REG['pants']  # the belt is its own ring (build_parts)
    if z > 5.02: return REG['skin']
    return REG['jersey']

# ------------------------------------------------------------------ parts (bmesh helpers)
def new_obj(name, bm):
    me = bpy.data.meshes.new(name); bm.to_mesh(me); bm.free()
    ob = bpy.data.objects.new(name, me); scene.collection.objects.link(ob)
    return ob

def uv_sphere(bm, center, radii, segs=20, rings=12, region=0, zmin=None, zmax=None, tag=None):
    r = bmesh.ops.create_uvsphere(bm, u_segments=segs, v_segments=rings, radius=1.0)
    verts = r['verts']
    for v in verts:
        v.co = Vector((v.co.x * radii[0], v.co.y * radii[1], v.co.z * radii[2])) + Vector(center)
    return verts

def mark(bm, verts, region):
    vs = set(verts)
    for f in bm.faces:
        if all(v in vs for v in f.verts): f[bm.faces.layers.int['region']] = region

def build_parts():
    out = {}
    # head: egg, ears, nose, eyes, brows, hair band
    bm = bmesh.new(); bm.faces.layers.int.new('region')
    head = uv_sphere(bm, (0, 0.02, 5.62), (0.4, 0.43, 0.47), 24, 16); mark(bm, head, REG['skin'])
    for s in (-1, 1):
        ear = uv_sphere(bm, (s * 0.39, 0.06, 5.6), (0.07, 0.11, 0.14), 10, 6); mark(bm, ear, REG['skin'])
        sclera = uv_sphere(bm, (s * 0.14, -0.362, 5.67), (0.075, 0.035, 0.066), 12, 8); mark(bm, sclera, REG['white'])
        pupil = uv_sphere(bm, (s * 0.135, -0.392, 5.664), (0.04, 0.018, 0.046), 10, 6); mark(bm, pupil, REG['dark'])
        brow = uv_sphere(bm, (s * 0.15, -0.382, 5.775), (0.1, 0.03, 0.026), 8, 4); mark(bm, brow, REG['hair'])
    nose = uv_sphere(bm, (0, -0.43, 5.55), (0.07, 0.08, 0.09), 10, 6); mark(bm, nose, REG['skin'])
    mouth = uv_sphere(bm, (0, -0.372, 5.41), (0.085, 0.02, 0.018), 10, 4); mark(bm, mouth, REG['dark'])
    hair = uv_sphere(bm, (0, 0.09, 5.6), (0.41, 0.38, 0.42), 20, 12)
    bmesh.ops.delete(bm, geom=[v for v in hair if v.co.z > 5.86 or v.co.y < -0.02 or v.co.z < 5.5], context='VERTS')
    mark(bm, [v for v in hair if v.is_valid], REG['hair'])
    out['Head'] = (new_obj('Head', bm), {'head': 1.0})
    # ball cap: crown half-dome + brim
    bm = bmesh.new(); bm.faces.layers.int.new('region')
    crown = uv_sphere(bm, (0, 0.03, 5.72), (0.445, 0.465, 0.46), 24, 14)
    bmesh.ops.delete(bm, geom=[v for v in crown if v.co.z < 5.73], context='VERTS')
    mark(bm, bm.verts, REG['cap'])
    br = bmesh.ops.create_circle(bm, cap_ends=True, segments=20, radius=1.0)['verts']
    for v in br: v.co = Vector((v.co.x * 0.38, -0.44 + v.co.y * 0.38, 5.76 - 0.07 * max(0, -v.co.y)))
    bmesh.ops.delete(bm, geom=[v for v in br if v.co.y > -0.4], context='VERTS')
    bmesh.ops.solidify(bm, geom=[f for f in bm.faces if all(v in set(br) for v in f.verts)], thickness=0.03)
    mark(bm, [v for v in bm.verts if v.co.y < -0.4 and v.co.z < 5.85], REG['cap'])
    btn = uv_sphere(bm, (0, 0.03, 6.17), (0.05, 0.05, 0.03), 8, 4); mark(bm, btn, REG['trim'])
    out['Cap'] = (new_obj('Cap', bm), {'cap': 1.0})
    # batting helmet: bigger glossy dome, ear flap on the pitcher side (+X), short brim
    bm = bmesh.new(); bm.faces.layers.int.new('region')
    dome = uv_sphere(bm, (0, 0.04, 5.66), (0.5, 0.53, 0.5), 24, 16)
    bmesh.ops.delete(bm, geom=[v for v in dome if (v.co.z < 5.5 and not (v.co.x > 0.2 and v.co.z > 5.32 and v.co.y > -0.15)) or (v.co.y < -0.3 and v.co.z < 5.72)], context='VERTS')
    mark(bm, bm.verts, REG['helmet'])
    br = bmesh.ops.create_circle(bm, cap_ends=True, segments=16, radius=1.0)['verts']
    for v in br: v.co = Vector((v.co.x * 0.34, -0.47 + v.co.y * 0.2, 5.72))
    bmesh.ops.delete(bm, geom=[v for v in br if v.co.y > -0.44], context='VERTS')
    mark(bm, [v for v in bm.verts if v.co.y < -0.44], REG['helmet'])
    out['Helmet'] = (new_obj('Helmet', bm), {'helmet': 1.0})
    # catcher's mask: cage of bars in front of the face + dark padding band
    bm = bmesh.new(); bm.faces.layers.int.new('region')
    for zz in (5.42, 5.56, 5.7):
        b = bmesh.ops.create_cone(bm, cap_ends=True, segments=6, radius1=0.025, radius2=0.025, depth=0.62)['verts']
        for v in b: v.co = Matrix.Rotation(math.pi / 2, 3, 'Y') @ v.co + Vector((0, -0.5, zz))
        mark(bm, b, REG['dark'])
    for xx in (-0.16, 0.0, 0.16):
        b = bmesh.ops.create_cone(bm, cap_ends=True, segments=6, radius1=0.025, radius2=0.025, depth=0.5)['verts']
        for v in b: v.co = v.co + Vector((xx, -0.5, 5.6))
        mark(bm, b, REG['dark'])
    pad = uv_sphere(bm, (0, -0.2, 5.62), (0.45, 0.3, 0.38), 16, 10)
    bmesh.ops.delete(bm, geom=[v for v in pad if v.co.y > -0.15], context='VERTS')
    mark(bm, bm.verts[-0:] if False else [v for v in bm.verts if v.co.y > -0.46 and v.co.y < -0.14], REG['gear'])
    out['Mask'] = (new_obj('Mask', bm), {'mask': 1.0})
    # chest protector
    bm = bmesh.new(); bm.faces.layers.int.new('region')
    cp = uv_sphere(bm, (0, -0.18, 4.15), (0.6, 0.32, 0.85), 16, 12)
    bmesh.ops.delete(bm, geom=[v for v in cp if v.co.y > -0.12 or v.co.z > 4.95], context='VERTS')
    mark(bm, bm.verts, REG['gear'])
    out['Gear'] = (new_obj('Gear', bm), {'gear': 1.0})
    # shin guards (both legs), weighted to the shins so they bend with the knees
    bm = bmesh.new(); bm.faces.layers.int.new('region')
    for s in (-1, 1):
        g = uv_sphere(bm, (s * 0.38, -0.08, 1.05), (0.24, 0.2, 0.62), 12, 8)
        bmesh.ops.delete(bm, geom=[v for v in g if v.co.y > 0.02], context='VERTS')
    mark(bm, bm.verts, REG['gear'])
    out['Shins'] = (new_obj('Shins', bm), 'shins')
    # glove on the left hand: a fat padded mitt with a thumb and webbing
    bm = bmesh.new(); bm.faces.layers.int.new('region')
    g1 = uv_sphere(bm, (1.12, -0.16, 2.78), (0.12, 0.3, 0.36), 14, 10); mark(bm, g1, REG['glove'])
    th = uv_sphere(bm, (1.12, -0.36, 2.98), (0.09, 0.12, 0.2), 10, 6); mark(bm, th, REG['glove'])
    web = uv_sphere(bm, (1.1, -0.36, 2.62), (0.05, 0.12, 0.14), 8, 6); mark(bm, web, REG['glove'])
    out['Glove'] = (new_obj('Glove', bm), {'glove': 1.0})
    # bat in the right hand: lathe profile along -Y from the knob
    bm = bmesh.new(); bm.faces.layers.int.new('region')
    prof = [(-0.34, 0.065), (-0.31, 0.065), (-0.28, 0.035), (0.6, 0.04), (1.2, 0.06), (1.8, 0.105), (2.28, 0.115), (2.42, 0.11), (2.44, 0.0)]  # knob 0.3 ft below the top hand
    rings = []
    for d, r in prof:
        ring = []
        for k in range(12):
            a = k / 12 * math.tau
            ring.append(bm.verts.new((-1.09 + r * math.cos(a), -0.02 - d, 3.0 + r * math.sin(a))))
        rings.append(ring)
    for i in range(len(rings) - 1):
        for k in range(12):
            bm.faces.new((rings[i][k], rings[i][(k + 1) % 12], rings[i + 1][(k + 1) % 12], rings[i + 1][k]))
    bm.faces.new(list(reversed(rings[0])))
    for f in bm.faces: f[bm.faces.layers.int['region']] = REG['bat']
    for f in bm.faces:
        if all(v.co.y > -0.62 for v in f.verts): f[bm.faces.layers.int['region']] = REG['dark']  # taped handle
    out['Bat'] = (new_obj('Bat', bm), {'bat': 1.0})
    # thumbs and knuckles, so a hand reads as a hand rather than a mitten
    for side, bone in ((1, 'hand.L'), (-1, 'hand.R')):
        bm = bmesh.new(); bm.faces.layers.int.new('region')
        th = uv_sphere(bm, (side * 1.0, -0.2, 3.02), (0.05, 0.06, 0.1), 10, 6)
        kn = uv_sphere(bm, (side * 1.09, -0.14, 2.9), (0.1, 0.09, 0.06), 10, 6)
        mark(bm, bm.verts, REG['skin'])
        out['Thumb' + bone[-1]] = (new_obj('Thumb' + bone[-1], bm), {bone: 1.0})
    # belt: an elliptical band around the waist, rigid to the hips (a clean edge instead of a region seam)
    bm = bmesh.new(); bm.faces.layers.int.new('region')
    r = bmesh.ops.create_cone(bm, cap_ends=False, segments=28, radius1=1.0, radius2=1.0, depth=0.16)['verts']
    for v in r: v.co = Vector((v.co.x * 0.585, v.co.y * 0.455, v.co.z + 3.2))
    mark(bm, bm.verts, REG['belt'])
    buckle = uv_sphere(bm, (0, -0.47, 3.2), (0.07, 0.03, 0.06), 8, 4); mark(bm, buckle, REG['trim'])
    out['Belt'] = (new_obj('Belt', bm), {'hips': 1.0})
    return out

# ------------------------------------------------------------------ weights
def seg_dist(p, a, b):
    ab = b - a; t = max(0.0, min(1.0, (p - a).dot(ab) / ab.length_squared))
    return (a + ab * t - p).length

DEFORM = ['hips', 'spine', 'chest', 'neck', 'head', 'upperarm.L', 'forearm.L', 'hand.L', 'upperarm.R', 'forearm.R', 'hand.R',
          'thigh.L', 'shin.L', 'foot.L', 'thigh.R', 'shin.R', 'foot.R']
def weight_body(ob):
    bones = {b.name: (b.head_local.copy(), b.tail_local.copy()) for b in arm_data.bones}
    for n in DEFORM: ob.vertex_groups.new(name=n)
    for v in ob.data.vertices:
        p = v.co
        cands = []
        for n in DEFORM:
            side = 1 if n.endswith('.L') else -1 if n.endswith('.R') else 0
            if side and p.x * side < -0.05: continue  # never weight across the midline
            if n.startswith(('upperarm', 'forearm', 'hand')) and (abs(p.x) < 0.5 or (abs(p.x) < 0.74 and p.z < 4.62)): continue
            if n.startswith(('forearm', 'hand')) and p.z > 4.3: continue
            if n.startswith(('thigh', 'shin', 'foot')) and p.z > 3.35: continue
            if n in ('spine', 'chest', 'neck', 'head', 'hips') and (abs(p.x) > 0.95 or (abs(p.x) > 0.76 and p.z < 4.5)): continue
            d = seg_dist(p, *bones[n])
            cands.append((d, n))
        cands.sort()
        top = cands[:3]
        ws = [1.0 / (d + 0.05) ** 4 for d, _ in top]
        s = sum(ws)
        for (d, n), w in zip(top, ws):
            if w / s > 0.02: ob.vertex_groups[n].add([v.index], w / s, 'REPLACE')

def finish(ob, regions_fn=None):
    me = ob.data
    if regions_fn is not None:
        bm = bmesh.new(); bm.from_mesh(me)
        lay = bm.faces.layers.int.get('region') or bm.faces.layers.int.new('region')
        for f in bm.faces: f[lay] = regions_fn(f.calc_center_median())
        bm.to_mesh(me); bm.free()
    attr = me.attributes.get('region')
    col = me.color_attributes.new('Col', 'BYTE_COLOR', 'CORNER')
    for poly in me.polygons:
        rid = attr.data[poly.index].value if attr else 0
        c = ((rid + 0.5) / 16, 0.0, 0.0, 1.0)
        for li in poly.loop_indices: col.data[li].color = c
    me.color_attributes.active_color = col
    for p in me.polygons: p.use_smooth = True

body = skin_body()
finish(body, region_body)
weight_body(body)
def smooth_weights(ob, passes=4, k=0.5):
    me = ob.data; nb = [[] for _ in me.vertices]
    for e in me.edges: a, b = e.vertices; nb[a].append(b); nb[b].append(a)
    G = len(ob.vertex_groups)
    W = [[0.0] * G for _ in me.vertices]
    for v in me.vertices:
        for g in v.groups: W[v.index][g.group] = g.weight
    for _ in range(passes):
        N = []
        for i, row in enumerate(W):
            avg = [sum(W[j][g] for j in nb[i]) / max(1, len(nb[i])) for g in range(G)]
            r = [row[g] * (1 - k) + avg[g] * k for g in range(G)]
            s = sum(r) or 1.0
            N.append([x / s for x in r])
        W = N
    for i, row in enumerate(W):
        for g, w in enumerate(row):
            if w > 0.01: ob.vertex_groups[g].add([i], w, 'REPLACE')
            else: ob.vertex_groups[g].remove([i])
smooth_weights(body)
parts = build_parts()
for name, (ob, w) in parts.items():
    finish(ob)
    if w == 'shins':
        for n in ('shinguard.L', 'shinguard.R'): ob.vertex_groups.new(name=n)
        for v in ob.data.vertices:
            ob.vertex_groups['shinguard.L' if v.co.x > 0 else 'shinguard.R'].add([v.index], 1.0, 'REPLACE')
    else:
        for bn, wt in w.items():
            vg = ob.vertex_groups.new(name=bn); vg.add([v.index for v in ob.data.vertices], wt, 'REPLACE')

# join every part into one mesh (one draw call per player)
bpy.ops.object.select_all(action='DESELECT')
for ob in [body] + [o for o, _ in parts.values()]: ob.select_set(True)
bpy.context.view_layer.objects.active = body
bpy.ops.object.join()
body.name = 'Player'; body.data.name = 'Player'
mat = bpy.data.materials.new('PlayerPalette')
body.data.materials.append(mat)
body.parent = rig
mod = body.modifiers.new('Rig', 'ARMATURE'); mod.object = rig

# ------------------------------------------------------------------ animation helpers
# Key poses are FK rotations (degrees, armature axes, applied in the parent's frame) plus optional IK
# goals in armature space: RH / LH hand positions and BAT, the bat's direction. Each clip is keyed,
# solved by Blender's IK and Damped Track constraints, then baked to plain FK keys for export.
rest_q = {b.name: b.matrix_local.to_quaternion() for b in arm_data.bones}
D = math.radians
def rot(e):
    return Euler((D(e[0]), D(e[1]), D(e[2])), 'XYZ').to_quaternion()

def make_empty(n):
    e = bpy.data.objects.new(n, None); scene.collection.objects.link(e); return e
GOAL = {k: make_empty('GOAL_' + k) for k in ('RH', 'LH', 'BAT')}
def add_con(bone, kind, target, **kw):
    c = rig.pose.bones[bone].constraints.new(kind); c.target = target
    for k, v in kw.items(): setattr(c, k, v)
    return c
CON = {
    'RH': add_con('forearm.R', 'IK', GOAL['RH'], chain_count=2, use_tail=True, iterations=200),
    'LH': add_con('forearm.L', 'IK', GOAL['LH'], chain_count=2, use_tail=True, iterations=200),
    'BAT': add_con('bat', 'DAMPED_TRACK', GOAL['BAT'], track_axis='TRACK_Y'),
}

def key_pose(frame, spec, loc=None, ik=None):
    for pb in rig.pose.bones:
        q = rest_q[pb.name].inverted() @ rot(spec.get(pb.name, (0, 0, 0))) @ rest_q[pb.name]
        pb.rotation_mode = 'QUATERNION'; pb.rotation_quaternion = q
        pb.keyframe_insert('rotation_quaternion', frame=frame)
    hb = rig.pose.bones['hips']
    hb.location = rest_q['hips'].inverted() @ Vector(loc or (0, 0, 0))
    hb.keyframe_insert('location', frame=frame)
    ik = dict(ik or {})
    if 'BAT' in ik and 'RH' in ik and 'LH' not in ik:  # bottom hand just below the top hand on the handle
        ik['LH'] = tuple(Vector(ik['RH']) - Vector(ik['BAT']).normalized() * 0.3)
    for k, c in CON.items():
        on = k in ik
        c.influence = 1.0 if on else 0.0
        c.keyframe_insert('influence', frame=frame)
        if on:
            p = Vector(ik[k])
            if k == 'BAT': p = Vector(ik['RH']) + p.normalized() * 2.5
            GOAL[k].location = p
        GOAL[k].keyframe_insert('location', frame=frame)

def clip(name, keys, loop=False):
    rig.animation_data_create()
    src = bpy.data.actions.new(name + '_src'); rig.animation_data.action = src
    for e in GOAL.values():
        e.animation_data_create(); e.animation_data.action = bpy.data.actions.new(name + '_' + e.name)
    for k in keys: key_pose(*k)
    f0, f1 = int(keys[0][0]), int(keys[-1][0])
    for o in bpy.context.view_layer.objects: o.select_set(o is rig)
    bpy.context.view_layer.objects.active = rig
    bpy.ops.object.mode_set(mode='POSE')
    for pb in rig.pose.bones: pb.select = True if hasattr(pb, 'select') else None
    bpy.ops.pose.select_all(action='SELECT')
    bpy.ops.nla.bake(frame_start=f0, frame_end=f1, step=1, only_selected=False, visual_keying=True, clear_constraints=False,
                     use_current_action=False, bake_types={'POSE'})
    bpy.ops.object.mode_set(mode='OBJECT')
    act = rig.animation_data.action
    act.name = name; act.use_fake_user = True
    # keep rotations (and the hips' location); scale and other locations stay at rest so the game can hide accessories
    bags = []
    try:
        bags = [act]; act.fcurves
    except AttributeError:
        bags = [cb for layer in act.layers for strip in layer.strips for cb in strip.channelbags]
    for cb in bags:
        for fc in list(cb.fcurves):
            p = fc.data_path
            if p.endswith('.scale') or (p.endswith('.location') and 'pose.bones["hips"]' not in p): cb.fcurves.remove(fc)
            elif any(f'pose.bones["{n}"]' in p for n in ('cap', 'helmet', 'mask', 'gear', 'shinguard.L', 'shinguard.R', 'glove', 'root')): cb.fcurves.remove(fc)
    if loop: act.use_cyclic = True
    tr = rig.animation_data.nla_tracks.new(); tr.name = name
    tr.strips.new(name, f0, act)
    rig.animation_data.action = None
    bpy.data.actions.remove(src)
    for e in GOAL.values():
        a = e.animation_data.action; e.animation_data.action = None; bpy.data.actions.remove(a)
    return act

def P(**kw):
    return {k.replace('_L', '.L').replace('_R', '.R'): v for k, v in kw.items()}
def lerp_pose(a, b, u):
    out = {}
    for k in set(a) | set(b):
        x, y = a.get(k, (0, 0, 0)), b.get(k, (0, 0, 0))
        out[k] = tuple(x[i] + (y[i] - x[i]) * u for i in range(3))
    return out
def lerp_v(a, b, u): return tuple(a[i] + (b[i] - a[i]) * u for i in range(3))

# Poses -----------------------------------------------------------------------------------------
# Axes: +X character's left, -Y forward (toward the plate for batters and pitchers), +Z up.
# X-rotation: negative swings a hanging limb forward. Z-rotation: positive turns toward the character's left.
STAND = P(upperarm_L=(0, -10, 0), upperarm_R=(0, 10, 0), forearm_L=(-12, 0, 0), forearm_R=(-12, 0, 0), thigh_L=(0, -3, 0), thigh_R=(0, 3, 0))
READY = P(hips=(16, 0, 0), spine=(18, 0, 0), chest=(8, 0, 0), head=(-34, 0, 0),
          thigh_L=(-50, -10, 0), shin_L=(70, 0, 0), foot_L=(-20, 0, 0), thigh_R=(-50, 10, 0), shin_R=(70, 0, 0), foot_R=(-20, 0, 0),
          upperarm_L=(-30, -6, 0), forearm_L=(-40, 0, 0), upperarm_R=(-30, 6, 0), forearm_R=(-40, 0, 0))
READY_IK = {'RH': (-0.6, -1.0, 2.5), 'LH': (0.6, -1.15, 2.6)}

# Batting, right-handed (the game mirrors lefties). Facing the plate (-Y); the pitcher is at +X.
LEGS_ST = P(thigh_L=(-16, -18, 0), shin_L=(30, 0, 0), foot_L=(-12, 0, 6), thigh_R=(-18, 16, 0), shin_R=(32, 0, 0), foot_R=(-12, 0, -8))
B_STANCE = dict(LEGS_ST, **P(hips=(8, 0, 4), spine=(8, 0, 2), chest=(0, 0, -8), neck=(0, 0, 44), head=(-8, 0, 36),
                             upperarm_R=(-30, 60, -30), forearm_R=(-90, 0, 0), upperarm_L=(-60, 20, -30), forearm_L=(-60, 0, 0)))
B_STANCE_IK = {'RH': (-0.55, -0.75, 4.85), 'BAT': (-0.45, 0.25, 0.86)}
B_LOAD = dict(B_STANCE, **P(hips=(8, 0, -8), chest=(0, 0, -18), thigh_L=(-26, -12, 0), shin_L=(40, 0, 0)))
B_LOAD_IK = {'RH': (-0.8, -0.45, 4.8), 'BAT': (-0.25, 0.55, 0.8)}
B_CONTACT = P(hips=(10, 0, 58), spine=(6, 0, 16), chest=(0, 0, 16), neck=(0, 0, -16), head=(14, 0, -20),
              thigh_L=(-30, -22, 0), shin_L=(10, 0, 0), foot_L=(-6, 0, 30), thigh_R=(-6, 30, 0), shin_R=(46, 0, 0), foot_R=(-34, 0, -20),
              upperarm_R=(-70, 20, 60), forearm_R=(-30, 0, 10), upperarm_L=(-80, -10, 50), forearm_L=(-10, 0, 0))
B_CONTACT_IK = {'RH': (0.35, -1.9, 3.95), 'BAT': (0.35, -0.93, -0.08)}
B_MID_IK = {'RH': (-0.35, -1.25, 4.25), 'BAT': (-0.85, -0.25, 0.45)}
B_FINISH = P(hips=(6, 0, 84), spine=(0, 0, 24), chest=(-6, 0, 28), neck=(0, 0, -28), head=(4, 0, -30),
             thigh_L=(-24, -18, 0), shin_L=(8, 0, 0), foot_L=(-4, 0, 40), thigh_R=(-2, 30, 0), shin_R=(54, 0, 0), foot_R=(-50, 0, -30),
             upperarm_R=(-120, -30, 80), forearm_R=(-70, 0, 0), upperarm_L=(-110, -60, 60), forearm_L=(-60, 0, 0))
B_FINISH_IK = {'RH': (0.75, -0.2, 5.05), 'BAT': (-0.25, 0.75, -0.6)}
B_BUNT = P(hips=(12, 0, 52), spine=(12, 0, 20), chest=(0, 0, 8), head=(-12, 0, 0),
           thigh_L=(-34, -16, 0), shin_L=(46, 0, 0), thigh_R=(-34, 16, 0), shin_R=(46, 0, 0),
           upperarm_R=(-60, 30, 30), forearm_R=(-40, 0, 0), upperarm_L=(-70, -20, 40), forearm_L=(-30, 0, 0))
B_BUNT_IK = {'RH': (0.25, -0.75, 4.2), 'LH': (0.25, -1.55, 4.3), 'BAT': (0.05, -1, 0.1)}

# Pitching, right-handed; release at frame 27 (0.9 s, the game's windup). The left side leads to the plate.
PT_SET = P(hips=(2, 0, -74), neck=(0, 0, 62), head=(0, 0, 10), thigh_L=(-4, -6, 0), thigh_R=(-4, 6, 0),
           upperarm_L=(-30, -10, 30), forearm_L=(-90, 0, -50), upperarm_R=(-30, 10, -30), forearm_R=(-90, 0, 50))
PT_SET_IK = {'RH': (-0.55, -0.1, 4.15), 'LH': (-0.62, -0.25, 4.25)}
PT_LIFT = dict(PT_SET, **P(hips=(0, 0, -88), thigh_L=(-100, -10, 0), shin_L=(104, 0, 0), foot_L=(-10, 0, 0), thigh_R=(-6, 6, 0), shin_R=(10, 0, 0)))
PT_LIFT_IK = {'RH': (-0.5, 0.0, 4.55), 'LH': (-0.6, -0.15, 4.6)}
PT_STRIDE = P(hips=(6, 0, -52), spine=(0, 0, -14), chest=(-10, 0, -10), neck=(0, 0, 58), head=(0, 0, 10),
              thigh_L=(-62, -30, 0), shin_L=(44, 0, 0), thigh_R=(26, 36, 0), shin_R=(40, 0, 0),
              upperarm_L=(-80, -40, 30), forearm_L=(-20, 0, 0), upperarm_R=(30, 90, -30), forearm_R=(-90, 0, 0))
PT_STRIDE_IK = {'RH': (-0.6, 1.5, 4.3), 'LH': (0.35, -1.9, 4.7)}
PT_COCK = dict(PT_STRIDE, **P(hips=(10, 0, -22), chest=(-14, 0, -10)))
PT_COCK_IK = {'RH': (-1.2, 0.5, 5.9), 'LH': (0.5, -2.2, 4.6)}
PT_RELEASE = P(hips=(20, 0, 10), spine=(26, 0, 14), chest=(18, 0, 16), neck=(0, 0, -10), head=(-30, 0, -20),
               thigh_L=(-56, -12, 0), shin_L=(30, 0, 0), foot_L=(-6, 0, 0), thigh_R=(30, 20, 0), shin_R=(70, 0, 0), foot_R=(30, 0, 0),
               upperarm_R=(-150, 30, 0), forearm_R=(-20, 0, 0), upperarm_L=(-20, -50, -30), forearm_L=(-90, 0, 0))
PT_RELEASE_IK = {'RH': (-1.45, -4.0, 5.75), 'LH': (0.35, -2.4, 4.25)}
PT_FOLLOW = P(hips=(30, 0, 24), spine=(30, 0, 20), chest=(20, 0, 14), neck=(-10, 0, -10), head=(-30, 0, -14),
              thigh_L=(-50, -10, 0), shin_L=(40, 0, 0), thigh_R=(-30, 30, 0), shin_R=(80, 0, 0), foot_R=(20, 0, 0),
              upperarm_R=(-30, -20, 60), forearm_R=(-40, 0, 0), upperarm_L=(10, -30, -20), forearm_L=(-100, 0, 0))
PT_FOLLOW_IK = {'RH': (0.6, -3.3, 2.5), 'LH': (0.55, -2.3, 3.9)}

CROUCH = P(hips=(10, 0, 0), spine=(22, 0, 0), chest=(8, 0, 0), head=(-34, 0, 0),
           thigh_L=(-88, -28, 0), shin_L=(142, 0, 0), foot_L=(-54, 0, 0), thigh_R=(-88, 28, 0), shin_R=(142, 0, 0), foot_R=(-54, 0, 0),
           upperarm_L=(-60, -20, 20), forearm_L=(-60, 0, 0), upperarm_R=(-20, 20, 0), forearm_R=(-40, 0, 0))
CROUCH_IK = {'LH': (0.35, -1.55, 2.75), 'RH': (-0.75, -0.35, 2.0)}
UMP = P(hips=(18, 0, 0), spine=(32, 0, 0), chest=(10, 0, 0), head=(-44, 0, 0),
        thigh_L=(-48, -24, 0), shin_L=(76, 0, 0), foot_L=(-28, 0, 0), thigh_R=(-48, 24, 0), shin_R=(76, 0, 0), foot_R=(-28, 0, 0),
        upperarm_L=(-40, -10, 30), forearm_L=(-70, 0, 0), upperarm_R=(-40, 10, -30), forearm_R=(-70, 0, 0))
UMP_IK = {'RH': (-0.75, -0.9, 3.0), 'LH': (0.75, -0.9, 3.0)}

def run_pose(ph):
    s = math.sin(ph * math.tau); c = math.cos(ph * math.tau)
    return P(hips=(12, 0, 6 * s), spine=(10, 0, -4 * s), chest=(4, 0, -8 * s), head=(-18, 0, 0),
             thigh_L=(-45 * s - 10, -4, 0), shin_L=(50 + 40 * max(0, c), 0, 0), foot_L=(-10 * s, 0, 0),
             thigh_R=(45 * s - 10, 4, 0), shin_R=(50 + 40 * max(0, -c), 0, 0), foot_R=(10 * s, 0, 0),
             upperarm_L=(45 * s, -10, 0), forearm_L=(-80, 0, 0), upperarm_R=(-45 * s, 10, 0), forearm_R=(-80, 0, 0))
def run_loc(ph): return (0, 0, -0.15 + 0.15 * abs(math.sin(ph * math.tau)))

TH_GATHER = P(hips=(6, 0, -60), chest=(0, 0, -10), neck=(0, 0, 50), head=(0, 0, 10), thigh_L=(-20, -16, 0), shin_L=(20, 0, 0), thigh_R=(-10, 16, 0), shin_R=(20, 0, 0),
              upperarm_L=(-80, -40, 30), forearm_L=(-30, 0, 0), upperarm_R=(-10, 100, 0), forearm_R=(-120, 0, 0))
TH_GATHER_IK = {'RH': (-0.9, 0.9, 5.4), 'LH': (0.3, -1.6, 4.6)}
TH_RELEASE = P(hips=(16, 0, 10), spine=(20, 0, 10), chest=(12, 0, 14), head=(-20, 0, -10), thigh_L=(-40, -14, 0), shin_L=(24, 0, 0), thigh_R=(20, 20, 0), shin_R=(50, 0, 0),
               upperarm_R=(-140, 20, 0), forearm_R=(-20, 0, 0), upperarm_L=(-10, -40, -20), forearm_L=(-80, 0, 0))
TH_RELEASE_IK = {'RH': (-1.1, -2.4, 5.5), 'LH': (0.35, -1.4, 4.2)}
TH_FOLLOW = P(hips=(24, 0, 20), spine=(26, 0, 16), chest=(14, 0, 10), head=(-24, 0, -10), thigh_L=(-40, -10, 0), shin_L=(30, 0, 0), thigh_R=(-10, 20, 0), shin_R=(60, 0, 0),
              upperarm_R=(-30, -10, 60), forearm_R=(-40, 0, 0), upperarm_L=(0, -30, -10), forearm_L=(-90, 0, 0))
FIELD_GB = P(hips=(40, 0, 0), spine=(32, 0, 0), chest=(10, 0, 0), head=(-52, 0, 0),
             thigh_L=(-84, -28, 0), shin_L=(96, 0, 0), foot_L=(-20, 0, 0), thigh_R=(-74, 28, 0), shin_R=(96, 0, 0), foot_R=(-20, 0, 0),
             upperarm_L=(-60, 0, 0), forearm_L=(-10, 0, 0), upperarm_R=(-60, 0, 0), forearm_R=(-10, 0, 0))
FIELD_GB_IK = {'LH': (0.25, -1.7, 0.45), 'RH': (-0.3, -1.55, 0.7)}
CATCH_HI = P(hips=(-4, 0, 0), spine=(-6, 0, 0), chest=(-6, 0, 0), head=(22, 0, 0), thigh_L=(-10, -6, 0), shin_L=(14, 0, 0), thigh_R=(-6, 6, 0), shin_R=(10, 0, 0),
             upperarm_L=(-170, -14, 0), forearm_L=(-20, 0, 0), upperarm_R=(-140, 20, 0), forearm_R=(-30, 0, 0))
CATCH_HI_IK = {'LH': (0.35, -0.7, 7.1), 'RH': (-0.25, -0.6, 6.5)}
CHEER = P(hips=(-4, 0, 0), chest=(-8, 0, 0), head=(16, 0, 0), upperarm_L=(-160, -30, 0), forearm_L=(-20, 0, 0), upperarm_R=(-160, 30, 0), forearm_R=(-20, 0, 0),
          thigh_L=(0, -6, 0), thigh_R=(0, 6, 0))

clip('idle', [(1, STAND), (36, dict(STAND, chest=(-3, 0, 0))), (72, STAND)], loop=True)
clip('ready', [(1, READY, (0, 0, -0.55), READY_IK), (30, dict(READY, chest=(11, 0, 0)), (0, 0, -0.6), READY_IK), (60, READY, (0, 0, -0.55), READY_IK)], loop=True)
clip('bat_stance', [(1, B_STANCE, (0, 0, -0.28), B_STANCE_IK),
                    (20, lerp_pose(B_STANCE, B_LOAD, 0.35), (0, 0, -0.3), {'RH': lerp_v(B_STANCE_IK['RH'], B_LOAD_IK['RH'], 0.35), 'BAT': lerp_v(B_STANCE_IK['BAT'], B_LOAD_IK['BAT'], 0.35)}),
                    (40, B_STANCE, (0, 0, -0.28), B_STANCE_IK)], loop=True)
# swing: 1 load, 6 hands through, 9 contact (0.27 s at 30 fps), 15 finish, 26 hold
clip('bat_swing', [(1, B_LOAD, (0, 0, -0.3), B_LOAD_IK), (6, lerp_pose(B_LOAD, B_CONTACT, 0.5), (0, -0.2, -0.38), B_MID_IK),
                   (9, B_CONTACT, (0, -0.3, -0.42), B_CONTACT_IK),
                   (12, lerp_pose(B_CONTACT, B_FINISH, 0.6), (0, -0.3, -0.36), {'RH': (0.75, -1.2, 4.6), 'BAT': (0.6, 0.45, 0.2)}),
                   (15, B_FINISH, (0, -0.3, -0.3), B_FINISH_IK), (26, B_FINISH, (0, -0.3, -0.3), B_FINISH_IK)])
clip('bat_bunt', [(1, B_BUNT, (0, 0, -0.55), B_BUNT_IK), (20, B_BUNT, (0, 0, -0.58), B_BUNT_IK)], loop=True)
clip('pitch', [(1, PT_SET, None, PT_SET_IK), (8, PT_SET, None, PT_SET_IK), (15, PT_LIFT, (0, 0.1, 0.05), PT_LIFT_IK),
               (21, PT_STRIDE, (0, -0.8, -0.45), PT_STRIDE_IK), (24, PT_COCK, (0, -1.3, -0.55), PT_COCK_IK),
               (27, PT_RELEASE, (0, -1.8, -0.6), PT_RELEASE_IK), (33, PT_FOLLOW, (0, -2.1, -0.7), PT_FOLLOW_IK), (42, PT_FOLLOW, (0, -2.1, -0.65), PT_FOLLOW_IK)])
clip('crouch', [(1, CROUCH, (0, 0, -1.62), CROUCH_IK), (30, dict(CROUCH, chest=(12, 0, 0)), (0, 0, -1.64), CROUCH_IK), (60, CROUCH, (0, 0, -1.62), CROUCH_IK)], loop=True)
clip('ump', [(1, UMP, (0, 0, -0.95), UMP_IK), (40, UMP, (0, 0, -0.97), UMP_IK)], loop=True)
clip('run', [(1 + i * 2, run_pose(i / 8), run_loc(i / 8)) for i in range(9)], loop=True)  # 16 frames ≈ 0.53 s per two strides
clip('throw', [(1, TH_GATHER, (0, 0, -0.2), TH_GATHER_IK), (7, TH_GATHER, (0, 0, -0.25), TH_GATHER_IK), (11, TH_RELEASE, (0, -0.6, -0.35), TH_RELEASE_IK),
               (16, TH_FOLLOW, (0, -0.9, -0.4)), (24, TH_FOLLOW, (0, -0.9, -0.3))])
clip('field_ground', [(1, READY, (0, 0, -0.55), READY_IK), (6, FIELD_GB, (0, -0.3, -1.35), FIELD_GB_IK), (18, FIELD_GB, (0, -0.3, -1.35), FIELD_GB_IK)])
clip('catch_high', [(1, STAND), (6, CATCH_HI, (0, 0, 0.1), CATCH_HI_IK), (18, CATCH_HI, (0, 0, 0.1), CATCH_HI_IK)])
clip('cheer', [(1, CHEER), (8, dict(CHEER, chest=(-14, 0, 0)), (0, 0, 0.35)), (16, CHEER)], loop=True)

# drop the solver rig: the baked keys carry the poses
for pb in rig.pose.bones:
    for c in list(pb.constraints): pb.constraints.remove(c)
for e in GOAL.values(): bpy.data.objects.remove(e)
rig.animation_data.action = None
for pb in rig.pose.bones:
    pb.rotation_quaternion = (1, 0, 0, 0); pb.location = (0, 0, 0); pb.scale = (1, 1, 1)

bpy.ops.wm.save_as_mainfile(filepath=os.path.join(HERE, 'player.blend'))
bpy.ops.export_scene.gltf(filepath=os.path.join(HERE, 'player.glb'), export_format='GLB', export_skins=True, export_animations=True,
                          export_animation_mode='NLA_TRACKS', export_vertex_color='ACTIVE', export_all_vertex_colors=False,
                          export_materials='PLACEHOLDER', export_yup=True, export_apply=False, export_optimize_animation_size=True,
                          export_frame_step=2, export_normals=True, export_texcoords=False)
print('EXPORTED', os.path.getsize(os.path.join(HERE, 'player.glb')))
