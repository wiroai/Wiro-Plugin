#!/usr/bin/env node
// Validates the manifests against the JSON schemas Cursor, Antigravity and Kiro publish.
// Needs ajv@8 and ajv-formats@3 next to this script; CI copies it into a folder that has them.
//
//   node validate-schemas.mjs <repo folder> <folder with the downloaded schemas>

import Ajv from 'ajv';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const [repo, schemas] = process.argv.slice(2);
const load = path => JSON.parse(readFileSync(path, 'utf8'));
const cases = [
  ['Cursor plugin', 'cursor-plugin.schema.json', '.cursor-plugin/plugin.json', 7],
  ['Antigravity plugin', 'antigravity-plugin.schema.json', '.antigravity-plugin/plugin.json', 2020],
  ['Kiro power', 'agent-plugin.schema.json', 'kiro/plugin.json', 2020],
  ['Kiro power MCP', 'agent-mcp.schema.json', 'kiro/mcp.json', 2020],
];

let failed = 0;
for (const [label, schemaFile, file, draft] of cases) {
  const ajv = draft === 7 ? new Ajv({ allErrors: true, strict: false }) : new Ajv2020({ allErrors: true, strict: false });
  addFormats(ajv);
  const validate = ajv.compile(load(join(schemas, schemaFile)));
  if (validate(load(join(repo, file)))) {
    console.log(`ok   ${label}: ${file}`);
    continue;
  }
  failed++;
  console.log(`FAIL ${label}: ${file}`);
  for (const error of validate.errors) console.log(`     ${error.instancePath || '/'} ${error.message} ${JSON.stringify(error.params)}`);
}
process.exit(failed ? 1 : 0);
