# Critic A (critic-claude): loop 1, high tier

All capture paths are relative to `screenshots/review-loop-1/`.

## 1. Verdict

The v3 MPFB2 bodies are a real step up in base anatomy. Shoulders, hips, knees and five-finger hands are present and the proportions line up with `mpfb2_athlete_front`. Everything layered on top of those bodies is still prototype quality, though, and it shows in every close-up. Dark-skinned faces under helmets render as black voids (`crops/high/R02-batter_head`, `crops/high/R10-batter-trot`). Helmets are faceted domes with a blocky checkerboard specular and slab ear flaps. Gloves are featureless brown paddles. Necklines are ragged sawtooth cuts with skin poking through. Mask cages float in front of faces with no frame or straps, and back numbers render mirrored. The jersey has no placket, collar, piping or folds. Animation has the right beats (leg lift, stride, load, rotation, contact flash), but the pitcher levitates off the rubber during the lift and the shortstop freezes in his fielding crouch. The environment is let down by a photographic crowd billboard at the wrong scale behind home: the fans' heads are larger than the batter's. This is a 5–6 game across the board, nowhere near any gate. **Continue.**

## 2. Category scores

### Characters: 5.0
- `crops/high/R02-batter_head` and `crops/high/R02-batter_hands`: the helmet is a visibly faceted dome with a checkerboard (per-quad) specular highlight. The ear flap is a flat rectangular slab hanging beside the jaw. The face is almost pure black: no eyes, nose or brow can be read; only a lip highlight shows. That fails the rubric-7 test of "a face with real features that holds up in close-ups".
- `crops/high/R17-pitcher_hands`: the bare hand has good separate fingers with a credible curl (5+). The glove on the other hand is a lumpy, flat-shaded brown mitten with no fingers, web, lacing or pocket (below 5). The jersey neckline is a jagged sawtooth with skin triangles. The belt is a flat black band with a polygonal lower edge. There is no placket, buttons or folds: a color block, exactly the 5 anchor.
- `crops/high/R05-batter-front` and `crops/high/R14-batter`: the umpire's mask is a free-floating ladder of bars several inches in front of the face, with no frame, pads or straps. The catcher's mask does the same beside the helmet. Credit: the light-skinned umpire face shows a modelled nose, ear and lips.
- `crops/high/R06-catcher_glove`: the chest protector is a flat blue faceted plate. The shin guards are flared blue "petal" shapes with lumpy outlines and no knee cap or straps. The catcher's mitt is a faceted brown lump.
- `crops/high/R05-batter_feet`: the shoes read as glossy rubber clogs or loafers, not cleats: no laces, tongue or spikes. The stirrup socks are plain black tubes with no stirrup cut.
- Body variety: in `crops/high/R17-pitcher-back` against `crops/high/R02-pitcher`, builds differ a little (lean versus average), but no clearly stocky 5'9" build reads in any capture. Skin tone is the main visible variety.
- Benchmarks smb4-2 and smb4-4 (stylised 7–8) have sewn numbers and names, piped sleeves, detailed caps and gloves, and readable faces in all lighting. This is not close. Anatomy alone lifts it off a 4.

### Fidelity to reference (charfit): 5.5
- Proportions: `crops/high/R02-pitcher` and `crops/high/R17-pitcher-back` against `mpfb2_athlete_front` and `mpfb2_athlete_side`. Head-to-body ratio, limb lengths and shoulder width match, which is expected because it is the same base mesh. This agrees with the brief's IoU of 0.84–0.85.
- Face: `crops/high/R02-batter_head` against `mpfb2_athlete_face_34` and `hbm_male_realistic_face`. The references have eyes, lids, brows, nasolabial structure and ears. In game, dark-skinned faces lose all of it to black, and helmets and caps cover the brow. The faces only resemble the reference on light-skinned figures (`crops/high/R14-batter` umpire, `crops/high/R17-pitcher_hands` lips and chin).
- Hands: `crops/high/R17-pitcher_hands` against `mpfb2_athlete_hand`. The finger count and proportions are the same kind of hand. There are no knuckle or nail details, but that is acceptable at game distance.
- Garments: `crops/high/R07-SS` against `si_jersey_three_quarter`. The reference has a collar, a zip or placket, sleeve trim, fabric wrinkles and a shirttail hem. The in-game jersey is a smooth, inflated shell with a torn-looking neckline and none of that construction.
- At broadcast distance (`high/desktop/R05`, `high/desktop/R17`) the silhouettes hold. In close-ups the garments and faces are far simpler than the references, which is the 5 anchor plus some credit for the bodies.

### Animation & game feel: 5.0
- `strips/high/R03` (pitch): the pitcher starts straddling the rubber (frames 1–2), not on it. The leg lift reads in frames 3–5. In frames 4–6 the whole body rises and the support foot visibly leaves the rubber and mound, with the shadow detached: the body hops or levitates instead of balancing. Stride and release (frames 7–8) have real arm extension. `crops/high/R12-pitcher` shows a credible late-stride pose.
- `strips/high/R04` (swing): load, stride, rotation and finish are all present, with a contact bloom flash (frames 5–7). This is the best sequence in the build. Weakness: in `crops/high/R04-batter` the pitch arrives at shin height, behind the batter's front knee, while he is still fully loaded. The swing timing reads late.
- `strips/high/R07` (shortstop): frames 1–4 are a readable run cycle with counter-swinging arms. Frames 5–8 freeze in an identical fielding crouch, and the glove never moves to the ball. In frames 7–8 a huge white ball appears beside him with no depth cue: an oversized ball or a ball right at the lens.
- `strips/high/R10` (home-run trot): a believable run cycle with planted contacts and alternating arms. The helmet flaps stay rigid.
- `strips/high/R08` and `strips/high/R11` are full-frame wide shots where the players are about 10 px tall, so the outfield chase can't be judged. `crops/high/R08-CF` and `crops/high/R09-LF` show the identical run phase and pose, and the R09 "catch" is never shown.
- There is no dust anywhere and no camera follow beyond cuts. That puts it at the 5 anchor ("keyed cycles that read, with floaty feet").

### Environment: 5.0
- `high/desktop/R05`, `high/desktop/R06` and `high/desktop/R17`: the stand behind home is a photographic crowd texture at roughly 3–4× human scale. The spectators' heads are bigger than the batter's whole torso. It reads as a billboard, not people, and is a glaring scale bug in the game's main pitching view. `high/desktop/R14` has the same at the historic park.
- `high/desktop/R01` and `high/desktop/R10`: the stands are untextured grey boxes with sawtooth stair edges, and their seats are a striped crowd photo. Trees are cones and faceted blobs ("trees as cones" is the 5 anchor). A photo backdrop band meets the low-poly trees along a hard fog seam.
- Credits: mow checker on the infield and outfield (`high/desktop/R07`), grained dirt (`crops/high/R05-batter_feet`), modelled light towers, foul poles, scoreboard and distance markers. `high/desktop/R15` adds a wooden wall and the "Alligator Farm" building.
- There are no dugouts or signage boards to speak of, and the crowd is a flat photo. Against smb3-1 and smb4-3 (dense 3D crowds, signage, decks) this is a 5.

### Lighting & atmosphere: 5.5
- Contact and sun shadows now meet the feet: `crops/high/R05-batter_feet` and `crops/high/R02-pitcher` show grounded shadows. Credit for that.
- Fill is inadequate. `crops/high/R02-batter_head`, `crops/high/R04-batter` and `crops/high/R16-runner1` show dark skin under the helmet crushed to near-black with no bounce or sky light modelling the face (rubric 7: "sky light and bounce that model the faces").
- Speculars are faceted. The checkerboard highlights on helmets come from per-face normals or low tessellation (`crops/high/R02-batter_head`, `crops/high/R05-catcher`).
- Night (`high/desktop/R12`, `high/desktop/R13`): the field is lit as evenly as day, with sprite glows on the towers. There are no light pools, falloff or multiple soft shadows from the banks. smb4-1 shows what tower exposure should look like.
- Golden hour (`high/desktop/R14`, `high/desktop/R15`): a warm grade and some haze are present and pleasant. Overall it is a 5 with grounding and grade credit.

### UI & typography: 6.0
- `high/desktop/R02` and `high/desktop/R05`: a clean, consistent score bug with team crests, an inning arrow, base diamond and B/S/O pips. The pitcher and batter info line and the pitch-speed readout (`high/desktop/R06`, "FB 76 mph") are present. The buttons are clear and labelled with their keys.
- `high/desktop/R15`: the "HOME RUN · 396 FT" banner is plain outlined text pasted over the sky with no panel, hierarchy or motion. `high/desktop/R10` (the trot) has no result banner at all.
- In-world scoreboards use the same type as the HUD, which is good for consistency. Neither has any ootp26-1 data density or smb3-1 broadcast styling. A 6.

### Readability: 5.5
- Batting view `high/desktop/R02` reads well: zone, pitcher and fielders are all findable. In `high/desktop/R06` the ball is visible with a trail.
- In pitching view `high/desktop/R05`, the target reticle sits right on the catcher's chest and the giant crowd photo competes for attention.
- `high/desktop/R16`: the runner on first is cut off at the right frame edge (x≈1260), and the second-base runner is about 15 px. Base occupancy only reads from the HUD diamond.
- Wide cams `high/desktop/R07` and `high/desktop/R10`: fielders are about 10–15 px, and the ball in R10 is a 5 px dot against trees. In `high/desktop/R12` (night pitch "in flight") I cannot find the ball.

### Mobile: 5.5
- `high/mobile/R02`: the portrait batting framing is intentional and good: batter, zone, pitcher and large thumb buttons.
- `high/mobile/R05`: the pitcher is half cut off at the left edge, and the crowd photo fills the top. `high/mobile/R07` and `high/mobile/R10` have about 20 px figures with half the screen spent on dirt, grass and stands.
- `high/landscape/R02` and `high/landscape/R05`: the HUD and buttons take about 35% of the 390 px height, and the pitcher/batter info line is dropped. Figures are small.
- Perf: medium · mobile at 4× throttle has a 45 fps minimum (passes the 30 fps threshold).

## 3. Character defects list

1. **Faces crushed to black** for dark skin tones under helmets and caps: no eyes or brows visible. `crops/high/R02-batter_head`, `crops/high/R02-batter_hands`, `crops/high/R10-batter-trot`, `crops/high/R16-runner1`, `crops/high/R04-batter`.
2. **Faceted helmet shells** with checkerboard specular quads. `crops/high/R02-batter_head`, `crops/high/R05-catcher`, `crops/high/R10-batter-trot`.
3. **Ear flaps are flat rectangular slabs** hanging down past the jaw like hair panels. On R10 both sides show. `crops/high/R02-batter_head`, `crops/high/R10-batter-trot`, `crops/high/R05-ump`.
4. **Caps:** the crown is a tall faceted dome sitting high, and from the front the bill is wider than the head, so it reads as a bucket or bowler hat. `crops/high/R07-SS`, `crops/high/R09-LF`, `crops/high/R08-CF`, `crops/high/R02-pitcher`.
5. **Dark specks on the cap crown**, probably hair or scalp poking through the cap. `high/mobile/R05` (pitcher's cap, upper left).
6. **Jagged sawtooth necklines** with skin or brown triangles showing through the jersey collar. `crops/high/R17-pitcher_hands`, `crops/high/R07-SS`, `crops/high/R09-LF`, `crops/high/R12-pitcher`, `crops/high/R14-batter`, `crops/high/R05-ump_head`.
7. **Umpire shirt neckline cut so wide it exposes the shoulder skin.** `crops/high/R05-ump_head`.
8. **Mask cages float** in front of the face with no frame, chin cup, pads or straps. `crops/high/R05-batter-front`, `crops/high/R14-batter`, `crops/high/R05-ump_head`, `crops/high/R06-catcher_glove`.
9. **Back numbers render mirrored** ("27" and "2" read reversed). Low-tier v2 renders "2" correctly, so this is a v3 regression. `high/desktop/R06`, `high/mobile/R05`, `crops/high/R05-catcher`, `crops/high/R05-ump`; correct in `crops/low/R05-catcher`.
10. **No back number at all** on some players (pitcher). `crops/high/R17-pitcher-back`.
11. **Glove is a mitten or paddle** with no fingers, web, lacing or pocket, and is flat-shaded. `crops/high/R17-pitcher_hands`, `crops/high/R07-SS`, `crops/high/R06-catcher_glove`.
12. **Jersey has no construction:** no placket, buttons, collar, piping or folds, and the inflated shell has a smooth "balloon" look. The wordmark sits at belt level and is small. `crops/high/R02-batter`, `crops/high/R07-SS`, `crops/high/R12-pitcher` against `si_jersey_three_quarter`.
13. **Belt is a flat black band** with a polygonal, uneven lower edge. No loops or buckle. `crops/high/R17-pitcher_hands`.
14. **Undershirt sleeve covers the whole forearm to the wrist** in a flat trim colour, so arms read as yellow or blue tubes. A yellow undershirt blob pokes out at the batter's shoulder or neck. `crops/high/R02-batter`, `crops/high/R05-catcher`, `crops/high/R05-ump`.
15. **Shoes are clogs:** glossy, laceless, no tongue or cleats. `crops/high/R05-batter_feet`, `crops/high/R02-pitcher`.
16. **Socks are plain tubes** with no stirrup cut or sanitary contrast. `crops/high/R05-batter_feet`.
17. **Catcher's chest protector** is a flat faceted plate. **Shin guards** are lumpy flared blue petals with no knee or foot plates. `crops/high/R06-catcher_glove`, `crops/high/R05-catcher`.
18. **Pitcher's stance straddles the rubber** instead of a foot on it. `crops/high/R02-pitcher`, `crops/high/R03-pitcher`.
19. **Umpire's arm passes behind or through the batter's back** at the waist (interpenetration or awkward overlap). `crops/high/R05-ump`.
20. **No hair at the nape** below the cap: bald scalp shows. `crops/high/R17-pitcher-back`.
21. **Possible hover of the batter's front shoe:** a gap between the sole and its shadow. `crops/high/R05-batter_feet`.
22. **No visible stocky build:** body variety is effectively skin tone plus two similar builds. `high/desktop/R05`, `high/desktop/R17`, `crops/high/R02-batter`.
23. **No dirt, wear or material contrast:** flannel, mesh and helmet all have similar smooth shading except the helmet spec quads. All crops.

## 4. Ranked gaps

| # | Id | Cat | WS | Sev | Eff | Gain | Fix (testable) |
|---|---|---|---|---|---|---|---|
| 1 | G-face-fill | characters | WS3 | 5 | S | +0.5 (also lighting +0.5, charfit +0.5) | Add hemisphere/sky fill plus a camera-side rim, or raise skin ambient; clamp minimum skin albedo luminance. Test: in `crops/high/R02-batter_head` the eye whites and brows are visible and mean face luminance is at least 35/255. |
| 2 | G-helmet-cap-mesh | characters | WS1 | 4 | M | +0.5 | Smooth-shade and subdivide the helmet (≥ 32 segments), molded ear flap following the jaw, bill ≤ head width; cap crown lowered to the skull, bill only in front. Test: no facet edges or quad specular in `crops/high/R02-batter_head`; cap reads as a ball cap from the front in `crops/high/R07-SS`. |
| 3 | G-mirrored-numbers | characters | WS1 | 4 | S | +0.3 | Flip the back-decal U (or the decal plane winding) on v3; add numbers to every player. Test: "27" reads correctly in `high/desktop/R06` and the pitcher has a number in `crops/high/R17-pitcher-back`. |
| 4 | G-neckline-clip | characters | WS1 | 4 | S | +0.3 | Close the collar with a modelled neck band, shrink the body under the collar or mask the body faces under the garment. Test: no skin triangles at the collar in `crops/high/R17-pitcher_hands` or `crops/high/R09-LF`. |
| 5 | G-crowd-scale | environment | WS4 | 5 | M | +1.0 | Rescale the backstop crowd texture to life size (head ≈ 0.75 ft), or replace it with instanced 3D or impostor fans tiered on seat rows. Test: crowd heads in `high/desktop/R05` are smaller than the catcher's helmet. |
| 6 | G-glove-mask-gear | characters | WS1 | 4 | M | +0.5 | Model the glove with finger stalls, web and pocket (≥ 600 tris, leather normal map); attach a mask frame with chin cup and straps to the head bone; give the catcher a plated chest protector and knee-cap shin guards. Test: `crops/high/R17-pitcher_hands` and `crops/high/R06-catcher_glove` show web and fingers; the cage touches the face. |
| 7 | G-uniform-construction | charfit | WS1 | 4 | M | +0.5 (characters +0.3) | Add a placket with buttons, piping at collar and sleeves, a wrinkle normal map at elbows, armpits and waist, belt loops and buckle, cleats with laces and spikes, stirrup cut-outs. Test: the placket is visible in `crops/high/R07-SS`; cleat spikes are visible in `crops/high/R05-batter_feet`. |
| 8 | G-pitch-levitation | animation | WS2 | 4 | S | +0.5 | Apply foot grounding to the pivot foot during the leg lift (pin it to the rubber top); start the set with the pivot foot on the rubber. Test: in `strips/high/R03` frames 3–6 the support sole stays within 0.05 ft of the rubber top. |
| 9 | G-fielding-freeze | animation | WS2 | 4 | M | +0.5 | Blend the fielding crouch into a glove reach toward the ball, a transfer and a throw; show the catch in R09. Test: the glove moves between `strips/high/R07` frames 5–8; the R09 crop shows the glove at the ball. |
| 10 | G-night-light | lighting | WS3 | 3 | M | +0.5 | Use multiple soft tower shadows and an exposure falloff toward the outfield and stands, with light pools on the field and less ambient. Test: `high/desktop/R13` shows a visible luminance gradient from the infield to the corners and a multi-shadow under players. |
| 11 | G-wide-cam-scale | readability | WS5 | 4 | M | +0.5 (mobile +0.5) | Tighten wide cameras to follow the ball and fielder (players ≥ 40 px desktop, ≥ 30 px mobile); keep the 1B runner in frame in R16; add a ball shadow or halo. Test: player heights in `high/desktop/R07` and `high/mobile/R07`; runner fully visible in `high/desktop/R16`. |
| 12 | G-result-banners | ui | WS7 | 3 | S | +0.5 | Put a panelled result banner (hierarchy: result, distance, batter) on HR and hits, with entry motion; show it during the R10 trot. Test: a banner panel is visible in `high/desktop/R10` and `high/desktop/R15`. |
| 13 | G-stands-trees | environment | WS4 | 3 | L | +0.5 | Give the stands seat rows, railings and roofs, add dugouts and signage on walls, and use card or impostor trees in place of cones. Test: dugouts and signage are visible in `high/desktop/R01` and `high/desktop/R07`. |
| 14 | G-mobile-landscape | mobile | WS7 | 3 | S | +0.3 | Compact the landscape HUD (single-row score bug ≤ 48 px; overlay the buttons on the 3D view) and restore the info line; keep the pitcher fully in frame in portrait R05. Test: the 3D view is ≥ 75% of height in `high/landscape/R05`; the pitcher is not clipped in `high/mobile/R05`. |

## 5. JSON

```json
{
  "loop": 1,
  "role": "critic-claude",
  "tier": "high",
  "verdict": "continue",
  "scores": {
    "characters": {
      "score": 5.0,
      "confidence": 0.8,
      "evidence": [
        {"shot": "crops/high/R02-batter_head", "note": "faceted helmet with checkerboard specular, slab ear flap, face crushed to black"},
        {"shot": "crops/high/R17-pitcher_hands", "note": "good fingers, but mitten glove, sawtooth neckline, no placket or folds"},
        {"shot": "crops/high/R05-batter-front", "note": "mask cages float in front of faces; light-skin umpire face has real features"},
        {"shot": "crops/high/R06-catcher_glove", "note": "flat chest plate, lumpy petal shin guards, blob mitt"},
        {"shot": "crops/high/R05-batter_feet", "note": "clog-like shoes, plain tube socks"}
      ]
    },
    "charfit": {
      "score": 5.5,
      "confidence": 0.75,
      "evidence": [
        {"shot": "crops/high/R17-pitcher-back", "note": "proportions match mpfb2_athlete_side"},
        {"shot": "crops/high/R02-batter_head", "note": "face unreadable versus mpfb2_athlete_face_34"},
        {"shot": "crops/high/R07-SS", "note": "jersey far simpler than si_jersey_three_quarter: no collar, placket or wrinkles"},
        {"shot": "crops/high/R17-pitcher_hands", "note": "hand is the same kind as mpfb2_athlete_hand"}
      ]
    },
    "animation": {
      "score": 5.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "strips/high/R03", "note": "leg lift and stride present, but the pitcher rises off the rubber in frames 4-6; set straddles the rubber"},
        {"shot": "strips/high/R04", "note": "load, stride, rotation and contact flash: best sequence"},
        {"shot": "strips/high/R07", "note": "run cycle reads; fielding crouch frozen in frames 5-8"},
        {"shot": "strips/high/R10", "note": "credible trot cycle"},
        {"shot": "strips/high/R08", "note": "full-frame wide; players about 10 px, chase not judgeable"}
      ]
    },
    "environment": {
      "score": 5.0,
      "confidence": 0.8,
      "evidence": [
        {"shot": "high/desktop/R05", "note": "photo crowd behind home at 3-4x human scale"},
        {"shot": "high/desktop/R01", "note": "grey box stands, cone and blob trees"},
        {"shot": "high/desktop/R07", "note": "good mow checker and dirt; built light towers and foul poles"},
        {"shot": "high/desktop/R15", "note": "historic wall and building add character"}
      ]
    },
    "lighting": {
      "score": 5.5,
      "confidence": 0.75,
      "evidence": [
        {"shot": "crops/high/R05-batter_feet", "note": "shadows meet the feet"},
        {"shot": "crops/high/R02-batter_head", "note": "no fill on dark faces; faceted spec"},
        {"shot": "high/desktop/R13", "note": "night evenly lit like day, no tower pools"},
        {"shot": "high/desktop/R14", "note": "warm golden grade works"}
      ]
    },
    "ui": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R02", "note": "clean, consistent score bug, count and buttons"},
        {"shot": "high/desktop/R06", "note": "pitch-speed feedback"},
        {"shot": "high/desktop/R15", "note": "HR banner is plain text with no panel or hierarchy"},
        {"shot": "high/desktop/R10", "note": "no result banner during the trot"}
      ]
    },
    "readability": {
      "score": 5.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R02", "note": "batting view reads well"},
        {"shot": "high/desktop/R16", "note": "1B runner cut off at the frame edge"},
        {"shot": "high/desktop/R07", "note": "fielders about 10-15 px"},
        {"shot": "high/desktop/R12", "note": "ball in flight not findable"}
      ]
    },
    "mobile": {
      "score": 5.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/mobile/R02", "note": "intentional portrait batting framing, big buttons"},
        {"shot": "high/mobile/R05", "note": "pitcher half cut off, crowd photo dominates"},
        {"shot": "high/mobile/R07", "note": "tiny figures"},
        {"shot": "high/landscape/R05", "note": "HUD takes about 35% of the height, info line dropped"}
      ]
    }
  },
  "gaps": [
    {"id": "G-face-fill", "category": "characters", "expectedGain": 0.5, "severity": 5, "effort": "S", "workstream": "WS3", "evidence": ["crops/high/R02-batter_head", "crops/high/R10-batter-trot", "crops/high/R16-runner1"], "benchmark": "smb4-4", "fix": "Add sky/hemisphere fill and a camera rim, or a skin ambient floor, so dark faces under helmets show eyes and brows; target mean face luminance of at least 35/255 in the R02 head crop."},
    {"id": "G-crowd-scale", "category": "environment", "expectedGain": 1.0, "severity": 5, "effort": "M", "workstream": "WS4", "evidence": ["high/desktop/R05", "high/desktop/R17", "high/desktop/R14"], "benchmark": "smb3-1", "fix": "Rescale the backstop crowd photo to life size (head about 0.75 ft), or replace it with tiered instanced or impostor fans; crowd heads must be smaller than the catcher's helmet in R05."},
    {"id": "G-helmet-cap-mesh", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R02-batter_head", "crops/high/R07-SS", "crops/high/R10-batter-trot"], "benchmark": "smb4-2", "fix": "Smooth-shaded, higher-segment helmet with a molded jaw-following ear flap; cap crown lowered onto the skull and the bill only at the front, no wider than the head."},
    {"id": "G-mirrored-numbers", "category": "characters", "expectedGain": 0.3, "severity": 4, "effort": "S", "workstream": "WS1", "evidence": ["high/desktop/R06", "high/mobile/R05", "crops/high/R17-pitcher-back"], "benchmark": "smb4-4", "fix": "Flip the v3 back-number decal U and add numbers for all players; '27' must read correctly in R06."},
    {"id": "G-neckline-clip", "category": "characters", "expectedGain": 0.3, "severity": 4, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R09-LF", "crops/high/R05-ump_head"], "fix": "Model a collar band and delete or shrink the body faces under the garment; no skin triangles at the neckline in close-ups."},
    {"id": "G-glove-mask-gear", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R06-catcher_glove", "crops/high/R05-batter-front"], "benchmark": "smb3-3", "fix": "Glove with finger stalls, web, pocket and a leather normal map; mask frame with chin cup and straps parented to the head; plated chest protector and knee-capped shin guards."},
    {"id": "G-uniform-construction", "category": "charfit", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R07-SS", "crops/high/R05-batter_feet", "crops/high/R12-pitcher"], "benchmark": "si_jersey_three_quarter", "fix": "Placket and buttons, collar and sleeve piping, a wrinkle normal map, belt loops and buckle, laced cleats with spikes, stirrup cut-outs."},
    {"id": "G-pitch-levitation", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS2", "evidence": ["strips/high/R03", "crops/high/R03-pitcher"], "benchmark": "smb4-2", "fix": "Pin the pivot foot to the rubber top through the leg lift with foot IK and start the set with the foot on the rubber; sole within 0.05 ft of the rubber in R03 frames 3-6."},
    {"id": "G-fielding-freeze", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["strips/high/R07", "crops/high/R09-LF"], "fix": "Blend the crouch into a glove reach to the ball, transfer and throw; show the glove at the ball in the R09 catch."},
    {"id": "G-night-light", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["high/desktop/R13", "high/desktop/R12"], "benchmark": "smb4-1", "fix": "Lower night ambient, add tower light pools with falloff to the corners and multiple soft player shadows."},
    {"id": "G-wide-cam-scale", "category": "readability", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS5", "evidence": ["high/desktop/R07", "high/desktop/R16", "high/mobile/R07"], "benchmark": "smb3-1", "fix": "Tighter ball- and fielder-following cameras (players at least 40 px desktop and 30 px mobile), keep the R16 1B runner in frame, add a ball halo or shadow."},
    {"id": "G-result-banners", "category": "ui", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R15", "high/desktop/R10"], "benchmark": "smb3-1", "fix": "Panelled result banner with hierarchy and entry motion, shown through the HR trot."},
    {"id": "G-stands-trees", "category": "environment", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS4", "evidence": ["high/desktop/R01", "high/desktop/R10"], "benchmark": "smb4-3", "fix": "Stands with seat rows, railings and roofs; dugouts; wall signage; card or impostor trees in place of cones."},
    {"id": "G-mobile-landscape", "category": "mobile", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/landscape/R05", "high/mobile/R05"], "fix": "Compact the landscape HUD so the 3D view is at least 75% of the height and restore the info line; keep the pitcher fully in frame in portrait R05."}
  ],
  "calibration": {
    "anchors_used": ["characters 5 (clean low-poly, color-block uniforms)", "animation 5 (cycles read, floaty feet)", "environment 5 (trees as cones)"],
    "regressions_medium_low": "Medium crops match high (LOD1 has the same defects). Low tier keeps the v2 cartoon players by design; v2 back numbers read correctly, so the v3 mirrored number is a v3-only regression.",
    "perf_observed": "medium mobile at 4x throttle has a 45 fps minimum; all tiers well above 30 fps"
  }
}
```
