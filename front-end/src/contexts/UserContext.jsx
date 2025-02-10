import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";


export const UserContext = createContext()

export const UserProvider = ({children}) => {
    //use this hardcoded default if everythings fucked up
    //const [user, setUser] = useState("Dreamer69")
    
    const [user, setUser] = useState(null);

    useEffect(() => {
     onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user.email)
        } else {
          setUser("Guest");
        }
      });
    }, []);
  
  
    
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}