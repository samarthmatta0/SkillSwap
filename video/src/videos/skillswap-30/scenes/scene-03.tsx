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

const FOLLOWING = ["what", "you", "know", "to"];
const GLIDE = 0.55;
const GROWN = 1.43;
const WORDS_START = 0.5;
const WORD_GAP = 0.16;
const WORD_FADE = 0.18;
const LEARN_START = WORDS_START + FOLLOWING.length * WORD_GAP;
const WORDS_LEAVE = 2.6;
const LEAVE_GAP = 2 / 30;
const SLIDE_START = 3.0;
const SLIDE = 0.6;

export default function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const t = frame / fps;
  const u = height / 1080;
  const size = 84 * u;
  const gap = 22 * u;
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
  const glide = at(t, 0, GLIDE, MOVE);
  const scale = GROWN - (GROWN - 1) * glide;
  const gone = (order: number) => at(t, WORDS_LEAVE + order * LEAVE_GAP, 0.25, LEAVE);
  const slide = at(t, SLIDE_START, SLIDE, MOVE);
  const learnIn = at(t, LEARN_START, WORD_FADE, ARRIVE);
  const dot = (10 + 6 * slide) * u;

  return (
    <AbsoluteFill style={{ background: BACKDROP }}>
      <div
        style={{
          display: "inline-flex",
          gap,
          left: rowX,
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <span
          style={{
            ...line,
            color: "#F59E0B",
            opacity: 1 - gone(0),
            transform: `translate(calc(${(1 - glide) * (width / 2 - rowX)}px + ${-50 * scale * (1 - glide)}%), ${gone(0) * 12 * u}px) scale(${scale})`,
            transformOrigin: "left center",
          }}
        >
          swap
        </span>
        {FOLLOWING.map((word, i) => {
          const appear = at(t, WORDS_START + i * WORD_GAP, WORD_FADE, ARRIVE);
          const leaving = gone(i + 1);
          return (
            <span
              key={word}
              style={{
                ...line,
                opacity: appear * (1 - leaving),
                transform: `translateY(${((1 - appear) * 14 + leaving * 12) * u}px)`,
              }}
            >
              {word}
            </span>
          );
        })}
        <span
          style={{
            ...line,
            left: `calc(${100 * (1 - slide)}% + ${gap * (1 - slide)}px)`,
            opacity: learnIn,
            position: "absolute",
            top: 0,
            transform: `translateY(${(1 - learnIn) * 14 * u}px)`,
          }}
        >
          learn
          <span
            style={{
              background: "#FFFFFF",
              borderRadius: "50%",
              height: dot,
              left: `calc(100% + ${(4 + 56 * slide) * u}px)`,
              position: "absolute",
              top: size * (0.76 - 0.22 * slide) - dot / 2,
              width: dot,
            }}
          />
        </span>
      </div>
    </AbsoluteFill>
  );
}
