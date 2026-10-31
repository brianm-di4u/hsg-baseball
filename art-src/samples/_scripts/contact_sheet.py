"""Tile PNGs into one contact sheet (headless Blender, numpy only).

  blender.exe -b --factory-startup --python contact_sheet.py -- --out sheet.png --cell 384 --cols 4 a.png b.png ...
"""
import argparse, sys

import bpy
import numpy as np

argv = sys.argv[sys.argv.index("--") + 1:]
ap = argparse.ArgumentParser()
ap.add_argument("--out", required=True)
ap.add_argument("--cell", type=int, default=384)
ap.add_argument("--cols", type=int, default=4)
ap.add_argument("files", nargs="+")
a = ap.parse_args(argv)

c, cols = a.cell, a.cols
rows = (len(a.files) + cols - 1) // cols
sheet = np.ones((rows * c, cols * c, 4), dtype=np.float32)
for i, f in enumerate(a.files):
    im = bpy.data.images.load(f)
    w, h = im.size
    px = np.array(im.pixels[:], dtype=np.float32).reshape(h, w, 4)
    ys = (np.arange(c) * h / c).astype(int)
    xs = (np.arange(c) * w / c).astype(int)
    r, col = divmod(i, cols)
    # Blender pixel rows start at the bottom; sheet rows too, so flip the row index.
    rr = rows - 1 - r
    sheet[rr * c:(rr + 1) * c, col * c:(col + 1) * c] = px[ys][:, xs]
    bpy.data.images.remove(im)
out = bpy.data.images.new("sheet", cols * c, rows * c, alpha=True)
out.pixels.foreach_set(sheet.ravel())
out.filepath_raw = a.out
out.file_format = "PNG"
out.save()
