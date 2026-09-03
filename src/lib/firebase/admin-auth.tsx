"use client";

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import {
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  type AuthProvider,
} from "firebase/auth";
import { getFirebaseClientAuth } from "@/lib/firebase/client";
import { createAdminSession } from "@/server/auth/actions";
import type { AdminUser } from "@/lib/types";

const AdminAuthContext = createContext<{
  user: AdminUser | null;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  pending: boolean;
  error: string | null;
} | null>(null);

export function AdminAuthProvider({
  user = null,
  children,
}: {
  user?: AdminUser | null;
  children: ReactNode;
}) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function createSessionFromPopup(provider: AuthProvider) {
    setPending(true);
    setError(null);
    try {
      const result = await signInWithPopup(getFirebaseClientAuth(), provider);
      const idToken = await result.user.getIdToken();
      await createAdminSession({ idToken });
    } catch (e) {
      // redirect() throws internally — let Next handle its own control flow
      if (e && typeof e === "object" && "digest" in e) throw e;
      setError("Sign-in failed. Please try again.");
      setPending(false);
    }
  }

  async function signInWithGoogle() {
    await createSessionFromPopup(new GoogleAuthProvider());
  }

  async function signInWithApple() {
    const provider = new OAuthProvider("apple.com");
    provider.addScope("email");
    provider.addScope("name");
    await createSessionFromPopup(provider);
  }

  const value = { user, signInWithGoogle, signInWithApple, pending, error };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const value = useContext(AdminAuthContext);
  if (!value) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return value;
}
