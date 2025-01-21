import {
  updateDoc,
  increment,
  doc,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  addDoc,
  Timestamp,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export async function addDream(
  userId,
  userName,
  dreamText,
  interpretations,
  themeTag,
  isPublic,
  votes,
  isFavourited = false
) {
  //adds dream to data base
  try {
    const docRef = await addDoc(collection(db, "dreams"), {
      userId,
      userName,
      dreamText,
      interpretations,
      themeTag,
      isPublic,
      votes,
      isFavourited,
      interpretationDate: Timestamp.now(),
    });
    console.log("Dream added with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding dream: ", error);
    throw error;
  }
}

export async function getPublicDreams(sortBy = "date", order = "desc") {
  // gets all Public dreams . Can be sorted by date/vote and in asc/desc order using parameters.
  try {
    const sortField = sortBy === "votes" ? "votes" : "interpretationDate";

    const dreamsRef = collection(db, "dreams");

    const q = query(
      dreamsRef,
      where("isPublic", "==", true),
      orderBy(sortField, order)
    );

    const querySnapshot = await getDocs(q);

    const dreams = querySnapshot.docs.map(doc => {
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

export async function getUserDreams(
  userId,
  onlyFavourites = false,
  sortBy = "date",
  order = "desc"
) {
  //gets All dreams for given User. can be sorted by votes or date and in asc/desc order using parameters. parameter added to filter by favourites

  try {
    if (!userId) {
      throw new Error("User ID is required.");
    }

    const sortField = sortBy === "votes" ? "votes" : "interpretationDate";

    const dreamsRef = collection(db, "dreams");

    const filters = [where("userId", "==", userId)];
    if (onlyFavourites) {
      filters.push(where("isFavourited", "==", true));
    }

    const q = query(dreamsRef, ...filters, orderBy(sortField, order));

    const querySnapshot = await getDocs(q);

    const dreams = querySnapshot.docs.map(doc => {
      const data = doc.data();

      const interpretationDate = data.interpretationDate.toDate();
      const readableDate = interpretationDate.toLocaleString();

      return {
        id: doc.id,
        ...data,
        interpretationDate: readableDate,
      };
    });

    console.log(
      `Retrieved ${dreams.length} ${
        onlyFavourites ? "favorited" : ""
      } dreams for user ${userId}.`
    );
    console.log(dreams);
    return dreams;
  } catch (error) {
    console.error("Error retrieving user dreams:", error);
    throw error;
  }
}

// export async function deleteDream(dreamId) { //delete dream from database
//   try {
//     if (!dreamId) {
//       throw new Error("Dream ID is required.");
//     }
//     const dreamRef = doc(db, "dreams", dreamId);
//     await deleteDoc(dreamRef);
//     console.log(`Dream with ID: ${dreamId} has been deleted.`);
//   }
//   catch (error) {
//     console.error("error in delete api", error);
//     return Promise.reject(new Error("Error deleting dream"))
//   }
// }

//new delete function which allows optimistic rendering. the timeout stops firebase from making the same request over and over when the network fails, which will never deliver a rejected promise, and cannot pass errors to our frontend. now promise.race checks which process resolves first, the timeout or the deletion, and if the timeout occurs, a rejected promise is made and passed to the catch block.
export async function deleteDream(dreamId) {
  try {
    if (!dreamId) {
      throw new Error("Dream ID is required.");
    }
    const dreamRef = doc(db, "dreams", dreamId);
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Operation timed out")), 3000)
    );
    await Promise.race([deleteDoc(dreamRef), timeout]);
    console.log(`Dream with ID: ${dreamId} has been deleted.`);
  } catch (error) {
    console.error("Error in delete API:", error);
    return Promise.reject(new Error("Error deleting dream"));
  }
}

export async function updateDreamVotes(dreamId, voteChange) {
  //Update the dreams votes. voteChange can be negative for downvoting
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

export async function updatePublicStatus(dreamId, isPublic) {
  // update dreams public status, takes dreams id and boolean to change status to.
  try {
    if (!dreamId) {
      throw new Error("Dream ID is required.");
    }
    if (typeof isPublic !== "boolean") {
      throw new Error("isPublic must be a boolean.");
    }

    const dreamRef = doc(db, "dreams", dreamId);

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

export async function updateFavouriteStatus(dreamId, isFavourited) { //takes dreamID and boolean.
  try {
    if (!dreamId) {
      throw new Error("Dream ID is required.");
    }
    if (typeof isFavourited !== "boolean") {
      throw new Error("isFavourited must be a boolean.");
    }

    const dreamRef = doc(db, "dreams", dreamId);

    await updateDoc(dreamRef, {
      isFavourited,
    });

    console.log(
      `Favorite status of dream with ID: ${dreamId} updated to ${isFavourited}.`
    );
  } catch (error) {
    console.error("Error updating favorite status:", error);
    throw error;
  }
}