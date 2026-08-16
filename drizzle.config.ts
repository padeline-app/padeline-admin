import "dotenv/config";
import { defineConfig } from "drizzle-kit";

// Schema source of truth is the database, owned by padeline-api.
// This app authors NO schema — `npm run db:introspect` regenerates
// lib/db/schema/{schema,relations}.ts as build artifacts.
// Never point DATABASE_URL at production for drizzle-kit commands.
export default defineConfig({
  out: "./lib/db/schema",
  dialect: "postgresql",
  extensionsFilters: ["postgis"],
  dbCredentials: {
    url:
      process.env.DATABASE_URL ??
      "postgresql://postgres:postgres@localhost:5432/development",
  },
});
