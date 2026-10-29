# Diamond Springs: visual plan

The visual enhancement campaign for `games/baseball/`. The baseline is the shipped 2D canvas game
(81/81 tests, `screenshots/visual-before/`). The goal is a game that reads like a modern stylized
baseball game while keeping every mechanic, mode, test hook and save.

## Benchmark and baseline review
Benchmarks (review only, git-ignored in `benchmarks/`): Super Mega Baseball 4 and 3 (stylized 3D),
Out of the Park Baseball 26 (3D in-game view and broadcast UI), and Backyard Baseball '97 (2D cartoon).
An independent reviewer scored the baseline against them:

| Area | Score |
|---|---|
| Characters | 2 |
| Environment | 2 |
| Lighting | 2 |
| Animation / feel | 2 |
| UI | 5 |
| Typography | 5 |
| Readability | 4 |
| Mobile | 3 |
| Setting authenticity | 3 |

Its top gaps:
1. Placeholder figures.
2. No swing or pitch animation.
3. A tactics-board field view.
4. No depth, catcher or umpire.
5. Flat home runs.
6. No lighting.
7. No Hot Springs on screen.
8. A hard-to-see ball.
9. A squeezed mobile layout.
10. A weak score bug.
11. No crowd.

## Direction: full 3D (three.js), 2D kept as the fallback
The sim already resolves every ball in play into a deterministic timeline: fielder paths, throws,
runner keys and calls. That timeline is ideal for 3D playback, so the game goes **fully 3D for play**:

- **The duel** has two cameras, because no single behind-the-plate camera keeps the strike zone clear
  of the catcher and umpire. Camera tests at heights of 5–13 ft and distances of 11–30 ft all blocked
  the zone (`screenshots/scratch3d`).
  - **Batting (and watching):** the catcher's eye, low behind the plate. The zone is big; the
    catcher's mitt appears in first person for the catch.
  - **Pitching:** the broadcast center-field telephoto over the pitcher's shoulder. Batter, catcher
    and umpire are all in view.
- **The field view** is a broadcast "high home" camera that eases out of the duel camera and leans
  toward the ball. It is derived from play time only, so any frame is reproducible.
- **The title** shows a slow flyover of the ballpark behind the menu.
- **Menus stay DOM.** The 2D canvas stays on top as the overlay layer: zone, target, cursor, meter,
  call banners and effects, projected through the 3D camera.
- **The 2D renderer stays as the fallback** for no WebGL2, a load failure, or `?gl=0`. On software GL
  (SwiftShader, llvmpipe) the game picks the low preset automatically.

## Assets
| Asset | Tool | Notes |
|---|---|---|
| Ballplayer (one skinned mesh, ~9k tris) | Blender 5.2 (`art-src/blender/player.py`) | Skin-modifier body, custom 26-bone rig, IK-solved key poses baked to FK. Accessories (cap, helmet, mask, chest protector, shin guards, glove, bat) hang on their own bones; the game hides one by scaling its bone. Team colors come from a 16-region palette shader. |
| 14 animation clips | Blender | idle, ready, bat_stance, bat_swing (contact at frame 9), bat_bunt, pitch (release at 0.87 s, matching the 0.9 s windup), crouch, ump, run, throw, field_ground, catch_high, cheer |
| Painted textures (8) | Codex image generation, packed with `art-pack.mjs` | Ouachita ridge panoramas (day, golden, night), grass and clay detail tiles, weathered planks, modern and 1930s crowd strips |
| Parks | Procedural three.js (`src/js/world3d.js`) | Built from the sim's own fence curves (`park.js`), so walls and distances match play exactly |
| Live scoreboard | Canvas texture | Shows the real score, inning and count |

## Research additions
`research/historic-park-visuals.md`, sourced, with confidence notes. It feeds the historic-style park:

- The grandstand was built into a wooded hillside.
- 1912 Hot Springs photos show unroofed plank stands with X-braced timber frames.
- The Arkansas Alligator Farm sat across Whittington Avenue beyond right field. A c.1924 photo shows
  its curved white concrete pool rims, a dirt basking bank and a horizontal-plank board fence.
- Hardwoods are bare in March, among dark shortleaf pines.
- The steel Rix Tower stood on Hot Springs Mountain to the east.

Rebuilt Majestic Park has artificial turf infields and outfields, covered grandstands and Musco
lighting, so the game's Majestic Park uses an all-turf field and a covered center stand.

## Performance plan
- Targets: 60 fps on a mid laptop, 30+ fps on phones.
- The 2D game is interactive in about 60 ms. three.js (774 KB) and the models (744 KB of base64)
  load afterwards as classic scripts (they also work from `file://`). Painted WebP (~1 MB) loads with
  `new Image()`.
- Quality presets:

| Preset | When | Pixel ratio | Shadows | Trees |
|---|---|---|---|---|
| high | desktop | up to 2 | 2048 PCF soft | 420 instanced |
| medium | touch devices | up to 1.5 | 1024 | 420 instanced |
| low | software GL, or `?q=low` | 1 | none | 160 |

- One draw call per player, using a palette shader.
- Trees use instancing, and parks are cached per park and lighting.
- Draw requests outside the game loop are coalesced into one animation frame.
- Total download target: under 3.5 MB.

## Test plan
- All existing tests must still pass on the 3D path. The harness runs headless SwiftShader, so it
  exercises the low preset.
- New tests:
  - The 3D view is live and painted art loaded without 404s.
  - The `?gl=0` fallback still works.
  - Both duel cameras project the zone and aim correctly: screen → plate → screen round trip.
  - The field view stages fielders and runners from the timeline.
  - Accessories and regions show per role.
  - The night look applies at Majestic Park in the final.
- Performance: the harness checks frame-time sanity on SwiftShader. `tools/shots3d.mjs --fps`
  measures real GPU fps on this machine.
- Every milestone gets screenshots at both viewports and an adversarial re-review against the benchmarks.
