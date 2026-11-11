#!/usr/bin/env node
// Sends a video brief to a model through the Respan gateway and writes the
// Remotion composition that comes back to src/videos/<id>/index.tsx.
//
//   node scripts/generate.mjs prompts/skillswap-promo.md
//   node scripts/generate.mjs prompts/skillswap-promo.md --revise "Scene 2 is too fast"
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
export const DEFAULT_MODEL = "claude-sonnet-5.5";
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

const META_LIMITS = {
  durationInFrames: [1, 36_000],
  fps: [1, 120],
  height: [16, 4320],
  width: [16, 7680],
};

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
    problems.push("has no default export for the video component");
  }

  const meta = /\bexport\s+const\s+meta\s*=\s*\{([^}]*)\}/.exec(code);
  if (meta === null) {
    problems.push("has no `export const meta = {...}`");
  } else {
    for (const [field, [min, max]] of Object.entries(META_LIMITS)) {
      const value = new RegExp(`\\b${field}\\s*:\\s*(\\d+)\\b`).exec(meta[1]);
      if (value === null) {
        problems.push(`meta.${field} is missing or not a whole-number literal`);
      } else if (Number(value[1]) < min || Number(value[1]) > max) {
        problems.push(`meta.${field} is ${value[1]}, outside ${min}-${max}`);
      }
    }
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
      `the reply was cut off at ${maxTokens} tokens; raise --max-tokens or shorten the brief`
    );
  }

  return { content, model: body.model ?? model, usage: body.usage ?? null };
}

export function buildMessages({ system, brief, current = null, notes = null }) {
  const messages = [
    { role: "system", content: system },
    { role: "user", content: brief },
  ];
  if (current !== null) {
    messages.push(
      { role: "assistant", content: `\`\`\`tsx\n${current.trimEnd()}\n\`\`\`` },
      {
        role: "user",
        content: `Revise the video with these notes and return the complete file again under the same rules.\n\n${notes}`,
      }
    );
  }
  return messages;
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
  --revise "<notes>"   Send the existing video back with notes and replace it
  --force              Replace an existing video without --revise
  --max-tokens <n>     Reply budget (default: ${DEFAULT_MAX_TOKENS})
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

  const envFiles = [join(PROJECT, ".env"), join(PROJECT, "..", ".env")];
  const apiKey = await setting("RESPAN_API_KEY", envFiles);
  if (!apiKey) {
    throw new Error("RESPAN_API_KEY is not set. Add it to .env in the repo root or in video/.");
  }
  const gateway = (await setting("RESPAN_GATEWAY_URL", envFiles)) ?? DEFAULT_GATEWAY;
  const model = values.model ?? (await setting("RESPAN_MODEL", envFiles)) ?? DEFAULT_MODEL;

  const target = join(PROJECT, "src", "videos", id, "index.tsx");
  const present = await exists(target);
  if (values.revise !== undefined && !present) {
    throw new Error(`--revise needs an existing video, and ${target} is not there`);
  }
  if (present && values.revise === undefined && !values.force) {
    throw new Error(`${target} already exists. Pass --revise "<notes>" to change it or --force to replace it.`);
  }

  const messages = buildMessages({
    system: await readFile(join(HERE, "system-prompt.md"), "utf8"),
    brief: await readFile(briefPath, "utf8"),
    current: values.revise === undefined ? null : await readFile(target, "utf8"),
    notes: values.revise ?? null,
  });

  process.stdout.write(`Asking ${model} through ${gateway} ...\n`);
  const reply = await requestVideo({ gateway, apiKey, model, messages, maxTokens });

  const code = extractCode(reply.content);
  const problems = validate(code);
  if (problems.length > 0) {
    const rejected = join(PROJECT, "out", `${id}.rejected.tsx`);
    await mkdir(dirname(rejected), { recursive: true });
    await writeFile(rejected, code, "utf8");
    throw new Error(
      `the returned video was not written because it:\n${problems.map((p) => `  - ${p}`).join("\n")}\nIt is saved for inspection at ${rejected}`
    );
  }

  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, code, "utf8");

  const usage = reply.usage === null
    ? ""
    : ` (${reply.usage.prompt_tokens ?? "?"} prompt + ${reply.usage.completion_tokens ?? "?"} completion tokens)`;
  process.stdout.write(
    `Wrote ${target}\nModel: ${reply.model}${usage}\n\nNext:\n  npm run check\n  npm run studio            # or open this folder in Remocn Studio\n  npm run render -- ${id} out/${id}.mp4\n`
  );
}

if (process.argv[1] !== undefined && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  });
}
