import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { auth } from "./clientApp";

export async function signInWithEmail(
  email: string,
  password: string
): Promise<UserCredential> {
  console.log(process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
  console.log(`Email: ${email}, password: ${password}`);
  const user = await signInWithEmailAndPassword(auth, email, password);
  console.log({ user });
  return user;
}
