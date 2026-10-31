<div align="center">

<img src="https://raw.githubusercontent.com/wiroai/Wiro-Plugin/main/.github/assets/wiro-logo.png" alt="Wiro AI" width="240">

# Wiro AI plugin

Run image, video, audio and LLM models, build and run workflows, and deploy and talk to AI agents on Wiro AI from Cursor, Claude Code, Gemini CLI and Devin through the hosted Wiro MCP server.

[![License: MIT](https://img.shields.io/badge/license-MIT-111111?style=for-the-badge&color=111111)](./LICENSE) [![MCP: streamable HTTP](https://img.shields.io/badge/MCP-streamable%20HTTP-111111?style=for-the-badge&color=111111)](https://wiro.ai/docs/wiro-mcp-server) [![Works with Claude Code, Cursor, Gemini CLI and Devin](https://img.shields.io/badge/works%20with-Claude%20Code%20%C2%B7%20Cursor%20%C2%B7%20Gemini%20CLI%20%C2%B7%20Devin-111111?style=for-the-badge&color=111111)](#install)

[Website](https://wiro.ai) · [Models](https://wiro.ai/models) · [Docs](https://wiro.ai/docs/wiro-mcp-server) · [Dashboard](https://wiro.ai/panel)

</div>

This repository packages the hosted Wiro MCP server (`https://mcp.wiro.ai/v1`) as a plugin for each of these tools. Once it is installed, your assistant can use three sets of Wiro AI tools:

- **Models**: search the Wiro AI model catalog, read a model's inputs and price, run it, wait for the task and show you the output. It can also upload input files and look through your past tasks.
- **Workflows**: build workflows that chain models into one graph, run them, resume failed runs and browse the public gallery. The Workflow Agent can design or change a workflow with you in plain language.
- **Agents**: talk to Studio, Wiro's creative agent, and deploy, configure, run and message your own agents built from templates or from skills.

Your assistant can also search the Wiro AI docs, and built-in guides tell it the order of calls, what costs money and what needs your approval.

The plugin is free. Model runs are billed to your Wiro wallet at the model's listed price, workflow runs for their model steps, and chats with Studio or the Workflow Agent after each reply. An agent plan your assistant starts is paid from the same wallet when it starts and then every 30 days until you cancel it. A plan you pay by card in the Wiro dashboard keeps renewing on that card, and you upgrade or top it up there. Deploying an agent, changing its plan or skills, or buying extra credits shows the price and asks before charging.

## Sign in

There is no key to copy. The first time your assistant connects, it opens the Wiro sign-in page in your browser. Sign in or create an account, pick a project, choose how long the connection lasts and click Allow. The project you pick decides which wallet pays and which workflows and agents your assistant works with. You can see or disconnect your apps at any time under [Connected Apps](https://wiro.ai/panel/project?view=apps).

If you'd rather use an API key, add the server by hand with an `Authorization` header, as shown under [Other assistants](#other-assistants).

## Install

### Claude Code

```
/plugin marketplace add wiroai/Wiro-Plugin
/plugin install wiro-ai@wiro
```

Then open `/mcp`, select the Wiro server and choose Authenticate to sign in.

### Gemini CLI

```bash
gemini extensions install https://github.com/wiroai/Wiro-Plugin
```

Then run `/mcp auth wiro` in Gemini CLI to sign in.

### Devin

```bash
devin plugins install wiroai/Wiro-Plugin
```

In the Devin web app, go to Customize > Plugins > Add plugin > From repository and enter `wiroai/Wiro-Plugin`. Devin opens the Wiro sign-in page the first time it connects.

### Cursor

This repository is also a Cursor plugin. Until it is listed in the Cursor Marketplace, use the one-click link or add the hosted server to your MCP settings by hand:

[Add to Cursor](https://cursor.com/install-mcp?name=wiro&config=eyJ1cmwiOiJodHRwczovL21jcC53aXJvLmFpL3YxIn0=)

```json
{
  "mcpServers": {
    "wiro": {
      "url": "https://mcp.wiro.ai/v1"
    }
  }
}
```

Cursor opens the Wiro sign-in page the first time it connects.

### Other assistants

Any client that supports remote MCP servers can connect to `https://mcp.wiro.ai/v1`. Clients with MCP sign-in (OAuth) open the Wiro sign-in page. Others can send an `Authorization: Bearer <API key>` header instead; for a project that uses signature-based auth, send `API_KEY:API_SECRET` (both values joined with a colon). Create a project and its API key at [wiro.ai/panel/project/new](https://wiro.ai/panel/project/new). To run the server on your own machine instead, use the npm package [`@wiro-ai/wiro-mcp`](https://www.npmjs.com/package/@wiro-ai/wiro-mcp). Setup guides for more clients are in the [Wiro MCP docs](https://wiro.ai/docs/wiro-mcp-server).

## Try it

**Models**

- "Generate a photorealistic image of a mountain lake at sunset"
- "What video generation models are available on Wiro?"
- "Show me the parameters for google/veo3-1"
- "Make a 5 second drone shot over mountains with Kling V3"
- "Check the status of my last task"

**Workflows**

- "Build a workflow that turns a product photo into a short ad video, then run it on this photo"
- "Ask the Workflow Agent to add an upscale step to my product ad workflow and save it"
- "Why did my last workflow run fail? Resume it if it can be resumed"

**Agents**

- "Ask Studio for three logo ideas for a coffee shop"
- "Which agent templates can manage Instagram? What does each plan cost?"
- "Deploy the Instagram Manager agent on the Starter plan and tell me what it still needs"
- "Tell my support agent to summarize today's tickets"

## What's in this repository

| File | Used by |
| --- | --- |
| `.cursor-plugin/plugin.json`, `mcp.json` | Cursor |
| `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json` | Claude Code |
| `gemini-extension.json` | Gemini CLI |
| `.devin-plugin/plugin.json` | Devin |

All of them connect to the same hosted server, which runs the MCP tools from the open-source [wiroai/Wiro-MCP](https://github.com/wiroai/Wiro-MCP) package.

## Support, terms and privacy

Email [support@wiro.ai](mailto:support@wiro.ai) or open an issue in this repository. Use of Wiro AI through the plugin is covered by the Wiro AI [Terms of Service](https://wiro.ai/agreement/terms-of-service) and [Privacy Policy](https://wiro.ai/agreement/privacy-policy).

## More from Wiro AI

| Repository | What it is |
| --- | --- |
| [Wiro-MCP](https://github.com/wiroai/Wiro-MCP) | Official MCP server for Wiro AI, [`@wiro-ai/wiro-mcp` on npm](https://www.npmjs.com/package/@wiro-ai/wiro-mcp) |
| [Swift-QuickStart](https://github.com/wiroai/Swift-QuickStart) | WiroKit, the Wiro AI SDK for iOS |
| [Kotlin-QuickStart](https://github.com/wiroai/Kotlin-QuickStart) | WiroKit, the Wiro AI SDK for Android |
| [Dart-QuickStart](https://github.com/wiroai/Dart-QuickStart) | Wiro AI SDK for Dart and Flutter, [`wiro` on pub.dev](https://pub.dev/packages/wiro) |
| [ReactNative-QuickStart](https://github.com/wiroai/ReactNative-QuickStart) | Wiro AI SDK for React Native and Expo, [`@wiro-ai/wiro-react-native` on npm](https://www.npmjs.com/package/@wiro-ai/wiro-react-native) |
| [Swift-Realtime](https://github.com/wiroai/Swift-Realtime) | Realtime voice AI example for iOS |
| [Kotlin-Realtime](https://github.com/wiroai/Kotlin-Realtime) | Realtime voice AI example for Android |
| [Dart-Realtime](https://github.com/wiroai/Dart-Realtime) | Realtime voice AI example for Flutter |
| [ReactNative-Realtime](https://github.com/wiroai/ReactNative-Realtime) | Realtime voice AI example for React Native |
| [n8n-nodes-wiroai](https://github.com/wiroai/n8n-nodes-wiroai) | Wiro AI nodes for n8n, [`@wiro-ai/n8n-nodes-wiroai` on npm](https://www.npmjs.com/package/@wiro-ai/n8n-nodes-wiroai) |
| [Wiro-Docs](https://github.com/wiroai/Wiro-Docs) | Source of the Wiro AI API docs |

[Website](https://wiro.ai) · [Models](https://wiro.ai/models) · [Docs](https://wiro.ai/docs) · [X](https://x.com/wiroai)

## License

MIT, see [LICENSE](./LICENSE).
