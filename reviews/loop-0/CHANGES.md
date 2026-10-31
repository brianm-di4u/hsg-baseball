# Loop 0 changes (facts only)

Loop 0 is the **baseline**: the game as shipped in visual v2, captured with `?v3=0` so the v2 players are on screen.

- Visual content is unchanged from v2. Players are the v2 Blender capsule model (`art-src/blender/player.py`, about 9.7k triangles, 26 bones, 14 clips).
- Capture tooling added: a frozen ambient clock, a close-up camera, a GPU timer and forced quality tiers.
- The ball's spin is now derived from its position instead of accumulating per frame. This was for reproducible frames.
- No perf or fidelity changes, and no fidelity metric is reported for this loop.
- The v3 player work exists in the tree but is switched off by `?v3=0` for every loop-0 capture.
