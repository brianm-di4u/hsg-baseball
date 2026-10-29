// Before/after contact sheets: each shot that exists in both milestones, side by side.
//   node games/baseball/tools/before-after.mjs [before=visual-before] [after=visual-final] [viewport=desktop]
// Writes screenshots/<after>/sheets/before-after-<viewport>-NN.png (the harness's Chromium, no image libs).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const here = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(path.join(here, '../../../shared/test-harness/package.json'));
const { chromium } = require('playwright');
const [before = 'visual-before', after = 'visual-final', vp = 'desktop'] = process.argv.slice(2);
const shots = path.join(here, '..', 'screenshots');
const A = path.join(shots, before, vp), B = path.join(shots, after, vp);
const names = fs.readdirSync(A).filter((f) => f.endsWith('.png') && fs.existsSync(path.join(B, f))).sort();
const out = path.join(shots, after, 'sheets'); fs.mkdirSync(out, { recursive: true });
const per = vp === 'desktop' ? 4 : 3, w = vp === 'desktop' ? 560 : 260;
const img = (f) => `data:image/png;base64,${fs.readFileSync(f).toString('base64')}`;
const browser = await chromium.launch(); const page = await browser.newPage({ viewport: { width: w * 2 + 40, height: 400 } });
let n = 0;
for (let i = 0; i < names.length; i += per) {
  const rows = names.slice(i, i + per).map((f) => `<div style="display:flex;gap:8px;align-items:flex-start;margin:6px"><figure style="margin:0"><img style="width:${w}px" src="${img(path.join(A, f))}"><figcaption>before · ${f}</figcaption></figure><figure style="margin:0"><img style="width:${w}px" src="${img(path.join(B, f))}"><figcaption>after · ${f}</figcaption></figure></div>`).join('');
  await page.setContent(`<body style="margin:0;background:#222;color:#eee;font:12px system-ui">${rows}</body>`);
  await page.screenshot({ path: path.join(out, `before-after-${vp}-${String(++n).padStart(2, '0')}.png`), fullPage: true });
}
await browser.close();
console.log(`${names.length} pairs → ${n} sheets in ${path.relative(process.cwd(), out)}`);
