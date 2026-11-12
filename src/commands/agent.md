---
name: agent
description: Ask Wiro Studio to create media, or message, check and set up your own Wiro AI agents
argument-hint: [studio <request> | <agent name> <message> | list | status <agent> | templates [need] | deploy <template>]
tools: get_account, get_playbook, list_my_agents, get_my_agent, get_agent_activity, get_agent_message, get_agent_conversation, list_studio_results, list_agent_templates, get_agent_template, list_agent_skills
---
# Wiro AI: Studio and your agents

Request: {{args}}

Pick the action from the first word of the request:

- `studio <request>`: Studio, Wiro's creative agent, picks the models, runs them and replies with the files. If you have not read it in this conversation, call `get_playbook` with the topic "studio". Check the balance with `get_account`, and say in one line that a turn needs at least $10 in the wallet to start, is billed after the turn for its chat and for each model run it starts, and can cost more than $10. For a large or open-ended request, such as many videos or long clips, agree on the scope first. Then call `send_agent_message` with agent "studio", the whole brief (what it is for, the look, the format, how many) and a new session name, and follow `nextAction` (`get_agent_message`) until the turn completes. Show every file from its `modelRuns` with its cost. Results that finish after the turn are in `list_studio_results`.
- `<agent name> <message>`: one of the user's deployed agents. Read the "agents" playbook first if you have not. Find the agent with `list_my_agents` and ask when more than one could match. Read it with `get_my_agent`: it must be running (status 4) and have credits left. Say in one line that the message uses the agent's credits, then call `send_agent_message` with its guid and the message, in its main session unless the user names another, and follow `nextAction` (`get_agent_message`). Work the agent moves to the background arrives later: read it with `get_agent_conversation`.
- Empty or `list`: `list_my_agents` as a table: name, template, status, plan and credits left.
- `status <agent name>`: `get_my_agent`, and for a problem `get_agent_activity` (logs). Send no test messages: each one uses credits.
- `templates [need]`: `list_agent_templates`, then `get_agent_template` for the best matches: what each one does, its Starter and Pro prices and credits, and the accounts and keys it needs. This is free.
- `deploy <template>`: read the "agents" playbook first if you have not. Call `deploy_agent` without `confirm` for the quote, and show the amount, the wallet that pays, and that the plan renews every 30 days until it is cancelled. Repeat the call as its `nextAction` shows, with `confirm: true` and `confirm_charge_usd`, only after a clear yes to that amount. Then set up what it needs, as the playbook shows.

Never repeat a secret back to the user, and never put one in a message to an agent: credentials go only into `set_agent_credentials`.

{{> rules}}
