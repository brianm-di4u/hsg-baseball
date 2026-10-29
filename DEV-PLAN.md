# Diamond Springs: development plan

Build: `node shared/tools/inline.mjs games/baseball` (sources in `src/`, output `index.html`).
Test: `node shared/test-harness/run.mjs games/baseball --milestone mN`, then
`node shared/test-harness/sheets.mjs games/baseball --milestone mN` and inspect every shot.
Balance: `node games/baseball/tools/balance.mjs [games=200]`. Facts: `node games/baseball/tools/check-facts.mjs`.

## 1. Milestones

### M1 Foundation
- util, data (schools.json inlined, fictional towns, clubs, parks), roster generator, park geometry.
- Boot, scene system, title, help, settings screens, saves (guarded), theme, text size.
- Canvas with cached field backdrop for each park; `window.__game` skeleton.
- Tests: screens, settings persistence, layout at both viewports.

### M2 Core loop
- pitch.js, contact.js, flight.js, resolve.js, ai.js, game.js (count, outs, innings, scoring).
- Duel view (catcher camera), field view with timeline playback, scoreboard.
- Keyboard, mouse, touch input for batting and pitching; meter.
- `tools/balance.mjs` first pass.
- Tests: duel (calls, timing, pull/oppo, aim, bunt, pitch types, meter), play resolver scenarios.

### M3 Full rules and content
- Tag-ups, infield fly, force-out run rule, walk-offs, extra innings, run rule, steals, wild
  pitches, HBP, fatigue/bullpen, errors.
- Modes: Exhibition, Season (schedule, standings, bracket, sims), Spring Training, Challenges,
  Umpire School, Baseball School, Fact Album. Fact cards from `data/facts.json`.
- `tools/check-facts.mjs`; balance tuning to PRD §8.
- Tests: flow, modes, season, content.

### M4 Polish, audio, accessibility
- Audio, juice (hit flash, banners, crowd, confetti), linen filter for Spring Training, Gator
  Splash effect, final/box score.
- Contrast both themes, reduced motion, live region, keyboard-only pass, touch pass.
- Tests: a11y, input (touch).

### M5 Optimization and release
- FPS/heap/size checks, render-on-demand menus, final balance run, docs, REPORT.md.
- `--milestone final` run, all screenshots inspected.

## 2. Task breakdown
| Milestone | Tasks |
|---|---|
| M1 | data.js schools + towns; roster.js; park.js; ui.js screens; main.js boot/scenes/saves; render backdrops; tests screens/a11y-settings |
| M2 | pitch/contact/flight/resolve/ai/game modules; render duel + field; input.js; HUD; balance.mjs; tests duel/play |
| M3 | rules edge cases; season.js; challenges.js; facts.json; check-facts.mjs; tests flow/modes/season/content |
| M4 | audio.js; effects; themes; reduced motion; live region; tests a11y/input |
| M5 | perf test; size trim; docs; final run |

## 3. `window.__game` hook spec
| Hook | Returns / does |
|---|---|
| `seed(n)` | reseeds the game RNG (next newGame and pitches are reproducible) |
| `getState()` | `{scene, mode, settings, reduced, loop, storage, game: {inning, half, outs, balls, strikes, bases, score, phase, batter, pitcher, user, userRole, lastCall, lastPlay, pitchCount, linescore, hits, errors, winner, ...}, season, stars, album, fx, view}` |
| `setState(s)` | merges `settings`, or crafted `game` fields (`inning, half, outs, balls, strikes, bases, score`), then redraws |
| `isIdle()` | true unless a screen transition or entry animation is running (live play counts as ambient) |
| `step(n)` | advance n fixed ticks (1/60 s) while paused |
| `pause()` / `resume()` | stop / restart the fixed-step loop |
| `scene(name)` | `title, select, hub, bracket, help, settings, challenges, album, game, pause, break, final, champion, spring` |
| `newGame(opts)` | `{mode, home, away, user:'home'|'away'|'none', park:'home'|'majestic'|'historic', innings, seed, paused, situation:{inning, half, outs, bases, score, balls, strikes}}`; `mode:'season'` with `{school, length}` starts a season |
| `act('pitchType', k)` | user pitcher selects repertoire slot k (0–3) |
| `act('aim', x, z)` | sets the aim (batting cursor or pitch target) in plate feet |
| `act('primary')` | same as Space: swing / start or stop meter / skip |
| `act('throw', {type, x, z, acc})` | user pitch with exact target and meter accuracy |
| `act('aiPitch', {type, x, z})` | the next AI pitch goes exactly there (no control error) |
| `act('swingAt', u, {dx, dz})` | during flight: swing with timing error u (windows) and aim offset |
| `act('contact', {ev, la, spray})` | force the next batted ball (play resolver test) |
| `act('bunt', on)` / `act('steal')` / `act('skip')` | batting-side options |
| `act('simGame', opts)` | AI-vs-AI full game in-page, returns `{score, stats}` |
| `act('simNext')` / `act('simToBracket')` | season sims |
| `act('confetti')` | fire the champion effect (reduced-motion test) |
| `act('chal', id)` | start a challenge |
| `act('ump', 'ball'|'strike')` | Umpire School call |

## 4. Test matrix
Screenshots are `screenshots/<milestone>/<viewport>/<name>.png` at both desktop (1280×800) and
mobile (390×844) unless noted.

| AC | Test (file › name) | Screenshots |
|---|---|---|
| AC1 | screens › title screen | 01-title |
| AC2 | screens › help screens | 02-help, 02b-help-play, 02c-help-rules, 02d-help-about |
| AC3 | every test calls `t.checkLayout()` on its screens | (all) |
| AC4 | duel › called strikes, balls, walk, strikeout | 10-duel-bat, 10b-ball-call |
| AC5 | duel › timing grades and contact; smoke › watched game runs | 11-swing-perfect, 11b-whiff, 05-duel-watch, 06-field-play |
| AC6 | duel › pull, opposite field, fouls | 12-foul |
| AC7 | duel › aim mode misses; input › mouse aim | 13-aim-mode |
| AC8 | duel › bunt and two-strike foul bunt | 14-bunt |
| AC9 | duel › pitch types by key and button | 15-pitch-select, 15b-breaking-flight |
| AC10 | duel › meter accuracy | 16-meter |
| AC11 | ai › swing rates by zone and count | — |
| AC12 | ai › fatigue and bullpen | 17-bullpen |
| AC13 | play › fly out, gap hit, home run | 20-flyout, 20b-gap, 20c-homer |
| AC14 | play › ground out and double play | 21-groundout, 21b-dp |
| AC15 | play › sacrifice fly | 22-sacfly |
| AC16 | play › infield fly | 23-infield-fly |
| AC17 | play › force-out third out cancels run | — |
| AC18 | play › steal | 24-steal |
| AC19 | play › timeline playback and skip | 25-play-mid |
| AC20 | flow › half innings, skip bottom, walk-off, extras | 30-half, 30b-walkoff |
| AC21 | flow › run rule | — |
| AC22 | flow › inning break and final | 31-break, 31b-final, 31c-box |
| AC23 | flow › pause | 32-pause |
| AC24 | modes › exhibition select | 40-select |
| AC25 | season › schedule, bracket, finals at Majestic Park, champion | 41-hub, 41b-standings, 41c-bracket, 41d-majestic, 41e-champion, 41f-trophy-title |
| AC26 | modes › spring training | 42-spring, 42b-spring-duel, 42c-spring-field, 42d-spring-break |
| AC27 | modes › gator splash | 43-gator-splash |
| AC28 | modes › challenges and stars; modes › practice challenge runs to a result | 44-challenges, 44b-walkoff-chal, 44c-stars, 44d-longball-result |
| AC29 | modes › umpire school | 45-umpire, 45b-umpire-call |
| AC30 | content › facts audited; tools/check-facts.mjs | 46-album |
| AC31 | content › schools, classes, no banned names | 47-teams |
| AC32 | a11y › keyboard-only half inning and menus | 50-keyboard |
| AC33 | input › touch batting, pitching, aim drag, pad sizes (mobile) | 51-touch-bat, 51b-touch-pitch |
| AC34 | a11y › contrast day and night | 52-dark-title, 52b-dark-game, 52c-dark-settings |
| AC35 | a11y › reduced motion | 53-reduced |
| AC36 | a11y › settings persist; storage blocked | 03-settings, 03b-text-130, 54-no-storage |
| AC37 | a11y › live region | — |
| AC38 | season › resume after reload | — |
| AC39 | perf › fps, heap, size, load (duel and field playback) | — |
| AC40 | perf › balance: in-page simulated games; `tools/balance.mjs` | — |

## 5. Defect log
| # | Milestone | Defect | Status |
|---|---|---|---|
| 1 | M2 balance | AI batting average .045: infielders reached every grounder (no first-step delay, could chase a ball into the outfield) | Fixed: reaction + first-step times, an infielder can't cut off a ball already past him |
| 2 | M2 balance | 57% of pitches were balls and 8% hit batters: control error too wide, off-plate targets inside the hit-by-pitch box | Fixed: tighter control model, off-plate targets 0.15–0.5 ft off, body box starts 1.95 ft inside |
| 3 | M2 balance | Fouls were 2% of pitches (MLB ~18%) | Fixed: foul chance falls with contact quality |
| 4 | M2 balance | Grounders lost 60% of their speed in three bounces | Fixed: low skips keep 88% of horizontal speed |
| 5 | M2 balance | Runs 1.3/team with BA .21: runners never took extra bases, no doubles | Fixed: primary leads, outfield gather time, high-school arm strength, relay cost, AI aggression |
| 6 | M2 balance | A simulated player hit .37 regardless of timing (flat skill curve) | Fixed: steeper quality curve, partial-miss band, narrower window; .343 / .308 / .266 at 30 / 50 / 80 ms |
| 7 | M2 | `baseXY` crashed on a scoring runner (base index 4 clamped to 3.999) | Fixed |
| 8 | M2 | Ball drawn huge behind the plate after a take (projection at negative depth) | Fixed: ball stops at the plate, catcher's mitt drawn there |
| 9 | M2 | Batter filled a third of the duel view and hid the field; off-screen in portrait | Fixed: 74% scale, pinned inside the frame in portrait |
| 10 | M3 | Two-out grounder thrown home instead of taking the force (run scored on a play that should end the inning) | Fixed: two outs → surest out, forces preferred |
| 11 | M3 | Double-play sequence printed "4-4" (cover lookup for home used base 4) | Fixed |
| 12 | M3 | Break screen said "Middle of the 2nd" after a full inning | Fixed: "End of the Nth" |
| 13 | M3 | Touch taps on pad buttons were lost (click after touch) | Fixed: pad acts on touch-down, the following click is ignored (also removes swing delay on touch) |
| 14 | M3 | Contrast: dim stars 1.6:1, locked album cards at 75% opacity, light "next" tag | Fixed |
| 15 | M3 | Line score showed zeros for innings not yet played | Fixed: completed halves only, X for a skipped bottom half |
| 16 | M3 | Polka-dot "trees" around the field read as a pattern | Fixed: plain surround |
| 17 | M3 | Portrait field view left the bottom 40% empty | Fixed: camera anchors home near the bottom and follows the ball at 1.5× |
| 18 | M3 | Champion pennant clipped its text | Fixed |
| 19 | M4 | Box score tables stretched to equal heights; final panel too narrow for it | Fixed |
| 20 | M4 | The "trophy added to your title screen" promise wasn't kept | Fixed: trophy case and records on the title |
| 21 | M4 | A swing grade (PERFECT) lingered into the next game or a challenge result | Fixed: hidden on windup, scene change and new game |
| 22 | final | Triples: 0.00 per team-game in 300 sims (high-school real rate is low but not zero) | Open: known gap (REPORT.md) |
