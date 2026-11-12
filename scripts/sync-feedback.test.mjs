import { before, test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile, readdir, rm } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';
import { syncFeedback } from './sync-feedback.mjs';
import { clientArtifactProblems } from './check.mjs';

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
  // Modules the CLI shares with the service and the upload command are part of the record.
  assert.ok(upstream.sourceFiles['shared/frame-hosts.json']);
  assert.ok(upstream.sourceFiles['cli/put.mjs']);
  assert.ok(upstream.sourceFiles['cli/edition.mjs']);
  // The build of the client edition belongs to the source, so it is part of the record too.
  assert.ok(upstream.sourceFiles['scripts/cli-bundle.mjs']);
  assert.match(upstream.commit, /^[0-9a-f]{40}$/);
  assert.equal(upstream.edition, 'client');
});

test('the package states the Node.js requirement of the source CLI', enabled, async () => {
  const { nodeRequirement } = await import(pathToFileURL(path.join(source, 'cli/network.mjs')));
  const pkg = JSON.parse(await readFile(path.join(destination, 'feedback/package.json'), 'utf8'));
  assert.equal(pkg.engines.node, nodeRequirement);
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
  assert.doesNotMatch(help.stdout, /^skills /m);
  // The fresh build is the client edition, not only the one committed to this repository.
  assert.doesNotMatch(help.stdout, /--video|--timeline|--captions|--review-copy|ffmpeg|ffprobe/i);
  const { version } = JSON.parse(await readFile(path.join(destination, 'feedback/package.json'), 'utf8'));
  assert.equal(spawnSync(process.execPath, [cli, '--version'], { encoding: 'utf8' }).stdout.trim(), `Brixon CLI ${version}`);
  // What only the other edition uses is removed from the file, not only skipped, and no comment is left:
  // by this repository's rule and by the rule of the source.
  const text = await readFile(cli, 'utf8');
  assert.doesNotMatch(text, /workers\.dev/);
  assert.deepEqual(clientArtifactProblems(text), []);
  const { clientBundleProblems } = await import(pathToFileURL(path.join(source, 'scripts/cli-bundle.mjs')));
  assert.deepEqual(await clientBundleProblems(text), []);
  assert.match(help.stdout, /Details: docs\/setup\.md of the brixon-ai-client-core plugin\./);
  assert.match(help.stdout, /^put --file PATH/m);
  for (const action of ['install', 'check']) for (const scope of ['project', 'user']) {
    const result = spawnSync(process.execPath, [cli, 'skills', action, '--target', 'both', '--scope', scope, '--directory', project], {
      cwd: project, env: { PATH: '/usr/bin:/bin', HOME: home }, encoding: 'utf8', timeout: 10000,
    });
    assert.equal(result.status, 1, result.stderr);
    assert.match(result.stderr, /Skills come with the Brixon plugin/);
    assert.doesNotMatch(result.stderr, /ENOENT/);
    assert.deepEqual(await readdir(project), ['owner.txt']);
    assert.deepEqual(await readdir(home), []);
  }
});

// This repository finds comments without a parser. The source finds them with one; on the built file with a
// comment put in at many places, both must come to the same verdict.
test('the comment rule of this repository agrees with the parser of the source', enabled, async () => {
  const { clientBundleProblems } = await import(pathToFileURL(path.join(source, 'scripts/cli-bundle.mjs')));
  const text = await readFile(cli, 'utf8');
  let seed = 20261112;
  const random = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
  let inCode = 0, elsewhere = 0;
  for (let round = 0; round < 40; round++) {
    const at = Math.floor(random() * text.length);
    const changed = `${text.slice(0, at)}${round % 2 ? '/* note */' : '// note\n'}${text.slice(at)}`;
    const there = await clientBundleProblems(changed);
    // Text put into a pattern or a name can break the file; then there is no verdict of the parser to compare.
    if (there.some(problem => problem.includes('does not parse'))) continue;
    const here = clientArtifactProblems(changed).length > 0;
    assert.equal(here, there.length > 0, `a comment put in at offset ${at}`);
    if (here) inCode++; else elsewhere++;
  }
  // The places are spread over code and over strings: both verdicts occur.
  assert.ok(inCode > 0 && elsewhere > 0, `${inCode} in code, ${elsewhere} elsewhere`);
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

// Runs without a source checkout: the build committed to this repository starts and names its commands.
test('the committed CLI is the client edition and reports the version of its package', async () => {
  const plugin = fileURLToPath(new URL('../plugins/brixon-ai-client-core/', import.meta.url));
  const { version } = JSON.parse(await readFile(path.join(plugin, 'feedback/package.json'), 'utf8'));
  const run = args => spawnSync(process.execPath, [path.join(plugin, 'cli/index.mjs'), ...args], { encoding: 'utf8', timeout: 10000 });
  const reported = run(['--version']);
  assert.equal(reported.status, 0, reported.stderr);
  assert.equal(reported.stdout.trim(), `Brixon CLI ${version}`);
  const help = run(['--help']);
  assert.equal(help.status, 0, help.stderr);
  for (const command of ['upload --manifest', 'doctor', 'put --file PATH']) assert.ok(help.stdout.includes(`\n${command}`), command);
  assert.doesNotMatch(help.stdout, /--video|--timeline|--captions|--review-copy|ffmpeg|ffprobe/i);
  // A configuration error ends doctor before it uses the network; the report still names the build.
  const doctor = spawnSync(process.execPath, [path.join(plugin, 'cli/index.mjs'), 'doctor'], { encoding: 'utf8', timeout: 10000, env: { ...process.env, BRIXON_FEEDBACK_ALLOWED_ORIGINS: 'not-an-origin' } });
  const report = JSON.parse(doctor.stdout);
  assert.equal(doctor.status, 2, doctor.stderr);
  assert.ok(report.config.error);
  assert.equal(report.cli, `Brixon CLI ${version}`);
  assert.equal(report.edition, 'client');
  // The file goes to customers as it is: nothing of Brixon's own setup or of the other edition, and no comment.
  assert.deepEqual(clientArtifactProblems(await readFile(path.join(plugin, 'cli/index.mjs'), 'utf8')), []);
});

// --version and --help return before the Node.js check; this runs a real command of the committed build.
test('the committed CLI runs a local command in an empty folder', async () => {
  const plugin = fileURLToPath(new URL('../plugins/brixon-ai-client-core/', import.meta.url));
  const folder = await mkdtemp(path.join(os.tmpdir(), 'feedback-cli-smoke-'));
  const result = spawnSync(process.execPath, [path.join(plugin, 'cli/index.mjs'), 'state'], { cwd: folder, encoding: 'utf8', timeout: 10000 });
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(JSON.parse(result.stdout).collections, []);
  assert.deepEqual(await readdir(folder), []);
  await rm(folder, { recursive: true });
});
