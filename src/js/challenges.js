// Challenges. Practice kinds (school, derby, long) reset bases and outs after every swing; situation
// kinds start a real game in a crafted spot; 'ump' is the umpire-school mini-game.
// Goals, stars and challenge names are game design. Intros cite audited facts by id.
export const CHALLENGES = [
  { id: 'school', kind: 'practice', title: 'Baseball School', fact: 'hs-0222', park: 'home', school: 'hot-springs', opp: 'ironleaf', pitches: 12, bp: true,
    goal: 'Batting practice: 12 pitches over the plate. Get hits. Stars at 3, 5 and 7 hits.', stars: [3, 5, 7], metric: 'hits',
    tip: 'Watch the pitcher\'s arm, then press Space (or tap SWING) as the ball reaches the front of the plate. EARLY pulls the ball, LATE pushes it the other way.' },
  { id: 'ump', kind: 'ump', title: 'Umpire School', fact: 'hs-0223', park: 'home', school: 'lakeside', opp: 'bluemist', pitches: 12,
    goal: 'Call 12 pitches. B = ball, S = strike (or tap). Stars at 8, 10 and 12 correct.', stars: [8, 10, 12], metric: 'correct',
    tip: 'A strike crosses any part of the plate between the knees and the letters. The zone box hides until after your call.' },
  { id: 'gator', kind: 'practice', title: 'Gator Splash Derby', fact: 'hs-0197', park: 'historic', club: true, outs: 10, bp: true, slugger: true,
    goal: 'Home-run derby at the historic-style park: 10 outs (any swing that is not a home run). Home run = 1 point, Gator Splash over the right-field fence = 2. Stars at 2, 4 and 7 points.', stars: [2, 4, 7], metric: 'points',
    tip: 'A left-handed hitter pulls the ball to right field. The right-field fence is close (260 ft) but tall.' },
  { id: 'long', kind: 'practice', title: 'Long Ball', fact: 'hs-0184', park: 'historic', club: true, pitches: 8, bp: true, slugger: true,
    goal: 'Eight swings: hit one as far as you can. Stars for any home run, 360 ft and 400 ft.', stars: [1, 360, 400], metric: 'longest',
    tip: 'Perfect timing and a slightly upward swing (aim mode: the ball a little above the cursor) carry farthest.' },
  { id: 'walkoff', kind: 'sit', title: 'Walk-Off', park: 'home', school: 'lake-hamilton', opp: 'lakeside', user: 'home',
    situation: { inning: 7, half: 1, outs: 1, score: [2, 3], bases: [null, true, null] },
    goal: 'Bottom of the 7th, down 3-2, runner on second, one out. Win it.', stars: [1, 2, 3], metric: 'walkoff' },
  { id: 'door', kind: 'sit', title: 'Shut the Door', park: 'home', school: 'hot-springs', opp: 'lakeside', user: 'home',
    situation: { inning: 7, half: 0, outs: 0, score: [4, 3], bases: [null, null, null] },
    goal: 'Top of the 7th, up 4-3. Get three outs before they tie it. Three stars for a 1-2-3 inning.', stars: [1, 2, 3], metric: 'door' },
  { id: 'small', kind: 'sit', title: 'Small Ball', park: 'home', school: 'jessieville', opp: 'cutter-morning-star', user: 'home',
    situation: { inning: 7, half: 1, outs: 0, score: [1, 1], bases: [true, null, null] },
    goal: 'Bottom of the 7th, tied 1-1, runner on first, nobody out. Bunt, steal, hit: score the winning run.', stars: [1, 2, 3], metric: 'walkoff' },
  { id: 'jam', kind: 'sit', title: 'Bases-Loaded Jam', park: 'home', school: 'mountain-pine', opp: 'fountain-lake', user: 'home',
    situation: { inning: 6, half: 0, outs: 0, score: [5, 3], bases: [true, true, true] },
    goal: 'Top of the 6th, up 5-3, bases loaded, nobody out. End the inning. Stars: keep the lead, allow at most one run, allow none.', stars: [1, 2, 3], metric: 'jam' },
];
export const challenge = (id) => CHALLENGES.find((c) => c.id === id);

// Stars for a finished challenge given its tally.
export function starsFor(c, tally) {
  const v = tally[c.metric] ?? 0;
  if (c.metric === 'walkoff') return tally.won ? 3 : 0;
  if (c.metric === 'door') return tally.won ? (tally.oneTwoThree ? 3 : 2) : tally.kept ? 1 : 0;
  if (c.metric === 'jam') return tally.inningOver ? (tally.runs === 0 ? 3 : tally.runs <= 1 ? 2 : tally.kept ? 1 : 0) : 0;
  if (c.metric === 'longest') return v >= c.stars[2] ? 3 : v >= c.stars[1] ? 2 : v >= 1 ? 1 : 0;
  return v >= c.stars[2] ? 3 : v >= c.stars[1] ? 2 : v >= c.stars[0] ? 1 : 0;
}
