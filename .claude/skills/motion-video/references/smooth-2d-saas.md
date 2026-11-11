# Reference: smooth 2D SaaS motion

A frame-by-frame reading of the reference clip the project owner supplied for the house style: a 21-second studio showreel, 736x414 at 30 fps, 629 frames. Use it for how things move, not for what is shown. Its logo, wording and portfolio images belong to the studio that made it; never reproduce them.

The clip itself is not in the repository. To look at it again, put it at `video/references/smooth-2d-saas.mp4` (ignored by git) and extract frames from `video/` with `npx remotion ffmpeg -i references/smooth-2d-saas.mp4 -q:v 5 out/ref/f_%04d.jpg`.

## What makes it feel smooth

1. **One backdrop for the whole film.** A dark navy field with a soft diagonal band of brighter blue, static from first frame to last. Nothing cuts to a new background, so every change reads as the content moving, not the film cutting.
2. **Something always survives the change.** Each beat keeps one element from the beat before and rebuilds around it: a word stays while the sentence around it leaves, a full stop slides sideways and becomes a list bullet, three dots become the logo mark. The frame never empties and refills, except for two deliberate 0.2 s breaths.
3. **One thing moves at a time.** The eye is given a single focal change per beat. Secondary elements are dimmer and smaller, never competing.
4. **Small type, lots of air.** Text is light weight, about 4% of frame height, white on the dark field. Emphasis is a colour tint, not size or weight.
5. **Fast arrivals, long rests.** Words and objects arrive in 0.15 to 0.3 s and then sit still. Roughly a third of the running time is rest.

## Shot list

Times are seconds from the start; frame = time x 30.

| Time | Beat | What happens |
| --- | --- | --- |
| 0.0 to 2.3 | Sentence builds | A five-word sentence appears one word at a time, left-aligned at about 22% of the width, vertically centred. A new word lands every 0.3 s (0.1, 0.4, 0.7, 1.0, 1.3). Each word fades in over about 0.1 s with almost no travel. A light-blue tint travels through the sentence two words behind the newest word and leaves the line white by 2.0 s. Tiny corner ticks, like a selection box, flash at the position of the next word for 0.2 s before it arrives. Complete and still from 2.0 to 2.3 s. |
| 2.3 to 5.8 | Words become things | The sentence is taken apart from the left: every 0.5 s one word is replaced by a short row of small white tool icons, and the remaining words slide to keep the line balanced. From 3.5 s a single word remains as the anchor. Rows of three or four icons sit above-left and below-right of it and are swapped for new ones every 0.5 s, while the anchor word steps to a new horizontal position on each swap. |
| 5.8 to 7.5 | Second sentence | A new six-word sentence is on screen at 6.0 s, built around the same anchor word, with its last two words in heavier weight. From 6.4 s the leading words fade out one after another, and the survivors drift toward the centre. By 7.5 s only the last two words and the full stop remain. |
| 7.5 to 8.2 | Full stop becomes bullet | The two surviving words slide left to about 15% of the width over 0.4 s. The full stop detaches and travels right about 4% of the width, arriving as a bullet. At 8.0 s a list fades in to the right of the bullet over 0.2 s. |
| 8.2 to 12.3 | List wheel | The list sits on a wheel: the active line is horizontal, white, full size, beside the bullet. Lines above and below are dimmer blue, a little smaller, and tilted, fanning out as if around a pivot far to the left. The wheel steps one line every 0.5 s (a 0.2 s move, a 0.3 s rest). After six steps it spins freely for 0.8 s and leaves the frame. |
| 12.3 to 12.6 | Breath | Backdrop only, 0.2 s. |
| 12.6 to 16.5 | Card carousel | A ring of rounded portrait cards swings in from the lower left, tilted, and settles in 0.5 s as a horizontal ring seen slightly from the side. The ring turns continuously at about 40 degrees per second; three or four cards face the viewer at once, the nearest largest. At 16.3 s the whole ring rises out of the top of the frame in 0.25 s. |
| 16.5 to 16.7 | Breath | Backdrop only, 0.2 s. |
| 16.7 to 18.7 | Mark assembles | Three circles (an outline, an outline with a centre dot, a solid) fade in on a line over 0.3 s, then trade places along arcs twice. During the second trade the backdrop dims to black for about 0.6 s and returns. They settle into a tight cluster at the left of where the logo will be. |
| 18.7 to 19.4 | Lockup | Wordmark letters draw on beside the mark, left to right, in 0.6 s. A small spaced-out line of text fades in beneath. |
| 19.4 to 21.0 | Hold | Nothing moves for 1.6 s. |

## Rules to carry into a brief

- Give every scene the same backdrop, described in identical words, and keep it static.
- For each cut, name the element that survives it and where it sits on the last frame of one scene and the first frame of the next.
- Reveal sentences word by word, 0.25 to 0.3 s apart, with a fade of 0.1 to 0.2 s and at most 16 px of travel at 1080p. Use a travelling tint for emphasis.
- Remove a sentence the way it arrived: one word at a time, with the survivors sliding to rebalance over 0.4 s on the reposition curve.
- Step lists and carousels on a fixed beat (0.5 s per step: move 0.2 s, rest 0.3 s) rather than scrolling at constant speed. End a stepped sequence with one fast, accelerating exit.
- Keep dim neighbours at 25% to 45% opacity and about 85% size, so the active item is unmistakable.
- Allow at most two empty-backdrop breaths, 0.2 to 0.3 s each, and only before a change of subject.
- End on a lockup that holds still for at least 1.5 s.
- Show the product's own things. Where the reference shows portfolio images, draw the product's interface: cards, lists and controls with real labels.
