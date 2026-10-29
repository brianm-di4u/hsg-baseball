# Renders pose previews of player.blend into art-src/blender/renders/ (git-ignored) for review.
#   blender.exe -b art-src/blender/player.blend --python art-src/blender/preview.py -- idle:1 bat_swing:9:catcher
import bpy, os, sys
from mathutils import Vector

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, 'renders'); os.makedirs(OUT, exist_ok=True)
args = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else ['idle:1']
sc = bpy.context.scene
sc.render.engine = 'BLENDER_WORKBENCH'
sc.display.shading.light = 'STUDIO'; sc.display.shading.color_type = 'VERTEX'
sc.display.shading.show_shadows = True
sc.render.resolution_x = 400; sc.render.resolution_y = 460
rig = bpy.data.objects['Rig']
me = bpy.data.objects['Player'].data
print('VERTS', len(me.vertices), 'TRIS', sum(len(p.vertices) - 2 for p in me.polygons))
# preview palette: white home kit, navy trim
PAL = [(0.95, 0.93, 0.88), (0.85, 0.84, 0.8), (0.1, 0.2, 0.55), (0.78, 0.55, 0.4), (0.1, 0.2, 0.55), (0.1, 0.2, 0.55), (0.06, 0.06, 0.06), (0.1, 0.1, 0.1),
       (0.1, 0.2, 0.55), (0.55, 0.32, 0.15), (0.85, 0.68, 0.45), (0.12, 0.1, 0.1), (0.2, 0.2, 0.25), (0.95, 0.94, 0.9), (0.2, 0.12, 0.06), (0.9, 0.2, 0.2)]
src = me.color_attributes['Col']
dst = me.color_attributes.get('Prev') or me.color_attributes.new('Prev', 'FLOAT_COLOR', 'CORNER')
for i, d in enumerate(src.data):
    c = PAL[min(15, int(d.color[0] * 16))]; dst.data[i].color = (c[0], c[1], c[2], 1)
me.color_attributes.active_color = dst
ROLE = {'bat_stance': 'helmet bat', 'bat_swing': 'helmet bat', 'bat_bunt': 'helmet bat', 'crouch': 'mask gear shinguard.L shinguard.R glove', 'ump': 'mask gear'}
ACC = ['cap', 'helmet', 'mask', 'gear', 'shinguard.L', 'shinguard.R', 'glove', 'bat']
cam_d = bpy.data.cameras.new('C'); cam_d.lens = 50
cam = bpy.data.objects.new('C', cam_d); sc.collection.objects.link(cam); sc.camera = cam
views = {'face': Vector((1.5, -5, 5.8)), 'front': Vector((5, -14, 5)), 'side': Vector((15, 0, 4.5)), 'back': Vector((-6, 13, 5)), 'catcher': Vector((-10, 6, 5)), 'pitcher': Vector((12, -4, 5))}
for a in args:
    parts = a.split(':')
    name, fr = parts[0], int(parts[1])
    view = parts[2] if len(parts) > 2 else 'front'
    rig.animation_data.action = bpy.data.actions[name]
    for t in rig.animation_data.nla_tracks: t.mute = True
    sc.frame_set(fr)
    keep = ROLE.get(name, 'cap glove').split()
    for n in ACC: rig.pose.bones[n].scale = (1, 1, 1) if n in keep else (0.001, 0.001, 0.001)
    bpy.context.view_layer.update()
    p, tgt = views[view], Vector((0, 0, 5.6 if view == 'face' else 3))
    cam.location = p
    cam.rotation_euler = (tgt - p).to_track_quat('-Z', 'Y').to_euler()
    sc.render.filepath = os.path.join(OUT, f'{name}-{fr}-{view}.png')
    bpy.ops.render.render(write_still=True)
