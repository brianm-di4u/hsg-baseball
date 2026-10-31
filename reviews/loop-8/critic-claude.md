# Critic A (critic-claude): loop 8, high tier

## 1. Verdict

Diamond Springs is now a clean, consistent, mid-fidelity 3D baseball game. It has real faces, separate fingers, readable uniforms and a working broadcast HUD. Up close, the player models still fall short of the 7 anchors. Uniforms are flat colour blocks with no folds. Gloves are faceted brown lumps with no pocket or lacing. Cleats look like glossy dress shoes with aliased, saw-tooth white panels. The umpire and catcher cages still float off the face rather than mounting to the head. The upper arms and deltoids read as inflated pads (the pitcher in `crops/high/R03-pitcher`). The shoulder fix is visible: shoulders no longer sit at ear height in `crops/high/R02-batter_hands` or `crops/high/R16-runner1`. But the reference athlete (`mpfb2_athlete_three_quarter`) has narrow, sloped shoulders, while ours still look padded and square. Animation reads in every strip (leg lift, swing with contact flash, a fielder breaking and bending to the ball, a trot cycle). It is still keyed and stiff: the glove arm hangs rigid at the side while running, and the free hand is a flat open palm. The environment has clear bugs: overlapping ad panels in at least four captures, and a black slab and floating grey discs beyond the outfield wall. Nothing here reaches a gate. This loop is an increment, not a step change.

## 2. Category scores

### Characters: 6.0
- Faces have real features: nose, lips, brow and ear modelling in `crops/high/R09-LF`, `crops/high/R08-CF` and `crops/high/R16-1B`. They hold up at medium close-up and are not uncanny. Skin tones vary (`crops/high/R16-runner1` against `crops/high/R16-1B`).
- Hands have separate, curled fingers and wrap the bat in `crops/high/R02-batter_hands` and `crops/high/R14-batter`, so the 7 anchor's grip clause is roughly met.
- Uniforms are flat colour blocks. There is a placket stripe, a belt, sleeves and stirrup socks, but no folds, seams, buttons or fabric texture anywhere (`crops/high/R17-pitcher_hands`, `crops/high/R07-SS`). Compare the reference `si_jersey_three_quarter`, which shows weave, wear and tailoring. The 5 anchor ("uniforms are color blocks with no cloth detail") describes this almost exactly.
- Gear is weak:
  - The fielding gloves are blobby brown mitts with no pocket, web or laces (`crops/high/R17-pitcher_hands`, `crops/high/R06-catcher_glove`).
  - The cleats are dress shoes with jagged, stepped white texture panels (`crops/high/R05-batter_feet`).
  - The umpire's mask is a ladder of bars floating in front of the face with no frame or padding (`crops/high/R05-ump_head`, `crops/high/R05-batter-front`).
- Material contrast exists: the helmet has a specular sheen in `crops/high/R02-batter_head`, the flannel is matte, and the glove is a duller brown. That is better than the 5 anchor.
- Body types: every player shares one build, with only height and skin tone varying. There are not 3 visibly different body types (`high/desktop/R14`, `high/desktop/R17`).
- Benchmark: smb4-2 has sculpted cloth folds, a modelled glove with a pocket, and expressive faces. We sit well under it.

### Fidelity to reference (charfit): 5.5
- The face construction matches the MPFB base, as in `mpfb2_athlete_face_34` against `crops/high/R09-LF`. The head size and limb lengths are roughly right, and the brief's silhouette IoU is 0.88–0.89.
- The torso silhouette diverges. The reference athlete has a lean, sloped shoulder line. Our players have puffy, rounded deltoid masses that read as shoulder pads, and the upper arm is as thick as the thigh (`crops/high/R03-pitcher`, `crops/high/R08-CF`, `crops/high/R07-SS`).
- Garments are far simpler than `si_jersey_front` and `si_jersey_three_quarter`. They have no collar construction, hem, sleeve opening or cloth thickness. The jersey looks painted onto the skin, with the body shape showing through at the crotch and seat (`crops/high/R17-pitcher_hands`, `crops/high/R06-catcher_glove`, where the batter's seat is a smooth grey dome).
- Hands are close to `mpfb2_athlete_hand` in finger count and proportion, but they are slightly oversized and puffy (`crops/high/R17-pitcher_hands`).
- At broadcast distance (`high/desktop/R08`, `high/desktop/R09`), the players are 15–25 px tall and read only as humanoid. The LOD2 pixel error (41–48%) suggests far players lose their shape.
- Result: proportions are roughly right and the silhouette is recognisable, but the garments are far simpler. That sits at the 5 anchor plus a face bonus.

### Animation & game feel: 6.0
- `strips/high/R03`: the set position, hands coming together, and leg lift reading clearly in frames 6–8. The plant foot stays on the rubber with no skating. The strip ends before the stride and release, so weight transfer can't be confirmed.
- `strips/high/R04`: load (1–4), stride, a contact flash on the ball (5–6) and a finish (7–8). Hip rotation is modest and the finish looks upright and stiff, but contact sells thanks to the flash and the ball trail.
- `strips/high/R07`: the shortstop breaks and runs (1–4), then drops into a fielding crouch with the glove down at the ball (5–8). It has clear beats, and the feet look planted in the crouch.
- `strips/high/R10`: the trot cycle reads, with alternating feet and arm swing. The runner is near-identical between frames 1/5 and 4/8, a short loop. Some feet are lifted off the ground, which is expected in a run.
- In the running poses, the glove arm hangs straight down and back, locked, and the free hand is a flat palm rather than a loose fist (`crops/high/R07-SS`, `crops/high/R08-CF`, `crops/high/R09-LF`). That reads as stiff.
- `strips/high/R08` is too far away to judge limb motion. The figures are about 10 px tall.
- No dust at the feet appears in any strip. The camera follow is acceptable (`strips/high/R11`).
- Result: between the 5 and 7 anchors.

### Environment: 6.0
- Positives:
  - The turf has mow stripes and grain at field level (`crops/high/R09-LF`), and the dirt has grain (`crops/high/R05-batter_feet`).
  - The crowd is a photographic texture that reads as people (`high/desktop/R14`, `high/desktop/R17`).
  - The park has light towers, a scoreboard, foul poles, a backstop netting texture and signage.
- Visual bugs (the 7 anchor says "no visual bugs"):
  - Overlapping, z-fighting ad panels show garbled text: "GATOR F|TORS" in `crops/high/R02-batter_hands`, "REDBIRD FEE|WARE" in `crops/high/R07-batter-runner`, "REDB|WARE" in `crops/high/R05-catcher` and "RED|WARE" in `crops/high/R05-ump_head`, and "NET[]E MOTORS" / "GATOR []TORS" in `crops/high/R17-pitcher-back`.
  - A large, flat black rectangle sits behind the centre-field wall (`high/desktop/R09`, `high/desktop/R10`, `high/desktop/R08`).
  - In the historic park, grey-blue discs with dark shards float beyond the wall (`high/desktop/R15`).
- Trees are faceted low-poly blobs and cones, set directly against a photographic painted backdrop. The style clash is obvious (`high/desktop/R09`, `crops/high/R16-runner1`).
- Benchmark: smb3-1 and smb4-3 have dense, coherent dressing with no layering bugs.

### Lighting & atmosphere: 6.5
- There is a directional key with real shadows, and the contact shadows under the feet are tight ovals (`crops/high/R05-batter_feet`, `crops/high/R16-1B`). Grounding is good.
- Night exposure from the towers works. The light pools and haze glow on the poles are in `high/desktop/R12` and `high/desktop/R13`, and the batter is well lit in R12.
- The historic park's golden afternoon (`high/desktop/R14`) has a warm grade with long shadows.
- Faces under the helmet brim go almost black, with no bounce or sky fill (`crops/high/R02-batter_head`, `crops/medium/R02-batter_head`). The face is unreadable from the batting camera. The 7 anchor asks for "sky light and bounce that model the faces".
- Batting-helmet specular is present, but the uniforms take light flatly (`crops/high/R17-pitcher_hands`).
- Benchmark: smb3-3 and smb4-1 model faces with fill. We sit just under the 7 anchor.

### UI & typography: 6.5
- The score bug is consistent: team crest, score, diamond, count and pitcher/batter line in `high/desktop/R02` and `high/desktop/R05`. The "HOME RUN / 400 FT" banner has a clear hierarchy (`high/desktop/R10`, `high/desktop/R15`).
- In the title menu, the panel is translucent over a busy scene. The Season button is a low-contrast dark-red block, and a "355" distance marker shows through its lower right corner. Body text is small grey on beige (`high/desktop/R01`).
- The pitch target reticle sits directly over the catcher's face (`high/desktop/R05`, `high/desktop/R17`). That is functional, but it covers the action. There is no pitch or timing meter in any frame.
- Benchmark: ootp26-1 and smb3-1 have a tighter TV package. There is no motion to judge.

### Readability: 6.0
- Batting views read well: the zone, batter and pitcher are clear (`high/desktop/R02`, `high/desktop/R16`, `high/desktop/R12`).
- In the field cameras, fielders are 10–20 px tall and the ball is about 4 px (`high/desktop/R08`, `high/desktop/R09`, `high/desktop/R10`). In R10 the batter-runner is cut off at the bottom edge. In R09 the ball is only findable by its shadow.
- `high/desktop/R07`: the ball sits loose on the infield grass and stands out against it. The runner has a yellow ring, and the fielders have blue rings.

### Mobile: 6.5
- Portrait batting is well framed: a big batter, a clear zone and large thumb buttons (`high/mobile/R02`).
- In portrait pitching, the pitcher fills the bottom-left and is cut off by the frame. That reads as more cramped than intended (`high/mobile/R05`).
- In landscape, the pitch-select buttons sit over the pitcher's legs (`high/landscape/R05`). In `high/landscape/R07`, the fast-forward button sits on the field near home.
- `high/mobile/R07` portrait is readable. In `high/mobile/R10`, the outfielders are tiny.
- The perf table reports 63 fps at medium-mobile with 4× throttle, which passes the 30 fps phone-proxy bar.

## 3. Character defects list
1. The deltoids and upper arms are inflated and pad-like, so the shoulder silhouette is wider and rounder than the reference: `crops/high/R03-pitcher`, `crops/high/R08-CF`, `crops/high/R07-SS`.
2. Uniforms have no cloth folds, seams, buttons or texture, and the jersey and pants read as painted skin: `crops/high/R17-pitcher_hands`, `crops/high/R06-catcher_glove` (the batter's seat in the foreground is a smooth dome), `crops/high/R10-batter-trot`.
3. Fielding gloves are faceted lumps with no pocket, web or lacing: `crops/high/R17-pitcher_hands`, `crops/high/R06-catcher_glove`, `crops/high/R08-CF`.
4. Cleats are dress-shoe shapes with stepped, aliased white side panels and no spikes: `crops/high/R05-batter_feet`, `crops/high/R07-SS`, `crops/high/R16-runner1`.
5. The umpire's mask bars float in front of the face as a disconnected ladder, with no frame, padding or straps to the head. Segment joins are still visible on the bars: `crops/high/R05-ump_head`, `crops/high/R05-batter-front`, `crops/high/R14-batter`.
6. The catcher's mask bars sit in front of the helmet opening without a frame: `crops/high/R06-catcher_glove`, `crops/high/R05-catcher`.
7. The catcher's leg guards are flat blue flaps flaring off the shin, not shaped guards with knee cups: `crops/high/R06-catcher_glove`, `crops/high/R05-catcher`.
8. Batting-helmet ear flaps hang as thin vertical slabs well off the cheek. The face under the brim is unlit and nearly black: `crops/high/R02-batter_head`.
9. In the running pose, the glove hand and arm are locked straight down and the free hand is a flat open palm: `crops/high/R07-SS`, `crops/high/R09-LF`, `crops/high/R08-CF`.
10. Sock-to-pant transitions on the shins have jagged, torn-looking edges (alpha or texture stepping): `crops/high/R07-SS`, `crops/high/R08-CF`, `crops/high/R09-LF`.
11. The umpire is bald, with no hair or cap texture under the helmet. The ear and neck show a sharp skin/black-shirt cut: `crops/high/R05-batter-front`, `crops/high/R14-batter`.
12. The jersey lettering overlaps itself, with letters crossing the piping ("LAKESIDE" over the piping, letters crowded): `crops/high/R09-LF`, `crops/high/R08-CF`. "LAKE HAMILTON" is legible in `crops/high/R17-pitcher_hands`.
13. Every player shares one body type: `high/desktop/R14`, `high/desktop/R17`, `crops/high/R16-runner1`.
14. Hands are slightly oversized and puffy relative to the forearm: `crops/high/R17-pitcher_hands`, `crops/high/R08-CF`.

## 4. Ranked gaps

1. **G-cloth-detail** (characters, WS1). Severity 5, effort M, expected gain +0.75. Add a normal-mapped flannel weave, seam lines, a button placket and baked fold maps on the jersey and pants. Add a tucked-hem and belt-loop break. Test: in `crops/high/R17-pitcher_hands` and `crops/high/R10-batter-trot`, folds should be visible at the elbow, waist and knee.
2. **G-glove-model** (characters, WS1). Severity 4, effort M, expected gain +0.5. Replace the glove with a modelled pocket, web, finger stalls and lacing, plus a leather normal map. Test: `crops/high/R06-catcher_glove` and `crops/high/R17-pitcher_hands` show the pocket and web.
3. **G-shoulder-mass** (charfit, WS1). Severity 4, effort M, expected gain +0.5. Reduce deltoid and upper-arm girth by about 15% and slope the trapezius toward the reference. Test: the upper arm should be no wider than the forearm-plus-30% in `crops/high/R03-pitcher`, and the silhouette IoU should rise above 0.9.
4. **G-mask-mount** (characters, WS1). Severity 3, effort S, expected gain +0.25. Give the umpire and catcher masks a frame, chin and forehead pads and straps, flush to the face. Test: in `crops/high/R05-ump_head` side views there should be no air gap between the bars and the face.
5. **G-ad-panel-overlap** (environment, WS4). Severity 4, effort S, expected gain +0.5. De-duplicate or space the outfield ad boards so no two quads overlap. Test: no garbled sign text in `crops/high/R02-batter_hands`, `crops/high/R07-batter-runner` or `crops/high/R17-pitcher-back`.
6. **G-cf-black-slab** (environment, WS4). Severity 3, effort S, expected gain +0.25. Texture or remove the black batter's-eye slab beyond centre field, and the floating discs in the historic park. Test: `high/desktop/R09` and `high/desktop/R15` are clean.
7. **G-face-fill** (lighting, WS3). Severity 3, effort S, expected gain +0.5. Add a hemisphere or sky fill and a bounce term for skin under helmet brims. Test: the face in `crops/high/R02-batter_head` should show its features, with mean skin luminance above 15%.
8. **G-run-arms** (animation, WS2). Severity 4, effort M, expected gain +0.5. Give the glove arm a pumping arc in the run cycle and curl the free hand into a loose fist. Test: in `strips/high/R07` and `strips/high/R10`, the glove elbow angle changes by more than 40° across the cycle.
9. **G-cleats** (characters, WS1). Severity 2, effort S, expected gain +0.25. Use a higher-resolution or vector cleat texture and add sole spikes or a tread lip. Test: no stair-step edges in `crops/high/R05-batter_feet`.
10. **G-field-cam-scale** (readability, WS5). Severity 3, effort M, expected gain +0.5. Tighten the outfield and fly-ball cameras so fielders are at least 35 px tall, and add a ball halo. Test: in `high/desktop/R08` and `high/desktop/R09`, the ball is findable without its shadow.
11. **G-body-types** (characters, WS1). Severity 3, effort M, expected gain +0.25. Add at least 3 body morphs (stocky, lanky, average). Test: the differences are visible in `high/desktop/R14`.
12. **G-landscape-overlap** (mobile, WS7). Severity 2, effort S, expected gain +0.25. Move the landscape pitch and fast-forward buttons off the action, or shift the camera. Test: in `high/landscape/R05`, no button overlaps a player.

## 5. JSON

```json
{
  "loop": 8,
  "role": "critic-claude",
  "tier": "high",
  "scores": {
    "characters": { "score": 6.0, "confidence": 0.75, "evidence": [
      { "shot": "crops/high/R09-LF", "note": "real facial features, flat colour-block uniform, no folds" },
      { "shot": "crops/high/R17-pitcher_hands", "note": "lumpy glove with no pocket; jersey has no cloth detail" },
      { "shot": "crops/high/R05-ump_head", "note": "mask bars float off the face" },
      { "shot": "crops/high/R05-batter_feet", "note": "dress-shoe cleats with aliased panels" },
      { "shot": "crops/high/R02-batter_hands", "note": "fingers wrap the bat" } ] },
    "charfit": { "score": 5.5, "confidence": 0.7, "evidence": [
      { "shot": "crops/high/R03-pitcher", "note": "inflated deltoids against the lean reference athlete" },
      { "shot": "crops/high/R08-CF", "note": "face matches the MPFB base; garments far simpler than si_jersey" },
      { "shot": "high/desktop/R09", "note": "broadcast-distance players read only as humanoid" } ] },
    "animation": { "score": 6.0, "confidence": 0.7, "evidence": [
      { "shot": "strips/high/R03", "note": "leg lift reads; plant foot holds" },
      { "shot": "strips/high/R04", "note": "load, stride, contact flash; stiff finish" },
      { "shot": "strips/high/R07", "note": "break and fielding crouch with clear beats" },
      { "shot": "crops/high/R07-SS", "note": "rigid glove arm and flat palm when running" } ] },
    "environment": { "score": 6.0, "confidence": 0.75, "evidence": [
      { "shot": "crops/high/R07-batter-runner", "note": "overlapping ad panels (REDBIRD FEE|WARE)" },
      { "shot": "crops/high/R17-pitcher-back", "note": "garbled overlapping sign text" },
      { "shot": "high/desktop/R09", "note": "black slab beyond centre field; low-poly trees against a photo backdrop" },
      { "shot": "high/desktop/R15", "note": "floating grey discs beyond the wall" } ] },
    "lighting": { "score": 6.5, "confidence": 0.7, "evidence": [
      { "shot": "high/desktop/R12", "note": "night tower lighting works" },
      { "shot": "crops/high/R05-batter_feet", "note": "tight contact shadows" },
      { "shot": "crops/high/R02-batter_head", "note": "face black under the brim; no fill" } ] },
    "ui": { "score": 6.5, "confidence": 0.65, "evidence": [
      { "shot": "high/desktop/R02", "note": "consistent score bug and count" },
      { "shot": "high/desktop/R10", "note": "home run banner hierarchy" },
      { "shot": "high/desktop/R01", "note": "translucent menu; low-contrast Season button; 355 bleeds through" } ] },
    "readability": { "score": 6.0, "confidence": 0.7, "evidence": [
      { "shot": "high/desktop/R02", "note": "batting view clear" },
      { "shot": "high/desktop/R09", "note": "tiny fielders; ball findable only by its shadow" },
      { "shot": "high/desktop/R10", "note": "tiny figures; runner cut off at the frame edge" } ] },
    "mobile": { "score": 6.5, "confidence": 0.65, "evidence": [
      { "shot": "high/mobile/R02", "note": "good portrait batting framing" },
      { "shot": "high/landscape/R05", "note": "pitch buttons overlap the pitcher" },
      { "shot": "high/mobile/R05", "note": "pitcher cut off; cramped" } ] }
  },
  "gaps": [
    { "id": "G-cloth-detail", "category": "characters", "expectedGain": 0.75, "severity": 5, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R10-batter-trot"], "benchmark": "smb4-2", "fix": "Normal-mapped flannel weave, seams, button placket and baked fold maps on jersey and pants; folds visible at elbow, waist and knee." },
    { "id": "G-glove-model", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R06-catcher_glove", "crops/high/R17-pitcher_hands"], "benchmark": "smb4-2", "fix": "Model the glove pocket, web, finger stalls and lacing, with a leather normal map." },
    { "id": "G-shoulder-mass", "category": "charfit", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R03-pitcher", "crops/high/R08-CF"], "benchmark": "mpfb2_athlete_three_quarter", "fix": "Cut deltoid and upper-arm girth about 15% and slope the trapezius toward the reference; target silhouette IoU above 0.9." },
    { "id": "G-ad-panel-overlap", "category": "environment", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS4", "evidence": ["crops/high/R02-batter_hands", "crops/high/R07-batter-runner", "crops/high/R17-pitcher-back"], "benchmark": "smb3-1", "fix": "Space or de-duplicate the outfield ad boards so no quads overlap; no garbled text." },
    { "id": "G-face-fill", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS3", "evidence": ["crops/high/R02-batter_head"], "benchmark": "smb3-3", "fix": "Hemisphere sky fill plus a bounce term so skin under helmet brims shows its features." },
    { "id": "G-run-arms", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["crops/high/R07-SS", "strips/high/R10"], "benchmark": "smb4-2", "fix": "Pumping glove-arm arc and a loose fist on the free hand in the run cycle; glove elbow angle varies by more than 40 degrees." },
    { "id": "G-field-cam-scale", "category": "readability", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS5", "evidence": ["high/desktop/R08", "high/desktop/R09"], "benchmark": "smb3-1", "fix": "Tighter outfield cameras (fielders at least 35 px tall) and a ball halo." },
    { "id": "G-mask-mount", "category": "characters", "expectedGain": 0.25, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R05-ump_head", "crops/high/R05-batter-front"], "fix": "Mask frame, pads and straps flush to the face; no air gap in side view." },
    { "id": "G-cf-black-slab", "category": "environment", "expectedGain": 0.25, "severity": 3, "effort": "S", "workstream": "WS4", "evidence": ["high/desktop/R09", "high/desktop/R15"], "fix": "Texture or remove the black slab beyond centre field and the floating discs in the historic park." },
    { "id": "G-cleats", "category": "characters", "expectedGain": 0.25, "severity": 2, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R05-batter_feet"], "fix": "Higher-resolution cleat texture, plus spikes or a tread lip." },
    { "id": "G-body-types", "category": "characters", "expectedGain": 0.25, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["high/desktop/R14", "high/desktop/R17"], "fix": "At least 3 body morphs (stocky, lanky, average) assigned per player." },
    { "id": "G-landscape-overlap", "category": "mobile", "expectedGain": 0.25, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/landscape/R05", "high/landscape/R07"], "fix": "Move landscape buttons off the action or shift the camera framing." }
  ],
  "verdict": "continue"
}
```
