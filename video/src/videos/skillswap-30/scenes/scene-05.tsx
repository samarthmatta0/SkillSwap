import type { CSSProperties } from "react";
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

const PAIRS = [
  ["Guitar", "Spanish"],
  ["React", "Photography"],
  ["Cooking", "Yoga"],
  ["Excel", "Public speaking"],
  ["Spanish", "React"],
  ["Yoga", "Guitar"],
  ["Photography", "Cooking"],
];
const SWING_START = 0.1;
const SWING = 0.7;
const DEGREES_PER_SECOND = 38;
const CAPTION_IN = 1.2;
const CAPTION_OUT = 4.9;
const RISE_START = 5.3;
const RISE = 0.45;

export default function Scene() {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();
  const t = frame / fps;
  const u = height / 1080;
  const swing = at(t, SWING_START, SWING, ARRIVE);
  const rise = at(t, RISE_START, RISE, LEAVE);
  const captionIn = at(t, CAPTION_IN, 0.4, ARRIVE);
  const caption = captionIn * (1 - at(t, CAPTION_OUT, 0.3));
  const text: CSSProperties = { color: "#1E3A8A", fontFamily: FONT, letterSpacing: "-0.01em" };

  return (
    <AbsoluteFill style={{ background: BACKDROP }}>
      <AbsoluteFill style={{ perspective: 1700 * u, perspectiveOrigin: "50% 46%" }}>
        <div
          style={{
            left: "50%",
            opacity: at(t, SWING_START, 0.2),
            position: "absolute",
            top: "46%",
            transform: `translate(${-900 * u * (1 - swing)}px, ${(700 * (1 - swing) - 1100 * rise) * u}px) rotateZ(${24 * (1 - swing)}deg) scale(${0.8 + 0.2 * swing})`,
            transformStyle: "preserve-3d",
          }}
        >
          <div
            style={{
              transform: `rotateX(-8deg) rotateY(${-(20 + DEGREES_PER_SECOND * t)}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {PAIRS.map(([teach, learn], i) => (
              <div
                key={teach + learn}
                style={{
                  backfaceVisibility: "hidden",
                  background: i % 2 === 0 ? "#FFFFFF" : "#EAF1FF",
                  borderRadius: 28 * u,
                  boxShadow: `0 ${24 * u}px ${60 * u}px rgba(2, 6, 40, 0.45)`,
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14 * u,
                  height: 450 * u,
                  left: -170 * u,
                  padding: 30 * u,
                  position: "absolute",
                  top: -225 * u,
                  transform: `rotateY(${(i * 360) / PAIRS.length}deg) translateZ(${440 * u}px)`,
                  width: 340 * u,
                }}
              >
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      background: "#FFFFFF",
                      border: `${10 * u}px solid #1E3A8A`,
                      borderRadius: "50%",
                      boxSizing: "border-box",
                      height: 64 * u,
                      width: 64 * u,
                    }}
                  />
                  <div
                    style={{
                      background: "#F59E0B",
                      borderRadius: "50%",
                      height: 64 * u,
                      marginLeft: -18 * u,
                      width: 64 * u,
                    }}
                  />
                </div>
                <div style={{ ...text, fontSize: 38 * u, fontWeight: 700, lineHeight: 1.1, marginTop: 8 * u }}>{teach}</div>
                <div style={{ ...text, color: "#64748B", fontSize: 22 * u, lineHeight: 1 }}>for</div>
                <div style={{ ...text, fontSize: 38 * u, fontWeight: 700, lineHeight: 1.1 }}>{learn}</div>
                <div style={{ ...text, color: "#64748B", fontSize: 22 * u, lineHeight: 1.2, marginTop: "auto" }}>
                  Live 1:1 session
                </div>
                <div
                  style={{
                    ...text,
                    alignSelf: "flex-start",
                    background: "#10B981",
                    borderRadius: 999,
                    color: "#FFFFFF",
                    fontSize: 22 * u,
                    fontWeight: 600,
                    lineHeight: 1,
                    padding: `${9 * u}px ${18 * u}px`,
                  }}
                >
                  Matched
                </div>
              </div>
            ))}
          </div>
        </div>
      </AbsoluteFill>
      <div
        style={{
          color: "#FFFFFF",
          fontFamily: FONT,
          fontSize: 44 * u,
          left: 0,
          letterSpacing: "-0.01em",
          lineHeight: 1,
          opacity: caption,
          position: "absolute",
          right: 0,
          textAlign: "center",
          top: `calc(50% + ${400 * u}px)`,
          transform: `translateY(${(1 - captionIn) * 14 * u}px)`,
        }}
      >
        Real people. Live 1:1 sessions.
      </div>
    </AbsoluteFill>
  );
}
