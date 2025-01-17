import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";


export const UsernameContext = createContext()

export const UsernameProvider = ({children}) => {
    
    const [username, setUsername] = useState(null);
   

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in
          setUsername(user.displayName)
        } else {
          // User is signed out
          setUsername("Guest");
        }
      });
  
    //   return () => unsubscribe(); // Clean up the listener on unmount
    }, []);
  
  
    
    return (
        <UsernameContext.Provider value={{username, setUsername}}>
            {children}
        </UsernameContext.Provider>
    )
}