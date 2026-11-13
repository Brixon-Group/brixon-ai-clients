# Brixon AI Clients

Plugin marketplace for clients of Brixon AI. It brings your brand from
[Brixon Brand Center](https://brands.brixon.ai) into Claude Code.

## Plugin: Brixon AI Client Core

`brixon-ai-client-core` connects the Brand Center MCP and adds these skills:

| Skill | What it does |
|---|---|
| `brand-context` | Loads your brand (voice, facts, design tokens, assets, UI components) before brand-facing work |
| `fill-brand` | Fills or maintains your brand documents with you, section by section, as drafts in Brand Center |
| `build-brandos` | Builds a complete BrandOS from your material: all documents of the Brand Center standard, gaps marked, an evidence list and targeted questions. With the MCP it saves drafts; without it, or when saving fails, it writes the files locally in Brand Center's own layout and later transfers them without overwriting changes made in Brand Center. Several colleagues can build in parallel in one shared folder: each takes one part (for example voice, audiences or offers), and a part someone is working on stays blocked for the others until it is done |
| `off-brand-report` | Turns "that doesn't sound like us" into a change request that Brand Center tries to apply and publish automatically (licence-dependent) |
| `brixon-feedback` | Publishes finished pages and social-post batches as one review in Brixon Feedback, returns the review link, reads the comments and applies one round of feedback. Needs the Brixon Feedback connection (see below) |
| `brixon-upload` | Sends a local file to a Brixon tool that prepared an upload address for it, such as Brand Center, Meta Creative, LinkedIn Ads or Image Generation: with the Brixon CLI, or with curl where Node.js is not available (curl only for Brixon's default storage host). Needs the connection to that tool (see below) |
| `neutral-review` | Gets an independent second opinion on a text, design, document or code change |
| `github-workflow` | Handles Git and GitHub for you: branches, commits, pull requests, merges |
| `setup-rules` | Codex only: writes the working rules into your global Codex instructions |

It also brings working rules for your AI: invent nothing, load your brand before brand-facing
work, ask before deleting or sending, keep secrets out of files. Claude Code loads them at every
session start. In Codex, ask once for the `setup-rules` skill ("set up the Brixon rules"); it adds
them as a marked block to your global `AGENTS.md` and leaves the rest of the file alone. Your own
instructions win where they conflict.

What the MCP offers depends on your Brand Center licence. Filling drafts needs a licence that
allows editing through your AI; publishing always happens in Brand Center.

## Brixon CLI for reviews and uploads

The plugin carries the Brixon CLI as one file (`cli/index.mjs`). Your AI uses it to transfer
review files to Brixon Feedback and to send a local file to an upload address that a Brixon tool
prepared. It holds no key: every transfer uses a short-lived ticket from the tool. It reports
itself as `Brixon CLI` with its own version number, which is independent of the plugin's version.

- It needs Node.js 24 LTS, version 24.14 or newer, on your computer. Nothing else is installed.
- In a company network, your IT can set proxy and certificates once in a `config.json` and check
  the result with the `doctor` command. Paths, keys and the hosts a firewall must allow are in
  the [setup notes](plugins/brixon-ai-client-core/docs/setup.md).
- By default the CLI sends only to `feedback.brixon.ai` and to Brixon's file storage. The upload
  host of Image Generation, `image-mcp.brixon.ai`, is added in the `config.json` when Brixon
  activates Image Generation for you.
- The connections to Brixon Feedback and to the upload tools are not part of this plugin yet.
  They are available on activation by Brixon. Until then the two skills say that the connection
  is missing instead of publishing anything.
- After an update of a Brixon server, a running AI session may still hold the earlier tool
  description. Reconnecting the tool refreshes it; if that does not help, start a new session.

## Install

In Claude Code:

```
/plugin marketplace add Brixon-Group/brixon-ai-clients
/plugin install brixon-ai-client-core@brixon-ai-clients
```

In Codex:

```
codex plugin marketplace add https://github.com/Brixon-Group/brixon-ai-clients.git
codex plugin add brixon-ai-client-core@brixon-ai-clients
```

On first use of a Brand Center tool, your browser opens the Brixon sign-in. Sign in with your
personal Brixon login, the account your organisation's team in the AI Portal belongs to. No API key is needed; nothing secret is stored in
this repository.

The MCP address is `https://brands.brixon.ai/mcp` if you want to add it to another
AI tool by hand.

## Updates

```
/plugin marketplace update brixon-ai-clients
```

In Codex: `codex plugin marketplace upgrade brixon-ai-clients`, then ask for the `setup-rules`
skill again so the rules block is current.

## Licence of this repository

The files in this repository are under the MIT License, see [LICENSE](LICENSE). The bundled CLI
includes third-party packages under their own licences, listed in
[THIRD-PARTY-NOTICES.md](plugins/brixon-ai-client-core/feedback/THIRD-PARTY-NOTICES.md). This is
separate from your Brand Center licence: the Brixon services the plugin connects to are not part
of this repository.

## Support

Questions about your licence or the plugin: hello@brixongroup.com
