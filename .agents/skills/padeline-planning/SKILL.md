---
name: padeline-planning
description: Plans new features, refactors, and foundation work before any code is written. Use when the user requests new work, a new plan, or says to plan, restructure, or set up foundations first.
---

# Plan Before Coding

Never jump straight into code.

## Start by asking

- Begin every task by clarifying the developer's intent — questions first, code later.
- When in doubt, ask. Confirming costs nothing; guessing wrong costs rework.
- New features expect multiple rounds of interview and clarification before a plan settles.

## Verify facts first

- Load the actual codebase into context before planning: read the files involved and confirm the patterns that really exist.
- Reason with first principles and Occam's razor — simplest solution that works wins.
- Follow the codebase's existing patterns over inventing new ones.

## Workflow

1. **Interview**: ask clarifying questions until the intent is unambiguous.
2. **Survey**: read the current structure by following a feature: URL → `src/app` route → screen → `src/server/<feature>` → `src/lib`. Confirm the actual state of the code, not the documented state.
3. **Define the target**: describe the end state using the placement rules from `padeline-new-file`.
4. **Order top-down**: layouts and routes first, then screens, then server and `lib` modules. Foundations land before feature work.
5. **Confirm**: present the plan and task list to the user before writing code. Adjust until approved.
6. **Track**: keep an ordered task list. Add newly discovered work as backlog items instead of expanding the current task.
7. **Verify each step**: after each task, run the checks from `padeline-code-review`.

## Rules

- A plan lists concrete file additions, moves, and deletions — not vague intents.
- Never mix a refactor with new behavior; keep them as separate tasks.
- If reality contradicts the plan mid-task, stop and re-confirm with the user.
