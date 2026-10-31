Diamond Springs should **continue**: none of the eight visual gates is met. The largest failure is the campaign’s priority, the players. They have oversized spherical heads, narrow tube bodies, mitten hands, rudimentary equipment and visibly broken uniform boundaries; they fall near the rubric’s capsule-model anchor and far below both realistic reference sets and SMB’s deliberately stylized characters. Pitch and swing actions are recognizable, but hovering ready poses undermine weight and contact. The field and HUD communicate basic baseball clearly, while repetitive crowd sheets, primitive vegetation, uneven lighting and distant fielding cameras keep the presentation below shipped-game quality. The reported GPU performance provides considerable headroom, but earns no fidelity credit.

Capture paths below are relative to `screenshots/review-loop-0/`; benchmark paths are relative to the repository root. Reference filenames refer to `art-src/samples/reference-renders/`.

**Category scores**

- **Characters — 3/10.** `crops/high/R02-batter_head` exposes protruding ball eyes, a button nose and a featureless rounded jaw. `crops/high/R02-batter_hands` shows undivided hands without a convincing finger grip. `crops/high/R06-catcher_glove` shows a rounded brown lump without a readable pocket, web or lacing, alongside jagged garment boundaries. Helmets have specular highlights and team colors are recognizable, but these merits do not overcome the capsule anatomy. Compared with `benchmarks/smb3-3.png`, `benchmarks/smb4-2.png` and `benchmarks/smb4-4.png`, the differences include fundamental construction, equipment and body variety—not merely surface detail.

- **Fidelity to reference — 2.5/10.** In `crops/high/R02-pitcher` and `crops/high/R16-1B`, the large head, slender elongated legs, small feet and weak shoulder/hip structure differ substantially from `mpfb2_athlete_front.png` and `hbm_male_realistic_front.png`. `crops/high/R02-batter_head` lacks the integrated orbital, cheek, nose, lip and jaw forms visible in both reference face renders. `crops/high/R02-batter_hands` bears little anatomical resemblance to either reference hand. The references are unclothed anatomy references; baseball garment quality is calibrated separately against SMB. No numerical silhouette or pixel-error claim is possible from the supplied brief.

- **Animation & game feel — 4/10.** `strips/high/R03` shows a recognizable leg-lift progression, but its sampled interval does not establish the complete delivery. `strips/high/R04` shows the bat moving through a swing, body rotation, contact feedback and camera movement; the limited lower-body transfer and hovering stance prevent convincing force. `crops/high/R05-batter_feet` confirms both feet suspended above the dirt in the pre-pitch pose, and `crops/high/R03-pitcher` shows the support foot above the mound during the lift. `strips/high/R07` and `strips/high/R08` establish movement across the field, but the figures are too small to establish good foot plants or glove contact. Compared with the planted leg-lift pose in `benchmarks/smb4-2.png` and the extended swing finish in `benchmarks/smb4-3.png`, these actions lack grounded weight. The benchmarks are stills, so I am not inferring their temporal smoothness.

- **Environment — 4.5/10.** `high/desktop/R07` has a coherent diamond, foul lines, stands, poles and turf variation, but a large plain foreground building consumes valuable image area. `high/desktop/R05` makes the repeated crowd photograph conspicuous: oversized spectators form a flat horizontal strip above an almost blank wall. `high/desktop/R15` adds useful historic-park identity through the alligator-farm sign and perimeter features, yet the cone and faceted-ball trees clash with the detailed forest backdrop. Relative to `benchmarks/smb3-1.png`, `benchmarks/smb4-3.png` and `benchmarks/smb4-5.png`, the parks lack convincing occupied seating, built detail and integrated material scale. A smaller high-school venue need not match their stadium size, but should match the credibility of its visible construction.

- **Lighting & atmosphere — 4.5/10.** `high/desktop/R02` supplies directional shadows and a believable daytime sky, but the black-uniform batter loses most torso and face definition. `high/desktop/R12` clearly communicates night through the sky and tower glow, while the playing surface becomes pale and broadly illuminated. `high/desktop/R13` shows conspicuous light pools and an abrupt transition into near-black vegetation. `high/desktop/R14` offers a distinct warm palette, but limited atmospheric depth. Compared with `benchmarks/smb3-3.png`, `benchmarks/smb3-4.png` and `benchmarks/smb4-1.png`, fill, exposure, material response and depth are insufficiently integrated. Detached shadows also emphasize the characters’ hovering poses.

- **UI & typography — 6/10.** `high/desktop/R02` presents legible scores, inning, count and primary action with consistent green, cream and yellow colors. `high/desktop/R05` clearly distinguishes pitch selection and the pitch action. However, both use very broad score panels with little information, a visually separate purple control footer and tiny keyboard guidance. `high/desktop/R10` has an unmistakable result banner, but the unchanged zero score during this early home-run moment does not establish whether scoring subsequently updates; I do not count it as a proven stale-state bug. Against `benchmarks/ootp26-1.png`, the information architecture is much simpler but less compact; against `benchmarks/backyard97-1.png` and `benchmarks/backyard97-2.png`, the package has less distinctive visual personality. It is functional and consistent enough to exceed 5, but lacks broadcast polish.

- **Readability — 5.5/10.** `high/desktop/R04` makes the incoming ball conspicuous with a white trail, and the strike zone is easy to identify. In `high/desktop/R07`, player rings help locate teams, but the camera reduces fielders to tiny figures and does not clearly emphasize the responsible defender. `high/desktop/R16` places the runner and first baseman together at the extreme right edge, making their relationship difficult to read. `high/mobile/R07` crops the lateral field context and both corner bases out of view. Compared with the clear batter–pitcher–ball relationship in `benchmarks/smb3-1.png` and the strong positional overview in `benchmarks/backyard97-1.png`, the current fielding presentation demands too much searching. The ball treatment helps; it does not solve player and base visibility.

- **Mobile — 5.5/10.** `high/mobile/R02` has large, legible controls and a clear batting zone, but spends a substantial part of the view on sky. `high/mobile/R05` keeps the plate group readable, although the foreground pitcher and glove are cropped and the two-row pitching footer consumes considerable height. `high/landscape/R05` preserves controls but shrinks the players; `high/landscape/R07` makes the fielders extremely small while retaining the large foreground building. Landscape also removes batter/pitcher context visible in portrait and still displays keyboard instructions. Compared with the efficient play-area allocation of `benchmarks/backyard97-1.png` and the strong figure framing of `benchmarks/smb3-1.png`, these layouts need camera and HUD changes specific to orientation. Those benchmarks are desktop images, so they do not establish touch usability. The brief’s throttled medium/low results exceed the rubric’s 30 fps proxy requirement; actual phone input and GPU behavior remain untested here.

**Character defects visible in the close-ups**

1. **Oversized, rounded head relative to the narrow body.** Visible in `crops/high/R02-pitcher`, `crops/high/R16-1B` and `crops/high/R10-batter-trot`.
2. **Weak athletic torso structure:** little readable chest, shoulder-to-waist transition or pelvic mass. Visible in `crops/high/R02-pitcher` and `crops/high/R17-pitcher-back`.
3. **Tube limbs with little anatomical taper:** thighs, calves and forearms lack convincing changes in volume. Visible in `crops/high/R07-SS`, `crops/high/R07-batter-runner` and `crops/high/R16-runner1`.
4. **Rounded bends replace convincing joint structure.** Elbows and knees look like bent hoses, especially in `crops/high/R03-pitcher`, `crops/high/R06-catcher_glove` and `crops/high/R12-pitcher`.
5. **Protruding white eyes and black pupils lack eyelids and integrated sockets.** Visible in `crops/high/R02-batter_head`.
6. **Button-like nose, slit mouth and undeveloped cheek/chin forms.** Visible in `crops/high/R02-batter_head` and `crops/high/R16-1B`.
7. **Ears are simple flattened blobs; hair is a hard dark band.** Visible in `crops/high/R17-pitcher-back` and `crops/high/R14-batter`.
8. **Hands are mitten forms with a thumb-like bump, without separate fingers or knuckles.** Visible in `crops/high/R02-batter_hands`, `crops/high/R16-runner1` and `crops/high/R05-ump_head`.
9. **Bat grip lacks readable wrapping fingers and thumb placement.** The hands overlap into an ambiguous cluster around the handle in `crops/high/R02-batter_hands`.
10. **Gloves lack a readable pocket, web, finger divisions and leather construction.** Visible in `crops/high/R06-catcher_glove`, `crops/high/R17-pitcher_hands` and `crops/high/R16-1B`.
11. **Cleats are small smooth shoe ends without readable soles, laces or studs.** Socks and shoes form a nearly continuous boot silhouette in `crops/high/R05-batter_feet`.
12. **Both batter feet hover in the ready pose.** Clear ground separation is visible in `crops/high/R05-batter_feet` and `crops/high/R02-batter`.
13. **Pitcher and waiting fielders also lack reliable ground contact.** Visible in `crops/high/R02-pitcher`, `crops/high/R03-pitcher` and `crops/high/R16-1B`. Airborne running poses alone are not evidence of this defect.
14. **Jersey/pants boundary breaks into contrasting triangular teeth.** Visible in `crops/high/R02-batter`, `crops/high/R05-catcher` and `crops/high/R17-pitcher_hands`. The images establish the artifact, not its implementation cause.
15. **Collar and sleeve boundaries are jagged and lack finished hems.** Visible in `crops/high/R02-batter_head`, `crops/high/R06-catcher_glove` and `crops/high/R17-pitcher_hands`.
16. **Uniforms lack plackets, buttons, seams, pockets and convincing cloth folds.** Visible in `crops/high/R02-pitcher` and `crops/high/R17-pitcher-back`.
17. **Lettering and numbers appear detached from the garment surface.** Chest text extends across/in front of the posed arm in `crops/high/R02-batter_hands`; the catcher’s number projects away from the back in `crops/high/R05-batter-front`.
18. **Catcher protection lacks construction and separation.** The chest area reads mainly as a blue patch; shin protection forms bulky smooth pieces without clear padding or straps. Visible in `crops/high/R05-catcher` and `crops/high/R06-catcher_glove`.
19. **Masks obscure rather than reveal the face.** The catcher has a pale solid-looking panel behind the bars; the umpire has a dark filled area behind a coarse grid. Visible in `crops/high/R05-catcher` and `crops/high/R05-ump_head`.
20. **Caps and helmets have rudimentary silhouettes.** Caps read largely as colored domes; helmets lack convincing shell thickness, vents and detailed ear protection. Visible in `crops/high/R02-pitcher`, `crops/high/R02-batter_head` and `crops/high/R14-batter`.
21. **Material detail is largely absent.** Skin, cloth and gloves are smooth color blocks; helmet gloss provides some separation, but cloth and leather lack their characteristic structure. Visible in `crops/high/R02-batter_head` and `crops/high/R17-pitcher_hands`.
22. **Little visible body or facial variety beyond color and equipment.** The pitcher, first baseman, shortstop and runner repeat closely similar head/body construction in `crops/high/R02-pitcher`, `crops/high/R16-1B`, `crops/high/R07-SS` and `crops/high/R16-runner1`.

Some close-camera labels are poorly targeted: `crops/high/R05-ump` is substantially blocked by the batter, while `crops/high/R05-batter-front` views much of the batter from behind surrounding players. `crops/high/R09-LF` shows a running pose with the glove low, so it does not demonstrate the advertised catch. These limitations reduce confidence in unseen details; they are not proof that those details or animations never exist.

**Lower tiers and performance**

Medium preserves the same principal character defects. Its images show softer detail and coarser shadows, including `medium/desktop/R14` and `crops/medium/R05-batter_feet`. Low further softens the 3D scene, removes player cast shadows and reduces structural detail: compare `low/desktop/R07`, `low/mobile/R05` and `crops/low/R02-pitcher` with their high counterparts. This worsens grounding, although the HUD remains sharp and the central gameplay cues survive. I found no additional lower-tier HUD clipping in the supplied frames.

The brief reports high desktop at 715 minimum fps / 1.9 ms worst p95 and high mobile at 589 / 2.6 ms. The 4× CPU-throttled medium and low mobile proxies report 103 and 122 minimum fps. Software GL reports only 15 fps / 87.4 ms. These are reported measurements, not tests I reran; I am not certifying the complete performance gate against thresholds absent from the brief.

**Ranked gaps and testable fixes**

Expected gains are estimates in the named category, not additive guarantees.

| Rank | Gap / workstream | Concrete fix and acceptance check | Expected gain | Severity | Effort |
|---|---|---|---:|---:|:---:|
| 1 | G-anatomy — WS1 character models/materials | Rebuild head, torso and limb proportions against both reference turnarounds; integrate facial features and articulated hands. Re-render R02, R16 and R17 close-ups with recognizable shoulder, hip, knee and hand anatomy, plus three distinct builds. | charfit +2.0 | 5 | L |
| 2 | G-kit — WS1 character models/materials | Repair garment boundaries and surface-bound lettering; add cloth construction, cleats, glove pockets/webbing and built catcher equipment. Require no triangular boundary artifacts or detached lettering in the supplied close-up poses. | characters +2.0 | 5 | L |
| 3 | G-grounding — WS2 animation | Correct root height and support-foot placement, then author clear load, stride, rotation and recovery beats. Ready poses must visibly contact the field; new pitch/swing/run strips must show stable support phases and readable ball–bat/glove contact. | animation +2.0 | 5 | L |
| 4 | G-park — WS4 environment/crowd | Replace repeated oversized crowd sheets with correctly scaled varied spectators; integrate vegetation and backdrop scale; finish visible park structures. Recheck R05, R07 and R15 for obvious tiling, empty slabs and abrupt art-style seams. | environment +2.0 | 4 | L |
| 5 | G-framing — WS5 cameras/presentation | Frame the active play more tightly, remove foreground building obstruction and emphasize the responsible fielder. In R07–R09 and R16, the ball, relevant defender, runner and destination base should be identifiable without searching. | readability +1.5 | 4 | M |
| 6 | G-light — WS3 lighting/post | Add controlled fill for dark uniforms/faces, improve contact shadows and balance night exposure. R02 must retain facial/torso form; R12–R13 must avoid pale turf and abrupt black perimeter transitions. | lighting +1.5 | 4 | M |
| 7 | G-phone — WS7 UI/HUD/mobile | Use orientation-specific cameras and compact landscape HUD/footer layouts; preserve matchup context and remove keyboard-only guidance from touch layouts. Recheck all supplied phone moments at their intended CSS size, including corner-base visibility during fielding. | mobile +1.5 | 4 | M |
| 8 | G-hud — WS7 UI/HUD/mobile | Consolidate the score bug, typography, footer and result feedback into one visual package. Preserve current legibility while reducing empty panels and keeping action/result hierarchy consistent across R02, R05 and R10. | ui +1.0 | 3 | M |

```json
{
  "loop": 0,
  "role": "critic-codex",
  "tier": "high",
  "scores": {
    "characters": {
      "score": 3,
      "confidence": 0.99,
      "evidence": [
        {
          "shot": "crops/high/R02-batter_head",
          "note": "Primitive face and helmet construction; far below SMB character detail."
        },
        {
          "shot": "crops/high/R02-batter_hands",
          "note": "Mitten hands without readable finger grip."
        },
        {
          "shot": "crops/high/R06-catcher_glove",
          "note": "Undetailed glove and broken garment boundaries."
        }
      ]
    },
    "charfit": {
      "score": 2.5,
      "confidence": 0.98,
      "evidence": [
        {
          "shot": "crops/high/R02-pitcher",
          "note": "Head, torso and limb proportions differ substantially from both realistic reference front renders."
        },
        {
          "shot": "crops/high/R16-1B",
          "note": "Weak athletic anatomy and oversized rounded head."
        },
        {
          "shot": "crops/high/R02-batter_head",
          "note": "No comparable integrated facial anatomy to either reference face."
        }
      ]
    },
    "animation": {
      "score": 4,
      "confidence": 0.85,
      "evidence": [
        {
          "shot": "strips/high/R03",
          "note": "Recognizable leg-lift progression; sampled interval does not establish the complete delivery."
        },
        {
          "shot": "strips/high/R04",
          "note": "Swing progression and contact effects read, but lower-body weight transfer is weak."
        },
        {
          "shot": "crops/high/R05-batter_feet",
          "note": "Both feet visibly hover in the ready pose."
        },
        {
          "shot": "crops/high/R03-pitcher",
          "note": "Support foot is suspended above the mound during leg lift."
        }
      ]
    },
    "environment": {
      "score": 4.5,
      "confidence": 0.97,
      "evidence": [
        {
          "shot": "high/desktop/R05",
          "note": "Oversized repeated photographic spectators above a largely blank wall."
        },
        {
          "shot": "high/desktop/R07",
          "note": "Coherent field, but primitive stands and large plain foreground structure."
        },
        {
          "shot": "high/desktop/R15",
          "note": "Historic identity exists, but primitive vegetation clashes with detailed backdrop."
        }
      ]
    },
    "lighting": {
      "score": 4.5,
      "confidence": 0.96,
      "evidence": [
        {
          "shot": "high/desktop/R02",
          "note": "Directional shadows exist, but dark batter loses face and torso form."
        },
        {
          "shot": "high/desktop/R12",
          "note": "Night reads clearly, but field exposure is pale and broadly illuminated."
        },
        {
          "shot": "high/desktop/R13",
          "note": "Conspicuous light pools and abrupt near-black perimeter."
        }
      ]
    },
    "ui": {
      "score": 6,
      "confidence": 0.95,
      "evidence": [
        {
          "shot": "high/desktop/R02",
          "note": "Legible score and primary action, with oversized sparse panels and tiny keyboard guidance."
        },
        {
          "shot": "high/desktop/R05",
          "note": "Clear pitch selection; footer styling is weakly integrated with score bug."
        },
        {
          "shot": "high/desktop/R10",
          "note": "Strong result visibility, but limited broadcast-package refinement."
        }
      ]
    },
    "readability": {
      "score": 5.5,
      "confidence": 0.95,
      "evidence": [
        {
          "shot": "high/desktop/R04",
          "note": "White ball trail and zone are easy to identify."
        },
        {
          "shot": "high/desktop/R16",
          "note": "Runner and first baseman overlap at the extreme right edge."
        },
        {
          "shot": "high/mobile/R07",
          "note": "Lateral field context and corner bases are outside the portrait framing."
        }
      ]
    },
    "mobile": {
      "score": 5.5,
      "confidence": 0.94,
      "evidence": [
        {
          "shot": "high/mobile/R02",
          "note": "Large clear controls, but substantial space is devoted to sky."
        },
        {
          "shot": "high/mobile/R05",
          "note": "Readable plate group, cropped pitcher/glove and tall pitching footer."
        },
        {
          "shot": "high/landscape/R05",
          "note": "Small figures, omitted matchup context and keyboard guidance in touch layout."
        },
        {
          "shot": "high/landscape/R07",
          "note": "Tiny fielders and excessive foreground structure."
        }
      ]
    }
  },
  "gaps": [
    {
      "id": "G-anatomy",
      "category": "charfit",
      "expectedGain": 2,
      "severity": 5,
      "effort": "L",
      "workstream": "WS1",
      "evidence": [
        "crops/high/R02-pitcher",
        "crops/high/R02-batter_head",
        "crops/high/R16-1B"
      ],
      "benchmark": "art-src/samples/reference-renders/mpfb2_athlete_front.png; hbm_male_realistic_front.png; both reference face and hand renders",
      "fix": "Rebuild athletic proportions, integrated facial anatomy and articulated hands against the reference turnarounds. Verify R02, R16 and R17 close-ups and three visibly distinct builds."
    },
    {
      "id": "G-kit",
      "category": "characters",
      "expectedGain": 2,
      "severity": 5,
      "effort": "L",
      "workstream": "WS1",
      "evidence": [
        "crops/high/R02-batter",
        "crops/high/R05-batter-front",
        "crops/high/R06-catcher_glove",
        "crops/high/R05-batter_feet"
      ],
      "benchmark": "benchmarks/smb3-3.png; benchmarks/smb4-3.png; benchmarks/smb4-4.png",
      "fix": "Repair jagged garment boundaries and detached lettering. Add finished cloth construction, cleats, pocketed/webbed gloves and constructed catcher equipment. Require artifact-free close-ups in every supplied pose."
    },
    {
      "id": "G-grounding",
      "category": "animation",
      "expectedGain": 2,
      "severity": 5,
      "effort": "L",
      "workstream": "WS2",
      "evidence": [
        "crops/high/R05-batter_feet",
        "crops/high/R03-pitcher",
        "strips/high/R03",
        "strips/high/R04"
      ],
      "benchmark": "benchmarks/smb4-2.png; benchmarks/smb4-3.png",
      "fix": "Correct root height and support-foot placement, then strengthen load, stride, rotation and recovery. Verify grounded ready poses, stable support phases and visible ball-to-bat/glove contact in new motion strips."
    },
    {
      "id": "G-park",
      "category": "environment",
      "expectedGain": 2,
      "severity": 4,
      "effort": "L",
      "workstream": "WS4",
      "evidence": [
        "high/desktop/R05",
        "high/desktop/R07",
        "high/desktop/R15"
      ],
      "benchmark": "benchmarks/smb3-1.png; benchmarks/smb4-3.png",
      "fix": "Replace oversized repeating crowd sheets with correctly scaled varied spectators, integrate vegetation/backdrop scale and finish visible park structures. Verify no conspicuous tiling, empty slabs or abrupt art-style seams in R05, R07 and R15."
    },
    {
      "id": "G-framing",
      "category": "readability",
      "expectedGain": 1.5,
      "severity": 4,
      "effort": "M",
      "workstream": "WS5",
      "evidence": [
        "high/desktop/R07",
        "high/desktop/R09",
        "high/desktop/R16",
        "high/mobile/R07"
      ],
      "benchmark": "benchmarks/smb3-1.png; benchmarks/backyard97-1.png",
      "fix": "Tighten active-play framing, remove foreground building obstruction and emphasize the responsible defender. Keep ball, relevant defender, runner and destination base immediately identifiable."
    },
    {
      "id": "G-light",
      "category": "lighting",
      "expectedGain": 1.5,
      "severity": 4,
      "effort": "M",
      "workstream": "WS3",
      "evidence": [
        "high/desktop/R02",
        "high/desktop/R12",
        "high/desktop/R13"
      ],
      "benchmark": "benchmarks/smb3-3.png; benchmarks/smb3-4.png; benchmarks/smb4-1.png",
      "fix": "Add controlled face/uniform fill, grounded contact shadows and balanced night exposure. Preserve dark-character form in R02 and avoid pale turf and abrupt black perimeter transitions in R12-R13."
    },
    {
      "id": "G-phone",
      "category": "mobile",
      "expectedGain": 1.5,
      "severity": 4,
      "effort": "M",
      "workstream": "WS7",
      "evidence": [
        "high/mobile/R02",
        "high/mobile/R05",
        "high/landscape/R05",
        "high/landscape/R07"
      ],
      "benchmark": "benchmarks/backyard97-1.png; benchmarks/smb3-1.png, composition references only",
      "fix": "Create orientation-specific cameras and compact landscape HUD/footer layouts. Preserve matchup context, replace keyboard-only touch guidance and verify fielding base visibility at intended CSS sizes."
    },
    {
      "id": "G-hud",
      "category": "ui",
      "expectedGain": 1,
      "severity": 3,
      "effort": "M",
      "workstream": "WS7",
      "evidence": [
        "high/desktop/R02",
        "high/desktop/R05",
        "high/desktop/R10"
      ],
      "benchmark": "benchmarks/ootp26-1.png; benchmarks/backyard97-1.png; benchmarks/backyard97-2.png",
      "fix": "Unify score bug, type scale, footer and result feedback. Reduce empty panels while preserving legibility and consistent action/result hierarchy across batting, pitching and home-run captures."
    }
  ],
  "calibration": {
    "referenceBasis": "Both realistic anatomy reference sets were viewed directly; SMB images calibrate clothed character construction, equipment and presentation.",
    "animationLimit": "Motion assessed from supplied strips; sparse sampling and distant fielders limit judgments of temporal smoothness and catch contact.",
    "performance": "Brief reports substantial hardware GPU headroom and medium/low throttled phone proxies above 30 fps. Software GL reports 15 fps. Full performance gate was not independently certified.",
    "gatesMet": []
  },
  "verdict": "continue"
}
```

