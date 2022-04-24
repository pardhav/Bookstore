import { FIREBASE_AUTH, FIREBASE_DB } from "./clientApp";
import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";

interface ICart {
  [key: string]: { [key: string]: any };
}

export async function addBookToCart(bookToAdd: { [key: string]: any }) {
  console.log("Inside add book to cart");
  if (FIREBASE_AUTH.currentUser?.uid) {
    const cartDoc = doc(
      FIREBASE_DB,
      "Cart",
      FIREBASE_AUTH.currentUser?.uid as string
    );
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

export async function fetchCartDetails(userId: string): Promise<any> {
  console.log("Fetching carts for user");
  const cartDoc = doc(FIREBASE_DB, "Cart", userId);
  return (await getDoc(cartDoc)).data();
}

export async function updateCartQuantity(
  userId: string,
  isbn: string,
  newQuantity: string
): Promise<any> {
  const cartDoc = doc(FIREBASE_DB, "Cart", userId);
  const cartRef = await getDoc(cartDoc);
  console.log(cartRef.data());
  const cartData = cartRef.data() as ICart;
  if (Object.keys(cartData).includes(isbn)) {
    cartData[isbn]["quantity"] = newQuantity;
    await updateDoc(cartDoc, cartData);
  }
}
