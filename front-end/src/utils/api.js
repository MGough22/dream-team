import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";

export async function addDream(userId, dreamText, interpretations, themeTag) {
  try {
    const docRef = await addDoc(collection(db, "dreams"), {
      userId,
      dreamText,
      interpretations,
      themeTag,
      interpretationDate: Timestamp.now()
    });
    console.log("Dream added with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding dream: ", error);
  }
}