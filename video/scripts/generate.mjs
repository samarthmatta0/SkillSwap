#!/usr/bin/env node
// Sends a video brief to a model through the Respan gateway, one request per
// scene, and writes the Remotion code that comes back to src/videos/<id>/.
//
//   node scripts/generate.mjs prompts/skillswap-promo.md
//   node scripts/generate.mjs prompts/skillswap-promo.md --scene 2 --revise "Too fast"
//
// The request is the OpenAI-compatible chat completion from the Respan gateway
// quickstart: https://www.respan.ai/docs/ai-gateway/quickstart.md

import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";

const HERE = dirname(fileURLToPath(import.meta.url));
const PROJECT = resolve(HERE, "..");

export const DEFAULT_GATEWAY = "https://gateway.respan.ai";
export const DEFAULT_MODEL = "gemini-4-carbon";
const DEFAULT_MAX_TOKENS = 16_000;
const REQUEST_TIMEOUT_MS = 10 * 60 * 1000;

// The returned module runs inside the Remotion bundle, so it may only import
// what a self-contained composition needs.
const ALLOWED_IMPORTS = new Set(["remotion", "react"]);

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

export class GatewayError extends Error {
  constructor(status, code, message) {
    super(message);
    this.name = "GatewayError";
    this.status = status;
    this.code = code;
  }
}

export function parseEnvFile(text) {
  const values = {};
  for (const line of text.split(/\r?\n/)) {
    const match = /^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/.exec(line);
    if (match === null) {
      continue;
    }
    const raw = match[2].trim();
    const quoted = /^(["'])(.*)\1$/.exec(raw);
    values[match[1]] = quoted === null ? raw.replace(/\s+#.*$/, "") : quoted[2];
  }
  return values;
}

// The environment wins; otherwise the first .env that has the variable.
async function setting(name, envFiles) {
  if (process.env[name]) {
    return process.env[name];
  }
  for (const file of envFiles) {
    try {
      const value = parseEnvFile(await readFile(file, "utf8"))[name];
      if (value) {
        return value;
      }
    } catch (error) {
      if (error.code !== "ENOENT") {
        throw error;
      }
    }
  }
  return undefined;
}

export function extractCode(content) {
  const blocks = [...content.matchAll(/```[A-Za-z]*[ \t]*\r?\n([\s\S]*?)```/g)];
  if (blocks.length === 1) {
    return blocks[0][1].trim() + "\n";
  }
  if (blocks.length === 0 && /^\s*import\s/.test(content) && !content.includes("```")) {
    return content.trim() + "\n";
  }
  throw new Error(
    blocks.length === 0
      ? "the model's reply has no code block"
      : `the model's reply has ${blocks.length} code blocks; expected exactly one`
  );
}

export function validate(code) {
  const problems = [];

  const specifiers = [
    ...code.matchAll(/\bfrom\s*["']([^"']+)["']/g),
    ...code.matchAll(/^\s*import\s*["']([^"']+)["']/gm),
  ].map((match) => match[1]);
  for (const specifier of new Set(specifiers)) {
    if (!ALLOWED_IMPORTS.has(specifier)) {
      problems.push(`imports "${specifier}" (only remotion and react are allowed)`);
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

function hintFor(status, code) {
  if (status === 401 && code === "activation_required") {
    return "Add Respan credits, or save a provider key, then run this again.";
  }
  if (status === 401) {
    return "A provider key saved in Respan was rejected. Check it under Gateway > API keys > Providers.";
  }
  if (status === 403) {
    return "The Respan API key is wrong or expired. Put a new RESPAN_API_KEY in .env.";
  }
  if (code === "model_not_found") {
    return "Pick a model ID from https://platform.respan.ai/platform/models and pass it with --model.";
  }
  return null;
}

export async function requestVideo({
  gateway = DEFAULT_GATEWAY,
  apiKey,
  model = DEFAULT_MODEL,
  messages,
  maxTokens = DEFAULT_MAX_TOKENS,
  fetchImpl = fetch,
}) {
  const response = await fetchImpl(`${gateway.replace(/\/+$/, "")}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ model, max_tokens: maxTokens, messages }),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  const text = await response.text();
  let body = null;
  try {
    body = JSON.parse(text);
  } catch {
    // A non-JSON body is reported below as it came.
  }

  if (!response.ok) {
    const code = body?.error?.code ?? null;
    const message = body?.error?.message ?? text.slice(0, 500);
    const hint = hintFor(response.status, code);
    throw new GatewayError(
      response.status,
      code,
      `Respan gateway returned ${response.status}: ${message}${hint === null ? "" : `\n${hint}`}`
    );
  }

  const choice = body?.choices?.[0];
  const content = choice?.message?.content;
  if (typeof content !== "string" || content.length === 0) {
    throw new Error("the gateway's reply has no message content");
  }
  if (choice.finish_reason === "length") {
    throw new Error(
      `the reply was cut off at ${maxTokens} tokens; raise --max-tokens or split the scene in two`
    );
  }

  return { content, model: body.model ?? model, usage: body.usage ?? null };
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

// The model sees the whole plan but is asked for one scene, so each animation
// gets its own prompt and can be revised on its own.
export function buildMessages({ system, brief, index, id = "video", current = null, notes = null }) {
  const scene = brief.scenes[index];
  const outline = brief.scenes
    .map((s, i) => `${i + 1}. ${s.name} (${s.seconds} s)`)
    .join("\n");
  const neighbour = (i, label) =>
    brief.scenes[i] === undefined
      ? ""
      : `\n\n## ${label}, for continuity only. Do not draw it.\n\n${brief.scenes[i].name}: ${brief.scenes[i].text}`;
  const assets = brief.assets.length === 0
    ? ""
    : `\n\n# Assets you may use\n\nLoad a file with \`staticFile("${id}/<file>")\`. These are the only files that exist.\n\n${brief.assets
        .map((asset) => `- \`${asset.file}\`: ${asset.what}`)
        .join("\n")}`;
  const ask = `# The video

${brief.overview}${assets}

Frame: ${brief.width}x${brief.height} at ${brief.fps} fps.

# All scenes, in order

${outline}

# Write scene ${index + 1} of ${brief.scenes.length}: ${scene.name}

It lasts ${scene.seconds} s, which is ${scene.frames} frames. Its frame counter starts at 0.

${scene.text}${neighbour(index - 1, "The scene before")}${neighbour(index + 1, "The scene after")}`;

  const messages = [
    { role: "system", content: system },
    { role: "user", content: ask },
  ];
  if (current !== null) {
    messages.push(
      { role: "assistant", content: `\`\`\`tsx\n${current.trimEnd()}\n\`\`\`` },
      {
        role: "user",
        content: `Revise this scene with these notes and return the complete file again under the same rules.\n\n${notes}`,
      }
    );
  }
  return messages;
}

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
  return `// Assembled by scripts/generate.mjs from ${source}. Running it again rewrites this file.
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

const USAGE = `Usage: node scripts/generate.mjs <brief.md> [options]

  --id <slug>          Video id and folder name (default: the brief's file name)
  --model <id>         Respan model ID (default: $RESPAN_MODEL or ${DEFAULT_MODEL})
  --scene <n>          Work on one scene only (1 is the first)
  --revise "<notes>"   With --scene: send that scene back with notes and replace it
  --force              Generate again scenes that already exist
  --max-tokens <n>     Reply budget per scene (default: ${DEFAULT_MAX_TOKENS})

Scenes that already have a file are kept, so a run that stopped part-way can be
started again and picks up where it left off.
`;

async function main() {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
      force: { type: "boolean", default: false },
      help: { type: "boolean", short: "h", default: false },
      id: { type: "string" },
      "max-tokens": { type: "string" },
      model: { type: "string" },
      revise: { type: "string" },
      scene: { type: "string" },
    },
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

  const maxTokens = values["max-tokens"] === undefined ? DEFAULT_MAX_TOKENS : Number(values["max-tokens"]);
  if (!Number.isInteger(maxTokens) || maxTokens < 1) {
    throw new Error("--max-tokens must be a positive whole number");
  }

  const brief = parseBrief(await readFile(briefPath, "utf8"));
  const only = values.scene === undefined ? null : Number(values.scene) - 1;
  if (only !== null && (!Number.isInteger(only) || brief.scenes[only] === undefined)) {
    throw new Error(`--scene must be a number from 1 to ${brief.scenes.length}`);
  }
  if (values.revise !== undefined && only === null) {
    throw new Error("--revise needs --scene <n> to say which scene the notes are for");
  }

  const envFiles = [join(PROJECT, ".env"), join(PROJECT, "..", ".env")];
  const apiKey = await setting("RESPAN_API_KEY", envFiles);
  if (!apiKey) {
    throw new Error("RESPAN_API_KEY is not set. Add it to .env in the repo root or in video/.");
  }
  const gateway = (await setting("RESPAN_GATEWAY_URL", envFiles)) ?? DEFAULT_GATEWAY;
  const model = values.model ?? (await setting("RESPAN_MODEL", envFiles)) ?? DEFAULT_MODEL;
  const system = await readFile(join(HERE, "system-prompt.md"), "utf8");

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
  const sceneDir = join(folder, "scenes");

  let written = 0;
  for (const index of brief.scenes.keys()) {
    if (only !== null && index !== only) {
      continue;
    }
    const scene = brief.scenes[index];
    const target = join(sceneDir, sceneFile(index));
    const present = await exists(target);
    const label = `Scene ${index + 1}/${brief.scenes.length} "${scene.name}"`;
    if (values.revise !== undefined && !present) {
      throw new Error(`--revise needs an existing scene, and ${target} is not there`);
    }
    if (present && values.revise === undefined && !values.force) {
      process.stdout.write(`${label}: kept (already written)\n`);
      continue;
    }

    process.stdout.write(`${label}: asking ${model} ...\n`);
    const reply = await requestVideo({
      gateway,
      apiKey,
      model,
      maxTokens,
      messages: buildMessages({
        system,
        brief,
        index,
        id,
        current: values.revise === undefined ? null : await readFile(target, "utf8"),
        notes: values.revise ?? null,
      }),
    });

    const code = extractCode(reply.content);
    const problems = validate(code);
    if (problems.length > 0) {
      const rejected = join(PROJECT, "out", `${id}.${sceneFile(index).replace(/\.tsx$/, "")}.rejected.tsx`);
      await mkdir(dirname(rejected), { recursive: true });
      await writeFile(rejected, code, "utf8");
      throw new Error(
        `${label} was not written because it:\n${problems.map((p) => `  - ${p}`).join("\n")}\nIt is saved for inspection at ${rejected}`
      );
    }
    await mkdir(sceneDir, { recursive: true });
    await writeFile(target, code, "utf8");
    written += 1;
    const usage = reply.usage === null
      ? ""
      : ` (${reply.usage.prompt_tokens ?? "?"} prompt + ${reply.usage.completion_tokens ?? "?"} completion tokens)`;
    process.stdout.write(`${label}: wrote ${sceneFile(index)} with ${reply.model}${usage}\n`);
  }

  const missing = [];
  for (const index of brief.scenes.keys()) {
    if (!(await exists(join(sceneDir, sceneFile(index))))) {
      missing.push(index + 1);
    }
  }
  if (missing.length > 0) {
    process.stdout.write(`Not assembled yet: scene ${missing.join(", ")} still to write. Run without --scene to finish.\n`);
    return;
  }

  await writeFile(join(folder, "index.tsx"), assembleIndex(brief, `prompts/${basename(briefPath)}`, id), "utf8");
  process.stdout.write(
    `\n${written} scene${written === 1 ? "" : "s"} written. Assembled ${join(folder, "index.tsx")}\n\nNext:\n  npm run check\n  npm run studio            # or open this folder in Remocn Studio\n  npm run render -- ${id} out/${id}.mp4\n`
  );
}

if (process.argv[1] !== undefined && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  });
}
