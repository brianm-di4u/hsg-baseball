# Critic B (critic-codex): loop 7

Diamond Springs should **continue**. The high-tier captures establish a functional baseball p...
[codex] Turn completion inferred after the main thread finished and subagent work drained.
Diamond Springs should **continue**. The high-tier captures establish a functional baseball presentation, with clear team colors, usable controls and recognizable action, but the campaign’s character goals remain well below their gates. Players have modeled facial features and separate fingers, yet oversized shoulder forms, rigid garments, poor grips, crude equipment and weak facial shading prevent convincing close-ups. The motion strips show identifiable baseball actions without convincing weight or consistently grounded contact. Parks remain visually fragmented between photographic backgrounds, primitive vegetation and flat crowd textures. Mobile controls are strong; mobile field coverage is weaker. Performance is **not measured**, so I make no performance deduction or pass claim.

Capture paths below are relative to `screenshots/review-loop-7/`; benchmark and reference paths are relative to the repository root.

1. **Characters — 5.0/10.** `crops/high/R02-batter_hands` shows separate fingers, but their curled shapes do not convincingly close around the bat. `crops/high/R17-pitcher_hands` exposes swollen shoulder caps, angular elbows, a featureless glove and flat garment construction. `crops/high/R05-ump_head` shows oversized mask bars and bulky shoulder forms. These are substantially below the integrated uniforms, equipment and body variety in `benchmarks/smb3-3.png`, `benchmarks/smb4-2.png` and `benchmarks/smb4-4.png`. This reaches the rubric’s clean figure territory, with defects preventing a 6–7.

2. **Fidelity to reference — 5.0/10.** Overall human limb lengths and torso proportions are recognizable in `crops/high/R16-1B` and `crops/high/R10-batter-trot`. However, the shoulder-to-neck transition, cylindrical sleeves, simplified pelvis and undifferentiated trousers diverge visibly from `art-src/samples/reference-renders/mpfb2_athlete_three_quarter.png` and `hbm_male_realistic_front.png`. The fingers in `crops/high/R17-pitcher_hands` lack the taper, joints and palm structure of `mpfb2_athlete_hand.png`. The brief’s front/side IoU of 0.878/0.889 supports broadly similar silhouettes, but does not establish garment or facial fidelity. These differences remain visible in ordinary gameplay, particularly `high/desktop/R05`.

3. **Animation and game feel — 5.5/10.** `strips/high/R03` provides a readable gathering motion and leg lift, although its eight panels do not cover the complete delivery. `strips/high/R04` shows torso rotation, a rear-foot pivot and contact feedback, but the body remains stiff and the flash is spatially detached from a convincing bat–ball encounter. `strips/high/R07` changes abruptly from upright running in panel 4 to a deep fielding crouch in panel 5; panels 7–8 do not clearly sell securing the ball. `strips/high/R10` has a recognizable cycle but limited upper-body overlap and weak support-foot weight. The delivery and swing silhouettes lack the convincing balance suggested by `benchmarks/smb4-2.png` and `benchmarks/smb4-3.png`; those benchmarks are stills, so they do not establish temporal smoothness.

4. **Environment — 5.0/10.** `high/desktop/R07` has a coherent diamond, mow patterns, foul lines and built lights. `high/desktop/R14` establishes a different park palette. However, `high/desktop/R05` reveals massively repeated, flattened spectators above a blank wall, while `high/desktop/R15` exposes primitive trees against a photographic treeline and minimally dressed surrounding ground. Compare the coherent seating, railings, crowd depth and structural detail of `benchmarks/smb4-3.png` and `benchmarks/smb3-1.png`. A smaller school park can have modest attendance and construction; it still needs credible materials and people.

5. **Lighting and atmosphere — 5.5/10.** Shadows and distinct day, golden-hour and night treatments are present in `high/desktop/R02`, `high/desktop/R14` and `high/desktop/R12`. But the daylight batter’s face and black jersey collapse into dark masses in `crops/high/R02-batter_head`, and `high/desktop/R13` shows conspicuous bright pools with dark gaps rather than convincing overlapping stadium illumination. Night turf looks pale and washed in `high/desktop/R12`. This falls below the facial modeling and grounded material response in `benchmarks/smb3-3.png`, and the atmospheric integration in `benchmarks/smb3-4.png`.

6. **UI and typography — 6.5/10.** `high/desktop/R02` has consistent colors, clear primary actions and legible score/count information. `high/desktop/R10` gives the home-run result strong hierarchy. However, the desktop score bar spends substantial width on empty team panels, secondary information is small, and the oversized bottom control band competes with presentation. `high/landscape/R05` loses pitcher anatomy behind the controls; landscape also drops the secondary player/pitch information visible on desktop. The package is functional but less efficiently composed than `benchmarks/ootp26-1.png`, and lacks the distinctive visual personality of `benchmarks/backyard97-2.png`.

7. **Readability — 5.5/10.** `high/desktop/R04` makes the approaching ball and zone easy to find, and `high/desktop/R07` uses contrasting runner/fielder rings effectively. But `high/mobile/R07` excludes first and third bases and their corner defenders, removing important context for the play. `high/desktop/R09` leaves the ball and relevant outfielder widely separated and very small; the labeled catch moment is not visually established by this frame or `crops/high/R09-LF`, which shows a running pose with glove down. Compared with the immediate action hierarchy of `benchmarks/smb3-1.png` and the overview context in `benchmarks/ootp26-1.png`, identifying the current event requires too much interpretation.

8. **Mobile — 6.0/10, visual assessment only.** `high/mobile/R02` and `high/mobile/R05` have large touch targets, readable counts and sufficiently large duel figures. `high/landscape/R02` uses the width sensibly for controls, though the batter’s feet meet the bottom crop. `high/mobile/R07` retains excessive vertical scenery while losing the corner infield and bases. `high/landscape/R10` gives a large share of the short play area to the result banner while the runner is outside the view. The benchmarks contain no equivalent phone layouts; `benchmarks/smb3-1.png` and `benchmarks/ootp26-1.png` serve only as action-framing and information-hierarchy comparisons. No frame-rate inference is included.

**Character defects observed**

- **Inflated, raised shoulder caps:** the shoulders form rounded pads rather than a natural neck–clavicle–deltoid transition. Visible in `crops/high/R02-batter_head`, `R02-pitcher`, `R07-SS`, `R10-batter-trot` and `R17-pitcher_hands`.
- **Angular sleeve deformation:** bent arms narrow into hard elbow corners and taper like rigid tubes, especially `crops/high/R02-batter_hands`, `R12-pitcher` and `R17-pitcher_hands`.
- **Irregular neckline:** collar edges remain polygonal and uneven, especially the catcher’s broken-looking neck opening in `crops/high/R06-catcher_glove`, and the pitcher’s broad collar in `R17-pitcher_hands`.
- **Rigid, nearly detail-free cloth:** jerseys and trousers lack convincing seams, closures, compression folds and fabric response. Visible in `crops/high/R02-batter`, `R07-batter-runner`, `R14-batter` and `R17-pitcher-back`.
- **Undifferentiated hip/crotch construction:** trousers form a smooth, tight pelvic bulge with weak garment structure in `crops/high/R02-pitcher` and `R16-1B`.
- **Faceted thigh deformation:** broad triangular shading patches interrupt the running legs in `crops/high/R07-SS`, `R07-batter-runner` and `R09-LF`.
- **Wavy belt/waist boundaries:** belts read as thick irregular bands without convincing loops or fastening in `crops/high/R17-pitcher_hands` and `R17-pitcher-back`.
- **Lettering visibly stands away from cloth:** the left portion of the chest word projects beyond the torso contour in `crops/high/R02-batter_hands`; the effect resembles floating signage.
- **Poor bat grip:** fingers curl beside the handle with visible spaces instead of forming two secure, coordinated grips in `crops/high/R02-batter_hands`. Finger segments look thick and knuckles indistinct.
- **Simplified open hand:** the pitcher’s palm, finger joints and wrist transition look swollen and rubbery in `crops/high/R17-pitcher_hands`.
- **Insufficient facial surface definition:** faces have recognizable noses, lips and ears but weak eye contrast and little skin variation. `crops/high/R09-LF` has a particularly blank eye appearance; `R10-batter-trot` looks expressionless.
- **Facial visibility fails under the brim:** eyes are obscured by brim overlap and deep shadow in `crops/high/R02-batter_head` and `R02-pitcher`.
- **Helmet fit remains unconvincing:** the batter’s shell is oversized and bulbous; narrow side sections still read as hanging strips from the frontal angle in `crops/high/R02-batter_head`. The brim is conspicuously lighter than the shell.
- **Caps resemble smooth domes:** little crown, panel or fitted fabric construction is visible in `crops/high/R02-pitcher` and `R16-1B`.
- **Mask construction is crude:** thick bars have visible segmented joins and exposed ends in `crops/high/R05-ump_head`. The lower assembly crowds the chest protector; cap and mask obscure most of the eyes.
- **Catcher protection lacks construction detail:** chest and shin guards are smooth blue shells with limited segmentation, straps or padding in `crops/high/R05-catcher` and `R06-catcher_glove`.
- **Gloves lack believable pockets and webs:** the catcher’s mitt resembles a rounded fist, and the pitcher/fielder gloves resemble padded fingers without convincing leather construction. Visible in `crops/high/R06-catcher_glove`, `R17-pitcher_hands` and `R16-1B`.
- **Cleats lack credible uppers and soles:** shoes have blocky toes, stark jagged white side patches and little lace or cleat detail in `crops/high/R05-batter_feet`.
- **Feet still appear suspended in the dedicated stance crop:** both soles have visible separation from the dirt in `crops/high/R05-batter_feet`; the same issue appears in `crops/medium/R05-batter_feet`. Whatever the intended planting change, this capture does not demonstrate convincing contact.
- **Limited visible body and face variety:** `crops/high/R07-SS`, `R08-CF`, `R09-LF` and `R16-1B` repeatedly present closely similar builds and facial structure. The captures do not establish three clearly differentiated athletic builds.

**Tier regressions**

Medium retains the high-tier character design and most defects, with coarser shading and visibly poorer shadow definition: compare `crops/medium/R17-pitcher_hands` and `medium/desktop/R14` with their high counterparts.

Low is a substantial visual discontinuity. `crops/low/R02-batter_head` replaces realistic facial structure with protruding cartoon eyes and a spherical head; `crops/low/R02-batter_hands` loses articulated fingers; `crops/low/R05-batter_feet` shows pointed, hovering boot forms. `crops/low/R05-catcher`, `R05-batter-front` and `R17-pitcher_hands` reveal jagged garment boundaries and numbers projecting off the body. `strips/low/R03` and `R04` also show different poses and timing coverage from high/medium. These findings are reported as regressions, not folded into the high-tier character scores.

**Ranked gaps and testable fixes**

Expected gains are estimates within the named category and are not additive guarantees.

| Rank | Gap and workstream | Concrete fix and acceptance check | Expected gain | Severity | Effort |
|---|---|---|---|---|---|
| 1 | Shoulder anatomy and garment construction — **WS1** | Refit shoulders, collar and sleeves to the reference anatomy; add plausible cloth thickness and folds. Re-render R02, R12 and R17 with no padded shoulder silhouette, jagged collar or elbow collapse. | Characters +1.0 | 5 | L |
| 2 | Hands, grips and equipment — **WS1** | Pose both hands around the actual bat handle; build glove pockets/webs, properly fitted helmet shells, thinner mask bars and credible cleat uppers. Verify the dedicated hand/head/glove/feet crops from front and side. | Characters +1.0 | 5 | L |
| 3 | Ground contact and action continuity — **WS2** | Correct stance sole contact and run support phases; add a continuous deceleration into the fielding crouch. Capture a complete pitch through recovery and a complete catch-to-throw sequence. No stance air gap or abrupt run-to-crouch jump. | Animation +1.0 | 5 | L |
| 4 | Facial and body fidelity — **WS1** | Preserve reference eyelids, eye materials, finger taper and natural torso/hip structure; demonstrate three distinct builds in the same lighting and pose. Compare at close-up and actual duel resolution. | Charfit +1.0 | 4 | L |
| 5 | Field framing on phones — **WS5** | Fit the relevant bases, runner and receiving defender during ground-ball plays; reduce unused portrait sky/scenery and keep landscape action above controls. Verify R07 and R10 in both orientations. | Mobile +1.0 | 4 | M |
| 6 | Crowd and park cohesion — **WS4** | Replace repeated crowd sheets with varied people/billboards that have depth; match vegetation and background treatment; dress walls and seating with credible structure. Verify R05, R14 and R15 without obvious repeated spectator blocks or backdrop seams. | Environment +1.0 | 4 | L |
| 7 | Face fill and stadium illumination — **WS3** | Add balanced sky/ground fill, tune dark-uniform response and overlap night light coverage. Preserve visible eyes and jersey form in R02; remove conspicuous isolated pools in R13 without washing out turf. | Lighting +1.0 | 4 | M |
| 8 | Low-tier character continuity — **WS6** | Derive low-detail models from the same proportions, materials and rig; repair garment/number attachment and grounding. Compare identical poses across tiers at 60, 140 and 360 pixels. | Charfit +0.5, contingent on LOD use in high | 4 | L |
| 9 | HUD efficiency and event hierarchy — **WS7** | Compact empty desktop score panels, preserve essential landscape metadata and reduce result-banner intrusion. Recheck R02/R05/R10 at native CSS dimensions with all essential action visible. | UI +0.5 | 3 | M |

```json
{
  "loop": 7,
  "role": "critic-codex",
  "tier": "high",
  "scores": {
    "characters": {
      "score": 5.0,
      "confidence": 0.95,
      "evidence": [
        {"shot": "crops/high/R02-batter_hands", "note": "Unconvincing bat grip, rigid sleeves and floating chest lettering."},
        {"shot": "crops/high/R17-pitcher_hands", "note": "Inflated shoulders, crude glove and weak garment construction."},
        {"shot": "crops/high/R05-ump_head", "note": "Oversized segmented mask bars and bulky shoulders."}
      ]
    },
    "charfit": {
      "score": 5.0,
      "confidence": 0.93,
      "evidence": [
        {"shot": "crops/high/R16-1B", "note": "Broad human proportions survive, but shoulder and garment structure diverge from realistic references."},
        {"shot": "crops/high/R10-batter-trot", "note": "Rigid torso and trousers, simplified face and padded shoulder silhouette."},
        {"shot": "crops/high/R17-pitcher_hands", "note": "Palm and finger structure substantially simpler than the reference hand."}
      ]
    },
    "animation": {
      "score": 5.5,
      "confidence": 0.85,
      "evidence": [
        {"shot": "strips/high/R03", "note": "Readable gathering motion and leg lift; full delivery is not covered."},
        {"shot": "strips/high/R04", "note": "Rotation and pivot present, but contact and body weight are weak."},
        {"shot": "strips/high/R07", "note": "Abrupt upright run to deep fielding crouch between panels 4 and 5."},
        {"shot": "strips/high/R10", "note": "Recognizable run cycle with limited overlap and weak support-foot weight."},
        {"shot": "crops/high/R05-batter_feet", "note": "Visible sole separation undermines stance grounding."}
      ]
    },
    "environment": {
      "score": 5.0,
      "confidence": 0.96,
      "evidence": [
        {"shot": "high/desktop/R05", "note": "Repeated flat spectators and minimally detailed wall dominate the backdrop."},
        {"shot": "high/desktop/R15", "note": "Primitive vegetation clashes with photographic treeline."},
        {"shot": "high/desktop/R07", "note": "Coherent diamond, mow pattern and foul lines."}
      ]
    },
    "lighting": {
      "score": 5.5,
      "confidence": 0.94,
      "evidence": [
        {"shot": "crops/high/R02-batter_head", "note": "Face and eyes collapse under the helmet brim."},
        {"shot": "high/desktop/R12", "note": "Night identity is clear but turf looks washed."},
        {"shot": "high/desktop/R13", "note": "Distinct isolated light pools and dark gaps weaken stadium illumination."}
      ]
    },
    "ui": {
      "score": 6.5,
      "confidence": 0.94,
      "evidence": [
        {"shot": "high/desktop/R02", "note": "Clear primary actions and consistent colors; inefficient empty score panels."},
        {"shot": "high/desktop/R10", "note": "Strong result hierarchy."},
        {"shot": "high/landscape/R05", "note": "Controls obscure pitcher anatomy and secondary metadata is omitted."}
      ]
    },
    "readability": {
      "score": 5.5,
      "confidence": 0.92,
      "evidence": [
        {"shot": "high/desktop/R04", "note": "Ball trail and strike zone read clearly."},
        {"shot": "high/mobile/R07", "note": "Corner bases and defenders are outside portrait framing."},
        {"shot": "high/desktop/R09", "note": "Tiny outfielder and distant ball do not establish the labeled catch event."}
      ]
    },
    "mobile": {
      "score": 6.0,
      "confidence": 0.94,
      "evidence": [
        {"shot": "high/mobile/R02", "note": "Large controls and legible score/count; excessive sky."},
        {"shot": "high/mobile/R05", "note": "Readable duel figures and generously sized pitch controls."},
        {"shot": "high/mobile/R07", "note": "Field framing omits corner bases and defenders."},
        {"shot": "high/landscape/R10", "note": "Large banner consumes short play area while runner is outside view."}
      ]
    }
  },
  "gaps": [
    {
      "id": "G-shoulders-cloth",
      "category": "characters",
      "expectedGain": 1.0,
      "severity": 5,
      "effort": "L",
      "workstream": "WS1",
      "evidence": ["crops/high/R02-batter_head", "crops/high/R12-pitcher", "crops/high/R17-pitcher_hands"],
      "benchmark": "art-src/samples/reference-renders/mpfb2_athlete_three_quarter.png; art-src/samples/reference-renders/si_jersey_three_quarter.png",
      "fix": "Refit shoulders, collar and sleeves to natural anatomy and credible cloth construction. R02, R12 and R17 must show no padded shoulder silhouette, jagged collar or elbow collapse."
    },
    {
      "id": "G-hands-equipment",
      "category": "characters",
      "expectedGain": 1.0,
      "severity": 5,
      "effort": "L",
      "workstream": "WS1",
      "evidence": ["crops/high/R02-batter_hands", "crops/high/R06-catcher_glove", "crops/high/R05-ump_head", "crops/high/R05-batter_feet"],
      "benchmark": "benchmarks/smb3-3.png; benchmarks/smb4-2.png",
      "fix": "Fit both hand grips to the bat; build glove pockets and webs, fitted helmet shells, thinner continuous mask bars and credible cleat uppers. Validate front and side detail captures."
    },
    {
      "id": "G-contact-continuity",
      "category": "animation",
      "expectedGain": 1.0,
      "severity": 5,
      "effort": "L",
      "workstream": "WS2",
      "evidence": ["crops/high/R05-batter_feet", "strips/high/R07", "strips/high/R10"],
      "benchmark": "benchmarks/smb4-2.png; benchmarks/smb4-3.png",
      "fix": "Ground stance soles, establish run support phases and blend deceleration into fielding. Show complete pitch recovery and catch-to-throw sequences without air gaps or abrupt pose changes."
    },
    {
      "id": "G-reference-anatomy",
      "category": "charfit",
      "expectedGain": 1.0,
      "severity": 4,
      "effort": "L",
      "workstream": "WS1",
      "evidence": ["crops/high/R09-LF", "crops/high/R16-1B", "crops/high/R17-pitcher_hands"],
      "benchmark": "art-src/samples/reference-renders/hbm_male_realistic_face_34.png; art-src/samples/reference-renders/mpfb2_athlete_hand.png",
      "fix": "Preserve reference eyelids, eye contrast, finger taper and natural torso/hip structure. Demonstrate three distinct athletic builds in identical poses and lighting at close-up and duel resolutions."
    },
    {
      "id": "G-phone-framing",
      "category": "mobile",
      "expectedGain": 1.0,
      "severity": 4,
      "effort": "M",
      "workstream": "WS5",
      "evidence": ["high/mobile/R07", "high/landscape/R05", "high/landscape/R10"],
      "benchmark": "benchmarks/ootp26-1.png",
      "fix": "Fit relevant bases, runner and receiving defender during field plays. Reduce unused portrait scenery and keep landscape action above controls. Validate R07 and R10 in both orientations."
    },
    {
      "id": "G-park-cohesion",
      "category": "environment",
      "expectedGain": 1.0,
      "severity": 4,
      "effort": "L",
      "workstream": "WS4",
      "evidence": ["high/desktop/R05", "high/desktop/R14", "high/desktop/R15"],
      "benchmark": "benchmarks/smb4-3.png; benchmarks/smb3-1.png",
      "fix": "Replace repeated crowd sheets with varied people or depth-aware billboards, unify vegetation/background treatment and add credible seating and wall structure. Remove obvious spectator blocks and backdrop seams."
    },
    {
      "id": "G-fill-night-coverage",
      "category": "lighting",
      "expectedGain": 1.0,
      "severity": 4,
      "effort": "M",
      "workstream": "WS3",
      "evidence": ["crops/high/R02-batter_head", "high/desktop/R12", "high/desktop/R13"],
      "benchmark": "benchmarks/smb3-3.png; benchmarks/smb3-4.png",
      "fix": "Balance sky and ground fill, dark-uniform response and overlapping night illumination. Keep eyes and jersey forms visible while eliminating isolated light pools without washing out turf."
    },
    {
      "id": "G-low-tier-continuity",
      "category": "charfit",
      "expectedGain": 0.5,
      "severity": 4,
      "effort": "L",
      "workstream": "WS6",
      "evidence": ["crops/low/R02-batter_head", "crops/low/R05-batter_feet", "crops/low/R05-batter-front", "crops/low/R17-pitcher_hands"],
      "benchmark": "art-src/samples/reference-renders/mpfb2_game27k_glb_three_quarter.png",
      "fix": "Derive low-detail characters from the same proportions, materials and rig; repair garment and number attachment and grounding. Compare identical poses at 60, 140 and 360 pixels. High-tier gain depends on actual LOD use."
    },
    {
      "id": "G-hud-efficiency",
      "category": "ui",
      "expectedGain": 0.5,
      "severity": 3,
      "effort": "M",
      "workstream": "WS7",
      "evidence": ["high/desktop/R02", "high/landscape/R05", "high/landscape/R10"],
      "benchmark": "benchmarks/ootp26-1.png",
      "fix": "Compact empty score panels, preserve essential landscape metadata and reduce result-banner intrusion. Verify native CSS dimensions with essential action unobscured."
    }
  ],
  "calibration": {
    "performance": "Not measured; no performance deduction or pass claim.",
    "mobileBasis": "Visible portrait and landscape presentation only.",
    "animationLimit": "Motion strips establish sampled pose progression, not continuous playback timing.",
    "referenceMetrics": "Reported silhouette IoU supports broad proportions but does not establish face, hand, garment or posed fidelity.",
    "tierPolicy": "High desktop scored; medium and low regressions reported separately."
  },
  "verdict": "continue"
}
```
