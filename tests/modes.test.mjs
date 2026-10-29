import { exhibition, stepUntil, toPre, aiPitchAt, click, toFlight } from './helpers.mjs';

export const tests = [
  {
    name: 'modes: exhibition select',
    async run(t) {
      await click(t, 'select');
      await click(t, 'pickHome', 'fountain-lake');
      await click(t, 'pickAway', 'jessieville');
      await click(t, 'pickSide', 'away');
      await click(t, 'pickPark', 'majestic');
      await click(t, 'setInnings', '5');
      const txt = await t.page.textContent('#screen');
      t.expect(txt.includes('game colors') && txt.includes('Fictional towns'), 'cards label game colors; fictional towns listed');
      await t.shot('40-select', { fullPage: true });
      await t.checkLayout({ allowScrollY: true });
      await click(t, 'startExhibition');
      const s = await t.state();
      t.equal(s.scene, 'game', 'game starts');
      t.expect(s.game.teams[0].key === 'fountain-lake' && s.game.teams[1].key === 'jessieville' && s.game.user === 1 && s.game.park === 'majestic' && s.game.innings === 5, 'choices applied');
    },
  },
  {
    name: 'modes: spring training',
    async run(t) {
      await click(t, 'springSetup');
      const txt = await t.page.textContent('#screen');
      t.expect(/known as the birthplace of spring training/.test(txt) && /340 ft/.test(txt) && /fictional barnstorming clubs/.test(txt), 'intro hedged and labelled');
      await t.shot('42-spring', { fullPage: true });
      await t.checkLayout({ allowScrollY: true });
      await t.seed(61);
      await click(t, 'startSpring');
      let s = await t.state();
      t.expect(s.game.park === 'historic' && s.game.teams.every((x) => x.club), 'historic-style park, fictional clubs');
      await t.game('pause');
      await t.game('setState', { game: { inning: 1, half: 1, outs: 2, balls: 0, strikes: 0, phase: 'pre' } });
      await toFlight(t);
      await t.game('step', 8);
      await t.shot('42b-spring-duel');
      await stepUntil(t, (x) => x.game.phase === 'pre', 3000, 20, 'next pitch');
      await t.game('setState', { game: { outs: 2, balls: 0, strikes: 0 } });
      s = await t.state();
      await t.game('act', 'contact', { ev: 86, la: 34, spray: 2 });
      await aiPitchAt(t, 0, 2.5);
      await stepUntil(t, (x) => x.game.phase === 'play', 600, 5, 'in play');
      await t.game('step', 60);
      await t.shot('42c-spring-field', { wait: false });
      s = await stepUntil(t, (x) => x.scene === 'break', 1200, 15, 'break');
      t.expect(!!s.breakFact, 'a fact card after the inning, even with fact cards off by default? (spring always shows)');
      await t.shot('42d-spring-break');
    },
  },
  {
    name: 'modes: gator splash',
    async run(t) {
      await t.seed(62);
      await t.game('newGame', { mode: 'spring', club: 'steam-valley', user: 'away', paused: true });
      await t.game('setState', { game: { inning: 2, half: 0, outs: 0 } });
      await t.game('act', 'contact', { ev: 100, la: 27, spray: 36 });
      await aiPitchAt(t, 0, 2.5);
      await stepUntil(t, (x) => x.game.phase === 'play', 600, 5, 'in play');
      await stepUntil(t, (x) => x.game.playT > 2.4 || x.game.phase !== 'play', 900, 3, 'ball over the fence');
      await t.shot('43-gator-splash', { wait: false });
      const s = await stepUntil(t, (x) => x.game.phase === 'result', 2000, 10, 'result');
      t.expect(s.game.lastPlay.hr && s.game.lastPlay.gator && s.game.gator === 1, `Gator Splash (${s.game.lastPlay.desc})`);
    },
  },
  {
    name: 'modes: challenges and stars',
    async run(t) {
      await click(t, 'challenges');
      let txt = await t.page.textContent('#screen');
      for (const w of ['Baseball School', 'Umpire School', 'Gator Splash Derby', 'Long Ball', 'Walk-Off', 'Shut the Door', 'Small Ball', 'Bases-Loaded Jam']) t.expect(txt.includes(w), `lists ${w}`);
      await t.shot('44-challenges', { fullPage: true });
      await t.checkLayout({ allowScrollY: true });
      await click(t, 'chal', 'walkoff');
      t.equal((await t.state()).scene, 'chalIntro', 'intro screen');
      await t.seed(63);
      await click(t, 'chalGo');
      let s = await t.state();
      t.expect(s.game.inning === 7 && s.game.half === 1 && s.game.bases[1] && s.game.outs === 1 && s.game.score[0] === 2 && s.game.score[1] === 3, 'walk-off situation set');
      await t.game('pause');
      await t.shot('44b-walkoff-chal');
      await t.game('act', 'contact', { ev: 106, la: 29, spray: 3 });
      await aiPitchAt(t, 0, 2.5);
      await t.game('act', 'swingAt', 0, { dx: 0, dz: 0 });
      s = await stepUntil(t, (x) => x.scene === 'chalResult', 3000, 20, 'challenge result');
      t.equal(s.chalResult.stars, 3, 'walk-off homer: three stars');
      await t.shot('44c-stars');
      await t.reload();
      s = await t.state();
      t.equal(s.stars.walkoff, 3, 'stars persist');
      // practice kinds start too
      await t.game('act', 'chal', 'school', { paused: true });
      s = await t.state();
      t.expect(s.game.userBats && s.game.chal === 'school', 'Baseball School: the user bats practice');
      await toFlight(t);
      t.equal(s.game.pitcher.reps.join(), 'FB', 'batting practice is all fastballs');
    },
  },
  {
    name: 'modes: practice challenge runs to a result',
    async run(t) {
      await t.game('act', 'chal', 'long', { paused: true, seed: 65 });
      let s = await t.state();
      t.expect(s.game.park === 'historic' && s.game.userBats, 'Long Ball at the historic-style park');
      await t.game('act', 'contact', { ev: 104, la: 28, spray: 30 });
      s = await stepUntil(t, (x) => x.scene === 'chalResult', 9000, 30, 'eight swings done');
      t.expect(s.chalResult.stars >= 1, `a home run earns a star (${s.chalResult.stars})`);
      const txt = await t.page.textContent('#screen');
      t.expect(/Longest home run: \d+ ft/.test(txt) && /573/.test(txt) && /can't be confirmed/.test(txt), 'result shows the distance and the hedged 573-ft legend');
      await t.shot('44d-longball-result');
      t.expect(s.records.longest > 0, 'longest home run recorded');
    },
  },
  {
    name: 'modes: umpire school',
    async run(t) {
      await t.game('act', 'chal', 'ump', { paused: true, seed: 64 });
      let s = await stepUntil(t, (x) => x.game.phase === 'umpwait', 900, 5, 'call needed');
      const truth = s.game.pitch.inZone;
      t.equal(s.game.aiSwing, false, 'batters take in umpire school');
      await t.shot('45-umpire');
      await t.page.keyboard.press(truth ? 's' : 'b');
      s = await t.state();
      t.equal(s.chal.tally.correct, 1, 'correct call counted');
      t.expect(/Right call/.test(s.game.lastCall), 'feedback shown');
      await t.game('step', 4);
      await t.shot('45b-umpire-call');
      s = await stepUntil(t, (x) => x.game.phase === 'umpwait', 900, 5, 'second pitch');
      await click(t, 'ump', s.game.pitch.inZone ? 'ball' : 'strike');
      s = await t.state();
      t.equal(s.chal.tally.correct, 1, 'wrong call not counted');
    },
  },
];
