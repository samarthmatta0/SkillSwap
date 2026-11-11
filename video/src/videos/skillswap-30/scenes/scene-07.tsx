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

const TAGLINE = ["Learn.", "Teach.", "Grow", "together."];
const WIPE_START = 0.2;
const WIPE = 0.7;
const TAGLINE_START = 1.1;
const TAGLINE_GAP = 0.1;
const LOCKUP_X = -333;
const LOCKUP_Y = -20;
const LOCKUP_APART = 39;

export default function Scene() {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();
  const t = frame / fps;
  const u = height / 1080;
  const wipe = at(t, WIPE_START, WIPE, ARRIVE);
  const circle = (x: number) =>
    ({
      borderRadius: "50%",
      boxSizing: "border-box",
      height: 112 * u,
      left: "50%",
      position: "absolute",
      top: "50%",
      transform: `translate(-50%, -50%) translate(${x * u}px, ${LOCKUP_Y * u}px)`,
      width: 112 * u,
    }) as const;

  return (
    <AbsoluteFill style={{ background: BACKDROP }}>
      <div style={{ ...circle(LOCKUP_X - LOCKUP_APART), border: `${14 * u}px solid #FFFFFF` }} />
      <div style={{ ...circle(LOCKUP_X + LOCKUP_APART), background: "#F59E0B" }} />
      <div
        style={{
          clipPath: `inset(-20% ${100 * (1 - wipe)}% -20% 0)`,
          color: "#FFFFFF",
          fontFamily: FONT,
          fontSize: 140 * u,
          fontWeight: 800,
          left: `calc(50% - ${202 * u}px)`,
          letterSpacing: "-0.03em",
          lineHeight: 1,
          position: "absolute",
          top: `calc(50% + ${LOCKUP_Y * u}px)`,
          transform: "translateY(-50%)",
          whiteSpace: "nowrap",
        }}
      >
        Skill<span style={{ color: "#F59E0B" }}>Swap</span>
      </div>
      <div
        style={{
          display: "flex",
          gap: 12 * u,
          justifyContent: "center",
          left: 0,
          position: "absolute",
          right: 0,
          top: `calc(50% + ${110 * u}px)`,
        }}
      >
        {TAGLINE.map((word, i) => {
          const appear = at(t, TAGLINE_START + i * TAGLINE_GAP, 0.25, ARRIVE);
          return (
            <span
              key={word}
              style={{
                color: "#FFFFFF",
                fontFamily: FONT,
                fontSize: 44 * u,
                letterSpacing: "-0.01em",
                lineHeight: 1,
                opacity: 0.85 * appear,
                transform: `translateY(${(1 - appear) * 14 * u}px)`,
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}
