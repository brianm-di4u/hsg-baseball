#!/usr/bin/env node
// Writes the briefs for review loop N from the templates in reviews/briefs/: the capture index (from shots.json),
// this loop's CHANGES.md (facts only), the perf summary (perf.json) and the character fidelity numbers (fidelity.json).
// No scores go into any brief.
//
//   node tools/review-prep.mjs <N> [--tier=high] [--shots=review-loop-N]
//
// Output: reviews/loop-N/brief.md (both critics), brief-advocate.md, brief-judge.md, and calibration.jpg every
// third loop (a benchmark image the judge scores blind, to catch drift).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const N = +args.find((a) => /^\d+$/.test(a));
if (!(N >= 0)) { console.error('usage: review-prep.mjs <N> [--tier=high] [--shots=review-loop-N]'); process.exit(2); }
const opt = (k, d) => { const a = args.find((x) => x.startsWith(`--${k}=`)); return a ? a.slice(k.length + 3) : d; };
const TIER = opt('tier', 'high'), SHOTS = opt('shots', `review-loop-${N}`);
const loopDir = path.join(ROOT, 'reviews', `loop-${N}`);
fs.mkdirSync(loopDir, { recursive: true });
const read = (f, d = '') => { try { return fs.readFileSync(f, 'utf8'); } catch { return d; } };

const idx = JSON.parse(read(path.join(ROOT, 'screenshots', SHOTS, 'shots.json'), 'null'));
if (!idx) { console.error(`no screenshots/${SHOTS}/shots.json: run tools/shots-review.mjs first`); process.exit(1); }
const byId = {};
for (const s of idx.shots) (byId[s.id] = byId[s.id] || { title: s.title, cats: s.cats, rows: [] }).rows.push(s);
let index = `GPU: ${idx.gpu ? idx.gpu.renderer : 'unknown'}. Tiers captured: ${idx.tiers.join(', ')}.\n\n| Id | Moment | Main categories | Frames | Close-ups | Strip |\n|---|---|---|---|---|---|\n`;
for (const [id, s] of Object.entries(byId)) {
  const frames = s.rows.map((r) => `\`${r.file.replace(/\.png$/, '')}\``).join(', ');
  const crops = [...new Set(s.rows.flatMap((r) => r.crops.map((c) => `\`${c.file.replace(/\.png$/, '')}\``)))].join(', ') || '—';
  const strips = [...new Set(s.rows.filter((r) => r.strip).map((r) => `\`${r.strip.replace(/\.png$/, '')}\``))].join(', ') || '—';
  index += `| ${id} | ${s.title} | ${s.cats.join(', ')} | ${frames} | ${crops} | ${strips} |\n`;
}

const changes = read(path.join(loopDir, 'CHANGES.md'), '(none recorded)').trim();
let perf = '(not measured)';
const pj = JSON.parse(read(path.join(loopDir, 'perf.json'), 'null'));
if (pj) {
  const g = {};
  for (const r of pj.rows) { const k = `${r.tier} · ${r.viewport}${r.soft ? ' · software GL' : ''}${r.throttle > 1 ? ` · ${r.throttle}× CPU throttle` : ''}`; (g[k] = g[k] || []).push(r); }
  perf = '| Tier · viewport | min fps | worst p95 frame (ms) | calls | triangles | heap MB |\n|---|---|---|---|---|---|\n' +
    Object.entries(g).map(([k, rs]) => `| ${k} | ${Math.min(...rs.map((r) => r.fps)).toFixed(0)} | ${Math.max(...rs.map((r) => r.p95)).toFixed(1)} | ${Math.max(...rs.map((r) => r.calls))} | ${(Math.max(...rs.map((r) => r.tris)) / 1000).toFixed(0)}k | ${Math.max(...rs.map((r) => r.heapMB))} |`).join('\n') +
    '\n\n(vsync off: fps above 60 is headroom, not what players see.)';
}

let fidelity = '(not measured yet: score charfit by eye against the reference renders, or against the benchmarks if there are none)';
const fj = JSON.parse(read(path.join(loopDir, 'fidelity.json'), 'null'));
if (fj && fj.rows) {
  fidelity = `${fj.method || ''}\n\n| Model | Distance | Player height (px) | Silhouette IoU | Pixel error (%) |\n|---|---|---|---|---|\n` +
    fj.rows.map((r) => `| ${r.model} | ${r.distance} | ${r.px} | ${r.iou.toFixed(3)} | ${r.err.toFixed(1)} |`).join('\n');
}

const fill = (tpl, extra = {}) => tpl.replace(/\{\{(\w+)\}\}/g, (m, k) => ({ LOOP: N, SHOTS, TIER, INDEX: index, CHANGES: changes, PERF: perf, FIDELITY: fidelity, ROLE: 'critic-claude (Critic A) or critic-codex (Critic B), as assigned', DRIFT: '', ...extra })[k] ?? m);
const briefs = path.join(ROOT, 'reviews', 'briefs');
fs.writeFileSync(path.join(loopDir, 'brief.md'), fill(read(path.join(briefs, 'critic.md'))));
fs.writeFileSync(path.join(loopDir, 'brief-advocate.md'), fill(read(path.join(briefs, 'advocate.md'))));
let drift = '';
if (N > 0 && N % 3 === 0) {
  const pick = ['smb3-3.png', 'smb4-2.png', 'smb4-4.png'][(N / 3 - 1) % 3];
  const src = path.join(ROOT, 'benchmarks', pick);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(loopDir, 'calibration.png'));
    fs.writeFileSync(path.join(ROOT, 'screenshots', `.calibration-loop-${N}`), `${pick}\n`); // the answer stays outside the review folder
    drift = '- **Calibration:** also open `reviews/loop-' + N + '/calibration.png`, an unlabeled reference frame. Score its `characters` and `lighting` on the rubric anchors alone, and add `"calibration": {"characters": x, "lighting": y}` to your JSON block.';
  }
}
fs.writeFileSync(path.join(loopDir, 'brief-judge.md'), fill(read(path.join(briefs, 'judge.md')), { DRIFT: drift }));
console.log(`reviews/loop-${N}/: brief.md, brief-advocate.md, brief-judge.md${drift ? ', calibration.png' : ''} (${Object.keys(byId).length} moments, tier ${TIER})`);
