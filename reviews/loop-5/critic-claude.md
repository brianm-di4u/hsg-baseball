# Critic A (critic-claude): loop 5, high tier

## Verdict

Diamond Springs plays and reads like a competent mid-tier browser game, but its characters, which are this campaign's priority, are well short of every gate. The close-ups show a clean, consistent low-to-mid-poly figure with separate fingers and a glossy helmet. They also show a run of construction faults that a broadcast close-up exposes straight away:
- Cleats hover above the dirt in the batting stance.
- The umpire's and catcher's masks float off the face as loose ladders of bars.
- Batting-helmet ear flaps are flat black fins.
- The hands sit beside the bat handle instead of wrapping it.
- Jersey wordmarks render with broken glyphs.
- Piping and belt edges are jagged and sawtoothed.
- Faces are crushed to black under every brim.

The rebuilt glove reads as a lumpy oven mitt with no pocket, web or lacing. Animation shows a real leg lift and readable run cycles, but the swing strip has no visible load or stride, and the contact close-up shows the ball at the batter's ankles while the bat is still cocked. Environment, lighting and UI hold at a functional 5.5–6. Nothing is at its gate. **Continue.**

## Scores (high tier, desktop; mobile from mobile and landscape)

### characters: 5.0
- `crops/high/R02-batter_head`: no readable face at all. The brim and the head shadow turn the whole face black, and the ear flaps are two flat black card planes standing off the helmet shell. The brim reads as a chrome-white strip, not painted plastic. Compare `art-src/samples/reference-renders/hbm_male_realistic_face_34.png` and `mpfb2_athlete_face.png`: eyes, nose and lips are all modelled there. In the game none of them survive a close-up of a helmeted batter.
- `crops/high/R02-batter_hands` and `crops/high/R14-batter`: the hands are stacked or crossed beside the handle, with the forearms crossed in an X. The bat does not pass through closed fists. That fails the 7 anchor ("hands that grip the bat").
- `crops/high/R17-pitcher_hands`:
  - The bare hand is decent: separate fingers and a believable thumb.
  - The glove is a smooth brown mitt of four sausage stalls, with no pocket, web, lacing, binding or stitching.
  - The "LAKE HAMILTON" wordmark renders as "LAKF HAMII TON" with broken glyphs.
  - The two chest bulges read as breasts under the wordmark.
  - The belt's lower edge is a sawtooth.
- `crops/high/R05-batter_feet`: both cleats float visibly above the dirt. The shadows are offset below, with a clear gap. The white cleat stripe is a pixel-stair aliased texture.
- `crops/high/R05-ump_head`: the umpire's mask bars sit at chest height, below the lips, not on the face. The bars show white seam breaks along each tube, and a bare shoulder or neck of skin shows where the shirt collar should be.
- Positives:
  - Glossy helmet against matte flannel against leather does give material contrast.
  - There are visible belts, socks and placket piping.
  - Builds do differ: `crops/high/R12-pitcher` and `crops/high/R08-CF` are stocky, and `crops/high/R17-pitcher-back` and `crops/high/R09-LF` are lean.
- Uniforms are still flat colour blocks with no folds (`crops/high/R03-pitcher`, `crops/high/R10-batter-trot`).
- Against smb4-4 and smb4-2, which show tailored kit, number fonts, readable faces and a stitched glove, this is a 5. It is not a 7.

### charfit: 5.0
- Silhouette and proportions are roughly right at broadcast distance (`high/desktop/R05`, `high/desktop/R14`), consistent with the reported IoU of 0.875/0.900.
- In the close-ups the stocky build departs from any realistic reference:
  - `crops/high/R12-pitcher` and `crops/high/R08-CF` have inflated, balloon-like upper arms.
  - The deltoid caps bulge out of the sleeves.
  - The chest is a barrel with no pectoral or abdominal break.
- Compare `hbm_male_realistic_front.png` and `mpfb2_athlete_three_quarter.png`: tapered deltoids, visible clavicles, and a waist narrower than the chest.
- Faces are never recognisable as the reference human. They are dark voids under the brim in `crops/high/R02-batter_head`, `crops/high/R10-batter-trot` and `crops/high/R07-SS`. The lighter-skinned faces in `crops/high/R09-LF` and `crops/high/R16-1B` are smooth masks with no eye detail at crop scale.
- Hands are the closest match to `mpfb2_athlete_hand.png`: there are knuckle bumps in `crops/high/R17-pitcher_hands`.
- Garments are far simpler than the `si_jersey` reference (no collar, no sleeve hem, no folds).
- LOD2 pixel error of 38–45% at every distance is a real at-distance fidelity hole.

### animation: 5.0
- `strips/high/R03` (pitch):
  - Frames 1–5 are a slow, nearly static set with the hands creeping up.
  - Frames 6–8 show a real knee lift with the glove raised.
  - Stride, release and follow-through are not in the strip, so weight transfer through release can't be confirmed.
- `strips/high/R04` (swing):
  - Frames 1–4 show no load and no visible stride. The batter is frozen while the ball travels.
  - Between frames 4 and 5 the bat jumps from cocked to through the zone. That is a pose swap, not a swing with rotation.
  - Frames 6–8 do show a finish and a hip turn.
  - The contact flash and the bat trail are the only things selling contact.
- `crops/high/R04-batter` (the "through contact" freeze): the ball is at the batter's ankles, between his feet, while the bat is still up behind the head. The swing and the ball are out of sync.
- `strips/high/R07` and `strips/high/R10`: the run cycles read, the feet hit their contact shadows, and the shortstop's crouch-and-field beat in frames 5–8 of R07 is clear. But the arms barely pump (`crops/high/R10-batter-trot`: forearms frozen in front of the torso), and the trot looks like a shuffle with locked elbows.
- `crops/high/R05-batter_feet`: feet hover in the stance, so they aren't planted.
- `strips/high/R08`: the camera does follow the chase, but the figures are too small to judge.
- Against smb3-3 and smb4-2 (leg-lift weight and torso lean), this is a 5.

### environment: 5.5
- Positives:
  - `high/desktop/R07` and `high/desktop/R10` have checkerboard mow stripes, grainy dirt, foul poles, built light towers, an outfield wall with distance numbers, and a scoreboard.
  - `high/desktop/R14` and `high/desktop/R15`: the historic park has a textured board fence and golden foliage.
- Negatives:
  - The crowd in `high/desktop/R05` and `high/desktop/R17` is a flat photographic billboard on tilted planes. It reads as "people" at a distance but is visibly a texture.
  - On `high/mobile/R05` the crowd is a blurry, repeating tile, with the same faces recurring.
  - Stands and concrete are bare grey boxes with no rails, aisles or roof (`high/desktop/R01`, `high/landscape/R07`).
  - Hardwood trees are faceted low-poly lumps when seen near (`crops/high/R03-pitcher`, `crops/high/R16-runner1`), and the pines are flat black cones (`crops/high/R02-batter`).
  - `high/desktop/R15`: beyond the right-field fence sit unexplained grey-blue discs and a sand oval, which read as a visual bug.
  - The pitcher's rubber is a white slab raised well above the mound (`crops/high/R02-pitcher`, `crops/high/R12-pitcher`).
- smb4-3 and smb3-1 (architecture, a 3D crowd, bunting) are far ahead.

### lighting: 5.5
- There is a directional key with shadows and contact shadows (`crops/high/R16-runner1`, `crops/high/R16-1B`), and the golden-hour grade in `high/desktop/R14` and `high/desktop/R15` works.
- Helmets show specular (`crops/high/R05-catcher`).
- But there is no fill or bounce on faces. Every helmeted face is crushed to black (`crops/high/R02-batter_head`, `crops/high/R07-SS`, `crops/high/R10-batter-trot`).
- The night game `high/desktop/R12` is lit almost like day, with a flat, uniform infield and no tower falloff or pooling on the near field.
- `high/desktop/R13` has pools from the towers, but the surround collapses to pure black silhouettes.
- `crops/high/R12-pitcher` (a night final) looks like an overcast afternoon.
- smb4-1 and smb3-4 (rim light, night contrast, haze) are clearly ahead.

### ui: 6.0
- `high/desktop/R02` and `high/desktop/R05`:
  - The top score bug is consistent and legible, with team marks, scores, a bases diamond, B/S/O pips, the pitcher's pitch count and the batter line.
  - The pitch-type buttons and the PITCH/SWING buttons are clear.
  - The type scale is consistent.
- `high/desktop/R10` and `high/desktop/R15`: the HOME RUN banner with distance has hierarchy.
- Problems:
  - The in-world scoreboard duplicates the bug and is clipped by the HUD band in `high/desktop/R07`.
  - The HR banner sits over the ball's flight path (`high/landscape/R10`, where the ball is just below the banner).
  - The HUD band plus the button bar eat about a quarter of the desktop frame.
  - The hint text bottom-left is tiny.
- The fixed bars feel like an app shell, not broadcast graphics. Compare smb3-1 and ootp26-1.

### readability: 6.0
- `high/desktop/R07`, `high/mobile/R07`, `high/landscape/R07`: the ball, the fielder rings and the yellow batter-runner ring read at a glance.
- `high/desktop/R02`: strike zone, batter and pitcher are clear.
- Problems:
  - `high/desktop/R16`: the runner on first is cut off at the right frame edge, and you have to read the HUD diamond to find him.
  - `strips/high/R08`: in a line drive to the gap the ball is a 2–3 px speck and the outfielders are about 10 px figures.
  - `high/desktop/R13`: the ball merges with the scoreboard.
  - `high/desktop/R06`: the released ball is a smear far to the left of the pitcher.

### mobile: 6.5
- `high/mobile/R02`: a large, readable batter, a legible HUD at 390 px, and thumb-sized BUNT, STEAL and SWING buttons.
- `high/landscape/R02` and `high/landscape/R07`: buttons float over the field, which now gets most of the height. Framing is intentional.
- Perf: 51 fps at medium and 77 at low under a 4× throttle, so it holds 30.
- Problems:
  - `high/mobile/R05`: the foreground pitcher is an oversized blob eating the lower-left third, and the crowd is a blurry, repeating texture.
  - `high/mobile/R07`: fielders are about 15 px tall.
  - `high/landscape/R10`: the HR banner covers the ball.
  - The landscape layout drops the pitcher and batter info line.

## Character defects list

1. Cleats float above the ground in the batting stance, with a visible gap above the offset shadows: `crops/high/R05-batter_feet`.
2. The cleat stripe texture is aliased into pixel stairs: `crops/high/R05-batter_feet`, `crops/high/R10-batter-trot`, `crops/high/R16-runner1`.
3. Batting-helmet ear flaps are flat black card planes standing off the shell, like a headdress: `crops/high/R02-batter_head`, `crops/high/R10-batter-trot`, `crops/high/R07-batter-runner`.
4. The batting-helmet brim renders as a mirror-white or chrome strip on a black helmet: `crops/high/R02-batter_head`, `crops/high/R02-batter_hands`.
5. Helmeted faces are fully black with no features (no fill light, and the head is pitched down): `crops/high/R02-batter_head`, `crops/high/R07-SS`, `crops/high/R10-batter-trot`.
6. The umpire's mask sits at chest height below the lips and isn't attached to the head. The bars show white seam gaps: `crops/high/R05-ump_head`.
7. The umpire's and catcher's masks are loose ladders floating beside the face, with no frame, padding or chin guard: `crops/high/R05-batter-front`, `crops/high/R14-batter`.
8. The catcher's cage runs from the brow down to the glove, far too long and detached: `crops/high/R06-catcher_glove`.
9. Bare skin shows at the umpire's neck and shoulder where the shirt should be: `crops/high/R05-ump_head`.
10. Hands don't wrap the bat. They are stacked beside the handle, and the forearms cross in an X: `crops/high/R02-batter_hands`, `crops/high/R14-batter`, `crops/high/R05-batter-front`.
11. The glove is a smooth mitt of finger stalls with no pocket depth, web lacing, binding or stitching: `crops/high/R17-pitcher_hands`, `crops/high/R07-SS`, `crops/high/R09-LF`.
12. The catcher's mitt is the same fielder-style mitten, not a round, padded catcher's mitt: `crops/high/R06-catcher_glove`.
13. Jersey wordmarks have broken or missing glyphs ("LAKF HAMII TON", "AKESIDE", "KESIDE", "HCT SPRINGS"): `crops/high/R17-pitcher_hands`, `crops/high/R07-SS`, `crops/high/R09-LF`, `crops/high/R02-batter_hands`.
14. The wordmark wraps across the arm or sleeve and bleeds over the glove: `crops/high/R02-pitcher`.
15. Placket and collar piping are wavy and "drippy", with ragged edges: `crops/high/R17-pitcher_hands`, `crops/high/R03-pitcher`, `crops/high/R16-runner1`.
16. Colour boundaries are jagged:
    - Black and gold raglan edge at the shoulder: `crops/high/R02-batter_head`.
    - Sawtooth on the belt's lower edge: `crops/high/R17-pitcher_hands`.
    - Sock band line: `crops/high/R12-pitcher`.
17. Chest bulges read as breasts under the wordmark: `crops/high/R17-pitcher_hands`, `crops/high/R14-batter`.
18. The stocky build has balloon upper arms and bulging deltoid caps through the sleeves: `crops/high/R12-pitcher`, `crops/high/R08-CF`, `crops/high/R03-pitcher`.
19. The shoulders on the jersey are boxy and inflated, with the sleeve caps puffed out: `crops/high/R17-pitcher_hands`, `crops/high/R02-pitcher`.
20. A wrist cut-line artefact: a small sleeve tab or sliver sticks out at the wrist: `crops/high/R16-1B`, `crops/high/R16-runner1`.
21. Uniforms have no folds, wrinkles or dirt anywhere. The pants are smooth tubes: `crops/high/R02-batter`, `crops/high/R10-batter-trot`.
22. The cleats are clog-like, with no tongue, laces or spikes: `crops/high/R05-batter_feet`.
23. The pitcher's bare throwing hand shows no ball in the set or delivery: `crops/high/R02-pitcher`, `crops/high/R12-pitcher`.
24. In the run, the arms are locked and the elbows don't pump: `crops/high/R10-batter-trot`, `crops/high/R07-batter-runner`.
25. Low-tier regression or inconsistency: the low tier uses a different, cartoon character with big eyes, and legs that end in sock stumps with no cleats: `crops/low/R02-batter`, `low/desktop/R12`.

## Ranked gaps

1. **G-hands-grip-bat** (characters, WS2+WS1). The hands don't wrap the bat, and the forearms cross.
   - Fix: IK the top and bottom hand onto a handle socket, with fingers curled closed around a cylinder of bat radius.
   - Test: in `crops/*/R02-batter_hands`, the bat axis passes through both palms and no forearm crossing is visible.
   - Gain +0.5 characters / +0.3 animation. Severity 4. Effort M.
2. **G-mask-fit** (characters, WS1). The umpire's and catcher's masks float or sit at the chest.
   - Fix: parent the mask to the head bone with a frame ring, chin pad and forehead pad, offset 2–3 cm from the face.
   - Test: in `crops/*/R05-ump_head` and `crops/*/R06-catcher_glove`, the cage spans brow to chin and touches the head.
   - Gain +0.5. Severity 4. Effort S.
3. **G-feet-grounding** (animation, WS2). Cleats float in the stance.
   - Fix: foot-lock IK to the ground height for planted phases, and snap the sole to y=0.
   - Test: in `crops/*/R05-batter_feet`, the sole-to-ground gap is 0 px at 2×.
   - Gain +0.5 animation, +0.2 characters. Severity 4. Effort S.
4. **G-swing-load-stride** (animation, WS2). The swing has no load or stride and is out of sync with the ball.
   - Fix: author load, stride and hip-first rotation keys over the last ~300 ms of the pitch, timed so the bat meets the ball at contact.
   - Test: `strips/*/R04` shows the hands back and the front foot lifting in frames 2–4, and in `crops/*/R04-batter` the bat is at the ball.
   - Gain +0.7. Severity 5. Effort M.
5. **G-face-fill-light** (lighting/characters, WS3). Faces are black under the brim.
   - Fix: add a hemisphere or bounce fill from the dirt, or a per-character rim-and-fill light, and lift face albedo or AO under brims.
   - Test: in `crops/*/R02-batter_head`, eyes, nose and mouth are distinguishable, with face luminance above 15%.
   - Gain +0.5 lighting, +0.3 characters. Severity 4. Effort S.
6. **G-helmet-flaps-brim** (characters, WS1). The ear flaps are flat cards and the brim is chrome.
   - Fix: model the flap as a curved shell continuous with the helmet over the ear, and give the brim the helmet material with lower metalness.
   - Test: `crops/*/R02-batter_head` and `crops/*/R10-batter-trot`.
   - Gain +0.4. Severity 3. Effort S.
7. **G-wordmark-glyphs** (characters, WS1). Wordmarks have broken glyphs and jagged colour edges.
   - Fix: render the text and piping to a higher-resolution decal texture with mipmapped SDF or a correct UV layout, and avoid wrapping over the sleeve seam.
   - Test: "LAKE HAMILTON" is fully legible in `crops/*/R17-pitcher_hands`, with no sawtooth on the belt.
   - Gain +0.4. Severity 3. Effort M.
8. **G-glove-leather** (characters, WS1). The glove is an oven mitt.
   - Fix: add a pocket cavity, a laced web, edge binding and a normal-mapped stitch and lace texture, plus a separate round catcher's mitt.
   - Test: in `crops/*/R17-pitcher_hands` and `crops/*/R06-catcher_glove`, lacing and pocket are visible.
   - Gain +0.4 characters. Severity 3. Effort M.
9. **G-stocky-anatomy** (charfit, WS1). The stocky build has balloon arms and breast-like chest bulges.
   - Fix: cap the muscle morph on the upper arm and deltoid, flatten the pectoral bulge under the jersey with a cloth offset, and give the jersey a looser drape.
   - Test: `crops/*/R12-pitcher` and `crops/*/R17-pitcher_hands` against `hbm_male_realistic_front.png`.
   - Gain +0.5 charfit. Severity 3. Effort M.
10. **G-cloth-folds** (characters, WS1). Uniforms are smooth colour blocks.
    - Fix: bake fold normal maps per garment (elbow, knee, waist bunching), add sleeve hems and a collar, and add per-player dirt on the knees.
    - Test: folds visible in `crops/*/R02-batter`.
    - Gain +0.5. Severity 3. Effort M.
11. **G-night-exposure** (lighting, WS3). The night game is lit like day.
    - Fix: lower the night ambient, add tower spot falloff with darker gaps between pools, and add a slight haze.
    - Test: `high/desktop/R12` shows a luminance gradient across the infield, and the outfield is darker than the infield.
    - Gain +0.4. Severity 3. Effort S.
12. **G-crowd-stands** (environment, WS4). The crowd is a flat repeating billboard and the stands are grey boxes.
    - Fix: use instanced 3D or impostor crowd cards with per-instance tint, add stadium rails and aisles and a roof fascia, and break the tile repetition.
    - Test: `high/mobile/R05` and `high/desktop/R17`.
    - Gain +0.5. Severity 3. Effort L.
13. **G-run-arm-pump** (animation, WS2). The arms stay locked in the run cycle.
    - Fix: add a ±50° shoulder swing with elbows bent about 90°, counter-phased to the legs.
    - Test: `strips/*/R10` shows the forearm angle alternating between frames.
    - Gain +0.3. Severity 2. Effort S.
14. **G-hr-banner-ball** (ui, WS7). The HR banner covers the ball.
    - Fix: anchor the banner to the lower third, or offset it from the ball's projected screen position.
    - Test: `high/landscape/R10` and `high/desktop/R10` show the ball clear of the banner.
    - Gain +0.3. Severity 2. Effort S.
15. **G-runner-framing** (readability, WS5). The runner on first is cut at the frame edge.
    - Fix: widen the batting camera or add an edge indicator for runners.
    - Test: the 1B runner is fully inside the frame in `high/desktop/R16`.
    - Gain +0.3. Severity 2. Effort S.
16. **G-lowtier-model** (characters, WS6). The low tier uses a different cartoon model with no feet.
    - Fix: use the decimated LOD of the same rig with feet.
    - Test: `crops/low/R02-batter` matches the high-tier style and has cleats.
    - Gain 0 at high tier (it's a regression). Severity 2. Effort M.

```json
{
  "loop": 5,
  "role": "critic-claude",
  "tier": "high",
  "verdict": "continue",
  "scores": {
    "characters": {
      "score": 5.0,
      "confidence": 0.8,
      "evidence": [
        {"shot": "crops/high/R02-batter_head", "note": "face fully black under brim; ear flaps are flat card planes; chrome-white brim"},
        {"shot": "crops/high/R02-batter_hands", "note": "hands stacked beside handle, not wrapping the bat"},
        {"shot": "crops/high/R17-pitcher_hands", "note": "oven-mitt glove without web/lacing; wordmark glyphs broken; sawtooth belt"},
        {"shot": "crops/high/R05-batter_feet", "note": "cleats float above ground; aliased stripe texture"},
        {"shot": "crops/high/R05-ump_head", "note": "umpire mask at chest height, bare skin at the collar"},
        {"shot": "crops/high/R12-pitcher", "note": "stocky build differs from the lean R17-pitcher-back; 3 builds visible"}
      ]
    },
    "charfit": {
      "score": 5.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "crops/high/R12-pitcher", "note": "balloon upper arms vs tapered deltoids in hbm_male_realistic_front"},
        {"shot": "crops/high/R09-LF", "note": "smooth mask face vs mpfb2_athlete_face eye/brow detail"},
        {"shot": "crops/high/R17-pitcher_hands", "note": "bare hand closest to mpfb2_athlete_hand; chest bulges unlike reference"},
        {"shot": "high/desktop/R14", "note": "proportions acceptable at broadcast distance (IoU 0.875/0.900)"}
      ]
    },
    "animation": {
      "score": 5.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "strips/high/R04", "note": "no load/stride in frames 1-4; bat pose-swaps between 4 and 5; flash sells contact"},
        {"shot": "strips/high/R03", "note": "real knee lift in 6-8, but slow static set; release not shown"},
        {"shot": "strips/high/R07", "note": "run and field beats read, feet hit shadows"},
        {"shot": "crops/high/R04-batter", "note": "ball at ankles while bat still cocked: swing out of sync"},
        {"shot": "crops/high/R10-batter-trot", "note": "locked arms in trot"}
      ]
    },
    "environment": {
      "score": 5.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R07", "note": "mow stripes, dirt grain, foul poles, towers; grey box stands"},
        {"shot": "high/mobile/R05", "note": "crowd is a blurry repeating photo tile"},
        {"shot": "high/desktop/R15", "note": "historic fence good; unexplained discs beyond the RF fence; faceted trees"},
        {"shot": "crops/high/R02-pitcher", "note": "pitcher's rubber is a raised slab on the mound"}
      ]
    },
    "lighting": {
      "score": 5.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R14", "note": "golden-hour grade and shadows work"},
        {"shot": "high/desktop/R12", "note": "night field lit almost like day, no pooling"},
        {"shot": "crops/high/R02-batter_head", "note": "no fill or bounce; faces crushed to black"},
        {"shot": "high/desktop/R13", "note": "tower pools present but the surround is pure black"}
      ]
    },
    "ui": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R02", "note": "consistent score bug, count pips, bases diamond, clear buttons"},
        {"shot": "high/landscape/R10", "note": "HOME RUN banner sits over the ball path"},
        {"shot": "high/desktop/R07", "note": "in-world scoreboard duplicated and clipped by the HUD band"}
      ]
    },
    "readability": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R07", "note": "ball, rings and runner read at a glance"},
        {"shot": "high/desktop/R16", "note": "runner on first cut at the frame edge"},
        {"shot": "strips/high/R08", "note": "ball a 2-3 px speck; outfielders about 10 px"}
      ]
    },
    "mobile": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/mobile/R02", "note": "readable batter and HUD at 390 px; thumb-sized buttons"},
        {"shot": "high/landscape/R07", "note": "floating pad, field gets most of the height"},
        {"shot": "high/mobile/R05", "note": "pitcher blob fills the lower-left; blurry crowd"},
        {"shot": "high/landscape/R10", "note": "banner hides the ball"}
      ]
    }
  },
  "gaps": [
    {"id": "G-swing-load-stride", "category": "animation", "expectedGain": 0.7, "severity": 5, "effort": "M", "workstream": "WS2", "evidence": ["strips/high/R04", "crops/high/R04-batter"], "benchmark": "smb4-3", "fix": "Author load, stride and hip-first rotation over the last ~300 ms, timed so the bat meets the ball at contact; strips R04 frames 2-4 show the hands back and the front foot lifting."},
    {"id": "G-hands-grip-bat", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["crops/high/R02-batter_hands", "crops/high/R14-batter"], "benchmark": "smb3-1", "fix": "IK both hands to a handle socket with fingers curled around bat radius; the bat axis passes through both palms, no forearm X."},
    {"id": "G-mask-fit", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R05-ump_head", "crops/high/R06-catcher_glove", "crops/high/R14-batter"], "benchmark": "smb3-1", "fix": "Parent masks to the head bone with a frame, chin and forehead pads, 2-3 cm off the face; the cage spans brow to chin."},
    {"id": "G-feet-grounding", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS2", "evidence": ["crops/high/R05-batter_feet"], "fix": "Foot-lock IK to ground height in planted phases; 0 px sole gap in the R05-batter_feet crop."},
    {"id": "G-face-fill-light", "category": "lighting", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS3", "evidence": ["crops/high/R02-batter_head", "crops/high/R07-SS"], "benchmark": "smb3-3", "fix": "Add hemisphere or dirt-bounce fill or a character rim and fill light; face luminance above 15% under brims, with features distinguishable."},
    {"id": "G-stocky-anatomy", "category": "charfit", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R12-pitcher", "crops/high/R08-CF", "crops/high/R17-pitcher_hands"], "benchmark": "hbm_male_realistic_front", "fix": "Cap the upper-arm and deltoid muscle morph, flatten the pectoral bulge under the jersey, add a looser cloth offset."},
    {"id": "G-cloth-folds", "category": "characters", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R02-batter", "crops/high/R10-batter-trot"], "benchmark": "smb4-4", "fix": "Bake fold normal maps at the elbow, knee and waist, add a collar and sleeve hems, add knee dirt."},
    {"id": "G-crowd-stands", "category": "environment", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS4", "evidence": ["high/mobile/R05", "high/desktop/R17", "high/desktop/R01"], "benchmark": "smb4-3", "fix": "Instanced impostor crowd with tint variation; rails, aisles and roof fascia on the stands; no visible tile repeat."},
    {"id": "G-helmet-flaps-brim", "category": "characters", "expectedGain": 0.4, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R02-batter_head", "crops/high/R10-batter-trot"], "fix": "Model the ear flap as a curved shell continuous with the helmet; give the brim the helmet material with low metalness."},
    {"id": "G-wordmark-glyphs", "category": "characters", "expectedGain": 0.4, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R07-SS"], "fix": "Higher-resolution or SDF decal for the wordmark and piping with UVs that avoid the sleeve seam; LAKE HAMILTON fully legible, no sawtooth edges."},
    {"id": "G-glove-leather", "category": "characters", "expectedGain": 0.4, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R06-catcher_glove"], "benchmark": "smb3-3", "fix": "Pocket cavity, laced web, edge binding, stitch normal map; a separate round catcher's mitt."},
    {"id": "G-night-exposure", "category": "lighting", "expectedGain": 0.4, "severity": 3, "effort": "S", "workstream": "WS3", "evidence": ["high/desktop/R12", "crops/high/R12-pitcher"], "benchmark": "smb4-1", "fix": "Lower night ambient, spot falloff between tower pools, light haze; visible luminance gradient across the field."},
    {"id": "G-run-arm-pump", "category": "animation", "expectedGain": 0.3, "severity": 2, "effort": "S", "workstream": "WS2", "evidence": ["strips/high/R10", "crops/high/R10-batter-trot"], "fix": "±50° shoulder swing with elbows bent about 90°, counter-phased to the legs."},
    {"id": "G-hr-banner-ball", "category": "ui", "expectedGain": 0.3, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/landscape/R10", "high/desktop/R10"], "fix": "Anchor the result banner to the lower third or avoid the ball's projected screen position."},
    {"id": "G-runner-framing", "category": "readability", "expectedGain": 0.3, "severity": 2, "effort": "S", "workstream": "WS5", "evidence": ["high/desktop/R16"], "fix": "Widen the batting camera FOV or add edge indicators so runners on base are always in frame."},
    {"id": "G-lowtier-model", "category": "characters", "expectedGain": 0.0, "severity": 2, "effort": "M", "workstream": "WS6", "evidence": ["crops/low/R02-batter", "low/desktop/R12"], "fix": "Low tier uses a decimated LOD of the same rig with cleats instead of a footless cartoon model."}
  ]
}
```
