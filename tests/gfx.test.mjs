// The 3D view (three.js): it loads, its painted art arrives without 404s, both duel cameras project
// the strike zone correctly, the field view stages the play, parks and lighting switch, and the 2D
// renderer still works as the fallback (?gl=0). The harness runs headless SwiftShader (low preset).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { exhibition, toFlight, stepUntil } from './helpers.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const ready3d = (t) => t.page.waitForFunction(() => { const g = window.__game.getState().gfx; return g && !g.loading && g.mode; }, null, { timeout: 20000 });

export const tests = [
  {
    name: '3D view loads with the painted art',
    async run(t) {
      await ready3d(t);
      const s = await t.state();
      t.equal(s.gfx.mode, '3d', `3D view is live (${s.gfx.reason || s.gfx.gpu})`);
      const man = JSON.parse(fs.readFileSync(path.join(here, '..', 'assets', 'manifest.json'), 'utf8'));
      t.equal(s.gfx.art.length, Object.keys(man).length, `all ${Object.keys(man).length} packed paintings loaded`);
      t.expect(s.gfx.quality === 'low' || s.gfx.quality === 'medium' || s.gfx.quality === 'high', `quality preset (${s.gfx.quality})`);
      t.expect(await t.page.$('#gl') != null, 'WebGL canvas in the stage');
      t.log(`renderer: ${s.gfx.gpu}, preset ${s.gfx.quality}`);
      await t.shot('60-title-3d');
    },
  },
  {
    name: 'duel cameras: catcher\'s eye when batting, center field when pitching',
    async run(t) {
      await ready3d(t);
      await exhibition(t, { user: 'away' });
      await t.waitForStable();
      let s = await t.state();
      t.equal(s.gfx.cam, 'bat', 'batting uses the catcher\'s-eye camera');
      // plate → screen → plate round trip through the live camera, and the zone sits on screen
      let p = await t.game('act', 'probe3d', 0.4, 2.2);
      t.expect(Math.abs(p.x - 0.4) < 0.02 && Math.abs(p.z - 2.2) < 0.02, `round trip (${p.x.toFixed(3)}, ${p.z.toFixed(3)})`);
      t.expect(p.zone.x > 0 && p.zone.x + p.zone.w < p.W && p.zone.y > 0 && p.zone.y + p.zone.h < p.H, 'zone fully on screen');
      t.expect(p.zone.h > p.H * 0.1, `zone readable (${p.zone.h.toFixed(0)} px of ${p.H})`);
      t.expect(s.gfx.actors >= 11, `fielders, pitcher, batter and base coaches staged (${s.gfx.actors})`);
      await t.shot('61-duel-bat-3d');
      await exhibition(t, { user: 'home' });
      await t.waitForStable();
      s = await t.state();
      t.equal(s.gfx.cam, 'cf', 'pitching uses the center-field camera');
      p = await t.game('act', 'probe3d', -0.5, 3.0);
      t.expect(Math.abs(p.x + 0.5) < 0.02 && Math.abs(p.z - 3.0) < 0.02, `round trip (${p.x.toFixed(3)}, ${p.z.toFixed(3)})`);
      t.expect(p.zone.x > 0 && p.zone.x + p.zone.w < p.W && p.zone.y > 0 && p.zone.y + p.zone.h < p.H, 'zone fully on screen');
      t.expect(s.gfx.actors >= 13, `catcher and umpire in view too (${s.gfx.actors})`);
      await t.shot('62-duel-pitch-3d');
    },
  },
  {
    name: 'field view stages the play from the timeline',
    async run(t) {
      await ready3d(t);
      await exhibition(t, { user: 'away' });
      await t.game('act', 'contact', { ev: 92, la: 14, spray: 18 });
      await t.game('act', 'aiPitch', { x: 0, z: 2.5 });
      await stepUntil(t, (s) => s.game.phase === 'play', 900, 10, 'ball in play');
      await t.game('step', 60);
      await t.waitForStable();
      const s = await t.state();
      t.equal(s.gfx.view, 'field', 'broadcast field camera');
      t.expect(s.gfx.actors >= 10, `nine fielders, the runner and the umpire (${s.gfx.actors})`);
      await t.shot('63-field-3d');
    },
  },
  {
    name: 'replay: the last ball in play from a second angle, game state untouched',
    async run(t) {
      await ready3d(t);
      await exhibition(t, { user: 'away' });
      t.equal((await t.state()).canReplay, false, 'nothing to replay yet');
      await t.game('act', 'contact', { ev: 96, la: 24, spray: -20 });
      await t.game('act', 'aiPitch', { x: 0, z: 2.5 });
      await stepUntil(t, (s) => s.game.phase === 'play', 900, 10, 'ball in play');
      const before = await stepUntil(t, (s) => s.game.phase === 'pre', 3000, 20, 'next pitch');
      t.expect(before.canReplay, 'the play can be replayed');
      await t.game('act', 'replay', 1.2);
      await t.waitForStable();
      let s = await t.state();
      t.expect(!!s.replay, 'replay running');
      t.equal(s.gfx.view, 'field', 'replay renders the field view');
      t.equal(await t.page.textContent('#banner'), 'Replay', 'banner says Replay');
      await t.shot('67-replay-3d');
      s = await stepUntil(t, (x) => !x.replay, 1500, 30, 'replay ends');
      t.equal(JSON.stringify([s.game.score, s.game.outs, s.game.bases, s.game.phase]), JSON.stringify([before.game.score, before.game.outs, before.game.bases, before.game.phase]), 'score, outs, bases and phase unchanged');
    },
  },
  {
    name: 'parks and lighting: historic afternoon, Majestic under the lights',
    async run(t) {
      await ready3d(t);
      await t.seed(3);
      await t.game('newGame', { mode: 'spring', user: 'away', paused: true });
      await t.waitForStable();
      let s = await t.state();
      t.equal(s.gfx.park, 'historic|0', 'historic-style park, daylight');
      await t.shot('64-historic-3d');
      await t.game('newGame', { mode: 'exhibition', park: 'majestic', home: 'lakeside', away: 'lake-hamilton', user: 'away', night: true, paused: true });
      await t.waitForStable();
      s = await t.state();
      t.equal(s.gfx.park, 'majestic|1', 'Majestic Park at night');
      await t.shot('65-majestic-night-3d');
    },
  },
  {
    name: 'graphics setting switches between the 3D ballpark and classic 2D',
    viewports: ['desktop'],
    async run(t) {
      await ready3d(t);
      await t.game('scene', 'settings');
      await t.page.click('[data-act="setGfx"][data-arg="2d"]');
      await t.waitForStable();
      let s = await t.state();
      t.equal(s.settings.gfx, '2d', 'setting saved');
      t.equal(s.gfx.mode, '2d', 'classic 2D in use');
      t.expect(await t.page.$eval('#gl', (c) => c.hidden), 'WebGL canvas hidden');
      await exhibition(t, { user: 'away' });
      await t.shot('68-setting-2d');
      await t.game('setState', { settings: { gfx: '3d' } });
      await t.page.reload(); await ready3d(t);
      s = await t.state();
      t.equal(s.gfx.mode, '3d', 'back to 3D after a reload');
    },
  },
  {
    name: '2D fallback with ?gl=0',
    url: 'index.html?gl=0',
    async run(t) {
      await t.page.waitForTimeout(200);
      let s = await t.state();
      t.equal(s.gfx.mode, '2d', '3D off by request');
      t.expect(await t.page.$('#gl') == null, 'no WebGL canvas');
      await exhibition(t, { user: 'away' });
      await t.game('act', 'aiPitch', { x: 0, z: 2.5 });
      await toFlight(t);
      await t.game('act', 'swingAt', 0);
      s = await t.state();
      t.expect(!!s.game.swing, 'the game plays in 2D');
      await t.shot('66-fallback-2d');
    },
  },
];
