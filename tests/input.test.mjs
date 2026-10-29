import { exhibition, stepUntil, toFlight, toPre } from './helpers.mjs';

const center = async (t, sel) => { const b = await t.page.locator(sel).boundingBox(); return [b.x + b.width / 2, b.y + b.height / 2]; };

export const tests = [
  {
    name: 'touch: batting, pitching, aim drag, pad sizes',
    viewports: ['mobile'],
    async run(t) {
      await t.game('setState', { settings: { aim: 'aim' } });
      await exhibition(t, { seed: 71 });
      // pad buttons are big enough
      const sizes = await t.page.$$eval('#pad button', (bs) => bs.map((b) => { const r = b.getBoundingClientRect(); return [r.width, r.height]; }));
      t.expect(sizes.length >= 3 && sizes.every(([w, h]) => w >= 44 && h >= 44), `pad targets ≥ 44 px (${JSON.stringify(sizes)})`);
      // aim by dragging on the field
      const cv = await t.page.locator('#cv').boundingBox();
      await t.touchDrag([cv.x + cv.width * 0.5, cv.y + cv.height * 0.5], [cv.x + cv.width * 0.62, cv.y + cv.height * 0.42], { steps: 6 });
      let s = await t.state();
      t.expect(s.game.aim.x > 0.15, `drag moves the bat cursor (x ${s.game.aim.x.toFixed(2)})`);
      // bunt and steal toggles by tap
      await t.tap(await center(t, '[data-act="bunt"]'));
      s = await t.state();
      t.equal(s.game.bunt, true, 'tap BUNT');
      await t.tap(await center(t, '[data-act="bunt"]'));
      // swing by tap
      await t.game('act', 'aiPitch', { x: s.game.aim.x, z: s.game.aim.z });
      s = await toFlight(t);
      await t.game('step', Math.max(0, Math.round((s.game.flightT - 0.1 * s.game.scale) * 60) - Math.round(s.game.phaseT * 60) - 1));
      await t.tap(await center(t, '[data-act="primary"]'));
      s = await t.state();
      t.expect(!!s.game.swing, `tap SWING swings (${s.game.swing && s.game.swing.grade})`);
      await t.shot('51-touch-bat', { wait: false });
      await toPre(t);
      await t.game('setState', { settings: { aim: 'auto' } });
      // pitching by touch
      await exhibition(t, { seed: 72, user: 'home' });
      await t.tap(await center(t, '[data-act="pitchType"][data-arg="1"]'));
      s = await t.state();
      t.equal(s.game.sel, 1, 'tap selects a pitch');
      await t.touchDrag([cv.x + cv.width * 0.5, cv.y + cv.height * 0.5], [cv.x + cv.width * 0.35, cv.y + cv.height * 0.58], { steps: 6 });
      s = await t.state();
      t.expect(s.game.target.x < -0.2, `drag moves the pitch target (x ${s.game.target.x.toFixed(2)})`);
      await t.tap(await center(t, '[data-act="primary"]'));
      s = await stepUntil(t, (x) => x.game.meter && x.game.meter.t >= 0.88, 200, 1, 'meter running');
      await t.shot('51b-touch-pitch', { wait: false });
      await t.tap(await center(t, '[data-act="primary"]'));
      s = await t.state();
      t.expect(s.game.phase === 'windup' && s.game.pitch.acc > 0.8, `second tap throws (acc ${s.game.pitch && s.game.pitch.acc})`);
    },
  },
  {
    name: 'mouse: aim and click to swing',
    viewports: ['desktop'],
    async run(t) {
      await t.game('setState', { settings: { aim: 'aim' } });
      await exhibition(t, { seed: 73 });
      const cv = await t.page.locator('#cv').boundingBox();
      await t.page.mouse.move(cv.x + cv.width * 0.56, cv.y + cv.height * 0.5);
      let s = await t.state();
      t.expect(Math.abs(s.game.aim.x) > 0.1, `mouse moves the cursor (x ${s.game.aim.x.toFixed(2)})`);
      await t.game('act', 'aiPitch', { x: s.game.aim.x, z: s.game.aim.z });
      s = await toFlight(t);
      await t.game('step', Math.max(0, Math.round((s.game.flightT - 0.1 * s.game.scale) * 60) - Math.round(s.game.phaseT * 60) - 1));
      await t.page.mouse.click(cv.x + cv.width * 0.56, cv.y + cv.height * 0.5);
      s = await t.state();
      t.expect(!!s.game.swing, 'click swings');
      await t.game('setState', { settings: { aim: 'auto' } });
    },
  },
];
