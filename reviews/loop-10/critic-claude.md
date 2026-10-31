# Critic A (critic-claude): loop 10, high tier

## Verdict

Diamond Springs now has realistic human proportions and real articulated hands. The batter's fingers actually wrap the bat (`crops/high/R02-batter_hands`), the placket buttons added this loop read clearly (`crops/high/R17-pitcher_hands`), and the new contact shadow does darken the dirt at the sole edge (`crops/high/R05-batter_feet`). The silhouette metrics back up what the close-ups show: the body is close to the MPFB reference. Everything on top of that body is still at the 5 to 6 level. Uniforms are smooth, unshaded plastic with no folds. The cleats look like glossy dress loafers. Gloves are untextured brown mittens. Caps have helmet-shaped crowns. Faces under helmets fall into near-black shadow, and pale faces look washed out. The garment colour boundaries are ragged sawtooth edges at the collar and sock tops, and the high tier renders one jersey number mirrored (`high/desktop/R05`). Animation has real beats: leg lift and stride in the pitch, a contact flash and bat wrap in the swing, and a fielding crouch. It still reads as keyed and stiff, with T-armed poses and little secondary motion. The environment relies on flat photo crowd cards, faceted low-poly tree blobs, untextured grey stand boxes and visible backdrop seams. Against SMB3/SMB4 (`benchmarks/smb3-1`, `smb4-2`, `smb4-3`) this is clearly a tier below on materials, crowd and dressing. Nothing meets a gate this loop.

## Scores (high tier, desktop)

### Characters: 5.5
- **Hands:** they grip the bat with separate fingers (`crops/high/R02-batter_hands`, `crops/high/R17-pitcher_hands`), which meets one 7-anchor item.
- **Garments:** placket piping, buttons, chest wordmark, belt and two-tone socks are all present (`crops/high/R17-pitcher_hands`, `crops/high/R10-batter-trot`). The cloth has zero folds, wrinkles or sleeve hems. Pants and jersey render as uniform smooth plastic (`crops/high/R02-batter`, `crops/high/R08-CF`), well short of the "reads as cloth" requirement.
- **Material contrast:** weak. The helmet is a flat black dome (`crops/high/R02-batter_head`). Gloves are untextured brown mittens with no lacing or pocket (`crops/high/R06-catcher_glove`, `crops/high/R17-pitcher_hands`). Shoes are patent-leather loafers with no cleats or laces (`crops/high/R05-batter_feet`).
- **Faces:** they have modelled features. Under helmets they are lost to black (`crops/high/R02-batter_head`), and pale faces are bleached with no brows (`crops/high/R09-LF`, `crops/high/R17-pitcher-back`).
- **Body variety:** skin tones vary, but body type is essentially one build throughout (`high/desktop/R14`, `high/desktop/R17`).
- **Benchmarks:** `smb4-2` and `smb3-3` have richer kits, piping and gloves.

### Fidelity to reference (charfit): 6.0
- **Proportions:** head-to-body ratio, limb length and torso taper are recognisably the MPFB athlete (`art-src/samples/reference-renders/mpfb2_athlete_three_quarter.png`) in `crops/high/R16-runner1` and `crops/high/R02-batter`. The brief's IoU of 0.878 front and 0.895 side agrees.
- **Shoulders:** the shoulder masses on the white kits are inflated into bulbous pads (`crops/high/R08-CF`, `crops/high/R03-pitcher`), which drifts from the reference deltoid shape.
- **Face:** compared with `mpfb2_athlete_face_34`, the in-game face has no readable eyes or brows at close range (`crops/high/R02-batter_head`, `crops/high/R09-LF`).
- **Hands:** compared with `mpfb2_athlete_hand`, the bare hand in `crops/high/R17-pitcher_hands` is close in finger count and shape but flatter and waxy.
- **Garment:** compared with `si_jersey_front`, the jersey has no weave, wear, collar construction or fabric drape.
- **Distance:** at 140 px and below the proportions hold (`high/desktop/R02`).
- **Overall:** recognisably the same kind of human. The face and garment simplifications are visible well beyond close-up range.

### Animation: 6.0
- **Pitch (`strips/high/R03`):** legible leg lift (frames 4 to 6), stride with glove-arm lead (frame 7) and a landing follow-through (frame 8). Frame 7 is a stiff, near-T-pose arm spread with no torso coil or hip-shoulder separation.
- **Swing (`strips/high/R04`):** contact flash and ball trail (frames 3 and 4), then a finish with the bat wrapping high (frames 6 to 8). Frame 4's bat and hands are hard to read, and rotation has little hip lead. The frozen close-up `crops/high/R04-batter` shows the ball at the batter's front shoe while he is still fully loaded with the bat on his shoulder, so the swing and the ball are out of sync at that moment.
- **Fielding (`strips/high/R07`):** the SS's run-in and crouch read, with the glove down by frame 7.
- **Trot (`strips/high/R10`):** the run cycle has planted feet but nearly frozen elbows and no torso bob or counter-rotation. The arms stay locked at the hip in `crops/high/R10-batter-trot` too.
- **R08:** `strips/high/R08` is too far away to judge the chase at all.
- **Benchmark:** no overlap or secondary motion compared with `smb4-2`'s leg lift.

### Environment: 5.5
- **Field:** the turf has checker mow stripes and the dirt has grain at field level (`high/desktop/R07`, `crops/high/R05-batter_feet`). Light towers, foul poles, scoreboard and outfield signage are built objects.
- **Crowd:** the crowd is a flat photo card with obvious repeated tiles, and at mobile scale it is a blown-up, blurry photograph (`high/desktop/R05`, `high/mobile/R05`).
- **Trees:** low-poly faceted blobs set against a photo backdrop, with a hard horizontal haze seam where the two meet (`high/desktop/R09`, `high/desktop/R10`, `high/desktop/R15`).
- **Stands and dugout:** the stands are untextured grey boxes (`high/desktop/R01`), and the R14 dugout is a black rectangle (`crops/high/R14-batter`).
- **R15 oddity:** there are unexplained grey ovals with dark scattered shapes beyond the fence (`high/desktop/R15`).
- **Benchmarks:** compared with `smb3-1` and `smb4-3`, there is no crowd that reads as people and no dressing density.

### Lighting & atmosphere: 6.0
- **Shadows:** the directional key casts clear player shadows, and the new contact shadows ground the soles (`crops/high/R05-batter_feet`, `high/desktop/R02`).
- **Historic park:** the golden afternoon in `high/desktop/R14` and `crops/high/R14-batter` is the best-lit capture.
- **Night (`high/desktop/R13`):** tower light pools are believable on the grass, but the outfield backdrop is a black void with a lit band of trees floating above it.
- **Faces:** there is no sky fill or bounce. Faces under helmet brims are near-black (`crops/high/R02-batter_head`, `crops/high/R10-batter-trot`).
- **Haze and specular:** no haze or depth except a band at the backdrop seam, and helmet specular is minimal.
- **Benchmarks:** `smb3-3` and `smb4-1` are well above this.

### UI & typography: 6.5
- **Score bug:** a consistent broadcast top bar with team marks, inning, base diamond, B/S/O pips, pitcher and batter line, and pitch speed (`high/desktop/R06`, `high/desktop/R16`, where the runner on first lights the diamond).
- **Banner:** the HOME RUN / 400 FT banner has good hierarchy (`high/desktop/R10`).
- **Controls:** the bottom control bar is clean and keyed.
- **Weaknesses:**
  - The bar takes about 11% of the frame.
  - The in-world scoreboard duplicates it.
  - The title menu is a translucent panel over a busy moving scene, which hurts legibility (`high/desktop/R01`).
  - There is no timing or pitch-result feedback in any captured frame.
- **Benchmarks:** below `smb3-1` and `ootp26-1` in polish.

### Readability: 6.0
- **Batting and pitching cameras:** these read well, with a clear zone, ball and target (`high/desktop/R02`, `high/desktop/R05`, `high/desktop/R06` with the ball trail).
- **Wide fielding cameras:** players are about 15 to 25 px tall dots, and only the coloured rings identify them (`high/desktop/R07`, `high/desktop/R08`, `high/desktop/R09`). The fielder with the ball is not distinguished.
- **Runner on first:** in `high/desktop/R16` the runner is clipped at the right frame edge next to the RF.
- **Night:** the night batting view is fine (`high/desktop/R12`).

### Mobile: 6.0
- **Portrait framing:** intentional, with large thumb buttons and a readable HUD at 390 px (`high/mobile/R02`, `high/mobile/R12`).
- **Phone throttle:** the 4× throttle phone proxy holds 52 fps minimum on medium (perf table), so this passes.
- **Wide shots:** in `high/mobile/R07` the figures are tiny.
- **Landscape overlaps:**
  - The BUNT and STEAL buttons sit over the batter's feet and the plate area (`high/landscape/R02`).
  - The pitch-type buttons overlap the pitcher's legs (`high/landscape/R05`).
  - The HOME RUN banner covers the scoreboard and sits on top of the ball's flight (`high/landscape/R10`).
- **Landscape HUD:** the landscape HUD drops the pitcher/batter line.

## Character defects list

1. **Mirrored back number on the pitcher:** "27" renders reversed in `high/desktop/R05` (zoomed). It reads correctly in `medium/desktop/R05`, `high/mobile/R05` and `high/desktop/R06`, so this is a high-tier decal or normal-side bug.
2. **Sawtooth colour boundaries at the collar and neck:** jagged triangle edges between the yellow undershirt and the black jersey (`crops/high/R02-batter_head`), and on the blue collar of the white kits (`crops/high/R16-1B`, `crops/high/R08-CF`).
3. **Ragged sock-to-shoe boundary:** a torn-looking edge at the ankle (`crops/high/R07-SS`, `crops/high/R09-LF`, `crops/high/R02-pitcher`, `crops/high/R12-pitcher`).
4. **Ragged sleeve boundary:** a jagged boundary on the yellow undershirt sleeve at the jersey sleeve edge (`crops/high/R02-batter_head`, `crops/high/R02-batter_hands`).
5. **Lettering hidden by piping:** the chest wordmark is drawn under the placket piping. In "HOT SPRINGS" the piping covers the "R" (`crops/high/R02-batter_hands`). In "LAKE HAMILTON" a stripe crosses the "I" (`crops/high/R17-pitcher_hands`). In "LAKESIDE" the "E" is cut (`crops/high/R03-pitcher`).
6. **Cleats:** glossy patent-leather loafers with no cleats, laces or tongue (`crops/high/R05-batter_feet`, `crops/high/R10-batter-trot`).
7. **Gloves:** untextured brown mittens with sausage fingers and no lacing, web or pocket (`crops/high/R06-catcher_glove`, `crops/high/R17-pitcher_hands`, `crops/high/R07-SS`). The catcher's mitt is not a catcher's mitt shape.
8. **Caps:** modelled with helmet-like tall rounded crowns, and the R12 crown is pointed (`crops/high/R08-CF`, `crops/high/R12-pitcher`, `crops/high/R16-1B`).
9. **Batting helmet:** the brim is a separate grey-tan material that does not match the shell (`crops/high/R02-batter_head`), and the earflap is a thin slab.
10. **Umpire's mask floats:** it sits off the face to the side, with the cage bars in mid-air beside the cheek (`crops/high/R05-batter-front`, `crops/high/R14-batter`). In front view the bars extend down over the chest (`crops/high/R05-ump_head`).
11. **Faces too dark under helmets:** no readable eyes (`crops/high/R02-batter_head`, `crops/high/R10-batter-trot`).
12. **Pale faces:** bleached, with no brows or hair definition (`crops/high/R09-LF`, `crops/high/R17-pitcher-back`, `crops/high/R16-1B`).
13. **No cloth folds anywhere:** pants and jerseys are smooth, uniform shading (`crops/high/R02-batter`, `crops/high/R08-CF`, `crops/high/R12-pitcher`).
14. **Inflated shoulders:** shoulder balloons on the white kits (`crops/high/R08-CF`, `crops/high/R03-pitcher`).
15. **Catcher gear:**
    - The chest protector reads as a dark-blue jersey panel with a crumpled collar edge, not padded gear (`crops/high/R06-catcher_glove`).
    - The shin guards are blobby blue flaps (`crops/high/R05-catcher`, `crops/high/R06-catcher_glove`).
16. **Belt across the forearms:** the belt band reads in front of the forearms between glove and hand in the set position (`crops/high/R17-pitcher_hands`).
17. **Dark wrist seam:** a dark nick or seam at the cuff-to-hand join (`crops/high/R16-1B`, `crops/high/R16-runner1`).
18. **Pitching rubber:** a tall white slab sitting on top of the mound, so the pitcher's feet stand on a box (`crops/high/R02-pitcher`, `crops/high/R17-pitcher-back`).
19. **Close-up framing:** the ump and catcher close-ups are blocked by the batter (`crops/high/R05-ump`, `crops/high/R05-catcher`). The R09 "fly ball caught" close-up shows the LF running with an empty glove and no ball (`crops/high/R09-LF`).
20. **Low-tier regression (not scored):** the LOD2 face at close range is a cartoon with ping-pong eyes (`crops/low/R02-batter_head`). In `low/desktop/R05` the pitcher's cap band reads as a black blindfold.

## Ranked gaps

1. **G-cloth-folds-normal** (characters, WS1)
   - **Fix:** add a baked fold, crease and weave normal map plus AO for the jersey and pants (sleeve hem, elbow, knee and crotch folds), and a fabric roughness variation.
   - **Test:** fold shading visible in `crops/high/R02-batter` and `R08-CF`.
   - **Expected gain / severity / effort:** +1.0, sev 5, M.
2. **G-gear-materials** (characters, WS1)
   - **Fix:** replace the loafers with cleats (sole plate, laces, tongue, white logo) and replace the mitten glove with a laced glove and web, plus a distinct catcher's mitt. Give leather a normal map and textured roughness.
   - **Test:** `crops/high/R05-batter_feet`, `R06-catcher_glove`, `R17-pitcher_hands`.
   - **Expected gain / severity / effort:** +0.5, sev 4, M.
3. **G-region-edge-aliasing** (characters, WS1)
   - **Fix:** fix the sawtooth colour-region boundaries at the collar, sleeve and sock by moving to texture-masked regions with smooth UV seams instead of per-triangle colour, and render lettering above the piping.
   - **Test:** no jagged edges in `crops/high/R02-batter_head` or `R16-1B`, and full wordmarks in `R02-batter_hands`.
   - **Expected gain / severity / effort:** +0.5, sev 4, S.
4. **G-face-fill-light** (lighting, WS3)
   - **Fix:** add a sky/hemisphere fill and a rim or bounce term on characters (or SSAO-aware ambient) so faces under brims keep visible eyes. Expose and grade pale skin so it is not bleached.
   - **Test:** eyes readable in `crops/high/R02-batter_head` and brows readable in `R09-LF`.
   - **Expected gain / severity / effort:** +0.5 lighting, +0.5 characters, sev 4, S.
5. **G-mirrored-number** (characters, WS1)
   - **Fix:** fix the high-tier back-number decal winding or side so "27" reads correctly in `high/desktop/R05`.
   - **Expected gain / severity / effort:** +0.25, sev 3, S.
6. **G-ump-mask-fit** (characters, WS1)
   - **Fix:** fit the umpire's mask to the face (pads against the forehead and chin, cage about 2 in off the face) and fix the bars extending over the chest.
   - **Test:** `crops/high/R05-ump_head`, `R14-batter`.
   - **Expected gain / severity / effort:** +0.25, sev 3, S.
7. **G-cap-shape** (charfit, WS1)
   - **Fix:** model a six-panel cap with a lower, flatter crown, a button and a curved bill, separate from the batting helmet. Reduce the shoulder inflation on the kit mesh.
   - **Test:** `crops/high/R08-CF`, `R12-pitcher`.
   - **Expected gain / severity / effort:** +0.5, sev 3, M.
8. **G-pitch-swing-coil** (animation, WS2)
   - **Fix:** in the pitch, add hip-shoulder separation and a torso coil at the stride, and replace the frame-7 T-arms with a scapula-loaded throwing arm. In the swing, add a hip lead before the hands and sync the swing start so the bat is through the zone when the ball reaches the plate.
   - **Test:** `strips/high/R03` frame 7, `strips/high/R04` frames 2 to 4, `crops/high/R04-batter`.
   - **Expected gain / severity / effort:** +0.5, sev 4, M.
9. **G-run-secondary** (animation, WS2)
   - **Fix:** add arm swing with elbow flex, torso counter-rotation and vertical bob to the run and trot cycles.
   - **Test:** `strips/high/R10`, `crops/high/R10-batter-trot`.
   - **Expected gain / severity / effort:** +0.5, sev 3, S.
10. **G-crowd-and-stands** (environment, WS4)
    - **Fix:** replace the photo crowd card with instanced billboard or low-poly fans at varied depth, with a higher-resolution atlas on mobile. Texture the grey stand boxes (seats, rails) and fix the backdrop haze seam and the grey ovals beyond the fence.
    - **Test:** `high/desktop/R05`, `high/mobile/R05`, `high/desktop/R01`, `high/desktop/R15`, `high/desktop/R09`.
    - **Expected gain / severity / effort:** +1.0, sev 4, L.
11. **G-wide-cam-figures** (readability, WS5)
    - **Fix:** tighten the ground-ball and gap camera follow so the fielder with the ball is at least 60 px tall, and highlight the fielder with the ball. Keep the R16 runner inside the frame.
    - **Test:** `high/desktop/R07`, `R08`, `R16`, `high/mobile/R07`.
    - **Expected gain / severity / effort:** +0.5, sev 3, M.
12. **G-landscape-overlap** (mobile, WS7)
    - **Fix:** in landscape, reserve a bottom safe area or shift the camera up so the BUNT, STEAL and pitch buttons never cover the batter's feet, the plate or the pitcher. Move the HOME RUN banner off the ball path. Restore the pitcher/batter line.
    - **Test:** `high/landscape/R02`, `R05`, `R10`.
    - **Expected gain / severity / effort:** +0.5, sev 3, S.
13. **G-night-backdrop** (lighting, WS3)
    - **Fix:** light or fog the night outfield backdrop so there is no black void beneath a lit tree band (`high/desktop/R13`).
    - **Expected gain / severity / effort:** +0.25, sev 2, S.

```json
{
  "loop": 10,
  "role": "critic-claude",
  "tier": "high",
  "scores": {
    "characters": {
      "score": 5.5,
      "confidence": 0.75,
      "evidence": [
        { "shot": "crops/high/R02-batter_hands", "note": "fingers grip bat; jagged sleeve/collar colour edges; wordmark R hidden under piping" },
        { "shot": "crops/high/R05-batter_feet", "note": "glossy loafer shoes, no cleats/laces; contact shadow now visible" },
        { "shot": "crops/high/R06-catcher_glove", "note": "mitten glove without lacing; blobby shin guards; chest protector reads as jersey" },
        { "shot": "crops/high/R02-batter_head", "note": "face nearly black under helmet; mismatched brim material" },
        { "shot": "high/desktop/R05", "note": "pitcher back number 27 rendered mirrored" },
        { "shot": "crops/high/R08-CF", "note": "no cloth folds, inflated shoulders, helmet-shaped cap" }
      ]
    },
    "charfit": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        { "shot": "crops/high/R16-runner1", "note": "proportions match mpfb2_athlete reference" },
        { "shot": "crops/high/R09-LF", "note": "face far simpler than mpfb2_athlete_face_34; bleached, no brows" },
        { "shot": "crops/high/R17-pitcher_hands", "note": "hand shape close to mpfb2_athlete_hand; garment has none of si_jersey weave/drape" },
        { "shot": "crops/high/R03-pitcher", "note": "shoulder masses inflated vs reference deltoid" }
      ]
    },
    "animation": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        { "shot": "strips/high/R03", "note": "leg lift, stride, follow-through present; frame 7 stiff T-arms, no hip-shoulder separation" },
        { "shot": "strips/high/R04", "note": "contact flash and bat wrap finish; little hip lead" },
        { "shot": "crops/high/R04-batter", "note": "ball at front shoe while batter still loaded: swing/ball desync" },
        { "shot": "strips/high/R07", "note": "SS run-in and fielding crouch read" },
        { "shot": "strips/high/R10", "note": "trot with planted feet but frozen arms, no torso motion" }
      ]
    },
    "environment": {
      "score": 5.5,
      "confidence": 0.75,
      "evidence": [
        { "shot": "high/desktop/R05", "note": "flat tiled photo crowd card" },
        { "shot": "high/desktop/R01", "note": "untextured grey stand boxes" },
        { "shot": "high/desktop/R15", "note": "backdrop haze seam; unexplained grey ovals beyond fence" },
        { "shot": "high/desktop/R07", "note": "mow stripes and dirt grain present" }
      ]
    },
    "lighting": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        { "shot": "high/desktop/R14", "note": "convincing golden afternoon key" },
        { "shot": "crops/high/R05-batter_feet", "note": "contact shadow grounds sole" },
        { "shot": "crops/high/R02-batter_head", "note": "no fill: face black under brim" },
        { "shot": "high/desktop/R13", "note": "tower light pools good, but black void backdrop under lit tree band" }
      ]
    },
    "ui": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        { "shot": "high/desktop/R16", "note": "consistent score bug, base diamond lit, count pips" },
        { "shot": "high/desktop/R10", "note": "HOME RUN banner with clear hierarchy" },
        { "shot": "high/desktop/R01", "note": "translucent menu over busy scene hurts legibility" },
        { "shot": "high/desktop/R06", "note": "pitch speed shown; no timing/result feedback captured" }
      ]
    },
    "readability": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        { "shot": "high/desktop/R06", "note": "ball with trail, zone and target read clearly" },
        { "shot": "high/desktop/R08", "note": "fielders are ~15 px dots; fielder with ball not distinguished" },
        { "shot": "high/desktop/R16", "note": "runner on first clipped at frame edge" },
        { "shot": "high/landscape/R02", "note": "buttons cover batter feet and plate" }
      ]
    },
    "mobile": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        { "shot": "high/mobile/R02", "note": "intentional portrait framing, big thumb buttons, readable HUD" },
        { "shot": "high/mobile/R07", "note": "figures tiny on wide shot" },
        { "shot": "high/landscape/R05", "note": "pitch buttons overlap pitcher legs" },
        { "shot": "high/landscape/R10", "note": "HOME RUN banner covers scoreboard and ball path; batter/pitcher line dropped" }
      ]
    }
  },
  "gaps": [
    { "id": "G-cloth-folds-normal", "category": "characters", "expectedGain": 1.0, "severity": 5, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R02-batter", "crops/high/R08-CF", "crops/high/R12-pitcher"], "benchmark": "smb4-2", "fix": "Bake fold/crease/weave normal + AO maps for jersey and pants (sleeve hems, elbow, knee, crotch) with fabric roughness variation; verify fold shading in R02-batter and R08-CF close-ups." },
    { "id": "G-gear-materials", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R05-batter_feet", "crops/high/R06-catcher_glove", "crops/high/R17-pitcher_hands"], "benchmark": "smb3-3", "fix": "Replace loafer shoes with cleats (sole plate, laces, tongue), mitten gloves with laced glove/web and a distinct catcher's mitt; leather normal and roughness maps." },
    { "id": "G-region-edge-aliasing", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R02-batter_head", "crops/high/R16-1B", "crops/high/R07-SS", "crops/high/R02-batter_hands"], "fix": "Replace per-triangle colour regions at collar, sleeve and sock with texture-masked smooth boundaries; draw chest wordmark above placket piping so no letters are hidden." },
    { "id": "G-face-fill-light", "category": "lighting", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS3", "evidence": ["crops/high/R02-batter_head", "crops/high/R10-batter-trot", "crops/high/R09-LF"], "benchmark": "smb3-3", "fix": "Add hemisphere sky fill plus rim/bounce on characters so eyes read under brims; re-grade pale skin so it is not bleached. Also lifts characters ~0.5." },
    { "id": "G-mirrored-number", "category": "characters", "expectedGain": 0.25, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["high/desktop/R05"], "fix": "Fix high-tier back-number decal winding/side so 27 reads correctly in high/desktop/R05 (correct on medium and mobile)." },
    { "id": "G-ump-mask-fit", "category": "characters", "expectedGain": 0.25, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R05-ump_head", "crops/high/R05-batter-front", "crops/high/R14-batter"], "fix": "Fit umpire mask to the face with pads at forehead/chin and the cage ~2 in off the face; stop the bars extending over the chest." },
    { "id": "G-cap-shape", "category": "charfit", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R08-CF", "crops/high/R12-pitcher", "crops/high/R16-1B"], "fix": "Model a six-panel ball cap (lower crown, button, curved bill) separate from the batting helmet; reduce shoulder inflation of the kit mesh toward the reference deltoid." },
    { "id": "G-pitch-swing-coil", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["strips/high/R03", "strips/high/R04", "crops/high/R04-batter"], "benchmark": "smb4-2", "fix": "Add hip-shoulder separation and torso coil at stride, replace frame-7 T-arms with a loaded throwing arm; add hip lead in swing and sync swing start so the bat crosses the zone as the ball arrives." },
    { "id": "G-run-secondary", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS2", "evidence": ["strips/high/R10", "crops/high/R10-batter-trot"], "fix": "Add arm swing with elbow flex, torso counter-rotation and vertical bob to run/trot cycles." },
    { "id": "G-crowd-and-stands", "category": "environment", "expectedGain": 1.0, "severity": 4, "effort": "L", "workstream": "WS4", "evidence": ["high/desktop/R05", "high/mobile/R05", "high/desktop/R01", "high/desktop/R15", "high/desktop/R09"], "benchmark": "smb4-3", "fix": "Replace photo crowd card with instanced depth-varied fans (sharper atlas on mobile); texture grey stand boxes; remove backdrop haze seam and the grey ovals beyond the R15 fence." },
    { "id": "G-wide-cam-figures", "category": "readability", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS5", "evidence": ["high/desktop/R07", "high/desktop/R08", "high/desktop/R16", "high/mobile/R07"], "fix": "Tighten ball-in-play camera so the fielder with the ball is >=60 px tall and highlighted; keep lead runner inside frame in R16." },
    { "id": "G-landscape-overlap", "category": "mobile", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/landscape/R02", "high/landscape/R05", "high/landscape/R10"], "fix": "Reserve a bottom safe area / raise camera in landscape so buttons never cover batter, plate or pitcher; keep HOME RUN banner off the ball path; restore the pitcher/batter line." },
    { "id": "G-night-backdrop", "category": "lighting", "expectedGain": 0.25, "severity": 2, "effort": "S", "workstream": "WS3", "evidence": ["high/desktop/R13"], "benchmark": "smb4-1", "fix": "Light or fog the night outfield backdrop so there is no black void under the lit tree band." }
  ],
  "verdict": "continue"
}
```
