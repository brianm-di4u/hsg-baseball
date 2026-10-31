#!/usr/bin/env node
// Frame rate and frame cost on the real GPU (installed Chrome, headless, ANGLE/D3D11, vsync off so headroom shows),
// per quality tier and viewport, over scenes that keep the most actors moving: the duel, a ground ball, a gap
// double, a replay and the night final. --throttle=N adds CDP CPU throttling (4 ~ a mid-range phone). --soft uses
// the software rasterizer (SwiftShader) instead of the GPU: the floor for machines without usable WebGL drivers.
//
//   node tools/perf-review.mjs [--tiers=high,medium,low] [--viewports=desktop,mobile] [--throttle=4] [--soft]
//        [--scenes=duel,grounder] [--out=reviews/loop-0/perf.json]
import { createRequire } from 'node:module';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(path.join(ROOT, 'shared', 'test-harness', 'package.json'));
const { chromium } = require('playwright');
const args = process.argv.slice(2);
const opt = (k, d) => { const a = args.find((x) => x.startsWith(`--${k}=`)); return a ? a.slice(k.length + 3) : d; };
const TIERS = opt('tiers', 'high,medium,low').split(','), VPS = opt('viewports', 'desktop,mobile').split(',');
const THROTTLE = +opt('throttle', '1'), OUT = opt('out', ''), SOFT = args.includes('--soft');
const ONLY = opt('scenes', '') ? opt('scenes', '').split(',') : null;
const VIEW = { desktop: [{ width: 1280, height: 800 }, 1], mobile: [{ width: 390, height: 844 }, 2] };

const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.webp': 'image/webp', '.json': 'application/json' };
const server = http.createServer((req, res) => {
  const f = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
  if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res);
}).listen(0);
const base = `http://127.0.0.1:${server.address().port}/index.html${opt('query', '')}`;
const browser = SOFT
  ? await chromium.launch({ headless: true, args: ['--disable-gpu-vsync', '--disable-frame-rate-limit'] })
  : await chromium.launch({ channel: 'chrome', headless: true, args: ['--enable-gpu', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--disable-gpu-vsync', '--disable-frame-rate-limit'] });

// scene setups run in the page; each leaves the game animating in real time. The AI bats against the AI so no
// input is needed; plays are forced so every run stages the same moment.
const SCENES = {
  duel: (G) => { G.seed(7); G.newGame({ mode: 'exhibition', home: 'lakeside', away: 'hot-springs', user: 'none', seed: 7, paused: true }); G.resume(); },
  grounder: (G) => { G.seed(7); G.newGame({ mode: 'exhibition', home: 'lakeside', away: 'hot-springs', user: 'away', seed: 7, paused: true, situation: { bases: [true, true, true] } });
    G.act('contact', { ev: 88, la: -4, spray: -12 }); G.act('aiPitch', { x: 0, z: 2.5 }); for (let i = 0; i < 400 && G.getState().game.phase !== 'play'; i++) G.step(1); G.resume(); },
  gap: (G) => { G.seed(7); G.newGame({ mode: 'exhibition', home: 'lakeside', away: 'hot-springs', user: 'away', seed: 7, paused: true, situation: { bases: [true, false, false] } });
    G.act('contact', { ev: 98, la: 16, spray: 22 }); G.act('aiPitch', { x: 0, z: 2.5 }); for (let i = 0; i < 400 && G.getState().game.phase !== 'play'; i++) G.step(1); G.resume(); },
  replay: (G) => { G.seed(7); G.newGame({ mode: 'exhibition', home: 'lakeside', away: 'hot-springs', user: 'away', seed: 7, paused: true });
    G.act('contact', { ev: 98, la: 16, spray: 22 }); G.act('aiPitch', { x: 0, z: 2.5 }); for (let i = 0; i < 400 && G.getState().game.phase !== 'play'; i++) G.step(1); G.act('skip'); G.step(30); G.act('replay', 0); G.resume(); },
  night: (G) => { G.seed(5); G.newGame({ mode: 'exhibition', park: 'majestic', home: 'lakeside', away: 'lake-hamilton', user: 'away', night: true, seed: 5, paused: true });
    G.act('contact', { ev: 95, la: 22, spray: -25 }); G.act('aiPitch', { x: 0, z: 2.5 }); for (let i = 0; i < 400 && G.getState().game.phase !== 'play'; i++) G.step(1); G.resume(); },
};

const rows = [];
for (const tier of TIERS) for (const vp of VPS) {
  const [viewport, scale] = VIEW[vp];
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: scale, hasTouch: vp === 'mobile', isMobile: vp === 'mobile' });
  const page = await ctx.newPage();
  const errs = [];
  page.on('pageerror', (e) => errs.push(e.message));
  const t0 = Date.now();
  await page.goto(base);
  await page.waitForFunction(() => { const g = window.__game && window.__game.getState().gfx; return g && !g.loading && !g.v3loading && g.mode; }, null, { timeout: 60000 });
  const loadMs = Date.now() - t0;
  const cdp = await ctx.newCDPSession(page);
  if (THROTTLE > 1) await cdp.send('Emulation.setCPUThrottlingRate', { rate: THROTTLE });
  await page.evaluate((q) => { window.__game.setState({ settings: { sound: false } }); window.__game.act('quality', q); }, tier);
  for (const [name, fn] of Object.entries(SCENES)) {
    if (ONLY && !ONLY.includes(name)) continue;
    // warm up (shader compiles, uploads) on a first pass of the scene, then measure a fresh one
    await page.evaluate(`(${fn})(window.__game)`);
    await page.waitForTimeout(1200);
    await page.evaluate(`(${fn})(window.__game)`);
    await page.evaluate(() => window.__game.act('gfxProfile', true));
    const r = await page.evaluate(() => new Promise((res) => {
      const d = []; let last = performance.now(); const t0 = last;
      const f = (now) => { d.push(now - last); last = now; if (now - t0 < 2500) requestAnimationFrame(f); else {
        d.sort((a, b) => a - b); const q = (p) => d[Math.min(d.length - 1, Math.floor(d.length * p))];
        res({ fps: d.length / ((now - t0) / 1000), p50: q(0.5), p95: q(0.95) }); } };
      requestAnimationFrame(f);
    }));
    const gfx = await page.evaluate(() => window.__game.act('gfx'));
    const prof = await page.evaluate(() => window.__game.act('gfxProfile', false));
    const heap = await page.evaluate(() => (performance.memory ? performance.memory.usedJSHeapSize / 1048576 : 0));
    const row = { tier, viewport: vp, scene: name, throttle: THROTTLE, soft: SOFT, query: opt('query', ''), fps: +r.fps.toFixed(1), p50: +r.p50.toFixed(2), p95: +r.p95.toFixed(2), cpuMs: gfx.cpuMs, calls: gfx.calls, tris: gfx.tris,
      gpuMs: prof.all, heapMB: +heap.toFixed(1), loadMs, quality: gfx.quality, actors: gfx.actors, renderer: gfx.renderer };
    rows.push(row);
    console.log(`${tier.padEnd(6)} ${vp.padEnd(7)} ${name.padEnd(8)} ${String(row.fps).padStart(6)} fps  p95 ${String(row.p95).padStart(6)} ms  cpu ${row.cpuMs} ms  gpu ${row.gpuMs ?? '?'} ms  ${row.calls} calls  ${(row.tris / 1000).toFixed(0)}k tris  ${row.actors} actors  heap ${row.heapMB} MB`);
    await page.evaluate(() => window.__game.pause());
  }
  if (errs.length) console.error(`  errors: ${errs.slice(0, 3).join(' | ')}`);
  await ctx.close();
}
await browser.close(); server.close();
if (OUT) {
  const f = path.resolve(OUT);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  let prev = []; try { prev = JSON.parse(fs.readFileSync(f, 'utf8')).rows || []; } catch { /* new file */ }
  const same = (p) => p.throttle === THROTTLE && (p.query || '') === opt('query', '') && !!p.soft === SOFT && TIERS.includes(p.tier) && VPS.includes(p.viewport) && (!ONLY || ONLY.includes(p.scene));
  fs.writeFileSync(f, JSON.stringify({ made: new Date().toISOString(), rows: [...prev.filter((p) => !same(p)), ...rows] }, null, 2));
  console.log(`→ ${path.relative(process.cwd(), f)}`);
}
