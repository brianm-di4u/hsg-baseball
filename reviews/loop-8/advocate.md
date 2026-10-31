# Advocate: loop 8, high tier

All capture paths are relative to `screenshots/review-loop-8/`. I opened every capture cited below. Critic A is critic-claude, Critic B is critic-codex.

## Summary

The critics mostly agree with each other and with the captures. Most of their defect claims hold up: no cloth folds, lumpy gloves, floating mask cages, aliased cleat panels, overlapping ad boards, dark faces under day-time brims, small field-camera figures, and landscape buttons over the pitcher. The low tier is a separate cartoon model. I concede all of these.

A few claims are wrong or blame the wrong cause:

- **Critic A's run-arm claim.** Critic A says the glove arm "hangs straight down and back, locked" while running. It doesn't: the elbow is flexed and the glove is carried at the belt in three crops.
- **Critic A on the R09 ball.** Critic A says the ball in R09 can be found only by its shadow. The ball is visible against the trees.
- **Critic A on the R10 runner.** Critic A says the R10 batter-runner is "cut off at the bottom edge". The figure at the bottom is in a blue-and-white uniform, so it is a fielder, not the HSHS runner. Critic B has it right: the runner isn't in frame at all.
- **The "black slab".** The dark rectangle beyond centre field is a batter's eye, a real ballpark feature. It is untextured dressing, not a layering bug.
- **Critic B on lighting and grounding.** Critic B bases these on day-time brim shadows and one lifted shoe. The night captures model faces well, and the other stance crops are planted.
- **Critic B on the R07 transition.** Critic B calls the R07 run-to-crouch transition abrupt. The strip reframes between panels 4 and 5, so that cut isn't clear evidence of a pop.

My corrections move characters, animation, lighting and mobile by +0.25 to +0.5 from the critic mean, and UI by −0.25. The other three stay at the mean. No category is near its gate.

## Characters (A 6.0, B 5.0; mean 5.5; proposed 6.0)

- **Concede: no cloth folds.** `crops/high/R17-pitcher_hands` shows a smooth grey crotch and thighs that read as painted body. `crops/high/R06-catcher_glove` shows the batter's seat as a smooth dome. There are no folds, seams or buttons anywhere.
- **Concede: crude glove.** In `crops/high/R17-pitcher_hands` and `crops/high/R06-catcher_glove`, the glove is a faceted brown lump with finger lobes and no web, pocket or lacing.
- **Concede: floating umpire mask.** In `crops/high/R05-ump_head`, the bars float in front of the face, and darker segment rings are still visible along each horizontal bar. In side view (`crops/high/R05-batter-front`), the cage hangs well off the face with an air gap and no frame.
- **Concede: aliased cleats.** In `crops/high/R05-batter_feet`, the white cleat panels have stair-stepped edges. The same aliasing shows at play distance in `high/mobile/R02`.
- **Concede (Critic B): lettering offset.** In `crops/high/R02-batter_hands`, the "HOT SPRINGS" lettering stands off the torso at the left edge, where the "H" overhangs the silhouette. The gold yoke at the neck has a jagged, saw-tooth boundary.
- **Concede (Critic A): sock-top edges.** The sock tops have torn-looking edges in `crops/high/R09-LF`, `crops/high/R16-1B` and `crops/high/R12-pitcher`.
- **Concede: one body type.** `high/desktop/R14` and `crops/high/R16-1B` show the same build throughout.
- **Rebut Critic B's 5.** The 5 anchor is "simple faces, separate fingers, color blocks". The captures exceed it on three counts:
  - **Faces.** The faces have modelled nose, lips, brow and ears, and hold up in close-up (`crops/high/R09-LF`, `crops/high/R08-CF`, `crops/high/R12-pitcher`).
  - **Hands.** In `crops/high/R02-batter_hands`, the fingers wrap the bat in a two-hand grip. The free hand in `crops/high/R17-pitcher_hands` has knuckle breaks and a tapering thumb.
  - **Materials.** Materials contrast: the glossy helmet catches a specular highlight in `crops/high/R02-batter_head` and `crops/high/R12-pitcher`, against matte flannel and duller leather.

  The uniforms also have placket piping, a belt, sleeves and stirrup socks (`crops/high/R12-pitcher`). That is above a 5, though cloth and gear hold it well under 7.
- **Proposed 6.0.**

## Fidelity to reference (A 5.5, B 5.5; mean 5.5; proposed 5.5)

- **Concede: deltoid mass.** The reference `mpfb2_athlete_three_quarter` has narrow, sloped shoulders. `crops/high/R03-pitcher` shows rounded, inflated deltoid masses that read as pads.
- **Partial rebut: shoulder line.** The loop's shoulder fix is visible. The shoulder line is natural and sloped in `crops/high/R16-1B` and `crops/high/R12-pitcher`, so the pad effect is worst in front views, not everywhere.
- **Concede: garments.** The garments are far simpler than `si_jersey_*`.
- **Proposed 5.5.** Both critics agree, and the captures support it.

## Animation (A 6.0, B 5.5; mean 5.75; proposed 6.0)

- **Rebut Critic A, factually wrong: glove arm.** Critic A says the glove arm "hangs straight down and back, locked" in the run. In `crops/high/R07-SS`, `crops/high/R08-CF` and `crops/high/R09-LF`, the glove-arm elbow is flexed about 90°, with the glove carried forward at the belt. The flat open palm on the free hand is real; I concede that part.
- **Rebut Critic B: contact flash.** Critic B says the contact flash is "separated from the bat". In `strips/high/R04` panel 5, the ball sits inside the glow and the batter's arms are extended toward it. The batted-ball trail then leaves from that point in panels 6–8. At strip scale, separation can't be shown.
- **Partial rebut Critic B: abrupt crouch in R07.** In `strips/high/R07`, the camera reframes between panels 4 and 5: the scoreboard and wall shift. The gap is a few sim ticks, so a missing deceleration step can't be proven from this strip. Panels 5–8 hold the feet planted while the glove drops to the ball.
- **Delivery evidence beyond R03.** `strips/high/R03` ends at the leg lift, as both critics say. But `crops/high/R12-pitcher` shows the stride phase: the lead leg is extended down the mound, the drive foot pushes off the rubber, the glove is tucked and the throwing arm is back. That is the weight-transfer beat the 7 anchor asks for, though in a single frame.
- **Concede: other motion faults.**
  - `strips/high/R10` loops in about 4 panels, with little upper-body overlap.
  - No dust appears in any strip.
  - The finish in `strips/high/R04` is upright.
  - In `crops/high/R05-batter_feet`, the left shoe shows lit ground between sole and shadow.
- **Planted feet elsewhere.** The right shoe in that crop is planted. Stance feet are grounded with tight shadows in `crops/high/R16-1B` and `crops/high/R16-runner1`.
- **Proposed 6.0.**

## Environment (A 6.0, B 5.0; mean 5.5; proposed 5.5)

- **Concede (Critic A): overlapping ad boards.** The overlap garbles the text: "GATOR F|TORS" in `crops/high/R02-batter_hands` and "RED|WARE" in `crops/high/R05-ump_head`. This is a real bug.
- **Rebut the cause (Critic A): "black slab".** The rectangle in `high/desktop/R09`, `high/desktop/R10` and `crops/high/R03-pitcher` sits dead centre beyond the CF wall. It is a batter's eye, which real parks have. The fault is that it is flat and untextured, not that it's a stray object.
- **Partial rebut (Critic A): "floating discs" in R15.** In `high/desktop/R15`, these are flat grey-green ellipses lying on the ground beyond the wall, with dark shard shapes on them. They read as unclear dressing, not floating geometry.
- **Concede (Critic B): crowd and backdrop.** In `high/desktop/R05`, the crowd is stretched photo rows on flat stands, and it is visibly low-resolution in `high/mobile/R05`. `high/desktop/R15` has a hazy horizontal seam where the photo backdrop meets the 3D treeline.
- **Credit missed by Critic B.** The turf has mow stripes and grain (`high/desktop/R07`, `crops/high/R09-LF`). The light towers, foul poles and scoreboard are built objects (`high/desktop/R16`). The crowd reads as people (`crops/high/R02-batter_head`).
- **Proposed 5.5.**

## Lighting (A 6.5, B 5.5; mean 6.0; proposed 6.5)

- **Concede: day faces under the brim.** In `crops/high/R02-batter_head`, the face is nearly black under the brim, with only the lips and nose faintly visible.
- **Rebut Critic B: faces at night.** Critic B's evidence for weak face modelling is day-time only. At night, `high/desktop/R12` shows the batter's face and helmet clearly modelled, with a specular sheen on the helmet. In `crops/high/R12-pitcher`, the face, cloth and helmet are all lit with form. The 7 anchor's "night exposure from the towers" is met.
- **Partial rebut Critic B: grounding.** Critic B cites "soles separated from grounding patches" from `crops/high/R05-batter_feet`. Only the left shoe shows a gap. `crops/high/R16-1B`, `crops/high/R16-runner1` and `crops/high/R03-pitcher` all show tight, grounded contact shadows.
- **Concede (Critic B): R13 pools.** `high/desktop/R13` has abrupt light pools, and the tree crowns at the top are lit oddly.
- **Golden afternoon.** The grade in `high/desktop/R14` is warm and coherent.
- **Proposed 6.5.** It meets most of the 7 anchor (contact shadows, night exposure, depth haze in `high/desktop/R09`) but fails the day-time face fill.

## UI (A 6.5, B 7.0; mean 6.75; proposed 6.5)

- **Concede (Critic A): title menu.** In `high/desktop/R01`, the menu panel is translucent, the "355" marker shows through the Season button, and the body text is low-contrast.
- **No meter in the captures.** The hint in `high/desktop/R05` mentions a meter ("Space twice: meter"), but no capture shows a pitch or timing meter. The anchor's "clear pitch and timing feedback" is therefore only half evidenced.
- **Rebut (Critic A): reticle.** The target reticle over the catcher (`high/desktop/R05`) is the pitch target itself, not clutter.
- **Credit.** The score bug, count and banner hierarchy are strong and consistent (`high/desktop/R10`, `high/desktop/R16`).
- **Proposed 6.5.** I am rounding down on honesty, not raising.

## Readability (A 6.0, B 6.0; mean 6.0; proposed 6.0)

- **Rebut Critic A, factually wrong: the R09 ball.** In `high/desktop/R09`, the ball is a white dot with a short streak against the trees (above-left of the light tower, near x≈517, y≈288), separate from its shadow on the turf.
- **Rebut Critic A, factually wrong: the R10 runner.** In `high/desktop/R10`, the figure at the bottom edge wears blue and white, so it is a fielder. Critic B's reading is correct: the HSHS runner isn't in view.
- **Concede: framing.** Fielders are small in R08, R09 and R10. `high/mobile/R07` drops first and third base out of frame.
- **Credit.** `high/desktop/R07` reads at a glance: the ball, the runner's yellow ring, the fielder rings and all four bases. Both critics under-weight it.
- **Proposed 6.0.** The errors are in the critics' reasoning, not in the outcome.

## Mobile (A 6.5, B 6.0; mean 6.25; proposed 6.5)

- **Concede: landscape framing.**
  - In `high/landscape/R05`, the CB and SL buttons cover the pitcher's legs.
  - In `high/landscape/R02`, the batter's feet are cut at the bottom edge.
  - `high/mobile/R07` loses first and third base.
- **Rebut (Critic A): portrait R05.** Critic A calls `high/mobile/R05` "cut off, cramped". It is a deliberate over-the-shoulder pitcher composition. The zone, catcher, umpire and batter are large and clear, and the buttons are thumb-sized.
- **Credit.** `high/mobile/R02` is well framed. The phone proxy holds 63 fps minimum under 4× throttle, above the rubric's 30 fps bar.
- **Proposed 6.5.**

## Factual errors by critic

**Critic A (critic-claude)**
1. "Glove arm hangs straight down and back, locked" in `crops/high/R07-SS`, `crops/high/R08-CF` and `crops/high/R09-LF`. In all three, the glove elbow is flexed and the glove is carried at the belt.
2. "In R09 the ball is only findable by its shadow." The ball is visible against the treeline in `high/desktop/R09`.
3. "In R10 the batter-runner is cut off at the bottom edge." The cut figure is a blue-and-white fielder (`high/desktop/R10`).
4. "Black slab" called a bug. It is a batter's eye: untextured, but intentional (`high/desktop/R09`).

**Critic B (critic-codex)**
1. "Both batting shoes appear suspended" in `crops/high/R05-batter_feet`. Only the left shoe shows a gap; the right is planted on the chalk.
2. The lighting score leans on day-time captures only, and doesn't credit the modelled night faces in `high/desktop/R12` and `crops/high/R12-pitcher`.

## Gap adjustments

| Gap | Critic | Original sev / gain | Advocate sev / gain | Reason |
|---|---|---|---|---|
| G-cloth-detail | A | 5 / 0.75 | 5 / 0.5 | Real (`crops/high/R17-pitcher_hands`). Overlaps G-uniform-construction; gains are not additive. |
| G-uniform-construction | B | 5 / 1.5 | 5 / 1.0 | Real, but folds and collars alone don't take characters from 5.5–6 to 7. Gloves and gear still cap it. |
| G-glove-model | A | 4 / 0.5 | 4 / 0.5 | Conceded (`crops/high/R06-catcher_glove`). |
| G-hands-and-equipment | B | 5 / 1.0 | 4 / 0.75 | Hands already grip (`crops/high/R02-batter_hands`) and show knuckles (`crops/high/R17-pitcher_hands`). The real deficit is the glove and mask frames. |
| G-shoulder-mass | A | 4 / 0.5 | 3 / 0.5 | The shoulder line is acceptable in `crops/high/R16-1B` and `crops/high/R12-pitcher`. The pad look is mainly in front views (`crops/high/R03-pitcher`). |
| G-ad-panel-overlap | A | 4 / 0.5 | 4 / 0.5 | Conceded. Cheap and visible (`crops/high/R05-ump_head`). |
| G-face-fill | A | 3 / 0.5 | 3 / 0.5 | Conceded for day only. |
| G-face-and-night-light | B | 4 / 1.0 | 3 / 0.5 | Night faces are already modelled (`high/desktop/R12`), so only day fill and the R13 pool edges remain. |
| G-run-arms | A | 4 / 0.5 | 2 / 0.25 | The premise is wrong: the glove arm is flexed (`crops/high/R07-SS`). Only the open free palm and limited arm swing remain. |
| G-contact-and-grounding | B | 5 / 1.0 | 3 / 0.5 | One lifted shoe (`crops/high/R05-batter_feet`). The flash encloses the ball (`strips/high/R04`). The R07 cut can't be proven (`strips/high/R07`). |
| G-field-cam-scale | A | 3 / 0.5 | 3 / 0.5 | Small fielders conceded. The ball is already visible in R09. |
| G-gameplay-framing | B | 4 / 1.0 | 4 / 0.75 | Conceded (`high/mobile/R07`, `high/desktop/R10`). Overlaps G-field-cam-scale and G-landscape-overlap. |
| G-mask-mount | A | 3 / 0.25 | 3 / 0.25 | Conceded (`crops/high/R05-batter-front`). |
| G-cf-black-slab | A | 3 / 0.25 | 2 / 0.25 | Wrong cause: it is a batter's eye, so texture it rather than remove it. The R15 patches are ground-level, not floating. |
| G-cleats | A | 2 / 0.25 | 3 / 0.25 | Raised: the aliasing is visible at play distance in `high/mobile/R02`, not only in close-up. |
| G-body-types | A | 3 / 0.25 | 3 / 0.25 | Conceded (`high/desktop/R14`). |
| G-landscape-overlap | A | 2 / 0.25 | 2 / 0.25 | Conceded (`high/landscape/R05`). |
| G-crowd-and-vegetation | B | 4 / 1.5 | 4 / 1.0 | Real (`high/desktop/R05`, `high/desktop/R15`). +1.5 alone would overshoot, because the ad-overlap and batter's-eye fixes are also needed for 7. |
| G-low-tier-identity | B | 3 / 0.5 | 3 / 0.25 | Conceded: `crops/low/R02-batter_head` is a different cartoon model with oversized eyes. It doesn't move the high-tier charfit score. It is a tier-regression item. |

```json
{
  "loop": 8,
  "role": "advocate",
  "tier": "high",
  "scores": {
    "characters": { "score": 6.0, "confidence": 0.7, "evidence": [
      { "shot": "crops/high/R02-batter_hands", "note": "two-hand grip with separate fingers; lettering offset and jagged yoke conceded" },
      { "shot": "crops/high/R12-pitcher", "note": "modelled face, specular helmet, piping, belt and stirrups; sock-top edges jagged" },
      { "shot": "crops/high/R17-pitcher_hands", "note": "free hand has knuckles; glove a lump and no cloth folds conceded" },
      { "shot": "crops/high/R05-ump_head", "note": "mask bars float with segment rings, conceded" } ] },
    "charfit": { "score": 5.5, "confidence": 0.75, "evidence": [
      { "shot": "crops/high/R03-pitcher", "note": "inflated deltoids against the sloped shoulders of mpfb2_athlete_three_quarter" },
      { "shot": "crops/high/R16-1B", "note": "shoulder line natural after the clavicle fix; garments far simpler than si_jersey" } ] },
    "animation": { "score": 6.0, "confidence": 0.65, "evidence": [
      { "shot": "strips/high/R04", "note": "load, stride, flash enclosing the ball in panel 5, batted-ball trail; upright finish" },
      { "shot": "strips/high/R07", "note": "break, then fielding crouch with planted feet; camera reframes between panels 4 and 5" },
      { "shot": "crops/high/R12-pitcher", "note": "stride and drive off the rubber, the beat strip R03 misses" },
      { "shot": "crops/high/R07-SS", "note": "glove arm flexed at the belt (not locked straight); open free palm conceded" } ] },
    "environment": { "score": 5.5, "confidence": 0.7, "evidence": [
      { "shot": "crops/high/R05-ump_head", "note": "overlapping ad boards (RED|WARE), conceded" },
      { "shot": "high/desktop/R09", "note": "untextured batter's eye, not a stray object; mow stripes" },
      { "shot": "high/desktop/R15", "note": "backdrop seam and ground-level grey patches beyond the wall" },
      { "shot": "high/desktop/R05", "note": "flat photo crowd rows, conceded" } ] },
    "lighting": { "score": 6.5, "confidence": 0.65, "evidence": [
      { "shot": "high/desktop/R12", "note": "batter face and helmet modelled by the tower light at night" },
      { "shot": "crops/high/R16-1B", "note": "tight grounded contact shadows" },
      { "shot": "crops/high/R02-batter_head", "note": "day face nearly black under the brim, conceded" },
      { "shot": "high/desktop/R13", "note": "abrupt light pools, conceded" } ] },
    "ui": { "score": 6.5, "confidence": 0.65, "evidence": [
      { "shot": "high/desktop/R10", "note": "banner hierarchy and a consistent score bug" },
      { "shot": "high/desktop/R01", "note": "translucent menu with 355 showing through the Season button" },
      { "shot": "high/desktop/R05", "note": "target reticle is pitch feedback; no meter captured" } ] },
    "readability": { "score": 6.0, "confidence": 0.7, "evidence": [
      { "shot": "high/desktop/R07", "note": "ball, runner ring, fielder rings and all bases read at a glance" },
      { "shot": "high/desktop/R09", "note": "ball visible against the trees; fielders small" },
      { "shot": "high/desktop/R10", "note": "runner out of view (the bottom figure is a fielder)" },
      { "shot": "high/mobile/R07", "note": "first and third base out of frame" } ] },
    "mobile": { "score": 6.5, "confidence": 0.65, "evidence": [
      { "shot": "high/mobile/R02", "note": "big batter, clear zone, thumb-sized buttons" },
      { "shot": "high/mobile/R05", "note": "intentional over-the-shoulder pitching framing" },
      { "shot": "high/landscape/R05", "note": "buttons cover the pitcher's legs, conceded" },
      { "shot": "high/landscape/R02", "note": "batter's feet cut, conceded" } ] }
  },
  "gaps": [
    { "id": "G-cloth-detail", "category": "characters", "expectedGain": 0.5, "severity": 5, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R10-batter-trot"], "benchmark": "smb4-2", "fix": "Normal-mapped flannel weave, seams, button placket and baked fold maps on jersey and pants; overlaps G-uniform-construction." },
    { "id": "G-uniform-construction", "category": "characters", "expectedGain": 1.0, "severity": 5, "effort": "L", "workstream": "WS1", "evidence": ["crops/high/R02-batter_hands", "crops/high/R16-runner1"], "benchmark": "si_jersey_front.png", "fix": "Collars, cuffs, placket and belt construction; clean the yoke and sock-top edges; conform lettering to the cloth." },
    { "id": "G-glove-model", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R06-catcher_glove", "crops/high/R17-pitcher_hands"], "benchmark": "smb4-2", "fix": "Model the glove pocket, web, finger stalls and lacing, with a leather normal map." },
    { "id": "G-hands-and-equipment", "category": "characters", "expectedGain": 0.75, "severity": 4, "effort": "L", "workstream": "WS1", "evidence": ["crops/high/R06-catcher_glove", "crops/high/R05-ump_head"], "benchmark": "benchmarks/smb3-3.png", "fix": "Focus on glove, mask frames and catcher padding; hands already grip and show knuckles." },
    { "id": "G-shoulder-mass", "category": "charfit", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R03-pitcher", "crops/high/R07-SS"], "benchmark": "mpfb2_athlete_three_quarter", "fix": "Reduce deltoid and upper-arm girth about 15% for front views; the shoulder line is already acceptable in R16-1B and R12-pitcher." },
    { "id": "G-ad-panel-overlap", "category": "environment", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS4", "evidence": ["crops/high/R02-batter_hands", "crops/high/R05-ump_head"], "benchmark": "smb3-1", "fix": "Space or de-duplicate the outfield ad boards so no quads overlap." },
    { "id": "G-face-fill", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS3", "evidence": ["crops/high/R02-batter_head"], "benchmark": "smb3-3", "fix": "Day-time sky and bounce fill for skin under helmet brims; night faces are already fine." },
    { "id": "G-face-and-night-light", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["crops/high/R02-batter_head", "high/desktop/R13"], "benchmark": "benchmarks/smb3-3.png", "fix": "Day brim fill and softer field-light pool edges in R13; night face modelling in R12 already works." },
    { "id": "G-run-arms", "category": "animation", "expectedGain": 0.25, "severity": 2, "effort": "S", "workstream": "WS2", "evidence": ["crops/high/R07-SS", "strips/high/R10"], "fix": "Curl the free hand into a loose fist and add arm-swing overlap; the glove arm is already flexed, not locked." },
    { "id": "G-contact-and-grounding", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["crops/high/R05-batter_feet", "strips/high/R07"], "benchmark": "benchmarks/smb4-2.png", "fix": "Lock the lifted stance shoe, add a deceleration step into the fielding crouch, and capture the full delivery strip; the flash already encloses the ball." },
    { "id": "G-field-cam-scale", "category": "readability", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS5", "evidence": ["high/desktop/R08", "high/desktop/R09"], "benchmark": "smb3-1", "fix": "Tighter outfield cameras (fielders at least 35 px tall); the ball is already visible in R09." },
    { "id": "G-gameplay-framing", "category": "readability", "expectedGain": 0.75, "severity": 4, "effort": "M", "workstream": "WS5", "evidence": ["high/mobile/R07", "high/desktop/R10"], "benchmark": "benchmarks/smb3-1.png", "fix": "Keep the runner and target base in frame (R10 runner, mobile R07 bases); overlaps G-field-cam-scale." },
    { "id": "G-mask-mount", "category": "characters", "expectedGain": 0.25, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R05-ump_head", "crops/high/R05-batter-front"], "fix": "Mask frame, pads and straps flush to the face; hide the segment joins." },
    { "id": "G-cf-black-slab", "category": "environment", "expectedGain": 0.25, "severity": 2, "effort": "S", "workstream": "WS4", "evidence": ["high/desktop/R09", "high/desktop/R15"], "fix": "Texture the batter's eye (it is intentional, so keep it) and clarify the ground patches beyond the R15 wall." },
    { "id": "G-cleats", "category": "characters", "expectedGain": 0.25, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R05-batter_feet", "high/mobile/R02"], "fix": "Higher-resolution or vector cleat panels, plus spikes or a tread lip; aliasing shows at play distance." },
    { "id": "G-body-types", "category": "characters", "expectedGain": 0.25, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["high/desktop/R14", "crops/high/R16-1B"], "fix": "At least 3 body morphs (stocky, lanky, average) assigned per player." },
    { "id": "G-landscape-overlap", "category": "mobile", "expectedGain": 0.25, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/landscape/R05", "high/landscape/R02"], "fix": "Move the landscape buttons off the action or shift the camera framing." },
    { "id": "G-crowd-and-vegetation", "category": "environment", "expectedGain": 1.0, "severity": 4, "effort": "L", "workstream": "WS4", "evidence": ["high/desktop/R05", "high/desktop/R15"], "benchmark": "benchmarks/smb4-3.png", "fix": "Give the crowd depth and variation, use consistent tree materials and blend the backdrop seam." },
    { "id": "G-low-tier-identity", "category": "charfit", "expectedGain": 0.25, "severity": 3, "effort": "L", "workstream": "WS6", "evidence": ["crops/low/R02-batter_head", "low/desktop/R02"], "benchmark": "mpfb2_athlete_front.png", "fix": "Derive low-tier models from the hero assets; a regression item that doesn't move the high-tier score." }
  ],
  "verdict": "continue"
}
```
