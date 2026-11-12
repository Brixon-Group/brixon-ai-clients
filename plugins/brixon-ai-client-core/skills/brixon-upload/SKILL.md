---
name: brixon-upload
description: "Send one local file (image, video, PDF or Office document) to a Brixon tool that prepared an upload address for it, such as Meta Creative, LinkedIn Ads or Image Generation. Use whenever the result of a Brixon tool contains an upload ticket with `uploadUrl` for a local file: preferably with the Brixon CLI command `put` (Node.js), otherwise with the curl command from that result. Publishing a review in Brixon Feedback uses the `brixon-feedback` skill instead."
---

# Upload a local file to a Brixon tool

Some Brixon tools cannot receive a local file through the AI connection itself. They prepare a
one-time upload address instead: a tool such as `prepare_upload` or `prepare_reference_upload`
returns an **upload ticket**, the file goes straight from this computer to that address, and a
second tool call then uses the uploaded file.

Which of these tools you have depends on what Brixon activated for your account. If a tool is
not available in this session, say so; do not look for another way to get the file there.

There are two ways to send the file. Use the first whenever it works.

## 1. Node: the Brixon CLI (preferred)

The CLI ships with this plugin as one file. Resolve `../../cli/index.mjs` relative to this
skill's folder to an absolute path and use it as `BRIXON_CLI`. It needs Node.js 24.14 or newer.
It takes proxy and certificate settings from the Brixon configuration file, repeats the transfer
after a network error, and sends only to addresses on its allow-list.

Pass the ticket unchanged as JSON on stdin, in the same command:

```sh
node "$BRIXON_CLI" put --file "$FILE" <<'TICKET'
{ ...the ticket exactly as the tool returned it... }
TICKET
```

In PowerShell, pipe a single-quoted here-string (`@' ... '@ | node ...`).

- One call sends one file. When the tool returns several tickets, run one call per ticket and
  keep track of which handle belongs to which file.
- Pass the object that contains `uploadUrl`. Where a tool returns several slots, that is the
  `ticket` object inside each slot. `method`, `contentType`, `headers` and `expiresAt` are used
  when present; other fields, such as a ready-made curl command, are ignored. A ticket that asks
  for a form or multi-part upload is refused.
- Accepted file types: jpg, jpeg, png, gif, webp, mp4, mov, pdf, doc, docx, ppt, pptx. Hidden
  files, symlinks, empty files and files named like secrets are refused.
- Success is `"ok": true` on stdout with `file`, `bytes`, `status` and `attempts`. A field
  `inferred` means the answer to a first attempt was lost and a repeat found the file already
  stored. A failure exits with code 1 and prints `{"error": ...}`.

Then continue as the tool's result describes: usually a second tool call that takes the handle
from the ticket's result (for example its `source` or `reference_id`).

| Message | What to do |
|---|---|
| `requires Node.js 24.14 or newer` | Use way 2, or ask the person to have Node.js updated |
| `not an allowed origin` | Nothing was sent. Report the host; adding it to `upload.allowedOrigins` is a decision for the person or their IT |
| `Upload ticket expired` | Request a new ticket and send at once; tickets are short-lived |
| `HTTP 412`, `the address already holds a file` | The ticket was already used. Request a new one and check with the tool whether the file is there |
| `HTTP 403` | The storage refused the request: ticket expired, issued for another file, or changed on the way. Request a new ticket |
| Certificate or proxy errors | Run `node "$BRIXON_CLI" doctor` and show the person the report; `docs/setup.md` of this plugin explains the settings |
| `Unsupported file type` | Provide the file in one of the accepted formats |

## 2. curl (fallback)

Use curl only when Node.js 24.14 or newer is missing or may not be used on this computer.

Before running curl, check that the upload address is `https` and that its host is one of the
`put` hosts in section 2 of this plugin's `docs/setup.md`. If it is not, send nothing and report
the host: curl has no allow-list of its own.

Then run the curl command that the tool's result gives for the shell in use (`posix` for macOS,
Linux and Git Bash, `cmd` for the Windows command prompt, `powershell` for PowerShell), or the
curl line in the result text. Fill in exactly the placeholders the result names: the file path,
and where the result asks for them the ticket's `uploadUrl` and content type. Where the command
already contains the file name, run it in the file's folder or replace the name with the path.
Change nothing else, do not build your own command, and do not add options that switch off
certificate checks (`-k`, `--insecure`). If the result has no command for the shell in use,
there is no curl fallback for that file: say so.

curl does not read the Brixon configuration file. It uses its own proxy and certificate
settings and does not repeat a failed transfer. If the result gives no curl command at all,
there is no fallback for that tool: say so.

## Rules for both ways

- The upload address and the ticket's headers are credentials. Never write them into files,
  commits, notes or the answer to the person, and never send them to another service.
- Upload only the file the person asked for.
- Do not use any other program or a script of your own for the transfer.
- A finished upload is not the finished task: nothing is created in the tool until its follow-up
  call succeeds. Creating or changing ads, creatives or posts still needs the person's approval
  for that action.
