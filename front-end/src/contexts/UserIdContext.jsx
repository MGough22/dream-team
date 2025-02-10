import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";


export const UserIdContext = createContext()

export const UserIdProvider = ({children}) => {

    
    const [userId, setUserId] = useState(null);

    useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserId(user.uid)
        } else {
          setUserId("guestId");
        } 
      });
    }, []);
  
  
    
    return (
        <UserIdContext.Provider value={{userId, setUserId}}>
            {children}
        </UserIdContext.Provider>
    )
}