# Diamond Springs: free character sources (visuals v3, Phase 1)

Surveyed 2026-10-30 with web search, page fetches, source APIs and test downloads.
- **Licenses allowed:** CC0, CC-BY, or an explicit "free for any use" grant. NC and ND licenses are excluded.
- **Download rules:** no account was created. Every login-free download sits in its own folder under `art-src/samples/<source>/`, which is git-ignored apart from our scripts and JSON. Downloads are treated as untrusted data: scripts live in `art-src/samples/_scripts/`, and downloaded `.blend` files are opened with `-Y`, so their embedded scripts can't run.
- **Tools:** Blender 5.2.3 LTS, headless.

## Summary
- **Base body: MPFB2 works headless in Blender 5.2.3.**
  - MPFB 2.0.18 (2026-10-10) installs into an isolated Blender profile with the CC0 MakeHuman system assets, and builds, rigs, bakes and exports GLB from a script.
  - The proof athletic male is in `art-src/samples/mpfb2-proof/`:
    - basemesh: 27,488 tris, `game_engine` rig, 53 bones, 1.16 MB GLB with WebP textures;
    - `proxy741` low LOD: 2,192 tris, same rig, 0.30 MB.
- **Animation: CMU has real baseball clips.** Subject 124 has two baseball pitches, a swing, a bunt, an underhand toss and an underhand fast pitch, all 120 fps BVH. CMU also has runs and throw-and-catch clips.
  - MPFB's `cmu_mb` rig matches 29 of the 31 BVH joint names, and only the index-finger bone name differs.
  - No permissive source has a slide, a fielding dive or a grounder pickup. Those stay keyed/IK.
- **Gear:** CC0 bat and ball from Poly Haven, and Smithsonian CC0 scans of a vintage jersey and a stickball bat. Realistic gloves, a catcher's mask and helmets exist only on Sketchfab (CC-BY, login needed), listed for you to download below.
  - Nothing permissive exists for a catcher's mitt, chest protector or baseball cleats.
  - No CC0 or CC-BY source has a realistic rigged ballplayer.
- **Reference set:** 3 models rendered as fixed turnarounds in `art-src/samples/reference-renders/`, with camera JSON and silhouette masks:
  - Blender Studio realistic male, 1.35M tris (clay);
  - MPFB2 high-res textured athlete, 120k tris;
  - Smithsonian jersey scan, 150k tris.
- **Textures:** 7 Poly Haven and 6 ambientCG CC0 fabric and leather sets at 1K. **No CC0 skin or pore texture exists** on either site; MPFB's CC0 skins are the best skin source found.

## 1. Ranked sources

### 1a. Bodies and base characters
| Rank | Source | URL | Version / date | License | Quality | Size | Tris | Rig | Login |
|---|---|---|---|---|---|---|---|---|---|
| 1 | **MPFB2** (MakeHuman for Blender) + **MakeHuman system assets** | https://extensions.blender.org/add-ons/mpfb/ ; assets: https://static.makehumancommunity.org/assets/assetpacks/makehuman_system_assets.html | MPFB 2.0.18, 2026-10-10 (sha256 `c075b3e9…2a2dad`); asset zip sha256 `b542127a…a0107`, 94 assets all tagged CC0 | Output **CC0** (MakeHuman FAQ "Can I sell models created with MakeHuman?", and the 2020 licence change that made the base mesh, targets and proxies CC0 assets). MPFB code is GPL-3.0-or-later, used as a build tool only. | Realistic proportions with macro sliders (gender, age, muscle, weight, height, proportions) plus hundreds of targets. CC0 skins in young/middle/old × African/Asian/Caucasian. Hair cards, procedural eyes, 3-bone fingers. Clothes are generic suits only. | 43.8 MB add-on, 268 MB assets | basemesh 26,756 body tris (27,488 with eyes, brows, lashes); proxy741 1,460 body tris (2,192 total); muscle proxy 26,576; subdiv-1 reference 107k body | `game_engine` 53 bones (UE-style names, fingers), `cmu_mb` 31, `mixamo` 52, `mixamo_unity`, `default` 163, `openpose`, Rigify | No |
| 2 | **Blender Studio Human Base Meshes** | https://www.blender.org/download/demo-files/ (mirror used: https://mirrors.dotsrc.org/blender/blender-demo/asset-bundles/human-base-meshes/human-base-meshes-bundle-v1.4.1.zip) | v1.4.1, zip dated 2026-01-20, 50,643,039 B | **CC0** | Best anatomy found anywhere free: clean quad base meshes with a level-3 multires sculpt. Untextured and unrigged. Realistic and stylized male and female bodies, heads, hands, feet and a skeleton. | 50.6 MB | realistic male: 10,590 base quads; 1,354,880 tris at multires 3 | none | No |
| 3 | Renderpeople "Eric Rigged 001" (Sketchfab) | https://sketchfab.com/models/a46bc9f67aaa415bb4f3241eef900e7f | Sketchfab upload | CC-BY (as shown on the Sketchfab page; Renderpeople's own site licenses differently, so keep the Sketchfab licence page) | Photoreal rigged scan, 8K textures. Best top-end textured human. | 37 MB | 20.5k faces | rigged | **Yes** |
| 4 | Mike Alger "Rigged T-Pose Human Male w 50 Face Blendshapes" (Sketchfab) | https://sketchfab.com/models/cc7e4596bcd145208a6992c757854c07 | — | CC-BY | Rigged scan with 50 face blendshapes, 2K textures | 3.6 MB | 54.7k faces | rigged | **Yes** |
| 5 | Quaternius Universal Base Characters | https://quaternius.itch.io/universal-base-characters | 2025-08 | CC0 | Semi-stylized game characters; matches Quaternius UAL animation | 122 MB | ~13k | humanoid | No (itch "name your price"; no stable direct URL, not downloaded) |
| — | Khronos CesiumMan / RiggedFigure | https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/CesiumMan | — | CC-BY 4.0 | Pipeline test assets only | 438 KB | low | skinned | No |

Excluded: Mixamo (proprietary Adobe terms and an Adobe login); 3D Scan Store and Renderpeople's own-site samples (custom EULAs); Smithsonian human scans (busts and statues only).

### 1b. Animation (mocap)
| Rank | Source | URL | Version | License | Baseball content | Format | Login |
|---|---|---|---|---|---|---|---|
| 1 | **CMU Graphics Lab Motion Capture Database**, cgspeed MotionBuilder-friendly BVH (2010 release) via GitHub mirror | http://mocap.cs.cmu.edu/ ; BVH: https://github.com/sfd158/cmu-mocap (raw: `https://raw.githubusercontent.com/sfd158/cmu-mocap/master/data/<SSS>/<SS_TT>.bvh`) | 2010 BVH release (READMEFIRST v1.1, B. Hahne) | **Free for all uses**. FAQ: "may be copied, modified, or redistributed without permission". Front page: may be included in commercially sold products, but the data may not be resold directly, even converted. Requested acknowledgement: "The data used in this project was obtained from mocap.cs.cmu.edu. The database was created with funding from NSF EIA-0196217." | **124_01 / 124_02 baseball pitch, 124_07 swing, 124_08 bunt, 124_12 underhand toss, 124_13 underhand fast pitch**; throw/catch 141_11, 143_20, 143_22, 33_01; runs 09_01, 09_02, 16_35, 16_55, 35_17, 02_03; run + sudden stop 16_08 | BVH, 31 joints, 120 fps, frame 1 = added T-pose | No |
| 2 | ACCAD Open Motion Project (Ohio State) | https://accad.osu.edu/research/motion-lab/mocap-system-and-data ; sprint: https://accad.osu.edu/sites/accad.osu.edu/files/sprint_BVH.ZIP | 2001 files | CC-BY 3.0 (per the page) | Sprint (`ericrun.bvh`). Male1/Female1 running sets (C3D). No throw, catch or slide. | BVH / C3D | No |
| 3 | Quaternius Universal Animation Library (UAL 1 v3.0, UAL 2) | https://quaternius.itch.io/universal-animation-library | v3.0, 2026-06-16 | CC0 | 120+ clips: locomotion, jog, sprint with root motion. No baseball. | glTF/FBX, Mixamo-style rig, 15 MB | No (itch flow; not downloaded) |
| 4 | 100STYLE (Ian Mason) | https://zenodo.org/record/8127870 (file: `https://zenodo.org/api/records/8127870/files/100STYLE.zip/content`) | 2022-05-04 | CC-BY 4.0 | 100 walk/run styles, no sports actions | BVH, 1.47 GB | No (not downloaded, too large for the value) |
| 5 | Rokoko free packs ("12 free sports", "16 walk/run") | https://www.rokoko.com/resources/rokoko-mocap-12-free-sports-animations | — | Custom: "passion project to commercial use". **Not CC**; keep a copy of the terms if used. | Sports clip names not listed | FBX, 30 fps | Name/email form |

Excluded:
- Bandai-Namco Motiondataset 1 and 2: CC BY-NC 4.0.
- AMASS: non-commercial research licence.
- KIT Whole-Body database: no primary licence text found; secondary sources say research-only. It mirrors the same CMU 124 trials anyway.
- **Driveline OpenBiomechanics:** the only real pro pitching and hitting mocap (411 pitches, 677 swings, C3D), but CC BY-NC-SA 4.0 with a pro-sports exclusion. Study only, never shipped.

### 1c. Baseball models and gear
Login-free (downloaded):

| Rank | Item | URL | License / author / date | Tris | Size | Notes |
|---|---|---|---|---|---|---|
| 1 | **Baseball Bat** (worn wood, taped grip) | https://polyhaven.com/a/baseball_bat | CC0, Enrique Martín, 2023-12 | 2,672 | 2K glTF set 6.0 MB | Best bat: realistic, PBR (diff, nor_gl, arm). 1K/4K also available. |
| 2 | **Baseball 01** (red stitching) | https://polyhaven.com/a/baseball_01 | CC0, Rico Cilliers, 2021-06 | 10,848 | 2K set 2.9 MB | Best ball. Bake down for in-game use. |
| 3 | **Marge Villa jersey** (AAGPBL scan) | https://3d.si.edu/object/3d/marge-villa-jersey:c0c953ae-8539-436a-8f32-81bd88bc9d5a | CC0, Smithsonian NMAH | 150,000 | 6.5 MB glb, 4K textures | Vintage uniform: placket, collar, sleeve trim, felt lettering. Fabric and kit reference. |
| 4 | **Slugger's stickball bat** (scan) | https://3d.si.edu/object/3d/sluggers-stickball-bat:aeb8fc1d-9392-4a1e-8faa-fce19b25f5a5 | CC0, Smithsonian NMAH | 150,000 | 7.0 MB glb | 43-inch stickball bat, not regulation. Wood and wear reference only. |
| 5 | Baseball cap (Poly by Google) | https://poly.pizza/m/aaC5GgcWEhM | CC-BY 3.0, "Poly by Google" | 416 | 10 KB | Low-poly cap silhouette only. |
| 6 | Shoes (Poly Pizza; cleat stand-in) | `https://static.poly.pizza/1ff5c477-e9c2-4e72-bfe7-5aaf0d2f85bb.glb` | CC-BY 3.0 per the survey; **page and author not verified** | 8,342 | 145 KB | Confirm the author before shipping anything from it. |

Also login-free, not downloaded (lower value):
- OpenGameArt "old wooden baseball bat" / "old baseball" (CC0, LonesomeDucky, 2025-03), https://opengameart.org/content/old-wooden-baseball-bat
- Poly Pizza bats (CC0, 320–1,076 tris).

Not found in any permissive source: Kenney (no baseball in 3D); Poly Pizza catcher's gear or helmet; any CC0 Sketchfab baseball item.

**Needs an account: please download these yourself** (Sketchfab requires login for every download):

| Item | URL | License / author | Faces, textures, GLB size | Use |
|---|---|---|---|---|
| **Baseball glove** (Mizuno, Artec scan) | https://sketchfab.com/models/5b54ed8243804b6baa399a61439fe5e1 | CC-BY, Laser Design, 2022-04 | 1.95M, 8K, 91.7 MB | **Top glove reference**; retopologize |
| Baseball glove (photogrammetry) | https://sketchfab.com/models/35b2e174e07047f4a7d3442b5ed921c0 | CC-BY, leadblacktech, 2017-04 | 2.16M, 4K, 102.6 MB | Second glove scan |
| Baseball gloves (closest to game-ready) | https://sketchfab.com/models/e7f88026659a46128ee84611015441db | CC-BY, puihung, 2015-07 | 48k, 4K, 3.5 MB | Game glove base. Lighter options: https://sketchfab.com/models/f4652dd83c134e17a730e02a2cdd234e (m.lando, 25k), https://sketchfab.com/models/fb5e5bea26834428884b8e670a7604e8 (Karamgill, 26k) |
| **Catcher's mask** (1950s museum scan) | https://sketchfab.com/models/0774e145e8644b91a792c462e7ff3aa7 | CC-BY, Santa Cruz Museum of Art and History, 2016-12 | 150k, 4K, 9.7 MB | The only permissive catcher's mask |
| **Batting helmet** | https://sketchfab.com/models/d57310b328e043648447cf6bf0ba3131 | CC-BY, Microsoft, 2015-04 | 50k, untextured, 1.2 MB | Clean shape. Alternatives: https://sketchfab.com/models/b0fea0d8a5a54777acfc99fe482adccc (3.7k, 2K), https://sketchfab.com/models/a6585196e875436fbdf88169b5fa2cce (843k, 8K) |
| Baseball cap | https://sketchfab.com/models/1c1d34d73fd94e6b9e8f82b1eb7194a0 | CC-BY, vanart, 2017-07 | 93k, 8K, 151 MB | Cap reference |
| Worn baseball | https://sketchfab.com/models/fdf3de6ae225421ea78961b897b9608a | CC-BY, Alex Bes, 2017-06 | 1,044 tris, 4K | Game-ready ball |
| Wooden bat | https://sketchfab.com/models/4d4999c71939470d9838c44c02a3106e | CC-BY ("Made by Rotten Design"), 2026-10 | 768, 4K | Game-ready bat |
| Renderpeople Eric Rigged 001 | https://sketchfab.com/models/a46bc9f67aaa415bb4f3241eef900e7f | CC-BY | 20.5k, 8K, 37 MB | 4th reference model (textured photoreal); see §2 |
| Mike Alger rigged male with 50 blendshapes | https://sketchfab.com/models/cc7e4596bcd145208a6992c757854c07 | CC-BY | 54.7k, 2K | Face-blendshape reference |
| Shin guards | https://sketchfab.com/models/35d8013ed80640e2a82284711285b1b7 | CC-BY, tmacscad11 | 235k, untextured | Probably soccer style; check before use |

Sketchfab notes:
- **Search filter IDs:** CC0 = `7c23a1ba438d4306920229c12afcb5f9`, CC-BY = `322a749bcfa841b29dff1e8a1bb74b0b`. `b9ddc40b…` is CC-BY-SA, not CC-BY.
- **Re-upload trap:** avoid user "mohamedhussien". That account re-uploads other people's assets as CC-BY; its "cryan uniform" is the Smithsonian CC0 jersey above.
- **Excluded Smithsonian items:** "Usage Conditions Apply", not CC0. These are the Mariano Rivera glove, the Roberto Clemente helmet and jersey, and the Rendon cap.
- **BlenderKit is excluded:** it needs a login and an add-on, and its free licence is custom ("Royalty Free"), not CC.

### 1d. Detail textures (CC0, downloaded at 1K)
| Source | Assets | URL pattern | Use |
|---|---|---|---|
| Poly Haven (CC0) | `cotton_jersey`, `jersey_melange`, `waffle_pique_cotton` (mesh/pique), `stretch_poplin` (twill-like), `brown_leather`, `leather_white`, `fabric_leather_01` (stitched) | `https://api.polyhaven.com/files/<slug>` → `https://dl.polyhaven.org/file/ph-assets/Textures/jpg/1k/<slug>/<slug>_{diff,nor_gl,rough,arm}_1k.jpg`. The API rejects Python's default user agent; use curl. | Jersey knit/mesh normal and detail maps, glove leather, stitched leather |
| ambientCG (CC0) | `Fabric070` (sportswear), `Fabric048` (polyester vest), `Fabric081A` (plastisol print, for numbers), `Leather038` (smooth brown), `Leather035A` (white stitched), `Leather034C` (stitched) | `https://ambientcg.com/get?file=<ID>_1K-JPG.zip` | Same |
| Skin / pores | **none on Poly Haven or ambientCG** | — | Use MPFB's CC0 skin albedo (`young_*_male` etc.); the 8K albedo on the Renderpeople CC-BY scan is the best photoreal option (login) |

## 2. Highest-quality reference set
Rendered with `art-src/samples/_scripts/render_turnaround.py` into `art-src/samples/reference-renders/`. The index is `reference-set.json`.

| Prefix | Model | License | Tris | Height | Role |
|---|---|---|---|---|---|
| `hbm_male_realistic` | Blender Studio Human Base Meshes v1.4.1, "Body Male - Realistic", multires 3 | CC0 | 1,354,880 | 1.69 m | Top-end anatomy and silhouette (clay, untextured) |
| `mpfb2_athlete` | MPFB2 high-res athletic male: subdiv 1, SSS skin, procedural eyes, teeth, short02 hair, A-pose | CC0 | 120,536 | 1.94 m | Textured face, eyes, skin and hands; same topology family as the recommended base body |
| `si_jersey` | Smithsonian Marge Villa jersey scan | CC0 | 150,000 | 0.71 m | Uniform cloth, placket, collar and lettering (body views only) |
| `mpfb2_game27k_glb` *(baseline, not reference)* | The 27k proof GLB, rendered from the exported file | CC0 | 27,488 | 1.93 m | Recommended base body at game resolution |

**Render recipe.** These settings are fixed so loops can compare against them:
- **Image:** 1024 × 1024. Cycles on the GPU (first available of OptiX, CUDA, HIP or oneAPI), 128 spp, OIDN denoise, seed 0. Standard view transform, look None.
- **Lighting:** three soft suns: key 3.0 at (45°, 0, −30°) with a 20° angle; fill 1.3 at (70°, 0, 55°) with 40°; rim 2.0 at (60°, 0, 180°) with 10°. World is grey 0.214 linear at strength 0.6.
- **Outputs per view:** `<prefix>_<view>.png` composited over sRGB 0.5 grey, and `<prefix>_<view>_mask.png` with alpha as the silhouette.
- **Views:**
  - `front`, `three_quarter` (45°), `side` (90°, character's left) and `back` (180°): vertical FOV 30°, framing 1.12 × the model height around its centre.
  - `face` and `face_34` (40°): FOV 20°, framing 0.30 × H/1.8 around the head.
  - `hand` (right hand): FOV 20°, camera at 25° yaw and 20° pitch, framing 1.5 × the wrist-to-fingertip span. The span comes from the rig's bones when present, otherwise from a vertex heuristic.
- **Normalization:** the model is rotated to face −Y, its feet put on z = 0, and it is centred in x/y.
- **`<prefix>_cameras.json`:** records every camera's position, Euler angles, `matrix_world`, FOV, lens, clip range, target, distance and silhouette pixel count. It also records the normalization, the bbox and the light rig. Converting to three.js: `x = x, y = z, z = −y`.
- **Storage:** the PNGs are git-ignored by the existing `art-src/**/*.png` rule; the JSONs are tracked. To regenerate, run the commands in §5.

**Using it for the fidelity metric (Phase 4):** the fairest comparison renders the game's own exported player GLB with the same script and compares like with like.

```bash
blender.exe -b -Y --factory-startup --python art-src/samples/_scripts/render_turnaround.py -- --input art-src/blender/player.glb --out <loop dir> --prefix game_lod0
```

- **Shape:** compare against `mpfb2_athlete` or `hbm_male_realistic` with silhouette IoU on the `_mask.png` files, plus a per-pixel error on the RGB.
- **Height:** heights differ (1.69 / 1.94 / 1.93 m). Scale masks to equal pixel height, or compare at matched height, before computing IoU. Alternatively, set MPFB `--height` to match the game's player height.
- **Pose:** both MPFB and HBM are in an A-pose, so the game model must be in its bind pose.
- **In-game captures:** use the camera JSON's FOV, position and target in a `camLook`-style hook.

**4th reference (needs your Sketchfab login):** Renderpeople "Eric Rigged 001" (CC-BY) is the best textured photoreal human. After download:

```bash
blender.exe -b -Y --factory-startup --python art-src/samples/_scripts/render_turnaround.py -- --input <eric.glb> --out art-src/samples/reference-renders --prefix rp_eric
```

Add `--forward` if it faces another axis.

## 3. Recommendation

### Base body: MPFB2 `game_engine` rig, three LODs from one build
Use `art-src/samples/_scripts/mpfb_build.py` headless (see the notes after the list). The recommended athletic male (gender 1, age 0.5, muscle 1.0, weight 0.6, proportions 1.0, height 0.65 → 1.93 m; height 0.55 gives about 1.85 m) produces:
- **Hero / LOD0:** basemesh, 26,756 body tris, plus eyes, brows and lashes (27,488 total). Decimate or retopologize toward the Phase 2 hero budget. Separate mesh parts (hands, head) keep their detail when the torso is cut.
- **Mid / LOD1:** a decimated basemesh, or MPFB's `male1591` / `male_generic` proxies (the generic proxy is about the same density as the basemesh, so decimate).
- **Far / LOD2:** `proxy741`, 1,460 body tris (2,192 with eyes, brows and lashes). It has the same 53-bone skeleton and weights, so all LODs share one skeleton and clip set.
- **Body variety:** comes from the same macros (lean, average, stocky) and the 18 CC0 skins.
- **Rig choice:**
  - `game_engine` (53 bones: Root, pelvis, spine_01–03, neck_01, head, clavicles, arms, 15 finger bones per hand, thigh/calf/foot/ball) is the natural fit for the planned "26 + fingers ≈ 50" skeleton. Its UE-style names make a later retarget table simple.
  - `cmu_mb` (31 bones) is the zero-effort target for CMU mocap.
  - Recommended: bake clips onto `cmu_mb`, then transfer to `game_engine` with a fixed name map (below), or build the shipped player directly on `game_engine` with the map.
- **Kit:** MPFB's own clothes are generic suits, so model the baseball kit as separate meshes fitted to the body.
  - **Jersey:** from the jersey scan's reference, with Poly Haven `cotton_jersey` / `waffle_pique_cotton` detail normals.
  - **Pants, socks and stirrups:** modelled or sculpted.
  - **Cap:** modelled from the reference.
  - **Helmet, glove and catcher's mask:** from the Sketchfab CC-BY scans you download, retopologized.
  - **Bat and ball:** Poly Haven, CC0.
  - **Mask-driven team colours:** use a UV kit mask (Phase 3 plan).

### Animation sources and retarget notes
- **Clips:**
  - Pitch: `124_01` (5.4 s), `124_02` (11 s; several pitches, trim one).
  - Swing: `124_07` (10.8 s; several swings).
  - Bunt: `124_08`.
  - Throws:
    - `124_12` underhand toss (fielder flip);
    - `143_20` catch and throw;
    - `141_11` throw and catch;
    - `33_01` football throw/catch (overhand throw arm path).
  - Runs:
    - CMU `09_01`, `09_02`, `16_35`, `16_55`, `35_17`, `02_03`;
    - run and stop `16_08`;
    - ACCAD `ericrun` sprint (CC-BY 3.0, credit needed).
  - Fallback locomotion: Quaternius UAL (CC0).
- **Missing (key by hand or IK):** slide, dive, grounder scoop, glove catch above the head, catcher's crouch and frame, umpire signals, home-run trot. A CMU walk at higher speed can stand in for the trot.
- **Import:** `bpy.ops.import_anim.bvh(global_scale=0.056444, rotate_mode='NATIVE', axis_forward='-Z', axis_up='Y', use_fps_scale=False)`. Verified: frame-1 head joint at 1.39–1.41 m, toes at z ≈ 0, 120 fps. The cgspeed 2010 release adds a T-pose as frame 1, which is the rest-pose reference for the retarget offsets.
- **Retarget recipe (Blender, headless):**
  1. Build the MPFB body with `--rig cmu_mb`.
  2. Rename `LeftHandIndex1` / `RightHandIndex1` in the BVH to `…Finger1`.
  3. Add a Copy Rotation constraint (world space) per bone, plus Copy Location on `Hips` scaled by the height ratio. Compute a per-bone rest offset between the BVH T-pose (frame 1) and MPFB's A-pose so the arms don't stay rotated 45°.
  4. `bpy.ops.nla.bake(visual_keying=True, clear_constraints=True)`, then resample 120 → 30 fps.
  5. Remap the release and contact frames to the game's 0.9 s windup and swing lag (`actors3d.js` `pose()`).
- **`cmu_mb` → `game_engine` map:**
  - `Hips`→`pelvis`, `LowerBack`→`spine_01`, `Spine`→`spine_02`, `Spine1`→`spine_03`, `Neck`+`Neck1`→`neck_01`, `Head`→`head`
  - `LeftShoulder`→`clavicle_l`, `LeftArm`→`upperarm_l`, `LeftForeArm`→`lowerarm_l`, `LeftHand`→`hand_l`
  - `LeftUpLeg`→`thigh_l`, `LeftLeg`→`calf_l`, `LeftFoot`→`foot_l`, `LeftToeBase`→`ball_l`, and the same for the right side
  - `LHipJoint`/`RHipJoint` are dropped
  - Fingers: from a pose library or keyed grips (bat, ball, glove)
- **Check visually before trusting:**
  - **Handedness:** confirm the 124 batter and pitcher sides and mirror (swap L/R names) where needed.
  - **Mechanics:** subject 124 is an amateur performer, so pitch and swing mechanics are plausible but not pro.
  - **Conversion:** one source says the cgspeed conversion has errors in places, so watch for foot sliding and wrist flips.

## 4. What was and wasn't obtainable
- **Obtained (login-free, in `art-src/samples/`):**
  - `mpfb2-extension/` and `makehuman-system-assets/`, installed into `_blender-user/`.
  - `cmu-mocap-bvh/`: 17 BVH plus `READMEFIRST.txt` and the index.
  - `accad-sprint/`.
  - `blender-human-base-meshes/` (extracted) and `hbm-reference/`.
  - `polyhaven-baseball_bat/`, `polyhaven-baseball_01/`, `polyhaven-textures/`, `ambientcg-textures/`.
  - `smithsonian-marge-villa-jersey/`, `smithsonian-stickball-bat/`.
  - `polypizza-cap/`, `polypizza-shoes/`.
  - Generated: `mpfb2-proof/` and `mpfb2-reference/`.
- **Not downloaded:**
  - Every Sketchfab item (login), listed in §1c.
  - Quaternius UAL and Base Characters: login-free, but itch's download flow has no stable URL. Two clicks at the itch pages, "No thanks, just take me to the downloads".
  - 100STYLE: 1.47 GB, low value.
  - Rokoko: form, custom licence.
- **Doesn't exist under permissive licences:** a realistic rigged baseball player; a catcher's mitt, chest protector or baseball cleats; baseball slide or fielding mocap; CC0 skin pore maps.

## 5. Reproduce
From the repo root, in Git Bash:

```bash
bash art-src/samples/_scripts/setup_mpfb.sh
```

This fetches and installs MPFB and the assets into `art-src/samples/_blender-user`. Then set the shared variables:

```bash
export BLENDER_USER_RESOURCES="$PWD/art-src/samples/_blender-user"
B="/c/Program Files/Blender Foundation/Blender 5.2/blender.exe"
```

Proof body (GLB and stats):

```bash
"$B" -b --factory-startup --python art-src/samples/_scripts/mpfb_build.py -- --name athletic_male_game_engine --rig game_engine --muscle 1.0 --weight 0.6 --proportions 1.0 --height 0.65 --glb art-src/samples/mpfb2-proof/athletic_male_game_engine.glb --stats art-src/samples/mpfb2-proof/athletic_male_game_engine.json
```

Low LOD: the same command with `--proxy proxy741.proxy`.

Reference renders:

```bash
"$B" -b -Y --factory-startup --python art-src/samples/_scripts/render_turnaround.py -- --input <model> --out art-src/samples/reference-renders --prefix <prefix>
```

`_scripts/extract_collection.py` pulls one collection out of a downloaded `.blend`. `_scripts/contact_sheet.py` tiles PNGs for a quick look.

## 6. Ready-to-paste `SAMPLES.md` rows
These follow the "Visual campaign additions (3D)" table (`| What | Source | License | Where |`).

```markdown
| MPFB 2.0.18 (MakeHuman for Blender), build tool only | https://extensions.blender.org/add-ons/mpfb/ , `add-on-mpfb-v2.0.18.zip` (sha256 c075b3e9…2a2dad), run headless in an isolated Blender profile | GPL-3.0-or-later (tool, not shipped); its output is CC0 (MakeHuman FAQ) | `art-src/samples/mpfb2-extension/` (git-ignored); scripts `art-src/samples/_scripts/` |
| MakeHuman system assets (base mesh, targets, proxies, skins, eyes, brows, lashes, hair) | https://static.makehumancommunity.org/assets/assetpacks/makehuman_system_assets.html , `makehuman_system_assets_cc0.zip` (sha256 b542127a…a0107) | CC0 | `art-src/samples/makehuman-system-assets/` (git-ignored) → player bodies built by MPFB |
| CMU motion capture (subjects 02, 09, 16, 33, 35, 124, 141, 143; cgspeed 2010 BVH via github.com/sfd158/cmu-mocap) | http://mocap.cs.cmu.edu/ | Free for all uses; may ship in commercial products, may not be resold as data. Credit: "The data used in this project was obtained from mocap.cs.cmu.edu. The database was created with funding from NSF EIA-0196217." | `art-src/samples/cmu-mocap-bvh/` (git-ignored) → retargeted clips |
| ACCAD sprint BVH (`ericrun.bvh`) | https://accad.osu.edu/research/motion-lab/mocap-system-and-data | CC-BY 3.0, credit "ACCAD Motion Lab, The Ohio State University" | `art-src/samples/accad-sprint/` (git-ignored) |
| Baseball bat (Enrique Martín) and Baseball 01 (Rico Cilliers) | https://polyhaven.com/a/baseball_bat , https://polyhaven.com/a/baseball_01 (2K glTF) | CC0 | `art-src/samples/polyhaven-baseball_bat/`, `polyhaven-baseball_01/` (git-ignored) |
| Fabric and leather detail textures: Poly Haven cotton_jersey, jersey_melange, waffle_pique_cotton, stretch_poplin, brown_leather, leather_white, fabric_leather_01; ambientCG Fabric070, Fabric048, Fabric081A, Leather038, Leather035A, Leather034C (1K) | https://polyhaven.com/textures , https://ambientcg.com/ | CC0 | `art-src/samples/polyhaven-textures/`, `ambientcg-textures/` (git-ignored) |
| Human Base Meshes v1.4.1 (Blender Studio), reference renders only | https://www.blender.org/download/demo-files/ | CC0 | `art-src/samples/blender-human-base-meshes/` (git-ignored); renders `art-src/samples/reference-renders/hbm_male_realistic_*` |
| Marge Villa jersey and Slugger's stickball bat scans (Smithsonian NMAH), reference only | https://3d.si.edu/object/3d/marge-villa-jersey:c0c953ae-8539-436a-8f32-81bd88bc9d5a , https://3d.si.edu/object/3d/sluggers-stickball-bat:aeb8fc1d-9392-4a1e-8faa-fce19b25f5a5 | CC0 | `art-src/samples/smithsonian-*/` (git-ignored); renders `reference-renders/si_jersey_*` |
| Baseball cap, low-poly (Poly by Google), silhouette reference | https://poly.pizza/m/aaC5GgcWEhM | CC-BY 3.0, credit "Poly by Google" | `art-src/samples/polypizza-cap/` (git-ignored) |
| Reference turnarounds (MPFB2 athlete, Human Base Mesh male, jersey) | Rendered here by `art-src/samples/_scripts/render_turnaround.py` (Blender 5.2.3, Cycles) | CC0 inputs; renders MIT (this repo) | `art-src/samples/reference-renders/` (PNGs git-ignored, camera JSON tracked) |
```

Add Sketchfab rows only when the files are actually downloaded. Each needs the author credit: `"<title>" by <author>, CC-BY <ver>, <url>`.

## Sources
- MPFB: https://extensions.blender.org/add-ons/mpfb/versions/ , https://static.makehumancommunity.org/mpfb/docs/getting_started.html
- MakeHuman licence: https://static.makehumancommunity.org/about/license.html , https://static.makehumancommunity.org/oldsite/faq/can_i_sell_models_created_with_makehuman.html , https://static.makehumancommunity.org/oldsite/faq/what_changed_regarding_the_license_in_2020.html
- CMU: http://mocap.cs.cmu.edu/ , http://mocap.cs.cmu.edu/faqs.php , https://github.com/sfd158/cmu-mocap
- ACCAD: https://accad.osu.edu/research/motion-lab/mocap-system-and-data
- Quaternius: https://quaternius.itch.io/universal-animation-library , https://quaternius.itch.io/universal-base-characters
- 100STYLE: https://zenodo.org/record/8127870
- Excluded datasets: https://github.com/BandaiNamcoResearchInc/Bandai-Namco-Research-Motiondataset , https://amass.is.tue.mpg.de/license.html , https://github.com/drivelineresearch/openbiomechanics
- Poly Haven: https://polyhaven.com/a/baseball_bat , https://polyhaven.com/a/baseball_01
- ambientCG: https://ambientcg.com/
- Smithsonian: https://3d.si.edu/explore?edan_q=baseball
- Poly Pizza: https://poly.pizza/m/aaC5GgcWEhM
- Blender demo files: https://www.blender.org/download/demo-files/
