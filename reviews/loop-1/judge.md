# Judge ruling: Diamond Springs, loop 1 (high tier)

Capture paths are relative to `screenshots/review-loop-1/`. The critics never differ by more than 0.5 in any category, so the mandatory re-check did not trigger. I still opened every capture behind a disputed fact: `crops/high/R05-batter_feet`, `R17-pitcher-back`, `R02-batter_head`, `R02-batter_hands`, `R09-LF`, `R16-1B`, `R05-batter-front`, `R14-batter`, `R04-batter` and `R06-catcher_glove`; `strips/high/R03`, `R04`, `R07` and `R10`; `high/desktop/R05`, `R13` and `R16`; `high/mobile/R05` and `R07`; and `high/landscape/R05`. Reference renders are present, so charfit is scored against them.

## Performance gate: PASS (two watch items)
Checked against `VISUAL-PLAN-3.md` "Budgets" and `perf.json`:
- **Desktop/high:** every scene runs at ≥ 484.7 fps (grounder), with a worst p95 of 3.0 ms. The gate is ≥ 55 fps and ≤ 22 ms.
- **Phone proxy (medium, 4× throttle):** min 45.0 fps against a gate of ≥ 30. The worst unthrottled medium-mobile GPU time is 0.855 ms; at the ~25× ratio in `research/perf-ceiling.md` that is about 21 ms, inside 26 ms. *Watch:* the proxy fell from 102.7 fps in loop 0 to 45, so the margin is now about 1.5×.
- **Software GL:** grounder 14.0 fps / p95 83.1 ms against the loop-0 baseline of 15.1 / 87.4; duel 18.5 / 70.8 against 19.9 / 68.2. The fps is about 7% lower, but the p95 moves in opposite directions in the two scenes, and the low tier still draws the unchanged v2 players. I rule it within run noise, so it passes. Re-run it 3× next loop to confirm.
- **Heap:** high 91.3 MB (< 192), medium 73.1 (< 128), low 76.5 (< 90). All pass. *Watch:* low-tier heap rose from 36.4 to 76.5 MB, and is now at 85% of its budget.
- **Download:** not in `perf.json`. The brief reports pack sizes of 8.4 MB high (≤ 10) and 3.5 MB medium (≤ 4); I did not verify the eager size.

No WS6 gap is forced to the top.

## Category rulings

**Characters: 5.0** (Claude 5.0, Codex 4.5, advocate 5.0). The bodies are now real anatomy:
- shoulder, hip and knee read in `crops/high/R16-1B` and `R09-LF`;
- fingers wrap the handle in `crops/high/R02-batter_hands` and `R14-batter`;
- light and medium faces show brow, eyes, nose and lips in `R09-LF`, `R16-1B` and the umpire in `R05-batter-front`.

Those are 7-anchor features. Everything worn on the body drags the score down, often below the 5 anchor's "clean… readable cap and helmet":
- the cap brim runs all the way round, a bucket hat (`R16-1B`, `R09-LF`; advocate right);
- the helmet is faceted, with checkerboard specular and slab ear flaps (`R02-batter_head`);
- every neckline is sawtooth with skin triangles;
- the mitt is a lump and the chest plate and shin "petals" are flat (`R06-catcher_glove`);
- the mask ladders float in front of the face;
- the shoes are clogs.

Back numbers are **mirrored but flat** on the jersey: "23" in `R05-batter-front`, "16" in `R14-batter`, "27" in `high/mobile/R05`. Claude and the advocate are right; Codex's "stands away from the garment" is wrong. No stocky build is visible anywhere. The two pulls cancel at 5.0. The gate is 7.5.

**Charfit: 5.5** (Claude 5.5, Codex 5.0, advocate 5.5).
- Proportions match `mpfb2_athlete_three_quarter` (`crops/high/R17-pitcher-back`), with IoU 0.84–0.85.
- The hand is the reference's hand.
- On lit players the face is the same MakeHuman face (`R09-LF`). Codex is wrong that faces are generally "far below" the reference; that only holds on dark skin under helmets, which is a lighting fault.
- The garments are far simpler than `si_jersey_three_quarter`: no placket, collar, piping or folds (`R07-SS`).
- The per-distance IoU rows measure LOD consistency against LOD0, not against the reference. Codex is right on that, but they do show the silhouette holding at every game distance.

That is above the 5 anchor on proportion and below 7 on garments. 5.5.

**Animation: 5.0** (Claude 5.0, Codex 4.5, advocate 5.0). I verified:
- **Pitch** (`strips/high/R03`): frames 1–3 straddle the rubber, and in frames 4–6 the support sole lifts off its shadow. That is levitation. The strip ends at release, so the missing follow-through counts neither way (advocate right).
- **Swing** (`strips/high/R04`): load, stride, rotation, finish and heel lift. The frame 5 bloom sits at the barrel and ball, so Codex's "spatially separated" claim is wrong.
- **Fielding** (`strips/high/R07`): there is a camera cut between frames 4 and 5 (the scoreboard and distance markers jump), so Codex's braking complaint can't be judged. Frames 5–8 are an identical frozen crouch, and the glove never moves.
- **Trot** (`strips/high/R10`): soles meet their shadows in the contact frames. Codex's "floaty" is wrong.

Keyed cycles read, with floaty feet in the two most-watched clips. That is the 5 anchor.

**Environment: 5.0** (both critics 5.0). The loop-0 blocking slab is gone (`high/mobile/R07`). A dugout opening exists in `crops/high/R14-batter`, so Claude's "no dugouts" is wrong. Turf, dirt, towers and poles are solid (`high/desktop/R07`). The photo crowd behind home is still a glaring scale bug: the heads are larger than the batter's torso in `high/desktop/R05`. The stands are grey boxes and the trees are cones (`high/desktop/R01`). 5.0.

**Lighting: 5.0** (Claude 5.5, Codex 5.0, advocate 5.0). Claude's key evidence is wrong: in `crops/high/R05-batter_feet` both shoes hover above offset shadows. Codex's "pitcher suspended" in `crops/high/R17-pitcher-back` is also wrong: the foot sits on the rubber and a soft contact shadow joins both soles, and `R16-1B` and `R09-LF` are grounded too. So grounding works for fielders and fails in the batting stance and the leg lift.

Dark faces under black helmets crush to near-black (`R02-batter_head`, `R06-catcher_glove`). The 22% camera fill is not enough. `high/desktop/R13` has a broad gradient toward the foul corner but no tower pools. The golden grade (`R14`) is pleasant. Partial grounding is real progress, but the most-viewed actor hovers and faces drop out. 5.0.

**UI: 6.0** (Claude 6.0, Codex 6.5, advocate 6.0). The score bug, count, base diamond and "FB 78 mph" readout are clean and consistent (`high/desktop/R13`, `R05`). Against that:
- the HR banner is bare text with no panel (`R15`), and there is no banner through the trot (`R10`);
- the title panel is translucent (`R01`);
- landscape still shows keyboard hints (`high/landscape/R05`).

Nothing new since loop 0. 6.0.

**Readability: 5.5** (both critics 5.5). The batting view reads (`high/desktop/R16`), but its 1B runner and fielder are clipped at the right edge. Wide-camera fielders are about 15 px (`high/desktop/R13`, `R07`). The ball is oversized in close views: about three-quarters of a shoe in `crops/high/R04-batter`, and larger than the shortstop's torso in `strips/high/R07` frames 7–8. That last one reads as a bug, not a cue. 5.5.

**Mobile: 6.0** (Claude 5.5, Codex 6.0, advocate 6.0). `high/mobile/R07` now keeps both corner bases in frame and has no slab, which fixes two loop-0 defects. `high/mobile/R05` reads as a deliberate over-the-shoulder shot, so the advocate is right that the clipping is a choice. Against that:
- landscape chrome is about 34% of the height, with desktop hints and no matchup line (`high/landscape/R05`);
- field figures are about 15–20 px (`high/mobile/R07`).

The proxy holds 45 fps. 6.0.

**Total: 43.0 / 80. Verdict: continue.** No gate is met. Characters is 2.5 short of its gate.

## Corrected causes
- **Faces:** the cause is fill and exposure (WS3), not the model. The same faces read under golden light (`R14-batter`) and on medium skin.
- **Grounding:** it works at rest and in the run. It fails only in the batting stance (`R05-batter_feet`) and the leg lift (`R03`).
- **R07 transition:** a capture artefact (camera cut). The freeze is real.
- **Numbers:** mirrored UVs, not stand-off geometry.

## Ranked gaps (top 12)
Ranked by expected gain ÷ effort (S = 1, M = 2, L = 4). Ties go to severity, then to the character priority.

1. **G-face-fill** (characters, WS3, S, sev 5, +0.5; also lighting +0.25). Fix: a hemisphere sky fill plus a camera-side rim on skin only, with a skin luminance floor. Test: mean face luminance ≥ 35/255, with eye whites and brows visible, in `R02-batter_head` and `R06-catcher_glove`.
2. **G-crowd-scale** (environment, WS4, M, sev 5, +1.0). Fix: rescale the backstop crowd so heads are about 0.75 ft, or replace it with tiered impostor fans. Test: crowd heads are smaller than the catcher's helmet in `high/desktop/R05`, `R17` and `high/mobile/R05`.
3. **G-neckline-cuffs** (characters, WS1, S, sev 4, +0.5). Fix: a modelled collar band and sleeve cuffs, with body faces under the garment deleted. Test: no skin triangles or jagged edges in `R17-pitcher_hands`, `R16-1B`, `R09-LF` or `R14-batter`.
4. **G-stance-grounding** (animation, WS2, S, sev 4, +0.5). Fix: set the pivot foot on the rubber and IK-pin it through the leg lift; extend foot grounding to the batting stance. Test: the sole is within 0.05 ft of the surface in `strips/high/R03` frames 1–6 and in `R05-batter_feet`.
5. **G-result-banners** (ui, WS7, S, sev 3, +0.5). Fix: a panelled HR/hit banner (result, distance, batter) with entry motion, held through the trot; make the title panel opaque. Test: `high/desktop/R10`, `R15` and `R01`.
6. **G-cap-helmet** (characters, WS1, M, sev 4, +0.75). Fix: a cap with a front-only bill no wider than the head and the crown seated on the skull; a smooth-shaded helmet of 32 or more segments with a molded jaw-following ear flap. Test: `R16-1B` reads as a ball cap, and `R02-batter_head` shows no facet bands.
7. **G-wide-cam-scale** (readability, WS5, M, sev 4, +0.75). Fix: ball- and fielder-following cameras with players ≥ 40 px on desktop and ≥ 30 px on mobile; keep the R16 runner in frame; add a possession ring; clamp the ball's on-screen scale to ≤ 1.5× real within 30 ft of the camera. Test: `R07`, `R16`, `R13`, `strips/high/R07` frames 7–8.
8. **G-mirrored-numbers** (characters, WS1, S, sev 4, +0.3). Fix: flip the v3 back-number decal U and give every player a number. Test: "23", "16" and "27" read correctly; the pitcher has a number in `R17-pitcher-back`.
9. **G-body-variety** (characters, WS1, S, sev 3, +0.3). Fix: push the stocky preset (5 ft 9, waist and chest +15%) and make sure the R05 and R07 lineups include one lean, one average and one stocky player. Test: 3 builds are distinguishable in `high/desktop/R05` and `R07`.
10. **G-glove-mask-gear** (characters, WS1, M, sev 4, +0.5). Fix:
    - a glove with finger stalls, web and pocket;
    - a mask frame with a chin cup, touching the face;
    - a plated chest protector and knee-capped shin guards;
    - laced cleats with spikes.

    Test: `R17-pitcher_hands`, `R06-catcher_glove`, `R05-ump_head` and `R05-batter_feet`.
11. **G-garment-construction** (charfit, WS1, M, sev 4, +0.5). Fix: placket and buttons, collar and sleeve piping, a wrinkle normal map at the elbows, armpits and waist, belt loops and buckle, stirrup cut-outs. Test: a placket is visible in `R07-SS` and `R12-pitcher`.
12. **G-fielding-freeze** (animation, WS2, M, sev 4, +0.5). Fix: blend the crouch into a glove reach, transfer and throw; capture R07 without a camera cut; capture the R09 catch. Test: the glove moves across `strips/high/R07` frames 5–8, and the glove is at the ball in `R09-LF`.

Dropped below the cut: phone landscape layout (+0.5 M), night tower pools (+0.5 M).

```json
{
  "loop": 1,
  "role": "judge",
  "tier": "high",
  "verdict": "continue",
  "scores": {
    "characters": { "score": 5.0, "confidence": 0.8, "evidence": [
      { "shot": "crops/high/R16-1B", "note": "readable anatomy and medium-skin face; bucket-hat brim, sawtooth neck, wedge glove" },
      { "shot": "crops/high/R02-batter_hands", "note": "fingers wrap the handle; faceted helmet, slab ear flap" },
      { "shot": "crops/high/R05-batter-front", "note": "umpire face modelled; floating mask ladders; mirrored but flat '23'" },
      { "shot": "crops/high/R06-catcher_glove", "note": "lump mitt, flat chest plate, petal shin guards" },
      { "shot": "crops/high/R05-batter_feet", "note": "clog shoes, plain tube socks" } ] },
    "charfit": { "score": 5.5, "confidence": 0.75, "evidence": [
      { "shot": "crops/high/R17-pitcher-back", "note": "proportions match mpfb2_athlete_three_quarter" },
      { "shot": "crops/high/R09-LF", "note": "same MakeHuman face as mpfb2_athlete_face_34 when lit" },
      { "shot": "crops/high/R07-SS", "note": "garment far simpler than si_jersey_three_quarter" },
      { "shot": "crops/high/R02-batter_head", "note": "dark face lost under helmet (lighting cause)" } ] },
    "animation": { "score": 5.0, "confidence": 0.75, "evidence": [
      { "shot": "strips/high/R03", "note": "straddles rubber; support sole lifts off shadow frames 4-6; ends at release" },
      { "shot": "strips/high/R04", "note": "load, stride, rotation, finish; contact bloom at bat and ball in frame 5" },
      { "shot": "strips/high/R07", "note": "camera cut 4-5; crouch frozen 5-8, glove static" },
      { "shot": "strips/high/R10", "note": "planted trot contacts, counter-swinging arms" } ] },
    "environment": { "score": 5.0, "confidence": 0.8, "evidence": [
      { "shot": "high/desktop/R05", "note": "photo crowd heads larger than the batter's torso" },
      { "shot": "high/desktop/R01", "note": "grey box stands, cone trees" },
      { "shot": "crops/high/R14-batter", "note": "dugout opening present" },
      { "shot": "high/mobile/R07", "note": "loop-0 slab gone; mow checker and dirt good" } ] },
    "lighting": { "score": 5.0, "confidence": 0.75, "evidence": [
      { "shot": "crops/high/R05-batter_feet", "note": "both shoes hover above offset shadows" },
      { "shot": "crops/high/R17-pitcher-back", "note": "foot on rubber, soft contact shadow joins soles" },
      { "shot": "crops/high/R02-batter_head", "note": "dark face crushed under black helmet; fill insufficient" },
      { "shot": "high/desktop/R13", "note": "broad gradient, no tower pools" } ] },
    "ui": { "score": 6.0, "confidence": 0.7, "evidence": [
      { "shot": "high/desktop/R13", "note": "clean score bug, count, pitch-speed readout" },
      { "shot": "high/desktop/R05", "note": "consistent type, clear pitch buttons and reticle" },
      { "shot": "high/landscape/R05", "note": "keyboard hints on touch layout; matchup line dropped" } ] },
    "readability": { "score": 5.5, "confidence": 0.7, "evidence": [
      { "shot": "high/desktop/R16", "note": "batting view reads; 1B runner and fielder clipped at right edge" },
      { "shot": "high/desktop/R13", "note": "fielders about 15 px" },
      { "shot": "strips/high/R07", "note": "ball larger than the fielder's torso in frames 7-8" } ] },
    "mobile": { "score": 6.0, "confidence": 0.7, "evidence": [
      { "shot": "high/mobile/R07", "note": "corner bases in frame, no slab; figures 15-20 px" },
      { "shot": "high/mobile/R05", "note": "deliberate over-shoulder framing; battery and target readable" },
      { "shot": "high/landscape/R05", "note": "chrome about 34% of height, desktop hints" } ] }
  },
  "gaps": [
    { "id": "G-face-fill", "category": "characters", "expectedGain": 0.5, "severity": 5, "effort": "S", "workstream": "WS3", "evidence": ["crops/high/R02-batter_head", "crops/high/R06-catcher_glove", "crops/high/R14-batter"], "benchmark": "smb4-4", "fix": "Hemisphere sky fill plus camera-side rim on skin, with a skin luminance floor. Test: mean face luminance >= 35/255 with eye whites and brows visible in R02-batter_head and R06-catcher_glove. Also lifts lighting about +0.25." },
    { "id": "G-crowd-scale", "category": "environment", "expectedGain": 1.0, "severity": 5, "effort": "M", "workstream": "WS4", "evidence": ["high/desktop/R05", "crops/high/R17-pitcher-back", "high/mobile/R05"], "benchmark": "smb3-1", "fix": "Rescale the backstop crowd to life size (head about 0.75 ft) or replace with tiered impostor fans. Test: crowd heads smaller than the catcher's helmet in high/desktop/R05, R17 and high/mobile/R05." },
    { "id": "G-neckline-cuffs", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R16-1B", "crops/high/R09-LF", "crops/high/R14-batter"], "fix": "Modelled collar band and sleeve cuffs; delete body faces under the garment. Test: no skin triangles or jagged edges at neck or cuffs in the cited crops." },
    { "id": "G-stance-grounding", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS2", "evidence": ["strips/high/R03", "crops/high/R05-batter_feet"], "benchmark": "smb4-2", "fix": "Set the pivot foot on the rubber and IK-pin it through the leg lift; extend foot grounding to the batting stance. Test: sole within 0.05 ft of the surface in R03 strip frames 1-6 and in R05-batter_feet." },
    { "id": "G-result-banners", "category": "ui", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R15", "high/desktop/R10", "high/desktop/R01"], "benchmark": "smb3-1", "fix": "Panelled HR/hit banner (result, distance, batter) with entry motion, held through the trot; opaque title panel. Test: panel visible in high/desktop/R10 and R15; no field lines through the R01 panel." },
    { "id": "G-cap-helmet", "category": "characters", "expectedGain": 0.75, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R16-1B", "crops/high/R09-LF", "crops/high/R02-batter_head"], "benchmark": "smb4-2", "fix": "Cap with a front-only bill no wider than the head and the crown seated on the skull; smooth-shaded helmet of 32+ segments with a molded jaw-following ear flap. Test: R16-1B reads as a ball cap; no facet bands or quad specular in R02-batter_head." },
    { "id": "G-wide-cam-scale", "category": "readability", "expectedGain": 0.75, "severity": 4, "effort": "M", "workstream": "WS5", "evidence": ["high/desktop/R16", "high/desktop/R13", "high/mobile/R07", "strips/high/R07"], "benchmark": "smb3-1", "fix": "Ball- and fielder-following cameras (players >= 40 px desktop, >= 30 px mobile), keep the R16 runner in frame, add a possession ring, clamp on-screen ball scale to <= 1.5x real within 30 ft of the camera. Test: R07, R13, R16, R07 strip frames 7-8." },
    { "id": "G-mirrored-numbers", "category": "characters", "expectedGain": 0.3, "severity": 4, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R05-batter-front", "crops/high/R14-batter", "high/mobile/R05", "crops/high/R17-pitcher-back"], "benchmark": "smb4-4", "fix": "Flip the v3 back-number decal U and give every player a number. Test: '23', '16' and '27' read correctly; the pitcher has a number in R17-pitcher-back." },
    { "id": "G-body-variety", "category": "characters", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["high/desktop/R05", "crops/high/R16-1B", "crops/high/R17-pitcher-back"], "fix": "Push the stocky preset (5 ft 9, waist and chest +15%) and make sure the R05 and R07 lineups include lean, average and stocky players. Test: 3 builds distinguishable in high/desktop/R05 and R07." },
    { "id": "G-glove-mask-gear", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R06-catcher_glove", "crops/high/R05-batter-front", "crops/high/R05-batter_feet"], "benchmark": "smb3-3", "fix": "Glove with finger stalls, web and pocket; mask frame with chin cup touching the face; plated chest protector and knee-capped shin guards; laced cleats with spikes. Test: each visible in its cited crop." },
    { "id": "G-garment-construction", "category": "charfit", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R07-SS", "crops/high/R12-pitcher", "crops/high/R14-batter"], "benchmark": "si_jersey_three_quarter", "fix": "Placket and buttons, collar and sleeve piping, wrinkle normal map at elbows, armpits and waist, belt loops and buckle, stirrup cut-outs. Test: placket visible in R07-SS and R12-pitcher." },
    { "id": "G-fielding-freeze", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["strips/high/R07", "crops/high/R09-LF"], "fix": "Blend the crouch into a glove reach, transfer and throw; capture R07 without a camera cut; capture the R09 catch. Test: glove moves across R07 strip frames 5-8; glove at the ball in R09-LF." }
  ],
  "calibration": {
    "perfGate": "pass: high desktop min 484.7 fps / p95 3.0 ms; medium phone proxy min 45.0 fps, est. phone GPU ~21 ms (0.855 ms x 25); software GL 14.0/18.5 fps vs 15.1/19.9 baseline, ruled within noise (p95 mixed sign); heap high 91.3, medium 73.1, low 76.5 MB; packs 8.4/3.5 MB per brief. Watch: phone proxy margin and low heap at 85% of budget.",
    "factRulings": "R05-batter_feet hovers (Claude wrong, Codex right); R17 pitcher grounded (Codex wrong); numbers mirrored and flat (Codex wrong on stand-off); faces readable when lit, so the cause is lighting (advocate right); dugout exists in R14 (Claude wrong); R07 strip has a camera cut 4-5 (advocate right); R04 bloom at bat/ball (Codex wrong); R10 trot planted (Codex wrong); ball oversized in R04 crop and R07 strip (real defect, cause unresolved).",
    "effortWeights": "S=1, M=2, L=4"
  }
}
```
