---
name: padeline-server-data
description: Use for any server-related work in Padeline Admin — src/server logic, queries, database access, schema wiring, or introspection. Drizzle only, never the Supabase SDK; migrations live in another repo, this app introspects only.
---

# Server Data

- Server-side data access goes through Drizzle (`src/lib/drizzle/client.ts`). Never use the Supabase SDK.
- Migrations are owned by padeline-api. This app never authors schema — `npm run db:introspect` regenerates `src/lib/drizzle/schema` from a non-production database only.
- Types first, clean architecture: declare enum-backed columns as TypeScript types in `src/lib/drizzle/types` before anything else, then annotate the introspected schema with Drizzle's `$type()`. Regeneration wipes annotations — re-apply them after every `db:introspect`.
- Reads in `src/server/<feature>/api.ts`; mutations in `actions.ts` as Server Actions gated by `requireAdmin()`.
- Every `src/server` module starts with `import "server-only"`; only `src/server` imports the db client at runtime.
- Auth models are separate: the consumer app uses client-side JWTs, this portal uses an httpOnly session cookie. Never call `revokeRefreshTokens` from the admin portal — revocation is Firebase-project-wide and would kill consumer sessions.
- Types come from the schema — single source of truth, no duplicated display-type layer. Derive row types with Drizzle's `InferSelectModel` over the introspected tables and import them type-only (`import type`) wherever needed, including screens. Hand-written types in `@/lib/types` are limited to what the schema cannot express (e.g. `AdminUser`, `DashboardStats`).
