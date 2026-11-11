# Design, tokens, assets and image prompts

Field group 6. Sources: the Brand Standard 2 catalog, the Brand Center MCP tool descriptions and Brand Center's upload rules.

Design has three different routes. Keep them apart, because only the first one is a brand document you can write.

| What | Where it lives | Who writes it |
|---|---|---|
| Design guidance in words, image styles, design examples | `guidelines/design.md`, `resources/documents/image-prompts.md`, `resources/documents/design-examples/*.md` | this skill (draft), the person publishes |
| Design tokens, design map, UI library | `resources/design/tokens.css`, `design-map.json`, `ui-library.json` | Brixon, in the brand's source repository; not writable through the editor or MCP |
| Logos, fonts, images (binaries) | Brand Center asset catalog (private storage) | the person, through the portal upload with personal sign-in |

## `guidelines/design.md`

Only `Gestaltungsprinzipien` / `Visual principles` is required (block); the other seven sections are gaps if empty. Write what the material shows and the person confirms:

- **Visual principles**: two to five lasting principles, each with what it means in practice. Not adjectives alone ("modern, clean").
- **Signature elements**: recognizable recurring elements you actually saw (a shape, a framing, a color block).
- **Imagery**: what kind of photos or illustrations the brand uses, and what it avoids, from real examples. Generation prompts go into image prompts, not here.
- **Logo usage**: variants that exist, minimum size or clear space only if a source states it.
- **Typography** and **Color**: name fonts and colors only as the material shows them. Exact values belong in tokens; here describe roles ("headlines in the serif, body in the sans").
- **Components**: recurring UI or layout components, in words.
- **Design examples**: refer to files under `resources/documents/design-examples/`.

Design observations (CSS, screenshots) may support design prose, never business facts or rules. Do not read colors or fonts from CSS and present them as the brand's decision; record them as `supported` with the source "website CSS" and ask the owner to confirm, or leave the exact values to the token step.

## `resources/documents/image-prompts.md`

Read by `get_image_prompts`, which agents must call before generating any image. Brand Center splits the file like this:

- `## Grundstil` / `## Base style`: the shared style, with one fenced prompt and optional reference images.
- One further H2 per style. Its first paragraph is the "use when" line; its first fenced block is the prompt; links of the form `[label](asset:<asset-id>)` are reference images.

~~~markdown
# Bild-Prompts

## Grundstil

Dokumentarische Fotos echter Arbeitssituationen, natürliches Licht.

```text
documentary photograph, natural window light, real office, muted colors, no staged smiles
```

## Team bei der Arbeit

Für Karriereseite und LinkedIn-Beiträge über das Team.

```text
two colleagues reviewing a printed plan at a workbench, candid, shallow depth of field
```

[Referenz Werkstatt](asset:team-werkstatt-01)
~~~

Write styles only from images the brand actually uses or the person describes. Asset IDs exist only after upload; until then omit the reference link and add a GAP line naming the image to upload. An absent file means `get_image_prompts` answers `available: false`, and agents then infer no style.

## Design examples

`resources/documents/design-examples/<name>.md`, one approved composition each: `Einsatz` / `Use when` and `Aufbau` / `Structure` are required within the file, `Komponenten`, `Vorschau`, `Code` optional. HTML and CSS appear only here, once each (`shared-layout.md` holds code shared by all examples). In a first BrandOS these are usually still gaps; do not invent a composition.

## Tokens, design map, UI library

Not writable through the editor or `save_brand_draft`. Every published snapshot needs tokens and a design map, so Brixon sets them up in the brand's source repository from the confirmed colors and fonts. What this skill does: collect the evidence (screenshots, brand book pages, hex values the person states) in the evidence list and name it in the handover as "for Brixon: token setup". Never write a `tokens.css` into the brand folder as if it were importable.

## Assets: logos, fonts, images

- Route: the person uploads in the Brand Center portal with their personal sign-in; the MCP tool `get_upload_url` (parameter `brand`) only opens that upload flow and grants no write access. Shared or service connections cannot upload.
- Formats: SVG, PNG, JPEG, WebP, AVIF, WOFF/WOFF2, TTF, OTF, up to 20 MB. A description is required; fonts also need family and licence or use notes. Tags help search; reuse existing tags.
- Before the first publication: uploads go into an asset inbox only for customer brands with an install contract in force; otherwise Brand Center answers "Publish a brand snapshot before uploading files".
- Descriptions describe only visible content. Do not infer identities, approvals or rights.
- Never copy binaries into the brand folder or into Git. In mode C list them in the handover: file, kind, proposed description, proposed tags, licence status.

After publication, agents read assets through `get_logos`, `get_fonts`, `get_images`, `search_assets`, `get_asset`, colors through `get_colors`, and components through `get_ui_library`/`get_ui_component`.
