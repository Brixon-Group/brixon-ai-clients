---
name: setup-rules
description: "Codex only: install, update or remove the Brixon AI working rules in your global Codex instructions (AGENTS.md in your Codex home). Use when the person asks to set up or update the Brixon rules in Codex, after a plugin update, or when Codex does not seem to follow them. In Claude Code the plugin loads the rules by itself at every session start; this skill is not needed there."
---

# Set up the Brixon AI working rules in Codex

The plugin ships its working rules in `rules/CLIENT.md`. Claude Code loads that file at every
session start through the plugin. Codex has no such hook for plugins, so the rules reach Codex
only as a block in the person's global instructions file. This skill writes that block, with the
person's consent, and touches nothing else in the file.

## 1. Check the host

If this is Claude Code, say that the rules load automatically there and stop.

## 2. Read the rules

Read `../../rules/CLIENT.md`, relative to this `SKILL.md`. Use its text exactly as it is. If the
file is missing, say so and stop; never write rules from memory.

## 3. Find the target file

The Codex home is the folder in the `CODEX_HOME` environment variable, otherwise `.codex` in the
person's home folder. The target is `AGENTS.md` there; it may not exist yet.

If `AGENTS.override.md` exists in the Codex home and is not empty, Codex reads it instead of
`AGENTS.md`. Tell the person, and use `AGENTS.override.md` as the target if they agree. If they
decline, say that Codex will not see rules in `AGENTS.md` while the override exists, and stop.

## 4. Compare

The block is exactly these lines, each ending with a newline:

1. `<!-- BEGIN brixon-ai-client-core:rules -->`
2. the full text of `rules/CLIENT.md`, ending with a newline
3. `<!-- END brixon-ai-client-core:rules -->`

Marker lines count only as whole lines without extra characters. Look for them in the target:

- **One BEGIN and one END after it, text between them identical to the rules** (ignore only
  CRLF versus LF line endings): say the rules are up to date and stop.
- **One BEGIN and one END, text differs:** the block will be replaced.
- **Neither present, or no target file:** the block will be added at the end (or the file created).
- **Anything else** (one marker missing, END before BEGIN, several blocks): do not edit. Show the
  person the lines and ask how to clean them up.

## 5. Ask before writing

Tell the person in two or three sentences: which file, whether the block is added or replaced
(and in short what changes), and that everything outside the two marker lines stays as it is.
Write only after they agree.

## 6. Write and check

- Change the file with a targeted edit. Never rewrite the whole file or retype other content.
  Use the file's existing line endings (CRLF or LF) for the lines you write.
- Replacing: change only the lines between the markers.
- Adding to an existing file with content: if its last line has no newline, add one; then add one
  blank line and the block. Adding to a new or empty file: write only the block.
- Create the Codex home folder only if it does not exist.
- Read the file back and confirm the text between the markers matches `rules/CLIENT.md` and that
  nothing outside them changed.

Tell the person the rules apply in new Codex sessions; a session that is already running keeps
its old instructions. After a plugin update, running this skill again brings the block up to date.

## Remove the rules

If the person wants the rules removed, show the block, and after they agree delete the two marker
lines and everything between them. If the line directly before BEGIN is blank, delete it too.
Leave the rest of the file unchanged, and keep the file even if it ends up empty.
