import { createContext, useState } from "react";

export const UserContext = createContext()

export const UserProvider = ({children}) => {
    //hardcoded default user
    const [user, setUser] = useState("Dreamer69")
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}