# Judge: loop 10, high tier

Capture paths are relative to `screenshots/review-loop-10/`. I opened these myself: `strips/high/R03` (and an enlarged crop of frames 7 and 8), `strips/high/R04`, `strips/high/R07`, `strips/high/R10`, `high/desktop/R01, R03, R05, R06, R07, R09, R12, R13, R14, R15, R16`, `high/mobile/R02, R05, R07, R10`, `high/landscape/R02, R05, R07, R10, R12`, `crops/high/R02-batter_hands, R02-batter_head, R04-batter, R05-batter_feet, R05-ump_head, R06-catcher_glove, R08-CF, R09-LF, R10-batter-trot, R16-runner1, R17-pitcher_hands`, `crops/low/R06-catcher_glove`, and the reference renders `mpfb2_athlete_three_quarter` and `mpfb2_athlete_face_34`.

No category has the critics more than 1.0 apart (the widest gaps are 0.5, in charfit, animation, environment, lighting and mobile). I checked the captures anyway wherever the advocate disputed a fact. Those rulings are below and in `calibration.factRulings`.

## Verdict

**Continue.** No gate is met. This loop's changes are real but small. The placket buttons read (`crops/high/R17-pitcher_hands`, `crops/high/R02-batter_hands`). The larger contact shadow now darkens the dirt around both soles (`crops/high/R05-batter_feet`). Lettering no longer draws through the catcher's chest protector on high (`crops/high/R06-catcher_glove`). None of these moves a category.

I found one new defect that matters more than anything the loop added: **the pitch leaves the hand before the arm comes through.**
- In `high/desktop/R06` the ball is already in flight with its trail while the pitcher's throwing arm is still laid back behind his head.
- In `strips/high/R03` frame 7 the ball floats beside the stride knee before the front foot has landed.

The final total equals loop 9's.

## Performance gate: **pass (provisional, not verified)**

Thresholds from `VISUAL-PLAN-3.md` "Budgets", against `perf.json`:

| Check | Budget | perf.json | Result |
|---|---|---|---|
| Desktop / high, every scene | ≥ 55 fps, p95 ≤ 22 ms | min 323.2 fps (grounder), worst p95 4.4 ms | pass, wide margin |
| Phone proxy, medium, 4× CPU throttle | ≥ 30 fps (floor 24) | min 52.0 fps (grounder); p95 33.8 ms | pass. The p95 sits at about 30 fps, as in loops 8 and 9 (watch) |
| Estimated phone GPU (medium·mobile median gpuMs × 25) | ≤ 26 ms | duel 22.3, **grounder 27.05**, gap 20.2, replay 19.0, night 20.8 ms | **grounder 4% over as measured** |
| Software GL / low | no worse than the loop-0 baseline (19.9 / 15.1 fps) | duel 20.9, grounder 16.9 fps | pass (better) |
| Heap | high < 192, medium < 128, low < 90 MB | 107.1 / 100.6 / 71.7 MB | pass |
| Scene triangle caps | high ≤ 1.6 M, medium ≤ 650k | 1.196 M / 531k | pass |
| Download | — | not in perf.json; the brief says the phone pack grows 0.03 MB | not measured |

**How much weight each run gets, and why.**

- **`perf.json`, the pipeline run.** Full weight for desktop fps and p95, the CPU-throttled phone proxy, heap, triangles, calls and software GL. Each of these passes by a wide margin, and machine load can only make a run look worse, so a pass stays a pass.
  - Its absolute GPU milliseconds get **reduced weight**. In the same run, desktop/high duel ran at 380 fps against loop 9's 480, about 20% slower. The build's only rendering additions can't explain that: one 64-triangle skinned button strip per player, and contact-shadow quads drawn in the same instanced call.
  - The over-budget reading (1.082 ms against a 1.04 ms limit) is a 4% overage inside a run that is about 20% inflated.
- **`perf-gpu-repeat.json`.** **Zero weight as a measurement of the build.** It renders the identical scenes: calls and triangles match `perf.json` row for row, for example medium·mobile grounder 127 calls / 414,841 triangles in both. Yet every row is 30–80% slower, desktop included: high-desktop duel runs 261 fps against 380, and medium·mobile duel takes 1.33 ms against 0.893. Only the machine changed. **Full weight as evidence of noise.** The same commit, re-run within about 45 minutes, moved by about 49% (medium·mobile duel). So the setup that day could not resolve a 4% overage. Its phone estimates (28.7–44.6 ms in every scene) are therefore not evidence of a regression.
- **The duel-normalised estimate in `perf-note.md`.** Supporting weight. It assumes the load scaled every scene evenly. The data back that assumption: grounder ÷ duel is 1.21 in `perf.json` and 1.34 in the repeat, against about 1.26 in loop 9 (0.900 / 0.715 ms). That suggests no grounder-specific regression. Applied to loop 9's duel, the estimate is 21.6 ms using the pipeline ratio, or 24.0 ms using the worse repeat ratio. Both are within 26 ms.
  - Its weakness: it would hide a cost that hit every scene equally. The only candidates are the button strips and the larger shadow quads, and neither is plausibly worth more than a few hundredths of a millisecond on the grounder.

**Ruling.** The gate is **not failed** on this evidence, but it is **not verified** either. The one over-budget number is within the noise this machine showed that day, and nothing in the build accounts for it. Loop 6 set the precedent: a 1.33 ms reading re-measured at 0.694 ms.

The headroom is thin even after normalising (21.6–24.0 ms against 26). Loop 11 adds character detail (normal maps, cleats, hair), so it must be measured on a verified quiet machine, with desktop/high duel within 10% of the loop-9 baseline. If medium·mobile grounder then reads ≥ 1.04 ms, the top gap becomes a WS6 cut.

## Rulings per category

### Characters: 5.5 (A 5.5, B 5.5, advocate 5.5)

**What earns the score:**
- Real hands. The fingers curl round the bat, both hands stacked (`crops/high/R02-batter_hands`).
- Modelled faces that read under a helmet at most angles: eyes, nose and lips in `crops/high/R10-batter-trot` and `crops/high/R02-batter_hands`.
- Placket piping, buttons, belt and two-tone socks.

**What holds it at 5.5:**
- **Cloth:** no folds or hems anywhere (`crops/high/R08-CF`, `crops/high/R17-pitcher_hands`).
- **Footwear and gloves:** glossy loafers (`crops/high/R05-batter_feet`). Brown mitten gloves with blocky lobes (`crops/high/R17-pitcher_hands`).
- **Catcher's gear:** the chest protector reads as a jersey panel with a crumpled collar, and the shin guards are blue blobs (`crops/high/R06-catcher_glove`).
- **Umpire's mask:** the bars run below the chin over the chest (`crops/high/R05-ump_head`).
- **Colour boundaries:** sawtooth edges at the collar and sleeve (`crops/high/R02-batter_head`).
- **Lettering:**
  - The piping covers the **I** of SPRINGS. The advocate is right; Critic A named the wrong letter (`crops/high/R02-batter_hands`).
  - The piping also crosses HAMILTON (`crops/high/R17-pitcher_hands`).
- **Belt clipping:** the black belt band runs over both forearms in the set position, and the open throwing hand holds no ball (`crops/high/R17-pitcher_hands`).
- **Body variety:** essentially one build (`crops/high/R16-runner1`, `crops/high/R10-batter-trot`).
- **Mirrored back number:** "27" is mirrored in `high/desktop/R05`. The same pitcher's 27 reads correctly one moment later in `high/desktop/R06`, and "19" reads correctly in `high/desktop/R14`. So the bug depends on the player's state, not the tier (the advocate is right on scope).

**The face dispute:** Critic A overgeneralised. Eyes are lost only in the head-down pose in `crops/high/R02-batter_head`.

### Fidelity to reference: 5.5 (A 6.0, B 5.5, advocate 6.0)

**Matches the reference:**
- Proportions track `mpfb2_athlete_three_quarter` well in `crops/high/R16-runner1`, consistent with IoU 0.878 front and 0.895 side.
- Hand construction is near the reference (`crops/high/R02-batter_hands`).

**Falls short:**
- **Face:** next to `mpfb2_athlete_face_34`, the in-game faces have no hair and no brows anywhere I looked. Pale skin is bleached flat (`crops/high/R09-LF`). That is a "far simpler" face, not a simplification visible only in close-up.
- **Garment:** nothing of `si_jersey`'s drape or thickness (`crops/high/R08-CF`, where the shoulders are also inflated).

**The LOD2 dispute:** the advocate is wrong that LOD2 "belongs to the low tier". Per the budget table in `research/perf-ceiling.md`, high uses LOD2 for players below about 70 px. LOD2 is at 40.9% pixel error at 60 px, against 21.8% for LOD1 (`fidelity.json`). So Critic B's point applies to far fielders on high, though the difference is hard to see at that size.

Two of the three detail items (face, garment) sit at the 5 anchor and one (hands) is near 7. That gives 5.5.

### Animation & game feel: 5.5 (A 6.0, B 5.5, advocate 5.5)

**The pitch strip (`strips/high/R03`):**
- It ends before release. I enlarged frames 7 and 8. Frame 8 is mid-stride with the front foot in the air and both arms spread. Critic A's "landing follow-through" is wrong; B and the advocate are right.
- The CHANGES claim that the strip "runs through release into the follow-through" is not borne out by the capture.
- Worse, frame 7 shows the ball out of the hand beside the stride knee. `high/desktop/R06` shows the ball in flight while the arm is still laid back.
- The pitch has a leg lift and a stride, but its release is out of sync.

**The swing strip (`strips/high/R04`):** load, front-foot stride, contact flash at frame 3, back-heel pivot and a high finish. That is the best clip.

**The swing desync dispute:** I don't accept the swing desync in `crops/high/R04-batter` as proven. It is a side close-up of a pitch that is still approaching, and the strip shows contact two frames later. Critic A overstated it, and the advocate's concession wasn't needed.

**Fielding (`strips/high/R07`):** the shortstop snaps from running to a deep crouch between frames 4 and 5. The glove then tracks the ball in frame 7, and the ring turns white at possession in frame 8 (the advocate is right).

**The trot (`strips/high/R10`):** feet planted, but restrained, open-handed arm carry and no torso counter-rotation. "Restrained", not "frozen" (the advocate is right).

**Fly ball (`crops/high/R09-LF`):** the left fielder runs with his head turned away from the ball.

### Environment: 5.5 (A 5.5, B 5.0, advocate 5.5)

**Above the 5 anchor:**
- Mow stripes and grained dirt, all four bases and a backstop (`high/desktop/R07`).
- Built towers and an in-world scoreboard (`high/desktop/R12`).
- A distinct historic park (`high/desktop/R15`, `high/desktop/R14`).

**Held back:**
- A tiled photo crowd card, blown up and blurry at the plate (`high/desktop/R05`, `high/mobile/R05`).
- Untextured grey stand boxes and faceted trees (`high/desktop/R01`).
- Unexplained grey ovals beyond the fence and a haze seam (`high/desktop/R15`).
- A black void under the tree band at night (`high/desktop/R13`).

The advocate's case for 5.5 holds.

### Lighting & atmosphere: 6.0 (A 6.0, B 5.5, advocate 6.0)

**Strengths:**
- The new contact darkening wraps both soles in `crops/high/R05-batter_feet`. The band trailing off is the key-light cast shadow. The left toe is slightly lifted, so B's "detached" is overstated and "incomplete" is fair.
- Night exposure with tower bloom and a blue-hour sky (`high/desktop/R12`).
- A convincing golden afternoon (`high/desktop/R14`).

**Missing for the 7 anchor:**
- Haze and depth are absent.
- The night backdrop is a void (`high/desktop/R13`).
- Eyes are lost under the brim in head-down poses (`crops/high/R02-batter_head`).
- Helmet specular is weak.

### UI & typography: 6.5 (all 6.5)

- **Strengths:** a consistent score bug with pitcher and batter line and pitch speed (`high/desktop/R03`, "FB 77 mph"). The HOME RUN / 396 FT banner has clear hierarchy (`high/desktop/R15`).
- **Weaknesses:**
  - No ball/strike result banner was captured.
  - The translucent title menu over a moving field hurts legibility (`high/desktop/R01`).

### Readability: 6.0 (all 6.0)

- **Strengths:**
  - `high/desktop/R07` shows all four bases, the ball and the ringed runner at a glance.
  - Possession is cued by the white ring (`strips/high/R07` frame 8).
- **Weaknesses:**
  - The first-base runner and first baseman are jammed against the right edge (`high/desktop/R16`).
  - The fly ball in `high/desktop/R09` is a dot against the scoreboard.
  - Portrait R07 loses the corner bases (`high/mobile/R07`).

### Mobile: 6.0 (A 6.0, B 6.5, advocate 6.5)

**The landscape R02 dispute:** Critic A was wrong. The BUNT and STEAL buttons are clear of the batter, and the viewport crops the feet and plate (`high/landscape/R02`).

**Strengths:**
- Portrait batting and pitching are well framed, with thumb-sized controls (`high/mobile/R02`, `high/mobile/R05`).
- The CPU proxy holds 52 fps.

**Problems:**
- Three framing failures still breach "portrait and landscape framing both intentional":
  - the batter's feet and plate cropped in `high/landscape/R02`;
  - the CB button over the pitcher's legs in `high/landscape/R05`;
  - the corner bases out of frame in `high/mobile/R07`.
- The HOME RUN banner sits on the in-world scoreboard in `high/landscape/R10`.
- The phone GPU is unverified this loop.

I stay at 6.0.

### Regressions in other tiers (not scored)

- **Low tier:** draws "LAKESIDE" over the catcher's chest protector (`crops/low/R06-catcher_glove`). This loop's hide covers high and medium only (Critic B is right).
- **Low tier:** the cartoon LOD2 head (`crops/low/R02-batter_head`) is the v2 player, by design.
- **Medium tier:** no new regressions seen.

## Ranked gaps (gain ÷ effort; S = 1, M = 2, L = 4)

1. **G-pitch-release-sync** (animation, WS2, S, +0.5)
   - **Fix:** parent the ball to the throwing-hand bone until a release key placed after front-foot strike, with the hand forward of the head. Spawn the pitch flight from the hand's world position on that frame.
   - **Test:** hand-to-ball distance < 0.3 ft on every frame before release; no ball out of the hand in `strips/high/R03` frame 7 or `high/desktop/R06`.
   - **Capture fix:** extend the R03 strip so release and follow-through actually appear.
2. **G-kit-seams-decals** (characters, WS1, S, +0.5)
   - **Fix:** replace per-triangle colour regions at the collar, sleeve and sock top with texture-masked regions that have smooth boundaries. Draw the wordmark above the placket piping. Fix the state-dependent mirrored "27".
   - **Test:**
     - no sawtooth edges in `crops/high/R02-batter_head` or `crops/high/R09-LF`;
     - every letter of SPRINGS and HAMILTON visible;
     - 27 correct in `high/desktop/R05`.
3. **G-landscape-framing** (mobile, WS7, S, +0.5)
   - **Fix:**
     - Landscape batting: raise the camera or lower the horizon so the feet and plate are inside the frame.
     - Landscape pitching: move the pitch buttons or offset the camera so no button overlaps the pitcher.
     - Portrait fielding: widen the camera so both corner bases stay in frame.
     - Landscape HOME RUN: move the banner off the in-world scoreboard.
   - **Test:** `high/landscape/R02`, `high/landscape/R05`, `high/mobile/R07`, `high/landscape/R10`.
4. **G-cloth-folds-normal** (characters, WS1, M, +0.75)
   - **Fix:** bake a fold, crease and weave normal map plus AO for the jersey and pants: sleeve hems, elbow, knee, crotch and belt-line bunching. Vary the fabric roughness.
   - **Test:** fold shading visible in `crops/high/R08-CF` and `crops/high/R17-pitcher_hands`.
5. **G-face-hair-brows** (charfit, WS1, M, +0.5)
   - **Fix:** add eyebrows (geometry or albedo) and short hair cards or sideburns showing below the cap and helmet at LOD0 and LOD1. Use a skin albedo and roughness map with lip and brow tone instead of flat skin, with pale skin no brighter than the reference. Add a characters-only hemisphere fill so the eye sockets under a brim keep visible irises.
   - **Test:** compared with `mpfb2_athlete_face_34`; `crops/high/R09-LF`, `crops/high/R02-batter_head`.
6. **G-gear-construction** (characters, WS1, M, +0.5)
   - **Fix:**
     - Cleats with a sole plate, laces and tongue.
     - A laced glove with a web and pocket, and a round catcher's mitt.
     - A segmented, padded chest protector and shin guards with knee caps.
     - An umpire's mask fitted to the face, its bars ending at the chin.
   - **Test:** `crops/high/R05-batter_feet`, `crops/high/R06-catcher_glove`, `crops/high/R05-ump_head`.
7. **G-set-pose-clip** (characters, WS1, S, +0.25)
   - **Fix:** in the set and stance poses, keep the forearms in front of the belt strip, with the throwing hand closed on the ball inside the glove.
   - **Test:** no belt over the wrists and a ball visible in the hand in `crops/high/R17-pitcher_hands`.
8. **G-far-lod-switch** (charfit, WS6, S, +0.25)
   - **Fix:** on high desktop, lower the LOD1→LOD2 switch from about 70 px to 40 px of player height. At 60 px LOD2 is at 40.9% pixel error against LOD1's 21.8% (`fidelity.json`).
   - **Test:** high-desktop grounder stays ≤ 1.6 M triangles (currently 959k) and p95 ≤ 22 ms; medium is unchanged.
9. **G-run-field-transitions** (animation, WS2, M, +0.5)
   - **Fix:**
     - A blend of at least 0.2 s from run to fielding crouch.
     - In the trot, ±35° of arm swing with closed fists and torso counter-rotation.
     - The fielders' heads look at the ball.
   - **Test:**
     - no snap between frames 4 and 5 in `strips/high/R07`;
     - arm swing that alternates across `strips/high/R10`;
     - the left fielder faces the ball in `crops/high/R09-LF`.
10. **G-cap-shoulders** (charfit, WS1, M, +0.5)
    - **Fix:** model a six-panel cap with a lower crown, a button and a curved bill, separate from the helmet shell. Reduce the shoulder inflation on the kit toward the reference deltoid.
    - **Test:** `crops/high/R08-CF`, `high/desktop/R05`.
11. **G-crowd-and-stands** (environment, WS4, L, +1.0)
    - **Fix:**
      - Replace the photo crowd card with instanced fans at varied depth, plus a sharper atlas at the plate and on phones.
      - Texture the grey stand boxes.
      - Remove the haze seam and the grey ovals beyond the R15 fence.
      - Light or fog the night backdrop.
    - **Test:** `high/desktop/R05`, `high/desktop/R01`, `high/desktop/R15`, `high/desktop/R13`.
12. **G-field-camera-framing** (readability, WS5, S, +0.25)
    - **Fix:** keep the runner on first and the first baseman at least 5% inside the frame edge in the lead-off camera. Add a ground-ring or halo on a fly ball that is less than 6 px wide.
    - **Test:** `high/desktop/R16`, `high/desktop/R09`.

Below the line: low-tier lettering over the catcher's chest protector (WS6, low only), and the phone-GPU headroom check described under the perf gate.

```json
{
  "loop": 10,
  "role": "judge",
  "tier": "high",
  "scores": {
    "characters": {
      "score": 5.5,
      "confidence": 0.8,
      "evidence": [
        { "shot": "crops/high/R02-batter_hands", "note": "fingers curl round the bat; face readable under helmet; sawtooth sleeve edges; piping covers the I in SPRINGS" },
        { "shot": "crops/high/R17-pitcher_hands", "note": "buttons read; belt band over both forearms; open hand with no ball; mitten glove; no cloth folds" },
        { "shot": "crops/high/R05-batter_feet", "note": "glossy loafer shoes, no cleats or laces" },
        { "shot": "crops/high/R06-catcher_glove", "note": "chest protector reads as a jersey panel, blobby shin guards; crop half blocked by the batter's leg" },
        { "shot": "high/desktop/R05", "note": "27 mirrored here but correct on the same pitcher in high/desktop/R06: state-dependent decal bug" },
        { "shot": "crops/high/R10-batter-trot", "note": "eyes, nose and lips readable under the helmet; one body type" }
      ]
    },
    "charfit": {
      "score": 5.5,
      "confidence": 0.75,
      "evidence": [
        { "shot": "crops/high/R16-runner1", "note": "proportions match mpfb2_athlete_three_quarter (IoU 0.878/0.895)" },
        { "shot": "crops/high/R09-LF", "note": "no hair or brows, bleached skin vs mpfb2_athlete_face_34" },
        { "shot": "crops/high/R08-CF", "note": "inflated shoulders, tall cap crown, no si_jersey drape" },
        { "shot": "crops/high/R02-batter_hands", "note": "hand construction close to the reference hand" }
      ]
    },
    "animation": {
      "score": 5.5,
      "confidence": 0.8,
      "evidence": [
        { "shot": "strips/high/R03", "note": "leg lift and stride; strip ends before foot strike and release; ball out of the hand beside the knee in frame 7" },
        { "shot": "high/desktop/R06", "note": "ball in flight while the throwing arm is still laid back: release desync" },
        { "shot": "strips/high/R04", "note": "load, stride, contact flash at frame 3, heel pivot, high finish" },
        { "shot": "strips/high/R07", "note": "4-5 snap from run to deep crouch; glove tracks ball in 7, possession ring in 8" },
        { "shot": "strips/high/R10", "note": "planted feet, restrained open-handed arm carry, no torso counter-rotation" }
      ]
    },
    "environment": {
      "score": 5.5,
      "confidence": 0.8,
      "evidence": [
        { "shot": "high/desktop/R07", "note": "mow stripes, grained dirt, backstop, all bases" },
        { "shot": "high/desktop/R05", "note": "tiled, blurry photo crowd card above a blank grey band" },
        { "shot": "high/desktop/R15", "note": "distinct historic park; haze seam and unexplained grey ovals beyond the fence" },
        { "shot": "high/desktop/R01", "note": "untextured grey stand boxes, faceted trees" }
      ]
    },
    "lighting": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        { "shot": "crops/high/R05-batter_feet", "note": "contact darkening wraps both soles; left toe slightly lifted" },
        { "shot": "high/desktop/R12", "note": "night exposure with tower bloom and blue-hour sky" },
        { "shot": "high/desktop/R14", "note": "convincing golden afternoon" },
        { "shot": "high/desktop/R13", "note": "black void under the lit tree band; no haze" },
        { "shot": "crops/high/R02-batter_head", "note": "eyes lost under the brim in the head-down pose" }
      ]
    },
    "ui": {
      "score": 6.5,
      "confidence": 0.8,
      "evidence": [
        { "shot": "high/desktop/R03", "note": "consistent score bug, pitcher/batter line, FB 77 mph" },
        { "shot": "high/desktop/R15", "note": "HOME RUN / 396 FT banner with clear hierarchy" },
        { "shot": "high/desktop/R01", "note": "translucent title menu over a moving field" }
      ]
    },
    "readability": {
      "score": 6.0,
      "confidence": 0.8,
      "evidence": [
        { "shot": "high/desktop/R07", "note": "all four bases, ball and ringed runner at a glance" },
        { "shot": "strips/high/R07", "note": "ring turns white at possession in frame 8" },
        { "shot": "high/desktop/R16", "note": "runner and first baseman jammed at the right edge" },
        { "shot": "high/desktop/R09", "note": "fly ball is a dot against the scoreboard" }
      ]
    },
    "mobile": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        { "shot": "high/mobile/R02", "note": "large batter and zone, thumb-sized controls, readable HUD" },
        { "shot": "high/landscape/R02", "note": "buttons clear of the batter; feet and plate cropped by the viewport" },
        { "shot": "high/landscape/R05", "note": "CB button over the pitcher's legs" },
        { "shot": "high/mobile/R07", "note": "corner bases out of frame, small fielders" }
      ]
    }
  },
  "gaps": [
    { "id": "G-pitch-release-sync", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS2", "evidence": ["high/desktop/R06", "strips/high/R03"], "benchmark": "smb4-2", "fix": "Parent the ball to the throwing-hand bone until a release key after front-foot strike with the hand forward of the head; spawn the pitch flight from the hand's world position on that frame. Test: hand-to-ball distance < 0.3 ft on every pre-release frame; no free ball in R03 frame 7 or R06. Extend the R03 strip through release and follow-through." },
    { "id": "G-kit-seams-decals", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R02-batter_head", "crops/high/R02-batter_hands", "crops/high/R17-pitcher_hands", "high/desktop/R05"], "fix": "Replace per-triangle colour regions at collar, sleeve and sock top with texture-masked smooth boundaries; draw the wordmark above the placket piping; fix the state-dependent mirrored 27. Test: no sawtooth in R02-batter_head/R09-LF, all letters of SPRINGS and HAMILTON visible, 27 correct in high/desktop/R05." },
    { "id": "G-landscape-framing", "category": "mobile", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/landscape/R02", "high/landscape/R05", "high/mobile/R07", "high/landscape/R10"], "fix": "Landscape batting camera keeps the feet and plate in frame; pitch buttons never overlap the pitcher in landscape R05; portrait fielding camera keeps both corner bases in frame; HOME RUN banner clear of the in-world scoreboard in landscape R10." },
    { "id": "G-cloth-folds-normal", "category": "characters", "expectedGain": 0.75, "severity": 5, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R08-CF", "crops/high/R17-pitcher_hands"], "benchmark": "smb4-2", "fix": "Bake fold/crease/weave normal and AO maps for jersey and pants (sleeve hems, elbow, knee, crotch, belt-line bunching) with fabric roughness variation; fold shading must be visible in R08-CF and R17-pitcher_hands." },
    { "id": "G-face-hair-brows", "category": "charfit", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R09-LF", "crops/high/R02-batter_head", "crops/high/R10-batter-trot"], "benchmark": "art-src/samples/reference-renders/mpfb2_athlete_face_34.png", "fix": "Add eyebrows and short hair cards/sideburns below cap and helmet at LOD0/LOD1; skin albedo/roughness map with lip and brow tone, pale skin no brighter than the reference; characters-only hemisphere fill so irises stay visible under brims. Compare to mpfb2_athlete_face_34." },
    { "id": "G-gear-construction", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R05-batter_feet", "crops/high/R06-catcher_glove", "crops/high/R05-ump_head"], "benchmark": "smb3-3", "fix": "Cleats with sole plate, laces and tongue; laced glove with web and pocket plus a round catcher's mitt; segmented padded chest protector and shin guards with knee caps; umpire mask fitted to the face with bars ending at the chin." },
    { "id": "G-set-pose-clip", "category": "characters", "expectedGain": 0.25, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher_hands"], "fix": "In set and stance poses keep the forearms in front of the belt strip with the throwing hand closed on the ball inside the glove; no belt band over the wrists in R17-pitcher_hands." },
    { "id": "G-far-lod-switch", "category": "charfit", "expectedGain": 0.25, "severity": 2, "effort": "S", "workstream": "WS6", "evidence": ["high/desktop/R07", "high/desktop/R09"], "fix": "On high desktop lower the LOD1->LOD2 switch from ~70 px to 40 px player height (LOD2 40.9% vs LOD1 21.8% pixel error at 60 px in fidelity.json); high grounder must stay <= 1.6M tris and p95 <= 22 ms; medium unchanged." },
    { "id": "G-run-field-transitions", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["strips/high/R07", "strips/high/R10", "crops/high/R09-LF"], "fix": "Blend >= 0.2 s from run into fielding crouch (no snap at R07 frames 4-5); trot arm swing +/-35 deg with closed fists and torso counter-rotation; fielders' heads look at the ball (R09-LF)." },
    { "id": "G-cap-shoulders", "category": "charfit", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R08-CF", "high/desktop/R05"], "fix": "Six-panel cap with lower crown, button and curved bill separate from the helmet shell; reduce the kit's shoulder inflation toward the reference deltoid." },
    { "id": "G-crowd-and-stands", "category": "environment", "expectedGain": 1.0, "severity": 4, "effort": "L", "workstream": "WS4", "evidence": ["high/desktop/R05", "high/desktop/R01", "high/desktop/R15", "high/desktop/R13"], "benchmark": "smb4-3", "fix": "Instanced depth-varied fans replacing the photo card (sharper atlas at the plate and on phones); texture the grey stand boxes; remove the R15 haze seam and grey ovals; light or fog the night backdrop." },
    { "id": "G-field-camera-framing", "category": "readability", "expectedGain": 0.25, "severity": 3, "effort": "S", "workstream": "WS5", "evidence": ["high/desktop/R16", "high/desktop/R09"], "fix": "Lead-off camera keeps the runner on first and the 1B >= 5% inside the frame edge; add a ground ring or halo for a fly ball under 6 px on screen." }
  ],
  "calibration": {
    "perfGate": "pass (provisional, not verified): high desktop min 323.2 fps / p95 4.4 ms; medium phone proxy (4x CPU) min 52.0 fps, grounder p95 33.8 ms (watch); est. phone GPU from perf.json = medium-mobile grounder 1.082 ms x 25 = 27.05 ms, 4% over 26, in a run ~20% slower than loop 9 on desktop with no build cause; same-build repeat (perf-gpu-repeat.json, identical calls/tris) 30-80% slower everywhere, given zero weight as a measurement and full weight as proof of noise; duel-normalised estimate 21.6-24.0 ms <= 26; software GL 20.9/16.9 vs 19.9/15.1 baseline, better; heap 107.1/100.6/71.7 MB pass; tris high 1.196M <= 1.6M, medium 531k <= 650k; download not in perf.json. Loop 11 must re-measure on a verified quiet machine; grounder >= 1.04 ms then makes WS6 the top gap.",
    "factRulings": "R03 strip ends before foot strike and release (A wrong, B and advocate right; CHANGES claim not borne out); ball out of the hand in R03 frame 7 and in flight with arm laid back in R06 (judge-observed release desync); R04-batter ball at shoe is an approaching pitch seen from the side, desync not proven (A overstated); landscape R02 buttons clear, feet cropped by viewport (A wrong); R07 ring turns white at possession (advocate right); R10-batter-trot face readable, eyes lost only in head-down R02-batter_head (A overgeneralised); piping covers the I of SPRINGS (advocate right); 27 mirrored in R05 but correct on the same pitcher in R06 (state-dependent; advocate right on scope); R05-batter_feet contact darkening wraps both soles, left toe slightly lifted (B overstated); R09-LF ball still in flight (advocate right) but LF head turned away; LOD2 is used on high below ~70 px (advocate wrong, B partly right); low R06 lettering over chest protector (B right, low only); belt over forearms in R17 real",
    "effortWeights": "S=1, M=2, L=4"
  },
  "verdict": "continue"
}
```
