# Wiro AI

Run image, video, audio and LLM models, build workflows that chain them, and deploy and talk to AI agents on Wiro AI from Antigravity.

## What you get

- **The Wiro MCP server** (`https://mcp.wiro.ai/v1`). Your agent can search the catalog of 1,000+ models, read a model's inputs and price, run it and bring back the output. It can also build, run and resume workflows, talk to Studio, Wiro's creative agent, and deploy, configure and message your own agents.
- **Five skills.** `wiro-ai` shows the agent how to use Wiro from code: find a model, check its price, run it, get the result, and call LLMs through the OpenAI-compatible endpoint. `wiro-realtime-voice` covers live voice conversation, streaming text-to-speech and streaming speech-to-text over the Wiro WebSocket. `wiro-workflows` designs, runs and repairs workflows, `wiro-agents` deploys, sets up and runs agents, and `wiro-media-assets` makes images, icons, short videos and voice-overs for a project and puts them in the right folder.
- **Slash commands.** `/wiro-ai:image`, `/wiro-ai:edit-image`, `/wiro-ai:video`, `/wiro-ai:speech`, `/wiro-ai:music`, `/wiro-ai:transcribe`, `/wiro-ai:3d`, `/wiro-ai:models`, `/wiro-ai:workflow`, `/wiro-ai:agent` and `/wiro-ai:task` run only when you call them. Each one picks a fitting model from the catalog, tells you the price before it runs and can save the results into your project.

## Sign in

There is no key to copy. The first time the server connects, Antigravity opens the Wiro sign-in page. Sign in or create an account, pick a project and click Allow. The project you pick decides which wallet pays. You can see or disconnect your apps at any time under [Connected Apps](https://wiro.ai/panel/project?view=apps).

## Pricing

The plugin is free. Model runs are billed to your Wiro wallet at the model's listed price, workflow runs for their model steps, and chats with Studio after each reply. Deploying an agent, changing its plan or skills, or buying extra credits shows the price and asks before charging.

## Try it

- "Generate a photorealistic image of a mountain lake at sunset"
- "What video generation models are available on Wiro?"
- "Build a workflow that turns a product photo into a short ad video, then run it on this photo"
- "Ask Studio for three logo ideas for a coffee shop"
- `/wiro-ai:image a flat illustration of a steaming coffee cup, 16:9 --save`
- `/wiro-ai:models cheapest text to speech model that speaks Turkish`

## Support

Email [support@wiro.ai](mailto:support@wiro.ai) or open an issue at [wiroai/Wiro-Plugin](https://github.com/wiroai/Wiro-Plugin). Use of Wiro AI is covered by the [Terms of Service](https://wiro.ai/agreement/terms-of-service) and the [Privacy Policy](https://wiro.ai/agreement/privacy-policy).
