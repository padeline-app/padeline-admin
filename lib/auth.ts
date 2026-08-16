import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import { verifySession } from "./session";
import type { AdminIdentity } from "./types";

/**
 * Portal access gate: presence of a non-deleted row in `admin_user`.
 * TODO(introspect): query admin_user (id = uid, deleted_at IS NULL) via getDb().
 */
export async function isAdmin({ uid }: { uid: string }): Promise<boolean> {
  void uid;
  return true; // Phase A stub — replaced before any deployment
}

/**
 * Call at the top of every gated Server Component page and Server Action.
 * Authentication (Firebase session) + authorisation (admin_user membership).
 * Memoized per request — the (portal) layout and each page both call this;
 * cache() makes it verify once.
 */
export const requireAdmin = cache(async (): Promise<AdminIdentity> => {
  const claims = await verifySession();
  if (!claims) redirect("/sign-in");
  if (!(await isAdmin({ uid: claims.uid }))) redirect("/denied");

  return {
    uid: claims.uid,
    email: claims.email ?? null,
    name: typeof claims.name === "string" ? claims.name : null,
    picture: typeof claims.picture === "string" ? claims.picture : null,
  };
});
