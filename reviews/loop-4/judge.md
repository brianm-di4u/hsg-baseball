# Judge: loop 4, high tier

Capture paths are relative to `screenshots/review-loop-4/`. I opened `strips/high/R03`, `R04`, `R07`, `R10`; `crops/high/R02-batter_head`, `R02-batter_hands`, `R05-batter_feet`, `R14-batter`, `R17-pitcher-back`, `R17-pitcher_hands`; `high/desktop/R05`, `R12`, `R13`, `R15`; `high/mobile/R07`; `high/landscape/R05`; and `low/desktop/R02`. No category has critics more than 1.0 apart (the widest gap is 0.5, in animation, environment and UI), so I opened the captures mainly to rule on the facts the advocate disputes.

## Fact rulings

- **R04 "static stance in frames 1–4" (Claude): partly wrong.** In `strips/high/R04` the batter leans slightly and drops his hands between frames 1 and 4. There is a small coil but no stride or toe tap, and frame 4 jumps straight to contact in frame 5. The advocate is right that a coil exists, and right that it is small.
- **R07 "same pose for four frames" (Claude): wrong.** Frame 7 is a separate reach key, with the glove pushed forward and down. The ball still never enters the glove: it is below the glove in frame 7 and at the right foot in frame 8. The cut from frame 4 to frame 5 is a camera reframe (the scoreboard and fence markers move), so it is not evidence of a missing blend (Codex overread it).
- **R12 "flat black sky, daylight backdrop" (Claude): wrong.** `high/desktop/R12` grades from near-black to navy at the ridge, the towers have bloom halos, and the hills are moonlit blue.
- **R13 "fielders in dim patches" (Claude): wrong.** Every fielder sits on lit turf, with a ring and a shadow. Only the trees beyond the fence are black, under an oddly lit foliage band.
- **Mobile R07 "third base visible" (advocate): wrong.** In `high/mobile/R07` the white object left of the infield is the ball, on the grass. Both corner bags are off-frame. Codex is right.
- **Faces "crushed to black" (Claude): overstated.** `crops/high/R02-batter_hands` shows the same batter's lips and chin, and `crops/high/R14-batter` and `high/desktop/R12` show lit, featured faces. But the eyes and brow are lost under the helmet brim on the dark-skinned batter in both R02 crops. The defect is real and limited to faces under a brim, so it is a fill and albedo fix, not a global one.
- **Feet off their shadows (both critics): a pose defect, not shadow bias.** In `crops/high/R05-batter_feet` both soles hover about a shoe-height above the dirt, and the shadows fall where the soles should be. The advocate is right that this belongs to WS2. It also counts against animation ("floaty feet").
- **Reticle over the catcher (Claude): not a defect.** It is the pitch aim on the target, by design (advocate right).
- **R15 beyond-fence discs:** they read as a crude adjoining practice diamond, not stray geometry (advocate plausible). They are crude either way.
- **Loop-4 claims that fail on screen.**
  - Skin still shows through the cap crown on `crops/high/R17-pitcher-back` and on the umpire in `crops/high/R14-batter`.
  - A fingertip still pokes through the back of the glove in `crops/high/R17-pitcher_hands`.
  - The fabric normal map isn't visible in any crop.
  - The placket piping wobbles.
  - "LAKE HAMII TON" is garbled, and "HOT SPRINGS" floats off the torso edge in `crops/high/R02-batter_hands` (Codex right).
- **Sponsor board overlap: real.** A white board cuts "GATOR F…TORS" in `crops/high/R02-batter_hands` and `crops/high/R17-pitcher-back`.
- **Tier check.** `low/desktop/R02` uses a different batter: his upper body sits offset from his hips and his stance changes. This is visible tier drift. It is not scored.

## Category rulings

**Characters: 5.5.** Both critics and the advocate agree. There are separate fingers that wrap the bat (`crops/high/R14-batter`), real facial features where the face is lit, and a placket and belt. Against that:
- The glove is a paddle, and a fingertip pokes through it.
- Skin shows through the cap crown, visible even at frame size.
- Trim edges are sawtoothed.
- The chest bulges and the shoulders are boxy (`crops/high/R17-pitcher_hands`).
- The masks float (`crops/high/R14-batter`).
- There is one build and no folds.

That is above the 5 anchor and far from 7.

**Charfit: 5.5.** The proportions and silhouette match `mpfb2_athlete_three_quarter`, consistent with IoU 0.875 front and 0.901 side (`crops/high/R14-batter`, `crops/high/R09-LF`). Faces, garments and the glove are far simpler than the reference, and the boxy padded torso in `crops/high/R17-pitcher_hands` departs from it. LOD2 error of 34–43% is a watch item.

**Animation: 5.5.** This is above Codex's 5, on the corrected facts.
- What's there: a high leg lift in `strips/high/R03`, a small coil plus contact flash, rotation and finish in `strips/high/R04`, a reach key in `strips/high/R07`, and planted, alternating trot legs in `strips/high/R10`.
- What's missing: the ball never enters the glove, the swing has no stride and jumps from frame 4 to 5, and the trot arms are frozen at the chest. The batter also hovers in his stance (`crops/high/R05-batter_feet`).

**Environment: 5.5.** This is above Codex's 5.
- Built structure beyond the 5 anchor: mow patterns, foul poles, towers, a dugout opening in the old park (`crops/high/R14-batter`), backstop netting and crisp signage (`high/desktop/R05`).
- What keeps it from 7: the crowd is an oversized photo strip, the trees are cones (`high/desktop/R15`), boards overlap, and the pitching rubber is a raised slab (`crops/high/R17-pitcher-back`). The 7 anchor's "no visual bugs" fails.

**Lighting: 6.0.** I side with the advocate (+0.5 over the critics), because three of the critics' lighting claims fail on the captures: the flat night sky, the dim R13 patches and the foot-shadow bias.
- What works: a graded night sky with tower bloom (`high/desktop/R12`), lit fielders under the towers (`high/desktop/R13`), and a golden-hour grade (`crops/high/R14-batter`).
- Short of 7: faces under a brim lose their eyes, the helmet specular is a blown blob (`crops/high/R02-batter_head`), and there is no haze.

**UI: 6.0.**
- What works: the score bug, count and pitcher/batter line are consistent, and the HOME RUN / 396 FT banner has hierarchy (`high/desktop/R15`).
- Short of 7: the shelf covers the action (the pitcher's legs in `high/landscape/R05`, the batter-runner in `high/desktop/R10`), landscape drops the info line, and the captures show no pitch or timing feedback beyond the speed. I hold 6.0, not the 6.5 that Codex and the advocate gave.

**Readability: 6.0.** All three agree. The ball and zone read in the batting views (`high/desktop/R12`). In-play fielders are 15–20 px and possession is unclear (`high/desktop/R13`), and both corner bags are cut in `high/mobile/R07`.

**Mobile: 6.0.** All three agree. Portrait batting is intentional, with thumb-sized buttons. But `high/mobile/R07` spends about 25% of the 3D view on foul ground and cuts both corner bags, and in `high/landscape/R05` the HUD plus the shelf take about 35% of the height and cut off the pitcher. The phone proxy holds 30 fps (62 fps minimum).

## Performance gate: pass

- **Desktop high:** minimum 550.7 fps (gap) and worst p95 2.5 ms, against ≥ 55 fps and ≤ 22 ms.
- **Phone, medium, 4× throttle:** minimum 62.3 fps (grounder), against ≥ 30.
  - Estimated phone GPU = max unthrottled medium-mobile GPU time × 25 = 0.574 ms (grounder) × 25 = 14.4 ms, against ≤ 26 ms.
  - Worst throttled p95 is 32.4 ms. That is a hitch to watch, not a gate.
- **Software GL:** 19.5 fps (duel) and 16.5 fps (grounder), against the 19.9 / 15.1 baseline. Within noise.
- **Heap:** high max 78, medium 72.3, low 75.9 MB, all under budget.
- **Download:** not in perf.json, so unverified, as in earlier loops.

The top gap is therefore not a WS6 fix.

## Ranked gaps (gain ÷ effort; S=1, M=2, L=4; ties go to characters)

1. **G-cap-crown-skin** (characters, WS1, S, +0.4): mask out the scalp faces under each headwear type. Test: no skin-hue pixels inside the cap in `crops/high/R17-pitcher-back` and `R14-batter`.
2. **G-jersey-lettering** (characters, WS1, S, +0.3): lay the wordmark out in UV space on the jersey surface, clear of the piping, and add back numbers.
3. **G-feet-grounding** (animation, WS2, S, +0.3): foot IK or a root-height fix so the soles touch the dirt in the stance.
4. **G-mobile-framing** (mobile, WS7, S, +0.3): slim the landscape HUD, keep its info line, and hide the shelf on fielding views; frame both corner bags in portrait.
5. **G-glove-model** (characters, WS1, M, +0.5): a mitt with a pocket, a laced web and finger stalls; close the fingertip hole.
6. **G-cloth-folds-chest** (characters, WS1, M, +0.5): fold normals, a detail normal you can actually see, a flattened chest and rounded shoulders.
7. **G-fielding-catch** (animation, WS2, M, +0.5): IK the glove onto the ball at the catch tick and carry the glove upright.
8. **G-region-sawtooth** (characters, WS1, M, +0.4): anti-aliased UV masks for the trim, piping and cleat stripe.
9. **G-face-fill** (characters, WS3, M, +0.4): fill under the brim and a minimum skin albedo, so the eyes read.
10. **G-body-variety** (characters, WS1, M, +0.4): three build presets.
11. **G-swing-stride-trot** (animation, WS2, M, +0.4): a stride key from release, swing in-betweens, and trot arm swing.
12. **G-board-overlap** (environment, WS4, S, +0.2): de-overlap the sponsor boards and sink the rubber flush with the mound.

Below the cut: G-masks-attach, G-wide-cameras and G-env-dressing.

**Verdict: continue.** No category meets its gate.

```json
{
  "loop": 4,
  "role": "judge",
  "tier": "high",
  "verdict": "continue",
  "scores": {
    "characters": { "score": 5.5, "confidence": 0.85, "evidence": [
      { "shot": "crops/high/R17-pitcher_hands", "note": "paddle glove with fingertip poke-through; LAKE HAMII TON garbled; wavy piping; chest bulge; boxy shoulders" },
      { "shot": "crops/high/R17-pitcher-back", "note": "skin through cap crown; blank jersey back" },
      { "shot": "crops/high/R14-batter", "note": "lit face, fingers wrap bat; umpire cap skin and floating masks" },
      { "shot": "crops/high/R02-batter_hands", "note": "HOT SPRINGS floats off torso edge; sawtooth sleeve trim" } ] },
    "charfit": { "score": 5.5, "confidence": 0.8, "evidence": [
      { "shot": "crops/high/R14-batter", "note": "limb and head proportions match mpfb2_athlete_three_quarter" },
      { "shot": "crops/high/R17-pitcher_hands", "note": "padded boxy torso and paddle glove far from reference" },
      { "shot": "crops/high/R09-LF", "note": "face far simpler than mpfb2_athlete_face_34" } ] },
    "animation": { "score": 5.5, "confidence": 0.75, "evidence": [
      { "shot": "strips/high/R04", "note": "small coil frames 1-4, no stride; jump 4 to 5; flash, rotation, finish" },
      { "shot": "strips/high/R07", "note": "run reads; frame 7 reach key; ball never enters glove; 4-5 is a camera reframe" },
      { "shot": "strips/high/R03", "note": "set to high leg lift; ends before release" },
      { "shot": "strips/high/R10", "note": "legs plant and alternate; arms frozen at chest" },
      { "shot": "crops/high/R05-batter_feet", "note": "soles hover above dirt in stance" } ] },
    "environment": { "score": 5.5, "confidence": 0.75, "evidence": [
      { "shot": "high/desktop/R05", "note": "crisp sponsor boards; oversized photo crowd strip" },
      { "shot": "high/desktop/R15", "note": "cone trees; crude practice-diamond discs beyond fence" },
      { "shot": "crops/high/R14-batter", "note": "built dugout opening in old park" },
      { "shot": "crops/high/R17-pitcher-back", "note": "overlapping sponsor boards; raised rubber slab" } ] },
    "lighting": { "score": 6.0, "confidence": 0.7, "evidence": [
      { "shot": "high/desktop/R12", "note": "night sky graded to navy at ridge, tower bloom, moonlit hills; batter face lit" },
      { "shot": "high/desktop/R13", "note": "fielders on lit turf with shadows under towers" },
      { "shot": "crops/high/R14-batter", "note": "golden-hour grade, faces modelled" },
      { "shot": "crops/high/R02-batter_head", "note": "eyes lost under brim; blown helmet specular" } ] },
    "ui": { "score": 6.0, "confidence": 0.7, "evidence": [
      { "shot": "high/desktop/R15", "note": "HOME RUN / 396 FT banner with hierarchy; consistent bug" },
      { "shot": "high/desktop/R05", "note": "reticle is pitch aim by design; heavy shelf" },
      { "shot": "high/landscape/R05", "note": "shelf cuts the pitcher's legs; info line dropped" } ] },
    "readability": { "score": 6.0, "confidence": 0.75, "evidence": [
      { "shot": "high/desktop/R12", "note": "ball, zone and batter read at a glance" },
      { "shot": "high/desktop/R13", "note": "fielders about 15 px, no possession cue" },
      { "shot": "high/mobile/R07", "note": "both corner bags off-frame; white dot left of infield is the ball" } ] },
    "mobile": { "score": 6.0, "confidence": 0.75, "evidence": [
      { "shot": "high/mobile/R07", "note": "about 25% of 3D view is foul ground; corner bags cut; tiny figures" },
      { "shot": "high/landscape/R05", "note": "HUD plus shelf about 35% of height; pitcher legs cut" },
      { "shot": "high/mobile/R02", "note": "intentional portrait batting frame, thumb-sized buttons" } ] }
  },
  "gaps": [
    { "id": "G-cap-crown-skin", "category": "characters", "expectedGain": 0.4, "severity": 5, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher-back", "crops/high/R14-batter", "high/desktop/R14"], "benchmark": "smb4-2", "fix": "Delete or alpha-mask the scalp faces inside each headwear type's footprint (cap, umpire cap, helmet) via a per-headwear vertex-group mask at LOD0-LOD2. Test: zero skin-hue pixels inside the cap silhouette in R17-pitcher-back and R14-batter." },
    { "id": "G-jersey-lettering", "category": "characters", "expectedGain": 0.3, "severity": 4, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R02-batter_hands", "crops/high/R17-pitcher-back"], "benchmark": "smb3-3", "fix": "Render the chest wordmark from a UV-space texture on the jersey surface (no separate projected mesh), with a gap at the placket so piping never crosses letters, and add a back-number decal. Test: intact LAKE HAMILTON, no letter outside the torso silhouette in R02-batter_hands, readable back number in R17-pitcher-back." },
    { "id": "G-feet-grounding", "category": "animation", "expectedGain": 0.3, "severity": 4, "effort": "S", "workstream": "WS2", "evidence": ["crops/high/R05-batter_feet", "strips/high/R04"], "benchmark": "smb3-3", "fix": "Pin the soles to ground height in stance and support phases with two-bone foot IK, or correct the clip's root height. Not shadow bias. Test: 0 px gap between sole and dirt in R05-batter_feet." },
    { "id": "G-mobile-framing", "category": "mobile", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/landscape/R05", "high/mobile/R07", "high/desktop/R10"], "fix": "Cut the landscape shelf to a 56 px overlay row, keep the pitcher/batter and pitch-speed line, hide the shelf on fielding views, and move the portrait in-play camera target so both corner bags are framed. Test: 3D view >= 75% of landscape height; first and third base visible in mobile R07; the pitcher's feet visible in landscape R05." },
    { "id": "G-glove-model", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R09-LF", "crops/high/R06-catcher_glove"], "benchmark": "smb3-3", "fix": "Replace the hull with a mitt mesh that has a cupped pocket, laced web, four finger stalls and a heel, plus a leather normal and roughness map and a distinct catcher's mitt; shrink the fingers inside the glove or hide them. Test: web and pocket readable and no skin pixels on the glove exterior in R17-pitcher_hands." },
    { "id": "G-cloth-folds-chest", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R14-batter", "crops/high/R05-batter_feet"], "benchmark": "smb4-2", "fix": "Bake fold normal maps for elbow, armpit, belt blouse, knee and hem, raise the cotton detail normal until it is visible at 2x crop, flatten the chest shape key under the jersey, and round the shoulder caps. Test: folds visible at elbows and knees, flat chest profile in R17-pitcher_hands." },
    { "id": "G-fielding-catch", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["strips/high/R07", "crops/high/R09-LF"], "benchmark": "smb4-5", "fix": "IK the glove pocket to the predicted ball position over the last 0.3 s before the catch tick, then add transfer and throw beats; replace the tray carry with an upright glove carry in the run. Test: ball within 0.2 ft of the pocket on the catch frame of strips/R07." },
    { "id": "G-region-sawtooth", "category": "characters", "expectedGain": 0.4, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R02-batter_head", "crops/high/R02-batter_hands", "crops/high/R05-batter_feet"], "benchmark": "smb3-3", "fix": "Drive collar, sleeve, sock, belt, placket piping and cleat-stripe regions from an anti-aliased, mipmapped UV mask, not per-face colour, and make the piping straight. Test: no stair step longer than 2 px on any trim edge in the 2x crops." },
    { "id": "G-face-fill", "category": "characters", "expectedGain": 0.4, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["crops/high/R02-batter_head", "crops/high/R02-batter_hands", "high/mobile/R02"], "benchmark": "smb3-3", "fix": "Add a low-intensity per-batter fill under the brim (or a hemisphere fill term in the face shader), clamp helmet occlusion on the face, and set a minimum skin albedo, plus a warm subsurface tint, for dark skin. Test: eyes and brow readable in R02-batter_head; mean face luminance >= 0.2." },
    { "id": "G-body-variety", "category": "characters", "expectedGain": 0.4, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R14-batter", "crops/high/R07-SS", "crops/high/R16-1B"], "benchmark": "smb4-4", "fix": "Ship three MakeHuman build presets (stocky, lean or tall, average) as shape keys, assigned by roster. Test: three visibly different silhouettes across the close-ups." },
    { "id": "G-swing-stride-trot", "category": "animation", "expectedGain": 0.4, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["strips/high/R04", "strips/high/R10"], "benchmark": "smb4-3", "fix": "Key a front-foot stride or toe tap starting at pitcher release, add two in-between keys between launch and contact, and give the trot alternating arm swing. Test: front foot lifts within R04 frames 1-4; arms alternate across R10." },
    { "id": "G-board-overlap", "category": "environment", "expectedGain": 0.2, "severity": 2, "effort": "S", "workstream": "WS4", "evidence": ["crops/high/R02-batter_hands", "crops/high/R17-pitcher-back"], "fix": "Lay out the sponsor boards along the wall with no overlaps, and sink the pitching rubber flush with the mound top. Test: every board name is complete in R02-batter_hands and R17-pitcher-back; the rubber's top is at mound height." }
  ],
  "calibration": {
    "perfGate": "pass: high desktop min 550.7 fps / p95 2.5 ms; medium phone proxy min 62.3 fps (p95 32.4 ms, watch); est. phone GPU 0.574 ms x 25 = 14.4 ms <= 26; software GL 19.5/16.5 vs 19.9/15.1 baseline, within noise; heap 78/72.3/75.9 MB pass; download not in perf.json",
    "factRulings": "R04 small coil, no stride (A partly wrong); R07 frame 7 reach key exists (A wrong), 4-5 is camera reframe (B overread), ball never in glove (real); R12 sky graded (A wrong); R13 fielders lit (A wrong); mobile R07 both corner bags off-frame (advocate wrong, B right); helmeted dark-skin faces lose eyes, lips/chin visible (A overstated); R05 feet hover is pose not shadow (advocate right); reticle by design (advocate right); cap skin, glove poke-through, garbled/floating lettering, board overlap real; low R02 batter differs from high (tier drift)",
    "effortWeights": "S=1, M=2, L=4"
  }
}
```
