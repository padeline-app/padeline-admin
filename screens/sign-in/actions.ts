"use server";

import { isAdmin } from "@/lib/auth";
import { createSession, destroySession } from "@/lib/session";
import { getFirebaseAuth } from "@/lib/firebase";
import { redirect } from "next/navigation";

export async function signInWithGoogle({ idToken }: { idToken: string }) {
  const decoded = await getFirebaseAuth().verifyIdToken(idToken);
  await createSession({ idToken });

  if (!(await isAdmin({ uid: decoded.uid }))) redirect("/denied");
  redirect("/");
}

export async function signOut() {
  await destroySession();
  redirect("/sign-in");
}
