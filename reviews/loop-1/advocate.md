# Advocate: loop 1, high tier

All capture paths are relative to `screenshots/review-loop-1/`. Critic means: characters 4.75, charfit 5.25, animation 4.75, environment 5.0, lighting 5.25, ui 6.25, readability 5.5, mobile 5.75.

## Summary

The critics mostly agree, and most of what they say holds up in the captures. The v3 gear really is crude: the cap reads as a bucket hat, the helmets have faceted spec, the necklines are sawtooth, the gloves are wedges, the mask cages float and the shoes look like clogs. The crowd behind home is a scale bug. I concede all of that. I rebut three things:

1. **Both critics blame the faces on the wrong cause.** The faces are not "obscured" across the board. They fail only on dark skin under a black helmet in backlit camera angles. Light and medium faces under caps show eyes, brows, nose and lips. That makes it a fill and exposure problem (WS3), not a model fidelity problem.
2. **Each critic misreads foot grounding in different captures.** Claude credits shadows meeting the feet in the one crop where they don't. Codex calls feet floating in crops where the soles sit on their shadows.
3. **Several animation complaints come from the capture, not the clips.** A camera cut falls inside the R07 strip, the R03 strip ends at release, and the "huge ball" is ball scale, not a pose problem.

## Category by category

### Characters: critics 5.0 / 4.5, I propose 5.0

- **Concede.** The gear is crude, as both critics say. In `crops/high/R02-batter_head` the helmet shows a checkerboard per-quad highlight and a slab ear flap. The glove in `crops/high/R17-pitcher_hands` is a featureless brown paddle, and so is the catcher's mitt in `crops/high/R06-catcher_glove`, where the shin guards also flare into petals. The mask cages in `crops/high/R05-batter-front` and `crops/high/R14-batter` are ladders floating 3 to 4 inches ahead of the face. The shoes in `crops/high/R05-batter_feet` are laceless clogs.
- **Concede.** The sawtooth neckline is in every jersey crop I opened: `R17-pitcher_hands`, `R09-LF`, `R16-1B` and `R14-batter`.
- **Concede, and Claude undersold the cap.** In `crops/high/R16-1B` and `crops/high/R09-LF` the brim runs all the way round the crown, so it reads as a bucket hat, not a ball cap.
- **Concede, and Codex missed it.** The back numbers are mirrored on the catcher: "23" in `crops/high/R05-batter-front` and the number in `crops/high/R14-batter`. The pitcher's "27" is mirrored too, in `high/mobile/R05`.
- **Rebut Codex: "detached lettering, back numbers visibly stand away from the garment".** In `crops/high/R05-batter-front` and `crops/high/R14-batter` the catcher's number lies flat on the jersey back. What's wrong is that it's mirrored, not that it stands off. The chest wordmark "HOT SPRINGS" does run to the jersey edge at the sleeve. That's a minor overhang.
- **Rebut both: "faces unreadable or obscured" as a blanket claim.** Several crops show readable faces with real features:
  - `crops/high/R09-LF` and `crops/high/R16-1B`: medium-skin faces with brows, eyes, nose and closed lips.
  - `crops/high/R05-batter-front` and `crops/high/R14-batter`: the umpire's face has a modelled ear, nose and lips.
  - `crops/high/R14-batter`: under golden light, even the darker-skinned batter shows his nose, ear and lips.

  So the 7-anchor test, a face with real features that holds up in close-ups, is met on most players. It fails in specific lighting.
- **Rebut Codex: "below the clean 5 anchor".** The 5 anchor asks for separate fingers or a modelled glove, a readable cap and helmet, and color-block uniforms. The fingers clearly pass: `crops/high/R17-pitcher_hands` shows a curled five-finger hand. So do the uniforms. The anatomy, with readable shoulder, hip and knee, sits above 5 (`crops/high/R16-1B`, `crops/high/R09-LF`). The gear sits below it. On balance that's 5, not 4.5.
- **Concede body variety.** I can't find a visibly stocky build in any crop.

### Charfit: critics 5.5 / 5.0, I propose 5.5

- **Concede.** The garments are far simpler than `si_jersey_three_quarter`. Compare `crops/high/R07-SS` and `crops/high/R12-pitcher`: no placket, collar or folds.
- **Rebut Codex on proportions.** Against `art-src/samples/reference-renders/mpfb2_athlete_three_quarter.png`, `crops/high/R17-pitcher-back` and `crops/high/R16-1B` have the same head-to-height ratio, shoulder width and limb lengths. Codex is right that the 0.84–0.85 IoU is only rough agreement. But the brief's per-distance rows (0.976–0.997 against LOD0 at 60, 140 and 360 px) show the silhouette holding at every game distance, which is the second half of the 7 anchor. Codex dismissed those rows only because they don't measure reference fidelity directly.
- **Rebut Codex: faces and hands are "far below the reference".** The face in `crops/high/R09-LF` is recognisably the MakeHuman face from `mpfb2_athlete_face_34`: the same brow, nose and lip structure, with no hair and lower texture detail. The hand in `crops/high/R17-pitcher_hands` is the same kind of hand as `mpfb2_athlete_hand`. The loss is real only for dark faces under helmets, which is lighting (see below).

### Animation: critics 5.0 / 4.5, I propose 5.0

- **Concede the levitation.** In `strips/high/R03` frames 4–6 the support foot leaves the rubber and the shadow separates from it. In frames 1–2 the pitcher's feet are planted to either side of the rubber.
- **Concede the freeze.** In `strips/high/R07` frames 5–8 the crouch is identical and the glove never goes to the ball.
- **Rebut Codex on R07: "abrupt transition from run to scoop with little braking".** The camera cuts between frames 4 and 5: the framing and the HUD scoreboard position both change. A camera cut can't show braking, so the transition can't be judged from this strip.
- **Rebut the cause of Claude's "huge white ball" in R07 frames 7–8.** The same oversized ball appears in `crops/high/R04-batter`. There it sits beside the batter's back foot and is more than half the length of his shoe. That points to ball scale, not lens proximity and not a character-animation defect.
- **Rebut Codex on R10: "floaty running".** In `strips/high/R10` frames 1, 4, 5, 7 and 8 the contact sole sits on its shadow. Frame 3 is a normal flight phase, and the arms counter-swing.
- **Rebut Codex on R03: "incomplete delivery".** The strip ends at release. Frame 8 shows a long stride with the arm at high extension. That's where the capture window stops, so it should count neither for nor against the clip.
- **Partially rebut Codex on R04: "impact flash spatially separated".** In `strips/high/R04` frame 5 the bloom is centred just below the barrel, a ball-width or two from the ball, and stays in place in world space through frame 6. It reads as contact.
- **Partially rebut Claude on the late swing.** `crops/high/R04-batter` is one frozen tick taken before contact. The strip shows the bat meeting the ball in front of the plate at frame 5.
- **Credit missing from Codex.** `strips/high/R04` has load, stride, rotation and finish, with the back heel rising. That is real weight transfer.

The levitation and the freeze cap this at the 5 anchor. The swing and the trot keep it from falling below.

### Environment: both 5.0, I propose 5.0

- **Concede the crowd.** In `high/desktop/R05` the crowd heads are bigger than the batter, which is the worst scale bug in the build. `high/desktop/R01` has grey box stands and cone or blob trees.
- **Rebut Claude: "no dugouts".** A dugout opening is visible at left in `crops/high/R14-batter`. `high/desktop/R15` has the "Alligator Farm" sign, a wooden wall and the building.
- **Credit.** `high/desktop/R07` has mow checker and grained dirt, plus built towers, poles and distance markers.

The score stands.

### Lighting: critics 5.5 / 5.0, I propose 5.0

- **Plain error by Claude.** Claude cites `crops/high/R05-batter_feet` as proof that "shadows meet the feet". Both shoes visibly hover above shadows that are offset from them. Claude's own defect #21 flags the same hover, so the review contradicts itself. Codex is right here.
- **Rebut Codex: "R17 pitcher suspended above the mound".** In `crops/high/R17-pitcher-back` the front shoe rests on the rubber and the cast shadow joins both soles. `crops/high/R16-1B` and `crops/high/R09-LF` are grounded too. So grounding works in most poses and fails in the batting stance.
- **Concede the dark faces.** In `crops/high/R02-batter_head` and `crops/high/R06-catcher_glove` the dark faces under helmets are crushed to black. This is the real cause of the face complaints, and the rubric's 7 asks for "sky light and bounce that model the faces".
- **Partially rebut Claude: night "lit as evenly as day".** `high/desktop/R13` does darken toward the left-field foul corner and the stands. But Claude is right that there are no distinct pools and no multiple shadows.
- **Credit.** The golden grade in `high/desktop/R14` and `high/desktop/R15` is pleasant, and the batter in `high/desktop/R12` is well modelled by the night key.

### UI: critics 6.0 / 6.5, I propose 6.0

- **Concede both critics' points.**
  - `high/desktop/R15`: the HR banner is legible (Codex) but has no panel (Claude).
  - `high/desktop/R10`: no banner during the trot.
  - `high/desktop/R01`: field lines show through the translucent title panel (Codex is correct).
  - `high/landscape/R05`: keeps desktop instructions such as "arrows/mouse" (correct).
- **Credit.** The score bug, count pips, base diamond and the "FB 77 mph" readout (`high/desktop/R07`) are consistent and clean.

### Readability: both 5.5, I propose 5.5

- **Concede.**
  - `high/desktop/R16`: the 1B runner and the first baseman are clipped at the right edge.
  - `high/desktop/R12`: no ball can be found.
  - `high/desktop/R07` and `high/desktop/R10`: fielders are about 15 px tall.
- **Credit neither critic gave.** `high/desktop/R13` shows the fly ball together with its ground shadow on the outfield grass. In `high/desktop/R07` the batter-runner wears a distinct yellow ring, and the ball is visible on the infield. Codex's possession point stands, because no fielder holds the ball in R07.

### Mobile: critics 5.5 / 6.0, I propose 6.0

- **Concede landscape.** In `high/landscape/R05` the HUD and the button bar take about 34% of the height, and the info line is dropped.
- **Rebut Claude's "pitcher half cut off" as a defect in itself.** `high/mobile/R05` is a deliberate over-the-shoulder foreground. The pitcher's number, glove side and cap are in frame, and batter, catcher, umpire and the target all read at a comfortable size.
- **Credit.** `high/mobile/R02` frames the batter, zone and pitcher well, with big thumb buttons. Codex's "excessive sky" amounts to about 21% of the screen. The perf proxy passes at a 45 fps minimum.

Three of the four 7-anchor conditions are mostly met. The small wide-camera figures in `high/mobile/R07` and the landscape compression hold it at 6.

## Gap adjustments (merges noted)

| Gap | Change | Reason |
|---|---|---|
| G-face-fill | Absorbs the face half of G-reference-face-hands and the fill half of G-light-and-grounding | The cause is WS3, as Claude said. Evidence: faces read in `crops/high/R09-LF` and `R16-1B` |
| G-reference-face-hands | Severity 4 → 2, gain 1.0 → 0.3 | The hands match the reference (`crops/high/R17-pitcher_hands`); the face loss is lighting |
| G-light-and-grounding | Narrowed to the batting-stance hover. Gain 1.0 → 0.3, workstream WS2 | Grounding holds in `R17-pitcher-back`, `R16-1B` and `R09-LF` |
| G-support-and-contact | Merged into G-pitch-levitation and G-fielding-freeze | The contact-alignment part is rebutted (`strips/high/R04` frame 5). The R07 braking part comes from the camera cut |
| G-baseball-equipment | Merged into G-glove-mask-gear | Duplicate |
| G-uniform-construction | Merged into G-garment-construction. Gain 1.5 → 0.5 | Necklines and numbers are tracked as separate S gaps |
| G-neckline-clip | Gain 0.3 → 0.5 | Present in every jersey crop |
| G-crowd-and-park | Split between G-crowd-scale and G-stands-trees | Duplicate |
| G-action-framing | Merged into G-wide-cam-scale, gain 0.75 | Duplicate |
| G-mobile-landscape | Merged into G-phone-layout, gain 0.5 | Duplicate |

```json
{
  "loop": 1,
  "role": "advocate",
  "tier": "high",
  "verdict": "continue",
  "scores": {
    "characters": {
      "score": 5.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "crops/high/R09-LF", "note": "medium-skin face with brows, eyes, nose, lips; readable knee/hip structure; bucket-hat cap and sawtooth neckline"},
        {"shot": "crops/high/R16-1B", "note": "readable face and athletic crouch; cap brim all round; wedge glove"},
        {"shot": "crops/high/R17-pitcher_hands", "note": "five curled fingers pass the 5 anchor; paddle glove, sawtooth neck"},
        {"shot": "crops/high/R05-batter-front", "note": "umpire face modelled; floating mask cages; mirrored catcher number"},
        {"shot": "crops/high/R02-batter_head", "note": "faceted helmet spec, slab ear flap"}
      ]
    },
    "charfit": {
      "score": 5.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "crops/high/R17-pitcher-back", "note": "proportions match mpfb2_athlete_three_quarter"},
        {"shot": "crops/high/R09-LF", "note": "same MakeHuman face family as mpfb2_athlete_face_34, less detail"},
        {"shot": "crops/high/R07-SS", "note": "garments far simpler than si_jersey_three_quarter"},
        {"shot": "crops/high/R17-pitcher_hands", "note": "same kind of hand as mpfb2_athlete_hand"}
      ]
    },
    "animation": {
      "score": 5.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "strips/high/R04", "note": "load, stride, rotation, heel lift, contact bloom at the bat in frame 5"},
        {"shot": "strips/high/R10", "note": "contact soles on shadows in frames 1, 4, 5, 7, 8; arms counter-swing"},
        {"shot": "strips/high/R03", "note": "support foot leaves the rubber in frames 4-6; strip ends at release"},
        {"shot": "strips/high/R07", "note": "camera cut between frames 4 and 5; crouch frozen in frames 5-8"}
      ]
    },
    "environment": {
      "score": 5.0,
      "confidence": 0.8,
      "evidence": [
        {"shot": "high/desktop/R05", "note": "crowd photo at several times human scale"},
        {"shot": "high/desktop/R07", "note": "mow checker, grained dirt, built towers and poles"},
        {"shot": "crops/high/R14-batter", "note": "dugout opening visible, contrary to 'no dugouts'"},
        {"shot": "high/desktop/R01", "note": "grey box stands, cone and blob trees"}
      ]
    },
    "lighting": {
      "score": 5.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "crops/high/R05-batter_feet", "note": "both shoes hover above offset shadows; Claude cited this as grounded"},
        {"shot": "crops/high/R17-pitcher-back", "note": "front shoe on the rubber, shadow joins the soles"},
        {"shot": "crops/high/R02-batter_head", "note": "dark face under helmet crushed to black: missing fill"},
        {"shot": "high/desktop/R13", "note": "some falloff toward the foul corner, no tower pools"},
        {"shot": "high/desktop/R14", "note": "pleasant golden grade"}
      ]
    },
    "ui": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R07", "note": "clean score bug, count pips, pitch-speed readout"},
        {"shot": "high/desktop/R15", "note": "legible HR banner without panel or hierarchy"},
        {"shot": "high/desktop/R01", "note": "translucent title panel lets field lines through"},
        {"shot": "high/landscape/R05", "note": "desktop instructions kept, info line dropped"}
      ]
    },
    "readability": {
      "score": 5.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R13", "note": "fly ball and its ground shadow both visible"},
        {"shot": "high/desktop/R07", "note": "ball on the infield and yellow runner ring read; fielders about 15 px"},
        {"shot": "high/desktop/R16", "note": "1B runner and fielder clipped at the right edge"},
        {"shot": "high/desktop/R12", "note": "ball not findable"}
      ]
    },
    "mobile": {
      "score": 6.0,
      "confidence": 0.65,
      "evidence": [
        {"shot": "high/mobile/R02", "note": "intentional portrait batting framing, big thumb buttons"},
        {"shot": "high/mobile/R05", "note": "deliberate over-the-shoulder foreground; battery and target read well"},
        {"shot": "high/landscape/R05", "note": "HUD and buttons take about 34% of the height"},
        {"shot": "high/mobile/R07", "note": "small field figures"}
      ]
    }
  },
  "gaps": [
    {"id": "G-face-fill", "category": "characters", "expectedGain": 0.5, "severity": 5, "effort": "S", "workstream": "WS3", "evidence": ["crops/high/R02-batter_head", "crops/high/R06-catcher_glove", "crops/high/R09-LF"], "benchmark": "smb4-4", "fix": "Merges the face half of G-reference-face-hands and the fill half of G-light-and-grounding. Add hemisphere/sky fill plus a camera-side rim, or a skin ambient floor, so dark faces under helmets show eyes and brows; mean face luminance at least 35/255 in the R02 head crop. Also lifts lighting and charfit."},
    {"id": "G-crowd-scale", "category": "environment", "expectedGain": 1.0, "severity": 5, "effort": "M", "workstream": "WS4", "evidence": ["high/desktop/R05", "high/mobile/R05", "high/desktop/R17"], "benchmark": "smb3-1", "fix": "Merges the crowd half of G-crowd-and-park. Rescale the backstop crowd to life size (head about 0.75 ft) or use tiered instanced or impostor fans; crowd heads smaller than the catcher's helmet in R05."},
    {"id": "G-helmet-cap-mesh", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R02-batter_head", "crops/high/R16-1B", "crops/high/R09-LF"], "benchmark": "smb4-2", "fix": "Smooth-shaded, higher-segment helmet with a jaw-following ear flap; cap crown lowered onto the skull with the bill only at the front (no all-round brim)."},
    {"id": "G-neckline-clip", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R09-LF", "crops/high/R16-1B", "crops/high/R14-batter"], "fix": "Model a collar band and hide or shrink the body faces under the garment; no skin triangles at the neckline in any close-up."},
    {"id": "G-mirrored-numbers", "category": "characters", "expectedGain": 0.3, "severity": 4, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R05-batter-front", "crops/high/R14-batter", "high/mobile/R05", "crops/high/R17-pitcher-back"], "benchmark": "smb4-4", "fix": "Flip the v3 back-number decal U and give every player a number; '27' and '23' read correctly."},
    {"id": "G-glove-mask-gear", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R06-catcher_glove", "crops/high/R05-batter-front", "crops/high/R05-batter_feet"], "benchmark": "smb3-3", "fix": "Merges G-baseball-equipment. Glove with finger stalls, web and pocket; mask frame with chin cup and straps touching the face; plated chest protector and knee-capped shin guards; laced cleats."},
    {"id": "G-garment-construction", "category": "charfit", "expectedGain": 0.5, "severity": 4, "effort": "L", "workstream": "WS1", "evidence": ["crops/high/R07-SS", "crops/high/R12-pitcher", "crops/high/R14-batter"], "benchmark": "si_jersey_three_quarter", "fix": "Merges G-uniform-construction; neckline and numbers are split out. Placket and buttons, collar and sleeve piping, wrinkle normal map, belt loops and buckle, finished cuffs, stirrup cut-outs."},
    {"id": "G-pitch-levitation", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS2", "evidence": ["strips/high/R03", "crops/high/R02-pitcher"], "benchmark": "smb4-2", "fix": "Absorbs the support part of G-support-and-contact (its contact-alignment claim is rebutted by strips/high/R04 frame 5). Pin the pivot foot to the rubber top through the leg lift and start the set on the rubber; sole within 0.05 ft of the rubber in R03 frames 3-6."},
    {"id": "G-fielding-freeze", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["strips/high/R07", "crops/high/R09-LF"], "fix": "Blend the crouch into a glove reach to the ball, transfer and throw; capture R07 without a camera cut so braking can be judged; show the glove at the ball in R09."},
    {"id": "G-light-and-grounding", "category": "lighting", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS2", "evidence": ["crops/high/R05-batter_feet", "crops/high/R17-pitcher-back"], "benchmark": "smb3-3", "fix": "Narrowed to the batting-stance hover; fill moved to G-face-fill. Apply foot grounding to the batting stance clip so both soles meet their shadows in R05-batter_feet."},
    {"id": "G-reference-face-hands", "category": "charfit", "expectedGain": 0.3, "severity": 2, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R09-LF"], "benchmark": "mpfb2_athlete_face_34; mpfb2_athlete_hand", "fix": "Face loss is lighting (G-face-fill); what remains is skin and finger detail at close range. Keep the 2048 skin maps on LOD0 and check knuckle and nail definition at 360 px."},
    {"id": "G-night-light", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["high/desktop/R13", "high/desktop/R12"], "benchmark": "smb4-1", "fix": "Lower night ambient, add tower light pools with falloff to the corners and multiple soft player shadows."},
    {"id": "G-wide-cam-scale", "category": "readability", "expectedGain": 0.75, "severity": 4, "effort": "M", "workstream": "WS5", "evidence": ["high/desktop/R07", "high/desktop/R16", "high/mobile/R07", "high/desktop/R12"], "benchmark": "smb3-1", "fix": "Merges G-action-framing. Ball- and fielder-following cameras (players at least 40 px desktop, 30 px mobile), keep the R16 1B runner in frame, possession cue on the fielder with the ball, ball findable in R12."},
    {"id": "G-result-banners", "category": "ui", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R15", "high/desktop/R10"], "benchmark": "smb3-1", "fix": "Panelled result banner with hierarchy and entry motion, kept up through the HR trot."},
    {"id": "G-ui-hierarchy", "category": "ui", "expectedGain": 0.3, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R01", "high/landscape/R05"], "benchmark": "ootp26-1", "fix": "Opaque title panel and touch-specific instruction text on phones."},
    {"id": "G-stands-trees", "category": "environment", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS4", "evidence": ["high/desktop/R01", "high/desktop/R10"], "benchmark": "smb4-3", "fix": "Merges the park half of G-crowd-and-park. Stands with seat rows, railings and roofs; dugouts at every park; wall signage; card or impostor trees in place of cones."},
    {"id": "G-phone-layout", "category": "mobile", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["high/landscape/R05", "high/mobile/R07", "high/mobile/R02"], "fix": "Merges G-mobile-landscape. Compact the landscape HUD so the 3D view is at least 75% of the height, restore the info line, use touch instructions, tighten portrait wide cameras."}
  ],
  "calibration": {
    "criticMeans": {"characters": 4.75, "charfit": 5.25, "animation": 4.75, "environment": 5.0, "lighting": 5.25, "ui": 6.25, "readability": 5.5, "mobile": 5.75},
    "factualErrors": [
      "critic-claude: crops/high/R05-batter_feet cited as shadows meeting the feet; both shoes hover (contradicts its own defect 21)",
      "critic-claude: 'no dugouts'; a dugout opening is visible in crops/high/R14-batter",
      "critic-codex: pitcher 'suspended above the mound' in crops/high/R17-pitcher-back; the front shoe sits on the rubber with its shadow joined",
      "critic-codex: back numbers 'stand away from the garment'; they lie flat but are mirrored, which Codex missed",
      "critic-codex: R07 'abrupt transition' judged across a camera cut between strip frames 4 and 5",
      "both: faces generalized as unreadable; R09-LF, R16-1B and the umpire in R14-batter show real features"
    ]
  }
}
```
