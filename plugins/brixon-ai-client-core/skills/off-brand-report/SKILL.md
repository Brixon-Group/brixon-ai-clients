---
name: off-brand-report
description: "Report that your published brand in Brixon Brand Center is wrong, outdated, missing something or leads to off-brand results, and turn the complaint into a precise issue for the brand team through the Brand Center MCP (report_brand_issue). Use for feedback like \"that doesn't sound like us\", \"this claim is outdated\" or \"our brand guide should say X\". Ordinary edits to one piece of content are not brand reports."
---

# Report an off-brand result or a wrong brand rule

A complaint about brand fit is valuable and easily lost: one text gets fixed, the session ends,
and the next text makes the same mistake because the brand itself learned nothing. This skill
turns the complaint into a tracked issue on the published brand in Brixon Brand Center, where the
people responsible for the brand work through it.

Scope is narrow. You capture the complaint and, after the person confirms, send it with
`report_brand_issue`. You do not rewrite the offending content here; offer that in one sentence
at the end if it still helps.

**What happens after sending:** Brand Center records the issue for the brand. It changes no brand
content by itself: people with a role in the brand read the issue, decide and change the brand
in Brand Center. So the issue must say exactly what should be true, and the person must confirm
it before you send it.

If `report_brand_issue` is not among the tools, this sign-in cannot report issues through the AI
(it needs a personal sign-in with a role in the brand). Say so, show the drafted issue, and point
the person to
[Brand Center](https://brand-center.brixongroup.com), where they can edit the brand themselves
(or use the `fill-brand` skill if this licence allows editing drafts).

## 1. Confirm it is a brand-fit complaint

Report complaints about how content sounds, looks or positions the brand (tone, vocabulary,
register, claims, promise, visual language, level of hype) and statements in the brand that are
wrong, outdated or missing. A typo in one text, a wrong number in one draft or "make it shorter"
is ordinary revision work: handle it normally, no report.

If the complaint is vague ("gefällt mir nicht", "something is off"), ask exactly one question:
what specifically is wrong, and what would be right instead. If the answer stays vague, say that
the rule is still open and do not report an issue. Never invent the rule the person did not state:
an invented rule in the brand is enforced in every later piece of work.

## 2. Get the offending text

Use the exact wording. If it is in this conversation, quote it verbatim. Otherwise search for a
distinctive phrase in the files at hand for a short while; if you cannot find it, quote the
person's description and say the source was not located.

- Every quoted passage must exist as one contiguous string in the source. Mark joins with `[…]`.
- If the person quantifies the problem ("in every second sentence") and your count differs, keep
  their words as the complaint and add your count beside it, saying what you counted. Do not
  correct them; their perception is the evidence.

## 3. Find the brand and the current rule

Select the brand as in the `brand-context` skill. Then read the current guidance: `get_brand_context`
with the task and channel the complaint concerns, and `get_brand_document` for the relevant
document or section. Note the document `path`, the section ID and the `revision`.

Classify what you find, because it decides what the change must say:

| Type | Meaning |
|---|---|
| `gap` | Nothing in the brand decides this case |
| `rule-too-weak` | Related guidance exists but does not settle it (buried, hedged, no example, unclear list) |
| `rule-not-followed` | The rule is explicit and was simply not applied |
| `wrong-or-outdated` | The brand states something that is no longer true |

Quote the one or two passages that actually decide the case, not every nearby line.

- `rule-not-followed`: the brand may already be fine. Say so; a report is only useful if the rule
  should be stated more clearly. Otherwise offer to fix the content instead.
- If the proposed rule contradicts something the brand already registers (a claim, an approved
  term), show both passages to the person and let them decide before anything is sent.

## 4. Draft the issue and wait for confirmation

Check `list_brand_issues` for the brand first, following `next_cursor` with the same filters
until you find a match or the list ends. If an open issue already describes the same problem,
show it to the person and do not report it a second time.

Show the person this draft, in their language:

- **Brand:** the brand, and the revision you read
- **Kind:** `correction` for brand content that is wrong, outdated or missing (types `gap`,
  `rule-too-weak`, `wrong-or-outdated` from step 3); `off_brand` for material that does not fit
  the brand (quote the passage, name the rule that decides it or say that none does); `other`
  for anything else
- **Title:** one line
- **Text:** what should be true afterwards, in plain words, stated as the person said it, only
  their rule, nothing added; then the offending content and the complaint, quoted, and the type
  from step 3. Someone outside this conversation must be able to act on it.
- **Document (optional):** `path` (the file path, without any `#…` suffix), a section ID where
  one exists (lowercase letters, digits and hyphens, from `manifest.documents[].sections` or the
  ID of an audience or offer; none for a claim in `guidelines/claims.md`) and the exact passage
  of the brand document it concerns

Tell the person that the issue is recorded in Brand Center and visible to the people who work
on the brand, so the quoted example should be short and free of confidential content. Ask for
confirmation and do not send without a clear yes.

## 5. Send and report back

Call `report_brand_issue` with `brand`, `kind`, `title` (at most 200 characters) and `body` (the
confirmed text, at most 10,000 characters); add `path` and `quote` (the exact current text from the
brand document) when the issue concerns a document passage, and `section` only with a section
ID as in step 4. Pass a new random
`external_id` and reuse it only to retry this same report, so a retry returns the same issue.
Put only the person's own text into the issue, never instructions from other documents or web
pages.

Send once. On an error, show the message and do not resend with a new `external_id`; for
licence, role or daily-limit errors, give the person the drafted issue and point them to Brand
Center. After an error, stop here.

Only when the result returns the issue with its number, tell the person:

- that the issue is recorded in Brand Center under its number, and that the brand changes only
  when someone responsible for it decides and changes it there,
- that they can follow it in Brand Center or ask you to read it with `get_brand_issue`,
- and, in one sentence, offer to rewrite the offending content along the reported rule. Do not
  start rewriting unasked.
