---
name: brixon-feedback
description: "Publish finished HTML pages, social-post batches and other visual work as one review in Brixon Feedback and return its review link, publish a revision, read reviewer comments, or apply one round of feedback. Use for design handoffs and for requests like \"what feedback is open?\" or \"apply the feedback\". Needs the Brixon Feedback connection, which Brixon activates for your account. Text-only critique and explicit local-only delivery stay local."
---

# Brixon Feedback

Brixon Feedback hosts finished visual work for review: reviewers open one link, mark elements or
text, comment and approve. This skill publishes a batch as one review, publishes revisions into
the same review, reads the comments and applies one round of them.

Publishing a review does not authorize posting to social networks, deploying a website or
uploading other files from the workspace. An explicit local-only, no-upload or draft-only
instruction always wins: verify the files locally and return their paths.

## What has to be in place

- **The Brixon Feedback connection.** It is available on activation by Brixon and is not part of
  this plugin's connections yet. If no tools whose names contain `feedback_` (for example
  `feedback_prepare_upload`, possibly with a prefix) are available in this session, the
  connection is not set up: keep the finished files, say that the review could not be
  published and why, and never invent a review link or a server address.
- **The Brixon CLI.** It ships with this plugin as one file. Resolve `../../cli/index.mjs`
  relative to this skill's folder to an absolute path and use it as `BRIXON_CLI`. It needs
  Node.js 24.14 or newer; nothing has to be installed with npm. When a command fails on the
  network, the certificate or the Node.js version, run `node "$BRIXON_CLI" doctor` and show the
  person its report; the plugin's `docs/setup.md` explains the settings their IT can make.

Video pages are not part of the customer offering: do not use `--video`, `--timeline`,
`--captions` or `--review-copy`.

## Terms

A **review** is one collection of pages with one review link. A **project** is a folder that
groups reviews. A **page** is one reviewable item, for example a landing page or one social
post. The tool names keep older wording: `feedback_list_projects` lists reviews,
`feedback_list_folders` lists projects, `feedback_update_project` renames or moves a review.
The link identifies a review; it does not grant access by itself.

## Existing link only

If the review link is already known, return it exactly. Otherwise run, from the workspace root:

```sh
node "$BRIXON_CLI" target --collection "$NAME_ID_OR_URL"
```

or `target` alone for a follow-up to the batch last published from this workspace, and return
its `reviewUrl`. This needs no connection, upload or browser. If local edits exist, say that
they are not published yet. Without a matching local mapping, search with
`feedback_list_projects {q, view: "all", includeHidden: true}` (`q` set to the name, following
`nextCursor` with the same filters to the end); return a
single review with the same name, ask when several match, and ask for the link when none does.
Never guess a link.

## Select the work

| Request | Read |
|---|---|
| New batch, upload, or a requested revision | [Publish](references/publish.md) |
| Open comments, a feedback summary, or applying feedback | [Read and apply](references/apply.md) |
| Access error, upload ticket, interrupted upload | [Operations](references/operations.md), relevant section only |

Return the review link first. After a successful publication, skip extra audits and status
calls unless a concrete open issue needs them.
