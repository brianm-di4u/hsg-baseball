# Judge ruling: loop 2, high tier

Capture paths are relative to `screenshots/review-loop-2/`. I opened `crops/high/R02-batter_head`, `R04-batter`, `R05-ump_head`, `R05-batter_feet`, `R07-SS`, `R12-pitcher`, `R14-batter`, `R17-pitcher_hands`, `strips/high/R04`, `R07`, `R10`, `high/desktop/R06`, `R13`, `R16`, `high/mobile/R02` and `high/landscape/R05`. No category has a critic spread above 1.0. My rulings below settle the facts the advocate disputed.

## Performance gate: FAIL (phone GPU estimate)

Checked against `VISUAL-PLAN-3.md` "Budgets", using the same method as loops 0 and 1: the worst unthrottled medium-mobile GPU time × 25.

- **Desktop / high:** passes. The minimum is 225 fps (night) and the worst p95 is 8.9 ms, against a gate of 55 fps and 22 ms.
- **Phone proxy, medium, 4× throttle:** passes on fps. The minimum is 47.4 fps against a gate of ≥ 30. *Watch:* the night p95 is 42.2 ms, about 23.7 fps, which is at the floor of 24.
- **Estimated phone GPU:** fails. The medium-mobile grounder takes **1.26 ms → about 31.5 ms**, over the 26 ms budget. Night is 1.00 ms → 25.1 ms, which is at the edge. In loop 1 the worst was 0.855 ms → 21 ms. The loop-1 → loop-2 diff shows GPU ms on medium and high rising 30–90% with identical triangle and draw-call counts:
  - medium desktop grounder: 0.90 → 1.72
  - high desktop gap: 0.81 → 1.44

  Low is unchanged or faster. That points to per-pixel cost added to the v3 player or skin path, not to geometry. It is a single run, so noise is possible, but the gate reads the measured number.
- **Software GL:** 14.0 / 18.2 fps against the loop-0 baseline of 15.1 / 19.9. The p95 moves in both directions (85.0 vs 87.4, 69.5 vs 68.2). As in loop 1, I rule this within noise.
- **Heap:** passes. High peaks at 75 MB, medium at 83.2 and low at 71.5 (budgets 192 / 128 / 90).
- **Download:** not in perf.json and not verified.

Under the brief, the top gap is a WS6 fix.

## Category rulings

**Characters: 4.5.** Both critics are right on the core failures:
- In `crops/high/R02-batter_head` the face is solid black, a flat earflap quad hangs at the jaw and a spike rises from the shoulder.
- `crops/high/R17-pitcher_hands` has the sawtooth maroon neckline, a nipple bump under the jersey, a "…KE HAMIL…" wordmark at navel height and a slab glove.
- In `crops/high/R05-ump_head` the neckline is torn open to bare skin and the mask bars are segmented, with skin-coloured flecks at the joints.
- In `crops/high/R07-SS` the "LAKESIDE" wordmark starts outside the torso silhouette. B and the advocate are right; A missed it.

On the disputed points, the advocate is right twice:
- The catcher's cage hangs from the helmet rim, and only the umpire's mask stands clear of the face (`crops/high/R14-batter`).
- Faces read when they are lit: the light-skinned batter in R14 and the dark-skinned pitcher at night in `crops/high/R12-pitcher`.

R12's stocky build against the slimmer R14 batter supports more than one build. The umpire-cap mark in R14 is too small to call decal or poke-through, so I leave it unresolved. The figures are still not "clean" (the 5 anchor) while shards, holes and floating lettering remain, so the score is 4.5.

**Charfit: 5.0.** The silhouette is "roughly right" at every distance. The front and side IoU against the reference are 0.843 and 0.851, and LOD IoU is ≥ 0.966 at 60 px. Against `mpfb2_athlete_front`, the shoulders are inflated and the pant legs balloon, with no knee (`crops/high/R12-pitcher`). The fingers don't close on the handle (`crops/high/R02-batter_hands` via R14). The advocate's double-counting point holds: shards and torn necklines are construction defects, already charged under characters. This is the 5 anchor exactly.

**Animation: 5.0.** Rulings:
- **A is wrong that the delivery can't be confirmed.** `high/desktop/R06` shows a long stride at release, and `crops/high/R12-pitcher` shows a planted stride with the arm cocked.
- **A is wrong that there's "no load".** `strips/high/R04` panel 4 shows the front knee lifting before contact. The steep bat at contact in panel 5 suits the knee-high pitch. The near-vertical bat in panel 7 is a minor follow-through issue.
- **Real defects:**
  - In `strips/high/R10` the arms are frozen with open palms in all 8 panels.
  - In `strips/high/R07` panels 5–8 the shortstop holds one crouch while the ball passes his glove (panel 7) and ends at his right foot (panel 8). The camera cuts between panels 4 and 5, so the pose pop there can't be isolated (the advocate is right).
  - Both of the batter's soles hover clearly above their shadow (`crops/high/R05-batter_feet`, B right).
  - The close-up ball is still about 80% of the helmet's width (`crops/high/R04-batter`).
- The pitch and swing are above 5, and fielding and running are below it, so the score is 5.0.

**Environment: 5.5.** The diamond is solid: mow stripes and grained dirt (`high/desktop/R13`), plus built towers, poles and scoreboard (`high/desktop/R16`). Against that:
- a bare grey backstop and a hard crowd-tile seam near x≈705 (`high/desktop/R06`);
- cone trees against the photo backdrop and a black dugout box (`crops/high/R14-batter`).

This is above the 5 anchor and well short of smb3-1, so 5.5 (A and the advocate over B).

**Lighting: 5.5.** On `high/desktop/R13`, A's "lit evenly edge to edge" is wrong. The infield is visibly brighter than the corners and the warning track (the advocate's measurement stands). But it is a broad gradient, not tower pools, which matches the loop-0 ruling. Contact shadows are soft (`strips/high/R10`), and the golden grade works (`crops/high/R14-batter`). Against that, the daylight face at 1.9/255 luma (`crops/high/R02-batter_head`) fails the 7 anchor's "bounce that models faces". The detached shadow under the batter's feet (`crops/high/R05-batter_feet`) weakens grounding. 5.5; the advocate's 6.0 is not supported while the blackout stands.

**UI: 6.0.** The score bug, count and base diamond are clean and consistent (`high/desktop/R16`, `high/desktop/R13`). The aim box in `high/desktop/R06` is a thin outline, and the catcher stays visible (the advocate is right). In `high/landscape/R05`, though, the yellow crosshair sits on the catcher's head. The title panel is translucent with a low-contrast selection (both critics), and the banner is static. 6.0.

**Readability: 6.0.** The ball, zone and trail read at a glance (`high/desktop/R06`, `high/desktop/R16`). In `strips/high/R07` panel 8 a white ring marks the fielder with the ball, so B is wrong that possession isn't distinguished. In `high/desktop/R16` the runner is half off the right edge, but the HUD diamond lights first base. The home-run trot frame has no runner in it on desktop or mobile (A, conceded), which keeps this well below 7. 6.0.

**Mobile: 6.0.** The advocate's measurements check out:
- Sky is about 27% of the 3D area in `high/mobile/R02`, not 40%.
- The landscape hint pill ends about 15 px short of the pitcher in `high/landscape/R05`.

Still, in `high/landscape/R05` the HUD bars take about 34% of the height, and that hint pill shows desktop keys ("arrows/mouse") on a phone. The runner is missing in `high/mobile/R10`. The portrait batting layout is good: a large batter and thumb-sized buttons. The phone proxy holds 47 fps. 6.0.

**Tiers.** The low tier still renders the v2 cartoon model and swing (`crops/low/R02-batter`, per both critics). That is a known tier split, not a new regression.

## Ranked gaps (gain ÷ effort, S=1 M=2 L=4)

1. **G-phone-gpu-budget** (WS6). Mandatory first: the gate fails.
2. **G-face-blackout** (WS3). +0.5 characters, +0.5 lighting, effort S.
3. **G-run-arms** (WS2). Effort S.
4. **G-framing-runners** (WS5). Readability and mobile, effort S.
5. **G-garment-integrity** (WS1). Merges A's jersey-construction, B's garment-integrity and the floating wordmark.
6. **G-ui-contrast-hints** (WS7). Effort S.
7. **G-close-ball-size** (WS5). Effort S.
8. **G-fielding-reach** (WS2).
9. **G-glove-model** (WS1).
10. **G-gear-attach** (WS1). Narrowed: only the umpire's mask floats.
11. **G-grip-ground** (WS2). Narrowed from B's contact-retargeting to the bat grip and the stance root height.
12. **G-body-proportions** (WS1, charfit).

Dropped below the cut:
- backstop and crowd (+0.5, M)
- landscape HUD height (+0.5, M)
- night tower pools (+0.25, M; the gradient already exists)

```json
{
  "loop": 2,
  "role": "judge",
  "tier": "high",
  "verdict": "continue",
  "scores": {
    "characters": {
      "score": 4.5,
      "confidence": 0.85,
      "evidence": [
        {"shot": "crops/high/R02-batter_head", "note": "black face, earflap quad at jaw, shoulder spike, sawtooth collar"},
        {"shot": "crops/high/R17-pitcher_hands", "note": "sawtooth neckline, nipple bump, wordmark at navel, slab glove; good separate fingers"},
        {"shot": "crops/high/R05-ump_head", "note": "torn neckline to skin, segmented mask bars with skin flecks"},
        {"shot": "crops/high/R07-SS", "note": "LAKESIDE starts outside the torso silhouette; finger nubs through glove"},
        {"shot": "crops/high/R14-batter", "note": "lit face reads; catcher cage hangs from helmet; only the umpire mask stands off"}
      ]
    },
    "charfit": {
      "score": 5.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "crops/high/R12-pitcher", "note": "inflated shoulders, balloon pants without knees vs mpfb2_athlete_front; face reads at night"},
        {"shot": "crops/high/R14-batter", "note": "proportions roughly right, simplified face; fingers do not close on the handle"},
        {"shot": "crops/high/R17-pitcher_hands", "note": "hands far simpler than hbm_male_realistic_hand; IoU 0.843/0.851"}
      ]
    },
    "animation": {
      "score": 5.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "strips/high/R04", "note": "front-knee load in panel 4, contact flash, rotation, finish"},
        {"shot": "strips/high/R07", "note": "camera cut 4-5; SS holds one crouch while the ball passes the glove in panels 5-8"},
        {"shot": "strips/high/R10", "note": "legs cycle with planted soles; arms frozen with open palms in all 8 panels"},
        {"shot": "high/desktop/R06", "note": "mocap delivery reaches a long stride at release"},
        {"shot": "crops/high/R05-batter_feet", "note": "both batter soles hover above their shadow"},
        {"shot": "crops/high/R04-batter", "note": "close-up ball about 80% of helmet width"}
      ]
    },
    "environment": {
      "score": 5.5,
      "confidence": 0.8,
      "evidence": [
        {"shot": "high/desktop/R06", "note": "bare grey backstop dominates; crowd tile seam near x=705"},
        {"shot": "high/desktop/R13", "note": "mow stripes, grained dirt, built towers, poles, scoreboard"},
        {"shot": "crops/high/R14-batter", "note": "black-box dugout; cone trees against the photo backdrop"}
      ]
    },
    "lighting": {
      "score": 5.5,
      "confidence": 0.8,
      "evidence": [
        {"shot": "crops/high/R02-batter_head", "note": "daylight face crushed to black under the helmet"},
        {"shot": "high/desktop/R13", "note": "broad infield-to-corner gradient, not tower pools; glow halos"},
        {"shot": "crops/high/R14-batter", "note": "warm golden grade, soft grounding"},
        {"shot": "crops/high/R05-batter_feet", "note": "shadow detached from hovering soles"}
      ]
    },
    "ui": {
      "score": 6.0,
      "confidence": 0.8,
      "evidence": [
        {"shot": "high/desktop/R16", "note": "clean score bug, count, lit base diamond, large buttons"},
        {"shot": "high/desktop/R06", "note": "thin aim box; catcher visible through it"},
        {"shot": "high/landscape/R05", "note": "yellow crosshair on the catcher's head; desktop key hints on a phone"}
      ]
    },
    "readability": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "high/desktop/R06", "note": "ball, trail and zone read at a glance"},
        {"shot": "high/desktop/R16", "note": "runner half off the right edge; HUD diamond lights first"},
        {"shot": "strips/high/R07", "note": "white ring marks the fielder with the ball in panel 8"},
        {"shot": "high/mobile/R10", "note": "home-run trot with no runner in frame"}
      ]
    },
    "mobile": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "high/mobile/R02", "note": "large batter, thumb-sized buttons, sky about 27% of the 3D area"},
        {"shot": "high/landscape/R05", "note": "HUD bars about 34% of height; desktop hint pill clear of the pitcher"},
        {"shot": "high/mobile/R10", "note": "runner not in frame"}
      ]
    }
  },
  "gaps": [
    {"id": "G-phone-gpu-budget", "category": "mobile", "expectedGain": 0.5, "severity": 5, "effort": "M", "workstream": "WS6", "evidence": ["reviews/loop-2/perf.json medium mobile grounder gpuMs 1.26", "reviews/loop-1/perf.json medium mobile grounder gpuMs 0.855"], "fix": "Performance gate fails: est. phone GPU 1.26 ms x 25 = 31.5 ms > 26 ms. GPU ms rose 30-90% on medium/high at identical tris and calls while low is flat. Re-run perf-review 3x interleaved and take the median; bisect the loop-2 player changes (skin self-light term, smooth-shaded subdivided cap/helmet/mask/glove, crowd tile rescale) with a GPU timer per change; remove or cheapen the regressing per-pixel cost on medium (e.g. bake the self-light into albedo, drop the extra pass). Test: median unthrottled medium-mobile gpuMs <= 1.04 ms in every scene (<= 26 ms estimated) and phone-proxy night p95 <= 41.7 ms."},
    {"id": "G-face-blackout", "category": "characters", "expectedGain": 0.5, "severity": 5, "effort": "S", "workstream": "WS3", "evidence": ["crops/high/R02-batter_head", "crops/high/R04-batter"], "benchmark": "smb3-3", "fix": "Dark skin under a helmet in daylight renders at 1.9/255. Add a per-actor face fill (a shadowless point or hemisphere term targeted at the head bone, unshadowed by the helmet) or a luminance floor on skin under brims, plus an eye specular. Test: mean face luma >= 40/255 with eyes, nose and mouth distinguishable in crops/high/R02-batter_head; also +0.5 lighting."},
    {"id": "G-run-arms", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS2", "evidence": ["strips/high/R10", "strips/high/R07", "crops/high/R07-SS"], "fix": "Let the mocap 09_01 arm tracks drive the arms during run and trot (remove the upper-body override), curl the hands into loose fists, and carry the glove as an additive layer. Test: across strips/high/R10 the hands alternate front and back by >= 25 cm and no open upturned palm shows."},
    {"id": "G-framing-runners", "category": "readability", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS5", "evidence": ["high/desktop/R16", "high/mobile/R10", "high/desktop/R10"], "benchmark": "smb3-1", "fix": "The home-run trot camera follows the batter-runner; the batting camera widens or pans to keep the lead runner >= 5% inside the frame edge. Test: runner fully visible in high/desktop/R10, high/mobile/R10 and high/desktop/R16; also +0.25 mobile."},
    {"id": "G-garment-integrity", "category": "characters", "expectedGain": 1.0, "severity": 5, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R07-SS", "crops/high/R05-ump_head", "crops/high/R02-batter_head"], "benchmark": "smb4-4", "fix": "Build the jersey as an offset shell that hides the chest detail; replace the sawtooth neckline with a smooth modelled trim loop; close the umpire's neckline; remove the batter's shoulder spike (stray vertices or weights); add a placket strip with buttons; project the wordmark onto the jersey surface at chest height, clear of the glove. Test: no sawtooth, nipple bump, skin breakthrough or lettering outside the cloth silhouette in the four cited crops."},
    {"id": "G-ui-contrast-hints", "category": "ui", "expectedGain": 0.5, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/landscape/R05", "high/desktop/R06", "high/desktop/R01"], "benchmark": "ootp26-1", "fix": "Fade the aim box and crosshair to corner ticks while the pitch is in flight; hide keyboard/mouse hints on coarse-pointer devices; make the title panel opaque with a high-contrast selected state. Test: catcher's head unobstructed in high/landscape/R05; no 'arrows/mouse' text on phone captures; Season label >= 4.5:1 contrast in high/desktop/R01."},
    {"id": "G-close-ball-size", "category": "animation", "expectedGain": 0.25, "severity": 3, "effort": "S", "workstream": "WS5", "evidence": ["crops/high/R04-batter", "strips/high/R04"], "fix": "The loop-2 close-camera ball sizing does not take effect in close-up captures. Compute the ball's minimum pixel size from the active (close) camera, or clamp it to its true 2.9 in diameter when that camera is within 10 m. Test: ball <= 33% of helmet width in crops/high/R04-batter."},
    {"id": "G-fielding-reach", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["strips/high/R07", "crops/high/R09-LF"], "fix": "Glove-hand IK to the predicted ball position over the last 0.3 s before arrival, plus a ground-ball scoop clip and an overhead-catch clip timed to arrival. Test: in strips/high/R07 panels 5-8 the glove moves to and closes on the ball; glove above the head in crops/high/R09-LF."},
    {"id": "G-glove-model", "category": "characters", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R07-SS", "crops/high/R12-pitcher"], "benchmark": "smb3-3", "fix": "Model a fielder's glove with four finger stalls, thumb, web and pocket that enclose the hand's fingers (no nubs through the shell), with a leather normal map and lacing; a padded catcher's mitt with a rim. Test: stalls and web visible and no skin through the glove in the cited crops and crops/high/R06-catcher_glove."},
    {"id": "G-gear-attach", "category": "characters", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R14-batter", "crops/high/R05-ump_head", "crops/high/R02-batter_head"], "fix": "Parent the umpire's mask to the head bone with modelled straps and a harness, sitting against the face; weld the mask bar segments (no skin flecks at joints); replace the batter's flat earflap quad with a curved ear guard; add short hair meshes under caps so scalps don't read bald. Test: no gap between the umpire's mask and face in crops/high/R14-batter, no flecks in crops/high/R05-ump_head, no flat quad at the jaw in crops/high/R02-batter_head."},
    {"id": "G-grip-ground", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["crops/high/R05-batter_feet", "crops/high/R14-batter", "crops/high/R02-batter_hands"], "benchmark": "smb4-2", "fix": "Correct the bat_stance root height (or add foot IK to the ground plane) and constrain both hands to the handle with fingers closed around it. Test: both soles touch their shadow in crops/high/R05-batter_feet; fingers wrap the handle with no visible gap in crops/high/R02-batter_hands."},
    {"id": "G-body-proportions", "category": "charfit", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R12-pitcher", "crops/high/R14-batter"], "benchmark": "art-src/samples/reference-renders/mpfb2_athlete_front.png", "fix": "Trim shoulder and torso girth toward the MPFB2 athlete; taper the pant legs and add knee and calf structure beneath them. Test: front IoU >= 0.90 against mpfb2_athlete_front_mask, and a visible knee break in crops/high/R12-pitcher."}
  ],
  "calibration": {
    "perfGate": "fail: est. phone GPU 1.26 ms x 25 = 31.5 ms > 26 ms (medium mobile grounder; night 1.00 ms = 25.1 ms). Medium/high GPU ms up 30-90% vs loop 1 at identical tris/calls; low flat. High desktop min 225 fps / p95 8.9 ms pass; phone proxy min 47.4 fps pass (night p95 42.2 ms at the 24 fps floor, watch); software GL 14.0/18.2 vs 15.1/19.9 baseline, within noise; heap 75/83.2/71.5 MB pass; download not in perf.json.",
    "factRulings": "pitch reaches stride and release in R06 and R12 crop (advocate right, A wrong); R04 strip has a front-knee load in panel 4 (A wrong); R13 has an infield-to-corner gradient (A wrong) but not tower pools; catcher cage hangs from the helmet, only the umpire mask floats (advocate right); wordmark floats outside the torso in R07-SS (B right, A missed); batter soles hover in R05-batter_feet (B right); white ring marks possession in R07 panel 8 (B wrong); mobile R02 sky about 27% (A wrong); landscape R05 pill clear of the pitcher (A wrong) but landscape crosshair covers the catcher's head; R07 strip camera cut 4-5 (advocate right); close-up ball still about 80% of helmet (real); umpire cap mark unresolved at crop resolution.",
    "effortWeights": "S=1, M=2, L=4"
  }
}
```
