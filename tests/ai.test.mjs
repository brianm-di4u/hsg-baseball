import { exhibition, stepUntil, toPre } from './helpers.mjs';

export const tests = [
  {
    name: 'ai: batters swing at strikes, chase more with two strikes',
    viewports: ['desktop'],
    async run(t) {
      await exhibition(t, { user: 'home', seed: 31 });
      const rate = async (x, z, strikes) => {
        let n = 0;
        for (let i = 0; i < 40; i++) {
          await t.game('setState', { game: { phase: 'pre', balls: 0, strikes } });
          await t.game('act', 'throw', { type: 'FB', x, z, acc: 0.8, exact: true });
          if ((await t.state()).game.aiSwing) n++;
        }
        return n / 40;
      };
      const zone = await rate(0, 2.5, 0), ball = await rate(1.7, 2.5, 0), chase2 = await rate(1.15, 2.5, 2), chase0 = await rate(1.15, 2.5, 0);
      t.log(`swing rates: middle ${zone}, well off ${ball}, just off 0 strikes ${chase0}, just off 2 strikes ${chase2}`);
      t.expect(zone > 0.4 && zone > ball + 0.3, 'more swings at strikes than balls');
      t.expect(chase2 > chase0, 'chase more with two strikes');
    },
  },
  {
    name: 'ai: fatigue and bullpen change',
    async run(t) {
      await exhibition(t, { user: 'home', seed: 8 });
      let s = await t.state();
      const starter = s.game.pitcher.id;
      await t.game('setState', { game: { pitchCount: s.game.pitcher.stamina + 2, balls: 3, strikes: 0 } });
      await t.game('act', 'throw', { type: 'FB', x: 2.4, z: 2.5, acc: 1, exact: true }); // ball four
      s = await stepUntil(t, (x) => x.game.pitcher.id !== starter, 900, 10, 'pitching change');
      t.expect(s.game.log.some((l) => /Pitching change/.test(l)), 'the change is announced');
      t.equal(s.game.pitcher.count, 0, 'the reliever is fresh');
      await t.shot('17-bullpen');
      await toPre(t);
    },
  },
];
