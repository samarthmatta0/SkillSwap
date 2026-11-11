# SkillSwap videos

Motion graphics for SkillSwap, written as code with [Remotion](https://www.remotion.dev).

The work is split between two models. Claude Code is the prompter: it takes the request, writes a brief with one section per animation, reviews what comes back and renders the file. `gemini-4-carbon`, called through the [Respan gateway](https://www.respan.ai/docs/ai-gateway/quickstart.md), writes the Remotion code for each scene. The result is a normal Remotion project you can preview, edit, render, or open in [Remocn Studio](https://remocn.studio).

There are three ways in:

- Ask Claude Code in this repo for a video. It follows `.claude/skills/motion-video/SKILL.md`.
- Send a brief from the Motion Booth page, https://claude.ai/artifact/E9S7yET7sToi8h567CsdBZ. It queues the brief for Claude Code and shows the rendered video when it is done.
- Run the generator yourself on a brief you wrote, as below.

This folder is separate from the SkillSwap app: it has its own `package.json` and nothing in the app imports it.

## Setup

```bash
cd video
npm install
```

Put your Respan key in `.env` at the repo root (or in `video/.env`). Both are gitignored.

```
RESPAN_API_KEY=your-key
```

The gateway needs Respan credits or a saved provider key. Without either it answers `401 activation_required`.

## Write a brief

A brief is a Markdown file in `prompts/`. `prompts/skillswap-promo.md` is the example to copy. It has:

- Optional front matter with `width`, `height` and `fps` (default 1920x1080 at 30).
- Text for the whole video: audience, tone, brand colours, and one continuity idea that carries across the cuts.
- One section per animation, headed `## Scene: Name (4s)`. Say what is on screen, when each thing moves, how far and how fast, what holds still, and how the scene hands off to the next.

## Generate a video

```bash
npm run generate -- prompts/skillswap-promo.md
```

Each scene is one request to the model, which sees the whole plan and the neighbouring scenes for context. The scenes are written to `src/videos/skillswap-promo/scenes/` and joined in `src/videos/skillswap-promo/index.tsx`. The video id is the brief's file name unless you pass `--id`.

Scenes that already have a file are kept, so a run that stopped part-way picks up where it left off. To change one scene, send it back with notes:

```bash
npm run generate -- prompts/skillswap-promo.md --scene 2 --revise "The cards arrive too fast. Use a 0.7 s response."
```

| Option | Meaning |
| --- | --- |
| `--id <slug>` | Video id and folder name |
| `--model <id>` | Any ID from the [Respan model list](https://platform.respan.ai/platform/models). Default `gemini-4-carbon`, or `RESPAN_MODEL` |
| `--scene <n>` | Work on one scene only |
| `--revise "<notes>"` | With `--scene`: revise that scene |
| `--force` | Generate again scenes that already exist |
| `--max-tokens <n>` | Reply budget per scene, default 16000 |

The rules the model works under, including the easing curves, spring settings and timing rules that keep the motion smooth, are in `scripts/system-prompt.md`. A scene is only written if it imports nothing but `remotion` and `react` and makes no network calls; otherwise it is saved to `out/` as a `.rejected.tsx` file and the command fails. Read generated code before you ship it, as you would any other.

## Preview and render

```bash
npm run check                                              # type-check
npm run studio                                             # Remotion's preview
npm run render -- skillswap-promo out/skillswap-promo.mp4
```

Every folder under `src/videos` with an `index.tsx` is a composition named after the folder. The file exports the component as its default and a `meta` object with `durationInFrames`, `fps`, `width` and `height`.

## Open in Remocn Studio

Open the `video` folder as a project in Remocn Studio. The layout is the one Studio scaffolds (`src/index.ts`, `src/videos/registry.tsx`, one folder per video), which is what its preview scans, and Studio's own agent can keep working on the videos.

Videos written by `generate.mjs` are plain Remotion. Studio's click-to-edit property panel relies on Studio's own object bindings, which these files do not include.

The layout was matched against Studio's source; the project has not been opened in the Studio app yet.

## Route Remocn Studio through Respan

Studio runs the Claude Code on your computer. To send that traffic through the Respan gateway so each request is logged in Respan:

1. In this folder, copy `.claude/settings.example.json` to `.claude/settings.json`.
2. Replace `YOUR_RESPAN_API_KEY` with your key. The file is gitignored; keep it that way.
3. Open the folder in Remocn Studio and start a chat.
4. Check that the requests arrived: `npx -y @respan/cli logs list --limit 5 --all-envs true --json`

It has to be this file. Studio starts Claude Code with project settings only, so `~/.claude/settings.json`, `.claude/settings.local.json` and variables from your shell profile are not read.

Two things change while that file is there:

- Studio's usage in this project is paid from Respan credits (or your provider key), not your Claude subscription. Other projects are unaffected.
- Any Claude Code session started in this folder uses the gateway too.

Delete `.claude/settings.json` to go back.

This was checked with the `claude` CLI loading project settings only, which reached the Respan gateway. It has not been run inside the Remocn Studio app.

## Tests

```bash
npm test
```

## Licences

Remotion needs a company licence for teams of four or more: see [remotion.dev/license](https://www.remotion.dev/license). `src/videos/registry.tsx` comes from Remocn Studio, and the curve, spring and timing rules in `scripts/system-prompt.md` are adapted from its motion-design guide, both under the MIT License; see `THIRD_PARTY_NOTICES.md`.
