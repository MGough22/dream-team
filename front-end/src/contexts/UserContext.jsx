import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";


export const UserContext = createContext()

export const UserProvider = ({children}) => {
    // hardcoded default user
    // const [user, setUser] = useState("Dreamer69")
    
    const [user, setUser] = useState(null);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in
          setUser(user.email)
        } else {
          // User is signed out
          setUser("Guest");
        }
      });
  
    //   return () => unsubscribe(); // Clean up the listener on unmount
    }, []);
  
  
    
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}