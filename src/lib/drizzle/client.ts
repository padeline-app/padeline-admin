import "server-only";

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as relations from "./schema/relations";
import * as tables from "./schema/schema";

const schema = { ...tables, ...relations };

let pool: Pool | undefined;

export function getDb() {
  pool ??= new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 5,
  });
  return drizzle(pool, { schema });
}
