---
name: github-workflow
description: "Handle Git and GitHub for people who are not developers: sync before editing, choose main or a task branch, commit, push, open pull requests, merge and clean up the finished branch. Use when starting or finishing changes in a repository, saving work to GitHub, or handling Git conflicts. Websites and apps that deploy on merge stop at a pull request unless the person allowed merging."
---

# GitHub workflow

Own the Git work. The person describes the task and judges the result; you choose and run the
Git steps. Keep changes within the task and preserve other people's work.

## Choose the route before editing

Read the repository's own instructions first (`CLAUDE.md`, `AGENTS.md`, `CONTRIBUTING.md`,
README). They win over this skill. Then decide whether the repository deploys on merge: a
workflow that deploys from the main branch, or hosting configuration such as `vercel.json`,
`netlify.toml` or `wrangler.toml`/`wrangler.jsonc`. A repository name or a single HTML or
`package.json` file alone does not make it a website.

| Repository | Small correction | Larger task | Finish |
|---|---|---|---|
| Website or app, or anything that deploys on merge | Task branch | Task branch | Commit, push the branch, open or update a PR; merge only with merge permission (below), otherwise hand over the PR |
| Every other repository | Main is allowed when safe | Task branch | Commit, push, merge the finished task into main, remove that task branch |

A small correction is isolated, easy to review and low risk: a typo, one link, one value with a
clear replacement. New campaigns, articles, multi-file changes, restructures, code, automation
and unclear scope use a branch. A one-line workflow or deployment change is not small. An
existing task branch stays in use even if the remaining edit is tiny.

Here **main** means the repository's actual default or integration branch, whatever its name.
Never push directly to, or enable auto-merge into, a production or release branch of a website
or app, even for typos or with admin rights.

## Scope and permission

Saving to GitHub is part of finishing a repository task: commit and push the task's work, and
outside the website route also merge and clean up its finished task branch. Do not ask
separately for each routine Git step.

**Merge permission.** When the person explicitly allows merging in this session (for example
"you may merge" or "Du darfst mergen"), remember it for the rest of the session and do not ask
again. It covers the deployment that merge triggers. It never covers `--admin`, force-pushes,
changed branch protection or other people's branches. "Don't merge" withdraws it.
A local-only, draft-only, review-only or "do not push" instruction narrows the endpoint.
Read-only questions cause no commits or pushes.

Before the first push, check the actual remote, your access and which CI or deployments a push or
merge triggers. Saving to GitHub is not permission to launch ads, send messages, publish a
customer-facing page, spend money or deploy infrastructure; those need their own permission.
Private material stays within its authorized repository audience. Respect branch protection and
stricter project rules; never bypass them. Being signed in is not proof of maintainer authority.

Cleanup covers only this task's verified merged branch. It does not cover deleting files, other
branches, worktree folders or records. Never force-update history, reset away work, run
`git clean`, disable checks or change branch protection to finish a task.

## Start from the current shared version

Use the installed `git` and `gh`; check they are available first. If `gh` is missing on a Mac,
it can be installed with `brew install gh`. Sign in with `gh auth login` if needed, without
reading or printing tokens. If GitHub is unreachable, keep safe local progress and name the
remaining GitHub step.

Before switching, pulling or branching, check status, staged files, current branch, upstream and
existing worktrees. Identify which changes belong to this task. Do not stash, commit, move or
discard unrelated work to clear the way. For a clean new task: fetch, switch to main, make sure
there are no unexplained local-only commits, and `git pull --ff-only` **before** creating the
task branch or editing main directly. A failed pull stops that route; it never justifies
overwriting or forcing anything.

Reuse a branch only when it belongs to this unfinished task. Otherwise create one short
descriptive branch following the project's naming (`work/<task>` if there is none). One branch
per task, not per file. For existing changes, diverged history, another active task or worktrees,
read [Recovery and cleanup](references/recovery.md) before changing Git state.

## Save and finish

1. Check the task's diff and run the checks the changed content needs: content and link checks
   for text, the project's tests for code. Routine Git steps need no separate audit.
2. Stage the task's files explicitly, inspect the staged diff and commit with a short
   description. "Commit everything" means all work for this task, not every changed file. Keep
   secrets, `.env` contents, generated caches and unrelated material out.
3. Fetch again before pushing or merging and inspect the outgoing commits. Integrate newer
   changes safely (see the recovery reference). Push to the verified remote and branch; a
   rejected push never justifies a force-push.
4. **Website or app:** create or update the task's PR with explicit base and head. Describe the
   change, a preview if there is one, and what was actually checked. With merge permission, merge
   it as in step 5 and follow the deployment to its result. Otherwise report the checks for the
   pushed commit and hand over the PR link for review; keep the branch until it is merged.
5. **Merging a task branch:** use a PR as the record. Check its full diff, exact head commit,
   checks and required reviews. Merge only the finished task when everything passes, with
   `gh pr merge --match-head-commit` and the repository's allowed merge method (a merge commit
   if none is set). Never use `--admin`. Pending checks, pending reviews or a merge queue mean
   pending, not done. After GitHub shows `MERGED`, update local main and remove only this task's
   merged branch as described in the recovery reference.
6. **Directly on main (outside the website route):** push only the small task's commits after a
   safe sync. If protection requires a PR, take the branch route without changing protection.

A successful push proves upload; a merged PR proves integration; neither proves that a website is
live. Confirm the actual remote state before reporting it. No configured checks means "no CI
configured", not "tests passed". If offline or blocked, report the saved local work and the one
remaining step instead of claiming completion.

## Talk to the person

Keep updates short and in the person's language. Explain a real conflict or a needed decision in
terms of the content. Resolve technical mechanics yourself; never ask the person to choose
between rebase, merge, cherry-pick or refspecs. When two edits change the meaning, show both
versions and ask which content is intended.

Finish with the result and where it is, in two or three sentences, for example (only when that
state is verified):

- "Die Korrektur ist auf GitHub im gemeinsamen Stand gespeichert."
- "The campaign is on `main`. The finished work branch is removed."
- "The website change is ready for review: [PR]. Your team can check and merge it now."
