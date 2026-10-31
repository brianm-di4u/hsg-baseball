# Advocate review: loop 2, high tier

Capture paths are relative to `screenshots/review-loop-2/`. I opened every capture cited below. Where I measured something, I give the number.

## Summary

Both critics are mostly right. The character defects they list are real. I measured the batter's face in `crops/high/R02-batter_head` at a mean luma of 1.9/255. That is pure black. The jersey lettering really does float off the body. The run cycle really does carry frozen open palms. I don't contest the character scores. Where the critics go wrong is in a few places where they called something absent or uniform while the captures show it:

- night falloff
- body variety
- grounded feet
- possession cues
- the amount of sky on mobile
- phone key hints

There is also double-counting. Garment defects are scored once in `characters` and again in `charfit`. A few gaps also blame the wrong cause. My corrections are small, and they all stay within ±1 of the critics' mean.

## Category by category

### Characters (A 4.5, B 4.5; proposed 4.5)

**Conceded:**
- **Black face.** `crops/high/R02-batter_head` has a black face, a slab earflap quad at the jaw and a shoulder shard. `crops/high/R02-batter_hands` shows the same shard.
- **Sawtooth trim.** It appears in `crops/high/R17-pitcher_hands`, `crops/high/R16-1B` and `crops/high/R12-pitcher`.
- **Torn umpire neckline.** It is visible in `crops/high/R05-ump_head`, along with mask bars that show skin-coloured gaps at the joints.
- **Slab gloves.** Finger nubs poke through the glove in `crops/high/R07-SS`.
- **Bald scalp.** It shows in `crops/high/R17-pitcher-back`.
- **Floating lettering.** I enlarged the wordmark in `crops/high/R07-SS` and `crops/high/R09-LF`. "LAK" is drawn over green grass, outside the torso silhouette. Critic B is right, and Critic A missed it: A only faulted the wordmark's height.

**Rebutted (B, factual):** B says three distinct body types are "not convincingly demonstrated". In fact `crops/high/R12-pitcher` is heavy-thighed and stocky, `crops/high/R17-pitcher-back` is slim and narrow-shouldered, and `crops/high/R16-1B` is in between. Three builds read clearly.

**Partly rebutted (A):**
- **Floating masks.** A says the catcher's mask floats too. In `crops/high/R06-catcher_glove` and `crops/high/R14-batter`, the catcher's cage hangs from the helmet rim. Only the umpire's mask stands off the face (`crops/high/R05-batter-front`).
- **The umpire's cap.** A calls the blot on it a "white decal". In `crops/high/R14-batter` it is tan, the skin colour. B's reading is the correct cause: the scalp pokes through the crown. That is a geometry fix, not a texture fix.
- **The umpire's "lumpy humps".** They match an inside chest protector, which is how real plate umpires look.

**Missed by both:** faces hold up when they aren't under a helmet in hard sun. `crops/high/R14-batter` shows eyes, nose, lips and a jawline under the helmet brim. `crops/high/R16-1B` and `crops/high/R12-pitcher` (at night) also read. The blackout is specific to dark skin under a helmet in daylight. It is not a general face failure.

None of this lifts the score. The figures are not "clean" (the 5 anchor) while shards, holes and floating text remain. 4.5 stands.

### Fidelity to reference (A 4.5, B 5; proposed 5.0)

**Conceded:** next to `art-src/samples/reference-renders/mpfb2_athlete_front.png`, the shoulders are inflated and the pant legs hide the knees (`crops/high/R12-pitcher`, `crops/high/R07-SS`). The grip is loose (`crops/high/R02-batter_hands`).

**Rebutted (A):** A pulls this score below 5 for the shards, holes and floating gear. Those are construction defects, and they are already charged under `characters`. The charfit anchor at 5 reads: "proportions roughly right. Silhouette recognisable, but faces, hands and garments are far simpler than the reference." That describes the captures exactly:
- front and side IoU of 0.843 and 0.851;
- LOD0 and LOD1 IoU of 0.976 or better at 60–360 px, so the silhouette holds at every game distance;
- faces with real features in `crops/high/R16-1B` and `crops/high/R14-batter`.

Charging the same defects in both categories double-counts them. I propose 5.0.

### Animation & game feel (A 4.5, B 5; proposed 5.0)

**Conceded:**
- **Frozen arms.** In `strips/high/R10` the arms hold open palms in all 8 panels. The same pose shows in `strips/high/R07` panels 1–4 and `crops/high/R09-LF`.
- **No glove reach.** In `strips/high/R07` panels 5–8 the shortstop holds one crouch. The ball is left of the glove in panel 7 and at the right foot in panel 8.
- **Floating feet.** Both soles float in `crops/high/R05-batter_feet`.
- **Oversized ball.** The close-up ball in `crops/high/R04-batter` is about 80% of the helmet's width. The fix claimed in the changes list does not show.

**Rebutted (A, missed evidence):** A says the R03 strip "ends before stride, release and follow-through, so weight transfer can't be confirmed." Two captures confirm it:
- `high/desktop/R06` shows the pitcher in a long stride, with the glove arm extended, the throwing arm high and the ball just released.
- `crops/high/R12-pitcher` shows a full stride with the lead foot planted and the throwing arm cocked overhead.

So the mocap delivery does reach stride and release.

**Partly rebutted (A):** A calls the bat path "chopping". The pitch in `crops/high/R04-batter` arrives at knee height, so a descending bat plane at contact in `strips/high/R04` panel 5 suits the location. Panels 1–8 show the stance, a front-knee load in panels 3–4, contact with a flash, rotation, and a finish over the shoulder.

**Rebutted (B):**
- **Abrupt pose change.** B blames the change between panels 4 and 5 of `strips/high/R07` on a missing blend. But the camera cuts at the same moment: the framing and outfield markers change. The pose pop is real, but the strip can't isolate it.
- **Ungrounded feet.** B describes "visibly ungrounded feet" as general. Only `crops/high/R05-batter_feet` shows it. The soles touch their shadows in `strips/high/R10` panels 1, 5 and 6, in `crops/high/R16-1B` and in `crops/high/R17-pitcher-back`.

**Missed by both:** the camera follows the ball through `strips/high/R08`, which is a feel item on the rubric's 7 anchor.

I propose 5.0. The pitch and swing are above 5, and fielding and running are below it.

### Environment (A 5.5, B 5; proposed 5.5)

**Conceded:**
- The bare grey backstop and a hard crowd-tile seam near x≈705 (`high/desktop/R05`, `high/desktop/R06`).
- Cone trees and a hard line between the photo backdrop and the geometry (`high/desktop/R10`, `high/desktop/R15`).
- The dugout is a black void (`crops/high/R14-batter`).

**Partly rebutted (A):**
- **Gaps in the crowd.** The "gaps" in `high/desktop/R17` are vertical posts between stand sections. They read as structure, not as a seam.
- **Fan scale.** "Fans' heads as large as the batter's" is overstated. In `high/desktop/R05` they are roughly 60% of the batter's helmet, though that is still too big for their depth.

**Missed by B:** these items show the frames are above the 5 anchor:
- turf with mow stripes and dirt with grain (`high/desktop/R13`);
- built light towers, foul poles and a scoreboard (`high/desktop/R02`);
- the historic park's wooden fence and "Alligator Farm" stand (`high/desktop/R15`).

5.5 stands.

### Lighting & atmosphere (A 5.5, B 5.5; proposed 6.0)

**Conceded:** the daylight face blackout (`crops/high/R02-batter_head`, luma 1.9/255) is the worst lighting failure in the loop.

**Rebutted (A, factual):** A says `high/desktop/R13` is "lit evenly edge to edge, with no tower pools or falloff". I measured the grass luma:

| Area | Luma |
|---|---|
| Infield | 131 |
| Centre-field grass near the wall | 67 |
| Left-field corner | 55 |
| Right field near the wall | 74 |

That is a falloff of about 2×. A's own acceptance test for G-night-pools ("infield at least 1.5× the corners") is already met. The towers in `high/desktop/R12` have glow halos.

**Missed by both:** these items reach toward the 7 anchor:
- soft contact shadows under players (`crops/high/R16-1B`, `crops/high/R17-pitcher-back`);
- helmet specular (`crops/high/R02-batter_head`);
- a warm golden grade (`high/desktop/R14`);
- night faces that read (`crops/high/R12-pitcher`).

I propose 6.0, within +0.5 of the mean.

### UI & typography (A 6, B 6; proposed 6.0)

**Conceded:**
- In `high/desktop/R01` the title panel is translucent and the selected "Season" button has low contrast.
- The static banner in `high/desktop/R15`.

**Partly rebutted (A):** A says the aim box "hides the catcher" (`high/desktop/R05`, `high/desktop/R06`). It is a thin outline, and the catcher and umpire stay visible through it. It also marks the pitch target, a core mechanic. It should still fade once the pitch is in flight. 6.0 stands.

### Readability (A 5.5, B 6; proposed 6.0)

**Conceded:** no runner is in frame in `high/desktop/R10` or `high/mobile/R10`. The runner sits at the edge in `high/desktop/R16`. The figures are tiny in `strips/high/R08`.

**Rebutted (B):** B says the rings are too alike to show who has the ball. In fact:
- the fielder holding the ball gets a white ring (`strips/high/R07` panel 8);
- the batter-runner gets a yellow ring (`high/mobile/R07`).

**Missed by A:** in `high/desktop/R16` the HUD's base diamond lights first base, so runner state reads even though the figure is cropped. The ball trail reads in `high/desktop/R06`. I propose 6.0.

### Mobile (A 5.5, B 6; proposed 6.0)

**Conceded:**
- The landscape HUD bars take about 35% of the height (`high/landscape/R05`, `high/landscape/R07`).
- Desktop key hints show in landscape (`high/landscape/R05`).
- The runner is missing in `high/mobile/R10`.
- The pitcher is cropped at the left edge in `high/mobile/R05`.

**Rebutted (A, factual):**
- **Sky in portrait.** A says sky is "about 40%" of `high/mobile/R02`. Measured, sky runs from y≈165 to ≈525 of a 3D area from 165 to 1495, which is about 27%.
- **Hint pill.** In `high/landscape/R05` the pill ends at x≈650 and the pitcher's legs start at about x≈665. It does not cover him. The control bar cuts his feet.

**Rebutted (B, partly):** "Replace desktop-key hints on phones" applies only to landscape. Portrait `high/mobile/R02` and `high/mobile/R05` already show no key hints, and their buttons are large. The phone proxy holds 47 fps on medium and 79 fps on low. I propose 6.0.

## Gaps: merged, with adjusted severity and gain

Merges:
- **G-face-blackout** absorbs B's G-face-light-grounding. The face is scoped to dark skin under a helmet in daylight, and the feet go to G-contact-retargeting.
- **G-garment-integrity** absorbs A's G-jersey-construction.
- **G-anatomy-equipment** absorbs A's G-body-proportions.
- **G-action-framing** absorbs A's G-framing-runners.
- **G-crowd-park** absorbs A's G-backstop-crowd.

Downgrades:
- **G-night-pools.** Its test is already met.
- **G-reticle-occlusion.** The catcher stays visible.
- **G-gear-attach.** Only the umpire's mask floats.
- **G-contact-retargeting.** Run arms, reach and swing are covered by their own gaps.

```json
{
  "loop": 2,
  "role": "advocate",
  "tier": "high",
  "verdict": "continue",
  "scores": {
    "characters": {
      "score": 4.5,
      "confidence": 0.85,
      "evidence": [
        {"shot": "crops/high/R02-batter_head", "note": "face luma 1.9/255, earflap quad, shoulder shard: conceded"},
        {"shot": "crops/high/R07-SS", "note": "LAKESIDE lettering drawn over grass outside the torso; finger nubs through glove"},
        {"shot": "crops/high/R14-batter", "note": "light-skinned batter's face reads under the helmet; catcher cage hangs from the helmet rim; tan scalp poke-through on the ump cap"},
        {"shot": "crops/high/R12-pitcher", "note": "stocky build; versus slim crops/high/R17-pitcher-back and medium crops/high/R16-1B: three builds"}
      ]
    },
    "charfit": {
      "score": 5.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "crops/high/R16-1B", "note": "proportions roughly right, readable face; simpler than mpfb2_athlete_front"},
        {"shot": "crops/high/R12-pitcher", "note": "inflated shoulders and hidden knees versus the reference; IoU 0.843/0.851, LOD IoU 0.976 or better at game distances"},
        {"shot": "crops/high/R02-batter_hands", "note": "separate fingers, loose grip versus hbm_male_realistic_hand"}
      ]
    },
    "animation": {
      "score": 5.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "strips/high/R04", "note": "stance, load in panels 3-4, contact flash, rotation, finish; low pitch explains the bat angle"},
        {"shot": "high/desktop/R06", "note": "pitcher in stride at release: mocap delivery reaches weight transfer"},
        {"shot": "strips/high/R07", "note": "SS holds a crouch while the ball passes; camera cut between panels 4 and 5"},
        {"shot": "strips/high/R10", "note": "legs cycle with planted soles; arms frozen with open palms"},
        {"shot": "strips/high/R08", "note": "camera follows the ball"}
      ]
    },
    "environment": {
      "score": 5.5,
      "confidence": 0.75,
      "evidence": [
        {"shot": "high/desktop/R05", "note": "bare grey backstop; crowd tile seam near x=705"},
        {"shot": "high/desktop/R15", "note": "historic park dressing; hard photo-backdrop transition"},
        {"shot": "high/desktop/R13", "note": "mow stripes, grained dirt, built towers and poles"}
      ]
    },
    "lighting": {
      "score": 6.0,
      "confidence": 0.65,
      "evidence": [
        {"shot": "high/desktop/R13", "note": "measured night falloff: infield luma 131 vs outfield near the wall 55-74"},
        {"shot": "crops/high/R16-1B", "note": "soft contact shadows under planted feet"},
        {"shot": "high/desktop/R14", "note": "warm golden grade"},
        {"shot": "crops/high/R02-batter_head", "note": "daylight face blackout; helmet specular present"}
      ]
    },
    "ui": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "high/desktop/R02", "note": "clean score bug, count, base diamond, large buttons"},
        {"shot": "high/desktop/R01", "note": "translucent title panel, low-contrast selected Season"},
        {"shot": "high/desktop/R06", "note": "outline aim box stays during flight; catcher still visible through it"}
      ]
    },
    "readability": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R10", "note": "home-run trot moment has no runner in frame"},
        {"shot": "high/desktop/R16", "note": "runner at the edge, but the HUD diamond lights first base"},
        {"shot": "strips/high/R07", "note": "white ring marks the fielder with the ball in panel 8"},
        {"shot": "high/desktop/R06", "note": "ball trail and zone read"}
      ]
    },
    "mobile": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/mobile/R02", "note": "sky about 27% of the 3D area, not 40%; no key hints; large buttons"},
        {"shot": "high/landscape/R05", "note": "HUD bars about 35% of height; desktop hint pill shown but clear of the pitcher"},
        {"shot": "high/mobile/R10", "note": "runner not in frame"},
        {"shot": "high/mobile/R07", "note": "tiny figures; yellow runner ring distinct"}
      ]
    }
  },
  "gaps": [
    {"id": "G-face-blackout", "category": "characters", "expectedGain": 0.5, "severity": 5, "effort": "S", "workstream": "WS3", "evidence": ["crops/high/R02-batter_head", "crops/high/R02-batter_hands", "crops/high/R14-batter"], "benchmark": "smb3-3", "fix": "Merged with critic-codex G-face-light-grounding. The failure is specific to dark skin under a helmet in daylight (night and light-skinned faces read in crops/high/R12-pitcher and R14-batter). Add a face fill or luminance floor for skin under helmets plus eye specular. Test: mean face luma at least 40/255 with eyes, nose and mouth distinguishable in crops/high/R02-batter_head. Also +0.5 lighting."},
    {"id": "G-garment-integrity", "category": "characters", "expectedGain": 1.0, "severity": 5, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R07-SS", "crops/high/R09-LF", "crops/high/R17-pitcher_hands", "crops/high/R05-ump_head"], "benchmark": "smb4-4", "fix": "Merged with critic-claude G-jersey-construction. Project the wordmark onto the jersey surface (it currently floats outside the silhouette), move it to chest height, smooth the neckline with a modelled trim band, close the umpire's neckline, remove the shoulder shard, hide chest detail under an offset shell, add a placket. Test: no lettering outside the cloth, no sawtooth, no skin breakthrough in the cited crops."},
    {"id": "G-gear-attach", "category": "characters", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R05-batter-front", "crops/high/R05-ump_head", "crops/high/R14-batter"], "fix": "Severity lowered: only the umpire's mask stands off the face (the catcher's cage hangs from the helmet rim in crops/high/R06-catcher_glove). Parent the umpire's mask to the head with straps, weld the bar segments, fix the scalp poke-through on the umpire's cap crown (a tan blot, not a decal), replace the batter's earflap quad."},
    {"id": "G-glove-model", "category": "characters", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R07-SS", "crops/high/R06-catcher_glove"], "benchmark": "smb3-3", "fix": "Glove with finger stalls, web and pocket enclosing the fingers (nubs currently poke through), leather normal map; padded catcher's mitt with a rim."},
    {"id": "G-anatomy-equipment", "category": "charfit", "expectedGain": 0.5, "severity": 4, "effort": "L", "workstream": "WS1", "evidence": ["crops/high/R12-pitcher", "crops/high/R16-1B", "crops/high/R17-pitcher-back"], "benchmark": "art-src/samples/reference-renders/mpfb2_athlete_front.png", "fix": "Merged with critic-claude G-body-proportions. Gain lowered to 0.5: the silhouette already holds at game distances (LOD IoU 0.976 or better) and garment defects are charged under characters. Trim shoulder and torso girth toward MPFB2, add knee and calf structure under tapered pants, add hair under caps. Test: front IoU at least 0.90; no bald scalp in crops/high/R17-pitcher-back."},
    {"id": "G-run-arms", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS2", "evidence": ["strips/high/R10", "strips/high/R07", "crops/high/R09-LF"], "fix": "Let the mocap run's arm tracks drive the arms in run and trot, with loose fists; glove carry as an additive layer. Test: hands alternate front to back by at least 25 cm across strips/high/R10."},
    {"id": "G-fielding-reach", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["strips/high/R07", "crops/high/R09-LF"], "fix": "Glove-hand IK to the predicted ball over the last 0.3 s, plus scoop and overhead-catch clips. Test: glove meets the ball in strips/high/R07 panels 5-8."},
    {"id": "G-swing-timing", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["crops/high/R04-batter", "strips/high/R04"], "fix": "Cause narrowed: the bat angle at contact suits the knee-high pitch, so the main defect is the close-up ball (still about 80% of helmet width despite the claimed fix) and a late stride. Clamp the close-up ball to its true diameter; make the stride visible by panel 3. Test: ball at most 33% of helmet width in crops/high/R04-batter."},
    {"id": "G-contact-retargeting", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["crops/high/R05-batter_feet", "crops/high/R02-batter_hands"], "benchmark": "benchmarks/smb4-2.png", "fix": "Narrowed to bat grip and stance ground height (run arms, reach and swing timing have their own gaps; soles are grounded in strips/high/R10 and crops/high/R16-1B). Constrain both hands to the handle; correct the bat_stance root height. Test: soles touch their shadows in crops/high/R05-batter_feet."},
    {"id": "G-crowd-park", "category": "environment", "expectedGain": 0.75, "severity": 3, "effort": "M", "workstream": "WS4", "evidence": ["high/desktop/R05", "high/desktop/R06", "high/desktop/R15"], "benchmark": "smb3-1", "fix": "Merged with critic-claude G-backstop-crowd. Padded backstop with netting and signage; offset or mirrored crowd tiles to remove the seam near x=705; blend the photo backdrop into the geometry; dress the dugout opening. Test: no vertical seam in high/desktop/R05; at least 3 backstop materials."},
    {"id": "G-night-pools", "category": "lighting", "expectedGain": 0.25, "severity": 2, "effort": "M", "workstream": "WS3", "evidence": ["high/desktop/R13", "high/desktop/R12"], "benchmark": "smb4-1", "fix": "Downgraded: measured falloff is already about 2x (infield 131 vs outfield 55-74), so the 1.5x test passes. What remains is haze cones at the towers and stronger pools near the warning track."},
    {"id": "G-action-framing", "category": "readability", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS5", "evidence": ["high/desktop/R10", "high/mobile/R10", "high/desktop/R16"], "benchmark": "benchmarks/smb3-1.png", "fix": "Merged with critic-claude G-framing-runners. The home-run trot camera follows the batter-runner; the batting camera keeps the lead runner at least 5% inside the frame. Possession is already marked by a white ring (strips/high/R07 panel 8). Test: runner fully visible in R10 desktop and mobile and in R16. Also +0.5 mobile."},
    {"id": "G-reticle-occlusion", "category": "ui", "expectedGain": 0.25, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R06", "high/desktop/R01"], "fix": "Gain lowered: the outline box doesn't hide the catcher. Fade it to corner ticks in flight; give the title panel an opaque backing and a high-contrast selected state (Season at least 4.5:1)."},
    {"id": "G-mobile-interface", "category": "mobile", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["high/landscape/R05", "high/landscape/R07", "high/mobile/R05"], "benchmark": "benchmarks/ootp26-1.png", "fix": "Scope narrowed: portrait already hides key hints. Cut the landscape HUD bars from about 35% of height, drop the desktop hint pill in landscape, keep the foreground pitcher uncropped in high/mobile/R05."}
  ],
  "calibration": {
    "notes": "Every proposed score is within ±1 of the critic mean. Measurements: R02 face luma 1.9/255; R13 grass luma 131 (infield) vs 55-74 (outfield near the wall); mobile R02 sky about 27% of the 3D area."
  }
}
```
