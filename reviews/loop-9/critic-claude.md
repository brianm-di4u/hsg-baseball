# Critic A (critic-claude): loop 9, high tier

## 1. Verdict

Diamond Springs now has a correctly proportioned MakeHuman-derived athlete with real fingers, readable team lettering and back numbers. At broadcast distance the silhouettes look like ballplayers, which is more than most browser baseball games manage. Up close it still falls well short of the 7 anchors. The uniforms are flat colour blocks with no cloth: no placket, no folds, and jagged polygon edges at the collar and sock tops. The cleats read as glossy dress shoes. The fielding glove is a brown mitten and the catcher's mitt is a brown hand. The umpire and catcher masks are free-floating ladders of bars. Faces are blank mannequins, or black voids under the batting-helmet brim. All players share one build with puffy deltoids. On animation, the strips show a pitch leg lift, a stride and a readable run. But the swing finish droops instead of wrapping, the run and chase arms are a frozen glove-out pose, and a stance foot hovers. The environment is a competent diamond with a photo-textured crowd on slabs, low-poly faceted trees against a photo backdrop with a visible seam, and black-box dugouts. The sponsor boards still show a sliced board between two boards, the defect loop 9 says it fixed. The HUD is the strongest area. Mobile portrait batting is well framed, but the fielding and night framings waste the phone screen.

## 2. Category scores

### Characters: 5.5
- `crops/high/R02-batter_head`: the face under the helmet brim is near-black with no readable eyes. The "higher self-light floor" doesn't rescue it. The helmet is a smooth bowl with a grey bill and a strap-like flap, with no ear-flap shell, vents or decal. The jersey collar shows a jagged, polygon-stepped yellow trim boundary.
- `crops/high/R06-catcher_glove`: the catcher's mitt is a brown hand with sculpted fingers, not a mitt (no pocket, no web, no rolled edge). The shin-guard knee caps are blue flared shells hanging off the knee.
- `crops/high/R05-ump_head`, `crops/high/R05-batter-front`, `crops/high/R14-batter`: the umpire's and catcher's masks are loose bars with no frame, padding or straps, standing off the face. In R05-ump_head the horizontal bars run past the head silhouette into the shoulder.
- `crops/high/R05-batter_feet`: the cleats are plain glossy black slip-ons with no laces, tongue or spikes, and read as dress shoes. Pants and socks are flat untextured cylinders.
- `crops/high/R17-pitcher_hands`: the fielding glove is a chunky brown mitten with no lacing or web. The jersey has piping and lettering but no buttons or placket line, and no fold anywhere.
- `crops/high/R03-pitcher`, `crops/high/R08-CF`: balloon deltoids and one shared body type, the same height and build across pitcher, SS, CF, LF and batter. Skin tones vary, builds don't.
- Positives: the hands grip the bat with separated fingers (`crops/high/R02-batter_hands`), back numbers are clean (`crops/high/R05-catcher`, `crops/high/R05-batter-front`), and the chest wordmarks read.
- Against smb4-2 and smb3-3 (stylised, but with cloth folds, a laced glove, a detailed cap and shoes), this sits between the 5 and 7 anchors and closer to 5. Gear and garments are the drag.

### Fidelity to reference (charfit): 5.5
- Proportions match the MPFB2 athlete (`mpfb2_athlete_three_quarter`) at frame distance: head size, limb length and leg taper are right in `high/desktop/R05`, `crops/high/R16-1B` and `crops/high/R10-batter-trot`. This agrees with IoU 0.878/0.895.
- Faces fall far short of `mpfb2_athlete_face_34`. That reference has eyes with irises, brows, lips, ears and hair. In `crops/high/R09-LF` and `crops/high/R16-1B` the faces are smooth, browless and doll-like with no readable eyes. In `crops/high/R02-batter_head` the face is just a dark mass.
- Hands are the closest match to `hbm_male_realistic_hand`: knuckles and fingers are present (`crops/high/R02-batter_hands`, `crops/high/R07-SS`). In running poses they freeze into an open, splayed claw.
- Garments are nowhere near `si_jersey_front` (fabric weave, wear, collar construction, placket). Ours are flat-shaded blocks (`crops/high/R17-pitcher_hands`).
- The shoulders are wider and rounder than the reference's (`crops/high/R03-pitcher`, `crops/high/R08-CF`), a silhouette departure in the torso.
- LOD2 pixel error is 33–39% at all heights, so whatever tier uses LOD2 drifts visibly. The low-tier pitcher head artefact below fits that.

### Animation & game feel: 5.5
- `strips/high/R03`: the pitcher goes from the set (1–4) through a hands-break (5–6) to a real leg lift (7–8) with the plant foot on the rubber. That has weight. But `crops/high/R12-pitcher` shows the throwing arm still cocked back with an open, empty hand while the pitch is in flight, and the frames give no sign of the follow-through.
- `strips/high/R04`: the stride and contact flash read (frame 5, the glow at the plate). The finish in frames 6–8 is weak: the bat ends hanging low in front of the body with hands at the chest. There's no high wrap over the shoulder and no hip rotation through to face the pitcher, unlike smb4-3. Frame 7 to 8 also shows a sudden body yaw.
- `strips/high/R07`: the SS run cycle reads with alternating legs. The transition into a fielding crouch (5–8) has the glove down and the ball arriving, which is good. Frames 1–4 hold the arms rigid, glove out to the side and bare hand forward and open. The same frozen arm pose shows in `crops/high/R08-CF` and `crops/high/R09-LF`, so the run cycle has no arm pump.
- `strips/high/R10`: the home-run trot alternates feet with contact, but the arms stay locked bent with almost no swing across 8 frames.
- `crops/high/R05-batter_feet`: before the pitch ("0 pitches" in `high/desktop/R05`), the batter's front cleat hovers above the dirt with its shadow detached. That's a stance foot not planted.
- `strips/high/R08` and `strips/high/R11` are wide broadcast pans where the fielders are too small to judge motion. There's no dust anywhere.

### Environment: 5.5
- `high/desktop/R05`, `high/desktop/R17`: the crowd is a photo texture on a sloped slab, and a large blank grey concrete band sits between it and the boards. It reads as a backdrop, not people. Compare smb3-1 and smb4-3, which have modelled people, rails, arches and bunting. In `high/mobile/R05` the crowd photo is blurry and its tile seams show.
- `crops/high/R07-batter-runner`: a navy board shows only "E" in a narrow sliver between two "RIDGELINE PIZZA" boards. In `crops/high/R05-ump` a navy "RE" fragment sits between yellow boards. Boards are still sliced or overlapping despite the loop-9 change.
- `high/desktop/R09`, `high/desktop/R10`, `high/desktop/R15`: there's a hard horizontal seam where the photo forest backdrop meets a misty band and then the low-poly faceted tree blobs. The trees are visibly faceted, cone-and-ball geometry.
- `high/desktop/R07`, `high/desktop/R08`: the dugout roofs show as dark green slanted slabs poking into the frame at the corners. In `crops/high/R14-batter` the dugout is a flat black rectangle with no interior.
- `high/desktop/R15`: behind the outfield wall there are grey elliptical pads with scattered dark specks, which read as unfinished ground.
- `high/desktop/R12`: the night backdrop has a torn, jagged top edge against the sky. `high/mobile/R12` shows it too.
- Positives: mow-pattern turf, grained dirt (`crops/high/R05-batter_feet`), chalk and batter's-box wear, built light towers, foul poles, a scoreboard and distance markers. The historic park (`high/desktop/R14`, `R15`) has a distinct palette.
- `high/desktop/R17` "Majestic Park" uses the same boards, wall and crowd treatment as the home park in `high/desktop/R05`, so the parks are hard to tell apart from the pitching camera.

### Lighting & atmosphere: 5.5
- `high/desktop/R02`, `high/desktop/R05`: there's a directional key with crisp cast shadows and contact shadows under the feet (`crops/high/R05-batter_feet`). But no sky or bounce light models the bodies. The white pants and jerseys are flat grey-white gradients (`crops/high/R03-pitcher`).
- `crops/high/R02-batter_head`, `crops/medium/R02-batter_head`: the face under the brim is still nearly black in daylight.
- `high/desktop/R13`: night lighting uses the tower glow sprites and multi-shadows (good). The tree line is pure black silhouette, and the lit pool is lopsided, bright left and dim right. There's no haze or volumetric.
- `high/desktop/R14`, `crops/high/R14-batter`: the golden-hour grade is the best lighting in the set, warm and believable, close to the smb3-4 mood.
- There's specular on the helmets and cleats (`crops/high/R02-batter_head`, `crops/high/R05-batter_feet`). Nothing reaches the smb4-1 night-sign glow.

### UI & typography: 6.5
- `high/desktop/R02`, `high/desktop/R05`: a clean broadcast-style score bug with crests, bases, B/S/O, the pitcher/AB line, pitch type and mph (`high/desktop/R04`). The type scale is consistent, and the bottom bar of large labelled buttons with key hints is clear.
- `high/desktop/R10`, `high/desktop/R15`: the HOME RUN / 400 FT banner has hierarchy. It's static and sits over the ball in `high/landscape/R10`.
- `high/desktop/R05`, `high/desktop/R06`: the aim reticle and zone grid fully cover the catcher, hiding the target glove the player is aiming at.
- `high/desktop/R11`: the "Replay" pill is minimal. There's no TV-package motion, and nothing like ootp26-1's data density.

### Readability: 6.0
- `high/desktop/R02`, `high/desktop/R04`: the batting camera reads at a glance. The zone, pitcher and ball with its trail ("FB 77 mph") are all clear.
- `high/desktop/R07`, `high/desktop/R08`: in the broadcast fielding camera the players are ~15–20 px. The rings help, but the ball is a few white pixels on green in `R08`.
- `high/desktop/R16`: the runner on first is at the extreme right edge of the frame, partly cut. Only the HUD diamond tells you he's there.
- `high/desktop/R05`, `high/desktop/R06`: the catcher is hidden under the reticle.
- `high/desktop/R13`: at night the fielders against the green are readable, but the ball near the scoreboard is lost.

### Mobile: 6.0
- `high/mobile/R02`, `high/mobile/R12`: portrait batting has a large batter, a readable HUD and thumb-sized BUNT/STEAL/SWING buttons. That's intentional. But the top third of `high/mobile/R12` is empty black sky, and the pitcher is small.
- `high/mobile/R05`: the pitcher is cut off at the left edge, and a blurry, tile-seamed photo crowd fills the top.
- `high/mobile/R07`: the bottom ~20% of the play area is empty dirt and grass foreground while the fielders are ~20 px tall. That's not an intentional portrait framing.
- `high/landscape/R07`, `high/landscape/R10`: the HUD bar takes ~18% of the height, the HR banner covers the ball and scoreboard, and the players are tiny.
- Perf: the phone proxy (medium, 4× throttle) holds 63 fps minimum, so it passes the 30 fps bar.

### Regressions in medium/low
- `low/desktop/R05`: pitcher #27's head renders as a skin-coloured oval with a black band across the eyes, and the number sits on his side. The head and cap read as facing the camera (or blindfolded) when the high tier shows his back. This looks like an LOD/cap artefact.
- `crops/medium/R02-batter_head`: looks the same as high (dark face). There's no regression, and no improvement either.

## 3. Character defects list
1. The face under the batting-helmet brim is near-black with no features (`crops/high/R02-batter_head`, `crops/medium/R02-batter_head`).
2. The batting helmet has no real ear-flap shell, only a thin strap-like flap, plus a flat grey bill and no decal or vents (`crops/high/R02-batter_head`, `crops/high/R04-batter`).
3. The jersey collar and trim have a jagged, polygon-stepped colour boundary (`crops/high/R02-batter_head`, `crops/high/R02-batter_hands`).
4. Sock tops have a ragged, torn colour edge at the ankle (`crops/high/R02-pitcher`, `crops/high/R07-SS`, `crops/high/R09-LF`, `crops/high/R12-pitcher`).
5. The cleats are glossy dress-shoe slip-ons with no laces, tongue or spikes (`crops/high/R05-batter_feet`, `crops/high/R10-batter-trot`).
6. The batter's front foot floats above the dirt in the pre-pitch stance, with a detached shadow (`crops/high/R05-batter_feet`).
7. The catcher's mitt is a brown hand with fingers, not a mitt (`crops/high/R06-catcher_glove`, `crops/high/R05-catcher`).
8. The fielder's glove is a blocky brown mitten with no web, lacing or pocket (`crops/high/R17-pitcher_hands`, `crops/high/R08-CF`, `crops/high/R07-SS`).
9. The catcher's knee caps are flared blue shells that read as flippers (`crops/high/R06-catcher_glove`, `crops/high/R05-catcher`).
10. The catcher's chest protector is just blue jersey colour with a ruffled neck edge, with no plates or harness (`crops/high/R06-catcher_glove`).
11. The umpire and catcher masks are free-floating bars with no frame, padding or straps. The umpire's bars cut into the shoulder (`crops/high/R05-ump_head`, `crops/high/R05-batter-front`, `crops/high/R14-batter`).
12. Faces are blank and browless with no readable eyes (`crops/high/R09-LF`, `crops/high/R16-1B`, `crops/high/R17-pitcher-back`).
13. The cap sits high with skin showing between the bill and brow (`crops/high/R09-LF`).
14. Balloon deltoids and one body type for everyone (`crops/high/R03-pitcher`, `crops/high/R08-CF`, `crops/high/R02-pitcher`).
15. Uniforms are flat colour blocks with no folds, no button placket and no belt loops or buckle (`crops/high/R17-pitcher_hands`, `crops/high/R02-batter`).
16. Running arms are frozen glove-out with the bare hand splayed open (`crops/high/R07-SS`, `crops/high/R08-CF`, `crops/high/R09-LF`).
17. The batter-runner's arms are locked against the chest while running (`crops/high/R07-batter-runner`).
18. The pitcher's throwing arm is still cocked back with an open, empty hand while the pitch is in flight (`crops/high/R12-pitcher`).
19. At set, the pitcher's glove and bare hand are apart and not together at the belt (`crops/high/R17-pitcher_hands`, `crops/high/R02-pitcher`).
20. The pitching rubber is a raised white slab on a flat mound, so the feet stand on a block (`crops/high/R02-pitcher`, `crops/high/R17-pitcher-back`).
21. Low tier: the pitcher's head shows a black band across a face oval from behind (`low/desktop/R05`).

## 4. Ranked gaps

1. **G-gear-glove-mitt-cleats** (characters, WS1). The glove and mitt read as hands or mittens, and the cleats read as dress shoes (`crops/high/R06-catcher_glove`, `crops/high/R17-pitcher_hands`, `crops/high/R05-batter_feet`). **Fix:** model a fielder's glove with a laced web, pocket and rolled heel, and a rounded catcher's mitt with no visible fingers. Give the cleats a low-top shoe with a laced upper, a tongue and a sole with a spike plate. Normal-map the leather. **Test:** in R06-catcher_glove no fingers are visible on the mitt, and in R17-pitcher_hands web lacing is visible. Gain +0.5 (characters), +0.25 (charfit). Severity 4, effort M.
2. **G-uniform-cloth** (characters, WS1). The uniforms are flat blocks with jagged trim and sock edges (`crops/high/R02-batter_head`, `crops/high/R17-pitcher_hands`, `crops/high/R07-SS`). **Fix:** bake a cloth normal and AO map with a button placket, fold creases at the elbow, waist and knee, and belt loops. Move the trim and sock colour edges from per-face to texture-space so the boundaries are smooth. **Test:** no stair-stepped colour boundaries at the collar or sock top in R02-batter_head and R07-SS, and visible folds at the knee in R05-batter_feet. Gain +0.5 (characters), +0.5 (charfit). Severity 4, effort M.
3. **G-face-under-brim** (lighting, WS3). Faces under the brim go black, and faces in the open are featureless (`crops/high/R02-batter_head`, `crops/high/R09-LF`). **Fix:** use the reference's eye, brow and lip albedo (MPFB2 skin and eye textures) at LOD0/LOD1, and add a hemisphere fill or bent-normal ambient on skin so the brim-shadowed face keeps ≥ 25% luminance. **Test:** eyes and brows are distinguishable in R02-batter_head and R16-1B. Gain +0.5 (charfit), +0.25 (characters), +0.25 (lighting). Severity 4, effort M.
4. **G-masks-catcher-gear** (characters, WS1). The masks are floating bars, and the catcher's shin and chest gear are flippers and jersey colour (`crops/high/R05-ump_head`, `crops/high/R06-catcher_glove`). **Fix:** model the mask frame with padded sides and straps parented to the head bone, add plate-segmented shin guards with knee caps fitted to the knee, and add a chest protector with a harness. **Test:** in R05-ump_head the bars stay inside the head silhouette and have a frame. Gain +0.5 (characters). Severity 3, effort M.
5. **G-run-arm-pump** (animation, WS2). The run, chase and trot arms are frozen (`strips/high/R07`, `strips/high/R10`, `crops/high/R08-CF`). **Fix:** author or retarget a run cycle with counter-phased arm swing, keep the glove hand closed and carried, and close the bare hand into a loose fist. **Test:** the hand positions alternate fore and aft across strips R07 frames 1–4 and R10 frames 1–8. Gain +0.5 (animation). Severity 4, effort M.
6. **G-swing-finish** (animation, WS2). The swing finish droops and the hips don't rotate through (`strips/high/R04` frames 6–8). **Fix:** key the follow-through so the hands finish above the lead shoulder with the bat wrapped behind the neck, the back heel rolls up and the belt buckle faces the pitcher. **Test:** in R04 frame 8 the bat head is above the helmet and behind the batter. Gain +0.5 (animation). Severity 3, effort S.
7. **G-foot-plant-ik** (animation, WS2). The stance foot hovers (`crops/high/R05-batter_feet`). **Fix:** apply foot IK or ground-clamp to the idle and stance clips (sole y = 0 when the foot isn't in the stride window). **Test:** the sole touches the dirt with the contact shadow directly beneath in R05-batter_feet. Gain +0.25 (animation). Severity 3, effort S.
8. **G-crowd-backdrop** (environment, WS4). The photo crowd on slabs, the blank grey wall band, the backdrop seam and the faceted trees (`high/desktop/R05`, `high/desktop/R10`, `high/desktop/R09`). **Fix:** replace the slab crowd with instanced impostor cards per seat row with per-instance tint and idle bob, add a rail and fascia over the grey band, blend the photo backdrop into the tree layer with depth fog, and swap the faceted trees for billboarded foliage cards. **Test:** no horizontal seam in R10, and individual heads visible against seats in R05. Gain +0.75 (environment). Severity 4, effort L.
9. **G-board-slice** (environment, WS4). Sponsor boards are still sliced or overlapping (`crops/high/R07-batter-runner`, `crops/high/R05-ump`). **Fix:** check board placement at the junction between the backstop runs and the stand front, so that no board narrower than its full width is placed. **Test:** no partial navy "E" or "RE" sliver between yellow boards in those crops. Gain +0.25 (environment). Severity 2, effort S.
10. **G-dugout-geometry** (environment, WS4). The dugouts are black boxes, and the dark roof slabs intrude into the broadcast camera (`crops/high/R14-batter`, `high/desktop/R07`, `high/desktop/R08`). **Fix:** model the dugout interior (bench, back wall, rail, steps) and lower or cull the roof slabs that enter the broadcast frustum. Gain +0.25 (environment). Severity 2, effort M.
11. **G-mobile-framing** (mobile, WS5/WS7). The portrait fielding view wastes the foreground, the pitcher is cut off and the top third is empty sky (`high/mobile/R07`, `high/mobile/R05`, `high/mobile/R12`). **Fix:** use portrait-specific camera presets. Tilt the broadcast camera down and tighten the FOV so the diamond fills the frame. Pull the pitching camera back so the pitcher is fully in frame. Lower the horizon on the night batting camera. **Test:** no empty band > 10% of height, and every featured player fully visible. Gain +0.5 (mobile), +0.25 (readability). Severity 3, effort S.
12. **G-reticle-occludes-catcher** (readability, WS7). The aim reticle hides the catcher (`high/desktop/R05`, `high/desktop/R06`). **Fix:** draw the zone and reticle as outline-only at 50% opacity, or offset the camera so the zone sits above the catcher's mitt. Gain +0.25 (readability), +0.25 (ui). Severity 2, effort S.
13. **G-body-variety** (characters, WS1). Everyone has one build with balloon deltoids (`crops/high/R03-pitcher`, `crops/high/R08-CF`). **Fix:** drive 3+ MakeHuman shape-key presets (lean, stocky, tall) per roster slot, and reduce the deltoid bulge to match `mpfb2_athlete_front`. **Test:** visibly different widths among players in R05 and R07. Gain +0.25 (characters), +0.25 (charfit). Severity 3, effort M.
14. **G-low-lod-head** (characters, WS6). The low tier shows a black band across the head (`low/desktop/R05`). **Fix:** check the LOD2 cap/head material and orientation. Gain: regression removal. Severity 2, effort S.

## 5. Scores

```json
{
  "loop": 9,
  "role": "critic-claude",
  "tier": "high",
  "scores": {
    "characters": {
      "score": 5.5,
      "confidence": 0.75,
      "evidence": [
        { "shot": "crops/high/R06-catcher_glove", "note": "catcher's mitt is a brown hand with fingers; flipper-like blue knee shells" },
        { "shot": "crops/high/R05-batter_feet", "note": "cleats are glossy dress-shoe slip-ons; flat pants and socks" },
        { "shot": "crops/high/R05-ump_head", "note": "mask is floating bars with no frame, crossing the shoulder" },
        { "shot": "crops/high/R02-batter_head", "note": "black face under brim; jagged collar trim" },
        { "shot": "crops/high/R17-pitcher_hands", "note": "mitten glove; no placket or folds" },
        { "shot": "crops/high/R02-batter_hands", "note": "positive: fingers grip the bat; wordmark reads" }
      ]
    },
    "charfit": {
      "score": 5.5,
      "confidence": 0.7,
      "evidence": [
        { "shot": "crops/high/R16-1B", "note": "proportions match mpfb2_athlete; face blank vs mpfb2_athlete_face_34" },
        { "shot": "crops/high/R09-LF", "note": "browless doll face, no readable eyes" },
        { "shot": "crops/high/R02-batter_hands", "note": "hands closest to hbm_male_realistic_hand" },
        { "shot": "crops/high/R08-CF", "note": "deltoids wider and rounder than the reference" },
        { "shot": "crops/high/R17-pitcher_hands", "note": "garment far simpler than si_jersey_front" }
      ]
    },
    "animation": {
      "score": 5.5,
      "confidence": 0.7,
      "evidence": [
        { "shot": "strips/high/R03", "note": "set to leg lift with planted foot: reads" },
        { "shot": "strips/high/R04", "note": "contact flash reads; finish droops with no wrap or hip rotation" },
        { "shot": "strips/high/R07", "note": "run legs fine, arms frozen; fielding crouch good" },
        { "shot": "strips/high/R10", "note": "trot feet plant, arms locked" },
        { "shot": "crops/high/R05-batter_feet", "note": "stance foot hovers before the pitch" },
        { "shot": "crops/high/R12-pitcher", "note": "arm still cocked with open hand while the pitch is in flight" }
      ]
    },
    "environment": {
      "score": 5.5,
      "confidence": 0.75,
      "evidence": [
        { "shot": "high/desktop/R05", "note": "photo crowd on slab plus blank grey wall band" },
        { "shot": "crops/high/R07-batter-runner", "note": "sliced navy board between two RIDGELINE boards" },
        { "shot": "high/desktop/R10", "note": "photo-backdrop seam over faceted low-poly trees" },
        { "shot": "high/desktop/R07", "note": "dark dugout-roof slabs intruding at the frame corners" },
        { "shot": "crops/high/R14-batter", "note": "dugout is a black rectangle" },
        { "shot": "high/desktop/R14", "note": "positive: historic park palette, mow and dirt grain" }
      ]
    },
    "lighting": {
      "score": 5.5,
      "confidence": 0.7,
      "evidence": [
        { "shot": "crops/high/R02-batter_head", "note": "face black under the brim in daylight" },
        { "shot": "high/desktop/R13", "note": "night: glow sprites and multi-shadows, black tree silhouettes, lopsided light pool, no haze" },
        { "shot": "high/desktop/R14", "note": "golden hour is the best grade" },
        { "shot": "crops/high/R03-pitcher", "note": "no bounce or sky fill modelling the white uniform" }
      ]
    },
    "ui": {
      "score": 6.5,
      "confidence": 0.75,
      "evidence": [
        { "shot": "high/desktop/R04", "note": "clean score bug, count, pitch type and mph" },
        { "shot": "high/desktop/R10", "note": "HOME RUN banner with hierarchy, static" },
        { "shot": "high/desktop/R05", "note": "reticle covers the catcher" },
        { "shot": "high/desktop/R11", "note": "minimal Replay pill, no broadcast motion" }
      ]
    },
    "readability": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        { "shot": "high/desktop/R02", "note": "batting view reads at a glance" },
        { "shot": "high/desktop/R08", "note": "fielders about 15 px, ball a few pixels" },
        { "shot": "high/desktop/R16", "note": "runner on first cut at the frame edge" },
        { "shot": "high/desktop/R06", "note": "catcher hidden by the zone grid" }
      ]
    },
    "mobile": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        { "shot": "high/mobile/R02", "note": "good portrait batting framing, thumb buttons" },
        { "shot": "high/mobile/R07", "note": "empty foreground, tiny fielders" },
        { "shot": "high/mobile/R05", "note": "pitcher cut off at the left; blurry tiled crowd" },
        { "shot": "high/mobile/R12", "note": "top third is empty sky" },
        { "shot": "high/landscape/R10", "note": "banner covers the ball; tall HUD bar" }
      ]
    }
  },
  "gaps": [
    { "id": "G-gear-glove-mitt-cleats", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R06-catcher_glove", "crops/high/R17-pitcher_hands", "crops/high/R05-batter_feet"], "benchmark": "smb4-2", "fix": "Model a laced-web fielder's glove and a fingerless rounded catcher's mitt; replace the slip-on shoes with a laced low-top cleat with tongue and spike plate; leather normal maps. Test: no fingers on the mitt in R06-catcher_glove, web lacing visible in R17-pitcher_hands." },
    { "id": "G-uniform-cloth", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R02-batter_head", "crops/high/R17-pitcher_hands", "crops/high/R07-SS"], "benchmark": "smb3-3", "fix": "Bake cloth normal and AO with button placket, folds at elbow, waist and knee, and belt loops; move trim and sock colour boundaries into texture space so they are smooth. Test: no stair-stepped colour edges at the collar or sock top." },
    { "id": "G-face-under-brim", "category": "charfit", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS3", "evidence": ["crops/high/R02-batter_head", "crops/high/R09-LF", "crops/high/R16-1B"], "benchmark": "mpfb2_athlete_face_34", "fix": "Use MPFB2 eye, brow and lip albedo at LOD0/1 and a hemisphere/bent-normal fill on skin so a brim-shadowed face keeps at least 25% luminance. Test: eyes and brows readable in R02-batter_head and R16-1B." },
    { "id": "G-masks-catcher-gear", "category": "characters", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R05-ump_head", "crops/high/R06-catcher_glove", "crops/high/R05-batter-front"], "benchmark": "smb3-1", "fix": "Model a framed, padded mask with straps parented to the head bone; segmented shin guards with fitted knee caps; a chest protector with harness. Test: mask bars stay inside the head silhouette in R05-ump_head." },
    { "id": "G-run-arm-pump", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["strips/high/R07", "strips/high/R10", "crops/high/R08-CF"], "benchmark": "smb4-2", "fix": "Run, chase and trot cycles with counter-phased arm swing, glove carried closed, bare hand in a loose fist. Test: hands alternate fore and aft across R07 frames 1-4 and R10 frames 1-8." },
    { "id": "G-swing-finish", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS2", "evidence": ["strips/high/R04"], "benchmark": "smb4-3", "fix": "Key the follow-through: hands finish above the lead shoulder, bat wrapped behind the neck, back heel up, belt buckle facing the pitcher. Test: R04 frame 8 bat head above the helmet." },
    { "id": "G-foot-plant-ik", "category": "animation", "expectedGain": 0.25, "severity": 3, "effort": "S", "workstream": "WS2", "evidence": ["crops/high/R05-batter_feet"], "fix": "Foot IK or ground clamp on the stance and idle clips outside the stride window. Test: sole touches the dirt with the shadow directly under it in R05-batter_feet." },
    { "id": "G-crowd-backdrop", "category": "environment", "expectedGain": 0.75, "severity": 4, "effort": "L", "workstream": "WS4", "evidence": ["high/desktop/R05", "high/desktop/R10", "high/desktop/R09", "high/mobile/R05"], "benchmark": "smb4-3", "fix": "Instanced impostor fans per seat row with tint and idle motion; rail and fascia over the grey band; blend the photo backdrop into the tree layer with depth fog; billboard foliage instead of faceted blobs. Test: no horizontal seam in R10; individual heads visible in R05." },
    { "id": "G-board-slice", "category": "environment", "expectedGain": 0.25, "severity": 2, "effort": "S", "workstream": "WS4", "evidence": ["crops/high/R07-batter-runner", "crops/high/R05-ump"], "fix": "Check board placement at the backstop/stand junction so no partial board is emitted. Test: no navy 'E'/'RE' sliver between yellow boards." },
    { "id": "G-dugout-geometry", "category": "environment", "expectedGain": 0.25, "severity": 2, "effort": "M", "workstream": "WS4", "evidence": ["crops/high/R14-batter", "high/desktop/R07", "high/desktop/R08"], "benchmark": "smb3-1", "fix": "Model the dugout interior (bench, back wall, rail, steps); cull or lower the roof slabs entering the broadcast frustum." },
    { "id": "G-mobile-framing", "category": "mobile", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS5", "evidence": ["high/mobile/R07", "high/mobile/R05", "high/mobile/R12"], "fix": "Portrait camera presets: tilt and tighten the broadcast camera, pull the pitching camera back so the pitcher is fully framed, lower the horizon on the night batting camera. Test: no empty band over 10% of height and featured players fully in frame." },
    { "id": "G-reticle-occludes-catcher", "category": "readability", "expectedGain": 0.25, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R05", "high/desktop/R06"], "fix": "Draw the zone and reticle outline-only at 50% opacity, or raise the zone above the catcher's mitt." },
    { "id": "G-body-variety", "category": "characters", "expectedGain": 0.25, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R03-pitcher", "crops/high/R08-CF"], "benchmark": "smb4-4", "fix": "Three or more MakeHuman shape presets (lean, stocky, tall) per roster slot; reduce the deltoid bulge toward mpfb2_athlete_front." },
    { "id": "G-low-lod-head", "category": "characters", "expectedGain": 0.0, "severity": 2, "effort": "S", "workstream": "WS6", "evidence": ["low/desktop/R05"], "fix": "Fix the LOD2 cap/head material and orientation: black band across the pitcher's head seen from behind." }
  ],
  "verdict": "continue"
}
```
