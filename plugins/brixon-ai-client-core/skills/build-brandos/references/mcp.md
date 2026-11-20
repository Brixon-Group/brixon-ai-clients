# Brand Center MCP: what exists, what is planned

State of the Brand Center MCP server, November 2026. Tool names may carry a client prefix (in Claude Code with this plugin, for example `mcp__plugin_brixon-ai-client-core_brixon-brand-center__get_brand_context`). Never call a tool that is not in your tool list, and never invent parameters.

## Which tools a connection gets

| Group | Tools and prompts | Available to |
|---|---|---|
| Read | `list_brands`, `get_brand_context`, `get_brand_document`, `get_image_prompts`, `get_colors`, `get_fonts`, `get_images`, `get_logos`, `search_assets`, `get_asset`, `get_ui_library`, `get_ui_component`, `get_video_library`, `get_video_style`, `get_brand_bundle`, `get_upload_url` | every connection with read access to the brand |
| Brand Check | `get_brand_check_status`, `import_brand_check_questions` | registered on every connection; the server allows import only for personal editors or explicitly granted services of a Brixon-managed brand |
| Draft writing | `get_brand_draft`, `save_brand_draft` | seats whose licence allows editing through the AI |
| Filling method | prompt `fill_brand`; the same text in the `method` field of `get_brand_draft` | customer seats whose licence allows editing through the AI (install, and BrandOS since November 2026) |
| Brand creation | `create_brand` | on `brands.brixon.ai` only: a person with editor rights whose plan includes a brand limit and editing through the AI |
| File upload | `prepare_asset_upload`, `finalize_asset_upload` | personal sign-ins that may upload to the brand |
| Install sprint | `get_sprint_status`, `list_sprint_tasks`, prompt `sprint_next_step` | seats of an install contract |
| Issue report | `report_brand_issue` | personal sign-ins. A report only records an issue for the brand team; it changes no document. This skill never uses it: gaps belong in the draft as `GAP:` lines. |

Brand Center does not write a brand by itself. Since November 2026 no brand is generated automatically on the server: the customer's own AI fills it through these tools, and a person publishes it in Brand Center.

## Tools this skill uses

### `create_brand`

Parameters: `name` (1 to 160 characters), `language` (`de` or `en`), `request_id` (a new random UUID; reuse it when you retry, then the same brand comes back). Creates an unpublished brand in the person's workspace and returns `brand`, `portal_url` and the next step. The workspace's brand limit applies (`Brand quota reached`). Use it only when the person asks for a new brand and `list_brands` shows none for it. Then fill it with `get_brand_draft` and `save_brand_draft`; you cannot publish it.

### `get_brand_draft` (mode A)

Parameter: `brand`. Returns the published documents, the saved draft changes, the draft `version` and `base_revision`, the catalog with a description per section, the completeness report and, for customer seats that may edit through the AI, `method: { version, text }` (the `fill_brand` method). Read before every save.

### `save_brand_draft` (mode A)

Parameters:

- `brand`
- `documents`: map of path to the complete new text (at most 256 KiB per document), or to `null` to delete that document when the draft is published
- `restore`: list of paths whose draft change is dropped so the published text applies again
- `expected_version`: integer from the last `get_brand_draft`/`save_brand_draft`
- `base_revision`: 64-hex revision or `null`

Changes merge into the saved draft; other people's draft changes stay. A conflict means someone else saved first: read again, then ask. Saving never publishes. Limits: at most 256 KiB per document and 1 MiB of changed documents per draft; for brands kept in Git, at most 12 changed documents per draft (64 before the first publication), so a full BrandOS for an already published Git brand may need several drafts. Paths must be editable (`BRAND.md`, `guidelines/**.md`, `resources/documents/**.md`). The Brand Center editor's own save replaces the whole change set, so do not run the editor and MCP on the same brand at the same moment.

### `get_brand_context` (modes A and B, and after publication)

Parameters: `brand`, optional `revision`, `task` (`general`, `social-post`, `web-section`, `ad`, `image`, `design`, `sales-material`), `language`, `sender`, `profile` (`social`, `web`), `channel`, `includeDesign` (default true). Returns the documents and sections the task needs in the output language, a `manifest` of everything else, `missing`, `next_calls` and `linked_documents`. Reuse the returned revision. Use it to read a published brand before extending it, and to verify after publication that a task gets what it needs (for example `task: social-post` with a channel).

### `get_brand_document`

Parameters: scope (`brand`, `revision`), `path`, optional `section` (catalog section ID or item heading slug). Reads one document or one section of the published brand.

### `get_image_prompts`

Must be called before generating any image. Returns `base_style` and `styles` (`use_when`, `prompt`, reference asset IDs) or `available: false`.

### `prepare_asset_upload`, `finalize_asset_upload`

Upload a logo, font or image from the computer: `prepare_asset_upload` (parameters `brand`, `filename`, `size`, `metadata` with `id`, `kind`, `description`, and for fonts family and licence notes) returns a short-lived ticket; send the file as the ticket says (the `brixon-upload` skill), then call `finalize_asset_upload` with the `upload_id`. Before a customer brand's first publication the file waits in the brand's inbox and is taken over at the first publication.

### `get_upload_url`

Parameter: `brand`. Opens the personal upload flow in the portal; grants no write access itself.

### `import_brand_check_questions`, `get_brand_check_status`

See [brand-check.md](brand-check.md).

### `get_sprint_status`, `list_sprint_tasks`, `sprint_next_step`

See [sprint.md](sprint.md).

## The two prompts

**`fill_brand`** (method version 2026-11-20): the method this skill follows in mode A, summarised in the server's own terms (this skill calls field groups chapters and the evidence list the source list). In short: read `get_brand_draft`; content only from the customer's files, links and answers; GAP lines `GAP: [G01] what is missing. Clarified by: role.`; field groups in the order core & strategy, audiences, offers, voice, claims & rules, design, channels; at most four questions per group, others into the question list; do not change frontmatter or headings of the scaffold; new entries as H2 with H3 sections; checkable statements are claim candidates K-01 … in the evidence list, `claims.md` only approved claims in approved wording; four things always asked (customer situations, competitors or alternatives, pricing logic, sentences customers wrote); inferences only in the evidence list; one `save_brand_draft` per group, then name blocking gaps and required sections that are only GAP lines; one evidence list with columns path#section | statement | state | ID | source plus question list; saving is not publishing; after publication work from `get_brand_context`; never `report_brand_issue`.

**`sprint_next_step`**: calls `get_sprint_status`; tells the person their next step (title, due date, overdue or not, portal link) or the team's next step and its role; names blockers with reasons; if the step is of kind `fill_brand` and `fill_brand` or `get_brand_draft` is available, offers to start it with that method; never reports a task done or blocked (the person does that in the portal); answers in the sprint's language.

## What only works once the MCP connection exists

These exist in Brand Center today but need a connection, and some need a particular licence. Without the connection, present them as unavailable:

- Saving drafts from the AI (`save_brand_draft`): needs a licence that allows editing through the AI and an AI client that completed the Brand Center sign-in.
- The filling method delivered by the server (`fill_brand` prompt, `method` field): customer seats whose licence allows editing through the AI. Copilot Studio supports MCP tools but not prompts, so there the method must come from `get_brand_draft` or a working file.
- Creating a brand from the AI (`create_brand`): only on `brands.brixon.ai`, for a person whose plan includes a brand limit and editing through the AI. Elsewhere the person creates the brand in Brand Center.
- Uploading logos, fonts and images from the AI (`prepare_asset_upload`, `finalize_asset_upload`).
- The server completeness report after each save, and the editor status per document seen by the AI.
- Sprint status and next step from the AI (`get_sprint_status`, `sprint_next_step`).
- Reading the published brand for verification (`get_brand_context` with a task).
- Brand Check status (`get_brand_check_status`) and, for Brixon-managed brands, question import.
- Opening the upload flow from the AI (`get_upload_url`).

Not built at all (do not promise): import of a whole Markdown package into the draft; a read tool for catalog and scaffold without editing rights; a local folder check equal to the server's `completeness`; writing tokens, design map or UI library through editor or MCP; reading the customer's uploaded source material from the customer's AI.
