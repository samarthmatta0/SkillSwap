---
width: 1920
height: 1080
fps: 30
---

# SkillSwap, 30 seconds

A 30-second product film for SkillSwap, a platform where people trade skills in live 1:1 sessions: you teach something you know and learn something you want. No audio, so every idea reads from the screen.

- Audience: people who want to learn a practical skill and have one of their own to offer.
- Tone: calm, confident, a little playful. Small type and a lot of air.
- Motion style: see `.claude/skills/motion-video/references/smooth-2d-saas.md`. One static backdrop for the whole film, one thing moving at a time, and one element surviving every cut.

## Shared by every scene

Write these the same way in every scene, so the scenes join without a visible cut. `u` is `height / 1080`.

- **Backdrop.** Static. Base colour `#050A30`, with three radial glows layered on top: `radial-gradient(60% 45% at 45% 8%, #2F6BFF 0%, rgba(47,107,255,0) 70%)`, `radial-gradient(55% 50% at 82% 96%, #3B82F6 0%, rgba(59,130,246,0) 70%)` and `radial-gradient(90% 60% at 60% 50%, #1E3A8A 0%, rgba(30,58,138,0) 75%)`.
- **Type.** White `#FFFFFF`, weight 400, size `84u`, line height 1, letter spacing `-0.01em`, in the standard font stack. Words in a line are `22u` apart.
- **Colour.** Amber `#F59E0B` marks the word "swap" and the SkillSwap mark. Light amber `#FCD34D` is the travelling tint. Dim text is `#8FB0FF`. Green `#10B981` only for a "Matched" pill. Deep blue `#1E3A8A` for text on white cards.
- **Curves.** Arrive `0.33, 1, 0.68, 1`. Leave `0.32, 0, 0.67, 0`. Reposition `0.65, 0, 0.35, 1`. Pop `0.38, 1.21, 0.22, 1`.
- **Text line.** Every sentence sits on one line, vertically centred in the frame.

## Scene: Question (4s)

The sentence "What if learning was a swap?" builds word by word.

- Layout: the word "swap" starts at 66% of the width. The five words before it sit in a row that ends `22u` to its left. The question mark is attached to the right of "swap" without taking up layout width.
- Words appear at 0.3, 0.6, 0.9, 1.2, 1.5 and 1.8 s. Each fades in over 0.18 s and rises `14u` on the arrive curve.
- Corner ticks: for the 0.2 s before a word appears, two small white L-shaped ticks (`14u` arms, `2u` thick, 70% opacity) mark the top-left and bottom-right of the space it will occupy. They vanish as the word lands.
- Travelling tint: each of the first five words turns light amber 0.45 s after it appears, for 0.3 s, crossfading over 0.1 s each way.
- At 2.4 s "swap" and its question mark turn amber over 0.3 s and stay amber.
- Still from 2.7 s to the end. Last frame: the whole sentence, white, with "swap?" in amber.

## Scene: Swap (4s)

Opens on the last frame of the previous scene, unchanged for 0.3 s.

- 0.3 to 0.95 s: the five leading words fade out left to right, 0.1 s apart. Each takes 0.25 s and falls `12u` on the leave curve. They must be gone before "swap" passes over where they were.
- 0.8 to 1.5 s: "swap" glides to the exact centre of the frame and grows to 1.43 times its size, on the reposition curve. Its question mark fades out over the first 0.3 s of the move.
- 1.6 s: six skill pills pop in around the word, 3 frames apart, each scaling 0.8 to 1 over 0.35 s on the pop curve with its own 0.2 s fade. Top row, `170u` above centre: "Guitar", "React", "Cooking". Bottom row, `170u` below centre: "Spanish", "Photography", "Yoga". Columns sit at `-420u`, `0` and `+420u` from centre. Pills are `76u` tall, fully rounded, `2u` white outline at 70% opacity, white text at `40u`.
- At 2.3, 2.75 and 3.2 s one column trades places: its top pill travels to the bottom position and its bottom pill to the top, each bulging `110u` sideways in opposite directions so they pass around each other. 0.45 s on the reposition curve. Order: left column, right column, middle column. While a pill travels its outline is amber.
- 3.68 to 3.98 s: all pills fade and shrink to 0.9 on the leave curve.
- Last frame: only "swap", amber, centred, at 1.43 times size.

## Scene: Promise (4s)

Opens on "swap", amber, centred, at 1.43 times size.

- Layout of the full sentence "swap what you know to learn.": a row starting at 16% of the width. "learn" and its full stop are attached to the right end of the first five words, `22u` after them.
- 0 to 0.55 s: "swap" glides from the centre to the start of the row and returns to normal size, on the reposition curve. It stays amber.
- 0.5 s onward: "what", "you", "know", "to", "learn." appear 0.16 s apart, each fading in over 0.18 s and rising `14u`.
- Still from 1.5 to 2.6 s.
- 2.6 to 3.0 s: "swap", "what", "you", "know", "to" fade out left to right, 2 frames apart, each over 0.25 s, falling `12u`.
- 3.0 to 3.6 s: "learn" slides left until it starts at 16% of the width, on the reposition curve. At the same time its full stop travels `60u` to the right of the word, grows from a `10u` dot to a `16u` dot and rises from the baseline to the middle of the line, becoming a bullet.
- Still from 3.6 s. Last frame: "learn" at 16% of the width, and a white `16u` bullet `60u` to its right.

## Scene: Anything (4.5s)

Opens on "learn" and the bullet exactly as the previous scene left them.

- A list of skills sits on a wheel to the right of the bullet, its text starting `110u` right of "learn": Guitar, Spanish, React, Photography, Cooking, Yoga, Public speaking, Excel, repeating.
- The active line is level with "learn", white, full size. Each line above or below is rotated 8 degrees per step around a pivot `700u` to the left of the list, so the lines fan out. A neighbour's colour is `#8FB0FF`, its size 85%, its opacity 1 minus 0.24 per step away.
- 0 to 0.4 s: the wheel fades in while turning half a step into place.
- From 0.4 s the wheel steps to the next skill every 0.5 s: a 0.2 s move on the reposition curve, then a 0.3 s rest. Five steps, ending on "Yoga" at 2.9 s.
- 3.2 to 4.0 s: the wheel spins on through eight more lines on the leave curve. From 3.6 to 4.0 s the wheel, the bullet and "learn" fade out.
- 4.0 to 4.5 s: backdrop only.

## Scene: Sessions (6s)

Opens on the empty backdrop.

- A ring of seven portrait cards, each `340u` by `450u` with `28u` corners, arranged in 3D around a vertical axis at a radius of `440u` so neighbours nearly touch, seen with a perspective of `1700u` and tilted 8 degrees toward the viewer. Cards facing away are hidden.
- Each card is a matched skill swap drawn as interface, not a photo. From the top: two overlapping circles, `64u` across, one white with a `10u` deep-blue outline and one amber; the two skills on two lines with a small "for" between them; "Live 1:1 session" in small grey text; and a green "Matched" pill. Pairs: Guitar for Spanish, React for Photography, Cooking for Yoga, Excel for Public speaking, Spanish for React, Yoga for Guitar, Photography for Cooking. Card backgrounds alternate white and `#EAF1FF`; text is deep blue.
- 0.1 to 0.8 s: the ring swings in from `900u` left and `700u` below centre, rotated 24 degrees, scaling 0.8 to 1, on the arrive curve.
- The ring turns the whole time at 38 degrees per second.
- 1.2 s: the line "Real people. Live 1:1 sessions." fades in and rises `14u` over 0.4 s, centred, `400u` below the middle, white, `44u`. It fades out from 4.9 to 5.2 s.
- 5.3 to 5.75 s: the ring rises `1100u` out of the top of the frame on the leave curve.
- Last frame: backdrop only.

## Scene: Mark (3.5s)

Opens on the empty backdrop.

- Two circles `112u` across: a white ring with a `14u` stroke, and a solid amber disc. They fade in over 0.35 s from 0.1 s, side by side, `180u` apart, centred in the frame, the ring on the left.
- 0.6 to 1.25 s: they trade places. The ring travels over the top and the disc under the bottom, each along a half circle, on the reposition curve.
- 1.45 to 2.1 s: they trade back the same way. From 1.3 to 2.3 s a black overlay over the backdrop, but under the circles, rises to 55% and returns to 0.
- 2.3 to 3.0 s: both glide, on the reposition curve, to the mark's place in the final lockup: centred `333u` left of the middle and `20u` above it, `78u` apart so they overlap, ring on the left and disc in front.
- Still from 3.0 s. Last frame: the mark in its lockup place.

## Scene: Lockup (4s)

Opens on the mark exactly as the previous scene left it. This is the last scene.

- 0.2 to 0.9 s: the wordmark "SkillSwap" is revealed left to right by a wipe, on the arrive curve. It starts `202u` left of the middle, level with the mark, weight 800, `140u`, letter spacing `-0.03em`, "Skill" in white and "Swap" in amber.
- 1.1 s onward: the line "Learn. Teach. Grow together." appears word by word, 3 frames apart, each fading in over 0.25 s and rising `14u`. Centred, `110u` below the middle, white at 85% opacity, `44u`.
- Nothing moves from 2.0 s to the end.
