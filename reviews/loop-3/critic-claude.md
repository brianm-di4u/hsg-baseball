# Critic A (critic-claude) — loop 3, high tier

## 1. Verdict

Continue. The body underneath the uniform is now a real human mesh: proportions track the MPFB2 athlete reference, faces have eyes, nose and lips that read in close-ups (`crops/high/R14-batter`, `crops/high/R16-1B`, `crops/high/R09-LF`), and hands have separate jointed fingers. Everything layered on top of that body still lets it down, and some of those layers are visibly broken. Bare scalp pokes through the crown of caps (`high/desktop/R14`, `high/desktop/R17`, `crops/high/R17-pitcher-back`, `crops/high/R05-batter-front`). Fingers stick out through the glove (`crops/high/R17-pitcher_hands`). The glove is a flat brown slab with no pocket or web. Every player wears glossy black dress loafers instead of cleats. Necklines and sleeve cuffs are sawtooth-jagged. Jerseys have no placket, buttons or back numbers. Masks are floating ladders of bars. Every player has the same build. The animation reads as keyed: the batter's shoes hover above the dirt in the stance (`crops/high/R05-batter_feet`), the ground-ball glove never meets the ball (`strips/high/R07`), and the "catch" in left is a jog with the glove at the hip (`crops/high/R09-LF`). The park is a well-textured diamond inside photo-billboard stands, with cone trees and a blank grey wall behind home. Nothing is at a gate yet. Characters are closest to the 5 anchor and are held there by clipping and gear defects, not by anatomy.

## 2. Scores

### characters — 5.0
- **Anatomy and faces are above 5.** The faces lit in `crops/high/R14-batter` (batter and umpire), `crops/high/R16-1B` and `crops/high/R09-LF` have real features. Shoulder, hip and knee structure reads under the cloth in `crops/high/R12-pitcher`. Hands grip the bat in `crops/high/R14-batter` and `crops/high/R02-batter_hands`.
- **Gear and garments drag the score below the 7 anchor, and the clipping below 5.**
  - **Cap clipping:** scalp-coloured patches show through the cap crown on the umpire and on two pitchers (`crops/high/R05-batter-front`, `crops/high/R17-pitcher-back`, `high/desktop/R14`, `high/desktop/R17`).
  - **Glove:** fingers poke through the glove (`crops/high/R17-pitcher_hands`). The glove is a featureless slab, compared with the stitched, laced leather glove in `smb3-3`.
  - **Uniform:** the uniform does not read as cloth. It has no placket, buttons or folds, the belt is a band with a jagged lower edge, and the pitcher's back carries no number (`high/desktop/R05`, `high/desktop/R06`). Benchmark `smb4-4` shows numbers, nameplates and piping.
  - **Footwear:** every player wears the same glossy dress loafer (`crops/high/R05-batter_feet`).
  - **Body types:** all players share one slim body type, against varied builds in `smb4-4`.
- **Materials:** the only real material contrast is the glossy helmet against the matte cloth.

### charfit — 5.5
- **Silhouette and proportions match the reference.** Head-to-body ratio, limb length and torso taper in `crops/high/R12-pitcher` and `crops/high/R16-1B` match `mpfb2_athlete_three_quarter`, consistent with the brief's IoU of 0.875 / 0.901.
- **Faces are the same kind of human as the reference.** `crops/high/R09-LF` against `mpfb2_athlete_face_34`, though flatter: no eye wetness, brows or skin breakup.
- **Most faces are unreadable in play.** Under helmets they fall to near-black (`crops/high/R02-batter_head`, `crops/high/R10-batter-trot`), so at duel distance the face simply isn't there.
- **Hands are close to `mpfb2_athlete_hand` in construction,** but they are clipped through the glove (`crops/high/R17-pitcher_hands`).
- **Garment construction is far simpler than the reference standard.** `si_jersey_front` shows a placket and a real collar; the in-game jersey has a jagged cut neckline.
- **The low tier swaps in a cartoon proxy:** googly eyes, a bowl-cut helmet and clay hands (`crops/low/R02-batter_head`). It is a different character style, not a LOD of the same human.

### animation — 5.0
- **Pitch (`strips/high/R03`):** frames 1–5 are a near-static set. The leg lift starts at frame 6, and by frame 8 the lift leg is kicked out straight rather than tucked. The stride is visible only in `crops/high/R12-pitcher`, which is a decent stride pose.
- **Swing (`strips/high/R04`):**
  - Frames 1–4 show no visible load or stride while the ball is in flight, even though the brief says the stride now plays in flight. The feet and hands barely change.
  - Frames 5–8 do rotate into a follow-through, with a large orange contact bloom and a ball streak. That is good feel, but there is no dust.
- **Planted feet fail in the stance:** both shoes hover above the dirt, with their shadows offset (`crops/high/R05-batter_feet`).
- **Ground ball (`strips/high/R07`):**
  - Frames 1–4 are a readable run.
  - In frames 5–8 the fielder crouches, but the glove stays planted to the left while the ball sits ahead of him (frame 7) and then to his right (frame 8). The new IK reach does not visibly reach the ball.
- **Home-run trot (`strips/high/R10`):** a sprint with a decent leg cycle. The near arm hangs almost straight in every frame (`crops/high/R10-batter-trot`), so the arm drive is weak.
- **Fly-ball catch (`crops/high/R09-LF`):** the "catch" frame shows the glove flat at the hip and the fielder mid-jog.
- **Too small to judge:** `strips/high/R08` and `strips/high/R11` show tiny figures, so they add no weight to the animation evidence.

### environment — 5.0
- **What reaches the 7 anchor:** the turf has mow checkers, the dirt has grain, and the light towers and foul poles are built objects (`high/desktop/R02`, `high/desktop/R07`).
- **Crowd:** a flat photo billboard with visible tile seams and repeats (`high/desktop/R05`, `high/desktop/R17` with its vertical pillar seams). It does not read as 3D people as in `smb3-1` and `smb4-3`.
- **Behind home** (`high/desktop/R05`, `high/desktop/R06`, `high/desktop/R17`): an untextured grey wall, with no backstop net, no signage and no padding.
- **Trees:** cones and spheres in front of a photo backdrop, with a hard horizontal seam where the two meet (`high/desktop/R10`, `high/desktop/R15`).
- **Outfield walls:** carry distance numbers only, with no signage, and the batter's eye is a black box (`high/desktop/R10`).
- **Historic park (`high/desktop/R15`):** odd flat blue-grey discs with dark shards beyond the wall.
- **Dugout:** a black rectangle in a grey box (`crops/high/R14-batter`).
- **Camera blockers:** dark green slab geometry intrudes at the frame edges in `high/desktop/R07`.

### lighting — 5.5
- **Day:** a directional key with soft contact shadows under players (`high/desktop/R02`, `crops/high/R16-runner1`). There is no sky or bounce fill into faces under helmets: the batter's face is a black void in `crops/high/R02-batter_head` and `crops/high/R10-batter-trot`.
- **Golden afternoon (`high/desktop/R14`, `crops/high/R14-batter`):** the best lighting in the set, with a warm key that models faces.
- **Night (`high/desktop/R13`):** shows pools with falloff and multiple soft shadows.
- **Night batting view (`high/desktop/R12`):** fairly flat. The towers have sprite halos but the field is evenly lit, without the contrast or specular of `smb3-3` and `smb4-1`.
- **Atmosphere:** depth haze is minimal, and there is no filmic grade.

### ui — 6.0
- **What works:**
  - The scorebug, count and inning are consistent and broadcast-like, with team crests (`high/desktop/R02`, `high/desktop/R07`).
  - The pitch-speed line is clear.
  - The new result panel has hierarchy (headline plus a smaller detail line) and an accent bar (`high/desktop/R10`, `high/desktop/R15`).
  - Buttons are large and labelled.
- **Shortfalls against `smb3-1` and `ootp26-1`:**
  - The scorebug's two team bars are mostly empty space, with no pitch count or batter stats integrated.
  - The title menu (`high/desktop/R01`) is a washed-out translucent panel: the selected "Season" button has low-contrast white-on-maroon text and the background shows through every button.
  - The home-run banner sits over an empty outfield shot.
  - Landscape drops the pitcher, batter and pitch-speed line entirely (`high/landscape/R07`).

### readability — 5.5
- **Batting view is clear:** the strike zone, batter and pitcher read at a glance (`high/desktop/R02`, `high/mobile/R02`).
- **Field view is weak.** In `high/desktop/R07`, fielders are about 15 px tall and the ball is a tiny white dot. Rings help locate players, but the fielder with the ball does not read.
- **Home-run frame:** `high/desktop/R10` shows neither the batter nor the trot, just an empty outfield.
- **Runner at first:** in `high/desktop/R16` the runner is a few pixels at the right frame edge. The lit base on the bug is the only cue.
- **Wide strips:** in `strips/high/R08` the players are specks.

### mobile — 5.5
- **Portrait batting (`high/mobile/R02`):** well framed, with a large batter, a large zone and thumb-sized buttons.
- **Portrait field view (`high/mobile/R07`):** figures are tiny, and the bottom quarter of the scene is empty dirt and grass below home plate, so the framing is not intentional.
- **Portrait home run (`high/mobile/R10`):** frames the trees.
- **Landscape (`high/landscape/R05`, `high/landscape/R07`):** the HUD bar and control bar take about a third of the height, and the info line is dropped.
- **Performance:** the 4× CPU throttle holds 48 fps minimum on medium (34.6 ms p95), which passes the 30 fps bar.

## 3. Character defects list
1. **Scalp clipping:** skin-coloured scalp shows through the cap crown on the umpire and pitchers (`crops/high/R05-batter-front`, `crops/high/R17-pitcher-back`, `high/desktop/R14`, `high/desktop/R17`).
2. **Fingers through the glove:** fingertips poke out of the back of the glove (`crops/high/R17-pitcher_hands`, `crops/high/R03-pitcher`).
3. **Glove has no construction:** a flat slab or lump with no pocket, web, lacing or stitching (`crops/high/R17-pitcher_hands`, `crops/high/R07-SS`, `crops/high/R06-catcher_glove`).
4. **Jagged neckline and collar band:** sawtooth edges on every jersey (`crops/high/R02-batter_head`, `crops/high/R17-pitcher_hands`, `crops/high/R16-1B`).
5. **Jagged sleeve cuffs at the wrist:** the cuff edge is sawtooth (`crops/high/R02-batter_hands`, `crops/high/R16-runner1`).
6. **No placket, buttons or folds;** the jersey is a smooth shell (`crops/high/R17-pitcher_hands`, `crops/high/R12-pitcher`).
7. **No back number** on the pitcher's jersey (`high/desktop/R05`, `high/desktop/R06`, `high/desktop/R17`).
8. **Front lettering clipped:** it is occluded or cut by the forearm, e.g. "AKESIDE" and "HO T SPRINGS" (`crops/high/R07-SS`, `crops/high/R08-CF`, `crops/high/R10-batter-trot`, `crops/high/R02-batter_hands`).
9. **Body shape shows through the jersey:** chest/nipple bumps are visible (`crops/high/R17-pitcher_hands`, `crops/high/R12-pitcher`).
10. **Skin-tight crotch:** the pants show anatomy at the crotch (`crops/high/R17-pitcher_hands`, `crops/high/R02-pitcher`).
11. **Belt:** a flat black band with a ragged lower edge, with no loops or buckle (`crops/high/R17-pitcher_hands`).
12. **Dress-shoe cleats:** every player wears glossy black loafers with no cleats or laces, and the batter's shoes float off the ground (`crops/high/R05-batter_feet`).
13. **Sock-to-shoe seam:** jagged where the sock meets the shoe (`crops/high/R12-pitcher`, `crops/high/R02-pitcher`).
14. **Batting-helmet earflaps:** hanging ribbon strips on both sides, plus a flat black plane across the cheek (`crops/high/R02-batter_head`, `crops/high/R10-batter-trot`, `crops/high/R07-batter-runner`).
15. **Batting-helmet visor:** a bright white-silver band that reads as a misplaced material (`crops/high/R02-batter_head`).
16. **Masks:**
    - The umpire and catcher masks are a few floating bars with segment gaps, not a frame attached to the head (`crops/high/R05-ump_head`, `crops/high/R06-catcher_glove`, `crops/high/R14-batter`).
    - The ladder in `crops/high/R14-batter` hovers in front of the face.
17. **Umpire's bare shoulder:** a large skin patch shows through the shirt's neckline cut (`crops/high/R05-ump_head`).
18. **Catcher's gear:** the protector and shin guards are glossy blobs with hard flared shells and a jagged blue/white boundary (`crops/high/R06-catcher_glove`, `crops/high/R05-catcher`).
19. **Faces lost under helmets:** faces fall to black under the helmet brim (`crops/high/R02-batter_head`, `crops/high/R10-batter-trot`).
20. **One body type:** every player has the same slim build (`high/desktop/R05` vs `high/desktop/R17`; `crops/high/R07-SS` vs `crops/high/R16-1B`).
21. **Runner's hands are not fists:** the brief says runners' hands close to loose fists, but the open hand with spread fingers is visible (`crops/high/R07-SS`, `crops/high/R10-batter-trot`).
22. **Low tier:** an entirely different cartoon head with googly eyes (`crops/low/R02-batter_head`).

## 4. Ranked gaps
1. **G-cap-scalp-clip** (characters, WS1, sev 5, S, +0.5).
   - Problem: the scalp pokes through the cap crown.
   - Fix: shrink or push the scalp verts under the cap via a cap-region hide mask, or offset the crown, so that no skin pixel shows inside the cap silhouette in `crops/*/R17-pitcher-back` and `R14`.
2. **G-glove-model** (characters, WS1, sev 5, M, +0.5 characters / +0.5 charfit).
   - Replace the slab with a modelled glove: pocket, web, laced fingers, leather normal map.
   - Hide or curl the fingers inside it, so that zero skin pixels show inside the glove in `R17-pitcher_hands`.
3. **G-jersey-construction** (characters, WS1, sev 4, M, +0.5).
   - Clean the neckline, collar and cuffs: replace the sawtooth cut with a smooth edge loop.
   - Add a placket, a button strip and a belt with loops and buckle.
   - Fix the missing back number.
   - Add baked fold normals.
   - Test: no sawtooth in `R02-batter_head` and a number visible in `high/desktop/R05`.
4. **G-cleats-feet-plant** (animation/characters, WS1+WS2, sev 4, S, +0.5).
   - Model cleats with laces and a sole.
   - Add foot IK so that the soles touch the ground in the stance (`R05-batter_feet` gap = 0 px).
5. **G-glove-reach-hits-ball** (animation, WS2, sev 4, M, +0.5).
   - Make the IK target the actual ball intercept, so that in `strips/high/R07` the glove is within one ball width at possession.
   - Have the LF raise the glove above the head for fly catches (`R09-LF`).
6. **G-swing-load-visible** (animation, WS2, sev 3, S, +0.3).
   - Show a visible hands-back load and front-foot stride between `strips/high/R04` frames 1 and 4.
   - Add dust at the plant foot.
7. **G-masks-helmets** (characters, WS1, sev 3, M, +0.3).
   - Model a mask as a frame with pads, attached by a strap.
   - Give the batting helmet one solid earflap and a matte black brim instead of the white visor.
8. **G-face-fill-under-brim** (lighting, WS3, sev 3, S, +0.5).
   - Add sky or bounce fill so faces under helmet brims keep at least 25% luminance (`R02-batter_head`).
9. **G-body-variety** (characters, WS1, sev 3, M, +0.3).
   - Add at least 3 builds (stocky catcher type, tall lean, average) via MPFB shape keys.
10. **G-backstop-crowd** (environment, WS4, sev 4, L, +1.0).
    - Behind home: a backstop net, padded wall signage and a dugout interior.
    - Replace the crowd billboard tiles with layered cards or impostors with no visible seam.
    - Hide the backdrop seam behind 3D tree lines.
11. **G-field-cam-readability** (readability/mobile, WS5, sev 3, S, +0.5).
    - Frame the HR trot and the runner on 1B.
    - In portrait field view, crop the empty dirt below home so that fielders are at least 20 css px.
    - Keep the pitch-speed and info line in landscape.
12. **G-night-contrast** (lighting, WS3, sev 2, S, +0.3).
    - Darker infield edges, specular on helmets and ball, light haze in the tower beams in `R12`.

```json
{
  "loop": 3,
  "role": "critic-claude",
  "tier": "high",
  "verdict": "continue",
  "scores": {
    "characters": {"score": 5.0, "confidence": 0.75, "evidence": [
      {"shot": "crops/high/R17-pitcher_hands", "note": "fingers through slab glove, jagged neckline, no placket, chest bumps"},
      {"shot": "crops/high/R17-pitcher-back", "note": "scalp pokes through cap crown"},
      {"shot": "crops/high/R14-batter", "note": "good faces and bat grip; ump cap scalp clip; ladder masks floating"},
      {"shot": "crops/high/R05-batter_feet", "note": "dress-loafer cleats floating above dirt"},
      {"shot": "crops/high/R02-batter_head", "note": "ribbon earflaps, white visor, face black, sawtooth collar"}
    ]},
    "charfit": {"score": 5.5, "confidence": 0.7, "evidence": [
      {"shot": "crops/high/R12-pitcher", "note": "proportions match mpfb2_athlete_three_quarter"},
      {"shot": "crops/high/R09-LF", "note": "face same kind of human as mpfb2_athlete_face_34 but flatter"},
      {"shot": "crops/high/R17-pitcher_hands", "note": "garment/glove construction far below si_jersey reference"},
      {"shot": "crops/low/R02-batter_head", "note": "low tier is a cartoon proxy, not the same human"}
    ]},
    "animation": {"score": 5.0, "confidence": 0.7, "evidence": [
      {"shot": "strips/high/R04", "note": "no visible load/stride frames 1-4; contact bloom and follow-through ok"},
      {"shot": "strips/high/R07", "note": "glove never meets ball frames 7-8"},
      {"shot": "strips/high/R03", "note": "static set 1-5, straight-leg kick at 8"},
      {"shot": "strips/high/R10", "note": "run cycle reads, near arm hangs straight"},
      {"shot": "crops/high/R05-batter_feet", "note": "feet float in stance"}
    ]},
    "environment": {"score": 5.0, "confidence": 0.7, "evidence": [
      {"shot": "high/desktop/R05", "note": "blank grey wall behind home, photo crowd tile seams"},
      {"shot": "high/desktop/R10", "note": "cone/sphere trees, backdrop seam, black box batter's eye, bare wall"},
      {"shot": "high/desktop/R07", "note": "good mow stripes and dirt grain; slab geometry at frame edges"},
      {"shot": "high/desktop/R15", "note": "odd flat discs/shards beyond wall"}
    ]},
    "lighting": {"score": 5.5, "confidence": 0.65, "evidence": [
      {"shot": "high/desktop/R14", "note": "warm golden key models faces well"},
      {"shot": "crops/high/R02-batter_head", "note": "no fill, face black under helmet"},
      {"shot": "high/desktop/R13", "note": "night pools and multiple soft shadows"},
      {"shot": "high/desktop/R12", "note": "night batting view fairly flat, sprite halos"}
    ]},
    "ui": {"score": 6.0, "confidence": 0.65, "evidence": [
      {"shot": "high/desktop/R10", "note": "new HR panel with hierarchy, over empty outfield"},
      {"shot": "high/desktop/R02", "note": "consistent scorebug and buttons, empty bug bars"},
      {"shot": "high/desktop/R01", "note": "washed-out translucent title menu, low-contrast Season"},
      {"shot": "high/landscape/R07", "note": "info and pitch-speed line dropped"}
    ]},
    "readability": {"score": 5.5, "confidence": 0.65, "evidence": [
      {"shot": "high/desktop/R02", "note": "zone, batter, pitcher clear"},
      {"shot": "high/desktop/R07", "note": "fielders ~15 px, ball a speck"},
      {"shot": "high/desktop/R16", "note": "runner on 1B at frame edge"},
      {"shot": "high/desktop/R10", "note": "HR trot not in frame"}
    ]},
    "mobile": {"score": 5.5, "confidence": 0.65, "evidence": [
      {"shot": "high/mobile/R02", "note": "well framed, big controls"},
      {"shot": "high/mobile/R07", "note": "tiny figures, bottom quarter empty"},
      {"shot": "high/landscape/R05", "note": "HUD and controls take a third of height"},
      {"shot": "high/landscape/R07", "note": "info line dropped; perf 4x throttle 48 fps min passes"}
    ]}
  },
  "gaps": [
    {"id": "G-cap-scalp-clip", "category": "characters", "expectedGain": 0.5, "severity": 5, "effort": "S", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher-back", "high/desktop/R14", "crops/high/R05-batter-front"], "fix": "Hide or shrink scalp under caps (cap-region mask or crown offset); zero skin pixels inside cap silhouette in R17-pitcher-back and R14."},
    {"id": "G-glove-model", "category": "characters", "expectedGain": 0.5, "severity": 5, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R17-pitcher_hands", "crops/high/R06-catcher_glove"], "benchmark": "smb3-3", "fix": "Replace slab with modelled glove (pocket, web, lacing, leather normal map); hide or curl fingers inside so no skin shows through in R17-pitcher_hands."},
    {"id": "G-jersey-construction", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R02-batter_head", "crops/high/R17-pitcher_hands", "high/desktop/R05"], "benchmark": "smb4-4", "fix": "Smooth edge-loop neckline and cuffs (no sawtooth), placket and buttons, belt loops and buckle, fold normals, visible back number in high/desktop/R05."},
    {"id": "G-cleats-feet-plant", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS2", "evidence": ["crops/high/R05-batter_feet"], "fix": "Foot IK grounding in stance (sole-to-ground gap 0 px in R05-batter_feet); model cleats with laces and sole instead of loafers."},
    {"id": "G-glove-reach-hits-ball", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["strips/high/R07", "crops/high/R09-LF"], "fix": "IK target = actual ball intercept so the glove is within one ball width at possession in strips/high/R07; overhead glove raise for fly catches."},
    {"id": "G-swing-load-visible", "category": "animation", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS2", "evidence": ["strips/high/R04"], "fix": "Visible hands-back load and front-foot stride across strip frames 1-4; dust puff at the plant foot."},
    {"id": "G-masks-helmets", "category": "characters", "expectedGain": 0.3, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R05-ump_head", "crops/high/R14-batter", "crops/high/R02-batter_head"], "fix": "Framed mask with pads and strap attached to the head; single solid earflap on batting helmet; matte brim instead of white visor band."},
    {"id": "G-face-fill-under-brim", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS3", "evidence": ["crops/high/R02-batter_head", "crops/high/R10-batter-trot"], "fix": "Sky/bounce fill so faces under helmet brims keep >= 25% luminance and features read."},
    {"id": "G-body-variety", "category": "characters", "expectedGain": 0.3, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["high/desktop/R05", "crops/high/R16-1B"], "benchmark": "smb4-4", "fix": "At least 3 distinct builds via MPFB shape keys (stocky, tall-lean, average) assigned per player."},
    {"id": "G-backstop-crowd", "category": "environment", "expectedGain": 1.0, "severity": 4, "effort": "L", "workstream": "WS4", "evidence": ["high/desktop/R05", "high/desktop/R17", "high/desktop/R10"], "benchmark": "smb3-1", "fix": "Backstop net, padded wall signage and dugout interiors; replace crowd billboard tiles with seamless layered cards; hide backdrop seam behind 3D tree lines; outfield wall signage."},
    {"id": "G-field-cam-readability", "category": "readability", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS5", "evidence": ["high/desktop/R10", "high/desktop/R16", "high/mobile/R07", "high/landscape/R07"], "fix": "Frame the HR trot and runner on 1B; crop empty dirt in portrait field view so fielders >= 20 css px; keep the info and pitch-speed line in landscape."},
    {"id": "G-night-contrast", "category": "lighting", "expectedGain": 0.3, "severity": 2, "effort": "S", "workstream": "WS3", "evidence": ["high/desktop/R12"], "benchmark": "smb4-1", "fix": "Stronger pool falloff on the night batting view, helmet and ball specular, light haze in the tower beams."}
  ]
}
```
