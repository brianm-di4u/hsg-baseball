# Judge ruling: Diamond Springs, loop 0 (baseline, high tier)

Capture paths are relative to `screenshots/review-loop-0/`. No category differed by more than 1.0 between the critics (largest spread 0.5), so the mandatory re-check rule did not trigger. I still opened the captures behind every fact the advocate disputed: `crops/high/R17-pitcher_hands`, `crops/high/R05-catcher`, `crops/high/R02-batter_head`, `crops/high/R03-pitcher`, `crops/high/R12-pitcher`, `crops/high/R05-batter_feet`, `crops/high/R10-batter-trot`, `strips/high/R03`, `strips/high/R04`, `high/desktop/R05`, `R07`, `R13`, `R16`, `high/mobile/R07` and `high/landscape/R02`. Reference renders were present, so charfit is scored against them.

## Performance gate: PASS
Checked against `VISUAL-PLAN-3.md` "Budgets" and the rows in `perf.json`:
- **Desktop/high:** every scene is at least 715 fps with a worst p95 of 1.9 ms. The gate is ≥ 55 fps and ≤ 22 ms.
- **Phone proxy (medium, 4× throttle):** the minimum is 102.7 fps against a gate of ≥ 30. The worst unthrottled medium-mobile GPU time is 0.763 ms. At the roughly 25× phone ratio in `research/perf-ceiling.md`, that is about 19 ms, inside the 26 ms budget.
- **Software GL:** 15 fps. Loop 0 is the v2 baseline this gate is measured against, so it passes by definition.
- **Heap:** 36.4 MB at most, against the < 90 MB low limit.
- **Download:** not in `perf.json` and not verified here (it lives in `tests/perf.test.mjs`).

No WS6 gap is forced to the top.

## Category rulings

**Characters: 3.0.** I checked the advocate's factual points, and two are correct. `crops/high/R17-pitcher_hands` shows a short skin-coloured neck column, so Claude's "no neck" is wrong. `crops/high/R05-catcher` shows a blue chest panel and blue lower-leg pieces bulkier than socks, so Claude's "no chest protector or shin guards" is wrong too. The gear is present but has no construction. The eyes are protruding 3D balls, not decals. None of that moves the figure off the 3 anchor:
- mitten hands (`crops/high/R02-batter_hands`)
- tube limbs and a box torso (`crops/high/R17-pitcher_hands`)
- one body type everywhere (`high/desktop/R05`)
- flat colour-block cloth with sawtooth hems (`crops/high/R05-catcher`, `crops/high/R10-batter-trot`)
- billless dome caps (`crops/high/R03-pitcher`)
- feet that are black sock stumps (`crops/high/R05-batter_feet`)

The 5 anchor needs at least a readable cap and a modelled glove or separate fingers. The glove is a lump and the cap has no bill. The critics' 3.0 stands.

**Charfit: 3.0.** Both critics gave 2.5, and the advocate is right on calibration here. `crops/high/R02-pitcher` measures about 5.2–5.5 heads tall against about 7.3 for `mpfb2_athlete_front`. The figure has no deltoid, pectoral or knee landmarks and no digits (`crops/high/R17-pitcher_hands` against `hbm_male_realistic_hand`). Its face shares no anatomy with `mpfb2_athlete_face` (`crops/high/R02-batter_head`). That is the 3 anchor word for word: "proportions clearly wrong… no resemblance beyond humanoid". Neither critic named a defect worse than the anchor, and overall limb length is roughly right. I score 3.0.

**Animation: 4.0.** Claude gave 3.5 and Codex 4.0. My own checks:
- **Swing:** `strips/high/R04` reads, with stance, load, a level bat, contact with the "PERFECT" flash and a light trail, then a camera pull-back.
- **Delivery strip:** `strips/high/R03` is unreadable. The pitcher is a few dozen pixels tall and no leg lift is visible, so Codex's "recognizable leg-lift progression" is not supported by the capture. Claude was right on what is visible. The advocate is right that the cause is the capture rather than a missing clip: `crops/high/R12-pitcher` shows a real stride and follow-through.
- **Delivery close-up:** `crops/high/R03-pitcher` shows the pitcher in a two-legged hop with both feet well above the rubber and the shadow detached.
- **Follow-through:** in `crops/high/R12-pitcher` the landing leg ends in the mound with no foot visible. The head is twisted back and the cap band lies across the eyes.
- **Batter's stance:** `crops/high/R05-batter_feet` shows both feet clearly hovering above their shadow.
- **Replay:** R11 is frozen. The advocate measured a frame difference of 0.00, and that point is undisputed.
- **Home-run trot:** `crops/high/R10-batter-trot` confirms a trot clip exists, but the R10 strip never frames the runner.

The swing and contact feel lift this above 3. Floating and penetrating feet everywhere keep it below 5. I score 4.0.

**Environment: 4.5.** I hold the critics' score rather than the advocate's 5.0. The turf, dirt, foul poles, distance markers and light towers are real strengths (`high/desktop/R07`, `high/desktop/R13`). Two verified visual bugs sit outside the 5 anchor's description, though:
- The untextured grey slab fills the lower quarter of `high/desktop/R07`.
- The photo-card crowd renders at giant scale across the top of `high/desktop/R05`.

The 5 anchor describes a scene with cones and painted crowds, not one with blocking geometry. Docking half a point is not double-counting.

**Lighting: 5.0.** Claude gave 5.0 and Codex 4.5. `high/desktop/R02` meets the 5 anchor with a directional key, shadows and a believable sky. `high/desktop/R13` settles the light-pool dispute in the advocate's favour on both sides: there is a broad brightness gradient, not conspicuous pools and not a total absence of falloff. Night reads as a dimmed day with sprite glows and an abrupt black treeline. In `crops/high/R02-batter_head` the dark face is very dark but the nose and cheek planes and the jaw edge remain faintly readable, so "black disc" overstates it. There is still no fill or rim, and no contact shadow (`crops/high/R05-batter_feet`). That is the 5 anchor with nothing toward 7. I score 5.0.

**UI: 6.0.** Claude gave 5.5 and Codex 6.0. The style is consistent and the state is live:
- In `high/desktop/R16` the base diamond lights first base and the out pip shows red.
- `high/desktop/R05` has pitch-type buttons and a target reticle.
- `strips/high/R04` shows timing feedback.

That clears the 5 anchor's "inconsistent style". Against that, the team boxes are oversized and empty, banners are single lines, and a keyboard hint ("Space or click: swing…") shows on the touch layout in `high/landscape/R02`. I score 6.0.

**Readability: 5.5.** `high/desktop/R16` shows the strike zone sitting cleanly over the dirt, well clear of the chalk, so Claude's chalk claim is wrong. In `high/desktop/R07` the team rings, the yellow batter-runner ring and the ball on the grass all help. Fielders are still small there and the slab blocks the lower field. `high/mobile/R07` crops out both corner bases. I score 5.5.

**Mobile: 5.5.** All three reviewers agree, and I verified:
- `high/mobile/R07` gives about 18% of the viewport to the slab, and its fielders are about 15 px tall.
- `high/landscape/R02` squeezes the playfield to about 65% of the height and shows keyboard guidance on a touch layout.
- The thumb buttons are large and the phone proxy holds over 100 fps.

I score 5.5.

**Total: 36.5 / 80. Verdict: continue.** No gate is met, and characters is 4.5 points short of its gate.

## Corrected causes
- **R03:** the delivery is authored but the capture is too wide. The real animation fault is the airborne, two-footed set pose.
- **R10:** the trot clip exists. The camera follows the ball instead of the runner.
- **Catcher's gear:** it exists but has no construction, so it needs work rather than adding.
- **Neck:** it exists but is too short and thin.

## Ranked gaps (top 12)
Ranking is expected gain ÷ effort, with S = 1, M = 2 and L = 4. Ties are broken by severity, then by the campaign's character priority.

1. **G-char-anatomical-mesh** (charfit, WS1, L, sev 5, +2.0). Ship a skinned anatomical mesh at about 7.3 heads, with:
   - a neck at least 0.4 head-heights long
   - deltoid, hip and knee landmarks
   - 5-finger hands whose fingers wrap the bat handle at LOD0
   - 3 body presets (height, mass, belly)

   Test: `R02-pitcher`, `R16-1B` and `R17` silhouettes overlap the `mpfb2_athlete` masks; `R02-batter_hands` shows fingers around the handle; 3 builds are visible in `R05`.
2. **G-foot-grounding** (animation, WS2, M, sev 5, +1.0). Fix the root-height offset and add foot IK with a ground lock.
   Test: in stance, set and landing, the soles sit within 2 cm of the terrain with no mound penetration. Check `R05-batter_feet`, `R03-pitcher` (pivot foot on the rubber, not a two-footed hop), `R12-pitcher` and `R02-pitcher`. Airborne run phases are excluded.
3. **G-garment-seams** (characters, WS1, S, sev 3, +0.5). On the shipped mesh:
   - remove the sawtooth collar, belt and shirt-tail triangles
   - fix skin poking through at the elbow, wrist and collar
   - mask the chest lettering and back number to torso UVs

   Test: clean edges in `R05-catcher`, `R17-pitcher_hands` and `R10-batter-trot`; no lettering on the forearm in `R02-batter_hands`.
4. **G-replay-trot-cameras** (animation, WS5, S, sev 4, +0.5). Three changes:
   - make the R11 replay play motion
   - make the home-run camera follow the runner
   - tighten the R03 capture so the pitcher is at least 100 px tall and the strip spans release

   Test: the R11 frames differ; the runner is in all 8 frames of R10; the R03 strip shows distinct poses.
5. **G-blocking-slab** (environment, WS4, S, sev 4, +0.5). Remove the grey slab or fade it as a camera occluder in the field and title cameras, and texture the stand boxes.
   Test: no slab in `high/desktop/R07` or `high/mobile/R07`. This also lifts readability and mobile.
6. **G-face-sculpt** (characters, WS1, M, sev 4, +1.0). Replace the ball eyes and blob nose with modelled lids, brow, nose, lips, ears and hair, with at least 3 face variants.
   Test: `R02-batter_head` holds up next to `mpfb2_athlete_face`.
7. **G-kit** (characters, WS1, M, sev 4, +1.0). Add:
   - billed caps and helmets with an ear flap
   - cleats with soles
   - a glove with a pocket and webbing
   - straps and padding on the existing catcher's chest panel and shin pieces
   - a jersey placket and sleeve hems

   Test: each item is visible in its matching crop (`R03-pitcher`, `R05-batter_feet`, `R06-catcher_glove`, `R05-catcher`).
8. **G-framing** (readability, WS5, M, sev 4, +1.0). Tighten the field cameras so fielders are at least 30 px tall, and keep the destination bases in frame.
   Test: the fielder with the ball is identifiable in every frame of `strips/high/R07` and `R08`, and the corner bases are visible in `high/mobile/R07`.
9. **G-phone** (mobile, WS7, M, sev 3, +1.0). Use orientation-specific cameras, compact the landscape HUD to at most 20% of the height, keep the matchup line in landscape, and hide keyboard hints on touch devices.
   Test: `high/landscape/R02` and `R05`.
10. **G-crowd-scale** (environment, WS4, M, sev 3, +0.75). Replace the photo-card crowd with instanced impostor fans at correct scale.
    Test: fans behind home are at most 1.2× player height in `high/desktop/R05` and `R17`.
11. **G-light** (lighting, WS3, M, sev 3, +0.75). Add hemisphere and rim fill with a lifted floor for dark skin and uniforms, contact AO under the feet (after G-foot-grounding), tower light pools at night, and a softer transition at the treeline.
    Test: facial planes are clear in `R02-batter_head`, and there are pools under the towers in `R13`.
12. **G-hud** (ui, WS7, M, sev 2, +0.75). Compact the score bug and add a line score, label the count pips, give result banners a headline and detail line, and keep the HUD chrome under 15% of desktop height.
    Test: `R02` and `R10`.

```json
{
  "loop": 0,
  "role": "judge",
  "tier": "high",
  "verdict": "continue",
  "scores": {
    "characters": { "score": 3.0, "confidence": 0.85, "evidence": [
      { "shot": "crops/high/R02-batter_hands", "note": "mitten hands, bat not gripped, lettering on forearm" },
      { "shot": "crops/high/R05-catcher", "note": "catcher gear present but unconstructed; sawtooth hems; grid mask" },
      { "shot": "crops/high/R17-pitcher_hands", "note": "short neck exists; tube arms, box torso, skin poke-through, lump glove" },
      { "shot": "crops/high/R05-batter_feet", "note": "no shoes: sock stumps" },
      { "shot": "high/desktop/R05", "note": "one body type throughout" } ] },
    "charfit": { "score": 3.0, "confidence": 0.8, "evidence": [
      { "shot": "crops/high/R02-pitcher", "note": "~5.2-5.5 heads vs ~7.3 in mpfb2_athlete_front: the 3 anchor exactly" },
      { "shot": "crops/high/R17-pitcher_hands", "note": "no digits or deltoid/pectoral form vs hbm_male_realistic_hand/three_quarter" },
      { "shot": "crops/high/R02-batter_head", "note": "no facial anatomy shared with mpfb2_athlete_face" } ] },
    "animation": { "score": 4.0, "confidence": 0.75, "evidence": [
      { "shot": "strips/high/R04", "note": "swing reads: load, level bat, PERFECT contact flash, trail, camera pull-back" },
      { "shot": "strips/high/R03", "note": "delivery unreadable at capture scale; no leg lift visible" },
      { "shot": "crops/high/R03-pitcher", "note": "two-footed hop, both feet well above rubber" },
      { "shot": "crops/high/R12-pitcher", "note": "real stride/follow-through but landing leg sunk into mound" },
      { "shot": "crops/high/R05-batter_feet", "note": "stance feet hover above shadow" },
      { "shot": "strips/high/R11", "note": "replay frozen" } ] },
    "environment": { "score": 4.5, "confidence": 0.75, "evidence": [
      { "shot": "high/desktop/R07", "note": "good turf/dirt and rings; grey slab blocks lower quarter" },
      { "shot": "high/desktop/R05", "note": "photo-card crowd at giant scale behind home" },
      { "shot": "high/desktop/R13", "note": "foul pole, distance markers, scoreboard, towers; cone trees" } ] },
    "lighting": { "score": 5.0, "confidence": 0.7, "evidence": [
      { "shot": "high/desktop/R02", "note": "directional key, shadows, believable sky" },
      { "shot": "high/desktop/R13", "note": "broad gradient, not pools; dimmed-day night; abrupt black treeline" },
      { "shot": "crops/high/R02-batter_head", "note": "dark face very dark but planes faintly readable; no fill/rim" },
      { "shot": "crops/high/R05-batter_feet", "note": "no contact shadow; shadow detached" } ] },
    "ui": { "score": 6.0, "confidence": 0.7, "evidence": [
      { "shot": "high/desktop/R16", "note": "consistent type; base diamond and out pip update with state" },
      { "shot": "high/desktop/R05", "note": "pitch-type buttons, reticle, clear primary action; empty wide team boxes" },
      { "shot": "high/landscape/R02", "note": "keyboard hint on touch layout; tall chrome" } ] },
    "readability": { "score": 5.5, "confidence": 0.7, "evidence": [
      { "shot": "high/desktop/R16", "note": "strike zone clear of chalk and reads; runner/1B at right edge" },
      { "shot": "high/desktop/R07", "note": "rings and ball visible; fielders small; slab blocks" },
      { "shot": "high/mobile/R07", "note": "corner bases out of frame" },
      { "shot": "strips/high/R04", "note": "ball trail and zone conspicuous" } ] },
    "mobile": { "score": 5.5, "confidence": 0.7, "evidence": [
      { "shot": "high/mobile/R07", "note": "slab ~18% of viewport; fielders ~15 px" },
      { "shot": "high/landscape/R02", "note": "playfield ~65% height; keyboard hint on touch" },
      { "shot": "high/mobile/R05", "note": "plate group readable; crowd card oversized" } ] }
  },
  "gaps": [
    { "id": "G-char-anatomical-mesh", "category": "charfit", "expectedGain": 2.0, "severity": 5, "effort": "L", "workstream": "WS1", "evidence": ["crops/high/R02-pitcher", "crops/high/R17-pitcher_hands", "crops/high/R16-1B", "crops/high/R02-batter_hands"], "benchmark": "mpfb2_athlete_front, mpfb2_game27k_glb_front, hbm_male_realistic_hand", "fix": "Skinned anatomical mesh at ~7.3 heads: neck >= 0.4 head-heights, deltoid/hip/knee landmarks, 5-finger hands wrapping the bat handle at LOD0, 3 body presets. Test: R02/R16/R17 silhouettes overlap mpfb2 masks; fingers round handle in R02-batter_hands; 3 builds in R05." },
    { "id": "G-foot-grounding", "category": "animation", "expectedGain": 1.0, "severity": 5, "effort": "M", "workstream": "WS2", "evidence": ["crops/high/R05-batter_feet", "crops/high/R03-pitcher", "crops/high/R12-pitcher", "crops/high/R02-pitcher"], "fix": "Fix root-height offset and add foot IK/ground lock: soles within 2 cm of terrain in stance, set and landing; pivot foot on rubber in set (no two-footed hop); no mound penetration. Airborne run phases excluded." },
    { "id": "G-garment-seams", "category": "characters", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R05-catcher", "crops/high/R17-pitcher_hands", "crops/high/R02-batter_hands", "crops/high/R10-batter-trot"], "fix": "On the shipped mesh remove sawtooth collar/belt/shirt-tail triangles, fix skin poke-through at elbow/wrist/collar, mask chest lettering and numbers to torso UVs. Test: clean edges in R05-catcher, R17-pitcher_hands; no forearm lettering in R02-batter_hands." },
    { "id": "G-replay-trot-cameras", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS5", "evidence": ["strips/high/R11", "strips/high/R10", "strips/high/R03", "crops/high/R10-batter-trot"], "fix": "R11 replay plays motion; HR camera follows the runner; R03 capture frames pitcher at >= 100 px and spans release. Test: R11 frames differ, runner in all 8 R10 frames, 8 distinct pitcher poses in R03." },
    { "id": "G-blocking-slab", "category": "environment", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS4", "evidence": ["high/desktop/R07", "high/mobile/R07", "high/desktop/R01"], "fix": "Remove or occluder-fade the grey slab in field and title cameras; texture stand boxes. Test: no slab in high/desktop/R07 or high/mobile/R07." },
    { "id": "G-face-sculpt", "category": "characters", "expectedGain": 1.0, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R02-batter_head", "crops/high/R03-pitcher", "crops/high/R12-pitcher"], "benchmark": "mpfb2_athlete_face, smb4-4", "fix": "Modelled lids, brow, nose, lips, ears and hair replace ball eyes and blob nose; at least 3 face variants. Test: R02-batter_head holds up next to mpfb2_athlete_face." },
    { "id": "G-kit", "category": "characters", "expectedGain": 1.0, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R03-pitcher", "crops/high/R05-batter_feet", "crops/high/R06-catcher_glove", "crops/high/R05-catcher"], "benchmark": "smb3-3, smb4-2, smb4-4", "fix": "Billed caps, ear-flap helmets, soled cleats, pocketed/webbed glove, straps and padding on existing catcher chest panel and shin pieces, jersey placket and sleeve hems. Test: each visible in its crop." },
    { "id": "G-framing", "category": "readability", "expectedGain": 1.0, "severity": 4, "effort": "M", "workstream": "WS5", "evidence": ["high/desktop/R07", "strips/high/R08", "high/mobile/R07", "high/desktop/R16"], "benchmark": "smb3-1, backyard97-1", "fix": "Field cameras with fielders >= 30 px and destination bases in frame. Test: fielder with the ball identifiable in every R07/R08 strip frame; corner bases visible in high/mobile/R07." },
    { "id": "G-phone", "category": "mobile", "expectedGain": 1.0, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["high/landscape/R02", "high/landscape/R05", "high/mobile/R05", "high/mobile/R07"], "benchmark": "backyard97-1", "fix": "Orientation-specific cameras; landscape HUD chrome <= 20% of height; matchup line kept in landscape; keyboard hints hidden on touch." },
    { "id": "G-crowd-scale", "category": "environment", "expectedGain": 0.75, "severity": 3, "effort": "M", "workstream": "WS4", "evidence": ["high/desktop/R05", "high/desktop/R17", "high/mobile/R05"], "benchmark": "smb3-1, smb4-3", "fix": "Instanced impostor fans at correct scale replace the photo card. Test: fans behind home <= 1.2x player height in high/desktop/R05 and R17." },
    { "id": "G-light", "category": "lighting", "expectedGain": 0.75, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["crops/high/R02-batter_head", "high/desktop/R13", "high/desktop/R12"], "benchmark": "smb3-3, smb3-4, smb4-1", "fix": "Hemisphere/rim fill with lifted floor for dark skin and uniforms, contact AO under feet (after G-foot-grounding), tower light pools at night, softer treeline. Test: facial planes clear in R02-batter_head; pools under towers in R13." },
    { "id": "G-hud", "category": "ui", "expectedGain": 0.75, "severity": 2, "effort": "M", "workstream": "WS7", "evidence": ["high/desktop/R02", "high/desktop/R05", "high/landscape/R10"], "benchmark": "smb3-1, ootp26-1", "fix": "Compact score bug with line score, labelled pips, result banners with headline plus detail line; HUD chrome under 15% of desktop height." }
  ],
  "calibration": {
    "perfGate": "pass: high desktop min 715 fps / p95 1.9 ms; medium phone proxy min 102.7 fps, est. phone GPU ~19 ms; heap max 36.4 MB; software GL is the baseline; download not in perf.json",
    "factRulings": "neck present (advocate right); catcher gear present but unconstructed (advocate right); R03 leg lift not visible (Codex wrong); R03 delivery authored, capture too wide (advocate right); strike zone clear of chalk in R16 (Claude wrong); R13 broad gradient not pools (advocate right)",
    "effortWeights": "S=1, M=2, L=4"
  }
}
```
