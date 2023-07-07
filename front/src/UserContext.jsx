import React, { useState } from "react";
import { useContext } from "react";

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [userLanguage, setUserLanguage] = useState("es");

  const betterSetUser = (data) => {
    setUser(data);
    if (data) {
      localStorage.setItem("user", JSON.stringify(data));
    } else {
      localStorage.removeItem("user");
    }
  };

  return (
    <UserContext.Provider
      value={[user, betterSetUser, userLanguage, setUserLanguage]}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
