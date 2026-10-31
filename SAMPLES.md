# Diamond Springs: code-sample survey

Surveyed 2026-10-28 with web search and page fetches. No sample code was downloaded, so
`reference-samples/` is empty. **No third-party code is copied into the game.** The only adapted
code is the mulberry32 RNG (CC0), which reaches this game through the collection's own
`util.js` (shared with Spa City Hoops).

| # | Project | URL | License | Version / commit | Verdict |
|---|---|---|---|---|---|
| 1 | baseball-sim-engine (American Space Software) | https://github.com/American-Space-Software/baseball-sim-engine | MIT | v2.1.4 on npm, 84 commits on `main` (hash not shown on the page) | Ideas only (architecture, validation). Permissive, but we didn't need its code. |
| 2 | Angular-Baseball (kuhe) | https://github.com/kuhe/Angular-Baseball | **none stated** | 492 commits; developer note dated 2022-02-06 | Reference only (no license) |
| 3 | self-playing-baseball (maniator) | https://github.com/maniator/self-playing-baseball | **GPL-3.0-or-later** | 1,626 commits on `master` | Reference only (GPL) |
| 4 | Physics of Baseball trajectory calculator (Alan M. Nathan) | https://baseball.physics.illinois.edu/trajectory-calculator-new.html | All rights reserved | "new" 2-D version, 2015 Statcast fit | Reference only (concepts: drag plus lift, launch-angle/exit-speed tables) |
| 5 | MDN "Anatomy of a video game" | https://developer.mozilla.org/en-US/docs/Games/Anatomy | MDN code samples: CC0 / MIT per MDN's attribution page; prose CC BY-SA | live page, read 2026-10-28 | Pattern only: rAF loop with fixed-step updates (written from scratch) |
| 6 | mulberry32 (Tommy Ettinger) | https://gist.github.com/tommyettinger/46a874533244883189143505d203312c | CC0 1.0 | gist head | **Adapted** (already in the collection's `util.js`, credited in a comment) |

## 1. baseball-sim-engine (MIT)
- **Does well:** advances the game one pitch per call; keeps *contact generation* (exit velocity,
  launch angle, spray) separate from *trajectory and fielding* (responsible fielder, catch outcome,
  throw difficulty, force and tag plays); ratings centered on an average; validates large sim
  samples against target AVG/OBP/SLG/K%/BB%/runs per game.
- **Does badly (for us):** a ratings-only simulator with no real-time player input; tuned to MLB
  data via an importer; much larger than a browser game needs.
- **Taken:** the split of pitch → contact → batted-ball flight → fielding resolver, and the idea
  that the balance tool must compare whole-season rates to explicit targets. Written from scratch.

## 2. Angular-Baseball (no license)
- **Does well:** you click on and around the strike zone to pitch and to bat, so pitch *location*
  is the core decision; the 2022 rewrite replaced "on-rails" parabolas with physics trajectories
  with initial vectors and acceleration; mitt and bat sounds sell contact.
- **Does badly:** no timing element in the swing (location only); 3-D render is heavy; no license,
  so nothing may be reused.
- **Taken (idea only):** location matters on both sides of the duel; real trajectories instead of
  canned arcs.

## 3. self-playing-baseball (GPL-3.0)
- **Does well:** four pitch types (fastball, curve, slider, change) with velocity/control/movement
  per pitcher; ground-ball double plays; walk-offs; extra-inning handling; seeded mulberry32 so
  autoplay games are deterministic and testable with Playwright.
- **Does badly:** mostly a spectator/manager game; GPL, so code can't enter an MIT collection.
- **Taken (idea only):** the four-pitch repertoire, the "home team doesn't bat in the bottom of the
  last inning when ahead" rule, seeded RNG for deterministic tests.

## 4. Nathan trajectory calculator (all rights reserved)
- **Does well:** physically grounded batted-ball flight (drag and Magnus lift fitted to Statcast),
  tables of distance by exit speed and launch angle.
- **Does badly (for us):** a spreadsheet, not code; MLB baseballs and bats.
- **Taken (concept only):** a quadratic-drag plus lift model integrated at a fixed step, tuned with
  our own coefficients so that a ~95 mph, 28° high-school drive carries about 370 ft. Our numbers
  are game tuning, checked by `tools/balance.mjs`, not physics claims.

## 5. MDN Anatomy of a video game
- **Does well:** rAF loop, decoupled fixed update rate, `performance.now()` timing, pause on hidden
  tabs.
- **Taken:** pattern of a 60 Hz fixed step with accumulator (code written fresh, as in the other
  games of the collection), render-on-demand when menus are up.

## 6. mulberry32 (CC0)
- 32-bit seeded PRNG stepped on a plain `{rs}` object so the RNG state serializes with game state.
  Used for pitches, contact noise, fielding, AI and rosters.

## Side-by-side review: what becomes the foundation
| Concern | Foundation | From |
|---|---|---|
| Duel structure | Pitch type + location + accuracy meter vs. timing swing with optional aim cursor | 2, 3 (ideas); original timing/aim blend |
| Contact | Timing error → spray; aim offset → launch angle; quality → exit speed | 1 (separation), original formulas |
| Flight | Fixed-step drag + lift integration, bounce and roll, fence and wall caroms | 4 (concept) |
| Fielding & running | A deterministic **play resolver**: responsible fielder by earliest intercept, throw choice by out margin, runner decisions by time margin; outputs a timeline that the renderer plays back | 1 (separation), original |
| Determinism | mulberry32 RNG state inside the game state | 6 |
| Loop | 60 Hz fixed step, render on demand in menus | 5 |
| Balance | Node tool runs the real sim for whole seasons against PRD targets | 1 (validation idea), wave 2 lessons |

## Visual campaign additions (3D)
| What | Source | License | Where |
|---|---|---|---|
| three.js r186.1 | npm `three@0.186.1` (official package), bundled to one classic script by `tools/build-vendor.mjs` with esbuild 0.28.2 (build tool only, not shipped) | MIT, `vendor/three-LICENSE` | `vendor/three-r186.min.js` (GLTFLoader, SkeletonUtils and BufferGeometryUtils from the same package's `examples/jsm`) |
| Ballplayer model and 14 animation clips | Original, scripted in Blender 5.2 (`art-src/blender/player.py`) | MIT (this repo) | `art-src/blender/player.glb` → `assets/models.js` (`tools/pack-models.mjs`) |
| Painted textures (Ouachita ridge panoramas ×3, grass, clay and plank tiles, two crowd strips) | Original, generated with OpenAI image generation via the Codex CLI, from prompts written for this game (no reference images) | MIT (this repo) | `art-src/*.png` (git-ignored) → `assets/*.webp` via `shared/test-harness/art-pack.mjs` |
| Ballparks, sky, trees, stands, alligator farm, scoreboard | Original procedural three.js code (`src/js/world3d.js`), shapes from the sim's own fence curves | MIT (this repo) | built at runtime |
| Benchmarks (review only) | Steam store screenshots of Super Mega Baseball 4 and 3, Out of the Park Baseball 26, Backyard Baseball '97 | © their owners; not shipped | `benchmarks/` (git-ignored) |
No code, art, UI layout or characters were taken from the benchmark games.

## Visuals v3 additions (players)
| What | Source | License | Where |
|---|---|---|---|
| v3 ballplayers: three body builds, uniform, headwear, catcher's gear, glove, bat, three detail levels, retargeted clips | Built here by `art-src/blender/players/build_players.py` from the MakeHuman assets below with MPFB | CC0 inputs; build and output MIT (this repo) | `assets/players-high.js`, `assets/players-medium.js` (`tools/pack-players.mjs`) |
| MPFB 2.0.18 (MakeHuman for Blender), build tool only | https://extensions.blender.org/add-ons/mpfb/ , `add-on-mpfb-v2.0.18.zip` (sha256 c075b3e9…2a2dad), run headless in an isolated Blender profile | GPL-3.0-or-later (tool, not shipped); its output is CC0 (MakeHuman FAQ) | `art-src/samples/mpfb2-extension/` (git-ignored); scripts `art-src/samples/_scripts/` |
| MakeHuman system assets (base mesh, targets, game-engine rig, skins young_caucasian_male / young_african_male, low-poly eyes, eyebrow001, short02 hair, shoes01) | https://static.makehumancommunity.org/assets/assetpacks/makehuman_system_assets.html , `makehuman_system_assets_cc0.zip` (sha256 b542127a…a0107) | CC0 | `art-src/samples/makehuman-system-assets/` (git-ignored) → the v3 player bodies, shoes and skin detail maps |
| CMU motion capture (subjects 02, 09, 16, 33, 35, 124, 141, 143; cgspeed 2010 BVH via github.com/sfd158/cmu-mocap) | http://mocap.cs.cmu.edu/ | Free for all uses; may ship in commercial products, may not be resold as data. Credit: "The data used in this project was obtained from mocap.cs.cmu.edu. The database was created with funding from NSF EIA-0196217." | `art-src/samples/cmu-mocap-bvh/` (git-ignored); not shipped yet |
| ACCAD sprint BVH (`ericrun.bvh`) | https://accad.osu.edu/research/motion-lab/mocap-system-and-data | CC-BY 3.0, credit "ACCAD Motion Lab, The Ohio State University" | `art-src/samples/accad-sprint/` (git-ignored); not shipped yet |
| Baseball bat (Enrique Martín) and Baseball 01 (Rico Cilliers) | https://polyhaven.com/a/baseball_bat , https://polyhaven.com/a/baseball_01 (2K glTF) | CC0 | `art-src/samples/polyhaven-baseball_bat/`, `polyhaven-baseball_01/` (git-ignored); reference |
| Fabric and leather detail textures: Poly Haven cotton_jersey, jersey_melange, waffle_pique_cotton, stretch_poplin, brown_leather, leather_white, fabric_leather_01; ambientCG Fabric070, Fabric048, Fabric081A, Leather038, Leather035A, Leather034C (1K) | https://polyhaven.com/textures , https://ambientcg.com/ | CC0 | `art-src/samples/polyhaven-textures/`, `ambientcg-textures/` (git-ignored); not shipped yet |
| Human Base Meshes v1.4.1 (Blender Studio), reference renders only | https://www.blender.org/download/demo-files/ | CC0 | `art-src/samples/blender-human-base-meshes/` (git-ignored); renders `art-src/samples/reference-renders/hbm_male_realistic_*` |
| Marge Villa jersey and Slugger's stickball bat scans (Smithsonian NMAH), reference only | https://3d.si.edu/object/3d/marge-villa-jersey:c0c953ae-8539-436a-8f32-81bd88bc9d5a , https://3d.si.edu/object/3d/sluggers-stickball-bat:aeb8fc1d-9392-4a1e-8faa-fce19b25f5a5 | CC0 | `art-src/samples/smithsonian-*/` (git-ignored); renders `reference-renders/si_jersey_*` |
| Baseball cap, low-poly (Poly by Google), silhouette reference | https://poly.pizza/m/aaC5GgcWEhM | CC-BY 3.0, credit "Poly by Google" | `art-src/samples/polypizza-cap/` (git-ignored); reference only |
| Reference turnarounds (MPFB2 athlete, Human Base Mesh male, jersey) | Rendered here by `art-src/samples/_scripts/render_turnaround.py` (Blender 5.2.3, Cycles) | CC0 inputs; renders MIT (this repo) | `art-src/samples/reference-renders/` (PNGs git-ignored, camera JSON tracked) |

