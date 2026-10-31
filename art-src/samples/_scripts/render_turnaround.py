"""Render fixed reference turnarounds of one character (headless Blender 5.2).

  blender.exe -b --factory-startup --python render_turnaround.py -- \
      --input model.blend|model.glb|model.fbx|model.obj --out <dir> --prefix <id> [--res 1024] [--engine EEVEE|CYCLES]
      [--forward -Y] [--hand-side right|left]

Views: front, three_quarter, side (character's left), back, face, face_34, hand.
For each view it writes <prefix>_<view>.png (over neutral grey 0.5 sRGB) and <prefix>_<view>_mask.png
(alpha silhouette), plus <prefix>_cameras.json with every camera's intrinsics/extrinsics.
The character is normalized so its feet sit on z=0 and it faces -Y (Blender convention); the JSON records
the normalization so game captures can be matched.
"""
import argparse, json, math, os, sys

import bpy
import numpy as np
from mathutils import Matrix, Vector

argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
ap = argparse.ArgumentParser()
ap.add_argument("--input", required=True)
ap.add_argument("--out", required=True)
ap.add_argument("--prefix", required=True)
ap.add_argument("--res", type=int, default=1024)
ap.add_argument("--engine", default="CYCLES")
ap.add_argument("--samples", type=int, default=128)
ap.add_argument("--forward", default="-Y", help="axis the character faces after import: -Y, +Y, +X, -X")
ap.add_argument("--hand-side", default="right")
ap.add_argument("--fov", type=float, default=30.0, help="vertical FOV in degrees for body views")
args = ap.parse_args(argv)

GREY = 0.5  # sRGB background value
args.out = os.path.abspath(args.out)
os.makedirs(args.out, exist_ok=True)
src = os.path.abspath(args.input)
ext = os.path.splitext(src)[1].lower()

if ext == ".blend":
    bpy.ops.wm.open_mainfile(filepath=src)
    for o in list(bpy.data.objects):
        if o.type in {"CAMERA", "LIGHT"}:
            bpy.data.objects.remove(o, do_unlink=True)
else:
    bpy.ops.wm.read_factory_settings(use_empty=True)
    if ext in {".glb", ".gltf"}:
        bpy.ops.import_scene.gltf(filepath=src)
    elif ext == ".fbx":
        bpy.ops.import_scene.fbx(filepath=src)
    elif ext == ".obj":
        bpy.ops.wm.obj_import(filepath=src)
    else:
        raise SystemExit("unsupported input " + ext)

scene = bpy.context.scene
# The glTF importer adds a bone-display "Icosphere" in a glTF_not_exported collection: never render or measure it.
for o in list(scene.objects):
    if any(c.name.startswith("glTF_not_exported") for c in o.users_collection):
        bpy.data.objects.remove(o, do_unlink=True)
meshes = [o for o in scene.objects if o.type == "MESH" and not o.hide_render]
if not meshes:
    raise SystemExit("no meshes")

# Normalize: rotate so the character faces -Y, then feet on z=0 and centred on x/y.
yaw = {"-Y": 0.0, "+Y": math.pi, "+X": -math.pi / 2, "-X": math.pi / 2}[args.forward]
root = bpy.data.objects.new("__ref_root", None)
scene.collection.objects.link(root)
for o in scene.objects:
    if o.parent is None and o is not root:
        o.parent = root
root.rotation_euler = (0, 0, yaw)
bpy.context.view_layer.update()

dg = bpy.context.evaluated_depsgraph_get()
pts = []
for o in meshes:
    ev = o.evaluated_get(dg)
    m = ev.to_mesh()
    mw = o.matrix_world
    co = np.empty(len(m.vertices) * 3, dtype=np.float64)
    m.vertices.foreach_get("co", co)
    co = co.reshape(-1, 3)
    M = np.array(mw)
    pts.append(co @ M[:3, :3].T + M[:3, 3])
    ev.to_mesh_clear()
P = np.concatenate(pts)
lo, hi = P.min(0), P.max(0)
root.location = (-(lo[0] + hi[0]) / 2, -(lo[1] + hi[1]) / 2, -lo[2])
bpy.context.view_layer.update()
P = P + np.array(root.location)
lo, hi = P.min(0), P.max(0)
H = float(hi[2] - lo[2])
center = Vector(((lo[0] + hi[0]) / 2, (lo[1] + hi[1]) / 2, H / 2))

# Regions for close-ups, from the vertex cloud (works without a rig, for A/T poses).
head_pts = P[P[:, 2] > hi[2] - 0.13 * H]
head_c = Vector(head_pts.mean(0)); head_c.z = float(hi[2] - 0.065 * H)
# Character's right side is -X when facing -Y.
side = -1 if args.hand_side == "right" else 1
band = P[(P[:, 2] > 0.25 * H) & (P[:, 2] < 0.75 * H)]
ext_x = band[:, 0].min() if side < 0 else band[:, 0].max()
hand_pts = band[np.abs(band[:, 0] - ext_x) < 0.06 * H]
hand_c = Vector(hand_pts.mean(0))
hand_fh = 0.16 * H
# Bones beat heuristics when present: frame the wrist-to-fingertip span.
arm = next((o for o in scene.objects if o.type == "ARMATURE"), None)
bone_used = {}
if arm:
    names = {b.name.lower(): b.name for b in arm.pose.bones}
    want = ["hand_r", "hand.r", "righthand", "mixamorig:righthand", "r_hand"] if side < 0 else \
           ["hand_l", "hand.l", "lefthand", "mixamorig:lefthand", "l_hand"]
    for w in want:
        if w in names:
            pb = arm.pose.bones[names[w]]
            wrist = arm.matrix_world @ pb.head
            tips = [arm.matrix_world @ c.tail for c in pb.children_recursive] or [arm.matrix_world @ pb.tail]
            tip = max(tips, key=lambda t: (t - wrist).length)
            hand_c = (wrist + tip) / 2
            hand_fh = max(1.5 * (tip - wrist).length, 0.08 * H)
            bone_used["hand"] = names[w]
            bone_used["fingertip_from"] = len(tips)
            break

# World, lights, colour management.
world = bpy.data.worlds.new("ref_world") if not scene.world else scene.world
scene.world = world
if hasattr(world, "use_nodes") and not world.node_tree:
    world.use_nodes = True
bg = world.node_tree.nodes.get("Background") or world.node_tree.nodes.new("ShaderNodeBackground")
bg.inputs[0].default_value = (0.214, 0.214, 0.214, 1)  # linear of sRGB 0.5
bg.inputs[1].default_value = 0.6
scene.view_settings.view_transform = "Standard"
scene.view_settings.look = "None"
scene.render.film_transparent = True
scene.render.resolution_x = scene.render.resolution_y = args.res
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = "PNG"
scene.render.image_settings.color_mode = "RGBA"
if args.engine.upper().startswith("EEVEE"):
    scene.render.engine = "BLENDER_EEVEE" if "BLENDER_EEVEE" in bpy.types.RenderSettings.bl_rna.properties["engine"].enum_items.keys() else "BLENDER_EEVEE_NEXT"
    scene.eevee.taa_render_samples = args.samples
else:
    scene.render.engine = "CYCLES"
    scene.cycles.samples = args.samples
    scene.cycles.use_denoising = True
    scene.cycles.seed = 0
    cprefs = bpy.context.preferences.addons["cycles"].preferences
    for backend in ("OPTIX", "CUDA", "HIP", "ONEAPI"):
        try:
            cprefs.compute_device_type = backend
            cprefs.get_devices()
            gpus = [d for d in cprefs.devices if d.type == backend]
            if gpus:
                for d in cprefs.devices:
                    d.use = d.type == backend
                break
        except TypeError:
            continue
    else:
        backend = "CPU"
    scene.cycles.device = "GPU" if backend != "CPU" else "CPU"


def light(name, energy, rot_deg, angle_deg):
    d = bpy.data.lights.new(name, "SUN")
    d.energy = energy
    d.angle = math.radians(angle_deg)  # soft sun so shadows don't carve hard wedges into the face
    o = bpy.data.objects.new(name, d)
    scene.collection.objects.link(o)
    o.rotation_euler = [math.radians(a) for a in rot_deg]
    return {"name": name, "type": "SUN", "energy": energy, "rotation_deg": rot_deg, "angle_deg": angle_deg}


lights = [light("key", 3.0, (45, 0, -30), 20), light("fill", 1.3, (70, 0, 55), 40),
          light("rim", 2.0, (60, 0, 180), 10)]  # rim from behind
for o in scene.objects:
    if o.type == "LIGHT":
        o.data.use_shadow = True

cam_d = bpy.data.cameras.new("ref_cam")
cam = bpy.data.objects.new("ref_cam", cam_d)
scene.collection.objects.link(cam)
scene.camera = cam
cam_d.sensor_fit = "VERTICAL"
cam_d.clip_start, cam_d.clip_end = 0.01, 100


def place(target, yaw_deg, pitch_deg, frame_h, fov):
    """Camera looking at target from azimuth yaw (0 = in front, on -Y), framing frame_h metres vertically."""
    cam_d.angle_y = math.radians(fov)
    dist = (frame_h / 2) / math.tan(math.radians(fov) / 2)
    yr, pr = math.radians(yaw_deg), math.radians(pitch_deg)
    off = Vector((math.sin(yr) * math.cos(pr), -math.cos(yr) * math.cos(pr), math.sin(pr))) * dist
    cam.location = target + off
    cam.rotation_euler = (target - cam.location).to_track_quat("-Z", "Y").to_euler()
    return dist


body_h = H * 1.12
views = [
    ("front", center, 0, 0, body_h, args.fov),
    ("three_quarter", center, 45, 0, body_h, args.fov),
    ("side", center, 90, 0, body_h, args.fov),  # from character's left (+X)
    ("back", center, 180, 0, body_h, args.fov),
    ("face", head_c, 0, 0, 0.30 * H / 1.8 * 1.0, 20.0),
    ("face_34", head_c, 40, 0, 0.30 * H / 1.8 * 1.0, 20.0),
    ("hand", hand_c, -25 if side < 0 else 25, 20, hand_fh, 20.0),
]

out = {"input": os.path.basename(src), "prefix": args.prefix, "resolution": [args.res, args.res],
       "engine": scene.render.engine, "device": getattr(scene.cycles, "device", None) if scene.render.engine == "CYCLES" else "GPU", "samples": args.samples, "blender": bpy.app.version_string,
       "background_srgb": GREY, "view_transform": "Standard",
       "convention": "Blender Z-up metres; character faces -Y; feet on z=0; yaw 0 = camera on -Y looking +Y; "
                     "yaw 90 = camera on +X (character's left). three.js: x=x, y=z, z=-y.",
       "normalization": {"yaw_rad": yaw, "translate": list(root.location)},
       "bbox_min": lo.tolist(), "bbox_max": hi.tolist(), "height_m": H,
       "regions": {"head_center": list(head_c), "hand_center": list(hand_c), "hand_side": args.hand_side,
                   "bones_used": bone_used},
       "lights": lights, "views": []}

for name, tgt, yawd, pitchd, fh, fov in views:
    dist = place(Vector(tgt), yawd, pitchd, fh, fov)
    bpy.context.view_layer.update()
    rgba = os.path.join(args.out, f"{args.prefix}_{name}_rgba.png")
    scene.render.filepath = rgba
    bpy.ops.render.render(write_still=True)
    img = bpy.data.images.load(rgba)
    px = np.array(img.pixels[:], dtype=np.float32).reshape(args.res, args.res, 4)
    a = px[..., 3:4]
    comp = px.copy()
    comp[..., :3] = px[..., :3] * a + GREY * (1 - a)  # pixels are display-space sRGB for PNG
    comp[..., 3] = 1
    for suffix, data in (("", comp), ("_mask", np.repeat(a, 4, axis=2).clip(0, 1))):
        if suffix == "_mask":
            data[..., 3] = 1
        im = bpy.data.images.new(f"{name}{suffix}", args.res, args.res, alpha=True)
        im.pixels.foreach_set(data.ravel())
        im.filepath_raw = os.path.join(args.out, f"{args.prefix}_{name}{suffix}.png")
        im.file_format = "PNG"
        im.save()
        bpy.data.images.remove(im)
    bpy.data.images.remove(img)
    os.remove(rgba)
    mw = cam.matrix_world
    out["views"].append({
        "view": name, "file": f"{args.prefix}_{name}.png", "mask": f"{args.prefix}_{name}_mask.png",
        "target": list(tgt), "yaw_deg": yawd, "pitch_deg": pitchd, "distance_m": dist,
        "frame_height_m": fh, "fov_y_deg": fov, "lens_mm": cam_d.lens, "sensor_fit": "VERTICAL",
        "sensor_height_mm": cam_d.sensor_height, "clip": [cam_d.clip_start, cam_d.clip_end],
        "location": list(cam.location), "rotation_euler_xyz_rad": list(cam.rotation_euler),
        "matrix_world": [list(r) for r in mw],
        "silhouette_px": int((a > 0.5).sum()),
    })

with open(os.path.join(args.out, f"{args.prefix}_cameras.json"), "w", encoding="utf-8") as f:
    json.dump(out, f, indent=1)
print("REF_DONE", args.prefix, H)
