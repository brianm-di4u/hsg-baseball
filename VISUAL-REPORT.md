# Diamond Springs: visual report

The visual enhancement campaign for `games/baseball/`. The plan, direction and reasoning are in
`VISUAL-PLAN.md`. Nothing is committed; the coordinator reviews and commits.

## What changed
**A full 3D ballpark game, with the 2D renderer kept as the fallback.**

- three.js r186.1 is vendored as one classic script, so it loads from `file://`. It loads after the
  2D game is already interactive.
- `src/js/render3d.js` stages the play, `src/js/world3d.js` builds the parks and `src/js/actors3d.js`
  runs the players.
- The 2D canvas now sits on top as the overlay layer: strike zone, pitch target, aim cursor, meter,
  call banners and effects, all projected through the live 3D camera.
- No rule, sim number or test hook changed, apart from the triples tuning below.

- **Players.**
  - One original Blender-made character (`art-src/blender/player.py`), with a scripted skin-modifier
    body, a custom 26-bone rig and 14 clips. The key poses are solved with IK in Blender and baked to FK.
  - Team colors come through a 16-region palette shader: one draw call per player.
  - Accessories hang on their own bones and are shown per role: batting helmet, cap, catcher's mask,
    chest protector, shin guards, glove, bat.
  - Faces have eyes, brows, nose and mouth. Jerseys carry the number on the back and the school or
    club name across the front.
  - Left-handers are mirrored, with their decals counter-mirrored so text reads correctly.
- **Animation driven by game time.**
  - The pitcher's delivery releases at 0.87 s, matching the sim's 0.9 s windup, and the ball leaves
    from the hand bone.
  - The swing's contact frame is mapped to the sim's swing lag, and the timing grade appears at
    bat-ball contact.
  - Bunt stance; catcher's crouch with the mitt riding to the pitch; umpire stance.
  - In the field view: run cycles along fielder paths, throws timed to the timeline's releases, catches
    high and low, and runners who run, stop or cheer.
  - Every pose comes from sim time (phaseT and playT), so any frame is reproducible.
- **Cameras.**
  - Batting: a catcher's-eye camera; the zone is big and clear.
  - Pitching: a broadcast center-field telephoto, with the pitcher's back, the batter, the catcher and
    the umpire in view.
  - Field view: a broadcast "high home" camera that eases out of the duel camera and leans toward the
    ball.
  - Home runs: the camera follows the ball, then cuts to the batter's trot.
  - **Replays** (R, or "Watch the replay" in the pause menu): the last ball in play from a low
    first-base-side angle. Game state is untouched (tested).
  - The title shows a slow flyover of the ballpark.
- **Parks, built from the sim's own fence curves** (`park.js`), so walls, distances and the
  ground-rule fence match play exactly.
  - Mowed fields: grass and diamond patterns, plus painted grass and clay detail tiles.
  - Chalk lines, batter's and catcher's boxes, a raised mound, bases.
  - Padded or plank walls with a home-run line, foul poles, and distance markers on the wall.
  - A batter's eye in center field; backstop netting; dugouts.
  - Stands with painted crowds at true scale; light towers.
  - A live scoreboard showing the real score, inning and count.
  - Instanced forest; painted Ouachita ridge panoramas; a procedural sky with clouds and stars.
- **Three looks.**
  - Home field (day).
  - Majestic Park: all-turf field, covered center stand. At night, for the final, light pools from the
    towers.
  - The historic-style park (golden afternoon), with:
    - concrete bleachers built into a wooded hillside
    - plank bleachers down the lines
    - March trees
    - the Rix Tower on the eastern skyline
    - Whittington Avenue
    - the alligator farm across it: plank board fence, white-rimmed pools, basking gators, a sign board
  - At the historic park, a home run to right center ends in a **3D Gator Splash** (droplets and a
    ripple at the real landing point).
- **Readability.**
  - The ball keeps a minimum on-screen size, with a tracer and a ground shadow.
  - Contact flash.
  - Broadcast ground rings in the field view: runners gold (red when out), the fielder with the ball
    white.
  - Pitch type and speed in the score bug; larger count dots.
- **Period detail.** The 1900s-style clubs bat in caps, not helmets (helmets came decades later).
- **Settings.**
  - "Graphics: 3D ballpark / Classic 2D", saved with the other settings: the low-end fallback.
  - `?gl=0` forces 2D. On software GL the game picks the low preset automatically.
- **UI fixes.**
  - The keyboard tip no longer shows behind modals.
  - Key hints are hidden on touch pads; the meter's "AGAIN" stays.
  - When the 3D view finishes loading it no longer re-renders menu DOM.

**Painted art (Codex image generation, `art-src/` → `assets/*.webp`, 1.1 MB):**
- three ridge panoramas (day, golden, night)
- grass, clay and plank tiles
- a modern and a 1930s crowd strip

The tool returned 3:1 panoramas (4:1 was asked) and 1254-px tiles. The crowd strips are cropped in
`art.json` to drop a painted sky band.

## Balance: triples
The baseline had **0.00 triples per team-game**. Balls that reach the wall or the corner now cost the
outfielder carom and chase time: 0.7–1.2 s off the wall and 0.5 s in a deep corner. The extra time is
derived from the flight, not from a new RNG draw, so seeded games keep their sequence.
`tools/balance.mjs 300`: **triples 0.07 per team-game**. Every PRD target is still met: runs 4.3, BA .270, K 16.4%, BB+HBP 12.4%, HR 0.54, errors 0.63, DP 0.21, pitches 118, SB 72%, home win 47%.

## Review scores
An independent adversarial reviewer scored each milestone against Super Mega Baseball 4 and 3, OOTP 26
and Backyard Baseball '97, with live screenshots only.

| Category | Before | Milestone 1 | Milestone 2 | Final |
|---|---|---|---|---|
| Characters | 2 | 3 | 3 | 3 |
| Environment | 2 | 4 | 4 | 4 |
| Lighting | 2 | 4 | 3 | 4 |
| Animation / feel | 2 | 3 | 3 | 4 |
| UI | 5 | 6 | 5 | 6 |
| Typography | 5 | 6 | 5 | 6 |
| Readability | 4 | 3 | 5 | 5 |
| Mobile | 3 | 5 | 5 | 5 |
| Hot Springs authenticity | 3 | 5 | 5 | 5 |

## Tests
`node shared/test-harness/run.mjs games/baseball --milestone visual-final`:

- 51 tests, 94 test runs across the desktop and mobile viewports.
- The full run passed **92/94**. The two failures were the season test, which assumed the user bats
  first in the state final. The triples tuning changed which team hosts the simulated final, so the test
  now throws the first pitch when the user is pitching. That was a test-only fix; the re-run passed
  `--file season` **4/4**.
- Two engine changes landed after the final run: park shader precompile and the adaptive-quality
  governor. The 3D-relevant files were re-run against them (milestone `post-final`):
  - gfx 13/13
  - duel 14/14
  - play 14/14
  - input 2/2
  - screens 4/4
  - perf 3/3
- No test reported a console error or an external request.
- **`file://` works with the full 3D view.** In a Playwright check from `file:///…/index.html`: 3D view live, all 8 paintings loaded, 11 actors staged, no console errors, no non-file requests.
  - From `file://`, local images taint canvases and WebGL refuses them.
  - So the game loads `assets/art.js` (the WebP set as data URLs, 1.45 MB) only on that protocol.
  - Over http it uses the smaller WebP files.
  - After this fix, gfx (13/13) and perf (3/3) were re-run.
- `tools/check-facts.mjs`: 52/52.

| Test file | Tests | What is new for the visual campaign |
|---|---|---|
| `gfx.test.mjs` | 7 | All new tests:<br>- 3D loads with every packed painting<br>- both duel cameras round-trip screen → plate → screen through the live camera, and the zone is fully on screen and readable<br>- the field view stages the play<br>- replay leaves score, outs, bases and phase untouched<br>- historic and night parks<br>- the graphics setting switches 3D ↔ 2D<br>- `?gl=0` fallback |
| `perf.test.mjs` | 2 | Total download ≤ 3.5 MB (2.89 MB); 3D ready time; a software-GL frame-rate floor |
| `input.test.mjs` | 2 | Touch aim checks direction against the live camera (in the center-field camera, first base is on screen-left) |
| `a11y.test.mjs` | 7 | The contrast sweep waits for idle; the panel's entry animation now gates `isIdle()` |
| `season.test.mjs` | 2 | The final throws a pitch when the user's team pitches first |
| Others | 31 | Unchanged; all pass on the 3D path |

Screenshots: `screenshots/visual-final/` has 70 desktop and 69 mobile shots, all inspected through 21
contact sheets plus full-size checks.

- Before/after sheets (61 pairs per viewport) are in `screenshots/visual-final/sheets/before-after-*.png`,
  built by `tools/before-after.mjs`.
- Real-GPU review shots are in `screenshots/review-final*/`, built by `tools/shots3d.mjs`.
- Harness shots use software GL, so they show the low preset: no shadows, reduced resolution.

## Performance
- **Load.**
  - `index.html` is 335 KB, and hooks are ready in 140–600 ms depending on machine load.
  - The 3D view is ready 0.2–1.1 s after that; the game is playable in 2D meanwhile.
  - Total download: **2.89 MB**, of which three.js is 774 KB, the models 769 KB and the painted WebP 1.1 MB.
- **JS heap:** about 20–25 MB (budget 90 MB).
- **Draw calls:** about 100 per frame after static batching (138 before). About 300k triangles, of which
  the 16 players are 9.3k each.
- **Real GPU** (RTX 5060, headless ANGLE D3D11, `tools/shots3d.mjs --fps`, 4 s per scene, after
  first-use shader precompile):

| Scene | Desktop 1280×800 (high) | Mobile 390×844 @2× (medium) |
|---|---|---|
| Title flyover | 59.6 fps, p90 16.7 ms | 59.0 fps, p90 16.7 ms |
| Duel | 52.4 fps, median 16.7 ms, p90 16.7 ms | 43.2 fps, median 16.7 ms, p90 16.7 ms |
| Field playback | 56.6 fps, p90 16.7 ms | 52.3 fps, p90 16.8 ms |
| Historic park home run | 53.9 fps, p90 16.7 ms | 57.7 fps, p90 16.7 ms |
| Night field | 59.3 fps, p90 16.7 ms | 59.7 fps, p90 16.7 ms |

- **4× CPU throttle** (a stand-in for a weak laptop or phone CPU):
  - Desktop held the high preset at 51–58 fps mean, median 16.7 ms.
  - Mobile ran the medium preset at 31–46 fps mean, median 16.7 ms, with p90 33–67 ms.
- **Measurement caveats.**
  - Mean fps on this shared machine swings 2–5× between identical runs while other sessions use the
    CPU and GPU (CPU load was 85% during the last runs), so medians are the reliable figure.
  - Before precompile, first-use shader compiles caused 80–300 ms hitches; precompile removed them.
- **Low-end handling:**
  1. Presets: high on desktop, medium on touch devices, low on software GL.
  2. An **adaptive governor** steps down a preset whenever the live loop's median frame time stays above
     24 ms (`gfx.quality` and `gfx.governed` in `getState()`).
  3. The **Classic 2D** graphics setting.
  4. `?gl=0`.
  5. Automatic 2D when WebGL2 is missing or the 3D load fails.
- **Software GL** (the harness's SwiftShader, low preset): 6–18 fps. The perf test holds this to a
  5 fps sanity floor; it is not a target.

## Remaining gaps from the final review
The final review counted these six as major gaps. They are the next round of work, not hidden:

1. **Characters.** Faces are simple and the body is a capsule build.
2. **Crowds.** Painted strips, not modelled fans.
3. **Painted ridges vs. low-poly trees.** The two styles still meet at a visible line in the
   high broadcast views.
4. **Night lighting.** No bloom or light cones.
5. **Contact.** There is no hit-stop at contact.
6. **Pitching view.** The telephoto view stacks the batter, catcher and umpire.

**Rendering bugs from the final review, fixed after it:**
- Light towers that stood in foul ground: foul-side towers now sit 200 ft or more from home, outside
  the foul wall.
- A wall number clipped by the curving fence: labels sit 1.2 ft off the wall.
- The umpire overlapping the batter in the telephoto view.
- Night ridges that looked daylit.
- A first-aim race: mouse aim before the first 3D frame mapped to x = 0, which the final test run caught.

The review's "strike pip lit during PERFECT" was correct game behavior: that shot is a foul ball.

## Known gaps (named, not hidden)
- **Characters are still the weakest area against the benchmarks.**
  - The single procedural body has mitten hands and simple faces, and there are no nameplates.
  - Commercial benchmarks have sculpted, hand-animated characters.
  - A sculpted head, hands and a second body type are the next step.
- **No catcher or umpire in the batting view.** It is a catcher's-eye camera by design: every
  higher camera tested put the catcher and umpire in front of the zone. Both appear in the pitching,
  field and replay views.
- **Night lighting** uses spotlight pools with no bloom post-processing; bloom was skipped to keep
  phones at 30+ fps.
- **Crowds are painted strips on sloped planes**, not individual 3D fans.
- **The historic park's 1936 light towers, fence material and advertising have no source.** They are
  game art "typical of the era" (see the research file). Whittington Park's grandstand roof is unknown;
  the game shows the surviving concrete hillside bleachers.
- **Triples are 0.07 per team-game**, still on the low side.
- **The harness runs software GL** (SwiftShader), so automated runs use the low preset. GPU fps comes
  from `tools/shots3d.mjs --fps` on this machine, measured while other sessions were loading it.
- The painted ridge panorama has a faint wrap seam where the strip repeats; it is visible at the edges of some wide shots.
- Audio and screen readers were not checked by a person (unchanged from the baseline).

## New research
`research/historic-park-visuals.md` holds sourced notes, each tagged confirmed, single-source,
inferred or typical of the era. Facts worth adding to the shared `research/`:

- Whittington Park sat on the north side of Whittington Avenue. Its grandstand was "built into the side
  of a mountain"; concrete hillside bleachers survive (Hot Springs Baseball Trail).
- The Arkansas Alligator Farm (847 Whittington Ave., founded 1902) is across the avenue. Ruth's 1918
  drives crossed the avenue into a farm pond. Fogel Field (1912) lay behind the farm.
- The valley lies between West Mountain and Sugarloaf Mountain; the field sits at about 693 ft (USGS).
- Forest: oak–hickory with shortleaf pine (NPS). March photos show bare hardwoods among pines.
- An observation tower stood on Hot Springs Mountain throughout the era:
  - wooden from 1877
  - the steel Rix Tower from 1906 to the 1970s, about 165 ft
  - the current 216 ft tower from 1983
- Rebuilt Majestic Park: five lighted fields with artificial turf infields and outfields, covered
  grandstands and dugouts.
- The 1912 Library of Congress photos of Brooklyn and Philadelphia at Hot Springs show unroofed plank
  stands with X-braced timber frames on a wooded hillside.

## Shared-data and harness requests
- **Harness: GPU option.** Add a `--gpu` flag (or an environment variable) to `run.mjs` that launches
  Chromium with `--use-angle=d3d11 --enable-gpu --ignore-gpu-blocklist`.
  - Headless SwiftShader makes a 3D game's run about 3× slower and its fps meaningless.
  - `tools/shots3d.mjs` shows the args that work on this machine.
- **Harness: a `t.waitIdle()` alias** documented for games that defer redraws. `t.waitFrames` doesn't
  cover a setTimeout-coalesced draw; this game's tests use `t.waitForStable()`.
- **Shared research:** add the facts above to `research/baseball-spring-training.md`, marked as in
  `games/baseball/research/historic-park-visuals.md`.
- **LESSONS candidates:**
  - A catcher's-eye camera can't show the catcher and umpire without blocking the zone. Use a second,
    center-field camera for pitching.
  - Bake IK in Blender (`nla.bake` with visual keying) to author precise bat and hand poses.
  - Scale accessory bones to zero to hide parts in both color and shadow passes.
  - Merge static meshes by material at park build time.
