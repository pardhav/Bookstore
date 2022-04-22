import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
  updateProfile,
  User,
  UserCredential,
} from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { FIREBASE_DB, FIREBASE_AUTH } from "./clientApp";
import Cookies from "universal-cookie";

// TODO: persist user token after login
export async function createUserWithEmail(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  mobile: string
): Promise<User | null> {
  const cookie = new Cookies();
  await setPersistence(FIREBASE_AUTH, browserLocalPersistence);
  const user = await createUserWithEmailAndPassword(
    FIREBASE_AUTH,
    email,
    password
  );
  cookie.set("user-firebase", user);
  if (user) {
    await updateProfile(user.user, {
      displayName: `${firstName} ${lastName}`,
    });
    await setDoc(doc(FIREBASE_DB, "Users", email), {
      userId: user.user.uid,
      email,
      firstName,
      lastName,
      mobile,
    });
    //TODO: write trigger to crate these docs
    await addDoc(collection(FIREBASE_DB, "Cart"), {
      userId: user.user.uid,
      items: [],
    });
    await addDoc(collection(FIREBASE_DB, "Orders"), {});
    return user.user;
  }
  return null;
}

export async function signInWithEmail(
  email: string,
  password: string
): Promise<UserCredential> {
  const cookie = new Cookies();
  await setPersistence(FIREBASE_AUTH, browserLocalPersistence);
  const user = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
  cookie.set("user-firebase", user);
  return user;
}
