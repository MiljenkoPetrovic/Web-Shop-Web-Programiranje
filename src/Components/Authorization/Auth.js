// Import specific functions and objects from Firebase modules
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the authentication service
export const auth = getAuth(app);

// Authentication Functions
export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Rename this function to something unique, e.g., signInWithFirebase
export const signInWithFirebase = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOutWithFirebase = () => {
  return signOut(auth);
};
