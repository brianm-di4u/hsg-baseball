# Critic B (critic-codex): loop 6

Diamond Springs presents a functional baseball game with clear team colors, readable controls, and distinct day, night, and afternoon settings, but its priority—convincing player characters—remains substantially below the gates. The high-tier players have human facial geometry and articulated fingers, yet oversized headwear, obscured eyes, smooth tube-like garments, crude gloves, and visible grounding problems undermine close-ups. The motion strips establish recognizable actions without demonstrating convincing weight and contact throughout. The shipped benchmarks remain markedly stronger in cloth construction, equipment, pose appeal, lighting integration, and environmental depth. These scores apply to the captured build; the post-capture compression changes receive no visual credit.

All capture citations below are relative to `screenshots/review-loop-6/`. Benchmark and reference paths are relative to the repository root. I viewed every high-tier frame, close-up, and strip; medium and low were spot-checked rather than exhaustively inspected.

1. **Characters — 5.0/10.** `crops/high/R02-batter_hands` shows separate fingers, but the grip is bulky and lacks convincing thumb opposition and knuckle structure. `crops/high/R17-pitcher_hands` exposes a glove assembled from smooth brown lobes, with no readable webbing or leather construction. `crops/high/R05-batter-front` shows recognizable equipment and numbers, but garments resemble colored body surfaces. Against `benchmarks/smb3-3.png`, `smb4-3.png`, and `smb4-4.png`, the missing folds, tailored seams, equipment detail, and clearly differentiated builds prevent a 7.

2. **Fidelity to reference — 5.0/10.** Broad human proportions are recognizable in `crops/high/R16-1B` and `crops/high/R09-LF`, but shoulder-to-neck transitions, narrow tubular limbs, and simplified hands depart visibly from `art-src/samples/reference-renders/mpfb2_athlete_three_quarter.png` and `mpfb2_game27k_glb_three_quarter.png`. `crops/high/R02-batter_head` cannot approach `hbm_male_realistic_face_34.png` because the headwear conceals most facial landmarks. The reported front/side IoU of 0.875/0.895 supports approximate silhouette fidelity, not the same proportions at every distance. LOD1's reported errors are relatively close to LOD0; LOD2's roughly 46–52% pixel error is a substantial warning.

3. **Animation and game feel — 5.0/10.** `strips/high/R04` shows torso rotation, a rear-foot pivot, and a contact effect, but the ball reaches/passes the body region before the conspicuous swing and flash; bat-ball contact is not convincingly established by the sampled sequence. `strips/high/R07` changes from running to a deep fielding crouch with little visible braking preparation. `strips/high/R10` reads as jogging but has limited pelvis and torso weight response. `strips/high/R03` establishes gathering and leg lift only; it ends before stride, release, and follow-through, so it cannot prove those beats. The planted, balanced poses in `benchmarks/smb4-2.png` and rotational finish in `smb4-3.png` are stronger pose references; those benchmark stills cannot establish temporal quality.

4. **Environment — 5.0/10.** `high/desktop/R07` has a coherent diamond, turf variation, fencing, and field markings. `high/desktop/R15` adds recognizable park-specific walls and distant structures. However, `high/desktop/R05` exposes conspicuously repeated photographic crowd tiles above blank walls; `high/desktop/R01` exposes bare stepped stand structures. Faceted trees conflict with the photographic mountain backdrop. Compared with `benchmarks/smb3-1.png` and `smb4-3.png`, the park lacks convincing spectator volume, structural detail, and consistent material scale.

5. **Lighting and atmosphere — 5.5/10.** `high/desktop/R12` establishes night through tower glow and field illumination, but the pale foreground and abrupt dark perimeter feel disconnected. `high/desktop/R13` shows obvious overlapping pools of light and very dark surrounding vegetation. `crops/high/R02-batter_head` remains difficult to read despite the stated face-lighting changes. The warm palette in `high/desktop/R14` is useful, but lacks the depth and integrated bounce of `benchmarks/smb3-4.png`; `smb3-3.png` also models faces, cloth, and equipment more convincingly at night.

6. **UI and typography — 6.5/10.** `high/desktop/R02` presents score, inning, count, and actions with consistent colors and legible labels. `high/desktop/R10` has a clear result hierarchy. Nevertheless, the nearly full-width score bars consume substantial space for little information, the bottom control band feels separate from the broadcast styling, and `high/desktop/R01` lets busy scenery bleed through the menu and weaken contrast. Compared with `benchmarks/ootp26-1.png` and the compact status grouping in `backyard97-1.png`, information density and visual integration need refinement.

7. **Readability — 5.5/10.** `high/desktop/R06` clearly exposes the ball and strike zone; `high/desktop/R08` uses a useful trajectory trail. Conversely, `high/desktop/R16` puts the first-base runner at the extreme right edge, and `high/mobile/R07` excludes both corner bases from the field view. Blue rings mark many defenders without clearly prioritizing the relevant one in that frame. `high/desktop/R09` places the ball against a busy scoreboard/background area. Compared with `benchmarks/smb3-1.png` and the explicit diamond overview in `backyard97-1.png`, spatial awareness is less dependable.

8. **Mobile — 6.0/10.** `high/mobile/R02` and `high/mobile/R05` have readable text, large controls, and useful duel-scale figures. `high/landscape/R05`, however, lets controls obscure the pitcher's lower body, while `high/landscape/R02` cuts off the batter's feet at the lower edge. `high/mobile/R07` sacrifices corner-base coverage and makes distant defenders tiny. The supplied medium phone proxy reports 48 minimum fps, clearing the rubric's stated 30-fps condition, though its 47-ms p95 indicates uneven pacing. The comparison to `benchmarks/ootp26-1.png` and `backyard97-1.png` concerns hierarchy and spatial information only; neither is evidence of mobile usability.

**Character defects visible in the close-ups**

- `crops/high/R02-batter_head`: helmet shell dominates the head; its broad, pale underside crosses the eye region. Eyes and much of the nose are hidden.
- `crops/high/R02-batter_head`, `R10-batter-trot`: helmet flaps read as thick hanging panels with abrupt edges rather than a fitted protective shell.
- `crops/high/R02-batter_head`, `R05-ump_head`: neck/collar boundaries have conspicuous angular, irregular contours.
- `crops/high/R09-LF`: eyes appear pale and weakly defined; facial expression and surface variation are minimal.
- `crops/high/R02-batter_hands`: fingers are thick and rounded; the stacked hands do not clearly communicate a firm, anatomically convincing grip.
- `crops/high/R17-pitcher_hands`: splayed bare hand lacks readable nails, creases, and joint definition compared with `mpfb2_athlete_hand.png`.
- `crops/high/R02-batter_hands`, `R16-1B`: jagged cuff-to-wrist transitions expose abrupt material/geometry boundaries.
- `crops/high/R17-pitcher_hands`, `R06-catcher_glove`: gloves lack a convincing pocket, web, finger stalls, lacing, stitching, and leather variation.
- `crops/high/R02-pitcher`, `R17-pitcher_hands`: shoulders appear inflated around the sleeve caps; arms and elbows have limited anatomical definition.
- `crops/high/R02-batter`, `R16-runner1`: trousers have smooth thigh and crotch surfaces, broad angular knee bends, and little cloth compression.
- `crops/high/R02-batter_hands`, `R17-pitcher_hands`: jersey fronts lack buttons, seam thickness, and fabric structure; placket stripes have irregular widths.
- `crops/high/R02-batter_hands`, `R14-batter`: lettering sits low across the chest/upper abdomen and bends unevenly. It is readable, but does not convincingly resemble sewn lettering.
- `crops/high/R17-pitcher-back`, `R05-batter-front`: belt regions are broad black bands with irregular edges and no clear buckle or loops.
- `crops/high/R05-batter_feet`: both soles are visibly separated from the dirt, with detached shadows beneath them.
- `crops/high/R05-batter_feet`: cleats have blocky toe/sole silhouettes, jagged white color boundaries, and no readable laces or studs.
- `crops/high/R05-catcher`, `R06-catcher_glove`: chest and shin protection have smooth, swollen forms without convincing segmented padding, straps, or fasteners.
- `crops/high/R05-ump_head`: cage bars extend well below the chin into the chest-protector region; several bar joins appear discontinuous.
- `crops/high/R05-ump`: the batter substantially occludes the designated umpire close-up, limiting inspection of the full umpire model.
- `crops/high/R02-batter`, `R10-batter-trot`, `R16-1B`: cloth, skin, and equipment have insufficient surface variation; the helmet has a highlight, but the rest remains dominated by flat color.
- Across `crops/high/R02-pitcher`, `R09-LF`, and `R16-1B`, three clearly distinct athletic builds are not convincingly demonstrated.

**Lower-tier observations and performance**

Medium broadly preserves the high-tier appearance in `medium/desktop/R02`, `crops/medium/R02-batter_head`, and `strips/medium/R04`, including its headwear and contact shortcomings. Low introduces a major visual discontinuity: `crops/low/R02-batter_head` replaces the realistic head with a round cartoon face and protruding eyes; `low/desktop/R02` changes body proportions and stance noticeably. `strips/low/R04` shows pronounced apparent suspension above the ground. These are regressions relative to high, not claims about earlier loops.

The supplied performance table reports substantial real-GPU headroom, but software GL reaches only 14 minimum fps and 98.2-ms p95. The brief reports a subsequent pack-budget repair; that change is outside the captures. I have not independently certified the complete performance gate against its threshold file.

**Ranked gaps**

Expected gains are category points and are not additive.

| Rank | Gap and testable fix | Gain | Severity | Effort | Workstream |
|---|---|---:|---:|---|---|
| 1 | Refit helmets, caps, and masks to facial landmarks. Re-render R02 head and R05 umpire head from front/side views; eyes must remain visible and cages must terminate around the chin. | characters +1.0 | 5 | M | WS1 character models/materials |
| 2 | Build actual garment construction and equipment detail: consistent collar/cuffs, placket/buttons, belt hardware, pose folds, glove pocket/web/lacing, cleat laces/soles. Validate R17 hands and R05 feet against SMB3-3 and the jersey reference. | characters +1.0 | 5 | L | WS1 character models/materials |
| 3 | Correct grounding and contact timing. Lock stance soles to dirt, add braking into fielding, and synchronize ball reversal/flash to bat intersection. Capture full pitch delivery through recovery and swing through finish. | animation +1.0 | 5 | L | WS2 animation |
| 4 | Match dressed shoulder, limb, headwear, and hand silhouettes to the athlete reference; show three builds in the same camera and pose. | charfit +1.0 | 4 | L | WS1 character models/materials |
| 5 | Preserve the high-tier identity and grounding in low LOD. Repeat R02/R04 at 60, 140, and 360-pixel player heights; eliminate cartoon-head substitution and suspended feet. | charfit +0.5 | 4 | L | WS6 performance/LOD |
| 6 | Reframe phone fielding to retain bases or provide an explicit off-screen base/runner overview. Reserve landscape space for controls without covering active figures. Validate all five phone moments in both orientations. | mobile +1.0 | 4 | M | WS5 cameras/presentation |
| 7 | Replace visibly repeated crowd strips near the camera with varied spectator silhouettes and give stands railings, seating depth, and structural materials. Validate R05 against SMB4-3. | environment +1.0 | 4 | L | WS4 environment/crowd |
| 8 | Balance night fill, contact shadows, and tower falloff. R12/R13 should retain facial and perimeter detail without pale foreground wash or obvious isolated light circles. | lighting +1.0 | 3 | M | WS3 lighting/post |
| 9 | Prioritize the active defender and preserve ball contrast against signage; verify R07/R09 and runners-on views at phone size. | readability +0.5 | 3 | M | WS7 UI/HUD/mobile |
| 10 | Tighten score-bug spacing and increase title-panel opacity; check menu contrast over every flyover background and result banners in landscape. | ui +0.5 | 2 | S | WS7 UI/HUD/mobile |

```json
{
  "loop": 6,
  "role": "critic-codex",
  "tier": "high",
  "scores": {
    "characters": {
      "score": 5,
      "confidence": 0.95,
      "evidence": [
        {"shot": "crops/high/R02-batter_hands", "note": "Bulky grip and smooth garments; below SMB4-3 construction."},
        {"shot": "crops/high/R17-pitcher_hands", "note": "Glove lacks pocket, webbing and leather detail versus SMB3-3."}
      ]
    },
    "charfit": {
      "score": 5,
      "confidence": 0.9,
      "evidence": [
        {"shot": "crops/high/R16-1B", "note": "Approximate human silhouette; simplified shoulders and limbs versus mpfb2 athlete."},
        {"shot": "crops/high/R02-batter_head", "note": "Headwear conceals facial landmarks required for reference fidelity."}
      ]
    },
    "animation": {
      "score": 5,
      "confidence": 0.8,
      "evidence": [
        {"shot": "strips/high/R04", "note": "Rotation reads, but sampled ball/contact timing is unconvincing."},
        {"shot": "strips/high/R07", "note": "Limited braking preparation before fielding crouch."},
        {"shot": "strips/high/R03", "note": "Sequence ends at leg lift; complete delivery is not demonstrated."},
        {"shot": "strips/high/R10", "note": "Jog cycle has limited visible weight response."}
      ]
    },
    "environment": {
      "score": 5,
      "confidence": 0.95,
      "evidence": [
        {"shot": "high/desktop/R07", "note": "Coherent diamond and turf variation."},
        {"shot": "high/desktop/R05", "note": "Repeated crowd tiles and blank walls fall below SMB4-3."}
      ]
    },
    "lighting": {
      "score": 5.5,
      "confidence": 0.9,
      "evidence": [
        {"shot": "high/desktop/R12", "note": "Night identity, but pale foreground and dark perimeter."},
        {"shot": "high/desktop/R13", "note": "Obvious illumination pools; weaker integration than SMB3-3."}
      ]
    },
    "ui": {
      "score": 6.5,
      "confidence": 0.9,
      "evidence": [
        {"shot": "high/desktop/R02", "note": "Legible consistent status and actions, with inefficient score-bar spacing."},
        {"shot": "high/desktop/R01", "note": "Scenery bleeds through menu and weakens contrast."},
        {"shot": "high/desktop/R10", "note": "Clear result hierarchy."}
      ]
    },
    "readability": {
      "score": 5.5,
      "confidence": 0.9,
      "evidence": [
        {"shot": "high/desktop/R06", "note": "Ball and strike zone read clearly."},
        {"shot": "high/mobile/R07", "note": "Corner bases excluded and defenders small."},
        {"shot": "high/desktop/R16", "note": "First-base runner crowded against right edge."}
      ]
    },
    "mobile": {
      "score": 6,
      "confidence": 0.9,
      "evidence": [
        {"shot": "high/mobile/R05", "note": "Large readable controls and duel figures."},
        {"shot": "high/landscape/R05", "note": "Controls obscure pitcher lower body."},
        {"shot": "high/mobile/R07", "note": "Field overview loses corner-base coverage."}
      ]
    }
  },
  "gaps": [
    {"id": "G-headwear", "category": "characters", "expectedGain": 1, "severity": 5, "effort": "M", "workstream": "WS1",
      "evidence": ["crops/high/R02-batter_head", "crops/high/R05-ump_head"], "benchmark": "benchmarks/smb4-3.png",
      "fix": "Refit headwear and cages to facial landmarks; verify visible eyes and chin-level cage termination in front and side renders."},
    {"id": "G-kit-construction", "category": "characters", "expectedGain": 1, "severity": 5, "effort": "L", "workstream": "WS1",
      "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R05-batter_feet"], "benchmark": "benchmarks/smb3-3.png; art-src/samples/reference-renders/si_jersey_front.png",
      "fix": "Add tailored garment boundaries, closures, folds, glove webbing and lacing, and constructed cleat detail; validate matching close-ups."},
    {"id": "G-grounding-contact", "category": "animation", "expectedGain": 1, "severity": 5, "effort": "L", "workstream": "WS2",
      "evidence": ["crops/high/R05-batter_feet", "strips/high/R04", "strips/high/R07"], "benchmark": "benchmarks/smb4-2.png; benchmarks/smb4-3.png",
      "fix": "Ground stance soles, add braking into fielding, synchronize bat-ball intersection and contact effects, and capture complete delivery and swing sequences."},
    {"id": "G-reference-anatomy", "category": "charfit", "expectedGain": 1, "severity": 4, "effort": "L", "workstream": "WS1",
      "evidence": ["crops/high/R16-1B", "crops/high/R09-LF"], "benchmark": "art-src/samples/reference-renders/mpfb2_athlete_three_quarter.png",
      "fix": "Match dressed shoulders, limbs, hands and headwear silhouettes to the athlete reference; demonstrate three builds in identical poses and cameras."},
    {"id": "G-low-lod-continuity", "category": "charfit", "expectedGain": 0.5, "severity": 4, "effort": "L", "workstream": "WS6",
      "evidence": ["crops/low/R02-batter_head", "strips/low/R04"], "benchmark": "art-src/samples/reference-renders/mpfb2_game27k_glb_three_quarter.png",
      "fix": "Preserve realistic identity and grounded posing across LODs; compare at 60, 140 and 360 pixels and eliminate cartoon head substitution."},
    {"id": "G-phone-framing", "category": "mobile", "expectedGain": 1, "severity": 4, "effort": "M", "workstream": "WS5",
      "evidence": ["high/mobile/R07", "high/landscape/R05"], "benchmark": "benchmarks/backyard97-1.png",
      "fix": "Retain bases or provide an off-screen base and runner overview; reserve landscape control space without obscuring active figures."},
    {"id": "G-crowd-stands", "category": "environment", "expectedGain": 1, "severity": 4, "effort": "L", "workstream": "WS4",
      "evidence": ["high/desktop/R05", "high/desktop/R01"], "benchmark": "benchmarks/smb4-3.png",
      "fix": "Replace conspicuous near-camera crowd repetition with varied silhouettes and add seating depth, railings and structural materials."},
    {"id": "G-night-integration", "category": "lighting", "expectedGain": 1, "severity": 3, "effort": "M", "workstream": "WS3",
      "evidence": ["high/desktop/R12", "high/desktop/R13"], "benchmark": "benchmarks/smb3-3.png",
      "fix": "Balance tower falloff, fill and contact shadows so faces and perimeter retain detail without foreground wash or isolated illumination circles."},
    {"id": "G-action-priority", "category": "readability", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS7",
      "evidence": ["high/mobile/R07", "high/desktop/R09"], "benchmark": "benchmarks/backyard97-1.png",
      "fix": "Prioritize the relevant defender and preserve ball contrast against signage; verify fielding and runners-on scenes at phone size."},
    {"id": "G-ui-spacing-contrast", "category": "ui", "expectedGain": 0.5, "severity": 2, "effort": "S", "workstream": "WS7",
      "evidence": ["high/desktop/R01", "high/desktop/R02"], "benchmark": "benchmarks/ootp26-1.png",
      "fix": "Tighten score-bug spacing and increase title-panel opacity; verify contrast across flyover backgrounds and landscape result banners."}
  ],
  "calibration": {
    "coverage": "All high-tier captures viewed; medium and low spot-checked.",
    "animationLimit": "Motion strips establish sampled poses, not continuous playback; R03 stops before release.",
    "performance": "Reported medium phone proxy minimum 48 fps with 47 ms p95; software GL minimum 14 fps with 98.2 ms p95. Complete gate not independently certified.",
    "postCaptureChanges": "No visual credit assigned to changes made after captures.",
    "expectedGains": "Estimated category points; not additive."
  },
  "verdict": "continue"
}
```
