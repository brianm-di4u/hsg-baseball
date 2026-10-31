# Performance-ceiling ladder (VISUAL-PLAN-3.md, phase 2): the shipped player re-meshed to fixed triangle budgets,
# same rig, weights, regions and clips, so the game can measure what each budget costs on each device profile.
#
#   "C:\Program Files\Blender Foundation\Blender 5.2\blender.exe" -b art-src/blender/player.blend --python art-src/blender/ceiling.py -- 2000 5000 10000 20000 40000 80000
#
# Writes art-src/ceiling/player-<k>k.glb (UVs included, for the texture tests) and player-<k>k-fingers.glb for the
# first budget at or above 20k (30 extra finger bones: the bone-count test). Packed by tools/pack-ceiling.mjs.
import bpy, bmesh, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', 'ceiling')
os.makedirs(OUT, exist_ok=True)
argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else ['2000', '5000', '10000', '20000', '40000', '80000']
TARGETS = [int(a) for a in argv]

body = next(o for o in bpy.data.objects if o.type == 'MESH' and any(m.type == 'ARMATURE' for m in o.modifiers))
rig = next(o for o in bpy.data.objects if o.type == 'ARMATURE')
base_mesh = body.data.copy()

def tris(obj):
    dg = bpy.context.evaluated_depsgraph_get()
    ev = obj.evaluated_get(dg); m = ev.to_mesh()
    n = sum(len(p.vertices) - 2 for p in m.polygons)
    ev.to_mesh_clear(); return n

def uv_unwrap(obj):
    bpy.context.view_layer.objects.active = obj
    for o in bpy.context.selected_objects: o.select_set(False)
    obj.select_set(True)
    bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.uv.smart_project(angle_limit=1.15, island_margin=0.01)
    bpy.ops.object.mode_set(mode='OBJECT')

def add_fingers():
    bpy.context.view_layer.objects.active = rig
    bpy.ops.object.mode_set(mode='EDIT')
    eb = rig.data.edit_bones
    for side in ('L', 'R'):
        hand = eb[f'hand.{side}']
        for f in range(5):
            parent = hand
            for k in range(3):
                b = eb.new(f'f{f}{k}.{side}')
                d = hand.tail - hand.head
                b.head = hand.tail + d * (0.12 * k) + (hand.x_axis * (f - 2) * 0.03)
                b.tail = b.head + d * 0.12
                b.parent = parent; parent = b
    bpy.ops.object.mode_set(mode='OBJECT')

def export(name):
    for o in bpy.context.selected_objects: o.select_set(False)
    body.select_set(True); rig.select_set(True)
    for o in rig.children: o.select_set(True)
    bpy.ops.export_scene.gltf(filepath=os.path.join(OUT, name), export_format='GLB', use_selection=True, export_skins=True, export_animations=True,
                              export_animation_mode='NLA_TRACKS', export_vertex_color='ACTIVE', export_all_vertex_colors=False,
                              export_materials='PLACEHOLDER', export_yup=True, export_apply=True, export_optimize_animation_size=True,
                              export_frame_step=2, export_normals=True, export_texcoords=True)

base = tris(body)
print('BASE TRIS', base)

def build(T):
    body.data = base_mesh.copy()
    for m in [m for m in body.modifiers if m.type in ('SUBSURF', 'DECIMATE')]: body.modifiers.remove(m)
    uv_unwrap(body)
    level = 0
    while base * (4 ** level) < T * 0.9 and level < 3: level += 1
    if level:
        s = body.modifiers.new('sub', 'SUBSURF'); s.levels = s.render_levels = level; s.subdivision_type = 'SIMPLE' if level > 1 else 'CATMULL_CLARK'
    n = tris(body)
    if n > T * 1.05:
        d = body.modifiers.new('dec', 'DECIMATE'); d.ratio = T / n
    # the armature modifier must evaluate last (the exporter skins the result)
    arm = next(m for m in body.modifiers if m.type == 'ARMATURE')
    bpy.context.view_layer.objects.active = body
    while body.modifiers[-1] != arm: bpy.ops.object.modifier_move_down(modifier=arm.name)
    return tris(body), level

for T in TARGETS:
    got, level = build(T)
    name = f'player-{round(T / 1000)}k.glb'
    export(name)
    print('LADDER', T, 'tris', got, 'subsurf', level, 'size', os.path.getsize(os.path.join(OUT, name)))
# bone-count test: the first budget at or above 20k again, with 30 finger bones added (done last: it changes the rig)
F = next((T for T in TARGETS if T >= 20000), None)
if F:
    build(F); add_fingers()
    export(f'player-{round(F / 1000)}k-fingers.glb')
    print('LADDER', F, 'fingers bones', len(rig.data.bones))
