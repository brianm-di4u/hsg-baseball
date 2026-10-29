# Diamond Springs: core mechanics

The foundation, synthesized from the samples in `SAMPLES.md`. Numbers here are game tuning,
calibrated with `tools/balance.mjs` against the targets in `PRD.md` §8.

## 1. Architecture

```
src/js/util.js      RNG (mulberry32 on {rs}), math, guarded storage, color contrast
src/js/data.js      schools (inlined schools.json), fictional towns, spring-training clubs, parks, facts
src/js/roster.js    fictional rosters: 9 position players (with DH) + 3 pitchers, ratings
src/js/park.js      park geometry: fence distance/height by spray angle, surfaces, fielder spots
src/js/pitch.js     pitch types, location + control error + break, duel-view trajectory
src/js/contact.js   swing → batted ball (exit speed, launch angle, spray), bunts, fouls
src/js/flight.js    fixed-step ball flight: drag + lift, bounces, roll, fence/wall
src/js/resolve.js   the play resolver: fielders, catches, throws, runners → timeline + outcome
src/js/ai.js        AI pitcher (type/location), AI batter (swing/take, timing), steals, bullpen
src/js/game.js      the game: count, outs, innings, lineup, stats, phases, events (pure, no DOM)
src/js/season.js    schedule, standings, bracket, sim games
src/js/challenges.js challenge definitions and goal checks
src/js/render.js    canvas: duel view, field view, camera, effects
src/js/art.js       crests, players, parks, grandstands, alligator farm
src/js/input.js     keyboard, mouse, touch → intents
src/js/audio.js     WebAudio synthesis
src/js/ui.js        DOM screens (title, select, hub, help, settings, breaks, final)
src/js/main.js      boot, loop, scenes, saves, window.__game
```

`game.js`, `resolve.js`, `flight.js`, `contact.js`, `pitch.js`, `ai.js`, `season.js` have no DOM
access, so `tools/balance.mjs` imports them in Node and plays whole seasons.

## 2. Loop and timing
- 60 Hz fixed step (`DT = 1/60`) with an accumulator (MDN pattern). Render every rAF while a game
  scene is live; menus render on demand and stop the loop.
- `pause()` stops stepping; `step(n)` advances n ticks while paused (tests).
- Game phases: `pre` (between pitches: choose pitch, aim, steal/bunt) → `windup` → `flight`
  (ball travelling; the swing can happen) → `play` (timeline playback) → `result` (call shown,
  ~0.9 s) → back to `pre`, or `half` (side retired banner) → `break` (between innings) → `final`.
- **Pitch speed scale.** Real flight takes 0.45–0.65 s. The duel plays the flight at
  `scale × real time`, where scale is 1.0 (Real), 1.45 (Normal, default) or 1.9 (Relaxed). Timing
  windows scale with it, so the skill test is "fraction of the flight", not raw milliseconds.

## 3. State model (one serializable object)
`game` = `{ v, seed, rs, rules{innings, runRule, dh}, teams[2]{key, name, roster, lineup[9],
order, pitcher, bullpen[], stats, score, hits, errors, line[]}, inning, half (0 top, 1 bottom),
outs, balls, strikes, bases[3] (runner ids or null), phase, t, pitch{...}, swing{...}, play{
timeline, outcome}, user (0 home, 1 away, -1 none), log[], ev[] }`. Everything is plain JSON;
`setState` can load any snapshot (tests use crafted situations).

## 4. The duel

### Pitching
- Repertoire: Fastball (FB) for everyone, plus two (relievers) or three (starter) of Changeup (CH),
  Curveball (CB), Slider (SL). Velocities: FB 72–90 mph by rating; CH −9, SL −7, CB −14.
- Break at the plate (ft, catcher's view, right-handed pitcher; mirrored for lefties), scaled by
  0.7 + 0.6·stuff: FB rides (x −0.15, z +0.1), CH fades and sinks (x −0.38, z −0.5), SL sweeps
  (x +0.55, z −0.25), CB drops (x +0.35, z −0.9).
- **Location.** Target (px, pz) in feet at the plate (zone x ±0.83 incl. the ball, z 1.55–3.45).
  Actual = target + Gaussian error, σ = (0.17 + 0.4·(1 − control)) · (1.6 − 0.8·acc) · (1 + 0.8·fatigue).
- **User meter.** First press starts a needle sweeping 0 → 1 over 1.1 s; the second press sets it.
  Gold band 0.78–0.86; `acc` = 1 in the band, falling linearly to 0 at 0.35 outside it; no second
  press by 1.25 s → acc 0.15. acc also adds up to ±1.5 mph and raises deception. Auto meter: 0.75.
- **Fatigue (game system).** Past 85% of stamina (starters 90–110 pitches, relievers 40–60),
  control and velocity degrade. Bullpen change at stamina, fatigue > 0.75, or 4 runs in the inning
  after 20 pitches. Announced in the log and the live region.

### Duel-view projection
Camera 10 ft behind the plate, 4 ft high. `sx = cx + X·F/(Y+10)`, `sy = hy − (Z − 4)·F/(Y+10)`;
F = min(1.5·H, 1.2·W) landscape, min(1.5·H, 2.4·W) portrait. The pitch is a straight line from the
release point plus a late break `b·t²` and a small arc; the batter is drawn at 74% scale (pinned
inside the frame in portrait) so the zone stays clear. The catcher's mitt pops up where the pitch
crossed the plate.

### Swinging
- **Timing.** A press at game time `ts` meets the ball at `ts + 0.10·scale`. Timing error
  `u = (ts + lag − T) / W` with W = 0.04 s × (0.85 + 0.35·contact) × difficulty (Rookie 1.35,
  Varsity 1.0, All-State 0.8) × pitch-speed scale. |u| ≤ 0.4 PERFECT, ≤ 0.9 GOOD, ≤ 1.7 EARLY/LATE
  contact (a miss gets likely from 1.2 up), beyond that WAY EARLY/LATE and a whiff.
- **Aim.** Auto aim (default) puts the cursor on the pitch with noise (x 0.14 ft, z 0.22 ft) and
  can't follow far outside the zone. Aim + timing uses the player's cursor; half-width
  0.33 + 0.12·contact ft; a horizontal miss beyond cw + 0.1 or vertical beyond 0.52 ft is a whiff.
- **Contact → batted ball.**
  - Quality `q = (1 − (|u|/1.7)^1.25) · (1 − 0.6·(dx/(cw+0.1))²) · (1 − 0.35·(dz/0.52)²)`.
  - Spray `θ = side · u · 30° + N(0, 9°)`; |θ| > 46° is foul; foul chance clamp(0.72 − 0.55·q, 0.15, 0.65).
  - Launch angle `LA = 13 + 62·dz + N(0, 11 + 5·|u|)`.
  - Exit speed `EV = (90 + 28·power) · (0.46 + 0.54·q) + 0.15·(mph − 78) + N(0, 3)`, ×0.85 beyond
    45° or below −12°.
- **Bunt:** |u| ≤ 2.6, EV 18–32 mph, LA −14…+4°, spray N(0, 15°); 22% foul (+25% off the plate).
- **Take:** strike if it crosses the zone; ball otherwise; hit by pitch in the body box
  (1.95–3.1 ft inside, 70%); wild pitch 50% with runners on when in the dirt or 2.1 ft wide.

### AI batter
In-zone swing 0.66 (+0.2 with two strikes, −0.1 on 0-0, −0.12 on 3-ball counts); chase
`(0.34·(1 − eye) + 0.1 + 0.14·[2 strikes]) · e^(−d/0.5)`. Sampled timing `u ~ N(0, 0.68·(1.45 −
contact)·deception)`, horizontal miss `|N(0, 0.27·(1.4 − contact)·deception)| + 0.5·outside`.
Deception = 1 + 0.35·stuff + 0.3·(acc − 0.5), +0.18 after a speed change of 8+ mph. Late in close
games, weak hitters bunt runners over.

### AI pitcher
Weighted type by count (fastballs when behind, breaking balls with two strikes, no repeats);
in-zone target 60% (86% at three balls, 70% at 2-0/2-1, 30% at 0-2/1-2), edges preferred.

## 5. Ball flight (`flight.js`)
Fixed 1/120 s integration, samples at 1/60 s. `a = −g − kD·|v|·v + kL·|v|·v_h·ẑ` with kD = 0.0019,
kL = 0.00055 (balls hit above 4°, until the first bounce). Calibration: 95 mph at 28° carries about
355 ft, 105 mph at 30° about 410 ft. Bounces keep 88% of horizontal speed on low skips and 72% on
steep landings (vertical ×0.36, turf 0.42); rolling decelerates at 9 ft/s² (grass), 7 (turf),
15 (infield dirt). Fence: above its height → home run (flight continues for the distance); below →
carom; over after a bounce → ground-rule double. Fair/foul is decided where a ball lands beyond
95 ft, else where it passes the bases or stops.

## 6. The play resolver (`resolve.js`)
Deterministic given the RNG; outputs a **timeline** the renderer plays back and an **outcome** the
game applies. No per-frame AI, so plays are reproducible and Node resolves thousands per second.

1. **Responsible fielder.** For each fielder and ball sample: reachable when
   `dist − reach ≤ speed·(t − react)` and the ball is catchable (z ≤ 7.5 ft infield, 6.8 ft
   outfield, 9.5 ft leaping at the wall). React (reaction + first step): grounders 0.64 s infield,
   0.7 s outfield; in the air 0.62 s / 1.1 s; pitcher 0.62 s. Speed 20 + 6·speed ft/s (catcher 17,
   pitcher 19, outfield 19 base). Reach 4.5 ft (3.2 ft on grounders, pitcher 3 ft), dive +2.6 ft
   infield / +5 ft outfield. An infielder can't cut off a grounder that is already 4 ft past him.
   Infielders give way to outfielders on shallow flies; pitchers give way on pop-ups.
2. **Catch or field.** Routine air catch 0.968 + 0.022·glove (a miss is an error); a catch at the
   end of his range (margin < 5 ft after 1.2 s) 0.66 + 0.24·glove (a miss is a hit); diving
   0.32 + 0.38·glove. Grounders 0.912 + 0.05·glove; a bobble costs 0.8–1.4 s and is scored an error
   only if it cost an out. Outfielders take 0.5 s to gather a ball on the ground.
3. **Throws.** Infield 98 + 24·arm ft/s, outfield 90 + 24·arm; transfer 0.65 s infield, 0.75 s
   outfield; a relay adds 0.55 s beyond 230 ft; double-play pivot 0.38 s. Infield throwing error 2.5%.
4. **Runners.** 24 + 6·speed ft/s; the batter leaves at 0.5 s (bunt 0.35); runners have a 0.12-base
   lead and go at 0.12 s (at once with two outs); a base turn costs 0.25 s; hit-and-run runners are a
   third of the way at contact. On fly balls with fewer than two outs runners go halfway.
5. **Ground ball to an infielder.** Forced runners run; a runner on second advances on balls to the
   right side; a runner on third goes on contact on balls to the right side or deep (70%). Out chance
   per option Φ(margin / 0.1). Two outs: the surest out (a force preferred). Otherwise the lead force
   if ≥ 70% (a tag play needs 85%), else first. A force at second, third or home with fewer than two
   outs is relayed to first for a double play.
6. **Fly caught.** One out; with fewer than three, the runner on third tags if his time beats the
   throw by the aggression margin (plus his own misjudgment, σ 0.25 s), and the runner on second tags
   on deep flies to center and right. Liners caught by infielders double off a leaning runner 22% of
   the time. The **infield fly** rule (game rule) is applied in `game.js`.
7. **Hits.** Each runner, lead first, takes the furthest base he expects to beat the throw to by the
   margin (Safe 0.6 s, Normal 0.3 s, Aggressive 0.05 s; AI teams 0.12 s), never passing the runner
   ahead. The defense throws at the best out chance when it is above 6%.
8. **Scoring rules.** No runs on a play whose third out is a force or the batter before first;
   otherwise runs that crossed before the third out count. Walk-off runs stop at the winning run
   except on a home run.

Timeline: `{ dur, ball: [[t,x,y,z]], fielders: {pos: [{t,x,y}]}, runners: {id: [{t,b,out?,score?}]},
throws: [{t0,t1,from,to}], calls: [{t,text,kind}] }` in feet; `b` is a fractional base index.

## 7. Steals and baserunning input
The batting side may send the runner (first with second open, or second with third open). Runner
time = 0.35 + 78/speed + 0.2 (jump, run, slide); defense = delivery 1.25 + flight + catcher pop 0.7
+ throw/(100 + 30·arm). Out if the throw wins after N(0, 0.14) noise. The AI sends fast runners
(about 8% of pitches plus a speed bonus). Aggression (Settings) sets the user's runner margins.

## 8. Rendering layers
1. Static layer (cached per size/DPR/park): sky, stands, fence, field surface with mow stripes,
   lines, bases, mound; Whittington-style grandstand and alligator farm for the historic park.
2. Dynamic layer: fielders, runners, ball + shadow, throw lines, aim cursor, target, meter.
3. HTML overlay: scoreboard, count, base diamond, banners, touch pad.
Duel view and field view are separate cached backdrops; the camera eases between them. Portrait
field view zooms 1.35x toward the ball so player tokens stay ≥ 9 px.

## 9. Input
Intents, not raw keys: `aim(dx,dy)`, `aimTo(x,y)`, `primary` (swing / meter), `pitchType(n)`,
`bunt`, `steal`, `skip`, `pause`. Keyboard: arrows/WASD aim, Space/Enter primary, 1–4 pitch type,
B bunt, S steal, F skip, P/Esc pause. Mouse: move to aim, click primary. Touch: drag on the canvas
to aim, buttons on the pad for everything else (≥ 48 px). Pointer events with pointerType checks.

## 10. RNG
mulberry32 (CC0) stepped on `{rs}` inside the game state (`util.js rnd(o)`). `seed(n)` resets the
game RNG; rosters use their own hashed seeds per school so lineups are stable across games.

## 11. Save format
`localStorage['hsg-diamond-v1']` = `{v:1, settings, season, trophies[], stars{challengeId:n},
album[factIds], unlocks{}, records{longest, splashes}}`, written in try/catch. If storage throws,
the game runs and the Settings screen says saves are off. Boot merges with the stored save; it never
overwrites it with defaults before the player acts.

## 12. `window.__game`
`seed(n)`, `getState()`, `setState(s)`, `isIdle()`, `step(n)`, `pause()`, `resume()`,
`scene(name)`, `newGame(opts)`, `act(name, ...args)` (see DEV-PLAN §3 for the full list).
