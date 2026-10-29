import { click, contrastReport, exhibition, stepUntil, toPre } from './helpers.mjs';

async function sweep(t, label) {
  const screens = ['title', 'select', 'spring', 'seasonSetup', 'hub', 'bracket', 'help', 'settings', 'challenges', 'album'];
  let fails = [];
  for (const sc of screens) {
    await t.game('scene', sc);
    await t.page.waitForTimeout(260);
    const r = await contrastReport(t.page);
    fails = fails.concat(r.fails.map((f) => ({ ...f, sc })));
  }
  await exhibition(t, { seed: 4 });
  await t.game('step', 10);
  let r = await contrastReport(t.page);
  fails = fails.concat(r.fails.map((f) => ({ ...f, sc: 'game' })));
  await t.game('scene', 'pause'); await t.page.waitForTimeout(260);
  r = await contrastReport(t.page); fails = fails.concat(r.fails.map((f) => ({ ...f, sc: 'pause' })));
  await t.game('scene', 'final'); await t.page.waitForTimeout(260);
  r = await contrastReport(t.page); fails = fails.concat(r.fails.map((f) => ({ ...f, sc: 'final' })));
  for (const f of fails.slice(0, 10)) t.log(`${label} ${f.sc}: "${f.text}" ${f.ratio} < ${f.need} (${f.tag}.${f.cls})`);
  t.equal(fails.length, 0, `${label}: all text passes WCAG contrast`);
}

export const tests = [
  {
    name: 'contrast: day theme',
    colorScheme: 'light',
    async run(t) { await sweep(t, 'light'); },
  },
  {
    name: 'contrast: night theme',
    colorScheme: 'dark',
    async run(t) {
      const s = await t.state();
      t.equal(s.settings.theme, 'auto', 'theme follows the system');
      t.expect(await t.page.evaluate(() => document.body.classList.contains('theme-dark')), 'night theme applied');
      await t.shot('52-dark-title');
      await exhibition(t, { seed: 4, user: 'home' });
      await t.game('step', 10);
      await t.shot('52b-dark-game');
      await t.game('scene', 'settings');
      await t.shot('52c-dark-settings', { fullPage: true });
      await sweep(t, 'dark');
    },
  },
  {
    name: 'reduced motion',
    reducedMotion: true,
    async run(t) {
      let s = await t.state();
      t.equal(s.reduced, true, 'system preference honored');
      t.equal(s.loop, false, 'no animation loop on the title');
      await t.game('act', 'confetti');
      t.equal((await t.state()).fx, 0, 'confetti suppressed');
      await t.shot('53-reduced');
      await t.game('setState', { settings: { motion: 'off' } });
      s = await t.state();
      t.equal(s.reduced, false, 'Full motion setting overrides');
      await t.game('setState', { settings: { motion: 'auto' } });
    },
  },
  {
    name: 'settings persist; text size',
    async run(t) {
      await click(t, 'settings');
      for (const [a, v] of [['setText', '130'], ['setVol', '0.25'], ['setAim', 'aim'], ['setSpeed', 'relaxed'], ['setInnings', '5'], ['setDiff', 'rookie'], ['setMotion', 'on'], ['setSound', '0'], ['setRing', '1'], ['setMeter', '1'], ['setFacts', '0'], ['setAggr', 'aggressive']]) await click(t, a, v);
      await t.shot('03-settings', { fullPage: true });
      await t.checkLayout({ allowScrollY: true });
      await t.reload();
      const st = (await t.state()).settings;
      t.expect(st.text === 130 && st.vol === 0.25 && st.aim === 'aim' && st.pitchSpeed === 'relaxed' && st.innings === 5 && st.difficulty === 'rookie' && st.motion === 'on' && st.sound === false && st.ring && st.autoMeter && !st.facts && st.aggr === 'aggressive', 'all settings persisted');
      t.equal(await t.page.evaluate(() => getComputedStyle(document.documentElement).fontSize), '20.8px', 'text size 130%');
      await t.shot('03b-text-130');
      await t.checkLayout();
    },
  },
  {
    name: 'storage blocked',
    initScript: () => { const k = Storage.prototype; k.setItem = () => { throw new Error('blocked'); }; k.getItem = () => { throw new Error('blocked'); }; },
    async run(t) {
      const s = await t.state();
      t.equal(s.scene, 'title', 'boots without storage');
      await click(t, 'settings');
      t.expect((await t.page.textContent('#screen')).includes('Saving is unavailable'), 'settings explain saves are off');
      await t.shot('54-no-storage');
      await click(t, 'setText', '115');
      t.equal((await t.state()).settings.text, 115, 'settings still apply');
      await t.game('newGame', { mode: 'exhibition', paused: true, seed: 2 });
      await t.game('step', 120);
      t.equal((await t.state()).scene, 'game', 'game plays');
    },
  },
  {
    name: 'keyboard-only: menus and a full duel',
    viewports: ['desktop'],
    async run(t) {
      // menus: Tab to Exhibition, Enter; Tab through to Play ball
      await t.page.keyboard.press('Tab');
      const focused = await t.page.evaluate(() => document.activeElement && document.activeElement.textContent);
      t.expect(!!focused, 'focus is visible on a control');
      await t.page.focus('[data-act="select"]');
      await t.page.keyboard.press('Enter');
      t.equal((await t.state()).scene, 'select', 'Enter opens Exhibition');
      await t.page.focus('[data-act="pickSide"][data-arg="away"]');
      await t.page.keyboard.press('Enter');
      await t.page.focus('[data-act="startExhibition"]');
      await t.page.keyboard.press('Enter');
      let s = await t.state();
      t.equal(s.scene, 'game', 'Enter starts the game');
      await t.game('pause');
      // bat with the keyboard: Space swings
      s = await stepUntil(t, (x) => x.game.phase === 'flight', 900, 3, 'pitch');
      const T = s.game.flightT, W = s.game.W;
      await t.game('step', Math.max(0, Math.round((T - 0.1 * s.game.scale) * 60) - 1 - Math.round(s.game.phaseT * 60)));
      await t.page.keyboard.press(' ');
      s = await t.state();
      t.expect(!!s.game.swing, `Space swings (${s.game.swing && s.game.swing.grade})`);
      await t.shot('50-keyboard');
      await toPre(t);
      // pitch with the keyboard: next half inning
      await t.game('setState', { game: { outs: 2 } });
      for (let i = 0; i < 12 && (await t.state()).game.half === 0; i++) { await t.game('act', 'contact', { ev: 86, la: 34, spray: 2 }); await stepUntil(t, (x) => x.game.phase === 'flight' || x.game.half === 1, 900, 5, 'pitch'); s = await stepUntil(t, (x) => x.game.phase === 'pre' || x.game.half === 1 || x.scene !== 'game', 3000, 20, 'next'); }
      s = await stepUntil(t, (x) => x.game.half === 1 && x.game.phase === 'pre', 600, 10, 'user pitches');
      t.equal(s.game.userPitches, true, 'the user pitches the bottom half');
      await t.page.keyboard.press('3');
      await t.page.keyboard.down('ArrowLeft'); await t.game('step', 20); await t.page.keyboard.up('ArrowLeft');
      s = await t.state();
      t.expect(s.game.sel === 2 && s.game.target.x < -0.2, 'keys pick the pitch and move the target');
      await t.page.keyboard.press(' ');
      await stepUntil(t, (x) => x.game.meter && x.game.meter.t >= 0.88, 200, 1, 'meter');
      await t.page.keyboard.press(' ');
      s = await t.state();
      t.expect(s.game.phase === 'windup' && s.game.pitch.acc > 0.8, 'Space twice throws an accurate pitch');
    },
  },
  {
    name: 'live region announces pitches',
    viewports: ['desktop'],
    async run(t) {
      await exhibition(t, { seed: 6 });
      await t.game('act', 'aiPitch', { x: 0, z: 2.5 });
      await stepUntil(t, (x) => x.game.phase === 'result', 900, 5, 'pitch');
      const live = await t.page.textContent('#live');
      t.expect(/Strike one/.test(live), `live region: "${live}"`);
      const aria = await t.page.getAttribute('#live', 'aria-live');
      t.equal(aria, 'polite', 'polite live region');
      const sr = await t.page.textContent('#sb .sr-only');
      t.expect(/1 strikes|0 balls, 1 strikes/.test(sr), `scoreboard count in text: "${sr}"`);
    },
  },
];
