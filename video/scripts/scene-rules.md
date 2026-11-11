# Scene rules

How to write one scene of a video for this project. A scene is one file, `src/videos/<id>/scenes/scene-NN.tsx`, written from its section of the brief. `scripts/assemble.mjs` joins the scenes in order and places the sound, so a scene's job is to move smoothly and cut cleanly against its neighbours.

## The file

- Export the scene as the default export, taking no props: `export default function Scene() { ... }`.
- Import from `remotion`, `@remotion/*` packages, `react`, and files in this project. Nothing from the network.
- Fill the frame, starting with an `<AbsoluteFill>` that sets the background.
- It must type-check under `strict` (`npm run check`).

The scene is mounted inside a sequence, so `useCurrentFrame()` starts at 0 on the scene's first frame. The brief states how long the scene lasts; put its event times in named constants and time the scene against them.

## Determinism

A frame must look the same every time it is rendered, in any order. Derive all motion from `useCurrentFrame()` and `useVideoConfig()`.

- Never use CSS transitions, CSS animations, `@keyframes`, `requestAnimationFrame`, timers, `Date`, or `Math.random()`. For pseudo-random values use `random(seed)` from `remotion`.
- Never fetch anything or reference a URL or a font file. Draw with `div`s, inline SVG and text.
- Load files only from the brief's Assets table, with `staticFile("<id>/<file>")` and `<Img>` (or `<OffthreadVideo>` for footage). Give every image an explicit width and height.
- Do not add audio in a scene. Music and sound effects are placed when the scenes are joined; the brief's Sound table says which moments they mark, so make those moments land exactly on time.
- Use this font stack, which needs no loading: `'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif`.

## Plan the events before the curves

Smooth motion comes from timing that follows from the content, so work the timeline out first.

- Write the scene's events as named constants in seconds at the top of the file, then convert with `fps`. Derive every dependent time from the one before it: a line that follows a headline starts at `headlineEnd + gap`, where `headlineEnd = start + (wordCount - 1) * stagger + wordDuration`. Do not type an unrelated frame number for an event that waits on another.
- A reading window opens when the text has stopped moving, not when it mounts. Hold text for at least 0.3 seconds per word after it lands, and never less than 1.2 seconds.
- Budget entrance, reading and exit together so they fit the scene's frame count. If they do not fit, show less.

## Curves and springs

Choose the curve for the gesture. Use these with `Easing.bezier(...)`:

| Gesture | Curve |
| --- | --- |
| Arrive and settle | `0.33, 1, 0.68, 1` |
| Leave, gathering speed | `0.32, 0, 0.67, 0` |
| Move between two resting positions | `0.65, 0, 0.35, 1` |
| Land with a slight overshoot | `0.38, 1.21, 0.22, 1` |

- Always pass `extrapolateLeft: "clamp"` and `extrapolateRight: "clamp"` to `interpolate()`.
- Nothing starts or stops at full speed. Linear motion is only for continuous travel such as a progress line or a slow background drift.
- Use `spring()` when an object should arrive with momentum. Never call it without a config: the default overshoots by 16%. Pick a response time `d` in seconds and a bounce `b` from 0 (none) to about 0.3, then with mass 1 use `stiffness = (2π / d)²` and `damping = 4π(1 − b) / d`. For example `d = 0.5`, `b = 0` gives stiffness 158 and damping 25.
- Give opacity its own driver that never overshoots and finishes no later than the move it accompanies. An overshooting opacity clips at 1 and dips back, which reads as a flicker.
- Entrances take 0.4 to 0.7 seconds and decelerate. Exits are quicker, 0.25 to 0.4 seconds, and accelerate.
- Stagger a group by 2 to 5 frames per item. Keep travel distances small, 16 to 80 px at 1080p, unless the move is the point of the shot.
- When one move joins another without a cut, the speed must not jump at the join.

## Staging

- One idea per scene and one focal element at a time. Every element earns its place by carrying the message.
- After an element arrives, let it rest. If a hold feels flat, give one element a slow purposeful change, such as a counter finishing or a line completing, not jitter on everything.
- Product videos show the product: draw interface pieces (cards, inputs, buttons, lists, charts) as simple, crisp shapes with real labels from the brief rather than abstract decoration.
- Lay out with flexbox inside `<AbsoluteFill>`. Size everything from the `width` and `height` of `useVideoConfig()` so the layout holds at other frame sizes.
- Keep text inside a safe margin of 8% of the frame on every side. At 1920x1080, headlines are 96 to 160 px, supporting lines 36 to 56 px, and nothing is smaller than 28 px.
- Use only the colours given in the brief, plus tints and shades of them. Use only the copy given in the brief: never invent a number, a quote or a claim.

## Cutting against the neighbours

- Read the scene before and the scene after in the brief. Start from a state that follows the previous scene's last frame and end on a state the next scene can open from, as the brief describes: a shared colour, shape, position or direction of travel.
- Unless the brief asks for a hard cut, finish the exit in the last 0.25 to 0.4 seconds, so the scene's final frame is its hand-off state.
- The last scene of a video ends on a still, readable frame held for at least 1.5 seconds.
