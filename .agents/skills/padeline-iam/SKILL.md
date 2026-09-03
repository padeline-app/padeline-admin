---
name: padeline-iam
description: Admin tiers and CASL gating for Padeline Admin — roles, the permission matrix, requireAbility guards, and the admins roster. Use when touching auth, roles, permissions, abilities, or the admins feature.
---

# Admin Tiers and Access

- Three tiers on `admin_user.role` (varchar, app-typed): `OWNER | ADMIN | VIEWER` — declared in `src/lib/drizzle/types` and `$type()`-annotated on the introspected schema.
- The matrix lives in one place: `src/lib/abilities.ts` (`defineAbilitiesFor`). OWNER manages everything; ADMIN reads everything (including the roster) plus create/update/delete on Player/Venue/MeetSession; VIEWER reads operational data only. Never duplicate these rules elsewhere.
- `AdminSubject` derives from `SubjectTableOf` — a type-level map from each subject to its drizzle table. A subject without a table entry does not exist; adding one requires the mapping.
- CASL is server-side only, via `requireAbility(action, subject)` in `src/server/auth/admin.ts`: pages gate reads, every mutation in an `actions.ts` file opens with it. There is no client ability layer — the UI renders controls and the server refuses unauthorized calls with a redirect to `/denied`.
- Server Actions return error states (`{ error: string | null }`, consumed with `useActionState`) instead of throwing — invariant violations render inline in the screen; only unexpected failures reach the route's `error.tsx`.
- Sign-in JIT-provisions `admin_user` rows as `ADMIN` — never `OWNER`. The first OWNER is one manual INSERT; nobody self-crowns.
- Tier changes flow only through `src/server/admins/actions.ts` (OWNER-only): invariants — no self-role-change, the last OWNER is immovable. Revocation is a soft-delete of `deleted_at`, effective on the next request.
- The role is read from the database per request, merged with Firebase claims in `requireAdmin` — never from client input and never from Firebase custom claims (claims freeze into the session cookie; the row stays revocable).
