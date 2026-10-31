# Loop 8 changes (facts only)

## Players
- **Shoulders (pose):** the mocap clips (pitch, swing, stance, throw, run) raised both clavicles 25–30° above the rig's rest, a permanent shrug that put the shoulder joints at neck height (measured in game: pitcher and batter shoulder joints 0.03–0.09 ft below the neck base; rest is 0.34–0.36 ft). Each frame now takes each clavicle 75% of the way back to its bind rotation, and turns the upper arm back so the arm keeps the clip's direction. Measured after: 0.22–0.30 ft below the neck base. High and medium tiers.
- **Shoulders (skin weights):** the skin weights over each shoulder are relaxed (14 passes within 0.6 ft of the shoulder joint, only the clavicle, upper-arm and upper-spine shares; each vertex keeps their total), so the deltoid bends more evenly when the arm comes down.
- **Jersey lettering:** the team name is outlined in the jersey colour (a sewn-letter edge), so a letter crossing the placket piping no longer disappears into a stripe of the same colour (the "H" of "HAMILTON"). The lettering texture is 512 × 128 (was 256 × 64). Both decals are drawn 0.12 ft nearer the camera than the cloth under them, so the cloth's bulges between the decal's grid points can't cut through them.

## Animation / grounding
- **Contact shadows:** each foot's contact shadow is a tight dark oval along the foot (0.62 × 1.35 ft at full size, darker in the middle), turned to the foot's heading. Before, it was a round soft spot stretched along the world axis.
- **Sun shadow normal bias** is 0.025 (was 0.06), so a planted foot's shadow starts at the sole rather than a few inches off it. No shadow acne on the high or medium tier in R02, R05, R07 or R16.

## Headwear and gear
- **Brims:** the front of the rim rides higher on the brow (batting helmet 0.18 ft above its side band, was 0.12; cap 0.08 ft, was 0.04), so the brim's lower edge clears the eyebrows.
- **Umpire and catcher masks:** each bar of the cage overlaps its neighbour by the bar's radius, so the cage reads as continuous bars (it showed gaps at every join).
