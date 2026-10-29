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
      // the 3D view loads after first paint: three.js, the packed models and the painted WebP set
      // (assets/art.js, the same set as data URLs, is only fetched from file:// and not counted twice)
      const dir = (d) => fs.readdirSync(path.join(here, '..', d)).filter((f) => !f.endsWith('.json') && !f.includes('LICENSE') && f !== 'art.js').reduce((a, f) => a + fs.statSync(path.join(here, '..', d, f)).size, 0);
      const total = size + dir('vendor') + dir('assets');
      t.log(`total download ${(total / 1048576).toFixed(2)} MB (html + vendor + assets)`);
      t.expect(total <= 3.5 * 1048576, 'total download ≤ 3.5 MB');
      const t0 = Date.now();
      await t.page.waitForFunction(() => { const g = window.__game.getState().gfx; return g && !g.loading; }, null, { timeout: 20000 });
      const gfx = (await t.state()).gfx;
      t.log(`3D ready ${Date.now() - t0} ms after hooks (${gfx.mode}, ${gfx.quality}, ${gfx.gpu})`);
      // headless runs use software GL (SwiftShader): hold it to a playable floor; GPU numbers come from tools/shots3d.mjs --fps
      const soft = /swiftshader|llvmpipe|software/i.test(gfx.gpu || '');
      const floor = gfx.mode === '3d' && soft ? 5 : 55; // software GL is a sanity floor only (it varies 2× with machine load)
      await t.game('newGame', { mode: 'exhibition', home: 'lake-hamilton', away: 'hot-springs', user: 'none', seed: 5 });
      await t.page.waitForTimeout(600);
      const fps = await t.fps(3000);
      const mem = await t.memoryMB();
      const s = await t.state();
      t.log(`live game (${s.game.phase}): ${fps.toFixed(1)} fps, heap ${mem.toFixed(1)} MB`);
      t.expect(fps >= floor, `≥ ${floor} fps (${fps.toFixed(1)})`);
      t.expect(mem < 90, `heap < 90 MB (${mem.toFixed(1)})`);
      // field view: a long fly ball playing out
      await t.game('pause');
      await t.game('act', 'contact', { ev: 98, la: 30, spray: -20 });
      await t.game('act', 'aiPitch', { x: 0, z: 2.5 });
      for (let i = 0; i < 200 && (await t.state()).game.phase !== 'play'; i++) await t.game('step', 5);
      await t.game('resume');
      const fps2 = await t.fps(2000);
      t.log(`field playback (${(await t.state()).game.phase}): ${fps2.toFixed(1)} fps`);
      t.expect(fps2 >= floor, `field view ≥ ${floor} fps (${fps2.toFixed(1)})`);
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
