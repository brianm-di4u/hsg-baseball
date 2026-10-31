"""Build one MPFB2 human headless and export it (GLB and/or .blend) with stats.

Run with the isolated Blender profile that has MPFB installed:
  BLENDER_USER_RESOURCES=<repo>/art-src/samples/_blender-user \
  blender.exe -b --factory-startup --python mpfb_build.py -- \
      --name athletic_male --rig game_engine --glb out.glb --stats out.json [--blend out.blend]
      [--proxy male_muscle_13290.proxy] [--skin-type GAMEENGINE|ENHANCED_SSS] [--subdiv 0|1] [--hires]
"""
import argparse, json, os, sys

import addon_utils
import bpy

argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
ap = argparse.ArgumentParser()
ap.add_argument("--name", default="athletic_male")
ap.add_argument("--rig", default="game_engine")
ap.add_argument("--proxy", default="")
ap.add_argument("--skin", default="young_caucasian_male.mhmat")
ap.add_argument("--skin-type", default="GAMEENGINE")
ap.add_argument("--subdiv", type=int, default=0)
ap.add_argument("--hires", action="store_true", help="high-poly eyes, eyebrows, lashes, teeth (reference build)")
ap.add_argument("--gender", type=float, default=1.0)
ap.add_argument("--age", type=float, default=0.5)
ap.add_argument("--muscle", type=float, default=0.8)
ap.add_argument("--weight", type=float, default=0.55)
ap.add_argument("--height", type=float, default=0.62)
ap.add_argument("--proportions", type=float, default=0.8)
ap.add_argument("--hair", default="", help="e.g. short02.mhclo")
ap.add_argument("--clothes", default="", help="comma-separated .mhclo names, e.g. shoes01.mhclo")
ap.add_argument("--glb", default="")
ap.add_argument("--blend", default="")
ap.add_argument("--stats", default="")
args = ap.parse_args(argv)

addon_utils.enable("bl_ext.user_default.mpfb", default_set=True, persistent=True)
from bl_ext.user_default.mpfb.services.humanservice import HumanService  # noqa: E402
from bl_ext.user_default.mpfb.services.exportservice import ExportService  # noqa: E402
from bl_ext.user_default.mpfb.services.targetservice import TargetService  # noqa: E402
from bl_ext.user_default.mpfb.services.objectservice import ObjectService  # noqa: E402

for o in list(bpy.data.objects):
    bpy.data.objects.remove(o, do_unlink=True)

info = HumanService._create_default_human_info_dict()
info["name"] = args.name
info["phenotype"].update(gender=args.gender, age=args.age, muscle=args.muscle, weight=args.weight,
                         height=args.height, proportions=args.proportions)
info["rig"] = args.rig
info["proxy"] = args.proxy
info["skin_mhmat"] = args.skin
info["skin_material_type"] = args.skin_type
info["eyes"] = "high-poly.mhclo" if args.hires else "low-poly.mhclo"
info["eyebrows"] = "eyebrow001.mhclo"
info["eyelashes"] = "eyelashes01.mhclo"
if args.hires:
    info["teeth"] = "teeth_base.mhclo"
    info["tongue"] = "tongue01.mhclo"
info["eyes_material_type"] = "PROCEDURAL_EYES" if args.hires else "MAKESKIN"
info["hair"] = args.hair
info["clothes"] = [c for c in args.clothes.split(",") if c]

settings = HumanService.get_default_deserialization_settings()
settings["subdiv_levels"] = args.subdiv
basemesh = HumanService.deserialize_from_dict(info, settings)
rig = basemesh.parent if basemesh.parent and basemesh.parent.type == "ARMATURE" else None

# Same steps as MPFB's "Create export copy" operator, applied in place.
TargetService.bake_targets(basemesh)
ExportService.bake_modifiers_remove_helpers(basemesh, bake_masks=True, bake_subdiv=args.subdiv > 0,
                                            remove_helpers=True, also_proxy=True)
if args.proxy:
    ObjectService.delete_object(basemesh)
bpy.context.view_layer.update()

dg = bpy.context.evaluated_depsgraph_get()
meshes = []
for o in bpy.data.objects:
    if o.type != "MESH":
        continue
    ev = o.evaluated_get(dg).to_mesh()
    ev.calc_loop_triangles()
    meshes.append({"name": o.name, "verts": len(ev.vertices), "tris": len(ev.loop_triangles),
                   "materials": [m.name for m in o.data.materials if m],
                   "shape_keys": len(o.data.shape_keys.key_blocks) if o.data.shape_keys else 0,
                   "vertex_groups": len(o.vertex_groups)})
    o.evaluated_get(dg).to_mesh_clear()

xs = [v.co for o in bpy.data.objects if o.type == "MESH" for v in o.data.vertices]
stats = {
    "mpfb_version": next((m.bl_info.get("version") for m in addon_utils.modules() if m.__name__.endswith(".mpfb")), None),
    "blender": bpy.app.version_string,
    "args": vars(args),
    "rig_name": args.rig,
    "armature": rig.name if rig else None,
    "bone_count": len(rig.data.bones) if rig else 0,
    "bones": [{"name": b.name, "parent": b.parent.name if b.parent else None} for b in rig.data.bones] if rig else [],
    "meshes": meshes,
    "total_tris": sum(m["tris"] for m in meshes),
    "total_verts": sum(m["verts"] for m in meshes),
    "height_m": round(max(c.z for c in xs) - min(c.z for c in xs), 4) if xs else None,
}

if args.blend:
    bpy.ops.wm.save_as_mainfile(filepath=os.path.abspath(args.blend))
if args.glb:
    bpy.ops.export_scene.gltf(filepath=os.path.abspath(args.glb), export_format="GLB", export_skins=True,
                              export_morph=False, export_animations=False, export_apply=False,
                              export_image_format="WEBP" if args.skin_type == "GAMEENGINE" else "AUTO")
    stats["glb_bytes"] = os.path.getsize(os.path.abspath(args.glb))
if args.stats:
    with open(args.stats, "w", encoding="utf-8") as f:
        json.dump(stats, f, indent=1)
print("MPFB_STATS", json.dumps({k: stats[k] for k in ("rig_name", "bone_count", "total_tris", "total_verts", "height_m")}))
