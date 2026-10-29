// Quick 3D review shots and fps with a GPU-backed Chromium (the harness runs headless SwiftShader).
//   node games/baseball/tools/shots3d.mjs [out-dir] [--fps] [--only duel,field] [--sw]
// Serves the repo root on a local port, opens the game, stages scenes through window.__game, and
// writes PNGs (desktop 1280×800, mobile 390×844 @2x). --sw uses the default (software) GL instead.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../../..');
const require = createRequire(path.join(root, 'shared/test-harness/package.json'));
const { chromium } = require('playwright');
const args = process.argv.slice(2);
const out = path.resolve(args.find((a) => !a.startsWith('--') && !args[args.indexOf(a) - 1]?.startsWith('--only')) || path.join(here, '../screenshots/scratch3d'));
const only = args.includes('--only') ? args[args.indexOf('--only') + 1].split(',') : null;
const wantFps = args.includes('--fps');
fs.mkdirSync(out, { recursive: true });

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.webp': 'image/webp', '.png': 'image/png', '.json': 'application/json', '.css': 'text/css' };
const server = http.createServer((q, r) => {
  const p = path.join(root, decodeURIComponent(q.url.split('?')[0]));
  fs.readFile(p, (e, b) => { if (e) { r.writeHead(404); r.end(); return; } r.writeHead(200, { 'content-type': MIME[path.extname(p)] || 'application/octet-stream' }); r.end(b); });
}).listen(0);
const port = server.address().port;
const gpuArgs = args.includes('--sw') ? [] : ['--enable-gpu', '--ignore-gpu-blocklist', '--use-angle=d3d11', '--enable-unsafe-webgpu'];
const browser = await chromium.launch({ headless: true, args: [...gpuArgs, '--use-gl=angle'] });

const CAMS = process.env.CAMS ? JSON.parse(process.env.CAMS) : null;
const SCENES = {
  async title(p) { await p.evaluate(() => window.__game.scene('title')); },
  async duel(p) { await p.evaluate(() => { window.__game.seed(7); window.__game.newGame({ mode: 'exhibition', home: 'lakeside', away: 'hot-springs', user: 'away', park: 'home', paused: true }); }); },
  async pitch(p) { await p.evaluate(async () => { const G = window.__game; G.seed(7); G.newGame({ mode: 'exhibition', home: 'lakeside', away: 'hot-springs', user: 'away', park: 'home', paused: true }); G.act('aiPitch', { x: 0.3, z: 2.6 }); for (let i = 0; i < 400 && G.getState().game.phase !== 'flight'; i++) G.step(1); G.step(10); }); },
  async swing(p) { await p.evaluate(async () => { const G = window.__game; G.seed(7); G.newGame({ mode: 'exhibition', home: 'lakeside', away: 'hot-springs', user: 'away', park: 'home', paused: true }); G.act('aiPitch', { x: 0, z: 2.5 }); for (let i = 0; i < 400 && G.getState().game.phase !== 'flight'; i++) G.step(1); G.act('contact', { ev: 70, la: 60, spray: 80 }); G.act('swingAt', 0); G.step(9); }); },
  async field(p) { await p.evaluate(async () => { const G = window.__game; G.seed(7); G.newGame({ mode: 'exhibition', home: 'lakeside', away: 'hot-springs', user: 'away', park: 'home', paused: true }); G.act('contact', { ev: 92, la: 14, spray: 18 }); G.act('aiPitch', { x: 0, z: 2.5 }); for (let i = 0; i < 600 && G.getState().game.phase !== 'play'; i++) G.step(1); G.step(70); }); },
  async homer(p) { await p.evaluate(async () => { const G = window.__game; G.seed(7); G.newGame({ mode: 'exhibition', home: 'lakeside', away: 'hot-springs', user: 'away', park: 'home', paused: true }); G.act('contact', { ev: 104, la: 28, spray: -12 }); G.act('aiPitch', { x: 0, z: 2.5 }); for (let i = 0; i < 600 && G.getState().game.phase !== 'play'; i++) G.step(1); G.step(170); }); },
  async spring(p) { await p.evaluate(() => { window.__game.seed(3); window.__game.newGame({ mode: 'spring', paused: true }); }); },
  async springfield(p) { await p.evaluate(async () => { const G = window.__game; G.seed(3); G.newGame({ mode: 'spring', user: 'away', paused: true }); G.act('contact', { ev: 104, la: 27, spray: 30 }); G.act('aiPitch', { x: 0, z: 2.5 }); for (let i = 0; i < 600 && G.getState().game.phase !== 'play'; i++) G.step(1); G.step(150); }); },
  async night(p) { await p.evaluate(async () => { const G = window.__game; G.seed(5); G.newGame({ mode: 'exhibition', park: 'majestic', home: 'lakeside', away: 'lake-hamilton', user: 'away', night: true, paused: true }); G.act('aiPitch', { x: -0.4, z: 2.2 }); for (let i = 0; i < 400 && G.getState().game.phase !== 'flight'; i++) G.step(1); G.step(12); }); },
  async nightfield(p) { await p.evaluate(async () => { const G = window.__game; G.seed(5); G.newGame({ mode: 'exhibition', park: 'majestic', home: 'lakeside', away: 'lake-hamilton', user: 'away', night: true, paused: true }); G.act('contact', { ev: 95, la: 22, spray: -25 }); G.act('aiPitch', { x: 0, z: 2.5 }); for (let i = 0; i < 600 && G.getState().game.phase !== 'play'; i++) G.step(1); G.step(110); }); },
  async majestic(p) { await p.evaluate(() => { window.__game.seed(3); window.__game.newGame({ mode: 'exhibition', park: 'majestic', home: 'lake-hamilton', away: 'jessieville', user: 'home', paused: true }); }); },
};
const VPS = { desktop: { viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 }, mobile: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true } };
for (const [vn, vo] of Object.entries(VPS)) {
  const ctx = await browser.newContext(vo);
  const page = await ctx.newPage();
  if (args.includes('--throttle')) { const cdp = await ctx.newCDPSession(page); await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 }); }
  const errs = [];
  page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
  page.on('pageerror', (e) => errs.push(String(e)));
  await page.goto(`http://127.0.0.1:${port}/games/baseball/index.html`);
  await page.waitForFunction(() => window.__game && window.__game.getState().gfx && !window.__game.getState().gfx.loading && window.__game.getState().gfx.mode, null, { timeout: 30000 });
  const gfx = await page.evaluate(() => window.__game.getState().gfx);
  const gpu = await page.evaluate(() => { const c = document.createElement('canvas').getContext('webgl2'); const d = c.getExtension('WEBGL_debug_renderer_info'); return c.getParameter(d ? d.UNMASKED_RENDERER_WEBGL : c.RENDERER); });
  console.log(vn, JSON.stringify(gfx), gpu);
  for (const [name, fn] of Object.entries(SCENES)) for (let ci = 0; ci < (CAMS ? CAMS.length : 1); ci++) {
    if (CAMS) await page.evaluate((c) => { window.__cam = c; }, CAMS[ci]);
    if (only && !only.includes(name)) continue;
    await fn(page);
    await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
    await page.waitForTimeout(150);
    await page.screenshot({ path: path.join(out, `${vn}-${name}${CAMS ? '-c' + ci : ''}.png`) });
    if (wantFps && ['duel', 'field', 'title', 'nightfield', 'springfield'].includes(name)) {
      if (name !== 'title') await page.evaluate(() => window.__game.resume());
      await page.waitForTimeout(1000); // warm-up: first-use shader compiles and uploads
      const r = await page.evaluate(() => new Promise((res) => { const d = []; let last = performance.now(); const t0 = last; const f = (now) => { d.push(now - last); last = now; if (now - t0 < 4000) requestAnimationFrame(f); else { d.sort((x, y) => x - y); res({ fps: d.length / ((now - t0) / 1000), med: d[d.length >> 1], p90: d[Math.floor(d.length * 0.9)] }); } }; requestAnimationFrame(f); }));
      const q = await page.evaluate(() => window.__game.getState().gfx.quality);
      console.log(`  ${vn} ${name}: ${r.fps.toFixed(1)} fps mean, median frame ${r.med.toFixed(1)} ms, p90 ${r.p90.toFixed(1)} ms (${q})`);
      await page.evaluate(() => window.__game.pause());
    }
  }
  if (errs.length) console.log('ERRORS', vn, errs.slice(0, 5));
  await ctx.close();
}
await browser.close(); server.close();
console.log('shots in', out);
