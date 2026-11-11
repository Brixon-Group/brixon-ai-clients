import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import { cp, mkdtemp, readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import os from 'node:os';
import { check } from './check.mjs';

const repo = fileURLToPath(new URL('..', import.meta.url));
const plugin = 'plugins/brixon-ai-client-core';

// Each test gets its own copy so a planted problem never touches the repository.
const copies = [];
after(() => Promise.all(copies.map(root => rm(root, { recursive: true, force: true }))));
async function copy() {
  const root = await mkdtemp(path.join(os.tmpdir(), 'marketplace-check-'));
  copies.push(root);
  await cp(repo, root, { recursive: true, filter: source => !source.split(path.sep).includes('.git') });
  execFileSync('git', ['init', '-q'], { cwd: root });
  return root;
}

test('the repository passes', async () => {
  assert.deepEqual(await check(repo), []);
});

test('internal paths and secrets are reported', async () => {
  const root = await copy();
  await writeFile(path.join(root, 'notes.md'), 'See /Us' + 'ers/someone/work, SYS' + 'TEM-Feedback-Tool and ghp_' + 'a'.repeat(36) + '\n');
  const errors = await check(root);
  assert.ok(errors.some(error => error.includes('local user path')));
  assert.ok(errors.some(error => error.includes('GitHub token')));
  assert.ok(errors.some(error => error.includes('internal repository')));
});

test('environment files are reported', async () => {
  const root = await copy();
  await writeFile(path.join(root, '.env.local'), 'X=1\n');
  execFileSync('git', ['add', '-f', '.env.local'], { cwd: root });
  assert.ok((await check(root)).some(error => error.includes('environment file')));
});

test('version drift between catalogs and manifests is reported', async () => {
  const root = await copy();
  const manifest = path.join(root, plugin, '.codex-plugin/plugin.json');
  const data = JSON.parse(await readFile(manifest, 'utf8'));
  data.version = '9.9.9';
  await writeFile(manifest, JSON.stringify(data));
  assert.ok((await check(root)).some(error => error.includes('versions must be equal')));
});

test('an MCP server with headers is reported', async () => {
  const root = await copy();
  for (const kind of ['.claude-plugin', '.codex-plugin']) {
    const manifest = path.join(root, plugin, kind, 'plugin.json');
    const data = JSON.parse(await readFile(manifest, 'utf8'));
    data.mcpServers.extra = { type: 'http', url: 'https://example.com/mcp', headers: { Authorization: 'x' } };
    await writeFile(manifest, JSON.stringify(data));
  }
  assert.ok((await check(root)).some(error => error.includes('must not carry headers')));
});

test('a bundled CLI that differs from its upstream record is reported', async () => {
  const root = await copy();
  await mkdir(path.join(root, plugin, 'cli'), { recursive: true });
  await mkdir(path.join(root, plugin, 'feedback'), { recursive: true });
  await writeFile(path.join(root, plugin, 'cli/index.mjs'), 'changed\n');
  await writeFile(path.join(root, plugin, 'feedback/upstream.json'), JSON.stringify({ artifacts: { 'cli/index.mjs': '0'.repeat(64) } }));
  assert.ok((await check(root)).some(error => error.includes('does not match feedback/upstream.json')));
});

test('a bundled CLI without an upstream record is reported', async () => {
  const root = await copy();
  await mkdir(path.join(root, plugin, 'cli'), { recursive: true });
  await writeFile(path.join(root, plugin, 'cli/index.mjs'), 'cli\n');
  assert.ok((await check(root)).some(error => error.includes('has no feedback/upstream.json')));
});
