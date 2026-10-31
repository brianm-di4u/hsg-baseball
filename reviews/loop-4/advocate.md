# Advocate: loop 4, high tier

Critic means: characters 5.5, charfit 5.5, animation 5.25, environment 5.25, lighting 5.5, ui 6.25, readability 6.0, mobile 6.0.

I opened every capture cited below. Most of what both critics say is accurate. Three loop-4 claims fail in the captures: the cap clearance fix, the visible fabric normal map, and garble-free lettering. My rebuttals are narrower. Claude misreads two strips and the night sky. Some causes are misattributed (faces, foot grounding). A few Codex framing claims are overstated.

## Plainly wrong facts

1. **Claude, `strips/high/R04`, "frames 1–4 hold an identical stance … no load".** Wrong. Enlarged, frame 1 is upright with the hands high. In frames 2–3 the torso tips forward and the front knee flexes. In frame 4 the hands have dropped back beside the rear shoulder and the back leg has straightened. That is a coil. There is no stride or toe tap, so the gap is real, but it is smaller than stated.
2. **Claude, `strips/high/R07`, "frames 5–8 hold the same bent pose for four frames".** Wrong. Frames 5 and 6 match. In frame 7 the glove arm extends out and down toward the ball at the fielder's front left, a distinct reach key. The catch failure stands: in frame 8 the ball is at the right foot, outside the glove.
3. **Claude, `high/desktop/R12`, "night sky is flat black with no gradient … backdrop lit like dusk daylight".** Wrong. The sky runs from near-black at the top to navy at the ridge line. Both towers carry soft bloom halos, and the hills are graded a moonlit blue, not daylight. `high/landscape/R12` shows the same.
4. **Claude, `high/desktop/R13`, "puts fielders in dim patches".** Not borne out. All seven visible fielders read against lit turf with their rings and cast shadows. Only the area beyond the fence is dark.
5. **Codex, `high/mobile/R07`, "corner bases … fall outside the portrait crop".** Half wrong. Third base is clearly visible at the left of the infield dirt. First base is just off the right edge.
6. **Claude, "faces crushed to black under helmets and caps".** Overstated for caps. Capped faces are lit and featured in `crops/high/R09-LF`, `crops/high/R14-batter` and `crops/high/R12-pitcher`. The failure is specific to dark-skinned batters under the helmet brim (see Lighting).

## Characters: concede 5.5

Conceded:
- Skin shows through the cap crown on the maroon-capped pitcher (`crops/high/R17-pitcher-back`) and on the umpire (`crops/high/R05-batter-front`, `crops/high/R14-batter`). It is visible at frame size in `high/desktop/R14`. This directly contradicts the loop's clearance change, so severity 5 is right.
- The glove is a flat paddle with a skin-coloured fingertip poking through its back (`crops/high/R17-pitcher_hands`). That contradicts the "hand closes fully inside" claim.
- "LAKE HAMII TON" is garbled, the placket wobbles, and there are faint chest bulges (`crops/high/R17-pitcher_hands`).
- Sawtooth trim edges appear at the collar (`crops/high/R02-batter_head`) and the sock top (`crops/high/R12-pitcher`, lower left).
- The cleat stripe is pixel-stepped (`crops/high/R05-batter_feet`).
- The masks float. In `crops/high/R06-catcher_glove` the catcher's bottom cage bar runs into the mitt.
- Jersey backs are blank (`crops/high/R17-pitcher-back`).
- I can't find a second build anywhere.
- Codex's lettering-projection claim holds: the "H" of "HOT SPRINGS" overhangs the torso edge in `crops/high/R02-batter_hands`.

Context the critics underweight:
- Lettering is not universally garbled. "BARNSTORMERS" in `crops/high/R14-batter` and "LAKESIDE" in `crops/high/R12-pitcher` are intact. So the defect depends on the wordmark and the pose, which makes it cheaper to fix.
- Hands grip the bat convincingly in `crops/high/R14-batter`.
- The cap crown is clean on the blue-capped players (`crops/high/R12-pitcher`, `crops/high/R09-LF`).

None of this lifts the score above 5.5, because the 7 anchor needs cloth folds, faces and three builds.

## Charfit: concede 5.5

Proportions match the references. Limb and head scale in `crops/high/R09-LF` and `crops/high/R16-1B` line up with `mpfb2_athlete_three_quarter`, consistent with the 0.875/0.901 IoU. Faces and garments are far simpler than `mpfb2_athlete_face_34` and `si_jersey_front`. I concede the boxy shoulders in `crops/high/R02-pitcher`.

Codex's +1.0 on G-reference-definition is overstated. Hands are already "the same kind of hand" (`crops/high/R14-batter`, `crops/high/R02-batter_hands`), so the remaining work is faces and builds.

Low-tier drift (`low/desktop/R02`) is real but doesn't touch the high-tier score.

## Animation: rebut to 5.5 (mean 5.25)

Conceded:
- `strips/high/R03` ends at the balance point, a high knee with the glove up, before release.
- The trot arms in `strips/high/R10` stay at the chest in all 8 frames.
- There is no catch beat in `strips/high/R07`.
- The tray-style glove carry shows in `crops/high/R09-LF`.

Rebutted:
- The R04 coil and the R07 reach key both exist (see "Plainly wrong facts" 1–2).
- Claude's "pop between 3 and 4" in `strips/high/R10` is a normal phase change between a crossover and full extension. The feet are planted on the ring in both frames.
- `crops/high/R12-pitcher` shows a full stride with a bent front knee, the pivot foot on the rubber and the throwing arm cocked high. That is a real weight-transfer pose, and it answers Codex's "cannot substantiate a complete delivery".
- `strips/high/R04` frames 5–8 show the contact flash, hip and shoulder rotation and a finish.
- Codex's "abrupt 4→5" transition in `strips/high/R07` happens at a camera reframe: the fence markers and scoreboard shift between frames 4 and 5. So it is not clean evidence of a missing blend.

That is the 5 anchor with clear beats in the pitch and swing, so 5.5.

## Environment: rebut to 5.5 (mean 5.25)

Conceded:
- The photo crowd is oversized (`high/desktop/R05`, `high/desktop/R14`).
- The trees are cones (`high/desktop/R15`).
- The near stands are grey blocks (`high/desktop/R01`).
- The pitching rubber is a raised slab (`crops/high/R12-pitcher`, `crops/high/R17-pitcher-back`).
- Codex's board overlap is a real bug: a white board cuts "GATOR F…TORS" in `crops/high/R02-batter_hands` and `crops/high/R17-pitcher-back`.

Context:
- `high/desktop/R07` has a mowed checkerboard, foul poles, towers and fielder rings with the full diamond legible.
- The sponsor boards in `high/desktop/R05` are crisp and legible.
- `crops/high/R14-batter` shows a real dugout opening in the old park.
- Backstop netting reads over the crowd in `crops/high/R02-batter_head`.
- The R15 "discs" are an adjoining practice-diamond shape (tan arc, grey circle). They are crude, but they are not stray geometry.

That is more built structure than the 5 anchor's painted-crowd-and-cones park, so 5.5.

## Lighting: rebut to 6.0 (mean 5.5)

Context:
- `high/desktop/R14` has a good golden-hour grade.
- `high/desktop/R12` and `high/landscape/R12` have a graded night sky with tower bloom.
- `high/desktop/R13` shows multiple player shadows under the towers.
- `high/desktop/R16` has a believable cloud sky.
- `crops/high/R12-pitcher` shows readable body modelling at night.

Concede: faces go black in `crops/high/R05-batter-front` and at frame size in `high/mobile/R02`. That is a real fill/bounce failure.

Cause challenge:
- `crops/high/R02-batter_head` is shot from rear three-quarter, with the face turned away. The companion `crops/high/R02-batter_hands` shows the same batter's nose, lips and chin.
- The defect is dark albedo plus brim occlusion. It is not global, and lit faces elsewhere prove a sky term exists.

Cause challenge 2: in `crops/high/R05-batter_feet` both shoes hover a visible shoe-height above the dirt, and the shadows sit where the soles should land. That is foot or root height in the pose, not shadow bias. It belongs to animation (WS2).

The 5 anchor is met, with grade and night work on top, so 6.0.

## UI: rebut to 6.5 (mean 6.25)

Conceded:
- The bottom shelf holds a single button on fielding views (`high/desktop/R07`).
- The count dots are small.
- `high/landscape/R12` drops the pitcher/batter line and the pitch-speed line.

Rebutted: the reticle over the catcher (`high/desktop/R05`, `high/desktop/R14`) is the pitch-location aim, placed on the target by design. It isn't clutter covering the action.

Context:
- `high/desktop/R10` and `high/desktop/R15` have HOME RUN / distance banners with clear hierarchy.
- `high/desktop/R12` shows pitch speed.
- The type scale is consistent across `high/desktop/R02`, `high/desktop/R16` (base diamond lit for the runner, out dot red) and the menu in `high/desktop/R01`.

6.5, matching Codex.

## Readability: concede 6.0

`high/desktop/R07` shows the ball (a white dot by the mound), the yellow-ringed runner and all four bases at once. But fielders are 15–20 px, and the identical blue rings don't mark which fielder has the ball. I concede three more:
- The runner at the edge in `high/desktop/R16`.
- The batter-runner hidden behind the control shelf in `high/desktop/R10`.
- First base off-frame in `high/mobile/R07`.

## Mobile: concede 6.0

Conceded:
- `high/mobile/R02` is a good portrait batting frame with large thumb buttons, though the batter's face reads black.
- `high/landscape/R05`: the HUD plus the shelf take about 35% of the height, and the pitcher's legs are cut.
- `high/mobile/R07` spends about 20% of the frame on foul dirt (Claude's 25% is slightly high).
- The phone proxy holds 62 fps minimum on medium under the 4× throttle.

## Gap adjustments

- I merged duplicates:
  - G-gear-fit into G-cap-crown-skin and G-glove-model.
  - G-cloth-folds-chest into G-garment-construction.
  - G-swing-load into G-weight-and-transitions.
  - G-play-framing into G-wide-cameras.
  - G-phone-hud into G-mobile-framing.
  - G-crowd-and-park-depth into G-env-dressing.
  - G-contact-shadows into a re-attributed grounding gap.
- Lowered gaps:
  - G-face-lighting to severity 4: failure limited to dark skin under helmets.
  - G-night-sky to severity 1: the sky is already graded.
  - G-weight-and-transitions to +0.5: Codex's +1.5 ignores the coil and the R12 stride.
  - G-garment-construction to +0.6.
  - G-reference-definition to +0.5.

```json
{
  "loop": 4,
  "role": "advocate",
  "tier": "high",
  "verdict": "continue",
  "scores": {
    "characters": { "score": 5.5, "confidence": 0.85, "evidence": [
      { "shot": "crops/high/R17-pitcher-back", "note": "skin through maroon cap crown; contradicts clearance change" },
      { "shot": "crops/high/R17-pitcher_hands", "note": "paddle glove with fingertip poke-through; garbled LAKE HAMII TON; wavy placket" },
      { "shot": "crops/high/R14-batter", "note": "lit featured face, fingers wrap bat, BARNSTORMERS intact; ump cap skin and floating mask" },
      { "shot": "crops/high/R12-pitcher", "note": "LAKESIDE intact, clean blue cap; sawtooth sock top" } ] },
    "charfit": { "score": 5.5, "confidence": 0.8, "evidence": [
      { "shot": "crops/high/R09-LF", "note": "proportions match mpfb2_athlete_three_quarter; face far simpler than mpfb2_athlete_face_34" },
      { "shot": "crops/high/R02-pitcher", "note": "boxy padded shoulders" },
      { "shot": "crops/high/R14-batter", "note": "hands same kind as hbm_male_realistic_hand" } ] },
    "animation": { "score": 5.5, "confidence": 0.7, "evidence": [
      { "shot": "strips/high/R04", "note": "frames 1-4 show a coil (lean, knee flex, hands back) but no stride; flash and rotation 5-8" },
      { "shot": "strips/high/R07", "note": "run reads; frame 7 reach key; no catch, ball ends at right foot" },
      { "shot": "strips/high/R03", "note": "set to high-knee balance point; ends before release" },
      { "shot": "crops/high/R12-pitcher", "note": "full stride, front knee bent, arm cocked" },
      { "shot": "strips/high/R10", "note": "legs plant and alternate; arms frozen at chest" } ] },
    "environment": { "score": 5.5, "confidence": 0.75, "evidence": [
      { "shot": "high/desktop/R07", "note": "mow checkerboard, poles, towers, legible diamond" },
      { "shot": "high/desktop/R05", "note": "crisp sponsor boards; oversized photo crowd" },
      { "shot": "crops/high/R14-batter", "note": "built dugout opening at old park" },
      { "shot": "crops/high/R02-batter_hands", "note": "overlapping sponsor boards bug" },
      { "shot": "high/desktop/R01", "note": "grey untextured near stands" } ] },
    "lighting": { "score": 6.0, "confidence": 0.65, "evidence": [
      { "shot": "high/desktop/R12", "note": "graded navy night sky with tower bloom, moonlit backdrop" },
      { "shot": "high/desktop/R14", "note": "golden-hour grade" },
      { "shot": "crops/high/R05-batter-front", "note": "dark-skinned batter's face black under helmet" },
      { "shot": "crops/high/R02-batter_hands", "note": "same batter's nose, lips, chin visible; rear 3/4 angle explains R02-batter_head" } ] },
    "ui": { "score": 6.5, "confidence": 0.7, "evidence": [
      { "shot": "high/desktop/R10", "note": "HOME RUN / 400 FT banner with hierarchy" },
      { "shot": "high/desktop/R16", "note": "base diamond and out dot update; consistent type" },
      { "shot": "high/landscape/R12", "note": "drops pitcher/batter and pitch-speed line" },
      { "shot": "high/desktop/R07", "note": "heavy shelf with one button on fielding view" } ] },
    "readability": { "score": 6.0, "confidence": 0.75, "evidence": [
      { "shot": "high/desktop/R07", "note": "ball, runner ring and all bases visible; fielders 15-20 px, no possession cue" },
      { "shot": "high/desktop/R16", "note": "runner at first at frame edge" },
      { "shot": "high/desktop/R10", "note": "batter-runner hidden behind shelf" },
      { "shot": "high/mobile/R07", "note": "third base visible, first base off-frame" } ] },
    "mobile": { "score": 6.0, "confidence": 0.75, "evidence": [
      { "shot": "high/mobile/R02", "note": "intentional portrait batting frame, thumb-sized buttons" },
      { "shot": "high/landscape/R05", "note": "HUD plus shelf about 35% of height; pitcher legs cut" },
      { "shot": "high/mobile/R07", "note": "about 20% foul dirt; tiny figures" } ] }
  },
  "gaps": [
    { "id": "G-cap-crown-skin", "category": "characters", "expectedGain": 0.4, "severity": 5, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher-back", "high/desktop/R14", "crops/high/R05-batter-front"], "benchmark": "smb4-2", "fix": "Mask scalp faces under each headwear type (merged with G-gear-fit cap part). Test: zero skin-hue pixels inside cap silhouettes in the listed captures." },
    { "id": "G-glove-model", "category": "characters", "expectedGain": 0.4, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R09-LF", "crops/high/R06-catcher_glove"], "benchmark": "smb3-3", "fix": "Mitt mesh with pocket, web, finger stalls; fix fingertip poke-through; fitted catcher chest and shin protection (merged with G-gear-fit). Test: no skin pixels on glove back in R17-pitcher_hands." },
    { "id": "G-face-lighting", "category": "characters", "expectedGain": 0.4, "severity": 4, "effort": "M", "workstream": "WS3", "evidence": ["crops/high/R05-batter-front", "high/mobile/R02"], "benchmark": "smb3-3", "fix": "Limited to dark skin under helmet brims (capped faces are lit in R09-LF, R14-batter, R12-pitcher): fill/rim per character, cap brim occlusion, minimum skin albedo. Test: features readable in R05-batter-front." },
    { "id": "G-region-sawtooth", "category": "characters", "expectedGain": 0.4, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R02-batter_head", "crops/high/R12-pitcher", "crops/high/R05-catcher"], "benchmark": "smb3-3", "fix": "Anti-aliased UV mask or edge loops for trim boundaries. Test: no steps over 2 px on trim edges in 2x crops." },
    { "id": "G-garment-construction", "category": "characters", "expectedGain": 0.6, "severity": 4, "effort": "L", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R05-batter_feet", "crops/high/R14-batter"], "benchmark": "smb4-2", "fix": "Fold normals at elbow/knee/belt, visible detail normal, buttoned placket, flattened chest (merged with G-cloth-folds-chest). Test: folds visible in 2x crops, flat chest profile." },
    { "id": "G-masks-attach", "category": "characters", "expectedGain": 0.3, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R05-ump_head", "crops/high/R14-batter", "crops/high/R06-catcher_glove"], "benchmark": "smb3-1", "fix": "Framed, padded masks rigidly parented to the head bone. Test: cage centred on face, no bar through mitt." },
    { "id": "G-body-variety", "category": "characters", "expectedGain": 0.3, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R07-SS", "crops/high/R08-CF", "crops/high/R16-1B"], "benchmark": "smb4-4", "fix": "Three MakeHuman build presets by roster. Test: three distinct silhouettes in close-ups." },
    { "id": "G-jersey-identity", "category": "characters", "expectedGain": 0.2, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R17-pitcher-back"], "benchmark": "smb3-3", "fix": "Back numbers as UV decals; re-lay LAKE HAMILTON wordmark clear of piping (BARNSTORMERS and LAKESIDE already intact). Test: intact wordmark and readable back number." },
    { "id": "G-reference-definition", "category": "charfit", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS1", "evidence": ["crops/high/R09-LF", "crops/high/R02-pitcher"], "benchmark": "art-src/samples/reference-renders/mpfb2_athlete_face_34.png", "fix": "Eye and skin definition and shoulder shape toward the reference; hands already match. Test: matched-scale face comparison." },
    { "id": "G-low-tier-preservation", "category": "charfit", "expectedGain": 0.1, "severity": 2, "effort": "M", "workstream": "WS6", "evidence": ["high/desktop/R02", "low/desktop/R02"], "fix": "Match low-tier stance and silhouette to high. Does not affect high-tier score." },
    { "id": "G-fielding-contact", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["strips/high/R07", "crops/high/R09-LF"], "benchmark": "smb4-5", "fix": "IK glove to predicted ball over final 0.3 s, catch and transfer beats, upright glove carry; blend run to crouch (frame 7 reach exists). Test: ball within 0.2 ft of pocket on catch tick." },
    { "id": "G-weight-and-transitions", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS2", "evidence": ["strips/high/R04", "strips/high/R10"], "benchmark": "smb4-3", "fix": "Add stride/toe tap to the existing coil, in-between swing keys, and trot arm swing (merged with G-swing-load). Test: front foot lifts in R04 frames 1-4; arms alternate in R10." },
    { "id": "G-contact-shadows", "category": "animation", "expectedGain": 0.2, "severity": 2, "effort": "S", "workstream": "WS2", "evidence": ["crops/high/R05-batter_feet"], "fix": "Cause is pose: shoes hover a shoe-height above the dirt with shadows where soles should be. Pin feet to ground via foot IK/root height, not shadow bias. Test: no gap between sole and dirt in R05-batter_feet." },
    { "id": "G-env-dressing", "category": "environment", "expectedGain": 0.7, "severity": 4, "effort": "L", "workstream": "WS4", "evidence": ["high/desktop/R05", "high/desktop/R15", "high/desktop/R01", "crops/high/R02-batter_hands"], "benchmark": "smb4-3", "fix": "Impostor crowd with depth, textured near stands, better tree silhouettes, fix overlapping sponsor boards (merged with G-crowd-and-park-depth). Test: no overlapping boards; no untextured grey > 5% of R01." },
    { "id": "G-rubber-slab", "category": "environment", "expectedGain": 0.1, "severity": 1, "effort": "S", "workstream": "WS4", "evidence": ["crops/high/R12-pitcher", "crops/high/R17-pitcher-back"], "fix": "Sink the rubber flush with the mound." },
    { "id": "G-lighting-grounding", "category": "lighting", "expectedGain": 0.4, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["crops/high/R05-batter-front", "high/desktop/R13"], "benchmark": "smb3-4", "fix": "Sky/ground fill balance and smoother night falloff. Foot grounding moved to G-contact-shadows (WS2)." },
    { "id": "G-night-sky", "category": "lighting", "expectedGain": 0.1, "severity": 1, "effort": "S", "workstream": "WS3", "evidence": ["high/desktop/R12", "high/landscape/R12"], "benchmark": "smb4-1", "fix": "Sky already graded with tower bloom; optional beam haze only." },
    { "id": "G-wide-cameras", "category": "readability", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS5", "evidence": ["high/desktop/R09", "high/desktop/R10", "high/desktop/R16", "high/mobile/R07"], "benchmark": "smb4-3", "fix": "Follow camera on the fielding player (min 40 px), keep HR runner and runner at first in frame, unique possession ring (merged with G-play-framing). Test: figure heights in R07/R09; runner visible in R10." },
    { "id": "G-mobile-framing", "category": "mobile", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["high/landscape/R05", "high/landscape/R12", "high/mobile/R07"], "fix": "Slimmer landscape HUD keeping the info line, no shelf on fielding views, per-orientation camera offsets (merged with G-phone-hud). Test: 3D view >= 75% of landscape height." },
    { "id": "G-cleat-stripe", "category": "characters", "expectedGain": 0.1, "severity": 2, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R05-batter_feet", "crops/high/R09-LF"], "fix": "Mipmapped stripe texture or geometry decal." }
  ]
}
```
