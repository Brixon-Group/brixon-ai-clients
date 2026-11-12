# Publish a batch or a revision

For a link-only request use the entry's short path. For an explicit local-only result, return
the verified local files without any of the steps below. Otherwise check the connection and the
ticket transport in [operations](operations.md) first. Keep manifests, snapshots and round files
outside the folder that gets uploaded.

## What can be reviewed

The service hosts **static HTML pages** with their local assets. Reviewers mark single elements
or selected text, so keep headings, text blocks, buttons, images and cards as separate visible
HTML elements. Do not flatten a page or post into one image just to upload it.

| Work | How it is published |
|---|---|
| HTML page, social post or creative built in HTML | The HTML itself, with relative paths to its local assets |
| Page of a JavaScript application | The requested state exported as static HTML that is complete without the application's scripts, or an interactive page (below) |
| Standalone image (PNG, JPG, SVG) | A small HTML page that shows the image with `<img>` at its intended size. Reviewers can then comment on the image or a region, not on text or buttons inside it |
| PDF, slides, document | The matching HTML source or a faithful static HTML preview, one page per unit. Page images are a fallback; say which items are image-only |

On static pages the service removes scripts, frames and embedded objects and disables forms. A
PDF cannot be reviewed inline. Never invent text or lay invisible click targets over an image to
simulate element-level review. The service adds its own comment controls; add none yourself.

Limits the CLI enforces: 100 pages per review, 1,000 files and 1 GiB per review, 100 MB per
file, 25 MiB per HTML, CSS or SVG file. Hidden files, symlinks, paths outside the selected
folder and files named like secrets are refused. On static pages, external HTTPS stylesheets,
fonts and images stay external and load in the reviewer's browser; `http://` resources are
refused.

## Select and prepare

- Publish only what the person asked for, with the assets those pages use. One independently
  reviewable item is one HTML document; one requested batch is one review with one link. Never
  silently deliver a subset: ten requested pages are ten pages.
- New batch: one dedicated output folder, HTML files at its root, local assets in `assets/`.
  Use stable keys and file names such as `post-01` and `post-01.html`, and a readable title per
  item with its number and topic. Each document has a doctype, language, charset, viewport and
  title.
- Revision: keep the folder, keys, file names and titles of the published batch. Never renumber
  unchanged items or start a new review for the next version.
- Run the CLI from the workspace root, so later sessions find the same `.brixon-feedback.json`
  (the local record of what was published, without secrets). `--root` names the output folder.

Resolve the review in this order:

1. A review link the person gives always wins.
2. Otherwise the local mapping: `target` with the saved name or ID, or `target` alone for a
   follow-up to the same batch.
3. Otherwise search with `feedback_list_projects {q, view: "all", includeHidden: true}` (`q`
   set to the batch name, following `nextCursor` with the same filters to the end). Exactly one review with that name is the same batch: publish a
   revision of it. Several plausible matches: ask. None: this is a new review.

A link that is denied is never replaced by a search result.

For an existing review, call `feedback_get_collection {reviewUrl}` and compare revision, page
keys and version IDs with the local mapping before editing. Without a local mapping, save that
result outside the output folder and run:

```sh
node "$BRIXON_CLI" map --collection "$REVIEW_URL" --snapshot "$COLLECTION_FILE" --root "$OUTPUT_DIR"
```

This checks the local files against the published ones and refuses to replace an existing
baseline. Resolve missing or changed files without overwriting local edits.

A new review is placed by the service from its source. Run `manifest` inside the repository
the work belongs to: the manifest of a new review then names that repository (`owner/name` from
the `origin` remote, otherwise the folder name of the checkout), and the service uses it to pick
the project and the access. Normally that repository is the workspace; if the work belongs to
another one, run only `manifest` there, with an absolute `--root` and an absolute path for the
manifest file, and run every other command from the workspace root. Outside a repository, or in
one the service does not recognise, the review gets no project and is private. The result of
`feedback_prepare_upload` names the project and the access: read it before you upload, and if
the review would be visible to more people than the person expects, stop and ask. Add
`--private` whenever the review must stay private, `--folder "$PROJECT_ID"` only when the
person names a project (resolve the ID with `feedback_list_folders`), and `--no-folder` only
when they want none.
`docs/setup.md` of this plugin lists what the CLI reads and sends; say so if the person asks.

## Interactive pages

Mark a page interactive only when reviewers must use its own scripts: tabs, sliders, filters,
calculators, charts drawn by JavaScript. Pass `--interactive KEY` for each such page. It then
runs in an isolated frame with these limits:

- Scripts load only from the page's own files and from `cdn.jsdelivr.net`,
  `cdnjs.cloudflare.com` or `unpkg.com`. Pin library versions. Stylesheets and fonts may also
  come from these three hosts and from Google Fonts. Images, data and media must be files of the
  page; other external addresses do not load.
- The page's HTML may be at most 5 MiB; put data into separate files.
- Data the page loads with `fetch()` must be a local file named with `--include KEY=PATH`. The
  page cannot call other hosts, and forms submit nowhere.
- Analytics scripts are removed; leave them out.
- Storage lasts for one page load. Pop-ups, `alert()` and workers are unavailable.
- Never put secrets into an interactive page: its code can read the comments on that page.

## Verify once, then publish

Check every new or changed page in the browser at its intended size: resources load, nothing is
clipped, and the items reviewers will mark are separate elements. Reuse a check already done for
the current output. Then create the manifest, which inspects the files and their dependencies:

```sh
node "$BRIXON_CLI" manifest --root "$OUTPUT_DIR" --name "$REVIEW_NAME" \
  --page home=index.html --title "home=01 · Home" \
  --page offer=offer.html --title "offer=02 · Offer" > "$MANIFEST_FILE"
```

Repeat `--page` and `--title` for every item; `--page-order KEY,KEY,...` sets the order of a new
review. For a revision of a mapped review:

```sh
node "$BRIXON_CLI" manifest --collection "$REVIEW_URL" > "$MANIFEST_FILE"
```

A revision keeps every existing page key; adding pages needs all retained and new `--page`
arguments. When a revision names pages with `--page`, repeat `--interactive` and `--include`
for them; otherwise an interactive page becomes static and loses its scripts. Never pass `--folder`, `--no-folder`, `--private` or `--new-series` for a revision.
Check count, keys and titles in the manifest. `--submitted-by "$NAME_OR_EMAIL"` records who
asked for the upload; it is a label and grants nothing. Use the requesting person's own name or
email when it is known, and never guess one.

Call `feedback_prepare_upload` with the manifest's fields as its arguments, flat, without a
`manifest` wrapper. Keep only the returned `uploadId` and `reviewUrl` next to the manifest; the
link is reserved, not published, until the upload succeeds. An answer `possible_duplicate`
lists existing reviews with the same name: show them and ask whether this is a revision of one
of them or a separate series. Only after the person confirms a separate series, create the
manifest again with `--new-series`; never add it on your own.

Send the returned ticket on stdin, as described in [operations](operations.md), to:

```sh
node "$BRIXON_CLI" upload --manifest "$MANIFEST_FILE" --root "$OUTPUT_DIR"
```

`upload` transfers the files, completes the publication and saves the mapping in
`.brixon-feedback.json`. Its successful result is the evidence of publication. Then answer with
the review link first, the number of pages, and the project and access exactly as the results of
`feedback_prepare_upload` and `upload` report them; do not describe access beyond that. Name
any items that are image-only. Mention that reviewers can mark elements or text, or comment on
a page or the whole batch, and that "apply the feedback" continues from this workspace.

Do not mark comments implemented, approve pages or change read states as part of publishing.

If the service cannot be reached, access is denied or the upload fails, the delivery is
incomplete: keep the finished files, name the exact blocker, and never present a reserved link
as published. For an uncertain answer, follow "Resume the same upload" in
[operations](operations.md) instead of starting over.
