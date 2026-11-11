# Working mode without MCP (modes B and C)

Use this when there is no `save_brand_draft`. The output is a set of files in exactly the Brand Standard 2 layout, so the same text can later go into Brand Center unchanged. Every handover says so in plain words, for example: **"Das ist ein lokaler Entwurf. Er ist noch nicht im Brand Center gespeichert oder veröffentlicht."** Do not mention MCP or modes to the person unless they use the terms themselves.

## Folder layout

```text
<brand-slug>/
  brand/                                  ← importable: exactly these paths, nothing else
    BRAND.md
    guidelines/
      strategy.md
      audiences.md
      offers.md
      voice.md
      claims.md
      rules.md
      design.md
      channels/<channel>.md               ← at least one, e.g. linkedin.md (profile: social)
      personas/<id>.md                    ← optional
      senders/<person>.md                 ← optional
      examples/<name>.md                  ← optional
    resources/
      documents/
        image-prompts.md
        design-examples/<name>.md
  evidence/                               ← never imported
    quellenliste-<brand-slug>.md          ← source list and open questions
  handover.md                             ← never imported, read by the person: assets to upload, design evidence for Brixon, open decisions, in plain words
```

Rules for `brand/`:

- Only Markdown at the writable paths (`BRAND.md`, `guidelines/**.md`, `resources/documents/**.md`). No `AGENTS.md`, `CLAUDE.md`, `README.md`, `PROGRESS.md` or notes there.
- No `resources/design/`, no logos, fonts or images: tokens are a Brixon step, binaries go through the upload (see [design-and-assets.md](design-and-assets.md)).
- File names: lowercase, digits, hyphens, `.md`.
- Every file complete: frontmatter where required, H1 title, all catalog headings of that document in the brand language, each section with content or a GAP line.

If you have no file system (a chat client), output each file as its own Markdown block with the path on the line directly above it, and only the files changed in this chapter. Then output the complete source list as one block the person saves and uploads again in the next chat.

## Skeleton

Create the skeleton once at the start so headings are right from the beginning. Example for a German brand (`language: de`); for English use the English headings from [brand-standard.md](brand-standard.md).

`guidelines/strategy.md`:

```markdown
# Strategie

## Kategorie und Kunde

GAP: [G02] In welcher Kategorie die Marke antritt und für wen. Klärt Geschäftsführung.

## Positionierung

GAP: [G03] Wodurch sich die Marke von Alternativen unterscheidet. Klärt Geschäftsführung.

## Botschaftssäulen

GAP: [G04] Drei bis fünf tragende Botschaften. Klärt Marketing.

## Alternativen

GAP: [G05] Drei Wettbewerber oder Alternativen, mit denen Kunden vergleichen. Klärt Vertrieb.
```

Fill GAP lines as evidence arrives; replace a GAP line once its content is supported. Do not change frontmatter or headings afterwards.

## Checking locally

Run the completeness checklist in [brand-standard.md](brand-standard.md#completeness-check) yourself over `brand/`. There is no tool for checking a loose folder; the real check runs only inside Brand Center. Say that the check was done by you, not by Brand Center.

## Getting the files into Brand Center

| Route | Status | How |
|---|---|---|
| Editor paste | works today | A person with an editor seat opens "Marke bearbeiten" in Brand Center and pastes each document's text into the document at the same path. The editor saves into the draft with version and base checks and shows per document "missing / required part missing / changed / gap". Publishing: button in the editor; blocking parts prevent it. One document at a time; long, but nothing needs converting. |
| `save_brand_draft` | needs a licence that allows editing through the AI and a client that signed in | Pass `documents` as a map of path → complete text, taken unchanged from `brand/`, plus `expected_version` and `base_revision` from `get_brand_draft`. One call per chapter. Saving never publishes. |
| Package import (whole folder at once) | planned, not built | Do not tell anyone it exists. |

The source list, open questions and `handover.md` stay with the customer and Brixon; they are never pasted into brand documents.

## Continuing later

Without MCP there is no server state. To continue, the person uploads `brand/` (or the last output blocks) and the source list again. Read both, then continue with the next open chapter. Once the brand is in Brand Center, continue from `get_brand_draft` (mode A) or the published state, not from old local files.
