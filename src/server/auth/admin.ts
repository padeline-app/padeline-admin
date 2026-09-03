import "server-only";

import { and, eq, isNull } from "drizzle-orm";
import { cache } from "react";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/drizzle/client";
import { adminUser } from "@/lib/drizzle/schema/schema";
import { verifySession } from "./session";
import { defineAbilitiesFor } from "@/lib/abilities";
import type { AdminAction, AdminSubject } from "@/lib/abilities";
import type { AdminUser } from "@/lib/types";

const ADMIN_EMAIL_DOMAIN = "@padeline.net";

export function isAdmin({
  email,
  emailVerified,
}: {
  email: string | null | undefined;
  emailVerified: boolean | undefined;
}): boolean {
  return (
    emailVerified === true &&
    typeof email === "string" &&
    email.endsWith(ADMIN_EMAIL_DOMAIN)
  );
}

export const requireAdmin = cache(async (): Promise<AdminUser> => {
  const claims = await verifySession();
  if (!claims) redirect("/sign-in");

  const email = claims.email;
  if (!isAdmin({ email, emailVerified: claims.email_verified })) {
    redirect("/denied");
  }

  const [record] = await getDb()
    .select({ role: adminUser.role })
    .from(adminUser)
    .where(
      and(eq(adminUser.firebaseUid, claims.uid), isNull(adminUser.deletedAt)),
    );
  if (!record) redirect("/denied");

  return {
    uid: claims.uid,
    email: email ?? null,
    name: typeof claims.name === "string" ? claims.name : null,
    picture: typeof claims.picture === "string" ? claims.picture : null,
    role: record.role,
  };
});

export async function requireAbility(
  action: AdminAction,
  subject: AdminSubject,
): Promise<AdminUser> {
  const user = await requireAdmin();
  if (!defineAbilitiesFor(user.role).can(action, subject)) {
    redirect("/denied");
  }
  return user;
}
