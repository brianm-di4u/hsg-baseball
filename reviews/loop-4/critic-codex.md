Continue. Diamond Springs has recognizable human anatomy, readable baseball staging, and a coherent HUD, but its player characters remain below the absolute 7 anchor. The main losses are garment construction, equipment shape and clipping, facial presentation, and motion that lacks convincing weight transfer. The realistic references expose these weaknesses even where basic body proportions are credible. Painted crowd terraces, primitive trees, and uneven lighting also keep the presentation well below the shipped-game benchmarks. The supplied performance table shows ample hardware headroom, but does not establish a complete performance-gate pass.

Capture paths below are relative to `screenshots/review-loop-4/`; benchmark and reference paths are relative to the repository root.

1. **Characters — 5.5/10.** `crops/high/R02-batter_hands` has separate fingers and an attempted two-handed grip; `crops/high/R09-LF` has modeled facial features and plausible overall human proportions. However, the uniforms largely follow the underlying body surface, with jagged color boundaries, little garment volume, and almost no meaningful folds. `crops/high/R17-pitcher_hands` shows a slab-like glove with a skin-colored protrusion through its surface. The equipment, garment construction, and visible body variety fall substantially short of `benchmarks/smb3-3.png`, `smb4-2.png`, and `smb4-4.png`. The cloth normal detail does not compensate for missing construction.

2. **Fidelity to reference — 5.5/10.** `crops/high/R16-1B` and `crops/high/R14-batter` preserve broadly credible limb lengths, head scale, and human silhouettes compared with `art-src/samples/reference-renders/mpfb2_athlete_front.png`, `mpfb2_athlete_side.png`, and `hbm_male_realistic_front.png`. But shoulders, hands, faces, and clothing remain visibly simplified beyond close-up distances. `crops/high/R09-LF` lacks the eye definition and skin variation of `mpfb2_athlete_face_34.png`; `crops/high/R02-batter_head` hides most facial information beneath an oversized-looking helmet silhouette and deep shadow. The reported front/side IoU of 0.875/0.901 supports reasonable anatomical resemblance, not the same silhouette at every distance required by 7. The reported LOD2 pixel errors are also substantial.

3. **Animation and game feel — 5/10.** `strips/high/R03` communicates a windup and leg lift, but ends before release, so it cannot substantiate a complete delivery. `strips/high/R04` provides a contact flash and torso turn, yet the bat finishes low across the body with limited convincing load, stride, and hip-to-shoulder sequencing. `strips/high/R07` changes abruptly from an upright running pose in panel 4 to a deep fielding crouch in panel 5. `strips/high/R10` reads as a running cycle, but the upper body and hands remain mechanically held. Compare the balanced lift in `benchmarks/smb4-2.png`, the throwing silhouette in `smb3-3.png`, and the rotational finish in `smb4-3.png`. Those benchmarks are stills; temporal conclusions here come from the supplied strips.

4. **Environment — 5/10.** `high/desktop/R07` and `high/desktop/R15` show a coherent diamond, walls, foul poles, mow patterns, and distinct park palettes. However, the trees remain conspicuous cones and faceted blobs. `high/desktop/R05` exposes the crowd as enlarged photographic strips on simple terraces, with little believable seating depth. Several sponsor boards visibly overlap or truncate one another in `crops/high/R02-batter_hands` and `crops/high/R05-catcher`. This is close to the rubric’s painted-crowd/cone-tree 5 anchor, despite useful signage and field texture. `benchmarks/smb3-1.png` and `smb4-3.png` have much stronger built structure, crowd depth, and material integration.

5. **Lighting and atmosphere — 5.5/10.** `high/desktop/R14` establishes warm afternoon color, while `high/desktop/R12` clearly distinguishes night through illuminated towers and a dark sky. Shadows and helmet highlights are present. However, `crops/high/R02-batter_head` loses the face almost entirely in shadow, and `high/desktop/R13` shows conspicuous pools of field illumination surrounded by very dark scenery. Some shoes appear separated from their shadows in `crops/high/R05-batter_feet`. The scene lacks the consistent bounce, face modeling, grounding, and atmospheric integration visible in `benchmarks/smb3-3.png`, `smb3-4.png`, and `smb4-1.png`.

6. **UI and typography — 6.5/10.** `high/desktop/R02` has consistent colors, readable score/count information, and clear primary controls. `high/desktop/R10` gives the result banner strong hierarchy. This approaches 7, but the full-width score bars and bottom control shelf consume considerable space, and the visual language is more functional than broadcast-polished. `high/landscape/R12` omits the pitcher/batter information and pitch-speed row visible in portrait and desktop. Compared with `benchmarks/ootp26-1.png`, information density is low for the area occupied; compared with `smb3-1.png`, the interface feels less integrated with the presentation.

7. **Readability — 6/10.** The strike zone and incoming ball are easy to locate in `high/desktop/R04`, and the runner’s yellow ring separates him from defenders in `high/desktop/R07`. However, distant players become tiny in `high/desktop/R09`; the blue rings identify multiple defenders without making possession immediately obvious. In `high/mobile/R07`, the portrait crop excludes the corner bases and much of the wider play. `high/desktop/R16` places the first-base runner and defender tightly against the right edge. These prevent the “every frame, both viewports” 7 anchor. Compare the stronger foreground/background staging in `benchmarks/smb3-1.png` and the contextual field overview in `ootp26-1.png`.

8. **Mobile — 6/10.** `high/mobile/R02` has readable text, a substantial batter, and large controls. `high/mobile/R05` sensibly places pitch selection above the primary action. However, portrait batting devotes a large area to sky, while `high/mobile/R07` sacrifices lateral field context. `high/landscape/R05` cuts off the pitcher’s lower body at the control shelf, and `high/landscape/R10` gives a large fraction of the remaining play area to the result banner. Neither orientation consistently feels composed around the active play. The desktop benchmarks are presentation references, not evidence of their mobile behavior. The supplied medium phone proxy result of 62 fps supports the CPU-side performance requirement; it does not resolve framing deficiencies.

**Character defects visible in the close-ups**

- Jagged neckline boundaries and angular shoulder peaks: `crops/high/R02-batter_head`, `R17-pitcher_hands`, `R16-1B`.
- Sleeves read as painted body regions, with hard, irregular boundaries and little cuff thickness: `crops/high/R07-SS`, `R14-batter`.
- Placket piping varies in width and bends into angular shapes; it lacks buttons, seam relief, and convincing layered construction: `crops/high/R17-pitcher_hands`, `R10-batter-trot`.
- Team lettering appears to project beyond or detach from the torso silhouette in places: `crops/high/R02-batter_hands`, `R14-batter`.
- Belt reads as a broad, uneven black band without readable buckle or loops: `crops/high/R17-pitcher_hands`, `R16-1B`.
- Pants lack convincing crotch, knee, and ankle folds; broad faceting appears during bends: `crops/high/R07-batter-runner`, `R06-catcher_glove`.
- Sock/shoe and sleeve/wrist boundaries are irregular: `crops/high/R12-pitcher`, `R16-runner1`.
- Cleats retain a smooth shoe-like upper, angular white recoloring, and no readable laces or stud construction: `crops/high/R05-batter_feet`.
- Both shoes appear suspended above the dirt in the feet close-up; the stance is poorly grounded: `crops/high/R05-batter_feet`.
- Helmet ear guards are flat rectangular plates; the dome and brim overwhelm the face: `crops/high/R02-batter_head`, `R10-batter-trot`.
- Skin-colored patches remain visible through cap crowns: `crops/high/R17-pitcher-back`, `R05-batter-front`, `R14-batter`. These also appear in gameplay frames `high/desktop/R17` and `R14`.
- Faces lack readable iris/pupil contrast and expression compared with the textured athlete reference: `crops/high/R09-LF`; deep shadow further suppresses the batter’s features in `R02-batter_head`.
- Fingers are individually modeled but rounded and weakly articulated; the stacked batting grip lacks convincing knuckle and thumb locking: `crops/high/R02-batter_hands`, compared with `mpfb2_athlete_hand.png`.
- Glove is a flattened solid form without a readable web, finger stalls, laces, or stitched leather: `crops/high/R17-pitcher_hands`, `R06-catcher_glove`, `R08-CF`.
- A skin-colored protrusion remains visible through the glove surface: `crops/high/R17-pitcher_hands`, also suggested on the underside in `R09-LF`.
- Catcher chest protection reads as a smooth blue shell without convincing segmented padding or straps: `crops/high/R06-catcher_glove`.
- Catcher leg guards protrude as broad curved plates rather than fitted articulated protection: `crops/high/R05-catcher`, `R06-catcher_glove`.
- Catcher and umpire masks use coarse bars with visible segment joins and little fitted supporting structure: `crops/high/R06-catcher_glove`, `R05-ump_head`.
- The umpire’s bent neck/shoulder region forms an angular exposed wedge: `crops/high/R05-ump_head`.
- Cloth remains largely smooth and rubber-like despite fine surface texture; skin, leather, and cloth lack the benchmark’s material richness: `crops/high/R17-pitcher_hands`, `R14-batter`.
- The close-up lineup does not demonstrate three clearly distinct athletic body types: compare `crops/high/R02-pitcher`, `R16-1B`, and `R10-batter-trot` with `benchmarks/smb4-4.png`.

**Ranked gaps and testable fixes**

Expected gains are estimates within the named category, not additive guarantees.

| Rank | Gap and fix | Workstream | Expected gain | Severity | Effort |
|---|---|---|---:|---:|---|
| 1 | Replace painted garment regions with fitted garment construction: clean neckline, sleeve hems, buttoned placket, belt loops, and pose-dependent folds. Verify front/side close-ups in stance, swing, and crouch against SMB4 kit. | WS1 character models/materials | characters +1.0 | 5 | L |
| 2 | Correct gear fit and geometry. Eliminate cap/glove skin exposure across all supplied poses; build glove web/pocket and fitted catcher protection. Acceptance: no exposed skin through closed gear in close-ups. | WS1 character models/materials | characters +0.5 | 5 | M |
| 3 | Rework swing sequencing and run-to-field transition. Show load, stride, hip lead, contact, balanced finish, deceleration, and glove pickup in a full-cycle strip. Keep planted feet stationary during support. | WS2 animation | animation +1.5 | 5 | L |
| 4 | Restore reference-level facial/hand definition and introduce three visibly different builds. Validate matched-scale face, hand, front, and side comparisons. | WS1 character models/materials | charfit +1.0 | 4 | L |
| 5 | Replace crowd planes nearest cameras with seated figures/impostors with depth; improve tree silhouettes and fix overlapping boards. Verify pitching and replay angles. | WS4 environment/crowd | environment +1.0 | 4 | L |
| 6 | Add controlled sky/ground fill and improve contact shadows; balance night illumination without isolated bright pools. Verify that dark-skinned faces remain legible beneath headgear. | WS3 lighting/post | lighting +1.0 | 4 | M |
| 7 | Compose portrait and landscape around the active play; retain base/runner context and a distinct possession indicator. Reduce landscape HUD/banner occupation. | WS5 cameras/presentation | readability +0.5 | 4 | M |
| 8 | Compact the phone HUD while retaining pitch/player feedback in landscape. Validate all six phone moments at actual CSS size. | WS7 UI/HUD/mobile | mobile +0.5 | 3 | M |
| 9 | Repair low-tier silhouette and stance preservation. Match the high-tier batter’s body shape and pose before accepting the LOD switch. | WS6 performance/LOD | charfit +0.5 | 4 | M |

The inspected `medium/desktop/R02` remains close to high at gameplay scale. `low/desktop/R02` has a conspicuously different batter stance, coarser anatomy, and disrupted waist silhouette. This is a visible tier regression; it does not change the high-tier scores.

Performance is unscored. The brief reports high desktop at 551 minimum fps/2.5 ms worst p95, medium throttled mobile at 62 fps/32.4 ms, and heap usage within the plan’s listed limits. Software GL reports 17 fps/69.3 ms. The final plan requires comparison with the loop-0 software baseline, which is outside the permitted review scope, so that gate remains unverified. The table also does not establish download-budget compliance or the estimated phone GPU requirement.

```json
{
  "loop": 4,
  "role": "critic-codex",
  "tier": "high",
  "scores": {
    "characters": {
      "score": 5.5,
      "confidence": 0.95,
      "evidence": [
        {"shot": "crops/high/R02-batter_hands", "note": "Separate fingers, but rudimentary grip and garment construction."},
        {"shot": "crops/high/R17-pitcher_hands", "note": "Flattened glove with skin-colored protrusion; irregular piping and belt."}
      ]
    },
    "charfit": {
      "score": 5.5,
      "confidence": 0.9,
      "evidence": [
        {"shot": "crops/high/R16-1B", "note": "Broadly human proportions, simplified joints and clothing silhouette."},
        {"shot": "crops/high/R09-LF", "note": "Facial and material definition substantially below athlete references."}
      ]
    },
    "animation": {
      "score": 5,
      "confidence": 0.85,
      "evidence": [
        {"shot": "strips/high/R04", "note": "Contact effect present; limited weight transfer and weak finish."},
        {"shot": "strips/high/R07", "note": "Abrupt upright-run to deep-fielding transition between panels 4 and 5."},
        {"shot": "strips/high/R03", "note": "Readable windup and lift; strip does not cover release."}
      ]
    },
    "environment": {
      "score": 5,
      "confidence": 0.95,
      "evidence": [
        {"shot": "high/desktop/R05", "note": "Enlarged crowd strips on simple terraces."},
        {"shot": "high/desktop/R15", "note": "Recognizable park variation but primitive trees and sparse dressing."}
      ]
    },
    "lighting": {
      "score": 5.5,
      "confidence": 0.9,
      "evidence": [
        {"shot": "high/desktop/R14", "note": "Warm afternoon palette and directional shadows."},
        {"shot": "high/desktop/R13", "note": "Isolated field illumination pools and very dark surroundings."},
        {"shot": "crops/high/R02-batter_head", "note": "Face loses definition beneath helmet shadow."}
      ]
    },
    "ui": {
      "score": 6.5,
      "confidence": 0.9,
      "evidence": [
        {"shot": "high/desktop/R02", "note": "Consistent score bug and controls, with substantial screen occupation."},
        {"shot": "high/desktop/R10", "note": "Clear result hierarchy."},
        {"shot": "high/landscape/R12", "note": "Secondary pitch/player feedback omitted."}
      ]
    },
    "readability": {
      "score": 6,
      "confidence": 0.9,
      "evidence": [
        {"shot": "high/desktop/R04", "note": "Incoming ball and strike zone read clearly."},
        {"shot": "high/mobile/R07", "note": "Corner bases and lateral play context fall outside portrait crop."},
        {"shot": "high/desktop/R09", "note": "Very small fielders; possession not immediately distinguished."}
      ]
    },
    "mobile": {
      "score": 6,
      "confidence": 0.9,
      "evidence": [
        {"shot": "high/mobile/R02", "note": "Readable controls and batter, excessive sky allocation."},
        {"shot": "high/landscape/R05", "note": "Pitcher lower body cut by control shelf."},
        {"shot": "high/landscape/R10", "note": "Result banner occupies substantial play area."}
      ]
    }
  },
  "gaps": [
    {
      "id": "G-garment-construction",
      "category": "characters",
      "expectedGain": 1,
      "severity": 5,
      "effort": "L",
      "workstream": "WS1",
      "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R14-batter"],
      "benchmark": "benchmarks/smb4-2.png",
      "fix": "Build clean garment boundaries, hems, buttoned placket, belt loops and pose-dependent folds; validate stance, swing and crouch close-ups."
    },
    {
      "id": "G-gear-fit",
      "category": "characters",
      "expectedGain": 0.5,
      "severity": 5,
      "effort": "M",
      "workstream": "WS1",
      "evidence": ["crops/high/R17-pitcher-back", "crops/high/R17-pitcher_hands", "crops/high/R06-catcher_glove"],
      "benchmark": "benchmarks/smb3-3.png",
      "fix": "Eliminate skin exposure through cap and glove across poses; add glove pocket/web and fitted articulated catcher protection."
    },
    {
      "id": "G-weight-and-transitions",
      "category": "animation",
      "expectedGain": 1.5,
      "severity": 5,
      "effort": "L",
      "workstream": "WS2",
      "evidence": ["strips/high/R04", "strips/high/R07", "strips/high/R10"],
      "benchmark": "benchmarks/smb4-3.png",
      "fix": "Create full-cycle strips demonstrating load, stride, hip lead, contact, balanced finish and decelerating field pickup; lock support feet during planted phases."
    },
    {
      "id": "G-reference-definition",
      "category": "charfit",
      "expectedGain": 1,
      "severity": 4,
      "effort": "L",
      "workstream": "WS1",
      "evidence": ["crops/high/R09-LF", "crops/high/R02-batter_hands", "crops/high/R16-1B"],
      "benchmark": "art-src/samples/reference-renders/mpfb2_athlete_face_34.png",
      "fix": "Restore eye and skin definition, articulated hand forms and three distinct builds; verify matched-scale face, hand and silhouette comparisons."
    },
    {
      "id": "G-crowd-and-park-depth",
      "category": "environment",
      "expectedGain": 1,
      "severity": 4,
      "effort": "L",
      "workstream": "WS4",
      "evidence": ["high/desktop/R05", "high/desktop/R15", "crops/high/R05-catcher"],
      "benchmark": "benchmarks/smb4-3.png",
      "fix": "Add depth to nearby seated crowds, improve tree silhouettes and remove overlapping sponsor boards; validate pitching and replay cameras."
    },
    {
      "id": "G-lighting-grounding",
      "category": "lighting",
      "expectedGain": 1,
      "severity": 4,
      "effort": "M",
      "workstream": "WS3",
      "evidence": ["high/desktop/R13", "crops/high/R02-batter_head", "crops/high/R05-batter_feet"],
      "benchmark": "benchmarks/smb3-4.png",
      "fix": "Balance sky and ground fill, improve sole contact shadows and smooth night illumination while retaining facial definition beneath headgear."
    },
    {
      "id": "G-play-framing",
      "category": "readability",
      "expectedGain": 0.5,
      "severity": 4,
      "effort": "M",
      "workstream": "WS5",
      "evidence": ["high/mobile/R07", "high/desktop/R16", "high/landscape/R10"],
      "benchmark": "benchmarks/ootp26-1.png",
      "fix": "Frame active play with base and runner context in both orientations; add a unique possession indicator and keep banners clear of the tracked action."
    },
    {
      "id": "G-phone-hud",
      "category": "mobile",
      "expectedGain": 0.5,
      "severity": 3,
      "effort": "M",
      "workstream": "WS7",
      "evidence": ["high/landscape/R05", "high/landscape/R12"],
      "benchmark": "benchmarks/ootp26-1.png",
      "fix": "Compact landscape HUD and controls while preserving pitch/player feedback; verify all six phone moments at actual CSS size."
    },
    {
      "id": "G-low-tier-preservation",
      "category": "charfit",
      "expectedGain": 0.5,
      "severity": 4,
      "effort": "M",
      "workstream": "WS6",
      "evidence": ["high/desktop/R02", "low/desktop/R02"],
      "benchmark": "art-src/samples/reference-renders/mpfb2_athlete_front.png",
      "fix": "Preserve high-tier stance, waist continuity and anatomical silhouette in low-tier assets; compare identical frozen poses before accepting LOD switches."
    }
  ],
  "calibration": {
    "basis": "Absolute rubric anchors; high desktop scored, phone captures used for mobile and readability.",
    "performance": "Hardware figures show headroom. Software baseline comparison, download compliance and estimated phone GPU gate remain unverified.",
    "tierRegression": "Low desktop R02 changes stance and degrades waist silhouette; medium R02 remains close to high.",
    "animationLimit": "Strips establish pose progression but do not establish continuous playback quality; R03 strip ends before release."
  },
  "verdict": "continue"
}
```
