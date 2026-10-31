# Critic A (critic-claude): loop 4, high tier

## 1. Verdict

Diamond Springs is a clean, consistent, well-lit low-to-mid-poly baseball game. At play distance it reads fine, but in every close-up it falls apart against the realistic reference set and the SMB benchmarks. The players are built on a MakeHuman-proportioned body, so silhouettes and limb lengths are right. But four things drag every close-up down. Faces are crushed to black under helmets and caps. Every colour boundary between garment regions is a sawtooth of whole triangles. The glove is a featureless brown paddle. And the cap is still not solid: skin visibly bleeds through the crown on pitchers and umpires (`crops/high/R17-pitcher-back`, `high/desktop/R14`, `high/desktop/R17`, `crops/high/R05-batter-front`), which contradicts this loop's "caps and helmets clearance" change. You can see it at normal frame size, not only in crops. The new fabric normal map can't be seen in any capture. The placket is there but its piping wobbles, and the chest lettering overlaps and garbles. Animation has readable cycles (pitch leg lift, run cycle, a swing with a contact flash), but the strips show a static batter before launch, a fielder whose glove never meets the ball, and arms that barely move in the trot. The environment is a decent diamond with mow checkerboarding, sponsor boards and towers, but the crowd is a stretched photo strip, the trees are cones and blobs, and the near stands are bare grey blocks. No category reaches its gate. **Verdict: continue.**

## 2. Category scores

### Characters: 5.5
- **Faces:** they don't hold up. `crops/high/R02-batter_head` shows a solid black face under a mirror-glossy helmet, with no eyes, nose or brow; only a lip edge is visible. `crops/high/R05-batter-front` has the same batter face as a black void. Where faces are lit (`crops/high/R09-LF`, `crops/high/R14-batter`, `crops/high/R07-SS`) they have real features from the MakeHuman base, but flat, waxy and identical in expression. The bar is smb4-4, with sculpted, varied, expressive faces, and the reference `mpfb2_athlete_face_34` (iris, lashes, lip and skin detail).
- **Hands:** they pass. There are separate fingers, and the bat grip in `crops/high/R02-batter_hands` and `crops/high/R14-batter` wraps the handle. The open throwing hand in `crops/high/R17-pitcher_hands` is decent.
- **Garments:** they look like colour blocks with cut lines. Sleeve, collar and stirrup boundaries are jagged triangle steps (`crops/high/R02-batter_head` collar, `crops/high/R05-catcher` sleeve, `crops/high/R12-pitcher` stirrup). There are no folds anywhere: pants are smooth tubes in `crops/high/R05-batter_feet` and `crops/high/R08-CF`. The tiled cotton normal map is invisible at 2× crop. The placket piping is there but wavy and kinked (`crops/high/R17-pitcher_hands`). Chest lettering overlaps itself: "LAKE HAMII TON" in `crops/high/R17-pitcher_hands`, "HOT SPRINGS" broken by the piping in `crops/high/R02-batter_hands`. Jersey backs are blank, with no number or name (`high/desktop/R05`, `high/desktop/R14`, `high/desktop/R17`). Compare smb3-3 and smb4-2, which have numbers, names, piping and clean trim.
- **Gear:**
  - The glove is a flat slab with no pocket, web or lacing (`crops/high/R17-pitcher_hands`, `crops/high/R09-LF`), and a skin-coloured hole on its back.
  - The catcher and umpire masks are bars floating beside or in front of the face (`crops/high/R05-ump_head`, `crops/high/R14-batter`).
  - Helmet ear flaps are flat black fins (`crops/high/R02-batter_head`).
  - The cleat stripe is pixel-stepped (`crops/high/R05-batter_feet`).
  - There is material contrast (glossy helmet, matte cloth), but the helmet gloss is a mirror-black blob.
- **Body types:** I can't see 3 visibly different builds. Pitchers, fielders and batters share one frame.
- **Score:** above 5 because of the fingers, a modelled glove, readable caps and helmets, and a placket with a belt. Well short of 7, which needs faces that hold up, cloth folds and three builds.

### Fidelity to reference (charfit): 5.5
- Proportions match. The IoU of 0.875 front and 0.901 side is consistent with what I see: limb lengths and head size line up with `mpfb2_athlete_three_quarter` in `crops/high/R07-SS` and `crops/high/R09-LF`.
- The torso deviates. Shoulders are boxy and wide, with a padded-jacket silhouette (`crops/high/R02-pitcher`, `crops/high/R03-pitcher`). The chest shows breast-like bulges under the jersey (`crops/high/R17-pitcher_hands`, `crops/high/R08-CF`), which neither reference has under cloth.
- Faces in close-ups are nowhere near `mpfb2_athlete_face_34` or `hbm_male_realistic_face_34`, mostly because they render black (`crops/high/R02-batter_head`, `crops/high/R05-batter-front`).
- Hands are recognisably the same kind of hand as `hbm_male_realistic_hand`, but with faceted knuckles.
- Garment construction is far simpler than `si_jersey_*`.
- The LOD2 pixel error of 34–43% means distant players drift visibly from LOD0.
- Score: proportions roughly right, but faces and garments are far simpler, which is the 5 anchor. Half a point up for the hands and body proportions.

### Animation & game feel: 5.5
- **Pitch (`strips/high/R03`):** frames 1–8 show the set, hands rising and a high leg lift with the plant foot on the rubber. That is a real beat, but the strip ends before the stride and release. `high/desktop/R06` and `crops/high/R12-pitcher` show a reasonable stride and arm-cocked pose with the glove arm out.
- **Swing (`strips/high/R04`):** frames 1–4 hold an identical stance while the pitch arrives, with no load, hands back or stride. Frame 5 jumps straight to contact with the contact flash; frames 6–8 show rotation and a low finish. The feel (flash, trail) is there, but the weight transfer isn't.
- **Fielding (`strips/high/R07`):** frames 1–4 are a readable run. Frames 5–8 hold the same bent pose for four frames, and the ball passes beside the glove (frame 7) and ends past the fielder (frame 8) without ever entering it. There is no catch beat.
- **Trot (`strips/high/R10`):** the leg cycle alternates and the feet plant, but the arms are frozen at the chest across all 8 frames, and frames 3→4 pop.
- **Wide shots:** `strips/high/R08` and `strips/high/R11` are too wide to judge bodies; the players are 10–20 px.
- **Carry pose:** the glove is held out horizontally like a tray when running (`crops/high/R07-SS`, `crops/high/R09-LF`).
- **Score:** this is the 5 description: cycles read, the swing doesn't sell contact through the body, and throws and catches lack beats.

### Environment: 5.5
- Turf has mow checkerboarding (`high/desktop/R07`, `high/desktop/R09`). Dirt has grain (`crops/high/R05-batter_feet`). Light towers and foul poles are built objects. The new sponsor boards add signage (`high/desktop/R05`, `high/desktop/R17`).
- The crowd is a photographic strip that looks stretched and flat at the batting camera (`high/desktop/R14` old park, `crops/high/R02-batter`). It reads as a picture of people, not people.
- Trees are cones and blobs in front of a photo backdrop (`high/desktop/R09`, `high/desktop/R10`, `high/desktop/R15`). There is a pale haze band where the 3D trees meet the photo.
- The near stands on the title flyover are untextured grey blocks (`high/desktop/R01`).
- Beyond the fence in `high/desktop/R15` there are flat grey and tan discs that look like unfinished terrain.
- The pitching rubber is a thick white slab raised off the mound (`crops/high/R02-pitcher`, `crops/high/R17-pitcher-back`).
- No dugouts are visible in the modern park frames.
- Compared with smb3-1 and smb4-3 (dense 3D crowds, layered stands, dressed concourses), this sits just above the 5 anchor.

### Lighting & atmosphere: 5.5
- What works:
  - A directional key with shadows everywhere.
  - A good golden-hour grade in `high/desktop/R14` and `crops/high/R14-batter`.
  - Night tower pools and multiple player shadows in `high/desktop/R13`.
  - Bloom on the towers in `high/desktop/R12`.
- What fails:
  - There is no sky or bounce light modelling faces. Every helmeted face goes black (`crops/high/R02-batter_head`, `crops/high/R05-batter-front`, `crops/high/R10-batter-trot`).
  - Contact shadows are offset from the soles, so feet look detached (`crops/high/R05-batter_feet`).
  - The night sky is flat black with no gradient or haze (`high/desktop/R12`, `high/mobile/R12`), and the backdrop hills are lit like dusk daylight under a black sky.
  - The helmet specular is a blown white blob, not a material response.
- Against smb3-3 and smb4-1 this is the 5 anchor plus some grade.

### UI & typography: 6.0
- The score bug, count dots, inning, pitcher and batter lines, and pitch type with speed are consistent and readable (`high/desktop/R02`, `high/desktop/R04`).
- The HOME RUN / 400 FT banner has hierarchy (`high/desktop/R10`, `high/desktop/R15`).
- The pitch buttons and swing button are clear.
- Short of 7:
  - The count dots are small and low-contrast.
  - The in-world scoreboard duplicates the HUD.
  - The pitch reticle sits over the catcher's face (`high/desktop/R05`, `high/desktop/R17`).
  - There is no pitch or timing feedback beyond the speed text in these captures.
  - The bottom control bar is a heavy slab even on fielding views, where it holds a single fast-forward button (`high/desktop/R07`).
- It doesn't have smb3-1's broadcast package.

### Readability: 6.0
- Batting views are strong. The ball, zone and batter read at a glance (`high/desktop/R04`, `high/mobile/R02`).
- In-play wide views shrink players to about 15–20 px, and the ball is a few-pixel dot (`high/desktop/R07`, `high/desktop/R09`, `strips/high/R08`). The fielder rings help.
- In `high/desktop/R16` (runners on) the runner at first is cropped at the right edge, tiny.
- The home run frame `high/desktop/R10` doesn't show the batter-runner at all.
- The night shot `high/desktop/R13` puts fielders in dim patches.

### Mobile: 6.0
- Portrait batting is well framed, with big thumb buttons and a legible HUD (`high/mobile/R02`, `high/mobile/R12`).
- Portrait `high/mobile/R07` wastes the bottom 25% of the 3D view on empty foul dirt while fielders are about 15 px.
- Portrait night `high/mobile/R12` spends the top third on flat black sky.
- Landscape `high/landscape/R05` and `high/landscape/R07`: the HUD plus control bar eat about 35% of the height, and in-play figures are about 10 px.
- The phone proxy holds 62 fps minimum on medium and 117 on low under 4× throttle, so it passes 30 fps. But the 32.4 ms worst p95 on medium-throttled is a hitch.

### Medium/low regression check
- Medium shows the same skin-through-cap defect (`crops/medium/R17-pitcher-back`).
- Low uses a different stylised model: cartoon eyes, no shoes (black sock stumps) and simplified hands (`crops/low/R02-batter`). That is acceptable as a fallback, but it's a visible identity change between tiers.

## 3. Character defects list

1. **Skin through the cap crown:** a skin-coloured blotch on top of the cap on the pitcher (`crops/high/R17-pitcher-back`, `high/desktop/R17`, `crops/medium/R17-pitcher-back`). The umpire has the same defect (`crops/high/R05-batter-front`, `crops/high/R14-batter`, `high/desktop/R14`), and so does the old-park pitcher in `high/desktop/R14`. This contradicts the loop-4 clearance change.
2. **Faces crushed to black** under batting helmets, with no features readable: `crops/high/R02-batter_head`, `crops/high/R05-batter-front`, `crops/high/R02-batter_hands`, `crops/high/R10-batter-trot`, `crops/high/R16-runner1`.
3. **Batting helmet ear flap** renders as a detached flat black fin or plate beside the jaw: `crops/high/R02-batter_head`, `crops/high/R07-batter-runner`, `crops/high/R04-batter`.
4. **Batting helmet gloss** is a mirror-black surface with a blown specular blob, and the visor is a separate white-silver band that reads as chrome: `crops/high/R02-batter_head`.
5. **Umpire mask** bars float in front of and beside the face, with segmented bars showing visible gaps and no frame or padding attaching them to the head: `crops/high/R05-ump_head`, `crops/high/R05-batter-front`, `crops/high/R14-batter`.
6. **Catcher mask** cage floats in front of the chest protector, and its bottom bar runs into the glove (`crops/high/R06-catcher_glove`). In the old park it hangs off the side of the head (`crops/high/R14-batter`).
7. **Umpire shirt** has bare skin showing at the shoulder and neck through a torn, jagged cloth edge: `crops/high/R05-ump_head`.
8. **Sawtooth region boundaries** (whole-triangle steps) at the collar and placket top (`crops/high/R02-batter_head`, `crops/high/R07-SS`, `crops/high/R08-CF`), at the sleeve and body edge on the catcher (`crops/high/R05-catcher`, `crops/high/R06-catcher_glove`), at the sock and stirrup tops (`crops/high/R12-pitcher`, `crops/high/R02-pitcher`), and on the belt's lower edge (`crops/high/R17-pitcher_hands`).
9. **Placket piping** is wavy and kinked instead of straight: `crops/high/R17-pitcher_hands`.
10. **Chest lettering** is garbled or overlapping and broken by the piping: "LAKE HAMII TON" in `crops/high/R17-pitcher_hands`, "HOT SPRINGS" in `crops/high/R02-batter_hands`, "AKESIDE" in `crops/high/R07-SS` and `crops/high/R09-LF`.
11. **Breast-like bulges** push through the jersey on male players: `crops/high/R17-pitcher_hands`, `crops/high/R08-CF`, `crops/high/R14-batter`.
12. **Boxy shoulders** give a padded-jacket silhouette, with flat-shaded facets on the sleeves: `crops/high/R02-pitcher`, `crops/high/R03-pitcher`, `crops/high/R02-batter_head`.
13. **No cloth folds** anywhere: pants are smooth tubes, with no knee, elbow or belt bunching, and the fabric normal map is not visible: `crops/high/R05-batter_feet`, `crops/high/R08-CF`, `crops/high/R17-pitcher_hands`.
14. **Blank jersey backs** with no number or name: `high/desktop/R05`, `high/desktop/R14`, `high/desktop/R17`, `crops/high/R17-pitcher-back`.
15. **The glove is a flat brown slab or paddle** with no pocket, web, finger stalls or lacing. A skin-coloured spot shows on its back, likely a finger poking through: `crops/high/R17-pitcher_hands`, `crops/high/R09-LF`, `crops/high/R07-SS`, `crops/high/R03-pitcher`.
16. **The glove is carried as a horizontal tray** at the hip while running: `crops/high/R07-SS`, `crops/high/R08-CF`, `crops/high/R09-LF`.
17. **Cleat white stripe** is pixel-stepped and aliased, like a low-res mask: `crops/high/R05-batter_feet`, `crops/high/R02-batter`, `crops/high/R10-batter-trot`.
18. **Feet look detached from their contact shadows**, as if hovering slightly: `crops/high/R05-batter_feet`.
19. **Catcher shin guards** are blue scoops that read as detached bowls, not guards strapped to the shin: `crops/high/R06-catcher_glove`.
20. **The catcher's chest protector** is a lumpy blob with no plates or straps: `crops/high/R06-catcher_glove`.
21. **Caps are too tall and dome-like**, reading as helmets, and the brim covers the eyes of fielders: `crops/high/R16-1B`, `crops/high/R07-SS`, `crops/high/R02-pitcher`.
22. **One body type** for every player in all captures (`crops/high/R07-SS`, `crops/high/R08-CF`, `crops/high/R16-1B`, `crops/high/R17-pitcher-back`).
23. **The low tier** swaps in cartoon eyes, shoeless sock-stump feet and simplified hands (`crops/low/R02-batter`).

## 4. Ranked gaps

1. **G-cap-crown-skin** (characters, WS1, sev 5, S, +0.5). Skin bleeds through the cap crown on pitchers and umpires, and it's visible at frame size (`high/desktop/R14`, `high/desktop/R17`, `crops/high/R17-pitcher-back`, `crops/high/R05-batter-front`).
   - Fix: delete or hide the scalp faces that sit under the cap (a vertex-group mask per headwear type), or push the cap crown outward with a per-vertex normal offset checked against the deformed head in every clip.
   - Test: zero skin-hue pixels inside the cap silhouette in those four captures.
2. **G-face-lighting** (characters, WS3, sev 5, M, +0.5 characters, +0.5 lighting). Faces under helmets render black (`crops/high/R02-batter_head`, `crops/high/R05-batter-front`, `crops/high/R10-batter-trot`).
   - Fix: add hemisphere or sky fill plus a per-character rim or fill light, cap the helmet occlusion on the face, and give dark skin tones a minimum albedo with sub-surface tint.
   - Test: mean face luminance ≥ 0.25 and eyes, nose and brow visible in `crops/high/R02-batter_head`.
3. **G-region-sawtooth** (characters, WS1, sev 4, M, +0.5). Sleeve, collar, stirrup and belt boundaries are whole-triangle steps (`crops/high/R02-batter_head`, `crops/high/R05-catcher`, `crops/high/R12-pitcher`).
   - Fix: drive uniform colour regions from a UV-space mask texture with anti-aliased edges, or cut real edge loops along the trim lines. Do not assign colour per face.
   - Test: no stair steps longer than 2 px along any trim edge in the 2× crops.
4. **G-glove-model** (characters, WS1, sev 4, M, +0.5). The mitt is a flat paddle (`crops/high/R17-pitcher_hands`, `crops/high/R09-LF`, `crops/high/R06-catcher_glove`).
   - Fix: a real glove mesh with a pocket, laced web, finger stalls and a heel, a leather normal map with roughness variation, and a distinct catcher's mitt. Fix the fingertip poke-through on the back.
   - Test: the web and pocket are visible in `crops/high/R17-pitcher_hands`, with no skin pixels on the glove's outer face.
5. **G-cloth-folds-chest** (characters, WS1, sev 4, M, +0.5). There are no folds, the normal map is invisible, and breast bulges push through the jersey (`crops/high/R17-pitcher_hands`, `crops/high/R08-CF`, `crops/high/R05-batter_feet`).
   - Fix: bake fold normal maps per region (elbow, armpit, knee, belt blouse, pant hem bunching), raise the detail normal strength or scale until it's visible at crop distance, and flatten the chest morph under the jersey.
   - Test: folds visible at the elbows and knees in the 2× crops, and a flat chest profile in `crops/high/R17-pitcher_hands`.
6. **G-masks-attach** (characters, WS1, sev 4, M, +0.3). The catcher and umpire cages float (`crops/high/R05-ump_head`, `crops/high/R14-batter`, `crops/high/R06-catcher_glove`).
   - Fix: model the mask as a frame with padding and straps, parent it rigidly to the head bone, and seat it on the face.
   - Test: the cage sits in front of the face in all three crops, with no gaps between the bars and the frame.
7. **G-fielding-contact** (animation, WS2, sev 4, M, +0.5). The ball never enters the glove in `strips/high/R07`, the pose is held for 4 frames, and the glove is carried like a tray (`crops/high/R07-SS`, `crops/high/R09-LF`).
   - Fix: IK the glove hand to the ball's predicted position over the last 0.3 s, add a scoop, transfer and throw beat, and use an upright glove carry in the run cycle.
   - Test: the ball is within 0.2 ft of the glove pocket on the catch tick in `strips/high/R07`.
8. **G-swing-load** (animation, WS2, sev 3, M, +0.4). The batter is static in frames 1–4 of `strips/high/R04`, and launch jumps to contact.
   - Fix: add load keys (hands back, front-knee coil, toe tap or stride) that start at pitcher release, plus intermediate swing keys between launch and contact.
   - Test: the hands visibly move back and the front foot lifts between frames 1 and 4.
9. **G-body-variety** (characters, WS1, sev 3, M, +0.5). There is one build (`crops/high/R07-SS`, `crops/high/R08-CF`, `crops/high/R16-1B`).
   - Fix: at least 3 MakeHuman shape presets (stocky, lean or tall, average), assigned by position and roster.
   - Test: three distinct silhouettes visible across the close-ups.
10. **G-jersey-identity** (characters, WS1, sev 3, S, +0.3). Jersey backs are blank and the chest wordmark is garbled (`high/desktop/R05`, `high/desktop/R14`, `crops/high/R17-pitcher_hands`).
    - Fix: back numbers and names as a UV decal, and lay out the chest wordmark in UV space so the piping doesn't cross the letters.
    - Test: a readable number on the pitcher's back in `high/desktop/R05`, and an intact "LAKE HAMILTON".
11. **G-wide-cameras** (readability, WS5, sev 3, M, +0.5). In-play figures are 10–20 px (`high/desktop/R07`, `high/desktop/R09`, `high/landscape/R07`), and the HR trot runner is not on screen (`high/desktop/R10`).
    - Fix: a follow camera on the fielder making the play with a minimum figure height of 40 px at 1280×800, and a trot camera that keeps the runner in frame.
    - Test: measure figure heights in `R07` and `R09`.
12. **G-mobile-framing** (mobile, WS7, sev 3, S, +0.5). The portrait in-play view wastes the foreground (`high/mobile/R07`), the portrait night view wastes a third of the screen on black sky (`high/mobile/R12`), and the landscape HUD eats about 35% of the height (`high/landscape/R05`).
    - Fix: per-orientation camera FOV and target offsets, and a slimmer landscape HUD with no bottom bar on fielding views.
    - Test: the 3D view is at least 75% of the landscape height, and less than 10% of the portrait view is empty sky or foul dirt.
13. **G-env-dressing** (environment, WS4, sev 3, L, +0.5). The crowd is a flat photo strip (`high/desktop/R14`), trees are cones (`high/desktop/R09`, `high/desktop/R15`), the near stands are grey blocks (`high/desktop/R01`), and there is unfinished terrain beyond the R15 fence.
    - Fix: impostor-card crowds with per-seat variation and depth, textured stand concrete and railings, billboard tree clusters, and cleanup of the R15 beyond-fence geometry.
    - Test: no untextured grey surface larger than 5% of the frame in `R01`.
14. **G-night-sky** (lighting, WS3, sev 2, S, +0.3). The sky is flat black and the backdrop hills are mismatched (`high/desktop/R12`, `high/mobile/R12`).
    - Fix: a gradient night sky with a light-dome glow over the towers, haze in the tower beams, and a backdrop graded down to match.
    - Test: the sky luminance gradient is above 0 within 200 px of the towers.
15. **G-contact-shadows** (lighting, WS3, sev 2, S, +0.2). Shadows sit off the soles and the feet look detached (`crops/high/R05-batter_feet`).
    - Fix: a contact AO blob under each foot and a lower shadow bias, and check that the sole is at ground y.
    - Test: no lit gap between the sole and its shadow in `R05-batter_feet`.
16. **G-cleat-stripe** (characters, WS1, sev 2, S, +0.2). The stripe is pixel-stepped (`crops/high/R05-batter_feet`).
    - Fix: a stripe texture at 256²+ with mips, or a geometry decal.
    - Test: smooth stripe edges at 2× crop.
17. **G-rubber-slab** (environment, WS4, sev 1, S, +0.1). The pitching rubber is a raised slab (`crops/high/R02-pitcher`, `crops/high/R17-pitcher-back`).
    - Fix: sink it flush with the mound top.

```json
{
  "loop": 4,
  "role": "critic-claude",
  "tier": "high",
  "verdict": "continue",
  "scores": {
    "characters": {
      "score": 5.5,
      "confidence": 0.8,
      "evidence": [
        { "shot": "crops/high/R02-batter_head", "note": "face rendered black under mirror-glossy helmet; flap is a detached fin; sawtooth collar trim" },
        { "shot": "crops/high/R17-pitcher_hands", "note": "glove is a flat slab; garbled LAKE HAMII TON lettering; wavy placket; chest bulges; no folds" },
        { "shot": "crops/high/R17-pitcher-back", "note": "skin visible through cap crown" },
        { "shot": "crops/high/R05-ump_head", "note": "mask bars float in front of face; bare skin through torn shirt at shoulder" },
        { "shot": "crops/high/R05-batter_feet", "note": "pixel-stepped cleat stripe; tube pants with no folds" },
        { "shot": "crops/high/R14-batter", "note": "fingers wrap bat (good); ump skin through cap; catcher mask hangs off side of head" }
      ]
    },
    "charfit": {
      "score": 5.5,
      "confidence": 0.7,
      "evidence": [
        { "shot": "crops/high/R09-LF", "note": "limb and head proportions match mpfb2_athlete_three_quarter; face flat vs mpfb2_athlete_face_34" },
        { "shot": "crops/high/R02-pitcher", "note": "boxy, padded shoulders unlike either reference torso" },
        { "shot": "crops/high/R05-batter-front", "note": "face a black void, no comparison to reference face possible" },
        { "shot": "crops/high/R02-batter_hands", "note": "hands same kind as hbm_male_realistic_hand but faceted" }
      ]
    },
    "animation": {
      "score": 5.5,
      "confidence": 0.75,
      "evidence": [
        { "shot": "strips/high/R03", "note": "set and high leg lift read, plant foot holds rubber; strip ends before stride" },
        { "shot": "strips/high/R04", "note": "batter static frames 1-4, no load; contact flash and rotation frames 5-8" },
        { "shot": "strips/high/R07", "note": "run cycle reads; fielding pose frozen 4 frames; ball passes glove without entering" },
        { "shot": "strips/high/R10", "note": "trot legs alternate, feet plant; arms frozen at chest; pop between 3 and 4" },
        { "shot": "crops/high/R12-pitcher", "note": "decent stride and arm-cock pose" }
      ]
    },
    "environment": {
      "score": 5.5,
      "confidence": 0.75,
      "evidence": [
        { "shot": "high/desktop/R07", "note": "mow checkerboard, dirt grain, rings; sparse dressing" },
        { "shot": "high/desktop/R14", "note": "stretched photo crowd, bare backstop wall" },
        { "shot": "high/desktop/R15", "note": "cone trees; unfinished flat discs beyond the fence" },
        { "shot": "high/desktop/R01", "note": "near stands are untextured grey blocks" },
        { "shot": "high/desktop/R17", "note": "new sponsor boards add signage" }
      ]
    },
    "lighting": {
      "score": 5.5,
      "confidence": 0.7,
      "evidence": [
        { "shot": "crops/high/R02-batter_head", "note": "no fill or bounce; face crushed black, blown helmet specular" },
        { "shot": "high/desktop/R14", "note": "good golden-hour grade" },
        { "shot": "high/desktop/R13", "note": "tower pools and multiple shadows at night" },
        { "shot": "high/desktop/R12", "note": "flat black night sky, mismatched lit backdrop" },
        { "shot": "crops/high/R05-batter_feet", "note": "shadows offset from soles, feet look detached" }
      ]
    },
    "ui": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        { "shot": "high/desktop/R04", "note": "clean score bug, count, pitcher and batter lines, pitch speed" },
        { "shot": "high/desktop/R10", "note": "HOME RUN / 400 FT banner with hierarchy" },
        { "shot": "high/desktop/R05", "note": "reticle over catcher's face; heavy bottom bar" },
        { "shot": "high/desktop/R07", "note": "bottom bar holds a single button on fielding views" }
      ]
    },
    "readability": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        { "shot": "high/desktop/R04", "note": "ball, zone and batter read at a glance" },
        { "shot": "high/desktop/R09", "note": "fielders about 15 px, ball a few-pixel dot" },
        { "shot": "high/desktop/R16", "note": "runner at first tiny at the frame edge" },
        { "shot": "high/mobile/R07", "note": "fielders tiny on phone" }
      ]
    },
    "mobile": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        { "shot": "high/mobile/R02", "note": "good portrait batting framing, thumb-sized buttons" },
        { "shot": "high/mobile/R07", "note": "bottom quarter is empty foul dirt; tiny figures" },
        { "shot": "high/mobile/R12", "note": "top third is flat black sky" },
        { "shot": "high/landscape/R05", "note": "HUD and control bar take about 35% of the height" },
        { "shot": "high/landscape/R07", "note": "in-play figures about 10 px" }
      ]
    }
  },
  "gaps": [
    { "id": "G-cap-crown-skin", "category": "characters", "expectedGain": 0.5, "severity": 5, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher-back", "high/desktop/R14", "high/desktop/R17", "crops/high/R05-batter-front"], "benchmark": "smb4-2", "fix": "Mask or delete scalp faces under each headwear type, or offset the cap crown along normals against the deformed head in all clips. Test: zero skin-hue pixels inside the cap silhouette in the listed captures." },
    { "id": "G-face-lighting", "category": "characters", "expectedGain": 0.5, "severity": 5, "effort": "M", "workstream": "WS3", "evidence": ["crops/high/R02-batter_head", "crops/high/R05-batter-front", "crops/high/R10-batter-trot"], "benchmark": "smb3-3", "fix": "Add hemisphere fill and a per-character rim or fill light, cap helmet occlusion on the face, and set a minimum albedo and SSS tint for dark skin. Test: face mean luminance >= 0.25 with eyes and nose readable in R02-batter_head. Also lifts lighting about 0.5." },
    { "id": "G-region-sawtooth", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R02-batter_head", "crops/high/R05-catcher", "crops/high/R12-pitcher", "crops/high/R17-pitcher_hands"], "benchmark": "smb3-3", "fix": "Drive uniform colour regions from an anti-aliased UV mask texture, or cut edge loops along trim lines, instead of per-face assignment. Test: no stair steps longer than 2 px along trim edges in the 2x crops." },
    { "id": "G-glove-model", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R09-LF", "crops/high/R06-catcher_glove"], "benchmark": "smb3-3", "fix": "Replace the slab with a mitt mesh that has a pocket, laced web, finger stalls and heel, plus a leather normal and roughness map and a distinct catcher's mitt; fix the fingertip poke-through. Test: web and pocket visible and no skin pixels on the glove back in R17-pitcher_hands." },
    { "id": "G-cloth-folds-chest", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R08-CF", "crops/high/R05-batter_feet"], "benchmark": "smb4-2", "fix": "Bake fold normal maps (elbow, armpit, knee, belt blouse, hem bunching), make the detail normal visible at crop scale, and flatten the chest morph under the jersey. Test: folds visible at elbows and knees, and a flat chest profile in the crops." },
    { "id": "G-masks-attach", "category": "characters", "expectedGain": 0.3, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R05-ump_head", "crops/high/R14-batter", "crops/high/R06-catcher_glove"], "benchmark": "smb3-1", "fix": "Model the catcher and umpire masks with a frame, padding and straps, parent them rigidly to the head bone and seat them on the face. Test: cage centred over the face with no floating bars in all three crops." },
    { "id": "G-fielding-contact", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["strips/high/R07", "crops/high/R07-SS", "crops/high/R09-LF"], "benchmark": "smb4-5", "fix": "IK the glove hand to the predicted ball position over the final 0.3 s, add scoop, transfer and throw beats, and use an upright glove carry in the run. Test: ball within 0.2 ft of the glove pocket on the catch tick in strips/R07." },
    { "id": "G-swing-load", "category": "animation", "expectedGain": 0.4, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["strips/high/R04"], "benchmark": "smb4-3", "fix": "Start load keys at pitcher release (hands back, front-knee coil, stride or toe tap) and add in-between swing keys before contact. Test: hands move back and the front foot lifts between strip frames 1 and 4." },
    { "id": "G-body-variety", "category": "characters", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R07-SS", "crops/high/R08-CF", "crops/high/R16-1B"], "benchmark": "smb4-4", "fix": "Add at least 3 MakeHuman shape presets (stocky, lean or tall, average) assigned by roster and position. Test: three distinct silhouettes across the close-ups." },
    { "id": "G-jersey-identity", "category": "characters", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["high/desktop/R05", "high/desktop/R14", "crops/high/R17-pitcher_hands"], "benchmark": "smb3-3", "fix": "Add back numbers and names as UV decals, and lay out the chest wordmark in UV space so the piping doesn't cross the letters. Test: readable back number in R05 and an intact LAKE HAMILTON in R17-pitcher_hands." },
    { "id": "G-wide-cameras", "category": "readability", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS5", "evidence": ["high/desktop/R07", "high/desktop/R09", "high/desktop/R10", "high/landscape/R07"], "benchmark": "smb4-3", "fix": "Use a follow camera on the fielder making the play with a minimum 40 px figure at 1280x800, and keep the trot runner in frame on home runs. Test: measured figure heights in R07 and R09; runner visible in R10." },
    { "id": "G-mobile-framing", "category": "mobile", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/mobile/R07", "high/mobile/R12", "high/landscape/R05"], "fix": "Set per-orientation FOV and target offsets, use a slimmer landscape HUD, and drop the bottom bar on fielding views. Test: 3D view >= 75% of landscape height, and < 10% of portrait view is empty sky or foul dirt." },
    { "id": "G-env-dressing", "category": "environment", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS4", "evidence": ["high/desktop/R14", "high/desktop/R15", "high/desktop/R01", "high/desktop/R09"], "benchmark": "smb3-1", "fix": "Use impostor-card crowds with per-seat variation and depth, textured stand concrete and railings, and billboard tree clusters instead of cones, and remove the unfinished beyond-fence discs in R15. Test: no untextured grey surface > 5% of frame in R01." },
    { "id": "G-night-sky", "category": "lighting", "expectedGain": 0.3, "severity": 2, "effort": "S", "workstream": "WS3", "evidence": ["high/desktop/R12", "high/mobile/R12"], "benchmark": "smb4-1", "fix": "Add a gradient night sky with a light-dome glow over the towers and haze in the beams, and grade the backdrop down to match. Test: nonzero sky luminance gradient within 200 px of the towers." },
    { "id": "G-contact-shadows", "category": "lighting", "expectedGain": 0.2, "severity": 2, "effort": "S", "workstream": "WS3", "evidence": ["crops/high/R05-batter_feet"], "benchmark": "smb3-1", "fix": "Add a contact AO blob per foot, lower the shadow bias, and verify sole height equals ground. Test: no lit gap between sole and shadow in R05-batter_feet." },
    { "id": "G-cleat-stripe", "category": "characters", "expectedGain": 0.2, "severity": 2, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R05-batter_feet", "crops/high/R10-batter-trot"], "fix": "Render the cleat stripe from a mipmapped 256px+ texture or a geometry decal. Test: smooth stripe edges at 2x crop." },
    { "id": "G-rubber-slab", "category": "environment", "expectedGain": 0.1, "severity": 1, "effort": "S", "workstream": "WS4", "evidence": ["crops/high/R02-pitcher", "crops/high/R17-pitcher-back"], "fix": "Sink the pitching rubber flush with the mound top." }
  ]
}
```
