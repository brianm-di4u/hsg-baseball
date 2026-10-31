# Adversarial review loop: protocol

The v3 visual work (`VISUAL-PLAN-3.md`) runs as a loop: **build → test → capture → measure → independent critiques → advocate → judge → tally → develop**. This file is the procedure. `RUBRIC.md` defines the scores and `schema.json` the output shape. Paths are relative to the repository root.

## Roles

| Role | Who | Sees | Must not see |
|---|---|---|---|
| Critic A | Claude subagent, brief `briefs/critic.md` | this loop's captures, the rubric, the benchmarks, the reference renders, the loop brief | any prior score, the other critic, the advocate and judge files |
| Critic B | Codex (GPT-6.1 Sol) through the `codex:codex-rescue` subagent, brief `briefs/critic.md` plus `briefs/codex-wrapper.md` | same as Critic A | same as Critic A |
| Advocate | Claude subagent, `briefs/advocate.md` | both critiques, the captures, CHANGES.md | HISTORY.md |
| Judge | Claude subagent, `briefs/judge.md` | everything above, plus HISTORY.md, perf.json and fidelity.json | — |

The developer (the main session) writes CHANGES.md and inspects every capture before the review. It never edits a reviewer's output.

## Blindness
- The critics run in parallel. Their outputs are held outside the repo (the developer's scratch folder) and copied to `loop-N/critic-claude.md` and `loop-N/critic-codex.md` only after both have returned, so neither can read the other's. The advocate and the judge run one after another and their replies are saved as `advocate.md` / `judge.md`.
- The critic brief carries no prior score and no developer opinion of quality. CHANGES.md lists what changed, never how good it is.
- Every third loop, the judge's brief includes one unlabeled benchmark image (`calibration.png`), to detect reviewer drift. A judge who scores it more than 1 point away from its anchor sets `"drift": true` in `calibration`, and the loop's scores carry a warning.

## The loop (N = loop number)
1. `npm run build`, then `npm test`: all green.
2. `node tools/shots-review.mjs review-loop-N --tiers=high,medium,low --verify`
3. Performance and fidelity:
   - `node tools/perf-review.mjs --out=reviews/loop-N/perf.json` (GPU, desktop and mobile, all tiers)
   - `node tools/perf-review.mjs --throttle=4 --tiers=medium,low --viewports=mobile --out=reviews/loop-N/perf.json` (phone proxy)
   - `node tools/perf-review.mjs --soft --tiers=low --viewports=desktop --scenes=duel,grounder --out=reviews/loop-N/perf.json` (software GL floor)
   - `node tools/fidelity.mjs N` once reference renders exist (writes `reviews/loop-N/fidelity.json`)
4. The developer opens every frame, close-up and strip, and writes `loop-N/CHANGES.md` (facts only).
5. `node tools/review-prep.mjs N` writes `loop-N/brief.md`, `brief-advocate.md`, `brief-judge.md`.
6. Critics A and B in parallel (blind), then the advocate, then the judge (judge.md, with the final JSON block).
7. `node tools/review-tally.mjs N` validates every JSON block, writes `scores.json` and `gaps.json`, updates HISTORY.md, applies the stop rule and prints the ranked backlog for the next loop.
8. Develop the backlog. Check a critic's diagnosis in the game before acting on it. Commit the code together with `reviews/loop-N/` as "Diamond Springs visuals v3: loop N (X/80)", then go to step 1 with N+1.

## Backlog selection
- **Priority** = expectedGain × weight ÷ effort cost.
  - Weight: 1.5 for a gated category below its gate, 1.0 otherwise, 0.3 once the category is 1 above its gate; × 1.25 for the focus categories (characters, charfit, animation).
  - Effort cost: S = 1, M = 2, L = 4.
- A category that drops by 0.5 or more since the last loop forces a regression gap to the top.
- A loop takes about 8 effort points.
- A performance-gate failure is always fixed first.

## Stop rule
- **Pass:** every gate in RUBRIC.md is met and the performance gate passes.
- **Stagnation:** a loop where no category rose by 0.5 or more and the total didn't rise. Stop after 3 stagnant loops in a row.
- **Safety cap:** 12 loops.

On stop, VISUAL-REPORT.md gets the final scores, performance per tier, the complexity budget and the remaining ranked gaps.

## Determinism
Captures freeze the ambient clock (`__game.act('clock', ms)`) and pause the sim between setup steps; every pose comes from sim time. `--verify` re-captures R02, R07 and R12 and fails above 0.5/255 mean difference. Only stateless effects are allowed: no TAA, no temporal accumulation, no history buffers.
