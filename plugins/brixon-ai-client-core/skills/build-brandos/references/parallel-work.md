# Several people building one brand

Use this when more than one person of the customer works on the brand, each with their own AI, in one shared folder (a Teams, SharePoint or OneDrive folder, a network drive, or a Git repository) in the layout of [local-mode.md](local-mode.md). It is a method for building the brand, not for maintaining a published one. A single person uses the same progress files, one per part, without the checks for others.

Everyone is an editor: anyone may take any free part. What stays as in the rest of this skill: the person states facts and decisions in their own name; proposals about the brand's direction enter the documents only after the owner, or someone the owner named, confirms them; a person publishes in Brand Center.

## Contents

- [Parts](#parts)
- [Starting a part](#starting-a-part)
- [The progress file](#the-progress-file)
- [Working inside a part](#working-inside-a-part)
- [Finishing, stopping, releasing](#finishing-stopping-releasing)
- [Whole-brand steps](#whole-brand-steps)
- [Gap and claim numbers](#gap-and-claim-numbers)
- [In a Git repository](#in-a-git-repository)
- [With a Brand Center connection](#with-a-brand-center-connection)
- [In a chat without files](#in-a-chat-without-files)
- [What to say](#what-to-say)

## Parts

A part is what one person takes at a time. In a shared folder a part is always whole documents, because a synced folder can lose a change when two people write the same file:

| Part (say to the person) | Paths |
|---|---|
| Kern und Strategie / Core and strategy | `BRAND.md`, `guidelines/strategy.md` |
| Zielgruppen / Audiences | `guidelines/audiences.md`, `guidelines/personas/*.md` |
| Angebote / Offers | `guidelines/offers.md` |
| Sprache und Ton / Voice | `guidelines/voice.md`, `guidelines/senders/*.md`, `guidelines/examples/*.md` |
| Prüfbare Aussagen / Claims | `guidelines/claims.md` |
| Regeln / Rules | `guidelines/rules.md` |
| Gestaltung / Design | `guidelines/design.md`, `resources/documents/image-prompts.md`, `resources/documents/design-examples/*.md` |
| one channel | `guidelines/channels/<channel>.md` |

Two parts overlap when they share a path. If two people want to work on different audiences or offers at once, one of them collects their material under `Für andere Teile` / `For other parts` (see below), and the holder writes it in. Core and strategy shape every other chapter: recommend doing it first, but do not make others wait for it.

## Starting a part

Before you change any brand document:

1. Ask which part the person wants to work on, if they have not said it. Ask for their first name and role (for example "Jonas, Vertrieb") once.
2. If the folder has no `BRAND.md` yet, ask whether this person sets up the folder for the team (ideally the owner) and whether anyone else is doing it right now. Only with a yes, check again that there is still no `BRAND.md`, then create the skeleton (see [local-mode.md](local-mode.md#skeleton)) and a progress file `Gerüst` / `Skeleton` with status `fertig` / `done` that records the GAP numbers it used. Others start once the skeleton exists.
3. Read every file in `source-material/progress/`. A part is taken when a file with status `in Arbeit` / `in progress` lists a path of it.
4. **Taken by this person** (same name and role): continue in that file, and do step 7.
5. **Taken by someone else:** say who has it and since when, in plain words, and offer the free parts. Do not write into it. If the person says the holder has stopped or the owner decided to hand it over, set that file's status to `abgebrochen` / `abandoned` with one line on who released it, when, and on whose word; only then continue.
6. **Free:** create this part's progress file with a number block (see [Gap and claim numbers](#gap-and-claim-numbers)), then read the folder again. If another `in Arbeit` file for an overlapping part, or a file with an overlapping number block, appeared meanwhile, stop and tell the person; they settle it with the other person. Otherwise begin.
7. Read what others left for this part: the `Für andere Teile` / `For other parts` sections of all progress files and the files in `source-material/inbox/`. Use it as material like anything else; the claims part also collects the claim candidates of all progress files.

A shared folder syncs with a delay, often seconds, sometimes minutes. A part becomes visibly taken for others only after the sync. For the first round, let the team agree who starts with what.

## The progress file

`source-material/progress/<YYYY-MM-DD>-<part>-<first-name>.md`, lowercase with hyphens, for example `2026-11-13-zielgruppen-jonas.md`. The date is the real start date. If the name exists already, add `-2`, `-3`. Write it in the brand language. German example:

```markdown
# Zielgruppen

Status: in Arbeit
Bearbeitet von: Jonas, Vertrieb
Begonnen: 2026-11-13
Teil: guidelines/audiences.md, guidelines/personas/*.md
Nummern: G40–G59, K-40–K-59
Brand Center: noch nicht übertragen
Basis: –

## Stand

Zwei Sätze: was jetzt im Teil steht und was fehlt.

## Quellen

| Pfad#Abschnitt | Aussage | Status | ID | Quelle |
|---|---|---|---|---|

## Offene Fragen

| GAP | Frage | Rolle |
|---|---|---|

## Für andere Teile

Was die Person zu anderen Teilen gesagt oder geliefert hat, mit Quelle.

## Für die Übergabe

Logos, Schriften, Bilder zum Hochladen; Farben und Schriften für Brixon; Entscheidungen, die offen sind.
```

English labels: `Status: in progress | done | abandoned`, `Edited by`, `Started`, `Part`, `Numbers`, `Brand Center: not transferred yet`, `Basis` / `Based on`: `–`, or the `base_revision` when the part started from text read with `get_brand_draft`, for example after a failed save, sections `Progress`, `Sources`, `Open questions`, `For other parts`, `For the handover`. Source states and columns are those of [evidence.md](evidence.md). The file is the source list and question list of this part; never cite it inside a brand document. Never mention number blocks or file names to the person; to them it is "eine Notiz, dass du gerade an den Zielgruppen arbeitest".

## Working inside a part

- Write only the paths of your part.
- Before each write and before setting the part done, read `source-material/progress/` again. If someone set your file to `abgebrochen` / `abandoned`, or another `in Arbeit` file now lists one of your paths, stop and tell the person.
- What the person says about another part goes into `Für andere Teile` / `For other parts` of your progress file, with its source. Material for others goes into `source-material/inbox/`. Never write it into the other part's documents. If that part is free, the person may take it as a second part with its own progress file.
- If the shared folder created a conflict copy of a file (a second file with a person's or computer's name added to its name), do not delete or merge it on your own: tell the person.
- Update `Stand` / `Progress`, `Quellen` / `Sources` and the open questions after each step, so someone else could pick up from the file.

## Finishing, stopping, releasing

- **Done:** run the verification checklist of [evidence.md](evidence.md) over your part, set `Status: fertig` / `done`, update `Stand` / `Progress`. That releases the part.
- **Stopping for today:** the status stays `in Arbeit` / `in progress`; the part stays taken. Say so, so the person can release it if someone else should go on.
- **Giving it up:** set `Status: abgebrochen` / `abandoned` with one line on why. Whoever continues starts a new progress file and reads the old one first.
- Never delete a progress file; it is the record of where each statement came from.
- Changing a part that is `fertig` / `done` again means starting it again: a new progress file, same rules.

## Whole-brand steps

The completeness check, the fresh-reader review, Brand Check questions, the handover and the transfer into Brand Center read all parts. Whoever runs them:

- changes a brand document only in parts that are `fertig` / `done` and not taken again, and only by starting that part again with a new progress file;
- reports findings for a part that is `in Arbeit` / `in progress` to its holder, under `Für andere Teile` / `For other parts` in the runner's own progress file;
- alone writes `source-material/handover.md`, collected from the `Für die Übergabe` / `For the handover` sections;
- may add one line `Brand Center: übertragen am …` / `Brand Center: transferred on …` to the progress files of transferred parts.

Only one person transfers at a time, and nobody saves in the Brand Center editor during a transfer.

## Gap and claim numbers

GAP numbers (G01 …) and claim candidates (K-01 …) are unique across the brand. So that two people never use the same number, each progress file reserves a block of 20: the next block after the highest number reserved in any progress file or used in any brand document (if the skeleton used G01–G23, the next block is G24–G43 and K-24–K-43). Use only numbers from your block. The completeness check before transfer looks for duplicates; renumbering one follows the whole-brand rules above.

## In a Git repository

Git shares nothing until it is pushed. Progress files always go straight to the shared main branch, whatever route the documents take, otherwise nobody sees them. Pull before reading `source-material/progress/`; commit and push the new progress file before starting work; pull before each write and push after each step; if a push is refused, pull and run the checks of [Starting a part](#starting-a-part) step 6 again. The `github-workflow` skill handles the Git steps.

## With a Brand Center connection

When several people save into the same Brand Center draft (mode A), Brand Center keeps each document's changes separately and refuses a save made on an outdated version. Then:

- A part may be a single audience or offer, written as `Teil: guidelines/offers.md → Raumakustik-Messung` with its H2 heading exactly as in the document. Different H2 headings of one document do not overlap here; Brand Center's version check protects the rest of the document.
- Call `get_brand_draft` directly before each save, change only your part in that latest text, and save. On a version conflict, read again: if the other save changed one of your documents, show the person what changed and ask; otherwise redo only your part. Never save older text over someone else's.
- If the team also shares a folder, use the same progress files for taking and releasing parts, and keep this part's sources and questions there.
- Nobody uses the Brand Center editor on the brand while others save through their AI: the editor's save replaces the whole draft.
- If a save fails because of the connection, the sign-in, the licence or the server, write the part into the shared folder (see [local-mode.md](local-mode.md)), note in its progress file `Brand Center: nicht übertragen, Speichern fehlgeschlagen am …` / `Brand Center: not transferred, save failed on …`, and transfer it later.

## In a chat without files

The AI cannot see the shared folder. Ask the person to upload the current files of `source-material/progress/` and the documents of the part, decide from those whether the part is free, and output the new progress file as a block with its path. Say plainly: the part counts as taken for the others only once this file is saved in the shared folder, so save it before the work starts, and upload the latest version of the part's documents in the next chat rather than an old copy. At the end, output the changed documents and the updated progress file to save back.

## What to say

| Situation | German | English |
|---|---|---|
| Part taken | „An den Zielgruppen arbeitet seit 13.11. Jonas. Frei sind gerade Angebote, Stimme und Gestaltung. Womit soll es weitergehen?" | "Jonas has been working on the audiences since 13 Nov. Free right now: offers, voice and design. Which would you like to take?" |
| Part started | „Die Angebote sind jetzt reserviert; die anderen sehen das, sobald der Ordner synchronisiert ist." | "The offers are now reserved; the others see it once the folder has synced." |
| Something for another part | „Das gehört zu den Zielgruppen, an denen Jonas arbeitet. Ich notiere es für ihn, statt es dort einzutragen." | "That belongs to the audiences Jonas is working on. I'll note it for him instead of writing it there." |
| Part finished | „Die Angebote sind fertig und wieder frei. Offen bleiben zwei Fragen an die Geschäftsführung." | "The offers are done and free again. Two questions for management remain open." |
