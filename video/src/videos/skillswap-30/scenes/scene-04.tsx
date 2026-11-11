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

const SKILLS = ["Guitar", "Spanish", "React", "Photography", "Cooking", "Yoga", "Public speaking", "Excel"];
const WHEEL_IN = 0.4;
const FIRST_STEP = 0.4;
const STEP_EVERY = 0.5;
const STEP_MOVE = 0.2;
const STEPS = 5;
const SPIN_START = 3.2;
const SPIN = 0.8;
const SPIN_LINES = 8;
const FADE_START = 3.6;
const FADE = 0.4;
const DEGREES_PER_LINE = 8;

export default function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const t = frame / fps;
  const u = height / 1080;
  const size = 84 * u;
  const rowX = width * 0.16;
  const line: CSSProperties = {
    color: "#FFFFFF",
    fontFamily: FONT,
    fontSize: size,
    fontWeight: 400,
    letterSpacing: "-0.01em",
    lineHeight: 1,
    whiteSpace: "nowrap",
  };
  const wheelIn = at(t, 0, WHEEL_IN, ARRIVE);
  let position = -0.5 * (1 - wheelIn);
  for (let step = 0; step < STEPS; step += 1) {
    position += at(t, FIRST_STEP + step * STEP_EVERY, STEP_MOVE, MOVE);
  }
  position += SPIN_LINES * at(t, SPIN_START, SPIN, LEAVE);
  const fade = 1 - at(t, FADE_START, FADE);
  const dot = 16 * u;
  const nearest = Math.round(position);
  const lines = Array.from({ length: 11 }, (_, k) => nearest - 5 + k);

  return (
    <AbsoluteFill style={{ background: BACKDROP }}>
      <span
        style={{ ...line, left: rowX, opacity: fade, position: "absolute", top: "50%", transform: "translateY(-50%)" }}
      >
        learn
        <span
          style={{
            background: "#FFFFFF",
            borderRadius: "50%",
            height: dot,
            left: `calc(100% + ${60 * u}px)`,
            position: "absolute",
            top: size * 0.54 - dot / 2,
            width: dot,
          }}
        />
        <span style={{ height: size, left: `calc(100% + ${110 * u}px)`, position: "absolute", top: 0 }}>
          {lines.map((index) => {
            const distance = index - position;
            const active = 1 - Math.min(1, Math.abs(distance));
            return (
              <span
                key={index}
                style={{
                  ...line,
                  color: interpolateColors(active, [0, 1], ["#8FB0FF", "#FFFFFF"]),
                  fontSize: size * (0.85 + 0.15 * active),
                  left: 0,
                  lineHeight: `${size}px`,
                  opacity: Math.max(0, 1 - 0.24 * Math.abs(distance)) * wheelIn,
                  position: "absolute",
                  top: 0,
                  transform: `rotate(${distance * DEGREES_PER_LINE}deg)`,
                  transformOrigin: `${-700 * u}px 50%`,
                }}
              >
                {SKILLS[((index % SKILLS.length) + SKILLS.length) % SKILLS.length]}
              </span>
            );
          })}
        </span>
      </span>
    </AbsoluteFill>
  );
}
