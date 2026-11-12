#!/usr/bin/env node
// Builds the slash commands of every client from one source.
//
//   node scripts/build-commands.mjs          write the generated files
//   node scripts/build-commands.mjs --check  exit 1 when a generated file is missing, stale or out of date
//
// Sources: src/commands/<name>.md (front matter + body) and src/partials/<name>.md.
// In a body, {{args}} is where the user's text goes, {{> partial key="value"}} pulls in a
// partial, {{connect}} says how to connect the Wiro server in that client and
// {{cmd:<name>}} is how that client spells another command.
//
// Outputs:
//   commands/<name>.md                 Claude Code commands        /wiro-ai:<name>
//   commands/wiro/<name>.toml          Gemini CLI commands         /wiro:<name>
//   cursor/commands/wiro-<name>.md     Cursor commands             /wiro-<name>
//   devin/skills/<name>/SKILL.md       Devin skills, user-invoked  /wiro-ai:<name>
//   antigravity/skills/<name>/SKILL.md Antigravity skills          /wiro-ai:<name>
//   kiro/skills/wiro-<name>/SKILL.md   Kiro power skills           /wiro-<name>
//   kiro/skills/<skill>/SKILL.md       copies of skills/<skill>/SKILL.md for the Kiro power

import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const check = process.argv.includes('--check');

// Tools a Claude Code command may call without a permission prompt: reads only.
// Paid and changing calls keep the normal prompt.
const READ_ONLY_TOOLS = new Set([
  'get_account', 'get_playbook', 'search_docs', 'search_models', 'get_model_schema', 'recommend_model',
  'explore', 'wait_for_task', 'get_task', 'list_tasks', 'get_task_price', 'list_workflows', 'get_workflow',
  'wait_for_workflow_run', 'list_workflow_runs', 'get_agent_message', 'get_agent_conversation',
  'list_studio_results', 'list_agent_templates', 'get_agent_template', 'list_agent_skills', 'list_my_agents',
  'get_my_agent', 'get_agent_activity', 'list_projects',
]);

const TYPED_TEXT = 'the text the user typed after the command';

// Clients that read $1, $2 ... as arguments get dollar amounts written as "1 USD".
const usdAmounts = text => text.replace(/\$(\d+(?:\.\d+)?)/g, '$1 USD');
const q = value => JSON.stringify(value);

const CLIENTS = [
  {
    id: 'claude',
    owns: rel => /^commands\/[^/]+\.md$/.test(rel),
    file: name => `commands/${name}.md`,
    args: '$ARGUMENTS',
    connect: 'tell the user to open `/mcp`, select the `wiro` server and choose Authenticate. If there is no `wiro` server, the Wiro AI plugin is not installed: `/plugin marketplace add wiroai/Wiro-Plugin`, then `/plugin install wiro-ai@wiro`.',
    cmd: name => `/wiro-ai:${name}`,
    render(meta, body) {
      const tools = meta.tools.map(tool => `mcp__plugin_wiro-ai_wiro__${tool}`).join(', ');
      return [
        '---',
        `description: ${q(meta.description)}`,
        `argument-hint: ${q(meta['argument-hint'])}`,
        `allowed-tools: ${tools}`,
        'disable-model-invocation: true',
        '---',
        '',
        // Claude Code reads $0, $1 ... as arguments; \$ keeps a dollar amount as written.
        body.replace(/\$(?=\d)/g, '\\$'),
      ].join('\n');
    },
    lint(text) {
      const body = text.replace(/\\\$(?=\d)/g, '');
      if (/\$\d/.test(body)) return 'an unescaped $<digit> would be read as an argument';
      if ((body.match(/\$ARGUMENTS/g) || []).length !== 1) return '$ARGUMENTS must appear exactly once';
      if (/(^|\s)!`/m.test(body)) return '!` would run a shell command';
      return null;
    },
  },
  {
    id: 'gemini',
    owns: rel => /^commands\/wiro\/[^/]+\.toml$/.test(rel),
    file: name => `commands/wiro/${name}.toml`,
    args: '{{args}}',
    connect: 'tell the user to run `/mcp auth wiro` and sign in. If there is no `wiro` server, the Wiro AI extension is not installed: `gemini extensions install https://github.com/wiroai/Wiro-Plugin`.',
    cmd: name => `/wiro:${name}`,
    render(meta, body) {
      return `description = ${q(meta.description)}\n\nprompt = ${tomlMultiline(body)}\n`;
    },
    lint(text) {
      if (/[!@]\{/.test(text)) return '!{ or @{ would run a shell command or inject a file';
      if ((text.match(/\{\{args\}\}/g) || []).length !== 1) return '{{args}} must appear exactly once';
      return null;
    },
  },
  {
    id: 'cursor',
    owns: rel => /^cursor\/commands\/[^/]+\.md$/.test(rel),
    file: name => `cursor/commands/wiro-${name}.md`,
    args: TYPED_TEXT,
    connect: "tell the user to open Cursor's MCP settings and connect the `wiro` server, signing in when asked. If there is no `wiro` server, the Wiro AI plugin is not installed; the server can also be added by hand with the URL `https://mcp.wiro.ai/v1`.",
    cmd: name => `/wiro-${name}`,
    render(meta, body) {
      return ['---', `name: wiro-${meta.name}`, `description: ${q(meta.description)}`, '---', '', body].join('\n');
    },
    lint: noPlaceholder,
  },
  {
    id: 'devin',
    owns: rel => /^devin\/skills\/[^/]+\/SKILL\.md$/.test(rel),
    file: name => `devin/skills/${name}/SKILL.md`,
    args: '$ARGUMENTS',
    connect: 'tell the user to connect the `wiro` server; Devin opens the Wiro sign-in page the first time it connects. If there is no `wiro` server, the Wiro AI plugin is not installed: `devin plugins install wiroai/Wiro-Plugin`.',
    cmd: name => `/wiro-ai:${name}`,
    render(meta, body) {
      return [
        '---',
        `name: ${meta.name}`,
        `description: ${q(meta.description)}`,
        `argument-hint: ${q(meta['argument-hint'])}`,
        'triggers: [user]',
        '---',
        '',
        usdAmounts(body),
      ].join('\n');
    },
    lint(text) {
      if (/\$\d/.test(text)) return '$<digit> would be read as an argument';
      if ((text.match(/\$ARGUMENTS/g) || []).length !== 1) return '$ARGUMENTS must appear exactly once';
      return null;
    },
  },
  {
    id: 'antigravity',
    owns: rel => /^antigravity\/skills\/[^/]+\/SKILL\.md$/.test(rel),
    file: name => `antigravity/skills/${name}/SKILL.md`,
    args: TYPED_TEXT,
    connect: 'tell the user to sign in to the `wiro` server; Antigravity opens the Wiro sign-in page the first time it connects. If there is no `wiro` server, the Wiro AI plugin is not installed: `agy plugin install https://github.com/wiroai/Wiro-Plugin`.',
    cmd: name => `/wiro-ai:${name}`,
    render(meta, body) {
      return ['---', `name: ${meta.name}`, `description: ${q(meta.description)}`, 'disable-model-invocation: true', '---', '', body].join('\n');
    },
    lint: noPlaceholder,
  },
  {
    id: 'kiro',
    owns: rel => /^kiro\/skills\/wiro-[^/]+\/SKILL\.md$/.test(rel) && !COPIED_SKILLS.has(rel.split('/')[2]),
    file: name => `kiro/skills/wiro-${name}/SKILL.md`,
    args: TYPED_TEXT,
    connect: 'tell the user to open the Powers panel and check that the Wiro AI power is installed; Kiro opens the Wiro sign-in page the first time the server connects.',
    cmd: name => `/wiro-${name}`,
    render(meta, body) {
      const description = `${meta.description}. Use when the user types /wiro-${meta.name} or asks for this with Wiro AI.`;
      return ['---', `name: wiro-${meta.name}`, `description: ${q(description)}`, '---', '', usdAmounts(body)].join('\n');
    },
    lint(text) {
      if (/\$\d/.test(text)) return '$<digit> could be read as an argument';
      return noPlaceholder(text);
    },
  },
];

// Root skills that the Kiro power ships as copies, since a power only sees its own folder.
const COPIED_SKILLS = new Set(
  readdirSync(join(root, 'skills')).filter(name => existsSync(join(root, 'skills', name, 'SKILL.md'))),
);

function noPlaceholder(text) {
  if (text.includes('$ARGUMENTS') || text.includes('{{args}}')) return 'this client fills in no placeholder';
  return null;
}

function parseSource(path) {
  const text = readFileSync(path, 'utf8');
  const match = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(text);
  if (!match) throw new Error(`${relative(root, path)}: missing front matter`);
  const meta = {};
  for (const line of match[1].split('\n')) {
    const colon = line.indexOf(':');
    if (colon < 1) throw new Error(`${relative(root, path)}: bad front matter line "${line}"`);
    meta[line.slice(0, colon).trim()] = line.slice(colon + 1).trim();
  }
  for (const key of ['name', 'description', 'argument-hint', 'tools']) {
    if (!meta[key]) throw new Error(`${relative(root, path)}: front matter needs ${key}`);
  }
  if (meta.description.length > 200) throw new Error(`${relative(root, path)}: description over 200 characters`);
  meta.tools = meta.tools.split(',').map(tool => tool.trim()).filter(Boolean);
  for (const tool of meta.tools) {
    if (!READ_ONLY_TOOLS.has(tool)) throw new Error(`${relative(root, path)}: ${tool} is not a read-only tool`);
  }
  return { meta, body: match[2] };
}

const partials = Object.fromEntries(
  readdirSync(join(root, 'src/partials'))
    .filter(file => file.endsWith('.md'))
    .map(file => [file.slice(0, -3), readFileSync(join(root, 'src/partials', file), 'utf8').trimEnd()]),
);

function expand(body, where) {
  return body.replace(/\{\{>\s*([\w-]+)((?:\s+[\w-]+="(?:[^"\\]|\\.)*")*)\s*\}\}/g, (_, name, rawParams) => {
    const partial = partials[name];
    if (partial === undefined) throw new Error(`${where}: unknown partial ${name}`);
    const params = {};
    for (const [, key, value] of rawParams.matchAll(/([\w-]+)="((?:[^"\\]|\\.)*)"/g)) {
      params[key] = value.replace(/\\(.)/g, '$1');
    }
    return partial.replace(/\{\{(?!>|args\}\}|connect\}\}|cmd:)([\w-]+)\}\}/g, (__, key) => {
      if (params[key] === undefined) throw new Error(`${where}: partial ${name} needs ${key}="..."`);
      return params[key];
    });
  });
}

function render(client, source, where) {
  const body = expand(source.body, where)
    .replaceAll('{{connect}}', client.connect)
    .replace(/\{\{cmd:([\w-]+)\}\}/g, (_, name) => client.cmd(name))
    .replaceAll('{{args}}', client.args)
    .replace(/\n{3,}/g, '\n\n')
    .trimEnd() + '\n';
  if (/\{\{(?!args\}\})/.test(body)) throw new Error(`${where}: unresolved {{...}} in the ${client.id} output`);
  return client.render(source.meta, body);
}

function tomlMultiline(value) {
  // A TOML basic multi-line string: escape backslashes, and break up any run of three quotes.
  const escaped = value.replace(/\\/g, '\\\\').replace(/"""/g, '""\\"');
  return `"""\n${escaped}"""`;
}

function walk(dir) {
  const abs = join(root, dir);
  if (!existsSync(abs)) return [];
  return readdirSync(abs).flatMap(name => {
    const rel = `${dir}/${name}`;
    return statSync(join(root, rel)).isDirectory() ? walk(rel) : [rel];
  });
}

const sources = readdirSync(join(root, 'src/commands'))
  .filter(file => file.endsWith('.md'))
  .sort()
  .map(file => ({ file, ...parseSource(join(root, 'src/commands', file)) }));

for (const source of sources) {
  if (source.file !== `${source.meta.name}.md`) throw new Error(`src/commands/${source.file}: name must match the file name`);
}

const expected = new Map();
const owners = [];
for (const client of CLIENTS) {
  owners.push(client.owns);
  for (const source of sources) {
    const out = client.file(source.meta.name);
    const text = render(client, source, `src/commands/${source.file}`);
    const issue = client.lint(text);
    if (issue) throw new Error(`${out}: ${issue}`);
    expected.set(out, text);
  }
}
for (const name of COPIED_SKILLS) {
  const out = `kiro/skills/${name}/SKILL.md`;
  expected.set(out, readFileSync(join(root, 'skills', name, 'SKILL.md'), 'utf8'));
}
owners.push(rel => /^kiro\/skills\/[^/]+\/SKILL\.md$/.test(rel));

let problems = 0;
const generatedDirs = ['commands', 'cursor/commands', 'devin/skills', 'antigravity/skills', 'kiro/skills'];
for (const file of generatedDirs.flatMap(walk)) {
  if (expected.has(file) || !owners.some(owns => owns(file))) continue;
  if (check) { console.error(`stale: ${file}`); problems++; continue; }
  rmSync(join(root, file));
  const dir = dirname(join(root, file));
  if (readdirSync(dir).length === 0) rmSync(dir, { recursive: true });
  console.log(`removed ${file}`);
}
for (const [file, text] of expected) {
  const path = join(root, file);
  const current = existsSync(path) ? readFileSync(path, 'utf8') : null;
  if (current === text) continue;
  if (check) { console.error(`out of date: ${file}`); problems++; continue; }
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, text);
  console.log(`wrote ${file}`);
}

if (check) {
  if (problems) {
    console.error(`${problems} generated file(s) differ from src/ and skills/. Run: node scripts/build-commands.mjs`);
    process.exit(1);
  }
  console.log(`${sources.length} commands for ${CLIENTS.map(c => c.id).join(', ')}, and ${COPIED_SKILLS.size} skills for Kiro, are up to date.`);
}
