# Critic A (critic-claude): loop 2 review, high tier

All capture paths are relative to `screenshots/review-loop-2/`. Benchmarks are in `benchmarks/`. References are in `art-src/samples/reference-renders/`.

## Verdict

**Continue.** The game reads as a baseball game at broadcast distance. It has a clean diamond, a broadcast-style score bar and figures with separate fingers. As soon as the camera gets close, the characters fall apart. The batter's face is a solid black void under the helmet (`crops/high/R02-batter_head`). Jagged shards stick out of his shoulder. Jersey necklines are a sawtooth of polygons. Masks hover in front of faces with no straps. Gloves are flat brown slabs. Pectoral nipple bumps show through every jersey. Team wordmarks sit at the belly and are cut off by the glove. In motion, the new mocap pitch leg lift reads. Every running player, though, holds both open palms up at the chest with frozen arms (the "jazz hands" pose). The shortstop holds a static crouch while the ball rolls past his glove (`strips/high/R07`). The close-up ball is still head-sized at contact (`crops/high/R04-batter`). The environment is a painted backdrop, low-poly cone trees, photo-crowd tiles with visible seams and bare grey backstop walls. No category reaches its gate, and the character categories are the furthest away.

## Scores (high tier, desktop)

### Characters: 4.5
- `crops/high/R02-batter_head`: The face is entirely black under the helmet, with no eyes, nose or mouth. A flat dark quad hangs from the helmet rim past the jaw. A spiked shard rises from the right shoulder. The collar trim is a sawtooth band of yellow faces. The rubric's 7 asks for "a face with real features that holds up in close-ups", and this capture shows the opposite.
- `crops/high/R17-pitcher_hands`: The jersey is one smooth color block. It has no placket, buttons or folds. Nipple bumps show through the cloth. The maroon zigzag neckline looks torn. The "…KE HAMIL…" wordmark sits at navel height and the glove covers half of it. The glove is a featureless leather wedge with no finger stalls, web or lacing. The throwing hand has decent separate fingers.
- `crops/high/R05-batter-front` and `crops/high/R14-batter`: The umpire's mask floats several inches ahead of his face with no harness. The catcher's mask does the same. The umpire's cap carries a white decal blot. The umpire's shoulders are lumpy humps.
- `crops/high/R05-ump_head`: The umpire's shirt neckline is a jagged hole that exposes a large patch of shoulder and back skin. The mask bars are segmented tubes with visible skin-colored gaps between segments.
- `crops/high/R06-catcher_glove`: The chest protector is a blue blob fused with the shoulders. The shin guards are open "scoop" shells that stop at the knee. The catcher's mitt is a rounded brown lump.
- On the positive side: there are separate fingers, a glossy helmet next to matte cloth, and at least 2–3 builds (the stocky pitcher in `crops/high/R12-pitcher` against the slimmer 1B in `crops/high/R16-1B`). This sits below the 5 anchor ("clean low-poly figure… faces simple but not uncanny") because the figures are not clean: there are shards, holes, floating gear and faceless heads. Benchmarks smb4-2 and smb4-4 have stitched kits, readable faces and modelled gloves, and this is far off them.

### Fidelity to reference (charfit): 4.5
- Compared against `mpfb2_athlete_front`, `mpfb2_athlete_side` and `hbm_male_realistic_three_quarter`. The reference has a lean, long-limbed athlete with a defined deltoid, chest and knee. The in-game players have an inflated torso and shoulders, puffy balloon pant legs and no visible knee or calf structure (`crops/high/R12-pitcher`, `crops/high/R07-SS`, `crops/high/R08-CF`). The head looks small against the bulked shoulders.
- Faces: the reference (`mpfb2_athlete_face_34`, `hbm_male_realistic_face_34`) has sculpted brows, eyelids, nose and lips. In game the face is either blacked out (`crops/high/R02-batter_head`) or a soft blur with shadowed eye sockets (`crops/high/R09-LF`, `crops/high/R16-1B`). Several heads look bald under the cap: bare scalp shows at the back of the head (`crops/high/R17-pitcher-back`, `high/desktop/R14` pitcher).
- Hands: the reference hand (`hbm_male_realistic_hand`) has knuckles, nails and tendons. In game the fingers are separate tubes, which is acceptable at 1×, but they never close around the bat convincingly (`crops/high/R02-batter_hands`).
- The fidelity table's silhouette IoU of 0.84–0.85 against the turnaround agrees with "proportions roughly right" (the 5 anchor). Faces, garments and gear are much simpler than the reference and carry defects the reference does not have. Those defects pull the score below 5.

### Animation & game feel: 4.5
- `strips/high/R03`: The mocap pitch has a believable set, a knee lift (frames 5–6) and a kick (frames 7–8). In frame 8 the lead leg is kicked out straight and high, more a high kick than a tuck. The strip ends before stride, release and follow-through, so weight transfer can't be confirmed.
- `strips/high/R04`: In frames 3–4 the ball is already at the plate and the batter is still in a static stance. There is no visible load or stride. Contact (frame 5) comes as a large bloom flash. Through frames 6–7 the bat points almost straight down, a chopping path rather than a level one. The finish in frame 8 is fine. `crops/high/R04-batter` freezes the ball at the batter's knee at roughly 80% of helmet size, so the "ball sized for close camera" fix does not show in this capture.
- `strips/high/R07`: The shortstop's run in frames 1–4 has legs cycling but both forearms held up with open palms. In frames 5–8 he holds one crouch for four frames while the ball rolls past the glove to his left (frame 7) and then sits beside his right foot (frame 8). There is no glove reach.
- `strips/high/R10`: In the home-run trot the legs cycle and the feet land in the ring, but the arms are frozen in the same open-palm pose in all 8 frames. `crops/high/R09-LF` (the "fly ball caught" moment) shows the left fielder mid-run with the glove flat at the waist. It is not a catch.
- The pitch-flight trail (`high/desktop/R06`) and the contact flash are present. The rubric's 7 asks for "throws and catches with clear beats" and planted, natural running. Neither is met.

### Environment: 5.5
- `high/desktop/R05` and `high/desktop/R17`: Behind the plate, a bare flat-grey backstop wall fills roughly a third of the frame, with no padding, netting, signage or texture. The photo-crowd tiles show hard vertical seams (around x≈705 in R05/R06 and the pillar gaps in R17). At this framing the fans' heads are as large as the batter's.
- `high/desktop/R01` and `high/desktop/R07`: The stands are grey extruded boxes with flat side walls. The trees are low-poly cones and blobs placed in front of a painted photo backdrop, and the mismatch is obvious. The dugout in `crops/high/R14-batter` is a black rectangle.
- What works: mow-checker turf, grained dirt, chalk and baseline dust, foul poles, light towers built as objects, a scoreboard and distance markers. The historic park (`high/desktop/R15`) has a wooden fence, the "Alligator Farm" stand and warm foliage, and is the best set. Benchmarks smb3-1 and smb4-3 have dense modelled crowds, layered stadium architecture and signage, and this is well short of them. It sits slightly above the 5 anchor.

### Lighting & atmosphere: 5.5
- `crops/high/R02-batter_head` and `crops/high/R04-batter`: The helmet and brim shadow crush the batter's face to pure black. The 30% fill and 9% skin self-light do not rescue dark skin tones. smb3-3 and smb4-1 model faces under brims.
- `high/desktop/R13` and `high/desktop/R12`: At night the field is lit evenly edge to edge, with no tower pools or falloff. The towers are glow sprites. It reads as day lighting under a black sky.
- `high/desktop/R14` and `crops/high/R14-batter`: The golden-hour grade is warm and pleasant, and contact shadows under the players are present and soft (`crops/high/R16-1B`). There is no haze or depth layering beyond the painted backdrop, and no specular on cloth or ball beyond the helmet highlight. This is a solid 5 with some grounding, so 5.5.

### UI & typography: 6.0
- `high/desktop/R02` and `high/desktop/R16`: The broadcast-style score bar is clean, with count dots, a base diamond, pitcher and batter lines and the pitch speed (`high/desktop/R07`, "FB 77 mph"). Type is consistent. Buttons are clear, with key hints. It is close to ootp26-1 in density.
- `high/desktop/R01`: On the title screen, the translucent menu panel sits over a busy field. The selected "Season" button is a dark red fill with low-contrast text and is the hardest item to read.
- `high/desktop/R05`, `high/desktop/R06` and `high/desktop/R17`: The aim box and reticle sit over the catcher for the whole pitch and hide the catcher and the target.
- `high/desktop/R15`: The "HOME RUN · 396 FT" banner is bold but plain, with no motion and no secondary hierarchy (distance, exit velocity, runs). The in-park scoreboard duplicates the HUD.

### Readability: 5.5
- `high/desktop/R02` and `high/desktop/R12`: The batting view reads well: zone grid, pitcher, fielders.
- `high/desktop/R16`: The runner on first sits at the extreme right edge, half cropped. In a "runners on" moment, the runner barely reads.
- `high/desktop/R10` (labelled "Home run trot"): No runner is in frame at all, only fielders and the ball.
- `high/desktop/R07` and `strips/high/R08`: From the high aerial camera, players are about 10–15 px tall. The ball is a speck in R08. Fielder rings help.
- `high/desktop/R06`: The reticle box covers the catcher.

### Mobile: 5.5
- `high/mobile/R02`: The batter is large, and the controls are big and thumb-friendly. About 40% of the 3D area is empty sky, and the framing is not tuned for portrait.
- `high/mobile/R07` and `high/mobile/R10`: The aerial views on a 390 px width make the fielders about 10–20 px tall. In R10 the runner is not in frame.
- `high/landscape/R05` and `high/landscape/R07`: In landscape the HUD bars take about 35% of the 390 px height. The hint pill covers the pitcher's legs in R05.
- Perf table: the phone proxy holds 47 fps (medium) and 79 fps (low) at 4× throttle, which passes the 30 fps bar. Framing and figure size hold the score down.

### Medium and low tiers (regression check)
- `crops/low/R02-batter` and `strips/low/R04`: The low tier renders a completely different cartoon model with large googly eyes and a different (v2) swing with a level bat path. The art style differs between tiers. It is not a regression from loop 1 as far as I can tell, but a player on low sees a different game.

## Character defects list

1. The face renders solid black under the helmet, with no features visible. Seen in `crops/high/R02-batter_head`, `crops/high/R02-batter_hands` and `crops/high/R04-batter`.
2. A flat dark rectangular quad hangs from the helmet rim beside the jaw (earflap or strap rendered as a plane). Seen in `crops/high/R02-batter_head`.
3. Helmet straps or flaps hang as two dark strands from the helmet to the shoulders and read as braids. Seen in `crops/high/R05-ump` (batter), `crops/high/R10-batter-trot` and `crops/high/R05-batter-front`.
4. A spiked shard of geometry rises from the batter's right shoulder or collar. Seen in `crops/high/R02-batter_head` and `crops/high/R02-batter_hands`.
5. The collar and neckline trim is a sawtooth or zigzag of polygons on every jersey. Seen in `crops/high/R17-pitcher_hands`, `crops/high/R16-runner1`, `crops/high/R16-1B`, `crops/high/R12-pitcher` and `crops/high/R10-batter-trot`.
6. Nipple and pectoral bumps from the base body show through the jersey. Seen in `crops/high/R17-pitcher_hands`, `crops/high/R09-LF` and `crops/high/R08-CF`.
7. There is no placket, buttons, piping or cloth folds on the jersey, and no folds on the pants. Seen in `crops/high/R17-pitcher_hands` and `crops/high/R02-batter`.
8. The wordmark sits at navel or belt height instead of across the chest, is too small, and is cut off by the glove or forearm ("KE HAMIL", "LAKESID", "HOT SPRINGS" partly hidden). Seen in `crops/high/R17-pitcher_hands`, `crops/high/R07-SS`, `crops/high/R09-LF`, `crops/high/R08-CF` and `crops/high/R16-runner1`.
9. The fielder's glove is a flat brown slab or wedge, with a few dot "holes" on some. It has no fingers, web, pocket or lacing. Seen in `crops/high/R17-pitcher_hands`, `crops/high/R12-pitcher`, `crops/high/R07-SS` and `crops/high/R08-CF`.
10. The catcher's mitt is a rounded lump with no pocket or rim. Seen in `crops/high/R06-catcher_glove`.
11. The umpire's and catcher's masks float in front of the face, unattached, with no harness or straps. Seen in `crops/high/R05-batter-front`, `crops/high/R14-batter` and `crops/high/R06-catcher_glove`.
12. The mask bars are segmented tubes with visible skin-colored gaps at the joints. Seen in `crops/high/R05-ump_head` and `crops/high/R06-catcher_glove`.
13. The umpire's shirt neckline is torn open: a jagged hole exposes the shoulder and upper back skin. Seen in `crops/high/R05-ump_head`.
14. The umpire's cap has a white blot decal, and the umpire's shoulders are lumpy humps. Seen in `crops/high/R05-batter-front` and `crops/high/R14-batter`.
15. The catcher's chest protector is fused into the shoulders as one blue blob with a jagged blue and white boundary. The shin guards are open scoops ending at the knee. Seen in `crops/high/R06-catcher_glove` and `crops/high/R05-catcher`.
16. Scalp skin shows under and behind the cap and there is no hair, so heads read as bald. Seen in `crops/high/R17-pitcher-back` and `high/desktop/R14` (pitcher).
17. The cap brim reads as a separate flat band sitting low over the eyes, with a seam to the dome. Seen in `crops/high/R09-LF`.
18. Pant hems are faceted, low-poly cut edges at the sock line. Seen in `crops/high/R05-batter_feet` and `crops/high/R02-pitcher`.
19. A flap or tongue shard sticks out at the cleat ankle. Seen in `crops/high/R05-batter_feet`.
20. The body is overly bulked: a balloon torso and pant legs with no knee or calf definition, and a small head against the shoulders. Seen in `crops/high/R12-pitcher`, `crops/high/R07-SS` and `crops/high/R03-pitcher`.
21. The fingers do not wrap the bat. The hands sit in front of the handle with curled fingers, not a closed grip. Seen in `crops/high/R02-batter_hands`.
22. A thin shirt-tail or strip hangs from the batter's right hip. Seen in `crops/high/R14-batter`.
23. The `crops/high/R05-ump` close-up is framed on the batter and catcher, not the umpire. This is a camera targeting bug in the crop rig.

## Ranked gaps

1. **G-face-blackout** (characters, lighting; WS3). The batter's face is black under the helmet. Fix: add a per-actor face fill. Options are a small camera-facing point light or hemispheric term, capped at the helmet, or raising the skin self-light term for dark albedos to a luminance floor, plus a specular fill on the eyes. Test: in `crops/high/R02-batter_head` the face's mean sRGB luminance is at least 40/255 and the eyes, nose and mouth are distinguishable. Gain +0.5 characters, +0.5 lighting. Severity 5, effort S.
2. **G-jersey-construction** (characters; WS1). The neckline is a sawtooth, there is no placket, and nipple bumps show through. Fix: build the jersey as a separate offset shell that hides the chest detail, with a smoothed neckline loop and trim as a modelled band. Add a placket strip with buttons and a fold normal map. Move the wordmark UV to chest height and lay it out to clear the glove. Test: no jagged trim and no visible nipples in `crops/high/R17-pitcher_hands`, and a complete wordmark with buttons visible. Gain +1.0 characters, +0.5 charfit. Severity 5, effort M.
3. **G-gear-attach** (characters; WS1). Masks float, bars have gaps, the umpire's shirt has a hole, and the batter has a shoulder shard. Fix: parent the masks to the head bone with modelled straps and a harness, weld the bar segments, close the umpire's neckline, and remove or fix the helmet earflap quad and the shoulder shard (skin weights or stray vertices). Test: `crops/high/R05-ump_head`, `crops/high/R05-batter-front` and `crops/high/R02-batter_head` show no gaps, holes or shards. Gain +0.5 characters. Severity 4, effort M.
4. **G-run-arms** (animation; WS2). The arms are frozen with open palms in every run. Fix: let the mocap 09_01 arm tracks drive the arms (no upper-body override during run and trot), and close the hands to a loose fist. Keep the glove hand's carry pose as an additive layer only. Test: across `strips/high/R10` the hands alternate front and back by at least 25 cm, and the fingers are curled. Gain +0.5 animation. Severity 4, effort S.
5. **G-glove-model** (characters, charfit; WS1). Gloves are slabs. Fix: model a glove with four finger stalls, thumb, web and pocket, plus a leather normal map with lacing, and a padded catcher's mitt with a rim. Test: finger stalls and web visible in `crops/high/R17-pitcher_hands` and `crops/high/R06-catcher_glove`. Gain +0.5 characters. Severity 3, effort M.
6. **G-fielding-reach** (animation; WS2). The shortstop holds a static crouch while the ball goes past, and the left fielder's "catch" is a run. Fix: add glove-hand IK to the predicted ball position over the last 0.3 s, a ground-ball scoop clip and a catch-overhead clip, triggered by contact time. Test: in `strips/high/R07` frames 5–8 the glove moves to and closes on the ball. `crops/high/R09-LF` shows the glove above the head at the catch. Gain +0.5 animation. Severity 4, effort M.
7. **G-swing-timing** (animation, readability; WS2/WS5). The batter is static while the ball is at the plate, the bat path chops downward, and the close-up ball is oversized. Fix: start bat_swing earlier so the load and stride are visible before the ball reaches the front of the plate, level the bat plane at contact (retarget correction on the hands), and clamp the ball's on-screen size to its true 2.9 in diameter in close-up cameras. Test: in `strips/high/R04` the stride appears by frame 3 and the bat is roughly horizontal in frames 5–6. In `crops/high/R04-batter` the ball is at most 33% of the helmet's width. Gain +0.5 animation. Severity 3, effort M.
8. **G-backstop-crowd** (environment; WS4). The backstop is a bare grey wall and the crowd tiles have seams. Fix: add a padded backstop with netting and posts, sponsor boards and a press box. Randomise the crowd tile offsets and mirror per section to hide seams, and add depth (row risers). Test: no hard vertical seam in `high/desktop/R05`, and the backstop shows at least 3 distinct materials. Gain +0.5 environment. Severity 3, effort M.
9. **G-night-pools** (lighting; WS3). Night lighting is uniform. Fix: add 4–6 shadowless spot or area lights from the towers with falloff, darken the outfield edges by 30–40%, and add a light haze cone at the towers. Test: in `high/desktop/R13` infield luminance is at least 1.5× the warning-track corners. Gain +0.5 lighting. Severity 3, effort M.
10. **G-framing-runners** (readability, mobile; WS5). Runners are out of frame in R10 and R16. Fix: the home-run trot camera follows the batter-runner, and the batting camera widens or pans to keep the lead runner at least 5% inside the frame edge. Use a portrait batting camera that is lower and tighter to cut the sky. Test: the runner is fully visible in `high/desktop/R10`, `high/desktop/R16` and `high/mobile/R10`, and sky is at most 25% of the 3D area in `high/mobile/R02`. Gain +0.5 readability, +0.5 mobile. Severity 3, effort S.
11. **G-reticle-occlusion** (ui, readability; WS7). Fix: fade the aim box to an outline-only corner marker while the pitch is in flight, keeping the catcher visible. Raise contrast on the title menu's selected state (light fill, dark text) and make the panel opaque. Test: the catcher is unobstructed in `high/desktop/R06`, and the "Season" label meets at least 4.5:1 contrast in `high/desktop/R01`. Gain +0.5 ui. Severity 2, effort S.
12. **G-body-proportions** (charfit; WS1). The torso is ballooned and the legs are puffy. Fix: trim the stocky build's shoulder and torso girth toward the MPFB2 athlete, add knee and calf definition under tapered pant legs, and add hair meshes under caps. Test: front IoU against `mpfb2_athlete_front_mask` is at least 0.90, and no bald scalp shows in `crops/high/R17-pitcher-back`. Gain +0.5 charfit. Severity 3, effort M.

```json
{
  "loop": 2,
  "role": "critic-claude",
  "tier": "high",
  "verdict": "continue",
  "scores": {
    "characters": {
      "score": 4.5,
      "confidence": 0.8,
      "evidence": [
        {"shot": "crops/high/R02-batter_head", "note": "face solid black under helmet; shoulder shard; sawtooth collar; hanging quad at jaw"},
        {"shot": "crops/high/R17-pitcher_hands", "note": "no placket or folds, nipple bumps, wordmark at navel clipped by slab glove"},
        {"shot": "crops/high/R05-ump_head", "note": "torn neckline exposing skin; segmented mask bars with gaps"},
        {"shot": "crops/high/R05-batter-front", "note": "umpire and catcher masks float unattached in front of faces"},
        {"shot": "crops/high/R06-catcher_glove", "note": "chest protector blob, scoop shin guards, lump mitt"}
      ]
    },
    "charfit": {
      "score": 4.5,
      "confidence": 0.75,
      "evidence": [
        {"shot": "crops/high/R12-pitcher", "note": "ballooned torso and pants versus lean mpfb2_athlete_front; small head"},
        {"shot": "crops/high/R09-LF", "note": "soft, simplified face versus mpfb2_athlete_face_34; nipple bumps"},
        {"shot": "crops/high/R02-batter_hands", "note": "tube fingers that do not wrap the bat versus hbm_male_realistic_hand"},
        {"shot": "crops/high/R17-pitcher-back", "note": "bald scalp under cap; silhouette roughly right (IoU 0.84)"}
      ]
    },
    "animation": {
      "score": 4.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "strips/high/R03", "note": "mocap set and leg lift read; strip ends before release"},
        {"shot": "strips/high/R04", "note": "no visible load or stride while the ball arrives; chopping bat path; contact flash present"},
        {"shot": "strips/high/R07", "note": "SS frozen in one crouch for four frames while the ball rolls past the glove; run arms frozen"},
        {"shot": "strips/high/R10", "note": "trot legs cycle, arms locked with open palms in all 8 frames"},
        {"shot": "crops/high/R04-batter", "note": "ball still about 80% of helmet size at contact"}
      ]
    },
    "environment": {
      "score": 5.5,
      "confidence": 0.75,
      "evidence": [
        {"shot": "high/desktop/R05", "note": "bare grey backstop wall; visible crowd tile seam; oversized fans"},
        {"shot": "high/desktop/R17", "note": "plain backstop, crowd tile gaps"},
        {"shot": "high/desktop/R01", "note": "stands are grey extruded boxes; cone trees in front of a painted backdrop"},
        {"shot": "high/desktop/R15", "note": "historic park dressing is the best set: wooden fence, Alligator Farm stand"}
      ]
    },
    "lighting": {
      "score": 5.5,
      "confidence": 0.75,
      "evidence": [
        {"shot": "crops/high/R02-batter_head", "note": "face crushed to black under helmet"},
        {"shot": "high/desktop/R13", "note": "night field lit uniformly, no tower pools; glow sprites"},
        {"shot": "high/desktop/R14", "note": "pleasant golden grade, soft contact shadows"}
      ]
    },
    "ui": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R02", "note": "clean broadcast score bar, count, base diamond, big buttons"},
        {"shot": "high/desktop/R01", "note": "translucent menu over a busy field; low-contrast selected Season button"},
        {"shot": "high/desktop/R06", "note": "aim box sits over the catcher during the pitch"},
        {"shot": "high/desktop/R15", "note": "plain static HOME RUN banner"}
      ]
    },
    "readability": {
      "score": 5.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R16", "note": "runner on first half off the right edge"},
        {"shot": "high/desktop/R10", "note": "home-run trot moment has no runner in frame"},
        {"shot": "high/desktop/R02", "note": "batting view: zone, pitcher and fielders read well"},
        {"shot": "strips/high/R08", "note": "aerial camera: players about 10 px tall, ball a speck"}
      ]
    },
    "mobile": {
      "score": 5.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/mobile/R02", "note": "large batter and thumb-friendly buttons, but about 40% of the 3D area is sky"},
        {"shot": "high/mobile/R10", "note": "tiny fielders, runner not in frame"},
        {"shot": "high/landscape/R05", "note": "HUD takes about 35% of height; hint pill covers pitcher"},
        {"shot": "high/landscape/R07", "note": "aerial framing workable, figures tiny"}
      ]
    }
  },
  "gaps": [
    {"id": "G-face-blackout", "category": "characters", "expectedGain": 0.5, "severity": 5, "effort": "S", "workstream": "WS3", "evidence": ["crops/high/R02-batter_head", "crops/high/R04-batter"], "benchmark": "smb3-3", "fix": "Per-actor face fill (camera-facing point or hemi term limited by the helmet) or a luminance floor on the skin self-light for dark albedos, plus an eye specular. Test: mean face luminance at least 40/255 with eyes, nose and mouth distinguishable in crops/high/R02-batter_head."},
    {"id": "G-jersey-construction", "category": "characters", "expectedGain": 1.0, "severity": 5, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R16-runner1", "crops/high/R09-LF"], "benchmark": "smb4-4", "fix": "Separate offset jersey shell hiding chest detail; smooth neckline with modelled trim band; placket strip with buttons; fold normal map; wordmark UV moved to chest height clear of the glove. Test: no sawtooth trim or nipples and a complete wordmark in crops/high/R17-pitcher_hands."},
    {"id": "G-gear-attach", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R05-ump_head", "crops/high/R05-batter-front", "crops/high/R02-batter_head"], "fix": "Parent masks to the head bone with modelled straps; weld the bar segments; close the umpire's neckline hole; remove the helmet earflap quad and the shoulder shard (fix stray weights or vertices). Test: no gaps, holes or shards in the three cited crops."},
    {"id": "G-run-arms", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS2", "evidence": ["strips/high/R10", "strips/high/R07", "crops/high/R08-CF"], "fix": "Let the mocap run arm tracks drive the arms during run and trot (no upper-body override), close the hands to a loose fist, carry the glove as an additive layer. Test: hands alternate front and back by at least 25 cm across strips/high/R10, fingers curled."},
    {"id": "G-fielding-reach", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["strips/high/R07", "crops/high/R09-LF"], "fix": "Glove-hand IK toward the predicted ball over the last 0.3 s, plus ground-ball scoop and overhead catch clips timed to arrival. Test: glove meets and closes on the ball in strips/high/R07 frames 5-8; glove above the head in crops/high/R09-LF."},
    {"id": "G-glove-model", "category": "characters", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R06-catcher_glove"], "benchmark": "smb3-3", "fix": "Model a glove with finger stalls, thumb, web and pocket, plus a leather normal map with lacing; a padded catcher's mitt with a rim. Test: stalls and web visible in the cited crops."},
    {"id": "G-swing-timing", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["strips/high/R04", "crops/high/R04-batter"], "fix": "Start bat_swing earlier so the load and stride show before the ball reaches the plate; level the bat plane at contact; clamp the close-up ball to its true diameter. Test: stride by frame 3 and a near-horizontal bat in frames 5-6 of strips/high/R04; ball at most 33% of helmet width in crops/high/R04-batter."},
    {"id": "G-backstop-crowd", "category": "environment", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS4", "evidence": ["high/desktop/R05", "high/desktop/R17"], "benchmark": "smb3-1", "fix": "Padded backstop with netting, posts and sponsor boards; randomised and mirrored crowd tile offsets to hide seams; stepped risers. Test: no hard vertical seam in high/desktop/R05 and at least 3 materials on the backstop."},
    {"id": "G-night-pools", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["high/desktop/R13", "high/desktop/R12"], "benchmark": "smb4-1", "fix": "Tower spot or area lights with falloff, outfield edges 30-40% darker, haze cones at the towers. Test: infield luminance at least 1.5x the warning-track corners in high/desktop/R13."},
    {"id": "G-framing-runners", "category": "readability", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS5", "evidence": ["high/desktop/R10", "high/desktop/R16", "high/mobile/R02"], "fix": "Home-run trot camera follows the batter-runner; batting camera keeps the lead runner at least 5% inside the frame; tighter, lower portrait batting camera. Test: runner fully visible in R10 and R16; sky at most 25% of the 3D area in high/mobile/R02."},
    {"id": "G-body-proportions", "category": "charfit", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R12-pitcher", "crops/high/R17-pitcher-back"], "fix": "Trim the stocky build's torso and shoulder girth toward the MPFB2 athlete; knee and calf definition under tapered pants; hair meshes under caps. Test: front IoU at least 0.90 against mpfb2_athlete_front_mask; no bald scalp in crops/high/R17-pitcher-back."},
    {"id": "G-reticle-occlusion", "category": "ui", "expectedGain": 0.5, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R06", "high/desktop/R01"], "fix": "Fade the aim box to corner ticks while the pitch is in flight; opaque title panel and high-contrast selected button. Test: catcher unobstructed in high/desktop/R06; Season label contrast at least 4.5:1 in high/desktop/R01."}
  ],
  "calibration": {
    "notes": "Scored against absolute rubric anchors only; no prior loops consulted. Medium and low not scored. The low tier renders a different cartoon model and the v2 swing (crops/low/R02-batter, strips/low/R04). Perf: phone proxy 47/79 fps at 4x throttle passes 30 fps."
  }
}
```
