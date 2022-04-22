import * as firebase from "firebase/app";
import "firebase/auth";
import { getAuth, User, signOut } from "firebase/auth";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
const app = firebase.initializeApp(clientCredentials);

export const FIREBASE_AUTH = getAuth(app);
// this var is null if user is currently logged out
export const CURRENT_LOGGED_IN_USER: User | null = FIREBASE_AUTH.currentUser;
export const FIREBASE_DB = getFirestore(app);

export async function signOutUser() {
  await signOut(FIREBASE_AUTH);
}
