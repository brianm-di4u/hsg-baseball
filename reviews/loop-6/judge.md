# Judge: loop 6, high tier

Capture paths are relative to `screenshots/review-loop-6/`. I read the rubric, schema, loop brief, both critics, the advocate, `reviews/HISTORY.md` (trend only), `perf.json`, `perf-soft-repeat.json` and the Budgets table in `VISUAL-PLAN-3.md`. I scored the calibration frame before comparing it with anything.

I opened these captures myself: `crops/high/R02-batter_head`, `R02-batter_hands`, `R05-ump_head`, `R05-batter_feet`, `R05-catcher`, `R06-catcher_glove`, `R08-CF`, `R09-LF`, `R10-batter-trot`, `R12-pitcher`, `R14-batter`, `R16-runner1`, `R17-pitcher_hands`, `R17-pitcher-back`; `strips/high/R03`, `R04` (frames 2, 4 and 5 enlarged 3×), `R07`, `R10`; `high/desktop/R01`, `R05`, `R06`, `R09`, `R10`, `R12`, `R13`, `R15`, `R16`, `R17`; `high/mobile/R05`, `R07`; `high/landscape/R02`, `R05`; and `art-src/samples/reference-renders/mpfb2_athlete_three_quarter.png`.

No category has the critics more than 1.0 apart (environment is exactly 1.0: A 6, B 5). I still checked every claim the advocate disputed.

## Performance gate: FAIL (phone GPU estimate)

| Budget | Measured | Result |
|---|---|---|
| Desktop/high: every scene ≥ 55 fps, p95 ≤ 22 ms | min 328.7 fps (grounder), worst p95 6.0 ms | pass |
| Phone/medium proxy, 4× CPU throttle: ≥ 30 fps (floor 24) | min 47.5 fps (gap). Worst p95 is 47.0 ms, about 21 fps. | pass (watch the p95) |
| Phone/medium: est. phone GPU ≤ 26 ms (unthrottled medium·mobile gpuMs × 25, as in loops 1–5) | night 1.33 ms → **33.3 ms**, grounder 1.011 → 25.3, gap 0.969 → 24.2 | **fail** |
| Software GL/low: no worse than the loop-0 baseline (duel 19.9 / grounder 15.1) | perf.json 18.4 / 13.6 (p95 98.2). Three repeats: duel 18.6 / 18.8 / 19.7, grounder 15.9 / 15.9 / 16.2, p95 66–83 ms. | pass |
| Heap: high < 192, medium < 128, low < 90 MB | 90.5 / 88.3 / 68.0 MB | pass |
| Download | Not in perf.json. The captured build's medium pack was 4.04 MB, over its 4 MB budget. The brief says a post-capture fix brings it to 3.63 MB and the test passes; I didn't verify that. | pass per brief, with caveat |

**Software GL.** The single perf.json run was the outlier. Across all four runs the medians are 18.7 fps (duel) and 15.9 fps (grounder). Duel is inside the 18.2–19.9 band the loop-5 ruling set from five prior runs, and grounder is above its baseline. The repeats also cut p95 from 98 ms to 66–83 ms. I rule software GL within noise: pass.

**Phone GPU.** The medium·mobile night reading of 1.33 ms puts the estimate at 33 ms, 28% over budget. These timer readings are noisy, and the high·mobile rows draw the same triangles and calls in every scene. But high·mobile doesn't rescue the estimate:

- high·mobile night reads 1.026 ms (25.7 ms); averaged with the medium run it's 29.5 ms;
- high·mobile grounder reads 1.973 ms (49 ms);
- high·mobile gap reads 1.282 ms (32 ms).

Even the best single readings for the heaviest scenes land at 25.3–25.7 ms, with no headroom left. The trend from the history ledger is 14.4 ms (loop 4), then 24.5 ms (loop 5), then 25–33 ms now. By the method every earlier judge used, the gate fails. The brief therefore makes the top gap a WS6 fix: re-measure with repeats, and recover GPU margin if the median is still over.

## Category rulings

### characters: 5.5 (A 5.5, B 5.0, advocate 5.5)
- **Real faces now hold up under caps in daylight.** `crops/high/R09-LF` and `crops/high/R14-batter` show eyes, nose, lips and ears.
- **Hands grip the bat.** `crops/high/R02-batter_hands` shows jointed fingers round the handle.
- **Builds clearly differ.** In `crops/high/R14-batter` the umpire is thick-backed and the batter is lean. `crops/high/R12-pitcher` (broad) and `crops/high/R17-pitcher-back` (slight) are different builds again. **Critic B is wrong** that three builds aren't shown; the advocate is right.
- **Against the 7 anchor, the kit fails.** The uniform is a smooth colour-block shell: no folds, no buttons, a jagged belt band and a spiky V collar (`crops/high/R17-pitcher_hands`, `crops/high/R08-CF`).
- **Lettering is still cut.** Placket piping hides the H of "LAKE HAMILTON" in `R17-pitcher_hands`, the first L of "LAKESIDE" in `R08-CF` and `R09-LF`, and the H of "HOT SPRINGS" in `R02-batter_hands`. "LAKESIDE" is complete in `crops/high/R12-pitcher`, so the fault depends on the pose.
- **Gloves are lobed mittens** (`crops/high/R06-catcher_glove`, `R17-pitcher_hands`).
- **Cleats** have a pixel-stepped white pattern (`crops/high/R05-batter_feet`).
- **Batting helmet, front view.** `crops/high/R02-batter_head` is as A says: the face is black under a white-blown brim, and the flap reads as a dangling strap.
- **Batting helmet, other views.** **The advocate is right** that `crops/high/R10-batter-trot` and `crops/high/R16-runner1` show the nose, lips and chin. The brim still sits as a black band across the eyes, on caps as well (the blue fielder in `R16-runner1`, `R08-CF`). From behind, the flap reads as a shell (`crops/high/R05-catcher`).
- **Umpire mask.** In the crouch (`crops/high/R05-ump_head`) the cage runs from the brim to the chest protector, and bare skin shows at the neck and shoulder. The loop-6 mask fix doesn't hold in this pose.
- **Catcher's chest protector.** It exists as a swollen blue form (`crops/high/R06-catcher_glove`), so A's "no chest protector" is overstated. It is unconstructed, though: no segments or straps.

The model sits between the 5 and 7 anchors and closer to 5. **5.5.**

### charfit: 5.5 (A 5.5, B 5.0, advocate 5.5)
- **Head and legs match the reference.** Next to `mpfb2_athlete_three_quarter`, the heads in `crops/high/R09-LF` and `crops/high/R14-batter` are the same kind of human. Bind-pose IoU is 0.875 front and 0.895 side.
- **The dressed torso does not.** In `crops/high/R08-CF`, `crops/high/R17-pitcher_hands` and `crops/high/R12-pitcher` the shoulders are rounded pads much wider than the reference's sloped shoulders, and the neck is short. In `R17-pitcher_hands` the jersey also shows two bust-like chest bulges under the lettering.
- **B's "narrow tubular limbs" is wrong.** The upper arms are over-inflated (advocate right). The legs are smooth tubes.
- **Far players.** In `high/desktop/R09` they are 15–25 px blobs, consistent with LOD2's 46–52% pixel error. "The same silhouette at every distance" is not met.

**5.5.**

### animation: 5.0 (A 5.5, B 5.0, advocate 5.5)
I enlarged frames 2, 4 and 5 of `strips/high/R04` to 3×.
- **R04 swing.** The contact flash in frame 5 sits on the ball, so **B is wrong** that the ball has passed before the flash. Contact happens over the plate, a little late.
- **No stride, a 4→5 pose swap.** Frames 2 and 4 show only a small bat cock: the feet don't move and there is no stride. The bat goes from cocked to fully through between frames 4 and 5. **A overstates the "load, stride"**; this is still the loop-5 pose swap.
- **R07 fielding.** `strips/high/R07` has a camera cut between frames 4 and 5 (the scoreboard and fielder jump), so the advocate is right that the braking isn't sampled. The ball is never in the glove: in frame 7 it is on the ground ahead of the glove, and in frame 8 it is behind the right foot. This has now recurred for four loops.
- **R03 delivery.** `strips/high/R03` covers only the set and the leg lift. The release does exist, in `high/desktop/R06` (advocate right).
- **Stance feet.** Both soles hover over the dirt with detached shadows in `crops/high/R05-batter_feet` (B right).
- **R10 trot.** `strips/high/R10` is planted but upright, with fixed arm arcs.

That is the rubric's 5: keyed cycles that read, a swing that doesn't sell contact, floating stance feet and no catch. Nothing in animation changed this loop. **5.0.**

### environment: 5.5 (A 6.0, B 5.0, advocate 5.5)
- **What works:**
  - mow-pattern turf and grained dirt (`high/desktop/R09`, `crops/high/R16-runner1`);
  - built light towers and foul poles;
  - a dugout and terraced historic stands with real character (`crops/high/R14-batter`, `high/desktop/R15`);
  - stands with column bays at Majestic (`high/desktop/R17`).
- **What doesn't:**
  - Faceted cone and blob trees sit in front of a photographic forest in nearly every outfield view (`high/desktop/R09`, `high/desktop/R10`, `crops/high/R02-batter_head`).
  - The same crowd tile repeats above a blank grey wall band (`high/desktop/R05`, `high/desktop/R17`), and it is visibly low-resolution on the phone (`high/mobile/R05`).
  - The stands are bare grey steps (`high/desktop/R01`).
  - The night treeline is a black void (`high/desktop/R13`).

The advocate's midpoint is right. **5.5.**

### lighting: 6.0 (A 6.0, B 5.5, advocate 6.0)
- **Day.** Contact shadows sit under players (`crops/high/R16-runner1`, `crops/high/R10-batter-trot`). The golden afternoon in `crops/high/R14-batter` models faces and bodies. Faces under caps now read in daylight (`crops/high/R09-LF`).
- **Night.** `high/desktop/R12` has tower exposure with bloom, lit players and a graded sky; I see no wash-out, so the advocate is right against B.
- **What holds it at 6:**
  - The front-view helmet face is crushed (`crops/high/R02-batter_head`).
  - `high/desktop/R13` has hard, blotchy pools and a black perimeter.
  - There is little sky bounce on the bodies; the kit reads flat.
  - Atmospheric depth is only the haze band at the foot of the backdrop.

**6.0.**

### ui: 6.5 (A 6.5, B 6.5, advocate 6.5)
- **What works.** The score bug, count, base diamond, pitcher and batter lines and pitch speed are consistent and clean (`high/desktop/R05`, `high/desktop/R16`). The HOME RUN banner has a hierarchy (`high/desktop/R10`, `high/desktop/R15`).
- **What holds it back:**
  - The translucent title menu loses contrast over the scenery (`high/desktop/R01`).
  - The "F or Space: fast-forward" hint stays on screen during play (`high/desktop/R09`).
  - Nothing animates.
- **A's R08 scoreboard complaint** is about in-world geometry framed by the camera, not the HUD (advocate right).

**6.5.**

### readability: 6.0 (A 6.0, B 5.5, advocate 6.0)
- **Duel views read at a glance:** ball, zone, reticle, catcher and batter (`high/desktop/R05`, `high/desktop/R06`, `high/desktop/R16`).
- **In `high/desktop/R05` the pitcher does not cover the plate**, only the left batter's-box chalk (advocate right).
- **Fielding and home-run views fail the 7 anchor:**
  - In `high/desktop/R10` the hitter is a speck at the bottom edge.
  - In `high/desktop/R09` fielders are 15–25 px and the ball sits against the scoreboard.
  - In `high/desktop/R16` the runner at first is half off the right edge, though the HUD diamond lights first base.

**6.0.**

### mobile: 6.0 (A 6.0, B 6.0, advocate 6.0)
- **Portrait duel is good.** `high/mobile/R05` has large figures, a legible HUD and thumb-sized buttons.
- **Portrait fielding is weak.** `high/mobile/R07` cuts off both corner bases, the players are tiny, and the bottom third is empty dirt crossed by a band of netting.
- **Landscape R02:** **the advocate is right and A is wrong.** In `high/landscape/R02` the buttons clear the batter; his feet are cut by the frame edge instead.
- **Landscape R05:** the CB button covers the pitcher's legs in `high/landscape/R05`.
- **Phone proxy:** 47.5 fps minimum clears the rubric's 30 fps bar, but see the GPU gate above.

**6.0.**

### Medium and low tiers
- Medium matches high (`crops/medium/R02-batter_head` shares the helmet fault).
- **Low-tier cartoon head (B):** this is the v2 player, which the perf-ceiling budget keeps on low "until a low pack exists". It is a known discontinuity, not a new regression.
- **Medium and low share these high-tier faults:** the raised white pitching-rubber slab (`crops/high/R12-pitcher`, `crops/high/R17-pitcher-back`), the R07 catch miss and the R05 hovering stance feet.

## Fact rulings (summary)
- **Faces under helmets:** black in the R02 front view (A right). The nose, lips and chin read in R10 and R16 (advocate right). The eyes are banded by brims everywhere.
- **Ear flap:** a strap from the front, a shell from behind. Both readings are true.
- **Three builds:** shown (B wrong).
- **"Narrow limbs":** wrong (B). The upper arms are inflated.
- **R04 contact:** the flash is synchronised (B wrong), but there is no stride and there is a 4→5 pose swap (A overstated).
- **R07:** a camera cut between frames 4 and 5 (advocate right); the ball is never in the glove (real).
- **R03:** the strip window ends at the leg lift; the release exists in R06 (advocate right).
- **Real defects:** R05 stance feet hover; the umpire cage runs over the chest in the crouch; skin shows at the umpire's neck.
- **Catcher's chest protector:** present but unconstructed (A overstated).
- **Landscape R02:** the buttons are clear (A wrong).
- **R05:** the pitcher doesn't cover the plate (A wrong).
- **R08 scoreboard:** not a UI fault (A wrong).

## Ranked gaps (gain ÷ effort; S=1, M=2, L=4; ties go to characters)
1. **G-phone-gpu-budget** (WS6, mandated by the failed gate).
   - Re-run `perf-review.mjs` three times on medium·mobile, unthrottled, and report the median gpuMs per scene. Pass if the worst median is ≤ 1.04 ms (≤ 26 ms estimated).
   - If it's over, stop using the discard-based shadow-depth material for caps and helmets. Split headwear into its own skinned submesh with `castShadow = false` (a discard defeats early-z in the shadow pass). Then tighten the medium shadow-camera frustum and re-measure.
2. **G-batting-helmet-fit** (WS1, S).
   - Raise the batting-helmet brim so its lower edge clears the brow line by at least 0.05 ft; do the same for cap brims. Close the ear flap's front edge into a shell. Cut the brim specular (roughness ≥ 0.5 on the brim).
   - Test: in `crops/high/R02-batter_head` both eyes are visible, no strap read remains, and no brim pixel exceeds 230/255. In `R08-CF` and `R16-runner1` there is no black band across the eyes.
3. **G-kit-cloth** (WS1, M).
   - Bake fold, seam and AO normal maps onto the jersey and pants: elbow, knee, crotch and belt folds, a button placket with 5 or more modelled buttons, a sleeve hem, belt loops and a buckle. Replace the spiky collar with a sewn V edge. Give the fabric a matte sheen (roughness about 0.8).
   - Test: at least 3 fold lines per pant leg and visible buttons in `crops/high/R08-CF` and `crops/high/R17-pitcher_hands`.
4. **G-torso-volume** (WS1, M).
   - Shrink the jersey's shoulder, deltoid and upper-arm offset toward `mpfb2_athlete_three_quarter`, lengthen the visible neck, and remove the chest bulges.
   - Test: the shoulder-to-head width ratio in `crops/high/R08-CF` is within 10% of the reference, and no twin chest highlights show in `R17-pitcher_hands`.
5. **G-decal-layering** (WS1, S).
   - Composite the front lettering above the placket piping in the decal texture, or stop the piping at the lettering band. Shrink the front word to fit the chest region visible in bent poses.
   - Test: "LAKE HAMILTON", "LAKESIDE" and "HOT SPRINGS" read in full in `crops/high/R17-pitcher_hands`, `R08-CF` and `R02-batter_hands`.
6. **G-ump-catcher-gear** (WS1, S).
   - Bind the mask cage to the head bone and bound it chin to brow in the crouch pose as well. Close the umpire's neck and shoulder skin gap with a shirt collar. Add segmented plates and straps to the catcher's chest protector, and knee caps to the shin guards.
   - Test: `crops/high/R05-ump_head` and `crops/high/R06-catcher_glove` match.
7. **G-stance-feet** (WS2, S).
   - Run the foot-plant IK during the batting stance on high and medium, so the soles sit within 0.02 ft of the dirt.
   - Test: in `crops/high/R05-batter_feet` there is no gap between sole and shadow.
8. **G-catch-contact** (WS2, M).
   - Add glove-hand IK toward the predicted ball position over the last 0.25 s of a fielding clip, and parent the ball to the glove on the catch frame.
   - Test: the ball is inside the glove by frame 8 of `strips/high/R07`, with no camera cut in the strip.
9. **G-glove-model** (WS1, M).
   - Model a glove with a web, pocket, heel, finger stalls and lacing, plus leather normal and roughness maps.
   - Test: the web and lacing are visible in `crops/high/R06-catcher_glove` and `R17-pitcher_hands`.
10. **G-swing-load-stride** (WS2, M).
    - Key a load (hands back) and a front-foot stride spanning at least 2 sampled frames before contact, and move the contact point in front of the plate.
    - Test: `strips/high/R04` shows the front foot lifting and landing between frames 1 and 4, and no single-sample pose swap.
11. **G-fielding-hr-camera** (WS5, M).
    - Frame fielding and home-run cameras so the ball carrier is at least 60 px tall, and keep the batter-runner in frame on the home-run trot. Give portrait fielding its own framing that keeps both corner bases and drops the empty foreground.
    - Test: `high/desktop/R10`, `high/desktop/R09` and `high/mobile/R07`.
12. **G-tree-crowd** (WS4, M).
    - Replace the faceted cone and blob trees on high and medium with textured card or billboard trees that match the backdrop's palette. Add seat rows and railings to the grey stand steps, and break up the crowd tile repetition with two or more alternate tiles.
    - Test: no faceted silhouettes in `high/desktop/R09`, and no repeated tile period visible in `high/desktop/R05`.

Dropped from the top 12: landscape controls (the R05 overlap only), night pool blending in R13, title-menu contrast, cleat texture resolution, and the low-tier head (by design until a low pack exists).

## Calibration (blind, rubric anchors only)
`reviews/loop-6/calibration.png` shows a stylised pitcher in a leg lift.
- **Characters:** a sculpted face, cloth folds and piping on the pants and jersey, a stitched leather glove, lettering and a number that follow the body, a fitted cap. Only one body type can be judged. Stylised 7–8: **7.5**.
- **Lighting:** a sun key with bounce modelling the face and body, a filmic grade, distance haze on the skyline, specular on the cap and glove. The contact shadow is faint. **7.5**.

```json
{
  "loop": 6,
  "role": "judge",
  "tier": "high",
  "scores": {
    "characters": {
      "score": 5.5,
      "confidence": 0.8,
      "evidence": [
        { "shot": "crops/high/R14-batter", "note": "real faces under caps, grip, three builds (stocky ump, lean batter, catcher)" },
        { "shot": "crops/high/R17-pitcher_hands", "note": "colour-block kit, piping hides the H, lobed mitten glove, jagged belt" },
        { "shot": "crops/high/R02-batter_head", "note": "front view: face black under white-blown brim, flap reads as strap" },
        { "shot": "crops/high/R05-ump_head", "note": "cage runs brim to chest in crouch, bare neck skin" },
        { "shot": "crops/high/R10-batter-trot", "note": "nose, lips and chin read under helmet; eyes banded by brim" }
      ]
    },
    "charfit": {
      "score": 5.5,
      "confidence": 0.75,
      "evidence": [
        { "shot": "crops/high/R09-LF", "note": "head matches mpfb2 reference; IoU 0.875/0.895" },
        { "shot": "crops/high/R08-CF", "note": "pad-like shoulders and inflated upper arms far wider than mpfb2_athlete_three_quarter; short neck" },
        { "shot": "high/desktop/R09", "note": "far players are 15-25 px blobs (LOD2 46-52% error)" }
      ]
    },
    "animation": {
      "score": 5,
      "confidence": 0.75,
      "evidence": [
        { "shot": "strips/high/R04", "note": "flash synced to ball, but no stride and a 4-5 pose swap; contact over the plate" },
        { "shot": "strips/high/R07", "note": "camera cut 4-5; ball never in the glove (ahead in 7, behind the foot in 8)" },
        { "shot": "crops/high/R05-batter_feet", "note": "both stance soles hover with detached shadows" },
        { "shot": "strips/high/R03", "note": "set and leg lift only; release exists in high/desktop/R06" },
        { "shot": "strips/high/R10", "note": "trot planted but upright, fixed arm arcs" }
      ]
    },
    "environment": {
      "score": 5.5,
      "confidence": 0.75,
      "evidence": [
        { "shot": "high/desktop/R15", "note": "historic park wall and adjacent field have character" },
        { "shot": "high/desktop/R09", "note": "faceted cone/blob trees in front of photographic forest" },
        { "shot": "high/desktop/R05", "note": "repeated crowd tile above a blank grey wall band" },
        { "shot": "high/desktop/R13", "note": "black void treeline at night" }
      ]
    },
    "lighting": {
      "score": 6,
      "confidence": 0.75,
      "evidence": [
        { "shot": "crops/high/R14-batter", "note": "golden afternoon modelling faces and bodies" },
        { "shot": "high/desktop/R12", "note": "tower exposure, bloom, lit players, graded night sky" },
        { "shot": "crops/high/R16-runner1", "note": "soft contact shadows; eyes banded under brims" },
        { "shot": "high/desktop/R13", "note": "blotchy light pools and black perimeter" }
      ]
    },
    "ui": {
      "score": 6.5,
      "confidence": 0.8,
      "evidence": [
        { "shot": "high/desktop/R05", "note": "clean consistent score bug, count, pitch buttons, reticle" },
        { "shot": "high/desktop/R10", "note": "HOME RUN banner with distance hierarchy" },
        { "shot": "high/desktop/R01", "note": "translucent title menu loses contrast over scenery" }
      ]
    },
    "readability": {
      "score": 6,
      "confidence": 0.75,
      "evidence": [
        { "shot": "high/desktop/R06", "note": "ball, zone and catcher read at a glance" },
        { "shot": "high/desktop/R10", "note": "home-run hitter is a speck at the bottom edge" },
        { "shot": "high/desktop/R09", "note": "fielders 15-25 px, ball against the scoreboard" }
      ]
    },
    "mobile": {
      "score": 6,
      "confidence": 0.8,
      "evidence": [
        { "shot": "high/mobile/R05", "note": "large figures, legible HUD, thumb buttons" },
        { "shot": "high/mobile/R07", "note": "corner bases cut off, tiny players, empty foreground" },
        { "shot": "high/landscape/R05", "note": "CB button over the pitcher's legs" },
        { "shot": "high/landscape/R02", "note": "buttons clear of batter; feet cut by frame edge" }
      ]
    }
  },
  "gaps": [
    { "id": "G-phone-gpu-budget", "category": "mobile", "expectedGain": 0, "severity": 5, "effort": "M", "workstream": "WS6", "evidence": ["perf.json medium-mobile night gpuMs 1.33 (33 ms est.)", "perf.json high-mobile grounder 1.973, gap 1.282"], "fix": "Re-run perf-review 3x on medium-mobile unthrottled and report median gpuMs per scene; pass when the worst median <= 1.04 ms (<= 26 ms est.). If over, replace the discard-based headwear shadow-depth material with a separate headwear skinned submesh with castShadow=false, tighten the medium shadow-camera frustum, and re-measure." },
    { "id": "G-batting-helmet-fit", "category": "characters", "expectedGain": 0.5, "severity": 5, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R02-batter_head", "crops/high/R16-runner1", "crops/high/R08-CF"], "benchmark": "smb4-2", "fix": "Raise batting-helmet and cap brims so the lower edge clears the brow by >= 0.05 ft, close the ear flap's front edge into a shell, brim roughness >= 0.5. Test: both eyes visible and no brim pixel > 230/255 in R02-batter_head; no black eye band in R08-CF and R16-runner1." },
    { "id": "G-kit-cloth", "category": "characters", "expectedGain": 0.75, "severity": 5, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R08-CF"], "benchmark": "smb4-2; art-src/samples/reference-renders/si_jersey_front.png", "fix": "Bake fold/seam/AO normal maps (elbow, knee, crotch, belt), a button placket with >= 5 buttons, sleeve hem, belt loops and buckle, sewn V collar; matte cloth roughness ~0.8. Test: >= 3 fold lines per pant leg and visible buttons in R08-CF and R17-pitcher_hands." },
    { "id": "G-torso-volume", "category": "charfit", "expectedGain": 0.75, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R08-CF", "crops/high/R17-pitcher_hands", "crops/high/R12-pitcher"], "benchmark": "art-src/samples/reference-renders/mpfb2_athlete_three_quarter.png", "fix": "Shrink the jersey shoulder/deltoid/upper-arm offset toward the reference, lengthen the visible neck, remove the chest bulges. Test: shoulder:head width in R08-CF within 10% of the reference; no twin chest highlights in R17-pitcher_hands." },
    { "id": "G-decal-layering", "category": "characters", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R08-CF", "crops/high/R02-batter_hands"], "fix": "Composite front lettering above the placket piping (or stop the piping at the lettering band) and shrink the word to the chest region visible in bent poses. Test: LAKE HAMILTON, LAKESIDE and HOT SPRINGS read in full in R17-pitcher_hands, R08-CF and R02-batter_hands." },
    { "id": "G-ump-catcher-gear", "category": "characters", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R05-ump_head", "crops/high/R06-catcher_glove"], "fix": "Bind the mask cage to the head bone, bounded chin to brow in the crouch pose too; close the umpire's neck/shoulder skin gap with a collar; add segmented plates and straps to the catcher's chest protector and knee caps to the shin guards. Test: R05-ump_head and R06-catcher_glove." },
    { "id": "G-stance-feet", "category": "animation", "expectedGain": 0.3, "severity": 4, "effort": "S", "workstream": "WS2", "evidence": ["crops/high/R05-batter_feet"], "fix": "Run foot-plant IK during the batting stance on high and medium so the soles sit within 0.02 ft of the dirt. Test: no sole-to-shadow gap in R05-batter_feet." },
    { "id": "G-catch-contact", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["strips/high/R07"], "fix": "Glove-hand IK toward the predicted ball position over the last 0.25 s of a fielding clip, and parent the ball to the glove on the catch frame. Test: ball inside the glove by frame 8 of strips/high/R07, captured without a camera cut." },
    { "id": "G-glove-model", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R06-catcher_glove", "crops/high/R17-pitcher_hands"], "benchmark": "smb3-3", "fix": "Model a glove with web, pocket, heel, finger stalls and lacing, plus leather normal and roughness maps. Test: web and lacing visible in R06-catcher_glove and R17-pitcher_hands." },
    { "id": "G-swing-load-stride", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["strips/high/R04"], "benchmark": "smb4-2", "fix": "Key a load (hands back) and a front-foot stride spanning >= 2 sampled frames before contact, and move contact in front of the plate. Test: front foot lifts and lands between frames 1-4 of strips/high/R04, with no single-sample pose swap." },
    { "id": "G-fielding-hr-camera", "category": "readability", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS5", "evidence": ["high/desktop/R10", "high/desktop/R09", "high/mobile/R07"], "benchmark": "smb3-1", "fix": "Frame fielding/HR cameras so the ball carrier is >= 60 px tall and the batter-runner stays in frame on the trot; give portrait fielding its own framing that keeps both corner bases and drops the empty foreground. Test: R10, R09 and mobile R07." },
    { "id": "G-tree-crowd", "category": "environment", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS4", "evidence": ["high/desktop/R09", "high/desktop/R05", "high/desktop/R01"], "benchmark": "smb4-3", "fix": "Replace faceted cone/blob trees on high and medium with textured card/billboard trees matched to the backdrop palette; add seat rows and railings to the grey stand steps; break the crowd tile with >= 2 alternate tiles. Test: no faceted silhouettes in R09, no visible tile period in R05." }
  ],
  "calibration": {
    "characters": 7.5,
    "lighting": 7.5,
    "perfGate": "fail: est. phone GPU = medium-mobile night 1.33 ms x 25 = 33.3 ms > 26 (grounder 25.3, gap 24.2; identical-geometry high-mobile rows 1.026/1.973/1.282 ms do not rescue it; trend 14.4 -> 24.5 -> 25-33 ms). High desktop min 328.7 fps / p95 6.0 ms pass; medium phone proxy min 47.5 fps pass (p95 47 ms, watch); software GL 4-run median 18.7/15.9 vs 19.9/15.1 baseline, within noise (perf.json single run 18.4/13.6 was the outlier); heap 90.5/88.3/68.0 MB pass; download not in perf.json (captured medium pack 4.04 MB over, post-capture 3.63 MB per brief, unverified)",
    "factRulings": "R02 front helmet face black (A right) but nose/lips read in R10, R16 (advocate right), eyes banded by brims everywhere; ear flap strap from front, shell from behind; three builds shown (B wrong); upper arms inflated, not narrow (B wrong); R04 flash synced (B wrong) but no stride and 4-5 pose swap (A overstated load/stride); R07 camera cut 4-5 (advocate right), ball never in glove (real, 4th loop); R03 window ends at lift, release in R06 (advocate right); R05 stance feet hover (real); ump cage over chest in crouch and neck skin (real); catcher chest protector present but unconstructed (A overstated); landscape R02 buttons clear (A wrong); R05 pitcher not over plate (A wrong); R08 scoreboard is in-world (A wrong); low-tier cartoon head is the v2 player by design",
    "effortWeights": "S=1, M=2, L=4"
  },
  "verdict": "continue"
}
```
