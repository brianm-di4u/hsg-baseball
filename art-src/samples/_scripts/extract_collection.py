"""Keep one collection of a .blend, report its stats, and save it as a new .blend for render_turnaround.py.

  blender.exe -b -Y --factory-startup <src.blend> --python extract_collection.py -- \
      --collection "Body Male - Realistic" --out ref.blend --stats ref.json [--multires-render-level N]
(-Y keeps scripts embedded in a downloaded .blend from auto-running.)
"""
import argparse, json, os, sys

import bpy

argv = sys.argv[sys.argv.index("--") + 1:]
ap = argparse.ArgumentParser()
ap.add_argument("--collection", required=True)
ap.add_argument("--out", required=True)
ap.add_argument("--stats", default="")
ap.add_argument("--multires-render-level", type=int, default=-1, help="-1 keeps the file's own setting")
a = ap.parse_args(argv)

col = bpy.data.collections[a.collection]
keep = set(col.all_objects)
scene = bpy.context.scene
if col.name not in scene.collection.children:
    scene.collection.children.link(col)
for o in list(bpy.data.objects):
    if o not in keep:
        bpy.data.objects.remove(o, do_unlink=True)
for c in list(bpy.data.collections):
    if c is not col and not c.all_objects:
        bpy.data.collections.remove(c)
for o in keep:
    o.hide_render = False
    o.hide_set(False)
    for m in o.modifiers:
        if m.type == "MULTIRES" and a.multires_render_level >= 0:
            m.render_levels = min(a.multires_render_level, m.total_levels)
bpy.ops.outliner.orphans_purge(do_recursive=True)

stats = {"source": bpy.data.filepath, "collection": a.collection, "objects": []}
dg = bpy.context.evaluated_depsgraph_get()
for o in keep:
    if o.type != "MESH":
        continue
    levels = {m.name: [m.levels, m.render_levels, m.total_levels] for m in o.modifiers if m.type == "MULTIRES"}
    ev = o.evaluated_get(dg).to_mesh()
    ev.calc_loop_triangles()
    stats["objects"].append({"name": o.name, "base_polys": len(o.data.polygons), "eval_tris_viewport": len(ev.loop_triangles),
                             "multires": levels, "dimensions": list(o.dimensions)})
    o.evaluated_get(dg).to_mesh_clear()
bpy.ops.wm.save_as_mainfile(filepath=os.path.abspath(a.out), copy=True)
if a.stats:
    with open(a.stats, "w", encoding="utf-8") as f:
        json.dump(stats, f, indent=1)
print("EXTRACT", json.dumps(stats["objects"]))
