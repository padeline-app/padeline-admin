"use client";

import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const FIREBASE_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function getFirebaseClientApp() {
  const existing = getApps();
  if (existing.length > 0) return existing[0];
  if (!FIREBASE_CONFIG.apiKey || !FIREBASE_CONFIG.appId) {
    throw new Error("Missing NEXT_PUBLIC_FIREBASE_* environment variables");
  }
  return initializeApp(FIREBASE_CONFIG);
}

export function getFirebaseClientAuth() {
  return getAuth(getFirebaseClientApp());
}
