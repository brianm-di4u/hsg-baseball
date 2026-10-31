# Loop 2 changes (facts only)

## Animation
- Four clips are now CMU motion capture (free for any use; credit in SAMPLES.md), retargeted to the v3 rig:
  - **pitch:** subject 124, take 01. The delivery runs from the set through the leg lift to release, time-warped so release lands at 0.867 s; the follow-through follows.
  - **bat_swing:** take 124_07, from 0.35 s before contact. Contact lands at 0.267 s; the finish follows.
  - **bat_stance:** a slow loop of the stance just before that swing.
  - **throw:** take 143_20, with release at 0.333 s.
  - **run:** take 09_01, one gait cycle, in place, as a 16-frame loop.
- The other clips are unchanged (the v2 retarget).

## Players
- The back number reads the right way round on v3 jerseys. It was mirrored before.
- The jersey's row of faces along the neckline and the sleeve hems is coloured in the trim colour (collar band and cuff piping).
- Caps: the bill covers the front 120° only and tapers to the sides, instead of a half brim. Cap and helmet domes have more segments and are smooth-shaded, as are the mask, glove and catcher's gear.
- The stocky build is heavier and a little shorter.
- Skin gets a small self-light term (9% of its albedo), so faces under brims and helmets keep some definition.

## Lighting
- The camera-side fill light goes from 22% to 30% of the sun.

## Environment
- The painted crowd strip on the stands is at half its former scale: about three rows of fans per 36 ft tile, so fans are life-size next to the players.

## Presentation
- In close-up frames, the ball is sized for the close camera. Before, its minimum size was computed for the far camera, so it looked huge.

## Performance
- Clips keep only rotation tracks plus the pelvis's travel, and are key-optimized.
- Each body form is built the first time an actor wears it.
- The pack's base64 strings are released after parsing.
- Per-frame passes reuse temporaries.
- These landed after loop 1's captures; loop 1's perf.json already measured them.
