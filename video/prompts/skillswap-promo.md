---
width: 1920
height: 1080
fps: 30
---

# SkillSwap promo

A 20-second launch video for SkillSwap, a platform where people trade skills in live 1:1 sessions: you teach something you know and learn something you want.

- No audio and no voiceover, so every idea has to read from the screen alone.
- Audience: people who want to learn a practical skill and have one of their own to offer.
- Tone: warm, confident and clear. Friendly rather than corporate. Clean shapes and generous white space.

## Brand

- Deep blue `#1E3A8A` (primary), bright blue `#3B82F6`, dark blue `#1E40AF`
- Amber `#F59E0B` (accent, used sparingly for emphasis), light amber `#FCD34D`
- Green `#10B981` only for a "matched" or success moment
- Background white `#FFFFFF` or light grey `#F9FAFB`; body text `#1F2937`
- Wordmark: the word "SkillSwap" in heavy weight, "Skill" in deep blue and "Swap" in amber. There is no logo file, so set it as text.

## Continuity

A bright-blue stroke, 8 px at 1080p, runs through the whole piece. It is the underline in scene 1, the loop arrows in scene 2, the connecting line in scene 3 and the chip outlines in scene 4, and the end card's blue grows out of it.

## Scene: Hook (4s)

White background. The headline "Learn any skill." sits centred, deep blue, about 150 px, heavy weight.

- 0.2 s: the three words rise in one after another, 3 frames apart. Each travels up 40 px and fades in over 0.5 s on the arrive-and-settle curve.
- When the last word has landed, wait 0.25 s, then a bright-blue underline draws left to right under "skill." over 0.4 s.
- 0.15 s after the underline completes, the second line "Teach what you know." rises 24 px under the headline in amber, about 64 px, over 0.5 s.
- Hold both lines still until 3.65 s.
- Exit over the last 0.35 s: both lines move up 30 px and fade on the leave curve, while the underline stays and stretches to the full width of the safe area. The final frame is white with only that blue line across the middle.

## Scene: The swap (5s)

Light grey `#F9FAFB` background. Opens on the blue line left by scene 1, centred at mid-height.

- 0 to 0.4 s: the line shrinks from both ends to a 240 px segment at the centre.
- 0.3 s: two white rounded cards (radius 28 px, 2 px deep-blue border, about 560 x 300 px) arrive from the left and right with a spring (response 0.55 s, no bounce), stopping either side of the segment. The left card reads "I teach" (small, grey, uppercase) over "Guitar" (large, deep blue) and below it "I want Spanish" (medium, body text). The right card reads "I teach" over "Spanish", then "I want Guitar".
- 0.3 s after the cards settle, the centre segment bends into two curved arrows that form a loop between the cards, drawn over 0.6 s with `strokeDashoffset`.
- When the loop closes, a green pill reading "Matched" pops in at the centre with the slight-overshoot curve over 0.35 s, white text.
- Hold from there until 4.65 s.
- Exit over the last 0.35 s: cards and pill fade and drop 20 px; the loop straightens back into a single horizontal blue line at mid-height.

## Scene: How it works (4.5s)

Light grey background. Opens on the horizontal blue line from scene 2, which settles at 52% of the height and spans 70% of the width.

- 0.2 s: the heading "How it works" fades up 24 px near the top, deep blue, about 84 px, over 0.5 s.
- 0.6 s, then every 0.35 s: three numbered deep-blue circles (1, 2, 3; 64 px radius; white numerals) pop onto the line at 15%, 50% and 85% of its length with a spring (response 0.4 s, bounce 0.2). Each circle's label rises in below it 0.15 s after its circle: "List your skills", "Get matched", "Meet 1:1", body text, about 52 px.
- Hold from when the third label lands until 4.15 s.
- Exit over the last 0.35 s: heading, circles and labels fade on the leave curve. The line stays.

## Scene: Range (3s)

White background. Opens on the same blue line, which fades out over the first 0.3 s as the chips take over its colour.

- 0.15 s: the line "Real people. Real skills." rises 30 px to sit at 34% of the height, deep blue, about 96 px, word by word 3 frames apart.
- When it has landed, eight skill chips pop in below it in two centred rows, 2 frames apart, each scaling from 0.8 to 1 over 0.35 s with the slight-overshoot curve: Guitar, Spanish, React, Photography, Cooking, Yoga, Public speaking, Excel. Chips alternate between a 4 px bright-blue outline with deep-blue text and an amber fill with dark text. About 54 px text, pill shaped.
- Hold until 2.65 s.
- Exit over the last 0.35 s: a deep-blue panel wipes in from the left edge on the leave curve until it covers the frame. The final frame is solid deep blue.

## Scene: End card (3.5s)

Solid deep-blue `#1E3A8A` background, matching scene 4's last frame.

- 0.2 s: the wordmark "SkillSwap" scales from 0.88 to 1 and fades in over 0.7 s on the arrive-and-settle curve, about 200 px, heavy weight, "Skill" in white and "Swap" in amber.
- 0.25 s after it settles, the line "Learn. Teach. Grow together." rises 24 px below it in white at 90% opacity, about 58 px, word by word 3 frames apart.
- From 1.9 s to the end, nothing moves. This is the last scene, so there is no exit.
