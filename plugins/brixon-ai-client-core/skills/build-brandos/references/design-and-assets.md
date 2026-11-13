# Design, tokens, assets and image prompts

Chapter 6. Sources: the Brand Standard 2 catalog, the Brand Center MCP tool descriptions and Brand Center's upload rules.

Design has three different routes. Keep them apart, because only the first one is a brand document you can write.

| What | Where it lives | Who writes it |
|---|---|---|
| Design guidance in words, image styles, design examples | `guidelines/design.md`, `resources/documents/image-prompts.md`, `resources/documents/design-examples/*.md` | this skill (draft), the person publishes |
| Design tokens, design map, UI library | `resources/design/tokens.css`, `design-map.json`, `ui-library.json` | Brixon, in the brand's source repository; not writable through the editor or MCP |
| Logos, fonts, images (binaries) | Brand Center asset catalog (private storage) | the person, through the portal upload with personal sign-in |

Finding out the brand's design facts is your job in this chapter, when the design part is yours: the logo rules, the fonts, the colors. The rules go in words into `guidelines/design.md`, the exact values into the design values table for Brixon.

## Finding the design facts

If the brand is published, read `get_colors`, `get_fonts` and `get_logos` first: what they return stands, and you write no table. A differing value in the material is an open question and a request to Brixon.

Otherwise look in this order, and keep for every fact where it came from:

1. **Existing brand documents**: a brand book, style guide or logo guide. What it states is `supported`.
2. **Logo files the person supplies**: which variants exist (full logo, mark, wordmark; color, one-color, negative; horizontal, stacked) and in which formats. An SVG is text: a color written in it is a value with the file as source. Read the files for this, never copy them.
3. **The website's styles**: the stylesheets its pages load, where you can read them. They are read only for design values and do not count toward the page limit. Look for named values (custom properties) and font families. A value from CSS is an observation: it stays not confirmed until the owner confirms it.
4. **Screenshots, slides, posts**: how the logo is placed, on which backgrounds it stands, which elements recur. What you see is a question to the person ("auf euren Folien steht das Logo oben links: ist das die Regel?"), not a rule. A color seen in an image is not a value: never read a hex value off a picture.
5. **The person**: ask what the material leaves open, required sections first, within the four questions of the chapter.

What to find out about the logo:

| Point | A good answer |
|---|---|
| Variants | which exist and when each is used ("the mark alone only as profile image") |
| Backgrounds | which variant on light, dark and photo backgrounds |
| Size and clear space | the minimum size and the free space around it, as a source or the person states them |
| Placement | where it sits in layouts (slides, documents, posts) |
| Not allowed | what the owner or a brand document rules out, each with what to use instead ("never recolored: on color backgrounds the one-color variant") |
| With other logos | how it stands next to partner or customer logos |

About fonts and colors: which the brand uses, for what (headlines, body; text, background, accent), and where each value is stated.

## `guidelines/design.md`

Only `Gestaltungsprinzipien` / `Visual principles` is required (block); the other seven sections are gaps if empty. Write what the material shows and the person confirms:

- **Visual principles**: two to five lasting principles, each with what it means in practice. Not adjectives alone ("modern, clean").
- **Signature elements**: recognizable recurring elements you actually saw (a shape, a framing, a color block).
- **Imagery**: what kind of photos or illustrations the brand uses, and what it avoids, from real examples. Generation prompts go into image prompts, not here.
- **Logo usage**: the rules you found, one short line each. Write a rule only when a source states it or the person confirms it. Points nobody could answer share one GAP line that names them and who can answer; never a plausible default, never an invented minimum size or clear space.
- **Typography** and **Color**: name fonts and colors as the material shows them and describe their roles ("headlines in the serif, body in the sans", "the orange only as accent, never for text"). Exact values (hex codes, weights, sizes) do not go here: they go into the design values table.
- **Components**: recurring UI or layout components, in words.
- **Design examples**: refer to files under `resources/documents/design-examples/`.

Design observations (CSS, screenshots) may support design prose, never business facts or rules. Do not present colors or fonts read from CSS as the brand's decision before the owner confirms them.

## Design values for Brixon

The exact values Brixon needs to set up the tokens. One table, kept with the source list of the design part: with a local folder under `Für die Übergabe` / `For the handover` in the progress file of the design part, and from there in `source-material/handover.md`; without a folder, as one block the person saves with the handover. It never goes into a brand document.

German brand:

```markdown
### Designwerte für Brixon

| Art | Name | Rolle | Wert | Quelle | Bestätigt von |
|---|---|---|---|---|---|
| Farbe | Tannengrün | Überschriften, Text | #1F4D3A | markenhandbuch.pdf, S. 4 | Anna Beispiel, Inhaberin, 2026-11-13 |
| Farbe | --color-sand | – | #E8DFCF | Website CSS, /assets/site.css, gelesen 2026-11-13 | nicht bestätigt |
| Schrift | Source Serif 4 | Überschriften | Regular, Semibold | markenhandbuch.pdf, S. 5 | Anna Beispiel, Inhaberin, 2026-11-13 |
| Maß | Eckenradius | Buttons | 8 px | Website CSS, /assets/site.css, gelesen 2026-11-13 | nicht bestätigt |
```

English labels: `Design values for Brixon`; columns `Kind`, `Name`, `Role`, `Value`, `Source`, `Confirmed by`; kinds `color`, `font`, `measure`; `not confirmed`.

- One row per value. `Kind`: color, font or measure (a radius, a spacing, a font size), a measure only where a source states it.
- `Name` as the source or the person gives it; a custom property name counts, otherwise use a plain color word. `Role` as stated, else `–`. Never derive a role from how often a value occurs.
- `Value` exactly as the source writes it: no conversion between color formats, no rounding, nothing measured from an image. For a font, the weights as stated, else `–`. The same value in another notation (`#1f4d3a`, `#1F4D3A`) is one row with both sources.
- `Source` as in the source list: the file and place, the stylesheet with the date read, or the person.
- `Confirmed by`: name, role and date of someone who confirmed the row in this conversation, else `nicht bestätigt` / `not confirmed`. A value from a brand document is `supported` and still needs it; an owner or approver named in a document is no confirmation.
- Show the table to the person once, as one of the chapter's questions, after what the principles need. Rows that stay unconfirmed stay so; the handover names who can confirm them, often the designer or the agency. Brixon sets up tokens from confirmed rows.
- Two sources with different values for the same thing: one row each, and ask which holds. Do not pick.
- Font licences and font files belong to the asset list below, not here.

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

Not writable through the editor or `save_brand_draft`. Every published snapshot needs tokens and a design map, so Brixon sets them up in the brand's source repository from the confirmed colors and fonts. What this skill does: fill the design values table above and name it in the handover as a step for Brixon, in plain words (German: "Für Brixon: genaue Farben und Schriften einrichten"). Never write a `tokens.css` into the brand folder as if it were importable.

## Assets: logos, fonts, images

- Route: the person uploads in the Brand Center portal with their personal sign-in; the MCP tool `get_upload_url` (parameter `brand`) only opens that upload flow and grants no write access. Shared or service connections cannot upload.
- Formats: SVG, PNG, JPEG, WebP, AVIF, WOFF/WOFF2, TTF, OTF, up to 20 MB. A description is required; fonts also need family and licence or use notes. Tags help search; reuse existing tags.
- Before the first publication: uploads go into an asset inbox only for customer brands with an install contract in force; otherwise Brand Center answers "Publish a brand snapshot before uploading files".
- Descriptions describe only visible content. Do not infer identities, approvals or rights.
- Never copy logos, fonts or images into the brand folder or into Git. When working with local files, note them in the progress file of the part, and the handover lists them in `source-material/handover.md`: file, kind, proposed description, proposed tags, licence status. For a logo, the kind names the variant (for example "logo, negative, horizontal"), so the list shows which variants exist and which are missing.

After publication, agents read assets through `get_logos`, `get_fonts`, `get_images`, `search_assets`, `get_asset`, colors through `get_colors`, and components through `get_ui_library`/`get_ui_component`.
