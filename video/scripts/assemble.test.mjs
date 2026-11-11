import assert from "node:assert/strict";
import { test } from "node:test";
import { assembleIndex, parseBrief, sceneFile, validate } from "./assemble.mjs";

const GOOD = `import { AbsoluteFill, useCurrentFrame } from "remotion";

export default function Scene() {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{ opacity: frame / 90 }} />;
}
`;

const BRIEF = `---
width: 1080
height: 1920
fps: 30
---
# Demo

For everyone. Blue and amber.

## Scene: Hook (4s)

The headline rises.

## Scene 2: Proof (2.5s)

A number counts up.
`;

test("validate accepts a self-contained composition", () => {
  assert.deepEqual(validate(GOOD), []);
});

test("validate rejects foreign imports, network access and nondeterminism", () => {
  const bad = `${GOOD}\nimport fs from "node:fs";\nimport { Card } from "@/components/card";\nimport { fade } from "./fade";\nfetch("https://example.com");\nMath.random();\n`;
  const problems = validate(bad).join("\n");
  assert.match(problems, /imports "node:fs"/);
  assert.doesNotMatch(problems, /components\/card|\.\/fade/);
  assert.match(problems, /calls fetch\(\)/);
  assert.match(problems, /Math\.random/);
});

test("validate requires a default export", () => {
  assert.match(validate(GOOD.replace("export default ", "")).join("\n"), /no default export/);
});

test("parseBrief reads the format, the overview and each scene", () => {
  const brief = parseBrief(BRIEF);
  assert.deepEqual([brief.width, brief.height, brief.fps], [1080, 1920, 30]);
  assert.match(brief.overview, /Blue and amber/);
  assert.deepEqual(
    brief.scenes.map((scene) => [scene.name, scene.seconds, scene.frames, scene.text]),
    [
      ["Hook", 4, 120, "The headline rises."],
      ["Proof", 2.5, 75, "A number counts up."],
    ]
  );
});

test("parseBrief defaults to 1920x1080 at 30 fps and rejects bad briefs", () => {
  const brief = parseBrief("# T\n\n## Scene: Only (3s)\n\nText.\n");
  assert.deepEqual([brief.width, brief.height, brief.fps], [1920, 1080, 30]);
  assert.throws(() => parseBrief("# No scenes here\n"), /no scenes/);
  assert.throws(() => parseBrief("---\nfps: 999\n---\n## Scene: A (3s)\n"), /fps must be/);
  assert.throws(() => parseBrief("---\nsize: 4\n---\n## Scene: A (3s)\n"), /unknown setting/);
  assert.throws(() => parseBrief("## Scene: Long (90s)\n"), /lasts 90 s/);
});

test("assembleIndex joins the scenes and totals their frames", () => {
  const index = assembleIndex(parseBrief(BRIEF), "prompts/demo.md");
  assert.equal(sceneFile(0), "scene-01.tsx");
  assert.match(index, /import Scene02 from "\.\/scenes\/scene-02";/);
  assert.match(index, /durationInFrames: 195, fps: 30, height: 1920, width: 1080/);
  assert.match(index, /<Series\.Sequence durationInFrames=\{75\}>\n\s+<Scene02 \/>/);
});

test("parseBrief reads the Sound cue sheet and the Assets list", () => {
  const brief = parseBrief(`# T

## Sound

| At (s) | File | Volume | Length (s) | Marks |
| --- | --- | --- | --- | --- |
| 0 | \`music/bed.mp3\` | 0.4 | 6 | Bed |
| 1.5 | sfx/tick.wav | 0.8 | | A word lands |

## Assets

| File | What it is | Licence |
| --- | --- | --- |
| icons/guitar.svg | A white guitar icon | ISC |

## Scene: Only (6s)

Text.
`);
  assert.deepEqual(brief.sound, [
    { at: 0, file: "music/bed.mp3", length: 6, volume: 0.4 },
    { at: 1.5, file: "sfx/tick.wav", length: null, volume: 0.8 },
  ]);
  assert.deepEqual(brief.assets, [{ file: "icons/guitar.svg", what: "A white guitar icon" }]);
  const index = assembleIndex(brief, "prompts/t.md", "demo");
  assert.match(index, /import \{ AbsoluteFill, Audio, Sequence, Series, staticFile \} from "remotion";/);
  assert.match(index, /<Sequence from=\{45\} layout="none">\n\s+<Audio src=\{staticFile\("demo\/sfx\/tick\.wav"\)\} volume=\{0\.8\} \/>/);
  assert.match(index, /<Sequence durationInFrames=\{180\} from=\{0\} layout="none">/);
});

test("parseBrief rejects unsafe sound paths and volumes", () => {
  const sound = (row) => `## Sound\n\n| At | File | Volume |\n| --- | --- | --- |\n${row}\n\n## Scene: A (3s)\n`;
  assert.throws(() => parseBrief(sound("| 0 | ../secret.mp3 | 0.5 |")), /not a plain file path/);
  assert.throws(() => parseBrief(sound("| 0 | a.mp3 | 3 |")), /volume/);
});

