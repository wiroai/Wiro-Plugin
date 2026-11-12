---
name: workflow
description: List, run, create or edit Wiro AI workflows, alone or with the Workflow Agent
argument-hint: [list | run <slug> [inputs] | create <goal> | ask <goal> | edit <slug> <change> | runs | resume <run>]
tools: get_account, get_playbook, search_models, recommend_model, get_model_schema, list_workflows, get_workflow, wait_for_workflow_run, list_workflow_runs, get_agent_message, get_agent_conversation
---
# Wiro AI: workflows

Request: {{args}}

A workflow is a saved chain of model steps with its own inputs and results, run again and again on new inputs. If you have not read them in this conversation, call `get_playbook` with the topics "workflows" and "workflow-graph" first, and "workflow-agent" before you message the Workflow Agent.

Pick the action from the first word of the request:

- Empty or `list [search]`: `list_workflows` (scope "mine", with `search` when given) as a table: title, full slug, inputs and last update. Offer to run or change one.
- `run <slug or name> [inputs]`: find it (`list_workflows` with `search` when you have only a name) and read it with `get_workflow`. Map the user's values to its Start fields; files are public links (see Input files). Estimate one run: the sum of each model step's price from `get_model_schema` at the settings the step uses, or what earlier runs cost in `list_workflow_runs`. Write the cost line, then call `run_workflow` and follow `nextAction` (`wait_for_workflow_run`) until the status is completed, failed, stopped or cancelled. Show every result: files inline or as links, texts in full, and the cost.
- `create <goal>` or `new <goal>`: if you cannot tell what goes in and what should come out, ask one short question. Then design it yourself: one step per job, a model for each step from `recommend_model` or `search_models`, its parameter ids from `get_model_schema`, and the graph in the format of the "workflow-graph" playbook. Save it with `create_workflow`, which is free and private, then show its inputs, results, models with their prices, and the estimate for one run. Run it only when the user asks. When it has more than one layer of steps, offer a test run that stops early with `breakpoint_node_id`, then `resume_workflow_run`.
- `ask <goal>` or `create --agent <goal>`: brief the Workflow Agent instead. First say in one line that a turn needs at least $10 in the wallet to start and is billed after the turn, and check the balance with `get_account`. Then call `send_agent_message` with agent "workflow-agent", the full brief and a new session name, and follow `nextAction` (`get_agent_message`). Show each proposal with its models, their prices and the estimate for one run, and save the one the user picks with `save_workflow_from_agent`.
- `edit <slug> <change>`: read it with `get_workflow`, change the graph, and send the whole graph to `update_workflow` with the update time you read. The first call returns a change summary: show it, and repeat with `confirm: true` only after a yes. To let the Workflow Agent make the change, attach the workflow to its message with the `workflow` field, then save its proposal onto it with `save_workflow_from_agent`, which also shows a summary first.
- `runs [slug]` or `status <run token>`: `list_workflow_runs`, then `wait_for_workflow_run` with `wait_seconds` 0 to read one run: its status, results, cost, and for a failed run the step that failed and why.
- `resume <run token>`: for a stopped run, or a failure that may be temporary such as an outage or a timeout. Finished steps are not charged again: estimate the rest, then call `resume_workflow_run`. An error about an input or a setting needs a fix and a new run instead; say first that a new run pays for every step again.
- `clone <slug>`: `clone_workflow` copies a published workflow into this workspace for free.
- `delete <slug>`: `delete_workflow` describes the removal first. Confirm only after a yes.

Never put keys, tokens or passwords in a workflow's inputs, steps or a message to the Workflow Agent.

{{> rules}}

{{> input-files}}

{{> save folders="such as `public/`, `assets/` or `wiro-output/`"}}
