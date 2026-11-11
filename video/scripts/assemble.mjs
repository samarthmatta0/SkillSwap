#!/usr/bin/env node
// Checks a video's hand-written scenes against its brief and joins them.
//
//   node scripts/assemble.mjs prompts/skillswap-30.md
//
// The brief (prompts/<id>.md) says how long each scene lasts, which sound cues
// play and which asset files exist. The scenes live in
// src/videos/<id>/scenes/scene-NN.tsx. This writes src/videos/<id>/index.tsx.

import { access, readFile, writeFile } from "node:fs/promises";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";

const HERE = dirname(fileURLToPath(import.meta.url));
const PROJECT = resolve(HERE, "..");

// A scene may use Remotion, React and this project's own files.
const ALLOWED_IMPORTS = [/^remotion$/, /^@remotion\//, /^react$/, /^\.{1,2}\//, /^@\//];

// A frame has to render the same every time, in any order.
const BANNED = [
  [/\bfetch\s*\(/, "calls fetch()"],
  [/\bXMLHttpRequest\b|\bWebSocket\b|\bEventSource\b/, "opens a network connection"],
  [/\beval\s*\(|\bnew\s+Function\b/, "evaluates code from a string"],
  [/\brequire\s*\(/, "calls require()"],
  [/\bimport\s*\(/, "uses a dynamic import()"],
  [/\bprocess\./, "reads process.*"],
  [/\bMath\.random\s*\(/, "uses Math.random() (use random(seed) from remotion)"],
  [/\bDate\.now\s*\(|\bnew\s+Date\s*\(/, "reads the clock"],
  [/\bsetTimeout\s*\(|\bsetInterval\s*\(/, "uses timers instead of the frame"],
];

const FORMAT_LIMITS = {
  fps: [1, 120],
  height: [16, 4320],
  width: [16, 7680],
};
const FORMAT_DEFAULTS = { fps: 30, height: 1080, width: 1920 };
const SCENE_SECONDS = [0.5, 60];

export function validate(code) {
  const problems = [];

  const specifiers = [
    ...code.matchAll(/\bfrom\s*["']([^"']+)["']/g),
    ...code.matchAll(/^\s*import\s*["']([^"']+)["']/gm),
  ].map((match) => match[1]);
  for (const specifier of new Set(specifiers)) {
    if (!ALLOWED_IMPORTS.some((allowed) => allowed.test(specifier))) {
      problems.push(`imports "${specifier}" (use remotion, @remotion packages, react, or files in this project)`);
    }
  }

  for (const [pattern, reason] of BANNED) {
    if (pattern.test(code)) {
      problems.push(reason);
    }
  }

  if (!/\bexport\s+default\b/.test(code)) {
    problems.push("has no default export for the scene component");
  }

  return problems;
}

// A brief is optional front matter (width, height, fps), then text that applies
// to the whole video, then one "## Scene: Name (4s)" section per animation.
export function parseBrief(text) {
  const format = { ...FORMAT_DEFAULTS };
  let body = text.replace(/\r\n/g, "\n");
  const front = /^---\n([\s\S]*?)\n---\n/.exec(body);
  if (front !== null) {
    body = body.slice(front[0].length);
    for (const line of front[1].split("\n")) {
      const pair = /^\s*([a-z]+)\s*:\s*(\S+)\s*$/.exec(line);
      if (pair === null) {
        continue;
      }
      if (!(pair[1] in FORMAT_LIMITS)) {
        throw new Error(`the brief's front matter has an unknown setting "${pair[1]}"; use width, height or fps`);
      }
      const value = Number(pair[2]);
      const [min, max] = FORMAT_LIMITS[pair[1]];
      if (!Number.isInteger(value) || value < min || value > max) {
        throw new Error(`the brief's ${pair[1]} must be a whole number from ${min} to ${max}`);
      }
      format[pair[1]] = value;
    }
  }

  const heading = /^##[ \t]+Scene(?:[ \t]+\d+)?[ \t]*:[ \t]*(.+?)[ \t]*\((\d+(?:\.\d+)?)[ \t]*s\)[ \t]*$/gim;
  const marks = [...body.matchAll(heading)];
  if (marks.length === 0) {
    throw new Error('the brief has no scenes; add sections headed like "## Scene: Hook (4s)"');
  }
  const scenes = marks.map((mark, index) => {
    const seconds = Number(mark[2]);
    if (seconds < SCENE_SECONDS[0] || seconds > SCENE_SECONDS[1]) {
      throw new Error(`scene "${mark[1]}" lasts ${seconds} s; use ${SCENE_SECONDS[0]} to ${SCENE_SECONDS[1]}`);
    }
    const end = index + 1 < marks.length ? marks[index + 1].index : body.length;
    return {
      name: mark[1],
      seconds,
      frames: Math.round(seconds * format.fps),
      text: body.slice(mark.index + mark[0].length, end).trim(),
    };
  });

  const overview = body.slice(0, marks[0].index).trim();
  return { ...format, overview, scenes, sound: parseSound(overview), assets: parseAssets(overview) };
}

// The rows of the table under a "## Title" heading in the overview, as trimmed cells.
function tableRows(overview, title) {
  const start = new RegExp(`^##[ \\t]+${title}[ \\t]*$`, "im").exec(overview);
  if (start === null) {
    return [];
  }
  const rest = overview.slice(start.index + start[0].length);
  const next = /^##[ \t]+/m.exec(rest);
  return (next === null ? rest : rest.slice(0, next.index))
    .split("\n")
    .filter((line) => /^\s*\|/.test(line) && !/^\s*\|[\s:|-]+$/.test(line))
    .map((line) => line.trim().replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim().replace(/^`|`$/g, "")));
}

const safeFile = (file) => /^[A-Za-z0-9][A-Za-z0-9._/-]*\.[A-Za-z0-9]+$/.test(file) && !file.includes("..");

// "## Sound" is a cue sheet: | At (s) | File | Volume | Length (s) | Marks |.
// A cue with a length is a bed: it is cut to that length and faded in and out.
export function parseSound(overview) {
  return tableRows(overview, "Sound")
    .filter((cells) => /^\d+(\.\d+)?$/.test(cells[0] ?? ""))
    .map((cells) => {
      const [at, file, volume, length] = cells;
      if (!safeFile(file ?? "")) {
        throw new Error(`the Sound table names "${file}", which is not a plain file path`);
      }
      const level = Number(volume);
      if (!(level > 0 && level <= 1)) {
        throw new Error(`the Sound table gives ${file} a volume of "${volume}"; use a number above 0 and up to 1`);
      }
      return { at: Number(at), file, volume: level, length: /^\d+(\.\d+)?$/.test(length ?? "") ? Number(length) : null };
    });
}

// "## Assets" lists the files a scene may load: | File | What it is | ... |.
export function parseAssets(overview) {
  return tableRows(overview, "Assets")
    .filter((cells) => safeFile(cells[0] ?? ""))
    .map(([file, what = ""]) => ({ file, what }));
}

export const sceneFile = (index) => `scene-${String(index + 1).padStart(2, "0")}.tsx`;

export function assembleIndex(brief, source, id = "video") {
  const names = brief.scenes.map((_, i) => `Scene${String(i + 1).padStart(2, "0")}`);
  const total = brief.scenes.reduce((sum, scene) => sum + scene.frames, 0);
  const frames = (seconds) => Math.round(seconds * brief.fps);
  const cues = brief.sound
    .map((cue) => {
      const src = `staticFile("${id}/${cue.file}")`;
      if (cue.length === null) {
        return `      <Sequence from={${frames(cue.at)}} layout="none">\n        <Audio src={${src}} volume={${cue.volume}} />\n      </Sequence>`;
      }
      const length = frames(cue.length);
      const fadeIn = Math.min(frames(0.5), Math.floor(length / 4));
      const fadeOut = Math.min(frames(1.5), Math.floor(length / 4));
      return `      <Sequence durationInFrames={${length}} from={${frames(cue.at)}} layout="none">\n        <Audio src={${src}} volume={(f) => ${cue.volume} * Math.max(0, Math.min(1, f / ${fadeIn}, (${length} - f) / ${fadeOut}))} />\n      </Sequence>`;
    })
    .join("\n");
  const imports = brief.sound.length === 0 ? "AbsoluteFill, Series" : "AbsoluteFill, Audio, Sequence, Series, staticFile";
  return `// Assembled by scripts/assemble.mjs from ${source}. Running it again rewrites this file.
import { ${imports} } from "remotion";
${names.map((name, i) => `import ${name} from "./scenes/${sceneFile(i).replace(/\.tsx$/, "")}";`).join("\n")}

export const meta = { durationInFrames: ${total}, fps: ${brief.fps}, height: ${brief.height}, width: ${brief.width} };

export default function Video() {
  return (
    <AbsoluteFill>
      <Series>
${brief.scenes
  .map((scene, i) => `        <Series.Sequence durationInFrames={${scene.frames}}>\n          <${names[i]} />\n        </Series.Sequence>`)
  .join("\n")}
      </Series>${cues === "" ? "" : `\n${cues}`}
    </AbsoluteFill>
  );
}
`;
}

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

const USAGE = `Usage: node scripts/assemble.mjs <brief.md> [--id <slug>]

Checks that every scene and every file the brief names is there, that the
scenes render deterministically, and writes src/videos/<id>/index.tsx.
`;

async function main() {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: { help: { type: "boolean", short: "h", default: false }, id: { type: "string" } },
  });
  if (values.help || positionals.length !== 1) {
    process.stdout.write(USAGE);
    process.exitCode = values.help ? 0 : 2;
    return;
  }

  const briefPath = resolve(positionals[0]);
  const id = values.id ?? basename(briefPath).replace(/\.[^.]+$/, "");
  if (!/^[a-z0-9][a-z0-9-]*$/.test(id)) {
    throw new Error(`"${id}" is not a usable video id; use lowercase letters, digits and hyphens`);
  }
  const brief = parseBrief(await readFile(briefPath, "utf8"));

  const missingFiles = [];
  for (const file of [...brief.sound, ...brief.assets].map((entry) => entry.file)) {
    if (!(await exists(join(PROJECT, "public", id, file)))) {
      missingFiles.push(file);
    }
  }
  if (missingFiles.length > 0) {
    throw new Error(
      `the brief lists files that are not in public/${id}/:\n${[...new Set(missingFiles)].map((f) => `  - ${f}`).join("\n")}\nGather them first, or take them out of the Sound and Assets tables.`
    );
  }

  const folder = join(PROJECT, "src", "videos", id);
  const problems = [];
  for (const index of brief.scenes.keys()) {
    const file = join(folder, "scenes", sceneFile(index));
    const label = `Scene ${index + 1} "${brief.scenes[index].name}" (${sceneFile(index)})`;
    if (!(await exists(file))) {
      problems.push(`${label} is not written yet`);
      continue;
    }
    for (const problem of validate(await readFile(file, "utf8"))) {
      problems.push(`${label} ${problem}`);
    }
  }
  if (problems.length > 0) {
    throw new Error(`${id} was not assembled:\n${problems.map((p) => `  - ${p}`).join("\n")}`);
  }

  await writeFile(join(folder, "index.tsx"), assembleIndex(brief, `prompts/${basename(briefPath)}`, id), "utf8");
  const seconds = brief.scenes.reduce((sum, scene) => sum + scene.seconds, 0);
  process.stdout.write(
    `Assembled ${brief.scenes.length} scenes, ${seconds} s, ${brief.sound.length} sound cues into ${join(folder, "index.tsx")}\n\nNext:\n  npm run check\n  npm run studio            # or open this folder in Remocn Studio\n  npm run render -- ${id} out/${id}.mp4\n`
  );
}

if (process.argv[1] !== undefined && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  });
}
