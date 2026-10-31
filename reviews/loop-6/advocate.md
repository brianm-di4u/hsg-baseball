# Advocate: loop 6, high tier

Capture paths are relative to `screenshots/review-loop-6/`. Every capture cited below I opened and looked at this session. I read both critiques, the rubric, the schema and the loop brief, and I compared against `art-src/samples/reference-renders/mpfb2_athlete_three_quarter.png`.

**Overall.** Both critics are mostly right. Their verdicts are similar (Critic A is about half a point above Critic B in most categories), and most of their defect lists hold up against the captures. Where I disagree, it's because a claim (a) generalises from the single worst close-up to every shot, (b) blames the animation for a camera cut or for where the strip window starts and ends, or (c) is plainly contradicted by a named capture. The kit, glove, torso-inflation and catch-contact failures are real, and I concede them. No category reaches its gate.

Critic means: characters 5.25, charfit 5.25, animation 5.25, environment 5.5, lighting 5.75, ui 6.5, readability 5.75, mobile 6.0.

---

## characters (A 5.5, B 5.0) → proposed 5.5

**Concede**
- **Kit is a colour-block shell.** `crops/high/R08-CF` and `crops/high/R17-pitcher_hands` show no folds, buttons, seams or hem. The belt is a jagged black band in `crops/high/R17-pitcher_hands`. Both critics are right.
- **Glove is lobed brown mitten.** `crops/high/R06-catcher_glove` and `crops/high/R17-pitcher_hands` show no web, pocket or lacing.
- **Placket piping cuts the lettering.** The H of "LAKE HAMILTON" is hidden in `crops/high/R17-pitcher_hands`. The L of "LAKESIDE" is lost in `crops/high/R07-SS` and `crops/high/R08-CF`, and "HOT SPRINGS" is broken in `crops/high/R10-batter-trot`.
- **Batting-helmet front view.** In `crops/high/R02-batter_head` the brim is blown near-white and sits at nose height. The flap reads as a thin strap hanging in front of the jaw.
- **Umpire mask in the crouch.** In `crops/high/R05-ump_head` the cage runs from the brim down over the chest protector, and bare skin shows at the neck and shoulder. The loop-6 mask fix does not hold in this pose.
- **Cleats.** `crops/high/R05-batter_feet` shows pixel-stepped white patches and no studs. The scoop shin guards in `crops/high/R06-catcher_glove` are also as described.

**Rebut / correct**
- **"Faces are black voids under helmets" (A, defect 3; also A's lighting section).** This is only true of the front view in `crops/high/R02-batter_head`. In `crops/high/R10-batter-trot` and `crops/high/R16-runner1` the nose, lips and chin read clearly under the batting helmet; only the eyes are in shadow. `crops/high/R07-SS` and `crops/high/R08-CF` show lit faces under fielders' helmets. In `crops/high/R02-batter_hands` the mouth and chin are visible. A has generalised the worst frame.
- **"Ear flap is a dangling strap" (A).** That holds from the front-left (`crops/high/R02-batter_head`). From behind, in `crops/high/R05-catcher`, the batter's flap reads as a closed shell over the ear. The defect depends on the viewing angle, so severity should drop.
- **"Three clearly distinct builds are not convincingly demonstrated" (B).** This is wrong. `crops/high/R14-batter` shows a stocky, thick-backed umpire, a lean batter and a compact catcher in one frame. `crops/high/R17-pitcher-back` (a slight, narrow pitcher) and `crops/high/R12-pitcher` (a broad, heavy pitcher) are clearly different builds.
- **Hands.** `crops/high/R02-batter_hands` and `crops/high/R16-runner1` show jointed fingers wrapped around the bat and hands braced on the knees. B's "bulky grip" is fair, but the grip clearly reads, which is part of the rubric's 7 anchor ("hands that grip the bat").

A's 5.5 is the better-supported score. The faces, grip and body variety meet parts of the 7 anchor; cloth, glove and materials do not.

## charfit (A 5.5, B 5.0) → proposed 5.5

**Concede**
- **Torso inflation is the biggest departure.** In `crops/high/R08-CF` the shoulders and deltoids balloon well past `mpfb2_athlete_three_quarter.png`, whose shoulders are narrow and sloped. The neck is buried. `crops/high/R12-pitcher` shows the same. A is right, and I'd raise this gap's severity.
- **LOD2 far players.** `high/desktop/R09` players are small blobs, which is consistent with the brief's LOD2 pixel error of 46–52%.

**Rebut / correct**
- **"Narrow tubular limbs" (B).** The upper arms are the opposite of narrow: they are inflated (`crops/high/R08-CF`, `crops/high/R07-SS`). The legs are tube-like, but the arm departure is excess volume, not thinness. B blames the wrong cause.
- **"Headwear conceals the facial landmarks needed for fidelity" (B).** This rests only on `crops/high/R02-batter_head`. Under caps, `crops/high/R09-LF` and `crops/high/R14-batter` give a head that matches the MPFB reference's brow, nose and lip structure, and the brief's IoU of 0.875 (front) and 0.895 (side) agrees. Head fidelity is the strongest part of charfit and should be credited.

5.5 holds: the proportions and head are right, while the torso and garments sit well off the reference.

## animation (A 5.5, B 5.0) → proposed 5.5

**Concede**
- **No catch contact.** In `strips/high/R07`, frame 8 shows the ball behind and to the right of the fielder's feet, outside the glove. A's G-catch-contact is right.
- **Floating stance feet.** In `crops/high/R05-batter_feet` both soles hover above the dirt with detached shadows. B is right about grounding.
- **R03 strip covers only the set and leg lift.** `strips/high/R03` frames 1–5 are near-static and 6–8 lift the leg.
- **The trot is upright with fixed arm arcs** (`strips/high/R10`), though the feet do contact the dirt in every frame.

**Rebut / correct**
- **"The ball passes the body before the swing; contact is not established" (B).** This is wrong. In `strips/high/R04` frame 4 the ball is still in front of the plate with the bat loaded. In frame 5 the contact flash sits exactly at the bat head where the ball is, and frames 6–8 show the rotation and finish with the ball trail leaving. The flash is synchronised with bat-ball intersection.
- **"Limited braking preparation before the fielding crouch" (B).** In `strips/high/R07` frames 4 and 5 are on opposite sides of a camera cut: the scoreboard, the wall numbers and the fielder's screen position all jump. The strip simply doesn't sample the braking, so this is a capture artefact, not proof that the braking is missing.
- **"No stride or release" (A and B).** That is true of the strip window, but the build does show the beats. `high/desktop/R06` shows the release, with the arm through, the front leg striding and the ball leaving. `crops/high/R12-pitcher` shows a long stride with the arm cocked. The fault is mostly where the R03 strip starts and ends, plus a long set hold, so G-delivery-pacing is overstated.

A's 5.5 matches: there is a sold swing with contact, and real pitch and run beats, offset by the catch miss and the floating stance.

## environment (A 6.0, B 5.0) → proposed 5.5

**Concede**
- **Faceted cone and blob trees** against a photographic backdrop (`crops/high/R08-CF`, `high/desktop/R09`).
- **Bare grey stepped stands** in `high/desktop/R01`, and blank grey walls above the boards in `high/desktop/R05`.
- **Black treeline at night** (`high/desktop/R13`).

**Rebut / correct**
- **Crowd repetition (B, "conspicuously repeated").** The repetition is visible in the near-camera `high/desktop/R05`. But `high/desktop/R17` shows Majestic Park stands with structural column bays and a crowd that reads as varied people, and `high/desktop/R15` (the historic park) has a brick outfield wall, an adjacent field and real character. B's 5.0 ignores these.
- A's 6.0 overlooks how much of the park sits on cone trees and slab stands.

5.5 is the honest midpoint.

## lighting (A 6.0, B 5.5) → proposed 6.0

**Concede**
- **Night pools.** `high/desktop/R13` has a hard bright pool at the top left of the outfield and a black perimeter.
- **No under-brim fill on the front batting view** (`crops/high/R02-batter_head`).

**Rebut / correct**
- **Grounded day light.** Contact shadows sit under the players in `crops/high/R16-1B` and `crops/high/R09-LF`. `crops/high/R14-batter` is a warm golden afternoon with modelled faces.
- **"Pale foreground wash" at night (B).** `high/desktop/R12` shows a lit infield, tower bloom, and a batter and pitcher modelled by the towers. The infield dirt is lighter, but it isn't washed out. The rubric's 7 anchor asks for "night exposure from the towers", and that is present.
- **Faces under headwear** are more readable than either critic allows (`crops/high/R16-runner1`, `crops/high/R10-batter-trot`; see characters).

6.0 is supported.

## ui (A 6.5, B 6.5) → proposed 6.5

**Concede**
- **Title-screen contrast.** In `high/desktop/R01` the translucent menu lets the scenery bleed through and the "Season" label is weak on the red button. B is right.
- **Persistent fast-forward hint and a static package** (`high/desktop/R08`, `high/desktop/R10`).

**Rebut / correct**
- **"In-world scoreboard cut off at the frame edge" (A).** In `high/desktop/R08` that is the 3D scoreboard object cropped by the fielding camera. It is a camera-framing matter (WS5), not a HUD fault, and shouldn't count against ui.

Both critics score 6.5, and I agree.

## readability (A 6.0, B 5.5) → proposed 6.0

**Concede**
- **Small fielders and ball.** Fielders are tiny in `high/desktop/R09`, and the ball crosses the scoreboard region there (B is right).
- **Home-run hitter.** In `high/desktop/R10` the hitter is a speck at the bottom edge (A is right).

**Rebut / correct**
- **"First-base runner at the extreme edge" (B, `high/desktop/R16`).** The runner is at the right edge, but the HUD base diamond shows first base lit yellow and the out marker, so the runner state reads at a glance.
- **Ball carrier and runner marking.** In `high/desktop/R08` the ball has a green trail against the turf, and the batter-runner carries a yellow ring distinct from the blue fielder rings. That is real at-a-glance marking.
- **"Pitcher occludes the plate" (A, `high/desktop/R05`).** The plate, catcher, batter and reticle are all clear. The pitcher stands to the left of the plate, not over it.

6.0 holds.

## mobile (A 6.0, B 6.0) → proposed 6.0

**Concede**
- **Portrait fielding framing.** `high/mobile/R07` cuts both corner bases off the sides and leaves a large empty foreground below home (both critics are right).
- **Landscape pitching.** In `high/landscape/R05` the CB button overlaps the pitcher's lower legs.

**Rebut / correct**
- **"Buttons over the batter's feet and the plate" in `high/landscape/R02` (A).** This is wrong. BUNT and STEAL end well left of the batter, and SWING is far right. The batter's feet and the plate are cut by the bottom frame edge, not by buttons. B describes it correctly.
- **Portrait duel framing.** `high/mobile/R05` has large figures, a readable HUD, a clear reticle and thumb-sized buttons. The phone proxy holds 48 fps minimum, above the 30 fps bar.

Both critics score 6.0, and I agree.

---

## Facts the critics got plainly wrong

**Critic A**
1. **`high/landscape/R02`.** The buttons do not sit over the batter's feet or the plate; the feet are cropped by the frame edge.
2. **Faces as "featureless black voids" under helmets in `crops/high/R10-batter-trot` and `crops/high/R16-runner1`.** The nose, lips and chin are visible.
3. **`high/desktop/R05`.** The pitcher does not occlude the plate area.
4. **`high/desktop/R08` scoreboard crop scored as a ui fault.** It is in-world geometry framed by the camera.

**Critic B**
1. **`strips/high/R04`.** The contact flash is at the bat-ball intersection in frame 5; the ball has not passed the body before the swing.
2. **`strips/high/R07`.** "Little braking" is a camera cut between frames 4 and 5, not a sampled motion.
3. **"Three distinct builds not demonstrated."** `crops/high/R14-batter`, `crops/high/R17-pitcher-back` and `crops/high/R12-pitcher` show them.
4. **"Narrow tubular limbs."** The upper arms are over-inflated (`crops/high/R08-CF`).

**Medium and low tiers:** B's low-tier finding stands. `crops/low/R02-batter_head` is a cartoon head with protruding eyes, a discontinuity from high. It isn't scored for this tier.

---

## Gap adjustments (summary)

Gains are category points and are not additive; several gaps overlap (G-headwear with G-ear-flap-shell and G-ump-catcher-gear; G-kit-construction with G-uniform-cloth and G-glove-model).

**Severity raised**
- **G-torso-volume**: severity 4 → 5, gain 0.5 → 0.75. It is the most visible silhouette error against the reference (`crops/high/R08-CF`).

**Severity or gain lowered**
- **G-helmet-face-fill**: severity 5 → 4, gain → 0.3. Features are already visible in R10 and R16. Part of the cause is the brim sitting low and its white specular (geometry and material), not only fill light.
- **G-headwear**: severity 5 → 4, gain → 0.5. Caps fit (`crops/high/R09-LF`, `crops/high/R14-batter`), and the umpire mask is bounded upright (`crops/high/R14-batter`). The failure is confined to the batting-helmet front view and the umpire crouch.
- **G-grounding-contact**: severity 5 → 4, gain → 0.5. Swing contact is already synchronised; the real items are the floating stance feet and the catch.
- **G-delivery-pacing**: severity 3 → 2, gain → 0.25. The beats exist (`high/desktop/R06`, `crops/high/R12-pitcher`).
- **G-reference-anatomy**: gain → 0.75. The cause should read "inflated shoulders and upper arms", not narrow limbs, and three builds already exist.
- **G-crowd-stands**: severity 4 → 3, gain → 0.5. `high/desktop/R17` already has varied crowd and bays.
- **G-ear-flap-shell**: severity 3 → 2. It reads as a shell from behind (`crops/high/R05-catcher`).
- **G-landscape-controls**: severity 3 → 2. Only the R05 overlap is real.
- **Gain only**:
  - G-phone-framing 1.0 → 0.5
  - G-night-integration 1.0 → 0.5
  - G-action-priority → 0.3 (rings already exist)
  - G-tree-cohesion → 0.3
  - G-low-lod-continuity → 0.25 (low tier is unscored)
  - G-uniform-cloth → 0.75 (cloth alone can't reach 7 while the torso stays inflated)

**Unchanged**: G-kit-construction, G-glove-model, G-catch-contact, G-fielding-camera, G-decal-layering (pose-dependent: `crops/high/R12-pitcher` shows "LAKESIDE" in full), G-ump-catcher-gear and G-ui-spacing-contrast.

```json
{
  "loop": 6,
  "role": "advocate",
  "tier": "high",
  "scores": {
    "characters": {
      "score": 5.5,
      "confidence": 0.75,
      "evidence": [
        { "shot": "crops/high/R14-batter", "note": "three distinct builds in one frame (stocky ump, lean batter, catcher); real faces under caps; grip reads" },
        { "shot": "crops/high/R16-runner1", "note": "nose, lips, chin readable under batting helmet; only eyes shadowed" },
        { "shot": "crops/high/R08-CF", "note": "conceded: colour-block kit, no folds/placket, lettering loses L" },
        { "shot": "crops/high/R06-catcher_glove", "note": "conceded: mitten glove, scoop shin guards" }
      ]
    },
    "charfit": {
      "score": 5.5,
      "confidence": 0.7,
      "evidence": [
        { "shot": "crops/high/R09-LF", "note": "head matches MPFB reference structure; IoU 0.875/0.895" },
        { "shot": "crops/high/R08-CF", "note": "conceded: shoulders/upper arms inflated well past mpfb2_athlete_three_quarter (not narrow limbs)" },
        { "shot": "high/desktop/R09", "note": "far players collapse to blobs (LOD2)" }
      ]
    },
    "animation": {
      "score": 5.5,
      "confidence": 0.7,
      "evidence": [
        { "shot": "strips/high/R04", "note": "frame 5 contact flash at bat-ball intersection; rotation and finish frames 6-8" },
        { "shot": "strips/high/R07", "note": "frames 4-5 are a camera cut; conceded ball ends behind feet, no catch" },
        { "shot": "high/desktop/R06", "note": "release with stride and follow-through exists outside the R03 strip window" },
        { "shot": "crops/high/R05-batter_feet", "note": "conceded: stance soles float above the dirt" }
      ]
    },
    "environment": {
      "score": 5.5,
      "confidence": 0.7,
      "evidence": [
        { "shot": "high/desktop/R15", "note": "historic park brick wall and adjacent field have character" },
        { "shot": "high/desktop/R17", "note": "stands with column bays, varied crowd" },
        { "shot": "high/desktop/R01", "note": "conceded: bare grey stepped stands, faceted trees" },
        { "shot": "crops/high/R08-CF", "note": "conceded: faceted trees vs photo backdrop" }
      ]
    },
    "lighting": {
      "score": 6,
      "confidence": 0.7,
      "evidence": [
        { "shot": "crops/high/R14-batter", "note": "golden afternoon with modelled faces and grounded shadows" },
        { "shot": "high/desktop/R12", "note": "tower exposure lights batter and pitcher; no wash-out" },
        { "shot": "crops/high/R16-1B", "note": "soft contact shadow under player" },
        { "shot": "high/desktop/R13", "note": "conceded: blotchy pools, black perimeter" }
      ]
    },
    "ui": {
      "score": 6.5,
      "confidence": 0.75,
      "evidence": [
        { "shot": "high/desktop/R05", "note": "clean score bug, pitch buttons, reticle" },
        { "shot": "high/desktop/R10", "note": "HOME RUN banner with distance hierarchy" },
        { "shot": "high/desktop/R01", "note": "conceded: translucent menu weakens contrast" },
        { "shot": "high/desktop/R08", "note": "cropped scoreboard is in-world geometry, not HUD" }
      ]
    },
    "readability": {
      "score": 6,
      "confidence": 0.7,
      "evidence": [
        { "shot": "high/desktop/R02", "note": "batting view reads at a glance" },
        { "shot": "high/desktop/R08", "note": "ball trail plus yellow batter-runner ring distinct from blue fielder rings" },
        { "shot": "high/desktop/R16", "note": "runner at edge but HUD diamond marks first base" },
        { "shot": "high/desktop/R10", "note": "conceded: hitter a speck at frame bottom" }
      ]
    },
    "mobile": {
      "score": 6,
      "confidence": 0.75,
      "evidence": [
        { "shot": "high/mobile/R05", "note": "large figures, readable HUD, thumb buttons" },
        { "shot": "high/landscape/R02", "note": "buttons clear of batter; feet cropped by frame edge instead" },
        { "shot": "high/landscape/R05", "note": "conceded: CB button over pitcher's legs" },
        { "shot": "high/mobile/R07", "note": "conceded: corner bases cut off, empty foreground" }
      ]
    }
  },
  "gaps": [
    { "id": "G-uniform-cloth", "category": "characters", "expectedGain": 0.75, "severity": 5, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R08-CF", "crops/high/R10-batter-trot"], "benchmark": "smb4-2", "fix": "Bake fold/seam/placket/hem normal+AO maps onto jersey and pants with a cloth sheen; test: >=3 fold lines per pant leg and visible placket buttons in R08-CF and R10-batter-trot." },
    { "id": "G-kit-construction", "category": "characters", "expectedGain": 1.0, "severity": 5, "effort": "L", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R05-batter_feet"], "benchmark": "benchmarks/smb3-3.png; art-src/samples/reference-renders/si_jersey_front.png", "fix": "Tailored garment boundaries, closures, belt hardware, folds, glove webbing and lacing, constructed cleats; validate matching close-ups. Overlaps G-uniform-cloth and G-glove-model (not additive)." },
    { "id": "G-torso-volume", "category": "charfit", "expectedGain": 0.75, "severity": 5, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R08-CF", "crops/high/R07-SS", "crops/high/R12-pitcher"], "benchmark": "mpfb2_athlete_three_quarter", "fix": "Reduce jersey shoulder/deltoid/upper-arm inflation, lengthen neck, sewn V collar; test: shoulder:head width within 10% of reference." },
    { "id": "G-reference-anatomy", "category": "charfit", "expectedGain": 0.75, "severity": 4, "effort": "L", "workstream": "WS1", "evidence": ["crops/high/R08-CF", "crops/high/R16-1B"], "benchmark": "art-src/samples/reference-renders/mpfb2_athlete_three_quarter.png", "fix": "Match dressed shoulders, upper arms (currently over-inflated, not narrow), hands and headwear silhouettes to the athlete reference; builds already differ (R14-batter), keep that while fixing volume." },
    { "id": "G-headwear", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R02-batter_head", "crops/high/R05-ump_head"], "benchmark": "benchmarks/smb4-3.png", "fix": "Refit batting-helmet brim above the eyes and bound the umpire cage chin-to-brow in the crouch pose; caps already fit (R09-LF, R14-batter)." },
    { "id": "G-helmet-face-fill", "category": "lighting", "expectedGain": 0.3, "severity": 4, "effort": "S", "workstream": "WS3", "evidence": ["crops/high/R02-batter_head", "crops/high/R10-batter-trot"], "benchmark": "smb3-3", "fix": "Shadowless under-brim fill plus brim material fix; test: eyes distinguishable in R02-batter_head, under-brim face luminance >=25% of sunlit cheek. Nose and mouth already read in R10 and R16-runner1." },
    { "id": "G-glove-model", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R06-catcher_glove", "crops/high/R17-pitcher_hands"], "benchmark": "smb3-3", "fix": "Modelled glove with web, pocket, heel, lacing and leather normal/roughness; test: web and lacing visible in R06-catcher_glove." },
    { "id": "G-catch-contact", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["strips/high/R07"], "fix": "Glove IK to ball path and ball snap to glove on catch frame; test: ball in glove by frame 8 of R07 strip." },
    { "id": "G-grounding-contact", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "L", "workstream": "WS2", "evidence": ["crops/high/R05-batter_feet", "strips/high/R07"], "benchmark": "benchmarks/smb4-2.png", "fix": "Lock stance soles to the dirt. Swing contact is already synchronised in R04 frame 5; R07 braking is unsampled because of a camera cut, so capture it without the cut before judging." },
    { "id": "G-delivery-pacing", "category": "animation", "expectedGain": 0.25, "severity": 2, "effort": "M", "workstream": "WS2", "evidence": ["strips/high/R03", "high/desktop/R06", "crops/high/R12-pitcher"], "benchmark": "smb4-2", "fix": "Shorten set hold so the R03 strip spans lift, stride, release, follow-through; the stride and release already exist (R06, R12-pitcher)." },
    { "id": "G-fielding-camera", "category": "readability", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS5", "evidence": ["high/desktop/R09", "high/desktop/R10", "high/mobile/R07"], "benchmark": "smb3-4", "fix": "Tighter fielding/HR cameras keeping ball-carrier >=60 px tall, ball halo, portrait-specific framing; test on R09 and mobile R07." },
    { "id": "G-phone-framing", "category": "mobile", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS5", "evidence": ["high/mobile/R07", "high/landscape/R05"], "benchmark": "benchmarks/backyard97-1.png", "fix": "Retain corner bases in portrait fielding and use the empty foreground; reserve landscape control space without obscuring active figures." },
    { "id": "G-crowd-stands", "category": "environment", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS4", "evidence": ["high/desktop/R05", "high/desktop/R01"], "benchmark": "benchmarks/smb4-3.png", "fix": "Break near-camera crowd repetition and give the home-park stands seating depth, railings and materials, as Majestic Park (R17) partly already has." },
    { "id": "G-tree-cohesion", "category": "environment", "expectedGain": 0.3, "severity": 3, "effort": "M", "workstream": "WS4", "evidence": ["crops/high/R08-CF", "high/desktop/R09"], "benchmark": "smb4-3", "fix": "Replace faceted cone/blob trees on high/medium with textured card trees matching the backdrop; test: no faceted silhouettes in R08-CF." },
    { "id": "G-night-integration", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["high/desktop/R13"], "benchmark": "benchmarks/smb3-3.png", "fix": "Smooth tower falloff overlap in R13 and lift the perimeter treeline; R12 player exposure already works and must be kept." },
    { "id": "G-decal-layering", "category": "characters", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R07-SS"], "fix": "Draw lettering above placket piping and fit the word inside the visible chest on bent poses (it is already legible in R12-pitcher); test: full team name legible in R17-pitcher_hands and R07-SS." },
    { "id": "G-ump-catcher-gear", "category": "characters", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R05-ump_head", "crops/high/R06-catcher_glove"], "fix": "Bound mask cage chin-to-brow in the crouch pose (the upright pose is already correct in R14-batter), add a segmented catcher chest protector, close the umpire neck/shoulder skin gap." },
    { "id": "G-action-priority", "category": "readability", "expectedGain": 0.3, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["high/desktop/R09", "high/mobile/R07"], "benchmark": "benchmarks/backyard97-1.png", "fix": "Highlight the fielder making the play (rings exist; the runner ring is already distinct in R08) and keep ball contrast against the scoreboard in R09." },
    { "id": "G-low-lod-continuity", "category": "charfit", "expectedGain": 0.25, "severity": 4, "effort": "L", "workstream": "WS6", "evidence": ["crops/low/R02-batter_head"], "benchmark": "art-src/samples/reference-renders/mpfb2_game27k_glb_three_quarter.png", "fix": "Replace the cartoon low-tier head with a reduced realistic head; low tier is unscored this loop, so the gain to the high-tier score is small." },
    { "id": "G-ear-flap-shell", "category": "characters", "expectedGain": 0.2, "severity": 2, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R02-batter_head", "crops/high/R05-catcher"], "fix": "Close the flap's front edge so it reads as a shell from the front (it already does from behind) and clamp the brim specular; test: no strap read and brim <230/255 in R02-batter_head." },
    { "id": "G-landscape-controls", "category": "mobile", "expectedGain": 0.2, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/landscape/R05", "high/landscape/R02"], "fix": "Move the landscape pitch buttons off the pitcher (R05). In R02 the buttons are clear; raise the camera so the batter's feet and the plate aren't cropped by the frame edge." },
    { "id": "G-ui-spacing-contrast", "category": "ui", "expectedGain": 0.5, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R01", "high/desktop/R02"], "benchmark": "benchmarks/ootp26-1.png", "fix": "Tighten score-bug spacing and increase title-panel opacity; verify menu contrast over every flyover background." }
  ],
  "verdict": "continue"
}
```
