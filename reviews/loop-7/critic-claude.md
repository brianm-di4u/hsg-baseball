# Critic A (critic-claude): loop 7, high tier

## 1. Verdict

Diamond Springs is now a clean, consistent low-to-mid-poly baseball game. The diamond, HUD and camera set-ups read well, and the swing and run cycles are animated believably. The players are still the weak link, and they are the campaign's priority. At broadcast distance they pass. In the close-ups they show the same problems over and over:
- Shoulders swell into padded humps above the deltoid (`crops/high/R17-pitcher_hands`, `crops/high/R02-pitcher`, `crops/high/R08-CF`), even though this loop's change log says the shoulders now follow the anatomy.
- Uniforms are untextured colour blocks with no folds.
- Gloves are brown sausage-finger mittens.
- The tops of the socks have a saw-tooth seam where they meet the cleats.
- The cleat decals have ragged, stair-stepped edges.
- Sleeve cuffs tear at the wrist.
- The umpire's mask cage is broken into gapped segments and hangs off the side of his face.
- Batters' faces under the helmet brim go almost pure black (`crops/high/R02-batter_head`).

Several of this loop's intended fixes do show: the helmet ear shell is continuous in `crops/high/R10-batter-trot`, and front foot planting looks better in `crops/high/R05-batter_feet`. But a bright piping stripe still cuts through "SPRINGS" and "HAMILTON". Nothing here reaches the 7 anchor for characters or charfit. Environment, lighting, UI and readability sit around 5.5 to 6.

## 2. Category scores

### Characters: 5.5
- **What works.** Fingers are separate and the hands wrap the bat (`crops/high/R02-batter_hands`). The helmet now has a continuous ear shell (`crops/high/R10-batter-trot`, `crops/high/R16-runner1`). Faces have real features when they are lit (`crops/high/R07-SS`, `crops/high/R14-batter`, `crops/high/R09-LF`). Skin tones vary, and there is a female batter with a ponytail (`high/desktop/R12`).
- **Uniforms.** They read as colour blocks: white, grey and black with flat shading, a placket stripe and a belt, and no folds at all (`crops/high/R17-pitcher_hands`, `crops/high/R02-batter`). Compare smb4-2 and smb3-3, where the stylised cloth has seams, piping and fold shading.
- **Shoulders.** Every fielder and pitcher has rounded slabs above the shoulders that read as football pads (`crops/high/R02-pitcher`, `crops/high/R03-pitcher`, `crops/high/R17-pitcher_hands`, `crops/high/R08-CF`).
- **Materials.** There is almost no material contrast. The helmet has a little gloss, but the glove is a matte brown blob with no web or lacing (`crops/high/R06-catcher_glove`, `crops/high/R17-pitcher_hands`).
- **Body types.** Builds are hard to tell apart. SS, CF, LF and 1B share one silhouette (`crops/high/R07-SS`, `crops/high/R08-CF`, `crops/high/R09-LF`, `crops/high/R16-1B`).
- **Gear.** The umpire's gear is the worst on show. The cage bars are segmented with gaps and pass through the cheek (`crops/high/R05-ump_head`), and the mask hangs at the side of his head (`crops/high/R05-batter-front`, `crops/high/R14-batter`).
- **Summary.** This is above the 5 anchor (separate fingers, a modelled glove, helmet and catcher's gear) but well short of the 7 anchor (cloth that reads as cloth, material contrast, three body types).

### Fidelity to reference (charfit): 5.5
- **Proportions.** Height, limb length and head size are close to `mpfb2_athlete_three_quarter` and `mpfb2_game27k_glb_three_quarter`. The brief's silhouette IoU of 0.878 (front) and 0.889 (side) agrees.
- **Face.** It is plainly derived from the same MPFB head; compare `crops/high/R09-LF` and `crops/high/R07-SS` with `mpfb2_athlete_face_34`. But it is far softer, with no eye detail and flat skin shading.
- **Shoulders.** The reference has a narrow, sloped shoulder line and a visible clavicle. The in-game shoulder bulges up and out of the jersey (`crops/high/R17-pitcher_hands`, `crops/high/R02-pitcher`), and that is the biggest silhouette difference at duel distance.
- **Garments.** They are far simpler than `si_jersey_three_quarter`: no collar construction, no fabric texture, no fold or hem.
- **Hands.** They hold up reasonably well against `mpfb2_athlete_hand` (`crops/high/R16-runner1`, `crops/high/R02-batter_hands`). The fingers are thick, there are no nails, and the cuff tears at the wrist.
- **LOD2.** The LOD2 numbers (pixel error 41–48%) show at low tier, where the cleats become rounded stumps (`crops/low/R05-batter_feet`).
- **Summary.** Proportions are roughly right and the silhouette is recognisable, but faces, hands and garments are much simpler than the reference. That is the 5 anchor, with a little credit for the face and hands.

### Animation: 6.0
- **Swing.** `strips/high/R04` shows a load in frames 1–4, a contact flash in frame 5, then rotation and a high finish in frames 6–8, and the back foot pivots. That sells contact.
- **Pitch.** `strips/high/R03` shows the set, the hands coming together and a real leg lift with the knee coming up in frames 6–8. The strip stops before the stride and release, so I can't judge them from it. The release frame (`crops/high/R12-pitcher`) has a decent stride, with the back foot on the rubber.
- **Run.** The base-running cycle in `strips/high/R10` plants its feet with contact shadows. The arms hardly swing, though: they are held at the chest in all 8 frames, which is stiff.
- **Fielding.** In `strips/high/R07` the shortstop runs and then drops into a fielding crouch with good leg bend. In frame 7 the ball rolls past behind his glove hand rather than into it, so the catch beat is unclear.
- **Replay.** `strips/high/R11` is mostly a slow camera pan, and the runner only appears in frames 7–8.
- **Summary.** This is between the 5 and 7 anchors. Feet are planted and the swing has its beats, but throws, catches and arm action are stiff.

### Environment: 5.5
- **Field.** The diamond is believable, the turf has a checker mow pattern, and the dirt has grain (`high/desktop/R07`, `high/desktop/R02`).
- **Crowd.** It is a flat photo texture on sloped planes. It reads as people from afar, but it is visibly upscaled and blurry at the wall camera (`high/mobile/R05`, `high/desktop/R17`). Compare the 3D crowd in smb4-3.
- **Signage.** The outfield-wall ad boards overlap one another, reading "GATOR FATORS" and "GATOR TORS" (`crops/high/R02-batter_hands`, `crops/high/R17-pitcher-back`).
- **Trees and backdrop.** The trees are faceted blobs and cones. A painted forest band sits as a hard horizontal seam above them (`high/desktop/R10`, `high/desktop/R15`, `high/desktop/R13`).
- **Stands.** In the title shot the concrete stands are flat, untextured grey (`high/desktop/R01`).
- **Behind the fence.** In `high/desktop/R15` a second, flat grey-and-tan field shows past the outfield fence.
- **What works.** Foul poles, light towers and the scoreboard are all built objects.

### Lighting: 6.0
- **Shadows.** The directional key casts grounded contact shadows (`crops/high/R03-pitcher`, `crops/high/R05-batter_feet`).
- **Golden hour.** The historic park's golden-hour grade is the best frame in the set (`high/desktop/R14`, `crops/high/R14-batter`).
- **Night.** At night the towers carry bloom halos and throw pools of light with multiple shadows (`high/desktop/R12`, `high/desktop/R13`). In R13, though, the outfield corners fall into flat black, and the lit band of forest above the black silhouettes reads as a seam.
- **Faces.** Under the helmets the faces crush to near-black with no sky fill or bounce (`crops/high/R02-batter_head`, `crops/high/R02-batter`). That fails "sky light and bounce that model the faces".
- **Summary.** This is above 5 but short of the 7 benchmarks (smb3-3, smb4-1).

### UI: 6.0
- **Score bar.** It is consistent, with team crests, the inning, a base diamond and B/S/O pips (`high/desktop/R02`, `high/desktop/R16`, where the runner on first lights the diamond).
- **Feedback and banners.** Pitch speed shows as "FB 77 mph". The "HOME RUN 400 FT" banner has clear hierarchy (`high/desktop/R10`, `high/desktop/R15`). The pitch-type buttons are clear (`high/desktop/R05`).
- **Wasted space.** The right score panel is a long, empty bar.
- **Hint text.** The control hint is tiny grey text in the lower left.
- **Motion.** None is shown, and there is no timing or pitch-result feedback in these frames.
- **Summary.** Functional and stylistically consistent, but short of ootp26-1 or smb3-1 broadcast polish.

### Readability: 6.0
- **Pitching camera.** It reads well: the zone, the target reticle and the ball with its trail are clear (`high/desktop/R06`, `high/desktop/R05`).
- **Batting camera.** It is clean (`high/desktop/R02`).
- **Wide play.** On the ground ball (`high/desktop/R07`, `high/mobile/R07`), the ball is a small white dot and players are about 20 px tall. Coloured rings help.
- **Lead-off runner.** At first base he is cut off at the right edge of the frame (`high/desktop/R16`).
- **Gap chase.** In `strips/high/R08` the ball is a 2–3 px dot against the outfield and the fielders are tiny.

### Mobile: 5.5
- **Portrait.** The framing is intentional and the buttons are large and thumb-friendly (`high/mobile/R02`, `high/mobile/R05`, `high/mobile/R07`).
- **Landscape.** The HUD takes about 18% of the height. The pitch and BUNT/STEAL/SWING buttons sit on the play area: the CB button covers the pitcher's legs in `high/landscape/R05`, and SWING and STEAL crowd the batter's feet and the plate in `high/landscape/R12`.
- **Crowd.** On the phone, the crowd photo is visibly low-res and upscaled (`high/mobile/R05`).
- **Performance.** Not measured this loop, so the 30 fps part of the 7 anchor can't be credited.

## 3. Character defects list

1. **Shoulders.** Shoulder humps or slabs rise above the deltoid and read as pads. Visible in `crops/high/R17-pitcher_hands`, `crops/high/R02-pitcher`, `crops/high/R03-pitcher`, `crops/high/R08-CF`, `crops/high/R07-SS`.
2. **Batter's face.** It is almost fully black under the helmet brim, with no features readable (`crops/high/R02-batter_head`, `crops/high/R02-batter`, `crops/high/R05-batter-front`).
3. **Helmet edge.** A dark strip still hangs down past the jaw on the far side of the batting helmet (`crops/high/R02-batter_head`, `crops/high/R02-batter_hands`).
4. **Umpire mask cage.** The bars are broken into segments with tan gaps and pass in front of and through the nose and cheek (`crops/high/R05-ump_head`).
5. **Umpire mask position.** The mask hangs off to the side of the umpire's face instead of in front of it (`crops/high/R05-batter-front`, `crops/high/R14-batter`).
6. **Umpire body.** The chest protector and torso are one smooth black blob with no straps or edges (`crops/high/R05-ump_head`, `crops/high/R05-ump`).
7. **Catcher's mitt.** It looks like a brown fist, with no pocket, web or lacing (`crops/high/R06-catcher_glove`).
8. **Fielder's glove.** It has sausage fingers and no web, lacing or leather texture (`crops/high/R17-pitcher_hands`, `crops/high/R08-CF`, `crops/high/R09-LF`).
9. **Catcher's shin guards.** They flare into boot-like flaps with no knee cap or straps (`crops/high/R06-catcher_glove`, `crops/high/R05-catcher`).
10. **Sock-to-cleat seam.** The seam is ragged and saw-toothed on most players (`crops/high/R02-pitcher`, `crops/high/R08-CF`, `crops/high/R09-LF`, `crops/high/R12-pitcher`).
11. **Cleat decals.** The white panels have stair-stepped, pixel-jagged edges. The cleats look like loafers, with no spikes or tongue (`crops/high/R05-batter_feet`, `crops/high/R02-batter`).
12. **Back foot.** In the stance the back cleat still looks slightly lifted, with its shadow separated from the sole (`crops/high/R05-batter_feet`, left foot).
13. **Wrist cuff tear.** A spike of skin or sleeve pokes out at the wrist (`crops/high/R16-runner1`, `crops/high/R16-1B`, `crops/high/R02-batter_hands`).
14. **Jersey lettering, piping.** The piping still cuts through the letters: "HOT SPRINGS" (`crops/high/R02-batter_hands`) and "LAKE HAMILTON", where the piping crosses the M (`crops/high/R17-pitcher_hands`).
15. **Jersey lettering, wrap.** On turned torsos the word runs off the chest edge: "AKESIDE" (`crops/high/R07-SS`), "LAKESIDI" (`crops/high/R02-pitcher`).
16. **Uniform cloth.** It is flat colour with no folds, wrinkles or fabric texture anywhere (`crops/high/R17-pitcher_hands`, `crops/high/R02-batter`).
17. **Belt.** Its lower edge is faceted and polygonal (`crops/high/R17-pitcher_hands`).
18. **Fielder caps.** They are dome-shaped like helmets, and the brim hides the eyes (`crops/high/R16-1B`, `crops/high/R03-pitcher`).
19. **Body type.** Fielders all share one build and one face shape (`crops/high/R07-SS` and `crops/high/R08-CF`, compared with `crops/high/R09-LF`).
20. **Low tier.** The LOD2 feet are rounded black stumps with no shoes (`crops/low/R05-batter_feet`). This is a low-tier regression or limit.

## 4. Ranked gaps

| # | Gap | Fix (testable) | Gain | Sev | Effort | WS |
|---|---|---|---|---|---|---|
| 1 | Flat colour-block uniforms with no cloth (characters, charfit) | Add a flannel normal and roughness map, plus baked fold AO at the elbows, waist, knees and armpits for each garment. Test: the R17 hands close-up shows visible fold shading and fabric grain. | +1.0 | 5 | M | WS1 |
| 2 | Shoulder humps and slabs | Shrink the jersey's shoulder offset to at most 0.3× the garment thickness over the acromion and trapezius, or re-weight the shoulder verts to the clavicle bone. Test: in the R02-pitcher and R17 close-ups the shoulder outline sits within 2% of the bare-body outline. | +0.5 | 4 | S | WS1 |
| 3 | Faces crushed black under helmet brims | Add a hemisphere or SH fill so faces get at least 15% sky light, or lift the face material's ambient. Test: in R02-batter_head the eyes and nose are readable, with face luminance above 25/255. | +0.5 | 4 | S | WS3 |
| 4 | Glove and mitt are mittens | Model a glove with a pocket, web and lacing and a leather normal map, and a distinct catcher's mitt. Test: the web and lacing are visible in R06-catcher_glove and R17-pitcher_hands. | +0.5 | 3 | M | WS1 |
| 5 | Umpire and catcher mask cage broken, and hanging at the side | Build the cage as continuous bent tubes, parented to the head bone and centred over the face. Test: in R05-ump_head the cage is in front of the face, with no gaps and no bars intersecting the skin. | +0.5 | 3 | S | WS1 |
| 6 | Ragged sock-to-cleat seam and jagged cleat decals | Cap the sock with a clean ring that overlaps the shoe collar. Use a higher-res, mip-filtered or vector decal for the cleat panel. Test: no saw-tooth edge in R05-batter_feet or R08-CF. | +0.3 | 2 | S | WS1 |
| 7 | Piping cuts through letters, and letters run off the chest | Mask the piping under the decal, or draw the decal after the piping with polygonOffset. Clamp the word width to the visible chest at a 45° torso turn. Test: "HAMILTON" is intact in R17-pitcher_hands, and R07-SS shows a full "LAKESIDE". | +0.3 | 2 | S | WS1 |
| 8 | Stiff arms in the run cycle, unclear catch beat | Add an arm swing of ±40° at the shoulder to the run cycle, plus a glove-to-ball reach IK at the catch. Test: arm positions alternate across the R10 strip, and the ball meets the glove in the R07 strip. | +0.5 | 3 | M | WS2 |
| 9 | Overlapping ad boards and seams in the painted backdrop | Space the boards on the wall without overlap. Blend the backdrop with a fog or height gradient into the 3D tree line. Test: no "GATOR FATORS" anywhere, and no hard band in R13 or R15. | +0.5 | 3 | S | WS4 |
| 10 | Flat photo crowd, upscaled on mobile | Use a higher-res or tiled crowd atlas on card instances with slight parallax, or a lower camera tilt so the crowd shows less. Test: no visible pixelation in mobile R05. | +0.3 | 2 | M | WS4 |
| 11 | Landscape buttons cover the action | Scale the landscape HUD to at most 12% of the height and move the action buttons to the side gutters, or raise the camera's target. Test: the pitcher's legs and the batter's feet are fully visible in landscape R05 and R12. | +0.5 | 3 | S | WS7 |
| 12 | Lead-off runner at the frame edge, tiny ball in wide shots | Widen the batting camera's FOV or yaw it slightly when a runner is on, and add a ball halo or shadow marker on wide cameras. Test: the R16 runner is fully in frame, and the R08 ball is at least 5 px. | +0.5 | 3 | S | WS5 |
| 13 | Low-tier LOD2 feet become stumps | Keep the shoe mesh in LOD2, decimated. Test: in low R05-batter_feet the shoes keep their silhouette. | +0.2 | 2 | S | WS6 |
| 14 | One fielder body and face | Vary height (±6%), shoulder width and face morphs per player across 3 visibly distinct builds. Test: SS, CF and LF close-ups differ in silhouette. | +0.3 | 2 | M | WS1 |

## 5. Scores (JSON)

```json
{
  "loop": 7,
  "role": "critic-claude",
  "tier": "high",
  "scores": {
    "characters": {
      "score": 5.5,
      "confidence": 0.75,
      "evidence": [
        {"shot": "crops/high/R17-pitcher_hands", "note": "shoulder humps, mitten glove, flat cloth, piping through HAMILTON"},
        {"shot": "crops/high/R05-ump_head", "note": "mask cage broken into gapped segments, intersecting face"},
        {"shot": "crops/high/R02-batter_head", "note": "face black under brim; dark strip hangs past jaw"},
        {"shot": "crops/high/R07-SS", "note": "readable face and fingers, but same build as other fielders"},
        {"shot": "crops/high/R06-catcher_glove", "note": "catcher's mitt reads as a brown fist"}
      ]
    },
    "charfit": {
      "score": 5.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "crops/high/R09-LF", "note": "MPFB face recognisable but soft, compared with mpfb2_athlete_face_34"},
        {"shot": "crops/high/R02-pitcher", "note": "shoulder line much wider and higher than mpfb2_athlete_three_quarter"},
        {"shot": "crops/high/R16-runner1", "note": "hands and proportions close to the reference; cuff tear"},
        {"shot": "crops/low/R05-batter_feet", "note": "LOD2 feet lose the shoe silhouette"}
      ]
    },
    "animation": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "strips/high/R04", "note": "load, contact flash, rotation and finish read"},
        {"shot": "strips/high/R03", "note": "set and leg lift; stride and release not shown"},
        {"shot": "strips/high/R10", "note": "feet planted, but arms locked at the chest"},
        {"shot": "strips/high/R07", "note": "good crouch; ball passes behind the glove in frame 7"}
      ]
    },
    "environment": {
      "score": 5.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R07", "note": "mow pattern, dirt grain, built poles and towers"},
        {"shot": "crops/high/R02-batter_hands", "note": "overlapping ad boards read GATOR FATORS"},
        {"shot": "high/desktop/R15", "note": "painted backdrop seam; flat field visible past the fence"},
        {"shot": "high/desktop/R01", "note": "untextured grey stands"}
      ]
    },
    "lighting": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R14", "note": "warm golden-hour grade with grounded shadows"},
        {"shot": "high/desktop/R12", "note": "tower bloom and even night exposure"},
        {"shot": "crops/high/R02-batter_head", "note": "no fill light under brims; faces crushed"},
        {"shot": "high/desktop/R13", "note": "black outfield corners; seam in the lit tree band"}
      ]
    },
    "ui": {
      "score": 6.0,
      "confidence": 0.65,
      "evidence": [
        {"shot": "high/desktop/R16", "note": "score bar with base diamond and count pips"},
        {"shot": "high/desktop/R10", "note": "HOME RUN banner with clear hierarchy"},
        {"shot": "high/desktop/R05", "note": "clear pitch buttons; empty right panel, tiny hint text"}
      ]
    },
    "readability": {
      "score": 6.0,
      "confidence": 0.65,
      "evidence": [
        {"shot": "high/desktop/R06", "note": "ball, zone and reticle clear"},
        {"shot": "high/desktop/R16", "note": "runner at first cut off at the frame edge"},
        {"shot": "strips/high/R08", "note": "ball and fielders tiny on the wide camera"},
        {"shot": "high/mobile/R07", "note": "rings help, but players are about 20 px"}
      ]
    },
    "mobile": {
      "score": 5.5,
      "confidence": 0.6,
      "evidence": [
        {"shot": "high/mobile/R02", "note": "intentional portrait framing, big thumb buttons"},
        {"shot": "high/landscape/R05", "note": "CB button covers the pitcher's legs; HUD about 18% of height"},
        {"shot": "high/landscape/R12", "note": "buttons crowd the batter's feet and the plate"},
        {"shot": "high/mobile/R05", "note": "crowd texture visibly upscaled; perf not measured"}
      ]
    }
  },
  "gaps": [
    {"id": "G-uniform-cloth", "category": "characters", "expectedGain": 1.0, "severity": 5, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R02-batter"], "benchmark": "smb4-2", "fix": "Flannel normal and roughness maps plus baked fold AO at the elbows, waist, knees and armpits; fold shading visible in the R17 close-up."},
    {"id": "G-shoulder-slab", "category": "charfit", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R02-pitcher", "crops/high/R17-pitcher_hands", "crops/high/R08-CF"], "benchmark": "mpfb2_athlete_three_quarter", "fix": "Shoulder garment offset at most 0.3x thickness over the acromion and trapezius, or re-weight to the clavicle; outline within 2% of the body outline."},
    {"id": "G-face-fill-under-brim", "category": "lighting", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS3", "evidence": ["crops/high/R02-batter_head", "crops/high/R05-batter-front"], "benchmark": "smb3-3", "fix": "Hemisphere or SH fill on skin so the face under the brim has luminance above 25/255 and readable eyes and nose."},
    {"id": "G-glove-model", "category": "characters", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R06-catcher_glove", "crops/high/R17-pitcher_hands"], "benchmark": "smb3-3", "fix": "Glove with pocket, web and lacing and a leather normal map; separate catcher's mitt mesh."},
    {"id": "G-ump-mask-cage", "category": "characters", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R05-ump_head", "crops/high/R14-batter"], "fix": "Continuous tube cage parented to the head bone and centred over the face; no gaps or skin intersection."},
    {"id": "G-arm-swing-catch-beat", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["strips/high/R10", "strips/high/R07"], "fix": "Arm swing of +/-40 degrees in the run cycle; glove-to-ball reach IK so the ball meets the glove."},
    {"id": "G-landscape-button-overlap", "category": "mobile", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/landscape/R05", "high/landscape/R12"], "fix": "Landscape HUD at most 12% of height, action buttons in the side gutters; pitcher legs and batter feet unobstructed."},
    {"id": "G-runner-framing-ball-size", "category": "readability", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS5", "evidence": ["high/desktop/R16", "strips/high/R08"], "fix": "Batting-camera yaw or FOV keeps the lead runner in frame; ball halo so it is at least 5 px on wide cameras."},
    {"id": "G-adboard-backdrop-seams", "category": "environment", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS4", "evidence": ["crops/high/R02-batter_hands", "high/desktop/R15", "high/desktop/R13"], "benchmark": "smb4-3", "fix": "Non-overlapping ad layout; fog or gradient blend between the painted backdrop and the 3D trees."},
    {"id": "G-sock-cleat-seam-decal", "category": "characters", "expectedGain": 0.3, "severity": 2, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R05-batter_feet", "crops/high/R08-CF"], "fix": "Sock cap ring overlapping the shoe collar; mip-filtered high-res cleat decal with no saw-tooth edges."},
    {"id": "G-lettering-piping", "category": "characters", "expectedGain": 0.3, "severity": 2, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R07-SS"], "fix": "Mask the piping under the decal and clamp the word width so a full LAKESIDE shows at a 45-degree turn."},
    {"id": "G-body-variety", "category": "characters", "expectedGain": 0.3, "severity": 2, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R07-SS", "crops/high/R08-CF", "crops/high/R09-LF"], "fix": "Three visibly distinct builds plus per-player face morphs and height variation."},
    {"id": "G-crowd-resolution", "category": "environment", "expectedGain": 0.3, "severity": 2, "effort": "M", "workstream": "WS4", "evidence": ["high/mobile/R05", "high/desktop/R17"], "benchmark": "smb4-3", "fix": "Higher-res crowd atlas on instanced cards with parallax; no pixelation in the mobile wall camera."},
    {"id": "G-lod2-feet", "category": "charfit", "expectedGain": 0.2, "severity": 2, "effort": "S", "workstream": "WS6", "evidence": ["crops/low/R05-batter_feet"], "fix": "Keep a decimated shoe mesh in LOD2 so the low tier keeps the cleat silhouette."}
  ],
  "verdict": "continue"
}
```
