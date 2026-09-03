"use server";

import { and, eq, isNull, sql } from "drizzle-orm";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/drizzle/client";
import { adminUser } from "@/lib/drizzle/schema/schema";
import { getFirebaseAuth } from "@/lib/firebase/admin";
import { isAdmin } from "@/server/auth/admin";
import { createSession, destroySession } from "@/server/auth/session";

const RECENT_SIGN_IN_WINDOW_SECONDS = 300;

export async function createAdminSession({ idToken }: { idToken: string }) {
  const decoded = await getFirebaseAuth().verifyIdToken(idToken);
  if (Date.now() / 1000 - decoded.auth_time > RECENT_SIGN_IN_WINDOW_SECONDS) {
    throw new Error("Recent sign-in required");
  }

  const email = decoded.email;
  if (!isAdmin({ email, emailVerified: decoded.email_verified })) {
    redirect("/denied");
  }
  if (email === undefined) redirect("/denied");

  await getDb()
    .insert(adminUser)
    .values({
      firebaseUid: decoded.uid,
      email,
      role: "ADMIN",
      lastLoginAt: sql`now()`,
      updatedAt: sql`now()`,
    })
    .onConflictDoUpdate({
      target: adminUser.firebaseUid,
      set: { email, lastLoginAt: sql`now()`, updatedAt: sql`now()` },
      setWhere: isNull(adminUser.deletedAt),
    });

  const [active] = await getDb()
    .select({ firebaseUid: adminUser.firebaseUid })
    .from(adminUser)
    .where(
      and(eq(adminUser.firebaseUid, decoded.uid), isNull(adminUser.deletedAt)),
    );
  if (!active) redirect("/denied");

  await createSession({ idToken });
  redirect("/admin");
}

export async function signOut() {
  await destroySession();
  redirect("/sign-in");
}
