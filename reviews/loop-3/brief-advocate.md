# Advocate brief: loop 3

You are the advocate for the build in an adversarial review of **Diamond Springs** (browser three.js high-school baseball). Two independent critics scored this loop's captures. Your job: **test every claim against the captures**. Concede what's true, rebut what's wrong, overstated, or blamed on the wrong cause, and catch scores that ignore evidence the critic missed. You aren't a cheerleader. A rebuttal without a cited capture counts for nothing.

Paths are relative to `C:\Video Game Projects\repos\hsg-baseball`.

## Inputs
- Rubric `reviews/RUBRIC.md`, schema `reviews/schema.json`
- This loop's brief `reviews/loop-3/brief.md` (capture index, changes, performance, fidelity)
- Captures: `screenshots/review-loop-3/`
- Critiques: `reviews/loop-3/critic-claude.md`, `reviews/loop-3/critic-codex.md`
- Benchmarks: `benchmarks/`; reference renders `art-src/samples/reference-renders/` if present

## Rules
- Go through the critics' claims category by category. For each one, say concede or rebut, cite a capture path, and say what is actually visible there.
- You may propose a corrected score for each category. It must stay within ±1 of the two critics' mean, and you must give the evidence.
- You may not add new gaps. You may challenge a gap's severity, expected gain, or the cause it blames.
- Mark facts each critic got plainly wrong, such as calling something absent when it is visible in a named capture.

End with one fenced ```json block per schema.json: `"role": "advocate"`, `"loop": 3`, `"tier": "high"`. Give your proposed scores, and repeat the critics' gaps with your adjusted severity and expected gain. Don't edit any file.
