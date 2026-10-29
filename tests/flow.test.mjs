import { exhibition, stepUntil, toPre, aiPitchAt, click } from './helpers.mjs';

async function forcePlay(t, ball, sit) {
  await t.game('setState', { game: { phase: 'pre', balls: 0, strikes: 0, ...sit } });
  await t.game('act', 'contact', ball);
  await aiPitchAt(t, 0, 2.5);
  return stepUntil(t, (x) => x.game.phase !== 'flight' && x.game.phase !== 'play' && x.game.phase !== 'windup', 3000, 15, 'play done');
}
const FLY = { ev: 86, la: 34, spray: 2 };

export const tests = [
  {
    name: 'flow: half innings, skipped bottom, walk-off, extras',
    async run(t) {
      await exhibition(t, { user: 'none', seed: 51 });
      let s = await forcePlay(t, FLY, { outs: 2 });
      s = await stepUntil(t, (x) => x.game.phase === 'half', 300, 5, 'half-inning banner');
      t.expect(/Middle of the 1st/.test(s.game.banner), `banner: ${s.game.banner}`);
      await t.shot('30-half');
      s = await stepUntil(t, (x) => x.game.phase === 'pre' || x.scene === 'break', 300, 10, 'sides change');
      t.equal(s.game.half, 1, 'bottom of the first');
      // top of the 7th, home team ahead: the last out ends it, no bottom half
      await exhibition(t, { user: 'none', seed: 52, situation: { inning: 7, half: 0, outs: 2, score: [3, 1] } });
      s = await forcePlay(t, FLY, {});
      s = await stepUntil(t, (x) => x.scene === 'final', 600, 10, 'final');
      t.expect(s.game.over && s.game.winner === 0 && s.game.half === 0, 'home team skips the bottom of the 7th');
      // walk-off
      await exhibition(t, { user: 'none', seed: 53, situation: { inning: 7, half: 1, outs: 0, score: [2, 2], bases: [false, false, true] } });
      s = await forcePlay(t, { ev: 92, la: 12, spray: -24 }, {});
      s = await stepUntil(t, (x) => x.scene === 'final', 900, 10, 'walk-off final');
      t.expect(s.game.walkoff && s.game.score[0] === 3, `walk-off ends it at 3-2 (${s.game.score.join('-')})`);
      await t.shot('30b-walkoff');
      // tie after the regulation 7: extra innings
      await exhibition(t, { user: 'none', seed: 54, situation: { inning: 7, half: 1, outs: 2, score: [1, 1] } });
      s = await forcePlay(t, FLY, {});
      s = await stepUntil(t, (x) => x.game.inning === 8 || x.scene !== 'game', 900, 10, 'extra inning');
      t.equal(s.game.inning, 8, 'extra innings');
    },
  },
  {
    name: 'flow: run rule',
    async run(t) {
      await exhibition(t, { user: 'none', seed: 55, situation: { inning: 5, half: 1, outs: 2, score: [12, 1] } });
      await forcePlay(t, FLY, {});
      const s = await stepUntil(t, (x) => x.scene === 'final', 900, 10, 'run-rule final');
      t.expect(s.game.over && s.game.runRuled, 'a 10-run lead ends it after five');
      t.expect((await t.page.textContent('#screen')).includes('run rule'), 'final notes the run rule');
    },
  },
  {
    name: 'flow: inning break fact card and final screen',
    async run(t) {
      await exhibition(t, { seed: 56, user: 'home', situation: { inning: 1, half: 1, outs: 2 } });
      await forcePlay(t, FLY, {});
      let s = await stepUntil(t, (x) => x.scene === 'break', 900, 10, 'inning break');
      t.expect(!!s.breakFact, 'a fact card is shown');
      const txt = await t.page.textContent('#screen');
      t.expect(/Source:/.test(txt) && /End of the 1st/.test(txt), 'break shows the line score and a sourced fact');
      await t.shot('31-break');
      await t.checkLayout();
      await t.page.keyboard.press('Enter');
      s = await t.state();
      t.equal(s.scene, 'game', 'Continue returns to the game');
      await t.game('scene', 'final');
      s = await t.state();
      t.equal(s.scene, 'final', 'final screen');
      const ft = await t.page.textContent('#screen');
      t.expect(/Final/.test(ft) && /Star of the game/.test(ft), 'final shows the winner and top performers');
      await t.shot('31b-final');
      await click(t, 'box');
      t.expect((await t.page.textContent('#screen')).includes('Pitcher'), 'box score toggles');
      await t.shot('31c-box', { fullPage: true });
      await t.checkLayout({ allowScrollY: true });
    },
  },
  {
    name: 'flow: pause',
    async run(t) {
      await exhibition(t, { seed: 57 });
      await t.game('resume');
      await t.page.keyboard.press('p');
      let s = await t.state();
      t.equal(s.scene, 'pause', 'P pauses');
      const txt = await t.page.textContent('#screen');
      for (const w of ['Resume', 'Box score', 'Settings', 'How to play', 'Quit game']) t.expect(txt.includes(w), `pause offers ${w}`);
      await t.shot('32-pause');
      await click(t, 'help');
      t.equal((await t.state()).scene, 'help', 'help from pause');
      await click(t, 'back');
      t.equal((await t.state()).scene, 'pause', 'back to pause, game kept');
      await t.page.keyboard.press('Escape');
      s = await t.state();
      t.expect(s.scene === 'game' && !!s.game, 'Esc resumes the game');
    },
  },
];
