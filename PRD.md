# Diamond Springs: product requirements

## 1. Vision
A spring evening at a Garland County ballfield: you pick a real local school, step in against a
fictional pitcher and win the duel one pitch at a time. Every pitch is a choice (type, location,
accuracy) and every swing is a moment (timing, and if you like, aim). The ball in play is a real
little simulation of fielders, throws and runners, so a gapper, a double play or a tag-up at the
plate happens because of where the ball went. Between innings the town's baseball past (Hot
Springs, known as the birthplace of spring training) appears as sourced fact cards, and a Spring
Training mode takes you to a historic-style park with a short right-field porch and the alligator
farm across the street.

### Pillars
1. **The duel is the game.** Readable pitches, a fair timing window, clear feedback (EARLY / LATE /
   PERFECT, the call, the count).
2. **Real baseball rules, presented as the game's rules.** Count, outs, force and tag plays, tag-ups,
   infield fly, run rule, walk-offs, extra innings.
3. **Home-town setting, honest history.** Real schools and places as setting, fictional players,
   every fact sourced and hedged where sources disagree.
4. **Pick up and play anywhere.** Keyboard, mouse or touch; 3, 5 or 7 innings; quick sims.

## 2. Target players
Families and students in and around Hot Springs; casual sports-game players (8+); baseball fans who
want a 10–20 minute game in the browser; keyboard-only and touch-only players.

## 3. Modes
- **Exhibition:** any two teams (7 county schools + 14 fictional towns), pick your side, park and
  innings.
- **Season:** pick a county school; 8- or 14-game spring schedule against county schools and
  fictional towns; standings; an 8-team state bracket in your classification. Quarterfinal at the
  higher seed's home field, semifinal at Lakeside High School (2026 co-host), final at Majestic Park.
  Each game can be played or simulated.
- **Spring Training:** an exhibition between two fictional barnstorming clubs (Steam Valley Nine,
  Ouachita Barnstormers) at a historic-style park after Whittington Park (340/400/260 ft), in cream
  wool throwbacks with a linen-postcard look, a fact card after every inning, Gator Splash home runs.
- **Challenges:** Gator Splash Derby, Long Ball (400 ft), Walk-Off, Shut the Door, Small Ball,
  Bases-Loaded Jam, Baseball School (batting tutorial), Umpire School (call balls and strikes).
  1–3 stars each.
- **Fact Album:** every fact card seen, with its source.

## 4. Rules (presented in Help as "the game's rules")
1. Regulation is 7 innings (game rule; 7 innings is a common high-school default). 3 and 5 are
   options. Extra innings until there is a winner.
2. Three outs per half-inning. The home team bats in the bottom; it skips the bottom of the last
   inning if ahead.
3. Count: four balls is a walk; three strikes is a strikeout; a foul is a strike unless there are
   two strikes; a foul bunt with two strikes is a strikeout. A pitch that hits the batter awards
   first base.
4. Strike zone: over the plate, between the hollow of the knee and the midpoint of the torso
   (drawn on screen; toggleable).
5. Batted balls: fair or foul by where they land or pass first/third; over the fence in fair
   territory is a home run; bouncing over is a ground-rule double; caught in the air is an out
   (foul pop-ups too).
6. Force outs, tag outs, double plays; runners must tag up on caught flies; with two outs runners
   go on contact.
7. Infield fly: a pop-up in the infield with runners on first and second (or loaded) and fewer than
   two outs is an automatic out.
8. Runs scored before the third out count, unless the third out is a force out or the batter out
   before reaching first.
9. Walk-off: the game ends as soon as the home team takes the lead in the last inning or later
   (all runs count on a home run).
10. Run rule (game rule, setting): 10 runs after five innings in a 7-inning game (after three in a
   5-inning game).
11. Designated hitter always on: pitchers don't bat.
12. Steals: the runner may break with the pitch; the catcher throws. Wild pitches can advance
   runners.
13. Pitcher fatigue and bullpen changes are a game system (Arkansas pitch-count rules are not part
   of the game).

## 5. Hot Springs content map
| Content | Where | Source |
|---|---|---|
| Seven county schools: names, mascot concepts (drawn), colors, baseball classifications | Team select, scoreboard, crests, uniforms, bracket | `shared/data/schools.json` |
| "game colors" labels (4 schools) and generic home-field names | Team card, About | `schools.json` colorsConfirmed / venueConfirmed |
| Rivalry labels | Matchup card | `schools.json` rivalries |
| Majestic Park (2021, five fields, 1,500 seats, turf) and Lakeside co-host 2026 | Bracket, finals park card | `schools.json`; bank hs-0247/0248 |
| Whittington-style park, 340/400/260, lights 1936, RF fence raised 1938 | Spring Training, Gator Splash, Long Ball | `baseball-spring-training.md`; hs-0197/0219 |
| Alligator farm across the street; Ruth's 1918 drive (with 573 ft caveat) | Historic park backdrop; Gator Splash; Long Ball card | `other-attractions.md`; hs-0183/0184/0336 |
| Doan baseball school (1933–38) | Baseball School challenge intro | hs-0222 |
| First umpire school (Barr, 1935–47) | Umpire School challenge intro | hs-0223 |
| ~40 audited fact cards | Between innings; Fact Album | `games/trivia/data/questions.json` |

## 6. Screens and UX flow
Title → (Season | Exhibition | Spring Training | Challenges | Fact Album | How to play | Settings).
- **Title:** wordmark "DIAMOND SPRINGS", animated (ambient) ball arc over a field, menu, footer
  "All players are fictional. Real schools appear as setting only."
- **Select (Exhibition):** home/away team pickers with crests, your side, park (Home field /
  Majestic Park / Historic-style park), innings.
- **Season hub:** next game card, record, standings table, schedule list, Play / Sim / Sim to
  bracket, bracket view.
- **Game:** scoreboard (teams, runs, inning ▲/▼, B-S-O, base diamond, pitcher pitch count, batter
  line), canvas (duel view / field view), touch pad on touch devices, pause button.
- **Inning break:** line score (R H E), a fact card with source, Continue.
- **Final:** winner banner, line score, top performers, box score toggle, Continue/Rematch.
- **Champion:** confetti (unless reduced motion), trophy saved.
- **Help:** tabs Controls, Batting & Pitching, Rules, About (sources, fictional players, game
  colors, MIT).
- **Settings:** sound on/off and volume, motion (system/reduced/full), text size 100–150%, theme
  (system/day/night), difficulty, batting aim mode, pitch speed, innings, run rule, aggression,
  strike-zone overlay, timing ring assist, auto meter, fact cards on/off.

## 7. Art and audio direction
- Palettes from `shared/design/tokens.css`: `school-colors` for HS play; `linen-postcard` (cream,
  ink navy, postcard brick, title yellow) for Spring Training; `gilded-spa` for day-theme menus and
  wood grandstands; `deco-neon` for the night theme.
- Fields: grass with alternating mow stripes, white chalk lines, red-clay infield, Majestic turf in a
  brighter green with tighter stripes. Historic park: wood grandstand in gilded wood tones, tall
  right-field fence, alligator farm pens beyond right field with a gator silhouette (long low body,
  zigzag back, open V jaw, ~#3E5A3A).
- Players: shape-built figures with team colors, caps, numbers; skin tones varied; no likenesses.
- Audio: bat crack (click + filtered noise), mitt pop, umpire calls as short tones, crowd swell on
  hits, organ "charge" arpeggio at rallies, Gator Splash water burst. Quiet by default (50%),
  mutable.

## 8. Balance targets (AI vs AI, 7 innings, Varsity) — checked by `tools/balance.mjs`
| Metric | Target |
|---|---|
| Runs per team per game | 4.0–6.5 |
| Batting average | .250–.310 |
| Strikeouts per plate appearance | 15–24% |
| Walks + HBP per plate appearance | 8–13% |
| Home runs per team per game | 0.2–0.8 |
| Errors per team per game | 0.3–1.5 |
| Double plays per team per game | 0.2–1.0 |
| Pitches per team per 7-inning game | 95–135 |
| Stolen-base success | 60–85% |
| Home team win % | 45–60% |
| Simulated player at Varsity, Normal pitch speed (timing σ 50 ms of screen time, times the fastball, auto aim) | BA .220–.340, K% ≤ 30% |

## 9. Accessibility
Keyboard-only play for every screen and both sides of the duel; visible focus; text contrast ≥ 4.5:1
in both themes; colorblind-safe cues (counts as digits, bases as filled/empty squares with outline,
teams by abbreviation, timing feedback as words); `prefers-reduced-motion` honored (no shake,
confetti or camera swoops; title animation still); text scale 100–150%; live-region announcements
of every pitch result; assists (auto aim, timing ring, auto meter, relaxed pitch speed).

## 10. Mobile and touch
Portrait-first layout at 390×844: scoreboard top, canvas middle, pad bottom with Swing/Pitch, pitch
type, Bunt, Steal buttons ≥ 48 px. Drag on the canvas to aim. Field view zooms toward the ball.
Landscape works with the pad on the right.

## 11. Performance budgets
60 fps on a mid-range laptop during play; HTML ≤ 2 MB; hooks ready ≤ 2 s; heap < 40 MB; menus
render on demand; zero network requests.

## 12. Save and load
Settings, season in progress, trophies, challenge stars, fact album and records persist in
`localStorage` (guarded). Without storage the game still plays and Settings says saves are off.

## 13. Acceptance criteria
**Boot and screens**
1. AC1 Title shows the wordmark, all mode buttons, How to play, Settings and the fictional-players
   footer; hooks ready in ≤ 2 s.
2. AC2 Help has Controls, Batting & Pitching, Rules and About tabs; Rules are framed as the game's
   rules and mention 7 innings as a game rule; About credits sources, names game colors, says field
   names are generic and states MIT.
3. AC3 Every screen fits both viewports without horizontal overflow or off-screen controls.

**Duel: batting**
4. AC4 A pitch thrown and taken in the zone is a called strike; out of the zone is a ball; four balls
   walk the batter; three strikes strike him out.
5. AC5 Swing timing is graded EARLY / LATE / PERFECT / GOOD and a well-timed swing puts the ball in
   play; a badly mistimed swing misses.
6. AC6 Early swings pull the ball, late swings go the other way; fouls count as strikes only below two
   strikes.
7. AC7 Aim mode: the cursor moves by keyboard, mouse and touch drag, and a cursor far from the ball
   misses.
8. AC8 Bunt toggle produces a short ground ball; a two-strike foul bunt is a strikeout.

**Duel: pitching**
9. AC9 The user picks each of the repertoire's pitch types by key and by button; each has its own
   speed and break.
10. AC10 The pitch meter: a press in the sweet band throws closer to the target than a missed meter.
11. AC11 AI batters swing more at strikes than balls, and chase more with two strikes.
12. AC12 Pitch count, fatigue and bullpen changes happen and are announced.

**Ball in play**
13. AC13 Fly balls are caught for outs; hits fall in gaps; home runs clear the fence (distance shown).
14. AC14 Ground balls produce force outs at first; with a runner on first and fewer than two outs,
    double plays happen.
15. AC15 Tag-ups: a runner on third scores on a deep enough caught fly with fewer than two outs.
16. AC16 Infield fly rule applies as specified.
17. AC17 A run doesn't count when the third out is a force out.
18. AC18 Steals: the runner breaks, the catcher throws, the result is safe or out.
19. AC19 The timeline playback shows fielders running, throws and runners; Skip jumps to the result.

**Game flow**
20. AC20 Innings advance with half-inning banners; the bottom of the last inning is skipped when the
    home team leads; walk-offs end the game immediately; ties go to extra innings.
21. AC21 Run rule ends a lopsided game (when on).
22. AC22 Inning break shows the line score and a sourced fact card; the final screen shows winner,
    line score and top performers.
23. AC23 Pause stops the game and offers Resume, Settings, Help, Quit.

**Modes**
24. AC24 Exhibition lets the player choose teams (county and fictional), side, park and innings.
25. AC25 Season: schedule, standings, play or sim each game, 8-team bracket in the school's class,
    semifinal at Lakeside, final at Majestic Park, champion screen and a saved trophy.
26. AC26 Spring Training: fictional barnstorming clubs, historic-style park with 340/400/260 ft,
    linen-postcard look, cream throwbacks, fact card every inning.
27. AC27 Gator Splash: a home run over the right-field fence at the historic park triggers the
    Gator Splash banner and bonus.
28. AC28 Each challenge starts in its situation, checks its goal and awards 1–3 stars that persist.
29. AC29 Umpire School: the player calls balls and strikes and is scored against the real call.

**Content and honesty**
30. AC30 Every shown fact is a confirmed audited bank item with matching source
    (`tools/check-facts.mjs` passes); the 573-ft card carries the measurement caveat; "birthplace" is
    hedged.
31. AC31 All seven county schools appear with schools.json names, colors and baseball classes; no
    real player names; no real MLB team is playable; fictional towns are labelled.

**Accessibility, settings, saves**
32. AC32 Keyboard-only: a full half-inning can be batted and pitched with keys only; menus are fully
    keyboard reachable with visible focus.
33. AC33 Touch: swing, pitch selection, meter, aim drag, bunt and steal work with real touch input;
    pad targets ≥ 44 px.
34. AC34 Text contrast ≥ 4.5:1 in day and night themes on all screens.
35. AC35 Reduced motion removes shake/confetti and stops the title animation.
36. AC36 Settings persist across reloads; text scale applies; storage failure doesn't break the game.
37. AC37 Live region announces each pitch result.
38. AC38 Season in progress resumes after reload (Continue).

**Performance and balance**
39. AC39 ≥ 55 fps in live play (headless), heap < 40 MB, HTML ≤ 2 MB, zero external requests, zero
    console errors.
40. AC40 `tools/balance.mjs` metrics fall in the §8 target ranges; outliers are listed in REPORT.md.

## 14. Out of scope
Online play and leaderboards; 3-D camera; manual fielder control and manual throws; pickoffs, balks,
interference/obstruction, uncaught third strikes, defensive shifts and pinch hitters; full league
stats across seasons; real player names or likenesses; real MLB teams as playable clubs; Arkansas
pitch-count rules; softball; voice commentary; the Baseball Trail scavenger hunt (fact album only).
