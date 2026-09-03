"use server";

import { and, eq, isNull, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/drizzle/client";
import { adminUser } from "@/lib/drizzle/schema/schema";
import type { AdminRole } from "@/lib/drizzle/types";
import { requireAbility } from "@/server/auth/admin";

export type AdminsActionState = { error: string | null };

const ROLES: AdminRole[] = ["OWNER", "ADMIN", "VIEWER"];

export async function assignRole(
  _prevState: AdminsActionState,
  formData: FormData,
): Promise<AdminsActionState> {
  const actor = await requireAbility("update", "Admin");
  const firebaseUid = String(formData.get("firebaseUid"));
  const role = String(formData.get("role")) as AdminRole;

  if (firebaseUid === actor.uid) {
    return { error: "You cannot change your own role" };
  }
  if (!ROLES.includes(role)) {
    return { error: "Unknown role" };
  }
  const lastOwnerError = await lastOwnerGuard(firebaseUid);
  if (lastOwnerError) return { error: lastOwnerError };

  await getDb()
    .update(adminUser)
    .set({ role, updatedAt: sql`now()` })
    .where(
      and(eq(adminUser.firebaseUid, firebaseUid), isNull(adminUser.deletedAt)),
    );

  revalidatePath("/admin/admins");
  return { error: null };
}

export async function revokeAccess(
  _prevState: AdminsActionState,
  formData: FormData,
): Promise<AdminsActionState> {
  const actor = await requireAbility("delete", "Admin");
  const firebaseUid = String(formData.get("firebaseUid"));

  if (firebaseUid === actor.uid) {
    return { error: "You cannot revoke your own access" };
  }
  const lastOwnerError = await lastOwnerGuard(firebaseUid);
  if (lastOwnerError) return { error: lastOwnerError };

  await getDb()
    .update(adminUser)
    .set({ deletedAt: sql`now()`, updatedAt: sql`now()` })
    .where(
      and(eq(adminUser.firebaseUid, firebaseUid), isNull(adminUser.deletedAt)),
    );

  revalidatePath("/admin/admins");
  return { error: null };
}

async function lastOwnerGuard(firebaseUid: string): Promise<string | null> {
  const [target] = await getDb()
    .select({ role: adminUser.role })
    .from(adminUser)
    .where(
      and(eq(adminUser.firebaseUid, firebaseUid), isNull(adminUser.deletedAt)),
    );
  if (target?.role !== "OWNER") return null;

  const [{ owners }] = await getDb()
    .select({ owners: sql<number>`count(*)::int` })
    .from(adminUser)
    .where(and(eq(adminUser.role, "OWNER"), isNull(adminUser.deletedAt)));
  if (owners <= 1) {
    return "Cannot demote or revoke the last owner";
  }
  return null;
}
