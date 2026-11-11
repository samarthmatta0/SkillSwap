import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

const FONT = "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif";
const ARRIVE = Easing.bezier(0.33, 1, 0.68, 1);
const LEAVE = Easing.bezier(0.32, 0, 0.67, 0);
const MOVE = Easing.bezier(0.65, 0, 0.35, 1);
const POP = Easing.bezier(0.38, 1.21, 0.22, 1);
const BACKDROP =
  "radial-gradient(60% 45% at 45% 8%, #2F6BFF 0%, rgba(47,107,255,0) 70%), radial-gradient(55% 50% at 82% 96%, #3B82F6 0%, rgba(59,130,246,0) 70%), radial-gradient(90% 60% at 60% 50%, #1E3A8A 0%, rgba(30,58,138,0) 75%), #050A30";

// Progress from 0 to 1 of an event that starts at `start` seconds and lasts `duration`.
const at = (t: number, start: number, duration: number, easing: (n: number) => number = (n) => n) =>
  interpolate(t, [start, start + duration], [0, 1], { easing, extrapolateLeft: "clamp", extrapolateRight: "clamp" });

const FADE_IN = 0.1;
const FIRST_TRADE = 0.6;
const SECOND_TRADE = 1.45;
const TRADE = 0.65;
const DIM_START = 1.3;
const DIM = 1.0;
const GLIDE_START = 2.3;
const GLIDE = 0.7;
const APART = 90;
const LOCKUP_X = -333;
const LOCKUP_Y = -20;
const LOCKUP_APART = 39;

export default function Scene() {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();
  const t = frame / fps;
  const u = height / 1080;
  const appear = at(t, FADE_IN, 0.35);
  // Each trade is half a turn: the ring goes over the top, the disc under the bottom.
  const second = t >= SECOND_TRADE;
  const angle = Math.PI * (second ? at(t, SECOND_TRADE, TRADE, MOVE) : at(t, FIRST_TRADE, TRADE, MOVE));
  const side = second ? 1 : -1;
  const glide = at(t, GLIDE_START, GLIDE, MOVE);
  const mix = (from: number, to: number) => from + (to - from) * glide;
  const ring = {
    x: mix(side * APART * Math.cos(angle), LOCKUP_X - LOCKUP_APART),
    y: mix(-APART * Math.sin(angle), LOCKUP_Y),
  };
  const disc = {
    x: mix(-side * APART * Math.cos(angle), LOCKUP_X + LOCKUP_APART),
    y: mix(APART * Math.sin(angle), LOCKUP_Y),
  };
  const dim = 0.55 * Math.sin(Math.PI * at(t, DIM_START, DIM)) ** 2;
  const circle = (x: number, y: number) =>
    ({
      borderRadius: "50%",
      boxSizing: "border-box",
      height: 112 * u,
      left: "50%",
      opacity: appear,
      position: "absolute",
      top: "50%",
      transform: `translate(-50%, -50%) translate(${x * u}px, ${y * u}px)`,
      width: 112 * u,
    }) as const;

  return (
    <AbsoluteFill style={{ background: BACKDROP }}>
      <AbsoluteFill style={{ background: "#000000", opacity: dim }} />
      <div style={{ ...circle(ring.x, ring.y), border: `${14 * u}px solid #FFFFFF` }} />
      <div style={{ ...circle(disc.x, disc.y), background: "#F59E0B" }} />
    </AbsoluteFill>
  );
}
