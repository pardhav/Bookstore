import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { FIREBASE_DB } from "./clientApp";
import { HomeTestResponse } from "./testResponse";

export async function getHomeLists() {
  //   const bookDoc = collection(FIREBASE_DB, "Home_Lists");
  //   const bookRef = await getDocs(bookDoc);

  //   console.log(bookRef);
  return HomeTestResponse;
}
