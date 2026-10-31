# Diamond Springs v3 ballplayers: realistic CC0 bodies (MPFB2 / MakeHuman) dressed in a baseball uniform built from
# the body surface, with fitted CC0 cleats, scripted cap, helmet, catcher's gear, glove and bat, one shared rig, three
# levels of detail, and the game's 14 clips retargeted from the v2 rig (art-src/blender/player.blend).
#
#   BLENDER_USER_RESOURCES=art-src/samples/_blender-user \
#   "C:\Program Files\Blender Foundation\Blender 5.2\blender.exe" -b --factory-startup \
#       --python art-src/blender/players/build_players.py -- [--variants=lean,average,stocky] [--lods=22000,8000,2600]
#
# MPFB2 must be installed in that isolated profile first (art-src/samples/_scripts/setup_mpfb.sh).
# Output (art-src/blender/players/out/): body-<variant>.glb (rig + LOD0-2 meshes + clips), skin-light.png,
# skin-dark.png (skin detail maps), meta.json (bones, triangle counts, decal anchors, timing), and previews.
#
# Units are feet (the game's world unit), +Z up, the character faces -Y. Every part is one mesh per LOD with a
# per-face "region" id in the color attribute (R = (id + 0.5) / 16), as in v2, so the game's palette shader
# colors uniforms per team. Skin faces also carry the MakeHuman UVs; the game multiplies the skin tone by the
# skin detail map there. Accessories hang off their own bones (the game hides one by scaling its bone to zero).
import argparse, json, math, os, sys
import addon_utils, bmesh, bpy
from mathutils import Matrix, Quaternion, Vector

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..', '..'))
OUT = os.path.join(HERE, 'out')
V2 = os.path.join(ROOT, 'art-src', 'blender', 'player.blend')
FT = 3.28084
REG = dict(jersey=0, pants=1, sock=2, skin=3, cap=4, helmet=5, shoe=6, belt=7, under=8, glove=9, bat=10, dark=11, gear=12, white=13, hair=14, trim=15)
ACC = ['cap', 'helmet', 'mask', 'gear', 'shinguard_l', 'shinguard_r', 'glove', 'bat']

argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
ap = argparse.ArgumentParser()
ap.add_argument('--variants', default='lean,average,stocky')
ap.add_argument('--lods', default='28000,9000,2600')
ap.add_argument('--no-anim', action='store_true')
ap.add_argument('--no-mocap', action='store_true', help='keep the v2 clips for pitch, swing, stance, throw and run')
ap.add_argument('--preview', action='store_true')
args = ap.parse_args(argv)
LODS = [int(x) for x in args.lods.split(',')]
os.makedirs(OUT, exist_ok=True)

# body builds: MPFB phenotype (0..1). High-school varsity: young adults, athletic.
VARIANTS = {
    'lean': dict(age=0.45, muscle=0.62, weight=0.42, height=0.68, proportions=0.85),  # ≈ 6 ft 3
    'average': dict(age=0.46, muscle=0.75, weight=0.55, height=0.62, proportions=0.8),  # ≈ 6 ft 0
    'stocky': dict(age=0.5, muscle=0.85, weight=0.92, height=0.52, proportions=0.65),  # ≈ 5 ft 8, heavy
}

addon_utils.enable('bl_ext.user_default.mpfb', default_set=True, persistent=True)
from bl_ext.user_default.mpfb.services.humanservice import HumanService  # noqa: E402
from bl_ext.user_default.mpfb.services.exportservice import ExportService  # noqa: E402
from bl_ext.user_default.mpfb.services.targetservice import TargetService  # noqa: E402


def clear():
    for o in list(bpy.data.objects): bpy.data.objects.remove(o, do_unlink=True)
    for coll in (bpy.data.meshes, bpy.data.armatures, bpy.data.actions, bpy.data.materials, bpy.data.images):
        for d in list(coll):
            if d.users == 0: coll.remove(d)


def select_only(*objs):
    for o in bpy.context.view_layer.objects: o.select_set(False)
    for o in objs: o.select_set(True)
    bpy.context.view_layer.objects.active = objs[0]


# ------------------------------------------------------------------ 1. the body (MPFB2)
def build_body(name, ph):
    info = HumanService._create_default_human_info_dict()
    info['name'] = name
    info['phenotype'].update(gender=1.0, **ph)
    info['rig'] = 'game_engine'
    info['skin_mhmat'] = 'young_caucasian_male.mhmat'
    info['skin_material_type'] = 'GAMEENGINE'
    info['eyes'] = 'low-poly.mhclo'
    info['eyes_material_type'] = 'MAKESKIN'
    info['eyebrows'] = 'eyebrow001.mhclo'
    info['eyelashes'] = ''
    info['hair'] = 'short02.mhclo'
    info['clothes'] = ['shoes01.mhclo']
    st = HumanService.get_default_deserialization_settings(); st['subdiv_levels'] = 0
    body = HumanService.deserialize_from_dict(info, st)
    TargetService.bake_targets(body)
    ExportService.bake_modifiers_remove_helpers(body, bake_masks=True, bake_subdiv=False, remove_helpers=True, also_proxy=True)
    bpy.context.view_layer.update()
    rig = body.parent
    parts = [o for o in rig.children if o.type == 'MESH']
    body = next(o for o in parts if o.name.endswith('.body'))
    # metres → feet: scale the rig and everything under it, then apply
    rig.scale = (FT, FT, FT)
    select_only(rig, *parts)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    return rig, body, [o for o in parts if o is not body]


def bone_pos(rig, n, tail=False):
    b = rig.data.bones[n]
    return rig.matrix_world @ (b.tail_local if tail else b.head_local)


# ------------------------------------------------------------------ 2. regions and the uniform
DEFORM_SKIN = ('head', 'neck_01')
NECKLINE = ('neck_01', 'spine_03', 'clavicle_l', 'clavicle_r')  # faces on these follow the neckline plane
BONES = set()  # the rig's bone names: MPFB meshes also carry non-bone groups (whole-body masks and the like)
def dominant(o, v):
    best, bw = None, 0
    for g in v.groups:
        n = o.vertex_groups[g.group].name
        if g.weight > bw and n in BONES: best, bw = n, g.weight
    return best or ''


def set_region(me, face_regions):
    col = me.color_attributes.get('region') or me.color_attributes.new('region', 'BYTE_COLOR', 'CORNER')
    for f in me.polygons:
        r = (face_regions[f.index] + 0.5) / 16
        for li in f.loop_indices: col.data[li].color = (r, 0, 0, 1)
    me.color_attributes.active_color = col


def dress_body(rig, body):
    """Region per face on the bare body, inflate the garments outward, drop the feet under the cleats."""
    me = body.data
    z_belt = bone_pos(rig, 'spine_01').z + 0.05
    z_knee = bone_pos(rig, 'calf_l').z
    z_ankle = bone_pos(rig, 'foot_l').z
    z_pants = z_knee - 0.38 * (z_knee - z_ankle)  # high-cut pants, stirrup socks below
    z_collar = bone_pos(rig, 'neck_01').z - 0.02  # the jersey's neckline (the plane tilts it lower in front)
    sh_l, el_l = bone_pos(rig, 'upperarm_l'), bone_pos(rig, 'lowerarm_l')
    # cut the hems as straight lines first (the base mesh's rows don't follow the belt or the sleeves)
    bm = bmesh.new(); bm.from_mesh(me)
    dl = bm.verts.layers.deform.active; names = {g.index: g.name for g in body.vertex_groups}
    def vbone(v):
        d = v[dl]; best = max(((w, names[i]) for i, w in d.items() if names.get(i) in BONES), default=(0, ''))
        return best[1]
    def cut(keep, co, no):
        fs = [f for f in bm.faces if keep(f)]
        es = {e for f in fs for e in f.edges}; vs = {v for f in fs for v in f.verts}
        bmesh.ops.bisect_plane(bm, geom=list(vs) + list(es) + fs, plane_co=co, plane_no=no)
    def fbone(f):
        ns = [vbone(v) for v in f.verts]; return max(set(ns), key=ns.count)
    torso = lambda f: not fbone(f).startswith(('upperarm', 'lowerarm', 'hand', 'index', 'middle', 'ring', 'pinky', 'thumb', 'clavicle', 'head', 'neck'))
    for z in (z_belt - 0.09, z_belt + 0.09): cut(torso, Vector((0, 0, z)), Vector((0, 0, 1)))
    nk = bone_pos(rig, 'neck_01')
    def neck_zone(f):
        c = f.calc_center_median(); b = fbone(f)
        near = (Vector((c.x, c.y)) - Vector((nk.x, nk.y))).length < 0.6 and abs(c.z - z_collar) < 0.5
        return (near or b in NECKLINE) and not b.startswith(('upperarm', 'lowerarm', 'hand', 'head'))
    nn = Vector((0, -0.35, 1)).normalized()
    for off in (0.0, -0.08):  # the neckline, and the lower edge of the collar band 0.08 ft below it
        cut(neck_zone, Vector((0, 0, z_collar)) + nn * off, nn)
    cut(lambda f: fbone(f).startswith('calf'), Vector((0, 0, z_pants)), Vector((0, 0, 1)))
    # the placket: two piping lines down the jersey front, either side of the centre line
    front = lambda f: torso(f) and f.normal.y < -0.2 and z_belt < f.calc_center_median().z < z_collar
    for x in (-0.075, -0.045, 0.045, 0.075): cut(front, Vector((x, 0, 0)), Vector((1, 0, 0)))
    for side, sx in (('l', 1), ('r', -1)):
        sh, el = Vector((sh_l.x * sx, sh_l.y, sh_l.z)), Vector((el_l.x * sx, el_l.y, el_l.z))
        for t0 in (0.5, 0.43):  # the sleeve hem, and the top of the cuff band
            cut(lambda f, s=side: fbone(f) == f'upperarm_{s}', sh + (el - sh) * t0, (el - sh).normalized())
    bm.to_mesh(me); bm.free()
    regs, drop = [], set()
    vdom = [dominant(body, v) for v in me.vertices]
    for f in me.polygons:
        c = f.center
        names = [vdom[i] for i in f.vertices]
        b = max(set(names), key=names.count)
        if b.startswith(('foot', 'ball')) or (c.z < z_ankle + 0.05 and b.startswith('calf')): drop.add(f.index); regs.append(REG['skin']); continue
        # around the neck, the neckline plane alone decides (whatever bone a face leans on), so the collar edge is clean
        nk = bone_pos(rig, 'neck_01')
        near = (Vector((c.x, c.y)) - Vector((nk.x, nk.y))).length < 0.6 and abs(c.z - z_collar) < 0.5
        if (near or b in NECKLINE) and not b.startswith(('upperarm', 'lowerarm', 'hand', 'head')):
            h = (c - Vector((0, 0, z_collar))).dot(Vector((0, -0.35, 1)).normalized())
            if h > -0.08: regs.append(REG['skin'] if h > 0 else REG['trim']); continue  # skin above, the collar band
            if b == 'neck_01': regs.append(REG['jersey']); continue  # below the band: cloth (other bones: the torso rules)
        if b.startswith(('hand', 'index', 'middle', 'ring', 'pinky', 'thumb')) or b in DEFORM_SKIN: regs.append(REG['skin']); continue
        if b.startswith('lowerarm'): regs.append(REG['under']); continue
        if b.startswith('upperarm'):
            sh, el = (sh_l, el_l) if b.endswith('_l') else (Vector((-sh_l.x, sh_l.y, sh_l.z)), Vector((-el_l.x, el_l.y, el_l.z)))
            t = (c - sh).dot((el - sh).normalized()) / (el - sh).length
            regs.append(REG['jersey'] if t < 0.43 else REG['trim'] if t < 0.5 else REG['under']); continue
        if b.startswith(('thigh',)): regs.append(REG['pants']); continue
        if b.startswith('calf'): regs.append(REG['pants'] if c.z > z_pants else REG['sock']); continue
        # torso: jersey above the belt, the belt, pants below
        if abs(c.z - z_belt) < 0.09: regs.append(REG['belt'])
        elif z_belt + 0.09 < c.z < z_collar - 0.08 and 0.045 < abs(c.x) < 0.075 and f.normal.y < -0.2: regs.append(REG['trim'])  # placket piping
        elif c.z > z_belt: regs.append(REG['jersey'])
        else: regs.append(REG['pants'])
    # Cloth: first relax the anatomy out of the garment areas (cloth bridges the hollows and hides the nipples,
    # navel and crease detail), then push each vertex out by the garment over it, averaged over its faces.
    thick = {REG['jersey']: 0.055, REG['trim']: 0.06, REG['pants']: 0.075, REG['belt']: 0.07, REG['sock']: 0.025, REG['under']: 0.02}
    loose = {REG['jersey'], REG['trim'], REG['pants'], REG['belt']}
    bm = bmesh.new(); bm.from_mesh(me); bm.faces.ensure_lookup_table(); bm.verts.ensure_lookup_table()
    cloth = [v for v in bm.verts if v.link_faces and all(regs[f.index] in loose for f in v.link_faces)]
    for _ in range(22): bmesh.ops.smooth_vert(bm, verts=cloth, factor=0.6, use_axis_x=True, use_axis_y=True, use_axis_z=True)
    bm.normal_update()
    off = []
    for v in bm.verts:
        ts = [thick.get(regs[f.index], 0.0) for f in v.link_faces]
        t = sum(ts) / max(1, len(ts))
        if z_pants < v.co.z < z_knee + 0.5 and any(regs[f.index] == REG['pants'] for f in v.link_faces): t += 0.03  # baggy over the knee
        off.append(v.normal * t)
    for v, o in zip(bm.verts, off): v.co += o
    cloth = [v for v in bm.verts if v.link_faces and all(regs[f.index] in loose for f in v.link_faces)]
    for _ in range(3): bmesh.ops.smooth_vert(bm, verts=cloth, factor=0.5, use_axis_x=True, use_axis_y=True, use_axis_z=True)
    bm.to_mesh(me); bm.free()
    set_region(me, regs)
    # remove the feet (inside the cleats)
    bm = bmesh.new(); bm.from_mesh(me); bm.faces.ensure_lookup_table()
    bmesh.ops.delete(bm, geom=[bm.faces[i] for i in drop], context='FACES')
    bm.to_mesh(me); bm.free()
    return dict(z_belt=z_belt, z_knee=z_knee, z_pants=z_pants)


def region_all(o, reg):
    set_region(o.data, [reg] * len(o.data.polygons))


def region_cleats(o):
    """Athletic cleats from MakeHuman's shoe: a dark sole and a white stripe along each side on the black upper."""
    me = o.data; zs = [v.co.z for v in me.vertices]; z0, z1 = min(zs), max(zs)
    regs = []
    for f in me.polygons:
        c, n = f.center, f.normal
        if n.z < -0.5 or c.z < z0 + 0.05 * (z1 - z0) / 0.5: regs.append(REG['dark'])  # the sole and its edge
        elif abs(n.x) > 0.55 and z0 + 0.12 * (z1 - z0) < c.z < z0 + 0.32 * (z1 - z0): regs.append(REG['white'])  # side stripe
        else: regs.append(REG['shoe'])
    set_region(me, regs)


def region_eyes(o):
    uv = o.data.uv_layers.active
    regs = []
    for f in o.data.polygons:
        u = sum((uv.data[li].uv for li in f.loop_indices), Vector((0, 0))) / len(f.loop_indices)
        regs.append(REG['dark'] if (u - Vector((0.5, 0.5))).length < 0.13 else REG['white'])
    set_region(o.data, regs)


# ------------------------------------------------------------------ 3. accessories and their bones
def add_acc_bones(rig):
    select_only(rig); bpy.ops.object.mode_set(mode='EDIT')
    eb = rig.data.edit_bones
    def nb(n, parent, h, t):
        b = eb.new(n); b.head, b.tail = Vector(h), Vector(t); b.parent = eb[parent]; b.use_deform = True
    hd = eb['head']
    hz = hd.head.z
    nb('cap', 'head', (0, hd.head.y, hz + 0.6), (0, hd.head.y, hz + 0.9))
    nb('helmet', 'head', (0, hd.head.y, hz + 0.6), (0, hd.head.y, hz + 0.9))
    nb('mask', 'head', (0, hd.head.y - 0.4, hz + 0.3), (0, hd.head.y - 0.6, hz + 0.3))
    sp = eb['spine_03']; nb('gear', 'spine_03', (0, sp.head.y - 0.42, sp.head.z), (0, sp.head.y - 0.62, sp.head.z))
    for s in ('l', 'r'):
        cf = eb[f'calf_{s}']; m = (cf.head + cf.tail) / 2
        nb(f'shinguard_{s}', f'calf_{s}', (m.x, m.y - 0.12, m.z + 0.4), (m.x, m.y - 0.12, m.z - 0.4))
    hl = eb['hand_l']; nb('glove', 'hand_l', hl.head + (hl.tail - hl.head) * 0.6, hl.head + (hl.tail - hl.head) * 1.4)
    hr = eb['hand_r']; g = hr.head + (hr.tail - hr.head) * 0.75
    nb('bat', 'hand_r', g, g + Vector((0, -0.5, 0)))  # the bat points forward in the rest pose, as in v2
    bpy.ops.object.mode_set(mode='OBJECT')


def rigid(o, rig, bone):
    o.vertex_groups.clear()
    g = o.vertex_groups.new(name=bone); g.add(list(range(len(o.data.vertices))), 1.0, 'REPLACE')
    o.parent = rig
    m = o.modifiers.new('Armature', 'ARMATURE'); m.object = rig


def new_obj(name, bm):
    for dl in list(bm.verts.layers.deform): bm.verts.layers.deform.remove(dl)  # parts copied from the body keep no body weights
    for f in bm.faces: f.smooth = True  # smooth shading: gear and headwear read as moulded, not faceted
    me = bpy.data.meshes.new(name); bm.to_mesh(me); bm.free()
    o = bpy.data.objects.new(name, me); bpy.context.scene.collection.objects.link(o)
    return o


def head_frame(rig, body, band=0.36):
    """The skull at a hat's band: centre (at band height), half-width, half-depth, and the crown's height.
    band = how far below the crown the band sits (a cap ~0.36 ft, about at the forehead; a helmet lower)."""
    vs = [body.matrix_world @ v.co for v in body.data.vertices if dominant(body, v) == 'head']
    top = max(v.z for v in vs)
    lo = top - band
    ring = [v for v in vs if lo - 0.05 < v.z < lo + 0.08]  # the skull's girth where the band sits
    cx = sum(v.x for v in ring) / len(ring); cy = (max(v.y for v in ring) + min(v.y for v in ring)) / 2
    rx = max(abs(v.x - cx) for v in ring); ry = max(abs(v.y - cy) for v in ring)
    return Vector((cx, cy, lo)), rx, ry, top


def make_cap(rig, body, helmet=False):
    c, rx, ry, top = head_frame(rig, body, 0.42 if helmet else 0.34)
    bm = bmesh.new()
    pad = 0.08 if helmet else 0.065  # clear of the scalp everywhere
    h = (top - c.z) + pad + 0.02
    rings, seg = 9, 36
    verts = []
    for i in range(rings + 1):
        a = (i / rings) * (math.pi / 2)
        z = c.z + math.sin(a) * h
        k = math.cos(a)
        drop = (0.0 if helmet else 0.2) * (1 - i / rings)  # a cap sits lower at the back, over the nape
        row = [bm.verts.new((c.x + math.cos(t) * (rx + pad) * k, c.y + math.sin(t) * (ry + pad) * k, z - drop * max(0.0, math.sin(t)))) for t in [j / seg * math.tau for j in range(seg)]] if i < rings else [bm.verts.new((c.x, c.y, z))]
        verts.append(row)
    for i in range(rings - 1):
        for j in range(seg): bm.faces.new((verts[i][j], verts[i][(j + 1) % seg], verts[i + 1][(j + 1) % seg], verts[i + 1][j]))
    for j in range(seg): bm.faces.new((verts[rings - 1][j], verts[rings - 1][(j + 1) % seg], verts[rings][0]))
    # brim (cap) or short brim + ear flaps (helmet): forward is -Y
    z0 = c.z  # the band
    blen = 0.32 if not helmet else 0.2
    brim = []
    for j in range(13):
        t = math.pi * 7 / 6 + (j / 12) * math.pi * 2 / 3  # the front 120°: angles with sin < 0 face -Y
        x = c.x + math.cos(t) * (rx + pad); y = c.y + math.sin(t) * (ry + pad)
        k = math.sin(t) ** 2  # full length at the front, tapering to nothing at the bill's corners
        ox = c.x + math.cos(t) * (rx + pad + blen * 0.25 * k); oy = c.y + math.sin(t) * (ry + pad + blen * k)
        brim.append((bm.verts.new((x, y, z0)), bm.verts.new((ox, oy, z0 - 0.04))))
    thin = []  # one-sided sheets, given thickness below
    for j in range(12):
        a, b = brim[j], brim[j + 1]
        thin.append(bm.faces.new((a[0], b[0], b[1], a[1])))
    if helmet:  # ear flaps down both sides
        for s in (-1, 1):
            x = c.x + s * (rx + pad); y0, y1 = c.y - ry * 0.55, c.y + ry * 0.35
            q = [bm.verts.new((x, y0, z0)), bm.verts.new((x, y1, z0)), bm.verts.new((x, y1 - 0.05, z0 - 0.42)), bm.verts.new((x, y0 + 0.05, z0 - 0.38))]
            thin.append(bm.faces.new(q if s > 0 else list(reversed(q))))
    bmesh.ops.solidify(bm, geom=thin, thickness=0.025)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    o = new_obj('helmet' if helmet else 'cap', bm)
    region_all(o, REG['helmet'] if helmet else REG['cap'])
    rigid(o, rig, 'helmet' if helmet else 'cap')
    return o


def make_mask(rig, body):
    c, rx, ry, top = head_frame(rig, body)
    bm = bmesh.new()
    zf0, zf1 = c.z - 1.0, c.z - 0.12  # chin to brow
    yf = c.y - ry - 0.07  # the cage sits just off the face
    def bar(p0, p1, r=0.022):
        d = (Vector(p1) - Vector(p0)); n = 6
        ax = d.normalized(); side = ax.cross(Vector((0, 1, 0))) if abs(ax.y) < 0.9 else ax.cross(Vector((1, 0, 0)))
        side.normalize(); up = ax.cross(side)
        r0 = [bm.verts.new(Vector(p0) + (side * math.cos(t) + up * math.sin(t)) * r) for t in [k / n * math.tau for k in range(n)]]
        r1 = [bm.verts.new(Vector(p1) + (side * math.cos(t) + up * math.sin(t)) * r) for t in [k / n * math.tau for k in range(n)]]
        for k in range(n): bm.faces.new((r0[k], r0[(k + 1) % n], r1[(k + 1) % n], r1[k]))
    for k in range(5):  # horizontal bars, curved around the face
        z = zf0 + (zf1 - zf0) * k / 4
        pts = [(c.x + math.sin(a) * (rx + 0.12), yf + (1 - math.cos(a)) * 0.35, z) for a in [(-0.9 + 1.8 * i / 6) for i in range(7)]]
        for i in range(6): bar(pts[i], pts[i + 1])
    for x in (-0.18, 0.18): bar((c.x + x, yf, zf0), (c.x + x, yf, zf1))
    o = new_obj('mask', bm); region_all(o, REG['dark']); rigid(o, rig, 'mask')
    return o


def shell(body, rig, bone, pick, offset, name, reg):
    """A rigid shell copied from body faces chosen by pick(face centre, normal), pushed out along the normals."""
    bm = bmesh.new(); bm.from_mesh(body.data); bm.faces.ensure_lookup_table()
    keep = {f for f in bm.faces if pick(f.calc_center_median(), f.normal)}
    bmesh.ops.delete(bm, geom=[f for f in bm.faces if f not in keep], context='FACES')
    bmesh.ops.delete(bm, geom=[v for v in bm.verts if not v.link_faces], context='VERTS')
    # relax the outline (it follows the body's quads and reads as a sawtooth), then the surface a little
    for _ in range(8):
        rim = [v for v in bm.verts if v.is_boundary]
        new = {}
        for v in rim:
            nb = [e.other_vert(v) for e in v.link_edges if e.is_boundary]
            if len(nb) == 2: new[v] = v.co * 0.4 + (nb[0].co + nb[1].co) * 0.3
        for v, co in new.items(): v.co = co
    bmesh.ops.smooth_vert(bm, verts=[v for v in bm.verts if not v.is_boundary], factor=0.5, use_axis_x=True, use_axis_y=True, use_axis_z=True)
    bm.normal_update()
    for v in bm.verts: v.co += v.normal * offset
    bmesh.ops.solidify(bm, geom=bm.faces[:], thickness=0.03)
    o = new_obj(name, bm); o.matrix_world = body.matrix_world
    decimate(o, 0.6)
    region_all(o, reg); rigid(o, rig, bone)
    return o


def decimate(o, ratio):
    d = o.modifiers.new('dec', 'DECIMATE'); d.ratio = ratio
    select_only(o); bpy.ops.object.modifier_apply(modifier=d.name)


def make_bat(rig):
    hr = rig.data.bones['bat']; g = rig.matrix_world @ hr.head_local; ax = (rig.matrix_world.to_3x3() @ (hr.tail_local - hr.head_local)).normalized()
    # profile along the bat from the knob (behind the hands) to the end cap: (distance ft, radius ft)
    prof = [(-0.25, 0.0), (-0.24, 0.06), (-0.2, 0.06), (-0.18, 0.04), (0.2, 0.042), (0.9, 0.05), (1.5, 0.085), (2.0, 0.108), (2.45, 0.11), (2.5, 0.1), (2.52, 0.0)]
    side = ax.cross(Vector((0, 0, 1))).normalized(); up = side.cross(ax)
    bm = bmesh.new(); rows = []; n = 10
    for d, r in prof:
        p = g + ax * d
        rows.append([bm.verts.new(p + (side * math.cos(t) + up * math.sin(t)) * r) for t in [k / n * math.tau for k in range(n)]])
    for i in range(len(rows) - 1):
        for k in range(n): bm.faces.new((rows[i][k], rows[i][(k + 1) % n], rows[i + 1][(k + 1) % n], rows[i + 1][k]))
    bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-4)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    o = new_obj('bat', bm); region_all(o, REG['bat']); rigid(o, rig, 'bat')
    return o


def make_glove(rig, body):
    """A fielder's mitt: the convex hull of the left hand, pushed out a little and rounded (a hull has no stray normals,
    so no spikes), rigid on the glove bone."""
    me = body.data
    left = [v.co.copy() for v in me.vertices if dominant(body, v).endswith('_l') and dominant(body, v).startswith(('hand', 'index', 'middle', 'ring', 'pinky', 'thumb'))]
    bm = bmesh.new()
    for co in left: bm.verts.new(co)
    bmesh.ops.convex_hull(bm, input=bm.verts[:])
    c = sum((v.co for v in bm.verts), Vector()) / len(bm.verts)
    for v in bm.verts: v.co = c + (v.co - c) * 1.18 + (v.co - c).normalized() * 0.07  # roomy: the closed hand sits inside
    bmesh.ops.triangulate(bm, faces=bm.faces[:])
    bmesh.ops.subdivide_edges(bm, edges=bm.edges[:], cuts=1, use_grid_fill=True)
    for _ in range(3): bmesh.ops.smooth_vert(bm, verts=bm.verts, factor=0.5, use_axis_x=True, use_axis_y=True, use_axis_z=True)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    o = new_obj('glove', bm); region_all(o, REG['glove']); rigid(o, rig, 'glove')
    return o


# ------------------------------------------------------------------ 4. assemble, LODs
def join(parts, name):
    select_only(*parts)
    bpy.ops.object.join()
    o = bpy.context.view_layer.objects.active; o.name = name; o.data.name = name
    return o


def tris(o):
    dg = bpy.context.evaluated_depsgraph_get(); m = o.evaluated_get(dg).to_mesh(); m.calc_loop_triangles(); n = len(m.loop_triangles)
    o.evaluated_get(dg).to_mesh_clear(); return n


def protect_hems(o):
    """A vertex group of the region boundaries (belt, hems, sleeves): decimation leaves them alone, so cut lines stay straight."""
    me = o.data; col = me.color_attributes['region']
    reg = {}
    for f in me.polygons:
        r = int(col.data[f.loop_indices[0]].color[0] * 16)
        for i in f.vertices: reg.setdefault(i, set()).add(r)
    g = o.vertex_groups.get('_keep') or o.vertex_groups.new(name='_keep')
    g.add([i for i, rs in reg.items() if len(rs) > 1], 1.0, 'REPLACE')
    return g


def decimate_keep(o, ratio):
    g = protect_hems(o)
    d = o.modifiers.new('dec', 'DECIMATE'); d.ratio = ratio; d.use_collapse_triangulate = True
    d.vertex_group = g.name; d.invert_vertex_group = True; d.vertex_group_factor = 4.0
    select_only(o); bpy.ops.object.modifier_apply(modifier=d.name)
    o.vertex_groups.remove(o.vertex_groups['_keep'])


def make_lod(src, target, name):
    o = src.copy(); o.data = src.data.copy(); o.name = name; bpy.context.scene.collection.objects.link(o)
    n = tris(o)
    if n > target: decimate_keep(o, target / n)
    return o


# ------------------------------------------------------------------ 5. clips: retarget from the v2 rig
MAP = {'hips': 'pelvis', 'spine': 'spine_01', 'chest': 'spine_03', 'neck': 'neck_01', 'head': 'head',
       'upperarm.L': 'upperarm_l', 'forearm.L': 'lowerarm_l', 'hand.L': 'hand_l', 'upperarm.R': 'upperarm_r', 'forearm.R': 'lowerarm_r', 'hand.R': 'hand_r',
       'thigh.L': 'thigh_l', 'shin.L': 'calf_l', 'foot.L': 'foot_l', 'thigh.R': 'thigh_r', 'shin.R': 'calf_r', 'foot.R': 'foot_r', 'bat': 'bat'}
# v2's "left" is the character's left at +X; MPFB's _l is also +X (character faces -Y in both)


def load_v2():
    with bpy.data.libraries.load(V2, link=False) as (src, dst):
        dst.objects = [n for n in src.objects if n == 'Rig']
        dst.actions = list(src.actions)
    rig = next(o for o in dst.objects if o)
    bpy.context.scene.collection.objects.link(rig)
    return rig, [a for a in dst.actions if a and not a.name.endswith('_src')]


def depth(b):
    d = 0
    while b.parent: b = b.parent; d += 1
    return d


def retarget(src, dst, actions):
    """World-space delta retarget: each mapped bone turns from its rest by the same world rotation as its v2 source,
    after a rest alignment that points the target's rest direction along the source's. The pelvis also follows the
    source hips' height and stride, scaled by hip height."""
    sw, dw = src.matrix_world, dst.matrix_world
    s_rest = {n: sw @ src.data.bones[n].matrix_local for n in MAP}
    d_rest = {n: dw @ dst.data.bones[t].matrix_local for n, t in MAP.items()}
    align = {}
    for n, t in MAP.items():
        sb, db = src.data.bones[n], dst.data.bones[t]
        sd = (sw.to_3x3() @ (sb.tail_local - sb.head_local)).normalized()
        dd = (dw.to_3x3() @ (db.tail_local - db.head_local)).normalized()
        align[n] = dd.rotation_difference(sd)
    hip_ratio = (dw @ dst.data.bones['pelvis'].head_local).z / (sw @ src.data.bones['hips'].head_local).z
    order = sorted(MAP, key=lambda n: depth(dst.data.bones[MAP[n]]))
    dst.animation_data_create(); src.animation_data_create()
    for pb in dst.pose.bones: pb.rotation_mode = 'QUATERNION'  # MPFB mixes Euler and quaternion bones
    for tr in src.animation_data.nla_tracks: tr.mute = True  # only the clip being read plays
    made = []
    for act in actions:
        src.animation_data.action = act
        if getattr(act, 'slots', None): src.animation_data.action_slot = act.slots[0]  # Blender 4.4+: an action plays through a slot
        f0, f1 = (int(x) for x in act.frame_range)
        out = bpy.data.actions.new(act.name); dst.animation_data.action = out
        for f in range(f0, f1 + 1):
            bpy.context.scene.frame_set(f)
            for n in order:
                t = MAP[n]; pb = dst.pose.bones[t]
                sm = sw @ src.pose.bones[n].matrix
                delta = sm.to_quaternion() @ s_rest[n].to_quaternion().inverted()
                q = delta @ align[n] @ d_rest[n].to_quaternion()
                loc = pb.matrix.to_translation()  # the head rides on the (already posed) parent
                if t == 'pelvis':
                    hp = sm.to_translation(); r0 = sw @ src.data.bones['hips'].head_local
                    loc = dw.inverted() @ ((dw @ dst.data.bones['pelvis'].head_local) + (hp - r0) * hip_ratio)
                pb.matrix = Matrix.LocRotScale(loc, dw.to_quaternion().inverted() @ q, Vector((1, 1, 1)))
                bpy.context.view_layer.update()
            for n in order:
                pb = dst.pose.bones[MAP[n]]
                pb.keyframe_insert('rotation_quaternion', frame=f)
                if MAP[n] == 'pelvis': pb.keyframe_insert('location', frame=f)
        out.use_fake_user = True
        if act.use_cyclic: out.use_cyclic = True
        tr = dst.animation_data.nla_tracks.new(); tr.name = act.name
        tr.strips.new(act.name, f0, out)
        dst.animation_data.action = None
        made.append(act.name)
    for pb in dst.pose.bones: pb.matrix_basis = Matrix()
    return made


# ------------------------------------------------------------------ 6. skin detail maps
def skin_maps():
    """The MakeHuman skin textures as detail maps: texture / its mean skin color, stored at half scale (the game
    multiplies by 2), so one map serves every skin tone the palette sets."""
    base = os.path.join(os.environ.get('BLENDER_USER_RESOURCES', ''), 'extensions', '.user', 'user_default', 'mpfb', 'data', 'skins')
    out = {}
    for key, rel in (('light', 'young_caucasian_male/young_lightskinned_male_diffuse.png'), ('dark', 'young_african_male/young_darkskinned_male_diffuse.png')):
        im = bpy.data.images.load(os.path.join(base, rel))
        w, h = im.size; px = list(im.pixels)
        # the typical skin color: per-channel median over the painted texels (the unpainted background is near black)
        ch = [[], [], []]
        for i in range(0, len(px), 4 * 37):
            r, g, b = px[i], px[i + 1], px[i + 2]
            if 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.03:
                ch[0].append(r); ch[1].append(g); ch[2].append(b)
        mean = [sorted(c)[len(c) // 2] for c in ch]
        for i in range(0, len(px), 4):
            for c in range(3): px[i + c] = min(1.0, px[i + c] / mean[c] * 0.5)
        im.pixels = px
        for size in (2048, 1024):
            im2 = im.copy(); im2.scale(size, size)
            sc = bpy.context.scene; sc.render.image_settings.file_format = 'WEBP'; sc.render.image_settings.quality = 82
            im2.save_render(os.path.join(OUT, f'skin-{key}-{size}.webp'), scene=sc)
        out[key] = mean
    # cloth detail: Poly Haven's cotton_jersey normal map (CC0), at 512², tiled over the uniform by the game
    nor = bpy.data.images.load(os.path.join(ROOT, 'art-src', 'samples', 'polyhaven-textures', 'cotton_jersey', 'cotton_jersey_nor_gl_1k.jpg'))
    nor.scale(512, 512); nor.colorspace_settings.name = 'Non-Color'
    sc = bpy.context.scene; sc.render.image_settings.file_format = 'WEBP'; sc.render.image_settings.quality = 85
    nor.save_render(os.path.join(OUT, 'fabric-nor-512.webp'), scene=sc)
    return out


# ------------------------------------------------------------------ main
meta = {'bones': None, 'variants': {}, 'lods': LODS, 'units': 'ft', 'regions': REG}
if not os.path.exists(os.path.join(OUT, 'skin-light-1024.webp')): meta['skinMeans'] = skin_maps()
for vname in args.variants.split(','):
    clear()
    rig, body, extras = build_body(vname, VARIANTS[vname])
    rig.name = 'Rig'
    BONES.clear(); BONES.update(b.name for b in rig.data.bones)
    for o in extras:
        n = o.name.lower()
        if 'shoes' in n: region_cleats(o)
        elif 'short02' in n or 'eyebrow' in n or 'hair' in n: region_all(o, REG['hair'])
        elif 'eye' in n: region_eyes(o)
        else: region_all(o, REG['skin'])
    land = dress_body(rig, body)
    add_acc_bones(rig)
    acc = [make_cap(rig, body), make_cap(rig, body, helmet=True), make_mask(rig, body),
           shell(body, rig, 'gear', lambda c, n: n.y < -0.35 and land['z_belt'] + 0.1 < c.z < bone_pos(rig, 'neck_01').z - 0.05 and abs(c.x) < 0.7, 0.14, 'gear', REG['gear']),
           shell(body, rig, 'shinguard_l', lambda c, n: n.y < -0.2 and c.x > 0.05 and bone_pos(rig, 'foot_l').z + 0.1 < c.z < bone_pos(rig, 'calf_l').z + 0.25, 0.08, 'shinguard_l', REG['gear']),
           shell(body, rig, 'shinguard_r', lambda c, n: n.y < -0.2 and c.x < -0.05 and bone_pos(rig, 'foot_r').z + 0.1 < c.z < bone_pos(rig, 'calf_r').z + 0.25, 0.08, 'shinguard_r', REG['gear']),
           make_glove(rig, body), make_bat(rig)]
    lod0 = join([body, *extras, *acc], 'LOD0')
    # tidy for export: one material slot, triangulated
    lod0.data.materials.clear()
    lods = [lod0] + [make_lod(lod0, LODS[i], f'LOD{i}') for i in (1, 2)]
    if tris(lod0) > LODS[0]:  # trim the hero to its budget after the coarser levels are cut from the full mesh
        decimate_keep(lod0, LODS[0] / tris(lod0))
    counts = [tris(o) for o in lods]
    # jersey decal anchors: the chest's front and back surface, measured by rays from the chest bone (rest pose, before the clips)
    from mathutils.bvhtree import BVHTree
    dg = bpy.context.evaluated_depsgraph_get(); bvh = BVHTree.FromObject(lod0, dg)
    ch = rig.data.bones['spine_03']; o = rig.matrix_world @ ch.head_local
    def surf(dz, dy):
        hit = bvh.ray_cast(Vector((0, o.y, o.z + dz)), Vector((0, dy, 0)))
        return abs(hit[0].y - o.y) + 0.02 if hit[0] else 0.45
    chest = {'upFront': 0.5, 'front': surf(0.5, -1), 'upBack': 0.4, 'back': surf(0.4, 1)}  # lettering at chest height, the number between the shoulder blades
    names = []
    if not args.no_anim and vname == 'average':  # clips ship once; the game binds them to every build by bone name
        v2rig, actions = load_v2()
        names = retarget(v2rig, rig, actions)
        bpy.data.objects.remove(v2rig, do_unlink=True)
        if not args.no_mocap:  # CMU motion capture replaces the v2 pitch, swing, stance, throw and run (mocap.py)
            sys.path.insert(0, HERE); import mocap
            mocap.build(rig, ROOT, lambda m: print('MOCAP', m))
    meta['bones'] = [b.name for b in rig.data.bones]
    meta['variants'][vname] = {'tris': counts, 'clips': names, 'height': max((lod0.matrix_world @ v.co).z for v in lod0.data.vertices),
                               'hipHeight': (rig.matrix_world @ rig.data.bones['pelvis'].head_local).z, 'landmarks': land, 'chest': chest}
    bpy.ops.wm.save_as_mainfile(filepath=os.path.join(OUT, f'body-{vname}.blend'))
    # high: all three levels; medium (phones): the two coarser. Clips ship once, with the average build.
    for tier, keep in (('high', lods), ('medium', lods[1:])):
        select_only(rig, *keep)
        fn = os.path.join(OUT, f'body-{vname}-{tier}.glb')
        bpy.ops.export_scene.gltf(filepath=fn, export_format='GLB', use_selection=True, export_skins=True,
                                  export_animations=vname == 'average' and not args.no_anim, export_animation_mode='NLA_TRACKS', export_vertex_color='ACTIVE',
                                  export_all_vertex_colors=False, export_materials='PLACEHOLDER', export_yup=True, export_apply=False,
                                  export_optimize_animation_size=True, export_frame_step=2, export_normals=True, export_texcoords=True, export_morph=False)
        meta['variants'][vname][f'bytes_{tier}'] = os.path.getsize(fn)
    print('BUILT', vname, counts, meta['variants'][vname])
with open(os.path.join(OUT, 'meta.json'), 'w', encoding='utf-8') as f: json.dump(meta, f, indent=1)
