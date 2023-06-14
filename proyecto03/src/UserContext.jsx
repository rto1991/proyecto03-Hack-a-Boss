import React, { useState } from "react";
import { useContext } from "react";

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [selectedLanguage, setSelectedLanguage] = useState("es"); // Agrega el estado para el idioma seleccionado

  const betterSetUser = (data) => {
    setUser(data);
    if (data) {
      localStorage.setItem("user", JSON.stringify(data));
    } else {
      localStorage.removeItem("user");
    }
  };

  // Agrega una función para cambiar el idioma seleccionado
  const changeLanguage = (language) => {
    setSelectedLanguage(language);
  };

  // Agrega el estado del idioma seleccionado al contexto de usuario
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
