# Diamond Springs: report

An original high-school baseball game set in Garland County, Arkansas. Single self-contained
`index.html` (239 KB), built from `src/` with `node shared/tools/inline.mjs games/baseball`.
Nothing is committed; the coordinator reviews and commits.

## What was built
- **The duel.** Catcher's-camera view. Batting: a timing swing graded PERFECT / GOOD / EARLY /
  LATE (early pulls, late goes the other way), Auto aim or Aim + timing (cursor by arrows, mouse or
  drag), bunt toggle, steal call. Pitching: four pitch types with their own speed and break, a
  movable target and a two-press accuracy meter; fatigue and bullpen changes.
- **Ball in play.** A fixed-step flight model (drag, lift, bounces, roll, fence, wall caroms) and a
  deterministic play resolver: responsible fielder by earliest intercept, catches and errors,
  throws, relays, force and tag plays, double plays, tag-ups, runner decisions by time margin. The
  result is a timeline the top-down field view plays back (portrait camera follows the ball); Skip
  (F / ▶▶) jumps to the result.
- **Rules, presented as the game's rules.** Count, outs, innings (3/5/7), fouls, foul-bunt
  strikeouts, hit by pitch, wild pitches, ground-rule doubles, infield fly, no runs on a third-out
  force, walk-offs (winning run only, all runs on a homer), extra innings, run rule, DH.
- **Modes.** Exhibition (7 county schools and 14 fictional towns, three parks); Season (8 or 14
  games, standings, 8-team bracket in the school's class, semifinal at Lakeside High School, final
  at Majestic Park under the lights, sims, trophy); Spring Training (two fictional barnstorming
  clubs in cream wool at a historic-style park after Whittington Park, 340/400/260 ft, alligator
  farm across the street, Gator Splash, a fact card after every inning); eight Challenges
  (Baseball School, Umpire School, Gator Splash Derby, Long Ball, Walk-Off, Shut the Door, Small
  Ball, Bases-Loaded Jam) with saved stars; a Fact Album.
- **Content.** 52 audited fact cards (`data/facts.json`, checked by `tools/check-facts.mjs`), each
  with its source; hedges on "birthplace" and on the 573-ft estimate; the 1953 Tugerson card is in
  the album only, never a scenario. Schools, colors, mascot concepts and baseball classes come from
  `shared/data/schools.json`, inlined at build time. Fictional players only.
- **Polish.** WebAudio bat crack, mitt pop, umpire tones, crowd, organ riff, splash; hit flash,
  call banners, camera shake on homers, confetti; day/night themes; reduced motion; text 100–150%;
  live-region announcements; assists (auto aim, timing ring, auto meter, relaxed pitch speed).

## Acceptance criteria
| AC | Status | Evidence |
|---|---|---|
| AC1 title | met | screens › title screen; hooks in ~60 ms |
| AC2 help tabs, game rules, about | met | screens › help screens |
| AC3 layout both viewports | met | `checkLayout` in every screen test |
| AC4 calls, walk, strikeout | met | duel › called strikes… |
| AC5 timing grades, contact | met | duel › timing grades |
| AC6 pull/oppo, fouls | met | duel › pull, opposite field and fouls |
| AC7 aim mode, all inputs | met | duel › aim mode; input › mouse; input › touch drag |
| AC8 bunt, foul-bunt K | met | duel › bunt |
| AC9 pitch types by key and button | met | duel › pitch types |
| AC10 meter accuracy | met | duel › meter (mean miss 0.28 ft perfect vs 0.73 ft missed) |
| AC11 AI swing/chase | met | ai › swing rates (middle 0.50, well off 0.08; chase 0.10 → 0.15 with two strikes) |
| AC12 fatigue and bullpen | met | ai › fatigue and bullpen change |
| AC13 fly out, gap hit, homer | met | play › fly out, gap hit, home run |
| AC14 ground out, double play | met | play › ground out and double play |
| AC15 sac fly | met | play › sacrifice fly |
| AC16 infield fly | met | play › infield fly rule |
| AC17 no run on third-out force | met | play › no run on a third-out force |
| AC18 steals | met | play › steal |
| AC19 timeline playback, skip | met | play › timeline playback and skip |
| AC20 halves, skipped bottom, walk-off, extras | met | flow › half innings… |
| AC21 run rule | met | flow › run rule |
| AC22 break fact, final screen | met | flow › inning break fact card and final screen |
| AC23 pause | met | flow › pause |
| AC24 exhibition select | met | modes › exhibition select |
| AC25 season to champion | met | season › schedule, bracket, finals at Majestic Park, champion |
| AC26 spring training | met | modes › spring training |
| AC27 Gator Splash | met | modes › gator splash |
| AC28 challenges and stars | **partial** | Walk-Off and Long Ball are played to their result and stars persist; Baseball School and Umpire School start and score; Derby, Shut the Door, Small Ball and Jam share those code paths but no test plays them to the end |
| AC29 umpire school | met | modes › umpire school |
| AC30 audited, sourced facts | met | content › facts; `tools/check-facts.mjs` 52/52 |
| AC31 schools, fictional players | met | content › schools from shared data (banned-name lists live in the test) |
| AC32 keyboard only | met | a11y › keyboard-only: menus, a swing, a pitch via meter |
| AC33 touch | met | input › touch (real CDP touch; pad targets ≥ 44 px) |
| AC34 contrast both themes | met | a11y › contrast day / night (0 failures across 13 screens) |
| AC35 reduced motion | met | a11y › reduced motion |
| AC36 settings persist, storage blocked | met | a11y › settings persist; storage blocked |
| AC37 live region | met | a11y › live region |
| AC38 season resume | met | season › resume after reload |
| AC39 performance, no requests, no errors | met | perf › 60 fps duel and field view, heap 9.5 MB, 239 KB, zero console errors or external requests |
| AC40 balance | met, one outlier | `tools/balance.mjs` (below) |

## Test results
`node shared/test-harness/run.mjs games/baseball --milestone final`: **81/81 passed** at desktop
(1280×800) and mobile (390×844), 122 screenshots, all inspected through the contact sheets
(`screenshots/final/sheets/`, 19 sheets) with full-size checks of field views, box score, champion
and touch shots. Milestones m1–m4 were run and inspected along the way (defects in DEV-PLAN §5).

## Balance (`node games/baseball/tools/balance.mjs 300`, 300 AI games, 7 innings, Varsity)
| Metric | Result | Target |
|---|---|---|
| Runs per team per game | 4.24 | 4.0–6.5 |
| Batting average | .277 | .250–.310 |
| Strikeouts per PA | 16.6% | 15–24% |
| Walks + HBP per PA | 12.3% | 8–13% |
| Home runs per team per game | 0.48 | 0.2–0.8 |
| Errors per team per game | 0.67 | 0.3–1.5 |
| Double plays per team per game | 0.21 | 0.2–1.0 |
| Pitches per team per game | 120 | 95–135 |
| Stolen-base success | 75% | 60–85% |
| Home win % | 48% | 45–60% |
| Simulated player, 50 ms timing σ | BA .337, K 9.5% | BA .220–.340, K ≤ 30% |
BABIP .33 (grounders .25, liners .65, flies .15); doubles 1.0 per team-game; 10% of games go to
extra innings, 6% end on the run rule. Skill curve for the simulated player: BA .347 / .337 / .286 at
30 / 50 / 80 ms timing error.

**Outliers and near-edges (named, not hidden):**
- **Triples: 0.00 per team-game.** Runners rarely beat a relay to third in the small high-school
  parks. Real high-school rates are low but not zero.
- **Simulated player BA .337** sits at the top of its band at Varsity/Normal: a skilled player will
  find batting easy. All-State and Real pitch speed narrow the window.
- Runs (4.24), K% (16.6%) and DP (0.21) are inside their targets but near the low edge.

## Performance
- `index.html` 239.3 KB (budget 2 MB); hooks ready in about 60 ms.
- 60.1–60.5 fps headless in the duel and during field playback, both viewports; JS heap 9.5 MB.
- Menus render on demand (no rAF loop outside the title animation and live play); the title is
  static under reduced motion.

## Known gaps
- **Audio and screen readers were not checked by a person.** Sounds are short and quiet by default;
  live-region text was tested automatically only.
- Triples are missing from the simulation (see Balance).
- AC28 partial (above).
- The field view of the historic-style park shows the alligator pens and street, but its wooden
  grandstand is a simple arc; the duel view carries the wood fence and the 1936-era light towers.
- Line scores in tests that start from a crafted score (for example the walk-off test) show the
  total without matching inning runs; real games are consistent.
- No pickoffs, balks, interference, uncaught third strikes, pinch hitters or manual fielding
  (out of scope in PRD §14).

## Data notes (not fixed, reported)
- **Sam Guinn Field marker, "Red Sox":** `research/baseball-spring-training.md` marks the marker's
  "Red Sox" as *presumably Memphis* **[UNCONFIRMED]**, while the audited bank's hs-0221 explanation
  states "Memphis Red Sox" as fact. The game's card restates hs-0221 without the Memphis club.
- **Majestic Park dimensions** are not in research or `schools.json`; the game uses labelled game
  dimensions.
- **Baseball field names:** every school's `venues.baseball.venueConfirmed` is false, so the game
  always says "<School> home field" (respecting the flag). No conflict, but no real names exist yet.
- `research/game-hooks.md` §8 calls Smoky Joe Wood's 34-5 "the benchmark stat" for a Red Sox camp
  mode; it is only in the Trail summary (no audited bank item), so the game doesn't use it.

## Harness requests
- `t.shot(name, { fullPage: true })` can't capture content that scrolls inside a fixed overlay
  (`#screen`), so long panels (box score, settings) are cut at the viewport. An option to capture a
  scrolling element in sections, or to temporarily un-fix it, would help screen review.
- A helper that steps a paused game until a predicate holds (`t.stepUntil(pred)`) is something
  every real-time game re-implements in `tests/helpers.mjs`.

## Files
`PRD.md`, `MECHANICS.md`, `DEV-PLAN.md` (milestones, hook spec, test matrix, defect log),
`SAMPLES.md`, `research/town-content.md`, `data/facts.json`, `tools/balance.mjs`,
`tools/check-facts.mjs`, `tests/*.test.mjs` (12 files plus helpers), `src/` (17 modules + CSS).
