# Advocate review: Diamond Springs, loop 0 (high tier)

Capture paths are relative to `screenshots/review-loop-0/`. To settle two disputed strip claims I also measured frame-to-frame pixel change in `strips/high/R03` and `strips/high/R11` in memory, with each frame aligned to remove the tiling offset. I wrote no files.

## Overall

On most points the two critics are right. The players are close to the capsule anchor, the feet don't touch the ground, and the replay is frozen. I concede all of that. Some claims are factually wrong, though, and in three places the blame lands on the wrong cause:

- The pitch delivery does exist. It is the R03 capture that fails to show it.
- The catcher's protective gear exists. It is crude, not missing.
- A neck is present. It is short.

Most of my changes are small, half-point moves on categories where the rubric's anchor text describes what is on screen better than either critic's number does.

## Category by category

### Characters (both critics 3.0; I propose 3.5)

**Conceded:**
- Googly disc eyes, a blob nose and a slit mouth (`crops/high/R02-batter_head`).
- Mitten hands that don't wrap the bat (`crops/high/R02-batter_hands`).
- "HOT SPRINGS" chest lettering projected onto the yellow forearm (same crop).
- Sawtooth belt and collar hems, and skin poking through the sleeve at the elbow and wrist (`crops/high/R17-pitcher_hands`).
- Billless dome caps (`crops/high/R02-pitcher`).
- Shoeless rounded sock-stumps (`crops/high/R05-batter_feet`).
- One body build throughout.

**Rebutted:**
- **"No neck" (Claude, defect 1) is wrong.** `crops/high/R17-pitcher_hands` shows a clear skin-coloured neck column between jaw and collar, and `crops/high/R03-pitcher` shows a short neck. The neck is short and thin, but it exists.
- **"No chest protector or shin guards; blue shins are socks" (Claude, defect 18) is wrong.** `crops/high/R05-catcher` shows a cut-out blue chest panel over the white jersey and bulky blue lower-leg pieces. These are much thicker than the sock tubes on the batter in the same frame. Codex describes them correctly: they are present but have no construction.
- **"Dark faces become a black disc with eyes" is overstated.** In `crops/high/R02-batter_hands` the same batter's face reads brown, with a lit nose and cheek plane. In `crops/high/R02-batter_head` it is darker but the jaw edge is still visible. The fill-light gap is real; the claim that the face is unreadable is not.

**Credit the critics under-weighted:** the 3 anchor describes a "drawn-on face", "flat palette colours" and capsule bodies. Here the eyes are protruding 3D balls, not decals. Helmets are glossy against matte cloth (`crops/high/R02-batter_hands`). There are three or more skin tones (`crops/high/R17-pitcher_hands` against `crops/high/R02-pitcher`), back numbers, and a modelled glove. The umpire has a distinct dark kit and the catcher has a mask (`high/desktop/R05`). That is a little past the 3 anchor and well short of 5. I propose 3.5.

### Charfit (both critics 2.5; I propose 3.0)

**Conceded:** the anatomy mismatch is large. The `mpfb2_athlete_front` reference measures about 7.3 heads tall, and the game pitcher in `crops/high/R02-pitcher` measures about 5.2. The game torso is a box with no deltoid or pectoral form, the hands have no digits, and no facial feature matches.

**Rebuttal (on calibration only):** the 3 anchor reads "proportions clearly wrong (head size…). No resemblance beyond 'humanoid'." That describes this model exactly. Limb lengths are roughly correct, and the shoulder width relative to height is close to the reference. Scoring below the anchor that literally describes the model needs a defect worse than the anchor, and neither critic names one. I propose 3.0.

### Animation (Claude 3.5, Codex 4.0; I propose 4.0)

**Conceded:**
- Feet hover in the ready pose (`crops/high/R05-batter_feet`, with the shadow about a foot-length away).
- The pitcher's set position is a crouch with both feet off the mound, not a balance-point leg lift (`crops/high/R03-pitcher`).
- The landing foot sinks into the mound and the head twists back with the cap band across the eyes (`crops/high/R12-pitcher`).
- **R11 is frozen.** After alignment, the mean absolute difference between frame 1 and frames 2, 5 and 8 is 0.00. Claude is right.

**Rebutted:**
- **Codex's "recognizable leg-lift progression" in `strips/high/R03` is not visible.** The pitcher is about 50 px tall and no lift can be read. Codex scored something the strip doesn't show.
- **Claude's "eight frames look the same" is true to the eye, but the cause is the capture, not missing animation.** Aligned, the pitcher region changes steadily (mean difference 1.75, rising to 4.47 by frame 8), and the batter region also moves (0.11 rising to 6.4). The ball-path region is unchanged (0.00), so the strip ends before release. The delivery is authored. `high/desktop/R12` shows the pitcher in a full stride with the arm extended, and `crops/high/R12-pitcher` shows a deep front-knee flexion and a trunk-over follow-through. The trail leg rising behind the rubber is real pitching mechanics, not a "floating" defect.
- **R10:** `crops/high/R10-batter-trot` shows a trot clip with knee drive and bent-arm swing. The problem in `strips/high/R10` is that the camera follows the ball. That is a camera gap (WS5), which Claude assigns correctly, not proof that the trot is missing.
- **Swing:** `strips/high/R04` shows stance, load, a level bat, contact with a "PERFECT" flash and light trail, a ball trail and a camera pull-back. The rubric's 7 anchor lists "contact flash, camera follow" as feel elements, and both are present.

I propose 4.0. That keeps the swing and stride credit while the grounding failures hold the score down.

### Environment (both critics 4.5; I propose 5.0)

**Conceded:**
- The grey slab blocks the lower third of `high/desktop/R07` and about 18% of `high/mobile/R07`.
- The photo-card crowd shows at giant scale behind home (`high/desktop/R05`, `high/desktop/R14`, `high/mobile/R05`).
- Trees are cones (`crops/high/R02-batter_head`, top left).

**Rebuttal:** the 5 anchor reads "a believable diamond and walls, crowd as a painted texture, trees as cones." That is this build almost word for word, and some elements go beyond it:
- mow-checker turf and grained dirt (`high/desktop/R07`, `crops/high/R05-batter_feet`)
- a yellow foul pole, distance markers and a lit scoreboard (`high/desktop/R13`, `strips/high/R11`)
- built light towers (`high/desktop/R16`) and backstop netting (`crops/high/R02-batter_head`)
- three parks with distinct identities, including a sepia historic park in `high/desktop/R14`

The slab and the crowd-scale bug pull the score down. Putting it below the anchor that describes it word for word double-counts them. I propose 5.0.

### Lighting (Claude 5.0, Codex 4.5; I propose 5.0)

**Conceded:** there are no contact shadows (`crops/high/R05-batter_feet`). Night play is lit almost evenly (`high/desktop/R12`), and the treeline drops abruptly to black (`high/desktop/R13`).

**Each critic gets one point wrong:**
- Claude says there are "no light pools". `high/desktop/R13` does show falloff: the infield is brighter and the left foul area darker.
- Codex calls the pools "conspicuous". They aren't; it is a broad gradient, not pools under the towers.

**Credit:** the 5 anchor ("directional key with shadows and a believable sky") is met in `high/desktop/R02` and `high/mobile/R02`. `high/desktop/R14` has a working golden grade. There is helmet specular in `crops/high/R02-batter_hands` and on the red helmet in `high/desktop/R12`. I propose 5.0.

### UI (Claude 5.5, Codex 6.0; I propose 6.0)

**Conceded:** the team boxes are mostly empty and the result banners are single lines. Keyboard hints still show in the touch landscape layout (`high/landscape/R05`, `high/landscape/R02`, where it reads "Space or click: swing…").

**Credit the critics under-weighted:**
- The count pips and base diamond update with state. In `high/desktop/R16`, first base is lit yellow and there is a red out pip.
- There is a pitch-speed readout ("FB 77 mph", `high/desktop/R07`).
- Pitch-type buttons and a target reticle (`high/desktop/R05`).
- Timing feedback ("PERFECT", `strips/high/R04`) and a "HOME RUN · 400 FT" banner (`strips/high/R10`).

The type and colour are consistent across every frame. That is past the 5 anchor's "inconsistent style". I propose 6.0.

### Readability (Claude 5.0, Codex 5.5; I propose 5.5)

**Conceded:** fielders are small in the field camera (`high/desktop/R07`). The runner and first baseman overlap at the right edge (`high/desktop/R16`). Portrait R07 cuts off first and third base (`high/mobile/R07`).

**Rebutted:**
- **Claude's "strike zone disappears against the chalk lines" is wrong.** In `high/desktop/R16`, `high/desktop/R12` and `high/mobile/R02` the zone box sits over grass and dirt above the plate, clear of the chalk, and reads cleanly.
- **Claude's "fielders 10–15 px" is understated.** Each fielder in `high/desktop/R07` has a team-coloured ground ring, and the batter-runner has a yellow highlight ring. The ball is visible on the infield grass.

I propose 5.5.

### Mobile (both critics 5.5; I propose 5.5)

I concede both critiques:
- The slab takes much of `high/mobile/R07`.
- The crowd photo is oversized in `high/mobile/R05`, where the pitcher is also cropped at the left.
- The HUD squeezes the landscape playfield to about 65% of its height (`high/landscape/R02`).
- Landscape drops the matchup line (`high/landscape/R05`).

The strengths are large thumb buttons (`high/mobile/R02`) and a phone proxy that passes at 103 and 122 fps. I hold 5.5.

## What each critic got plainly wrong

**Claude (Critic A):**
- "No neck": a neck is visible in `crops/high/R17-pitcher_hands`.
- "No chest protector or shin guards": both are visible in `crops/high/R05-catcher`.
- "Strike zone disappears against chalk": it reads clearly in `high/desktop/R16`.
- "No light pools": falloff is visible in `high/desktop/R13`.
- R03 "frames identical": pixel change shows the pitcher animating; the strip ends before release.

**Codex (Critic B):**
- "Recognizable leg-lift progression" in `strips/high/R03`: nothing can be read at 50 px, and the matching crop shows a crouch.
- "Conspicuous light pools" in `high/desktop/R13`: it is a broad gradient.

## Gaps (merged and adjusted)

- **G-char-anatomical-mesh:** merges G-anatomy. Kept at severity 5, gain set to 2.0, because the mesh alone does not deliver face, kit or variety.
- **G-kit:** merges G-gear-cleats-caps. Gain cut from 2.0 to 1.0. The catcher gear already exists and needs construction, not addition.
- **G-garment-seams:** kept as the cheap S-effort quick win.
- **G-foot-grounding:** merges G-grounding. Gain set to 1.0 at effort M, because the root-height and IK fix is separate from authoring new clips.
- **G-pitch-delivery-readable:** severity cut to 3 and gain to 0.5. Stride and follow-through exist (R12). The real faults are the crouched set pose and a capture that is too wide and ends before release.
- **G-blocking-slab:** absorbs the slab part of G-framing and G-park. Severity raised to 4, since it hurts environment, readability and mobile at once.
- **G-park:** merges G-crowd-scale. Gain cut to 1.0.
- **G-light:** merges G-face-fill-light. Gain set to 1.0. Contact shadows depend on G-foot-grounding.
- **G-framing:** merges G-field-camera-scale. Gain set to 1.0, since rings and a ball trail already exist.
- **G-hud:** merges G-hud-broadcast. Gain set to 0.75.
- **G-phone:** severity cut to 3 and gain to 1.0, since the slab fix covers part of it.

```json
{
  "loop": 0,
  "role": "advocate",
  "tier": "high",
  "verdict": "continue",
  "scores": {
    "characters": { "score": 3.5, "confidence": 0.75, "evidence": [
      { "shot": "crops/high/R02-batter_head", "note": "protruding 3D ball eyes and blob nose: primitive but modelled, not drawn-on decals" },
      { "shot": "crops/high/R05-catcher", "note": "catcher has a blue chest panel and bulky shin pieces (present, unconstructed); grid mask; sawtooth belt hem" },
      { "shot": "crops/high/R17-pitcher_hands", "note": "neck present; skin poke-through at elbow and wrist; lumpy modelled glove; pale skin tone (variety in skin, not build)" },
      { "shot": "crops/high/R02-batter_hands", "note": "glossy helmet against matte cloth; mitten hands; chest lettering projected onto forearm" } ] },
    "charfit": { "score": 3.0, "confidence": 0.75, "evidence": [
      { "shot": "crops/high/R02-pitcher", "note": "~5.2 heads tall vs ~7.3 in mpfb2_athlete_front; limb length and shoulder width roughly right: the 3 anchor exactly" },
      { "shot": "crops/high/R17-pitcher_hands", "note": "box torso, digitless hands vs hbm/mpfb2 hand renders" },
      { "shot": "crops/high/R02-batter_head", "note": "no facial anatomy shared with mpfb2_athlete_face" } ] },
    "animation": { "score": 4.0, "confidence": 0.7, "evidence": [
      { "shot": "strips/high/R04", "note": "load, level bat, contact flash, ball trail, camera pull-back: reads" },
      { "shot": "high/desktop/R12", "note": "pitcher mid-stride with arm extended: delivery is authored" },
      { "shot": "crops/high/R12-pitcher", "note": "real stride and follow-through, but landing foot sinks into mound and head twists oddly" },
      { "shot": "strips/high/R03", "note": "pitcher animates (measured) but too small to read and strip ends before release" },
      { "shot": "strips/high/R11", "note": "replay frozen: aligned frames identical" },
      { "shot": "crops/high/R05-batter_feet", "note": "both feet hover well above their shadow" } ] },
    "environment": { "score": 5.0, "confidence": 0.7, "evidence": [
      { "shot": "high/desktop/R07", "note": "mow turf, grained dirt, ringed fielders; grey slab blocks lower third" },
      { "shot": "high/desktop/R05", "note": "photo-card crowd at giant scale behind home" },
      { "shot": "high/desktop/R13", "note": "foul pole, distance markers, scoreboard, light towers built" },
      { "shot": "high/desktop/R14", "note": "distinct historic-park identity; crowd sheet again oversized" } ] },
    "lighting": { "score": 5.0, "confidence": 0.65, "evidence": [
      { "shot": "high/desktop/R02", "note": "directional key, shadows, believable sky: meets the 5 anchor" },
      { "shot": "high/desktop/R14", "note": "warm golden grade works" },
      { "shot": "high/desktop/R13", "note": "broad falloff (not pools); abrupt black treeline" },
      { "shot": "crops/high/R05-batter_feet", "note": "no contact shadow; shadow detached from hovering feet" } ] },
    "ui": { "score": 6.0, "confidence": 0.65, "evidence": [
      { "shot": "high/desktop/R16", "note": "base diamond and out pip update with state; consistent type" },
      { "shot": "high/desktop/R05", "note": "pitch-type buttons, target reticle, clear primary action" },
      { "shot": "strips/high/R04", "note": "PERFECT timing feedback" },
      { "shot": "high/landscape/R02", "note": "keyboard hint on touch layout; empty wide team boxes" } ] },
    "readability": { "score": 5.5, "confidence": 0.65, "evidence": [
      { "shot": "high/desktop/R16", "note": "strike zone clear of chalk and reads; runner/1B overlap at right edge" },
      { "shot": "high/desktop/R07", "note": "team rings and yellow batter-runner ring help; fielders small; slab blocks" },
      { "shot": "high/mobile/R07", "note": "corner bases out of frame in portrait" },
      { "shot": "strips/high/R04", "note": "ball trail and zone conspicuous" } ] },
    "mobile": { "score": 5.5, "confidence": 0.7, "evidence": [
      { "shot": "high/mobile/R02", "note": "big batter, large thumb buttons; ~21% sky" },
      { "shot": "high/mobile/R05", "note": "plate group readable; oversized crowd; pitcher cropped" },
      { "shot": "high/mobile/R07", "note": "slab ~18% of viewport; small fielders" },
      { "shot": "high/landscape/R02", "note": "HUD squeezes playfield to ~65%; keyboard hint on touch" } ] }
  },
  "gaps": [
    { "id": "G-char-anatomical-mesh", "category": "charfit", "expectedGain": 2.0, "severity": 5, "effort": "L", "workstream": "WS1", "evidence": ["crops/high/R02-pitcher", "crops/high/R17-pitcher_hands", "crops/high/R16-1B"], "benchmark": "mpfb2_athlete_front, mpfb2_game27k_glb_front, hbm_male_realistic_front", "fix": "Merged with G-anatomy. Replace capsule rig with skinned anatomical mesh (~7.3-head proportions, defined neck, deltoid/hip/knee structure, 5-finger hands). Test: R02, R16, R17 close-ups overlap reference silhouettes." },
    { "id": "G-face-sculpt", "category": "characters", "expectedGain": 1.0, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R02-batter_head", "crops/high/R07-SS"], "benchmark": "mpfb2_athlete_face, smb4-4", "fix": "Modelled lids, brow, nose, lips, ears and hair in place of ball eyes and blob nose; at least 3 face variants. Largely delivered by G-char-anatomical-mesh if it uses the MPFB head." },
    { "id": "G-kit", "category": "characters", "expectedGain": 1.0, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R05-catcher", "crops/high/R05-batter_feet", "crops/high/R02-pitcher", "crops/high/R06-catcher_glove"], "benchmark": "smb3-3, smb4-2, smb4-4", "fix": "Merged with G-gear-cleats-caps. Billed caps, ear-flap helmets, cleats with soles, webbed and pocketed glove, and construction (straps, padding) on the existing catcher chest panel and shin pieces; placket and sleeve hems." },
    { "id": "G-garment-seams", "category": "characters", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R05-catcher", "crops/high/R02-batter_hands"], "fix": "Remove sawtooth hem/belt/collar triangles, fix skin poke-through at elbow/wrist, restrict chest-lettering decal to torso UVs. Test: clean edges in R17-pitcher_hands and R05-catcher." },
    { "id": "G-body-variety", "category": "characters", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["high/desktop/R05", "high/desktop/R14", "high/desktop/R17"], "benchmark": "smb4-4", "fix": "At least 3 body-shape presets (height, mass, belly); skin-tone variety already exists." },
    { "id": "G-foot-grounding", "category": "animation", "expectedGain": 1.0, "severity": 5, "effort": "M", "workstream": "WS2", "evidence": ["crops/high/R05-batter_feet", "crops/high/R03-pitcher", "crops/high/R12-pitcher", "crops/high/R02-pitcher"], "fix": "Merged with G-grounding. Correct root height plus foot IK/ground lock: planted soles within 2 cm of terrain in stance and set, no mound penetration on landing. Airborne run phases excluded." },
    { "id": "G-pitch-delivery-readable", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["strips/high/R03", "crops/high/R03-pitcher", "high/desktop/R12"], "benchmark": "smb4-2", "fix": "Stride and follow-through already exist (R12). Replace the two-legged crouch set with a balance-point leg lift, and fix the R03 capture so it frames the pitcher at 100+ px and spans through release." },
    { "id": "G-replay-trot-cameras", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS5", "evidence": ["strips/high/R11", "strips/high/R10", "crops/high/R10-batter-trot"], "fix": "Replay must play motion (R11 frames differ); HR camera follows the runner, whose trot clip exists, in every R10 strip frame." },
    { "id": "G-blocking-slab", "category": "environment", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS4", "evidence": ["high/desktop/R07", "high/mobile/R07", "high/desktop/R01"], "fix": "Remove or relocate the grey slab from the field and title cameras; texture stand boxes. Also lifts readability and mobile." },
    { "id": "G-park", "category": "environment", "expectedGain": 1.0, "severity": 4, "effort": "L", "workstream": "WS4", "evidence": ["high/desktop/R05", "high/desktop/R14", "high/desktop/R15", "high/mobile/R05"], "benchmark": "smb3-1, smb4-3", "fix": "Merged with G-crowd-scale. Correctly scaled instanced or imposter crowd (fans behind home at most 1.2x player size in pitching camera); replace cone trees; finish visible structures." },
    { "id": "G-light", "category": "lighting", "expectedGain": 1.0, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["crops/high/R02-batter_head", "high/desktop/R12", "high/desktop/R13"], "benchmark": "smb3-3, smb3-4, smb4-1", "fix": "Merged with G-face-fill-light. Hemisphere/rim fill and lifted floor for dark skin and uniforms; contact AO under feet (depends on G-foot-grounding); tower light pools and a softer treeline transition at night." },
    { "id": "G-framing", "category": "readability", "expectedGain": 1.0, "severity": 4, "effort": "M", "workstream": "WS5", "evidence": ["high/desktop/R07", "high/desktop/R16", "high/mobile/R07", "strips/high/R08"], "benchmark": "smb3-1, backyard97-1", "fix": "Merged with G-field-camera-scale. Tighter field cameras (fielders 30+ px), keep destination bases in frame, emphasise the fielder with the ball beyond the existing rings." },
    { "id": "G-hud", "category": "ui", "expectedGain": 0.75, "severity": 2, "effort": "M", "workstream": "WS7", "evidence": ["high/desktop/R02", "high/desktop/R05", "high/landscape/R02"], "benchmark": "smb3-1, ootp26-1", "fix": "Merged with G-hud-broadcast. Compact score bug with line score, labelled pips, banners with hierarchy, HUD chrome under 15% of desktop height." },
    { "id": "G-phone", "category": "mobile", "expectedGain": 1.0, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["high/mobile/R05", "high/landscape/R02", "high/landscape/R05", "high/mobile/R07"], "benchmark": "backyard97-1", "fix": "Orientation-specific cameras, compact landscape HUD, matchup line kept in landscape, keyboard hints hidden on touch, corner bases visible in portrait fielding." }
  ]
}
```
