# SkillSwap videos

Motion graphics for SkillSwap, written as code with [Remotion](https://www.remotion.dev). Claude Code makes them: it plans a moodboard, maps every scene, gathers the assets, writes the scenes and renders the file. The result is a normal Remotion project you can preview, edit, render, or open in [Remocn Studio](https://remocn.studio).

There are two ways in:

- Ask Claude Code in this repo for a video. It follows `.claude/skills/motion-video/SKILL.md`.
- Send a brief from the Motion Booth page, https://claude.ai/artifact/E9S7yET7sToi8h567CsdBZ. It queues the brief for Claude Code and shows the rendered video when it is done.

This folder is separate from the SkillSwap app: it has its own `package.json` and nothing in the app imports it.

## Setup

```bash
cd video
npm install
```

## What a video is made of

| Where | What |
| --- | --- |
| `boards/<id>.md` | The moodboard: feeling, look, one rough frame per beat, and the sound plan. Written first. |
| `prompts/<id>.md` | The brief: the scene map. Format below. |
| `public/<id>/` | Gathered assets (icons, music, sound effects, images), with sources and licences in `ASSETS.md`. |
| `src/videos/<id>/scenes/scene-NN.tsx` | One file per scene, written to `scripts/scene-rules.md`. |
| `src/videos/<id>/index.tsx` | The scenes joined in order with the sound placed. Written by `npm run assemble`. |

`skillswap-30` is a complete example of all five.

## The brief

A brief is a Markdown file with:

- Optional front matter with `width`, `height` and `fps` (default 1920x1080 at 30).
- Text for the whole video: audience, tone, brand colours, and one idea that carries across the cuts.
- Optionally a `## Sound` table: a cue sheet (`At (s)`, `File`, `Volume`, `Length (s)`, `Marks`) placed over the finished film. A cue with a length is a bed that is cut to that length and faded in and out.
- Optionally a `## Assets` table: the files a scene may load (`File`, `What it is`).
- One section per scene, headed `## Scene: Name (4s)`, written as frame notes from its first frame to its last.

File paths in both tables are relative to `public/<id>/`.

## Assemble, preview, render

```bash
npm run assemble -- prompts/skillswap-30.md               # check the scenes and write index.tsx
npm run check                                             # type-check
npm run studio                                            # Remotion's preview
npm run render -- skillswap-30 out/skillswap-30.mp4
```

`assemble` stops with a list if a scene is not written yet, if a file named in the brief is missing from `public/<id>/`, or if a scene would not render the same way every time (it uses `Math.random()`, the clock, timers or the network).

Every folder under `src/videos` with an `index.tsx` is a composition named after the folder.

## Open in Remocn Studio

Open the `video` folder as a project in Remocn Studio. The layout is the one Studio scaffolds (`src/index.ts`, `src/videos/registry.tsx`, one folder per video), which is what its preview scans, and Studio's own agent can keep working on the videos.

Studio's click-to-edit property panel relies on Studio's own object bindings, which these scene files do not include. The layout was matched against Studio's source; the project has not been opened in the Studio app yet.

## Tests

```bash
npm test
```

## Licences

Remotion needs a company licence for teams of four or more: see [remotion.dev/license](https://www.remotion.dev/license). `src/videos/registry.tsx` comes from Remocn Studio, and the curve, spring and timing rules in `scripts/scene-rules.md` are adapted from its motion-design guide, both under the MIT License; see `THIRD_PARTY_NOTICES.md`. Each video's gathered assets carry their own licences, listed in its `ASSETS.md`.
