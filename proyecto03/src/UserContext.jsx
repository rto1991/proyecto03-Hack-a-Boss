import React, { useState, useContext } from "react";

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [selectedLanguage, setSelectedLanguage] = useState("es");

  const betterSetUser = (data) => {
    setUser(data);
    if (data) {
      localStorage.setItem("user", JSON.stringify(data));
    } else {
      localStorage.removeItem("user");
    }
  };

  const changeLanguage = (language) => {
    setSelectedLanguage(language);
  };

  const userContextValue = [
    user,
    betterSetUser,
    selectedLanguage,
    changeLanguage,
  ];

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
