# Loop 1 changes (facts only)

## Players (v3)
- **New source.** Every player, the umpire and the coaches are built from CC0 MakeHuman/MPFB2 bodies (`art-src/blender/players/build_players.py`).
- **Body builds.** Three builds, assigned per player id:
  - lean, about 6 ft 3
  - average, about 6 ft 0
  - stocky, about 5 ft 9
- **Rig.** MPFB's 53-bone game-engine rig, with five-finger hands, plus 8 accessory bones.
- **Faces and skin.** MakeHuman faces and eyes, with short hair and brows. The skin carries a MakeHuman skin detail map, light or dark by skin tone, tinted per player.
- **Uniform.** Cut from the body surface:
  - the jersey and loose pants, relaxed and inflated, with the anatomy smoothed out underneath;
  - straight cut lines at the belt, the pant hem, the sleeve hems and the neckline;
  - an undershirt sleeve in the trim colour, stirrup socks and a belt.
- **Feet.** Fitted CC0 MakeHuman shoes replace the bare sock ends.
- **Headwear.**
  - A cap fitted to the skull at the brow band, with a bill.
  - A batting helmet with ear flaps.
  - A catcher's and umpire's mask cage.
- **Catcher's gear.** A chest protector and shin guards with relaxed outlines.
- **Glove.** A mitt shaped on the left hand.
- **Bat.** A turned bat.
- **Detail levels, per tier pack:**
  - LOD0 28k tris, LOD1 9k, LOD2 2.6k.
  - High tier: all three levels, 2048² skin maps, 8.4 MB pack.
  - Medium tier (phones): LOD1–2, 1024² maps, 3.5 MB pack.
  - Low tier and software GL: unchanged v2 players.
  - Packs load after the game is up. LOD is switched by on-screen height: LOD0 above 200 px, LOD1 above 45 px.
- **Clips.** The 14 v2 clips are retargeted to the new rig (a world-space delta retarget with a rest alignment). Clip timing is unchanged.
- **Runtime posing:**
  - Foot grounding puts the lowest sole on the ground for every clip except run and cheer.
  - Finger curl for bat and glove hands.
  - Two-bone IK puts the batter's left hand on the handle (right-handed batters only).
- **Hair** is hidden under caps and helmets.

## Lighting
- The sun's shadow normal bias drops from 0.4 to 0.06 ft, so shadows meet the feet.
- Instanced contact shadows sit under each foot (one draw call).
- A shadowless fill light comes from the camera side at 22% of the sun.

## Environment
- The press box behind home is hidden whenever the camera sits behind it on the same side. In the high-home field camera it no longer fills the bottom of the frame.

## Captures (harness, not game)
- R11 now really is a replay. The setup waits for the next pitch before starting the replay; before, it never started, so the frames were frozen.
- R03, R04, R07 and R10 motion strips frame their player through the close camera (the pitcher's delivery, the swing, the shortstop, the home-run trot). Before, the strips were full-frame and the players were too small.
- R10 now starts later in the trot.

## Performance (after the captures, before the perf runs; nothing drawn differently)
- Clips keep only rotation tracks plus the pelvis's travel, and are key-optimized. The exporter's per-bone position and scale tracks were evaluated every frame for nothing.
- The pack's base64 strings are released after parsing.
- Each actor builds a body form only the first time it wears that build.
- Grounding, contact-shadow and LOD passes reuse temporaries and read bone matrices after a single scene matrix update.
