# Advocate: loop 10, high tier

Capture paths are relative to `screenshots/review-loop-10/`. I opened every capture cited below. I also opened `benchmarks/smb4-2.png` and the enlarged frames 7 and 8 of `strips/high/R03`.

## Summary

The two critics agree closely, and most of what they say holds up. The cloth has no folds. The cleats look like loafers and the gloves look like mittens. The crowd is a photo card, the trees are faceted, the stands are grey boxes, and the umpire's mask floats. I concede all of these. My corrections are mostly about facts, not scores:

- Critic A misread the pitch strip.
- Critic A blamed the landscape batting problem on the buttons. The viewport crop causes it.
- Critic A missed the possession cue in the R07 strip.
- Critic A overstated the "black faces" finding by relying on one head-down crop.
- Critic B used the LOD2 numbers, which belong to the low tier, against high-tier fidelity.

I propose small upward moves on environment, lighting and mobile, where the captures support more than the lower critic gave, and a small downward move on animation, where Critic A's 6.0 depends on a follow-through that isn't in the strip.

Critic means: characters 5.5, charfit 5.75, animation 5.75, environment 5.25, lighting 5.75, ui 6.5, readability 6.0, mobile 6.25.

---

## Characters (A 5.5, B 5.5, mean 5.5). Proposed 5.5

**Conceded, verified in the crops:**
- **No cloth folds.** Pants and jersey are smooth, even shading (`crops/high/R02-batter`, `crops/high/R08-CF`).
- **Shoes.** Glossy loafers with no laces, tongue or cleats (`crops/high/R05-batter_feet`).
- **Gloves.** Lumpy brown mittens with no web or lacing. The catcher's glove is a fielder's mitten shape, not a catcher's mitt (`crops/high/R06-catcher_glove`, `crops/high/R17-pitcher_hands`).
- **Catcher gear.** The chest protector reads as a blue jersey panel with a crumpled neck edge, and the shin guards are blue flaps (`crops/high/R06-catcher_glove`).
- **Umpire's mask.** The cage hangs below the chin and down over the chest (`crops/high/R05-ump_head`), and sits beside the cheek in `crops/high/R14-batter`.
- **Region edges.** Sawtooth edges at the collar and undershirt (`crops/high/R02-batter_head`) and a ragged sock top (`crops/high/R09-LF`).
- **Shoulders and caps.** Inflated shoulders and a helmet-shaped cap (`crops/high/R08-CF`).
- **Belt over the forearms.** The black belt band runs in front of the forearms between glove and hand (`crops/high/R17-pitcher_hands`).
- **Dark wrist nick.** Visible at the cuff (`crops/high/R16-runner1`).
- **Mirrored back number.** "27" is mirrored in `high/desktop/R05` and correct in `medium/desktop/R05` and `high/landscape/R05`.
- **Pitcher's hand.** Critic B is right that the set-position hand is splayed and open with no ball (`crops/high/R17-pitcher_hands`).
- **Body variety.** It is limited (`crops/high/R14-batter`, `crops/high/R16-runner1`).

**Rebutted or narrowed:**
- **"Faces near-black under helmets, no readable eyes" (A, defect 11).** This holds for one capture only. `crops/high/R02-batter_head` frames the batter looking down into the brim shadow. Two other crops show readable faces under helmets:
  - The same batter in `crops/high/R02-batter_hands` shows the eyes, nose and closed mouth.
  - `crops/high/R10-batter-trot`, which A cites as a black face, shows eyes, brow line, nose and lips clearly.

  `crops/high/R16-runner1` also shows a readable profile under the helmet. The defect is real, but it depends on the angle, not a general lack of fill light.
- **Scope of the mirrored number.** A calls it a "high-tier decal bug". Other high-tier back numbers read correctly: "19" in `high/desktop/R14` and "16" in `crops/high/R14-batter`. The bug is specific to this player and number, not the whole tier. Severity is unchanged and the fix is narrower.
- **Lettering under the piping.** In "HOT SPRINGS" the piping covers the **I**, not the R (`crops/high/R02-batter_hands`). The defect is real; the letter is wrong.

**Credit the critics gave correctly:** the fingers really wrap the bat (`crops/high/R02-batter_hands`), and the six placket buttons read (`crops/high/R17-pitcher_hands`). Against `benchmarks/smb4-2.png` (stitched glove, kit trim, cap construction), 5.5 is fair. I don't argue for more.

## Fidelity to reference (A 6.0, B 5.5, mean 5.75). Proposed 6.0

**Conceded:**
- The face falls well short of `mpfb2_athlete_face_34`: bleached skin, no brows (`crops/high/R09-LF`).
- The garments have none of the drape in `si_jersey_three_quarter`.
- The shoulder mass is inflated (`crops/high/R08-CF`).

**Rebutted:** Critic B argues that "LOD2's reported 33.6–40.9% pixel error also does not support fidelity across distances." LOD2 is the low tier, and this review scores high. The brief's table shows LOD0 and LOD1 near the aliasing floor:
- at 360 px: LOD1 6.6% against a floor of 3.7%;
- at 140 px: LOD1 11.2% against a floor of 9.1%;
- at 60 px: LOD1 21.8% against a floor of 20.5%.

The high tier holds its silhouette at every distance measured. The captures agree: `crops/high/R16-runner1` (lead-off crouch, about 360 px) and `high/desktop/R02` (about 140 px) keep the MPFB athlete proportions, and the IoU is 0.878 front and 0.895 side. The rubric's 7 anchor asks for "the same proportions and silhouette at every capture distance". That part is met. The face, hands and garment are not. That puts this at 6.0, not 5.5.

## Animation (A 6.0, B 5.5, mean 5.75). Proposed 5.5

**Critic A is factually wrong about `strips/high/R03`.** I enlarged frames 7 and 8:
- **Frame 7** is not a T-pose. The glove arm points toward the plate, the throwing arm is back behind the torso, and the stride leg reaches out.
- **Frame 8** is not a "landing follow-through". The stride foot is still in the air, short of the dirt. Both arms are spread with the throwing arm back, so this is the stride before foot strike.

The strip ends before release. Critic B is right, and the brief's claim that the strip "runs through release into the follow-through" is not borne out by the capture. In frame 7 a white ball also floats beside the lifted knee, away from both hands. That supports A's desync concern (G-pitch-swing-coil) rather than counting as a new defect.

**Desync conceded:** `crops/high/R04-batter` shows the ball at the front shoe while the batter is still loaded with the bat on his shoulder.

**Narrowed:**
- **Fielding.** B says the R07 crouch is "held similar" through panels 5–8. In `strips/high/R07` the glove travels to the ball in frame 7, and the ring turns white in frame 8 when the ball is fielded, so the panels do progress. B's point about the abrupt 4→5 change from run to deep crouch stands.
- **Trot.** A says the arms are "locked at the hip" in the trot. In `crops/high/R10-batter-trot` one hand is forward at the chest and the other back at the hip, which is opposite-arm carry. It is restrained, and `strips/high/R10` shows little swing across the cycle. So the defect is real, but it is "restrained", not "frozen".

**Credit:** the leg lift (R03 frames 4–6) and the contact flash and bat wrap (`strips/high/R04` frames 3–8) are real. With the pitch strip showing no release and a visible ball/swing desync, Critic A's 6.0 rests on evidence that isn't there. I propose 5.5.

## Environment (A 5.5, B 5.0, mean 5.25). Proposed 5.5

**Conceded:**
- The photo crowd card repeats (`high/desktop/R05`).
- Faceted trees sit against a photo horizon (`high/desktop/R11`).
- There is a haze seam where the backdrop meets the trees (`high/desktop/R09`, `high/desktop/R15`).
- The stands are untextured grey boxes (`high/desktop/R01`).
- The historic-park dugout is a black rectangle (`crops/high/R14-batter`).
- The grey ovals beyond the R15 fence read as an unexplained second field or lot (`high/desktop/R15`).

**Rebutted, Critic B's 5.0:** the rubric's 5 anchor is "a believable diamond and walls, crowd as a painted texture, trees as cones". The captures show more than that:
- checker mow stripes and grained dirt at field level (`high/desktop/R07`, `crops/high/R05-batter_feet`);
- built light towers and foul poles (`high/desktop/R02`);
- a backstop net and an outfield-wall rail (`high/desktop/R07`);
- six sponsor boards (`high/desktop/R05`);
- a working in-world scoreboard (`high/desktop/R09`);
- a distinct historic park with a textured outfield fence and a roofed grandstand (`high/desktop/R15`, `high/desktop/R14`).

The park is a half step above the 5 anchor and well below `smb4-3`. I propose 5.5, which matches Critic A.

## Lighting (A 6.0, B 5.5, mean 5.75). Proposed 6.0

**Conceded:**
- The night backdrop below the lit tree band is a black void (`high/desktop/R13`).
- The face of the head-down batter is lost (`crops/high/R02-batter_head`).
- Helmet specular is minimal.

**Rebutted or narrowed:**
- **Contact darkening.** B says the darkening is "visibly detached beneath the left shoe". In `crops/high/R05-batter_feet` the new contact darkening wraps the heel and sole edge of both shoes. The darker band trailing down-left of the left shoe is the cast shadow from the key light. The left toe does look slightly lifted, so "incomplete" is fair and "detached" is not.
- **Faces.** As argued under Characters, faces under brims model and read in `crops/high/R10-batter-trot` and `crops/high/R02-batter_hands`.
- **Positives B under-credits.** The night exposure in `high/desktop/R12` is solid: tower blooms, a blue-hour sky gradient, and a lit infield with a well-modelled batter. The fielders in `high/desktop/R13` cast long shadows from the towers. The golden afternoon in `high/desktop/R14` is convincing.

Those are most of the 7 anchor's ingredients except bounce and haze. I propose 6.0.

## UI (A 6.5, B 6.5). Proposed 6.5

Both critics agree.
- **Pitch feedback.** A says "no timing or pitch-result feedback in any captured frame". Pitch type and speed ("FB 77 mph") do show in `high/desktop/R03` and `high/desktop/R07`, and the aim reticle in `high/desktop/R05`. A ball/strike result banner is absent, so A's core point stands.
- **Title menu.** The translucent menu in `high/desktop/R01` is conceded.

## Readability (A 6.0, B 6.0). Proposed 6.0

**Rebutted, Critic A:**
- **Fielder with the ball.** A says "the fielder with the ball is not distinguished". `strips/high/R07` frame 8 shows the shortstop's ring switch from blue to white as he fields the ball, which is a possession cue.
- **R07 overview.** `high/desktop/R07` shows all four bases, the ball on the infield grass and the yellow-ringed runner at a glance.
- **Landscape batting.** A cites `high/landscape/R02` as "buttons cover batter feet and plate". That is wrong: STEAL ends near x≈425 and the batter stands at x≈590–760. The feet are cut off by the bottom of the viewport, as Critic B says, not by the buttons.

**Conceded:**
- In `high/desktop/R16` the runner and first baseman are jammed against the right edge.
- In `high/desktop/R09` the ball is a small dot against the scoreboard; only its ground shadow helps.
- In `high/mobile/R07` the corner bases and corner infielders are out of frame.

These hold the score at 6.0.

## Mobile (A 6.0, B 6.5, mean 6.25). Proposed 6.5

**Correction to Critic A:** the `high/landscape/R02` "BUNT and STEAL over the batter's feet" claim is false (see Readability). What is actually wrong there is that the batter's feet are cropped by the frame edge.

**Conceded, verified:**
- In `high/landscape/R05` the CB button covers the pitcher's legs.
- In `high/landscape/R10` the HOME RUN banner overlaps the in-world scoreboard. The ball sits just below the banner, still visible, so "on top of the ball's flight" is overstated.
- The landscape HUD drops the pitcher/batter line (`high/landscape/R02`).
- `high/mobile/R07` cuts the corner bases.

**Credit:**
- Portrait batting in `high/mobile/R02` has a large batter, zone and plate, thumb-sized BUNT/STEAL/SWING buttons, and a readable two-line HUD at 390 px. The sky is about a fifth of the screen, which B overstates.
- `high/mobile/R05` keeps the plate confrontation large.
- The throttled phone proxy holds 52 fps minimum (brief's perf table).

The only real overlap is the landscape R05 button. I propose 6.5, matching Critic B.

---

## Facts each critic got plainly wrong

**Critic A:**
1. `strips/high/R03` frame 8 is described as a "landing follow-through" and frame 7 as "T-arms". Frame 8 is the stride before foot strike with the arms spread, and frame 7 is glove-arm lead. The strip ends before release.
2. `high/landscape/R02` is described as buttons over the batter's feet and plate. The buttons are clear of the batter; the viewport crops the feet.
3. "The fielder with the ball is not distinguished." The ring changes to white on fielding in `strips/high/R07` frame 8.
4. "No readable eyes" in `crops/high/R10-batter-trot`. The eyes, nose and mouth are readable there.
5. The mirrored number is called a high-tier-wide bug. "19" and "16" read correctly on high in `high/desktop/R14` and `crops/high/R14-batter`.
6. The piping covers the "R" in HOT SPRINGS. It covers the "I" (`crops/high/R02-batter_hands`).
7. "LF running with an empty glove and no ball" (`crops/high/R09-LF`) is listed as a character defect. A small dark ball shadow sits on the grass at upper right of that crop, so the ball is still in flight. This is capture timing, not a model defect.

**Critic B:**
1. LOD2 pixel error is used against high-tier fidelity. LOD2 is the low tier; LOD0 and LOD1 sit near the aliasing floor.
2. In `crops/high/R05-batter_feet` the contact darkening is called "detached". It wraps both soles; the offset band is the cast shadow.

---

## Gap adjustments

| Gap | Critic | Original (gain / sev) | Adjusted (gain / sev) | Why |
|---|---|---|---|---|
| G-cloth-folds-normal | A | 1.0 / 5 | 0.75 / 5 | Real and the biggest visible deficit (`crops/high/R02-batter`, `R08-CF`). Folds alone won't lift characters a full point while the shoes, gloves and catcher gear stay as they are. |
| G-gear-materials | A | 0.5 / 4 | 0.5 / 4 | Confirmed (`crops/high/R05-batter_feet`, `R06-catcher_glove`). |
| G-region-edge-aliasing | A | 0.5 / 4 | 0.25 / 4 | Visible in every close-up, but it is a polish fix on its own. The covered letter is the "I" (`crops/high/R02-batter_hands`). |
| G-face-fill-light | A | 0.5 / 4 | 0.25 / 3 | Depends on the angle: faces read in `crops/high/R10-batter-trot`, `R02-batter_hands` and `R16-runner1`. The bleached pale skin in `R09-LF` stands. |
| G-mirrored-number | A | 0.25 / 3 | 0.25 / 3 | Real in `high/desktop/R05`. Scope it to that player's decal, not the whole tier (`high/desktop/R14` reads correctly). |
| G-ump-mask-fit | A | 0.25 / 3 | 0.25 / 3 | Confirmed (`crops/high/R05-ump_head`, `R14-batter`). |
| G-cap-shape | A | 0.5 / 3 | 0.5 / 3 | Confirmed (`crops/high/R08-CF`). |
| G-pitch-swing-coil | A | 0.5 / 4 | 0.5 / 4 | Stands. The cause is partly misdiagnosed: frame 7 isn't a T-pose. Add a check that the ball stays in the hand until release (it floats at the knee in R03 frame 7), and extend the R03 capture through actual release. |
| G-run-secondary | A | 0.5 / 3 | 0.25 / 3 | Arm carry exists (`crops/high/R10-batter-trot`); it is restrained, not frozen. |
| G-crowd-and-stands | A | 1.0 / 4 | 1.0 / 4 | Confirmed (`high/desktop/R05`, `R01`, `R15`). |
| G-wide-cam-figures | A | 0.5 / 3 | 0.25 / 2 | A possession cue exists (`strips/high/R07` frame 8) and `high/desktop/R07` shows all bases. What remains is the R16 edge clip and figure size. |
| G-landscape-overlap | A | 0.5 / 3 | 0.5 / 3 | Real in landscape R05 and R10, but in R02 the cause is the viewport crop of the feet, not the buttons. |
| G-night-backdrop | A | 0.25 / 2 | 0.25 / 2 | Confirmed (`high/desktop/R13`). |
| G-garments-gear | B | 1.0 / 5 | 0.75 / 5 | Overlaps A's cloth and gear gaps. |
| G-reference-detail | B | 1.0 / 5 | 0.5 / 4 | Proportions and the hand shape are already close (`crops/high/R16-runner1`, `R17-pitcher_hands`). The face is the main shortfall. |
| G-motion-weight | B | 1.0 / 4 | 0.5 / 4 | The R07 4→5 snap is real. The R03 coverage complaint is correct and is partly a capture problem. |
| G-park-coherence | B | 1.0 / 4 | 0.75 / 4 | Duplicates G-crowd-and-stands. The trees and horizon in `high/desktop/R11` are confirmed. |
| G-light-grounding | B | 1.0 / 4 | 0.5 / 3 | The contact darkening does reach the soles (`crops/high/R05-batter_feet`). The face point is angle-dependent. |
| G-field-framing | B | 0.5 / 3 | 0.25 / 3 | `high/mobile/R07` corner bases confirmed. The sky share in `high/mobile/R02` is about a fifth. |
| G-low-tier-seams | B | 0.5 / 4 | 0 / 3 | A real low-tier regression (`crops/low/R02-batter_head`), but no gain on the scored high tier. |

```json
{
  "loop": 10,
  "role": "advocate",
  "tier": "high",
  "scores": {
    "characters": {
      "score": 5.5,
      "confidence": 0.8,
      "evidence": [
        { "shot": "crops/high/R02-batter_hands", "note": "fingers wrap bat, buttons read; face readable under helmet here; sawtooth sleeve edges; piping covers the I in HOT SPRINGS" },
        { "shot": "crops/high/R06-catcher_glove", "note": "mitten glove, chest protector reads as jersey, shin-guard flaps (conceded)" },
        { "shot": "crops/high/R05-batter_feet", "note": "loafer shoes, no cleats (conceded)" },
        { "shot": "crops/high/R10-batter-trot", "note": "eyes, nose and mouth readable under the helmet, against critic A defect 11" },
        { "shot": "high/desktop/R05", "note": "27 mirrored; high/desktop/R14 19 reads correctly, so the bug is per decal, not tier-wide" }
      ]
    },
    "charfit": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        { "shot": "crops/high/R16-runner1", "note": "MPFB athlete proportions hold at close range" },
        { "shot": "high/desktop/R02", "note": "proportions hold at ~140 px; LOD1 11.2% vs 9.1% floor (LOD2 numbers are low tier)" },
        { "shot": "crops/high/R09-LF", "note": "face bleached, no brows vs mpfb2_athlete_face_34 (conceded)" },
        { "shot": "crops/high/R08-CF", "note": "inflated shoulders, no drape vs si_jersey (conceded)" }
      ]
    },
    "animation": {
      "score": 5.5,
      "confidence": 0.75,
      "evidence": [
        { "shot": "strips/high/R03", "note": "leg lift reads; strip ends at stride before foot strike, no release; ball floats by knee in frame 7" },
        { "shot": "crops/high/R04-batter", "note": "ball at front shoe while batter still loaded: desync" },
        { "shot": "strips/high/R04", "note": "contact flash and bat wrap finish" },
        { "shot": "strips/high/R07", "note": "abrupt 4->5 run-to-crouch; glove tracks ball in 7, ring turns white in 8" },
        { "shot": "strips/high/R10", "note": "planted feet, restrained arm carry" }
      ]
    },
    "environment": {
      "score": 5.5,
      "confidence": 0.75,
      "evidence": [
        { "shot": "high/desktop/R07", "note": "mow stripes, grained dirt, backstop net, wall rail: above the 5 anchor" },
        { "shot": "high/desktop/R15", "note": "distinct historic park with textured fence; haze seam and odd grey ovals (conceded)" },
        { "shot": "high/desktop/R05", "note": "tiled photo crowd card (conceded)" },
        { "shot": "high/desktop/R11", "note": "faceted trees vs photo horizon (conceded)" }
      ]
    },
    "lighting": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        { "shot": "high/desktop/R12", "note": "solid night exposure: tower bloom, blue-hour sky, lit infield and batter" },
        { "shot": "high/desktop/R14", "note": "convincing golden afternoon" },
        { "shot": "crops/high/R05-batter_feet", "note": "contact darkening wraps both soles; offset band is cast shadow" },
        { "shot": "high/desktop/R13", "note": "tower-cast fielder shadows; black void under tree band (conceded)" }
      ]
    },
    "ui": {
      "score": 6.5,
      "confidence": 0.75,
      "evidence": [
        { "shot": "high/desktop/R07", "note": "score bug with pitch type and speed (FB 77 mph)" },
        { "shot": "high/desktop/R10", "note": "HOME RUN banner hierarchy" },
        { "shot": "high/desktop/R01", "note": "translucent menu over busy scene (conceded)" }
      ]
    },
    "readability": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        { "shot": "high/desktop/R07", "note": "all four bases, ball and ringed runner read at a glance" },
        { "shot": "strips/high/R07", "note": "fielder ring turns white on fielding: possession cue exists" },
        { "shot": "high/desktop/R16", "note": "runner jammed at right edge (conceded)" },
        { "shot": "high/desktop/R09", "note": "ball a small dot against scoreboard (conceded)" }
      ]
    },
    "mobile": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        { "shot": "high/mobile/R02", "note": "large batter and zone, thumb buttons, readable HUD; sky about a fifth" },
        { "shot": "high/landscape/R02", "note": "buttons clear of batter; feet cropped by viewport edge" },
        { "shot": "high/landscape/R05", "note": "CB button over pitcher legs (conceded)" },
        { "shot": "high/mobile/R07", "note": "corner bases out of frame (conceded)" }
      ]
    }
  },
  "gaps": [
    { "id": "G-cloth-folds-normal", "category": "characters", "expectedGain": 0.75, "severity": 5, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R02-batter", "crops/high/R08-CF"], "benchmark": "smb4-2", "fix": "Bake fold/crease/weave normal + AO maps for jersey and pants with fabric roughness variation; verify in R02-batter and R08-CF close-ups." },
    { "id": "G-gear-materials", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R05-batter_feet", "crops/high/R06-catcher_glove", "crops/high/R17-pitcher_hands"], "benchmark": "smb3-3", "fix": "Cleats with sole plate, laces and tongue; laced glove with web and a distinct catcher's mitt; leather normal and roughness maps." },
    { "id": "G-region-edge-aliasing", "category": "characters", "expectedGain": 0.25, "severity": 4, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R02-batter_head", "crops/high/R02-batter_hands", "crops/high/R09-LF"], "fix": "Texture-masked smooth boundaries at collar, sleeve and sock; draw the wordmark above the placket piping (the I in HOT SPRINGS is covered)." },
    { "id": "G-face-fill-light", "category": "lighting", "expectedGain": 0.25, "severity": 3, "effort": "S", "workstream": "WS3", "evidence": ["crops/high/R02-batter_head", "crops/high/R09-LF", "crops/high/R10-batter-trot"], "benchmark": "smb3-3", "fix": "Add hemisphere fill so head-down poses under brims keep the eyes; re-grade pale skin. Faces already read in R10-batter-trot and R02-batter_hands." },
    { "id": "G-mirrored-number", "category": "characters", "expectedGain": 0.25, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["high/desktop/R05", "high/desktop/R14"], "fix": "Fix the 27 back-number decal on the R05 pitcher; other high-tier numbers (19, 16) already read correctly." },
    { "id": "G-ump-mask-fit", "category": "characters", "expectedGain": 0.25, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R05-ump_head", "crops/high/R14-batter"], "fix": "Fit the mask to the face with forehead/chin pads and the cage ~2 in off the face; stop the bars running down over the chest." },
    { "id": "G-cap-shape", "category": "charfit", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R08-CF", "crops/high/R12-pitcher"], "fix": "Six-panel cap with lower crown, button and curved bill; reduce kit shoulder inflation." },
    { "id": "G-pitch-swing-coil", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["strips/high/R03", "strips/high/R04", "crops/high/R04-batter"], "benchmark": "smb4-2", "fix": "Hip-shoulder separation at stride; keep the ball in the hand until release (it floats at the knee in R03 frame 7); sync the swing so the bat crosses the zone as the ball arrives; extend the R03 capture through the actual release and follow-through." },
    { "id": "G-run-secondary", "category": "animation", "expectedGain": 0.25, "severity": 3, "effort": "S", "workstream": "WS2", "evidence": ["strips/high/R10", "crops/high/R10-batter-trot"], "fix": "Increase arm swing amplitude and add torso counter-rotation and bob; opposite-arm carry already exists." },
    { "id": "G-crowd-and-stands", "category": "environment", "expectedGain": 1.0, "severity": 4, "effort": "L", "workstream": "WS4", "evidence": ["high/desktop/R05", "high/desktop/R01", "high/desktop/R15", "high/desktop/R09"], "benchmark": "smb4-3", "fix": "Instanced depth-varied fans; texture the grey stand boxes; remove the backdrop haze seam and the grey ovals beyond the R15 fence." },
    { "id": "G-wide-cam-figures", "category": "readability", "expectedGain": 0.25, "severity": 2, "effort": "M", "workstream": "WS5", "evidence": ["high/desktop/R16", "high/desktop/R09", "strips/high/R07"], "fix": "Keep the lead runner inside the R16 frame and enlarge figures on wide follows; the possession ring already exists (R07 frame 8)." },
    { "id": "G-landscape-overlap", "category": "mobile", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/landscape/R02", "high/landscape/R05", "high/landscape/R10"], "fix": "Raise the landscape batting camera so the feet aren't cropped; move the pitch buttons off the pitcher in R05; keep the HOME RUN banner off the scoreboard; restore the pitcher/batter line." },
    { "id": "G-night-backdrop", "category": "lighting", "expectedGain": 0.25, "severity": 2, "effort": "S", "workstream": "WS3", "evidence": ["high/desktop/R13"], "benchmark": "smb4-1", "fix": "Light or fog the night outfield backdrop so there is no black void under the lit tree band." },
    { "id": "G-garments-gear", "category": "characters", "expectedGain": 0.75, "severity": 5, "effort": "L", "workstream": "WS1", "evidence": ["crops/high/R02-batter_hands", "crops/high/R06-catcher_glove", "crops/high/R05-batter_feet"], "benchmark": "benchmarks/smb3-3.png; art-src/samples/reference-renders/si_jersey_three_quarter.png", "fix": "Cloth volume, seams, folds and material variation; rebuilt glove webbing, helmet guards and laced cleats (overlaps G-cloth-folds-normal and G-gear-materials)." },
    { "id": "G-reference-detail", "category": "charfit", "expectedGain": 0.5, "severity": 4, "effort": "L", "workstream": "WS1", "evidence": ["crops/high/R02-batter_head", "crops/high/R09-LF", "crops/high/R16-runner1"], "benchmark": "art-src/samples/reference-renders/mpfb2_athlete_face_34.png", "fix": "Preserve reference face detail (brows, eye definition, skin tone) and add body-type variety; proportions and hand shape already track the reference." },
    { "id": "G-motion-weight", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "L", "workstream": "WS2", "evidence": ["strips/high/R07", "strips/high/R03", "strips/high/R10"], "benchmark": "benchmarks/smb4-2.png", "fix": "Blend deceleration into the fielding crouch (R07 4->5); fix R03 capture coverage so release and follow-through appear." },
    { "id": "G-park-coherence", "category": "environment", "expectedGain": 0.75, "severity": 4, "effort": "L", "workstream": "WS4", "evidence": ["high/desktop/R05", "high/desktop/R11"], "benchmark": "benchmarks/smb4-3.png", "fix": "Replace stretched crowd rows and near cone foliage; integrate the photographic horizon (overlaps G-crowd-and-stands)." },
    { "id": "G-light-grounding", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["crops/high/R05-batter_feet", "crops/high/R02-batter_head", "high/desktop/R13"], "benchmark": "benchmarks/smb3-4.png", "fix": "Settle the left-toe lift in the batting stance and add sky fill for head-down poses; the contact darkening already reaches the soles." },
    { "id": "G-field-framing", "category": "readability", "expectedGain": 0.25, "severity": 3, "effort": "M", "workstream": "WS5", "evidence": ["high/mobile/R07", "high/desktop/R16"], "benchmark": "benchmarks/backyard97-1.png", "fix": "Widen or offset the portrait fielding camera so the corner bases stay in frame; keep the R16 runner inside the frame." },
    { "id": "G-low-tier-seams", "category": "characters", "expectedGain": 0, "severity": 3, "effort": "L", "workstream": "WS6", "evidence": ["crops/low/R02-batter_head", "crops/low/R06-catcher_glove"], "benchmark": "High-tier equivalents; low-tier regression, no gain on the scored high tier.", "fix": "Derive low meshes from the same proportions and material boundaries and hide lettering under the chest protector." }
  ],
  "verdict": "continue"
}
```
