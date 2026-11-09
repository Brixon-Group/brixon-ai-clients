# Recovery and cleanup

Read the relevant section when the normal clean-start route does not apply, before
integrating newer commits, or before removing a merged task branch. Commands below
use values verified from the actual repository. They are examples, not a script to
run blindly. Keep technical choices out of the person's workload.

## Establish state

Useful local evidence: `git status --short --branch`, `git branch --show-current`,
`git diff --name-status`, `git diff --cached --name-status`, `git worktree list --porcelain`
and `git log --oneline <remote>/<base>..HEAD`. Inspect file contents only for known
non-secret task paths. Never dump `.env`, credential files or token-bearing remote
URLs. Resolve the remote host/owner/repo without exposing embedded credentials.

Use `gh repo view --json nameWithOwner,defaultBranchRef,visibility` for the selected
repository and read the relevant workflow triggers before remote writes. If several
remotes or forks exist, choose the authorized destination explicitly. An unreachable
remote, missing permission or ambiguous identity is not an empty/new repository.

Compare local base with the fetched remote base. Ahead-only can still contain
someone else's unpublished commits; do not push or branch from them blindly.
Detached HEAD, an unfinished merge/rebase and an unborn base need state-specific
recovery before the normal route. Preserve their work; do not automatically abort
another operation or invent a replacement `main` branch.

## Changes already exist

- **Only this task's uncommitted work is on main:** for a branch-sized or protected
  task, create its task branch at the current commit while retaining those edits.
  Commit the scoped work there, fetch and integrate the remote base. Do not pull
  through uncommitted edits. This recovery exception does not replace the clean-start
  rule to pull before new work.
- **Task commits already exist locally on main:** preserve them on a task branch
  and use a PR. Do not push main for a website, or reset main to tidy up. Leave any
  necessary base-branch repair to a separately scoped action.
- **Unrelated edits or staged changes exist:** preserve their paths and index state.
  Use an already suitable checkout or a permitted isolated worktree when possible;
  otherwise pause the conflicting Git transition while doing independent work.
  Never sweep unrelated changes into a commit or use automatic stash/pop. Ask about
  ownership only if it prevents safe separation.
- **The current branch belongs to another task:** do not reuse it just because it
  is convenient. Start from the fetched base in a permitted isolated checkout.
- **A worktree is needed:** follow the project's or host's worktree location, if one
  is set; otherwise create it outside the repository folder. Do not relocate existing
  worktrees. Do not switch or remove a branch used by another worktree.

## Shared history changed

On a clean task branch, fetch and merge its verified remote counterpart first if
someone has advanced it, then merge the fetched base when required to avoid conflicts
or stale validation. Use ordinary merges for shared branches; do not rewrite published
history. Inspect added commits for task scope before publishing the resulting branch.

For an unpublished small main commit rejected because main advanced, require a clean
worktree and inspect all local-only commits. If they are exclusively this small task,
rebase those unpublished commits onto the fetched base, check the affected result and
retry a normal push. If scope has grown or ownership is unclear, preserve the work on
a task branch and use the PR route; no force-push or reset. Do not repeatedly retry
against an actively changing branch without inspecting the new state.

Resolve mechanical conflicts when the intended result is clear. For incompatible
copy, prices, budgets or business choices, show the two actual alternatives and ask
which should remain. Never choose “ours” or “theirs” for a whole file just to finish.
Commit the resolved task result and rerun only affected checks. Stop that transition
if resolution would discard another person's work or exceed the task.

## PR and merge evidence

Always address the exact repository and PR. Reuse an existing open PR only if its
base and head match this task. Pass the intended base and head to `gh pr create`;
write multiline descriptions to a temporary file and use `--body-file`. Do not let
the CLI infer a fork destination or push an unexpected branch interactively.

Useful fields from `gh pr view`: `url,state,baseRefName,headRefName,headRefOid,isDraft,
reviewDecision,mergeStateStatus,statusCheckRollup,mergedAt,mergeCommit`. Checks and
reviews must apply to the actual current head. With `gh pr checks`, pending is not
success; failure is not permission to skip CI. Required checks/reviews remain binding
even when there is no convenient CLI summary. GitHub's merge enforcement is final.

Where merging is permitted (outside the website route, or with merge permission), examples after checks:

```sh
gh pr merge "$pr_url" --merge --match-head-commit "$reviewed_head"
# Use --squash or --rebase instead if that is the repository's established method.
gh pr view "$pr_url" --json state,mergedAt,headRefOid,mergeCommit,url
```

Do not combine merge with `--delete-branch`: cleanup has separate state checks.
A queue submission or auto-merge registration is not a completed merge. Follow the
PR to `MERGED` before cleanup; when waiting requires a handoff, name the outstanding
review/check and return the PR. Do not enable auto-merge as an alternative in website
repos. A failed check can be fixed within scope, not disabled to get a green result.

## Remove only the completed task branch

After a permitted merge, or a maintainer's independently completed merge:

1. Confirm this PR is `MERGED` into the intended base, with the expected head SHA.
   Record the PR URL, head SHA and merge commit as the recovery evidence.
2. Fetch and update local main with `pull --ff-only` only when clean and without
   unexplained local commits. If main is checked out in another active worktree,
   do not change it underneath that task. Report deferred local sync/cleanup.
3. Check that the task branch has no additional local or remote commits, no pending
   work and no other active owner/worktree. Never delete main, a release branch,
   another person's branch or a merely closed/unmerged PR branch. If anything advanced
   since the reviewed head, keep it and inspect the new work.
4. Say briefly which exact task branch will be removed and that its merged work stays
   on main; its recorded PR/head provide a recovery path. This task's routine cleanup
   is covered by the workflow unless a higher-priority rule requires confirmation.
   Remove the unchanged remote task branch with the exact expected-head lease below,
   then its local branch after switching off it. A branch already deleted by GitHub
   needs no further remote deletion. Confirm both states instead of assuming success.

Bind remote deletion to the reviewed head so a concurrent push cannot be discarded:

```sh
git push --force-with-lease="refs/heads/$task_branch:$reviewed_head" "$remote" ":refs/heads/$task_branch"
```

Here the empty source deletes only the named task ref, and the explicit lease rejects
it if the remote tip changed. This narrow conditional deletion is permitted cleanup,
not permission for a force-update of history. A lease rejection means retain the
branch and inspect the new work; do not refresh the expected SHA merely to retry.

`git branch -d <task-branch>` works for a normal merge. Squash/rebase merges can fail
that ancestry check even when GitHub has integrated the task. Do not fall back blindly
to `-D`. With verified GitHub `MERGED` evidence for the exact head, no added commits,
and no worktree using it, remove that exact local ref conditionally:

```sh
git update-ref -d "refs/heads/$task_branch" "$reviewed_head"
```

If evidence is incomplete, leave the branch and report why. Do not remove worktree
directories as part of branch cleanup; directory deletion has its own approval rule.

## Maintenance sources

Consult only when installed CLI behavior differs from these procedures; ordinary
tasks do not need to browse the manuals.

- [Git pull](https://git-scm.com/docs/git-pull): fast-forward-only synchronization.
- [Git branch](https://git-scm.com/docs/git-branch): merged-branch deletion constraints.
- [Git push](https://git-scm.com/docs/git-push): expected-head leases for remote refs.
- [Git update-ref](https://git-scm.com/docs/git-update-ref): conditional ref deletion.
- [GitHub PR merge](https://cli.github.com/manual/gh_pr_merge): head matching, allowed
  strategies, queue behavior and merge/delete distinction.
- [GitHub PR checks](https://cli.github.com/manual/gh_pr_checks): pending and failed checks.
