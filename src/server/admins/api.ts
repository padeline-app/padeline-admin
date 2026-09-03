import "server-only";

import { asc, isNull } from "drizzle-orm";
import { getDb } from "@/lib/drizzle/client";
import { adminUser } from "@/lib/drizzle/schema/schema";

export async function listAdmins() {
  return getDb()
    .select({
      firebaseUid: adminUser.firebaseUid,
      email: adminUser.email,
      role: adminUser.role,
      lastLoginAt: adminUser.lastLoginAt,
      createdAt: adminUser.createdAt,
    })
    .from(adminUser)
    .where(isNull(adminUser.deletedAt))
    .orderBy(asc(adminUser.email));
}

export type ListAdminsResult = Awaited<ReturnType<typeof listAdmins>>;
