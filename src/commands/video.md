---
name: video
description: Make a video from text or from a start image with a Wiro AI model, with the price shown first
argument-hint: <prompt> [--image <link or path>] [--duration 5] [--ratio 9:16] [--audio] [--model owner/slug] [--save [path]]
tools: get_account, get_playbook, search_models, recommend_model, get_model_schema, wait_for_task, get_task, get_task_price
---
# Wiro AI: make a video

Request: {{args}}

Text to video by default. When the request gives a start image (`--image <link or path>`, or an image link in the text), animate it with an image to video model. If the request is empty, ask what the video should show, how long it should be and its format, and stop.

Options the request may carry: `--model owner/slug`, `--image <link or path>`, `--last-frame <link or path>`, `--duration 5`, `--ratio 9:16`, `--resolution 1080p`, `--audio` (sound made with the video), `--save [path]`. Any other `--name value` is a model setting: match it to the schema.

{{> rules}}

{{> pick-model find="call `recommend_model` with \"text to video\" or \"image to video\", and `search_models` with the category `text-to-video` or `image-to-video`, sorted by `ratedusercount`." needs="the duration and aspect ratio asked for, a start or end frame, or sound"}}

{{> input-files}}

## Run

1. Fill `params` from the schema: the prompt (describe the subject, the motion and the camera), the duration, aspect ratio and resolution asked for, and the image field when there is a start image. Use a duration the schema allows.
2. Video is usually priced per second or by resolution, so work out the estimate for this length. Write the cost line, then call `run_model`.
3. A video takes a few minutes. Say so, then follow `nextAction` (`wait_for_task`) until the task completes. Never start it again because a wait ran out.
4. Give the video link, any poster image, and the cost.

{{> save folders="such as `public/videos/`, `static/` or `assets/`"}}
