# Critic brief: loop 8

You are an independent, deliberately harsh visual critic. You are reviewing **Diamond Springs**, a browser (three.js) high-school baseball game, against shipped baseball games and a set of realistic reference player models. The campaign's priority is **the player characters**: their models, their accuracy to the references, and their animation. Your scores drive a development loop. Inflated scores waste the developer's time; deflated ones without evidence get thrown out by the judge. Be exact and cite.

You have not seen any earlier score, any other reviewer, or the developer's opinion. Don't look for them: `reviews/HISTORY.md`, `reviews/history.json` and other `reviews/loop-*/` folders are off limits.

All paths below are relative to the repository root `C:\Video Game Projects\repos\hsg-baseball`.

## Read first
- Rubric: `reviews/RUBRIC.md`. Anchors, gates and the evidence rule.
- Output schema: `reviews/schema.json`.
- Benchmarks: `benchmarks/*.png` and `benchmarks/README.md`.
- Reference renders (if present): `art-src/samples/reference-renders/`.

## What to review
Captures were made on a real GPU (RTX 5060) in headless Chrome, at 1280×800 desktop, 390×844@2× mobile (portrait phone) and 844×390@2× landscape (phone held sideways). Root: `screenshots/review-loop-8/`.

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
# Loop 8 changes (facts only)

## Players
- **Shoulders (pose):** the mocap clips (pitch, swing, stance, throw, run) raised both clavicles 25–30° above the rig's rest, a permanent shrug that put the shoulder joints at neck height (measured in game: pitcher and batter shoulder joints 0.03–0.09 ft below the neck base; rest is 0.34–0.36 ft). Each frame now takes each clavicle 75% of the way back to its bind rotation, and turns the upper arm back so the arm keeps the clip's direction. Measured after: 0.22–0.30 ft below the neck base. High and medium tiers.
- **Shoulders (skin weights):** the skin weights over each shoulder are relaxed (14 passes within 0.6 ft of the shoulder joint, only the clavicle, upper-arm and upper-spine shares; each vertex keeps their total), so the deltoid bends more evenly when the arm comes down.
- **Jersey lettering:** the team name is outlined in the jersey colour (a sewn-letter edge), so a letter crossing the placket piping no longer disappears into a stripe of the same colour (the "H" of "HAMILTON"). The lettering texture is 512 × 128 (was 256 × 64). Both decals are drawn 0.12 ft nearer the camera than the cloth under them, so the cloth's bulges between the decal's grid points can't cut through them.

## Animation / grounding
- **Contact shadows:** each foot's contact shadow is a tight dark oval along the foot (0.62 × 1.35 ft at full size, darker in the middle), turned to the foot's heading. Before, it was a round soft spot stretched along the world axis.
- **Sun shadow normal bias** is 0.025 (was 0.06), so a planted foot's shadow starts at the sole rather than a few inches off it. No shadow acne on the high or medium tier in R02, R05, R07 or R16.

## Headwear and gear
- **Brims:** the front of the rim rides higher on the brow (batting helmet 0.18 ft above its side band, was 0.12; cap 0.08 ft, was 0.04), so the brim's lower edge clears the eyebrows.
- **Umpire and catcher masks:** each bar of the cage overlaps its neighbour by the bar's radius, so the cage reads as continuous bars (it showed gaps at every join).

## Performance (real GPU; phone proxy is 4× CPU throttle)
| Tier · viewport | min fps | worst p95 frame (ms) | calls | triangles | heap MB |
|---|---|---|---|---|---|
| high · desktop | 421 | 3.0 | 157 | 1196k | 76.7 |
| high · mobile | 456 | 2.8 | 117 | 415k | 74 |
| medium · desktop | 408 | 3.1 | 157 | 531k | 100.7 |
| medium · mobile | 460 | 2.8 | 117 | 415k | 72.3 |
| low · desktop | 902 | 1.5 | 90 | 315k | 77.8 |
| low · mobile | 1015 | 1.2 | 70 | 276k | 60 |
| medium · mobile · 4× CPU throttle | 63 | 33.7 | 117 | 424k | 67.7 |
| low · mobile · 4× CPU throttle | 144 | 9.0 | 68 | 276k | 51.6 |
| low · desktop · software GL | 17 | 69.3 | 105 | 163k | 22 |

(vsync off: fps above 60 is headroom, not what players see.)

## Character fidelity metrics
Silhouette IoU of LOD0 (bind pose, no accessories) against the reference turnaround masks; then each LOD at the game's on-screen heights against LOD0 rendered 4× and box-filtered (pixel error = share of the player's pixels off by > 12/255; LOD0's own row is the aliasing floor). Workbench, region palette, three-quarter view.

| Model | Distance | Player height (px) | Silhouette IoU | Pixel error (%) |
|---|---|---|---|---|
| LOD0 vs reference (front) | turnaround | 1024 | 0.878 | 12.2 |
| LOD0 vs reference (side) | turnaround | 1024 | 0.889 | 11.1 |
| LOD0 | 360 px tall | 360 | 0.997 | 4.1 |
| LOD1 | 360 px tall | 360 | 0.994 | 7.2 |
| LOD2 | 360 px tall | 360 | 0.879 | 41.0 |
| LOD0 | 140 px tall | 140 | 0.993 | 10.5 |
| LOD1 | 140 px tall | 140 | 0.989 | 12.6 |
| LOD2 | 140 px tall | 140 | 0.881 | 42.9 |
| LOD0 | 60 px tall | 60 | 0.978 | 22.8 |
| LOD1 | 60 px tall | 60 | 0.974 | 23.9 |
| LOD2 | 60 px tall | 60 | 0.869 | 48.4 |

## Write
1. A verdict in one paragraph.
2. For each of the 8 categories: the score, then why, citing captures by path (for example `high/desktop/R02`, `crops/high/R02-batter_head`, `strips/high/R03`) and the benchmark or reference you compared against.
3. **Character defects list:** every specific defect you can see in the player close-ups (anatomy, proportions, face, hands, garments, gear, materials, skinning artefacts, clipping), each with the capture it's visible in.
4. The ranked gaps: the specific shortfalls that cost the most points, each with a concrete, testable fix, an expected gain (score points), a severity (1–5) and an effort (S/M/L). Name the workstream: WS1 character models/materials, WS2 animation, WS3 lighting/post, WS4 environment/crowd, WS5 cameras/presentation, WS6 performance/LOD, WS7 UI/HUD/mobile.
5. **The last thing in your reply:** one fenced ```json block per schema.json, with `"role": "critic-claude (Critic A) or critic-codex (Critic B), as assigned"`, `"loop": 8`, `"tier": "high"`.

Don't edit any file. Reply with the review only.
