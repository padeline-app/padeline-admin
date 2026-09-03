---
name: padeline-code-review
description: Reviews changed Padeline Admin files for standards, hygiene, and safety. Use before completing any coding task, when verifying changes, or when preparing a commit.
---

# Review Changes

Run this review before declaring a task complete and before every commit. Scope the review to the changed files (staged or touched during this task), never the whole repository.

## Checklist

### Standards
- Placement follows `padeline-new-file`: no components under `src/app`; `page.tsx` performs the server-side calls and stays thin; screens are `"use client"` orchestrators; reads live in `src/server/<feature>/api.ts`, mutations in `actions.ts`.
- Feature names align across `screens/` and `server/`.
- Every screen and custom component is a folder whose `index.tsx` is the implementation itself; no re-export-only `index.ts` shims; nothing imports a `.tsx` file directly.
- Code follows `padeline-code-thought-process`: no `useMemo`/`useCallback`/`React.memo`, current React 19/Next 16 idioms, no comments restating what code already says.
- Server Actions return error states (`{ error: string | null }`, consumed via `useActionState`) — they never throw for expected failures such as invariants or validation. Throwing is for bugs; bugs reach the route's `error.tsx`.
- No client-side authorization layer exists: components render controls and display returned errors; the server alone refuses unauthorized calls.

### Hygiene (changed files only)
- No orphaned files or empty folders left behind by moves or deletions.
- No unused imports, variables, or exports introduced by the change.
- No leftover debug logs, commented-out code, or placeholders.

### Safety
- No secrets or `.env` values read, logged, or committed.
- Mutations enforce access via `requireAbility(action, subject)` per the IAM matrix; layouts never count as enforcement because they do not re-run on soft navigation.
- No database introspection against production.

### Verify loop
1. `npm run lint`
2. `npx tsc --noEmit`
3. `npm run build` for structural or route changes

Fix findings, then re-run the loop until every section passes. Only then report the task complete or proceed with the commit.
