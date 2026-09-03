import "server-only";

import type { App } from "firebase-admin/app";
import { applicationDefault, getApps, initializeApp } from "firebase-admin/app";
import type { Auth } from "firebase-admin/auth";
import { getAuth } from "firebase-admin/auth";

// Application Default Credentials — no service-account key files (Cloud Run).
function getFirebaseApp(): App {
  const existing = getApps();
  if (existing.length > 0) return existing[0];
  return initializeApp({ credential: applicationDefault() });
}

export function getFirebaseAuth(): Auth {
  return getAuth(getFirebaseApp());
}
