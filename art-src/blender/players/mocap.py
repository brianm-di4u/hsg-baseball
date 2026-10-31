# CMU motion capture → the v3 players' clips (imported by build_players.py, which runs it for the average build).
#
# Each clip is a CMU BVH take (art-src/samples/cmu-mocap-bvh/, free for any use; see SAMPLES.md), turned so the
# action faces the model's front (-Y), cut around its key event and time-warped so that event lands where the game
# expects it (the sim's timing is fixed): pitch release at 0.867 s, bat contact at 0.267 s, throw release at
# 0.333 s. The run is one gait cycle, in place, resampled to the game's 16-frame loop. Each pose is retargeted with
# a world-space delta and a rest alignment (the same method build_players.retarget uses for the v2 clips).
import math, os
import bpy
from mathutils import Matrix, Vector

FT = 3.28084
BVH_SCALE = 0.056444 * FT  # CMU units → feet (research/character-sources.md: 0.056444 gives metres)
MAP = {'Hips': 'pelvis', 'LowerBack': 'spine_01', 'Spine': 'spine_02', 'Spine1': 'spine_03', 'Neck': 'neck_01', 'Head': 'head',
       'LeftShoulder': 'clavicle_l', 'LeftArm': 'upperarm_l', 'LeftForeArm': 'lowerarm_l', 'LeftHand': 'hand_l',
       'RightShoulder': 'clavicle_r', 'RightArm': 'upperarm_r', 'RightForeArm': 'lowerarm_r', 'RightHand': 'hand_r',
       'LeftUpLeg': 'thigh_l', 'LeftLeg': 'calf_l', 'LeftFoot': 'foot_l', 'LeftToeBase': 'ball_l',
       'RightUpLeg': 'thigh_r', 'RightLeg': 'calf_r', 'RightFoot': 'foot_r', 'RightToeBase': 'ball_r'}
FPS = 30


def load(path):
    before = set(bpy.data.objects)
    bpy.ops.import_anim.bvh(filepath=path, global_scale=BVH_SCALE, rotate_mode='NATIVE', axis_forward='-Z', axis_up='Y',
                            use_fps_scale=False, update_scene_fps=False, update_scene_duration=False)
    o = next(x for x in bpy.data.objects if x not in before)
    o.animation_data.action.use_fake_user = True
    return o


def track(o, bone, f0, f1):
    """World positions of a bone's head over source frames f0..f1."""
    out = []
    for f in range(f0, f1 + 1):
        bpy.context.scene.frame_set(f)
        out.append((o.matrix_world @ o.pose.bones[bone].head).copy())
    return out


def speed_peak(o, bone, f0, f1):
    p = track(o, bone, f0, f1)
    sp = [(p[i + 1] - p[i - 1]).length for i in range(1, len(p) - 1)]
    i = max(range(len(sp)), key=lambda k: sp[k])
    return f0 + 1 + i, sp


def face(o, d):
    """Turn the take about the vertical so the horizontal direction d points along -Y (the model's front)."""
    d = Vector((d.x, d.y, 0))
    if d.length < 1e-6: return
    a = math.atan2(d.y, d.x)
    o.rotation_euler.z += -math.pi / 2 - a
    bpy.context.view_layer.update()


def hips_forward(o, f):
    bpy.context.scene.frame_set(f)
    l = o.matrix_world @ o.pose.bones['LeftUpLeg'].head; r = o.matrix_world @ o.pose.bones['RightUpLeg'].head
    return (l - r).cross(Vector((0, 0, 1)))


def depth(b):
    d = 0
    while b.parent: b = b.parent; d += 1
    return d


def retarget(src, dst, name, samples, travel='keep', cyclic=False):
    """Key dst at 30 fps from src at the given (fractional) source frames. travel: 'keep' = the hips' horizontal travel
    from the first sample; 'none' = in place (horizontal drift removed)."""
    sc = bpy.context.scene
    sw, dw = src.matrix_world, dst.matrix_world
    pairs = [(s, t) for s, t in MAP.items() if s in src.pose.bones and t in dst.pose.bones]
    s_rest = {s: (sw @ src.data.bones[s].matrix_local).to_quaternion() for s, _ in pairs}
    d_rest = {s: (dw @ dst.data.bones[t].matrix_local).to_quaternion() for s, t in pairs}
    align = {}
    for s, t in pairs:
        sb, db = src.data.bones[s], dst.data.bones[t]
        sd = (sw.to_3x3() @ (sb.tail_local - sb.head_local)).normalized()
        dd = (dw.to_3x3() @ (db.tail_local - db.head_local)).normalized()
        align[s] = dd.rotation_difference(sd)
    order = sorted(pairs, key=lambda p: depth(dst.data.bones[p[1]]))
    for pb in dst.pose.bones: pb.rotation_mode = 'QUATERNION'
    # hips path: start point and (for in-place clips) linear drift
    def hips_at(fs):
        sc.frame_set(int(fs), subframe=fs - int(fs)); return (sw @ src.pose.bones['Hips'].head).copy()
    h0, h1 = hips_at(samples[0]), hips_at(samples[-1])
    # the BVH's rest skeleton sits at the origin: its standing hip height comes from frame 1 (the T-pose)
    href = hips_at(1)
    hip_ratio = (dw @ dst.data.bones['pelvis'].head_local).z / href.z
    old = dst.animation_data.nla_tracks.get(name) if dst.animation_data else None
    if old: dst.animation_data.nla_tracks.remove(old)
    dst.animation_data_create()
    act = bpy.data.actions.new(name); dst.animation_data.action = act
    for k, fs in enumerate(samples):
        sc.frame_set(int(fs), subframe=fs - int(fs))
        hp = (sw @ src.pose.bones['Hips'].head).copy()
        off = hp - h0
        if travel == 'none': off -= (h1 - h0) * (k / max(1, len(samples) - 1))
        off.z = hp.z - href.z  # height relative to standing
        for s, t in order:
            pb = dst.pose.bones[t]
            q = (sw @ src.pose.bones[s].matrix).to_quaternion() @ s_rest[s].inverted() @ align[s] @ d_rest[s]
            loc = pb.matrix.to_translation()
            if t == 'pelvis':
                base = dw @ dst.data.bones['pelvis'].head_local
                loc = dw.inverted() @ (base + Vector((off.x, off.y, 0)) * hip_ratio + Vector((0, 0, off.z * hip_ratio)))
            pb.matrix = Matrix.LocRotScale(loc, dw.to_quaternion().inverted() @ q, Vector((1, 1, 1)))
            bpy.context.view_layer.update()
        for s, t in order:
            pb = dst.pose.bones[t]
            pb.keyframe_insert('rotation_quaternion', frame=k + 1)
            if t == 'pelvis': pb.keyframe_insert('location', frame=k + 1)
    act.use_fake_user = True
    if cyclic: act.use_cyclic = True
    tr = dst.animation_data.nla_tracks.new(); tr.name = name
    tr.strips.new(name, 1, act)
    dst.animation_data.action = None
    for pb in dst.pose.bones: pb.matrix_basis = Matrix()
    return len(samples)


def warp(pieces):
    """Output frames at 30 fps from [(out_t0, out_t1, src_f0, src_f1), ...] linear pieces (times in seconds)."""
    out, end = [], pieces[-1][1]
    n = int(round(end * FPS)) + 1
    for k in range(n):
        t = k / FPS
        for a, b, s0, s1 in pieces:
            if t <= b + 1e-6:
                u = 0 if b == a else (t - a) / (b - a); out.append(s0 + (s1 - s0) * max(0, min(1, u))); break
    return out


def build(dst, root, log):
    """Retarget the CMU clips onto dst (the average build's rig). Returns the clip names made."""
    made = []
    bvh = lambda n: os.path.join(root, 'art-src', 'samples', 'cmu-mocap-bvh', n + '.bvh')
    sc = bpy.context.scene
    # ---- pitch (124_01): release = peak right-hand speed; the delivery from the first leg lift
    o = load(bvh('124_01')); n = int(o.animation_data.action.frame_range[1])
    rel, _ = speed_peak(o, 'RightHand', 2, n)
    lf = track(o, 'LeftFoot', 2, rel); base = min(p.z for p in lf[:60])
    lift = next((2 + i for i, p in enumerate(lf) if p.z > base + 0.25), rel - 120)  # left knee comes up
    h_lift, h_rel = track(o, 'Hips', lift, lift)[0], track(o, 'Hips', rel, rel)[0]
    face(o, h_rel - h_lift)  # stride toward the plate = the model's front
    s0 = max(2, lift - 40)  # the set, just before the lift
    made.append(('pitch', retarget(o, dst, 'pitch', warp([(0, 0.867, s0, rel), (0.867, 1.4, rel, min(n, rel + 64))]))))
    log(f'pitch: 124_01 frames {s0}-{rel}-{rel + 64} (release {rel})')
    bpy.data.objects.remove(o)
    # ---- swing (124_07): contact = peak right-hand speed in the first swing; stance = the held pose before it
    o = load(bvh('124_07')); n = int(o.animation_data.action.frame_range[1])
    half = min(n, 2 + 600)
    con, sp = speed_peak(o, 'RightHand', 2, half)
    start = con - 42  # 0.35 s of load and stride before contact
    face(o, hips_forward(o, start))
    made.append(('bat_swing', retarget(o, dst, 'bat_swing', warp([(0, 0.267, start, con), (0.267, 0.867, con, min(n, con + 72))]))))
    made.append(('bat_stance', retarget(o, dst, 'bat_stance', warp([(0, 1.0, start - 60, start - 30), (1.0, 2.0, start - 30, start - 60)]), cyclic=True)))
    log(f'swing: 124_07 contact {con}, start {start}')
    bpy.data.objects.remove(o)
    # ---- throw (143_20): release = peak right-hand speed
    o = load(bvh('143_20')); n = int(o.animation_data.action.frame_range[1])
    rel, _ = speed_peak(o, 'RightHand', 2, n)
    a, b = track(o, 'Hips', rel - 40, rel - 40)[0], track(o, 'Hips', rel, rel)[0]
    face(o, (b - a) if (b - a).length > 0.3 else hips_forward(o, rel - 40))
    made.append(('throw', retarget(o, dst, 'throw', warp([(0, 0.333, rel - 40, rel), (0.333, 0.8, rel, min(n, rel + 56))]))))
    log(f'throw: 143_20 release {rel}')
    bpy.data.objects.remove(o)
    # ---- run (09_01): one gait cycle (left foot strike to left foot strike), in place, as 16 frames (0.533 s)
    o = load(bvh('09_01')); n = int(o.animation_data.action.frame_range[1])
    lf = track(o, 'LeftFoot', 2, n)
    lows = [i for i in range(2, len(lf) - 2) if lf[i].z <= min(lf[i - 2].z, lf[i - 1].z, lf[i + 1].z, lf[i + 2].z)]
    lows = [i + 2 for i in lows if lf[i].z < min(p.z for p in lf) + 0.15]
    mid = [i for i in lows if i > n * 0.3] or lows
    c0 = mid[0]; c1 = next((i for i in mid if i > c0 + 40), c0 + 80)
    h0, h1 = track(o, 'Hips', c0, c0)[0], track(o, 'Hips', c1, c1)[0]
    face(o, h1 - h0)
    made.append(('run', retarget(o, dst, 'run', [c0 + (c1 - c0) * k / 16 for k in range(17)], travel='none', cyclic=True)))
    log(f'run: 09_01 cycle {c0}-{c1}')
    bpy.data.objects.remove(o)
    return [m for m, _ in made]
