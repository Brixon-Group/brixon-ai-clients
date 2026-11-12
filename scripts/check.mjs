#!/usr/bin/env node
// Checks that the marketplace is consistent and safe to publish: this repository is public.
import { readFile, readdir, stat } from 'node:fs/promises';
import { execFileSync, spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Text that must never reach customers: internal locations, internal services and secrets.
const forbidden = [
  [/\/Users\/|\/home\/[^/\s]+\/|[a-z]:\\users\\/i, 'local user path'],
  [/Brixon-Git-Folder/, 'internal folder name'],
  [/internal-mcp\.brixon\.ai|brixon-internal-mcp/, 'internal MCP portal'],
  [/brixon-marketplace/, 'internal marketplace'],
  [/\b[\w-]+\.workers\.dev\b/, 'provisional host name'],
  [/\b(SYSTEM|MANAGEMENT)-(\*|[A-Z][\w-]+)/, 'internal repository'],
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----/, 'private key'],
  [/\b(ghp|gho|ghs|github_pat)_[A-Za-z0-9_]{20,}/, 'GitHub token'],
  [/\bsk-(ant-)?[A-Za-z0-9_-]{20,}/, 'API key'],
  [/\bbfk_[A-Za-z0-9]{8,}_[A-Za-z0-9]{8,}/, 'Feedback agent key'],
  [/\bAKIA[0-9A-Z]{16}\b/, 'AWS key'],
];

// What the bundled CLI must not contain: names of Brixon's own setup, the other edition by name, and comments,
// which carry notes of the source. A term may be wrapped across a line or written as a pattern with a backslash.
// The last four are one phrase of each part that only the other edition has.
const artifactTerms = [
  /brixontesting/i, /workers\\?\.dev/i, /internal\\?-mcp/i, /MCP[\s-]+portal/i, /image\\?-mcp/i, /team\s+edition/i, /(["'`])team\1/i,
  /ffprobe/i, /skills\s+install/i, /brixon-feedback\s+doctor/i, /--video\s+KEY=PATH/i,
];
// The bundler writes this marker itself wherever it prints code with line breaks; it carries nothing of the source.
const pureMarker = '/* @__PURE__ */';
const hashbang = '#!/usr/bin/env node';
// A keyword stands alone: it is not the end of a longer name and not a property.
const alone = String.raw`(?<![\w$.#\u0080-\uffff])`;
// A slash after one of these starts a pattern, not a division.
const beforePattern = new RegExp(String.raw`(?:^|[(,=:[!&|?{};+\-*%<>~^/]|\.\.\.|${alone}(?:return|typeof|case|in|delete|void|throw|new|else|do|instanceof|yield|await))$`);
const beforeCondition = new RegExp(`${alone}(?:if|while|for|with)$`), loopOf = new RegExp(`${alone}of$`);

// The comments of a script as [start, end] pairs, or null where the text cannot be followed. It reads strings,
// templates and patterns only as far as needed to tell a comment from "//" inside them.
function commentsIn(text) {
  // `parens` holds, for each open parenthesis, the keyword it follows (if, while, for, with) or ''.
  const found = [], templates = [], parens = [];
  // `code` is the end of the code read so far, with one space for any run of white space; `condition` says
  // whether the parenthesis closed last belonged to such a keyword, after which a statement begins.
  let depth = 0, code = '', condition = false, at = text.startsWith(`${hashbang}\n`) ? hashbang.length : 0;
  // After x++ a slash divides. Otherwise it starts a pattern where a value is expected.
  const startsPattern = () => {
    const before = code.trimEnd();
    if (/(?:\+\+|--)$/.test(before)) return false;
    return beforePattern.test(before) || condition && before.endsWith(')') || parens.at(-1) === 'for' && loopOf.test(before);
  };
  // The end of a quoted run that starts at `from`; -1 where it does not end.
  const quoted = (from, quote) => {
    for (let index = from; index < text.length; index++) {
      if (text[index] === '\\') index++;
      else if (text[index] === quote) return index + 1;
      else if (text[index] === '\n' && quote !== '`') return -1;
      else if (quote === '`' && text[index] === '$' && text[index + 1] === '{') return index + 2;
    }
    return -1;
  };
  // Reads on inside a template; false where it does not end.
  const template = from => {
    const end = quoted(from, '`');
    if (end < 0) return false;
    if (text[end - 1] === '{') { templates.push(depth); depth++; code = '{'; } else code = 'x';
    at = end;
    return true;
  };
  while (at < text.length) {
    const char = text[at], next = text[at + 1];
    if (/\s/.test(char)) {
      if (!code.endsWith(' ')) code += ' ';
      at++;
    } else if (char === '/' && next === '/') {
      const end = text.indexOf('\n', at);
      found.push([at, end < 0 ? text.length : end]);
      at = end < 0 ? text.length : end;
    } else if (char === '/' && next === '*') {
      const end = text.indexOf('*/', at + 2);
      if (end < 0) return null;
      found.push([at, end + 2]);
      at = end + 2;
    } else if (char === '"' || char === "'") {
      at = quoted(at + 1, char);
      if (at < 0) return null;
      code = 'x';
    } else if (char === '`') {
      if (!template(at + 1)) return null;
    } else if (char === '/' && startsPattern()) {
      let inClass = false, index = at + 1;
      for (; index < text.length && (inClass || text[index] !== '/'); index++) {
        if (text[index] === '\n') return null;
        if (text[index] === '\\') index++;
        else if (text[index] === '[') inClass = true;
        else if (text[index] === ']') inClass = false;
      }
      if (index >= text.length) return null;
      at = index + 1;
      code = 'x';
    } else {
      if (char === '(') parens.push(beforeCondition.exec(code.trimEnd())?.[0] ?? '');
      if (char === ')') condition = Boolean(parens.pop());
      if (char === '{') depth++;
      if (char === '}') {
        depth--;
        // The closing brace of ${…} leads back into its template.
        if (templates.at(-1) === depth) {
          templates.pop();
          if (!template(at + 1)) return null;
          continue;
        }
      }
      code = (code + char).slice(-12);
      at++;
    }
  }
  return templates.length ? null : found;
}

/** What the client edition of the bundled CLI must not contain: one entry per finding, with its line. */
export function clientArtifactProblems(text) {
  const line = index => text.slice(0, index).split('\n').length;
  const problems = [];
  for (const pattern of artifactTerms) {
    const match = pattern.exec(text);
    if (match) problems.push(`${pattern} in line ${line(match.index)}`);
  }
  const unread = 'it cannot be read far enough to find its comments';
  const comments = commentsIn(text);
  if (!comments) return [...problems, unread];
  const own = comments.filter(([start, end]) => text.slice(start, end) !== pureMarker);
  for (const [start] of own.slice(0, 10)) problems.push(`a comment in line ${line(start)}`);
  // Every marker in the text must have been met as a comment; otherwise the reading above lost its place.
  if (comments.length - own.length !== text.split(pureMarker).length - 1) problems.push(unread);
  return problems;
}

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
      const record = await json(upstream);
      const artifacts = Object.entries(record?.artifacts ?? {});
      if (!artifacts.length) errors.push(`${where}: feedback/upstream.json lists no artifacts`);
      // The commit is what makes a published build traceable to its source.
      if (record?.artifacts?.['cli/index.mjs'] && !/^[0-9a-f]{40}$/.test(record.commit ?? '')) errors.push(`${where}: feedback/upstream.json needs the full source commit; run scripts/sync-feedback.mjs`);
      for (const [relative, hash] of artifacts) {
        const content = await readFile(file(path.join(source, relative))).catch(() => null);
        if (!content || createHash('sha256').update(content).digest('hex') !== hash) {
          errors.push(`${where}: ${relative} does not match feedback/upstream.json; run scripts/sync-feedback.mjs`);
        }
      }
      // Clients get the client edition. The record alone could be wrong, so the build itself is asked.
      const cli = file(path.join(source, 'cli/index.mjs'));
      const ask = argument => {
        const result = spawnSync(process.execPath, [cli, argument], { encoding: 'utf8', timeout: 10000, killSignal: 'SIGKILL' });
        if (result.status === 0 && result.stdout) return result.stdout;
        const reason = result.error?.code ?? result.signal ?? `exit ${result.status}`;
        // Node prints the source line first and its own version last; the line with the error says why.
        const lines = (result.stderr ?? '').trim().split('\n');
        errors.push(`${where}: cli/index.mjs did not run with ${argument} on Node.js ${process.versions.node} (${reason}): ${(lines.find(line => /Error/.test(line)) ?? lines[0]).trim().slice(0, 200)}`);
        return null;
      };
      const reported = ask('--version'), help = ask('--help');
      const wrong = [];
      if (record?.edition !== 'client') wrong.push(`feedback/upstream.json records edition ${JSON.stringify(record?.edition)}`);
      if (reported !== null && reported.trim() !== `Brixon CLI ${record?.version}`) wrong.push(`--version printed ${JSON.stringify(reported.trim().slice(0, 60))}, expected "Brixon CLI ${record?.version}"`);
      const video = help?.match(/--video|--timeline|--captions|--review-copy|ffmpeg|ffprobe/i)?.[0];
      if (video) wrong.push(`its help mentions ${video}`);
      if (wrong.length) errors.push(`${where}: cli/index.mjs is not the client edition of the CLI (${wrong.join('; ')}); build it with scripts/sync-feedback.mjs`);
      // The file itself goes to customers: nothing of Brixon's own setup, nothing of the other edition, no comment.
      const text = await readFile(cli, 'utf8').catch(() => null);
      const problems = text === null ? [] : clientArtifactProblems(text);
      if (problems.length) errors.push(`${where}: cli/index.mjs contains what the client edition must not (${problems.join('; ')}); build it with scripts/sync-feedback.mjs`);
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
