Diamond Springs should **continue**. The high tier presents a functional baseball game, but its players fall substantially short of the character gates: recognizable human faces and separate fingers coexist with torn-looking necklines, shoulder spikes, floating lettering, primitive gloves, and visibly ungrounded feet. The realistic references establish how much anatomical structure is still lost, while SMB3/4 demonstrate that stylization does not require sacrificing cloth construction, convincing equipment, or readable faces. The HUD and controls are stronger than the models; fielding cameras and mobile framing still make players too small. These are absolute-anchor scores, with no inferred improvement over an earlier loop.

All capture paths below are relative to `screenshots/review-loop-2/`; benchmark paths are relative to the repository root.

1. **Characters — 4.5/10.**  
   `crops/high/R02-batter_head` and `crops/high/R17-pitcher_hands` show individually modeled fingers and genuine facial volume, exceeding the rubric’s tube-body/mitten anchor. However, the raised triangular shoulders, ragged collar boundaries, flat uniform surfaces, and slab-like glove prevent even a consistently clean low-poly presentation. `crops/high/R05-catcher` adds recognizable protective equipment, but its construction is rudimentary. Against `benchmarks/smb3-3.png` and `benchmarks/smb4-4.png`, cloth seams, convincing leather, fitted gear, and clearly differentiated bodies are missing. Three distinct athletic body types are not convincingly demonstrated.

2. **Fidelity to reference — 5/10.**  
   `crops/high/R16-1B` and `crops/high/R09-LF` have broadly plausible human proportions and recognizable facial features. They remain far simpler than `art-src/samples/reference-renders/mpfb2_athlete_front.png` and `hbm_male_realistic_face_34.png`: shoulders become inflated humps, knee structure disappears into rounded trousers, and the eyes are poorly resolved beneath caps. `crops/high/R02-batter_hands` also falls well below the articulated structure of `mpfb2_athlete_hand.png`. The supplied front/side IoUs of 0.843/0.851 support “roughly right,” not the matching silhouette required at 7. Good LOD retention relative to LOD0 cannot establish fidelity to the reference itself.

3. **Animation and game feel — 5/10.**  
   `strips/high/R04` shows a readable progression into contact, rotation, and a finish, with a conspicuous contact flash. `strips/high/R10` shows alternating running legs rather than a rigid translated pose. However, the runner’s open, upturned hands and limited upper-body participation undermine athletic motion. In `strips/high/R07`, the change from running in panel 4 to the low fielding pose in panel 5 is abrupt; subsequent panels largely hold that shape as the ball approaches. `crops/high/R05-batter_feet` shows both soles visibly separated from the dirt. `strips/high/R03` only establishes the set and leg lift; it does not substantiate the claimed full delivery quality. The balance and equipment integration visible in `benchmarks/smb4-2.png`, and the contact pose in `smb4-3.png`, remain stronger. Benchmark stills cannot establish temporal smoothness, so confidence here is moderate.

4. **Environment — 5/10.**  
   `high/desktop/R07` provides a recognizable diamond, mow pattern, backstop, stands, scoreboard, poles, and lights. `high/desktop/R15` adds identifiable park dressing and a different palette. However, the crowd is visibly repeated photography laid across stair-like slabs; walls are broad blank surfaces, and trees are cones and polygonal blobs. The photographic forest backdrop clashes with the foreground geometry and exposes a conspicuous horizontal transition. `high/desktop/R05` is dominated by an undecorated gray backstop wall. This closely matches the rubric’s 5 anchor and lacks the built architectural richness, varied spectators, and material detail in `benchmarks/smb4-3.png` and `smb3-1.png`.

5. **Lighting and atmosphere — 5.5/10.**  
   `high/desktop/R14` communicates warm afternoon light, and `high/desktop/R12` provides a distinct night treatment with illuminated towers and helmet highlights. Shadows and shaped illumination exceed a flat ambient presentation. Nevertheless, `crops/high/R02-batter_head` loses almost the entire face and black jersey to darkness in daylight. `high/desktop/R13` shows broad green illumination pools with little convincing integration between field, players, and background. Detached-looking foot shadows further weaken grounding. Compared with `benchmarks/smb3-4.png` and `smb4-1.png`, depth, bounce, exposure control, and material response remain crude.

6. **UI and typography — 6/10.**  
   `high/desktop/R02` and `high/desktop/R05` have a consistent green/cream/yellow score bug, clear primary actions, and legible count symbols. `high/desktop/R15` has an immediately readable result banner. The presentation is functional and coherent. However, the full-width scoreboard has large empty stretches while secondary text is small; the bottom controls resemble generic app buttons more than a finished broadcast package. `high/desktop/R01` has a translucent menu that lets scenery interfere with text contrast. Compared with `benchmarks/ootp26-1.png`, information hierarchy and space allocation are less refined; compared with `backyard97-2.png`, the menu has little authored baseball personality. Static captures cannot establish motion-package quality.

7. **Readability — 6/10.**  
   `high/desktop/R04` makes the ball and strike zone readily identifiable, while `high/desktop/R08` uses a bright trail to communicate flight. Conversely, `high/desktop/R16` places the first-base runner at the extreme right edge, crowded against the first baseman. In `high/mobile/R07` and `high/landscape/R07`, fielders shrink to tiny figures; the blue rings identify locations more clearly than bodies or possession. Several fielders receive similar rings, so the fielder responsible for the play is not sufficiently distinguished. The generous player silhouettes in `benchmarks/smb3-1.png` and the field-context cues in `backyard97-1.png` communicate action more immediately.

8. **Mobile — 6/10.**  
   `high/mobile/R02` and `high/mobile/R05` provide readable score information and large, separated controls. Batting and pitching remain recognizable. However, portrait batting spends substantial height on sky, portrait pitching crops much of the foreground pitcher at the left edge, and `high/mobile/R07` reduces most defenders to tiny marks. `high/landscape/R05` crops the pitcher against the controls; `high/landscape/R07` gives substantial vertical space to interface bars while rendering the action small. The supplied phone-proxy minimums of 47 fps on medium and 79 fps on low support practical performance, but cannot compensate for composition. Compared with the action hierarchy in `benchmarks/smb3-1.png` and `backyard97-1.png`, these phone layouts need more deliberate framing.

Specific character defects visible in the close-ups:

- **Shoulder spikes and raised garment flaps:** prominent triangular projections around the batter’s collar/shoulders in `crops/high/R02-batter_head`, `R02-batter_hands`, and `R14-batter`.
- **Inflated shoulder structure:** rounded, elevated shoulder masses obscure a believable neck-to-deltoid transition in `crops/high/R02-pitcher`, `R07-SS`, `R09-LF`, and `R17-pitcher_hands`.
- **Sawtooth neckline:** trim follows coarse polygon boundaries, resembling a torn opening rather than a sewn collar in `crops/high/R16-1B`, `R12-pitcher`, and `R17-pitcher_hands`.
- **Umpire garment boundary failure:** a very wide, jagged skin-colored opening extends across the upper chest/shoulder in `crops/high/R05-ump_head`.
- **Skin showing through the cap:** a skin-colored patch interrupts the black cap crown in `crops/high/R05-batter-front` and `R14-batter`.
- **Floating jersey lettering:** “LAKESIDE” visibly extends outside the torso silhouette in `crops/high/R07-SS`, `R08-CF`, and `R09-LF`; the runner’s lettering also projects beyond the body in `R10-batter-trot`.
- **Uniforms read as painted bodies:** no convincing placket, buttons, pockets, fabric thickness, or fold system in `crops/high/R02-pitcher`, `R16-1B`, and `R17-pitcher-back`.
- **Belt reads as a broad irregular color stripe:** no visible buckle or loops in `crops/high/R17-pitcher_hands`; similar wavy boundaries appear in `R07-SS`.
- **Visible polygon bands and pinched lower-body forms:** abrupt tonal planes cross thighs and knees in `crops/high/R03-pitcher`, `R04-batter`, and `R08-CF`; the crotch pinches in `R12-pitcher`.
- **Unconvincing bat grip:** fingers remain curled beside or away from the handle rather than forming two secure grips in `crops/high/R02-batter_hands` and `R14-batter`.
- **Coarse finger and wrist articulation:** angular knuckles, blunt fingers, and abrupt sleeve-to-hand transitions in `crops/high/R02-batter_hands` and `R17-pitcher_hands`.
- **Running hand pose:** open palms face upward, reading as a held gesture rather than relaxed running hands in `crops/high/R07-batter-runner` and `R10-batter-trot`.
- **Gloves resemble solid wedges:** little readable finger segmentation, webbing, pocket, or lacing in `crops/high/R16-1B`, `R17-pitcher_hands`, and `R06-catcher_glove`.
- **Fingers protrude through the glove surface:** small skin-colored forms emerge from the upper brown slab in `crops/high/R07-SS` and `R08-CF`.
- **Catcher’s equipment lacks construction:** chest protection is a simple solid panel; shin protection resembles broad curved shells without convincing straps or articulated pads in `crops/high/R05-catcher` and `R06-catcher_glove`.
- **Masks look like disconnected ladder bars:** open, minimally fitted cages lack convincing padding and attachment structure in `crops/high/R05-ump_head` and `R06-catcher_glove`.
- **Helmet ear protection is slab-like:** long rectangular side pieces lack fitted curvature and ear openings in `crops/high/R02-batter_head` and `R10-batter-trot`.
- **Faces are obscured or under-resolved:** daylight black faces lose eyes and expression in `crops/high/R02-batter_head` and `R02-pitcher`; the better-lit `R09-LF` still has weak eye definition.
- **Cleats resemble glossy dress shoes:** broad smooth toes, raised heels, and little visible athletic detailing in `crops/high/R05-batter_feet` and `R17-pitcher-back`.
- **Floating stance:** both batter soles have visible clearance above the dirt in `crops/high/R05-batter_feet`, with shadows beneath rather than contact.
- **Insufficient material distinction:** trousers, sleeves, and jersey remain smooth color surfaces; gloves lack leather detail, while shoes are excessively glossy in `crops/high/R17-pitcher_hands` and `R05-batter_feet`.

Ranked gaps and testable fixes follow. Gains are estimates for the named category and are not additive guarantees.

| Rank | Gap / workstream | Concrete fix and acceptance test | Expected gain | Severity | Effort |
|---|---|---|---:|---:|:---:|
| 1 | Garment geometry and attachment — **WS1 character models/materials** | Rebuild collar, sleeve, shoulder, and waist boundaries; bind lettering to the garment surface. Re-render R02, R05, R14, and R17 through all captured poses with zero spikes, skin breakthroughs, or lettering outside the cloth silhouette. | Characters +1.0 | 5 | L |
| 2 | Anatomical and equipment fidelity — **WS1 character models/materials** | Restore reference shoulder/hip/knee structure; build fitted gloves, cleats, masks, and helmet ear guards. Compare matched front/side/three-quarter renders against MPFB2/HBM and require readable eyes, articulated hands, and equipment construction in the existing close-ups. | Charfit +1.0 | 5 | L |
| 3 | Contact and retargeting — **WS2 animation** | Constrain both bat grips, correct stance ground height, match run travel to stance-foot motion, and blend run-to-field transitions. Supply full pitch and swing strips through recovery; verify planted soles and no hand/handle separation. | Animation +1.0 | 5 | L |
| 4 | Daylight face exposure and grounding — **WS3 lighting/post** | Tune sky/bounce and shadow response using dark- and light-skinned players. R02 head must show eyes, nose, and mouth while preserving helmet highlights; planted feet must have contact shadows at the sole. Preserve distinct night lighting. | Lighting +1.0 | 4 | M |
| 5 | Repeated crowd and primitive park — **WS4 environment/crowd** | Replace continuous photo sheets with varied spectator clusters and seats; add backstop construction, railings, dugout dressing, and coherent foreground foliage. R05 must lose the blank-wall dominance and obvious repeating crowd blocks. | Environment +1.0 | 4 | L |
| 6 | Tiny fielding action and phone crops — **WS5 cameras/presentation** | Frame the active fielder, ball, destination base, and runner together; tune portrait and landscape cameras independently. At native phone size, the responsible fielder must be distinguishable without relying on identical rings, and key duel figures must avoid accidental edge crops. | Readability +1.0 | 4 | M |
| 7 | Interface space allocation — **WS7 UI/HUD/mobile** | Reduce landscape bar height, consolidate empty score-bug space, increase useful secondary type, remove desktop-key instructions from phone layouts, and give the title menu an opaque readable backing. Verify all ten high-tier phone captures at native CSS size. | Mobile +0.5 | 3 | M |

Medium/low regression checks were sampled rather than exhaustive: `medium/desktop/R02` is visually close to high. `low/desktop/R02` and `low/desktop/R12` show substantially changed player silhouettes/poses, harsher garment boundaries, and absent player grounding shadows. Pose differences prevent attributing every discrepancy to geometry LOD alone.

Performance is unscored. The brief reports high desktop minimum 225 fps / worst p95 8.9 ms, medium phone proxy 47 fps / 42.2 ms, and low phone proxy 79 fps / 31.5 ms. The proxy minimums exceed the rubric’s 30 fps mobile anchor. Low software GL reports 14 fps / 85 ms. I have not independently established the complete `VISUAL-PLAN-3.md` performance gate from these figures.

```json
{
  "loop": 2,
  "role": "critic-codex",
  "tier": "high",
  "scores": {
    "characters": {
      "score": 4.5,
      "confidence": 0.95,
      "evidence": [
        {"shot": "crops/high/R02-batter_head", "note": "Shoulder spikes, dark face, slab-like helmet ear guard."},
        {"shot": "crops/high/R17-pitcher_hands", "note": "Jagged collar, flat cloth and primitive glove."}
      ]
    },
    "charfit": {
      "score": 5,
      "confidence": 0.9,
      "evidence": [
        {"shot": "crops/high/R16-1B", "note": "Broadly human proportions but inflated shoulders and simplified joints."},
        {"shot": "crops/high/R09-LF", "note": "Facial volume exists; eye definition and anatomical structure fall below realistic references."}
      ]
    },
    "animation": {
      "score": 5,
      "confidence": 0.75,
      "evidence": [
        {"shot": "strips/high/R04", "note": "Readable contact progression and flash."},
        {"shot": "strips/high/R07", "note": "Abrupt run-to-field pose change between panels 4 and 5."},
        {"shot": "strips/high/R10", "note": "Alternating running gait with unconvincing open-palmed hands."},
        {"shot": "crops/high/R05-batter_feet", "note": "Both soles visibly above the ground."}
      ]
    },
    "environment": {
      "score": 5,
      "confidence": 0.95,
      "evidence": [
        {"shot": "high/desktop/R07", "note": "Recognizable diamond with repeated crowd sheets and primitive vegetation."},
        {"shot": "high/desktop/R05", "note": "Blank backstop wall dominates pitching composition."}
      ]
    },
    "lighting": {
      "score": 5.5,
      "confidence": 0.9,
      "evidence": [
        {"shot": "high/desktop/R14", "note": "Distinct warm afternoon illumination."},
        {"shot": "high/desktop/R13", "note": "Night pools lack convincing integrated illumination."},
        {"shot": "crops/high/R02-batter_head", "note": "Daylight face and black jersey lose most internal detail."}
      ]
    },
    "ui": {
      "score": 6,
      "confidence": 0.9,
      "evidence": [
        {"shot": "high/desktop/R02", "note": "Consistent score bug and clear primary controls; inefficient horizontal allocation."},
        {"shot": "high/desktop/R01", "note": "Translucent title menu weakens text contrast."}
      ]
    },
    "readability": {
      "score": 6,
      "confidence": 0.9,
      "evidence": [
        {"shot": "high/desktop/R04", "note": "Ball and zone are readily visible."},
        {"shot": "high/desktop/R16", "note": "First-base runner crowded at extreme screen edge."},
        {"shot": "high/mobile/R07", "note": "Tiny fielders and similar rings weaken possession and action identification."}
      ]
    },
    "mobile": {
      "score": 6,
      "confidence": 0.9,
      "evidence": [
        {"shot": "high/mobile/R02", "note": "Readable controls and HUD, but excessive sky allocation."},
        {"shot": "high/mobile/R05", "note": "Foreground pitcher cropped at left edge."},
        {"shot": "high/landscape/R07", "note": "Large interface bars and very small fielding figures."}
      ]
    }
  },
  "gaps": [
    {
      "id": "G-garment-integrity",
      "category": "characters",
      "expectedGain": 1,
      "severity": 5,
      "effort": "L",
      "workstream": "WS1",
      "evidence": ["crops/high/R02-batter_head", "crops/high/R05-ump_head", "crops/high/R09-LF"],
      "benchmark": "benchmarks/smb4-4.png",
      "fix": "Rebuild garment boundaries and bind lettering to cloth; verify no spikes, skin breakthroughs or floating lettering across R02, R05, R14 and R17 poses."
    },
    {
      "id": "G-anatomy-equipment",
      "category": "charfit",
      "expectedGain": 1,
      "severity": 5,
      "effort": "L",
      "workstream": "WS1",
      "evidence": ["crops/high/R16-1B", "crops/high/R17-pitcher_hands"],
      "benchmark": "art-src/samples/reference-renders/mpfb2_athlete_front.png; art-src/samples/reference-renders/hbm_male_realistic_face_34.png",
      "fix": "Restore reference shoulder, hip and knee structure, readable eyes and articulated hands; replace slab equipment with fitted gloves, cleats, masks and helmet ear guards, verified in matched close-ups."
    },
    {
      "id": "G-contact-retargeting",
      "category": "animation",
      "expectedGain": 1,
      "severity": 5,
      "effort": "L",
      "workstream": "WS2",
      "evidence": ["crops/high/R02-batter_hands", "crops/high/R05-batter_feet", "strips/high/R07", "strips/high/R10"],
      "benchmark": "benchmarks/smb4-2.png; benchmarks/smb4-3.png",
      "fix": "Constrain bat grips, correct stance ground height, match run travel to stance-foot motion and blend fielding transitions; capture complete pitch and swing recovery with planted feet and continuous grip."
    },
    {
      "id": "G-face-light-grounding",
      "category": "lighting",
      "expectedGain": 1,
      "severity": 4,
      "effort": "M",
      "workstream": "WS3",
      "evidence": ["crops/high/R02-batter_head", "crops/high/R05-batter_feet", "high/desktop/R13"],
      "benchmark": "benchmarks/smb3-4.png; benchmarks/smb4-1.png",
      "fix": "Tune bounce, exposure and contact shadows so eyes, nose and mouth remain readable under brims, helmet highlights survive and planted soles visibly contact their shadows."
    },
    {
      "id": "G-crowd-park",
      "category": "environment",
      "expectedGain": 1,
      "severity": 4,
      "effort": "L",
      "workstream": "WS4",
      "evidence": ["high/desktop/R05", "high/desktop/R07", "high/desktop/R15"],
      "benchmark": "benchmarks/smb4-3.png",
      "fix": "Replace continuous repeated crowd sheets with varied spectator clusters and seats; build backstop details, railings, dugout dressing and coherent foreground foliage."
    },
    {
      "id": "G-action-framing",
      "category": "readability",
      "expectedGain": 1,
      "severity": 4,
      "effort": "M",
      "workstream": "WS5",
      "evidence": ["high/desktop/R16", "high/mobile/R07", "high/landscape/R05"],
      "benchmark": "benchmarks/smb3-1.png; benchmarks/backyard97-1.png",
      "fix": "Tune cameras per viewport to include active fielder, ball, runner and destination base; distinguish the responsible fielder at native phone size and eliminate accidental duel-player crops."
    },
    {
      "id": "G-mobile-interface",
      "category": "mobile",
      "expectedGain": 0.5,
      "severity": 3,
      "effort": "M",
      "workstream": "WS7",
      "evidence": ["high/mobile/R05", "high/landscape/R02", "high/landscape/R07"],
      "benchmark": "benchmarks/ootp26-1.png; benchmarks/backyard97-2.png",
      "fix": "Reduce landscape interface height, consolidate empty scoreboard space, improve secondary type and replace desktop-key hints on phones; verify all high-tier phone frames at native CSS size."
    }
  ],
  "calibration": {
    "basis": "Absolute rubric anchors; no earlier reviews consulted.",
    "referenceMetrics": "Front/side IoU 0.843/0.851 supports approximate proportions, not reference equivalence.",
    "animationLimit": "Pitch strip does not show a complete delivery; benchmark images are stills.",
    "tierCheck": "Medium and low regression checks were sampled, not exhaustive.",
    "performance": "Reported phone-proxy minimums exceed 30 fps; complete VISUAL-PLAN-3 performance gate not independently established."
  },
  "verdict": "continue"
}
```
