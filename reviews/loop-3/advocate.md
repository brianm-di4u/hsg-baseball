# Advocate review: loop 3, high tier

Capture paths are relative to `screenshots/review-loop-3/`. Critic means used for the ±1 bound: characters 4.75, charfit 5.25, animation 5.0, environment 5.0, lighting 5.5, ui 6.25, readability 5.75, mobile 6.0.

**Summary.** Both critics are mostly right about the character kit. I concede the scalp showing through caps, the fingers through the glove, the loafers, the floating masks, the sawtooth trim and the stance feet off the ground. Several of their supporting claims, though, are wrong or blame the wrong cause. The backstop net exists. The home-run camera shows the ball. The trotting runner's arms are bent. The faces under helmets show their features. A low-tier proxy was used to mark down a high-tier score. The fly-ball "catch" crop was taken before the catch. These corrections move animation, lighting and readability up by half a point each. I propose no change beyond half a point anywhere.

## Characters (critic mean 4.75), proposed 5.0

- **Concede:**
  - **Scalp through the cap.** Visible on the pitcher in `crops/high/R17-pitcher-back`, the umpire in `crops/high/R05-batter-front` and `crops/high/R14-batter`, and the foreground pitcher in `high/desktop/R14`.
  - **Fingertips through the glove.** Visible in `crops/high/R17-pitcher_hands`.
  - **Footwear.** Glossy loafers in `crops/high/R05-batter_feet`.
  - **Masks.** Ladder masks float off the face in `crops/high/R14-batter` and `crops/high/R05-ump_head`.
  - **Neckline.** The umpire's bare shoulder shows through the neckline cut in `crops/high/R05-ump_head`.
  - **Trim.** Sawtooth cuffs in `crops/high/R02-batter_hands`.
  - **Back number.** None on the pitcher's back in `high/desktop/R05`.
- **Rebut Codex's "prevents even a clean, consistent 5".** The 5 anchor asks for separate fingers or a modelled glove, a readable cap and helmet, color-block uniforms and simple, non-uncanny faces. The build exceeds that on faces and hands:
  - Lips, nose and eyes read in `crops/high/R09-LF` and `crops/high/R16-1B`.
  - Jointed fingers interlock on the handle in `crops/high/R14-batter`.
  - Shoulder, hip and knee structure carries through a full stride in `crops/high/R12-pitcher`.
  - The defects are clipping and gear, which pull the score down to 5, not below it.
- **Codex's grip claim is plainly wrong.** It says the grip "does not convincingly wrap both hands", citing `crops/high/R02-batter_hands` and `crops/high/R14-batter`. In both, the fingers of both hands close around the handle, stacked. Critic A cites the same crops as hands that grip the bat.
- **Score:** 5.0, Critic A's figure.

## Fidelity to reference (critic mean 5.25), proposed 5.5

- **Concede:**
  - Garments are far simpler than `si_jersey_front`.
  - The glove is a slab next to `mpfb2_athlete_hand`; see `crops/high/R06-catcher_glove`.
- **Proportions match at duel and close range.** `crops/high/R12-pitcher` and `crops/high/R16-1B` track `mpfb2_athlete_three_quarter`, consistent with the brief's IoU of 0.875/0.901. LOD0 and LOD1 hold IoU ≥ 0.995 at 140 px.
- **Critic A applied the wrong tier.** It used `crops/low/R02-batter_head`, the cartoon low-tier proxy, as evidence for the high-tier `charfit` score. RUBRIC.md scores high and checks low only for regressions. That is a real regression finding, and it should be recorded as one. It doesn't lower the high-tier fidelity score.
- **Score:** 5.5. Without the low-tier crop, Critic A's own reasoning lands at 5.5.

## Animation (critic mean 5.0), proposed 5.5

- **Concede:**
  - The stance feet hover above their shadows (`crops/high/R05-batter_feet`).
  - In `strips/high/R04`, frames 1–4 show almost no load or stride.
  - The contact bloom in frame 5 sits below the ball, as Codex says.
  - `strips/high/R03` ends before release.
- **Rebut A, "near arm hangs almost straight in every frame":** wrong. In `crops/high/R10-batter-trot` both elbows are bent at roughly 90°: the lead hand is up at the chest and the trailing forearm drives back past the hip. The same bent-arm drive is visible in `strips/high/R10`, frames 1, 4 and 8. The planted contact foot also lands inside its shadow in frames 1, 5 and 7.
- **Rebut A, "frames 1–5 near-static set" in `strips/high/R03`:** overstated. The pitcher turns from side-on with the glove forward (frames 1–2) to square with the glove at the chest (frames 3–5). The lift and extension follow in frames 6–8. Frame 8's extended leg is the start of the stride; `crops/high/R12-pitcher` shows that stride completed, with a bent drive knee, a cocked throwing arm and the glove arm leading. That is the 7 anchor's "leg lift, stride" weight transfer.
- **Rebut A, "glove never meets ball" in `strips/high/R07`:** partly wrong. In frame 7 the ball sits about a glove-width ahead of the glove at ground level. Possession, shown by the white ring, arrives in frame 8 with the ball between the glove and the feet. The miss is real but small.
- **Wrong cause: the fly-ball "catch."** `crops/high/R09-LF` doesn't show a failed catch animation. `high/desktop/R09` shows the ball still high near the scoreboard, with its shadow on the grass and the left fielder under it. The capture fired before the catch; Codex also notes that the ball is still high. That frame is evidence about capture timing, not about the reach.
- **Feel elements present:**
  - The contact flash and the ball streak (`strips/high/R04`, frames 5–8).
  - The camera following the ball (`high/desktop/R10`, `high/desktop/R15`).
  - Dust is absent.
- **Score:** 5.5, within the bound.

## Environment (critic mean 5.0), proposed 5.0

- **Concede:**
  - The crowd is a tiled photo billboard with a vertical seam (`high/desktop/R05`).
  - Trees are cones and spheres against a photo backdrop (`high/desktop/R10`).
  - The wall behind home is bare grey (`high/desktop/R05`).
  - The batter's eye is a black box (`high/desktop/R10`).
  - There are odd discs and shards beyond the historic wall (`high/desktop/R15`).
- **Rebut A, "no backstop net":** plainly wrong. A net grid is visible behind home plate in `high/mobile/R07` (across the dirt below home), on the wall in `high/desktop/R14`, and above the wall in `crops/high/R02-batter_head` (upper left).
- **Rebut A, "camera blockers" in `high/desktop/R07`:** overstated. The dark green slabs are the dugout roofs and fences, cut off at the left and right frame edges. They cover no player, base or ball.
- **Credit:**
  - Mow checkers and dirt grain (`high/desktop/R07`).
  - Built towers, foul poles and an ivy/wood historic wall (`high/desktop/R15`).
- **Score:** these are 7-anchor items, but the crowd and trees match the 5 anchor literally, so I hold 5.0.

## Lighting (critic mean 5.5), proposed 6.0

- **Concede:**
  - The night batting view `high/desktop/R12` is evenly lit, with sprite halos.
  - There is little haze or grade.
- **Wrong cause: faces "black" under helmets.**
  - `crops/high/R02-batter_head` is shot from above and behind the brim, so the helmet geometry hides the face. The lips and chin that do show are lit.
  - `crops/high/R02-batter_hands` shows the same batter's mouth and jaw clearly.
  - In `crops/high/R10-batter-trot` the eyes, nose and mouth of a dark-skinned runner read under the helmet.
  - The truly blacked-out face, in `crops/high/R05-batter-front`, comes from the helmet's flat black ear-flap plane across the cheek: a model defect (`G-masks-helmets`), not missing fill.
- **Credit:**
  - Night pools with falloff and several soft shadows per player (`high/desktop/R13`, the fielder near second).
  - Contact shadows under fielders (`crops/high/R16-1B`).
  - A golden key that models faces (`crops/high/R14-batter`).
- **Score:** 6.0.

## UI (critic mean 6.25), proposed 6.5

- **Concede:**
  - The title panel is translucent, with a low-contrast "Season" button (`high/desktop/R01`).
  - The team bars in the scorebug are mostly empty.
- **Rebut A, "HR banner over an empty outfield":** the banner sits over a ball-flight shot. The ball is visible clearing the wall in `high/desktop/R10` (left of the batter's eye) and in `high/desktop/R15` (beside the light tower). The panel's headline/detail hierarchy and accent bar are clear in both.
- **Credit:**
  - Consistent scorebug, count, pitch speed and labelled controls (`high/desktop/R05`, `high/desktop/R02`).
- **Score:** 6.5, Codex's figure. The landscape info line A cites belongs under mobile.

## Readability (critic mean 5.75), proposed 6.0

- **Concede:**
  - Field-view fielders are about 15 px tall (`high/desktop/R07`).
  - Possession isn't marked distinctly.
  - The home-run trot isn't framed (`high/desktop/R10`).
- **Rebut A, "the runner on first is the only cue" in `high/desktop/R16`:** wrong. A second runner stands near second base in the middle of the frame, and the bug's diamond lights both bases. The runner on first is at the frame edge because of where the catcher's-eye camera sits.
- **Credit:**
  - The ball's green trail (`high/desktop/R08`).
  - The ball's ground shadow under the fly (`high/desktop/R09`).
  - The ball dot in `high/mobile/R07`, larger than on desktop.
  - Zone, batter and pitcher clear in `high/desktop/R02` and `high/mobile/R02`.
- **Score:** 6.0.

## Mobile (critic mean 6.0), proposed 6.0

- **Concede:**
  - In `high/landscape/R07`, the top and bottom bars take about a third of the height and the info line is dropped.
  - In `high/mobile/R07`, the bottom fifth of the frame is dirt, net and grass.
  - In `high/mobile/R02`, about a fifth of the frame is sky.
- **Credit:**
  - Portrait and landscape duel frames are large, with thumb-sized buttons (`high/mobile/R02`, `high/landscape/R05`).
  - The phone proxy holds 48 fps minimum.
- **Score:** 6.0, the mean.

## Gaps (merged, adjusted)

- **`G-character-construction`** is split into its specific parts:
  - `G-cap-scalp-clip`, `G-glove-model` and `G-jersey-construction` cover the cap, glove and garment-edge defects.
  - What remains under `G-character-construction` is lettering clipping and the umpire's neckline. Its gain drops to 0.3 so the gains aren't counted twice.
- **`G-glove-model`** goes to severity 4: the fingers show through the glove only in `R17-pitcher_hands`. In `crops/high/R12-pitcher` and `crops/high/R16-1B` the glove hides the hand.
- **`G-reference-kit`** drops to severity 4 and a gain of 0.5: proportions already match, and its kit items overlap the WS1 gaps.
- **`G-cleats-feet-plant` and `G-contact-grounding`** merge into `G-contact-grounding`. Gain 0.5, since the run and the pitch already plant their feet. The bat-grip constraint is dropped because the grip already reads.
- **`G-glove-reach-hits-ball`** drops to severity 3. The R07 miss is small, and R09 needs a correctly timed capture before its evidence counts.
- **`G-face-fill-under-brim` and `G-night-contrast`** merge into `G-exposure-grounding`, at a gain of 0.5. The face loss is partly geometry, which is `G-masks-helmets`.
- **`G-backstop-crowd` and `G-park-construction`** merge. The backstop net is removed from the fix, because the net already exists.
- **`G-field-cam-readability` and `G-field-context`** merge. The landscape info line moves to `G-mobile-space`.

```json
{
  "loop": 3,
  "role": "advocate",
  "tier": "high",
  "verdict": "continue",
  "scores": {
    "characters": {"score": 5.0, "confidence": 0.75, "evidence": [
      {"shot": "crops/high/R14-batter", "note": "real faces, fingers interlocked on the handle; ump scalp clip and floating ladder mask"},
      {"shot": "crops/high/R12-pitcher", "note": "readable shoulder/hip/knee structure through a full stride"},
      {"shot": "crops/high/R17-pitcher-back", "note": "scalp through cap crown (conceded)"},
      {"shot": "crops/high/R17-pitcher_hands", "note": "fingertips through slab glove (conceded)"},
      {"shot": "crops/high/R05-batter_feet", "note": "glossy loafers (conceded)"}
    ]},
    "charfit": {"score": 5.5, "confidence": 0.7, "evidence": [
      {"shot": "crops/high/R12-pitcher", "note": "proportions track mpfb2_athlete_three_quarter; IoU 0.875/0.901"},
      {"shot": "crops/high/R16-1B", "note": "face and silhouette the same kind of human as the reference"},
      {"shot": "crops/high/R06-catcher_glove", "note": "gear and garments far simpler than reference"},
      {"shot": "crops/low/R02-batter_head", "note": "low-tier cartoon proxy: a regression note, not high-tier charfit evidence"}
    ]},
    "animation": {"score": 5.5, "confidence": 0.6, "evidence": [
      {"shot": "strips/high/R10", "note": "bent-arm drive and planted contact feet in frames 1, 4, 5, 7, 8"},
      {"shot": "crops/high/R10-batter-trot", "note": "both elbows bent ~90 degrees; contradicts 'arm hangs straight'"},
      {"shot": "strips/high/R03", "note": "turn to set in frames 1-5, lift and extension in 6-8; ends before release"},
      {"shot": "crops/high/R12-pitcher", "note": "stride with drive knee, cocked arm, glove lead"},
      {"shot": "strips/high/R04", "note": "no visible load in frames 1-4; bloom below ball in frame 5 (conceded)"},
      {"shot": "strips/high/R07", "note": "glove about a glove-width from ball in frame 7, possession in frame 8"},
      {"shot": "crops/high/R05-batter_feet", "note": "stance feet hover (conceded)"}
    ]},
    "environment": {"score": 5.0, "confidence": 0.75, "evidence": [
      {"shot": "high/desktop/R05", "note": "tiled photo crowd with seam, bare grey wall (conceded)"},
      {"shot": "high/mobile/R07", "note": "backstop net is present behind home, contrary to Critic A"},
      {"shot": "high/desktop/R07", "note": "mow checkers, dirt grain; edge slabs are dugout roofs, not blocking action"},
      {"shot": "high/desktop/R10", "note": "cone trees, black-box batter's eye (conceded)"}
    ]},
    "lighting": {"score": 6.0, "confidence": 0.6, "evidence": [
      {"shot": "high/desktop/R13", "note": "night pools with falloff, multiple soft shadows per player"},
      {"shot": "crops/high/R14-batter", "note": "golden key models faces"},
      {"shot": "crops/high/R10-batter-trot", "note": "eyes, nose, mouth read under helmet; not a black void"},
      {"shot": "crops/high/R05-batter-front", "note": "the blacked-out face comes from the ear-flap plane geometry, not missing fill"},
      {"shot": "high/desktop/R12", "note": "night batting view evenly lit, sprite halos (conceded)"}
    ]},
    "ui": {"score": 6.5, "confidence": 0.7, "evidence": [
      {"shot": "high/desktop/R10", "note": "HR panel hierarchy over a ball-flight shot; ball visible at the wall"},
      {"shot": "high/desktop/R05", "note": "consistent bug, count, labelled pitch controls"},
      {"shot": "high/desktop/R01", "note": "translucent, low-contrast title menu (conceded)"}
    ]},
    "readability": {"score": 6.0, "confidence": 0.65, "evidence": [
      {"shot": "high/desktop/R08", "note": "ball trail, runner ring"},
      {"shot": "high/desktop/R16", "note": "runner near second in frame center; bug lights both bases"},
      {"shot": "high/desktop/R09", "note": "ball ground shadow locates the fly"},
      {"shot": "high/desktop/R07", "note": "fielders ~15 px, no possession marker (conceded)"}
    ]},
    "mobile": {"score": 6.0, "confidence": 0.7, "evidence": [
      {"shot": "high/mobile/R02", "note": "large batter and zone, thumb-sized buttons; about a fifth sky"},
      {"shot": "high/landscape/R05", "note": "clean landscape duel with large controls"},
      {"shot": "high/landscape/R07", "note": "bars take about a third of the height, info line dropped (conceded)"},
      {"shot": "high/mobile/R07", "note": "small fielders, bottom fifth empty (conceded)"}
    ]}
  },
  "gaps": [
    {"id": "G-cap-scalp-clip", "category": "characters", "expectedGain": 0.5, "severity": 5, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher-back", "crops/high/R05-batter-front", "high/desktop/R14"], "fix": "Hide or shrink scalp under caps (cap-region mask or crown offset); zero skin pixels inside the cap silhouette in R17-pitcher-back, R05-batter-front and R14."},
    {"id": "G-glove-model", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R06-catcher_glove"], "benchmark": "smb3-3", "fix": "Modelled glove (pocket, web, lacing, leather normal map); curl or hide fingers so no skin shows through in R17-pitcher_hands."},
    {"id": "G-jersey-construction", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R02-batter_hands", "crops/high/R17-pitcher_hands", "high/desktop/R05"], "benchmark": "smb4-4", "fix": "Smooth edge-loop neckline and cuffs (no sawtooth), placket and buttons, belt loops and buckle, fold normals, back number visible in high/desktop/R05."},
    {"id": "G-character-construction", "category": "characters", "expectedGain": 0.3, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R02-batter_hands", "crops/high/R05-ump_head"], "benchmark": "smb4-2; smb4-4", "fix": "Residual after the split into cap, glove and jersey gaps: keep chest lettering on the garment and unclipped across poses; close the umpire's neckline so no shoulder skin shows in R05-ump_head."},
    {"id": "G-masks-helmets", "category": "characters", "expectedGain": 0.3, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R05-ump_head", "crops/high/R14-batter", "crops/high/R05-batter-front"], "fix": "Framed mask with pads and strap attached to the head; one solid batting-helmet ear flap that does not cover the face (R05-batter-front); matte brim instead of the white visor band."},
    {"id": "G-body-variety", "category": "characters", "expectedGain": 0.3, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["high/desktop/R05", "crops/high/R16-1B"], "benchmark": "smb4-4", "fix": "At least 3 distinct builds via MPFB shape keys (stocky, tall-lean, average) assigned per player."},
    {"id": "G-reference-kit", "category": "charfit", "expectedGain": 0.5, "severity": 4, "effort": "L", "workstream": "WS1", "evidence": ["crops/high/R09-LF", "crops/high/R16-1B", "crops/high/R05-batter_feet"], "benchmark": "mpfb2_athlete_three_quarter; mpfb2_athlete_hand; hbm_male_realistic_face_34", "fix": "Keep the reference anatomy (already matched); bring garment, glove and cleat construction toward si_jersey and the reference hand; verify turnaround and duel-distance comparisons."},
    {"id": "G-contact-grounding", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["crops/high/R05-batter_feet", "strips/high/R04"], "benchmark": "smb3-3; smb4-2", "fix": "Foot IK in the stance (sole-to-ground gap 0 px in R05-batter_feet); align the contact flash with the ball in strips/high/R04 frame 5; cleat model with sole and laces goes to WS1."},
    {"id": "G-glove-reach-hits-ball", "category": "animation", "expectedGain": 0.3, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["strips/high/R07", "high/desktop/R09"], "fix": "IK target at the actual ball intercept so the glove is within one ball width at possession in strips/high/R07; retime the R09 capture to the catch tick before judging the fly-ball reach."},
    {"id": "G-swing-load-visible", "category": "animation", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS2", "evidence": ["strips/high/R04"], "fix": "Visible hands-back load and front-foot stride across strip frames 1-4; dust puff at the plant foot."},
    {"id": "G-exposure-grounding", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["high/desktop/R12", "crops/high/R02-batter_head"], "benchmark": "smb3-4; smb4-1", "fix": "Merged with G-face-fill-under-brim and G-night-contrast: stronger pool falloff and helmet/ball specular in the night batting view (R12); modest sky fill under brims; verify after the ear-flap fix, since part of the face loss is geometry."},
    {"id": "G-park-construction", "category": "environment", "expectedGain": 1.0, "severity": 4, "effort": "L", "workstream": "WS4", "evidence": ["high/desktop/R05", "high/desktop/R10", "high/desktop/R15"], "benchmark": "smb3-1; smb4-3", "fix": "Merged with G-backstop-crowd: replace tiled crowd billboards with layered cards or impostors with no seam; replace cone/sphere trees and hide the backdrop seam; pad and sign the wall behind home; dress the batter's eye; fix the discs beyond the historic wall. The backstop net already exists."},
    {"id": "G-field-context", "category": "readability", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS5", "evidence": ["high/desktop/R07", "high/desktop/R10", "high/mobile/R07"], "benchmark": "smb3-1; backyard97-1", "fix": "Merged with G-field-cam-readability: a distinct possession marker; cut from ball flight to the HR trot once the ball lands; crop the empty foreground in portrait field view so fielders are at least 20 css px."},
    {"id": "G-mobile-space", "category": "mobile", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["high/landscape/R07", "high/mobile/R02", "high/mobile/R07"], "fix": "Reduce landscape bar height and restore the pitcher/batter/pitch-speed info line in landscape; trim portrait sky; keep thumb-sized controls."},
    {"id": "G-menu-type", "category": "ui", "expectedGain": 0.5, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R01", "high/desktop/R05"], "benchmark": "ootp26-1", "fix": "Opaque, higher-contrast title panel and selected state; tighten the empty score-bug bars; refine the secondary type scale."}
  ]
}
```
