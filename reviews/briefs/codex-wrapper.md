# Running Critic B (Codex)

Delegate through the `codex:codex-rescue` subagent (the Codex companion), working from `C:\Video Game Projects`. The Codex Windows sandbox can't read under `C:\Users\brian\`, so every input lives under the repo `C:\Video Game Projects\repos\hsg-baseball`.

- **Effort:** `--effort medium` for routine loops; `high` for loop 0 and for the final loop.
- **Mode:** read-only. Codex must not write files. Its final message is the review.
- **Prompt passed to Codex** (verbatim, with N filled in):

> You are Critic B in an adversarial visual review. Read and follow `repos/hsg-baseball/reviews/loop-N/brief.md` exactly, with role `critic-codex`; its paths are relative to `repos/hsg-baseball/`. Open the PNG files it lists and look at them (they are images: view them, don't parse them as text). Compare against `repos/hsg-baseball/benchmarks/*.png` and, if present, `repos/hsg-baseball/art-src/samples/reference-renders/`. Do not read `reviews/HISTORY.md`, `reviews/history.json`, any other `reviews/loop-*` folder, or any `critic-*.md`, `advocate.md` or `judge.md` file. Do not modify files. Return the full review as your final message, ending with the fenced json block the brief asks for.

- **If Codex can't view images:** it says so, and the run is repeated with the contact sheets attached as image inputs. Never let Codex score from file names or metadata. A review that admits it couldn't see the images is discarded.
