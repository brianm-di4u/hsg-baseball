# Critic B (critic-codex): loop 9

Diamond Springs should **continue**. The players have plausible human proportions and identifiable baseball poses, but their clothing, equipment, faces and grounding remain substantially below the supplied realistic references and SMB's stylised production quality. The strongest elements are clear controls, a consistent score display and an immediately understandable diamond. The largest failures are smooth, nearly featureless uniforms; primitive gloves and protective gear; obscured facial features; visibly floating stance feet; and incomplete weight transfer around contact. Portrait fielding also loses essential field coverage. These scores concern the images inspected, including every high-tier player close-up and all six high-tier motion strips; medium and low checks were sampled, not exhaustive. No files were modified.

1. **Characters — 5/10.** `crops/high/R02-batter` has recognisable athletic proportions, separate fingers and a helmet, but the clothing reads as a coloured body shell. `crops/high/R06-catcher_glove` exposes a glove without convincing pocket, webbing or lacing, alongside crude protective equipment. Compared with `benchmarks/smb3-3.png` and `benchmarks/smb4-4.png`, garment construction, equipment detail and visible body variety fall well short of the 7 anchor.

2. **Fidelity to reference — 5/10.** The broad human silhouette in `crops/high/R16-1B` is compatible with `art-src/samples/reference-renders/mpfb2_game27k_glb_three_quarter.png`. However, `crops/high/R02-batter_head` loses the eye, lip and skin definition evident in `mpfb2_athlete_face_34.png`; `crops/high/R17-pitcher_hands` lacks the knuckle, nail and surface definition of `mpfb2_athlete_hand.png`. These simplifications also affect the normal gameplay figures in `high/desktop/R05`. The reported reference IoUs of 0.878/0.895 support approximate resemblance, not equivalence. Good LOD0-to-LOD1 similarity does not establish reference fidelity.

3. **Animation — 5/10.** `strips/high/R03` shows a progressive gathering motion and leg lift, although its eight panels do not establish release or follow-through quality. `strips/high/R04` shows torso rotation and a progressing finish, but the ball reaches the contact flash while the bat remains visibly steep rather than presenting a convincing barrel through the contact point. The planted-foot relationship is also weak. `strips/high/R07` changes from upright running in panel 4 to a deep fielding crouch in panel 5 with little visible braking preparation. `strips/high/R10` has a readable alternating jog, but limited torso and shoulder variation. Compared with the strong weight-bearing poses in `benchmarks/smb3-3.png` and `benchmarks/smb4-3.png`, the action remains mechanically keyed. Those benchmarks are stills; they cannot establish comparative motion smoothness.

4. **Environment — 5/10.** `high/desktop/R01` provides a coherent diamond, towers, foul poles and wooded surroundings. `high/desktop/R05` exposes the crowd as repeated photographs laid across stand surfaces, above a large bare wall. `high/desktop/R14` has a different palette, but similarly sparse construction. Against `benchmarks/smb3-1.png` and `benchmarks/smb4-3.png`, the deficits are depth, believable seating, architectural detail and material variety. A smaller school park need not match professional stadium scale, but its visible structures still need construction detail.

5. **Lighting — 5.5/10.** `high/desktop/R12` communicates night through bright towers, a dark sky and illuminated turf; `high/desktop/R14` communicates a warmer afternoon. Nevertheless, `crops/high/R02-batter_head` remains difficult to read beneath the brim, and `crops/high/R05-batter_feet` shows detached shadows beneath visibly elevated shoes. Night turf is broadly pale rather than convincingly shaped by individual lights. Compared with `benchmarks/smb3-3.png` and `benchmarks/smb3-1.png`, face modelling, local grounding and atmospheric depth remain weak.

6. **UI — 6.5/10.** `high/desktop/R02` and `high/desktop/R05` have consistent colours, readable primary actions and a useful score/count hierarchy. However, the score display stretches across almost the entire screen, while the lower control band and duplicated keyboard instructions consume additional space. `high/landscape/R05` prioritises large controls at the expense of the pitcher's lower body. Against `benchmarks/ootp26-1.png`, the presentation is considerably simpler and readable, but lacks the compact grouping and information density of a finished broadcast interface. The supplied `smb3-1` image contains no comparable HUD, so it does not substantiate typography quality.

7. **Readability — 5.5/10.** The zone and batting target are clear in `high/desktop/R02`; selection rings distinguish players in `high/desktop/R07`. However, identical blue rings do little to identify the player responsible for the ball. In `high/mobile/R07`, first and third base and the corner defenders are outside the frame, preventing an at-a-glance understanding of the play. `high/landscape/R07` restores field coverage but leaves fielders very small. Compared with `benchmarks/smb3-1.png`, immediate action silhouettes are weaker; the wide-field problem is established by the game's own captures rather than a matching benchmark.

8. **Mobile — 5.5/10.** `high/mobile/R02` has large, legible controls and a usable batting figure. `high/mobile/R05` preserves a clear pitching target but crops the pitcher heavily and devotes substantial height to controls. `high/mobile/R07` loses crucial lateral field coverage; `high/landscape/R05` and `high/landscape/R07` have large controls competing with limited vertical space. The supplied benchmarks are desktop images, so they establish presentation standards rather than phone ergonomics. The reported throttled medium and low performance exceeds 30 fps, but performance does not resolve these framing defects.

The specific character defects visible in the close-ups are:

- **Faces lack surface definition and expression:** skin is largely uniform, with weak eye and lip separation. Darker faces become particularly hard to read beneath headgear (`crops/high/R02-batter_head`, `R02-pitcher`, `R10-batter-trot`). The lighter face in `R09-LF` also has poorly differentiated eyes.
- **Helmet construction is crude:** a smooth dome, broad slab-like brim and long flat ear flaps lack convincing shell thickness, padding and fittings (`crops/high/R02-batter_head`, `R05-batter-front`).
- **Caps have an inflated dome silhouette and little fabric construction:** no convincing panel seams or fitted crown detail (`crops/high/R02-pitcher`, `R09-LF`, `R17-pitcher-back`).
- **Hands remain rounded and simplified:** fingers exist, but knuckles, nails and thumb-pad structure are weak (`crops/high/R02-batter_hands`, `R17-pitcher_hands`).
- **Bat grip is unconvincing:** the visible fingers do not form two clean, closed grips around the handle; the lower hand appears partly open (`crops/high/R02-batter_hands`, `R05-batter-front`, `R14-batter`).
- **Uniforms lack cloth volume:** shoulders, chest, hips and knees are smooth, with almost no tension folds, seams or cuff thickness (`crops/high/R02-batter`, `R07-SS`, `R16-1B`).
- **Collar, sleeve and sock boundaries are jagged:** colour edges visibly follow coarse polygon boundaries (`crops/high/R02-batter_head`, `R03-pitcher`, `R16-1B`).
- **Belts read as irregular painted bands:** buckle, belt loops and convincing thickness are absent (`crops/high/R02-pitcher`, `R17-pitcher-back`).
- **Chest lettering is disproportionately small and rigid:** it reads as a straight printed label rather than integrated uniform lettering (`crops/high/R17-pitcher_hands`, `R14-batter`).
- **Joint shading breaks into facets:** knees and thighs reveal angular bands during bent poses (`crops/high/R07-batter-runner`, `R09-LF`, `R16-runner1`).
- **Cleats resemble glossy plain shoes:** laces, upper panels, tread and convincing baseball studs are missing (`crops/high/R05-batter_feet`).
- **Both stance shoes visibly float:** there is an air gap between soles and dirt despite shadows beneath them (`crops/high/R05-batter_feet`). This is stronger evidence than the brief's claimed heel correction.
- **Gloves resemble padded finger clusters:** pocket depth, webbing, seams and laces are missing (`crops/high/R06-catcher_glove`, `R17-pitcher_hands`, `R16-1B`).
- **Catcher protection lacks construction:** the chest protector is an unsegmented shell; shin guards have broad projecting shapes without convincing straps or articulated padding (`crops/high/R05-catcher`, `R06-catcher_glove`).
- **Catcher neckline contains jagged blue/white geometry:** the collar/protector junction looks torn or intersecting (`crops/high/R06-catcher_glove`).
- **Masks look assembled from exposed bars:** the umpire mask has visibly open-ended horizontal bars at the sides, with little framing or padding (`crops/high/R05-ump_head`).
- **Body variety is insufficiently visible:** the batter, pitcher, runners and fielders share very similar slim builds; differences do not approach the distinct silhouettes in `benchmarks/smb4-4.png` (`crops/high/R02-batter`, `R07-SS`, `R16-runner1`).

The sampled tier checks show near-equivalent framing and HUD in `medium/desktop/R02`. `low/desktop/R02` has a substantially different, more rigid batter pose and a conspicuously broken-looking waist edge; this is a tier discrepancy, not proof of a temporal regression. `low/mobile/R07` is visibly softer than high and retains the same missing corner-field coverage.

The performance table reports ample GPU headroom, 63 fps minimum with 33.5 ms worst p95 for throttled medium mobile, and 151 fps with 8.5 ms for throttled low mobile. Software GL is much weaker at 17 fps and 70.1 ms. These are reported measurements, not independently verified gate results.

Ranked gaps follow. Expected gains are estimates within the named category and are not additive guarantees.

| Rank | Gap and concrete acceptance test | Workstream | Expected gain | Severity | Effort |
|---|---|---|---:|---:|---|
| 1 | Rebuild uniform construction and equipment: visible collar/cuffs, placket, belt fittings, pose-dependent folds, glove pocket/webbing and segmented catcher pads. Re-render R02, R06 and R17 close-ups; each feature must remain identifiable at normal duel size. | WS1 character models/materials | characters +1.5 | 5 | L |
| 2 | Fix stance grounding and bat contact. Keep stance soles on the dirt; align both grips to the handle and the barrel to the ball at the contact tick. Capture side/front strips spanning load through finish and run-to-field braking. | WS2 animation | animation +1.5 | 5 | L |
| 3 | Restore reference face/hand structure and material definition. Compare matched-size face and hand renders against the supplied athlete references; eyes, lips, knuckles and thumbs must remain legible under both daylight and night headgear. | WS1 character models/materials | charfit +1.5 | 5 | L |
| 4 | Make phone fielding framing preserve relevant bases, runner and receiving fielder. Verify R07 in both orientations at actual CSS size; keep controls clear of essential action. | WS5 cameras/presentation | mobile +1.0 | 5 | M |
| 5 | Replace repeated crowd sheets near the camera with varied seated silhouettes and visible seating structure; add stand railings and wall material detail. Verify R05 from gameplay and close cameras. | WS4 environment/crowd | environment +1.5 | 4 | L |
| 6 | Improve face fill, sole contact shadows and night light falloff. Verify visible facial planes beneath brims without flattening skin, and shadows that touch genuinely planted soles. | WS3 lighting/post | lighting +1.0 | 4 | M |
| 7 | Add a distinct active-fielder/possession cue and reduce HUD footprint in landscape. Verify that a viewer can identify the responsible defender and see the pitcher's action without searching. | WS7 UI/HUD/mobile | readability +1.0 | 4 | M |
| 8 | Preserve stance and garment boundaries across tiers. Compare R02 silhouettes at matched moments; low must retain the high-tier action and a continuous waist silhouette. | WS6 performance/LOD | characters +0.5 on low; no direct high gain | 3 | M |

```json
{
  "loop": 9,
  "role": "critic-codex",
  "tier": "high",
  "scores": {
    "characters": {"score": 5, "confidence": 0.95, "evidence": [
      {"shot": "crops/high/R02-batter", "note": "Plausible proportions; smooth uniform with little garment construction."},
      {"shot": "crops/high/R06-catcher_glove", "note": "Primitive glove and protective gear compared with smb3-3 and smb4-4."}]},
    "charfit": {"score": 5, "confidence": 0.9, "evidence": [
      {"shot": "crops/high/R02-batter_head", "note": "Face definition substantially below mpfb2_athlete_face_34."},
      {"shot": "crops/high/R17-pitcher_hands", "note": "Hands lack reference knuckle, nail and surface definition."}]},
    "animation": {"score": 5, "confidence": 0.85, "evidence": [
      {"shot": "strips/high/R04", "note": "Rotation progresses, but barrel/contact alignment and grounding are unconvincing."},
      {"shot": "strips/high/R07", "note": "Abrupt transition from running to deep fielding crouch."},
      {"shot": "strips/high/R03", "note": "Leg lift develops; strip does not establish complete delivery quality."},
      {"shot": "strips/high/R10", "note": "Readable jog with limited upper-body variation."}]},
    "environment": {"score": 5, "confidence": 0.95, "evidence": [
      {"shot": "high/desktop/R01", "note": "Coherent park layout but sparse construction."},
      {"shot": "high/desktop/R05", "note": "Repeated photographic crowd sheets and bare wall below SMB environment anchors."}]},
    "lighting": {"score": 5.5, "confidence": 0.9, "evidence": [
      {"shot": "high/desktop/R12", "note": "Clear night treatment but broad pale turf lighting."},
      {"shot": "high/desktop/R14", "note": "Warm afternoon palette."},
      {"shot": "crops/high/R05-batter_feet", "note": "Detached shadows and elevated stance soles undermine grounding."},
      {"shot": "crops/high/R02-batter_head", "note": "Facial features remain obscured under brim."}]},
    "ui": {"score": 6.5, "confidence": 0.9, "evidence": [
      {"shot": "high/desktop/R02", "note": "Consistent hierarchy and clear actions; oversized screen-wide bands."},
      {"shot": "high/desktop/R05", "note": "Readable pitching controls with redundant instruction space."}]},
    "readability": {"score": 5.5, "confidence": 0.95, "evidence": [
      {"shot": "high/desktop/R02", "note": "Zone and primary action read clearly."},
      {"shot": "high/mobile/R07", "note": "Corner bases and defenders lie outside portrait frame."},
      {"shot": "high/landscape/R07", "note": "Field coverage restored but fielders are very small."}]},
    "mobile": {"score": 5.5, "confidence": 0.95, "evidence": [
      {"shot": "high/mobile/R02", "note": "Legible controls and usable batting figure."},
      {"shot": "high/mobile/R05", "note": "Heavily cropped pitcher and tall control area."},
      {"shot": "high/mobile/R07", "note": "Essential lateral field coverage missing."},
      {"shot": "high/landscape/R05", "note": "Controls compete with pitcher framing."}]}
  },
  "gaps": [
    {"id": "G-uniform-gear", "category": "characters", "expectedGain": 1.5, "severity": 5, "effort": "L", "workstream": "WS1",
      "evidence": ["crops/high/R02-batter", "crops/high/R06-catcher_glove", "crops/high/R17-pitcher_hands"],
      "benchmark": "benchmarks/smb3-3.png; benchmarks/smb4-4.png; reference-renders/si_jersey_front.png",
      "fix": "Add constructed uniforms, folds, belt fittings, glove pocket/webbing and segmented catcher protection; verify details remain identifiable at duel size."},
    {"id": "G-grounding-contact", "category": "animation", "expectedGain": 1.5, "severity": 5, "effort": "L", "workstream": "WS2",
      "evidence": ["crops/high/R05-batter_feet", "strips/high/R04", "strips/high/R07"], "benchmark": "benchmarks/smb4-3.png",
      "fix": "Plant stance soles, close both hands around the handle, align barrel and ball at contact, and add visible braking before fielding; verify front and side motion strips."},
    {"id": "G-reference-detail", "category": "charfit", "expectedGain": 1.5, "severity": 5, "effort": "L", "workstream": "WS1",
      "evidence": ["crops/high/R02-batter_head", "crops/high/R17-pitcher_hands"],
      "benchmark": "art-src/samples/reference-renders/mpfb2_athlete_face_34.png; art-src/samples/reference-renders/mpfb2_athlete_hand.png",
      "fix": "Restore eye, lip, hand and skin definition; compare matched-size reference renders under daylight and night headgear."},
    {"id": "G-phone-field-coverage", "category": "mobile", "expectedGain": 1, "severity": 5, "effort": "M", "workstream": "WS5",
      "evidence": ["high/mobile/R07", "high/landscape/R05"],
      "fix": "Frame relevant bases, runner and receiving defender in portrait and landscape while keeping controls clear of essential action."},
    {"id": "G-crowd-construction", "category": "environment", "expectedGain": 1.5, "severity": 4, "effort": "L", "workstream": "WS4",
      "evidence": ["high/desktop/R05", "high/desktop/R14"], "benchmark": "benchmarks/smb3-1.png; benchmarks/smb4-3.png",
      "fix": "Replace near-camera crowd sheets with varied seated silhouettes and visible seats; add railings and wall material detail."},
    {"id": "G-face-light-ground", "category": "lighting", "expectedGain": 1, "severity": 4, "effort": "M", "workstream": "WS3",
      "evidence": ["crops/high/R02-batter_head", "crops/high/R05-batter_feet", "high/desktop/R12"], "benchmark": "benchmarks/smb3-3.png",
      "fix": "Improve brim fill and night falloff; verify facial planes remain readable and contact shadows meet planted soles."},
    {"id": "G-action-cues", "category": "readability", "expectedGain": 1, "severity": 4, "effort": "M", "workstream": "WS7",
      "evidence": ["high/desktop/R07", "high/landscape/R05"],
      "fix": "Distinguish active defender and possession, reduce landscape HUD footprint, and verify action remains visible at actual CSS size."},
    {"id": "G-low-tier-pose", "category": "characters", "expectedGain": 0, "severity": 3, "effort": "M", "workstream": "WS6",
      "evidence": ["high/desktop/R02", "medium/desktop/R02", "low/desktop/R02"],
      "fix": "Preserve stance and continuous waist silhouette across tiers at matched moments; expected low-tier character gain is 0.5, with no direct high-tier gain."}
  ],
  "calibration": {
    "scope": "Every high-tier player close-up and all six high-tier strips inspected; selected desktop/mobile/landscape frames and sampled medium/low checks.",
    "benchmarkLimits": "Benchmarks are stills and contain no phone captures; comparative temporal smoothness and phone ergonomics cannot be established from them.",
    "performance": "Brief reports strong GPU headroom and throttled medium/low mobile above 30 fps; software GL is 17 fps. Performance gate not independently verified.",
    "expectedGains": "Category estimates, not additive guarantees."
  },
  "verdict": "continue"
}
```
