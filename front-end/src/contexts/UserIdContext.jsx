import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";


export const UserIdContext = createContext()

export const UserIdProvider = ({children}) => {

    
    const [userId, setUserId] = useState(null);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in
          setUserId(user.uid)
        } else {
          // User is signed out
          setUserId("guestId");
        }
      });
  
    //   return () => unsubscribe(); // Clean up the listener on unmount
    }, []);
  
  
    
    return (
        <UserIdContext.Provider value={{userId, setUserId}}>
            {children}
        </UserIdContext.Provider>
    )
}