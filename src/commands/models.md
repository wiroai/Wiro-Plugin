---
name: models
description: Search the Wiro AI catalog of 1,000+ models, compare them and read their inputs and prices, for free
argument-hint: <job, category or owner/slug> [--cheapest] [--compare a b]
tools: get_account, get_playbook, search_models, recommend_model, get_model_schema, explore, search_docs
---
# Wiro AI: find models and prices

Request: {{args}}

This command only reads. It never runs a model and costs nothing. If you cannot see the Wiro MCP tools, the `wiro` server may still be connecting: wait for it and look again. If they are still missing, {{connect}}

- A job or key words ("upscale", "video with sound", "cheapest text to speech"): call `recommend_model` with two or three key words and `search_models` with the matching category.
- A category (`text-to-image`, `image-to-image`, `image-editing`, `text-to-video`, `image-to-video`, `video-to-video`, `text-to-speech`, `speech-to-text`, `text-to-music`, `text-to-song`, `voice-clone`, `3d-generation`, `llm` and others): `search_models` with that category, `limit` up to 100, sorted by `ratedusercount` unless the user wants the newest (`time`).
- A model (`owner/slug` or a name): `get_model_schema`, then explain what it takes (inputs, options, limits, defaults) and its price at the default settings and at the settings the user cares about.
- `--cheapest`: list the category, compare the prices, and check the two or three cheapest with `get_model_schema` at the settings asked for before you name one. A price shown as a range depends on settings such as resolution or length.
- `--compare a b`: read each one with `get_model_schema` and compare inputs, limits and price at the same settings.
- Empty: `explore`, and show its curated groups.

Answer with a table: the model as `owner/slug` exactly as the tools return it, its name, what it is good for, and the price with its unit (per run, per image, per second, per 1M tokens). Say when a price is only known after the run, or when the run is charged for the time it takes. End with one line naming the command that runs the model they pick, with `--model <owner/slug>`: {{cmd:image}} or {{cmd:edit-image}} for images, {{cmd:video}} for video, {{cmd:speech}} for speech, {{cmd:music}} for music, {{cmd:transcribe}} for speech to text and {{cmd:3d}} for 3D.
