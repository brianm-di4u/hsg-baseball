#!/usr/bin/env node
// Performance-ceiling study (VISUAL-PLAN-3.md, phase 2): runs tools/perf-review.mjs over the player ladder
// (assets/ceiling-*.js from tools/pack-ceiling.mjs) under each device profile, then writes
// research/perf-ceiling.json with every row and a per-profile summary of the busiest scene.
//
//   node tools/perf-ceiling.mjs [--configs=base,2k,…,20k-fingers] [--profiles=desktop,mobilegpu,phone,soft] [--repeat=3] [--scenes=grounder]
// Each config runs --repeat times per profile; the summary keeps the median of each measure.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const opt = (k, d) => { const a = args.find((x) => x.startsWith(`--${k}=`)); return a ? a.slice(k.length + 3) : d; };
const CONFIGS = opt('configs', 'base,2k,5k,10k,20k,40k,80k,20k+tex1024,20k+tex2048,20k-fingers').split(',');
const PROFILES = {
  desktop: ['--tiers=high', '--viewports=desktop'], // RTX 5060, vsync off
  mobilegpu: ['--tiers=medium', '--viewports=mobile'], // the phone's pixel load at medium, unthrottled: GPU ms for the phone ratio
  phone: ['--tiers=medium', '--viewports=mobile', '--throttle=4'], // CPU proxy for a mid-range phone
  soft: ['--tiers=low', '--viewports=desktop', '--soft'], // SwiftShader: no usable GPU driver
};
const OUT = path.join(ROOT, 'research', 'perf-ceiling.json');
const REPEAT = +opt('repeat', '3'), SCENES = opt('scenes', 'grounder');
const raw = path.join(ROOT, 'screenshots', 'perf-ceiling-raw.json');
fs.rmSync(raw, { force: true });
const query = (c) => { if (c === 'base') return ''; const [m, tex] = c.split('+tex'); return `?players=ceiling-${m}${tex ? `&tex=${tex}` : ''}`; };
// configs interleave within each repeat, so slow drift in machine load spreads across all of them
const rows = [];
for (let k = 0; k < REPEAT; k++) for (const prof of opt('profiles', 'desktop,mobilegpu,phone,soft').split(',')) for (const c of CONFIGS) {
  console.log(`\n== run ${k + 1} · ${prof} · ${c}`);
  fs.rmSync(raw, { force: true });
  execFileSync(process.execPath, [path.join(ROOT, 'tools', 'perf-review.mjs'), ...PROFILES[prof], `--scenes=${SCENES}`, `--query=${query(c)}`, `--out=${raw}`], { stdio: 'inherit' });
  rows.push(...JSON.parse(fs.readFileSync(raw, 'utf8')).rows.map((r) => ({ ...r, profile: prof, config: c, run: k })));
}
// earlier rows (--merge) are kept and counted in the medians
let prev = [];
if (args.includes('--merge')) try { prev = JSON.parse(fs.readFileSync(OUT, 'utf8')).rows || []; } catch { /* none yet */ }
prev = prev.map((r) => ({ ...r, profile: r.profile || (r.soft ? 'soft' : r.throttle > 1 ? 'phone' : 'desktop') }));
const all = [...prev, ...rows];
const med = (xs) => { const v = xs.filter((x) => x != null).sort((a, b) => a - b); return v.length ? v[v.length >> 1] : null; };
const summary = {};
for (const prof of [...new Set(all.map((r) => r.profile))]) for (const c of CONFIGS) for (const sc of SCENES.split(',')) {
  const rs = all.filter((r) => r.profile === prof && r.config === c && r.scene === sc);
  if (!rs.length) continue;
  (summary[prof] = summary[prof] || []).push({ config: c, scene: sc, runs: rs.length, fps: med(rs.map((r) => r.fps)), p95: med(rs.map((r) => r.p95)),
    cpuMs: med(rs.map((r) => r.cpuMs)), gpuMs: med(rs.map((r) => r.gpuMs)), tris: med(rs.map((r) => r.tris)), heapMB: med(rs.map((r) => r.heapMB)) });
}
fs.writeFileSync(OUT, JSON.stringify({ made: new Date().toISOString(), configs: CONFIGS, summary, rows: all }, null, 2));
console.log(`\n→ ${path.relative(process.cwd(), OUT)}`);
for (const [p, rs] of Object.entries(summary)) { console.log(`\n${p}`); for (const r of rs) console.log(`  ${r.config.padEnd(14)} ${String(r.fps).padStart(7)} fps  p95 ${String(r.p95).padStart(6)} ms  gpu ${r.gpuMs ?? '?'} ms  ${(r.tris / 1000).toFixed(0)}k tris`); }
