# Critic brief: loop 3

You are an independent, deliberately harsh visual critic. You are reviewing **Diamond Springs**, a browser (three.js) high-school baseball game, against shipped baseball games and a set of realistic reference player models. The campaign's priority is **the player characters**: their models, their accuracy to the references, and their animation. Your scores drive a development loop. Inflated scores waste the developer's time; deflated ones without evidence get thrown out by the judge. Be exact and cite.

You have not seen any earlier score, any other reviewer, or the developer's opinion. Don't look for them: `reviews/HISTORY.md`, `reviews/history.json` and other `reviews/loop-*/` folders are off limits.

All paths below are relative to the repository root `C:\Video Game Projects\repos\hsg-baseball`.

## Read first
- Rubric: `reviews/RUBRIC.md`. Anchors, gates and the evidence rule.
- Output schema: `reviews/schema.json`.
- Benchmarks: `benchmarks/*.png` and `benchmarks/README.md`.
- Reference renders (if present): `art-src/samples/reference-renders/`.

## What to review
Captures were made on a real GPU (RTX 5060) in headless Chrome, at 1280×800 desktop, 390×844@2× mobile (portrait phone) and 844×390@2× landscape (phone held sideways). Root: `screenshots/review-loop-3/`.

GPU: ANGLE (NVIDIA, NVIDIA GeForce RTX 5060 (0x00002F06) Direct3D11 vs_5_0 ps_5_0, D3D11). Tiers captured: high, medium, low.

| Id | Moment | Main categories | Frames | Close-ups | Strip |
|---|---|---|---|---|---|
| R01 | Title flyover, home park | environment, lighting | `high/desktop/R01`, `medium/desktop/R01`, `low/desktop/R01` | — | — |
| R02 | Batting: catcher's-eye camera before the pitch | characters, ui, readability | `high/desktop/R02`, `high/mobile/R02`, `high/landscape/R02`, `medium/desktop/R02`, `medium/mobile/R02`, `medium/landscape/R02`, `low/desktop/R02`, `low/mobile/R02`, `low/landscape/R02` | `crops/high/R02-batter`, `crops/high/R02-batter_head`, `crops/high/R02-batter_hands`, `crops/high/R02-pitcher`, `crops/medium/R02-batter`, `crops/medium/R02-batter_head`, `crops/medium/R02-batter_hands`, `crops/medium/R02-pitcher`, `crops/low/R02-batter`, `crops/low/R02-batter_head`, `crops/low/R02-batter_hands`, `crops/low/R02-pitcher` | — |
| R03 | Pitch delivery (batting camera) | animation, characters | `high/desktop/R03`, `medium/desktop/R03`, `low/desktop/R03` | `crops/high/R03-pitcher`, `crops/medium/R03-pitcher`, `crops/low/R03-pitcher` | `strips/high/R03`, `strips/medium/R03`, `strips/low/R03` |
| R04 | Swing through contact | animation, readability | `high/desktop/R04`, `medium/desktop/R04`, `low/desktop/R04` | `crops/high/R04-batter`, `crops/medium/R04-batter`, `crops/low/R04-batter` | `strips/high/R04`, `strips/medium/R04`, `strips/low/R04` |
| R05 | Pitching: center-field camera with batter, catcher and umpire | characters, ui, readability | `high/desktop/R05`, `high/mobile/R05`, `high/landscape/R05`, `medium/desktop/R05`, `medium/mobile/R05`, `medium/landscape/R05`, `low/desktop/R05`, `low/mobile/R05`, `low/landscape/R05` | `crops/high/R05-catcher`, `crops/high/R05-ump`, `crops/high/R05-ump_head`, `crops/high/R05-batter-front`, `crops/high/R05-batter_feet`, `crops/medium/R05-catcher`, `crops/medium/R05-ump`, `crops/medium/R05-ump_head`, `crops/medium/R05-batter-front`, `crops/medium/R05-batter_feet`, `crops/low/R05-catcher`, `crops/low/R05-ump`, `crops/low/R05-ump_head`, `crops/low/R05-batter-front`, `crops/low/R05-batter_feet` | — |
| R06 | Pitch in flight, center-field camera | readability, animation | `high/desktop/R06`, `medium/desktop/R06`, `low/desktop/R06` | `crops/high/R06-catcher_glove`, `crops/medium/R06-catcher_glove`, `crops/low/R06-catcher_glove` | — |
| R07 | Ground ball to short: fielders break | animation, characters, readability | `high/desktop/R07`, `high/mobile/R07`, `high/landscape/R07`, `medium/desktop/R07`, `medium/mobile/R07`, `medium/landscape/R07`, `low/desktop/R07`, `low/mobile/R07`, `low/landscape/R07` | `crops/high/R07-SS`, `crops/high/R07-batter-runner`, `crops/medium/R07-SS`, `crops/medium/R07-batter-runner`, `crops/low/R07-SS`, `crops/low/R07-batter-runner` | `strips/high/R07`, `strips/medium/R07`, `strips/low/R07` |
| R08 | Line drive in the gap: outfield chase | animation, environment | `high/desktop/R08`, `medium/desktop/R08`, `low/desktop/R08` | `crops/high/R08-CF`, `crops/medium/R08-CF`, `crops/low/R08-CF` | `strips/high/R08`, `strips/medium/R08`, `strips/low/R08` |
| R09 | Fly ball caught in left | animation, characters | `high/desktop/R09`, `medium/desktop/R09`, `low/desktop/R09` | `crops/high/R09-LF`, `crops/medium/R09-LF`, `crops/low/R09-LF` | — |
| R10 | Home run trot | characters, animation, environment | `high/desktop/R10`, `high/mobile/R10`, `high/landscape/R10`, `medium/desktop/R10`, `medium/mobile/R10`, `medium/landscape/R10`, `low/desktop/R10`, `low/mobile/R10`, `low/landscape/R10` | `crops/high/R10-batter-trot`, `crops/medium/R10-batter-trot`, `crops/low/R10-batter-trot` | `strips/high/R10`, `strips/medium/R10`, `strips/low/R10` |
| R11 | Replay angle, first-base side | environment, animation | `high/desktop/R11`, `medium/desktop/R11`, `low/desktop/R11` | — | `strips/high/R11`, `strips/medium/R11`, `strips/low/R11` |
| R12 | Night final at Majestic Park, pitch in flight | lighting, environment | `high/desktop/R12`, `high/mobile/R12`, `high/landscape/R12`, `medium/desktop/R12`, `medium/mobile/R12`, `medium/landscape/R12`, `low/desktop/R12`, `low/mobile/R12`, `low/landscape/R12` | `crops/high/R12-pitcher`, `crops/medium/R12-pitcher`, `crops/low/R12-pitcher` | — |
| R13 | Night field view at Majestic Park | lighting, environment | `high/desktop/R13`, `medium/desktop/R13`, `low/desktop/R13` | — | — |
| R14 | Historic park, golden afternoon, pitching camera | environment, lighting, characters | `high/desktop/R14`, `medium/desktop/R14`, `low/desktop/R14` | `crops/high/R14-batter`, `crops/medium/R14-batter`, `crops/low/R14-batter` | — |
| R15 | Historic park: deep fly to right center | environment, lighting | `high/desktop/R15`, `medium/desktop/R15`, `low/desktop/R15` | — | — |
| R16 | Runners on, batting camera (lead-offs) | characters, readability | `high/desktop/R16`, `medium/desktop/R16`, `low/desktop/R16` | `crops/high/R16-runner1`, `crops/high/R16-1B`, `crops/medium/R16-runner1`, `crops/medium/R16-1B`, `crops/low/R16-runner1`, `crops/low/R16-1B` | — |
| R17 | Majestic Park by day, pitching camera | environment, characters | `high/desktop/R17`, `medium/desktop/R17`, `low/desktop/R17` | `crops/high/R17-pitcher-back`, `crops/high/R17-pitcher_hands`, `crops/medium/R17-pitcher-back`, `crops/medium/R17-pitcher_hands`, `crops/low/R17-pitcher-back`, `crops/low/R17-pitcher_hands` | — |


- **Frames** (`<tier>/<viewport>/Rxx.png`): the game as the player sees it, with HUD.
- **Close-ups** (`crops/<tier>/…`): the same frozen moment through a close camera on one player (or one part: head, hands, feet, glove), the 3D frame alone at 2× pixels. They show the models the way a replay or a broadcast close-up would.
- **Strips** (`strips/<tier>/Rxx.png`): 8 consecutive moments, numbered, a few sim ticks apart. **Judge animation from these.**

Score the **high** tier on desktop. Use the mobile and landscape frames for `mobile` and `readability`.

## What changed this loop (facts only)
# Loop 3 changes (facts only)

## Presentation and UI
- **Result calls** ("OUT", "SAFE", "HOME RUN · 400 FT" and so on) are now a broadcast-style panel:
  - a dark rounded panel with an accent bar in the call's colour;
  - the headline, and the detail after " · " on a second, smaller line;
  - a 0.22 s slide-in and a 0.25 s fade-out.
  - A home-run call stays up 3.5 s, through the trot; other calls stay 1.3 s.
- **The field-view broadcast camera** is closer and tighter:
  - desktop distance 150 ft (was 175), vertical FOV 34° (was 40°);
  - portrait distance 130 ft (was 150), FOV 54° (was 60°);
  - height 54 ft (was 62).

## Animation
- On catches and pick-ups, the glove arm reaches for the arriving ball (two-bone IK on the glove side, right-handed throwers) during the 0.35 s before possession.

## Lighting (night)
- Night ambient is lower: hemisphere 0.36 (was 0.55), moon 0.6 (was 1.0).
- Tower spotlights are brighter (2.3, was 1.5), with a tighter cone and a softer edge, so the pools fall off toward the corners.
- On the high tier, the banks nearest home also cast shadows (1024² maps), so players get several soft shadows.

## Players
- **Uniform:**
  - The jersey and pants sit closer to the body: jersey 0.055 ft (was 0.07), pants 0.075 ft (was 0.1), knee ease 0.03 ft (was 0.05).
  - The chest is relaxed 22 times (was 12) before inflation.
- **Neckline:**
  - It is cut by one plane for every face of the neck, collar bones and upper chest, lower at the front than at the back.
  - A 0.08 ft collar band in the trim colour is bounded by a second parallel cut.
  - Sleeves have a cuff band in the trim colour between two straight cuts. These replace the one-face piping row of loop 2.
- **Cap:** the crown's rim drops 0.2 ft at the back to cover the nape. Hair stays hidden under caps and helmets.
- **Masks:** the cage sits 0.07 ft off the face (was 0.18).
- **Jersey decals:** the front lettering sits 0.5 ft above the chest bone (was 0.22, which put it at the stomach). The back number sits at 0.4 ft (was 0.15).
- **Skin light:** the self-light gains a small constant floor, so dark skin keeps visible features in shadow.

## Animation
- **Run:** now CMU 16_55, the take with the strongest arm drive (was 09_01). Runners' hands close to loose fists.
- **Swing:**
  - The clip starts 0.5 s before contact (was 0.35 s).
  - Its first 0.12 s, the load and stride, plays while the pitch is in flight, so the batter strides into the ball whether or not he swings.
  - The swing proper then runs from the swing start to contact.
- **Retarget:** rest alignment now matches whole bone frames (axis plus the character's forward), not only bone directions.

## Performance (medium tier, phones)
- No camera fill light on the medium tier: one light fewer per pixel. Skin keeps its own light floor.
- Pixel-ratio cap is 1.35 (was 1.5). Medium-mobile GPU worst is 0.78 ms over three runs (estimated phone 19.5 ms; loop 2 measured 1.26 ms).

## UI
- Keyboard and mouse hints are hidden on touch (coarse-pointer) devices, in landscape too.
- **Field camera:** it now eases out from the duel camera's computed pose, not from the last frame drawn. The start of the ease used to depend on frame timing.

## Performance (real GPU; phone proxy is 4× CPU throttle)
| Tier · viewport | min fps | worst p95 frame (ms) | calls | triangles | heap MB |
|---|---|---|---|---|---|
| high · desktop | 363 | 3.5 | 147 | 1075k | 70.7 |
| high · mobile | 380 | 3.4 | 101 | 290k | 69.1 |
| medium · desktop | 342 | 3.8 | 147 | 410k | 78 |
| medium · mobile | 390 | 3.5 | 101 | 290k | 60.4 |
| low · desktop | 579 | 2.2 | 89 | 207k | 75.6 |
| low · mobile | 554 | 2.3 | 69 | 168k | 48 |
| medium · mobile · 4× CPU throttle | 48 | 34.6 | 106 | 299k | 50.6 |
| low · mobile · 4× CPU throttle | 82 | 18.1 | 68 | 168k | 50.1 |
| low · desktop · software GL | 16 | 70.5 | 103 | 163k | 22 |

(vsync off: fps above 60 is headroom, not what players see.)

## Character fidelity metrics
Silhouette IoU of LOD0 (bind pose, no accessories) against the reference turnaround masks; then each LOD at the game's on-screen heights against LOD0 rendered 4× and box-filtered (pixel error = share of the player's pixels off by > 12/255; LOD0's own row is the aliasing floor). Workbench, region palette, three-quarter view.

| Model | Distance | Player height (px) | Silhouette IoU | Pixel error (%) |
|---|---|---|---|---|
| LOD0 vs reference (front) | turnaround | 1024 | 0.875 | 12.5 |
| LOD0 vs reference (side) | turnaround | 1024 | 0.901 | 9.9 |
| LOD0 | 360 px tall | 360 | 0.998 | 3.0 |
| LOD1 | 360 px tall | 360 | 0.995 | 4.7 |
| LOD2 | 360 px tall | 360 | 0.975 | 17.9 |
| LOD0 | 140 px tall | 140 | 0.995 | 7.8 |
| LOD1 | 140 px tall | 140 | 0.995 | 9.3 |
| LOD2 | 140 px tall | 140 | 0.976 | 18.9 |
| LOD0 | 60 px tall | 60 | 0.979 | 17.3 |
| LOD1 | 60 px tall | 60 | 0.973 | 17.7 |
| LOD2 | 60 px tall | 60 | 0.962 | 25.7 |

## Write
1. A verdict in one paragraph.
2. For each of the 8 categories: the score, then why, citing captures by path (for example `high/desktop/R02`, `crops/high/R02-batter_head`, `strips/high/R03`) and the benchmark or reference you compared against.
3. **Character defects list:** every specific defect you can see in the player close-ups (anatomy, proportions, face, hands, garments, gear, materials, skinning artefacts, clipping), each with the capture it's visible in.
4. The ranked gaps: the specific shortfalls that cost the most points, each with a concrete, testable fix, an expected gain (score points), a severity (1–5) and an effort (S/M/L). Name the workstream: WS1 character models/materials, WS2 animation, WS3 lighting/post, WS4 environment/crowd, WS5 cameras/presentation, WS6 performance/LOD, WS7 UI/HUD/mobile.
5. **The last thing in your reply:** one fenced ```json block per schema.json, with `"role": "critic-claude (Critic A) or critic-codex (Critic B), as assigned"`, `"loop": 3`, `"tier": "high"`.

Don't edit any file. Reply with the review only.
