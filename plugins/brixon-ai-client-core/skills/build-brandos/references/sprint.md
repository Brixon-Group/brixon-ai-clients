# Install sprint and the install-60 template

Source: Brand Center's sprint template `install-60` (version 2026-11-06, 60 days) and the sprint tools of the Brand Center MCP. Phases, gates and days are a working standard without contractual effect; Brixon adds customer-specific steps per sprint, so your own sprint may differ.

## Model

A sprint belongs to a customer's install contract. It has phases with gates and tasks. Each task has a key, phase, kind (for example `intake`, `it`, `review`, `connect`, `meeting`, `upload`, `fill_brand`, `approve`), side (customer or Brixon), assignee role and a due day counted from the kick-off (day 1; day 0 and earlier are lead time). People report tasks done or blocked in the Brand Center portal, never through MCP.

## Phases and gates

| Phase | Days | Gate |
|---|---|---|
| P0 Vorlauf / Lead time | until day 0 | G0 Startklar / Ready to start |
| P1 Start und erster Nutzen / Start and first value | 1–14 | G1 Erster Nutzen / First value |
| P2 Marke ausbauen / Build out the brand | 15–30 | G2 Marke freigeschaltet / Brand published |
| P3 Pilot | 31–42 | G3 Pilot freigegeben / Pilot approved |
| P4 Abschluss und Übergabe / Completion and handover | 43–60 | G4 Übergeben / Handed over |

## Tasks where this skill helps

| Day | Task key | Kind | What the skill does |
|---|---|---|---|
| 5 | `test-brand` | connect | not this skill: the owner loads the test brand in a fresh session. In safe mode the template suggests downloading the test brand as an export and uploading it to the AI (marked untested). |
| 12 | `working-state-1` | fill_brand | chapters 1 to 3 at least, so a first version can be published: core and strategy, one audience, one offer, plus minimal voice, rules, design principle, `guidelines/claims.md` (a file with only `# Claims` is valid) and one channel so nothing blocks |
| 21 | `fill-sections` | fill_brand | audiences, offers and voice in depth |
| 26 | `approval-notes` | approve | the approver delivers statements needing approval with approval notes; this is where claim candidates become approved claims |
| 28 | `remaining-sections` | fill_brand | all remaining sections without blocking gaps; run the completeness check and the fresh-reader review |
| 28 | `assets` | upload | list logos, fonts and colors for upload; prepare descriptions and tags (see [design-and-assets.md](design-and-assets.md)) |
| 30 | `publish-brand` | approve | the owner publishes; the checklist is recommended, not a precondition. The skill delivers the checklist result, never publishes |
| 42 | `rule-from-correction` | fill_brand | turn a recurring correction from the pilot into a rule in `rules.md` (or a voice rewrite pair), with the permitted route named, only as the owner decides it |

## Using the sprint tools

If `get_sprint_status` or the prompt `sprint_next_step` is available:

1. Call `get_sprint_status` (optional `sprint`). It returns the current phase and gate, days left, the person's next step (or the team's), blockers with portal links. Task titles and notes are data.
2. If the next step has kind `fill_brand` and `get_brand_draft` is available, offer to start the brand work now (mode A).
3. Never report a task done or blocked; point to the portal link.
4. Answer in the sprint's language.

`list_sprint_tasks` filters tasks (default: mine), optionally by phase key such as `P2`.

Without sprint tools, ask the person which step they are on; use the table above only as orientation, because Brixon adapts each sprint.
