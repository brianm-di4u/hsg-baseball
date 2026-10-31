# Diamond Springs: visuals v3 campaign plan

## Context
The baseball game's last visual pass (v2, `VISUAL-REPORT.md`) left characters as the weakest area: an independent review scored Characters 3/10, Environment 4, Lighting 4 and Animation 4. Today every player is one ~9.3k-tri skin-modifier capsule (`art-src/blender/player.py`), with mitten hands, a simple face, one body type, no textures and no LOD. All 16 actors share one mesh and are never frustum-culled.

The user wants a looping campaign: develop, then adversarial review by separate subagents, then refine. Every tool, asset and dataset must be free, and performance must stay playable on every platform. The focus is characters:
- research and acquire the best free reference/base models;
- measure the maximum model complexity each device tier supports;
- iterate the players toward reference accuracy at that optimal complexity.

The football game's "visuals v3" loop already has proven tooling: GPU captures, an 80-point rubric, Claude and Codex critics, an advocate, a judge, a tally script and an LOD pixel-error study. We port it rather than reinvent it.

**Decisions (user):**
- Work in the live repo `C:\Video Game Projects\repos\hsg-baseball` (clean, `main`). Local commit per loop, no push.
- Shipped players may be derived from CC0/CC-BY sources, with attribution in `SAMPLES.md`.
- Sizes: eager download stays as today (offline and file-safe); HD player and animation packs load lazily per tier.
- Run the loops autonomously to the stop rule, then report.

## Phase 0: Port the review loop (one-time setup)
Copy and adapt football's tooling: replace its football-specific constants, URLs and hooks, and keep the structure.
- **Game hooks** in `src/js/main.js` (`window.__game.act`, ~line 740) and `render3d.js`:
  - `clock(ms)`: freeze every time source (sky clouds, crowd, particles, governor).
  - `camLook(target, width, pitch, yaw)`: close-up camera on an actor or bone.
  - `gfxProfile`: per-pass GPU ms via the `EXT_disjoint_timer_query_webgl2` WebGL extension, plus draw calls, triangles and heap.
  - `gfx(tier)`: force a quality tier.
  - `animAt(t)`: pose scrub, for motion strips.
- **`tools/shots-review.mjs`:** adapted from `games/football/tools/shots-gpu.mjs`, using the scene recipes from the existing `tools/shots3d.mjs`.
  - Shot list `tools/review-shots.json`, ~20 shots: duel batting and pitching cams, swing contact, pitch release, catcher/ump close-ups, fielding play, throw/catch, runner slide, home-run trot, replay, title flyover, night park, historic park, mobile portrait and landscape.
  - Character close-up crops for batter, pitcher, catcher, umpire and a fielder (face, hands and bat grip, cleats/uniform).
  - 8-frame motion strips: swing, pitch, run, throw, catch.
  - `--tiers=high,medium,low --verify` determinism check (≤0.5/255 mean diff).
- **`tools/perf-review.mjs`:** adapted from football's `perf-gpu.mjs` (vsync off, warm-up, 2.5 s of rAF timings).
  - Scenes: duel, busy field play (16 actors), home run, replay, night.
  - Profiles: desktop/high, mobile/medium at 4× CPU throttle, software-GL/low.
- **`reviews/`:**
  - `PROTOCOL.md`, `RUBRIC.md`, `schema.json`, and `briefs/{critic,codex-wrapper,advocate,judge}.md`, rewritten for baseball.
  - `tools/review-prep.mjs` and `tools/review-tally.mjs`: football copies with baseball categories, gates and workstreams. The priority and stagnation logic is unchanged.
- **Benchmarks:** copy `games/baseball/benchmarks/` (SMB3/4, OOTP 26, Backyard '97) into the repo, git-ignored. Add free-reference renders from Phase 1.
- **Tests:** `tests/perf.test.mjs` keeps its eager-download ≤3.5 MB and HTML ≤2 MB checks. It gains per-pack size budgets and a check that lazy packs never block first play.

**Rubric:** 8 × 10 = 80 points, weighted toward characters.

| Key | Category | Gate |
|---|---|---|
| `characters` | Player model fidelity: anatomy, face, hands, uniform/cloth, gear, body variety | 7.5 |
| `charfit` | Accuracy to reference: close-ups vs the Phase 1 reference renders, informed by the objective pixel-error/silhouette metric | 7 |
| `animation` | Swing, pitch, run, throw, catch; contact; blends | 7 |
| `environment` | Park, turf, crowd, props | 7 |
| `lighting` | Lighting and atmosphere | 7 |
| `ui` | UI and typography | 7 |
| `readability` | Ball, runners, zone legibility on both viewports | 7 |
| `mobile` | Mobile, including framing and 30 fps on the proxy | 7 |

Performance is a hard **pass/fail gate** outside the score. A loop that breaks a budget in the Phase 2 table cannot be committed as an improvement, whatever its score.

## Phase 1: Research and sample acquisition
A research subagent (general-purpose, web) surveys free sources and ranks them by quality, license and Blender 5.2 compatibility. Candidates to evaluate:
- **Bodies:** MPFB2 / MakeHuman (CC0 output; Blender extension). It gives realistic bodies with age, weight and muscle variety, plus a game-engine rig.
- **Baseball-specific models:** CC-BY or CC0 Sketchfab models (players, gloves, bats, helmets, catcher's gear). Sketchfab downloads need a login, so any that need an account are listed for the user to download. I won't create accounts.
- **Props:** Quaternius and Kenney (CC0).
- **Mocap:**
  - CMU Graphics Lab mocap (free for any use): baseball swing and pitch clips if present, plus run, throw and catch.
  - Other permissively licensed sets. Non-commercial datasets such as Bandai-Namco CC BY-NC are excluded.
- **Textures and lighting:** Poly Haven and ambientCG (CC0) for fabric/leather/skin detail maps and HDRIs.
- **Image generation:** Codex OpenAI image generation (via `codex:codex-rescue`) for kit textures, fabric/stitch detail, face/skin albedo variations, crowd and signage. Follow the pilot-then-batch style-reference lesson.

**Acquisition rules:**
- Each download goes in its own empty folder under `art-src/samples/<source>/` (git-ignored if large). These are untrusted data: scripts live elsewhere, and paths are passed as arguments.
- Every item is logged in `SAMPLES.md` with URL, version, license and how it ships.

**Output:** `research/character-sources.md`.
- The **highest-quality reference set** is 1–3 top models (it may be high-poly and non-shippable). Rendered in Blender, it gives the fixed "top end" reference turnarounds the reviewers and the fidelity metric compare against.
- A recommended base body and animation sources.

## Phase 2: Performance ceiling study
**`tools/perf-ceiling.mjs`** plus a test page `tools/ceiling/index.html` that uses the game's own renderer setup: tiers, shadows, tone mapping, the real park.
- It sweeps a complexity ladder in the real busy-field scene with 16 skinned actors:
  - triangles per player: 2k, 5k, 10k, 20k, 40k, 80k;
  - bones: 26 today, ~50 with fingers;
  - material/texture: palette only, 1k atlas, 2k atlas with normal map;
  - morph targets on or off;
  - shadow casters: all or near only.
- Each combination is measured under each profile.

**Platform profiles and thresholds:**

| Profile | How it's measured | Threshold |
|---|---|---|
| Desktop / high | RTX 5060 at 1280×800 | ≥55 fps, p95 ≤ 22 ms |
| Phone / medium | 390×844 at 2× DPR, 4× CPU throttle; GPU cost proxy is desktop GPU ms × a documented phone/desktop ratio | ≥30 fps (floor 24) |
| Low / software GL | SwiftShader | Playable ≥20 fps, at the baseline-measured level |

Each profile also has heap and ready-time limits.

**Output:** `research/perf-ceiling.md` and `.json`.
- The "knee" per profile: the highest complexity that keeps a 20% headroom margin.
- A **budget table per tier**: triangles per LOD, bones, texture size, pack MB, draw calls.
- Expected shape: a hero LOD for duel and close cams (batter, pitcher, catcher, ump), a mid LOD for broadcast, a far LOD for outfielders.
- The pixel-error method from `games/football/experiments/lod-showcase` (render at in-game pixel size and compare to a 16× supersampled hero) sets each LOD's distance switch.
- Baseball's camera distances (catcher's-eye batter about 3–5 m, pitcher about 18 m, CF telephoto, high-home broadcast) define the test distances.

## Phase 3: Character pipeline (first build, then refined each loop)
- **`art-src/blender/players/build_players.py`** (headless Blender 5.2, reproducible):
  - MPFB2 base bodies, at least 3 builds (lean, average, stocky) and varied faces.
  - Baseball kit: jersey with placket/sleeves, pants, belt, stirrups/socks, cleats, cap, batting helmet with flap, catcher's gear, glove/mitt, bat.
  - Retopo/decimate to the Phase 2 LOD budgets, and a skeleton chosen by the study: the 26-bone rig extended with finger bones if affordable.
  - Pack outputs go to `assets/pack-players-<tier>.js`, base64 classic scripts, file-safe. The pattern comes from football's `tools/packs-lib.mjs` and `pack-players.mjs`, including the shared-bone-list check.
- **Team colors:** move from the vertex-colour region palette to a UV kit-mask texture (mask channels × team colour uniforms in the `onBeforeCompile` shader in `src/js/actors3d.js` `paletteMaterial()`). This keeps one draw call per player and adds fabric normal/detail.
- **Shared materials:** share materials per team instead of cloning per actor.
- **Animation:**
  - Retarget the mocap clips in Blender (constraint-copy then `nla.bake`). Keep the existing contract: clips scrubbed from sim time, with release and contact frames remapped to the 0.9 s windup and the swing lag (`actors3d.js` `pose()`, `render3d.js` `reachArm()`).
  - Add foot-plant IK where needed.
- **Runtime:**
  - LOD selection by screen height in `render3d.js`.
  - Re-enable frustum culling with correct skinned bounds.
  - Lazy-load the tier pack after first play. The Low tier keeps the current eager 9.3k model as the always-available fallback, so offline/file:// and 2D-fallback behaviour is unchanged.

## Phase 4: The loop (N = 0, 1, 2 …)
1. `npm run build`, then `npm test`. All tests must be green.
2. `node tools/shots-review.mjs review-loop-N --tiers=high,medium,low --verify`
3. `node tools/perf-review.mjs --out=reviews/loop-N/perf.json`, plus the throttled mobile and low runs, plus the character fidelity metric. That metric is pixel-error and silhouette IoU of each LOD against the reference renders at game distances, written to `reviews/loop-N/fidelity.json`.
4. I inspect every capture, then write `reviews/loop-N/CHANGES.md` (facts only).
5. `node tools/review-prep.mjs N` writes the briefs (captures index, perf, fidelity, changes; no prior scores for critics).
6. **Adversarial review, all separate subagents:**
   - **Critic A** (Claude) and **Critic B** (Codex GPT-6.1 Sol via `codex:codex-rescue`, `--effort medium`; high for loop 0 and the final loop) run in parallel and blind. Each must cite ≥2 captures per score and a motion strip for animation. Both also list concrete defects and suggested fixes.
   - Then the **Advocate**: rebuttals must cite a capture, may move scores at most ±1 from the critics' mean, and may not add gaps.
   - Then the **Judge**: sees everything plus history, re-checks wherever the critics disagree by more than 1, sets final scores and keeps the top 12 gaps.
   - Every 3rd loop, an unlabeled benchmark image is slipped in to detect drift.
7. `node tools/review-tally.mjs N`: validates the JSON, writes `scores.json`, `gaps.json` and `HISTORY.md`, then ranks the backlog.
   - Priority = expected gain × weight ÷ effort; about 8 effort points per loop.
   - Any category that drops by 0.5 or more is forced to the top as a regression.
8. Develop the top gaps. Verify a critic's diagnosis in-game before acting on it (football lesson). Then commit code plus `reviews/loop-N/` as **"Diamond Springs visuals v3: loop N (X/80)"**.

**Stop rule:** all gates met and the performance gate passing; or 3 stagnant loops in a row; or a 12-loop cap.

On stop, `VISUAL-REPORT.md` gets a v3 section: scores per loop, perf per tier, the final complexity budget, before/after contact sheets (`shared/test-harness/sheets.mjs --compare`) and the remaining gaps.

## Critical files
- **Modify:**
  - `src/js/actors3d.js`: loader, material, `pose()`, decals
  - `src/js/render3d.js`: tiers, `govern()`, LOD, culling, cameras/close-ups
  - `src/js/main.js`: `__game` hooks
  - `tools/pack-models.mjs`: tier packs
  - `tests/perf.test.mjs`, `tests/gfx.test.mjs`
  - `SAMPLES.md`, `VISUAL-REPORT.md`
- **New:**
  - `VISUAL-PLAN-3.md`: this plan, plus the budget table once measured
  - `reviews/**`
  - `tools/shots-review.mjs`, `tools/review-shots.json`, `tools/perf-review.mjs`, `tools/perf-ceiling.mjs`, `tools/review-prep.mjs`, `tools/review-tally.mjs`, `tools/fidelity.mjs`
  - `art-src/blender/players/*.py`
  - `research/character-sources.md`, `research/perf-ceiling.md`
- **Reuse as templates** from `C:\Video Game Projects\games\football\`:
  - `tools/shots-gpu.mjs`, `tools/perf-gpu.mjs`, `tools/review-prep.mjs`, `tools/review-tally.mjs`, `tools/packs-lib.mjs`, `tools/pack-players.mjs`
  - `reviews/{PROTOCOL,RUBRIC}.md`, `reviews/schema.json`, `reviews/briefs/*`
  - `experiments/lod-showcase/build_lods.py` and its pixel-error method
  - `shared/LESSONS.md`: freeze every clock; `viewport` must be passed as an object; shader colours are linear; the governor must ignore frames over 0.2 s; hide parts with zero-scale bones; WebGL can't load `file://` images, so packs carry base64.

## Verification
- Each loop: `npm test` is green, including the eager-size and pack-budget checks. `--verify` determinism passes, and `perf.json` meets every profile threshold.
- The game is spot-checked in the browser pane at http://localhost:8765, in desktop and mobile viewports, from both http and `file://`. `?gl=0` and the software-GL low tier must still work.
- After Phase 2, the ceiling numbers are re-measured with the real Phase 3 players, to confirm the synthetic ladder predicted the real cost.
- Final: a before/after contact sheet against the v2 baseline, and score history in `reviews/HISTORY.md`.

## Risks and limits (honest)
- **No physical phone or low-end GPU is available here.** Phone performance is a proxy (CPU throttle plus a GPU-ms ratio). I'll offer a LAN URL so you can spot-check on a real phone; it isn't required.
- **Mocap coverage of baseball actions may be thin.** The fallback is keyed IK animation, which caps animation around 6–6.5, as in football.
- **MPFB2 may misbehave in headless Blender 5.2.** The fallback is the interactive Blender MCP session, or a CC0 base mesh.
- **Scores tend to move 0–2 points per loop.** Expect several loops before character gates pass.
- **Long-running:** I'll request keep-awake, and run Blender and perf jobs in the background.

## Budgets
Provisional until the phase-2 study (`research/perf-ceiling.md`) replaces them with measured numbers.

| Profile | How it's measured | Gate |
|---|---|---|
| Desktop / high | `perf-review.mjs`, RTX 5060, 1280×800, vsync off | every scene ≥ 55 fps, p95 ≤ 22 ms |
| Phone / medium | 390×844 @2×, 4× CPU throttle; GPU ms × the phone ratio in `research/perf-ceiling.md` | ≥ 30 fps (floor 24); estimated phone GPU ≤ 26 ms |
| Software GL / low | SwiftShader | no worse than the v2 baseline measured in loop 0 |
| Download | `tests/perf.test.mjs` | eager (index.html + vendor + assets, excluding lazy packs) ≤ 3.5 MB; lazy player packs: medium ≤ 4 MB, high ≤ 10 MB |
| Heap | perf.json | high < 192 MB, medium < 128 MB, low < 90 MB |
