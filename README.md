# Brixon AI Clients

Plugin marketplace for clients of Brixon AI. It brings your brand from
[Brixon Brand Center](https://brand-center.brixongroup.com) into Claude Code.

## Plugin: Brixon AI Client Core

`brixon-ai-client-core` connects the Brand Center MCP and adds these skills:

| Skill | What it does |
|---|---|
| `brand-context` | Loads your brand (voice, facts, design tokens, assets, UI components) before brand-facing work |
| `fill-brand` | Fills or maintains your brand documents with you, section by section, as drafts in Brand Center |
| `off-brand-report` | Turns "that doesn't sound like us" into a change request that Brand Center tries to apply and publish automatically (licence-dependent) |
| `neutral-review` | Gets an independent second opinion on a text, design, document or code change |
| `github-workflow` | Handles Git and GitHub for you: branches, commits, pull requests, merges |

What the MCP offers depends on your Brand Center licence. Filling drafts needs a licence that
allows editing through your AI; publishing always happens in Brand Center.

## Install

In Claude Code:

```
/plugin marketplace add Brixon-Group/brixon-ai-clients
/plugin install brixon-ai-client-core@brixon-ai-clients
```

On first use of a Brand Center tool, your browser opens the Brand Center sign-in. Sign in with
the email address of your Brand Center licence. No API key is needed; nothing secret is stored in
this repository.

The MCP address is `https://brand-center.brixongroup.com/mcp` if you want to add it to another
AI tool by hand.

## Updates

```
/plugin marketplace update brixon-ai-clients
```

## Support

Questions about your licence or the plugin: hello@brixongroup.com
