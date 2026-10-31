# Critic B (critic-codex): loop 8

Continue. Diamond Springs has a coherent HUD and recognizable baseball action, but the high-tier players remain below the character and reference-fidelity gates. Human facial geometry and separate fingers are present; the larger losses come from unfinished garment construction, crude equipment, deformation artifacts, weak facial illumination, and unreliable grounding. The motion strips show recognizable action sequences, but do not establish convincing contact or consistently weighted movement. The park also falls well below the shipped benchmarks in crowd depth, vegetation consistency, and surface treatment. These scores assess the supplied captures, without claiming improvement over earlier loops.

Capture paths below are relative to `screenshots/review-loop-8/`; reference filenames are relative to `art-src/samples/reference-renders/`.

1. **Characters — 5/10.** `crops/high/R02-batter_hands` shows individual fingers and a recognizable grip, but angular sleeves, an irregular neckline, and lettering visibly standing away from the torso undermine the model. `crops/high/R06-catcher_glove` shows a solid brown glove with rudimentary lobes and no convincing pocket, webbing, or leather construction. The tailored uniforms and equipment in `benchmarks/smb3-3.png` and `benchmarks/smb4-3.png` are substantially more complete. Three visibly distinct athletic body types are not established by these captures.

2. **Fidelity to reference — 5.5/10.** General human proportions are recognizable in `crops/high/R16-1B`, but shoulders, hips, and clothed limbs have simplified, inflated contours. `crops/high/R17-pitcher_hands` lacks the knuckle structure, finger taper, and surface differentiation visible in `mpfb2_athlete_hand.png`. Garments fall much further behind `si_jersey_front.png` than the underlying body falls behind `mpfb2_athlete_front.png`. The supplied 0.878–0.889 reference silhouette IoU supports approximate resemblance, not the rubric's same-silhouette anchor. LOD1's relatively small pixel-error increase is encouraging; it does not repair the hero model's visible deficiencies.

3. **Animation — 5.5/10.** `strips/high/R03` establishes a readable preparation and leg lift, although its eight panels end before the delivery and cannot verify the complete stride, release, and recovery. `strips/high/R04` shows rotation and follow-through, but the contact flash in panel 5 appears separated from the bat; it communicates an event more clearly than physical contact. `strips/high/R07` changes sharply from upright running in panel 4 to a deep fielding crouch in panel 5. `strips/high/R10` has a readable running cycle, with limited upper-body overlap and an elevated appearance. Against the strong loading silhouettes in `benchmarks/smb4-2.png` and `benchmarks/smb3-3.png`, the result remains short of convincing weight. Those benchmark stills establish pose quality, not temporal smoothness.

4. **Environment — 5/10.** `high/desktop/R05` exposes stretched, repeated crowd photographs on flat stand surfaces. `high/desktop/R15` combines faceted trees, a photographic forest backdrop with an obvious horizontal transition, and sparsely dressed surroundings. Turf variation, advertisements, foul poles, and park differences provide useful structure. However, `benchmarks/smb3-1.png` and `benchmarks/smb4-3.png` demonstrate much stronger crowd volume, architectural detail, and integrated materials. A small school park need not match their scale; it still needs consistent asset treatment.

5. **Lighting — 5.5/10.** `high/desktop/R12` clearly reads as night, with illuminated turf and visible helmet highlights. `high/desktop/R13` reveals abrupt bright pools surrounded by very dark peripheral areas. Daytime faces remain poorly modeled by light in `crops/high/R02-batter_head`, while `crops/high/R05-batter_feet` shows visible separation between soles and their dark grounding patches. `benchmarks/smb3-3.png` preserves much better facial and uniform modeling at night; `benchmarks/smb3-4.png` integrates warm light and atmospheric depth more convincingly.

6. **UI — 7/10.** `high/desktop/R05` has a clear score, count, target, pitch selection, and primary action. `high/desktop/R10` gives the result banner an effective hierarchy. Typography and color are consistent, although the desktop score bars consume considerable width for little information, and the controls feel more like a general app interface than a finished broadcast package. `benchmarks/ootp26-1.png` demonstrates denser information hierarchy; `benchmarks/backyard97-1.png` demonstrates stronger baseball-specific graphic character. Neither advantage requires copying their visual style.

7. **Readability — 6/10.** The zone and batting target are easy to locate in `high/desktop/R02` and `high/mobile/R05`; ball trails and runner rings help. However, `high/mobile/R07` excludes first and third base from the visible field, and `high/desktop/R10` follows the airborne ball while the purported home-run runner is outside the view. `high/desktop/R09` makes the receiving fielder and catch state difficult to identify immediately. Compared with the organized player grouping in `benchmarks/smb3-1.png` and the field/status overview in `benchmarks/ootp26-1.png`, spatial understanding is inconsistent across moments.

8. **Mobile — 6/10.** `high/mobile/R02` offers readable batting figures and large controls; `high/mobile/R05` preserves a usable zone and pitch buttons. In `high/landscape/R05`, controls cover the pitcher's lower body, while `high/landscape/R02` cuts off the batter's feet. Portrait fielding in `high/mobile/R07` sacrifices important base context. The supplied benchmark set contains no equivalent phone capture, so this score uses the rubric's phone framing and control requirements, with `benchmarks/ootp26-1.png` only as a spatial-information comparison.

**Character defects visible in the close-ups**

- Angular, uneven neck openings lack a constructed collar or convincing seam: `crops/high/R02-batter_head`, `crops/high/R17-pitcher-back`.
- Sleeve and undershirt boundaries look like abrupt color cuts rather than layered clothing: `crops/high/R02-batter_hands`, `crops/high/R17-pitcher_hands`.
- Shoulder and upper-arm contours become bulky or sharply ridged in batting poses: `crops/high/R02-batter_hands`, `crops/high/R14-batter`.
- Pants show conspicuous polygonal shading bands around the thighs and knees: `crops/high/R09-LF`, `crops/high/R16-runner1`.
- Uniforms hug the body with little believable fabric thickness, compression folding, or loose drape: `crops/high/R02-pitcher`, `crops/high/R10-batter-trot`.
- Belts read as irregular solid bands, without clear buckle or belt-loop construction: `crops/high/R02-pitcher`, `crops/high/R17-pitcher_hands`.
- Chest lettering visibly projects away from the shirt, particularly at the oblique left edge: `crops/high/R02-batter_hands`. The Lake Hamilton text is legible in `crops/high/R17-pitcher_hands`, but still has a conspicuous pale perimeter.
- Facial features are modeled, but eyes and skin have weak material differentiation; the light-skinned fielder's eyes look largely skin-colored: `crops/high/R09-LF`. Darker faces lose much of their feature readability: `crops/high/R02-batter_head`.
- Batting helmet ear protection resembles broad hanging slabs; shells lack convincing vents, padding, or attachment detail: `crops/high/R02-batter_head`, `crops/high/R10-batter-trot`.
- Fingers are separate but blunt, with limited knuckle definition; gripping fingers do not produce a tightly fitted, convincing two-hand hold: `crops/high/R02-batter_hands`.
- Fielding gloves resemble padded hands, with no convincing web, lacing, or receiving pocket: `crops/high/R17-pitcher_hands`, `crops/high/R06-catcher_glove`.
- Catcher protection is smooth and poorly articulated; the neckline has jagged geometry, and shin protection flares away from the legs: `crops/high/R06-catcher_glove`, `crops/high/R05-catcher`.
- Mask bars are continuous where they cross, but exposed side ends remain visually crude and the cage lacks a convincing surrounding frame: `crops/high/R05-ump_head`.
- Cleats lack readable laces and stud construction; their white side markings have conspicuously jagged boundaries: `crops/high/R05-batter_feet`.
- Both batting shoes appear suspended above their grounding patches in a stance that should feel planted: `crops/high/R05-batter_feet`.
- Body and equipment variety is limited across the visible fielders: `crops/high/R07-SS`, `crops/high/R08-CF`, `crops/high/R09-LF`.

**Tier checks and performance**

The inspected medium captures retain the high-tier appearance, including the dark face and floating lettering in `crops/medium/R02-batter_head` and `crops/medium/R02-batter_hands`. Low introduces a substantial fidelity discontinuity: oversized spherical eyes, mitten-like hands, altered stance, and simpler headwear in `crops/low/R02-batter_head`, `crops/low/R02-batter_hands`, and `low/desktop/R02`. This is a different character treatment rather than a faithful reduction.

The brief reports ample RTX desktop headroom: high reaches a 421-fps minimum with 3.0-ms worst p95 and 76.7-MB heap. The medium phone CPU proxy reports 63-fps minimum and 33.7-ms worst p95. These do not independently establish the estimated phone-GPU budget. Software GL reports 17 fps and 69.3-ms p95, below the plan's stated 20-fps target; the later baseline-relative gate cannot be resolved without the prohibited earlier-loop evidence. Download limits and the complete performance gate are therefore unverified.

**Ranked gaps**

Expected gains are estimates within the named category and are not additive guarantees.

1. **WS1 — Rebuild uniform construction and deformation.** Severity **5**, effort **L**, expected **+1.5 characters**. Replace painted garment boundaries with consistent collars, cuffs, placket, belt details, and pose-dependent folds; correct shoulder and thigh deformation. Conform lettering closely to the shirt. Test the same batting, crouching, and running poses without angular collapse or visibly detached text. Evidence: `crops/high/R02-batter_hands`, `crops/high/R16-runner1`; target: `si_jersey_front.png`, `benchmarks/smb4-3.png`.

2. **WS1 — Finish hands, gloves, and protective gear.** Severity **5**, effort **L**, expected **+1.0 characters**. Add anatomically tapered fingers, a fitted bat grip, glove pockets/webbing, articulated catcher padding, and complete cage frames. Test from all supplied hand and gear cameras. Evidence: `crops/high/R17-pitcher_hands`, `crops/high/R06-catcher_glove`; target: `mpfb2_athlete_hand.png`, `benchmarks/smb3-3.png`.

3. **WS2 — Establish physical contact and grounded transitions.** Severity **5**, effort **L**, expected **+1.0 animation**. Lock stance soles to the ground, place contact effects at the bat/ball intersection, and blend running into fielding with a deceleration step. Capture complete pitch and swing sequences, including release and recovery. Evidence: `crops/high/R05-batter_feet`, `strips/high/R04`, `strips/high/R07`; target: loading and support-leg clarity in `benchmarks/smb4-2.png`.

4. **WS3 — Improve facial fill and night-light integration.** Severity **4**, effort **M**, expected **+1.0 lighting**. Preserve facial planes under brims, reduce abrupt field-light boundaries, and calibrate skin, cloth, and equipment separately. Test dark and light skin under identical day/night cameras. Evidence: `crops/high/R02-batter_head`, `high/desktop/R13`; target: `benchmarks/smb3-3.png`.

5. **WS4 — Replace flat crowd repetition and reconcile vegetation.** Severity **4**, effort **L**, expected **+1.5 environment**. Use spectators with depth and variation, coherent tree materials, and a blended distant treeline. Test from the pitching and elevated outfield cameras, where repetition and backdrop seams are most exposed. Evidence: `high/desktop/R05`, `high/desktop/R15`; target: `benchmarks/smb4-3.png`.

6. **WS5 — Frame fielding and phone action around gameplay context.** Severity **4**, effort **M**, expected **+1.0 readability**. Keep relevant bases and runner in view, identify the receiving fielder clearly, and reserve space for landscape controls. Test R02, R05, R07, R09, and R10 at both phone orientations. Evidence: `high/mobile/R07`, `high/landscape/R05`, `high/desktop/R10`; target: grouping and spatial clarity in `benchmarks/smb3-1.png`.

7. **WS6 — Preserve character identity through low-tier reduction.** Severity **3**, effort **L**, expected **+0.5 charfit when evaluated across tiers**. Derive reduced meshes and materials from the hero assets, retaining head proportions, eye placement, equipment silhouette, and pose timing. Compare identical cameras and animation times at every tier. Evidence: `low/desktop/R02`, `crops/low/R02-batter_head`; target: `mpfb2_athlete_front.png`.

```json
{
  "loop": 8,
  "role": "critic-codex",
  "tier": "high",
  "scores": {
    "characters": {"score": 5, "confidence": 0.95, "evidence": [
      {"shot": "crops/high/R02-batter_hands", "note": "Angular garments and visibly offset lettering."},
      {"shot": "crops/high/R06-catcher_glove", "note": "Crude glove and protective equipment construction."}]},
    "charfit": {"score": 5.5, "confidence": 0.9, "evidence": [
      {"shot": "crops/high/R16-1B", "note": "Approximate human proportions; simplified clothed anatomy."},
      {"shot": "crops/high/R17-pitcher_hands", "note": "Hands and garment construction fall below realistic references."}]},
    "animation": {"score": 5.5, "confidence": 0.82, "evidence": [
      {"shot": "strips/high/R03", "note": "Readable preparation and leg lift; strip does not cover complete delivery."},
      {"shot": "strips/high/R04", "note": "Readable rotation; contact flash appears separated from bat."},
      {"shot": "strips/high/R07", "note": "Abrupt change from running to fielding crouch."},
      {"shot": "crops/high/R05-batter_feet", "note": "Stance soles visibly separated from grounding patches."}]},
    "environment": {"score": 5, "confidence": 0.96, "evidence": [
      {"shot": "high/desktop/R05", "note": "Repeated crowd photographs on flat stands."},
      {"shot": "high/desktop/R15", "note": "Faceted vegetation and conspicuous photographic backdrop transition."}]},
    "lighting": {"score": 5.5, "confidence": 0.93, "evidence": [
      {"shot": "high/desktop/R12", "note": "Recognizable night exposure and equipment highlights."},
      {"shot": "high/desktop/R13", "note": "Abrupt light pools and dark periphery."},
      {"shot": "crops/high/R02-batter_head", "note": "Weak facial illumination under brim."}]},
    "ui": {"score": 7, "confidence": 0.93, "evidence": [
      {"shot": "high/desktop/R05", "note": "Consistent score, count, targeting, and action hierarchy."},
      {"shot": "high/desktop/R10", "note": "Clear result banner; oversized score bars remain."}]},
    "readability": {"score": 6, "confidence": 0.9, "evidence": [
      {"shot": "high/mobile/R07", "note": "First and third base excluded from field view."},
      {"shot": "high/desktop/R09", "note": "Receiving fielder and catch state not immediately apparent."},
      {"shot": "high/desktop/R10", "note": "Ball-follow framing excludes home-run runner."}]},
    "mobile": {"score": 6, "confidence": 0.9, "evidence": [
      {"shot": "high/mobile/R02", "note": "Readable figures, zone, and large controls."},
      {"shot": "high/landscape/R05", "note": "Controls cover pitcher's lower body."},
      {"shot": "high/landscape/R02", "note": "Batter's feet cut off."}]}
  },
  "gaps": [
    {"id": "G-uniform-construction", "category": "characters", "expectedGain": 1.5, "severity": 5, "effort": "L", "workstream": "WS1",
      "evidence": ["crops/high/R02-batter_hands", "crops/high/R16-runner1"], "benchmark": "si_jersey_front.png; benchmarks/smb4-3.png",
      "fix": "Build collars, cuffs, placket and belt details; correct shoulder and thigh deformation; conform lettering to cloth. Verify all supplied action poses without angular collapse or detached text."},
    {"id": "G-hands-and-equipment", "category": "characters", "expectedGain": 1, "severity": 5, "effort": "L", "workstream": "WS1",
      "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R06-catcher_glove"], "benchmark": "mpfb2_athlete_hand.png; benchmarks/smb3-3.png",
      "fix": "Refine finger anatomy and bat grip; construct glove pockets and webbing, articulated padding and complete mask frames. Verify from every supplied hand and gear camera."},
    {"id": "G-contact-and-grounding", "category": "animation", "expectedGain": 1, "severity": 5, "effort": "L", "workstream": "WS2",
      "evidence": ["crops/high/R05-batter_feet", "strips/high/R04", "strips/high/R07"], "benchmark": "benchmarks/smb4-2.png",
      "fix": "Lock planted soles, align contact effects with bat-ball intersection, and add deceleration into fielding. Supply complete delivery and swing sequences through recovery."},
    {"id": "G-face-and-night-light", "category": "lighting", "expectedGain": 1, "severity": 4, "effort": "M", "workstream": "WS3",
      "evidence": ["crops/high/R02-batter_head", "high/desktop/R13"], "benchmark": "benchmarks/smb3-3.png",
      "fix": "Preserve facial planes under brims and soften abrupt field-light boundaries. Verify dark and light skin under matching day and night cameras."},
    {"id": "G-crowd-and-vegetation", "category": "environment", "expectedGain": 1.5, "severity": 4, "effort": "L", "workstream": "WS4",
      "evidence": ["high/desktop/R05", "high/desktop/R15"], "benchmark": "benchmarks/smb4-3.png",
      "fix": "Give spectators depth and variation, reconcile tree materials, and blend the distant treeline. Verify pitching and elevated outfield views without obvious repetition or backdrop seams."},
    {"id": "G-gameplay-framing", "category": "readability", "expectedGain": 1, "severity": 4, "effort": "M", "workstream": "WS5",
      "evidence": ["high/mobile/R07", "high/landscape/R05", "high/desktop/R10"], "benchmark": "benchmarks/smb3-1.png",
      "fix": "Keep relevant bases and runners visible, identify the receiver, and reserve landscape control space. Verify R02, R05, R07, R09 and R10 in both phone orientations."},
    {"id": "G-low-tier-identity", "category": "charfit", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS6",
      "evidence": ["low/desktop/R02", "crops/low/R02-batter_head"], "benchmark": "mpfb2_athlete_front.png",
      "fix": "Derive low assets from hero assets while preserving proportions, eye placement, gear silhouette and pose timing. Verify identical cameras and animation times across tiers; gain applies to cross-tier fidelity."}
  ],
  "calibration": {
    "comparison": "Shipped benchmark PNGs and realistic reference renders viewed directly.",
    "performance": "Desktop high has ample reported headroom. Phone GPU estimate and download gate unverified. Software GL reports 17 fps, below stated 20-fps target; baseline-relative gate unresolved.",
    "tierCoverage": "High desktop frames, high close-ups and strips, high phone views; representative medium and low regression checks.",
    "animationLimit": "Motion strips establish sampled pose progression, not full-speed playback or every delivery phase."
  },
  "verdict": "continue"
}
```
