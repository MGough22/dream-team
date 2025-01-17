import { collection, query, where, orderBy, getDocs, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";

export async function addDream(userId, dreamText, interpretations, themeTag, isPublic, votes) { //adds dream to data base
  try {
    const docRef = await addDoc(collection(db, "dreams"), {
      userId,
      dreamText,
      interpretations,
      themeTag,
      isPublic,
      votes,
      interpretationDate: Timestamp.now()
    });
    console.log("Dream added with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding dream: ", error);
    throw(error)
  }
}


export async function getPublicDreams(sortBy = "date", order = "desc") { // gets all Public dreams . Can be sorted by date/vote and in asc/desc order using parameters.
  try {

    const sortField = sortBy === "votes" ? "votes" : "interpretationDate"; 

    const dreamsRef = collection(db, "dreams");

    const q = query(
      dreamsRef,
      where("isPublic", "==", true), 
      orderBy(sortField, order) 
    );

    const querySnapshot = await getDocs(q);

    const dreams = querySnapshot.docs.map((doc) => {
      const data = doc.data();

      const interpretationDate = data.interpretationDate.toDate(); 
      const readableDate = interpretationDate.toLocaleString(); 

      return {
        id: doc.id,
        ...data,
        interpretationDate: readableDate, 
      };
    });

    console.log(`Retrieved ${dreams.length} public dreams.`);
    return dreams;
  } catch (error) {
    console.error("Error retrieving public dreams:", error);
    throw error; 
  }
}


export async function getUserDreams(userId, sortBy = "date", order = "desc") { //gets All dreams for given User. can be sorted by votes or date and in asc/desc order using parameters.
  try {
    if (!userId) {
      throw new Error("User ID is required.");
    }

    const sortField = sortBy === "votes" ? "votes" : "interpretationDate"; 

    const dreamsRef = collection(db, "dreams");

    const q = query(
      dreamsRef,
      where("userId", "==", userId), 
      orderBy(sortField, order) 
    );

    const querySnapshot = await getDocs(q);

    const dreams = querySnapshot.docs.map((doc) => {
      const data = doc.data();

      const interpretationDate = data.interpretationDate.toDate();
      const readableDate = interpretationDate.toLocaleString(); 

      return {
        id: doc.id,
        ...data,
        interpretationDate: readableDate, 
      };
    });

    console.log(`Retrieved ${dreams.length} dreams for user ${userId}.`);
    console.log(dreams)
    return dreams;
  } catch (error) {
    console.error("Error retrieving user dreams:", error);
    throw error;
  }
}
