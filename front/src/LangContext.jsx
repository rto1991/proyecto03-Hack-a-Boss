import React, { useState } from "react";
import esMessages from "./views/components/intl/es.json";
import enMessages from "./views/components/intl/en.json";
import itMessages from "./views/components/intl/it.json";
import { IntlProvider } from "react-intl";

const langContext = React.createContext();

const LangProvider = ({ children }) => {
  const [mensajes, establecerMensajes] = useState(esMessages);
  const [locale, establecerLocale] = useState("es");

  const establecerLenguaje = (lenguaje) => {
    switch (lenguaje) {
      case "es":
        establecerMensajes(esMessages);
        establecerLocale(`es`);
        break;
      case "en":
        establecerMensajes(enMessages);
        establecerLocale(`en`);
        break;
      case "it":
        establecerMensajes(itMessages);
        establecerLocale(`es`);
        break;
      default:
        establecerMensajes(esMessages);
        establecerLocale(`es`);
    }
  };

  return (
    <langContext.Provider value={{ establecerLenguaje: establecerLenguaje }}>
      <IntlProvider locale={locale} messages={mensajes}>
        {children}
      </IntlProvider>
    </langContext.Provider>
  );
};

export { LangProvider, langContext };
