# Judge: loop 8, high tier

Capture paths are relative to `screenshots/review-loop-8/`. I opened these captures myself: `crops/high/R07-SS`, `R08-CF`, `R09-LF`, `R05-batter_feet`, `R02-batter_head`, `R02-batter_hands`, `R12-pitcher`, `R17-pitcher_hands`, `R03-pitcher`, `R05-ump_head`, `R06-catcher_glove`, `R16-1B`; `strips/high/R03`, `R04`, `R07`, `R10`; `high/desktop/R01`, `R05`, `R09`, `R10`, `R12`, `R13`, `R14`, `R15`; `high/mobile/R02`, `R07`; `high/landscape/R05`.

No category has critics more than 1.0 apart. Characters, environment and lighting are exactly 1.0 apart, and the advocate disputes several factual claims. I checked all of those below.

## Performance gate: PASS

Thresholds from `VISUAL-PLAN-3.md` ("Budgets") against `reviews/loop-8/perf.json`:

- **Desktop / high:** min 421.2 fps (grounder), worst p95 3.0 ms (night). Gate is ≥ 55 fps and ≤ 22 ms. Pass.
- **Phone / medium, 4× CPU throttle:** min 62.8 fps (grounder). Gate is ≥ 30 fps. Pass. These are single runs. The grounder p95 of 33.7 ms (and 26.6 ms in gap) shows frame spikes near the 24 fps floor. Watch.
- **Estimated phone GPU:** the worst medium-mobile median gpuMs is 0.993 (grounder, 3-run median). × 25 (`research/perf-ceiling.md`) = 24.8 ms, within the 26 ms gate. Pass, but narrowly: it was 22.5 ms in loop 7. Next loop's character work must not add medium-tier fill cost.
- **Software GL / low:** 21.1 fps (duel) and 17.2 fps (grounder), against the loop-0 baseline of 19.9 / 15.1. Better than baseline. Pass. Critic B's "below the 20 fps target" is wrong: the gate is relative to the baseline, not a fixed 20 fps.
- **Heap:** high max 76.7 MB (< 192), medium max 100.7 MB (< 128), low max 77.8 MB (< 90). Pass. Low is at 86% of its budget. Watch.
- **Medium triangles:** max 530.6k, within the 650k ceiling.
- **Download:** not in perf.json, so unverified.

The gate passes, so WS6 is not forced to the top of the gap list.

## Factual rulings

1. **Run-cycle glove arm (Critic A wrong on the shape, right that it is static).** In `crops/high/R07-SS`, `crops/high/R08-CF` and `crops/high/R09-LF`, the glove elbow is flexed about 90° with the glove at the belt. It does not hang "straight down". All three running crops carry the glove arm in the same fixed pose, though, and the free hand is a flat open palm in all three. The fault is a glove arm with no counter-swing, not a locked straight arm.
2. **R09 ball (advocate right, Critic A wrong).** In `high/desktop/R09`, the ball is a white dot with a short streak above the scoreboard, near (517, 288), separate from its shadow.
3. **R10 runner (Critic B right).** In `high/desktop/R10`, the only figure at the bottom edge is about 8 px tall and can't be identified as the batter-runner. The runner is not readably in frame either way.
4. **CF "black slab" (advocate right on cause).** In `high/desktop/R09`, `high/desktop/R10` and `crops/high/R03-pitcher`, it is a batter's eye centred beyond the CF wall. It is intentional, but an untextured flat black box. It is minor dressing, not a layering bug.
5. **R15 "floating discs" (advocate right).** In `high/desktop/R15`, these are grey-green ellipses lying on the ground beyond the wall, with dark shards on them. They are unclear dressing, not floating geometry.
6. **Stance feet in R05 (both partly right).** In `crops/high/R05-batter_feet`, the left (front) shoe clearly hovers: there is lit dirt between the sole and its contact oval. The right shoe is close to planted. This is the fifth loop with a hovering stance foot. The cause is the pose (no foot lock), not the shadow. The new contact ovals sit correctly on the ground.
7. **R04 contact flash (advocate right) and load (Critic A overstated).** In `strips/high/R04`, the panel-5 glow encloses the ball, and the batted-ball trail leaves from that point. Panels 1–4, however, show no load and no front-foot stride: the stance is unchanged until the swing. Critic A's "load (1–4), stride" is not on screen. The finish in panels 7–8 is upright, with the bat held low and vertical rather than wrapped.
8. **R07 run-to-crouch (advocate right).** In `strips/high/R07`, the scoreboard and wall shift between panels 4 and 5. That is a camera reframe, so it is not evidence of a pose pop. Panels 5–8 hold a planted crouch.
9. **Night faces (advocate right) and day faces (critics right).** In `crops/high/R12-pitcher` and `high/desktop/R12`, the tower light models the face, cloth and helmet. In `crops/high/R02-batter_head`, the face under the day brim is near black: the lips and nose show faintly and the eyes are lost.
10. **Shoulder fix (partly visible).** The shoulder line is natural in `crops/high/R16-1B` and `crops/high/R12-pitcher`. In the front-on set position (`crops/high/R03-pitcher`), the deltoids are still round pads, and the helmet sits low between the shoulders.
11. **Lettering fix (partly visible).** "LAKE HAMILTON" is legible with its outline in `crops/high/R17-pitcher_hands`. But "LAKESIDE" still has K and E colliding in `crops/high/R12-pitcher` and `crops/high/R08-CF`. In `crops/high/R02-batter_hands`, the "H" of "HOT SPRINGS" overhangs the torso silhouette, and the "I" of "SPRINGS" merges into the piping.
12. **Mask bars (loop fix not visible).** In `crops/high/R05-ump_head`, the horizontal bars still show darker rings at each segment join. The cage hangs below the brim, off the face, with no frame, and the bar ends stick out at the side.

## Rulings by category

### Characters: 5.5 (A 6.0, B 5.0, advocate 6.0)

The players clear the 5 anchor on three counts:
- **Faces:** modelled faces that hold up in close-up (`crops/high/R09-LF`, `crops/high/R16-1B`).
- **Hands:** fingers wrap the bat (`crops/high/R02-batter_hands`).
- **Materials:** a specular helmet against matte flannel (`crops/high/R12-pitcher`).

They fall short of the 5 anchor's "modelled glove" and of most of the 7 anchor:
- **Glove:** a four-lobed brown lump with no pocket or web (`crops/high/R17-pitcher_hands`). The catcher's mitt is the same lump (`crops/high/R06-catcher_glove`).
- **Catcher gear:** the leg guards are flared flaps (`crops/high/R06-catcher_glove`).
- **Umpire mask:** the bars are segmented and floating (`crops/high/R05-ump_head`).
- **Cloth:** none. There are no folds or seams, the belt has no buckle or loops, and the crotch is smooth (`crops/high/R17-pitcher_hands`).
- **Stepped texture edges:** saw-tooth sock tops (`crops/high/R07-SS`), a saw-tooth yoke (`crops/high/R02-batter_head`) and stair-stepped cleat panels (`crops/high/R05-batter_feet`).
- **Lettering:** collisions (ruling 11).
- **Body types:** one shared build. No 3 distinct body types are evident (`high/desktop/R14`, `crops/high/R16-1B`).

The loop's shoulder and lettering work is real but partial. Critic B's 5 ignores the faces, grip and materials. Critic A's and the advocate's 6 undercount the gear and the edge artefacts. Score: 5.5.

### Fidelity to reference (charfit): 5.5 (A 5.5, B 5.5, advocate 5.5)

- Head size and limb lengths match `mpfb2_athlete_*` (`crops/high/R16-1B`), and the face matches the MPFB base (`crops/high/R09-LF`).
- The front-view deltoid pads in `crops/high/R03-pitcher` diverge from the sloped reference shoulder.
- The garments are far simpler than `si_jersey_front`: a painted-on jersey and smooth seat (`crops/high/R17-pitcher_hands`).
- fidelity.json: reference IoU is 0.878 / 0.889. LOD1 tracks LOD0 closely (12.6% vs 10.5% at 140 px). LOD2 sits at 41–48% error at every height. The LOD2 figures are the far fielders in `high/desktop/R08` and `R09`.

This is the 5 anchor with a face bonus. Unanimous; I agree.

### Animation & game feel: 5.5 (A 6.0, B 5.5, advocate 6.0)

What works:
- `strips/high/R03` has a clean set and leg lift, with the pivot foot on the rubber.
- `crops/high/R12-pitcher` shows the stride and drive.
- `strips/high/R07` reads as a break, then a planted crouch.
- `strips/high/R10` is a readable trot with bent elbows.

Against the 7 anchor:
- The swing in `strips/high/R04` has no load or stride (ruling 7), and its finish is upright.
- The stance front foot hovers (`crops/high/R05-batter_feet`).
- The run cycle has a fixed glove arm and a flat free palm (`crops/high/R07-SS`).
- The trot loops in about 4 panels with little overlap.
- No dust appears in any strip.

Nothing in this loop changed motion; the contact ovals are a lighting and grounding change. Score: 5.5.

### Environment: 5.5 (A 6.0, B 5.0, advocate 5.5)

Credit:
- Mow stripes and dirt grain (`crops/high/R09-LF`, `crops/high/R05-batter_feet`).
- Built light towers, foul poles and scoreboards (`high/desktop/R09`, `high/desktop/R12`).

Defects:
- Overlapping ad boards garble the text: "GATOR F|TORS" in `crops/high/R02-batter_hands`, "RED|WARE" in `crops/high/R05-ump_head`.
- The crowd is flat, repeated photo rows on box stands (`high/desktop/R05`).
- Faceted low-poly trees sit against a photographic backdrop with a hazy horizontal seam (`high/desktop/R09`, `high/desktop/R15`).
- The batter's eye is an untextured black box.
- The R15 ground patches are unclear.
- The stands in `high/desktop/R01` are untextured grey blocks.

Critic B is right that the crowd and vegetation are inconsistent; Critic A over-counted the batter's eye as a bug. Score: 5.5.

### Lighting & atmosphere: 6.0 (A 6.5, B 5.5, advocate 6.5)

Met:
- **Contact shadows:** the new foot ovals are tight and grounded (`crops/high/R16-1B`, `crops/high/R07-SS`).
- **Night:** a coherent night exposure with modelled faces (`high/desktop/R12`, `crops/high/R12-pitcher`).
- **Golden afternoon:** a coherent warm grade (`high/desktop/R14`).

Failed:
- **Sky and bounce fill:** the 7 anchor asks for fill that models the faces. It fails in the most-seen camera: the day face under the brim is near black (`crops/high/R02-batter_head`).
- **Light pools:** `high/desktop/R13` has abrupt pools, a dark band across centre field, and pitch-black tree silhouettes under oddly lit blue crowns.

The contact-shadow gain is real. The day-face failure on the batting camera holds the score at 6.0, not 6.5.

### UI & typography: 6.5 (A 6.5, B 7.0, advocate 6.5)

Strong:
- A consistent score bug, count and pitcher/batter lines (`high/desktop/R05`, `high/desktop/R12`).
- A clear HOME RUN / distance banner hierarchy (`high/desktop/R10`, `high/desktop/R15`).

Weak:
- The title menu is translucent over a busy scene, with "355" bleeding through a low-contrast Season button (`high/desktop/R01`).
- No pitch or timing meter is captured, although the hint text mentions one (`high/desktop/R05`).
- The score bars are wide and mostly empty.

The reticle over the catcher is the pitch target, by design. Critic B's 7 overlooks R01 and the missing meter. Score: 6.5.

### Readability: 6.0 (all 6.0)

Reads at a glance:
- The batting views (`high/desktop/R02`, `high/desktop/R12`).
- `high/desktop/R07`, with the ball, runner ring and fielder rings.

Doesn't:
- Outfield cameras show 10–15 px fielders (`high/desktop/R09`). The ball is visible there (ruling 2).
- The runner is out of view in `high/desktop/R10`.
- `high/mobile/R07` drops first and third base while spending the bottom quarter of the frame on backstop dirt.

Score: 6.0.

### Mobile: 6.0 (A 6.5, B 6.0, advocate 6.5)

- Portrait batting is well framed, with thumb-sized buttons (`high/mobile/R02`).
- In `high/landscape/R05`, the CB button covers the pitcher's legs. This persists from loop 7.
- `high/mobile/R07` loses both corner bases, a recurring framing fault.
- The phone proxy passes at 62.8 fps min, with spikes (p95 33.7 ms).

No mobile change landed this loop. Score: 6.0.

**Tier regressions:** the medium tier matches high in the crops the critics checked. The low-tier cartoon batter (`crops/low/R02-batter_head`) was ruled the v2 player by design in loop 6. It is not a new regression, and it doesn't affect the high-tier score.

**Total 46.5.** Equal to loop 7: no new best. No gate is met.

## Ranked gaps (gain ÷ effort; S=1, M=2, L=4)

1. **G-ad-panel-overlap** (environment, WS4, S, +0.5). Space the outfield and backstop ad boards so no two board quads overlap in x along the wall, or delete the duplicates. Test: no split or garbled words in `crops/high/R02-batter_hands`, `crops/high/R05-ump_head`, `crops/high/R07-batter-runner` or `crops/high/R17-pitcher-back`.
2. **G-face-fill** (lighting, WS3, S, +0.5). Add a hemisphere sky-fill and ground-bounce term to the skin material, or a per-player face fill light that is not shadowed by the brim, on the day presets. Test: in `crops/high/R02-batter_head`, both eyes (whites and irises) are distinguishable from the surrounding skin, and the mean face luminance under the brim is at least 40% of the cheek luminance below it.
3. **G-mask-aliasing** (characters, WS1, S, +0.5). One root cause behind three defects: low-resolution, unfiltered texture or alpha masks produce stair-stepped edges on the sock tops, the jersey yoke and the cleat side panels. Raise these masks to at least 1024² with mipmapped linear filtering, or model the boundaries as geometry. Test: no visible stair steps on the sock tops in `crops/high/R07-SS`, the yoke in `crops/high/R02-batter_head`, or the cleats in `crops/high/R05-batter_feet` and `high/mobile/R02`.
4. **G-cloth-detail** (characters, WS1, M, +0.75). Merges A's G-cloth-detail and B's G-uniform-construction. Add a flannel weave normal map plus baked fold normal maps (elbow, armpit, waist blouse over the belt, knee and seat), a modelled belt buckle and loops, and a raised collar edge. Test: folds visible at the elbow, waist and knee in `crops/high/R17-pitcher_hands`, `crops/high/R10-batter-trot` and `crops/high/R06-catcher_glove` (the batter's seat is no longer a smooth dome), and a buckle visible in `crops/high/R17-pitcher_hands`.
5. **G-stance-foot-lock** (animation, WS2, S, +0.25). This is the fifth loop with a hovering stance foot. Apply two-bone foot IK in the stance, set and ready clips, pinning each sole to the ground plane when its clip height is below 0.1 ft. Test: in `crops/high/R05-batter_feet`, both soles touch their contact ovals with no lit dirt between them.
6. **G-mask-mount** (characters, WS1, S, +0.25). Weld the cage bars into one mesh (no segment rings), add a perimeter frame, chin and forehead pads and side straps to the helmet, and seat the cage within 0.05 ft of the face. Test: in `crops/high/R05-ump_head`, no join rings, no bar stubs past the frame and no air gap; in `crops/high/R05-batter-front`, the cage is attached in side view.
7. **G-lettering-fit** (characters, WS1, S, +0.25). Re-kern the wordmark texture so no glyphs overlap ("LAKESIDE" K/E). Mask the placket piping out under the decal footprint, and clip the decal to the torso silhouette. Test: "LAKESIDE" in `crops/high/R12-pitcher` has a gap between every letter; "HOT SPRINGS" in `crops/high/R02-batter_hands` shows its "I" and no glyph outside the torso.
8. **G-run-arms** (animation, WS2, S, +0.25). In the run and trot clips, give the glove arm a counter-swing to the legs (shoulder pitch range ≥ 40° over the cycle) and close the free hand to a loose fist (finger curl ≥ 60°). Test: the glove position differs between the panels of `strips/high/R07` 1–4 and `strips/high/R10`, and there is no flat palm in `crops/high/R07-SS`, `R08-CF` or `R09-LF`.
9. **G-landscape-overlap** (mobile, WS7, S, +0.25). In landscape, move the pitch-select buttons into the side gutters, or raise the pitching camera so the pitcher's feet clear the control band. Test: in `high/landscape/R05`, no button overlaps any player.
10. **G-glove-model** (characters, WS1, M, +0.5). Merges A's G-glove-model with the glove and catcher parts of B's G-hands-and-equipment. Model the fielder's glove with a pocket, a laced web and finger stalls; give the catcher's mitt a round, padded shape; shape the catcher's leg guards with knee cups that follow the shin. Use a leather normal map. Test: the pocket and web are visible in `crops/high/R17-pitcher_hands` and `crops/high/R07-SS`, the mitt is round in `crops/high/R06-catcher_glove`, and no guard flares more than 0.15 ft off the shin.
11. **G-shoulder-mass** (charfit, WS1, M, +0.5). Reduce the deltoid and upper-arm girth by about 15%, and lower the clavicle rest in the set and stance poses so the trapezius slopes. Test: in `crops/high/R03-pitcher`, the shoulder outline is a slope, not a ball, and the neck is visible between the helmet and the shoulders; reference silhouette IoU (front) ≥ 0.90.
12. **G-swing-load-stride** (animation, WS2, M, +0.5). Before the swing, add a load (hands move back at least 0.3 ft and the front heel lifts) and a front-foot stride of at least 0.5 ft. End the swing in a wrapped finish over the lead shoulder. Test: in `strips/high/R04`, panels 2–4 show the heel lift and hand load, and panels 7–8 show the bat behind the shoulder.

Dropped below the cut:
- **G-body-types:** M, +0.25.
- **G-crowd-and-vegetation:** L, +1.0, ratio 0.25. Real, but environment work, and next loop's priority is the players.
- **G-field-cam-scale / G-gameplay-framing:** M, +0.5. The fix would keep both corner bases in `high/mobile/R07` and the runner in `high/desktop/R10`.
- **G-face-and-night-light:** merged into G-face-fill. The night faces are already fine, and the R13 pool edges are a separate, smaller issue.
- **G-low-tier-identity:** ruled by design in loop 6.
- **G-cf-black-slab:** texture the batter's eye; S, +0.1.

```json
{
  "loop": 8,
  "role": "judge",
  "tier": "high",
  "scores": {
    "characters": { "score": 5.5, "confidence": 0.8, "evidence": [
      { "shot": "crops/high/R02-batter_hands", "note": "fingers wrap the bat; H overhangs torso, I lost in piping, garbled ad board behind" },
      { "shot": "crops/high/R17-pitcher_hands", "note": "lumpy four-lobed glove, no cloth folds, buckle-less belt" },
      { "shot": "crops/high/R05-ump_head", "note": "cage bars still segmented, floating off the face, no frame" },
      { "shot": "crops/high/R07-SS", "note": "saw-tooth sock tops and stepped cleat panels" },
      { "shot": "crops/high/R12-pitcher", "note": "modelled face, specular helmet, piping and stirrups; LAKESIDE K/E collide" } ] },
    "charfit": { "score": 5.5, "confidence": 0.8, "evidence": [
      { "shot": "crops/high/R03-pitcher", "note": "front-view deltoid pads against the sloped mpfb2 reference shoulder" },
      { "shot": "crops/high/R16-1B", "note": "head and limb proportions match the reference; shoulder line natural in this pose" },
      { "shot": "crops/high/R17-pitcher_hands", "note": "garments far simpler than si_jersey_front" } ] },
    "animation": { "score": 5.5, "confidence": 0.75, "evidence": [
      { "shot": "strips/high/R04", "note": "no load or stride in 1-4; flash encloses the ball; upright finish" },
      { "shot": "strips/high/R03", "note": "set and leg lift with pivot foot on the rubber" },
      { "shot": "strips/high/R07", "note": "camera reframe 4-5; planted crouch 5-8" },
      { "shot": "crops/high/R05-batter_feet", "note": "front stance shoe hovers above its contact oval" },
      { "shot": "crops/high/R07-SS", "note": "glove arm fixed at the hip, flat open free palm" } ] },
    "environment": { "score": 5.5, "confidence": 0.75, "evidence": [
      { "shot": "crops/high/R05-ump_head", "note": "overlapping ad boards (RED|WARE)" },
      { "shot": "high/desktop/R05", "note": "flat repeated photo crowd rows" },
      { "shot": "high/desktop/R15", "note": "faceted trees, backdrop seam, unclear ground patches" },
      { "shot": "high/desktop/R09", "note": "mow stripes, built towers; untextured batter's eye" } ] },
    "lighting": { "score": 6.0, "confidence": 0.7, "evidence": [
      { "shot": "crops/high/R02-batter_head", "note": "day face near black under the brim; eyes lost" },
      { "shot": "crops/high/R16-1B", "note": "tight grounded contact ovals" },
      { "shot": "high/desktop/R12", "note": "coherent night exposure, helmet specular" },
      { "shot": "high/desktop/R13", "note": "abrupt pools, dark CF band, black tree silhouettes" } ] },
    "ui": { "score": 6.5, "confidence": 0.75, "evidence": [
      { "shot": "high/desktop/R10", "note": "clear result banner hierarchy, consistent score bug" },
      { "shot": "high/desktop/R01", "note": "translucent menu, 355 bleeds through low-contrast Season button" },
      { "shot": "high/desktop/R05", "note": "target and pitch buttons clear; no meter captured" } ] },
    "readability": { "score": 6.0, "confidence": 0.75, "evidence": [
      { "shot": "high/desktop/R07", "note": "ball, runner ring and fielder rings read at a glance" },
      { "shot": "high/desktop/R09", "note": "ball visible but fielders 10-15 px" },
      { "shot": "high/desktop/R10", "note": "runner not readably in frame" },
      { "shot": "high/mobile/R07", "note": "first and third base off-frame" } ] },
    "mobile": { "score": 6.0, "confidence": 0.75, "evidence": [
      { "shot": "high/mobile/R02", "note": "big batter, clear zone, thumb-sized buttons" },
      { "shot": "high/landscape/R05", "note": "CB button covers the pitcher's legs" },
      { "shot": "high/mobile/R07", "note": "corner bases dropped, bottom quarter wasted on backstop" } ] }
  },
  "gaps": [
    { "id": "G-ad-panel-overlap", "category": "environment", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS4", "evidence": ["crops/high/R02-batter_hands", "crops/high/R05-ump_head", "crops/high/R07-batter-runner"], "benchmark": "smb3-1", "fix": "Space or de-duplicate the wall ad boards so no two board quads overlap in x; no split or garbled words in R02-batter_hands, R05-ump_head, R07-batter-runner or R17-pitcher-back." },
    { "id": "G-face-fill", "category": "lighting", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS3", "evidence": ["crops/high/R02-batter_head"], "benchmark": "smb3-3", "fix": "Hemisphere sky-fill plus ground-bounce term on skin (or an unshadowed per-player face fill) on day presets; eyes distinguishable in R02-batter_head and under-brim face luminance at least 40% of the cheek below." },
    { "id": "G-mask-aliasing", "category": "characters", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R07-SS", "crops/high/R02-batter_head", "crops/high/R05-batter_feet"], "fix": "Raise the sock-top, yoke and cleat-panel masks to at least 1024 px with mipmapped linear filtering (or model the boundaries as geometry); no stair-stepped edges in R07-SS, R02-batter_head, R05-batter_feet or mobile R02." },
    { "id": "G-cloth-detail", "category": "characters", "expectedGain": 0.75, "severity": 5, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R06-catcher_glove", "crops/high/R10-batter-trot"], "benchmark": "smb4-2", "fix": "Flannel weave normal map plus baked fold normal maps at elbow, armpit, waist blouse, knee and seat; modelled buckle and belt loops; raised collar edge. Folds visible in R17-pitcher_hands, R10-batter-trot and the batter's seat in R06-catcher_glove." },
    { "id": "G-stance-foot-lock", "category": "animation", "expectedGain": 0.25, "severity": 3, "effort": "S", "workstream": "WS2", "evidence": ["crops/high/R05-batter_feet"], "fix": "Two-bone foot IK in stance, set and ready clips pinning each sole to the ground when clip height < 0.1 ft; both soles touch their contact ovals in R05-batter_feet." },
    { "id": "G-mask-mount", "category": "characters", "expectedGain": 0.25, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R05-ump_head", "crops/high/R05-batter-front"], "fix": "Weld cage bars into one mesh (no join rings), add a perimeter frame, chin and forehead pads and straps, seat the cage within 0.05 ft of the face; no stubs or air gap in R05-ump_head and R05-batter-front." },
    { "id": "G-lettering-fit", "category": "characters", "expectedGain": 0.25, "severity": 2, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R12-pitcher", "crops/high/R02-batter_hands"], "fix": "Re-kern the wordmark so no glyphs overlap, mask piping under the decal footprint, clip the decal to the torso; LAKESIDE has a gap between every letter in R12-pitcher and HOT SPRINGS shows its I with no glyph outside the torso in R02-batter_hands." },
    { "id": "G-run-arms", "category": "animation", "expectedGain": 0.25, "severity": 3, "effort": "S", "workstream": "WS2", "evidence": ["crops/high/R07-SS", "crops/high/R08-CF", "strips/high/R10"], "fix": "Glove-arm counter-swing (shoulder pitch range >= 40 degrees per cycle) and a loose fist on the free hand (finger curl >= 60 degrees) in run and trot clips; glove position varies across strips R07 1-4 and R10, no flat palm in R07-SS." },
    { "id": "G-landscape-overlap", "category": "mobile", "expectedGain": 0.25, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/landscape/R05"], "fix": "Move landscape pitch-select buttons into the side gutters or raise the pitching camera; no button overlaps a player in landscape R05." },
    { "id": "G-glove-model", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R06-catcher_glove"], "benchmark": "smb4-2", "fix": "Model a pocket, laced web and finger stalls on the fielder's glove, a round padded catcher's mitt and knee-cupped leg guards that follow the shin, with a leather normal map; pocket and web visible in R17-pitcher_hands, guards within 0.15 ft of the shin in R06-catcher_glove." },
    { "id": "G-shoulder-mass", "category": "charfit", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R03-pitcher", "crops/high/R08-CF"], "benchmark": "mpfb2_athlete_three_quarter", "fix": "Cut deltoid and upper-arm girth about 15% and lower clavicle rest in set and stance poses; sloped shoulder outline and visible neck in R03-pitcher, front reference IoU >= 0.90." },
    { "id": "G-swing-load-stride", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["strips/high/R04"], "benchmark": "smb4-2", "fix": "Add a pre-swing load (hands back >= 0.3 ft, front heel lift) and a front-foot stride >= 0.5 ft, plus a wrapped finish over the lead shoulder; visible in strip R04 panels 2-4 and 7-8." }
  ],
  "calibration": {
    "perfGate": "pass: high desktop min 421.2 fps / p95 3.0 ms; medium phone proxy (4x CPU, single runs) min 62.8 fps, p95 33.7 ms (watch); est. phone GPU = worst medium-mobile median gpuMs 0.993 (grounder) x 25 = 24.8 ms <= 26 (narrow, up from 22.5); software GL 21.1/17.2 vs 19.9/15.1 baseline, better; heap 76.7/100.7/77.8 MB pass (low at 86%, watch); medium tris max 531k <= 650k; download not in perf.json",
    "factRulings": "glove arm flexed at the hip (A wrong on straight-down) but static across all run crops and free palm flat (real); R09 ball visible (A wrong); R10 runner not readably in frame (B right); CF slab is a batter's eye, untextured (advocate right); R15 patches on the ground (advocate right); R05 front stance shoe hovers, rear near planted (5th loop, pose not shadow); R04 flash encloses ball (advocate right) but no load or stride in 1-4 (A overstated); R07 camera reframe 4-5 (advocate right); night faces modelled (advocate right), day brim face near black (real); shoulder fix visible in R16-1B/R12, pads persist in R03 front view; lettering outline helps HAMILTON but LAKESIDE K/E collide and SPRINGS I lost; mask join rings still visible after the loop-8 bar change",
    "effortWeights": "S=1, M=2, L=4"
  },
  "verdict": "continue"
}
```
