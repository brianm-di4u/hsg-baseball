# Critic B (critic-codex): loop 10

Continue. Diamond Springs has a coherent baseball presentation and usable controls, but its p...
[codex] Turn completion inferred after the main thread finished and subagent work drained.
Continue. Diamond Springs has a coherent baseball presentation and usable controls, but its priority—the players—remains substantially below the character gates. Human proportions and separate fingers establish a credible foundation; smooth, nearly featureless uniforms, simplified equipment, weak facial rendering and conspicuous deformation prevent reference-level fidelity. The swing has readable contact and a finish, while running and fielding retain mechanical transitions. The parks remain visibly assembled from incompatible levels of detail. Buttons are visible, and contact darkening exists, but neither resolves the larger material and grounding problems. These judgments come from viewing the supplied PNGs, including all three tiers; no files were modified.

All capture citations below are relative to `screenshots/review-loop-10/`. Benchmark paths and reference paths are relative to the repository root.

1. **Characters: 5.5/10.** `crops/high/R02-batter_hands` shows separate fingers and visible placket buttons, but angular sleeve transitions, smooth tubular arms and almost no garment construction. `crops/high/R06-catcher_glove` shows a blunt, padded glove shape and a plain chest shell rather than convincing leather and protective equipment. `crops/high/R05-batter_feet` shows glossy, unfastened-looking shoes. Compared with `benchmarks/smb3-3.png` and `benchmarks/smb4-4.png`, the players lack cloth structure, equipment detail and visibly distinct physiques. They exceed the clean low-poly foundation of 5, but do not approach the complete 7 anchor.

2. **Fidelity to reference: 5.5/10.** Broad human proportions in `crops/high/R16-runner1` and `crops/high/R17-pitcher-back` resemble `art-src/samples/reference-renders/mpfb2_athlete_front.png` and `mpfb2_athlete_side.png`. However, the hands in `crops/high/R17-pitcher_hands` lose the reference hand’s knuckle, nail and tendon definition; facial rendering in `crops/high/R02-batter_head` falls far below `mpfb2_game27k_glb_face_34.png`. Garments lack the thickness, folds and surface variation of `si_jersey_three_quarter.png`. The supplied 0.878/0.895 silhouette IoUs support approximate proportional agreement, not visual equivalence. LOD2’s reported 33.6–40.9% pixel error also does not support fidelity across distances.

3. **Animation and game feel: 5.5/10.** `strips/high/R04` supplies a readable rotation, contact flash and high finish. However, the lower-body action provides limited visible loading and weight transfer compared with the strong posed balance in `benchmarks/smb4-3.png`. `strips/high/R07` changes sharply from running in panel 4 to a low fielding posture in panel 5, then holds a similar crouch through the remaining panels. `strips/high/R10` shows alternating strides, but a restrained, repetitive torso and arm action. `strips/high/R03` shows gathering, leg lift and stride; its final panel still appears before release, so the brief’s claimed follow-through coverage is not demonstrated by that strip. The release pose in `high/desktop/R06` helps establish that the action exists, but cannot establish its temporal quality. SMB stills are pose-quality comparisons only.

4. **Environment: 5/10.** `high/desktop/R07` provides a legible diamond, mow pattern, backstop and populated stands. `high/desktop/R15` offers a different wall treatment and setting. Yet `high/desktop/R05` exposes large repeated crowd photographs stretched across seating rows, and `high/desktop/R11` exposes faceted trees against a much more detailed photographic horizon. Architecture remains mostly large, clean slabs. Compared with `benchmarks/smb3-1.png` and `benchmarks/smb4-3.png`, the missing depth, individual spectators, structural dressing and material consistency are substantial.

5. **Lighting and atmosphere: 5.5/10.** `high/desktop/R12` clearly reads as night, with luminous towers and an illuminated playing area; `high/desktop/R14` has a distinguishable warm afternoon palette. But `high/desktop/R13` exposes isolated bright pools and very dark surrounding vegetation, while `crops/high/R02-batter_head` leaves the face poorly modeled by fill light. In `crops/high/R05-batter_feet`, darkening remains visibly detached beneath the left shoe, so increased shadow size has not fully grounded the stance. Compared with `benchmarks/smb3-3.png` and `benchmarks/smb3-4.png`, bounce, atmospheric integration and material highlights remain weak.

6. **UI and typography: 6.5/10.** `high/desktop/R02` has consistent team colors, clear scores, inning/count information and obvious primary action. `high/desktop/R10` has strong result hierarchy. However, the HUD spreads little information across almost the entire screen width; secondary text is small, the bottom control band is visually heavy, and the menu in `high/desktop/R01` allows considerable field detail through its panel. Compared with `benchmarks/ootp26-1.png`, information grouping is less efficient. Compared with `benchmarks/backyard97-2.png`, the menu has less visual character and contextual illustration. The supplied `smb3-1` image has no visible HUD, so it cannot substantiate a score-bug comparison.

7. **Readability: 6/10.** The strike zone in `high/desktop/R02` and bright ball trail in `high/desktop/R08` are effective. Yellow runner rings also separate offense from defense. Nevertheless, `high/desktop/R16` places the first-base runner and defender together at the extreme right edge, while the small figures in `high/mobile/R07` communicate positioning better than possession or individual action. In `high/desktop/R09`, the airborne ball is a small white point against scoreboard detail. Compared with `benchmarks/smb3-1.png`, the duel camera provides less readable defensive body language; compared with `benchmarks/backyard97-1.png`, it lacks a similarly prominent field overview for locating off-camera participants.

8. **Mobile: 6.5/10.** `high/mobile/R05` preserves a large plate confrontation and generously sized controls; `high/landscape/R05` keeps pitch selection and the primary action accessible. HUD text remains readable in the supplied portrait images. However, `high/mobile/R02` spends a large portion of the view on sky, and `high/mobile/R07` excludes the corner bases and defenders while rendering the remaining fielders very small. Landscape batting also cuts off the batter’s feet in `high/landscape/R02`. These weaken intentional framing despite functional layouts. `benchmarks/backyard97-1.png` provides a useful comparison for compact field orientation, though none of the supplied benchmarks establishes touch usability. The reported medium phone proxy’s 52 fps supports the CPU-side performance requirement; actual touch interaction is untested.

**Character defects visible in the close-ups**

- **Poor facial surface definition:** facial features exist, but skin reads as uniform shaded material, with weak eye, eyebrow and lip separation—`crops/high/R02-batter_head`, `crops/high/R09-LF`.
- **Face lost beneath helmet shading:** the batter’s eyes and upper face are difficult to inspect even at close range—`crops/high/R02-batter_head`.
- **Oversimplified batting helmet:** broad dome, slab-like hanging ear guards and little visible shell construction—`crops/high/R02-batter_head`, `crops/high/R10-batter-trot`.
- **Cap lacks construction detail:** plain dome and bill without convincing panel seams, button or embroidery—`crops/high/R02-pitcher`, `crops/high/R17-pitcher-back`.
- **Angular collar and sleeve boundaries:** jagged color boundaries and abrupt transitions resemble segmented mesh regions—`crops/high/R02-batter_hands`, `crops/high/R16-1B`.
- **Uniform follows the body too closely:** smooth torso, hips and legs provide little loose fabric volume or compression folding—`crops/high/R02-batter`, `crops/high/R17-pitcher-back`.
- **Broad polygonal shading bands:** visible across thighs and knees during bent poses—`crops/high/R16-runner1`, `crops/high/R09-LF`.
- **Weak elbow deformation:** bends become sharply angular and locally pinched—`crops/high/R10-batter-trot`, `crops/high/R17-pitcher_hands`.
- **Hands remain simplified:** thick, rounded digits with little knuckle or nail definition; batting grip does not clearly demonstrate tight finger contact throughout—`crops/high/R02-batter_hands`, `crops/high/R17-pitcher_hands`.
- **Pitcher’s ready hand looks unnaturally open:** fingers are splayed beside the glove without a clearly visible ball grip—`crops/high/R02-pitcher`, `crops/high/R17-pitcher_hands`.
- **Gloves lack baseball construction:** blunt lobes, no convincing webbing, lacing, seams or leather grain—`crops/high/R17-pitcher_hands`, `crops/high/R06-catcher_glove`.
- **Catcher’s protector looks like a smooth hard shell:** little segmented padding or fastening detail; jagged intersections around the neckline—`crops/high/R06-catcher_glove`.
- **Shin guards lack articulated construction:** broad blue shells without convincing straps or differentiated knee/ankle elements—`crops/high/R05-catcher`.
- **Masks use crude bars:** thick, visibly segmented rails with exposed ends, rather than a coherent framed cage—`crops/high/R05-ump_head`.
- **Umpire shoulder deformation:** sharply protruding shoulder/back shapes and abrupt sleeve terminations—`crops/high/R05-ump_head`, `crops/high/R05-batter-front`.
- **Footwear resembles glossy slip-ons:** no clear laces, tongue, eyelets or cleat configuration—`crops/high/R05-batter_feet`.
- **Sock/shoe boundaries are irregular:** especially the blue-to-black transitions—`crops/high/R02-pitcher`, `crops/high/R16-1B`.
- **Stance grounding remains incomplete:** apparent clearance beneath the left batter shoe despite a dark patch below it—`crops/high/R05-batter_feet`.
- **Limited physique variety:** batter, runners and fielders retain very similar slender silhouettes—`crops/high/R10-batter-trot`, `crops/high/R16-runner1`, `crops/high/R16-1B`.

Medium preserves the main model but shows coarser shading and conspicuous diagonal shadow banding on walls (`medium/desktop/R01`, `crops/medium/R07-batter-runner`). Low introduces oversized cartoon heads, mitten hands and featureless feet (`crops/low/R02-batter_head`, `crops/low/R05-batter_feet`), jagged waist gaps and detached-looking lettering/numbers (`crops/low/R05-batter-front`, `crops/low/R17-pitcher-back`), and jersey lettering visible across the catcher’s protector (`crops/low/R06-catcher_glove`). These are regressions relative to high, not deductions applied to its character score.

**Ranked gaps and testable fixes**

Expected gains are estimates within the named category and are not additive guarantees.

| Rank | Gap | Workstream | Concrete fix and acceptance check | Expected gain | Severity | Effort |
|---|---|---|---|---:|---:|---|
| 1 | Uniforms and equipment lack convincing construction | WS1 character models/materials | Add cloth volume, joint folds, seams and differentiated roughness; rebuild glove webbing, helmet guards and laced cleats. Re-render R02, R05, R06 and R17 close-ups; construction must remain recognizable without lettering. | Characters +1.0 | 5 | L |
| 2 | Reference anatomy and facial detail are lost in the finished player | WS1 character models/materials | Preserve reference hand/face detail and improve elbow/hip deformation; supply three distinct athletic builds. Compare matched face, hand and full-body renders against MPFB2 at 360 and 140 pixels. | Charfit +1.0 | 5 | L |
| 3 | Motion transitions and foot support lack weight | WS2 animation | Blend run-to-field through deceleration and planted support; synchronize stride travel with foot contact and add pelvis/torso counterrotation. Capture full pitch through release and recovery, plus R07/R10 strips with stable ground landmarks. | Animation +1.0 | 4 | L |
| 4 | Crowd and foliage expose incompatible asset styles | WS4 environment/crowd | Replace stretched crowd rows with varied spectators/cards arranged in seat depth; replace near cone trees and soften the photographic horizon transition. Verify R05 and R11 at native resolution. | Environment +1.0 | 4 | L |
| 5 | Faces and soles lack convincing illumination and contact | WS3 lighting/post | Add restrained sky fill, tune skin/cloth response, correct stance foot height and tie contact shadow strength to ground clearance. Verify visible facial features and sole contact in R02-head/R05-feet, day and night. | Lighting +1.0 | 4 | M |
| 6 | Field cameras sacrifice participants and mobile space | WS5 cameras/presentation | Reduce portrait sky allocation; keep runner/base relationships visible using adaptive framing and a field inset when needed. Verify all bases and active participants can be located in portrait R07 and desktop R16. | Readability +0.5 | 3 | M |
| 7 | Low tier substitutes a different character style and breaks seams | WS6 performance/LOD | Derive low meshes from the same proportions and material boundaries; close waist/shoulder gaps, bind lettering correctly and hide it beneath equipment. Compare identical poses across all tiers. | Characters +0.5 on low only | 4 | L |

Performance is unscored. The supplied high desktop result—323 minimum fps, 4.4 ms worst p95 and 107.1 MB heap—is comfortably within the listed desktop limits. Medium’s throttled phone proxy reports 52 fps, while low software GL reports 17 fps/69.1 ms. The latter falls below the plan’s earlier 20 fps target; its later budget specifies comparison with the loop-0 baseline, which I did not inspect because other loop folders are prohibited. Therefore I cannot certify the complete performance gate, including phone GPU estimation and download budgets.

```json
{
  "loop": 10,
  "role": "critic-codex",
  "tier": "high",
  "scores": {
    "characters": {
      "score": 5.5,
      "confidence": 0.95,
      "evidence": [
        {"shot": "crops/high/R02-batter_hands", "note": "Separate fingers and buttons; angular sleeves and minimal cloth construction."},
        {"shot": "crops/high/R06-catcher_glove", "note": "Simplified glove and smooth protective shell."},
        {"shot": "crops/high/R05-batter_feet", "note": "Footwear lacks convincing fastening and cleat detail."}
      ]
    },
    "charfit": {
      "score": 5.5,
      "confidence": 0.93,
      "evidence": [
        {"shot": "crops/high/R16-runner1", "note": "Broad human proportions but simplified garment and joint structure."},
        {"shot": "crops/high/R17-pitcher_hands", "note": "Hand and garment detail fall below MPFB2 and jersey references."},
        {"shot": "crops/high/R02-batter_head", "note": "Facial rendering falls below realistic face references."}
      ]
    },
    "animation": {
      "score": 5.5,
      "confidence": 0.8,
      "evidence": [
        {"shot": "strips/high/R04", "note": "Readable contact and high finish; limited lower-body loading."},
        {"shot": "strips/high/R07", "note": "Abrupt run-to-field transition between panels 4 and 5."},
        {"shot": "strips/high/R03", "note": "Ends around stride; release and follow-through are not demonstrated."},
        {"shot": "strips/high/R10", "note": "Readable but mechanical running cycle."}
      ]
    },
    "environment": {
      "score": 5,
      "confidence": 0.96,
      "evidence": [
        {"shot": "high/desktop/R05", "note": "Stretched, repeated crowd imagery dominates the stands."},
        {"shot": "high/desktop/R11", "note": "Faceted near foliage conflicts with photographic horizon."},
        {"shot": "high/desktop/R15", "note": "Distinct park treatment but sparse structural detail."}
      ]
    },
    "lighting": {
      "score": 5.5,
      "confidence": 0.92,
      "evidence": [
        {"shot": "high/desktop/R12", "note": "Readable night lighting with overly pale playing surface."},
        {"shot": "high/desktop/R13", "note": "Isolated light pools and crushed surrounding vegetation."},
        {"shot": "crops/high/R05-batter_feet", "note": "Darkening exists but apparent sole clearance remains."}
      ]
    },
    "ui": {
      "score": 6.5,
      "confidence": 0.92,
      "evidence": [
        {"shot": "high/desktop/R02", "note": "Clear primary controls and count; inefficient full-width HUD."},
        {"shot": "high/desktop/R10", "note": "Strong result-banner hierarchy."},
        {"shot": "high/desktop/R01", "note": "Busy field remains visible through menu panel."}
      ]
    },
    "readability": {
      "score": 6,
      "confidence": 0.9,
      "evidence": [
        {"shot": "high/desktop/R08", "note": "Ball trail and runner marker help locate action."},
        {"shot": "high/desktop/R16", "note": "Runner and first baseman crowded against right edge."},
        {"shot": "high/mobile/R07", "note": "Small fielders and excluded corner bases weaken overview."}
      ]
    },
    "mobile": {
      "score": 6.5,
      "confidence": 0.87,
      "evidence": [
        {"shot": "high/mobile/R05", "note": "Large confrontation and generous controls."},
        {"shot": "high/landscape/R05", "note": "Accessible pitch controls and intact plate framing."},
        {"shot": "high/mobile/R02", "note": "Excessive sky allocation."},
        {"shot": "high/mobile/R07", "note": "Corner bases and defenders excluded from portrait frame."}
      ]
    }
  },
  "gaps": [
    {
      "id": "G-garments-gear",
      "category": "characters",
      "expectedGain": 1,
      "severity": 5,
      "effort": "L",
      "workstream": "WS1",
      "evidence": ["crops/high/R02-batter_hands", "crops/high/R06-catcher_glove", "crops/high/R05-batter_feet"],
      "benchmark": "benchmarks/smb3-3.png; benchmarks/smb4-4.png; art-src/samples/reference-renders/si_jersey_three_quarter.png",
      "fix": "Add cloth volume, seams, folds and material variation; rebuild glove webbing, helmet guards and laced cleats. Verify construction reads without lettering in matched close-ups."
    },
    {
      "id": "G-reference-detail",
      "category": "charfit",
      "expectedGain": 1,
      "severity": 5,
      "effort": "L",
      "workstream": "WS1",
      "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R02-batter_head", "crops/high/R16-runner1"],
      "benchmark": "art-src/samples/reference-renders/mpfb2_game27k_glb_face_34.png; art-src/samples/reference-renders/mpfb2_athlete_hand.png",
      "fix": "Preserve reference face and hand structure, improve joint deformation and supply three distinct athletic builds. Compare matched renders at 360 and 140 pixels."
    },
    {
      "id": "G-motion-weight",
      "category": "animation",
      "expectedGain": 1,
      "severity": 4,
      "effort": "L",
      "workstream": "WS2",
      "evidence": ["strips/high/R03", "strips/high/R07", "strips/high/R10"],
      "benchmark": "benchmarks/smb4-2.png; benchmarks/smb4-3.png",
      "fix": "Blend deceleration into fielding, synchronize stride travel with planted feet and add torso counterrotation. Provide pitch strips through release and recovery and running strips with stable ground landmarks."
    },
    {
      "id": "G-park-coherence",
      "category": "environment",
      "expectedGain": 1,
      "severity": 4,
      "effort": "L",
      "workstream": "WS4",
      "evidence": ["high/desktop/R05", "high/desktop/R11"],
      "benchmark": "benchmarks/smb3-1.png; benchmarks/smb4-3.png",
      "fix": "Replace stretched crowd rows with varied spectators arranged in seat depth, replace near cone foliage and integrate the photographic horizon. Verify native-resolution plate and replay views."
    },
    {
      "id": "G-light-grounding",
      "category": "lighting",
      "expectedGain": 1,
      "severity": 4,
      "effort": "M",
      "workstream": "WS3",
      "evidence": ["crops/high/R02-batter_head", "crops/high/R05-batter_feet", "high/desktop/R13"],
      "benchmark": "benchmarks/smb3-3.png; benchmarks/smb3-4.png",
      "fix": "Tune sky fill and material response, correct stance foot height and vary contact shadows with clearance. Verify readable faces and sole contact in day and night close-ups."
    },
    {
      "id": "G-field-framing",
      "category": "readability",
      "expectedGain": 0.5,
      "severity": 3,
      "effort": "M",
      "workstream": "WS5",
      "evidence": ["high/mobile/R02", "high/mobile/R07", "high/desktop/R16"],
      "benchmark": "benchmarks/backyard97-1.png; benchmarks/smb3-1.png",
      "fix": "Reduce portrait sky allocation and use adaptive framing or a field inset to preserve base and runner relationships. Verify active participants and all bases can be located during field play."
    },
    {
      "id": "G-low-tier-seams",
      "category": "characters",
      "expectedGain": 0.5,
      "severity": 4,
      "effort": "L",
      "workstream": "WS6",
      "evidence": ["crops/low/R05-batter-front", "crops/low/R17-pitcher-back", "crops/low/R06-catcher_glove"],
      "benchmark": "High-tier equivalents; gain applies to low tier only.",
      "fix": "Derive low meshes from the same proportions and material boundaries, close waist and shoulder gaps, bind lettering correctly and hide it beneath protective equipment. Compare identical poses across tiers."
    }
  ],
  "calibration": {
    "capturesViewed": 168,
    "scoredTier": "High desktop, with high portrait and landscape for mobile and readability.",
    "animationLimit": "Motion strips establish sampled poses, not continuous playback; high R03 does not demonstrate release and follow-through.",
    "performance": "High desktop and reported throttled medium CPU proxy meet their stated frame-rate targets. Full gate remains unverified because software GL requires a prohibited prior-loop baseline comparison and phone GPU/download evidence is incomplete.",
    "expectedGains": "Estimates within named categories; not additive guarantees."
  },
  "verdict": "continue"
}
```
