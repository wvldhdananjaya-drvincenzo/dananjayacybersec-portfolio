import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

// Validate environment variables - never use fake "mock-key" fallbacks
const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;

const isConfigured = Boolean(apiKey && projectId && apiKey !== 'mock-key');

const firebaseConfig = isConfigured
  ? {
      apiKey: apiKey,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || `${projectId}.firebaseapp.com`,
      projectId: projectId,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || `${projectId}.appspot.com`,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
    }
  : null;

// Initialize Firebase App only when valid production configuration is present
let app: FirebaseApp | null = null;
let firestoreDb: Firestore | null = null;

if (firebaseConfig) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    firestoreDb = getFirestore(app);
  } catch (error) {
    console.warn('[Firebase] Initialization skipped due to invalid configuration');
  }
}

export const isFirebaseConfigured = isConfigured && firestoreDb !== null;
export const db = firestoreDb;

