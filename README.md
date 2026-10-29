<div align="center">

<img src="https://raw.githubusercontent.com/wiroai/Wiro-Plugin/main/.github/assets/wiro-logo.png" alt="Wiro AI" width="240">

# Wiro AI plugin

Run image, video, audio and LLM models on Wiro AI from Cursor, Claude Code, Gemini CLI and Devin through the hosted Wiro MCP server.

[![License: MIT](https://img.shields.io/badge/license-MIT-111111?style=for-the-badge&color=111111)](./LICENSE) [![MCP: streamable HTTP](https://img.shields.io/badge/MCP-streamable%20HTTP-111111?style=for-the-badge&color=111111)](https://wiro.ai/docs/wiro-mcp-server) [![Works with Claude Code, Cursor, Gemini CLI and Devin](https://img.shields.io/badge/works%20with-Claude%20Code%20%C2%B7%20Cursor%20%C2%B7%20Gemini%20CLI%20%C2%B7%20Devin-111111?style=for-the-badge&color=111111)](#install)

[Website](https://wiro.ai) · [Models](https://wiro.ai/models) · [Docs](https://wiro.ai/docs/wiro-mcp-server) · [Dashboard](https://wiro.ai/panel)

</div>

This repository packages the hosted Wiro MCP server (`https://mcp.wiro.ai/v1`) as a plugin for each of these tools. Once it is installed, your assistant can search the Wiro AI model catalog, read a model's inputs and price, run it, wait for the task and show you the output. It can also upload input files, look through your past tasks and search the Wiro AI docs.

The plugin is free. Each model run is billed to your Wiro AI account at the model's listed price.

## Get an API key

1. Sign up at [wiro.ai](https://wiro.ai) and create a project at [wiro.ai/panel/project/new](https://wiro.ai/panel/project/new).
2. Copy the project's API key. If the project uses signature-based auth, enter `API_KEY:API_SECRET` (both values joined with a colon) wherever the plugin asks for the key.

## Install

### Claude Code

```
/plugin marketplace add wiroai/Wiro-Plugin
/plugin install wiro-ai@wiro
```

Claude Code asks for your API key when the plugin is enabled and keeps it in your system's secure credential store.

### Gemini CLI

```bash
gemini extensions install https://github.com/wiroai/Wiro-Plugin
```

Gemini CLI asks for your API key during install. To change it later, run `gemini extensions config wiro-ai`.

### Devin

```bash
devin plugins install wiroai/Wiro-Plugin
```

In the Devin web app, go to Customize > Plugins > Add plugin > From repository and enter `wiroai/Wiro-Plugin`. Then connect the Wiro server with your API key.

### Cursor

This repository is also a Cursor plugin. Until it is listed in the Cursor Marketplace, add the hosted server to your MCP settings by hand:

```json
{
  "mcpServers": {
    "wiro": {
      "url": "https://mcp.wiro.ai/v1",
      "headers": {
        "Authorization": "Bearer YOUR_WIRO_API_KEY"
      }
    }
  }
}
```

### Other assistants

Any client that supports remote MCP servers can connect to `https://mcp.wiro.ai/v1` with an `Authorization: Bearer <API key>` header. To run the server on your own machine instead, use the npm package [`@wiro-ai/wiro-mcp`](https://www.npmjs.com/package/@wiro-ai/wiro-mcp). Setup guides for more clients are in the [Wiro MCP docs](https://wiro.ai/docs/wiro-mcp-server).

## Try it

- "Generate a photorealistic image of a mountain lake at sunset"
- "What video generation models are available on Wiro?"
- "Show me the parameters for google/veo3-1"
- "Make a 5 second drone shot over mountains with Kling V3"
- "Check the status of my last task"

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
| [Wiro-MCP](https://github.com/wiroai/Wiro-MCP) | Official MCP server for Wiro AI (`@wiro-ai/wiro-mcp`) |
| [Swift-QuickStart](https://github.com/wiroai/Swift-QuickStart) | WiroKit, the Wiro AI SDK for iOS |
| [Kotlin-QuickStart](https://github.com/wiroai/Kotlin-QuickStart) | WiroKit, the Wiro AI SDK for Android |
| [Dart-QuickStart](https://github.com/wiroai/Dart-QuickStart) | Wiro AI SDK for Dart and Flutter (`wiro` on pub.dev) |
| [ReactNative-QuickStart](https://github.com/wiroai/ReactNative-QuickStart) | Wiro AI SDK for React Native and Expo (`@wiro-ai/wiro-react-native`) |
| [Swift-Realtime](https://github.com/wiroai/Swift-Realtime) | Realtime voice AI example for iOS |
| [Kotlin-Realtime](https://github.com/wiroai/Kotlin-Realtime) | Realtime voice AI example for Android |
| [Dart-Realtime](https://github.com/wiroai/Dart-Realtime) | Realtime voice AI example for Flutter |
| [ReactNative-Realtime](https://github.com/wiroai/ReactNative-Realtime) | Realtime voice AI example for React Native |
| [n8n-nodes-wiroai](https://github.com/wiroai/n8n-nodes-wiroai) | Wiro AI nodes for n8n |
| [Wiro-Docs](https://github.com/wiroai/Wiro-Docs) | Source of the Wiro AI API docs |

[Website](https://wiro.ai) · [Models](https://wiro.ai/models) · [Docs](https://wiro.ai/docs) · [X](https://x.com/wiroai)

## License

MIT, see [LICENSE](./LICENSE).
