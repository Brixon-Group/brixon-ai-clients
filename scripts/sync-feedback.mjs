#!/usr/bin/env node
import { readFile, writeFile, mkdir, realpath } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

// Only runtime artifacts are generated. Skills and references belong to this marketplace.
// The CLI holds no credentials: uploads use a short-lived ticket from the MCP server that prepared them.
export async function syncFeedback(sourceArg, { destination = fileURLToPath(new URL('../plugins/brixon-ai-client-core/', import.meta.url)), check = false } = {}) {
  const source = await realpath(sourceArg);
  const read = relative => readFile(path.join(source, relative), 'utf8');
  const sha256 = value => createHash('sha256').update(value).digest('hex');
  const git = (...args) => execFileSync('git', ['-C', source, ...args], { encoding: 'utf8' }).trim();
  const pkg = JSON.parse(await read('package.json'));
  if (pkg.name !== '@brixon/feedback') throw new Error('Source must be the feedback-tool repository');
  if (git('status', '--porcelain', '--', 'cli', 'shared', 'package.json', 'package-lock.json')) {
    throw new Error('Commit the source CLI and dependency lock before packaging');
  }
  const lock = JSON.parse(await read('package-lock.json'));
  for (const name of ['esbuild', 'parse5', 'entities', `@esbuild/${process.platform}-${process.arch}`]) {
    const installed = JSON.parse(await read(`node_modules/${name}/package.json`));
    if (installed.version !== lock.packages[`node_modules/${name}`]?.version) {
      throw new Error(`Installed ${name} differs from the source lockfile; run npm ci in the source checkout`);
    }
  }
  const { build, version: esbuildVersion } = await import(pathToFileURL(path.join(source, 'node_modules/esbuild/lib/main.js')));
  // The CLI states the Node.js versions it runs on; the package and the build target follow it.
  const { nodeRequirement } = await import(pathToFileURL(path.join(source, 'cli/network.mjs')));
  const nodeMajor = /^>=(\d+)\.\d+$/.exec(nodeRequirement)?.[1];
  if (!nodeMajor) throw new Error(`Review the Node.js requirement of the source CLI: ${nodeRequirement}`);
  // Clients get the client edition of the CLI: the source decides what that leaves out.
  const edition = 'client';
  // What differs in this distribution: where the package record lives, where the setup notes are, and the
  // edition as a fixed value, so that the bundler can leave out what only the other edition uses.
  const adapters = {
    'index.mjs': [["new URL('../package.json', import.meta.url)", "new URL('../feedback/package.json', import.meta.url)"]],
    'edition.mjs': [
      ['Details are in the administration guide for the Node operating mode.', 'Details: docs/setup.md of the brixon-ai-client-core plugin.'],
      // Declared first and as a plain value: only then does the bundler carry it into the other modules.
      ["export const client = edition === 'client';", ''],
      ['/* global __BRIXON_CLI_EDITION__ */', `export const client = ${edition === 'client'};`],
    ],
  };
  const adapted = [];
  const bundled = await build({
    absWorkingDir: source, entryPoints: ['cli/index.mjs'], outfile: 'cli/index.mjs',
    bundle: true, platform: 'node', format: 'esm', target: `node${nodeMajor}`,
    define: { __BRIXON_CLI_EDITION__: JSON.stringify(edition) }, minifySyntax: true,
    write: false, charset: 'utf8', legalComments: 'inline', metafile: true,
    plugins: [{ name: 'core-package-location', setup(builder) {
      builder.onLoad({ filter: /cli[\\/](index|edition|skills)\.mjs$/ }, async ({ path: filename }) => {
        let contents = await readFile(filename, 'utf8');
        const name = path.basename(filename);
        adapted.push(name);
        // Skills come with the plugin; the installer of the source is left out.
        if (name === 'skills.mjs') {
          if (!contents.includes('export async function manageSkills(')) throw new Error(`Review marketplace skill adapter: ${filename}`);
          return { contents: `export async function manageSkills() {
            throw new Error('Skills come with the brixon-ai-client-core plugin; update the plugin through Claude Code or Codex.');
          }`, loader: 'js' };
        }
        for (const [before, after] of adapters[name]) {
          if (contents.split(before).length !== 2) throw new Error(`Review client-core distribution adapter: ${filename} must contain exactly once: ${before}`);
          contents = contents.replace(before, after);
        }
        return { contents, loader: 'js' };
      });
    } }],
  });
  // A source without editions has no cli/edition.mjs and stops here.
  if (adapted.sort().join(',') !== 'edition.mjs,index.mjs,skills.mjs') {
    throw new Error(`Expected one index, one edition and one skills distribution adapter; got ${JSON.stringify(adapted)}. The source CLI must read __BRIXON_CLI_EDITION__ in cli/edition.mjs`);
  }
  const bundledPackages = new Set();
  const cliInputs = [];
  const unexpectedLocalInputs = [];
  for (const input of Object.keys(bundled.metafile.inputs)) {
    const normalized = input.split(path.sep).join('/');
    const marker = '/node_modules/';
    const normalizedWithRoot = `/${normalized}`;
    const start = normalizedWithRoot.lastIndexOf(marker);
    const packageRelative = start >= 0 ? normalizedWithRoot.slice(start + marker.length) : null;
    if (packageRelative) {
      const packagePath = packageRelative.split('/');
      bundledPackages.add(packagePath[0].startsWith('@') ? packagePath.slice(0, 2).join('/') : packagePath[0]);
    } else if (normalized.startsWith('cli/') || normalized.startsWith('shared/')) {
      cliInputs.push(normalized);
    } else {
      unexpectedLocalInputs.push(input);
    }
  }
  const expectedBundledPackages = ['entities', 'parse5'];
  if (unexpectedLocalInputs.length || [...bundledPackages].sort().join(',') !== expectedBundledPackages.join(',')) {
    throw new Error(`Review bundled inputs and license notices: local=${JSON.stringify(unexpectedLocalInputs)}, packages=${JSON.stringify([...bundledPackages].sort())}`);
  }
  const output = new Map();
  output.set('cli/index.mjs', bundled.outputFiles[0].text);
  output.set('feedback/package.json', JSON.stringify({
    name: '@brixon/feedback', version: pkg.version, private: true, type: 'module',
    engines: { node: nodeRequirement }, bin: { 'brixon-feedback': '../cli/index.mjs' },
  }, null, 2) + '\n');

  let notices = '# Third-party licenses\n\nThe bundled CLI includes the following packages.\n';
  for (const name of ['parse5', 'entities']) {
    const dependency = JSON.parse(await read(`node_modules/${name}/package.json`));
    notices += `\n## ${name} ${dependency.version}\n\n${await read(`node_modules/${name}/LICENSE`)}\n`;
  }
  output.set('feedback/THIRD-PARTY-NOTICES.md', notices.trimEnd() + '\n');
  output.set('feedback/upstream.json', JSON.stringify({
    source: 'Brixon Feedback CLI',
    commit: git('rev-parse', 'HEAD'), version: pkg.version, edition,
    lockfileSha256: sha256(await read('package-lock.json')), esbuildVersion,
    ownership: { runtime: 'generated-from-upstream', skills: 'marketplace-owned; excluded from sync' },
    adapters: ['core-package-location', 'disable-marketplace-standalone-skill-installer', 'plugin-setup-notes-location', 'fixed-edition'],
    sourceFiles: Object.fromEntries(await Promise.all(cliInputs.sort()
      .map(async name => [name, sha256(await read(name))]))),
    artifacts: Object.fromEntries([...output].map(([name, content]) => [name, sha256(content)])),
  }, null, 2) + '\n');
  for (const [relative, content] of output) {
    const filename = path.join(destination, relative);
    if (check) {
      if (await readFile(filename, 'utf8') !== content) throw new Error(`Distribution differs: ${relative}`);
    } else {
      await mkdir(path.dirname(filename), { recursive: true });
      await writeFile(filename, content);
    }
  }
  return { files: [...output.keys()], commit: git('rev-parse', 'HEAD'), version: pkg.version };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [sourceArg, mode] = process.argv.slice(2);
  if (!sourceArg || (mode && mode !== '--check') || process.argv.length > 4) {
    throw new Error('Usage: node scripts/sync-feedback.mjs /path/to/feedback-tool-checkout [--check]');
  }
  const result = await syncFeedback(sourceArg, { check: mode === '--check' });
  console.log(`${mode === '--check' ? 'Verified' : 'Generated'} ${result.files.length} feedback runtime files from ${result.commit.slice(0, 7)}`);
}
