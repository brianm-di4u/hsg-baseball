# Loop 3 changes (facts only)

## Presentation and UI
- **Result calls** ("OUT", "SAFE", "HOME RUN · 400 FT" and so on) are now a broadcast-style panel:
  - a dark rounded panel with an accent bar in the call's colour;
  - the headline, and the detail after " · " on a second, smaller line;
  - a 0.22 s slide-in and a 0.25 s fade-out.
  - A home-run call stays up 3.5 s, through the trot; other calls stay 1.3 s.
- **The field-view broadcast camera** is closer and tighter:
  - desktop distance 150 ft (was 175), vertical FOV 34° (was 40°);
  - portrait distance 130 ft (was 150), FOV 54° (was 60°);
  - height 54 ft (was 62).

## Animation
- On catches and pick-ups, the glove arm reaches for the arriving ball (two-bone IK on the glove side, right-handed throwers) during the 0.35 s before possession.

## Lighting (night)
- Night ambient is lower: hemisphere 0.36 (was 0.55), moon 0.6 (was 1.0).
- Tower spotlights are brighter (2.3, was 1.5), with a tighter cone and a softer edge, so the pools fall off toward the corners.
- On the high tier, the banks nearest home also cast shadows (1024² maps), so players get several soft shadows.

## Players
- **Uniform:**
  - The jersey and pants sit closer to the body: jersey 0.055 ft (was 0.07), pants 0.075 ft (was 0.1), knee ease 0.03 ft (was 0.05).
  - The chest is relaxed 22 times (was 12) before inflation.
- **Neckline:**
  - It is cut by one plane for every face of the neck, collar bones and upper chest, lower at the front than at the back.
  - A 0.08 ft collar band in the trim colour is bounded by a second parallel cut.
  - Sleeves have a cuff band in the trim colour between two straight cuts. These replace the one-face piping row of loop 2.
- **Cap:** the crown's rim drops 0.2 ft at the back to cover the nape. Hair stays hidden under caps and helmets.
- **Masks:** the cage sits 0.07 ft off the face (was 0.18).
- **Jersey decals:** the front lettering sits 0.5 ft above the chest bone (was 0.22, which put it at the stomach). The back number sits at 0.4 ft (was 0.15).
- **Skin light:** the self-light gains a small constant floor, so dark skin keeps visible features in shadow.

## Animation
- **Run:** now CMU 16_55, the take with the strongest arm drive (was 09_01). Runners' hands close to loose fists.
- **Swing:**
  - The clip starts 0.5 s before contact (was 0.35 s).
  - Its first 0.12 s, the load and stride, plays while the pitch is in flight, so the batter strides into the ball whether or not he swings.
  - The swing proper then runs from the swing start to contact.
- **Retarget:** rest alignment now matches whole bone frames (axis plus the character's forward), not only bone directions.

## Performance (medium tier, phones)
- No camera fill light on the medium tier: one light fewer per pixel. Skin keeps its own light floor.
- Pixel-ratio cap is 1.35 (was 1.5). Medium-mobile GPU worst is 0.78 ms over three runs (estimated phone 19.5 ms; loop 2 measured 1.26 ms).

## UI
- Keyboard and mouse hints are hidden on touch (coarse-pointer) devices, in landscape too.
- **Field camera:** it now eases out from the duel camera's computed pose, not from the last frame drawn. The start of the ease used to depend on frame timing.
