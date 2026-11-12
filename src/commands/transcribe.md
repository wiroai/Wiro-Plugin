---
name: transcribe
description: Transcribe audio or video into text or captions with a Wiro AI speech to text model
argument-hint: <audio or video link or path> [--language en] [--timestamps] [--srt] [--speakers] [--model owner/slug] [--save [path]]
tools: get_account, get_playbook, search_models, recommend_model, get_model_schema, wait_for_task, get_task, get_task_price
---
# Wiro AI: transcribe audio or video

Request: {{args}}

The request holds the recording, audio or video: a public link or a file in this project. If it is missing, ask for it and stop.

Options the request may carry: `--model owner/slug`, `--language <code>`, `--timestamps`, `--srt` or `--vtt` (caption files), `--speakers` (label who speaks), `--save [path]`. Any other `--name value` is a model setting: match it to the schema.

{{> rules}}

{{> pick-model find="call `recommend_model` with \"transcribe audio\", and `search_models` with the category `speech-to-text` sorted by `ratedusercount`. To find a feature, add a key word such as \"timestamp\" or \"speaker\"." needs="the language, word or segment timestamps, caption files, or speaker labels"}}

Before you promise timestamps or a caption format, check that the schema has an option for it.

{{> input-files}}

## Run

1. Speech to text is often priced per second of audio. Find the length (for a local file, `ffprobe -v error -show_entries format=duration -of csv=p=0 <file>` when ffmpeg is installed) and estimate from it. Say when the estimate is rough.
2. Write the cost line, then call `run_model` and follow `nextAction` (`wait_for_task`) until the task completes.
3. Show the transcript: all of it when it is short, otherwise the first lines and where the rest is. Some models return the transcript as a text file: read that file.
4. With `--srt` or `--vtt`, give the caption file the model made, or build one from its timestamps.

{{> save folders="next to the recording, or such as `docs/` or `content/`"}}

Saved transcripts take the name of the recording with `.txt`, `.srt` or `.vtt`.
