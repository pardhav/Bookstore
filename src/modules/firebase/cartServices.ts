import { FIREBASE_DB } from "./clientApp";
import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";

interface ICart {
  [key: string]: { [key: string]: any };
}

export async function addBookToCart(
  userId: string,
  bookToAdd: { [key: string]: any }
) {
  console.log("Inside add book to cart");
  if (userId) {
    const cartDoc = doc(FIREBASE_DB, "Cart", userId);
    const cartRef = await getDoc(cartDoc);
    console.log(cartRef.data());
    const cartData = cartRef.data() as ICart;
    let items = {} as ICart;
    if (cartData) {
      console.log({ cartData });
      console.log(typeof cartData);
      const itemKeys = Object.keys(cartData);
      console.log({ itemKeys });
      items = cartData;
      if (Object.keys(cartData).includes(bookToAdd.isbn)) {
        items[bookToAdd.isbn]["quantity"] =
          cartData[bookToAdd.isbn].quantity + 1;
      } else {
        items[bookToAdd.isbn] = { quantity: 1, ...bookToAdd };
      }
      await updateDoc(cartDoc, items);
    } else {
      items[bookToAdd.isbn] = { quantity: 1, ...bookToAdd };
      await setDoc(cartDoc, items);
    }
  }
}
