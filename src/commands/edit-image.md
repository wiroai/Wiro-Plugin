---
name: edit-image
description: Edit, restyle, upscale or remove the background of an image with a Wiro AI model
argument-hint: <image link or path> <what to change> [--model owner/slug] [--save [path]]
tools: get_account, get_playbook, search_models, recommend_model, get_model_schema, wait_for_task, get_task, get_task_price
---
# Wiro AI: edit an image

Request: {{args}}

The request holds the image (a public link or a file in this project, or several for models that combine images) and what to change. If either one is missing, ask for it and stop.

Options the request may carry: `--model owner/slug`, `--ratio 4:5`, `--size 2K`, `--format png`, `--save [path]`. Any other `--name value` is a model setting: match it to the schema.

{{> rules}}

{{> pick-model find="match the job first. To remove or replace a background, call `recommend_model` with \"remove background\". To upscale or sharpen, call it with \"upscale image\". For anything else, such as a new style, an added or removed object, new colors, a product placed in a new scene or several images combined, call `search_models` with the categories `image-editing` and `image-to-image`, sorted by `ratedusercount`." needs="the number of input images, keeping a face or a product exact, text in the image, or the output size"}}

{{> input-files}}

## Run

1. Put the image link (or links) into the schema's image field and the change into its prompt field, written as an instruction ("replace the sky with a sunset, keep the building unchanged"). Keep the aspect ratio of the input unless the user asked for another.
2. Write the cost line, then call `run_model`. Follow `nextAction` (`wait_for_task`) until the task completes.
3. Show the edited image inline with its link, and the cost.

{{> save folders="next to the original, or such as `public/images/` or `assets/`"}}
