# Diamond Springs: town content

Every real place, fact, name and color the game uses, with the source it comes from. Everything not
listed here is game invention and is labelled that way on screen ("fictional", "game rule",
"game colors", "historic-style park").

Sources are the shared corpus files in `research/`, `shared/data/schools.json`, and the audited
trivia bank `games/trivia/data/questions.json`. Player-facing fact cards quote only audited
`confirmed` questions, by id; `tools/check-facts.mjs` checks them.

## 1. Schools (setting only; fictional players)

From `shared/data/schools.json` (inlined at build time, never edited). Baseball classification from
`classification.baseball`.

| id | Shown as | Mascot | Colors (stand-in hex) | Colors confirmed? | Baseball class | Baseball venue in data | venueConfirmed |
|---|---|---|---|---|---|---|---|
| hot-springs | Hot Springs Trojans | crested helmet | black #111111 / gold #D4A017 | yes | 5A | "Trojan field" | false |
| lakeside | Lakeside Rams | ram head | blue #1F4E9C / gold #E6B422 | yes | 5A | "Lakeside field" (2026 finals co-host) | false |
| lake-hamilton | Lake Hamilton Wolves | wolf head | maroon #6D1A2B / gold #D9A520 | yes | 6A | "Wolves field" | false |
| fountain-lake | Fountain Lake Cobras | cobra | green #1E6B45 / white | **no: game colors** | 4A | "Cobra field" | false |
| cutter-morning-star | Cutter-Morning Star Eagles | eagle | navy / silver | **no: game colors** | 2A | "Eagle field" | false |
| jessieville | Jessieville Lions | lion | purple / gold | **no: game colors** | 3A | "Lion field" | false |
| mountain-pine | Mountain Pine Red Devils | friendly imp mark | red / black | **no: game colors** | 2A | "Red Devil field" | false |

Handling:
- No baseball venue name is confirmed, so the game says "<School> home field" and never presents
  the data's venue name as a real place. The About screen says field names are not confirmed.
- Mascots are drawn in code from each `mascotConcept` (geometric shapes, no logos). The crest code
  is shared with Spa City Hoops (same collection, same license).
- Schools with `colorsConfirmed: false` are shown with a "game colors" label in About and on the
  team card.
- **No baseball state titles** are known for any Garland County school (`titles.baseball` is empty
  for all; `schools-and-athletics.md` → Baseball state titles). The game shows no title pennants
  for baseball and claims no history for any program.
- No players, students or coaches are real. All names are generated from generic first/last name
  pools (`src/js/roster.js`).
- Extra opponents are fictional towns (`opponentsNote`): Cinderbrook, Quartz Hollow, Bluemist,
  Ironleaf, Hollowpine, Redclay, Kettle Ford, Marrow Creek, Ambergrove, Lanternfield, Copperbend,
  Fernhaven, Saltlick, Thistledown (same list as Spa City Hoops so the collection agrees). Each is
  labelled "(fictional town)".
- Rivalry labels from `schools.json` `rivalries[].label` ("Garland County rivalry" for Lakeside vs.
  Lake Hamilton; "5A South rivals" for Hot Springs vs. Lakeside) appear on the matchup card. No
  trophy name is invented. The renewal year is not shown (see REPORT.md data notes).

## 2. State finals

| Fact | Source |
|---|---|
| The 2026 AAA baseball, softball and soccer state finals were held at Majestic Park and Lakeside High School | `schools.json` → venues.baseballFinals; `schools-and-athletics.md` → State finals venues (KAIT8 2026) |
| Majestic Park was rebuilt in 2021: five fields, 1,500 capacity | `schools.json`; `baseball-spring-training.md` → Later baseball; bank hs-0247, hs-0248 |
| Artificial surface (installed 2019) | `baseball-spring-training.md` → Ballparks (Wikipedia: Majestic Park) |
| National Park College uses Majestic Park as its home field | bank hs-0250 |
| About $8.5 million bond, plus a $500,000 Oaklawn Foundation grant | bank hs-0249 |

Use in game: the Season bracket's semifinal is played "at Lakeside High School (2026 co-host)"
and the final at Majestic Park. The finals field is drawn with turf mow stripes. **Field
dimensions of Majestic Park are not sourced**, so the game uses generic dimensions and labels them
"game dimensions" in the park card.

## 3. Spring-training history (flavor layer and fact cards)

All from `research/baseball-spring-training.md` and confirmed audited bank items. Player-facing text
is a restatement of the bank question+answer (+ explanation where safe), with its `source` shown.

| Bank id | Fact as shown | Source shown |
|---|---|---|
| hs-0182 / hs-0188 | 1886: the Chicago White Stockings became the first major league club to train in Hot Springs | Wikipedia: Hot Springs, Arkansas |
| hs-0189 | The White Stockings are today's Chicago Cubs | Hot Springs Historic Baseball Trail: Baseball's Golden Days in Hot Springs |
| hs-0300 | Club president Albert Spalding chose a warmer climate; Cap Anson was the playing-manager | Encyclopedia of Arkansas: Major League Spring Training in Hot Springs |
| hs-0208 | Cap Anson hit three home runs at the Hot Springs Baseball Grounds on March 28, 1887 | Hot Springs Historic Baseball Trail: Hot Springs Baseball Grounds |
| hs-0302 | Future evangelist Billy Sunday was on the 1886 trip | Hot Springs Historic Baseball Trail: Hot Springs Baseball Grounds |
| hs-0196 | Whittington Park opened in 1894 | Wikipedia: Ban Johnson Park |
| hs-0197 | Whittington Park's fences: 340 ft left, 400 ft center, 260 ft right | Wikipedia: Ban Johnson Park |
| hs-0219 | Lights were installed at Whittington Park in 1936; the right-field fence was raised 15 ft in 1938 | Wikipedia: Ban Johnson Park |
| hs-0218 | Called McKee Park from 1921 to 1923 | Wikipedia: Ban Johnson Park |
| hs-0217 | Renamed in 1935 for American League founder Ban Johnson | Wikipedia: Ban Johnson Park |
| hs-0198 | The Pittsburgh Pirates trained at Whittington Park from 1901 to 1916 | Wikipedia: Ban Johnson Park |
| hs-0185 | In 1912 Honus Wagner bought Hot Springs High's black-and-gold basketball uniforms | Wikipedia: Hot Springs, Arkansas |
| hs-0247–0250 | Majestic Park rebuilt 2021, five fields, $8.5M bond and $500,000 Oaklawn Foundation grant, National Park College home field | Wikipedia: Majestic Park |
| hs-0222, hs-0223 | Shown on the Baseball School and Umpire School challenge cards | Wikipedia: Ban Johnson Park |
| hs-0199 | In 1909 Red Sox owner John I. Taylor built the stands at Majestic Park | Wikipedia: Majestic Park |
| hs-0200 | The Detroit Tigers created a practice field on the Majestic Park site in 1908 | Wikipedia: Majestic Park |
| hs-0201 | The Red Sox won the 1912 World Series (also 1915, 1916, 1918) in their Majestic Park years | Wikipedia: Majestic Park |
| hs-0202 / hs-0203 | Fogel Field (also Fordyce Field) was built in 1912 for the overflow of major leaguers | Hot Springs Historic Baseball Trail: See the Trail |
| hs-0183 / hs-0190 | On St. Patrick's Day 1918 Babe Ruth hit a home run into the Arkansas Alligator Farm | Wikipedia: Hot Springs, Arkansas / KNWA/KFTA |
| hs-0184 / hs-0244 | Measured at about 573 feet by B&F Engineering in 2011; a Boston paper had said "more than 500 feet" | KNWA/KFTA: The home run that made Babe Ruth a star |
| hs-0336 | Historian Bill Jenkinson helped authenticate the figure but said no one can confirm it with complete certainty | Wikipedia: Ban Johnson Park |
| hs-0193 / hs-0211 | Mainly a pitcher then, Ruth played first base that day | KNWA/KFTA; Wikipedia: Ban Johnson Park |
| hs-0194 | It came in the sixth inning | KNWA/KFTA |
| hs-0481 | His first home run of the day landed in a wood pile | Wikipedia: Ban Johnson Park |
| hs-0399 | The alligator farm was founded on Whittington Avenue in 1902 | Wikipedia: Hot Springs, Arkansas |
| hs-0204 | The Hot Springs Arlingtons, a Black club, played at Whittington Park from 1896 to 1903 | Wikipedia: Ban Johnson Park |
| hs-0215 | The Pittsburgh Crawfords trained at Fogel Field 1932–35 (Homestead Grays 1930–31) | Wikipedia: Hot Springs, Arkansas |
| hs-0220 | Sam Guinn Field opened in 1933 on Crescent Avenue for Negro league spring training | Wikipedia: Ban Johnson Park |
| hs-0221 | The Sam Guinn Field marker names clubs including the Kansas City Monarchs, Pittsburgh Crawfords and Homestead Grays (the bank's "Memphis Red Sox" is left out: research marks it unconfirmed) | Hot Springs Historic Baseball Trail: See the Trail |
| hs-0228 | Hank Aaron, 18, played a 1952 Negro League World Series game in Hot Springs | Hot Springs Historic Baseball Trail: See the Trail |
| hs-0222 | The Ray Doan (All-Star) Baseball School ran 1933–38; attendance peaked at 450 in 1938 | Wikipedia: Ban Johnson Park |
| hs-0314 | Babe Didrikson attended the Doan school in 1934 | Wikipedia: Ban Johnson Park |
| hs-0223 | The George Barr school (1935–47) was the first umpire school | Wikipedia: Ban Johnson Park |
| hs-0224 | Rogers Hornsby ran a "Baseball College" in Hot Springs from 1939 | Wikipedia: Ban Johnson Park |
| hs-0229 / hs-0230 | The Hot Springs Bathers played in the Class C Cotton States League; titles 1941, 1948, 1950 | Wikipedia: Hot Springs Bathers |
| hs-0209 | Hot Springs' 1906 pro team was the Vapors | Wikipedia: Hot Springs Bathers |
| hs-0267 | More than 130 Hall of Famers played or trained at Whittington/Ban Johnson Park | Wikipedia: Ban Johnson Park |
| hs-0266 | Ruth trained in Hot Springs nine times | Hot Springs Historic Baseball Trail: See the Trail |
| hs-0268 | Bill Dickey was discovered subbing in a semi-pro game at Whittington Park | Hot Springs Historic Baseball Trail: See the Trail |
| hs-0207 | Tris Speaker homered over Whittington's left-field fence on March 18, 1912 | Hot Springs Historic Baseball Trail: Tris Speaker |
| hs-0206 | Sam "Wahoo" Crawford, MLB career triples leader, played a 1911 exhibition at Whittington | Hot Springs Historic Baseball Trail: See the Trail |
| hs-0271 | Al Simmons credited the baths and trails with saving his career | Hot Springs Historic Baseball Trail: See the Trail |
| hs-0245 / hs-0246 | A Weyerhaeuser parking lot covers the Ban Johnson site; hillside bleachers called the "Wolves Den" survive | Wikipedia: Ban Johnson Park |
| hs-0456 | *The First Boys of Spring* (2015) was narrated by Billy Bob Thornton | Wikipedia: Ban Johnson Park |
| hs-0485 | Myth or fact: "unquestionably the first" place a team went south to train is a myth; the New York Mutuals went to New Orleans | Wikipedia: Spring training |

Hedges used on screen:
- "Birthplace of spring training" is always "known as" / "calls itself" (hs-0480 is a `claim`, not
  shown as fact; hs-0485 is shown as the myth-vs-fact card).
- 573 feet is always "measured at about 573 feet in 2011" with the Jenkinson caveat (never "573-foot
  home run" as a bare fact).
- Ruth appears only in fact text. No player in the game is Ruth or any real player; the Spring
  Training teams are fictional "barnstorming" clubs with generated names.
- Sensitive item kept out of play: the 1953 Tugerson expulsion fight (hs-0231) is not used as a
  playable scenario. It is shown only as a plain history card in the Fact Album, factually.
- Trail marker count (26 vs. 32) is not shown.

## 4. Places drawn in the game

| Place | How it appears | Source |
|---|---|---|
| Whittington Park (1894–c.1947) | The Spring Training and Gator Splash park is a *historic-style* park "after Whittington Park" with the sourced 340/400/260 ft dimensions, a tall wooden grandstand and lights. Labelled as a recreation, not the real park. Fence heights are game values. | `baseball-spring-training.md` → Ballparks; bank hs-0197, hs-0219 |
| Arkansas Alligator Farm | Drawn across the street beyond the short right field (low pens, a gator silhouette). A home run over the right-field fence is a "Gator Splash" (game bonus). | `other-attractions.md` → Arkansas Alligator Farm; bank hs-0183, hs-0399 |
| Majestic Park (2021) | Season final venue, turf field, "1,500 seats" on the park card. Dimensions are game values. | `schools.json`; hs-0247, hs-0248 |
| Lakeside High School | Season semifinal site as the 2026 co-host. | `schools.json` venues.baseballFinals |
| School home fields | Generic HS field with grass mow stripes and "<School> home field". | `schools.json` (venueConfirmed false) |

## 5. Rules context

- "7-inning baseball" is an **unconfirmed NFHS default** (`schools.json` rulesContext). The game
  offers 3/5/7 innings and presents 7 as "regulation (game rule)".
- Pitch-count rules for Arkansas are **not sourced** (`schools-and-athletics.md` → AAA rules
  context). The game's pitcher fatigue and relief changes are labelled as a game system, not a rule.
- The run rule (10 runs after 5 innings, game rule), DH (always on), and infield fly are presented
  as the game's rules.
- Seasons run Feb–May (inferred in `schools.json` seasons); the Season mode calendar label says
  "spring season" without dates.

## 6. Art direction sources

- Palettes from `shared/design/tokens.css`: `school-colors` for HS play, `linen-postcard` for the
  Spring Training layer (cream wool, ink navy, postcard brick), `gilded-spa` for the wood grandstand
  and menus in light theme, `deco-neon` for the night theme.
- `visual-style-guide.md` → Per-game hooks → Diamond Springs: turf with alternating mow stripes and
  white lines; a short right-field fence with a tall wooden grandstand in gilded wood tones; the
  alligator farm as a backdrop prop (alligator icon: long low body, zigzag ridged back, open V jaw,
  about #3E5A3A); cream wool throwbacks for Legends; fictional players, no real likenesses.

## 7. Invented, labelled as such

- All players, coaches, umpires and announcers (none are named except generated players).
- The Spring Training clubs: **Steam Valley Nine** and **Ouachita Barnstormers** (fictional clubs).
- Fictional opponent towns (list in §1).
- "Gator Splash" bonus, challenge goals, stars, the Baseball School instructor ("Coach", unnamed),
  and the umpire-school mini-game (inspired by the first umpire school, hs-0223).
