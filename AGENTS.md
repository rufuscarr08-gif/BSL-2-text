# Project Instructions

Use this file as the primary Codex guidance for this project.

## Shared Memory

Long-term memory lives in the user's Obsidian vault:

`/Users/rufus/Documents/Obsidian Vault`

Claude memory workflow source:

`/Users/rufus/.claude/projects/-Users-rufus/memory`

At the start of substantial work, search the vault for notes relevant to the user's request. Prefer likely project and pattern folders first:

- `/Users/rufus/Documents/Obsidian Vault/Projects`
- `/Users/rufus/Documents/Obsidian Vault/Patterns`
- `/Users/rufus/Documents/Obsidian Vault/Clients`

Read only the notes needed for the task. Surface key context briefly before making changes when that context materially affects the work.

## Writing To Memory

Codex may write concise markdown notes into the vault when:

- the user explicitly asks to save something
- a meaningful milestone is reached, such as a completed feature, important fix, commit, design decision, or reusable project insight

Do not write to the vault after every message. Keep notes short, factual, and useful as future working context.

When Codex writes a vault note, mark it clearly as Codex-authored using YAML frontmatter:

```md
---
origin: codex
agent: codex
tags:
  - codex
  - memory
---
```

If a note is related to a specific project, add a project tag such as `project/<project-name>`. If it records a decision, add `decision`. If it records implementation context, add `implementation`.

Use logical vault locations:

- project notes: `/Users/rufus/Documents/Obsidian Vault/Projects/<project-name>/`
- reusable implementation patterns: `/Users/rufus/Documents/Obsidian Vault/Patterns/`
- client-specific context: `/Users/rufus/Documents/Obsidian Vault/Clients/`
- old or superseded notes: `/Users/rufus/Documents/Obsidian Vault/Archive/`

When appending to an existing note that may have Claude-authored content, add a section headed:

```md
## Codex Update - YYYY-MM-DD
```

Include `origin: codex` in frontmatter if the whole note is newly created by Codex. Do not remove or rewrite Claude-specific metadata unless the user asks.

## Imported Claude Memory Context

The current Claude memory index says:

- Search the Obsidian vault for relevant context at session start.
- Save decisions, plans, and briefs as concise markdown notes when requested.
- Keep vault writes milestone-based rather than per-message.
- Trading-bot context exists for Confluence EA, SwingScorer, Matched Betting Bot, and shelved Polymarket work.

For trading-bot work, consult the Claude memory brief at:

`/Users/rufus/.claude/projects/-Users-rufus/memory/project_trading_bots.md`

## GitHub Collaboration

GitHub is the shared source of truth for Claude Code and Codex.

- Use `main` as the stable branch.
- Use `claude/<task-name>` branches for Claude Code work.
- Use `codex/<task-name>` branches for Codex work.
- Avoid having Claude and Codex edit the same files on the same branch at the same time.
- Prefer pull requests for merging agent work back to `main`.

## Working Style

- Prefer existing project patterns over new abstractions.
- Keep edits scoped to the requested task.
- Run relevant checks before finishing when available.
- Never overwrite user, Claude, or vault content unrelated to the current task.
