"use client";

import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { GoogleLogoIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { getFirebaseClientAuth } from "@/lib/firebase-client";
import { signInWithGoogle } from "./actions";

export function SignInScreen() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSignIn() {
    setPending(true);
    setError(null);
    try {
      const auth = getFirebaseClientAuth();
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      const idToken = await result.user.getIdToken();
      await signInWithGoogle({ idToken });
    } catch (e) {
      // redirect() throws internally — let Next handle its own control flow
      if (e && typeof e === "object" && "digest" in e) throw e;
      setError("Sign-in failed. Please try again.");
      setPending(false);
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex flex-1 flex-col justify-between bg-primary p-12 text-primary-foreground">
        <span className="text-lg font-semibold">Padeline</span>
        <div>
          <h1 className="text-3xl font-semibold">Admin Portal</h1>
          <p className="mt-2 text-primary-foreground/70">
            Manage venues, players and sessions.
          </p>
        </div>
        <span className="text-sm text-primary-foreground/50">
          Internal use only
        </span>
      </div>

      <div className="flex flex-1 items-center justify-center bg-background p-8">
        <div className="w-full max-w-sm space-y-6 text-center">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">Sign in</h2>
            <p className="text-sm text-muted-foreground">
              Use your Google account
            </p>
          </div>
          <Button
            className="w-full"
            size="lg"
            onClick={handleSignIn}
            disabled={pending}
          >
            <GoogleLogoIcon />
            {pending ? "Signing in…" : "Continue with Google"}
          </Button>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
        </div>
      </div>
    </div>
  );
}
