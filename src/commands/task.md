---
name: task
description: Check a Wiro AI task, wait for it, show its files and cost, or stop it
argument-hint: [task id or token | last | list [model] | stop <id> | price <id>] [--save [path]]
tools: get_account, get_playbook, list_tasks, get_task, wait_for_task, get_task_price, list_workflow_runs, list_studio_results
---
# Wiro AI: task status and results

Request: {{args}}

- A task id or task token: `get_task` with it. If it is still running, follow its `nextAction` (`wait_for_task`) until it ends, unless the user only asked for the status.
- `last`: the newest task from `list_tasks` (`limit` 1), then as above.
- Empty or `list [model]`: `list_tasks` (`limit` 10, with the `model` filter when one is given) as a table: task id, model, status, cost, start time (Unix seconds, so convert it to the user's local time) and its first file.
- `stop <id or token>`: the user's request is the yes. Call `kill_task`, and say that a task stopped while it was running can still be charged; `get_task_price` shows the charge once the run ends.
- `price <id or token>`: `get_task_price`.

For a finished task, show its files (images inline, links for the rest), any text answer, its status and its cost. A failed task is not charged: give the reason its result shows. With a team key the list holds teammates' tasks too, so confirm which task the user means before you act on one.

The steps of workflow runs and the runs Studio starts are not in this list: look in `list_workflow_runs` and `list_studio_results`.

{{> rules}}

{{> save folders="such as `public/`, `assets/` or `wiro-output/`"}}
