# Changelog

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
