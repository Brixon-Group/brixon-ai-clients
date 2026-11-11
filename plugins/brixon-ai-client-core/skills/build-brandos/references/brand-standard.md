# Brand Standard 2: catalog and completeness

Summary of the Brand Standard 2 catalog and of the completeness check Brand Center runs, as of November 2026. In mode A the catalog returned by `get_brand_draft` is authoritative; if it differs from this file, follow the draft and say so.

## Contents

- [Languages and required levels](#languages-and-required-levels)
- [Documents](#documents)
- [Document shapes](#document-shapes)
- [Resources outside the documents](#resources-outside-the-documents)
- [Writing rules](#writing-rules)
- [Completeness check](#completeness-check)
- [What the editor and MCP can write](#what-the-editor-and-mcp-can-write)

## Languages and required levels

- Brand language: `de` or `en`, declared once in `BRAND.md` as `language`. All headings and content use it. `output_languages` lists further languages; only claims carry a wording per further language.
- Required levels:
  - **block**: publication stops until the element exists with real content.
  - **gap**: published anyway; reported as missing through the MCP (`missing` in `get_brand_context`).
  - **optional**: may be absent.
- Gap marker: a section whose text contains `GAP:` is reported as an open gap.

## Documents

Headings are matched exactly against the catalog heading in the brand language, ignoring case. A section under a different heading is not found and counts as missing. Each document starts with an H1 title (for example `# Strategie`); catalog sections are H2 unless noted.

| Document | Path | Level | Sections: German heading / English heading [level] |
|---|---|---|---|
| Brand / Marke | `BRAND.md` | block | Kern / Essence [block] |
| Strategy / Strategie | `guidelines/strategy.md` | block | Kategorie und Kunde / Category and customer [block]; Positionierung / Positioning [block]; Botschaftssäulen / Message pillars [block]; Alternativen / Alternatives [gap] |
| Audiences / Zielgruppen | `guidelines/audiences.md` | block, at least 1 entry | per entry (H2 = audience name), H3 sections: Wer und Rolle / Who and role [block]; Situation und Probleme / Situation and pains [block]; Gewünschte Ergebnisse / Desired outcomes [gap]; Einwände und Antworten / Objections and answers [gap]; Sprachhinweise / Language notes [optional] |
| Personas | `guidelines/personas/*.md` | optional | Rolle und Situation / Role and situation; Beobachtete Signale / Observed signals; Ziele und Kaufkriterien / Goals and buying criteria; Einwände und Sprache / Objections and language; Quellen und Sicherheit / Sources and confidence; Offene Fragen / Unknowns; Nutzung für Interviews und QA / Interview and QA use [all block within a persona] |
| Offers / Angebote | `guidelines/offers.md` | block, at least 1 entry | per entry (H2 = offer name), H3 sections: Was es ist / What it is [block]; Zielgruppen / Audiences served [block]; Gelöstes Problem / Problem solved [block]; Was es nicht ist / What it is not [optional]; Kaufmännische Regeln / Commercial rules [optional] |
| Voice / Sprache und Ton | `guidelines/voice.md` | block | Tonalität / Tone [block]; Stilmittel / Signature moves [block]; Wortschatz / Vocabulary [block]; Umschreibungen / Rewrite pairs [optional] |
| Claims | `guidelines/claims.md` | block | claim entries, see below |
| Rules / Regeln | `guidelines/rules.md` | block | Grundregeln / Non-negotiables [block]; Freigabepflichten / Approval triggers [block] |
| Design / Gestaltung | `guidelines/design.md` | block | Gestaltungsprinzipien / Visual principles [block]; Erkennungsmerkmale / Signature elements [gap]; Bildsprache / Imagery [gap]; Logoeinsatz / Logo usage [gap]; Typografie / Typography [gap]; Farbe / Color [gap]; Komponenten / Components [gap]; Designbeispiele / Design examples [gap] |
| Channel / Kanal | `guidelines/channels/*.md` | block, at least 1 file | Rolle / Role [block]; Plattformgrenzen / Platform limits [gap]; Stilvorgaben / Style defaults [optional]; Handlungsaufforderung / Call to action [optional]; Zusätzlich laden / Also load [optional] |
| Sender / Absender | `guidelines/senders/*.md` | optional | Wer diese Person ist / Who this person is [block]; Abweichungen im Ton / Voice deltas [block]; Themen / Topics [optional] |
| Example / Beispiel | `guidelines/examples/*.md` | optional | Beispiel / Example [block]; Warum es funktioniert / Why it works [block]; Grenzen / Limits [optional] |
| Image prompts / Bild-Prompts | `resources/documents/image-prompts.md` | gap | Grundstil / Base style [gap], then one H2 per image style |
| Design example / Designbeispiel | `resources/documents/design-examples/*.md` | gap, at least 1 | Einsatz / Use when [block]; Aufbau / Structure [block]; Komponenten / Components [optional]; Vorschau / Preview [optional]; Code / Code [optional] |
| Shared layout / Gemeinsames Layout | `resources/documents/design-examples/shared-layout.md` | optional | Code / Code [block] |

What each section should contain is described in the catalog itself (`description` per section; in mode A visible in `get_brand_draft`, and the person sees the same text in the Brand Center editor). Use those descriptions to decide what to ask.

## Document shapes

### Frontmatter

| Document | Required fields | Optional | Allowed values |
|---|---|---|---|
| `BRAND.md` | `brand`, `standard`, `language`, `owner`, `updated` | `output_languages` | `standard: 2`; `language: de` or `en`; `updated: YYYY-MM-DD` |
| `guidelines/channels/*.md` | `profile` | | `social`, `web`, `sales` |
| `guidelines/personas/*.md` | `owner`, `updated`, `status`, `usage` | `audience` | `status: research`; `usage: target` or `comparison` |
| `guidelines/examples/*.md` | `channel` | | |

```markdown
---
brand: nordlicht
standard: 2
language: de
output_languages: [en]
owner: Anna Beispiel
updated: 2026-11-11
---

# Nordlicht

## Kern

GAP: [G01] Der Kern der Marke in zwei Sätzen ist noch nicht beschrieben. Klärt Geschäftsführung.
```

### Entries (audiences, offers)

```markdown
# Zielgruppen

## IT-Leitung im Mittelstand

### Wer und Rolle
…

### Situation und Probleme
…

### Gewünschte Ergebnisse
GAP: [G07] … Klärt Vertrieb.

### Einwände und Antworten
GAP: [G08] … Klärt Vertrieb.
```

Offers name their audiences by the exact H2 heading from `audiences.md`. Prices appear only as a claim ID, for example `CLM-003`.

### Claims

Heading pattern `^(CLM-\d{3})\s+[—–-]\s+(.+)$`, as H2. Below it the claim text in the brand language, then one H3 per further output language (`### en` or `### de`) with its wording. Details in [claims.md](claims.md).

### Image prompts

`## Grundstil` (or `## Base style`) first, then one H2 per style: a one-line "use when", one fenced prompt, optional reference images as `[label](asset:<id>)`. Details in [design-and-assets.md](design-and-assets.md).

## Resources outside the documents

| Resource | Path | Level | Route |
|---|---|---|---|
| Design tokens | `resources/design/tokens.css` | catalog: gap; in practice every published snapshot needs it | Brixon step in the brand's source, not editable in the editor or MCP |
| Design map (token roles, fonts) | `resources/design/design-map.json` | catalog: gap; every published snapshot needs it | same |
| UI library | `resources/design/ui-library.json` | gap | same |

## Writing rules

| Rule | Meaning |
|---|---|
| one-fact-one-place | Each fact lives in exactly one document; others refer to it. |
| prices-as-claims | Prices and other checkable statements exist only as claims; other documents cite the claim ID. |
| channel-deltas-only | A channel document states only what differs for that channel. |
| owner-decided-limits | A restriction exists only where the owner decided it, and names the permitted route in the same place. |
| removal-removes | Removing a rule removes it; never replace it with a list of forbidden terms or an antithesis. |
| no-process-docs | Brand documents describe the brand, not how agents or tools work. |
| code-in-design-examples | HTML and CSS appear only in design examples, once each. |
| no-dated-content | Guidelines hold lasting truth; dates, events and campaigns belong in project briefings. |
| one-language | All content and headings in the brand language; only claims add further languages. |

## Completeness check

Run this over all documents before every handover. It reproduces what Brand Center's completeness report contains; in mode A, the report returned by `save_brand_draft`/`get_brand_draft` is the real result, so compare.

A section counts as **empty** if it is missing, has no text after removing HTML comments, or contains a placeholder: `TODO(onboarding)` or an angle-bracket placeholder such as `<Name>` (ordinary HTML tags and links are fine).

| Code | Blocks or gap | Condition |
|---|---|---|
| `language_invalid` | blocks | `language` in `BRAND.md` is not `de` or `en` |
| `document_missing` | blocks (block documents), gap (gap documents) | a required file or fewer files than the minimum (channels ≥1, design examples ≥1) |
| `field_missing`, `field_invalid` | blocks | a required frontmatter field is absent or has a value outside the allowed list |
| `section_empty` | per section level | a block section empty → blocks; a gap section empty → gap |
| `section_gap` | gap | a section with real text that contains `GAP:` |
| `items_missing` | blocks | audiences or offers without any H2 entry |
| `claim_text_missing` | blocks | a claim heading without claim text |
| `claim_language_missing` | gap | a claim without wording for an output language |
| `claim_duplicate` | blocks | the same CLM ID twice |
| `resource_missing` | gap | UI library absent. Tokens and design map are not in this report: every published snapshot needs them, so Brixon sets them up with the brand's source |

**Strict GAP warning** (not a server rule, add it yourself): a block section whose only content is a GAP line passes the server check, so publication is not stopped. List these sections separately as "required, still open in substance", so the person decides knowingly. A GAP line inside frontmatter is never acceptable.

Report the result as two lists, "blocks publication" and "published as gap", each with path, section and GAP ID.

## What the editor and MCP can write

Through the Brand Center editor and `save_brand_draft`, only these paths are writable: `BRAND.md`, `guidelines/**.md`, `resources/documents/**.md`. Not writable there: agent instruction files, `resources/design/*` (tokens, design map, UI library), binaries. Logos, fonts and images go through the portal upload; design resources through Brixon in the brand's source repository.
