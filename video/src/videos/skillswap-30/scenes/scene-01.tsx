import type { CSSProperties } from "react";
import { AbsoluteFill, Easing, interpolate, interpolateColors, useCurrentFrame, useVideoConfig } from "remotion";

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

const LEADING = ["What", "if", "learning", "was", "a"];
const FIRST_WORD = 0.3;
const WORD_GAP = 0.3;
const WORD_FADE = 0.18;
const TICK_LEAD = 0.2;
const TINT_DELAY = 0.45;
const TINT_HOLD = 0.3;
const ANCHOR_START = FIRST_WORD + LEADING.length * WORD_GAP;
const ANCHOR_TURNS_AMBER = ANCHOR_START + 0.6;

export default function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const t = frame / fps;
  const u = height / 1080;
  const size = 84 * u;
  const gap = 22 * u;
  const anchorX = width * 0.66;
  const line: CSSProperties = {
    color: "#FFFFFF",
    fontFamily: FONT,
    fontSize: size,
    fontWeight: 400,
    letterSpacing: "-0.01em",
    lineHeight: 1,
    whiteSpace: "nowrap",
  };
  const tick = (corner: "start" | "end", visible: boolean): CSSProperties => ({
    borderColor: "#FFFFFF",
    borderStyle: "solid",
    borderWidth: corner === "start" ? `${2 * u}px 0 0 ${2 * u}px` : `0 ${2 * u}px ${2 * u}px 0`,
    height: 14 * u,
    opacity: visible ? 0.7 : 0,
    position: "absolute",
    width: 14 * u,
    ...(corner === "start" ? { left: -8 * u, top: -8 * u } : { bottom: -8 * u, right: -8 * u }),
  });
  const ticksVisible = (start: number) => t >= start - TICK_LEAD && t < start;
  const anchorIn = at(t, ANCHOR_START, WORD_FADE, ARRIVE);
  const anchorColor = interpolateColors(at(t, ANCHOR_TURNS_AMBER, 0.3), [0, 1], ["#FFFFFF", "#F59E0B"]);

  return (
    <AbsoluteFill style={{ background: BACKDROP }}>
      <div
        style={{
          display: "flex",
          gap,
          position: "absolute",
          right: width - (anchorX - gap),
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        {LEADING.map((word, i) => {
          const start = FIRST_WORD + i * WORD_GAP;
          const appear = at(t, start, WORD_FADE, ARRIVE);
          const tint = at(t, start + TINT_DELAY, 0.1) - at(t, start + TINT_DELAY + TINT_HOLD, 0.1);
          return (
            <span key={word} style={{ ...line, position: "relative" }}>
              <span style={tick("start", ticksVisible(start))} />
              <span style={tick("end", ticksVisible(start))} />
              <span
                style={{
                  color: interpolateColors(tint, [0, 1], ["#FFFFFF", "#FCD34D"]),
                  display: "inline-block",
                  opacity: appear,
                  transform: `translateY(${(1 - appear) * 14 * u}px)`,
                }}
              >
                {word}
              </span>
            </span>
          );
        })}
      </div>
      <span style={{ ...line, left: anchorX, position: "absolute", top: "50%", transform: "translateY(-50%)" }}>
        <span style={tick("start", ticksVisible(ANCHOR_START))} />
        <span style={tick("end", ticksVisible(ANCHOR_START))} />
        <span
          style={{
            color: anchorColor,
            display: "inline-block",
            opacity: anchorIn,
            position: "relative",
            transform: `translateY(${(1 - anchorIn) * 14 * u}px)`,
          }}
        >
          swap
          <span style={{ left: "100%", position: "absolute" }}>?</span>
        </span>
      </span>
    </AbsoluteFill>
  );
}
