// Assembled by scripts/generate.mjs from prompts/skillswap-30.md. Running it again rewrites this file.
import { AbsoluteFill, Series } from "remotion";
import Scene01 from "./scenes/scene-01";
import Scene02 from "./scenes/scene-02";
import Scene03 from "./scenes/scene-03";
import Scene04 from "./scenes/scene-04";
import Scene05 from "./scenes/scene-05";
import Scene06 from "./scenes/scene-06";
import Scene07 from "./scenes/scene-07";

export const meta = { durationInFrames: 900, fps: 30, height: 1080, width: 1920 };

export default function Video() {
  return (
    <AbsoluteFill>
      <Series>
        <Series.Sequence durationInFrames={120}>
          <Scene01 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={120}>
          <Scene02 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={120}>
          <Scene03 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={135}>
          <Scene04 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={180}>
          <Scene05 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={105}>
          <Scene06 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={120}>
          <Scene07 />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
}
