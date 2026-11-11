# Brand Check questions

Sources: Brand Center's Brand Check and the Brand Center MCP tool descriptions.

## What Brand Check is

Brand Center shows team members cards, each with one statement from the published brand, its topic and a "view source" link. Answers: **Stimmt noch** (confirm, 3 points), **Bitte ändern** (correction text, 10 points pending until the change is applied) or **Weiß ich nicht** (skip, remembered per person and review round). Confirmed statements and accepted or rejected corrections are closed; a correction without a decision becomes checkable again after 28 days if its source is unchanged. No MCP tool answers questions, awards points or resolves corrections.

## Where questions come from

| Brand type | Source of questions |
|---|---|
| Customer brand built by the server generation | Generated automatically when a published revision is read: every bullet marked `*(Interpretation · source)*` becomes one question, topic = nearest heading, at most 40 open at a time, each statement asked once. |
| Brixon-managed brand | Imported with `import_brand_check_questions` by a personal editor or an explicitly granted service. |

Brand documents written with this skill carry no interpretation markers (inferences stay in the evidence list), so for customer brands they do not produce generated questions. What the skill can do instead:

- Before publication: turn inferred statements and open points into questions in the question list for the owner (the normal route).
- For Brixon-managed brands after publication: build an import batch, if `import_brand_check_questions` is available and the person may import.

## What a good question looks like

- **One verifiable statement**, as it stands in the published document, that the owner can confirm or correct without context: "Unsere Kunden sind mittelständische Industrieunternehmen mit eigener IT-Abteilung." Not a question, not two facts joined with "and", not an opinion ("Our tone is great").
- **Concrete enough to be wrong.** "We serve SMEs" invites "Stimmt noch" by reflex; "Wir arbeiten vor allem für Unternehmen mit 200 bis 2.000 Mitarbeitenden" can be checked.
- **Topic**: a short display category, normally the nearest heading (`Zielgruppen`, `Positionierung`), at most 120 characters.
- **Source**: the exact document path and an exact excerpt from that document at the current published revision. Never a paraphrase.
- Prefer statements whose being wrong would cost the most: positioning, audiences, offer scope, rules.

## Import format (`import_brand_check_questions`)

```json
{
  "brand": "<slug>",
  "batch_id": "<stable batch id, max 100>",
  "questions": [
    {
      "external_id": "<stable id within the batch, max 100>",
      "statement": "<one verifiable statement, max 2000>",
      "topic": "<display category, max 120>",
      "source_revision": "<current published revision, 64 hex>",
      "source_path": "<document path>",
      "source_quote": "<exact excerpt from that document>"
    }
  ]
}
```

1 to 100 questions, at most 512 KiB. Read the current source with `get_brand_context`/`get_brand_document` first; the revision must be the current published one and the quote must match exactly. Repeating identical input returns the same questions; different content under an existing `external_id` is rejected. Check results later with `get_brand_check_status` (`brand`, optional `batch_id`, `question_id`, `cursor`, `limit`).
