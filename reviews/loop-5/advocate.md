# Advocate: loop 5, high tier

Capture paths are relative to `screenshots/review-loop-5/`. I opened every capture cited below.

## Summary

Both critics are mostly right. The characters are well short of their gates, and I concede the large majority of the defect list: floating umpire and catcher masks, flat helmet ear flaps, broken wordmarks, hovering cleats in the stance, an oven-mitt glove, a stocky build with balloon arms, and a cartoon low-tier model. Neither critic inflated anything.

Critic A does make several plain factual errors, and they all push the score in one direction:
- It read a pre-swing freeze as a swing that is out of sync with the ball.
- It called a ball at its release point a smear far from the pitcher.
- It said the HR banner hides the ball when the ball is visible below it.
- It said every helmeted or capped face is crushed to black.

Critic B (Codex) denies that three body types are visible, but they are. With those claims corrected, animation, lighting, readability and mobile deserve about half a point more than the critics' mean. Characters and environment stand.

## Category by category

### characters: critics 5.0 / 5.0, mean 5.0, proposed 5.0

**Concede:**
- Ear flaps are flat black cards, and the brim is a chrome-white strip (`crops/high/R02-batter_head`, `crops/high/R10-batter-trot`).
- The umpire's bars start at lip level and hang down to the chest protector. A bare skin shoulder shows where the shirt should be (`crops/high/R05-ump_head`).
- The catcher's cage runs from the brow down to the glove (`crops/high/R06-catcher_glove`). The umpire's mask in `crops/high/R14-batter` hangs off the side of the face.
- The wordmark reads "LAKF HAMII TON", there are chest bulges, and the belt edge is a sawtooth (`crops/high/R17-pitcher_hands`). "HC T SPRI'GS" floats off the torso (`crops/high/R02-batter_hands`).
- The glove has stalls for thumb, index, middle and ring-pinky. But the padded web the brief describes is not readable from this angle, and there is no pocket or lacing (`crops/high/R17-pitcher_hands`).
- The catcher wears the same fielder's glove (`crops/high/R06-catcher_glove`).
- Both cleats hover, with the shadows offset below (`crops/high/R05-batter_feet`).

**Rebut (Codex):** "three clearly differentiated builds are not convincingly demonstrated." This is wrong.
- `crops/high/R17-pitcher-back` is tall, narrow and long-legged.
- `crops/high/R08-CF` is broad, barrel-chested and thick-armed.
- `crops/high/R16-1B` is in between.

That part of the 7 anchor (at least three body types) is met.

**Partial rebut (Critic A):** "the bat does not pass through closed fists."
- In `crops/high/R14-batter` the bat enters the top fist and the fingers curl over it.
- The forearm X in a front-on stance is partly real batting anatomy.
- The grip is still loose and stacked in `crops/high/R02-batter_hands`.

**Also visible:** material contrast (glossy helmet, matte flannel, leather), separate fingers with knuckles on the bare hand, belts, socks and piping.

The construction faults keep this off "clean". 5.0 stands.

### charfit: critics 5.0 / 5.5, mean 5.25, proposed 5.5

**Concede:**
- The stocky build has inflated deltoids and upper arms against the tapered shoulders of `art-src/samples/reference-renders/mpfb2_athlete_three_quarter.png` (`crops/high/R08-CF`, `crops/high/R12-pitcher`).
- Garments are far simpler than the reference.
- LOD2 pixel error is 38–45%.

**Rebut (Critic A):** "faces are never recognisable as the reference human … dark voids."
- `crops/high/R09-LF` shows a modelled nose, brow, ear and lips with the same head-to-neck proportion as `mpfb2_athlete_three_quarter.png`.
- `crops/high/R14-batter` shows readable profile features on the batter, catcher and umpire.
- `crops/high/R12-pitcher` shows a dark-skinned face whose nose and lips stay readable at night.

The voids are a lighting problem specific to a black helmet over dark skin (`crops/high/R02-batter_head`). They are not a geometry miss. Proportions hold from broadcast distance (`high/desktop/R05`) to close-up (`crops/high/R16-1B`), consistent with IoU of 0.875 and 0.900.

### animation: critics 5.0 / 5.0, mean 5.0, proposed 5.5

**Rebut (Critic A):** "ball at the batter's ankles while the bat is still cocked: swing out of sync." This is a misread.
- `high/desktop/R04`, the same frozen moment, shows the ball just past the mound with the pitcher in follow-through. The batter has not started his swing.
- In `crops/high/R04-batter` the ball is nearly as wide as a cleat, so it sits far in front of the batter, toward the camera. It is not at his feet.
- The freeze is pre-swing. It proves nothing about sync.

**Rebut:** "stride, release and follow-through are not shown."
- They are not in `strips/high/R03`, but the delivery exists elsewhere.
- `crops/high/R12-pitcher` has a long stride off the rubber with the throwing arm cocked high.
- `high/desktop/R06` has the release, with the front knee bent, the glove arm tucked and the ball leaving the hand.

**Rebut:** "locked elbows, a shuffle."
- In `crops/high/R10-batter-trot` both elbows are bent about 90° and the arms are in opposite phase.
- The amplitude is small, so I accept a lower-severity gap.

**Rebut (Codex):** "uncertain support-foot contact" in general.
- `crops/high/R16-1B` and `crops/high/R17-pitcher-back` have planted feet on their shadows.
- `strips/high/R10` frames 1, 4 and 7 have the support foot on the ground.

**Concede:**
- `strips/high/R04` frames 1–4 show no readable load or stride, and the bat jumps between frames 4 and 5. Frames 6–8 do show a rear-foot pivot and a finish, with the contact flash.
- The R07 crouch arrives abruptly. The camera reframes between `strips/high/R07` frames 4 and 5, which suggests a longer time gap, but it is still abrupt.
- The stance hover in `crops/high/R05-batter_feet` is real.

With a leg lift, stride, release, a readable run and field beats (the ring turns white on the catch in R07 frame 8), this sits between the 5 and 7 anchors: 5.5.

### environment: critics 5.5 / 5.5, mean 5.5, proposed 5.5

**Concede:**
- The crowd is a photo billboard, and it visibly repeats in `high/mobile/R05`.
- The stands are grey boxes (`high/desktop/R07`).
- There are unexplained grey-blue discs past right field (`high/desktop/R15`).
- The pitcher's rubber is a raised slab (`crops/high/R12-pitcher`, `crops/high/R17-pitcher-back`).

**Partial rebut:** the pines in `high/desktop/R15` and `crops/high/R09-LF` are tiered rather than flat cones, and the hardwoods are clustered masses. The "flat black cones" in `crops/high/R02-batter` are backlit silhouettes.

**Also visible:** mow checkerboard, dirt grain, foul poles, light towers, distance markers and a dugout (`crops/high/R14-batter`). 5.5 stands.

### lighting: critics 5.5 / 5.0, mean 5.25, proposed 5.5

**Rebut (Critic A):** "every helmeted face crushed to black."
- `crops/high/R10-batter-trot`, which A itself cites, shows the nose and lips.
- Faces are modelled in `crops/high/R14-batter` under the golden key and in `crops/high/R16-1B`.
- The truly black case is the black helmet over dark skin under the brim in `crops/high/R02-batter_head`, and even there the lips and chin read.

**Also visible:** contact shadows sit under planted feet (`crops/high/R16-1B`), and helmets carry specular (`crops/high/R05-catcher`).

**Concede:**
- The night in `high/desktop/R12` is evenly lit, almost like day.
- `high/desktop/R13` has tower pools but falls to pure black beyond the wall.
- No bounce fill is visible.

5.5 is fair against the 5 anchor (key, shadows, sky) plus a partial 7 (contact shadows, golden grade).

### ui: critics 6.0 / 6.5, mean 6.25, proposed 6.5

**Rebut (Critic A):** "the HR banner covers the ball."
- In `high/landscape/R10` the ball is visible just below the banner's lower edge.
- In `high/desktop/R15` the ball is to the right of the banner, by the light tower.
- It is crowded, not hidden.

**Concede:**
- The in-world scoreboard is clipped by the HUD band (`high/desktop/R07`).
- Landscape drops the pitcher, speed and batter line (`high/landscape/R12`).
- The rails are heavy.

**Also visible:** a consistent bug, count pips, a bases diamond, a pitch-speed readout ("FB 77 mph") and a pitch count (`high/desktop/R04`, `high/desktop/R16`).

### readability: critics 6.0 / 5.5, mean 5.75, proposed 6.0

**Rebut (Critic A):** "released ball is a smear far to the left of the pitcher." In `high/desktop/R06` the ball sits just above the pitcher's throwing hand at release, with a short speed trail.

**Rebut (Codex):** "similar rings weaken active-receiver identification." The fielder's ring turns white when he fields the ball (`strips/high/R07` frame 8).

**Partial rebut:** the runner on first in `high/desktop/R16` is at the edge but visible, and the HUD diamond lights first base.

**Concede:**
- The ball merges with the scoreboard in `high/desktop/R13`.
- Fielders are tiny in `high/mobile/R07`.
- Gap-chase figures are small in `strips/high/R08`.

### mobile: critics 6.5 / 6.0, mean 6.25, proposed 6.5

**Rebut:**
- The ball is visible in `high/landscape/R10`.
- The large foreground pitcher in `high/mobile/R05` is the deliberate over-the-shoulder pitching camera that desktop also uses (`high/desktop/R05`), not a framing accident.
- `high/landscape/R05` shows the floating pad giving the field most of the height.
- The 4× throttle proxy holds 51 and 77 fps.

**Concede:**
- The CB button clips the pitcher's legs (`high/landscape/R05`).
- The corner bags are off-frame and the lower third is empty dirt (`high/mobile/R07`).
- The landscape info line is missing.

## Facts the critics got plainly wrong
1. Critic A: "ball at the ankles while the bat is cocked" (`crops/high/R04-batter`). It is a pre-swing freeze with the ball near the camera (`high/desktop/R04`).
2. Critic A: "released ball is a smear far left of the pitcher" (`high/desktop/R06`). It is at the hand.
3. Critic A: "HR banner covers the ball" (`high/landscape/R10`). The ball is visible below it.
4. Critic A: "every helmeted face crushed to black." Features read in `crops/high/R10-batter-trot` and `crops/high/R12-pitcher`.
5. Critic A: "forearms frozen, locked elbows" (`crops/high/R10-batter-trot`). The elbows are bent about 90° and alternate.
6. Codex: "three builds not convincingly demonstrated." `crops/high/R17-pitcher-back`, `crops/high/R16-1B` and `crops/high/R08-CF` differ clearly.

## Gaps: merges and adjustments
- **G-contact-and-transitions** absorbs G-feet-grounding. The stance hover is the concrete defect. The run-foot claim is overstated, so the gain falls from 1.5 to 0.6.
- **G-swing-load-stride** stays, but its cause is now the frames 4–5 jump and the missing load, not desync. Severity 4, gain 0.5.
- **G-run-arm-pump** drops to severity 1, gain 0.2.
- **G-hands-and-equipment** is split into the specific A gaps: G-hands-grip-bat, G-mask-fit, G-glove-leather and G-helmet-flaps-brim. G-mask-fit is the most visible and cheapest, and stays at severity 4.
- **G-uniform-construction** absorbs G-cloth-folds. Its gain falls from 1.5 to 0.6, because the lettering is covered by G-wordmark-glyphs.
- **G-stocky-anatomy** absorbs G-reference-anatomy. The three-builds premise was false.
- **G-face-fill-light** and **G-night-exposure** absorb G-exposure-and-grounding. The face problem is limited to dark helmets over dark skin, so it drops to severity 3, gain 0.4.
- **G-crowd-stands** absorbs G-crowd-and-park-depth.
- **G-field-awareness** absorbs G-runner-framing.
- **G-hr-banner-ball** drops to severity 1, gain 0.1, because the ball is not hidden.
- **G-low-tier-continuity** absorbs G-lowtier-model. Confirmed in `crops/low/R02-batter`, which shows big cartoon eyes and sock-stump feet. Gain is 0 at the high tier.

```json
{
  "loop": 5,
  "role": "advocate",
  "tier": "high",
  "verdict": "continue",
  "scores": {
    "characters": {
      "score": 5.0,
      "confidence": 0.8,
      "evidence": [
        {"shot": "crops/high/R05-ump_head", "note": "mask bars hang from lip to chest; bare skin at the shoulder (concede)"},
        {"shot": "crops/high/R17-pitcher_hands", "note": "stalled glove with no pocket or lacing; broken wordmark glyphs; good bare hand"},
        {"shot": "crops/high/R08-CF", "note": "stocky build, clearly unlike lean crops/high/R17-pitcher-back and average crops/high/R16-1B: 3 builds visible"},
        {"shot": "crops/high/R14-batter", "note": "the bat enters the top fist; grip loose; umpire mask hangs off the face"}
      ]
    },
    "charfit": {
      "score": 5.5,
      "confidence": 0.65,
      "evidence": [
        {"shot": "crops/high/R09-LF", "note": "nose, brow, ear and lips modelled; head and neck proportions match mpfb2_athlete_three_quarter"},
        {"shot": "crops/high/R12-pitcher", "note": "face readable at night; balloon deltoids unlike the reference (concede)"},
        {"shot": "high/desktop/R05", "note": "proportions hold at broadcast distance; IoU 0.875/0.900"}
      ]
    },
    "animation": {
      "score": 5.5,
      "confidence": 0.6,
      "evidence": [
        {"shot": "strips/high/R04", "note": "no visible load in 1-4 and a jump at 4-5 (concede); pivot, finish and flash in 6-8"},
        {"shot": "high/desktop/R04", "note": "the R04 freeze is pre-swing: ball just past the mound, so crops/high/R04-batter is not a desync"},
        {"shot": "crops/high/R12-pitcher", "note": "long stride off the rubber with the arm cocked: the delivery has weight transfer"},
        {"shot": "high/desktop/R06", "note": "release pose with the ball leaving the hand"},
        {"shot": "strips/high/R07", "note": "run reads; abrupt crouch at 4-5; ring turns white on the catch"}
      ]
    },
    "environment": {
      "score": 5.5,
      "confidence": 0.75,
      "evidence": [
        {"shot": "high/desktop/R07", "note": "mow stripes, dirt grain, towers, foul poles; grey box stands"},
        {"shot": "high/mobile/R05", "note": "repeating photo crowd tile (concede)"},
        {"shot": "high/desktop/R15", "note": "tiered pines and clustered hardwoods; unexplained discs beyond RF (concede)"}
      ]
    },
    "lighting": {
      "score": 5.5,
      "confidence": 0.65,
      "evidence": [
        {"shot": "crops/high/R14-batter", "note": "golden key models the faces of batter, catcher and umpire"},
        {"shot": "crops/high/R16-1B", "note": "contact shadows under planted feet; face readable"},
        {"shot": "crops/high/R02-batter_head", "note": "black helmet over dark skin crushes the eyes; lips still read"},
        {"shot": "high/desktop/R12", "note": "night evenly lit, almost like day (concede)"}
      ]
    },
    "ui": {
      "score": 6.5,
      "confidence": 0.6,
      "evidence": [
        {"shot": "high/desktop/R04", "note": "consistent bug, count, bases diamond, pitch speed and count lines"},
        {"shot": "high/landscape/R10", "note": "ball visible just below the HR banner, not hidden"},
        {"shot": "high/desktop/R07", "note": "in-world scoreboard clipped by the HUD band (concede)"},
        {"shot": "high/landscape/R12", "note": "info line dropped in landscape (concede)"}
      ]
    },
    "readability": {
      "score": 6.0,
      "confidence": 0.65,
      "evidence": [
        {"shot": "high/desktop/R06", "note": "ball at the pitcher's hand at release with a short trail, not a stray smear"},
        {"shot": "strips/high/R07", "note": "the active fielder's ring turns white on the catch"},
        {"shot": "high/desktop/R16", "note": "1B runner at the edge but visible; HUD diamond lit"},
        {"shot": "high/mobile/R07", "note": "tiny fielders; corner bags off-frame (concede)"}
      ]
    },
    "mobile": {
      "score": 6.5,
      "confidence": 0.65,
      "evidence": [
        {"shot": "high/mobile/R02", "note": "readable batter and HUD; thumb-sized buttons"},
        {"shot": "high/landscape/R05", "note": "floating pad gives the field most of the height; CB button clips the pitcher's legs"},
        {"shot": "high/landscape/R10", "note": "ball visible below the banner"},
        {"shot": "high/mobile/R07", "note": "small fielders; empty lower third"}
      ]
    }
  },
  "gaps": [
    {"id": "G-swing-load-stride", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["strips/high/R04"], "benchmark": "smb4-2", "fix": "Author a load (hands back) and stride in R04 frames 2-4 and a continuous hip-first rotation in place of the 4-to-5 pose jump. Cause is the missing load, not desync: the R04 freeze is pre-swing."},
    {"id": "G-contact-and-transitions", "category": "animation", "expectedGain": 0.6, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["crops/high/R05-batter_feet", "strips/high/R07"], "benchmark": "smb4-3", "fix": "Merged with G-feet-grounding. Foot-lock IK so the stance soles meet the ground (0 px gap in R05-batter_feet), plus an approach-plant-gather blend into the fielding crouch in R07."},
    {"id": "G-run-arm-pump", "category": "animation", "expectedGain": 0.2, "severity": 1, "effort": "S", "workstream": "WS2", "evidence": ["crops/high/R10-batter-trot", "strips/high/R10"], "fix": "Elbows are already bent about 90 degrees; increase the shoulder swing amplitude to about plus or minus 45 degrees, counter-phased to the legs."},
    {"id": "G-mask-fit", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R05-ump_head", "crops/high/R06-catcher_glove", "crops/high/R14-batter"], "benchmark": "smb3-1", "fix": "Parent the masks to the head bone with a frame, chin and forehead pads, cage spanning brow to chin. Also covers the mask part of G-hands-and-equipment."},
    {"id": "G-hands-grip-bat", "category": "characters", "expectedGain": 0.4, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["crops/high/R02-batter_hands", "crops/high/R14-batter"], "fix": "Merged with the grip part of G-hands-and-equipment. IK both palms to a handle socket with fingers curled to bat radius; the bat axis passes through both fists."},
    {"id": "G-glove-leather", "category": "characters", "expectedGain": 0.4, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R06-catcher_glove"], "benchmark": "smb3-3", "fix": "Make the web readable from the front, add a pocket cavity, lacing and binding, and a separate round catcher's mitt. Merged with the glove part of G-hands-and-equipment."},
    {"id": "G-helmet-flaps-brim", "category": "characters", "expectedGain": 0.4, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R02-batter_head", "crops/high/R10-batter-trot"], "fix": "Curved ear-flap shell continuous with the helmet; brim in the helmet material with low metalness."},
    {"id": "G-wordmark-glyphs", "category": "characters", "expectedGain": 0.4, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R02-batter_hands"], "fix": "SDF or higher-resolution decal that conforms to the torso; LAKE HAMILTON and HOT SPRINGS fully legible; no sawtooth belt edge."},
    {"id": "G-uniform-construction", "category": "characters", "expectedGain": 0.6, "severity": 3, "effort": "L", "workstream": "WS1", "evidence": ["crops/high/R02-batter", "crops/high/R17-pitcher_hands", "crops/high/R10-batter-trot"], "benchmark": "smb4-4", "fix": "Merged with G-cloth-folds. Fitted collar, stable placket, belt hardware, fold normal maps at the elbow, knee and waist. Gain reduced: lettering is handled by G-wordmark-glyphs."},
    {"id": "G-stocky-anatomy", "category": "charfit", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R08-CF", "crops/high/R12-pitcher", "crops/high/R17-pitcher_hands"], "benchmark": "mpfb2_athlete_three_quarter", "fix": "Merged with G-reference-anatomy (its premise that the three builds are not visible was false). Cap the deltoid and upper-arm muscle morph, flatten the pectoral bulge under the jersey."},
    {"id": "G-face-fill-light", "category": "lighting", "expectedGain": 0.4, "severity": 3, "effort": "S", "workstream": "WS3", "evidence": ["crops/high/R02-batter_head", "high/desktop/R02"], "benchmark": "smb3-3", "fix": "Merged with the face part of G-exposure-and-grounding. Dirt-bounce or character fill so eyes read under dark helmets on dark skin; other faces already read (R14, R12, R16)."},
    {"id": "G-night-exposure", "category": "lighting", "expectedGain": 0.4, "severity": 3, "effort": "S", "workstream": "WS3", "evidence": ["high/desktop/R12", "high/desktop/R13"], "benchmark": "smb4-1", "fix": "Merged with the night part of G-exposure-and-grounding. Lower the night ambient, add tower falloff between pools, lift the beyond-wall surround from pure black."},
    {"id": "G-crowd-stands", "category": "environment", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS4", "evidence": ["high/mobile/R05", "high/desktop/R07", "high/desktop/R15"], "benchmark": "smb4-3", "fix": "Merged with G-crowd-and-park-depth. Instanced impostor crowd with tint variation and no tile repeat; rails, aisles and fascia on the stands; explain or remove the RF discs."},
    {"id": "G-field-awareness", "category": "readability", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS5", "evidence": ["high/mobile/R07", "high/desktop/R16", "high/desktop/R13"], "benchmark": "ootp26-1", "fix": "Merged with G-runner-framing. Frame the corner bags in portrait fielding (use the empty lower third), keep the 1B runner inside the batting frame, separate the ball from the scoreboard in night views. Active-receiver highlight already exists on the catch."},
    {"id": "G-hr-banner-ball", "category": "ui", "expectedGain": 0.1, "severity": 1, "effort": "S", "workstream": "WS7", "evidence": ["high/landscape/R10", "high/desktop/R15"], "fix": "Ball is visible below the banner; offset the banner from the ball's projected path only for margin."},
    {"id": "G-mobile-hud", "category": "mobile", "expectedGain": 0.4, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["high/landscape/R05", "high/landscape/R12"], "benchmark": "ootp26-1", "fix": "Restore a compact pitcher, speed and batter line in landscape; keep the pitch buttons off the pitcher's silhouette."},
    {"id": "G-low-tier-continuity", "category": "charfit", "expectedGain": 0.0, "severity": 2, "effort": "M", "workstream": "WS6", "evidence": ["crops/low/R02-batter", "low/desktop/R12"], "fix": "Merged with G-lowtier-model. Low tier uses a decimated LOD of the same rig with cleats instead of a big-eyed footless cartoon model; no effect on the high-tier score."}
  ]
}
```
