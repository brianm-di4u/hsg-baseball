# Advocate: loop 9, high tier

I opened and inspected every capture cited below: `crops/high/R02-batter_head`, `R02-batter_hands`, `R05-batter_feet`, `R05-ump_head`, `R06-catcher_glove`, `R07-batter-runner`, `R08-CF`, `R09-LF`, `R12-pitcher`, `R14-batter`, `R16-1B`, `R17-pitcher_hands`; `strips/high/R03`, `R04`, `R07`, `R10`; `high/desktop/R05`, `R07`, `R09`, `R10`, `R13`, `R14`, `R16`; `high/mobile/R02`, `R05`, `R07`, `R12`; `high/landscape/R05`, `R10`; `low/desktop/R02`, `R05`. I make no claim about any capture not in this list.

Critic means: characters 5.25, charfit 5.25, animation 5.25, environment 5.25, lighting 5.5, ui 6.5, readability 5.75, mobile 5.75.

Most of both critiques holds up. The gear (glove, mitt, cleats, masks), flat uniforms, floating stance foot, frozen run arms, weak swing finish, photo-slab crowd, backdrop seam and sliced sponsor board are all on screen as described. My corrections are mostly about faces, which the critics describe as darker and more featureless than the captures show, plus a few plain factual errors on readability and mobile, and expected gains in Codex's table that are inflated.

## Plainly wrong or overstated facts

**Critic A (claude)**
1. **"In `crops/high/R16-1B` … no readable eyes"**: wrong. In R16-1B the fielder's eyes, nose, mouth and ears are all distinct, and his face is evenly lit under the cap. The brows are faint, so "browless" is fair, but "no readable eyes" is not.
2. **"In `crops/high/R02-batter_head` the face is just a dark mass"**: overstated. The eyes are lost under the brim, but the nose, both lips, cheek and jaw are modelled and readable. The same batter in `crops/high/R02-batter_hands`, from a lower angle, shows open eyes and lips. The problem is eye shadow under the brim, not a black face.
3. **"`high/landscape/R10`: the HR banner covers the ball"**: wrong. The ball is clearly visible just below the banner's lower edge (about x 790, y 357 in the 1688-wide frame). The banner does cover the right part of the scoreboard.
4. **"`high/desktop/R13`: the ball near the scoreboard is lost"**: wrong. A white ball streak sits just right of the scoreboard against the black tree line (about x 507, y 273), and it's one of the highest-contrast objects in the frame.
5. **"`high/desktop/R05`: the reticle … fully covers the catcher, hiding the target glove"**: overstated. The reticle box covers the catcher's mask and chest, but the brown mitt is visible at its lower edge (about x 625, y 460). It's partial occlusion, not a hidden target.
6. **"`crops/high/R05-ump_head`: … no frame, padding or straps"**: partly wrong. A dark padded side piece runs down the left edge of the mask (about x 720–800). The bars are crude and do overlap the chest protector at the lower right, but there's a side frame. In `crops/high/R14-batter` both the umpire's and the catcher's cages attach to a side frame at the cheek.
7. **"`strips/high/R07` frames 1–4 hold the arms rigid"**: overstated. In frame 1 the glove arm is out at the side; in frames 3–4 both hands are in at the chest. The arm pose changes, but there's no counter-phased pump. The substance of the gap stands.

**Critic B (codex)**
1. **"Both stance shoes visibly float" (`crops/high/R05-batter_feet`)**: half right. The front (image-left) shoe clearly hovers with a detached shadow. The rear shoe's toe sits on its own shadow, and any gap there is marginal.
2. **"Bat grip … the lower hand appears partly open" citing `crops/high/R14-batter`**: wrong for that capture. In R14-batter both hands are closed around the handle, one stacked over the other. In `crops/high/R02-batter_hands` the fingers also curl around the handle. Knuckle and nail detail is weak, but the grip itself reads.
3. **"`crops/high/R02-batter_head` loses the eye, lip and skin definition"**: half right. The eyes are lost under the brim, but the lips and nose are defined (see A-2 above).
4. **"`high/desktop/R14` … similarly sparse construction"**: overstated. R14 has its own architecture: a roofed grandstand, a sepia period crowd, a stone and mesh backstop wall and a different board-free fence line. It reads as a different park, not a re-skin.

## Category by category

### Characters: critics 5.5 / 5.0 → propose **5.5**
- **Concede:** the catcher's mitt is a brown hand with sculpted fingers, and the shin guards flare into blue shells (`crops/high/R06-catcher_glove`). The fielding glove is a fingered mitten (`crops/high/R17-pitcher_hands`, `crops/high/R08-CF`). The cleats are glossy slip-ons (`crops/high/R05-batter_feet`). Collar and sock-top colour edges are polygon-jagged (`crops/high/R02-batter_head`, `crops/high/R09-LF` left ankle). The deltoids are balloon-round (`crops/high/R08-CF` is the clearest case). The uniforms have no folds or placket, only piping (`crops/high/R17-pitcher_hands`). The cap sits high with skin showing under the bill (`crops/high/R09-LF`).
- **Rebut the depth of the drop:** the anchor-5 description ("separate fingers *or* a modelled glove, … faces simple") is exceeded on several axes. Hands grip the bat with closed, separated fingers (`crops/high/R14-batter`, `crops/high/R02-batter_hands`). Faces carry real features: eyes, nose, lips and ears in `crops/high/R16-1B`, and `crops/high/R12-pitcher` keeps a readable face at night. Lettering and numbers are clean and team-specific ("HOT SPRINGS" in R02-batter_hands, "BARNSTORMERS" and #16 in R14-batter). Anatomy at the shoulder, hip and knee reads in the crouch in `crops/high/R16-1B`. That's above 5 in anatomy, hands and identity. It's still far below 7 on gear and cloth, so 5.5 rather than 5.

### Fidelity to reference (charfit): critics 5.5 / 5.0 → propose **5.5**
- **Concede:** the garments are nowhere near `si_jersey_front` (`crops/high/R17-pitcher_hands`). The shoulders are rounder than `mpfb2_athlete` (`crops/high/R08-CF`). Faces are smoother and browless next to `mpfb2_athlete_face_34` (`crops/high/R09-LF`).
- **Rebut:** "faces lack definition" is overstated. `crops/high/R16-1B` and `crops/high/R02-batter_hands` show the MakeHuman eye, nose and lip structure, recognisably the same kind of head as the reference. Proportions agree with the IoU (0.878/0.895) and hold in the crouch (`crops/high/R16-1B`) and in the stride (`crops/high/R12-pitcher`). The 5 anchor ("faces, hands and garments far simpler") fits garments but undersells faces and hands. 5.5.

### Animation: critics 5.5 / 5.0 → propose **5.5**
- **Concede:** the swing finish ends with the bat hanging low at chest height, with no wrap (`strips/high/R04` frames 7–8). The stance foot floats (`crops/high/R05-batter_feet`). The run arms carry no pump: glove at the hip, bare hand cupped forward (`crops/high/R08-CF`, `crops/high/R09-LF`). The trot arms are locked (`strips/high/R10`). The throwing hand is open and empty with the arm back (`crops/high/R12-pitcher`). Codex is right that `strips/high/R07` goes from upright (frame 4) to deep crouch (frame 5) with no visible braking step.
- **Rebut:** two 7-anchor beats are on screen. In `strips/high/R03` there's a staged delivery, from set (1–4) through hands-break (5–6) to a high leg lift (7–8), with the pivot foot planted on the rubber. In `strips/high/R07` frames 5–8 there's a glove-down fielding crouch with the ball arriving into it (frame 7) and a ring flash on possession (frame 8). `strips/high/R04` frames 5–6 have a contact flash, and the torso turns towards the pitcher by frame 7, which partly answers "no hip rotation". `strips/high/R10` plants alternating feet with shadows. That's keyed motion with real beats, at the upper end of the 5 band. Codex's 5.0 ignores the R03 leg lift and the R07 field-and-collect. 5.5.

### Environment: critics 5.5 / 5.0 → propose **5.5**
- **Concede:** the crowd is a photo on sloped slabs above a bare grey band (`high/desktop/R05`). There's a hard seam from photo forest to mist band to faceted blobs (`high/desktop/R09`, `high/desktop/R10`). The dugout is a black box (`crops/high/R14-batter`). Dugout-roof slabs intrude at the frame corners (`high/desktop/R07`). Most importantly, **the loop-9 board fix didn't fully land**: a navy "E" sliver sits between two RIDGELINE PIZZA boards in `crops/high/R07-batter-runner`, the same sliver shows in `high/landscape/R05`, and a cut red "RED" board appears at the left of `crops/high/R05-ump_head`.
- **Rebut:** above the 5 anchor ("crowd as painted texture, trees as cones") there's real mow-stripe turf and grained dirt (`high/desktop/R07`, `crops/high/R05-batter_feet`), plus built light towers, foul poles, a framed scoreboard and distance markers (`high/desktop/R09`). There's also a stylistically distinct historic park with a roofed grandstand and sepia crowd (`high/desktop/R14`, contra Codex's "similarly sparse"). Codex's 5.0 scores the crowd and ignores the field-level work the 7 anchor names. 5.5.

### Lighting: critics 5.5 / 5.5 → propose **5.5**
- **Concede:** there's no visible sky or bounce modelling of the white uniforms (`crops/high/R08-CF`). The night tree line is pure black and the light pool is lopsided (`high/desktop/R13`). There's no haze. Eye sockets go dark under the batting-helmet brim (`crops/high/R02-batter_head`).
- **Rebut (cause and severity):** the brim problem is eye-socket shadow, not a black face. Lips, nose and cheek are lit in `crops/high/R02-batter_head`, and the same batter is fully readable in `crops/high/R02-batter_hands`. Faces under caps in `crops/high/R16-1B` (day) and `crops/high/R12-pitcher` (night) are readable, so the loop-9 self-light floor works except under the deep helmet brim. Contact shadows sit directly under planted feet in `crops/high/R16-1B` and `crops/high/R14-batter`. The golden-hour grade in `high/desktop/R14` is genuinely good. Both critics land at 5.5, and I agree.

### UI: critics 6.5 / 6.5 → propose **6.5**
- **Concede:** the reticle partly occludes the catcher (`high/desktop/R05`). The HR banner overlaps the scoreboard in `high/landscape/R10`. There's no broadcast motion.
- **Rebut:** A's "banner covers the ball" in `high/landscape/R10` is wrong (the ball is visible just under it). The score bug, count and pitch/mph line are consistent across `high/desktop/R05`, `high/desktop/R07` and `high/mobile/R02`. 6.5 stands.

### Readability: critics 6.0 / 5.5 → propose **6.0**
- **Concede:** the portrait fielding frame loses both corner bases and the corner infielders (`high/mobile/R07`, where the foul lines exit the frame edges). The runner on first is cut at the right edge (`high/desktop/R16`). Fielders are small in the broadcast camera (`high/desktop/R07`). Codex is right that identical blue rings don't single out the responsible fielder before possession.
- **Rebut:** the ball does read in the broadcast and night cameras. It's a clear white dot on the infield grass in `high/desktop/R07`, and a white streak next to the scoreboard in `high/desktop/R13` (contra A). In `strips/high/R07` frame 8 the possession ring turns white, a working "fielder with the ball" cue that Codex's G-action-cues doesn't credit. The catcher's mitt stays visible under the reticle (`high/desktop/R05`). 6.0.

### Mobile: critics 6.0 / 5.5 → propose **6.0**
- **Concede:** `high/mobile/R07` loses lateral coverage (Codex) and leaves roughly a quarter of the play area as backstop dirt and grass (A). Both are right, and neither framing is intentional. The top ~27% of `high/mobile/R12` is empty black sky, and the night backdrop has a torn top edge. In `high/mobile/R05` the pitcher is half out of frame and the photo crowd shows tile seams. In `high/landscape/R05` the CB button overlaps the pitcher's legs.
- **Rebut:** `high/mobile/R02` is a well-composed portrait batting frame: large batter, readable HUD at 390 px, thumb-sized BUNT/STEAL/SWING, and the pitcher and zone both clear. `high/mobile/R12`'s batter framing is the same apart from the sky band. The 4× throttled phone proxy holds 63 fps minimum (brief perf table), so it meets the 30 fps condition. The HUD is not cramped, which is the 5 anchor's other condition, so this sits above 5. Half the framings are intentional and half aren't, so 6.0.

### Medium/low regressions
- Concede A: in `low/desktop/R05` pitcher #27's head shows a skin oval with a black band, and it reads as a face from behind. It's conspicuous in the main pitching camera.
- Concede Codex in part: `low/desktop/R02` has a different batter pose (bat high over the shoulder, torso more open) from `high/desktop/R02`. I can't confirm the "broken waist edge" at that frame size.

## Gap adjustments
- **Overlap:** A's G-gear-glove-mitt-cleats, G-uniform-cloth and G-masks-catcher-gear are subsets of Codex's G-uniform-gear. The judge shouldn't count them twice.
- **Codex's +1.5 gains are inflated.** G-uniform-gear, G-grounding-contact, G-reference-detail and G-crowd-construction each bundle 3–6 sub-fixes under effort L. A full point and a half in one category from one loop's work would take the category from 5 to 6.5. I've cut them to 0.75–1.0.
- **G-grounding-contact:** the "both hands open" part is contradicted by `crops/high/R14-batter`, so the real items are foot plant, swing finish and the braking step. Gain 0.75.
- **G-face-under-brim / G-face-light-ground:** the cause is narrower than stated. Faces under caps are readable (`crops/high/R16-1B`, `crops/high/R12-pitcher`), and only the deep helmet brim kills the eyes (`crops/high/R02-batter_head`). Severity 4 → 3, gain 0.5.
- **G-board-slice:** still present in two captures after the claimed fix. Severity 2 → 3, because a regression of a stated fix is a process signal.
- **G-reticle-occludes-catcher:** the mitt stays visible (`high/desktop/R05`). Severity 2 → 1.
- **G-action-cues:** a possession cue exists (`strips/high/R07` frame 8, white ring). The gap is only the pre-possession "who's responsible" cue plus the landscape HUD. Gain 1.0 → 0.5.
- **G-phone-field-coverage / G-mobile-framing:** I concede both. Codex's severity 5 is high for a camera preset (effort S–M), so I've set it to 4 and the gain to 0.75.

```json
{
  "loop": 9,
  "role": "advocate",
  "tier": "high",
  "scores": {
    "characters": {
      "score": 5.5,
      "confidence": 0.7,
      "evidence": [
        { "shot": "crops/high/R14-batter", "note": "both hands closed around the handle; readable faces; team lettering and numbers" },
        { "shot": "crops/high/R16-1B", "note": "eyes, nose, mouth, ears visible; shoulder/hip/knee structure reads in the crouch" },
        { "shot": "crops/high/R06-catcher_glove", "note": "conceded: mitt is a fingered hand; flared shin shells" },
        { "shot": "crops/high/R05-batter_feet", "note": "conceded: glossy slip-on cleats" },
        { "shot": "crops/high/R08-CF", "note": "conceded: balloon deltoids, flat uniform" }
      ]
    },
    "charfit": {
      "score": 5.5,
      "confidence": 0.65,
      "evidence": [
        { "shot": "crops/high/R16-1B", "note": "proportions and facial structure of the MakeHuman athlete hold up" },
        { "shot": "crops/high/R02-batter_hands", "note": "eyes and lips readable on the batter A called a dark mass" },
        { "shot": "crops/high/R12-pitcher", "note": "proportions hold in a full stride; face readable at night" },
        { "shot": "crops/high/R17-pitcher_hands", "note": "conceded: garment far simpler than si_jersey_front" }
      ]
    },
    "animation": {
      "score": 5.5,
      "confidence": 0.65,
      "evidence": [
        { "shot": "strips/high/R03", "note": "set, hands-break and high leg lift with the pivot foot planted" },
        { "shot": "strips/high/R07", "note": "glove-down fielding crouch collects the ball (f7), possession ring (f8); conceded no braking step and no arm pump" },
        { "shot": "strips/high/R04", "note": "contact flash and torso turn; conceded low, unwrapped finish" },
        { "shot": "crops/high/R05-batter_feet", "note": "conceded: front stance foot floats" }
      ]
    },
    "environment": {
      "score": 5.5,
      "confidence": 0.7,
      "evidence": [
        { "shot": "high/desktop/R14", "note": "distinct historic park: roofed grandstand, sepia crowd, different wall" },
        { "shot": "high/desktop/R09", "note": "built towers, foul pole, scoreboard, mow stripes; conceded photo/mist/faceted-tree seam" },
        { "shot": "crops/high/R07-batter-runner", "note": "conceded: navy 'E' board sliver persists after the loop-9 fix" },
        { "shot": "high/desktop/R05", "note": "conceded: photo crowd slab above a bare grey band" }
      ]
    },
    "lighting": {
      "score": 5.5,
      "confidence": 0.7,
      "evidence": [
        { "shot": "crops/high/R02-batter_head", "note": "eyes lost under the helmet brim, but nose, lips and cheek lit" },
        { "shot": "crops/high/R16-1B", "note": "face readable under the cap; contact shadows under planted feet" },
        { "shot": "high/desktop/R14", "note": "convincing golden-hour grade" },
        { "shot": "high/desktop/R13", "note": "conceded: black tree line, lopsided pool, no haze" }
      ]
    },
    "ui": {
      "score": 6.5,
      "confidence": 0.75,
      "evidence": [
        { "shot": "high/desktop/R05", "note": "consistent score bug and pitch controls; reticle partly over the catcher" },
        { "shot": "high/landscape/R10", "note": "banner overlaps the scoreboard but not the ball (A was wrong)" },
        { "shot": "high/mobile/R02", "note": "same type scale and hierarchy on the phone" }
      ]
    },
    "readability": {
      "score": 6.0,
      "confidence": 0.65,
      "evidence": [
        { "shot": "high/desktop/R07", "note": "ball is a clear white dot on the infield grass; rings mark fielders" },
        { "shot": "high/desktop/R13", "note": "ball streak visible beside the scoreboard at night (A was wrong)" },
        { "shot": "strips/high/R07", "note": "possession ring turns white when the fielder has the ball" },
        { "shot": "high/mobile/R07", "note": "conceded: corner bases and corner infielders out of the portrait frame" },
        { "shot": "high/desktop/R16", "note": "conceded: runner on first cut at the frame edge" }
      ]
    },
    "mobile": {
      "score": 6.0,
      "confidence": 0.6,
      "evidence": [
        { "shot": "high/mobile/R02", "note": "intentional portrait batting frame, thumb controls, legible HUD at 390 px" },
        { "shot": "high/mobile/R07", "note": "conceded: lost lateral coverage plus an empty foreground band" },
        { "shot": "high/mobile/R12", "note": "conceded: top ~27% is empty sky; batter framing good" },
        { "shot": "high/landscape/R05", "note": "conceded: CB button overlaps the pitcher's legs" }
      ]
    }
  },
  "gaps": [
    { "id": "G-gear-glove-mitt-cleats", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R06-catcher_glove", "crops/high/R17-pitcher_hands", "crops/high/R05-batter_feet"], "benchmark": "smb4-2", "fix": "Laced-web fielder's glove, fingerless rounded catcher's mitt, laced low-top cleat with tongue and spike plate. Test: no fingers on the mitt in R06-catcher_glove; web lacing visible in R17-pitcher_hands. Overlaps G-uniform-gear; don't double count." },
    { "id": "G-uniform-cloth", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R02-batter_head", "crops/high/R17-pitcher_hands", "crops/high/R09-LF"], "benchmark": "smb3-3", "fix": "Cloth normal/AO with placket, folds and belt loops; move trim and sock colour edges to texture space. Test: no stair-stepped collar or sock edges. Overlaps G-uniform-gear." },
    { "id": "G-face-under-brim", "category": "charfit", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["crops/high/R02-batter_head", "crops/high/R16-1B", "crops/high/R12-pitcher"], "benchmark": "mpfb2_athlete_face_34", "fix": "Severity cut 4 to 3: faces under caps already read (R16-1B, R12-pitcher); only the deep helmet brim loses the eyes. Add brow/eye albedo and an eye-socket fill under the helmet. Test: eyes readable in R02-batter_head." },
    { "id": "G-masks-catcher-gear", "category": "characters", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R05-ump_head", "crops/high/R06-catcher_glove", "crops/high/R14-batter"], "benchmark": "smb3-1", "fix": "A side frame already exists (R05-ump_head left edge, R14-batter); add padding and straps, keep the bars inside the head silhouette, segmented shin guards, chest protector with harness. Overlaps G-uniform-gear." },
    { "id": "G-run-arm-pump", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["strips/high/R07", "strips/high/R10", "crops/high/R08-CF", "crops/high/R09-LF"], "benchmark": "smb4-2", "fix": "Counter-phased arm swing in the run, chase and trot cycles; glove closed, bare hand in a loose fist. Test: hands alternate fore and aft across R07 f1-4 and R10 f1-8." },
    { "id": "G-swing-finish", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS2", "evidence": ["strips/high/R04"], "benchmark": "smb4-3", "fix": "Key a high wrap finish with the back heel up. Test: in R04 f8 the bat head is above the helmet." },
    { "id": "G-foot-plant-ik", "category": "animation", "expectedGain": 0.25, "severity": 3, "effort": "S", "workstream": "WS2", "evidence": ["crops/high/R05-batter_feet"], "fix": "Ground-clamp or foot IK on the stance and idle clips. Test: front sole on the dirt with the shadow directly under it in R05-batter_feet." },
    { "id": "G-crowd-backdrop", "category": "environment", "expectedGain": 0.75, "severity": 4, "effort": "L", "workstream": "WS4", "evidence": ["high/desktop/R05", "high/desktop/R10", "high/desktop/R09", "high/mobile/R05"], "benchmark": "smb4-3", "fix": "Impostor crowd per row, fascia over the grey band, blend the photo backdrop into the tree layer with depth fog, foliage cards. Test: no horizontal seam in R09/R10." },
    { "id": "G-board-slice", "category": "environment", "expectedGain": 0.25, "severity": 3, "effort": "S", "workstream": "WS4", "evidence": ["crops/high/R07-batter-runner", "high/landscape/R05", "crops/high/R05-ump_head"], "fix": "Severity raised 2 to 3: the loop-9 fix didn't land; a navy 'E' sliver persists in two captures and a cut 'RED' board in a third. Check the stand/backstop junction. Test: no partial board in those three captures." },
    { "id": "G-dugout-geometry", "category": "environment", "expectedGain": 0.25, "severity": 2, "effort": "M", "workstream": "WS4", "evidence": ["crops/high/R14-batter", "high/desktop/R07"], "benchmark": "smb3-1", "fix": "Dugout interior; cull the roof slabs that enter the broadcast frustum." },
    { "id": "G-mobile-framing", "category": "mobile", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS5", "evidence": ["high/mobile/R07", "high/mobile/R05", "high/mobile/R12"], "fix": "Portrait camera presets. Test: no empty band over 10% of height; featured players fully framed. Same root as G-phone-field-coverage." },
    { "id": "G-reticle-occludes-catcher", "category": "readability", "expectedGain": 0.25, "severity": 1, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R05"], "fix": "Severity cut 2 to 1: the mitt stays visible under the reticle. Draw the zone outline-only at 50% opacity." },
    { "id": "G-body-variety", "category": "characters", "expectedGain": 0.25, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R08-CF", "crops/high/R16-1B"], "benchmark": "smb4-4", "fix": "Three or more shape presets; reduce the deltoid bulge toward mpfb2_athlete_front." },
    { "id": "G-low-lod-head", "category": "characters", "expectedGain": 0.0, "severity": 2, "effort": "S", "workstream": "WS6", "evidence": ["low/desktop/R05"], "fix": "Confirmed: a black band across a face oval on the back of the pitcher's head at low tier. Fix the LOD2 cap/head material." },
    { "id": "G-uniform-gear", "category": "characters", "expectedGain": 1.0, "severity": 5, "effort": "L", "workstream": "WS1", "evidence": ["crops/high/R02-batter", "crops/high/R06-catcher_glove", "crops/high/R17-pitcher_hands"], "benchmark": "benchmarks/smb3-3.png; benchmarks/smb4-4.png; reference-renders/si_jersey_front.png", "fix": "Gain cut 1.5 to 1.0: an umbrella over A's three gear and cloth gaps, and not credible as +1.5 in one loop. Constructed uniforms, glove pocket and web, segmented catcher gear." },
    { "id": "G-grounding-contact", "category": "animation", "expectedGain": 0.75, "severity": 4, "effort": "L", "workstream": "WS2", "evidence": ["crops/high/R05-batter_feet", "strips/high/R04", "strips/high/R07"], "benchmark": "benchmarks/smb4-3.png", "fix": "Gain 1.5 to 0.75, severity 5 to 4: the open-grip claim is contradicted by crops/high/R14-batter; the remaining items are stance foot plant, swing finish and a braking step before the R07 crouch." },
    { "id": "G-reference-detail", "category": "charfit", "expectedGain": 0.75, "severity": 4, "effort": "L", "workstream": "WS1", "evidence": ["crops/high/R02-batter_head", "crops/high/R17-pitcher_hands", "crops/high/R16-1B"], "benchmark": "art-src/samples/reference-renders/mpfb2_athlete_face_34.png; art-src/samples/reference-renders/mpfb2_athlete_hand.png", "fix": "Gain 1.5 to 0.75: eye, nose and lip structure is already present (R16-1B); the shortfall is brows, eye albedo, knuckle and nail detail." },
    { "id": "G-phone-field-coverage", "category": "mobile", "expectedGain": 0.75, "severity": 4, "effort": "M", "workstream": "WS5", "evidence": ["high/mobile/R07", "high/landscape/R05"], "fix": "Conceded; severity 5 to 4 as a camera-preset fix. Frame the corner bases and receiving fielder in portrait; keep the landscape buttons off the pitcher." },
    { "id": "G-crowd-construction", "category": "environment", "expectedGain": 0.75, "severity": 4, "effort": "L", "workstream": "WS4", "evidence": ["high/desktop/R05", "high/desktop/R14"], "benchmark": "benchmarks/smb3-1.png; benchmarks/smb4-3.png", "fix": "Gain 1.5 to 0.75; duplicates G-crowd-backdrop. Seated silhouettes, rails and wall material." },
    { "id": "G-face-light-ground", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["crops/high/R02-batter_head", "crops/high/R05-batter_feet", "high/desktop/R13"], "benchmark": "benchmarks/smb3-3.png", "fix": "Gain 1.0 to 0.5: only helmet-brim eyes fail, and contact shadows already meet planted feet (R16-1B, R14-batter); the floating foot is an animation cause. Add helmet eye fill and night falloff and fill." },
    { "id": "G-action-cues", "category": "readability", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["high/desktop/R07", "strips/high/R07", "high/landscape/R05"], "fix": "Gain 1.0 to 0.5: a possession ring already exists (R07 strip f8). Add a pre-possession responsible-fielder cue and trim the landscape HUD." },
    { "id": "G-low-tier-pose", "category": "characters", "expectedGain": 0.0, "severity": 2, "effort": "M", "workstream": "WS6", "evidence": ["high/desktop/R02", "low/desktop/R02"], "fix": "The pose differs at low tier (bat high, torso open); the waist defect isn't confirmable at frame size. Match the stance across tiers." }
  ],
  "verdict": "continue"
}
```
