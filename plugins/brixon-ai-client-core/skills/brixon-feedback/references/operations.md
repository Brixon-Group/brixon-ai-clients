# Connection, upload ticket and recovery

Read only the section you need. Returning a known link needs none of this.

## Connection and CLI

Reviews, comments and sign-in run through the Brixon Feedback connection: tools whose names
contain `feedback_`, such as `feedback_prepare_upload`, possibly with a prefix. The connection is available on activation by Brixon.
If those tools are missing, it is not set up for this account or not signed in. Say so and keep
the work local; do not configure a connection from a guessed address, and never ask for or store
a permanent key. When the tools exist, `feedback_whoami {}` shows who the connection acts as and
what it may do.

The CLI is the file `../../cli/index.mjs` relative to the skill's folder (`BRIXON_CLI`). It
checks and transfers files; it does not sign in and stores no key. It needs Node.js 24.14 or
newer. It reports itself as `Brixon CLI`; where one of its messages says "the doctor command of
the Brixon CLI", run `node "$BRIXON_CLI" doctor`. Updates come with the plugin; the CLI installs
no skills.

Only `upload`, `finalize`, `put` and `doctor` use the network. `upload` and `finalize` send to
`https://feedback.brixon.ai` and nowhere else unless the configuration lists another origin.
Proxy and certificate settings come from the Brixon configuration file (`docs/setup.md` of this
plugin); pass `--proxy`, `--no-proxy` or `--ca-file` only when the person gives you the values.

## Access and version errors

Tool errors carry a `code`.

| Code | Meaning | What to do |
|---|---|---|
| `no_grant` | The review exists, but this account lacks the named permission | Report it; its owner or an administrator can share it. Never switch accounts |
| `not_found` | No such review, or an upload ID that does not belong to the link | Check the link before calling anything deleted |
| `in_trash` | The review was deleted | Say that it can be restored for a limited time; never publish a replacement |
| `outside_folder_root` | The project given with `--folder` lies outside this account's area | Use a project from `feedback_list_folders`, or leave `--folder` out |
| `possible_duplicate` | Reviews with the same name exist | Show them and ask: revision or separate series (see publish) |

If `feedback_prepare_upload` rejects a field of the manifest as unknown, the service is older
than this CLI: report that. Never remove the field.

## Upload ticket

`feedback_prepare_upload` returns a short-lived ticket. Pass it as JSON to the stdin of `upload`
or `finalize`, in the same command. Write it as one line: the object with its fields and values
unchanged, and nothing else from the tool's result. For example:

```sh
node "$BRIXON_CLI" upload --manifest "$MANIFEST_FILE" --root "$OUTPUT_DIR" <<'TICKET'
{"uploadId":"...", ...the remaining fields of the ticket... }
TICKET
```

In PowerShell, pipe a single-quoted here-string (`@' ... '@ | node ...`). In an interactive
terminal, start the command, wait for `Ready for upload ticket JSON on hidden stdin`, then send
the JSON as a single line and press Enter; input ends at the first line break.

The ticket is a credential. Never put it into command arguments, environment variables, files,
the manifest, the mapping, commits or the answer to the person, and never send it to another
service. Only `uploadId` and `reviewUrl` may be kept.

`Upload ticket targets ..., which is not an allowed origin` means the ticket points to a host
the CLI may not send to. Nothing was sent. Report the host; whether it is added to
`feedback.allowedOrigins` is a decision for the person or their IT, not something to work
around.

## Resume the same upload

Keep the original manifest, review link and upload ID.

- Uncertain answer to `feedback_prepare_upload` for a new review: send the identical saved
  manifest again, never a newly created one. The same request returns the same upload, not a
  second review. If the answer contains `result`, the upload already completed; use `finalize`.
- Uncertain completion: send the same ticket to
  `node "$BRIXON_CLI" finalize --manifest "$MANIFEST_FILE" --root "$OUTPUT_DIR"`. It repeats only
  the completion, without transferring files again.
- Ticket lost or expired: call `feedback_resume_upload {reviewUrl, uploadId}`. With `result` in
  its answer use `finalize`; otherwise repeat `upload` with the new ticket. For a feedback round
  keep `--round` and `--claim` on `upload`.
- `did not respond in time` is not a connection failure: check `feedback_resume_upload` for a
  `result` before trying again.
- A file that failed on a network error is repeated by the CLI itself up to three times.

If local files changed after the manifest was created, resolve that difference first; do not
swap the manifest of an upload in progress. Never create a second review because an answer was
uncertain.
