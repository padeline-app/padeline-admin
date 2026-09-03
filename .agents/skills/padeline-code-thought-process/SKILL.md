---
name: padeline-code-thought-process
description: How to write and edit Padeline Admin code — naming, docs-first, React 19/Next 16 idioms, React Compiler rules, no comments. Use while coding or editing any source file.
---

# Writing Code

Rules for edits and general coding, before any review. For placing new files, follow `padeline-new-file`.

## Naming

- Be explicit: a name says what the thing is and where it belongs, namespaced deliberately (`PlayersScreen`, `searchVenues`). Not verbose — every word must earn its place.
- Components: PascalCase. Functions and variables: camelCase.
- Declare components with `function`; use arrow functions only for anonymous components, unless following an existing library pattern.

## Official route, never hand-rolled

- Never write your own version of something the framework or a library provides — use the official path.
- Shadcn: read the latest docs, then install components with the CLI (`npx shadcn add <component>`). Never copy or reimplement a primitive by hand; preserve the generated layout in `src/components/ui`.
- Prefer built-in platform features before adding a dependency.

## Docs first, stable by default

- Before writing against a dependency, load its current docs: `node_modules/next/dist/docs/` for Next.js, official docs or a web search for everything else. Do not trust training data.
- Avoid legacy patterns and bleeding-edge APIs alike; target the stable/LTS surface.
- The goal is zero surprises for the next developer.

## React Compiler is enabled

- Never write `useMemo`, `useCallback`, or `React.memo` — the compiler memoizes automatically; hand memoization is noise.
- Write plain functions and values; let the compiler optimize.

## Modern idioms

- Prefer form actions, `useActionState`, `useOptimistic` over `useEffect` data fetching and manual submit handlers.

## Self-explanatory code

- Good code requires no comment. If a comment feels necessary, the naming or structure is wrong — fix that instead.
- Comments are reserved for genuinely non-obvious facts a reader could not otherwise derive.
- Extract a well-named function instead of explaining a block.

## One responsibility

- One responsibility per function or component; props in, UI out.
