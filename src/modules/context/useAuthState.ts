import { useState } from "react";
import { FIREBASE_AUTH } from "./../firebase/clientApp";
import { onAuthStateChanged, User } from "firebase/auth";

export function useAuthState() {
  const [userData, setUserData] = useState({} as User|null);
  onAuthStateChanged(FIREBASE_AUTH, (user) => {
    console.log("-------- AUTH STATE CHANGED ----------");
    setUserData(user);
  });
  return userData;
}
