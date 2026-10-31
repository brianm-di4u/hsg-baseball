# Loop 7 changes (facts only)

## Players
- **Batting helmets and caps:** the front of the rim rides up to the brow (helmet 0.12 ft, cap 0.04 ft higher at the front than round the sides), so the brim sits above the eyes. The helmet's lower edge is one continuous shell round the sides and back, deepest over each ear (0.42 ft below the band) and 0.12 ft at the back, tucking in toward the jaw. Before, each ear flap was a separate panel that read as a strap. Helmets are less glossy (roughness 0.62, was 0.38), so a brim facing the sky no longer reads white.
- **Masks:** the cage runs from the brow to just below the measured chin (0.49–0.56 ft tall by build; was 0.68 ft, which reached the chest).
- **Neckline:** the neck opening has straight sides 0.27 ft either side of the neck, and the collar band follows them round. Before, the neckline was one plane, which ran out along the tops of the shoulders in spikes.
- **Shoulders:** over the shoulders and sleeves the cloth is relaxed less (5 passes, was 22) and sits closer (0.6× the garment thickness), so the shoulders follow the anatomy instead of a padded slab, and more neck shows. All three builds have a little less muscle (lean 0.55, average 0.68, stocky 0.8).
- **Jersey lettering:** the front word is narrower (0.8 ft, was 0.92), so it stays on the chest when the torso turns. Both decals stand 0.045 ft off the cloth (was 0.03) with a stronger depth offset, so the placket piping no longer cuts through letters.
- **Foot planting** (high and medium; idle, ready, stance, bunt and umpire clips): a foot within 0.3 ft of the ground comes down flat onto it. Two-bone leg IK bends the knee to lower the ankle, the foot returns to its rest orientation (heel, ball and edges down) keeping the clip's heading, and the toes straighten. It blends in and out with the clip weight and works on left-handed (mirrored) rigs too. Before, only the lowest sole was grounded; the batter's other foot hovered about 0.07 ft up with its toe raised.

## Animation
- **Ball possession:** once a fielder has the ball, it is drawn in his glove (from the catch until the throw), and in his throwing hand from the start of the throw until release. Before, the held ball was drawn at the sim's point at his feet.

## Tools
- `perf-review.mjs --repeat=N` measures each scene N times and keeps the medians. GPU timer readings vary run to run: the loop-6 medium-mobile night reading of 1.33 ms re-measured at 0.68–0.75 ms (`reviews/loop-6/perf-gpu-repeat.json`). Loop 7's perf rows are medians of 3.
