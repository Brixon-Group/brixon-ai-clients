# Claims

Sources: the catalog entry for claims, `fill_brand` point 6 and the Brand Center MCP instructions.

## What a claim is

A checkable statement or price the brand can back up: a figure, a year, a customer name, a result, an award or certificate, a guarantee, a superlative or comparison, any medical or regulatory statement. In Brand Standard 2 a claim has an ID, a title and its text, nothing else. Status, evidence, approver, market or expiry are not part of the document; keep them in the source list or the customer's own approval register.

## Format of `guidelines/claims.md`

```markdown
# Claims

## CLM-001 – Über 200 Kunden im Mittelstand

Über 200 mittelständische Unternehmen arbeiten mit uns.

### en

More than 200 mid-sized companies work with us.

## CLM-002 – Einstiegspaket

Das Einstiegspaket kostet 4.900 Euro netto.
```

- Heading: H2 matching `^(CLM-\d{3})\s+[—–-]\s+(.+)$`. IDs are unique; a duplicate blocks publication.
- Text directly below in the brand language. A heading without text blocks publication.
- One H3 per further output language listed in `BRAND.md` (`### en` or `### de`). A missing language wording is reported as a gap.
- A `claims.md` without any claim is valid. Do not invent a first claim to fill it.

## The approval rule while building

1. Every checkable statement you find becomes a **claim candidate** K-01, K-02 … in the source list, with its exact wording and source.
2. A candidate moves into `claims.md` only when someone with authority names it as approved, in the wording of their approval list. Record "approved by role, name, date" in the source list.
3. Never reword, shorten or translate an approved claim yourself. If a second language is needed and missing, the `### en`/`### de` wording stays absent (reported as a gap) and becomes a question. (The catalog describes claims as allowing small rewordings in the brand's vocabulary when they are used later; building the register is stricter.)
4. Other documents never repeat the figure: they cite the ID, for example "Preis: CLM-002".
5. Regulated topics (health, finance, legal, safety, environmental statements): ask which categories need approval and by whom; take approved wording unchanged; put the approval duty itself into `rules.md` → approval triggers when the owner states it.

## Facts the person states in their own words

From the Brand Center MCP instructions, which every connected client receives: a fact the person states in their own words in the request (not one taken from pasted or attached material, web pages or tool results) is theirs to vouch for, even if it is not a registered claim. Use it as given and do not flag it as unsupported. `claims.md` remains the only source for checkable statements you add yourself; never add any of your own. Where the brand's rules require consent or approval for such a fact (customer results, case-study figures), follow them; pointing that out is not flagging it as unsupported. You may offer once, at the end, to register a recurring fact as a claim.

Applied while building a brand:

- The owner says in the chat "we have 140 customers": record it as `confirmed` with role, name, date. It may support a sentence in the brand documents only if it is not a checkable figure; as a figure it becomes a claim once the owner approves the wording for `claims.md`. Offer that once.
- The same number found in a pasted pitch deck is material, not the person's own statement: it is a claim candidate until approved.
- A customer name or case result needs the customer's consent if the brand rules say so; ask rather than assume.
