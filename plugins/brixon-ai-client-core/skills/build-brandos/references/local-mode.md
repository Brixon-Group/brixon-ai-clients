# Working with local files (modes B and C, and when saving fails)

Use this when there is no `save_brand_draft`, and also in mode A when a save fails because of the connection, the sign-in, the licence or the server: write the chapter into the local folder instead, say so in one plain sentence, and carry on. Nothing the person decided may be lost because the connection broke. A save refused for its content (a document over the size limit, a path Brand Center does not allow) is fixed first, not moved to local files, because it would fail again at transfer.

The folder has the same layout as a brand in Brand Center, so the brand documents can later go into Brand Center unchanged. Every handover says so in plain words, for example: **"Das ist ein lokaler Entwurf. Er ist noch nicht im Brand Center gespeichert oder veröffentlicht."** Do not mention MCP or modes to the person unless they use the terms themselves.

## Folder layout

```text
<brand-slug>/
  BRAND.md                                ← brand documents: exactly Brand Center's paths
  guidelines/
    strategy.md
    audiences.md
    offers.md
    voice.md
    claims.md
    rules.md
    design.md
    channels/<channel>.md                 ← at least one, e.g. linkedin.md (profile: social)
    personas/<id>.md                      ← optional
    senders/<person>.md                   ← optional
    examples/<name>.md                    ← optional
  resources/
    documents/
      image-prompts.md
      design-examples/<name>.md
  source-material/                        ← working files, never transferred to Brand Center
    inbox/                                ← new material anyone adds: website exports, decks, emails, notes (no logos, fonts or images)
    progress/                             ← one file per part someone started (see parallel-work.md)
    handover.md                           ← written at the handover: assets to upload, design evidence for Brixon, open decisions
```

This is the layout of a brand source in Brand Center. Only three kinds of path are ever transferred: `BRAND.md`, `guidelines/**.md`, `resources/documents/**.md`. Everything under `source-material/` stays with the customer and Brixon.

Rules for the brand documents:

- Only Markdown at those paths. No `AGENTS.md`, `CLAUDE.md`, `README.md`, `PROGRESS.md` or notes beside them, no other top-level folders.
- No `resources/design/`, no logos, fonts or images: tokens are a Brixon step, binaries go through the upload (see [design-and-assets.md](design-and-assets.md)). Logos, fonts and images are not copied into the folder at all; note them under `Für die Übergabe` / `For the handover` in the progress file, and the handover lists them in `source-material/handover.md` for the upload.
- File names: lowercase, digits, hyphens, `.md`.
- Every file complete: frontmatter where required, H1 title, all catalog headings of that document in the brand language, each section with content or a GAP line.

The source list and the open questions of a part live in its progress file (format in [parallel-work.md](parallel-work.md#the-progress-file)), so that several people never write into the same list. Together, the progress files are the brand's source list.

If you have no file system (a chat client), output each file as its own Markdown block with the path on the line directly above it, and only the files changed in this chapter. Then output the progress file of this part as one block the person saves into `source-material/progress/` and uploads again in the next chat.

## Skeleton

Create the skeleton once at the start, when the folder has no `BRAND.md` yet, so headings are right from the beginning. If another person already created it, never create it again. Example for a German brand (`language: de`); for English use the English headings from [brand-standard.md](brand-standard.md).

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

## Several people, one folder

When the folder is shared (a Teams, SharePoint or OneDrive folder, a network drive, a Git repository) or `source-material/progress/` already holds files, read [parallel-work.md](parallel-work.md) before you write anything: each part someone works on is marked as taken, and nobody else writes into it until it is done.

## Checking locally

Run the completeness checklist in [brand-standard.md](brand-standard.md#completeness-check) yourself over the brand documents. There is no tool for checking a loose folder; the real check runs only inside Brand Center. Say that the check was done by you, not by Brand Center.

## Getting the files into Brand Center

Transfer a document only if no progress file with status `in Arbeit` / `in progress` lists it; such documents stay local and are named in the report. Only one person transfers at a time, and nobody saves in the Brand Center editor meanwhile.

| Route | Status | How |
|---|---|---|
| `save_brand_draft` | needs a licence that allows editing through the AI and a client that signed in | as below |
| Editor paste | works today | A person with an editor seat opens "Marke bearbeiten" in Brand Center and pastes each document's text into the document at the same path. The editor saves into the draft with version and base checks and shows per document "missing / required part missing / changed / gap". Publishing: button in the editor; blocking parts prevent it. One document at a time; long, but nothing needs converting. Before pasting over a document, the person compares it with what the editor shows, as in step 2 below. |
| Package import (whole folder at once) | planned, not built | Do not tell anyone it exists. |

Transfer with `save_brand_draft`, never overwriting what someone saved in Brand Center meanwhile:

1. Call `get_brand_draft`. For each local document, find what Brand Center holds at the same path: the saved draft change if there is one, otherwise the published text.
2. Sort each document into one of three cases:
   - **Same text** as locally: skip it.
   - **Nothing there yet** in Brand Center beyond the skeleton (never published, no saved draft change), or the part's progress file records under `Basis` / `Based on` the Brand Center revision it started from and that revision is still the current `base_revision` with no saved draft change at that path: transfer the local text.
   - **Anything else that differs** (a saved draft change, or published text the local file was not based on): someone worked on it in Brand Center. Do not transfer it. Show the person, section by section in plain words, what differs, and let them decide per section: keep Brand Center's text, take the local text, or combine both. Write the result locally first (as a new start of that part, see [parallel-work.md](parallel-work.md#whole-brand-steps)), then transfer it.
3. Save one chapter per call: `documents` maps each path to its complete text from the local folder, plus `expected_version` and `base_revision` from step 1. Never pass `null` (that deletes the document on publication) unless the person asked to drop that document, and never `restore` (that discards a draft change saved in Brand Center) unless the person asked to discard that change. On a version conflict someone saved in the meantime: start again at step 1 for that chapter, and ask the person if the other save changed one of these documents.
4. Add one line to each transferred part's progress file: transferred on which date, into which draft version. Then report what Brand Center's completeness report says still prevents publication.

Limits (see [mcp.md](mcp.md)): at most 12 changed documents per draft for a brand kept in Git once it is published (64 before the first publication); a larger transfer needs several drafts, published one after the other by the person.

The progress files, the inbox and `handover.md` stay with the customer and Brixon; they are never pasted into brand documents.

## Continuing later

Without MCP there is no server state. To continue, open the folder (or the person uploads the brand documents and the progress files again). Read the brand documents and every progress file, then continue with the next open part. Once the brand is in Brand Center and published, continue from `get_brand_draft` (mode A) or the published state, not from old local files.
