import { before, test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';
import { syncFeedback } from './sync-feedback.mjs';

// Supply an isolated clean, pinned source with exact lockfile dependencies.
// Never use a live project, user home or dirty upstream checkout for this suite.
const source = process.env.FEEDBACK_TEST_SOURCE;
const enabled = { skip: !source && 'Set FEEDBACK_TEST_SOURCE to the isolated pinned source' };
let root, destination, cli;
before(async () => {
  if (!source) return;
  root = await mkdtemp(path.join(os.tmpdir(), 'feedback-sync-test-'));
  destination = path.join(root, 'core');
  const skill = path.join(destination, 'skills/brixon-feedback');
  await mkdir(path.join(skill, 'references'), { recursive: true });
  await writeFile(path.join(skill, 'SKILL.md'), 'Marketplace entry\n');
  await writeFile(path.join(skill, 'references/publish.md'), 'Marketplace workflow\n');
  await syncFeedback(source, { destination });
  cli = path.join(destination, 'cli/index.mjs');
});

test('sync owns runtime artifacts only and preserves marketplace skills and references', enabled, async () => {
  const result = await syncFeedback(source, { destination });
  assert.deepEqual(result.files.sort(), ['cli/index.mjs', 'feedback/THIRD-PARTY-NOTICES.md', 'feedback/package.json', 'feedback/upstream.json']);
  assert.deepEqual(await readdir(path.join(destination, 'skills')), ['brixon-feedback']);
  assert.equal(await readFile(path.join(destination, 'skills/brixon-feedback/SKILL.md'), 'utf8'), 'Marketplace entry\n');
  assert.equal(await readFile(path.join(destination, 'skills/brixon-feedback/references/publish.md'), 'utf8'), 'Marketplace workflow\n');
  const upstream = JSON.parse(await readFile(path.join(destination, 'feedback/upstream.json'), 'utf8'));
  assert.equal(upstream.ownership.skills, 'marketplace-owned; excluded from sync');
  assert.equal(upstream.sourceSkills, undefined);
  assert.ok(Object.keys(upstream.artifacts).every(name => !name.startsWith('skills/')));
  assert.ok(upstream.sourceFiles['cli/skills.mjs']);
});

test('check is reproducible and leaves independent reference edits intact', enabled, async () => {
  const reference = path.join(destination, 'skills/brixon-feedback/references/apply.md');
  await writeFile(reference, 'Owner-added reference\n');
  await syncFeedback(source, { destination, check: true });
  assert.equal(await readFile(reference, 'utf8'), 'Owner-added reference\n');
  const other = path.join(root, 'second-build');
  await syncFeedback(source, { destination: other });
  assert.deepEqual(await readFile(path.join(other, 'cli/index.mjs')), await readFile(cli));
  await writeFile(path.join(other, 'cli/index.mjs'), 'changed runtime');
  await assert.rejects(syncFeedback(source, { destination: other, check: true }), /Distribution differs: cli\/index.mjs/);
});

test('bundled standalone install and check refuse without project or home writes', enabled, async () => {
  const project = path.join(root, 'owner-project'), home = path.join(root, 'owner-home');
  await mkdir(project); await mkdir(home);
  await writeFile(path.join(project, 'owner.txt'), 'Preserve');
  const help = spawnSync(process.execPath, [cli, '--help'], { cwd: project, encoding: 'utf8' });
  assert.equal(help.status, 0, help.stderr);
  assert.match(help.stdout, /skills install\|check: unavailable in this bundle/);
  for (const action of ['install', 'check']) for (const scope of ['project', 'user']) {
    const result = spawnSync(process.execPath, [cli, 'skills', action, '--target', 'both', '--scope', scope, '--directory', project], {
      cwd: project, env: { PATH: '/usr/bin:/bin', HOME: home }, encoding: 'utf8', timeout: 10000,
    });
    assert.equal(result.status, 1, result.stderr);
    assert.match(result.stderr, /come with the brixon-ai-client-core plugin/);
    assert.doesNotMatch(result.stderr, /ENOENT/);
    assert.deepEqual(await readdir(project), ['owner.txt']);
    assert.deepEqual(await readdir(home), []);
  }
});

test('bundled manifest and mapped target remain usable without network', enabled, async () => {
  const project = path.join(root, 'ordinary-work'); await mkdir(project);
  await writeFile(path.join(project, 'index.html'), '<!doctype html><html><head><title>Fixture</title></head><body>Fixture</body></html>');
  const command = args => spawnSync(process.execPath, [cli, ...args], { cwd: project, env: { PATH: '/usr/bin:/bin' }, encoding: 'utf8', timeout: 10000 });
  const generated = command(['manifest', '--root', project, '--name', 'Fixture', '--no-folder', '--page', 'home=index.html']);
  assert.equal(generated.status, 0, generated.stderr);
  const manifest = JSON.parse(generated.stdout);
  assert.equal(manifest.pages.length, 1);
  const { recordPublication } = await import(pathToFileURL(path.join(source, 'cli/state.mjs')));
  const collectionId = '22222222-2222-4222-8222-222222222222';
  const reviewUrl = `https://review.example/collections/${collectionId}`;
  await recordPublication(path.join(project, '.brixon-feedback.json'), manifest, {
    projectId: '11111111-1111-4111-8111-111111111111', collectionId, revision: 1, reviewUrl,
    pages: manifest.pages.map(page => ({ ...page, versionId: '33333333-3333-4333-8333-333333333333', number: 1 })),
  }, project);
  const selected = command(['target', '--collection', reviewUrl]);
  assert.equal(selected.status, 0, selected.stderr);
  assert.equal(JSON.parse(selected.stdout).reviewUrl, reviewUrl);
});
