---
name: image
description: Generate images with a Wiro AI model picked from the catalog, with the price shown first
argument-hint: <prompt> [--model owner/slug] [--ratio 16:9] [--count 2] [--save [path]]
tools: get_account, get_playbook, search_models, recommend_model, get_model_schema, wait_for_task, get_task, get_task_price
---
# Wiro AI: generate images

Request: {{args}}

If the request is empty, ask what to make (the subject, the style, the format and how many) and stop.

Options the request may carry: `--model owner/slug`, `--ratio 16:9`, `--size 2K`, `--count 3`, `--format png`, `--seed 42`, `--save [path]`. Any other `--name value` is a model setting: match it to the schema. Plain words work too, such as "three square images".

{{> rules}}

{{> pick-model find="call `recommend_model` with \"text to image\" plus a word for the style when it matters, and `search_models` with the category `text-to-image` sorted by `ratedusercount`." needs="readable text in the image, a given aspect ratio or size, or several images in one run"}}

For a real product, logo or person the user has a photo of, use an image editing model with that photo as input instead ({{cmd:edit-image}}): text to image would invent it.

## Run

1. Fill `params` from the schema: the prompt, and the aspect ratio, resolution, count and format the user asked for. Leave the rest out so the defaults apply. For several images, use the model's count field when it has one, otherwise start one run per image with `wait: false` and wait on each task.
2. Write the cost line, then call `run_model`. Follow `nextAction` (`wait_for_task`) until the task completes.
3. Show every image inline with its link, and the cost. If the result shows only the list price, `get_task_price` gives the charge a moment later.

{{> save folders="such as `public/images/`, `static/`, `assets/` or `src/assets/`"}}
