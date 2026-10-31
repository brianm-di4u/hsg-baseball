# After the campaign: fixes made after the loop-10 review (not reviewed by the critics)

## Players
- **Eyes:** the iris (dark) disc is larger (radius 0.19 of the eye's texture, was 0.13), so eyes read as eyes at game distances; the eye whites are a touch below paper white (#E4DED2, was #F3F0E8).
- **Skin self-light** now scales with skin tone: dark skin keeps a stronger floor (diffuse × 0.26) so faces under a brim keep their features; light skin gets less (× 0.08, was × 0.22 for every tone), so it keeps its shading instead of washing flat.
- **Catcher's chest protector:** the jersey lettering is hidden under it on every tier (the low tier's flat lettering showed through).

## Captures
- **Pitch strip (R03)** starts 0.5 s into the windup and samples every 8 frames (was 0.33 s, every 6), so it runs through the release and into the follow-through (it stopped before release).
- **Jersey numbers on left-handed players:** the number and lettering follow the rig's handedness the moment the player is placed. Before, they were drawn with the previous frame's handedness, so a player who had just switched to a left-handed (mirrored) rig showed a mirrored number ("27" in R05).
- **Placket buttons** are drawn on the high tier only. On the medium (phone) tier they cost a draw call per player for detail a phone screen barely shows.
