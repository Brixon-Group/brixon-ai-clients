# Setup notes: the Brixon CLI for uploads

For the people who set up or approve this plugin in a company network: client management, IT
security, or the person installing it on their own computer.

The plugin carries one command-line program, the Brixon CLI (`cli/index.mjs`). It reports
itself as `Brixon CLI` with its own version number, which is independent of the plugin's
version. Your AI uses it for two things:

- publishing finished pages as a review in Brixon Feedback (`upload`, `finalize`);
- sending one local file to an upload address that a Brixon tool prepared, for example Meta
  Creative, LinkedIn Ads or Image Generation (`put`).

Sign-in, reviews, comments and everything else run through the AI's connections to the Brixon
tools, not through the CLI. Those connections are available on activation by Brixon; Brixon
tells you their addresses and sign-in when it activates them. The CLI and these notes can be
checked and approved before that.

## 1. Requirements

| What | Requirement |
|---|---|
| Node.js | 24 LTS, version 24.14 or newer (on the 25 line: 25.4 or newer). Older versions cannot set the proxy and the trusted certificates inside the process; the CLI stops there with a message that names the version it found. Versions 25.0 to 25.3 are refused as well. Only `doctor` (to report exactly that), `--help` and `--version` run on older versions |
| Installation | None beyond the plugin. The CLI is one file with its dependencies included; it loads no packages at run time and needs no `npm install` |
| Network | HTTPS to the hosts in section 2, directly or through the company proxy |
| Certificates | Behind TLS inspection: the company certificate authority in the operating system's certificate store, or as a PEM file |

Your company distributes Node.js itself. No other program is needed.

## 2. Hosts to allow

The CLI connects only to the hosts on its allow-lists, on port 443. These are the built-in
defaults:

| Host | Used by | For |
|---|---|---|
| `feedback.brixon.ai` | `upload`, `finalize`, `doctor` | Review files for Brixon Feedback |
| `20f261d7a31cca523c1ab1bc4d8e1942.eu.r2.cloudflarestorage.com` | `put`, `doctor` | Brixon's file storage at Cloudflare R2 in the EU: uploads for Meta Creative and LinkedIn Ads |

If a ticket names another host, the CLI stops before it sends anything. It opens no port,
follows no redirects, sends no usage data and does not update itself. With a proxy configured,
connections go through it with `CONNECT`.

The hosts for sign-in and for the AI's connections to the Brixon tools are separate from this
list.

Which hosts you need depends on what you use: `feedback.brixon.ai` for reviews, the storage
host only where a Brixon tool uploads files with `put`. `doctor` checks all hosts on the lists,
so a blocked host shows up as a finding even if you do not use it.

**Image Generation** uploads reference images to a host of its own. That host is not a built-in
default. When Brixon activates Image Generation for you, Brixon names the host; allow it in the
firewall and add it to `upload.allowedOrigins` (section 3). Until then the CLI refuses tickets
for it with `not an allowed origin`, and `doctor` does not check it.

## 3. The configuration file

One file, `config.json`, holds the network settings for all Brixon command-line tools. It is
optional. Without it the CLI trusts the operating system's certificate store in addition to the
Node.js root certificates, takes the proxy from `HTTPS_PROXY`, and sends to the hosts above.

### Where it lives

| System | Managed file (written by IT) | User file |
|---|---|---|
| Windows | `C:\Program Files\Brixon\config.json` | `%APPDATA%\Brixon\config.json` |
| macOS | `/Library/Application Support/Brixon/config.json` | `~/Library/Application Support/Brixon/config.json` |
| Linux | `/etc/brixon/config.json` | `~/.config/brixon/config.json` (or under `XDG_CONFIG_HOME`) |

The managed file must be readable by standard users and writable only with administrator
rights; the CLI does not check the file permissions itself. Encoding is UTF-8. Files in the
working folder or in a repository are never read, so a project cannot redirect the CLI or its
proxy.

### Precedence

Each key is resolved on its own. The first level that sets it wins:

1. the managed file;
2. the options `--proxy`, `--no-proxy`, `--ca-file` (on `upload`, `finalize`, `put`, `doctor`);
3. the environment variables in the tables below;
4. the user file;
5. the built-in default.

A key set in the managed file is locked: values from the environment and the user file are
ignored for it, and a different option on the command line is an error. Keys the managed file
does not set stay free. To rule out proxy exceptions, set `proxy.noProxy` as well (it may be
empty). A managed `ca.mode` of `file` or `proxy.mode` of `explicit` must come with `ca.file` or
`proxy.url` in the same file.

### Keys

Network settings, at the top level of the file:

| Key | Values | Default | Option | Environment variable |
|---|---|---|---|---|
| `ca.mode` | `system`, `file`, `bundled` | `system` | | |
| `ca.file` | Path of a PEM file; absolute in a configuration file | | `--ca-file` | `BRIXON_CA_FILE` |
| `proxy.mode` | `env`, `explicit`, `none` | `env` | | |
| `proxy.url` | `http://host:port` or `https://host:port`, without user name and password | | `--proxy` | `BRIXON_PROXY` |
| `proxy.noProxy` | Host names or domains, separated by commas; in the file also a list | | `--no-proxy` | `BRIXON_NO_PROXY` |

Section `feedback`, for `upload` and `finalize`:

| Key | Values | Default | Environment variable |
|---|---|---|---|
| `feedback.allowedOrigins` | List of 1 to 20 origins `https://host[:port]` | `["https://feedback.brixon.ai"]` | `BRIXON_FEEDBACK_ALLOWED_ORIGINS` (separated by commas) |
| `feedback.uploads.parallel` | 1 to 6 files at the same time | 4 | |

Section `upload`, for `put`:

| Key | Values | Default | Environment variable |
|---|---|---|---|
| `upload.allowedOrigins` | List of 1 to 20 `https` origins | the storage host in section 2 | `BRIXON_UPLOAD_ALLOWED_ORIGINS` (separated by commas) |

A list you set replaces the default instead of adding to it. To add a host, for example the one
Brixon names for Image Generation, list the storage host as well. Put it into the user file, or
into the managed file if that file already sets the key (a managed key is locked):

```json
{
  "upload": {
    "allowedOrigins": [
      "https://20f261d7a31cca523c1ab1bc4d8e1942.eu.r2.cloudflarestorage.com",
      "https://host-brixon-named.example"
    ]
  }
}
```

**Certificates (`ca.mode`).** `system`: the Node.js root certificates plus the operating
system's store, so a company certificate authority distributed by group policy, Intune or Jamf
is trusted without further settings. `file`: the Node.js roots plus the certificates in
`ca.file`; the operating system's store is not read. `bundled`: the Node.js roots only; behind
TLS inspection every connection fails. Setting `ca.file` without `ca.mode` selects `file`.
`NODE_EXTRA_CA_CERTS` is added in the modes `system` and `file`, but not in `bundled` and not
when the managed file sets `ca.mode`.

**Proxy (`proxy.mode`).** `env`: the proxy from `HTTPS_PROXY`, exceptions from `proxy.noProxy`
or else from `NO_PROXY`; without a variable the connection is direct. `explicit`: the proxy
from `proxy.url`, exceptions only from `proxy.noProxy`. `none`: always direct. Setting
`proxy.url` without `proxy.mode` selects `explicit`. PAC files and WPAD are not evaluated; the
proxy address must be given.

**Proxy sign-in.** Configuration files and `--proxy` refuse addresses with a user name or
password. Credentials are accepted only from the environment (`HTTPS_PROXY` or `BRIXON_PROXY`
in the form `http://user:password@host:port`) and never appear in a message or in `doctor`.
Proxies that require NTLM or Kerberos are not supported: exempt the hosts in section 2 from
proxy sign-in, or offer a proxy without sign-in.

### Examples

Managed file for a network with TLS inspection and a fixed proxy without sign-in:

```json
{
  "ca": { "mode": "system" },
  "proxy": { "mode": "explicit", "url": "http://proxy.company.example:8080", "noProxy": "" },
  "feedback": { "allowedOrigins": ["https://feedback.brixon.ai"] },
  "upload": {
    "allowedOrigins": ["https://20f261d7a31cca523c1ab1bc4d8e1942.eu.r2.cloudflarestorage.com"]
  }
}
```

The two `allowedOrigins` entries lock the hosts the CLI may send to. Without them in the managed
file, an environment variable or the user file can set a different list. Sections are nested objects;
dotted names such as `"feedback.allowedOrigins"` at the top level are rejected.

Managed file when the company certificate authority is not in the operating system's store and
the hosts are exempt from the proxy:

```json
{
  "ca": { "mode": "file", "file": "C:\\ProgramData\\Company\\ca\\company-ca.pem" },
  "proxy": { "mode": "none" }
}
```

An unknown key, a wrong value or invalid JSON is an error that names the file and the key; the
command then sends nothing. A misspelled section name is treated as the section of another tool
and locks nothing; it shows up in `doctor` under `otherSections`. Run `doctor` after every
change to the managed file.

## 4. Check the setup with `doctor`

```sh
node <plugin folder>/cli/index.mjs doctor
```

The plugin folder is in the AI tool's plugin cache and changes with every plugin version. The
simplest way is to ask the AI: "Run the Brixon CLI doctor and show me the report."

`doctor` prints one JSON report and exits with 0 when everything is in order and with 2 when it
found a problem. The report contains no tickets, keys, proxy credentials or response contents
and can be attached to an IT ticket. It does contain the path of the user file and with it the
account name.

| Field | Meaning |
|---|---|
| `ok`, `cli`, `edition` | Overall result, name and version of the CLI (for example `Brixon CLI 0.3.0`) and its edition (`client`) |
| `node` | Version found and required, platform |
| `config.files` | Paths of the managed and the user file, whether each exists, and `otherSections` |
| `config.shared`, `config.feedback`, `config.upload` | The effective value of every key and where it comes from: `managed`, `flag --…`, `env …`, `user` or `default` |
| `config.ignored` | Values that do not apply, with the reason |
| `certificates` | Mode, PEM file, number of trusted certificates, handling of `NODE_EXTRA_CA_CERTS` |
| `proxy` | Mode, address without credentials, source, exceptions |
| `origins[]` | For each Feedback host: name resolution, whether the proxy is used, the certificate that arrives (`tls`), and `uploadEndpoint`, a call of the upload endpoint without a ticket. The service itself is expected to answer with HTTP 401; nothing is created |
| `upload` | The same for each host of `put`, without a test call, because these hosts accept signed addresses only |

`tlsInspection: "likely …"` together with `tls.ok: true` is the normal picture behind TLS
inspection: the chain ends at the company certificate authority, and that authority is trusted.
What decides whether reviews can be published is `uploadEndpoint.ok`.

## 5. Common findings

| Message or finding | Cause | Remedy |
|---|---|---|
| `requires Node.js 24.14 or newer` | Node.js is too old | Distribute the current Node.js 24 LTS |
| `UNABLE_TO_VERIFY_LEAF_SIGNATURE`, `SELF_SIGNED_CERT_IN_CHAIN`, `UNABLE_TO_GET_ISSUER_CERT_LOCALLY`; in `doctor` `tls.ok: false` | TLS inspection, and the CLI does not know the company certificate authority | Put it into the operating system's store (mode `system`) or name it as a PEM file (`ca.file`) |
| `PROXY_HTTP_407`, `The proxy refused the connection (HTTP 407)` | The proxy asks for a sign-in the CLI cannot perform (NTLM, Kerberos), or credentials are missing | Exempt the hosts from proxy sign-in, use a proxy without sign-in, or set user name and password through `HTTPS_PROXY` |
| `PROXY_HTTP_403` | The proxy blocks the host | Allow the host on port 443 |
| `ENOTFOUND`, `EAI_AGAIN` at `uploadEndpoint` | No proxy is set and the computer does not resolve external names | Configure the proxy |
| `ECONNREFUSED`, `ETIMEDOUT` | The direct way to the internet is blocked, or the proxy address is wrong | Check proxy address and port |
| `uploadEndpoint.status` is not 401 | A web filter, gateway or sign-in page answers in place of the service | Allow the host in web filter and data-loss prevention; check category blocks for file uploads |
| `which is not an allowed origin` | A ticket names a host that is not on the allow-list | Check the host; add it to `feedback.allowedOrigins` or `upload.allowedOrigins` only on purpose |
| `put`: `failed (HTTP 400)`, `(HTTP 413)` or `(HTTP 415)` with `The service refused the file or its type` | The receiving service does not accept this file, for example its size or format. Where it is safe, the message repeats the service's answer in quotation marks | Correct the file; the ticket may still be valid |
| `put`: `the service answered before the whole file was sent` | A proxy or gateway answers the upload itself or cuts it off, for example at a size limit | Check size limits and data-loss prevention rules for the host |
| `certificates.verification: disabled by NODE_TLS_REJECT_UNAUTHORIZED=0` | This variable switches off certificate checks in Node.js | Remove the variable and provide the company certificate authority properly |
| `it is locked by the managed configuration` | The key is set in the managed file | Leave the option out; change the managed file |
| `is not valid JSON`, `unknown key` | Error in a configuration file | Correct the file; use UTF-8, not UTF-16 |

## 6. What the CLI reads, sends and stores

- It reads the files it is given (the pages selected for a review with the files they
  reference, or the one file named for `put`), its configuration files and its own record
  `.brixon-feedback.json`. Hidden files, symlinks, paths outside the selected folder and files
  named like secrets (`.env`, `secret`, `token`) are refused. `put` sends only jpg, jpeg, png,
  gif, webp, mp4, mov, pdf, doc, docx, ppt and pptx.
- It holds no permanent key and does not sign in. Each transfer uses a short-lived ticket that
  the AI receives from the Brixon tool and passes to the CLI on standard input. The CLI does not
  write the ticket to disk and never prints it.
- It stores one file, `.brixon-feedback.json`, in the workspace: which local files were
  published to which review, without secrets. It contains the absolute path of the output
  folder and with it the account name.
- For a new review started inside a Git repository (the repository of the working folder, not
  of the output folder), it also reads the repository's name (`owner/name` from the `origin`
  remote, otherwise the folder name of the main checkout), a `client:` line in a file
  `.brixon.txt` at the top of the repository if there is one, and the folder names of the top
  two levels and of the path to the output folder, to recognise a folder named like
  `2026-q1-topic`. The repository name, that client value and that
  folder name are sent as the source of the review. Nothing of this is read outside a Git
  repository.
- The only other program it starts is `git`, to read that repository name. The file still
  contains the code for video pages, which would start `ffmpeg` and `ffprobe`; this edition
  refuses the options and reviews that lead there, so that code does not run.

## 7. Check the file

A `.mjs` file cannot be signed like an installed program. Its SHA-256 checksum is recorded in
`feedback/upstream.json` under `artifacts`. The copy of that file next to the CLI only shows
that the two belong together; to check the file against what Brixon published, compare with
`feedback/upstream.json` in the plugin's public repository at the commit of your plugin version:

```sh
shasum -a 256 <plugin folder>/cli/index.mjs
```

On Windows: `Get-FileHash <plugin folder>\cli\index.mjs -Algorithm SHA256`. The licences of
the two included open-source packages are in `feedback/THIRD-PARTY-NOTICES.md`.

## 8. Without Node.js

Tools that prepare an upload address also return a `curl` command for the same upload. The AI
uses it when Node.js is not available. curl does not read `config.json`, does not repeat a
failed transfer and does not check the address against an allow-list; the AI checks the host
and the command itself before it runs it. Without Node.js it sends only to the storage host in
section 2: a host added in `config.json`, such as the one for Image Generation, needs the CLI.
With a Node.js that is too old for uploads, `doctor` still runs, and the AI accepts the hosts
that report lists.
Publishing reviews in Brixon Feedback has no such fallback; it needs the CLI as well.

## 9. Limits and what has not been tested

- The CLI has not been tested on Windows yet, and not behind a real TLS inspection, an NTLM or
  Kerberos proxy, or a proxy that is itself reached over HTTPS. Run `doctor` on one computer in
  your network before a rollout and send Brixon the report if it shows a finding.
- The automated tests of the CLI ran on macOS only. The Linux paths follow the same code but
  have not been tried on a Linux computer.
- `put` has been tested against a local HTTPS storage only, not yet against a real signed
  storage address of Meta Creative or LinkedIn Ads, and not against a service that needs `POST`
  or its own headers.
- PAC files and WPAD are not supported.
- On Windows the managed file is always on `C:\Program Files`, also when the system drive
  differs.
- The lock of the managed file is a policy for the CLI. It does not protect against users who
  may run any program on the computer.
- `upload` reads each file completely into memory before sending; with four files in parallel
  at the size limit of 100 MB that is about 400 MB. `put` streams the file from disk.

Questions: hello@brixongroup.com
