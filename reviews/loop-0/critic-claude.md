# Critic A (critic-claude) review: Diamond Springs, loop 0 baseline, high tier

## Verdict
The players are the weakest part of the game. They are the rubric's 3-anchor figure almost word for word: tube limbs, mitten fists, painted cartoon eyes, no neck, no shoes and one body type. Against the MPFB2 and HBM reference renders, only the overall outline reads as human. Basic grounding is broken too. Feet hover above the dirt in most close-ups (`crops/high/R05-batter_feet`, `crops/high/R02-pitcher`, `crops/high/R03-pitcher`) and sink through the mound in `crops/high/R12-pitcher`. The animation strips mostly fail to show any motion: the R03 delivery frames look the same at this scale, the R11 replay is frozen, and the R10 trot never shows the runner. Only the swing in `strips/high/R04` sells contact. The park is a believable diamond with good dirt and turf textures. Against that, the crowd is a photo card that renders at giant scale in the pitching camera, the trees are cones, and a bare grey slab blocks the field camera. The HUD is tidy and works, but it is not broadcast-grade. All quality tiers render the same; I found no medium or low regressions in the R02 frame and crops I checked. Performance passes easily: 103 fps worst at 4× CPU throttle. **Verdict: continue.** Every gate fails, and characters and charfit fail by more than 4 points.

## Category scores

### characters: 3.0
- **Faces:** `crops/high/R02-batter_head` and `crops/low/R02-batter_head` show a sphere head with no neck. The eyes are flat white discs with off-centre black pupils (googly eyes), the nose is a brown blob and the mouth is a single dark wedge. The helmet is a plain hemisphere with no ear flap; only its gloss gives any material contrast.
- **Hands:** in `crops/high/R02-batter_hands` and `crops/high/R05-ump_head` the hands are mitten lumps with a thumb nub. There are no fingers and nothing wraps the bat.
- **Uniforms:** the uniforms are flat colour blocks with sawtooth hems at the collar, shirt-tail and belt (`crops/high/R05-catcher`, `crops/high/R17-pitcher_hands`).
- **Feet:** sock tubes end in rounded black points, with no cleat or shoe (`crops/high/R05-batter_feet`).
- **Bodies:** every player shares one capsule body, in the same pose across three parks (`high/desktop/R05`, `R14`, `R17`). Skin tone and kit colour are the only variety.
- **Against benchmarks:** compared with smb4-4 (varied bodies, faces and cleats) and smb4-2 (detailed kit and cap), this is the 3 anchor exactly.
- **Credit given:** glossy helmets, team lettering, back numbers and a catcher's mask that exists at all keep the score from dropping lower.

### charfit: 2.5
Compared against `mpfb2_athlete_front`, `mpfb2_athlete_face`, `hbm_male_realistic_three_quarter` and `hbm_male_realistic_hand`:
- **Head and neck:** the head is about 1/5.5 of body height in `crops/high/R02-pitcher`, against roughly 1/7.5 in the references. There is no neck at all, where the reference has a strong one.
- **Torso:** the shoulders are a square box with no deltoid, chest or clavicle structure. The reference three-quarter view shows clear pectoral, deltoid and abdominal form.
- **Limbs and hands:** the limbs are uniform-width tubes with no knee or elbow landmarks (`crops/high/R09-LF`, `crops/high/R07-SS`). The hands are about half the reference's size relative to the forearm and have no digits (`crops/high/R17-pitcher_hands` against `hbm_male_realistic_hand`).
- **Feet:** feet are less than half the reference foot length (`crops/high/R05-batter_feet`).
- **Face:** the face shares no features with `mpfb2_athlete_face`: no brow ridge, eyelids, ear shape, lips or hair. The overall outline reads as human only at the game distance in `high/desktop/R02`.

### animation: 3.5
- **Swing (`strips/high/R04`):** this is the only clip that reads. Frames 1–2 show stance and load, frame 3 the bat dropping, frame 4 the bat level, and frame 5 contact with a "PERFECT" flash and a light trail, followed by the finish and a camera pull-back. The jump from frame 3 to 4 is large, and the feet stay planted with no stride or hip lead visible.
- **Delivery (`strips/high/R03`):** the eight frames look the same at this scale. The pitcher is about 50 px tall and no leg lift, stride or arm path can be seen. The close-up `crops/high/R03-pitcher` shows a two-legged crouch with both feet hovering beside the rubber, not a balance-point leg lift.
- **Follow-through (`crops/high/R12-pitcher`):** the landing foot is buried in the mound, the trail leg floats over the rubber, and the head is twisted back over the shoulder with the cap band lying across the face.
- **Replay (`strips/high/R11`):** all 8 frames are identical. Nothing moves under the "OUT" banner.
- **Home-run trot (`strips/high/R10`):** the camera stares at the outfield, the runner is never framed, and no trot can be judged.
- **Fielders (`strips/high/R07`, `strips/high/R08`):** players are 10–15 px tall, so no run cycle or throw can be read.
- **Running poses:** in `crops/high/R07-batter-runner`, `crops/high/R10-batter-trot` and `crops/high/R09-LF` the runners are bolt upright with no forward lean, and the support foot floats above its shadow. That is the "sliding feet" side of the 3–5 band.

### environment: 4.5
- **Strengths:** the diamond, mow-checker turf and grained dirt are good at field level (`high/desktop/R02`, `crops/high/R05-batter_feet`).
- **Crowd:** the crowd is a photo card on sloped stands. In the pitching camera it becomes a giant-scale strip of people's torsos behind home plate (`high/desktop/R05`, `high/desktop/R17`, sepia in `high/desktop/R14`, and worst in `high/mobile/R05`).
- **Trees and walls:** trees are black cones (`crops/high/R02-batter`), with V-shaped gaps between stand sections showing cone trees behind. The walls and stands are untextured grey boxes (`high/desktop/R01`).
- **Blocking geometry:** an untextured grey slab fills the bottom third of `high/desktop/R07` and `high/mobile/R07`. The rubric names "blocking geometry in the camera's view" as a 7-level failure.
- **Against benchmarks:** smb3-1 and smb4-3 have tiered stands, signage, built light towers and 3D crowds. Here the light towers are thin poles with a sprite head.

### lighting: 5.0
- **Daylight:** a directional key with shadows and a believable painted sky (`high/desktop/R02`).
- **Golden afternoon:** `high/desktop/R14` has a warm golden grade that works.
- **Shadows:** there are no contact shadows. Because the feet float, the shadows separate from the feet (`crops/high/R05-batter_feet`, `crops/high/R09-LF`).
- **Faces:** dark-skinned faces lose all modelling and become a black disc with eyes (`crops/high/R02-batter_head`). There is no fill, rim light or bounce.
- **Night:** `high/desktop/R12` and `R13` light the field evenly like a dimmed day. The towers have glow sprites, but there are no light pools and no specular on the helmets beyond one hotspot.
- **Against benchmarks:** smb3-4 and smb4-1 both show haze and depth, which these scenes lack.

### ui: 5.5
- **What works:** the type and palette are consistent (`high/desktop/R02`), with a score bug, B/S/O pips, base diamond, pitcher and batter line, and pitch speed ("FB 77 mph", `high/desktop/R07`). There is a "PERFECT" timing word (`strips/high/R04`) and a "HOME RUN · 400 FT" banner (`high/landscape/R10`).
- **Score bug:** the bug stretches each team box to half the screen width with only "HSHS 0" inside, which wastes most of the bar.
- **Screen space:** the top and bottom chrome take about 21% of the desktop's height (about 35% in landscape).
- **Banners:** result banners are a single text line with no hierarchy or detail.
- **Against benchmarks:** smb3-1 and ootp26-1 show a broadcast bug and line score; this is a long way short.

### readability: 5.0
- **Batting and pitching views:** these read well: zone box, pitcher, catcher and target (`high/desktop/R02`, `high/desktop/R05`).
- **Field cameras:** players shrink to 10–15 px and the ball becomes a 4 px dot (`high/desktop/R07`, `high/desktop/R13`, `strips/high/R08`). The grey slab blocks the lower field in `high/desktop/R07`.
- **Home run:** `strips/high/R10` never shows the runner.
- **Strike zone:** a white outline that disappears against the chalk lines near the plate (`high/desktop/R02`).

### mobile: 5.5
- **Portrait:** large thumb buttons. The batter is big in portrait `high/mobile/R02`, but the sky wastes about 25% of the height.
- **Portrait pitching:** `high/mobile/R05` frames the catcher well, but the crowd photo is grotesquely oversized.
- **Portrait field view:** in `high/mobile/R07` the grey slab takes about 18% of the viewport and the fielders are about 15 px.
- **Landscape:** in `high/landscape/R02` the HUD squeezes the playfield to about 65% of the height.
- **Performance:** the phone proxy passes (103 fps medium, 122 fps low at 4× throttle).

## Character defects
1. **No neck:** the head sits directly on the collar (`crops/high/R02-batter_head`, `crops/high/R02-pitcher`).
2. **Googly eyes:** flat white discs with off-centre pupils, no lids or brows on the batter (`crops/high/R02-batter_head`, `crops/high/R07-SS`).
3. **Nose and mouth:** the nose is a featureless brown blob and the mouth a single dark wedge (`crops/high/R02-batter_hands`).
4. **Ears:** flat discs stuck on the side of the head (`crops/high/R09-LF`, `crops/high/R12-pitcher`).
5. **No hair** anywhere. Under the cap there is a black band reading as a blindfold (`high/desktop/R05` pitcher, `crops/high/R14-batter` umpire).
6. **Caps have no bill:** blue skull domes (`crops/high/R02-pitcher`, `crops/high/R16-runner1` 1B, `crops/high/R07-SS`).
7. **Batting helmet:** a plain hemisphere with no ear flap or jaw guard (`crops/high/R02-batter`).
8. **Mitten fists, no fingers:** the batter's hands don't wrap the bat, the knob hangs below them and the shaft passes between fist and forearm (`crops/high/R02-batter_hands`, `crops/high/R05-ump_head`).
9. **Gloves are lumpy brown balloons:** no pocket, webbing or lacing (`crops/high/R17-pitcher_hands`, `crops/high/R06-catcher_glove`).
10. **No shoes or cleats:** legs end in rounded black stumps (`crops/high/R05-batter_feet`, `crops/high/R10-batter-trot`).
11. **Floating feet:** 5–15 cm above the ground, shadow detached (`crops/high/R05-batter_feet`, `crops/high/R02-pitcher`, `crops/high/R03-pitcher`, `crops/high/R09-LF`, `crops/high/R07-batter-runner`).
12. **Foot through the mound:** in follow-through the landing foot is buried (`crops/high/R12-pitcher`).
13. **Sawtooth hems:** jagged triangular edges at the collar, shirt-tail over the belt and the belt line (`crops/high/R05-catcher`, `crops/high/R05-ump`, `crops/high/R17-pitcher_hands`, `crops/high/R10-batter-trot`).
14. **Skin through the sleeve:** skin-coloured polygons poke through the sleeve at the elbow and wrist (`crops/high/R17-pitcher_hands`), and a skin patch shows through the umpire's collar (`crops/high/R05-ump_head`).
15. **Chest lettering on the arm:** "HOT SPRINGS" and "BARNSTORMERS" project onto the forearm and sleeve (`crops/high/R02-batter_hands`, `crops/high/R02-batter_head`, `crops/high/R14-batter`, `crops/high/R16-runner1`).
16. **Stretched number:** the "27" stretches and shears across the twisted back (`crops/high/R12-pitcher`).
17. **No shoulder anatomy:** a square box torso with tube limbs and no elbow or knee landmarks (`crops/high/R17-pitcher_hands`, `crops/high/R09-LF`).
18. **Catcher's gear:** no chest protector or shin guards (blue shins are socks), and the mask is a tic-tac-toe grid floating in front of a helmet ball (`crops/high/R05-catcher`, `crops/high/R06-catcher_glove`).
19. **Umpire's mask:** bars float detached in front of the head. From behind, the side bars read as a cage on the ear (`crops/high/R05-ump_head`, `crops/high/R05-batter-front`).
20. **Faceted shading:** knees and thighs show visible faceting (`crops/high/R06-catcher_glove`).
21. **One body type** for every player, umpire included (`high/desktop/R05`, `R14`, `R17`).
22. **Dark faces unlit:** dark skin is lit to near-black with no form (`crops/high/R02-batter_head`).
23. **Close-up framing misses:** `crops/high/R05-ump` frames the batter and hides the umpire, and `crops/high/R17-pitcher_hands` cuts off the head.

## Ranked gaps
1. **G-char-anatomical-mesh** (characters/charfit, WS1, L, severity 5, +2.5): replace the capsule rig with a skinned anatomical mesh at about 27k triangles, based on `mpfb2_game27k`. It needs a neck, shoulder/hip/knee structure, about 7.5-head proportions and 5-finger hands. Test: the silhouette in the crops overlaps the reference masks.
2. **G-foot-grounding** (animation, WS2, M, severity 5, +1.0): add foot IK and ground lock so that in every stance, run-support and follow-through frame the sole sits within 2 cm of the terrain. Test: feet meet their shadows in R02, R03, R05, R09 and R12, with none penetrating.
3. **G-face-sculpt** (characters, WS1, M, severity 4, +1.0): replace the decal eyes with modelled eyelids, brow, nose, lips and hair, plus 3+ face variants. Test: `R02-batter_head` holds up next to `mpfb2_athlete_face`.
4. **G-pitch-delivery-readable** (animation, WS2, M, severity 4, +0.75): author a delivery with leg lift, stride, arm path and follow-through, and make it legible in `strips/high/R03` (the pitcher at 100+ px, or a tele capture). Test: 8 visibly distinct poses.
5. **G-replay-trot-cameras** (animation/readability, WS5, S, severity 4, +0.5): the R11 replay must animate, and the R10 camera must follow the runner. Test: the runner is in every frame of `strips/high/R10` and the R11 frames differ.
6. **G-garment-seams** (characters, WS1, S, severity 3, +0.5): fix the sawtooth hems, skin poking through sleeves and lettering on the arms. Mask the chest decal to the torso UVs only. Test: clean edges in `crops/high/R05-catcher` and `R17-pitcher_hands`.
7. **G-gear-cleats-caps** (characters, WS1, M, severity 3, +0.5): add billed caps, ear-flap helmets, cleats, a modelled glove with webbing, and catcher's chest and shin guards plus a framed mask. Test: each is visible in its matching crop.
8. **G-body-variety** (characters, WS1, M, severity 3, +0.5): add at least 3 body-shape presets (height, mass, belly). Test: visibly different bodies in `high/desktop/R05`.
9. **G-blocking-slab** (environment, WS4, S, severity 3, +0.5): hide or move the grey slab out of the R07 and title cameras, and texture the stand boxes. Test: no grey slab in `high/desktop/R07` or `high/mobile/R07`.
10. **G-crowd-scale** (environment, WS4, M, severity 3, +0.5): replace the photo-card crowd with instanced 3D or imposter fans at correct scale. Test: people behind home are at most 1.2× player size in R05 and R17.
11. **G-face-fill-light** (lighting, WS3, S, severity 3, +0.5): add hemisphere/rim fill, a skin shader with a lifted floor for dark tones, and contact shadows (AO under the feet). Test: facial planes are visible in `crops/high/R02-batter_head`.
12. **G-field-camera-scale** (readability, WS5, M, severity 3, +0.5): tighten the R07 and R08 cameras so fielders are 30+ px, and add a ball trail or marker. Test: the fielder with the ball is identifiable in each strip frame.
13. **G-hud-broadcast** (ui, WS7, M, severity 2, +0.5): compact the score bug, add a line score and label the count pips, and give result banners a hierarchy. Test: chrome under 15% of desktop height.

```json
{
  "loop": 0,
  "role": "critic-claude",
  "tier": "high",
  "verdict": "continue",
  "scores": {
    "characters": { "score": 3.0, "confidence": 0.85, "evidence": [
      { "shot": "crops/high/R02-batter_head", "note": "sphere head, no neck, googly disc eyes, blob nose, hemisphere helmet" },
      { "shot": "crops/high/R02-batter_hands", "note": "mitten fists, bat not gripped, chest lettering projected onto forearm" },
      { "shot": "crops/high/R05-batter_feet", "note": "no shoes: legs end in black stumps" },
      { "shot": "crops/high/R05-catcher", "note": "sawtooth hems, grid mask, no chest protector/shin guards" },
      { "shot": "high/desktop/R17", "note": "one body type, same rig in every park" } ] },
    "charfit": { "score": 2.5, "confidence": 0.8, "evidence": [
      { "shot": "crops/high/R02-pitcher", "note": "~5.5 heads tall vs ~7.5 in mpfb2_athlete_front; no neck; box torso" },
      { "shot": "crops/high/R17-pitcher_hands", "note": "tube arms, no digits vs hbm_male_realistic_hand" },
      { "shot": "crops/high/R02-batter_head", "note": "no resemblance to mpfb2_athlete_face" },
      { "shot": "crops/high/R09-LF", "note": "no knee/elbow landmarks; feet half reference length" } ] },
    "animation": { "score": 3.5, "confidence": 0.75, "evidence": [
      { "shot": "strips/high/R04", "note": "swing reads with contact flash; 3->4 pop; no stride/hip lead" },
      { "shot": "strips/high/R03", "note": "delivery not visible; 8 frames near-identical" },
      { "shot": "strips/high/R11", "note": "replay frozen, all frames identical" },
      { "shot": "strips/high/R10", "note": "runner never framed during trot" },
      { "shot": "crops/high/R12-pitcher", "note": "landing foot buried in mound, trail foot floating" },
      { "shot": "crops/high/R03-pitcher", "note": "both feet hovering beside rubber, no leg lift" } ] },
    "environment": { "score": 4.5, "confidence": 0.75, "evidence": [
      { "shot": "high/desktop/R07", "note": "untextured grey slab blocks bottom third" },
      { "shot": "high/desktop/R05", "note": "photo-card crowd at giant scale behind home" },
      { "shot": "crops/high/R02-batter", "note": "cone trees, V gaps between stand cards" },
      { "shot": "high/desktop/R02", "note": "good turf mow pattern and dirt grain" } ] },
    "lighting": { "score": 5.0, "confidence": 0.7, "evidence": [
      { "shot": "high/desktop/R14", "note": "warm golden grade works" },
      { "shot": "crops/high/R02-batter_head", "note": "dark face unlit, no fill/rim" },
      { "shot": "high/desktop/R12", "note": "night lit flat; glow sprites, no light pools" },
      { "shot": "crops/high/R05-batter_feet", "note": "shadows detached from floating feet; no contact shadow" } ] },
    "ui": { "score": 5.5, "confidence": 0.7, "evidence": [
      { "shot": "high/desktop/R02", "note": "consistent bug, count pips, matchup line; oversized empty team boxes" },
      { "shot": "strips/high/R04", "note": "PERFECT timing feedback" },
      { "shot": "high/landscape/R10", "note": "single-line HR banner, no hierarchy; chrome ~35% of height" } ] },
    "readability": { "score": 5.0, "confidence": 0.7, "evidence": [
      { "shot": "high/desktop/R02", "note": "batting view reads: zone, pitcher, fielders" },
      { "shot": "high/desktop/R07", "note": "fielders 10-15 px, ball 4 px dot, slab blocks view" },
      { "shot": "high/desktop/R13", "note": "night field view players tiny" },
      { "shot": "strips/high/R10", "note": "HR runner not visible" } ] },
    "mobile": { "score": 5.5, "confidence": 0.7, "evidence": [
      { "shot": "high/mobile/R02", "note": "big batter and thumb buttons; sky wastes ~25%" },
      { "shot": "high/mobile/R07", "note": "grey slab ~18% of viewport; fielders ~15 px" },
      { "shot": "high/mobile/R05", "note": "catcher target clear; crowd photo grotesquely large" },
      { "shot": "high/landscape/R02", "note": "HUD squeezes playfield to ~65% height" } ] }
  },
  "gaps": [
    { "id": "G-char-anatomical-mesh", "category": "charfit", "expectedGain": 2.5, "severity": 5, "effort": "L", "workstream": "WS1", "evidence": ["crops/high/R02-pitcher", "crops/high/R17-pitcher_hands", "crops/high/R09-LF"], "benchmark": "mpfb2_game27k_glb_front, hbm_male_realistic_three_quarter", "fix": "Replace capsule player with skinned anatomical mesh (~27k tris from mpfb2_game27k): neck, deltoid/hip/knee structure, ~7.5-head proportions, 5-finger hands. Test: silhouette overlap with reference masks in the crops." },
    { "id": "G-foot-grounding", "category": "animation", "expectedGain": 1.0, "severity": 5, "effort": "M", "workstream": "WS2", "evidence": ["crops/high/R05-batter_feet", "crops/high/R03-pitcher", "crops/high/R12-pitcher", "crops/high/R09-LF"], "fix": "Foot IK + ground lock: planted soles within 2 cm of terrain in stance, run-support and follow-through; no penetration of mound or dirt." },
    { "id": "G-face-sculpt", "category": "characters", "expectedGain": 1.0, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R02-batter_head", "crops/high/R07-SS"], "benchmark": "mpfb2_athlete_face, smb4-4", "fix": "Replace decal googly eyes with modelled lids, brow, nose, lips, ears and hair; at least 3 face variants." },
    { "id": "G-pitch-delivery-readable", "category": "animation", "expectedGain": 0.75, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["strips/high/R03", "crops/high/R03-pitcher"], "benchmark": "smb4-2", "fix": "Author leg lift, stride, arm path and follow-through; make R03 strip show 8 visibly distinct pitcher poses with the pitcher at 100+ px." },
    { "id": "G-replay-trot-cameras", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS5", "evidence": ["strips/high/R11", "strips/high/R10"], "fix": "Replay must play motion (R11 frames differ); HR camera follows the runner, who is in every R10 strip frame." },
    { "id": "G-garment-seams", "category": "characters", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R05-catcher", "crops/high/R17-pitcher_hands", "crops/high/R02-batter_hands"], "fix": "Remove sawtooth hem/collar/belt triangles, fix skin poke-through at elbow/wrist, restrict chest lettering decal to torso UVs." },
    { "id": "G-gear-cleats-caps", "category": "characters", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R05-batter_feet", "crops/high/R02-pitcher", "crops/high/R06-catcher_glove", "crops/high/R05-ump_head"], "benchmark": "smb3-1", "fix": "Add billed caps, ear-flap helmets, cleats, webbed glove, catcher chest protector/shin guards and framed masks for catcher and umpire." },
    { "id": "G-body-variety", "category": "characters", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["high/desktop/R05", "high/desktop/R14", "high/desktop/R17"], "benchmark": "smb4-4", "fix": "At least 3 body-shape presets (height, mass, belly) visibly different on the field." },
    { "id": "G-blocking-slab", "category": "environment", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS4", "evidence": ["high/desktop/R07", "high/mobile/R07", "high/desktop/R01"], "fix": "Remove or relocate the grey slab from the field and title cameras; texture stand and wall boxes." },
    { "id": "G-crowd-scale", "category": "environment", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS4", "evidence": ["high/desktop/R05", "high/desktop/R17", "high/mobile/R05"], "benchmark": "smb3-1, smb4-3", "fix": "Replace photo-card crowd with instanced 3D/imposter fans at correct scale; fans behind home at most 1.2x player size in pitching camera." },
    { "id": "G-face-fill-light", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS3", "evidence": ["crops/high/R02-batter_head", "high/desktop/R12"], "benchmark": "smb3-3", "fix": "Hemisphere/rim fill and skin shader with lifted floor for dark tones; contact AO under feet; tower light pools at night." },
    { "id": "G-field-camera-scale", "category": "readability", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS5", "evidence": ["strips/high/R07", "strips/high/R08", "high/desktop/R13"], "fix": "Tighter field cameras (fielders 30+ px) and a ball trail/marker so the fielder with the ball reads in every frame." },
    { "id": "G-hud-broadcast", "category": "ui", "expectedGain": 0.5, "severity": 2, "effort": "M", "workstream": "WS7", "evidence": ["high/desktop/R02", "high/landscape/R10"], "benchmark": "smb3-1, ootp26-1", "fix": "Compact score bug with line score and labelled count pips; banners with hierarchy; HUD chrome under 15% of desktop height." }
  ]
}
```
