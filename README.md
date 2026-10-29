<div align="center">

<img src="assets/logo.png" alt="Wiro AI" width="88" />

# Wiro AI plugin

Run image, video, audio and LLM models on [Wiro AI](https://wiro.ai) from Cursor, Claude Code, Gemini CLI and Devin.

</div>

This repository packages the hosted Wiro MCP server (`https://mcp.wiro.ai/v1`) as a plugin for each of these tools. Once it is installed, your assistant can search the Wiro model catalog, read a model's inputs and price, run it, wait for the task and show you the output. It can also upload input files, look through your past tasks and search the Wiro docs.

The plugin is free. Each model run is billed to your Wiro account at the model's listed price.

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
- "Show me the parameters for openai/sora-2"
- "Make a 5 second drone shot over mountains with Kling V3"
- "Check the status of my last task"

## What's in this repository

| File | Used by |
| --- | --- |
| `.cursor-plugin/plugin.json`, `mcp.json` | Cursor |
| `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json` | Claude Code |
| `gemini-extension.json` | Gemini CLI |
| `.devin-plugin/plugin.json` | Devin |

All of them connect to the same hosted server. Its source code is in [wiroai/Wiro-MCP](https://github.com/wiroai/Wiro-MCP).

## License

MIT, see [LICENSE](./LICENSE).
