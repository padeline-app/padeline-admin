import "server-only";

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

let pool: Pool | undefined;

// Same access pattern as padeline-api/src/plugins/drizzle.ts (pg Pool + DATABASE_URL).
// TODO(introspect): once `npm run db:introspect` has generated lib/db/schema,
// import it and pass `{ schema }` to drizzle().
export function getDb() {
  pool ??= new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 5,
  });
  return drizzle(pool);
}
