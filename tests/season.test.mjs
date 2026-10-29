import { click, stepUntil, toFlight } from './helpers.mjs';

export const tests = [
  {
    name: 'season: schedule, bracket, finals at Majestic Park, champion',
    async run(t) {
      let s;
      let seed = 1;
      // find a season where the sim carries the school to the final
      for (; seed < 40; seed++) {
        await t.game('newGame', { mode: 'season', school: 'lakeside', length: 'short', seed });
        s = await t.state();
        if (seed === 1) {
          t.equal(s.scene, 'hub', 'season hub');
          const txt = await t.page.textContent('#screen');
          t.expect(/Class 5A/.test(txt) && /Majestic Park/.test(txt), 'hub shows class and finals site');
          t.equal(s.season.games.length, 8, 'short season: 8 games');
          await t.shot('41-hub', { fullPage: true });
          await t.checkLayout({ allowScrollY: true });
        }
        await t.game('act', 'simToBracket');
        s = await t.state();
        while (s.season.phase === 'bracket' && s.season.bracket.round < 2) { await t.game('act', 'simNext'); s = await t.state(); }
        if (s.season.phase === 'bracket' && s.season.bracket.round === 2) break;
      }
      t.expect(s.season.phase === 'bracket', `reached the state final (seed ${seed})`);
      t.equal(s.season.w + s.season.l, 8 + 2, 'eight regular-season games and two bracket wins');
      const field = s.season.bracket.seeds;
      t.equal(field.length, 8, 'eight-team bracket');
      t.expect(field.includes('hot-springs'), 'same-class county school (Hot Springs, 5A) in the bracket');
      await t.game('scene', 'hub');
      await t.shot('41b-standings', { fullPage: true });
      await click(t, 'bracket');
      const bt = await t.page.textContent('#screen');
      t.expect(/Lakeside High School/.test(bt) && /Majestic Park/.test(bt), 'semis at Lakeside, final at Majestic Park');
      await t.shot('41c-bracket', { fullPage: true });
      await click(t, 'hub');
      await click(t, 'playSeason');
      s = await t.state();
      t.expect(s.game.park === 'majestic' && s.game.night, 'final played at Majestic Park under the lights');
      await t.game('pause');
      // the bracket decides who hosts the final; if the user's team pitches first, throw one
      if ((await t.state()).game.userPitches) { await stepUntil(t, (x) => x.game.phase === 'pre', 600, 5, 'ready to pitch'); await t.game('act', 'throw', { acc: 0.8 }); }
      await toFlight(t);
      await t.game('step', 10);
      await t.shot('41d-majestic');
      await t.game('scene', 'final');
      s = await t.state();
      const ut = s.game.user;
      if (s.game.winner !== ut) await t.game('setState', { game: { score: ut === 0 ? [9, 1] : [1, 9] } });
      await click(t, 'afterSeasonGame');
      s = await t.state();
      t.equal(s.scene, 'champion', 'champion screen');
      t.equal(s.trophies.length, 1, 'trophy saved');
      t.expect(s.season.champion, 'season marked champion');
      await t.shot('41e-champion');
      await t.checkLayout();
      await click(t, 'title');
      t.expect((await t.page.textContent('#screen')).includes('Lakeside 5A champs'), 'trophy shown on the title screen');
      await t.shot('41f-trophy-title');
    },
  },
  {
    name: 'season: resume after reload',
    async run(t) {
      await t.game('newGame', { mode: 'season', school: 'mountain-pine', length: 'full', seed: 5 });
      await t.game('act', 'simNext');
      await t.game('act', 'simNext');
      let s = await t.state();
      t.equal(s.season.w + s.season.l, 2, 'two games played');
      await t.reload();
      s = await t.state();
      t.equal(s.scene, 'title', 'reloads to the title');
      t.expect((await t.page.textContent('#screen')).includes('Continue season'), 'Continue season offered');
      await click(t, 'continueSeason');
      s = await t.state();
      t.expect(s.scene === 'hub' && s.season.school === 'mountain-pine' && s.season.w + s.season.l === 2 && s.season.games.length === 14, 'season restored');
      await click(t, 'playSeason');
      s = await t.state();
      t.equal(s.mode, 'season', 'season game starts');
      t.expect(s.game.teams.some((x) => x.key === 'mountain-pine'), 'with the season school');
    },
  },
];
