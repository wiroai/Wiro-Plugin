---
name: speech
description: Turn text into natural speech or a voice-over with a Wiro AI text to speech model
argument-hint: <text or path to a text file> [--voice name] [--language en] [--model owner/slug] [--save [path]]
tools: get_account, get_playbook, search_models, recommend_model, get_model_schema, wait_for_task, get_task, get_task_price
---
# Wiro AI: text to speech

Request: {{args}}

The request holds the text to speak, or the path of a text file in this project to read it from. If there is no text, ask for it and stop.

Options the request may carry: `--model owner/slug`, `--voice <name>`, `--language <code or name>`, `--speed 1.1`, `--style <tone>`, `--format mp3`, `--save [path]`. Any other `--name value` is a model setting: match it to the schema.

{{> rules}}

{{> pick-model find="call `recommend_model` with \"text to speech\", and `search_models` with the category `text-to-speech` sorted by `ratedusercount`." needs="the language of the text, the voice asked for, control over style or emotion, or two speakers"}}

## Run

1. Voices come from the schema options. When the user named none, pick one that fits the language and the tone of the text, say which, and name two others they can ask for.
2. Speech is often priced per character or per second, so work out the estimate from the length of the text. Write the cost line, then call `run_model` and follow `nextAction` (`wait_for_task`) until the task completes.
3. Give the audio link and the cost.

{{> save folders="such as `public/audio/`, `static/audio/` or `assets/audio/`"}}
