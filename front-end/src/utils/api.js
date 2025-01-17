import { updateDoc, increment, doc, collection, query, where, orderBy, getDocs, addDoc, Timestamp, deleteDoc} from "firebase/firestore";
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

export async function deleteDream(dreamId) { //delete dream from database
  try {
    if (!dreamId) {
      throw new Error("Dream ID is required.");
    }

    const dreamRef = doc(db, "dreams", dreamId);

    await deleteDoc(dreamRef);

    console.log(`Dream with ID: ${dreamId} has been deleted.`);
  } catch (error) {
    console.error("Error deleting dream:", error);
    throw error;
  }
}


export async function updateDreamVotes(dreamId, voteChange) { //Update the dreams votes. voteChange can be negative for downvoting
  try {
    if (!dreamId) {
      throw new Error("Dream ID is required.");
    }
    if (typeof voteChange !== "number") {
      throw new Error("Vote change must be a number.");
    }

    const dreamRef = doc(db, "dreams", dreamId);

    await updateDoc(dreamRef, {
      votes: increment(voteChange),
    });

    console.log(
      `${voteChange > 0 ? "Added" : "Removed"} ${Math.abs(
        voteChange
      )} vote(s) for dream with ID: ${dreamId}`
    );
  } catch (error) {
    console.error("Error updating dream votes:", error);
    throw error;
  }
}


export async function updatePublicStatus(dreamId, isPublic) { // update dreams public status, takes dreams id and boolean to change status to.
  try {
    if (!dreamId) {
      throw new Error("Dream ID is required.");
    }
    if (typeof isPublic !== "boolean") {
      throw new Error("isPublic must be a boolean.");
    }

    // Reference the dream document
    const dreamRef = doc(db, "dreams", dreamId);

    // Update the isPublic field
    await updateDoc(dreamRef, {
      isPublic,
    });

    console.log(
      `Public status of dream with ID: ${dreamId} updated to ${isPublic}.`
    );
  } catch (error) {
    console.error("Error updating public status:", error);
    throw error;
  }
}