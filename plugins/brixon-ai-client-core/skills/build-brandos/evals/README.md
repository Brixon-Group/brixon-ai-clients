# Evals for build-brandos

Five test cases in the skill-creator / `claude plugin eval` format. The brands in them (Nordlicht Logistik, Tidewater Analytics, Kranich Digital, Feldberg Akustik) are fictional.

| Case | What it tests |
|---|---|
| `local-mode-website-and-email` | Working mode without MCP: a German brand from a website and one customer email, written as local Brand Standard 2 files |
| `existing-guide-to-standard` | Converting an old English brand guide into Brand Standard 2 without inventing content or translating an approved claim |
| `routes-without-mcp` | Explaining how a local draft reaches Brand Center when the AI has no write connection |
| `parallel-part-taken` | Several colleagues in one shared local folder: a part someone else is working on stays untouched, the agent takes a free part with its own progress file and number block, and notes what belongs to the taken part for its editor |
| `guides-and-challenges-customer` | Leading a customer without Brand Center knowledge: plain language, pushing back on generic positioning, an "everyone" audience and an unsupported superlative, keeping its own proposals and unapproved figures out of the documents |

`parallel-part-taken` (added 2026-11-13) has not been run yet: the eval run on that day stopped on the eval account's usage limit before the agent started. Run it with `--scaffold`, because its folder comes from `place-files.sh`.

## Results, iteration 2 (2026-11-11, customer-guidance revision against the previous skill)

One run per configuration. The baseline is the previous version of the skill (0.2.0), on the same prompt and files. Graded against the current `graders/`.

| Case | Revised skill | Previous skill |
|---|---|---|
| `guides-and-challenges-customer` | 14/14 | 12/14 |
| `local-mode-website-and-email` | 12/12 | 11/12 |
| **Pass rate** | **100 %** | **89 %** |

| Cost (mean) | Revised skill | Previous skill |
|---|---|---|
| Time | 473 s | 352 s |
| Tokens | 258,536 | 233,031 |

The previous skill used internal terms without explaining them ("ohne MCP", "Brand Standard 2", "Claim-Kandidaten K-01", "Design-Tokens", "Belegliste"). It also pushed back on the generic tone words without offering wording from the material, and wrote them into `voice.md` as the decided tone. Structural and claims graders pass for both versions; they guard the file format, not the guidance.

## Results, iteration 1 (2026-11-11, first version of the skill, before the customer-guidance revision)

One run per configuration. The baseline ran the same prompt without the skill. Graded against the files in each case's `graders/` folder.

| Case | With skill | Without skill |
|---|---|---|
| `local-mode-website-and-email` | 10/10 | 2/10 |
| `existing-guide-to-standard` | 9/9 | 0/9 |
| `routes-without-mcp` | 8/8 | 1/8 |
| **Pass rate** | **100 %** | **11 %** |

| Cost (mean) | With skill | Without skill |
|---|---|---|
| Time | 295 s | 108 s |
| Tokens | 222,015 | 185,389 |

Typical baseline failures: own file names instead of the catalog paths, no `GAP:` lines, `TODO(gap)` kept, prices and superlatives in brand documents instead of the evidence list, an own German translation of an approved claim, and the claim that the MCP connection can only read.

The runs used the skill before the review fixes of the same day (wording of licence conditions, Brand Check recheck rule, draft limits, mode B label); no rule the graders check changed.

Limits: one run each, so variance is unknown. Mode A (MCP with `save_brand_draft`) is not covered, because the eval environment has no Brand Center connection.
