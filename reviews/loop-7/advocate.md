# Advocate: loop 7, high tier

Capture paths are relative to `screenshots/review-loop-7/`. I opened every capture cited below before citing it.

## Summary

Most of what the critics say is true, and I concede most of it. The shoulder slabs, the mitten gloves, the flat cloth, piping through the lettering, the jagged cleat decals, the cuff tears, the hovering stance foot and the cartoon low-tier head are all plainly visible. My main corrections:

1. **Mobile performance is now measured, and it passes.** The phone proxy at 4x CPU throttle holds 67 fps minimum on medium (worst p95 17.3 ms) and 139 fps on low. That meets the "phone proxy holds 30 fps" part of the mobile 7 anchor. Neither critic could credit it.
2. **Critic A got the umpire's mask position wrong.** In `crops/high/R05-batter-front` and `crops/high/R14-batter`, the cage sits in front of the umpire's face, in profile. It does not hang at the side of his head. The real defect is the segmented, gapped bars in `crops/high/R05-ump_head`.
3. **A few claims are overstated.** These cover the R04 contact flash, the R07 catch beat, the landscape R12 buttons and the "pure black" face. Details are below.

Means of the two critics: characters 5.25, charfit 5.25, animation 5.75, environment 5.25, lighting 5.75, ui 6.25, readability 5.75, mobile 5.75.

## Characters (A 5.5, B 5.0; proposed 5.5)

**Concede:**
- **Shoulder slabs** (both critics). `crops/high/R02-pitcher` is the clearest case: two rounded humps rise above the deltoids like football pads. `crops/high/R17-pitcher_hands` shows the same thing. Loop 7's shoulder change has not fixed this.
- **Gloves** (both critics). In `crops/high/R06-catcher_glove` the catcher's mitt is a brown fist with no pocket. In `crops/high/R17-pitcher_hands` the glove is a set of sausage fingers.
- **Flat cloth** (both critics). In `crops/high/R17-pitcher_hands` the uniform is flat colour with no folds or grain. The belt's lower edge is faceted.
- **Piping through the lettering** (A). The stripe crosses "HAM" in `crops/high/R17-pitcher_hands`, "SPRINGS" in `crops/high/R02-batter_hands` and "BARNSTORMERS" in `crops/high/R14-batter`. Loop 7's decal offset change has not fixed it.
- **Wordmark runs off the chest** (A). It reads "LAKESIDI" in `crops/high/R02-pitcher` and "AKESIDE" in `crops/high/R07-SS`.
- **Cleats and socks** (both critics). The cleat decals are stair-stepped and the sock-to-cleat seam is saw-toothed in `crops/high/R05-batter_feet` and `crops/high/R02-pitcher`.
- **Cuff tear** (A). A white spike pokes out at the wrist in `crops/high/R16-1B` and `crops/high/R02-batter_hands`.
- **Umpire mask bars** (both critics). They are segmented, with tan gaps, in `crops/high/R05-ump_head`.
- **Helmet edge** (both critics). In `crops/high/R02-batter_head` the dark side shell still reads as a hanging strip from the front.
- **Catcher's gear** (both critics). In `crops/high/R06-catcher_glove` the chest protector's neck opening is jagged and the shin guards flare like boots.

**Rebut:**
- **Umpire mask position: Critic A is plainly wrong.** A says the mask "hangs off to the side of the umpire's face" in `crops/high/R05-batter-front` and `crops/high/R14-batter`. Both captures are profile views. In both, the cage projects forward of the face, from brow to chin, which is where a real mask sits. `crops/high/R05-ump_head` also shows the cage in front of the mouth and chin.
- **Bat grip** (B: "fingers curl beside the handle with visible spaces"). This is partly overstated. In `crops/high/R14-batter` and `crops/high/R05-batter-front`, both hands are stacked on the handle with the fingers wrapped round it. `crops/high/R02-batter_hands` is the weakest angle. A also credits the grip there.
- **Loop 7 changes that do show.**
  - The continuous helmet ear shell shows in `crops/high/R10-batter-trot`.
  - Lit faces have readable eyes, nose and mouth in `crops/high/R07-SS`, `crops/high/R09-LF` and `crops/high/R14-batter`.
  - There is skin-tone variety, and a female batter with a ponytail appears in `high/desktop/R12`.
  - The pitcher in `crops/high/R02-pitcher` is visibly heavier than the lean left fielder in `crops/high/R09-LF`. "One build" is overstated, although three distinct builds are not established.

**Proposed: 5.5.** That is above the 5 anchor (separate fingers, a modelled glove, readable helmets, faces that are not uncanny). It stays well below 7 because of the cloth, gloves and shoulders.

## Charfit (A 5.5, B 5.0; proposed 5.5)

**Concede:**
- The shoulder line diverges from `mpfb2_athlete_three_quarter` (`crops/high/R02-pitcher`).
- Garments are far simpler than `si_jersey_three_quarter`.
- The hands lack taper and joint definition (`crops/high/R17-pitcher_hands`).

**Rebut, partly:**
- At duel distance the proportions hold, and the faces are recognisably MPFB-derived. Compare `crops/high/R14-batter` and `crops/high/R09-LF` with the reference faces.
- The objective numbers support "same proportions at every distance" at LOD0 and LOD1:
  - IoU is 0.878 (front) and 0.889 (side).
  - LOD1 stays within 0.005 IoU of LOD0 at 360, 140 and 60 px.
- LOD2 is the exception, at 41–48% pixel error. B's low-tier finding is real but belongs to the low tier: `crops/low/R02-batter_head` is a cartoon sphere head with googly eyes. It should not pull the high-tier score below the 5 anchor's "proportions roughly right".

**Proposed: 5.5.**

## Animation (A 6.0, B 5.5; proposed 6.0)

**Concede:**
- **Stance feet** (B, against A). In `crops/high/R05-batter_feet` the left cleat is clearly off the dirt, with its shadow detached. The right cleat is barely grounded. The loop 7 stance foot-planting change is not demonstrated in this capture. A's "front foot planting looks better" is not supported.
- **Run-to-crouch pop** (B). `strips/high/R07` jumps from an upright run in panel 4 to a deep crouch in panel 5.
- **Stiff run arms** (A). In `strips/high/R10` the lead arm stays at the chest in all 8 panels.
- **Pitch strip** (both critics). `strips/high/R03` ends at the leg lift, so the stride and release are not shown.

**Rebut:**
- **R04 contact flash (B: "spatially detached from a convincing bat–ball encounter").** In `strips/high/R04` panel 5, the flash is centred where the bat barrel meets the ball in front of the plate. Panels 6–8 then show rotation, the back-foot pivot and a high finish. This is the clearest "swing that sells contact" in the set.
- **R07 catch beat (A: "the ball rolls past behind his glove hand").** In `strips/high/R07` panel 7, the ball sits on the dirt just in front of the reaching glove. In panel 8 it is gone from the ground, which matches the new in-glove possession. The beat is weak, but it is there.
- **Ready-clip planting does work.** In `crops/high/R16-1B` both cleats sit flat with contact shadows. In `strips/high/R10` the support foot plants inside the ring with a grounded shadow in every panel.

**Proposed: 6.0.**

## Environment (A 5.5, B 5.0; proposed 5.5)

**Concede all the main points:**
- The overlapping ad boards read "GATOR FATORS" (`crops/high/R02-batter_hands`). In `high/desktop/R05` the bat crosses "VALLEY TIRE & LUBE", which is fine, but the boards are visibly clipped at the sides.
- There is a hard seam between the painted forest and the 3D trees (`high/desktop/R15`, `high/desktop/R09`).
- A flat second field shows past the fence (`high/desktop/R15`).
- The stands are untextured grey (`high/desktop/R01`).
- The photo crowd is upscaled on the phone (`high/mobile/R05`).

**Mild rebut:**
- `high/desktop/R14` and `crops/high/R14-batter` show a distinct historic park: a wooden-roofed grandstand, a dugout opening and an autumn palette. With `high/desktop/R07` (mow pattern, dirt grain, built poles and towers), the diamond itself meets much of the 7 anchor. The backdrop and the crowd do not.

**Proposed: 5.5.**

## Lighting (A 6.0, B 5.5; proposed 6.0)

**Concede:**
- The batter's eyes are lost under the brim (`crops/high/R02-batter_head`).
- In `high/desktop/R13`, one tower's pool lights the infield while the outfield corners and tree band go black.

**Rebut:**
- **"Almost pure black" (A) is overstated.** In `crops/high/R02-batter_head` the nose, mouth, chin and jaw are readable; only the eyes are lost.
- **The cause is partly geometry, not just missing fill.**
  - In daylight with fair skin, the cap brim still hides the eyes in `crops/high/R16-1B` and `crops/high/R02-pitcher`. The brim sits low over the eyes and the camera is above the head.
  - In `crops/high/R14-batter` and `crops/high/R07-SS`, where the brim is raised or the face turns to the light, the faces model well.
  - So the gap should also cover brim height, not only a hemisphere fill.
- **"Night turf looks pale and washed" (B).** In `high/desktop/R12` the turf is saturated green. It falls off toward the outfield, and the towers bloom. I would call that the best night frame in the set, not washed out.
- **Golden hour.** `high/desktop/R14` is a strong graded frame.

**Proposed: 6.0.**

## UI (A 6.0, B 6.5; proposed 6.5)

**Concede:**
- The right team panel is empty on desktop (`high/desktop/R16`).
- The hint text is tiny (`high/desktop/R05`).
- In landscape the CB button covers the pitcher's legs, and the secondary line ("P Bishop · 0 pitches") is dropped (`high/landscape/R05`).

**Rebut:**
- **A's "no timing or pitch-result feedback in these frames" is wrong for pitch result.** Pitch speed ("FB 77 mph", "FB 78 mph") is shown in `high/desktop/R09`, `high/desktop/R13` and `high/mobile/R07`.
- The base diamond lights for the runner on first (`high/desktop/R16`).
- The HOME RUN / distance banner has clear hierarchy on desktop and landscape (`high/desktop/R15`, `high/landscape/R10`).
- The type and colour system is consistent in every frame I opened.

**Proposed: 6.5.** I hold this with low confidence.

## Readability (A 6.0, B 5.5; proposed 6.0)

**Concede:**
- `high/mobile/R07` leaves out first base, third base and the corner defenders.
- In `high/desktop/R09` and `crops/high/R09-LF`, the left fielder and the ball are far apart and the catch is not established.
- In `strips/high/R08` the ball is a 2–3 px dot.
- In `high/desktop/R16` the runner at first is at the frame edge.

**Rebut:**
- The duel cameras read at a glance:
  - In `high/desktop/R05` and `high/mobile/R05`, the zone, reticle, catcher, umpire and batter are large and separate.
  - `strips/high/R04` shows the ball and its trail in every pre-contact panel.
  - In `high/desktop/R12` the night ball, zone and fielders read clearly.
- The coloured rings identify the runner and fielders in `high/mobile/R07` and `high/desktop/R13`.

**Proposed: 6.0.**

## Mobile (A 5.5, B 6.0; proposed 6.5)

**New evidence: clean performance.** The phone proxy at 4x CPU throttle runs at:

| Tier | Min fps | Worst p95 |
|---|---|---|
| Medium | 67 | 17.3 ms |
| Low | 139 | 9.3 ms |

Both are more than twice the 30 fps the 7 anchor requires. A explicitly withheld that credit ("perf not measured"), and B made no inference.

**Concede:**
- The CB button covers the pitcher's legs (`high/landscape/R05`).
- The corner bases are missing in portrait (`high/mobile/R07`).
- The crowd is upscaled (`high/mobile/R05`).
- The batter's feet meet the bottom crop (`high/landscape/R12`).

**Rebut A on `high/landscape/R12`.** STEAL and SWING sit in the left and right gutters, and neither covers the batter. Her back foot is cut by the frame bottom, not by a button.

**Rebut B on `high/landscape/R10`, partly.** It is a ball-flight shot, so the runner being out of view is expected. The banner sits above the ball, not on it, but it does take about a quarter of the short play area.

**What earns credit:**
- The portrait duel frames are intentional, with large figures and big thumb targets (`high/mobile/R02`, `high/mobile/R05`).

**Proposed: 6.5.**

## Factual errors

**Critic A:**
- The umpire's mask "hangs off to the side of his face" in `crops/high/R05-batter-front` and `crops/high/R14-batter`. It is in front of the face in both.
- "No … pitch-result feedback in these frames." Pitch speed is shown in `high/desktop/R09`, `high/desktop/R13` and `high/mobile/R07`.
- "SWING and STEAL crowd the batter's feet" in `high/landscape/R12`. The buttons are in the gutters, and the bottom crop is the frame edge.
- In `strips/high/R07` panel 7, the ball is in front of the glove, not behind it.
- "Front foot planting looks better" in `crops/high/R05-batter_feet`. It is not visibly better.

**Critic B:**
- In `strips/high/R04` the contact flash sits at the bat–ball meeting point. It is not detached.
- `crops/high/R10-batter-trot` is cited for padded shoulders, but its shoulders are among the most natural in the set. `crops/high/R02-pitcher` is the right capture for that defect.

## Scores and gaps

```json
{
  "loop": 7,
  "role": "advocate",
  "tier": "high",
  "scores": {
    "characters": {
      "score": 5.5,
      "confidence": 0.75,
      "evidence": [
        {"shot": "crops/high/R02-pitcher", "note": "conceded: shoulder humps like pads, LAKESIDI runs off chest, saw-tooth sock seam"},
        {"shot": "crops/high/R17-pitcher_hands", "note": "conceded: mitten glove, flat cloth, piping through HAMILTON, faceted belt"},
        {"shot": "crops/high/R14-batter", "note": "rebut A: umpire cage sits in front of the face in profile; batter's hands wrap the handle; lit face reads"},
        {"shot": "crops/high/R10-batter-trot", "note": "loop-7 continuous helmet ear shell visible; readable face"},
        {"shot": "crops/high/R05-ump_head", "note": "conceded: cage bars segmented with gaps"}
      ]
    },
    "charfit": {
      "score": 5.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "crops/high/R09-LF", "note": "MPFB-derived face and limb proportions recognisable at duel distance"},
        {"shot": "crops/high/R02-pitcher", "note": "conceded: shoulder line far wider and higher than the reference"},
        {"shot": "crops/low/R02-batter_head", "note": "cartoon LOD2 head is a low-tier regression, not the high-tier model"}
      ]
    },
    "animation": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "strips/high/R04", "note": "contact flash at the bat-ball meeting point; rotation, pivot and finish"},
        {"shot": "strips/high/R07", "note": "conceded run-to-crouch pop between panels 4 and 5; ball reaches the glove in 7 and is gone in 8"},
        {"shot": "strips/high/R10", "note": "support foot planted with shadow every panel; conceded stiff lead arm"},
        {"shot": "crops/high/R05-batter_feet", "note": "conceded: stance cleat hovers, foot-planting change not demonstrated here"},
        {"shot": "crops/high/R16-1B", "note": "ready-clip feet flat with contact shadows"}
      ]
    },
    "environment": {
      "score": 5.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R07", "note": "mow pattern, dirt grain, built poles and towers"},
        {"shot": "high/desktop/R14", "note": "distinct historic park with wooden grandstand roof and dugout"},
        {"shot": "high/desktop/R15", "note": "conceded: backdrop seam and flat field past the fence"},
        {"shot": "crops/high/R02-batter_hands", "note": "conceded: GATOR FATORS ad overlap"}
      ]
    },
    "lighting": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R14", "note": "golden-hour grade with grounded shadows"},
        {"shot": "high/desktop/R12", "note": "saturated night turf with falloff and tower bloom; not washed out"},
        {"shot": "crops/high/R02-batter_head", "note": "eyes lost under the brim; nose, mouth and jaw still readable"},
        {"shot": "high/desktop/R13", "note": "conceded: isolated pool, black outfield corners"}
      ]
    },
    "ui": {
      "score": 6.5,
      "confidence": 0.55,
      "evidence": [
        {"shot": "high/desktop/R16", "note": "score bug, lit base diamond, count pips; empty right panel conceded"},
        {"shot": "high/desktop/R15", "note": "HOME RUN banner with distance and clear hierarchy"},
        {"shot": "high/desktop/R13", "note": "pitch-type and speed feedback (FB 78 mph)"},
        {"shot": "high/landscape/R05", "note": "conceded: CB button over the pitcher's legs, secondary line dropped"}
      ]
    },
    "readability": {
      "score": 6.0,
      "confidence": 0.65,
      "evidence": [
        {"shot": "high/desktop/R05", "note": "zone, reticle and duel figures read at a glance"},
        {"shot": "strips/high/R04", "note": "ball and trail visible in every pre-contact panel"},
        {"shot": "high/mobile/R07", "note": "conceded: corner bases and defenders cut"},
        {"shot": "strips/high/R08", "note": "conceded: ball 2-3 px on the wide camera"}
      ]
    },
    "mobile": {
      "score": 6.5,
      "confidence": 0.65,
      "evidence": [
        {"shot": "high/mobile/R05", "note": "large duel figures, big thumb targets; crowd upscaling conceded"},
        {"shot": "high/mobile/R02", "note": "intentional portrait framing"},
        {"shot": "high/landscape/R12", "note": "buttons sit in the gutters, batter not covered; feet at the bottom crop"},
        {"shot": "high/landscape/R05", "note": "conceded: CB button covers the pitcher's legs"}
      ]
    }
  },
  "gaps": [
    {"id": "G-shoulder-slab", "category": "charfit", "expectedGain": 0.5, "severity": 5, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R02-pitcher", "crops/high/R17-pitcher_hands"], "benchmark": "mpfb2_athlete_three_quarter", "fix": "Shoulder garment offset at most 0.3x thickness over the acromion and trapezius, or re-weight to the clavicle; outline within 2% of the body outline. Severity raised: it is the most visible character defect and loop 7's shoulder change did not fix it."},
    {"id": "G-shoulders-cloth", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "L", "workstream": "WS1", "evidence": ["crops/high/R02-pitcher", "crops/high/R17-pitcher_hands"], "benchmark": "si_jersey_three_quarter", "fix": "Refit collar and sleeves; no jagged collar or elbow collapse in R02, R12, R17. Gain lowered: overlaps G-shoulder-slab and G-uniform-cloth."},
    {"id": "G-uniform-cloth", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R02-batter"], "benchmark": "smb4-2", "fix": "Flannel normal and roughness maps plus baked fold AO; fold shading visible in R17. Gain lowered from 1.0: cloth texture alone will not lift characters a full point while the shoulders and gloves remain."},
    {"id": "G-hands-equipment", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "L", "workstream": "WS1", "evidence": ["crops/high/R06-catcher_glove", "crops/high/R17-pitcher_hands", "crops/high/R05-batter_feet"], "benchmark": "smb3-3", "fix": "Glove pockets, webs and lacing, a distinct catcher's mitt, credible cleat uppers. Severity lowered: the bat grip is already acceptable in R14-batter and R05-batter-front."},
    {"id": "G-glove-model", "category": "characters", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R06-catcher_glove", "crops/high/R17-pitcher_hands"], "fix": "Glove with pocket, web and lacing and a leather normal map; separate catcher's mitt mesh."},
    {"id": "G-face-fill-under-brim", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS3", "evidence": ["crops/high/R02-batter_head", "crops/high/R16-1B"], "fix": "Cause challenged: brims sit low over the eyes even on fair faces in daylight (R16-1B), so raise brim and cap height as well as adding a sky fill. Test: eyes readable in R02-batter_head and R16-1B."},
    {"id": "G-fill-night-coverage", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["high/desktop/R13"], "fix": "Overlap night light coverage so the R13 outfield corners are not black. The washed-turf claim is rejected by R12."},
    {"id": "G-contact-continuity", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["crops/high/R05-batter_feet", "strips/high/R07"], "fix": "Ground the stance soles (the stance clip is not planted; the ready and run clips are, per R16-1B and strips R10) and blend the deceleration into the fielding crouch. Severity and effort lowered."},
    {"id": "G-arm-swing-catch-beat", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["strips/high/R10", "strips/high/R07"], "fix": "Arm swing of +/-40 degrees in the run cycle; glove reach so the ball meets the glove. The catch beat partly exists (R07 panels 7-8)."},
    {"id": "G-ump-mask-cage", "category": "characters", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R05-ump_head"], "fix": "Cause corrected: the cage is already centred in front of the face (R05-batter-front, R14-batter). Fix only the segmented, gapped bars with continuous tubes."},
    {"id": "G-reference-anatomy", "category": "charfit", "expectedGain": 0.5, "severity": 4, "effort": "L", "workstream": "WS1", "evidence": ["crops/high/R09-LF", "crops/high/R17-pitcher_hands"], "fix": "Reference eyelids, eye contrast and finger taper; three distinct builds in identical poses. Gain lowered: proportions already hold (IoU 0.88/0.89)."},
    {"id": "G-phone-framing", "category": "mobile", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS5", "evidence": ["high/mobile/R07", "high/landscape/R05"], "fix": "Fit the corner bases and defenders in portrait ground balls; keep landscape action above the controls. Gain lowered: the perf part of the anchor is now met independently."},
    {"id": "G-landscape-button-overlap", "category": "mobile", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/landscape/R05"], "fix": "Move the pitch buttons clear of the pitcher in landscape R05. R12 is not an overlap; the buttons there are in the gutters."},
    {"id": "G-runner-framing-ball-size", "category": "readability", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS5", "evidence": ["high/desktop/R16", "strips/high/R08", "high/desktop/R09"], "fix": "Keep the lead runner in frame; ball halo at least 5 px on wide cameras; the R09 catch camera frames the fielder and the ball together."},
    {"id": "G-adboard-backdrop-seams", "category": "environment", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS4", "evidence": ["crops/high/R02-batter_hands", "high/desktop/R15"], "fix": "Non-overlapping ad layout; gradient blend between the painted backdrop and the 3D trees."},
    {"id": "G-park-cohesion", "category": "environment", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS4", "evidence": ["high/desktop/R05", "high/desktop/R15", "high/desktop/R01"], "fix": "Varied crowd with depth, textured stands, unified vegetation. Gain lowered: overlaps G-adboard-backdrop-seams and G-crowd-resolution."},
    {"id": "G-crowd-resolution", "category": "environment", "expectedGain": 0.3, "severity": 2, "effort": "M", "workstream": "WS4", "evidence": ["high/mobile/R05"], "fix": "Higher-res crowd atlas; no pixelation in mobile R05."},
    {"id": "G-sock-cleat-seam-decal", "category": "characters", "expectedGain": 0.3, "severity": 2, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R05-batter_feet", "crops/high/R02-pitcher"], "fix": "Sock cap ring overlapping the shoe collar; mip-filtered cleat decal."},
    {"id": "G-lettering-piping", "category": "characters", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R14-batter", "crops/high/R02-pitcher"], "fix": "Mask the piping under the decal; clamp the word width. Severity raised: it persists on every team after loop 7's decal change."},
    {"id": "G-body-variety", "category": "characters", "expectedGain": 0.3, "severity": 2, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R07-SS", "crops/high/R09-LF", "crops/high/R02-pitcher"], "fix": "Three visibly distinct builds plus face morphs. Some build variation already shows (R02-pitcher against R09-LF)."},
    {"id": "G-hud-efficiency", "category": "ui", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["high/desktop/R16", "high/landscape/R05"], "fix": "Compact the empty score panels; keep the secondary line in landscape."},
    {"id": "G-low-tier-continuity", "category": "charfit", "expectedGain": 0.2, "severity": 4, "effort": "L", "workstream": "WS6", "evidence": ["crops/low/R02-batter_head", "crops/low/R05-batter_feet"], "fix": "Derive LOD2 from the same head, hands and shoes. Conceded as a severe low-tier regression; gain lowered because it does not move the high-tier score."},
    {"id": "G-lod2-feet", "category": "charfit", "expectedGain": 0.1, "severity": 2, "effort": "S", "workstream": "WS6", "evidence": ["crops/low/R05-batter_feet"], "fix": "Keep a decimated shoe mesh in LOD2. Subsumed by G-low-tier-continuity."}
  ],
  "verdict": "continue"
}
```
