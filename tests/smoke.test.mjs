import { exhibition, toFlight, toPre, stepUntil } from './helpers.mjs';

// A quick end-to-end pass: a watched game plays pitches, balls in play and half innings without errors.
export const tests = [
  {
    name: 'watched game runs',
    async run(t) {
      await exhibition(t, { user: 'none', seed: 11 });
      let s = await toFlight(t);
      await t.shot('05-duel-watch');
      s = await stepUntil(t, (x) => x.game.phase === 'play', 9000, 30, 'a ball in play');
      await t.game('step', 50);
      await t.shot('06-field-play');
      s = await stepUntil(t, (x) => x.game.half === 1, 30000, 60, 'bottom of the first');
      t.expect(s.game.inning === 1 && s.game.outs === 0, 'sides changed');
      await t.checkLayout();
    },
  },
];
