#!/usr/bin/env node
// Review captures on the real GPU: the canonical frames in tools/review-shots.json, rendered by the installed Chrome
// (headless, ANGLE/D3D11) over http from the repo. The harness's bundled Chromium only has software GL, so its
// screenshots can't judge lighting or materials; these can. Also writes close-ups (desktop; the 3D frame alone at
// 2× pixels) and 8-frame motion strips, plus an index (shots.json) for the review brief.
//
//   node tools/shots-review.mjs <out=review-loop-0> [--tiers=high,medium,low] [--only=R02,R05]
//        [--viewports=desktop,mobile,landscape] [--no-crops] [--no-strips] [--verify] [--file-url]
//
// Output: screenshots/<out>/<tier>/<viewport>/<id>.png, crops/<tier>/<id>-<target>.png, strips/<tier>/<id>.png and
// shots.json. --verify captures R02, R07 and R12 twice and fails if they differ by more than 0.5/255 on average.
import { createRequire } from 'node:module';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(path.join(ROOT, 'shared', 'test-harness', 'package.json'));
const { chromium } = require('playwright');
const args = process.argv.slice(2);
const opt = (k, d) => { const a = args.find((x) => x.startsWith(`--${k}=`)); return a ? a.slice(k.length + 3) : d; };
const out = args.find((a) => !a.startsWith('--')) || 'review-loop-0';
const TIERS = opt('tiers', 'high,medium,low').split(',');
const ONLY = opt('only', '') ? opt('only', '').split(',') : null;
const VPS = opt('viewports', 'desktop,mobile,landscape').split(',');
const CROPS = !args.includes('--no-crops'), STRIPS = !args.includes('--no-strips'), VERIFY = args.includes('--verify'), FILEURL = args.includes('--file-url');
const VERIFY_IDS = ['R02', 'R07', 'R12'];
const SPEC = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools', 'review-shots.json'), 'utf8'));
// landscape: a phone turned sideways (the shots marked mobile)
const VIEW = { desktop: [{ width: 1280, height: 800 }, 1], mobile: [{ width: 390, height: 844 }, 2], landscape: [{ width: 844, height: 390 }, 2] };
const dirOut = path.join(ROOT, 'screenshots', out);

const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webp': 'image/webp', '.png': 'image/png' };
const server = http.createServer((req, res) => {
  const f = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
  if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res);
}).listen(0);
const base = (FILEURL ? pathToFileURL(path.join(ROOT, 'index.html')).href : `http://127.0.0.1:${server.address().port}/index.html`) + opt('query', '');
const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--enable-gpu', '--use-angle=d3d11', '--ignore-gpu-blocklist'] });

const problems = [];
const index = { out, made: new Date().toISOString(), tiers: TIERS, gpu: null, shots: [] };
const save = (file, buf) => { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, buf); return path.relative(dirOut, file).split(path.sep).join('/'); };
const frames = (page, n = 3) => page.evaluate((n) => new Promise((r) => { let k = 0; const f = () => (++k >= n ? r() : requestAnimationFrame(f)); requestAnimationFrame(f); }), n);
const ready = (page) => page.waitForFunction(() => { const g = window.__game && window.__game.getState().gfx; return g && !g.loading && !g.v3loading && g.mode; }, null, { timeout: 30000 });

// Runs one setup step inside the page.
async function op(page, step) {
  const [name, ...a] = step;
  const r = await page.evaluate(({ name, a }) => {
    const G = window.__game;
    G.pause(); // nothing may advance between steps: only the setup moves the sim
    switch (name) {
      case 'game': { const o = { mode: 'exhibition', home: 'lakeside', away: 'hot-springs', user: 'away', park: 'home', innings: 7, seed: 7, ...a[0], paused: true };
        G.seed(o.seed); G.setState({ settings: { sound: false } }); G.newGame(o); G.pause(); return null; }
      case 'act': G.act(...a); return null;
      case 'until': { const max = a[1] || 900; for (let i = 0; i < max; i++) { if (G.getState().game.phase === a[0]) return null; G.step(1); } return `phase ${a[0]} not reached`; }
      case 'step': G.step(a[0]); return null;
      case 'title': G.scene('title'); G.act('clock', a[0] * 1000); return null;
      case 'replay': G.act('replay', a[0]); G.pause(); return null;
      default: return `unknown op ${name}`;
    }
  }, { name, a });
  if (r) throw new Error(r);
}

async function tile(page, pngs, cols) {
  return page.evaluate(async ({ urls, cols }) => {
    const ims = await Promise.all(urls.map((u) => { const i = new Image(); i.src = u; return i.decode().then(() => i); }));
    const w = 480, h = Math.round(w * ims[0].height / ims[0].width), rows = Math.ceil(ims.length / cols);
    const c = document.createElement('canvas'); c.width = cols * w + (cols - 1) * 4; c.height = rows * h + (rows - 1) * 4;
    const x = c.getContext('2d'); x.fillStyle = '#000'; x.fillRect(0, 0, c.width, c.height);
    ims.forEach((im, i) => { const cx = (i % cols) * (w + 4), cy = Math.floor(i / cols) * (h + 4); x.drawImage(im, cx, cy, w, h);
      x.font = '700 18px sans-serif'; x.fillStyle = '#ffd21f'; x.fillText(`${i + 1}`, cx + 8, cy + 22); });
    return c.toDataURL('image/png');
  }, { urls: pngs.map((b) => `data:image/png;base64,${b.toString('base64')}`), cols });
}

async function diff(page, a, b) {
  return page.evaluate(async ([a, b]) => {
    const load = (u) => { const i = new Image(); i.src = u; return i.decode().then(() => i); };
    const [ia, ib] = await Promise.all([load(a), load(b)]);
    const px = (im) => { const c = document.createElement('canvas'); c.width = im.width; c.height = im.height; const x = c.getContext('2d'); x.drawImage(im, 0, 0); return x.getImageData(0, 0, im.width, im.height).data; };
    const da = px(ia), db = px(ib); let s = 0;
    for (let i = 0; i < da.length; i += 4) s += Math.abs(da[i] - db[i]) + Math.abs(da[i + 1] - db[i + 1]) + Math.abs(da[i + 2] - db[i + 2]);
    return s / (da.length / 4 * 3);
  }, [`data:image/png;base64,${a.toString('base64')}`, `data:image/png;base64,${b.toString('base64')}`]);
}

const shots = SPEC.shots.filter((s) => !ONLY || ONLY.includes(s.id));
for (const tier of TIERS) {
  for (const vp of VPS) {
    const [viewport, scale] = VIEW[vp];
    const phone = vp !== 'desktop';
    const ctx = await browser.newContext({ viewport, deviceScaleFactor: scale, hasTouch: phone, isMobile: phone });
    const page = await ctx.newPage();
    const cdp = await ctx.newCDPSession(page);
    page.on('console', (m) => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) problems.push(`[${tier}/${vp}] console: ${m.text()}`); });
    page.on('response', (r) => { if (r.status() >= 400 && !/favicon/.test(r.url())) problems.push(`[${tier}/${vp}] ${r.status()} ${r.url()}`); });
    page.on('pageerror', (e) => problems.push(`[${tier}/${vp}] pageerror: ${e.message}`));
    page.on('request', (r) => { const u = r.url(); if (!/^(http:\/\/127\.0\.0\.1|data:|blob:|file:)/.test(u)) problems.push(`external request ${u}`); });
    for (const s of shots) {
      if (phone && !s.mobile) continue;
      const run = async () => {
        await page.goto(base);
        await ready(page);
        await page.evaluate(([q, c]) => { window.__game.act('quality', q); window.__game.act('clock', c); }, [tier, SPEC.clock]);
        for (const st of s.setup) await op(page, st);
        await page.evaluate((c) => window.__game.act('clock', c), SPEC.clock);
        await frames(page, 4);
        return page.screenshot();
      };
      const t0 = Date.now();
      let png;
      try { png = await run(); } catch (e) { problems.push(`[${tier}/${vp}] ${s.id}: ${e.message}`); continue; }
      const rec = { id: s.id, title: s.title, cats: s.cats, tier, viewport: vp, file: save(path.join(dirOut, tier, vp, `${s.id}.png`), png), crops: [], strip: null };
      if (!index.gpu) index.gpu = await page.evaluate(() => window.__game.act('gfx'));
      rec.gfx = await page.evaluate(() => { const x = window.__game.act('gfx'); return { calls: x.calls, tris: x.tris, cpuMs: x.cpuMs, quality: x.quality, actors: x.actors }; });
      if (VERIFY && VERIFY_IDS.includes(s.id)) {
        const again = await run();
        const d = await diff(page, png, again);
        rec.verifyDiff = Math.round(d * 1000) / 1000;
        if (d > 0.5) { problems.push(`[${tier}/${vp}] ${s.id} not deterministic: mean diff ${d.toFixed(3)}/255`); save(path.join(dirOut, tier, vp, `${s.id}.again.png`), again); }
      }
      // close-ups: the same frozen moment through a close camera on the target, the 3D frame alone at 2× pixels
      if (CROPS && vp === 'desktop' && s.crops) {
        await cdp.send('Emulation.setDeviceMetricsOverride', { width: viewport.width, height: viewport.height, deviceScaleFactor: 2, mobile: false });
        await page.evaluate(() => window.dispatchEvent(new Event('resize')));
        for (const c of s.crops) {
          const ok = await page.evaluate(([t, w, p, y]) => window.__game.act('camLook', t, w, p, y), [c.target, c.width || 7.5, c.pitch ?? 0.12, c.yaw ?? 0.5]);
          if (!ok) { problems.push(`[${tier}] ${s.id} close-up ${c.target}: target not on stage`); continue; }
          const url = await page.evaluate(() => window.__game.act('glShot'));
          rec.crops.push({ target: c.target, width: c.width || 7.5, file: save(path.join(dirOut, 'crops', tier, `${s.id}-${c.target.replace(/[:,.]/g, '_')}${c.tag ? `-${c.tag}` : ''}.png`), Buffer.from(url.split(',')[1], 'base64')) });
        }
        await page.evaluate(() => window.__game.act('camLook', null));
        await cdp.send('Emulation.clearDeviceMetricsOverride');
        await page.evaluate(() => window.dispatchEvent(new Event('resize')));
        await frames(page, 2);
      }
      // motion strip: 8 frames of the game view, stepping the sim (or the paused replay) between them
      if (STRIPS && vp === 'desktop' && s.strip) {
        const bufs = [];
        for (let k = 0; k < (s.strip.frames || 8); k++) {
          if (s.strip.replayFrom !== undefined) await page.evaluate((at) => { window.__game.act('replay', at); window.__game.pause(); }, s.strip.replayFrom + k * s.strip.step);
          else if (k) await page.evaluate((n) => window.__game.step(n), s.strip.every);
          await page.evaluate((c) => window.__game.act('clock', c), SPEC.clock + k * (s.strip.every || 6) * 1000 / 60);
          await frames(page, 3);
          const L = s.strip.look;
          if (L && await page.evaluate(([t, w, p, y]) => window.__game.act('camLook', t, w, p, y), [L.target, L.width || 8, L.pitch ?? 0.12, L.yaw ?? 0.5])) {
            const url = await page.evaluate(() => window.__game.act('glShot'));
            await page.evaluate(() => window.__game.act('camLook', null));
            bufs.push(Buffer.from(url.split(',')[1], 'base64'));
          } else bufs.push(await page.screenshot());
        }
        const url = await tile(page, bufs, 4);
        rec.strip = save(path.join(dirOut, 'strips', tier, `${s.id}.png`), Buffer.from(url.split(',')[1], 'base64'));
      }
      index.shots.push(rec);
      console.log(`${tier}/${vp} ${s.id} ${((Date.now() - t0) / 1000).toFixed(1)} s · ${rec.gfx.calls} calls · ${(rec.gfx.tris / 1000).toFixed(0)}k tris${rec.verifyDiff !== undefined ? ` · verify ${rec.verifyDiff}` : ''}${rec.crops.length ? ` · ${rec.crops.length} crops` : ''}${rec.strip ? ' · strip' : ''}`);
    }
    await ctx.close();
  }
}
// a partial run (--only, fewer tiers or viewports) merges into the existing index
let prevIdx = null;
try { prevIdx = JSON.parse(fs.readFileSync(path.join(dirOut, 'shots.json'), 'utf8')); } catch { /* first run */ }
if (prevIdx) {
  const key = (s) => `${s.id}|${s.tier}|${s.viewport}`, fresh = new Set(index.shots.map(key));
  index.shots = [...prevIdx.shots.filter((p) => !fresh.has(key(p))), ...index.shots].sort((a, b) => key(a).localeCompare(key(b)));
  index.tiers = [...new Set([...prevIdx.tiers, ...index.tiers])];
}
fs.writeFileSync(path.join(dirOut, 'shots.json'), JSON.stringify({ ...index, problems }, null, 2));
await browser.close(); server.close();
console.log(`GPU: ${index.gpu ? index.gpu.renderer : '?'} (software: ${index.gpu ? index.gpu.soft : '?'})`);
if (problems.length) { console.error(`${problems.length} problem(s):\n  ${problems.slice(0, 20).join('\n  ')}`); process.exitCode = 1; }
else console.log(`✓ ${index.shots.length} captures → screenshots/${out}/`);
