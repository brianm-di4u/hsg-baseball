# Critic A (critic-claude): loop 6, high tier

## 1. Verdict

Diamond Springs now reads as a competent, consistent stylised-realistic baseball game at broadcast distance. The MPFB-derived heads give real faces in good light (`crops/high/R14-batter`, `crops/high/R09-LF`, `crops/high/R16-1B`), and the pitch and swing strips have the right beats (`strips/high/R03`, `strips/high/R04`). Up close the players still fall well short of the rubric's 7 anchor. Uniforms are smooth colour-block shells with no folds, placket or seams, and the torsos are inflated so they read like football shoulder pads (`crops/high/R07-SS`, `crops/high/R08-CF`). Gloves are brown mittens with sausage fingers and no web or lacing (`crops/high/R06-catcher_glove`, `crops/high/R17-pitcher_hands`). Under batting helmets the faces are still black voids (`crops/high/R02-batter_head`, `crops/high/R10-batter-trot`). The new skinned decals do wrap the chest, but in close-ups the placket piping cuts through the letters and the first letter is lost (`crops/high/R17-pitcher_hands` "LAKE HAMILTON", `crops/high/R07-SS` "AKESIDE"). The new helmet ear flaps read as a thin dangling strap, not a shell (`crops/high/R02-batter_head`). The umpire's mask still runs from the brim down over the chest protector rather than ending at the chin (`crops/high/R05-ump_head`). No category reaches its gate this loop. Characters is furthest from it (5.5 against a 7.5 gate).

## 2. Category scores

### characters: 5.5
- What's real: MPFB faces with eyes, nose, lips and ears that hold up in daylight at three-quarter view (`crops/high/R14-batter`, `crops/high/R09-LF`, `crops/high/R16-1B`). Hands have separate jointed fingers that close around the bat (`crops/high/R02-batter_hands`, `crops/high/R14-batter`). Body types differ visibly: a lean infielder (`crops/high/R16-1B`), a heavier pitcher (`crops/high/R12-pitcher`) and the stocky catcher (`crops/high/R06-catcher_glove`). Skin tones vary.
- What fails the 7 anchor:
  - The uniform does not read as cloth. Pants and jerseys are smooth vinyl tubes with no folds, placket, buttons, sleeve hem or pant cuff (`crops/high/R08-CF`, `crops/high/R10-batter-trot`).
  - Materials don't contrast. The helmet is a black mirror with a white-blown brim (`crops/high/R02-batter_head`). The glove is untextured matte brown with no stitching (`crops/high/R06-catcher_glove`).
  - Faces disappear under helmets and brims (`crops/high/R02-batter_head`, `crops/high/R10-batter-trot`, `crops/high/R16-runner1`).
- Against smb4-2 and smb4-4: those kits have folds, piping and a fitted cap. Here the kit is one clean step above flat colour blocks.

### charfit: 5.5
- Heads match the reference closely. `crops/high/R09-LF` and `crops/high/R14-batter` look like the same head as `reference-renders/mpfb2_game27k_glb_face_34` (brow, nose and lip shape). The bind-pose IoU of 0.875 (front) and 0.895 (side) agrees with what I see in the legs and stance.
- The dressed torso departs from `mpfb2_athlete_front`. Shoulders and upper chest balloon about 30% wider than the athlete, and the deltoids read as pads (`crops/high/R07-SS`, `crops/high/R08-CF`, `crops/high/R12-pitcher`). Necks are short and buried in the collar.
- Hands are far simpler than `hbm_male_realistic_hand`. They are smooth, with no knuckles or nails, and the knuckles look swollen (`crops/high/R17-pitcher_hands`).
- At 60 px, LOD2 error is 52% (brief table). In the far frames (`high/desktop/R08`, `high/desktop/R09`) players turn into stick blobs, so "the same silhouette at every distance" is not met.

### animation: 5.5
- `strips/high/R03`: frames 1–5 are an almost static set position with a barely visible glove lift. Frames 6–8 show a real leg lift with balance. The delivery shows no stride or release in this strip, and `crops/high/R12-pitcher` (stride and arm-up) is the only evidence of the stride. The beats are there but the frames are evenly paced, with no anticipation.
- `strips/high/R04`: this is the best of the strips. It has a load, a stride, hip rotation on frames 5–7, a contact flash, a bat trail and a finish on frame 8. The back foot pivots, but the front foot slides slightly between frames 6 and 8.
- `strips/high/R07`: the shortstop's break and drop to field are readable. On frames 7–8 the ball goes through and past the glove hand, ending behind the fielder's feet, so the clip never meets the ball. The glove arm doesn't track the ball.
- `strips/high/R10`: the trot cycle reads and the feet contact the ground. It is upright and stiff, with arms pumping in a fixed arc and no torso counter-rotation.
- `strips/high/R08` and `strips/high/R11`: the cameras are too far out to judge the run cycle. The replay angle in R11 is a slow pan, with little player action until frames 7–8.

### environment: 6
- Positives: mow-pattern turf and grained dirt (`high/desktop/R05`, `crops/high/R16-runner1`). The crowd is photographic and reads as people (`high/desktop/R17`). There are sponsor boards, foul poles, light towers, a backstop and a dugout (`crops/high/R14-batter`). The historic park's ivy-brown wall and terraced field have character (`high/desktop/R15`).
- Negatives:
  - The faceted low-poly cone and blob trees clash with the painted backdrop behind them on almost every outfield view (`crops/high/R07-SS`, `crops/high/R08-CF`, `high/desktop/R09`).
  - The crowd is visibly one tile repeated, and the stands are flat untextured grey slabs (`high/desktop/R01`, `crops/high/R17-pitcher-back`).
  - Walls are bare grey concrete with no texture or wear.
  - In the night park the treeline is pure black (`high/desktop/R13`).
- Compared with smb4-3, the park has fewer props and less weathering.

### lighting: 6
- Day lighting has a directional sun, soft contact shadows under players (`crops/high/R16-1B`, `crops/high/R09-LF`), and a believable sky in `high/desktop/R02`. The golden afternoon in `crops/high/R14-batter` is the best-lit shot in the set and approaches smb3-4.
- Faces under helmets and brims are crushed to black even after the skin self-light change (`crops/high/R02-batter_head`, `crops/high/R10-batter-trot`, `crops/high/R16-runner1`). There is no visible sky fill or bounce on the faces.
- Night: `high/desktop/R12` has a good tower glow and the players are lit. `high/desktop/R13` has hard, blotchy light pools on the turf and a void beyond the wall. There is no haze to give depth.

### ui: 6.5
- The score bug is clean and consistent, with team crests, a base diamond, the count, the pitcher and batter names, and pitch speed (`high/desktop/R05`, `high/desktop/R12`). The HOME RUN banner has distance and hierarchy (`high/desktop/R10`, `high/desktop/R15`). Pitch-type buttons and the target reticle are clear (`high/desktop/R05`).
- Faults:
  - The 3×3 strike-zone overlay is a thin white box with no pitch-location or timing feedback in the captured frames (`high/desktop/R02`).
  - The in-world scoreboard is cut off at the frame edge (`high/desktop/R08`, `strips/high/R08`).
  - The "F or Space: fast-forward" hint and the large FF button stay on screen during play.
  - Compared with smb3-1, nothing animates or carries broadcast polish.

### readability: 6
- The batting and pitching cameras read at a glance: batter, catcher, umpire, zone and reticle (`high/desktop/R02`, `high/desktop/R05`, `high/desktop/R16`).
- Fielding views fail the 7 anchor:
  - The fielders are 15–25 px figures, and the ball is a few pixels with a short trail (`high/desktop/R08`, `high/desktop/R09`).
  - On the home-run camera the hitter is a cropped speck at the bottom of the frame (`high/desktop/R10`).
  - Fielder rings help, but nothing marks who has the ball.
- In `high/desktop/R05` the pitcher's body occludes part of the lower-left of the plate area.

### mobile: 6
- Portrait at-bat (`high/mobile/R02`, `high/mobile/R12`): figures are large, the HUD is legible and the thumb buttons are large. This is good.
- Portrait pitching (`high/mobile/R05`): pitcher #27 fills the bottom-left third and partly crowds the catcher area.
- Portrait fielding (`high/mobile/R07`, `high/mobile/R10`): the players are tiny under a huge empty foreground, and the framing looks unadjusted for portrait.
- Landscape (`high/landscape/R02`, `high/landscape/R05`): the buttons sit over the batter's feet and the plate in R02, and over the pitcher's legs in R05.
- The phone proxy holds 48 fps minimum, which passes the 30 fps bar.

### Regressions in medium and low
- `low/desktop/R05`: the pitcher's head shows a hard black band across the eyes, and the low-tier faces are flat and cartoonish.
- `crops/medium/R02-batter_head` matches high (face blacked out under the helmet).
- I saw no new medium-tier regression.

## 3. Character defects list
1. Batting-helmet ear flap renders as a thin black strap dangling in front of the jaw, not a shell over the ear (`crops/high/R02-batter_head`, `crops/high/R02-batter_hands`).
2. Batting-helmet brim is blown to near-white specular on a black shell; reads as a white visor (`crops/high/R02-batter_head`, `crops/medium/R02-batter_head`).
3. Face under batting helmet is a featureless black void; under the cap, eyes are lost (`crops/high/R02-batter_head`, `crops/high/R10-batter-trot`, `crops/high/R16-runner1`).
4. Jersey decal: placket piping stripes are drawn over the front lettering, cutting through letters ("LAKE HAMILTON" with H hidden: `crops/high/R17-pitcher_hands`; "HOT SPRINGS" broken: `crops/high/R02-batter_hands`, `crops/high/R10-batter-trot`).
5. Jersey decal clipped at its first letter on bent poses ("AKESIDE": `crops/high/R07-SS`, `crops/high/R08-CF`, `crops/high/R16-1B`).
6. The collar is a jagged blue or gold V with spiky ends, not a sewn neckline (`crops/high/R07-SS`, `crops/high/R08-CF`, `crops/high/R17-pitcher_hands`).
7. Shoulders and deltoids are ballooned like football pads, and the neck is short and buried (`crops/high/R07-SS`, `crops/high/R08-CF`, `crops/high/R12-pitcher`).
8. Pants and jersey have no folds, seams, buttons, belt loops or cuff, and read like vinyl (`crops/high/R08-CF`, `crops/high/R10-batter-trot`, `crops/high/R17-pitcher-back`).
9. Fielding glove is a brown mitten with fat sausage fingers and no web, pocket, lacing or stitching (`crops/high/R06-catcher_glove`, `crops/high/R17-pitcher_hands`, `crops/high/R07-SS`).
10. Umpire mask cage spans from the cap brim down over the chest protector, not chin to brow, and floats in front of the face (`crops/high/R05-ump_head`).
11. Umpire's upper back and neck show a large bare-skin patch between the shirt and the chest protector (`crops/high/R05-ump_head`).
12. Catcher has no visible chest protector, only a blue shirt. The mask bars extend below the chin onto the chest, with a skin patch at the neck (`crops/high/R06-catcher_glove`).
13. Catcher's shin guards are flat blue scoops with no knee cap or plates (`crops/high/R06-catcher_glove`).
14. Cleats have a pixel-stepped white pattern, like a low-res texture, and the soles have no studs (`crops/high/R16-runner1`, `crops/high/R07-batter-runner`, `crops/high/R09-LF`).
15. Hands are smooth with no knuckle definition, nails or tendon. The pitcher's bare hand has puffy, overly long fingers (`crops/high/R17-pitcher_hands`).
16. Wrist-to-sleeve seam is a visible hard ring with a sleeve flare at the cuff (`crops/high/R16-runner1`, `crops/high/R02-batter_hands`).
17. The pitcher's cap sits shallow and high, and the brim tilts off the forehead (`crops/high/R17-pitcher-back`, `high/desktop/R17`).
18. In the R07 fielding clip the ball passes through and behind the glove hand (`strips/high/R07` frames 7–8).
19. In the close-up framing, the umpire crop is mostly occluded by the batter (`crops/high/R05-ump`).

## 4. Ranked gaps

1. **G-uniform-cloth** (characters, WS1): sev 5, effort M, expected gain +1.0. Bake a normal or AO map onto the jersey and pants with folds at the elbows, knees, crotch and belt, plus seams, a button placket and a sleeve hem. Add a cloth sheen with roughness around 0.8.
   - Test: in `crops/high/R08-CF` and `crops/high/R10-batter-trot`, at least 3 fold lines show on each pant leg and the placket buttons are visible.
2. **G-helmet-face-fill** (lighting/characters, WS3): sev 5, effort S, expected gain +0.5 each. Add a hemispheric sky/bounce fill, or a per-character rim and fill light that doesn't cast shadows, aimed under the brim.
   - Test: in `crops/high/R02-batter_head` and `crops/high/R10-batter-trot`, the eyes, nose and mouth are distinguishable (face luminance at least 25% of the cheek in sun).
3. **G-ear-flap-shell** (characters, WS1): sev 3, effort S, expected gain +0.3. Rebuild the flap as a closed, thick shell that covers the ear, joined to the helmet with no gap. Clamp the brim specular.
   - Test: in `crops/high/R02-batter_head` there is no dangling strap and the brim is not blown above 230/255.
4. **G-decal-layering** (characters, WS1): sev 3, effort S, expected gain +0.3. Draw the lettering above the placket piping, or stop the piping at the lettering. Fit the front word inside the visible chest region, or shrink it, so no letter is lost on bent poses.
   - Test: "LAKE HAMILTON" and "LAKESIDE" are fully legible in `crops/high/R17-pitcher_hands` and `crops/high/R07-SS`.
5. **G-torso-volume** (charfit, WS1): sev 4, effort M, expected gain +0.5. Reduce the jersey's shoulder and deltoid inflation toward the `mpfb2_athlete_front` width, lengthen the neck, and make the collar a sewn V.
   - Test: the shoulder width to head width ratio in `crops/high/R07-SS` is within 10% of the reference.
6. **G-glove-model** (characters, WS1): sev 4, effort M, expected gain +0.5. Replace the mitten with a modelled glove that has a web, a pocket, a heel and lacing, with leather normal and roughness maps.
   - Test: the web and lacing are visible in `crops/high/R06-catcher_glove`.
7. **G-catch-contact** (animation, WS2): sev 4, effort M, expected gain +0.5. Add glove IK to the ball's path on fielding clips and snap the ball to the glove on the catch frame.
   - Test: in `strips/high/R07` the ball is in the glove by frame 8.
8. **G-delivery-pacing** (animation, WS2): sev 3, effort M, expected gain +0.5. Make the R03 strip cover the delivery from leg lift to release: shorten the set hold and add hip-shoulder separation and a stride.
   - Test: `strips/high/R03` shows a lift, a stride, release and follow-through.
9. **G-ump-catcher-gear** (characters, WS1): sev 3, effort S, expected gain +0.3. Bound the mask cage between the chin and the brow, add a catcher's chest protector, and close the umpire's neck and shoulder skin gap.
   - Test: `crops/high/R05-ump_head` and `crops/high/R06-catcher_glove` match this.
10. **G-tree-cohesion** (environment, WS4): sev 3, effort M, expected gain +0.5. Replace the faceted cone and blob trees on high and medium with billboard or card trees that match the painted backdrop. Texture the walls and stands.
    - Test: no faceted tree silhouettes in `crops/high/R08-CF` or `high/desktop/R09`.
11. **G-fielding-camera** (readability/mobile, WS5): sev 4, effort M, expected gain +0.5 each. Tighten the fielding and HR cameras so the fielder with the ball is at least 60 px tall, and mark the ball carrier. Reframe the portrait fielding view.
    - Test: in `high/desktop/R09` and `high/mobile/R07`, the fielder is at least 60 px tall and the ball has a ring or halo.
12. **G-landscape-controls** (mobile, WS7): sev 3, effort S, expected gain +0.3. In landscape, keep the controls in side gutters, or lift the camera, so the buttons don't cover the plate or players.
    - Test: no overlap in `high/landscape/R02` or `high/landscape/R05`.

```json
{
  "loop": 6,
  "role": "critic-claude",
  "tier": "high",
  "scores": {
    "characters": {
      "score": 5.5,
      "confidence": 0.75,
      "evidence": [
        { "shot": "crops/high/R14-batter", "note": "real MPFB face, gripping hands, but smooth colour-block kit" },
        { "shot": "crops/high/R02-batter_head", "note": "face black under helmet; ear flap reads as dangling strap; brim blown white" },
        { "shot": "crops/high/R06-catcher_glove", "note": "mitten glove, no web or lacing; scoop shin guards; no chest protector" },
        { "shot": "crops/high/R17-pitcher_hands", "note": "piping cuts lettering; puffy hands" }
      ]
    },
    "charfit": {
      "score": 5.5,
      "confidence": 0.7,
      "evidence": [
        { "shot": "crops/high/R09-LF", "note": "head closely matches mpfb2 face_34 reference" },
        { "shot": "crops/high/R07-SS", "note": "shoulders and deltoids ballooned well past the athlete reference; short neck" },
        { "shot": "high/desktop/R08", "note": "far players collapse to stick blobs (LOD2 52% error)" }
      ]
    },
    "animation": {
      "score": 5.5,
      "confidence": 0.7,
      "evidence": [
        { "shot": "strips/high/R04", "note": "load, stride, rotation, contact flash, finish; slight front-foot slide" },
        { "shot": "strips/high/R03", "note": "5 near-static set frames, then leg lift; no stride or release shown" },
        { "shot": "strips/high/R07", "note": "break and dive read, but ball passes behind the glove, no catch contact" },
        { "shot": "strips/high/R10", "note": "trot cycle grounded but stiff, no torso counter-rotation" }
      ]
    },
    "environment": {
      "score": 6,
      "confidence": 0.7,
      "evidence": [
        { "shot": "high/desktop/R15", "note": "historic park wall and terraces have character" },
        { "shot": "crops/high/R08-CF", "note": "faceted low-poly trees clash with painted backdrop" },
        { "shot": "high/desktop/R17", "note": "photo crowd reads as people; flat grey walls" },
        { "shot": "high/desktop/R13", "note": "black void treeline at night" }
      ]
    },
    "lighting": {
      "score": 6,
      "confidence": 0.7,
      "evidence": [
        { "shot": "crops/high/R14-batter", "note": "warm golden afternoon, good modelling" },
        { "shot": "crops/high/R10-batter-trot", "note": "face crushed black under helmet" },
        { "shot": "high/desktop/R12", "note": "tower glow, players lit at night" },
        { "shot": "high/desktop/R13", "note": "blotchy light pools, no haze" }
      ]
    },
    "ui": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        { "shot": "high/desktop/R05", "note": "clean score bug, pitch buttons, reticle" },
        { "shot": "high/desktop/R10", "note": "HOME RUN banner with distance" },
        { "shot": "high/desktop/R08", "note": "in-world scoreboard clipped at frame edge; FF hint persistent" }
      ]
    },
    "readability": {
      "score": 6,
      "confidence": 0.7,
      "evidence": [
        { "shot": "high/desktop/R02", "note": "batting view reads at a glance" },
        { "shot": "high/desktop/R09", "note": "fielders 15-25 px, ball a few px" },
        { "shot": "high/desktop/R10", "note": "hitter a cropped speck at frame bottom" }
      ]
    },
    "mobile": {
      "score": 6,
      "confidence": 0.7,
      "evidence": [
        { "shot": "high/mobile/R02", "note": "good portrait at-bat framing and thumb buttons" },
        { "shot": "high/mobile/R07", "note": "tiny players under huge empty foreground" },
        { "shot": "high/landscape/R05", "note": "buttons overlap pitcher's legs" },
        { "shot": "high/landscape/R02", "note": "buttons over batter's feet and plate" }
      ]
    }
  },
  "gaps": [
    { "id": "G-uniform-cloth", "category": "characters", "expectedGain": 1.0, "severity": 5, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R08-CF", "crops/high/R10-batter-trot"], "benchmark": "smb4-2", "fix": "Bake fold/seam/placket/hem normal+AO maps onto jersey and pants with a cloth sheen; test: >=3 fold lines per pant leg and visible placket buttons in R08-CF and R10-batter-trot." },
    { "id": "G-helmet-face-fill", "category": "lighting", "expectedGain": 0.5, "severity": 5, "effort": "S", "workstream": "WS3", "evidence": ["crops/high/R02-batter_head", "crops/high/R10-batter-trot"], "benchmark": "smb3-3", "fix": "Add hemispheric sky/bounce or per-character shadowless fill aimed under brims; test: eyes, nose and mouth distinguishable, under-brim face luminance >=25% of sunlit cheek." },
    { "id": "G-torso-volume", "category": "charfit", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R07-SS", "crops/high/R12-pitcher"], "benchmark": "mpfb2_athlete_front", "fix": "Reduce jersey shoulder/deltoid inflation, lengthen neck, sewn V collar; test: shoulder:head width within 10% of reference." },
    { "id": "G-glove-model", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R06-catcher_glove", "crops/high/R17-pitcher_hands"], "benchmark": "smb3-3", "fix": "Modelled glove with web, pocket, heel, lacing and leather normal/roughness; test: web and lacing visible in R06-catcher_glove." },
    { "id": "G-catch-contact", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["strips/high/R07"], "fix": "Glove IK to ball path and ball snap to glove on catch frame; test: ball in glove by frame 8 of R07 strip." },
    { "id": "G-delivery-pacing", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["strips/high/R03"], "benchmark": "smb4-2", "fix": "Shorten set hold, add hip-shoulder separation and stride so R03 strip spans lift, stride, release, follow-through." },
    { "id": "G-fielding-camera", "category": "readability", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS5", "evidence": ["high/desktop/R09", "high/desktop/R10", "high/mobile/R07"], "benchmark": "smb3-4", "fix": "Tighter fielding/HR cameras keeping ball-carrier >=60 px tall, ball halo, portrait-specific framing; test on R09 and mobile R07." },
    { "id": "G-tree-cohesion", "category": "environment", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS4", "evidence": ["crops/high/R08-CF", "high/desktop/R09"], "benchmark": "smb4-3", "fix": "Replace faceted cone/blob trees on high/medium with textured card trees matching the backdrop; texture walls and stands; test: no faceted silhouettes in R08-CF." },
    { "id": "G-ear-flap-shell", "category": "characters", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R02-batter_head"], "fix": "Closed thick ear-flap shell joined to helmet, clamp brim specular; test: no dangling strap, brim <230/255." },
    { "id": "G-decal-layering", "category": "characters", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R07-SS"], "fix": "Draw lettering above placket piping and fit the word inside the visible chest; test: full team name legible in R17-pitcher_hands and R07-SS." },
    { "id": "G-ump-catcher-gear", "category": "characters", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R05-ump_head", "crops/high/R06-catcher_glove"], "fix": "Bound mask cage chin-to-brow, add catcher chest protector, close umpire neck/shoulder skin gap." },
    { "id": "G-landscape-controls", "category": "mobile", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/landscape/R02", "high/landscape/R05"], "fix": "Move landscape controls to side gutters or raise the camera so buttons never cover plate or players." }
  ],
  "verdict": "continue"
}
```
