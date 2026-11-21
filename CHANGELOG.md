# Changelog

## 1.5.4 (2026-11-20)

- The local route of the `wiro-ai` skill runs `npx -y @wiro-ai/wiro-mcp@latest`, so it always starts the newest release instead of a pinned version.

## 1.5.3 (2026-11-20)

- The local route of the `wiro-ai` skill pins `npx -y @wiro-ai/wiro-mcp@1.9.1`, the release that knows the Controls: `get_account` lists the spend limits and says whether the connection can change them, `get_controls` shows every limit and Model Access rule, `check_model_access` checks one model rule by rule, and `manage_spend_limit` and `manage_model_access` change one after a change summary and the user's yes.
- Error code `93` covers every spend-limit refusal: a limit that is reached, work that costs more than a limit has left (cheaper work may fit, with the user's yes) and room that runs in progress still hold. Limits are raised on the Spend Limits page at https://wiro.ai/panel/controls/spend-limits.
- The account owner, a team admin or the organization owner can change a limit or a rule. Every command and skill says not to change one to finish a job, only when the user asks for that change.
- The `wiro-ai` skill links the Spend Limits and Model Access docs, and `wiro-workflows` knows codes `92` and `93`.

## 1.5.2 (2026-11-19)

- Wiro's Model Access: every command and the `wiro-ai` skill know error code `92`. A rule that blocks a model (for the whole wallet, a team member, an API key, a way in such as MCP or the LLM gateway, or one agent) refuses it before anything runs or is charged, so the assistant does not try again or switch to another model on its own. It says which rule blocked the model and that the account owner or a team admin can change it on the Model Access page, or the user can pick another model.

## 1.5.1 (2026-11-19)

- Wiro's spend limits: every command and the `wiro-ai` skill know error code `93`. A used-up limit (the whole wallet, a team member, an API key, a way in such as MCP or the LLM gateway, or one agent) refuses new work before anything runs or is charged, so the assistant does not try again; it says which limit it is, when it resets and where it can be raised.

## 1.5.0 (2026-11-19)

- Codex gets the eleven commands as skills in `codex/skills/`: `$wiro-ai:image`, `$wiro-ai:edit-image`, `$wiro-ai:video`, `$wiro-ai:speech`, `$wiro-ai:music`, `$wiro-ai:transcribe`, `$wiro-ai:3d`, `$wiro-ai:models`, `$wiro-ai:workflow`, `$wiro-ai:agent` and `$wiro-ai:task`. Each one has `agents/openai.yaml` with `allow_implicit_invocation: false`, so it runs only when you call it, like the commands in the other assistants. The same folder carries copies of the five agent skills, and `scripts/build-commands.mjs` writes all of them.

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
