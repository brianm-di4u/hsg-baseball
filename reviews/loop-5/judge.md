# Judge: loop 5, high tier

Capture paths are relative to `screenshots/review-loop-5/`. The critics agree to within 0.5 in every category, so no category triggered the "more than 1.0" rule. The advocate disputes seven facts, and I opened the captures for each one: `high/desktop/R04`, `crops/high/R04-batter`, `strips/high/R04`, `high/desktop/R06`, `high/landscape/R10`, `crops/high/R10-batter-trot`, `crops/high/R02-batter_head`, `crops/high/R02-batter_hands`, `crops/high/R14-batter`, `crops/high/R17-pitcher-back`, `crops/high/R08-CF` and `crops/high/R16-1B`. To ground the scores I also opened `crops/high/R17-pitcher_hands`, `crops/high/R05-batter_feet`, `strips/high/R07`, `strips/high/R03`, `high/desktop/R12` and `high/mobile/R07`.

## Fact rulings

1. **The R04 swing is out of sync with the ball (Critic A): wrong.** In `high/desktop/R04` the ball has only just passed the mound and the batter hasn't started his swing. The ball in `crops/high/R04-batter` sits near the camera, so the freeze is before the swing. The swing still has no load: `strips/high/R04` frames 1–4 are a static stance, and the bat jumps from cocked to through the zone between frames 4 and 5. Both critics are right about that.
2. **The R06 ball is a smear far from the pitcher (A): wrong.** It sits just beside the raised throwing hand with a short trail.
3. **The HR banner hides the ball in `high/landscape/R10` (A): wrong.** The ball is visible just under the banner's lower edge. It is crowded, though, and the banner takes about a fifth of the action area.
4. **Every helmeted face is crushed to black (A): overstated.** `crops/high/R02-batter_head` is nearly black, with only the lips and chin reading. `crops/high/R10-batter-trot` shows a nose and lips, and the faces in `crops/high/R14-batter` are modelled. The fault is lighting under dark helmets, not geometry.
5. **The trot arms are locked (A): wrong.** In `crops/high/R10-batter-trot` the elbows are bent about 90° and the arms are out of phase. The swing amplitude is small.
6. **Three builds aren't shown (Codex): wrong.** `crops/high/R17-pitcher-back` is lean and tall, `crops/high/R16-1B` is average, and `crops/high/R08-CF` is stocky.
7. **Grip: both sides are partly right.**
   - In `crops/high/R14-batter` the top hand's fingers curl over the handle.
   - In `crops/high/R02-batter_hands` the bottom hand sits beside the handle with its fingers open.
   - The grip is loose, not wrapped.

Two more defects I saw myself:
- In `strips/high/R07` frame 8 the ball lies under the shortstop's body, not in the glove. This has recurred for three loops.
- In `crops/high/R17-pitcher-back` the pitcher stands on a raised white slab.

## Category rulings

**Characters: 5.0.** All three reviewers say 5.0, and the close-ups agree.
- Things that count toward the 7 anchor:
  - Three builds now differ visibly.
  - The bare hand has separate fingers (`crops/high/R17-pitcher_hands`).
  - There is material contrast between helmet, flannel and glove.
- Things that hold it at the 5 anchor:
  - The cleats hover with a visible gap (`crops/high/R05-batter_feet`).
  - The ear flaps are flat cards and the brim is chrome-white (`crops/high/R02-batter_head`).
  - The masks are loose ladders hanging off the face (`crops/high/R14-batter`).
  - The rebuilt glove is a smooth four-stall mitt with no pocket, web or lacing.
  - The wordmarks are broken ("LAKF HAMII TON") and the chest bulges read as breasts (`crops/high/R17-pitcher_hands`).
  - "HCT SPRI'GS" floats off the torso (`crops/high/R02-batter_hands`).
  - The uniforms have no folds.

**Charfit: 5.5.** The advocate's correction stands: faces have real modelled features where they are lit (`crops/high/R14-batter`, `crops/high/R10-batter-trot`), and proportions hold from broadcast distance to close-up. IoU is 0.875 front and 0.900 side. The stocky build departs from `mpfb2_athlete_three_quarter.png`, though: balloon upper arms, bulging trapezius and a barrel chest (`crops/high/R08-CF`). LOD2 pixel error is 38–45% at every distance. That is above the 5 anchor and well short of 7.

**Animation: 5.0.** Both critics' 5.0 stands, even after A's errors are removed. What is on screen matches the 5 anchor almost word for word:
- Floaty feet in the stance (`crops/high/R05-batter_feet`).
- A swing that pose-swaps instead of loading and rotating (`strips/high/R04`, frames 4–5).
- A fielding beat where the ball never reaches the glove (`strips/high/R07`, frame 8).

On the credit side, the leg lift in `strips/high/R03` frames 6–8 is real, the release pose in `high/desktop/R06` reads, and the run cycles alternate. The advocate's 5.5 rests on correcting A's misreads, but those corrections don't remove these three defects.

**Environment: 5.5.** All three agree.
- Strengths: mow checkerboard, dirt grain, towers, foul poles and distance markers (`high/desktop/R04`, `high/desktop/R12`).
- Weaknesses:
  - The crowd is a repeating photo billboard over grey box stands (`crops/high/R04-batter`, `crops/high/R17-pitcher-back`).
  - The pitcher's rubber is a raised slab.
  - The rebuilt trees still read as faceted lumps up close (`crops/high/R16-1B`).

**Lighting: 5.5.** The golden key models faces in `crops/high/R14-batter`, and the contact shadows sit under planted feet (`crops/high/R16-1B`, `crops/high/R10-batter-trot`). But there is no fill under dark helmets (`crops/high/R02-batter_head`). The night game in `high/desktop/R12` lights the field evenly, like day, with no tower pooling or falloff. That fits the 5 anchor plus part of the 7.

**UI: 6.0.**
- Strengths:
  - The bug, count, bases diamond, pitch speed and batter line are consistent and legible (`high/desktop/R04`, `high/desktop/R12`).
  - The HR banner has clear hierarchy.
- Weaknesses:
  - Landscape drops the pitcher, speed and batter line (Codex, `high/landscape/R12`).
  - The banner crowds the ball and takes a large share of the landscape view (`high/landscape/R10`).
  - The heavy fixed rails read as an app shell, not a broadcast package.

The advocate fixed one of A's facts, but the anchor-7 test ("nothing clipped, stale or overlapping") still fails.

**Readability: 6.0.**
- At a glance on desktop: the ball, zone and batter (`high/desktop/R04`), and the ball at release (`high/desktop/R06`).
- Problems:
  - In `high/mobile/R07` first base is off the right edge and the lower fifth is empty backstop dirt.
  - The gap-chase figures are tiny (A, `strips/high/R08`).

That doesn't meet "every frame, both viewports".

**Mobile: 6.0.**
- Strengths: portrait batting is large and has thumb-sized buttons (A and Codex, `high/mobile/R02`), and the phone proxy holds 50.6 fps or better.
- Weaknesses:
  - The portrait fielding frame isn't intentional: corner bags are lost and the bottom is wasted (`high/mobile/R07`).
  - Landscape loses the info line, and the banner eats the view (`high/landscape/R10`).

The anchor-7 test "portrait and landscape framing both intentional" fails.

**Total: 44.5.** That is down from 46.0 in loop 4. The drop comes from absolute scoring on today's captures, not from new defects. Loop 5's real gains, the three builds and the landscape pad, don't move any category across an anchor.

## Performance gate: narrow fail (software GL)

| Check | Loop 5 | Threshold | Result |
|---|---|---|---|
| Desktop / high | min 472.2 fps (night), worst p95 3.1 ms | ≥ 55 fps, p95 ≤ 22 ms | Pass |
| Phone proxy (medium, 4× throttle) | min 50.6 fps; worst p95 34.4 ms | ≥ 30 fps | Pass |
| Estimated phone GPU | max unthrottled medium-mobile 0.978 ms × 25 = 24.5 ms | ≤ 26 ms | Pass, but up from 14.4 ms; medium-mobile tris rose from 208k to 316k |
| Heap | high 73.8, medium 84.3, low 71.5 MB | 192 / 128 / 90 MB | Pass |
| Download | not in perf.json | | Unverified |
| Software GL, duel | 17.0 fps / p50 57.1 ms | 19.9 fps / p50 49.3 ms (loop-0 baseline) | Fail |
| Software GL, grounder | 14.2 fps | 15.1 fps | Within noise |

The software-GL duel figure is 15% below baseline. It is outside the 18.2–19.9 fps band from five earlier runs, and its p50 is 16% worse. The p95 is flat. Both software rows gained about 28.5k triangles, which lines up with this loop's tree rebuild. The plan says "no worse than baseline", so I rule a narrow fail, and the top gap is a WS6 fix. If a 3-run re-measure puts the duel scene back inside the band, the gate passes without code changes.

## Ranked gaps (top 12, by gain ÷ effort with S=1, M=2, L=4; the perf gate is first by rule)

1. **G-perf-tree-lod** (WS6, S): put the loop-4 single-mesh trees, or impostors, on the low and medium tiers.
   - Test: software GL duel ≥ 18.5 fps with p50 ≤ 53 ms over 3 runs.
   - Test: max unthrottled medium-mobile GPU time ≤ 0.8 ms.
2. **G-fill-and-night** (WS3, S, +0.6): merges face fill and night exposure.
   - Add a dirt-bounce hemisphere or a per-character fill.
   - Lower the night ambient and add tower falloff.
3. **G-mask-fit** (WS1, S, +0.5): parent the umpire and catcher masks to the head bone, with a frame and pads.
4. **G-feet-grounding** (WS2, S, +0.5): foot-lock IK in the stance.
5. **G-helmet-flaps-brim** (WS1, S, +0.4): a curved flap shell and a low-metalness brim.
6. **G-ball-in-glove** (WS2, S, +0.3): parent the ball to a pocket socket on possession.
7. **G-swing-load-stride** (WS2, M, +0.6): the cause is the missing load and the frame 4–5 pose swap, not desync.
8. **G-stocky-anatomy** (WS1, M, +0.5): cap the muscle morphs and flatten the chest.
9. **G-mobile-framing** (WS5, M, +0.5): merges field awareness and the mobile HUD gaps.
10. **G-hands-grip-bat** (WS2, M, +0.4)
11. **G-glove-leather** (WS1, M, +0.4)
12. **G-wordmark-decal** (WS1, M, +0.4)

Dropped below the cut:
- Cloth folds and uniform construction (L).
- Crowd and stands (L).
- Run arm pump.
- The raised rubber.
- The low-tier cartoon model. All three reviewers report it as a regression. I didn't open it, so it isn't scored.

**Verdict: continue.** No category gate is met, and the performance gate narrowly fails.

```json
{
  "loop": 5,
  "role": "judge",
  "tier": "high",
  "verdict": "continue",
  "scores": {
    "characters": {
      "score": 5.0,
      "confidence": 0.85,
      "evidence": [
        {"shot": "crops/high/R05-batter_feet", "note": "both cleats hover with a gap above offset shadows; jagged stripe texture"},
        {"shot": "crops/high/R17-pitcher_hands", "note": "four-stall mitt with no pocket, web or lacing; LAKF HAMII TON glyphs; chest bulges; good bare hand"},
        {"shot": "crops/high/R02-batter_head", "note": "flat card ear flaps, chrome-white brim, face near-black"},
        {"shot": "crops/high/R14-batter", "note": "umpire and catcher masks are loose ladders hanging off the face"},
        {"shot": "crops/high/R08-CF", "note": "stocky build, distinct from lean R17-pitcher-back and average R16-1B: 3 builds met"}
      ]
    },
    "charfit": {
      "score": 5.5,
      "confidence": 0.75,
      "evidence": [
        {"shot": "crops/high/R14-batter", "note": "lit faces show modelled nose, brow and lips; proportions plausible"},
        {"shot": "crops/high/R08-CF", "note": "balloon upper arms, bulging traps and barrel chest vs mpfb2_athlete_three_quarter"},
        {"shot": "crops/high/R16-1B", "note": "average build holds reference proportions in a crouch"},
        {"shot": "high/desktop/R04", "note": "silhouette holds at broadcast distance; IoU 0.875/0.900, LOD2 error 38-45%"}
      ]
    },
    "animation": {
      "score": 5.0,
      "confidence": 0.8,
      "evidence": [
        {"shot": "strips/high/R04", "note": "static stance 1-4, bat pose-swaps 4-5; finish and flash 6-8"},
        {"shot": "strips/high/R07", "note": "run reads; camera reframe 4-5; ball under the body, not in the glove, at frame 8"},
        {"shot": "strips/high/R03", "note": "real leg lift in 6-8; strip ends before stride"},
        {"shot": "high/desktop/R04", "note": "R04 freeze is pre-swing (ball just past the mound): no desync, Critic A wrong"},
        {"shot": "crops/high/R05-batter_feet", "note": "stance feet float"}
      ]
    },
    "environment": {
      "score": 5.5,
      "confidence": 0.8,
      "evidence": [
        {"shot": "high/desktop/R04", "note": "mow stripes, dirt grain, towers, distance markers, scoreboard"},
        {"shot": "crops/high/R17-pitcher-back", "note": "photo-billboard crowd on grey box stands; pitcher's rubber a raised slab"},
        {"shot": "crops/high/R16-1B", "note": "rebuilt trees still read as faceted lumps near the camera"}
      ]
    },
    "lighting": {
      "score": 5.5,
      "confidence": 0.8,
      "evidence": [
        {"shot": "crops/high/R14-batter", "note": "golden key models the faces"},
        {"shot": "crops/high/R02-batter_head", "note": "no fill under the black helmet; only the lips and chin read"},
        {"shot": "high/desktop/R12", "note": "night field evenly lit like day; no tower pooling"},
        {"shot": "crops/high/R10-batter-trot", "note": "contact shadow attached under the planted foot"}
      ]
    },
    "ui": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R04", "note": "consistent bug, count, bases, FB 77 mph, pitcher and batter lines"},
        {"shot": "high/landscape/R10", "note": "ball visible just below the banner (A wrong), but the banner takes about a fifth of the view"},
        {"shot": "high/landscape/R12", "note": "pitcher, speed and batter line dropped in landscape"}
      ]
    },
    "readability": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "high/desktop/R06", "note": "ball at the throwing hand with a short trail (A wrong); zone clear"},
        {"shot": "high/mobile/R07", "note": "first base off the right edge; distant fielders tiny; empty lower fifth"},
        {"shot": "strips/high/R08", "note": "gap-chase ball and outfielders very small"}
      ]
    },
    "mobile": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "high/mobile/R02", "note": "large batter, legible HUD, thumb-sized buttons"},
        {"shot": "high/mobile/R07", "note": "portrait fielding frame loses corner bags and wastes the bottom"},
        {"shot": "high/landscape/R10", "note": "banner dominates the landscape action area"},
        {"shot": "high/landscape/R12", "note": "info line missing in landscape"}
      ]
    }
  },
  "gaps": [
    {"id": "G-perf-tree-lod", "category": "environment", "expectedGain": 0.0, "severity": 5, "effort": "S", "workstream": "WS6", "evidence": ["perf.json soft duel 17.0 fps vs 19.9 baseline", "perf.json medium mobile gpuMs 0.978 vs 0.509 in loop 4"], "fix": "Performance-gate fix: low and medium tiers use the loop-4 single-cone and single-ball tree meshes (or impostor cards beyond 60 m); pass when software GL duel >= 18.5 fps with p50 <= 53 ms over 3 runs and max unthrottled medium-mobile gpuMs <= 0.8 ms."},
    {"id": "G-fill-and-night", "category": "lighting", "expectedGain": 0.6, "severity": 4, "effort": "S", "workstream": "WS3", "evidence": ["crops/high/R02-batter_head", "high/desktop/R12"], "benchmark": "smb3-3; smb4-1", "fix": "Add a dirt-coloured hemisphere bounce or per-character fill so eyes read under dark helmets (face luminance > 15% in R02-batter_head); lower the night ambient and give each tower a spot falloff so high/desktop/R12 shows a luminance gradient between the infield and the outfield corners."},
    {"id": "G-mask-fit", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R14-batter", "crops/high/R05-ump_head", "crops/high/R06-catcher_glove"], "benchmark": "smb3-1", "fix": "Parent the umpire and catcher masks to the head bone with a perimeter frame, forehead and chin pads, cage 2-3 cm off the face spanning brow to chin; no bars below the chin in R05-ump_head or R14-batter."},
    {"id": "G-feet-grounding", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS2", "evidence": ["crops/high/R05-batter_feet"], "fix": "Foot-lock IK that snaps sole vertices to ground height in the stance and other planted phases; 0 px sole-to-dirt gap in R05-batter_feet at 2x."},
    {"id": "G-helmet-flaps-brim", "category": "characters", "expectedGain": 0.4, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R02-batter_head", "crops/high/R10-batter-trot"], "fix": "Model the ear flap as a curved shell continuous with the helmet over the ear with an ear hole; give the brim the helmet's paint material at metalness <= 0.1 so it is not a white chrome strip."},
    {"id": "G-ball-in-glove", "category": "animation", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS2", "evidence": ["strips/high/R07"], "fix": "On possession, parent the ball to a pocket socket on the glove bone and blend the glove hand to the ball's intercept point over the last 3 ticks; in strips R07 frame 8 the ball is inside the glove outline."},
    {"id": "G-swing-load-stride", "category": "animation", "expectedGain": 0.6, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["strips/high/R04", "high/desktop/R04"], "benchmark": "smb4-2", "fix": "Author a load (hands back, weight to the rear leg) and a front-foot stride during the pitch flight, then hip-first rotation with in-betweens; strips R04 frames 2-4 show the hands moving back and the front foot lifting, and no frame-to-frame bat jump over 60 degrees. The cause is the missing load, not desync."},
    {"id": "G-stocky-anatomy", "category": "charfit", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R08-CF", "crops/high/R17-pitcher_hands"], "benchmark": "mpfb2_athlete_three_quarter", "fix": "Cap the stocky upper-arm, deltoid and trapezius morphs, and flatten the pectoral bulge under the jersey with a cloth offset shell; R08-CF upper-arm width <= 1.15x the average build and no breast-like shading in R17-pitcher_hands."},
    {"id": "G-mobile-framing", "category": "mobile", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS5", "evidence": ["high/mobile/R07", "high/landscape/R10", "high/landscape/R12"], "benchmark": "ootp26-1", "fix": "Portrait fielding camera framed to include both corner bags, with the lower fifth spent on the infield instead of backstop dirt; landscape restores a one-line pitcher, speed and batter strip and caps the result banner at 12% of the view height."},
    {"id": "G-hands-grip-bat", "category": "characters", "expectedGain": 0.4, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["crops/high/R02-batter_hands", "crops/high/R14-batter"], "fix": "IK both palms to handle sockets 6 cm apart, with fingers curled to bat radius; in R02-batter_hands the bat axis passes through both closed fists and the bottom hand's fingers wrap the handle."},
    {"id": "G-glove-leather", "category": "characters", "expectedGain": 0.4, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R06-catcher_glove"], "benchmark": "smb3-3", "fix": "Add a pocket cavity, a laced web readable from the front, edge binding and a stitch and lace normal map, plus a separate round, padded catcher's mitt; lacing visible in R17-pitcher_hands, distinct mitt in R06-catcher_glove."},
    {"id": "G-wordmark-decal", "category": "characters", "expectedGain": 0.4, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R02-batter_hands"], "fix": "Render wordmarks and piping as a high-resolution or SDF decal projected onto the torso surface, with UVs clear of the sleeve seam; LAKE HAMILTON and HOT SPRINGS fully legible and inside the torso silhouette, no sawtooth on the belt edge."}
  ],
  "calibration": {
    "perfGate": "fail (narrow): software GL duel 17.0 fps / p50 57.1 ms vs 19.9 / 49.3 baseline, outside the 18.2-19.9 band of 5 prior runs, +28.5k tris from the tree rebuild; grounder 14.2 vs 15.1 within noise; p95 flat. High desktop min 472.2 fps / p95 3.1 ms pass; medium phone proxy min 50.6 fps pass; est. phone GPU 0.978 ms x 25 = 24.5 ms <= 26 (up from 14.4); heap 73.8/84.3/71.5 MB pass; download not in perf.json",
    "factRulings": "R04 freeze is pre-swing, not desync (A wrong), but no load and a 4-5 pose swap (real); R06 ball at the hand (A wrong); landscape R10 ball visible below the banner (A wrong); helmeted faces not all black, only R02 dark-helmet case (A overstated); trot elbows bent and alternating (A wrong); three builds visible (Codex wrong); grip: R14 top hand wraps, R02 bottom hand open (both partly right); R07 frame 8 ball not in the glove (judge-observed, recurring); raised rubber slab (real)",
    "effortWeights": "S=1, M=2, L=4"
  }
}
```
