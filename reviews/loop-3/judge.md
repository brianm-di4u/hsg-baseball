# Judge ruling: loop 3, high tier

Capture paths are relative to `screenshots/review-loop-3/`. I opened every capture cited below. No category had critics more than 1.0 apart. Mobile was the widest gap, 1.0 (5.5 vs 6.5). So I spent the re-checks on the facts the advocate disputed and on the anchors themselves.

**Disclosure.** While listing `reviews/loop-3/`, I printed the `.calibration` key file before I opened `calibration.png`, so the calibration was not fully blind for me. I scored the image on the rubric anchors only, and I describe what I saw below.

## Fact rulings

| Claim | Ruling |
|---|---|
| Backstop net | **Exists.** Advocate right, A wrong. The grid shows behind home in `high/desktop/R07` and `high/mobile/R07`, and at top left of `crops/high/R02-batter_head`. |
| Trot arms | **Bent.** Advocate right, A wrong. Both elbows are bent in `crops/high/R10-batter-trot` and `strips/high/R10`. The lead hand is open with spread fingers, though, so A is right that it isn't a fist. |
| Home-run frame | **The ball is in it.** Advocate right. In `high/desktop/R10` the ball is visible near the batter's eye. The trot is still never framed. |
| Fly-ball "catch" | **Captured too early.** Advocate right. In `high/desktop/R09` the ball is still high by the scoreboard, so `crops/high/R09-LF` is no evidence about the reach. |
| Runner on second | **Present.** Advocate right. In `high/desktop/R16` a runner stands near second at frame centre, and the bug lights first and second. |
| Grounder reach | **The miss is real.** In `strips/high/R07`, frame 7 has the ball ahead of the glove, and at the possession ring (frame 8) the ball is at the feet, to the right of the glove. The IK doesn't put the glove on the ball. |
| Swing | **No visible load or stride** in `strips/high/R04` frames 1–4 (agreed by all). The frame-5 bloom sits below the ball (Codex right). |
| Bat grip | **The fingers wrap the handle** in `crops/high/R14-batter`. Codex is wrong. |
| Confirmed defects | Scalp through the cap (`crops/high/R17-pitcher-back`, the umpire in `crops/high/R14-batter`). Fingertips through a slab glove (`crops/high/R17-pitcher_hands`). Stance feet hovering in glossy loafers (`crops/high/R05-batter_feet`). Floating ladder masks (`crops/high/R14-batter`). No back number (`high/desktop/R05`). |
| Field-view slabs | The dark slabs in `high/desktop/R07` are dugout roofs at the frame edges. They block no action (advocate right). |
| Portrait field view | `high/mobile/R07` crops first and third base out of frame (Codex right). Its bottom quarter is net, dirt and grass (A right). |
| Title menu | In `high/desktop/R01` the selected "Season" label is nearly illegible on the translucent panel. |

## Category rulings

**Characters — 5.0.** The body is above the 5 anchor:
- real facial features (`crops/high/R16-1B`, `crops/high/R14-batter`);
- jointed fingers that grip the bat (`crops/high/R14-batter`);
- readable hip and knee structure through the stride (`crops/high/R12-pitcher`).

The kit is below it:
- scalp clipping and fingers through the glove (`crops/high/R17-pitcher-back`, `crops/high/R17-pitcher_hands`);
- a slab glove;
- sawtooth collars and cuffs;
- chest bumps;
- dress loafers;
- floating masks;
- one body type.

The 7 anchor's cloth, material contrast and three builds are all absent. Codex's 4.5 depended partly on the grip claim, which is wrong. I side with A and the advocate.

**Charfit — 5.5.** Proportions track `mpfb2_athlete_three_quarter`: the IoU is 0.875 / 0.901, and the head, limb and torso ratios match in `crops/high/R12-pitcher` and `crops/high/R16-1B`. LOD0 and LOD1 hold IoU of at least 0.995 at 140 px. The faces are the same kind of human as the reference, but the garments, glove and cleats are far simpler than `si_jersey_front`, and the gap shows at duel distance (`high/desktop/R05`). That is the 5 anchor plus the matched silhouette, so 5.5. The low-tier cartoon proxy (`crops/low/R02-batter_head`) is a regression note, not high-tier evidence; the advocate is right.

**Animation — 5.0.**
- **Run.** The run cycle is good: bent-arm drive and planted contact feet (`strips/high/R10`).
- **Pitch.** It shows a turn, a set and a leg lift, but the lift leg kicks out straight in frame 8 (`strips/high/R03`). The stride lands well in `crops/high/R12-pitcher`.
- **Against the 7 anchor:**
  - stance feet float (`crops/high/R05-batter_feet`);
  - the swing has no visible load or stride (`strips/high/R04`);
  - the glove misses the grounder at possession (`strips/high/R07`);
  - there is no dust.

The advocate's corrections remove two of A's negatives but add no positive at the 7 anchor. That holds the 5.

**Environment — 5.0.**
- **Above the 5 anchor:** mow checkers, dirt grain, built towers and poles, and an existing backstop net (`high/desktop/R07`).
- **At the 5 anchor:**
  - a tiled photo crowd with seams;
  - a bare grey wall behind home (`high/desktop/R05`);
  - cone and sphere trees against a photo backdrop;
  - a black-box batter's eye (`high/desktop/R10`).

The crowd and trees match the 5 anchor literally.

**Lighting — 5.5.**
- **Day.** A directional key with soft contact shadows (`crops/high/R16-1B`), and a good golden key in `crops/high/R14-batter`.
- **Night.** `high/desktop/R13` now shows pools with falloff and several soft shadows per player. `high/desktop/R12` is still evenly lit, with sprite halos.
- **Faces under helmets.** Partly correct, partly wrong. Features read in `crops/high/R10-batter-trot`, but `crops/high/R12-pitcher` and `crops/high/R02-batter_head` lose the face under the brim, partly because of the angle and the ear-flap plane.
- **Missing:** haze, grade and bounce.

The advocate's 6.0 overstates it.

**UI — 6.0.**
- **Strengths.** The scorebug, count, pitch-speed line and labelled buttons are consistent (`high/desktop/R05`). The new result panel has a real hierarchy (`high/desktop/R10`).
- **Against the 7 anchor's "nothing clipped":**
  - the first screen the player sees has a nearly unreadable selected button (`high/desktop/R01`);
  - the bug bars are mostly empty;
  - the pitch crosshair sits on the catcher's head (`high/desktop/R05`).

**Readability — 6.0.**
- **Batting views.** The duel views read at a glance (`high/desktop/R02`, `high/desktop/R16`), with both runners present.
- **Field view.** Fielders are about 15 px tall and there is no possession marker (`high/desktop/R07`).
- **Portrait.** The field view drops first and third base (`high/mobile/R07`).
- **Home run.** The trot is never shown (`high/desktop/R10`).

**Mobile — 6.0.**
- **Duels.** Portrait and landscape duels are well sized, with thumb-sized buttons (`high/mobile/R02`, `high/landscape/R05`).
- **Landscape field view.** The bars take about 34% of the height in `high/landscape/R07`.
- **Portrait field view.** `high/mobile/R07` wastes its bottom quarter and crops the bases.
- **Proxy.** The phone proxy holds 48 fps.

Neither field framing is intentional yet. I land between the critics.

**Medium and low regressions.** Low still swaps in a cartoon head and proxy body (`crops/low/R02-batter_head`): a style break, not a LOD.

## Performance gate: **pass**

| Profile | Measured | Budget | Result |
|---|---|---|---|
| High desktop | min 362.8 fps, worst p95 3.5 ms | ≥ 55 fps, p95 ≤ 22 ms | pass |
| Phone proxy (medium, 4× CPU throttle) | min 47.8 fps, worst p95 34.6 ms | ≥ 30 fps (floor 24) | pass |
| Estimated phone GPU | 0.863 ms × 25 = 21.6 ms (this file's worst unthrottled medium-mobile row); the brief's three-run worst is 0.78 ms × 25 = 19.5 ms | ≤ 26 ms | pass |
| Software GL | 19.3 / 15.9 fps (duel / grounder) | v2 baseline 19.9 / 15.1 | within noise |
| Heap | high 70.7, medium 78, low 75.6 MB | < 192 / < 128 / < 90 MB | pass |
| Download | not in perf.json | — | not judged |

Loop 2's phone-GPU failure is fixed.

## Ranked gaps (top 12, gain ÷ effort with S=1, M=2, L=4)

1. **G-cap-scalp-clip** (characters, WS1, S): scalp through the cap crown.
2. **G-stance-foot-ik** (animation, WS2, S): stance feet float above the ground.
3. **G-cleat-model** (characters, WS1, S): loafers instead of cleats.
4. **G-swing-load-visible** (animation, WS2, S): no load or stride before the swing.
5. **G-title-menu-contrast** (ui, WS7, S): the selected title button is nearly illegible.
6. **G-glove-model** (characters, WS1, M): a slab glove with fingers through it.
7. **G-jersey-construction** (characters, WS1, M): sawtooth trim, no placket, no back number.
8. **G-glove-reach-hits-ball** (animation, WS2, M): the IK glove misses the ball.
9. **G-field-context** (readability, WS5, M): this absorbs the mobile-space gap.
10. **G-park-construction** (environment, WS4, L).
11. **G-masks-helmets** (characters, WS1, M): this absorbs the face-under-brim fill check.
12. **G-body-variety** (characters, WS1, M).

The concrete fixes are in the JSON. Dropped or merged:
- `G-face-fill-under-brim` / `G-exposure-grounding` merge into #11, because the ear-flap plane causes part of the face loss.
- `G-mobile-space` merges into #9.
- `G-reference-kit` is covered by #3, #6, #7 and #12.
- `G-character-construction` is split into #1, #6 and #7.

## Calibration

The unlabeled frame shows a stylised pitcher. Measured on the anchors:
- **Characters 7.5.** It has a modelled, laced leather glove; a number, nameplate and piped sleeves; a belt; cleats with laces; and a caricatured but fully featured face. Cloth folds don't read much, and there is no wear, so it falls short of 9.
- **Lighting 7.5.** A night grade with tower key and fill, a soft grounded shadow, specular on the helmet and cap, and depth across the stands. There is no volumetric light.

## Verdict

**Continue.** No gate is met. The total is 44.0/80, up 0.5 from loop 2.

```json
{
  "loop": 3,
  "role": "judge",
  "tier": "high",
  "verdict": "continue",
  "scores": {
    "characters": {"score": 5.0, "confidence": 0.8, "evidence": [
      {"shot": "crops/high/R14-batter", "note": "real faces, fingers wrap the handle (Codex grip claim wrong); umpire scalp through cap; floating ladder masks; loafers"},
      {"shot": "crops/high/R17-pitcher_hands", "note": "fingertips through slab glove, sawtooth collar, chest bumps, no placket"},
      {"shot": "crops/high/R17-pitcher-back", "note": "scalp patch through cap crown"},
      {"shot": "crops/high/R12-pitcher", "note": "hip/knee structure reads through the stride; one lean build"}
    ]},
    "charfit": {"score": 5.5, "confidence": 0.75, "evidence": [
      {"shot": "crops/high/R16-1B", "note": "proportions and face match mpfb2_athlete_three_quarter; IoU 0.875/0.901"},
      {"shot": "crops/high/R12-pitcher", "note": "limb and torso ratios match the reference; garments far simpler than si_jersey_front"},
      {"shot": "high/desktop/R05", "note": "garment and gear simplification visible at duel distance"}
    ]},
    "animation": {"score": 5.0, "confidence": 0.75, "evidence": [
      {"shot": "strips/high/R10", "note": "good run cycle, bent-arm drive, planted contact feet"},
      {"shot": "strips/high/R04", "note": "no visible load or stride in frames 1-4; bloom below the ball in frame 5"},
      {"shot": "strips/high/R07", "note": "glove off the ball at the possession ring in frame 8"},
      {"shot": "strips/high/R03", "note": "turn, set, lift; straight-leg kick at frame 8; ends before release"},
      {"shot": "crops/high/R05-batter_feet", "note": "stance feet hover above their shadows"}
    ]},
    "environment": {"score": 5.0, "confidence": 0.8, "evidence": [
      {"shot": "high/desktop/R05", "note": "tiled photo crowd with seams, bare grey wall behind home"},
      {"shot": "high/desktop/R10", "note": "cone/sphere trees, photo backdrop, black-box batter's eye"},
      {"shot": "high/desktop/R07", "note": "mow checkers, dirt grain, backstop net present; edge slabs are dugout roofs"}
    ]},
    "lighting": {"score": 5.5, "confidence": 0.75, "evidence": [
      {"shot": "high/desktop/R13", "note": "night pools with falloff, multiple soft shadows"},
      {"shot": "high/desktop/R12", "note": "night batting view evenly lit, sprite halos, no haze"},
      {"shot": "crops/high/R14-batter", "note": "golden key models faces"},
      {"shot": "crops/high/R12-pitcher", "note": "face lost under the brim at night; features read in R10-batter-trot"}
    ]},
    "ui": {"score": 6.0, "confidence": 0.75, "evidence": [
      {"shot": "high/desktop/R10", "note": "result panel with headline/detail hierarchy and accent bar; ball in frame"},
      {"shot": "high/desktop/R05", "note": "consistent bug and labelled controls; empty bug bars; crosshair over catcher's head"},
      {"shot": "high/desktop/R01", "note": "selected Season label nearly illegible on translucent panel"}
    ]},
    "readability": {"score": 6.0, "confidence": 0.75, "evidence": [
      {"shot": "high/desktop/R16", "note": "zone, batter, both runners and lit bug bases read"},
      {"shot": "high/desktop/R07", "note": "fielders ~15 px, no possession marker"},
      {"shot": "high/mobile/R07", "note": "first and third base cropped out of portrait field view"}
    ]},
    "mobile": {"score": 6.0, "confidence": 0.75, "evidence": [
      {"shot": "high/mobile/R02", "note": "large batter and zone, thumb-sized buttons"},
      {"shot": "high/landscape/R07", "note": "bars take ~34% of height, small fielders"},
      {"shot": "high/mobile/R07", "note": "bottom quarter empty net/dirt, bases cropped; proxy 47.8 fps min passes"}
    ]}
  },
  "gaps": [
    {"id": "G-cap-scalp-clip", "category": "characters", "expectedGain": 0.5, "severity": 5, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher-back", "crops/high/R14-batter"], "fix": "Delete or shrink-wrap the scalp faces inside the cap/helmet volume (cap-region vertex mask pulled 0.03 ft under the crown) so zero skin pixels fall inside the cap silhouette in R17-pitcher-back and on the umpire in R14-batter."},
    {"id": "G-stance-foot-ik", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS2", "evidence": ["crops/high/R05-batter_feet", "strips/high/R04"], "fix": "Two-bone leg IK pinning each planted sole to the ground plane in the batting stance and swing; sole-to-shadow gap 0 px in R05-batter_feet and no foot slide across strips/high/R04."},
    {"id": "G-cleat-model", "category": "characters", "expectedGain": 0.3, "severity": 4, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R05-batter_feet", "crops/high/R16-1B"], "benchmark": "smb3-3", "fix": "Replace the glossy loafer with a cleat: raised ankle collar, lace panel, white logo stripe, sole plate with visible spikes, matte leather roughness >= 0.6; smooth the jagged sock-to-shoe seam."},
    {"id": "G-swing-load-visible", "category": "animation", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS2", "evidence": ["strips/high/R04"], "fix": "Hands drift back at least 0.4 ft and the front foot lifts and strides at least 0.8 ft across strips/high/R04 frames 1-4; move the contact bloom onto the bat-ball point in frame 5; dust puff at the plant foot."},
    {"id": "G-title-menu-contrast", "category": "ui", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R01"], "benchmark": "ootp26-1", "fix": "Make the title panel at least 90% opaque and give the selected button white text at >= 4.5:1 contrast on its fill, so 'Season' reads in high/desktop/R01."},
    {"id": "G-glove-model", "category": "characters", "expectedGain": 0.5, "severity": 5, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R06-catcher_glove"], "benchmark": "smb3-3", "fix": "Model the glove with four finger stalls, a laced web and an open pocket, plus a leather normal map; hide the glove-hand fingers (or skin them to the stalls) so zero skin pixels show through in R17-pitcher_hands."},
    {"id": "G-jersey-construction", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R02-batter_head", "high/desktop/R05"], "benchmark": "smb4-4", "fix": "Cut the neckline and cuffs along smooth edge loops (no sawtooth), add a placket with buttons, a belt buckle and loops, and fold normals; smooth the chest so no bumps show; show the back number in high/desktop/R05."},
    {"id": "G-glove-reach-hits-ball", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["strips/high/R07", "high/desktop/R09"], "fix": "Set the glove IK target to the predicted ball position at the possession tick, so the glove is within one ball width of the ball in strips/high/R07 frame 8; add an overhead glove raise for fly balls and retime the R09 capture to the catch tick."},
    {"id": "G-field-context", "category": "readability", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS5", "evidence": ["high/desktop/R07", "high/mobile/R07", "high/landscape/R07", "high/desktop/R10"], "benchmark": "smb3-1", "fix": "Give the fielder with the ball a distinct marker (filled ring plus arrow); reframe portrait field view to keep first and third base in frame with no empty foreground below home; trim the landscape bars to <= 25% of height; cut to the HR trot once the ball clears the wall."},
    {"id": "G-park-construction", "category": "environment", "expectedGain": 1.0, "severity": 4, "effort": "L", "workstream": "WS4", "evidence": ["high/desktop/R05", "high/desktop/R10"], "benchmark": "smb3-1; smb4-3", "fix": "Replace the tiled crowd billboard with layered seat-row cards or impostors with no visible seam; pad and sign the wall behind home; replace cone/sphere trees with card-foliage trees and hide the backdrop seam; dress the batter's eye and the outfield walls with signage."},
    {"id": "G-masks-helmets", "category": "characters", "expectedGain": 0.3, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R14-batter", "crops/high/R02-batter_head", "crops/high/R12-pitcher"], "fix": "Model the masks as a welded frame with pads and a strap, touching the face; give the batting helmet one solid ear flap with no flat plane across the cheek and a matte brim instead of the white visor; verify that eyes and nose keep at least 25% luminance under the brim in R02-batter_head and R12-pitcher."},
    {"id": "G-body-variety", "category": "characters", "expectedGain": 0.3, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["high/desktop/R05", "crops/high/R16-1B"], "benchmark": "smb4-4", "fix": "Bake at least 3 MPFB builds (stocky catcher, tall-lean, average) as shape keys or variants and assign them per player, so 3 visibly different silhouettes appear in high/desktop/R05 and R07."}
  ],
  "calibration": {
    "characters": 7.5,
    "lighting": 7.5,
    "perfGate": "pass: high desktop min 362.8 fps / p95 3.5 ms; medium phone proxy min 47.8 fps; est. phone GPU 0.863 ms x 25 = 21.6 ms (brief 3-run 19.5 ms) <= 26 ms; software GL 19.3/15.9 vs 19.9/15.1 baseline, within noise; heap 70.7/78/75.6 MB pass; download not in perf.json",
    "factRulings": "backstop net exists (A wrong); trot elbows bent (A wrong) but lead hand open; R10 shows the ball (A wrong), trot unframed; R09 captured before catch (advocate right); R16 runner near second (A wrong); R07 glove misses ball at possession (real); R04 no load, bloom below ball (Codex right); R14 grip wraps handle (Codex wrong); R07 edge slabs are dugout roofs (A overstated); mobile R07 crops 1B/3B (Codex right); low-tier crop is regression only (advocate right); judge saw the .calibration key before scoring",
    "effortWeights": "S=1, M=2, L=4"
  }
}
```
