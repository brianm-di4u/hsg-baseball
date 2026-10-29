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
