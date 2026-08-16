import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";
import { getFirebaseAuth } from "./firebase";

const SESSION_COOKIE_NAME = "__session";
const SESSION_EXPIRES_IN_MS = 1000 * 60 * 60 * 24 * 5; // 5 days

/**
 * Exchange a Firebase ID token (from the client sign-in) for a
 * long-lived session cookie. Called from the sign-in Server Action.
 */
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

/**
 * Verify the session cookie with the Admin SDK. Returns the decoded
 * claims (uid, email, ...) or null when there is no valid session.
 * Every gated Server Component / Server Action goes through this.
 * Memoized with React cache() so layout + page checks in the same
 * request verify once (per the Next.js auth guide's DAL pattern).
 */
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
