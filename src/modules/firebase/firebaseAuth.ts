import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { FirebaseDB, FirebaseAuth } from "./clientApp";

// TODO: persist user token after login
export async function createUserWithEmail(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  mobile: string
) {
  const user = await createUserWithEmailAndPassword(
    FirebaseAuth,
    email,
    password
  );
  if (user) {
    await setDoc(doc(FirebaseDB, "Users", email), {
      userId: user.user.uid,
      email,
      firstName,
      lastName,
      mobile,
    });
    await setDoc(doc(FirebaseDB, "Cart"), {
      user_id: user.user.uid,
      items:[]
    })
  }
}

export async function signInWithEmail(
  email: string,
  password: string
): Promise<UserCredential> {
  console.log(process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
  console.log(`Email: ${email}, password: ${password}`);
  const user = await signInWithEmailAndPassword(FirebaseAuth, email, password);
  console.log({ user });
  return user;
}
