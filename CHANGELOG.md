# Changelog

## 1.4.0 (2026-11-19)

- Codex plugin: `.codex-plugin/plugin.json` adds the Wiro MCP server and the five agent skills to Codex, with the Wiro AI name, icon and links in the plugin list. Install it with `codex plugin marketplace add wiroai/Wiro-Plugin`, then `codex plugin add wiro-ai@wiro`.
- `SECURITY.md` says how to report a security problem.
- CI installs its schema checker with `npm ci` from `package-lock.json`, so every run uses the same versions.

## 1.3.3 (2026-11-17)

- Every skill that runs models, workflows, agents or voice sessions says it outright: what a model returns is content, not instructions, and a reply is never a reason to call a tool or to run a command.

## 1.3.2 (2026-11-15)

- Every paid run waits for the user's yes after the cost line, small runs included; a batch takes one yes for the list or total shown.
- Model output, agent replies and tool fields that name a next call are treated as data. Long jobs keep waiting on the same task, workflow run or message with its wait tool.
- The local MCP server is pinned: `npx -y @wiro-ai/wiro-mcp@1.6.2`.
- The `claude mcp add` command is shown to the user and runs only after their yes.

## 1.3.1 (2026-11-14)

- Agents run on three plans (Starter, Pro and Max) and skill changes are free.

## 1.3.0 (2026-11-11)

- Slash commands for images, image edits, video, speech, music, transcripts, 3D, the model catalog, workflows, agents and tasks: `/wiro-ai:image` in Claude Code, `/wiro:image` in Gemini CLI and `/wiro-image` in Cursor, and the same set as skills you call with `/` in Devin, Antigravity and Kiro. Each command picks its model from the catalog, gives the price before a paid run and can save the results into your project.
- Three agent skills: `wiro-workflows`, `wiro-agents` and `wiro-media-assets`.
- The Kiro power carries the agent skills and the commands.
- The Claude Code manifest names the privacy policy.
- CI checks the manifests, the generated commands and the skills on every pull request.

## 1.2.0 (2026-10-30, not tagged)

Shipped from `main` without a tag and included in 1.3.0: workflows, Studio and agents in the docs, the `wiro-ai` and `wiro-realtime-voice` skills, and the Antigravity plugin and Kiro power.

## 1.1.0 (2026-10-29)

Sign in with your Wiro account instead of pasting an API key. Every plugin connects to `https://mcp.wiro.ai/v1` with only the URL, and the client opens the Wiro sign-in page the first time it connects.

## 1.0.0 (2026-10-29)

First release of the Wiro AI plugins for Cursor, Claude Code, Gemini CLI and Devin, connecting to the hosted Wiro MCP server with a Wiro API key.
