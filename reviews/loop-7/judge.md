# Judge: loop 7, high tier

Capture paths are relative to `screenshots/review-loop-7/`. I read the rubric, the schema, the loop brief and `CHANGES.md`, both critics, the advocate, `reviews/HISTORY.md` (for trend only), `perf.json`, `fidelity.json`, the Budgets table in `VISUAL-PLAN-3.md` and the phone-ratio section of `research/perf-ceiling.md`. There is no calibration frame this loop.

**Captures I opened myself:**
- Close-ups: `crops/high/R02-batter_head`, `R02-batter_hands`, `R02-pitcher`, `R05-ump_head`, `R05-batter-front`, `R05-batter_feet`, `R06-catcher_glove`, `R07-SS`, `R10-batter-trot`, `R14-batter`, `R16-1B`, `R17-pitcher_hands`.
- Strips: `strips/high/R03`, `R04` (frame 5 enlarged 2.5×), `R07` (frames 7–8 enlarged 2×), `R10`.
- Frames: `high/desktop/R05`, `R12`, `R13`, `R15`; `high/mobile/R07`; `high/landscape/R05`, `R12`.
- Reference: `art-src/samples/reference-renders/mpfb2_athlete_three_quarter.png`.

I did not open the medium or low captures. The tier notes below rely on the critics' reports.

The critics are no more than 0.5 apart in any category, so no category triggers the 1.0 rule. I checked every claim the advocate disputed, and a few the critics disputed with each other.

## Performance gate: PASS

| Budget (VISUAL-PLAN-3) | Measured (perf.json; GPU and software-GL rows are medians of 3) | Result |
|---|---|---|
| Desktop/high: every scene ≥ 55 fps, p95 ≤ 22 ms | min 428.6 fps (grounder); worst p95 3.2 ms | pass |
| Phone/medium proxy, 4× CPU throttle: ≥ 30 fps (floor 24) | min 66.8 fps (grounder); worst p95 17.3 ms (about 58 fps). These are single runs, not medians. | pass, with wide margin |
| Phone/medium: estimated phone GPU ≤ 26 ms (unthrottled medium·mobile gpuMs × 25, the method of loops 1–6) | worst median is grounder 0.900 ms → **22.5 ms**; duel 18.6, gap 16.6, replay 17.2, night 17.4 ms | pass (loop 6 failed at 33 ms) |
| Software GL/low: no worse than the loop-0 baseline (duel 19.9 / grounder 15.1 fps) | 20.9 / 17.1 fps; p95 50.8 / 69.9 ms | pass (better than the baseline) |
| Heap: high < 192, medium < 128, low < 90 MB | max 103.1 / 93.9 / 82.2 MB | pass. Watch low, which is at 91% of its budget. |
| Medium-tier scene triangles ≤ about 650k (perf-ceiling) | max 530.6k (night) | pass |
| Download | not in perf.json | not verified |

Loop 6 failed on a single noisy medium·mobile night reading of 1.33 ms. Its median of 3 here is 0.694 ms, which confirms the brief's note that the loop-6 reading was noise. Because the gate passes, no WS6 gap is mandated.

## Category rulings

### characters: 5.5 (A 5.5, B 5.0, advocate 5.5)

**Loop-7 changes that show:**
- **Helmet ear shell.** It reads as a continuous shell in `crops/high/R10-batter-trot`.
- **Eyes under the brim.** They are visible when the camera is level with the face: `crops/high/R07-SS`, `R10-batter-trot`.
- **Umpire mask length.** It now stops at the chin. In loop 6 it ran down over the chest.

**Loop-7 changes that don't show:**
- **Brim over the eyes.** In `crops/high/R02-batter_head` the brim still sits on the eyes, and the right-hand side shell still hangs as a strip with background visible between it and the cheek. In `crops/high/R16-1B` the brim cuts straight across the eye line, though the camera is roughly level.
- **Shoulders.** They are still pad-like. The humps are worst in `crops/high/R02-pitcher` and `crops/high/R17-pitcher_hands`, where the arms come forward. In `crops/high/R10-batter-trot` and `crops/high/R16-1B`, with the arms down or back, the shoulder line is much closer to `mpfb2_athlete_three_quarter`. So the pads appear when the arms move forward or up, which points to how the shoulder deforms, not to the cloth relaxation that loop 7 changed.
- **Placket piping.** It still covers letters despite the larger decal offset: the H of "LAKE HAMILTON" in `crops/high/R17-pitcher_hands`, "SPRINGS" in `crops/high/R02-batter_hands`, and the L of "LAKESIDE" in `crops/high/R16-1B` and `crops/high/R07-SS`. "LAKESIDI" in `crops/high/R02-pitcher` still runs off the chest.

**Still below the 7 anchor:**
- **Cloth.** It is flat colour with no folds, and the belt's lower edge is jagged (`crops/high/R17-pitcher_hands`).
- **Gloves.** They are lobed mittens (`crops/high/R17-pitcher_hands`). The catcher's mitt is a fist (`crops/high/R06-catcher_glove`).
- **Small defects:**
  - The cleat decals are stair-stepped (`crops/high/R05-batter_feet`).
  - The sock-to-cleat seam is saw-toothed (`crops/high/R02-pitcher`, `crops/high/R07-SS`).
  - A cuff spike shows at the wrist (`crops/high/R16-1B`, `crops/high/R02-batter_hands`).
  - The catcher's chest-protector neck is jagged, and his shin guards flare (`crops/high/R06-catcher_glove`).

**Disputes:**
- **Umpire mask position: A is wrong, the advocate is right.** In `crops/high/R05-batter-front` and `crops/high/R14-batter` the cage sits forward of the face, from the brim to the chin, in profile. The real defect is in `crops/high/R05-ump_head`: the bars are broken into segments with tan gaps, and the cap brim hides the eyes.
- **Bat grip: B is partly wrong.** In `crops/high/R14-batter` and `crops/high/R05-batter-front` both hands are stacked and wrapped round the handle. In `crops/high/R02-batter_hands` the angle is ambiguous: the lower hand sits below the visible handle, which is probably occlusion.
- **"Pure black" face: A overstated it.** The mouth, chin and jaw read in `crops/high/R02-batter_head`; the eyes do not.
- **R10 shoulders: B is wrong.** They are among the most natural in the set (advocate right).
- **Builds.** The heavy pitcher in `crops/high/R02-pitcher` and the lean shortstop in `crops/high/R07-SS` differ, as in loop 6.

**Ruling: 5.5.** The model is above the 5 anchor (separate fingers, a modelled glove, readable helmets, real faces) and short of 7 on cloth, materials and gloves.

### charfit: 5.5 (A 5.5, B 5.0, advocate 5.5)
- **Head and limbs.** They are the same kind of human as `mpfb2_athlete_three_quarter`: compare the faces in `crops/high/R07-SS` and `crops/high/R14-batter`. Bind-pose IoU is 0.878 front and 0.889 side, and LOD1 stays within 0.006 IoU of LOD0 at every distance.
- **The dressed torso in forward-arm poses.** It diverges from the reference's sloped shoulders and visible neck (`crops/high/R02-pitcher`, `crops/high/R17-pitcher_hands`).
- **Garments.** They are far simpler than `si_jersey`.
- **Hands.** They are thick, with no taper (`crops/high/R17-pitcher_hands`).
- **LOD2.** Pixel error is 41–48%, which bears on the far players and on the low tier only.

**Ruling: 5.5.** This is the 5 anchor with credit for the face and hands.

### animation: 5.5 (A 6.0, B 5.5, advocate 6.0)

**What improved:**
- **Ready-clip planting works.** Both cleats sit flat with contact shadows in `crops/high/R16-1B` (advocate right).
- **Run cycle.** It plants in every panel of `strips/high/R10`.
- **Ball possession.** In `strips/high/R07` the ball is on the dirt just ahead of the glove in frame 7. In frame 8 it is gone from the ground and the possession ring is white. That is consistent with the new in-glove draw, but the glove is hidden behind the body, so the catch beat is implied, not shown. A's "behind his glove hand" is wrong.

**What has not:**
- **Stance feet: A is wrong, B and the advocate are right.** Despite the loop-7 IK change, both stance soles still hover in `crops/high/R05-batter_feet`. The left cleat clearly floats over a detached shadow, and the right is barely down.
- **Swing.** `strips/high/R04` frames 1–4 are almost the same pose: no load, no stride. The bat then jumps from cocked to through between frames 4 and 5, the same pose swap as in loops 5 and 6. A's "load in frames 1–4" is wrong.
- **Contact flash.** In frame 5 (enlarged) the flash sits at the bat barrel, and the ball is already a ball-length up its exit trail. The flash marks contact, so B's "detached" is overstated.
- **Fielding.** `strips/high/R07` still has a camera cut between frames 4 and 5, so the deceleration into the crouch is never sampled.
- **Pitch.** `strips/high/R03` covers the set and a real leg lift (frames 6–8). The strip ends before the stride.
- **Run arms.** The arm swing in `strips/high/R10` is small.

**Ruling: 5.5.** There is real progress since loop 6 (5.0): planted ready and run clips, and the ball off the ground at possession. But the swing still has no load, and the stance still floats.

### environment: 5.5 (A 5.5, B 5.0, advocate 5.5)
**What works:**
- mow-pattern turf, grained dirt, built towers and poles (`high/desktop/R12`);
- the historic grandstand and dugout (`crops/high/R14-batter`).

**What doesn't:**
- **Ad boards.** They overlap and read "GATOR FATORS" (`crops/high/R02-batter_hands`).
- **Behind the fence.** In `high/desktop/R15` a flat second field with grey oval patches shows past it. Faceted blob and cone trees sit in front of the photographic forest, with a hard seam between them.
- **Crowd.** It is a photo sheet above a blank grey wall band (`high/desktop/R05`).
- **Pitching rubber.** It is still a raised white slab (`crops/high/R02-pitcher`).

**Ruling: 5.5.**

### lighting: 6.0 (A 6.0, B 5.5, advocate 6.0)
- **Night turf: B is wrong, the advocate is right.** In `high/desktop/R12` the turf is saturated green, the towers bloom, and the players and zone read.
- **Golden hour.** It models faces and bodies (`crops/high/R14-batter`).
- **Contact shadows.** They sit under the players (`crops/high/R16-1B`).
- **R13.** `high/desktop/R13` has one hard-edged pool and a black treeline and corners (real).
- **Faces under brims.** They are dark (`crops/high/R02-batter_head`). As the advocate says, the cause is partly brim geometry: the fair-skinned fielder in `crops/high/R16-1B` is banded too.

**Ruling: 6.0.**

### ui: 6.5 (A 6.0, B 6.5, advocate 6.5)
- **Score bug and feedback.** The score bug, count pips, lit base diamond, pitcher and batter lines and the pitch-speed readout ("FB 78 mph") are clean and consistent (`high/desktop/R12`, `high/desktop/R13`). **A's "no pitch-result feedback" is wrong.**
- **Home-run banner.** "HOME RUN 396 FT" has clear hierarchy (`high/desktop/R15`).
- **Against:**
  - The right team panel is empty.
  - The control hint stays on screen during play (`high/desktop/R13`, "F or Space: fast-forward").
  - Nothing animates.
  - Landscape drops the secondary line (`high/landscape/R05`).

**Ruling: 6.5.**

### readability: 6.0 (A 6.0, B 5.5, advocate 6.0)
- **Duel cameras.** They read at a glance: zone, reticle, catcher, umpire, batter (`high/desktop/R05`, `high/desktop/R12`).
- **Portrait ground ball.** `high/mobile/R07` cuts off both corner bases, and the players are about 20 px tall.
- **Night wide shot.** In `high/desktop/R13` the fielders are about 20 px tall, but the rings help.

**Ruling: 6.0.**

### mobile: 6.0 (A 5.5, B 6.0, advocate 6.5)
- **Perf.** The phone proxy holds 66.8 fps minimum (perf.json), so the anchor's 30 fps clause is met (advocate right). Loop 6's proxy also met it, at 47.5 fps.
- **Landscape R12: A is wrong.** In `high/landscape/R12` BUNT, STEAL and SWING sit in the gutters. The batter's back foot is cut by the frame edge, not by a button.
- **Landscape R05.** The CB button covers the pitcher's legs (`high/landscape/R05`), and the reticle sits over the catcher's head.
- **Portrait fielding.** `high/mobile/R07` is not intentional framing: the corner bases are cut off, and the bottom third is netting, grass and an empty control band.

**Ruling: 6.0.** The advocate's 6.5 rests on perf, which was already met last loop. The framing faults that hold the score down are unchanged.

### Medium and low tiers (not opened; from the critics' reports)
- **Medium.** B reports the high-tier design with coarser shadows.
- **Low.** The cartoon head and stump feet are the v2 player, kept by design until a low pack exists (loop-6 ruling). They are not a new regression.

## Fact rulings (summary)
- **Umpire mask:** in front of the face (A wrong); the bars are segmented (real).
- **"Pure black" face:** overstated (A); the eyes are lost under brims on helmets and caps (real).
- **R10 shoulders:** natural (B wrong); the shoulder pads appear in forward-arm poses (R02-pitcher, R17).
- **Bat grip:** wraps in R14 and R05-front (B partly wrong).
- **Stance feet:** still hover (A wrong). Ready-clip feet plant (advocate right).
- **R04:** no load or stride and a 4→5 pose swap (A wrong); the flash is at the bat (B overstated).
- **R07:** camera cut 4–5; the ball is off the ground at possession in frame 8, but not visibly in the glove (A wrong on "behind").
- **Night turf:** not washed out (B wrong).
- **Pitch feedback:** shown (A wrong).
- **Landscape R12 buttons:** in the gutters (A wrong). **Landscape R05:** CB covers the pitcher's legs (real).
- **Piping through letters:** persists after the loop-7 decal change (real).

## Ranked gaps (gain ÷ effort; S=1, M=2, L=4; ties go to the characters priority)

1. **G-helmet-brim-eyes** (characters, WS1, S, gain 0.5). Gain ÷ effort 0.5.
   - **Fix:**
     - Raise the brim of the batting helmet and cap until its lower edge sits at least 0.08 ft above the upper eyelid in the rest pose; tilt the brim up 8–10°.
     - Tuck the lower edge of the ear shell to within 0.03 ft of the cheek and jaw so it doesn't hang free.
     - Add a skin-only hemisphere fill (sky colour, intensity about 0.25).
   - **Test:**
     - Both eyes visible, with face luminance above 25/255, in `crops/high/R02-batter_head` and `crops/high/R16-1B`.
     - No background visible between the shell and the cheek in `R02-batter_head`.
2. **G-shoulder-deformation** (charfit, WS1, M, gain 0.75). Gain ÷ effort 0.375.
   - **Cause.** The humps appear only when the arms come forward (R02-pitcher, R17) and not with the arms down (R10, R16), so the cause is shoulder skinning, not cloth relaxation.
   - **Fix:**
     - Re-weight the jersey and body vertices over the acromion and trapezius onto the clavicle and spine bones (at most 30% upper-arm influence).
     - Add an upper-arm twist bone, or a corrective shape that lowers the deltoid when the arm flexes forward past 45°.
   - **Test:**
     - The shoulder outline in `crops/high/R02-pitcher` and `R17-pitcher_hands` rises no higher than the base of the neck.
     - Shoulder-to-head width is within 10% of `mpfb2_athlete_three_quarter`.
3. **G-kit-cloth** (characters, WS1, M, gain 0.75). Gain ÷ effort 0.375.
   - **Fix:**
     - Bake fold, seam and AO normal maps: elbow, armpit, crotch and knee folds, and belt bunching.
     - Model a button placket with 5 or more buttons, belt loops and a buckle, and smooth the lower edge of the belt.
     - Use matte flannel (roughness about 0.8) with a fabric-grain normal.
   - **Test:** at least 3 fold lines per pant leg, visible buttons and a straight belt edge in `crops/high/R17-pitcher_hands` and `R02-pitcher`.
4. **G-decal-layering** (characters, WS1, S, gain 0.3). Gain ÷ effort 0.3.
   - **Cause.** The loop-7 depth offset didn't fix it, so it isn't depth-fighting. The piping is drawn over the lettering.
   - **Fix:**
     - Stop the piping geometry or texture at the lettering band (a 0.35 ft gap), or bake the piping into the jersey texture underneath the wordmark.
     - Clamp the word to the chest region visible at a 45° torso turn.
   - **Test:** "LAKE HAMILTON", "LAKESIDE" and "HOT SPRINGS" read in full in `crops/high/R17-pitcher_hands`, `R16-1B`, `R07-SS`, `R02-pitcher` and `R02-batter_hands`.
5. **G-ump-catcher-gear** (characters, WS1, S, gain 0.3). Gain ÷ effort 0.3.
   - **Cause corrected.** The cage is already in front of the face; the fault is the bars.
   - **Fix:**
     - Build the mask bars as continuous swept tubes with no segment gaps, and use a lower-crowned cap.
     - Close the jagged neck opening of the catcher's chest protector.
     - Add knee caps and two straps to the shin guards.
   - **Test:** no tan gaps in the bars in `crops/high/R05-ump_head`; a clean collar edge and knee caps in `R06-catcher_glove`.
6. **G-stance-feet** (animation, WS2, S, gain 0.3). Gain ÷ effort 0.3.
   - **Context.** Ready-clip IK works (R16-1B); the stance clip still floats.
   - **Fix:**
     - Log each foot's height before IK in the R05 stance. If it is over the 0.3 ft threshold, lower the stance clip's root or raise the threshold to 0.4 ft for the stance.
     - Check that the IK weight reaches 1 while the stance clip is playing.
   - **Test:** no visible gap between sole and shadow for either foot in `crops/high/R05-batter_feet`.
7. **G-landscape-pitch-buttons** (mobile, WS7, S, gain 0.3). Gain ÷ effort 0.3.
   - **Fix:** in landscape, stack FB, CH, SL and CB as a 2×2 block in the left gutter (at most 22% of the width), or raise the pitching camera's target by 8% of the viewport height.
   - **Test:** the pitcher's legs are fully visible in `high/landscape/R05`.
8. **G-adboard-backdrop** (environment, WS4, S, gain 0.3). Gain ÷ effort 0.3.
   - **Fix:**
     - Lay out the wall boards edge to edge with no overlap.
     - Hide the second field past the R15 fence, or dress it.
     - Fade the foot of the backdrop into fog of the tree colour.
   - **Test:** no "GATOR FATORS" in `crops/high/R02-batter_hands`; no flat field or hard seam in `high/desktop/R15`.
9. **G-glove-model** (characters, WS1, M, gain 0.5). Gain ÷ effort 0.25.
   - **Fix:** model a fielder's glove with a web, pocket, heel, finger stalls and lacing, plus leather normal and roughness maps (roughness about 0.5). Model a separate round catcher's mitt with a deep pocket.
   - **Test:** web and lacing visible in `crops/high/R17-pitcher_hands` and `R06-catcher_glove`.
10. **G-swing-load-stride** (animation, WS2, M, gain 0.5). Gain ÷ effort 0.25.
    - **Fix:** key a load (hands back 0.3 ft) and a front-foot stride that lifts and lands over at least 2 sampled frames before contact, with no single-tick jump from cocked to through.
    - **Test:** the front foot visibly lifts and lands between frames 1 and 4 of `strips/high/R04`, and frames 4 and 5 differ by less than half the swing arc.
11. **G-catch-contact** (animation, WS2, M, gain 0.5). Gain ÷ effort 0.25.
    - **Fix:**
      - Add glove-hand IK toward the predicted ball over the last 0.25 s before possession.
      - Make the possession frame show the ball in the glove pocket from the camera side.
      - Capture R07 with no camera cut, and add a 2-key deceleration from the run into the crouch.
    - **Test:** the ball is visible inside the glove in `strips/high/R07` frame 7 or 8; no cut between frames 4 and 5.
12. **G-phone-field-framing** (readability, WS5, M, gain 0.5). Gain ÷ effort 0.25.
    - **Fix:**
      - Give portrait fielding plays their own camera, fitted to the bases and the receiving defender.
      - Crop the empty foreground.
      - Keep the batting-camera runner in frame when a runner is on first.
    - **Test:** both corner bases are in frame in `high/mobile/R07`, and the runner is fully in frame in `high/desktop/R16`.

**Dropped from the top 12:**
- the sock and cleat decal edges (S, 0.2);
- the R13 night pools;
- crowd resolution;
- the raised pitching-rubber slab;
- HUD panel efficiency;
- body variety (already partly shown);
- LOD2 and the low tier (by design until a low pack exists).

```json
{
  "loop": 7,
  "role": "judge",
  "tier": "high",
  "scores": {
    "characters": {
      "score": 5.5,
      "confidence": 0.8,
      "evidence": [
        { "shot": "crops/high/R02-pitcher", "note": "shoulder humps in forward-arm pose, LAKESIDI off the chest, saw-tooth sock seam" },
        { "shot": "crops/high/R17-pitcher_hands", "note": "piping hides the H of HAMILTON, mitten glove, flat cloth, jagged belt" },
        { "shot": "crops/high/R02-batter_head", "note": "brim still over the eyes, side shell hangs as a strip; mouth and jaw read" },
        { "shot": "crops/high/R05-ump_head", "note": "segmented mask bars with tan gaps" },
        { "shot": "crops/high/R14-batter", "note": "umpire cage in front of the face (A wrong); both hands wrap the handle" },
        { "shot": "crops/high/R07-SS", "note": "lit face with visible eyes under a level camera; AKESIDE cut" }
      ]
    },
    "charfit": {
      "score": 5.5,
      "confidence": 0.75,
      "evidence": [
        { "shot": "crops/high/R07-SS", "note": "MPFB-derived face and limb proportions; IoU 0.878/0.889" },
        { "shot": "crops/high/R02-pitcher", "note": "shoulder line far above the sloped reference shoulder in forward-arm pose" },
        { "shot": "crops/high/R10-batter-trot", "note": "arms-down shoulder line close to mpfb2_athlete_three_quarter" },
        { "shot": "crops/high/R17-pitcher_hands", "note": "thick untapered fingers versus mpfb2_athlete_hand" }
      ]
    },
    "animation": {
      "score": 5.5,
      "confidence": 0.75,
      "evidence": [
        { "shot": "strips/high/R04", "note": "frames 1-4 static, no load or stride, 4-5 pose swap; flash at the bat barrel" },
        { "shot": "strips/high/R07", "note": "camera cut 4-5; ball off the ground at possession in frame 8 but glove hidden" },
        { "shot": "crops/high/R05-batter_feet", "note": "both stance soles hover despite the loop-7 IK change" },
        { "shot": "crops/high/R16-1B", "note": "ready-clip feet flat with contact shadows" },
        { "shot": "strips/high/R10", "note": "planted run cycle, small arm swing" },
        { "shot": "strips/high/R03", "note": "set and real leg lift; stride not in the window" }
      ]
    },
    "environment": {
      "score": 5.5,
      "confidence": 0.75,
      "evidence": [
        { "shot": "high/desktop/R15", "note": "flat second field past the fence, faceted trees against the photo forest" },
        { "shot": "crops/high/R02-batter_hands", "note": "overlapping boards read GATOR FATORS" },
        { "shot": "high/desktop/R05", "note": "photo crowd sheet above a blank grey wall band" },
        { "shot": "crops/high/R14-batter", "note": "historic grandstand and dugout with character" }
      ]
    },
    "lighting": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        { "shot": "high/desktop/R12", "note": "saturated night turf, tower bloom, readable players (B wrong on washed)" },
        { "shot": "crops/high/R14-batter", "note": "golden-hour modelling of faces and bodies" },
        { "shot": "high/desktop/R13", "note": "one hard pool, black treeline and corners" },
        { "shot": "crops/high/R16-1B", "note": "contact shadows; brim bands the eyes even on a fair face" }
      ]
    },
    "ui": {
      "score": 6.5,
      "confidence": 0.8,
      "evidence": [
        { "shot": "high/desktop/R13", "note": "score bug, count, pitcher/batter lines, FB 78 mph (A wrong on no pitch feedback); hint stays on screen" },
        { "shot": "high/desktop/R15", "note": "HOME RUN 396 FT banner with hierarchy" },
        { "shot": "high/landscape/R05", "note": "secondary line dropped in landscape" }
      ]
    },
    "readability": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        { "shot": "high/desktop/R05", "note": "zone, reticle, catcher, umpire and batter read at a glance" },
        { "shot": "high/desktop/R12", "note": "night ball, zone and fielders read" },
        { "shot": "high/mobile/R07", "note": "corner bases cut, players about 20 px" }
      ]
    },
    "mobile": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        { "shot": "high/landscape/R12", "note": "buttons in the gutters, batter clear (A wrong)" },
        { "shot": "high/landscape/R05", "note": "CB button covers the pitcher's legs" },
        { "shot": "high/mobile/R07", "note": "portrait fielding framing cuts corner bases, empty foreground" },
        { "shot": "perf.json medium-mobile 4x throttle", "note": "min 66.8 fps, p95 17.3 ms: 30 fps clause met" }
      ]
    }
  },
  "gaps": [
    { "id": "G-helmet-brim-eyes", "category": "characters", "expectedGain": 0.5, "severity": 5, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R02-batter_head", "crops/high/R16-1B"], "benchmark": "smb4-2", "fix": "Raise helmet and cap brims so the lower edge sits >= 0.08 ft above the upper eyelid at rest and tilt them up 8-10 degrees; tuck the ear-shell lower edge to within 0.03 ft of cheek and jaw; add a skin-only hemisphere fill (~0.25). Test: both eyes visible with face luminance > 25/255 in R02-batter_head and R16-1B; no background between shell and cheek." },
    { "id": "G-shoulder-deformation", "category": "charfit", "expectedGain": 0.75, "severity": 5, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R02-pitcher", "crops/high/R17-pitcher_hands", "crops/high/R10-batter-trot"], "benchmark": "art-src/samples/reference-renders/mpfb2_athlete_three_quarter.png", "fix": "Humps appear only in forward-arm poses, so fix skinning: re-weight acromion/trapezius verts of jersey and body to clavicle and spine (<= 30% upper-arm influence) and add an upper-arm twist bone or corrective shape lowering the deltoid past 45 degrees of forward flexion. Test: shoulder outline in R02-pitcher and R17-pitcher_hands no higher than the base of the neck; shoulder:head width within 10% of the reference." },
    { "id": "G-kit-cloth", "category": "characters", "expectedGain": 0.75, "severity": 5, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R02-pitcher"], "benchmark": "smb4-2; art-src/samples/reference-renders/si_jersey_three_quarter.png", "fix": "Bake fold/seam/AO normal maps (elbow, armpit, crotch, knee, belt bunching); model a placket with >= 5 buttons, belt loops and buckle, straight belt edge; matte flannel roughness ~0.8 with grain normal. Test: >= 3 fold lines per pant leg, visible buttons and straight belt edge in R17-pitcher_hands and R02-pitcher." },
    { "id": "G-decal-layering", "category": "characters", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R16-1B", "crops/high/R02-pitcher"], "fix": "Not depth-fighting (the loop-7 offset did not fix it): stop the piping at the lettering band with a 0.35 ft gap, or bake the piping under the wordmark in the jersey texture; clamp the word to the chest visible at a 45-degree turn. Test: LAKE HAMILTON, LAKESIDE and HOT SPRINGS read in full in R17-pitcher_hands, R16-1B, R07-SS, R02-pitcher and R02-batter_hands." },
    { "id": "G-ump-catcher-gear", "category": "characters", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R05-ump_head", "crops/high/R06-catcher_glove"], "fix": "Cage position is already correct. Rebuild mask bars as continuous swept tubes with no segment gaps; close the catcher chest protector's jagged neck opening; add knee caps and two straps to the shin guards. Test: no tan gaps in R05-ump_head bars; clean collar and knee caps in R06-catcher_glove." },
    { "id": "G-stance-feet", "category": "animation", "expectedGain": 0.3, "severity": 4, "effort": "S", "workstream": "WS2", "evidence": ["crops/high/R05-batter_feet", "crops/high/R16-1B"], "fix": "Ready-clip IK works but the stance still floats: log pre-IK foot height in the R05 stance, lower the stance clip root or raise the threshold to 0.4 ft for the stance, and assert the IK weight reaches 1 while the stance plays. Test: no sole-to-shadow gap for either foot in R05-batter_feet." },
    { "id": "G-landscape-pitch-buttons", "category": "mobile", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/landscape/R05"], "fix": "In landscape, stack FB/CH/SL/CB as a 2x2 block in the left gutter (<= 22% of the width) or raise the pitching-camera target by 8% of the viewport height. Test: pitcher's legs fully visible in high/landscape/R05." },
    { "id": "G-adboard-backdrop", "category": "environment", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS4", "evidence": ["crops/high/R02-batter_hands", "high/desktop/R15"], "benchmark": "smb4-3", "fix": "Lay the wall boards edge to edge with no overlap; hide or dress the second field past the R15 fence; fade the backdrop foot into tree-coloured fog. Test: no GATOR FATORS in R02-batter_hands; no flat field or hard seam in R15." },
    { "id": "G-glove-model", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R06-catcher_glove"], "benchmark": "smb3-3", "fix": "Model a fielder's glove with web, pocket, heel, finger stalls and lacing plus leather normal/roughness (~0.5), and a separate round catcher's mitt with a deep pocket. Test: web and lacing visible in R17-pitcher_hands and R06-catcher_glove." },
    { "id": "G-swing-load-stride", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["strips/high/R04"], "benchmark": "smb4-2", "fix": "Key a load (hands back 0.3 ft) and a front-foot stride lifting and landing over >= 2 sampled frames before contact; no single-tick cocked-to-through jump. Test: front foot lifts and lands between frames 1-4 of strips/high/R04; frames 4 and 5 differ by less than half the swing arc." },
    { "id": "G-catch-contact", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["strips/high/R07"], "fix": "Glove-hand IK toward the predicted ball over the last 0.25 s before possession; show the ball in the pocket from the camera side on the possession frame; capture R07 without the camera cut and add a 2-key run-to-crouch deceleration. Test: ball visible in the glove in strips/high/R07 frame 7 or 8; no cut between frames 4 and 5." },
    { "id": "G-phone-field-framing", "category": "readability", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS5", "evidence": ["high/mobile/R07", "high/desktop/R16"], "benchmark": "smb3-1", "fix": "Portrait fielding plays get their own camera fitted to the bases and the receiving defender, cropping the empty foreground; the batting camera keeps a runner on first in frame. Test: both corner bases in frame in high/mobile/R07; runner fully in frame in high/desktop/R16." }
  ],
  "calibration": {
    "perfGate": "pass: high desktop min 428.6 fps / p95 3.2 ms; medium phone proxy (4x CPU) min 66.8 fps / p95 17.3 ms (single runs); est. phone GPU = worst medium-mobile median gpuMs 0.900 (grounder) x 25 = 22.5 ms <= 26 (loop-6 night 1.33 ms re-measured 0.694 ms median, confirming noise); software GL 20.9/17.1 vs 19.9/15.1 baseline, better; heap 103.1/93.9/82.2 MB pass (low at 91% of budget, watch); medium tris max 531k <= 650k; download not in perf.json",
    "factRulings": "ump mask in front of the face (A wrong), bars segmented (real); pure-black face overstated (A), eyes lost under brims on helmets and caps (real); R10 shoulders natural (B wrong), humps appear in forward-arm poses; grip wraps in R14/R05-front (B partly wrong); stance feet still hover (A wrong), ready-clip feet plant (advocate right); R04 no load/stride and 4-5 pose swap (A wrong), flash at the bat (B overstated); R07 camera cut 4-5, ball off the ground at possession in frame 8 but not visibly in the glove (A wrong on behind); night turf not washed (B wrong); pitch-speed feedback shown (A wrong); landscape R12 buttons in the gutters (A wrong); landscape R05 CB over the pitcher's legs (real); piping through letters persists after the loop-7 decal change (real)",
    "effortWeights": "S=1, M=2, L=4"
  },
  "verdict": "continue"
}
```
