// ===== Firebase singleton (client SDK) =====
// Initialized exactly once — `getApps()` guards against the re-initialization
// crash Next.js hot-reload would otherwise cause ("Firebase App named '[DEFAULT]'
// already exists"). All values come from env vars; nothing is hardcoded.

import { initializeApp, getApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

/** Firestore instance — import this to build the ChatSessions / Messages collections. */
export const db: Firestore = getFirestore(app);

export default app;
