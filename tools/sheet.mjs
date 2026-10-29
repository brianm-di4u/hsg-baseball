// Tiles PNGs from a folder into one review image: node games/baseball/tools/sheet.mjs <dir> <filter> <out.png> [height]
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const here = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(path.join(here, '../../../shared/test-harness/package.json'));
const { chromium } = require('playwright');
const [dir, filt = '', out = 'sheet.png', hh = '300'] = process.argv.slice(2);
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.png') && !f.startsWith('sheet') && f.includes(filt)).sort();
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1600, height: 400 } });
await p.setContent(`<body style="margin:0;background:#333;display:flex;flex-wrap:wrap;gap:4px;font:12px sans-serif;color:#fff">${files.map((f) => `<div><img style="height:${hh}px" src="data:image/png;base64,${fs.readFileSync(path.join(dir, f)).toString('base64')}"><br>${f}</div>`).join('')}</body>`);
await p.screenshot({ path: path.join(dir, out), fullPage: true }); await b.close();
console.log(files.length, 'tiles →', path.join(dir, out));
