// Tiles art-src/blender/renders/*.png into renders/sheet.png for review (uses the harness's Chromium).
//   node art-src/blender/sheet.mjs [filter]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const here = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(path.join(here, '../../shared/test-harness/package.json'));
const { chromium } = require('playwright');
const dir = path.join(here, 'renders');
const filt = process.argv[2] || '';
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.png') && !f.startsWith('sheet') && f.includes(filt)).sort();
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1640, height: 600 } });
await p.setContent(`<body style="margin:0;background:#556;display:flex;flex-wrap:wrap;font:13px sans-serif;color:#fff">${files.map((f) => `<div><img style="width:320px" src="data:image/png;base64,${fs.readFileSync(path.join(dir, f)).toString('base64')}"><br>${f}</div>`).join('')}</body>`);
await p.screenshot({ path: path.join(dir, 'sheet.png'), fullPage: true }); await b.close();
console.log(files.length, 'tiles');
