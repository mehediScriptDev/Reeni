import { initializeApp } from 'firebase/app';
import { indexedDBLocalPersistence, initializeAuth } from 'firebase/auth';

// Firebase configuration sourced from env (keep secrets out of source)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Basic guard to surface misconfiguration early
if (!firebaseConfig.apiKey) {
  // eslint-disable-next-line no-console
  console.error('Firebase config missing. Check your .env.local values.');
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Use indexedDB persistence only (faster than default which tries multiple)
export const auth = initializeAuth(app, {
  persistence: indexedDBLocalPersistence,
});