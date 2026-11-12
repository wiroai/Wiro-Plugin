# Wiro AI power for Kiro

This folder is the Wiro AI power for Kiro. It connects Kiro to the hosted Wiro MCP server (`https://mcp.wiro.ai/v1`), so you can run image, video, audio and LLM models, build workflows that chain them, and deploy and talk to AI agents on Wiro AI from chat.

## What you get

- The Wiro MCP server, with tools to search the catalog of 1,000+ models, read prices, run models, build and run workflows, and talk to Studio and your own agents.
- Slash commands as skills: `/wiro-image`, `/wiro-edit-image`, `/wiro-video`, `/wiro-speech`, `/wiro-music`, `/wiro-transcribe`, `/wiro-3d`, `/wiro-models`, `/wiro-workflow`, `/wiro-agent` and `/wiro-task`. Type one, then what you want. Each one picks a fitting model from the catalog, tells you the price before it runs and can save the results into your project.
- The agent skills `wiro-ai`, `wiro-realtime-voice`, `wiro-workflows`, `wiro-agents` and `wiro-media-assets`.

## Install

In Kiro, open the Powers panel, choose Add Custom Power > Import power from GitHub and enter:

```
https://github.com/wiroai/Wiro-Plugin/tree/main/kiro
```

## Sign in

There is no key to copy. The first time the server connects, Kiro opens the Wiro sign-in page. Sign in or create an account, pick a project and click Allow. The project you pick decides which wallet pays.

## Pricing

The power is free. Model runs are billed to your Wiro wallet at the model's listed price. Deploying an agent, changing its plan or skills, or buying extra credits shows the price and asks before charging.

## Support and privacy

Email [support@wiro.ai](mailto:support@wiro.ai) or open an issue at [wiroai/Wiro-Plugin](https://github.com/wiroai/Wiro-Plugin). Use of Wiro AI is covered by the [Terms of Service](https://wiro.ai/agreement/terms-of-service) and the [Privacy Policy](https://wiro.ai/agreement/privacy-policy).
