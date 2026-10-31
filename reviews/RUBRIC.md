# Visual review rubric: Diamond Springs (baseball), v3

Each review scores 8 categories from 1 to 10 in 0.5 steps. The anchors below say what a 3, 5, 7 and 9 look like; scores in between interpolate. Score what is **on screen in the captures**: intent, plans and code don't count.

The comparison set:
- `benchmarks/` (git-ignored; see its README): Super Mega Baseball 3 and 4, OOTP 26, Backyard Baseball '97.
- `art-src/samples/reference-renders/`, once it exists: turnarounds of the best free realistic player models. This is the "accurate" top end for characters.

**Evidence rule.** Every category score cites at least 2 captures (a frame, a close-up or a strip). `animation` must cite at least one motion strip, and `characters` and `charfit` at least one close-up. An uncited score is invalid and the judge drops it.

**Tier.** Unless the brief says otherwise, score the **high** tier on desktop. `mobile` is scored from the mobile and landscape captures. Medium and low are checked only for regressions; name any you see.

**Performance gate (not scored).** `perf.json` must meet the thresholds in `VISUAL-PLAN-3.md`. A loop that fails them is not an improvement, whatever it scores. Reviewers report what they see in the perf table but don't score it.

## Gates (the loop's stop rule)

| Category | key | Gate |
|---|---|---|
| Characters | `characters` | ≥ 7.5 |
| Fidelity to reference | `charfit` | ≥ 7 |
| Animation & game feel | `animation` | ≥ 7 |
| Environment | `environment` | ≥ 7 |
| Lighting & atmosphere | `lighting` | ≥ 7 |
| UI & typography | `ui` | ≥ 7 |
| Readability | `readability` | ≥ 7 |
| Mobile | `mobile` | ≥ 7 |

## Anchors

### Characters (`characters`): players, umpire and coaches as models
Covers anatomy, face, hands, uniform and cloth, gear (helmet, cap, glove, catcher's gear, cleats, bat), materials and body variety.
- **3**: capsule or tube bodies, mitten hands, a drawn-on face, one body type, flat palette colors.
- **5**: a clean low-poly figure with a consistent style. Separate fingers or a modelled glove, a readable cap and helmet. Uniforms are color blocks with no cloth detail. Faces are simple but not uncanny.
- **7**: believable athletic anatomy, with a readable shoulder, hip and knee structure. A face with real features that holds up in close-ups, and hands that grip the bat. The uniform reads as cloth: placket, sleeves, belt, folds, stirrups or socks. Materials contrast: glossy helmet, matte flannel, leather glove. At least 3 visibly different body types. Benchmarks: smb3-3, smb4-2, smb4-4 (stylised 7–8).
- **9**: near-realistic: sculpted faces with variety, stitched leather, cloth folds that move with the pose, dirt and wear. The reference renders at game resolution.

### Fidelity to reference (`charfit`): how close the in-game players are to the realistic reference set
Compare the close-ups (`crops/`) against `art-src/samples/reference-renders/`. Weigh the objective numbers in the brief (`fidelity.json`: silhouette IoU and pixel error at game distances), but score what you see.
- **3**: proportions clearly wrong (head size, limb length, torso shape). No resemblance beyond "humanoid".
- **5**: proportions roughly right. Silhouette recognisable, but faces, hands and garments are far simpler than the reference.
- **7**: the same proportions and silhouette at every capture distance. The face, hands and garment construction are recognisably the same kind of human as the reference, with simplifications visible only in close-ups.
- **9**: at broadcast and duel distances indistinguishable from the reference; in close-ups only fine detail (pores, stitching) is missing.
- Without reference renders in the brief, score proportions and anatomy against real-world ballplayers in the benchmarks, and say so.

### Animation & game feel (`animation`): judged from the motion strips first, then frames
- **3**: sliding feet, rigid pose swaps, no contact.
- **5**: keyed cycles that read, but with popping, floaty or skating feet, stiff throws and a swing that doesn't sell contact.
- **7**: feet planted in the stance and run cycle; weight transfer in the pitch (leg lift, stride, follow-through) and the swing (load, stride, rotation, finish). Throws and catches with clear beats, smooth blends between clips. Plus feel: contact flash, camera follow, dust.
- **9**: motion-capture-grade weight, overlap and secondary motion. Benchmarks: smb3-3, smb4-2 (stills only).

### Environment (`environment`): park, field, stands, crowd, props
- **5**: a believable diamond and walls, crowd as a painted texture, trees as cones.
- **7**: turf with mow stripes and texture at field level, dirt with grain, a crowd that reads as people, dugouts, a backstop, signage, foul poles and light towers as built objects, no visual bugs (floating parts, blocking geometry in the camera's view). Benchmarks: smb3-1, smb4-3.
- **9**: dense dressing, varied crowd, weathering. Benchmarks: smb4-3, smb4-5.

### Lighting & atmosphere (`lighting`)
- **3**: flat ambient, no shadows.
- **5**: a directional key with shadows and a believable sky.
- **7**: soft, grounded contact shadows under players, sky light and bounce that model the faces and bodies, night exposure from the towers, and haze or depth. Benchmarks: smb3-3, smb3-4, smb4-1.
- **9**: a filmic grade, specular on helmets and the ball, volumetric light.

### UI & typography (`ui`)
- **5**: functional overlays with an inconsistent style, some clutter.
- **7**: a broadcast-grade score bug and count, clear pitch and timing feedback, result banners with hierarchy, a consistent type scale. Nothing clipped, stale or overlapping the action. Benchmarks: smb3-1, ootp26-1.
- **9**: TV-package polish with motion.

### Readability (`readability`)
- **5**: the ball, zone and runners take effort to find; players are small.
- **7**: the ball, strike zone, runners, the fielder with the ball and the bases read at a glance in every frame, on both viewports.

### Mobile (`mobile`)
- **5**: it works on a phone, but figures are small and the HUD is cramped.
- **7**: readable figures and HUD at 390 px wide; portrait and landscape framing both intentional; thumb-friendly controls; the phone proxy holds 30 fps (perf.json, 4× CPU throttle).

## Output

Each reviewer ends their review with one fenced `json` block that follows `reviews/schema.json`.
