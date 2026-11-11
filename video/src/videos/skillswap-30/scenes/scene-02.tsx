import type { CSSProperties } from "react";
import { AbsoluteFill, Easing, Img, interpolate, interpolateColors, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

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
const WORDS_LEAVE = 0.3;
const WORD_LEAVE_GAP = 0.1;
const GLIDE_START = 0.8;
const GLIDE = 0.7;
const GROWN = 1.43;
const PILLS_START = 1.6;
const PILL_STAGGER = 0.1;
const TRADE = 0.45;
const TRADES = [
  { column: 0, start: 2.3 },
  { column: 2, start: 2.75 },
  { column: 1, start: 3.2 },
];
const PILLS_LEAVE = 3.68;
const COLUMNS = [-420, 0, 420];
const ROW = 170;
const TOP = [
  { icon: "guitar", label: "Guitar" },
  { icon: "code-xml", label: "React" },
  { icon: "chef-hat", label: "Cooking" },
];
const BOTTOM = [
  { icon: "languages", label: "Spanish" },
  { icon: "camera", label: "Photography" },
  { icon: "person-standing", label: "Yoga" },
];

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
  const glide = at(t, GLIDE_START, GLIDE, MOVE);
  const scale = 1 + (GROWN - 1) * glide;
  const leave = at(t, PILLS_LEAVE, 0.3, LEAVE);

  const pill = ({ icon, label }: { icon: string; label: string }, column: number, top: boolean, order: number) => {
    const start = PILLS_START + order * PILL_STAGGER;
    const trade = TRADES.find((entry) => entry.column === column);
    const travel = trade === undefined ? 0 : at(t, trade.start, TRADE, MOVE);
    const side = Math.sin(Math.PI * travel);
    const direction = top ? 1 : -1;
    const x = COLUMNS[column] + direction * 110 * side;
    const y = direction * (-ROW + 2 * ROW * travel);
    const grow = 0.8 + 0.2 * at(t, start, 0.35, POP);
    return (
      <div
        key={label}
        style={{
          ...line,
          alignItems: "center",
          border: `${2 * u}px solid ${interpolateColors(side, [0, 1], ["rgba(255,255,255,0.7)", "#F59E0B"])}`,
          borderRadius: 999,
          display: "flex",
          fontSize: 40 * u,
          gap: 14 * u,
          height: 76 * u,
          left: "50%",
          opacity: at(t, start, 0.2) * (1 - leave),
          padding: `0 ${34 * u}px 0 ${26 * u}px`,
          position: "absolute",
          top: "50%",
          transform: `translate(-50%, -50%) translate(${x * u}px, ${y * u}px) scale(${grow * (1 - 0.1 * leave)})`,
        }}
      >
        <Img height={36 * u} src={staticFile(`skillswap-30/icons/${icon}.svg`)} width={36 * u} />
        {label}
      </div>
    );
  };

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
          const gone = at(t, WORDS_LEAVE + i * WORD_LEAVE_GAP, 0.25, LEAVE);
          return (
            <span key={word} style={{ ...line, opacity: 1 - gone, transform: `translateY(${gone * 12 * u}px)` }}>
              {word}
            </span>
          );
        })}
      </div>
      <span
        style={{
          ...line,
          color: "#F59E0B",
          left: anchorX,
          position: "absolute",
          top: "50%",
          transform: `translate(calc(${glide * (width / 2 - anchorX)}px + ${-50 * scale * glide}%), -50%) scale(${scale})`,
          transformOrigin: "left center",
        }}
      >
        swap
        <span style={{ left: "100%", opacity: 1 - at(t, GLIDE_START, 0.3), position: "absolute" }}>?</span>
      </span>
      {TOP.map((entry, column) => pill(entry, column, true, column))}
      {BOTTOM.map((entry, column) => pill(entry, column, false, column + 3))}
    </AbsoluteFill>
  );
}
