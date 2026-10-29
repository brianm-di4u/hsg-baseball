import { click } from './helpers.mjs';

export const tests = [
  {
    name: 'title screen',
    async run(t) {
      const s = await t.state();
      t.equal(s.scene, 'title', 'boots to the title');
      const txt = await t.page.textContent('#screen');
      for (const w of ['DIAMOND', 'SPRINGS', 'Season', 'Exhibition', 'Spring Training', 'Challenges', 'Fact Album', 'How to play', 'Settings', 'All players are fictional']) t.expect(txt.includes(w), `title shows "${w}"`);
      t.expect(t.loadMs < 2000, `hooks ready in ${t.loadMs} ms`);
      await t.shot('01-title');
      await t.checkLayout();
    },
  },
  {
    name: 'help screens',
    async run(t) {
      await click(t, 'help');
      let txt = await t.page.textContent('#screen');
      t.expect(/Space/.test(txt) && /Arrow keys/.test(txt) && /SWING/.test(txt) && /PITCH/.test(txt), 'controls for keyboard and touch');
      await t.shot('02-help');
      await click(t, 'helpTab', 'play');
      txt = await t.page.textContent('#screen');
      t.expect(/PERFECT/.test(txt) && /EARLY/.test(txt) && /gold band/.test(txt), 'batting and pitching explained');
      await t.shot('02b-help-play');
      await click(t, 'helpTab', 'rules');
      txt = await t.page.textContent('#screen');
      t.expect(/the game's rules/.test(txt) && /Seven innings/.test(txt) && /Infield fly/.test(txt) && /force out/.test(txt), 'rules framed as game rules');
      await t.shot('02c-help-rules');
      await click(t, 'helpTab', 'about');
      txt = await t.page.textContent('#screen');
      for (const w of ['Fountain Lake', 'Cutter-Morning Star', 'Jessieville', 'Mountain Pine', 'Game colors', 'home field', 'fictional towns', 'Majestic Park', '573', 'MIT']) t.expect(txt.includes(w), `about mentions ${w}`);
      await t.shot('02d-help-about');
      await t.checkLayout();
      await t.page.keyboard.press('Escape');
      t.equal((await t.state()).scene, 'title', 'Esc returns to the title');
    },
  },
];
