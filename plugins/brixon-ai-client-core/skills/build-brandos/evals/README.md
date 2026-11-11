# Evals for build-brandos

Three test cases in the skill-creator / `claude plugin eval` format. The brands in them (Nordlicht Logistik, Tidewater Analytics) are fictional.

| Case | What it tests |
|---|---|
| `local-mode-website-and-email` | Working mode without MCP: a German brand from a website and one customer email, written as local Brand Standard 2 files |
| `existing-guide-to-standard` | Converting an old English brand guide into Brand Standard 2 without inventing content or translating an approved claim |
| `routes-without-mcp` | Explaining how a local draft reaches Brand Center when the AI has no write connection |

## Results, iteration 1 (2026-11-11)

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
