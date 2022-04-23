import { doc, getDoc } from "firebase/firestore";
import { FIREBASE_DB } from "./clientApp";

export async function getBookDetails(isbn: string) {
  const bookDoc = doc(FIREBASE_DB, "Books", isbn);
  const bookRef = await getDoc(bookDoc);
  if (bookRef.exists()) {
    console.log(" data got from firebase ");
    console.log(bookRef.data());
    return bookRef.data();
  }
}
