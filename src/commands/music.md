---
name: music
description: Make an instrumental track or a song with lyrics with a Wiro AI music model
argument-hint: <style, mood, length> [--lyrics <text or path>] [--instrumental] [--duration 30] [--model owner/slug] [--save [path]]
tools: get_account, get_playbook, search_models, recommend_model, get_model_schema, wait_for_task, get_task, get_task_price
---
# Wiro AI: make music

Request: {{args}}

The request describes the track: mood, genre, instruments, tempo, length, and whether it has vocals. Lyrics come with `--lyrics "<text>"` or the path of a text file in this project. If the request is empty, ask for the style and the length and stop.

Options the request may carry: `--model owner/slug`, `--duration 30`, `--instrumental`, `--lyrics <text or path>`, `--format mp3`, `--save [path]`. Any other `--name value` is a model setting: match it to the schema.

{{> rules}}

{{> pick-model find="for an instrumental track, call `recommend_model` with \"text to music\" and `search_models` with the category `text-to-music`. For a song with vocals or lyrics, use the category `text-to-song`. Sort by `ratedusercount`." needs="the length asked for, vocals, your own lyrics, or an instrumental-only option"}}

## Run

1. Fill `params` from the schema: the description in its prompt or style field, the lyrics in its lyrics field when it has one, and a duration within its limits. If the user gave no lyrics for a song, write short ones that fit the request and show them in your cost line.
2. Music is often priced per second of output, so work out the estimate for this length. Write the cost line, then call `run_model` and follow `nextAction` (`wait_for_task`) until the task completes.
3. Give the audio link (or links) and the cost.

{{> save folders="such as `public/audio/` or `assets/audio/`"}}
