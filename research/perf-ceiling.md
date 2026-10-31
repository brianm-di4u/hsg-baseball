# Player complexity ceiling (visuals v3, phase 2)

Measured 2026-10-30 with `tools/perf-ceiling.mjs`. The raw rows and medians are in `perf-ceiling.json`.

**What was measured.** The busiest scene in the game is a ground ball with the bases loaded: 14 skinned actors moving, the home park, full lighting. The v2 player was re-meshed to fixed triangle budgets by `art-src/blender/ceiling.py`, keeping the same rig, clips and regions, and loaded with `?players=ceiling-<k>`. Two extra variants:
- `+tex`: synthetic albedo and normal maps on every player.
- `-fingers`: 30 extra bones.

Each config ran 3 times per profile, interleaved. The table gives medians.

"Scene tris" counts every pass three.js drew, the shadow pass included.

| Config | Scene tris | Desktop high fps (GPU ms) | Mobile viewport, medium, unthrottled (GPU ms) | Phone proxy fps (p95 ms) | Software GL fps (p95 ms) |
|---|---:|---:|---:|---:|---:|
| v2 player (9.7k) | 366k | 479 (1.25) | 818 (0.87) | 55 (28) | 14.9 (87) |
| 2k | 150k | 499 (1.18) | 874 (0.88) | 56 (29) | **23.7** (47) |
| 5k | 234k | 534 (1.02) | 819 (0.85) | 60 (33) | 19.5 (69) |
| 10k | 366k | 471 (1.30) | 821 (0.98) | 80 (28) | 13.7 (110) |
| 20k | 654k | 504 (1.20) | 838 (0.92) | 56 (30) | 8.5 (136) |
| 40k | 1,210k | 637 (1.08) | 884 (1.04) | 56 (35) | 5.0 (362) |
| 80k | 2,334k | 636 (1.47) | 833 (1.17) | 99 (32) | 2.8 (635) |
| 20k + 1k maps | 654k | 482 (1.16) | 815 (0.87) | 94 (16) | 5.7 (299) |
| 20k + 2k maps | 654k | 472 (1.33) | 802 (0.90) | 40 (29) | 5.9 (274) |
| 20k + 30 finger bones | 654k | 444 (1.21) | 727 (0.90) | 38 (32) | 9.0 (137) |

## Reading it
- **Desktop (RTX 5060).** The triangle count barely costs anything. GPU time rises from 1.2 ms to about 1.5 ms between 2k and 80k per player (2.3 M scene tris), and fps stays over 440 with vsync off. Geometry doesn't limit the high tier; download size and memory do.
- **Phone proxy (4× CPU throttle).** About 55 fps whatever the triangle count. Skinning runs on the GPU, so the throttled CPU is spent on game logic, the mixers and draw submission, not geometry. Run-to-run noise is large (±25 fps), so the finger-bone and 2k-map rows aren't evidence of a cost.
- **Phone GPU (estimate).** These numbers can't be measured here. A mid-range phone GPU has about 1/25 of an RTX 5060's throughput (FP32, 0.6–1.5 vs about 19 TFLOPS; an estimate, not a measurement). At the phone's pixel load, that maps the unthrottled 0.87–1.17 ms to about 22–29 ms a frame. The estimate is dominated by fill rate, not triangles:
  - 20k config: about 23 ms, within the 26 ms budget (30 fps with 20% headroom).
  - 80k config: about 29 ms, over budget.
  - Phones also pay more per vertex than this ratio suggests. **The medium tier stays at or below about 650k scene tris.**
- **Software GL (SwiftShader, CPU rasterizer).** The only profile where triangles dominate. 2k per player is 60% faster than today's v2 model; textures cost a further 35%.

## Budget per tier (players)
| Tier | Who | LOD0 (close, replays) | LOD1 (duel, broadcast) | LOD2 (field, far) | Skin map | Pack |
|---|---|---|---|---|---|---|
| high | desktop | ≤ 30k tris (download-bound) | ≤ 9k | ≤ 2.6k | 2048² | ≤ 10 MB |
| medium | phones, coarse pointer | — | ≤ 9k (the closest players) | ≤ 2.6k | 1024² | ≤ 4 MB |
| low | software GL, governed-down devices | — | — | ≤ 2.6k, or the v2 player until a low pack exists | none | eager |

- **Scene caps:** high ≤ 1.6 M tris including shadows; medium ≤ 650k.
- **Bones:** the 53-bone MPFB game-engine rig plus 8 accessory bones. No bone cost was measurable.

The LOD switch heights (`LOD_PX` in `render3d.js`) start at 190 px and 70 px of player height. The phase-4 fidelity metric (pixel error against the hero at game sizes) retunes them.

## Caveats
- One machine. The phone numbers are a CPU-throttle proxy plus a GPU ratio, not a real phone. A real-device check over LAN is welcome but not required.
- A synthetic ladder: the subdivided v2 mesh. The real v3 players are re-measured in every loop's `perf.json`. Those numbers decide, not this table.
