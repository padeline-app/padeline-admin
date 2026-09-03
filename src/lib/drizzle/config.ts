import "dotenv/config";
import path from "node:path";
import { defineConfig } from "drizzle-kit";

// Schema source of truth is the database, owned by padeline-api.
// This app authors NO schema — `npm run db:introspect` regenerates
// ./schema (next to this file) as committed build artifacts.
// Never point DATABASE_URL at production for drizzle-kit commands.
export default defineConfig({
  out: path.resolve(process.cwd(), "src/lib/drizzle/schema"),
  dialect: "postgresql",
  extensionsFilters: ["postgis"],
  dbCredentials: {
    url:
      process.env.DATABASE_URL ??
      "postgresql://postgres:postgres@localhost:5432/development",
  },
});
