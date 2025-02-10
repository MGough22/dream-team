import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export const UsernameContext = createContext();

export const UsernameProvider = ({ children }) => {
  const [username, setUsername] = useState("Guest");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.displayName);
      } else {
        setUsername("Guest");
      }
    });
  }, []);

  return (
    <UsernameContext.Provider value={{ username, setUsername }}>
      {children}
    </UsernameContext.Provider>
  );
};
