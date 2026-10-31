# Loop 9 changes (facts only)

## Animation
- **Swing timing:** while the pitch is in flight, the batter plays the swing clip's whole stride (clip 0–0.2 s: the front foot lifts, peaking at 0.12, and lands), on every pitch, swing or take. Before, only the first 0.12 s played, so the stride stopped at its highest point. On the swing press, only the hands firing (clip 0.2–0.267, to contact) plays, over the sim's swing lag (0.1 s real), then the follow-through runs on at the clip's own speed through the result. Before, the swing from mid-stride to contact was squeezed into the swing lag, and the follow-through snapped to its finish when the result came up.

## Mobile / readability
- **Portrait field camera:** higher and steeper (88 ft up, was 54; 135 ft back, was 130), aimed 14 ft further toward center field. Its field of view now comes from the screen's shape, about 40° across (vertical about 64° on a 390 × 844 phone; was a fixed 54° vertical, about 29° across). Both corner bases, all four infielders and the runner are now in frame on a ground ball. Before, first and third base and their fielders were cut off.

## Players
- **Jersey lettering:** the decals sit 0.02 ft off the cloth (was 0.045; the camera-side depth pull from loop 8 keeps them on top), so the oblique edge of the word no longer stands away from the chest. The jersey-colour letter outline is thinner (10% of the letter height, was 17%).
- **Cleats:** plain black uppers on a near-black sole. The white side stripe, cut by faces across the coarse shoe mesh, showed as jagged white patches.
- **Skin light:** the skin's self-light floor is higher (diffuse × 0.22 plus a small warm constant, was × 0.16 and a smaller constant), so faces under a brim keep their features in daylight.
- **Heels:** the cleats' heel vertices were weighted to the calf bone (MakeHuman's shoe), so a bent knee lifted the heel off the dirt. Below the ankle, the calf's weight now goes to the foot bone, so the heel turns with the foot.
- **Contact shadows:** tighter and darker at the sole's edge (0.5 × 1.25 ft at full size, nearly opaque out to 60% of the radius; was 0.62 × 1.35 ft and softer).

## Environment
- **Sponsor boards:** every board surface (the stand front behind home and the two curved backstop runs) shows a whole number of boards, starting and ending on a board's edge. Before, the 72-ft texture repeat cut boards and names at the ends ("RIDGE|LINE"), and where a cut end met the next surface the boards read as overlapping.
