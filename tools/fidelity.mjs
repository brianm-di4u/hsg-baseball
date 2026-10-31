#!/usr/bin/env node
// Character fidelity metrics for review loop N: runs tools/fidelity.py in headless Blender on the built average
// player (art-src/blender/players/out/body-average.blend) and writes reviews/loop-N/fidelity.json, which
// tools/review-prep.mjs puts in the briefs. BLENDER overrides the Blender path.
//
//   node tools/fidelity.mjs <N> [--build=average]
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const N = +args.find((a) => /^\d+$/.test(a));
if (!(N >= 0)) { console.error('usage: fidelity.mjs <N> [--build=average]'); process.exit(2); }
const build = (args.find((a) => a.startsWith('--build=')) || '--build=average').slice(8);
const blend = path.join(ROOT, 'art-src', 'blender', 'players', 'out', `body-${build}.blend`);
if (!fs.existsSync(blend)) { console.error(`no ${path.relative(ROOT, blend)}: run art-src/blender/players/build_players.py first`); process.exit(1); }
const B = process.env.BLENDER || 'C:\\Program Files\\Blender Foundation\\Blender 5.2\\blender.exe';
const out = path.join(ROOT, 'reviews', `loop-${N}`, 'fidelity.json');
fs.mkdirSync(path.dirname(out), { recursive: true });
const log = execFileSync(B, ['-b', blend, '--python', path.join(ROOT, 'tools', 'fidelity.py'), '--', '--out', out,
  '--ref', path.join(ROOT, 'art-src', 'samples', 'reference-renders', 'mpfb2_athlete')], { encoding: 'utf8', maxBuffer: 64 << 20 });
const line = log.split('\n').find((l) => l.startsWith('FIDELITY'));
if (!line) { console.error(log.slice(-3000)); process.exit(1); }
fs.rmSync(path.join(path.dirname(out), '_fidelity'), { recursive: true, force: true });
console.log(line);
console.log(`→ ${path.relative(process.cwd(), out)}`);
