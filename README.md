# Padeline Admin

Internal operations portal for managing Padeline players, venues, and sessions.

## Getting started

```bash
cp .env.template .env                    # fill DATABASE_URL with a non-production Padeline database
gcloud auth application-default login    # Firebase Admin SDK credentials locally
npm install
npm run db:introspect                    # regenerate src/lib/drizzle/schema
npm run dev
```

Open [http://localhost:3000/admin](http://localhost:3000/admin).

## Current status

Access is two-layered: a verified `@padeline.net` Google account (token claims,
checked on every request) plus an active `admin_user` row. Sign-in provisions
new rows as `ADMIN` — never `OWNER`. The first OWNER is a one-time manual
INSERT; after that, tiers (`OWNER | ADMIN | VIEWER`) are managed in the portal
at `/admin/admins`. Revoking a row takes effect on the next request. See the
`padeline-iam` skill for the full model.

## Project structure

Application code lives in `src/`. Configuration, environment files, and static assets stay at the project root.

```text
padeline-admin/
├── .agents/skills/              # Project-specific agent conventions
├── public/                     # Static files served directly
├── src/
│   ├── app/                    # Next.js routes, layouts, route handlers, and global CSS
│   │   ├── (auth)/             # Sign-in and access-denied routes
│   │   └── admin/              # Protected portal routes under /admin
│   │       ├── layout.tsx      # Portal chrome (sidebar + header) and admin gate
│   │       ├── page.tsx        # Dashboard
│   │       ├── players/
│   │       ├── sessions/
│   │       └── venues/
│   ├── components/
│   │   ├── header/             # Shared portal chrome (index.tsx)
│   │   ├── sidebar/
│   │   └── ui/                 # Shadcn-managed primitives
│   ├── lib/
│   │   ├── drizzle/            # config.ts, client.ts (server-only), generated schema/ (never hand-edit — re-introspect), types
│   │   ├── firebase/           # admin.ts (server-only), client.ts (browser), admin-auth.tsx (auth provider)
│   │   ├── format.ts           # Shared display formatting
│   │   ├── types.ts            # Shared types
│   │   └── utils.ts
│   ├── screens/                # Client screens grouped by feature
│   │   ├── admins/admins-screen/
│   │   ├── dashboard/dashboard-screen/
│   │   ├── meet-sessions/meet-sessions-screen/
│   │   ├── players/players-screen/
│   │   ├── sign-in/sign-in-screen/
│   │   └── denied/denied-screen/
│   ├── server/                 # Server-only application logic, grouped by feature
│   │   ├── auth/               # Admin checks, sessions, and auth mutations
│   │   ├── admins/api.ts       # Admin roster reads
│   │   ├── dashboard/api.ts    # Dashboard reads
│   │   ├── meet-sessions/api.ts # Meet session reads
│   │   ├── players/api.ts      # Player reads
│   │   └── venues/api.ts       # Venue reads
│   └── proxy.ts                # Lightweight request redirects
├── .env                        # Local environment values; CI/CD injects deployed values
├── components.json             # shadcn configuration
├── drizzle.config.ts           # Drizzle introspection configuration
├── next.config.ts              # Next.js configuration
├── package.json                # Dependencies and commands
└── tsconfig.json               # TypeScript configuration and import aliases
```

## How to navigate the project

Follow a feature from its URL to its data source:

```text
URL → src/app/admin/<feature>/page.tsx → src/screens/<feature>/<feature>-screen → src/server/<feature>/api.ts → src/lib/drizzle
```

- `page.tsx` is a thin server adapter: it handles route inputs, awaits the feature's server API, and renders the screen with the data as props.
- A screen is a `"use client"` folder — `<feature>-screen/index.tsx` is the screen itself and orchestrates the page's UI and logic.
- One-off, non-shadcn components for a screen live inside the screen folder; every screen and component is a folder whose `index.tsx` is the implementation (no re-export shims, no direct `.tsx` imports).
- File and folder names are kebab-case. Component names are PascalCase, functions camelCase.
- Shadcn primitives stay as generated in `src/components/ui`; install them with the shadcn CLI.
- Components genuinely shared across features (header, sidebar) live directly under `src/components/<name>/index.tsx`.
- Reads and server business logic live in `src/server/<feature>/api.ts`; mutations implemented as Server Actions live in `src/server/<feature>/actions.ts`.
- Third-party initialization lives in `src/lib`. Server adapters use `import "server-only"`; browser adapters use `"use client"`.
- Screens and components hold no database or backend implementation details.

Feature names align across `screens` and `server`, following a lightweight vertical-slice structure.

## Commands

```bash
npm run dev            # Start the development server
npm run build          # Create a production build
npm run lint           # Run ESLint
npm run db:introspect  # Generate the Drizzle schema from a non-production DB
```

The database schema is owned outside this application. Do not run introspection against production.
