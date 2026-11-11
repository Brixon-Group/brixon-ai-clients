#!/usr/bin/env node
// Checks that the marketplace is consistent and safe to publish: this repository is public.
import { readFile, readdir, stat } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Text that must never reach customers: internal locations, internal services and secrets.
const forbidden = [
  [/\/Users\/|\/home\/[^/\s]+\/|[a-z]:\\users\\/i, 'local user path'],
  [/Brixon-Git-Folder/, 'internal folder name'],
  [/internal-mcp\.brixon\.ai|brixon-internal-mcp/, 'internal MCP portal'],
  [/brixon-marketplace/, 'internal marketplace'],
  [/\b(SYSTEM|MANAGEMENT)-[A-Z][\w-]+/, 'internal repository'],
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----/, 'private key'],
  [/\b(ghp|gho|ghs|github_pat)_[A-Za-z0-9_]{20,}/, 'GitHub token'],
  [/\bsk-(ant-)?[A-Za-z0-9_-]{20,}/, 'API key'],
  [/\bbfk_[A-Za-z0-9]{8,}_[A-Za-z0-9]{8,}/, 'Feedback agent key'],
  [/\bAKIA[0-9A-Z]{16}\b/, 'AWS key'],
];

export async function check(root) {
  const errors = [];
  const file = relative => path.join(root, relative);
  const json = async relative => {
    try { return JSON.parse(await readFile(file(relative), 'utf8')); }
    catch (error) { errors.push(`${relative}: ${error.message}`); return null; }
  };
  const exists = async relative => stat(file(relative)).then(() => true, () => false);

  const claude = await json('.claude-plugin/marketplace.json');
  const codex = await json('.agents/plugins/marketplace.json');
  if (!claude || !codex) return errors;
  if (claude.name !== codex.name) errors.push(`Marketplace names differ: ${claude.name} / ${codex.name}`);
  if (!Array.isArray(claude.plugins) || !Array.isArray(codex.plugins)) return [...errors, 'Both catalogs need a plugins list'];
  const names = list => JSON.stringify(list.map(entry => entry.name).sort());
  if (names(claude.plugins) !== names(codex.plugins)) errors.push('Claude and Codex catalogs list different plugins');
  const codexEntries = new Map(codex.plugins.map(entry => [entry.name, entry]));

  for (const entry of claude.plugins) {
    const where = `plugin ${entry.name}`;
    if (typeof entry.source !== 'string') { errors.push(`${where}: source must be a path inside this repository`); continue; }
    const source = path.normalize(entry.source);
    if (source.startsWith('..') || path.isAbsolute(source)) { errors.push(`${where}: source must be a path inside this repository`); continue; }
    const codexEntry = codexEntries.get(entry.name);
    if (!codexEntry) { errors.push(`${where}: missing from .agents/plugins/marketplace.json`); continue; }
    if (path.normalize(codexEntry.source?.path ?? '') !== source) errors.push(`${where}: Claude and Codex sources differ`);
    const manifest = await json(path.join(source, '.claude-plugin/plugin.json'));
    const codexManifest = await json(path.join(source, '.codex-plugin/plugin.json'));
    if (!manifest || !codexManifest) continue;
    for (const [label, value] of [['plugin.json name', manifest.name], ['Codex plugin.json name', codexManifest.name]]) {
      if (value !== entry.name) errors.push(`${where}: ${label} is ${value}`);
    }
    const versions = new Set([entry.version, manifest.version, codexManifest.version]);
    if (versions.size !== 1 || !/^\d+\.\d+\.\d+$/.test(entry.version)) {
      errors.push(`${where}: versions must be equal semver (marketplace ${entry.version}, plugin.json ${manifest.version}, Codex ${codexManifest.version})`);
    }
    if (JSON.stringify(manifest.mcpServers ?? {}) !== JSON.stringify(codexManifest.mcpServers ?? {})) {
      errors.push(`${where}: Claude and Codex MCP servers differ`);
    }
    for (const [name, server] of Object.entries(manifest.mcpServers ?? {})) {
      if (server.type !== 'http' || !/^https:\/\//.test(server.url ?? '')) errors.push(`${where}: MCP ${name} must be an https http server`);
      if (server.headers || server.env) errors.push(`${where}: MCP ${name} must not carry headers or env; customers sign in with OAuth`);
    }
    const skills = path.join(source, 'skills');
    for (const name of await readdir(file(skills)).catch(() => [])) {
      if (!(await stat(file(path.join(skills, name)))).isDirectory()) continue;
      const text = await readFile(file(path.join(skills, name, 'SKILL.md')), 'utf8').catch(() => '');
      const front = text.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
      if (!new RegExp(`^name: ${name}$`, 'm').test(front)) errors.push(`${where}: skills/${name}/SKILL.md needs name: ${name}`);
      if (!/^description: \S/m.test(front)) errors.push(`${where}: skills/${name}/SKILL.md needs a description`);
    }
    const upstream = path.join(source, 'feedback/upstream.json');
    if (await exists(path.join(source, 'cli/index.mjs')) && !(await exists(upstream))) {
      errors.push(`${where}: cli/index.mjs has no feedback/upstream.json; build it with scripts/sync-feedback.mjs`);
    }
    if (await exists(upstream)) {
      const artifacts = Object.entries((await json(upstream))?.artifacts ?? {});
      if (!artifacts.length) errors.push(`${where}: feedback/upstream.json lists no artifacts`);
      for (const [relative, hash] of artifacts) {
        const content = await readFile(file(path.join(source, relative))).catch(() => null);
        if (!content || createHash('sha256').update(content).digest('hex') !== hash) {
          errors.push(`${where}: ${relative} does not match feedback/upstream.json; run scripts/sync-feedback.mjs`);
        }
      }
    }
  }

  const tracked = execFileSync('git', ['-C', root, 'ls-files', '-z', '--cached', '--others', '--exclude-standard'], { encoding: 'utf8' })
    .split('\0').filter(Boolean);
  for (const relative of tracked) {
    if (/(^|\/)\.env($|\.)/.test(relative) && !/\.(example|sample)$/.test(relative)) errors.push(`${relative}: environment file`);
    // This file holds the patterns themselves, so it is not scanned; review changes to it by hand.
    if (relative === 'scripts/check.mjs') continue;
    const content = await readFile(file(relative)).catch(() => null);
    if (!content || content.includes(0)) continue;
    const text = content.toString('utf8');
    for (const [pattern, label] of forbidden) {
      const match = text.match(pattern);
      if (match) errors.push(`${relative}: ${label} (${match[0].slice(0, 40)})`);
    }
  }
  return errors;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const errors = await check(fileURLToPath(new URL('..', import.meta.url)));
  for (const error of errors) console.error(`✖ ${error}`);
  if (errors.length) process.exit(1);
  console.log('Marketplace check passed');
}
