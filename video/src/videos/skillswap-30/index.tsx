// Assembled by scripts/assemble.mjs from prompts/skillswap-30.md. Running it again rewrites this file.
import { AbsoluteFill, Audio, Sequence, Series, staticFile } from "remotion";
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
      <Sequence durationInFrames={900} from={0} layout="none">
        <Audio src={staticFile("skillswap-30/music/deliberate-thought-32s.mp3")} volume={(f) => 0.8 * Math.max(0, Math.min(1, f / 15, (900 - f) / 45))} />
      </Sequence>
      <Sequence from={9} layout="none">
        <Audio src={staticFile("skillswap-30/sfx/mouse-click.wav")} volume={0.44} />
      </Sequence>
      <Sequence from={18} layout="none">
        <Audio src={staticFile("skillswap-30/sfx/mouse-click.wav")} volume={0.44} />
      </Sequence>
      <Sequence from={27} layout="none">
        <Audio src={staticFile("skillswap-30/sfx/mouse-click.wav")} volume={0.44} />
      </Sequence>
      <Sequence from={36} layout="none">
        <Audio src={staticFile("skillswap-30/sfx/mouse-click.wav")} volume={0.44} />
      </Sequence>
      <Sequence from={45} layout="none">
        <Audio src={staticFile("skillswap-30/sfx/mouse-click.wav")} volume={0.44} />
      </Sequence>
      <Sequence from={54} layout="none">
        <Audio src={staticFile("skillswap-30/sfx/mouse-click.wav")} volume={0.6} />
      </Sequence>
      <Sequence from={147} layout="none">
        <Audio src={staticFile("skillswap-30/sfx/whoosh.wav")} volume={0.7} />
      </Sequence>
      <Sequence from={189} layout="none">
        <Audio src={staticFile("skillswap-30/sfx/switch.wav")} volume={0.8} />
      </Sequence>
      <Sequence from={203} layout="none">
        <Audio src={staticFile("skillswap-30/sfx/switch.wav")} volume={0.8} />
      </Sequence>
      <Sequence from={216} layout="none">
        <Audio src={staticFile("skillswap-30/sfx/switch.wav")} volume={0.8} />
      </Sequence>
      <Sequence from={242} layout="none">
        <Audio src={staticFile("skillswap-30/sfx/whoosh.wav")} volume={0.6} />
      </Sequence>
      <Sequence from={336} layout="none">
        <Audio src={staticFile("skillswap-30/sfx/whip.wav")} volume={0.6} />
      </Sequence>
      <Sequence from={372} layout="none">
        <Audio src={staticFile("skillswap-30/sfx/switch.wav")} volume={0.56} />
      </Sequence>
      <Sequence from={387} layout="none">
        <Audio src={staticFile("skillswap-30/sfx/switch.wav")} volume={0.56} />
      </Sequence>
      <Sequence from={402} layout="none">
        <Audio src={staticFile("skillswap-30/sfx/switch.wav")} volume={0.56} />
      </Sequence>
      <Sequence from={417} layout="none">
        <Audio src={staticFile("skillswap-30/sfx/switch.wav")} volume={0.56} />
      </Sequence>
      <Sequence from={432} layout="none">
        <Audio src={staticFile("skillswap-30/sfx/switch.wav")} volume={0.56} />
      </Sequence>
      <Sequence from={459} layout="none">
        <Audio src={staticFile("skillswap-30/sfx/whip.wav")} volume={0.7} />
      </Sequence>
      <Sequence from={501} layout="none">
        <Audio src={staticFile("skillswap-30/sfx/whoosh.wav")} volume={0.8} />
      </Sequence>
      <Sequence from={656} layout="none">
        <Audio src={staticFile("skillswap-30/sfx/whoosh.wav")} volume={0.7} />
      </Sequence>
      <Sequence from={696} layout="none">
        <Audio src={staticFile("skillswap-30/sfx/whip.wav")} volume={0.6} />
      </Sequence>
      <Sequence from={722} layout="none">
        <Audio src={staticFile("skillswap-30/sfx/whip.wav")} volume={0.6} />
      </Sequence>
      <Sequence from={788} layout="none">
        <Audio src={staticFile("skillswap-30/sfx/whoosh.wav")} volume={0.6} />
      </Sequence>
      <Sequence from={813} layout="none">
        <Audio src={staticFile("skillswap-30/sfx/ding.wav")} volume={0.6} />
      </Sequence>
    </AbsoluteFill>
  );
}
