import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import { cp, mkdtemp, readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
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
  await writeFile(path.join(root, 'notes.md'), 'See /Us' + 'ers/someone/work, SYS' + 'TEM-Example-Tool and ghp_' + 'a'.repeat(36) + '\n');
  const errors = await check(root);
  assert.ok(errors.some(error => error.includes('local user path')));
  assert.ok(errors.some(error => error.includes('GitHub token')));
  assert.ok(errors.some(error => error.includes('internal repository')));
});

test('internal repository names written with a wildcard are reported', async () => {
  const root = await copy();
  await writeFile(path.join(root, 'notes.md'), 'SYS' + 'TEM-* and MANAGE' + 'MENT-* repositories\n');
  assert.ok((await check(root)).some(error => error.includes('internal repository')));
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
  await rm(path.join(root, plugin, 'feedback/upstream.json'), { force: true });
  assert.ok((await check(root)).some(error => error.includes('has no feedback/upstream.json')));
});

// A stand-in for the bundle: it answers --version and --help the way the given edition does.
async function plantCli(root, { edition, version, help, cli = `process.stdout.write(process.argv[2] === '--version' ? ${JSON.stringify(version)} : ${JSON.stringify(help)});\n` }) {
  await writeFile(path.join(root, plugin, 'cli/index.mjs'), cli);
  const record = path.join(root, plugin, 'feedback/upstream.json');
  const data = JSON.parse(await readFile(record, 'utf8'));
  data.artifacts['cli/index.mjs'] = createHash('sha256').update(cli).digest('hex');
  data.version = '1.2.3';
  if (edition === undefined) delete data.edition; else data.edition = edition;
  await writeFile(record, JSON.stringify(data));
}
const notClient = errors => errors.some(error => error.includes('is not the client edition'));

test('a client edition build passes the edition check', async () => {
  const root = await copy();
  await plantCli(root, { edition: 'client', version: 'Brixon CLI 1.2.3\n', help: 'put --file PATH\n' });
  assert.equal(notClient(await check(root)), false);
});

test('a build that is not the client edition is reported', async () => {
  for (const planted of [
    { edition: 'client', version: '1.2.3\n', help: 'put --file PATH\n' },
    { edition: 'client', version: 'Brixon CLI 9.9.9\n', help: 'put --file PATH\n' },
    { edition: 'client', version: 'Brixon CLI 1.2.3\n', help: 'manifest --video KEY=PATH\n' },
    { edition: 'client', version: 'Brixon CLI 1.2.3\n', help: 'doctor reports ffprobe\n' },
    { edition: 'other', version: 'Brixon CLI 1.2.3\n', help: 'put --file PATH\n' },
    { edition: undefined, version: 'Brixon CLI 1.2.3\n', help: 'put --file PATH\n' },
  ]) {
    const root = await copy();
    await plantCli(root, planted);
    assert.ok(notClient(await check(root)), JSON.stringify(planted));
  }
});

test('a build that does not start is reported as such', async () => {
  const root = await copy();
  await plantCli(root, { edition: 'client', cli: "throw new Error('broken build');\n" });
  const errors = await check(root);
  assert.ok(errors.some(error => error.includes('did not run with --version') && error.includes('broken build')), errors.join('\n'));
  assert.equal(notClient(errors), false);
});

test('a provisional host name is reported', async () => {
  const root = await copy();
  await writeFile(path.join(root, 'notes.md'), 'https://some-tool.example-team.work' + 'ers.dev\n');
  assert.ok((await check(root)).some(error => error.includes('provisional host name')));
});

test('an upstream record without its source commit is reported', async () => {
  const root = await copy();
  const record = path.join(root, plugin, 'feedback/upstream.json');
  const data = JSON.parse(await readFile(record, 'utf8'));
  data.commit = 'main';
  await writeFile(record, JSON.stringify(data));
  assert.ok((await check(root)).some(error => error.includes('needs the full source commit')));
});
