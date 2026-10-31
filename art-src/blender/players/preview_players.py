# Quick look at a built player (art-src/blender/players/out/body-<variant>.blend): Workbench renders of each LOD in
# region colors from the front, three-quarter and side, plus key poses of the clips. A development check, not a review
# capture (those come from the game: tools/shots-review.mjs).
#
#   "C:\Program Files\Blender Foundation\Blender 5.2\blender.exe" -b art-src/blender/players/out/body-average.blend \
#       --python art-src/blender/players/preview_players.py -- [--poses=bat_stance:0.2,pitch:0.87,run:0.1]
import bpy, math, os, sys
from mathutils import Vector

argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
poses = dict((p.split(':')[0], float(p.split(':')[1])) for p in (argv[0].split('=', 1)[1].split(',') if argv and argv[0].startswith('--poses=') else
                                                                  'bat_stance:0.2,bat_swing:0.27,pitch:0.87,run:0.15,throw:0.4,crouch:0.1,field_ground:0.4,ump:0.1'.split(',')))
blend = bpy.data.filepath
out = os.path.join(os.path.dirname(blend), 'previews', os.path.splitext(os.path.basename(blend))[0])
os.makedirs(out, exist_ok=True)
sc = bpy.context.scene
sc.render.engine = 'BLENDER_WORKBENCH'
sc.display.shading.light = 'STUDIO'; sc.display.shading.color_type = 'VERTEX'
sc.display.shading.show_cavity = True
sc.render.resolution_x, sc.render.resolution_y = 768, 1024
sc.render.film_transparent = False
sc.world = sc.world or bpy.data.worlds.new('W')
cam = bpy.data.objects.new('cam', bpy.data.cameras.new('cam')); sc.collection.objects.link(cam); sc.camera = cam
cam.data.lens = 85
rig = bpy.data.objects['Rig']
for o in bpy.data.objects:  # linear skinning, like three.js (dual quaternions mangle the zero-scaled accessory bones)
    for m in o.modifiers:
        if m.type == 'ARMATURE': m.use_deform_preserve_volume = False
lods = sorted([o for o in bpy.data.objects if o.name.startswith('LOD')], key=lambda o: o.name)
# palette: region id → a plausible home uniform, so the preview reads like the game
PAL = {0: (0.95, 0.94, 0.9), 1: (0.95, 0.94, 0.9), 2: (0.45, 0.08, 0.06), 3: (0.78, 0.55, 0.42), 4: (0.45, 0.08, 0.06), 5: (0.45, 0.08, 0.06),
       6: (0.05, 0.05, 0.06), 7: (0.07, 0.07, 0.08), 8: (0.45, 0.08, 0.06), 9: (0.5, 0.3, 0.13), 10: (0.82, 0.68, 0.45), 11: (0.06, 0.06, 0.07),
       12: (0.45, 0.08, 0.06), 13: (0.95, 0.95, 0.95), 14: (0.15, 0.1, 0.07), 15: (0.45, 0.08, 0.06)}
for o in lods:
    col = o.data.color_attributes['region']
    show = o.data.color_attributes.get('show') or o.data.color_attributes.new('show', 'BYTE_COLOR', 'CORNER')
    for i, d in enumerate(col.data):
        r = int(d.color[0] * 16)
        show.data[i].color = (*PAL.get(r, (1, 0, 1)), 1)
    o.data.color_attributes.active_color = show
# hide accessories except cap and glove (as a fielder): scale their bones to ~0
def acc(on):
    for n in ('cap', 'helmet', 'mask', 'gear', 'shinguard_l', 'shinguard_r', 'glove', 'bat'):
        rig.pose.bones[n].scale = (1, 1, 1) if n in on else (1e-4, 1e-4, 1e-4)
h = max((lods[0].matrix_world @ v.co).z for v in lods[0].data.vertices)

def shoot(name, yaw, lod_i, height=h):
    for i, o in enumerate(lods): o.hide_render = i != lod_i
    d = 22
    target = Vector((0, 0, height * 0.52))
    cam.location = target + Vector((math.sin(yaw) * d, -math.cos(yaw) * d, 0.6))
    cam.rotation_euler = (target - cam.location).to_track_quat('-Z', 'Y').to_euler()
    sc.render.filepath = os.path.join(out, name + '.png'); bpy.ops.render.render(write_still=True)

if rig.animation_data: rig.animation_data.action = None
for tr in (rig.animation_data.nla_tracks if rig.animation_data else []): tr.mute = True
acc({'cap', 'glove'})
for i in range(len(lods)):
    for nm, yaw in (('front', 0.0), ('q34', 0.75), ('side', 1.5708), ('back', 3.1416)):
        shoot(f'L{i}-{nm}', yaw, i)
# key poses (LOD0): solo one NLA track at the clip time
for clip, t in poses.items():
    trs = rig.animation_data.nla_tracks if rig.animation_data else []
    tr = next((x for x in trs if x.name == clip), None)
    if not tr: continue
    for x in trs: x.mute = x is not tr
    acc({'helmet', 'bat'} if clip.startswith('bat') else {'mask', 'gear', 'shinguard_l', 'shinguard_r', 'glove', 'helmet'} if clip == 'crouch' else {'mask', 'gear', 'cap'} if clip == 'ump' else {'cap', 'glove'})
    sc.frame_set(int(round(tr.strips[0].frame_start + t * sc.render.fps)))
    shoot(f'pose-{clip}', 0.75, 0)
    shoot(f'pose-{clip}-side', 1.5708, 0)
print('PREVIEWS', out)
