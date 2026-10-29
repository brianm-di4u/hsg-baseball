import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));

export const tests = [
  {
    name: 'performance: fps, heap, size, load',
    async run(t) {
      const size = fs.statSync(path.join(here, '..', 'index.html')).size;
      t.log(`index.html ${(size / 1024).toFixed(1)} KB, hooks in ${t.loadMs} ms`);
      t.expect(size <= 2 * 1024 * 1024, 'HTML ≤ 2 MB');
      t.expect(t.loadMs <= 2000, 'interactive in ≤ 2 s');
      await t.game('newGame', { mode: 'exhibition', home: 'lake-hamilton', away: 'hot-springs', user: 'none', seed: 5 });
      await t.page.waitForTimeout(600);
      const fps = await t.fps(3000);
      const mem = await t.memoryMB();
      const s = await t.state();
      t.log(`live game (${s.game.phase}): ${fps.toFixed(1)} fps, heap ${mem.toFixed(1)} MB`);
      t.expect(fps >= 55, `≥ 55 fps (${fps.toFixed(1)})`);
      t.expect(mem < 40, `heap < 40 MB (${mem.toFixed(1)})`);
      // field view: a long fly ball playing out
      await t.game('pause');
      await t.game('act', 'contact', { ev: 98, la: 30, spray: -20 });
      await t.game('act', 'aiPitch', { x: 0, z: 2.5 });
      for (let i = 0; i < 200 && (await t.state()).game.phase !== 'play'; i++) await t.game('step', 5);
      await t.game('resume');
      const fps2 = await t.fps(2000);
      t.log(`field playback (${(await t.state()).game.phase}): ${fps2.toFixed(1)} fps`);
      t.expect(fps2 >= 55, `field view ≥ 55 fps (${fps2.toFixed(1)})`);
      await t.game('scene', 'help');
      await t.page.waitForTimeout(120);
      t.equal((await t.state()).loop, false, 'menus render on demand (no loop)');
    },
  },
  {
    name: 'balance: in-page simulated games finish with sane scores',
    viewports: ['desktop'],
    async run(t) {
      let runs = 0, n = 0;
      for (let i = 0; i < 24; i++) {
        const r = await t.game('act', 'simGame', { home: ['hot-springs', 'lakeside', 'jessieville'][i % 3], away: ['lake-hamilton', 'fountain-lake', 'mountain-pine'][i % 3], seed: 100 + i });
        t.expect(r.over, `game ${i} finished`);
        runs += r.score[0] + r.score[1]; n += 2;
      }
      t.log(`avg runs per team ${(runs / n).toFixed(2)}`);
      t.expect(runs / n > 2 && runs / n < 9, 'scores in a baseball range');
    },
  },
];
