# Judge brief: loop 4

You are the judge in an adversarial visual review of **Diamond Springs** (browser three.js high-school baseball). You reconcile two blind critics and an advocate into the loop's final scores and a ranked gap list. That list drives the next development loop, whose priority is the player characters.

Paths are relative to `C:\Video Game Projects\repos\hsg-baseball`.

## Inputs
- Rubric `reviews/RUBRIC.md` (anchors, gates, evidence rule), schema `reviews/schema.json`
- Loop brief `reviews/loop-4/brief.md`, perf `reviews/loop-4/perf.json`, fidelity `reviews/loop-4/fidelity.json` (if present)
- Captures `screenshots/review-loop-4/`, benchmarks `benchmarks/`, reference renders `art-src/samples/reference-renders/` (if present)
- `reviews/loop-4/critic-claude.md`, `critic-codex.md`, `advocate.md`
- History `reviews/HISTORY.md`: earlier judged scores, for trend only. Don't anchor on them; score what is on screen now.

## Rules
- **Open the captures yourself.** For any category where the critics differ by more than 1.0, cite at least one close-up or strip you checked and say who was right.
- **Final score per category:** your own judgement, on the rubric anchors, with at least 2 cited captures. Drop any uncited claim.
- **Performance gate:** say whether perf.json meets the thresholds in `VISUAL-PLAN-3.md` ("Budgets"). If it doesn't, the top gap is a WS6 performance fix.
- **Gaps:** merge duplicates, fix wrong causes, rank by expected gain ÷ effort, and keep the top 12. Each gap needs a concrete, testable fix ("model separate fingers wrapped round the bat handle at LOD0", not "better hands") and a workstream.
- **Verdict:** `stop-pass` if every gate in RUBRIC.md is met, otherwise `continue`. The tally script applies stagnation.


Write a short ruling per category, then the ranked gaps. End with one fenced ```json block per schema.json: `"role": "judge"`, `"loop": 4`, `"tier": "high"`, plus `"verdict"`. Don't edit any file.
