# Loop 6 changes (facts only)

## Players
- **Jersey lettering and back number** are skinned decal meshes. Each is a grid laid onto the dressed torso by rays, 0.03 ft proud of the cloth, carrying the nearest body vertex's skin weights. It wraps the chest and bends with every pose (was a flat plane on the chest bone).
  - The front word spans 0.92 × 0.26 ft, across the chest only.
  - The back number spans 0.85 × 0.85 ft.
  - On mirrored (left-handed) rigs the decal texture is drawn mirrored.
- **Masks:** the catcher's and umpire's cage spans chin to brow again. It had slid to chest height when the cap band moved up.
- **Skin self-light:** raised (16% of albedo plus a small constant), so faces under brims and helmets keep their features.
- **Batting helmets:** less mirror-like (roughness 0.38, was 0.28).
- **Builds:** pulled part way back toward the reference athlete. Lean is weight 0.36 and height 0.72; stocky is weight 0.9 and height 0.5.
- **Headwear shadows:** caps and helmets no longer cast sun or tower shadows: a custom shadow-depth material discards those regions. A brim's shadow had blacked out the face under it; the headwear itself is still lit and visible.
- **Batting helmet ear flaps** continue the shell down over each ear in three rows, curving in under the cheekbone (were flat cards).
- **Low tier** (software GL, slow devices) keeps the plain cone-and-ball trees. The tiered trees cost software GL about 3 fps (loop-5 perf gate).

## After the captures (not in this loop's images)
- **Phone pack size:** the medium pack had grown to 4.04 MB, over its 4 MB budget (the loop-5 commit went in with that test failing). Jersey decal grids are coarser (28 × 8 front, 28 × 14 back; were 36 × 10 and 36 × 20) and the 1024² skin maps are saved at WebP quality 72 (was 82). Medium pack is now 3.63 MB, high 8.27 MB; the perf test passes.
