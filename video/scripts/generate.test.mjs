import assert from "node:assert/strict";
import { createServer } from "node:http";
import { test } from "node:test";
import {
  assembleIndex,
  buildMessages,
  extractCode,
  GatewayError,
  parseBrief,
  parseEnvFile,
  requestVideo,
  sceneFile,
  validate,
} from "./generate.mjs";

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

function gateway(handler) {
  const server = createServer((request, response) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
    });
    request.on("end", () => handler(request, JSON.parse(body), response));
  });
  return new Promise((done) => {
    server.listen(0, "127.0.0.1", () => {
      done({ server, url: `http://127.0.0.1:${server.address().port}` });
    });
  });
}

test("parseEnvFile reads plain, quoted and exported values", () => {
  assert.deepEqual(
    parseEnvFile('# note\nA=1\nexport B="two words"\nC=\'x\'\nD=val # trailing\nnot a line\n'),
    { A: "1", B: "two words", C: "x", D: "val" }
  );
});

test("extractCode returns the single fenced block", () => {
  assert.equal(extractCode(`\`\`\`tsx\n${GOOD}\`\`\``), GOOD);
  assert.equal(extractCode(GOOD), GOOD);
});

test("extractCode refuses replies with no block or several", () => {
  assert.throws(() => extractCode("Sorry, I can't."), /no code block/);
  assert.throws(() => extractCode("```tsx\na\n```\n```tsx\nb\n```"), /2 code blocks/);
});

test("validate accepts a self-contained composition", () => {
  assert.deepEqual(validate(GOOD), []);
});

test("validate rejects foreign imports, network access and nondeterminism", () => {
  const bad = `${GOOD}\nimport fs from "node:fs";\nfetch("https://example.com");\nMath.random();\n`;
  const problems = validate(bad).join("\n");
  assert.match(problems, /imports "node:fs"/);
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

test("buildMessages asks for one scene and shows its neighbours", () => {
  const brief = parseBrief(BRIEF);
  const first = buildMessages({ system: "s", brief, index: 0 });
  assert.deepEqual(first.map((message) => message.role), ["system", "user"]);
  assert.match(first[1].content, /Write scene 1 of 2: Hook/);
  assert.match(first[1].content, /120 frames/);
  assert.match(first[1].content, /The scene after, for continuity only/);
  assert.doesNotMatch(first[1].content, /The scene before/);
  assert.match(first[1].content, /1080x1920 at 30 fps/);
});

test("buildMessages adds the current file and notes for a revision", () => {
  const revised = buildMessages({ system: "s", brief: parseBrief(BRIEF), index: 1, current: GOOD, notes: "slower" });
  assert.deepEqual(
    revised.map((message) => message.role),
    ["system", "user", "assistant", "user"]
  );
  assert.match(revised[3].content, /slower/);
});

test("assembleIndex joins the scenes and totals their frames", () => {
  const index = assembleIndex(parseBrief(BRIEF), "prompts/demo.md");
  assert.equal(sceneFile(0), "scene-01.tsx");
  assert.match(index, /import Scene02 from "\.\/scenes\/scene-02";/);
  assert.match(index, /durationInFrames: 195, fps: 30, height: 1920, width: 1080/);
  assert.match(index, /<Series\.Sequence durationInFrames=\{75\}>\n\s+<Scene02 \/>/);
});

test("requestVideo posts a chat completion and returns the content", async () => {
  let seen = null;
  const { server, url } = await gateway((request, body, response) => {
    seen = { auth: request.headers.authorization, body, path: request.url };
    response.setHeader("Content-Type", "application/json");
    response.end(
      JSON.stringify({
        choices: [{ finish_reason: "stop", message: { content: "hello" } }],
        model: "test-model",
        usage: { completion_tokens: 2, prompt_tokens: 3 },
      })
    );
  });
  try {
    const reply = await requestVideo({
      apiKey: "k",
      gateway: `${url}/`,
      messages: [{ content: "hi", role: "user" }],
      model: "test-model",
    });
    assert.equal(reply.content, "hello");
    assert.equal(reply.usage.prompt_tokens, 3);
    assert.equal(seen.path, "/chat/completions");
    assert.equal(seen.auth, "Bearer k");
    assert.equal(seen.body.model, "test-model");
  } finally {
    server.close();
  }
});

test("requestVideo explains a missing-credits refusal", async () => {
  const { server, url } = await gateway((_request, _body, response) => {
    response.statusCode = 401;
    response.end(
      JSON.stringify({ error: { code: "activation_required", message: "needs Respan credits" } })
    );
  });
  try {
    await assert.rejects(
      requestVideo({ apiKey: "k", gateway: url, messages: [] }),
      (error) =>
        error instanceof GatewayError &&
        error.status === 401 &&
        error.code === "activation_required" &&
        /Add Respan credits/.test(error.message)
    );
  } finally {
    server.close();
  }
});

test("requestVideo refuses a reply that was cut off", async () => {
  const { server, url } = await gateway((_request, _body, response) => {
    response.end(
      JSON.stringify({ choices: [{ finish_reason: "length", message: { content: "```tsx\nimport" } }] })
    );
  });
  try {
    await assert.rejects(requestVideo({ apiKey: "k", gateway: url, messages: [] }), /cut off/);
  } finally {
    server.close();
  }
});
