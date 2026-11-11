# Maintaining this marketplace

This repository is public and installed by Brixon AI clients in Claude Code and Codex.

## Layout

| Path | Purpose |
|---|---|
| `.claude-plugin/marketplace.json` | Claude Code catalog |
| `.agents/plugins/marketplace.json` | Codex catalog, same plugins |
| `plugins/<name>/.claude-plugin/plugin.json` | Claude Code manifest; its `version` is authoritative |
| `plugins/<name>/.codex-plugin/plugin.json` | Codex manifest: same name, version and `mcpServers`, plus `skills` and `interface` |
| `plugins/<name>/skills/` | Skills, one folder each, `name` in the frontmatter equal to the folder |
| `plugins/brixon-ai-client-core/rules/CLIENT.md` | Working rules for clients' AI; the only copy of the rules text |
| `plugins/brixon-ai-client-core/hooks/hooks.json` | Claude Code: prints `rules/CLIENT.md` into context at every session start |
| `plugins/brixon-ai-client-core/skills/setup-rules/` | Codex (no plugin hooks): writes the rules as a marked block into the client's global `AGENTS.md` |
| `scripts/check.mjs` | Consistency and public-content check, run by CI on every pull request |
| `scripts/sync-feedback.mjs` | Builds the Brixon Feedback CLI into a plugin as one file with a provenance record |

## Rules

- Nothing internal: no local paths, internal repository or service names, customer data, keys or tokens. `scripts/check.mjs` catches the common cases; it is not a full review.
- MCP servers are plain `https` entries. Customers sign in through the browser (OAuth); never add headers, env values or keys.
- Add only MCP servers and CLIs that clients can sign in to themselves.
- Rules in `rules/CLIENT.md` are generic: nothing about Brixon's own repositories, tools or team habits. Every session pays for them, so keep them short; Claude Code cuts hook output above 10,000 characters.
- Bump the version in the marketplace entry and both manifests together: major for removed features, minor for new ones, patch for fixes.
- Before a pull request: `node scripts/check.mjs` and `node --test 'scripts/*.test.mjs'`.

## Feedback CLI

Not shipped yet: Brixon Feedback is not available to client accounts yet. Once it is, run from a clean, `npm ci`-installed checkout of the Feedback tool:

```
node scripts/sync-feedback.mjs /path/to/feedback-tool-checkout
```

This writes `cli/index.mjs` and `feedback/` (package.json, licence notices, `upstream.json` with commit and hashes) into `plugins/brixon-ai-client-core/`. Skills call the CLI by its path relative to the plugin (`node <plugin>/cli/index.mjs`, Node 22 or newer). The CLI holds no credentials; uploads use a short-lived ticket from the Feedback MCP. `--check` verifies an existing build, and `FEEDBACK_TEST_SOURCE=<checkout> node --test scripts/sync-feedback.test.mjs` tests the build.
