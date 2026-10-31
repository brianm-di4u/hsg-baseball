# Judge: loop 9, high tier

I read both critics, the advocate's rebuttal, the rubric, the loop brief, perf.json, fidelity.json and HISTORY.md (trend only). I opened these captures myself: `crops/high/R02-batter_head`, `R05-batter_feet`, `R05-ump_head`, `R06-catcher_glove`, `R07-batter-runner`, `R14-batter`, `R16-1B`, `R17-pitcher_hands`; `strips/high/R03`, `R04`, `R07`; `high/desktop/R05`, `R13`, `R14`; `high/landscape/R10`; `high/mobile/R02`, `R07`; `low/desktop/R05`; and `reviews/loop-9/calibration.png`. No category has a critic gap above 1.0: every category differs by 0.5 at most. I opened every capture where the advocate disputed a claim.

## Performance gate: PASS

Thresholds are from `VISUAL-PLAN-3.md` ("Budgets").
- **Desktop / high:** min 419.9 fps (grounder) and worst p95 2.9 ms. The gate is ≥ 55 fps and p95 ≤ 22 ms. Pass.
- **Phone / medium (4× CPU throttle):** min 63.3 fps (grounder), so it passes the ≥ 30 fps gate and the 24 fps floor. The grounder p95 is 33.5 ms, a single run, and is a **watch** item: it's the third loop near 33 ms. The phone GPU estimate takes the worst medium-mobile median gpuMs, 0.900 ms (grounder), × 25 (`research/perf-ceiling.md`) = 22.5 ms. That's within the 26 ms gate (loop 8 was 24.8). Pass.
- **Software GL / low:** duel 21.1 fps (p95 52 ms) and grounder 17.1 fps (p95 70.1 ms), against the 19.9 / 15.1 fps baseline. That's better than baseline. Pass.
- **Heap:** max 93.1 MB on high (< 192), 96.2 MB on medium (< 128) and 76.5 MB on low (< 90). Low sits at 85% of budget, a watch item. Pass.
- **Scene caps:** high max 1.196 M tris (≤ 1.6 M) and medium max 531k (≤ 650k). Pass.
- **Download:** not in perf.json, so I can't verify it here.

Note: the 4×-throttle rows are single runs (`runs: 1`). Only the unthrottled GPU rows are medians of 5. Because the gate passes, no WS6 performance fix leads the gap list.

## Fact rulings (disputed claims, checked on the captures)

- **`crops/high/R02-batter_head`: A overstated, advocate right.** The eyes are lost in black shadow under the helmet brim. The nose, lips, cheek and jaw are modelled and readable. It isn't a "dark mass". The jagged, polygon-stepped yellow collar trim is real.
- **`crops/high/R16-1B`: A overstated.** The eyes are faint slits under the cap, but they are present, and the nose, mouth and ear read. "Browless" is fair. "No readable eyes" isn't.
- **`high/desktop/R13`: A wrong.** The ball is a clear white streak just right of the scoreboard against the black tree line. The black tree mass and the lopsided light pool (bright left, dim right) are real.
- **`high/landscape/R10`: A wrong.** The ball is visible just below the HOME RUN banner's lower edge. The banner does overlap the scoreboard.
- **`high/desktop/R05`, `high/desktop/R14`: both partly right.** The reticle covers the catcher's mask and chest, and the mitt shows at its lower edge. The occlusion is real, but the target isn't hidden.
- **`crops/high/R05-ump_head`: both partly right.** A dark padded side piece frames the left of the cage. On the right, the horizontal bars end open, stand off the face and run out past the head toward the shoulder. In `crops/high/R14-batter`, both cages read from the side as ladders hanging off the cheek.
- **`crops/high/R05-batter_feet`: advocate right, Codex overstated.** The front (image-left) shoe clearly hovers, with its shadow detached behind it. The rear shoe's toe is at or near the dirt. This is the sixth straight loop with a hovering stance foot.
- **`crops/high/R14-batter`: Codex wrong.** Both hands are closed and stacked around the handle.
- **`strips/high/R07`: advocate right.** The arm pose changes between frames 1 and 3 (glove out, then hands at the chest), but there is no counter-phased pump. The 4→5 change is the camera reframe ruled in earlier loops. Codex's "abrupt transition" is mostly the camera, though no braking step is shown either.
- **`strips/high/R04`:** the loop-9 stride is on screen. The front foot lifts in frame 3 and is down by frame 4. The contact flash sits at the ball in frame 5. The finish (frames 6–8) ends with the bat hanging low in front of the chest, with no wrap. A is right about the finish.
- **`high/desktop/R14`: advocate right against Codex.** It is a distinct park: a stone and mesh backstop wall, and a roofed grandstand with a sepia crowd. The crowd is still a photo on a slab.
- **Sponsor boards: the loop-9 fix did not land.** `crops/high/R07-batter-runner` shows a navy sliver with an "E" between two RIDGELINE PIZZA boards. In the same crop, the RIDGELINE board overlaps a cut "REDBIRD FEE…" board. `crops/high/R05-ump_head` shows a cut "RED" board at the left end.
- **`crops/high/R06-catcher_glove`: confirmed.** The catcher's mitt is a brown hand with sculpted fingers. The shin guards flare into blue shells. The chest protector is one unsegmented blue shell with a ruffled, jagged neckline.
- **`crops/high/R17-pitcher_hands`: confirmed.** The glove is a brown fingered mitten with no web or lacing. At the set, the hands are apart and the bare hand is an open claw. The jersey has no placket or folds. The maroon piping runs through the "HAMILTON" lettering, so the I is lost. That's a recurring defect from loop 8.
- **`low/desktop/R05`: A right.** From behind, the low-tier pitcher's head shows a skin oval with a black band across it, like a blindfolded face on the back of the head. It's a low-tier regression.
- **`high/mobile/R07`: both right.** First and third base are outside the portrait frame, and the bottom ~20% of the play area is backstop dirt and grass.

## Rulings by category

### Characters: 5.5
Critics 5.5 / 5.0, advocate 5.5. The figures beat the 5 anchor on anatomy, hands and identity: the fingers close round the bat (`crops/high/R14-batter`, `crops/high/R02-batter_head`), proportions hold in the crouch (`crops/high/R16-1B`), and numbers and wordmarks are clean. They are well below 7 on every gear and cloth item in the 7 anchor. The mitt is a hand (`crops/high/R06-catcher_glove`), the glove is a mitten (`crops/high/R17-pitcher_hands`) and the cleats are glossy slip-ons (`crops/high/R05-batter_feet`). The uniforms are colour blocks with jagged trim and no placket or folds. The masks are bar ladders (`crops/high/R05-ump_head`). All the players share one build. Codex's 5.0 ignores the hands and anatomy, so A and the advocate are closer. **5.5.**

### Fidelity to reference (charfit): 5.5
Critics 5.5 / 5.0, advocate 5.5. The proportions match the MPFB2 athlete at frame distance (IoU 0.878 / 0.895, `crops/high/R16-1B`), and the face structure is the MakeHuman head. Eye and brow albedo are missing, though, and the eyes vanish under helmet brims (`crops/high/R02-batter_head`). Garments are nowhere near `si_jersey_front` (`crops/high/R17-pitcher_hands`), and the hands lack knuckle and nail definition. That is the 5 anchor plus correct proportions. **5.5.**

### Animation & game feel: 5.5
Critics 5.5 / 5.0, advocate 5.5. Progress shows: the swing now has a visible stride (`strips/high/R04` frames 2–4) and a contact flash at the ball (frame 5). The delivery stages set, hands-break and leg lift with a planted pivot foot (`strips/high/R03`), and the fielding crouch collects the ball with a possession ring (`strips/high/R07` frames 5–8). Several 7-anchor requirements still fail. The stance foot hovers (`crops/high/R05-batter_feet`, sixth loop). The finish droops instead of wrapping (`strips/high/R04` frames 6–8). The run arms carry without pumping (`strips/high/R07` frames 1–4, `crops/high/R07-batter-runner`). There's no dust. **5.5.**

### Environment: 5.5
Critics 5.5 / 5.0, advocate 5.5. Mow-striped turf, grained dirt, built towers, foul poles, the scoreboard and a distinct historic park (`high/desktop/R14`) put this above 5. Against that, the crowd is a photo on a slab above a blank grey band (`high/desktop/R05`). The trees are faceted blobs set against a photo backdrop (`crops/high/R16-1B`, `high/landscape/R10`). The dugout is a black box (`crops/high/R14-batter`). The sponsor-board slice the loop claimed to fix is still visible (`crops/high/R07-batter-runner`). The 7 anchor requires no visual bugs. **5.5.**

### Lighting & atmosphere: 6.0
Critics 5.5 / 5.5, advocate 5.5. I score half a point above all three, on the anchors. The 5 anchor is a directional key, shadows and a believable sky, and this exceeds it on two 7-anchor items. First, soft contact shadows sit directly under planted feet (`crops/high/R16-1B`, `crops/high/R14-batter`). Second, the night scene takes its exposure from the towers (`high/desktop/R13`). The golden-hour grade is convincing (`high/desktop/R14`, `crops/high/R14-batter`), and the loop-9 skin floor keeps cap-shaded faces readable (`crops/high/R16-1B`). Still short of 7: no sky or bounce light models the white uniforms (`crops/high/R17-pitcher_hands`), the eyes go black under the helmet brim (`crops/high/R02-batter_head`), the night tree line is pure black with a lopsided pool, and there's no haze (`high/desktop/R13`). The detached shadow in `crops/high/R05-batter_feet` is an animation fault, not a lighting one. **6.0.**

### UI & typography: 6.5
Critics 6.5 / 6.5, advocate 6.5. The score bug, count, pitch type and mph are consistent across `high/desktop/R05`, `high/desktop/R13` and `high/mobile/R02`. The HOME RUN banner has hierarchy (`high/landscape/R10`). The 7 anchor fails on "nothing overlapping the action": the reticle sits over the catcher (`high/desktop/R05`, `high/desktop/R14`) and the banner covers the scoreboard (`high/landscape/R10`). There is no broadcast motion. **6.5.**

### Readability: 6.0
Critics 6.0 / 5.5, advocate 6.0. The batting views read at a glance (`high/mobile/R02`, `high/desktop/R05`). The ball reads even at night (`high/desktop/R13`, where A was wrong) and in the HR shot (`high/landscape/R10`). The portrait fielding frame loses both corner bases (`high/mobile/R07`), the broadcast fielders are ~15 px, and the catcher sits under the reticle (`high/desktop/R05`). **6.0.**

### Mobile: 6.0
Critics 6.0 / 5.5, advocate 6.0. Portrait batting is intentional and good, with a large batter, legible HUD and thumb-sized buttons (`high/mobile/R02`). The phone proxy holds 63 fps. Portrait fielding isn't intentional framing: the corner bags are out of frame and the bottom fifth is empty foreground (`high/mobile/R07`). The landscape HR banner covers the scoreboard (`high/landscape/R10`). The HUD isn't cramped, so this sits above 5, but only one of the two framings is intentional. **6.0.**

**Total: 46.5**, the same as loop 8. No gate is met.

### Medium/low regressions
- `low/desktop/R05`: from behind, the pitcher's head shows a face oval with a black band. It's conspicuous in the main pitching camera.
- `low/desktop/R02` uses a different batter pose from high (reported by Codex and the advocate). It's tier drift, not a new regression.

## Calibration (blind)
`reviews/loop-9/calibration.png` shows stylised players at a stadium with a dense, modelled crowd.
- **Characters 7.5:** at least three clearly different builds, from slim to heavyset. Cloth folds show in the pants and sleeves, the caps are paneled with a button, and stirrup socks and belts are modelled. The cleats have laces and soles. Materials contrast throughout. It's stylised, not realistic, so it doesn't reach 9.
- **Lighting 7.0:** soft contact shadows under every player, warm key and fill modelling the bodies, rim light on the uniforms, and a crowd in believable shade. There's no visible haze or volumetric, and the grade is good but not filmic.

## Ranked gaps (gain ÷ effort; S = 1, M = 2, L = 4; ties broken by severity)

1. **G-mobile-framing** (mobile, WS5, S). Merges A's G-mobile-framing and Codex's G-phone-field-coverage. The fix: add portrait presets for the broadcast fielding camera. Tilt down and widen the horizontal FOV so both corner bags and the receiving fielder are in frame. Pull the pitching camera back so the pitcher is whole, and lower the night batting horizon. **Test:** in `high/mobile/R07`, 1B and 3B are both in frame and no empty band exceeds 10% of the height. In `high/mobile/R05`, the pitcher is fully framed. Gain: mobile +0.5, readability +0.25.
2. **G-foot-plant-ik** (animation, WS2, S, severity 4, sixth loop). Ground-clamp or foot-IK the stance and idle clips so sole y = 0 outside the stride window. **Test:** in `crops/high/R05-batter_feet`, both soles touch the dirt with the contact shadow directly beneath. Gain: animation +0.25, lighting +0.25 (grounding).
3. **G-swing-finish** (animation, WS2, S). Key the follow-through: hands finish above the lead shoulder, the bat wraps behind the neck, the back heel comes up and the belt buckle faces the pitcher. **Test:** in `strips/high/R04` frame 8, the bat head is above the helmet and behind the batter. Gain: animation +0.5.
4. **G-uniform-cloth** (characters, WS1, M). Bake a cloth normal and AO with a button placket, folds at the elbow, waist and knee, belt loops and a buckle. Move the trim, sock and piping colour edges into texture space so they are smooth, and stop the piping at the wordmark. **Test:** no stair-stepped collar or sock edge in `crops/high/R02-batter_head` and `crops/high/R16-1B`, a visible placket and knee folds in `crops/high/R17-pitcher_hands` and `crops/high/R16-1B`, and every letter of "HAMILTON" readable. Gain: characters +0.5, charfit +0.25.
5. **G-glove-mitt-cleats** (characters, WS1, M). Model a fielder's glove with a laced web, pocket and rolled heel, and a rounded catcher's mitt with no visible fingers. Replace the slip-ons with a low-top cleat with laces, a tongue and a spike plate, and give the leather a normal map. **Test:** no fingers on the mitt in `crops/high/R06-catcher_glove`, web lacing visible in `crops/high/R17-pitcher_hands`, and laces visible in `crops/high/R05-batter_feet`. Gain: characters +0.5, charfit +0.25.
6. **G-face-brim-eyes** (charfit, WS3, M). Merges G-face-under-brim, G-reference-detail (face part) and G-face-light-ground (face part). The cause is narrower than A stated: cap-shaded faces read, and only the helmet brim kills the eyes. Use the MPFB2 eye, iris and brow albedo at LOD0/1, and add an eye-socket hemisphere fill under helmet brims. **Test:** eyes and brows are distinguishable in `crops/high/R02-batter_head` and `crops/high/R16-1B`. Gain: charfit +0.25, characters +0.25, lighting +0.25.
7. **G-run-arm-pump** (animation, WS2, M, severity 4). Give the run, chase and trot cycles a counter-phased arm swing, carry the glove closed and close the bare hand into a loose fist. **Test:** the hand positions alternate fore and aft across `strips/high/R07` frames 1–4 and `strips/high/R10` frames 1–8, and the batter-runner's arms leave the chest in `crops/high/R07-batter-runner`. Gain: animation +0.5.
8. **G-board-slice** (environment, WS4, S, severity 3 because the claimed fix didn't land). Place boards along the full stand-front and backstop path as one sequence, with no board narrower than its full width and no overlapping board ends at surface junctions. **Test:** no navy "E" sliver and no RIDGELINE board overlapping REDBIRD in `crops/high/R07-batter-runner`, and no cut "RED" board in `crops/high/R05-ump_head`. Gain: environment +0.25.
9. **G-masks-catcher-gear** (characters, WS1, M). Give the mask a closed frame, with the side pad on both sides, chin and top padding and straps, all parented to the head bone, and keep the bars inside the head silhouette. Add plate-segmented shin guards with knee caps fitted to the knee, and a chest protector with a harness and a clean collar seam. **Test:** in `crops/high/R05-ump_head`, the bars end in a frame on both sides. In `crops/high/R06-catcher_glove`, the knee caps hug the knee. Gain: characters +0.5.
10. **G-body-variety** (characters, WS1, M). Drive three or more MakeHuman shape presets (lean, stocky, tall) per roster slot, and reduce the deltoid bulge toward `mpfb2_athlete_front`. **Test:** visibly different torso widths among the players in `high/desktop/R05` and `strips/high/R07`. Gain: characters +0.25, charfit +0.25.
11. **G-reticle-occludes-catcher** (ui, WS7, S, severity 2). Draw the zone and reticle outline-only at 50% fill opacity, or shift the zone above the catcher's mask. **Test:** the catcher's mask and chest are visible through the reticle in `high/desktop/R05` and `high/desktop/R14`. Gain: ui +0.25.
12. **G-crowd-backdrop** (environment, WS4, L). Merges A's G-crowd-backdrop and Codex's G-crowd-construction. Replace the slab crowd with instanced impostor fans per seat row, with tint and idle bob. Put a rail and fascia over the blank grey band, and fade the photo backdrop into the tree layer with depth fog. **Test:** individual heads read against seats in `high/desktop/R05`, and no horizontal seam shows behind the trees in `high/landscape/R10`. Gain: environment +0.75.

These fell outside the top 12: G-low-lod-head (WS6, S; low-tier regression in `low/desktop/R05`, no high-tier gain; fix it alongside WS1 work), G-dugout-geometry (environment, M, +0.25) and G-action-cues (readability, M, +0.5; the possession ring exists, the pre-possession cue doesn't).

**Verdict: continue.** No gate is met. Characters stand at 5.5 against the 7.5 gate.

```json
{
  "loop": 9,
  "role": "judge",
  "tier": "high",
  "scores": {
    "characters": {
      "score": 5.5,
      "confidence": 0.8,
      "evidence": [
        { "shot": "crops/high/R06-catcher_glove", "note": "catcher's mitt is a fingered brown hand; flared shin shells; unsegmented chest protector" },
        { "shot": "crops/high/R17-pitcher_hands", "note": "mitten glove, no placket or folds, piping through HAMILTON" },
        { "shot": "crops/high/R05-batter_feet", "note": "glossy slip-on cleats" },
        { "shot": "crops/high/R14-batter", "note": "positive: both hands closed round the handle; clean lettering and numbers" },
        { "shot": "crops/high/R16-1B", "note": "positive: anatomy holds in the crouch; jagged collar trim" }
      ]
    },
    "charfit": {
      "score": 5.5,
      "confidence": 0.75,
      "evidence": [
        { "shot": "crops/high/R16-1B", "note": "MPFB2 proportions and head structure; faint eyes, no brows" },
        { "shot": "crops/high/R02-batter_head", "note": "eyes lost under the helmet brim; nose and lips modelled" },
        { "shot": "crops/high/R17-pitcher_hands", "note": "garment far simpler than si_jersey_front; hands lack knuckle detail" }
      ]
    },
    "animation": {
      "score": 5.5,
      "confidence": 0.75,
      "evidence": [
        { "shot": "strips/high/R04", "note": "stride now visible frames 2-4, flash at contact; finish droops low with no wrap" },
        { "shot": "strips/high/R03", "note": "set, hands-break and leg lift with planted pivot foot" },
        { "shot": "strips/high/R07", "note": "fielding crouch collects the ball; run arms carried without pump" },
        { "shot": "crops/high/R05-batter_feet", "note": "front stance foot hovers, sixth loop" }
      ]
    },
    "environment": {
      "score": 5.5,
      "confidence": 0.8,
      "evidence": [
        { "shot": "crops/high/R07-batter-runner", "note": "board slice persists: navy E sliver, RIDGELINE overlapping REDBIRD" },
        { "shot": "high/desktop/R05", "note": "photo crowd slab over a blank grey band" },
        { "shot": "high/desktop/R14", "note": "positive: distinct historic park with stone/mesh backstop" },
        { "shot": "crops/high/R14-batter", "note": "black-box dugout; faceted trees" }
      ]
    },
    "lighting": {
      "score": 6.0,
      "confidence": 0.65,
      "evidence": [
        { "shot": "crops/high/R16-1B", "note": "soft contact shadows under planted feet; cap-shaded face readable" },
        { "shot": "high/desktop/R14", "note": "convincing golden-hour grade" },
        { "shot": "high/desktop/R13", "note": "tower-lit night, but black tree mass, lopsided pool, no haze" },
        { "shot": "crops/high/R02-batter_head", "note": "eyes black under the helmet brim in daylight" }
      ]
    },
    "ui": {
      "score": 6.5,
      "confidence": 0.8,
      "evidence": [
        { "shot": "high/desktop/R05", "note": "consistent score bug and controls; reticle over the catcher" },
        { "shot": "high/landscape/R10", "note": "HR banner with hierarchy; covers the scoreboard, not the ball" },
        { "shot": "high/mobile/R02", "note": "same type scale and hierarchy on the phone" }
      ]
    },
    "readability": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        { "shot": "high/desktop/R13", "note": "ball streak visible beside the scoreboard at night" },
        { "shot": "high/mobile/R07", "note": "corner bases out of the portrait frame" },
        { "shot": "high/desktop/R05", "note": "batter and zone clear; catcher under the reticle" }
      ]
    },
    "mobile": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        { "shot": "high/mobile/R02", "note": "intentional portrait batting frame, thumb buttons" },
        { "shot": "high/mobile/R07", "note": "corner bags off-frame, empty foreground fifth" },
        { "shot": "high/landscape/R10", "note": "banner over the scoreboard" }
      ]
    }
  },
  "gaps": [
    { "id": "G-mobile-framing", "category": "mobile", "expectedGain": 0.75, "severity": 4, "effort": "S", "workstream": "WS5", "evidence": ["high/mobile/R07", "high/mobile/R05", "high/mobile/R12"], "fix": "Portrait presets: tilt down and widen the broadcast fielding camera so both corner bags and the receiving fielder are framed; pull the pitching camera back; lower the night batting horizon. Test: 1B and 3B in frame and no empty band over 10% of height in high/mobile/R07; pitcher whole in high/mobile/R05. Gain mobile +0.5, readability +0.25." },
    { "id": "G-foot-plant-ik", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS2", "evidence": ["crops/high/R05-batter_feet"], "fix": "Ground-clamp or foot-IK the stance and idle clips (sole y = 0 outside the stride window). Test: both soles on the dirt with the contact shadow directly beneath in crops/high/R05-batter_feet. Gain animation +0.25, lighting +0.25." },
    { "id": "G-swing-finish", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS2", "evidence": ["strips/high/R04"], "benchmark": "smb4-3", "fix": "Key the follow-through: hands above the lead shoulder, bat wrapped behind the neck, back heel up, belt buckle to the pitcher. Test: strips/high/R04 frame 8 bat head above the helmet and behind the batter." },
    { "id": "G-uniform-cloth", "category": "characters", "expectedGain": 0.75, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R02-batter_head", "crops/high/R17-pitcher_hands", "crops/high/R16-1B"], "benchmark": "smb3-3", "fix": "Bake cloth normal/AO with button placket, elbow/waist/knee folds, belt loops and buckle; move trim, sock and piping colour edges into texture space and stop piping at the wordmark. Test: no stair-stepped collar or sock edges in R02-batter_head and R16-1B; placket and knee folds visible; every letter of HAMILTON readable in R17-pitcher_hands. Gain characters +0.5, charfit +0.25." },
    { "id": "G-glove-mitt-cleats", "category": "characters", "expectedGain": 0.75, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R06-catcher_glove", "crops/high/R17-pitcher_hands", "crops/high/R05-batter_feet"], "benchmark": "smb4-2", "fix": "Model a laced-web fielder's glove with pocket and rolled heel, a rounded fingerless catcher's mitt, and a low-top cleat with laces, tongue and spike plate; leather normal maps. Test: no fingers on the mitt in R06-catcher_glove, web lacing in R17-pitcher_hands, laces in R05-batter_feet. Gain characters +0.5, charfit +0.25." },
    { "id": "G-face-brim-eyes", "category": "charfit", "expectedGain": 0.75, "severity": 4, "effort": "M", "workstream": "WS3", "evidence": ["crops/high/R02-batter_head", "crops/high/R16-1B"], "benchmark": "mpfb2_athlete_face_34", "fix": "MPFB2 eye, iris and brow albedo at LOD0/1 plus an eye-socket hemisphere fill under helmet brims (cap-shaded faces already read). Test: eyes and brows distinguishable in R02-batter_head and R16-1B. Gain charfit +0.25, characters +0.25, lighting +0.25." },
    { "id": "G-run-arm-pump", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["strips/high/R07", "strips/high/R10", "crops/high/R07-batter-runner"], "benchmark": "smb4-2", "fix": "Counter-phased arm swing in run, chase and trot; glove carried closed, bare hand a loose fist. Test: hands alternate fore and aft across strips/high/R07 frames 1-4 and strips/high/R10 frames 1-8; batter-runner arms leave the chest." },
    { "id": "G-board-slice", "category": "environment", "expectedGain": 0.25, "severity": 3, "effort": "S", "workstream": "WS4", "evidence": ["crops/high/R07-batter-runner", "crops/high/R05-ump_head"], "fix": "Lay boards along the whole stand-front and backstop path as one sequence: no board narrower than full width, no overlapping ends at surface junctions. Test: no navy E sliver or RIDGELINE-over-REDBIRD overlap in R07-batter-runner, no cut RED board in R05-ump_head." },
    { "id": "G-masks-catcher-gear", "category": "characters", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R05-ump_head", "crops/high/R06-catcher_glove", "crops/high/R14-batter"], "benchmark": "smb3-1", "fix": "Closed mask frame with side pads both sides, chin and top padding and straps parented to the head bone, bars inside the head silhouette; plate-segmented shin guards with fitted knee caps; chest protector with harness and clean collar seam. Test: bars end in a frame on both sides in R05-ump_head; knee caps hug the knee in R06-catcher_glove." },
    { "id": "G-body-variety", "category": "characters", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["high/desktop/R05", "crops/high/R16-1B"], "benchmark": "smb4-4", "fix": "Three or more MakeHuman shape presets (lean, stocky, tall) per roster slot; reduce the deltoid bulge toward mpfb2_athlete_front. Test: visibly different torso widths among players in high/desktop/R05 and strips/high/R07. Gain characters +0.25, charfit +0.25." },
    { "id": "G-reticle-occludes-catcher", "category": "ui", "expectedGain": 0.25, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R05", "high/desktop/R14"], "fix": "Draw the zone and reticle outline-only at 50% fill opacity, or move the zone above the catcher's mask. Test: catcher's mask and chest visible through the reticle in R05 and R14." },
    { "id": "G-crowd-backdrop", "category": "environment", "expectedGain": 0.75, "severity": 4, "effort": "L", "workstream": "WS4", "evidence": ["high/desktop/R05", "high/landscape/R10", "crops/high/R16-1B"], "benchmark": "smb4-3", "fix": "Instanced impostor fans per seat row with tint and idle bob; rail and fascia over the grey band; fade the photo backdrop into the tree layer with depth fog. Test: individual heads against seats in high/desktop/R05; no horizontal seam behind the trees in high/landscape/R10." }
  ],
  "calibration": {
    "characters": 7.5,
    "lighting": 7.0,
    "perfGate": "pass: high desktop min 419.9 fps / p95 2.9 ms; medium phone proxy (4x CPU, single runs) min 63.3 fps, grounder p95 33.5 ms (watch); est. phone GPU = worst medium-mobile median gpuMs 0.900 (grounder) x 25 = 22.5 ms <= 26 (down from 24.8); software GL 21.1/17.1 fps vs 19.9/15.1 baseline, better; heap 93.1/96.2/76.5 MB pass (low at 85%, watch); scene tris high 1.196M <= 1.6M, medium 531k <= 650k; download not in perf.json",
    "factRulings": "R02 helmet face: eyes lost, nose/lips modelled (A overstated); R16-1B eyes faint but present (A overstated); R13 ball visible by scoreboard (A wrong); landscape R10 ball visible below banner (A wrong); R05 reticle covers mask/chest, mitt visible (both partly right); ump mask has left side pad, right bars open-ended past the head (both partly right); R05 front stance shoe hovers, rear near planted (Codex overstated; 6th loop); R14 grip closed (Codex wrong); R07 arms change but no pump, 4-5 camera reframe (advocate right); R04 stride now visible, finish droops (A right); R14 park distinct (Codex wrong); board slice persists in R07-batter-runner and R05-ump_head (loop-9 fix did not land); piping through HAMILTON letters persists; low R05 face-band on back of pitcher head (A right); mobile R07 corner bags off-frame (both right)",
    "effortWeights": "S=1, M=2, L=4"
  },
  "verdict": "continue"
}
```
