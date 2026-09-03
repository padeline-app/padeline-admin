import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";
import { getFirebaseAuth } from "@/lib/firebase/admin";

const SESSION_COOKIE_NAME = "__session";
const SESSION_EXPIRES_IN_MS = 1000 * 60 * 60 * 24 * 14; // 14 days — Firebase's maximum

export async function createSession({ idToken }: { idToken: string }) {
  const auth = getFirebaseAuth();
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: SESSION_EXPIRES_IN_MS,
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, sessionCookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_EXPIRES_IN_MS / 1000,
    path: "/",
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export const verifySession = cache(async () => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionCookie) return null;

  try {
    const auth = getFirebaseAuth();
    return await auth.verifySessionCookie(sessionCookie, true);
  } catch {
    return null;
  }
});
