# Brand Center MCP: what exists, what is planned

State of the Brand Center MCP server, November 2026. Tool names may carry a client prefix (in Claude Code with this plugin, for example `mcp__plugin_brixon-ai-client-core_brixon-brand-center__get_brand_context`). Never call a tool that is not in your tool list, and never invent parameters.

## Which tools a connection gets

| Group | Tools and prompts | Available to |
|---|---|---|
| Read | `list_brands`, `get_brand_context`, `get_brand_document`, `get_image_prompts`, `get_colors`, `get_fonts`, `get_images`, `get_logos`, `search_assets`, `get_asset`, `get_ui_library`, `get_ui_component`, `get_video_library`, `get_video_style`, `get_brand_bundle`, `get_design_contexts`, `get_upload_url`, `list_brand_issues`, `get_brand_issue` | every connection with read access to the brand |
| Brand Check | `get_brand_check_status`, `import_brand_check_questions` | registered on every connection; the server allows import only for personal editors or explicitly granted services of a Brixon-managed brand |
| Draft writing | `get_brand_draft`, `save_brand_draft` | seats whose licence allows editing through the AI |
| Filling method | prompt `fill_brand`; the same text in the `method` field of `get_brand_draft` | customer seats whose licence allows editing through the AI |
| Brand creation | `create_brand` | only some personal sign-ins: editor rights and a plan with a brand limit and editing through the AI. Not offered on `brand-center.brixongroup.com`; there the person creates the brand in Brand Center |
| File upload | `prepare_asset_upload`, `finalize_asset_upload` | personal sign-ins that may upload to the brand, where the server offers them. This plugin version does not use them (see below) |
| Install sprint | `get_sprint_status`, `list_sprint_tasks`, prompt `sprint_next_step` | seats of an install contract |
| Issues | `report_brand_issue`, `comment_brand_issue`, `close_brand_issue`, `reopen_brand_issue` | personal sign-ins with a role in the brand; closing and reopening need a role that may publish. A report records an issue in Brand Center for people to work through; it changes no brand content. This skill never uses it: gaps belong in the draft as `GAP:` lines. |

Your AI fills the brand through these tools; a person reviews and publishes it in Brand Center.

## Tools this skill uses

### `create_brand`

Parameters: `name` (1 to 160 characters), `language` (`de` or `en`), `request_id` (a new random UUID; reuse it only to retry the same creation, then the same brand comes back). Creates an unpublished brand in the person's workspace and returns, among others, `brand` (the brand ID), `portal_url` and `next`. The workspace's brand limit applies (`Brand quota reached`).

Use it only when all of this holds: the person asks for a new brand; `list_brands` shows none for it; the person confirmed the name and the language you will pass. Then continue with the returned `brand` ID in every call (`get_brand_draft`, `save_brand_draft`); the slug only names the local folder. You cannot publish the brand. Without `create_brand` in your tool list, the person creates the brand in Brand Center and you continue once `list_brands` shows it.

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

Not used by this plugin version; the person uploads logos, fonts and images in the Brand Center portal. The upload address these tools return is on a Brand Center host that the bundled Brixon CLI does not send to, and its `put` refuses SVG and font files.

What they do, so you can explain it: `prepare_asset_upload` takes `brand`, `filename` (with its extension), `size` (the exact size in bytes) and `metadata` with `id` (lowercase letters, digits and hyphens, starting with a letter or digit, at most 100 characters), `kind` (`image`, `logo`, `font`, `icon`, `illustration` or `reference`), `description` (required), and optionally `usage`, `variant`, `tags`; for a font also `family` and `license` (licence or use notes), both required for a new font, and optionally `css_family`, `weight`, `style` (`normal` or `italic`) and `delivery` (`download` or `self-hosted`). It returns `upload_id` and a ticket. `finalize_asset_upload` takes `brand` and `upload_id`, checks the file as the portal does and publishes it as a new brand revision at once; only before the first publication of a customer brand does it put the file into the brand's inbox instead. So an upload must never happen without the person's confirmation of the file and its description, and not at all once the brand is published.

### `get_upload_url`

Parameter: `brand`. Opens the personal upload flow in the portal; grants no write access itself. Works only for a published brand; before the first publication, point the person to <https://brand-center.brixongroup.com> instead.

### `import_brand_check_questions`, `get_brand_check_status`

See [brand-check.md](brand-check.md).

### `get_sprint_status`, `list_sprint_tasks`, `sprint_next_step`

See [sprint.md](sprint.md).

## The two prompts

**`fill_brand`** (method version 2026-11-20): the method this skill follows in mode A, summarised in the server's own terms (this skill calls field groups chapters and the evidence list the source list). In short: read `get_brand_draft`; content only from the customer's files, links and answers; GAP lines `GAP: [G01] what is missing. Clarified by: role.`; field groups in the order core & strategy, audiences, offers, voice, claims & rules, design, channels; at most four questions per group, others into the question list; do not change frontmatter or headings of the scaffold; new entries as H2 with H3 sections; checkable statements are claim candidates K-01 … in the evidence list, `claims.md` only approved claims in approved wording; four things always asked (customer situations, competitors or alternatives, pricing logic, three sentences the brand really wrote); inferences only in the evidence list; one `save_brand_draft` per group, then name blocking gaps and required sections that are only GAP lines; one evidence list with columns path#section | statement | state | ID | source plus question list; saving is not publishing; after publication work from `get_brand_context`; never `report_brand_issue`.

**`sprint_next_step`**: calls `get_sprint_status`; tells the person their next step (title, due date, overdue or not, portal link) or the team's next step and its role; names blockers with reasons; if the step is of kind `fill_brand` and `fill_brand` or `get_brand_draft` is available, offers to start it with that method; never reports a task done or blocked (the person does that in the portal); answers in the sprint's language.

## What only works once the MCP connection exists

These exist in Brand Center today but need a connection, and some need a particular licence. Without the connection, present them as unavailable:

- Saving drafts from the AI (`save_brand_draft`): needs a licence that allows editing through the AI and an AI client that completed the Brand Center sign-in.
- The filling method delivered by the server (`fill_brand` prompt, `method` field): customer seats whose licence allows editing through the AI. Copilot Studio supports MCP tools but not prompts, so there the method must come from `get_brand_draft` or a working file.
- Creating a brand from the AI (`create_brand`): only for some sign-ins, not on `brand-center.brixongroup.com`. Otherwise the person creates the brand in Brand Center.
- The server completeness report after each save, and the editor status per document seen by the AI.
- Sprint status and next step from the AI (`get_sprint_status`, `sprint_next_step`).
- Reading the published brand for verification (`get_brand_context` with a task).
- Brand Check status (`get_brand_check_status`) and, for Brixon-managed brands, question import.
- Opening the upload flow from the AI (`get_upload_url`).

Not built at all (do not promise): import of a whole Markdown package into the draft; a read tool for catalog and scaffold without editing rights; a local folder check equal to the server's `completeness`; writing tokens, design map or UI library through editor or MCP; reading the customer's uploaded source material from the customer's AI.
