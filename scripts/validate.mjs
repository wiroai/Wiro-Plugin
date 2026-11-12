#!/usr/bin/env node
// Checks what the clients' own validators do not: one version everywhere, one MCP URL,
// paths the manifests point to, skill and command front matter, and the house style.
//
//   node scripts/validate.mjs

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const fail = (file, message) => errors.push(`${file}: ${message}`);
const read = file => readFileSync(join(root, file), 'utf8');
const json = file => {
  try { return JSON.parse(read(file)); } catch (error) { fail(file, `not valid JSON (${error.message})`); return {}; }
};

const MCP_URL = 'https://mcp.wiro.ai/v1';
const manifests = {
  claude: json('.claude-plugin/plugin.json'),
  cursor: json('.cursor-plugin/plugin.json'),
  devin: json('.devin-plugin/plugin.json'),
  antigravity: json('.antigravity-plugin/plugin.json'),
  gemini: json('gemini-extension.json'),
  kiro: json('kiro/plugin.json'),
};
const marketplace = json('.claude-plugin/marketplace.json');

// One version everywhere.
const versions = new Set(Object.values(manifests).map(m => m.version));
if (versions.size !== 1) fail('manifests', `versions differ: ${JSON.stringify(Object.fromEntries(Object.entries(manifests).map(([k, m]) => [k, m.version])))}`);
for (const [client, manifest] of Object.entries(manifests)) {
  if (manifest.name !== 'wiro-ai') fail(client, `name is "${manifest.name}", expected "wiro-ai"`);
}
if (!marketplace.plugins?.some(p => p.name === 'wiro-ai' && p.source === './')) fail('.claude-plugin/marketplace.json', 'no wiro-ai entry with source "./"');

// One MCP server URL everywhere.
const urls = [
  ['.claude-plugin/plugin.json', manifests.claude.mcpServers?.wiro?.url],
  ['.devin-plugin/plugin.json', manifests.devin.mcpServers?.wiro?.url],
  ['gemini-extension.json', manifests.gemini.mcpServers?.wiro?.httpUrl ?? manifests.gemini.mcpServers?.wiro?.url],
  ['mcp.json', json('mcp.json').mcpServers?.wiro?.url],
  ['mcp_config.json', json('mcp_config.json').mcpServers?.wiro?.serverUrl],
  ['kiro/mcp.json', json('kiro/mcp.json').mcpServers?.wiro?.url],
];
for (const [file, url] of urls) if (url !== MCP_URL) fail(file, `MCP URL is ${url}, expected ${MCP_URL}`);

// Paths the manifests point to.
const asList = value => (value === undefined ? [] : Array.isArray(value) ? value : [value]);
const mustExist = (file, path) => { if (!existsSync(join(root, path))) fail(file, `points to ${path}, which does not exist`); };
asList(manifests.cursor.commands).forEach(p => mustExist('.cursor-plugin/plugin.json', p));
asList(manifests.devin.skills).forEach(p => mustExist('.devin-plugin/plugin.json', p));
asList(manifests.antigravity.skills).forEach(p => mustExist('.antigravity-plugin/plugin.json', p));
for (const [client, manifest] of Object.entries(manifests)) if (manifest.logo) mustExist(client, manifest.logo);

function frontMatter(file) {
  const match = /^---\n([\s\S]*?)\n---\n/.exec(read(file));
  if (!match) { fail(file, 'missing front matter'); return null; }
  const fields = {};
  for (const line of match[1].split('\n')) {
    const colon = line.indexOf(':');
    if (colon < 1) continue;
    let value = line.slice(colon + 1).trim();
    if (value.startsWith('"')) {
      try { value = JSON.parse(value); } catch { fail(file, `bad quoted value on "${line}"`); }
    }
    fields[line.slice(0, colon).trim()] = value;
  }
  return { fields, body: read(file).slice(match[0].length) };
}

// Skills: the Agent Skills rules every client shares, plus Antigravity's body limit.
const skillDirs = ['skills', 'devin/skills', 'antigravity/skills', 'kiro/skills'];
for (const base of skillDirs) {
  if (!existsSync(join(root, base))) { fail(base, 'missing'); continue; }
  for (const name of readdirSync(join(root, base))) {
    if (!statSync(join(root, base, name)).isDirectory()) continue;
    const file = `${base}/${name}/SKILL.md`;
    if (!existsSync(join(root, file))) { fail(file, 'missing'); continue; }
    const parsed = frontMatter(file);
    if (!parsed) continue;
    const { fields, body } = parsed;
    if (fields.name !== name) fail(file, `name "${fields.name}" must match the folder "${name}"`);
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name) || name.length > 64) fail(file, 'name must be lowercase words joined by hyphens, at most 64 characters');
    if (!fields.description) fail(file, 'description is missing');
    else if (fields.description.length > 1024) fail(file, `description is ${fields.description.length} characters, over 1024`);
    if (base === 'antigravity/skills' && Buffer.byteLength(body) > 24 * 1024) fail(file, 'body is over 24 KB');
  }
}

// Commands.
for (const file of readdirSync(join(root, 'commands')).filter(f => f.endsWith('.md')).map(f => `commands/${f}`)) {
  const fields = frontMatter(file)?.fields ?? {};
  for (const key of ['description', 'argument-hint', 'allowed-tools']) if (!fields[key]) fail(file, `${key} is missing`);
  if (fields['disable-model-invocation'] !== 'true') fail(file, 'paid commands run only when the user types them: disable-model-invocation: true');
}
for (const file of readdirSync(join(root, 'cursor/commands')).map(f => `cursor/commands/${f}`)) {
  const fields = frontMatter(file)?.fields ?? {};
  if (`cursor/commands/${fields.name}.md` !== file) fail(file, `name "${fields.name}" must match the file name`);
  if (!fields.description) fail(file, 'description is missing');
}

// House style: no em or en dashes in anything people read.
function walk(dir) {
  return readdirSync(join(root, dir)).flatMap(name => {
    if (name === '.git' || name === 'node_modules') return [];
    const rel = dir === '.' ? name : `${dir}/${name}`;
    return statSync(join(root, rel)).isDirectory() ? walk(rel) : [rel];
  });
}
for (const file of walk('.').filter(f => /\.(md|json|toml)$/.test(f))) {
  read(file).split('\n').forEach((line, i) => {
    if (/[–—]/.test(line)) fail(`${file}:${i + 1}`, 'uses an em or en dash');
  });
}

if (errors.length) {
  for (const error of errors) console.error(error);
  console.error(`\n${errors.length} problem(s).`);
  process.exit(1);
}
console.log(`Manifests (version ${[...versions][0]}), skills, commands and style are valid.`);
