import { useState } from "react";
import { IntlProvider } from "react-intl";
import esMessages from "../../components/intl/es.json";
import enMessages from "../../components/intl/en.json";
import itMessages from "../../components/intl/it.json";
import "./LanguageSelector.css";

const messages = {
  es: esMessages,
  en: enMessages,
  it: itMessages,
};

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("es");

  const handleChangeLanguage = (event) => {
    const selectedLanguage = event.target.value;
    setSelectedLanguage(selectedLanguage);
  };

  return (
    <IntlProvider
      locale={selectedLanguage}
      messages={messages[selectedLanguage]}
    >
      <header className="language-selector">
        <label htmlFor="language" className="language-selector__label" />
        <select
          id="language"
          value={selectedLanguage}
          onChange={handleChangeLanguage}
          className="language-selector__select"
        >
          <option value="es" onClick={() => handleChangeLanguage("es")}>
            ES
          </option>
          <option value="en" onClick={() => handleChangeLanguage("en")}>
            EN
          </option>
          <option value="en" onClick={() => handleChangeLanguage("it")}>
            IT
          </option>
        </select>
      </header>
    </IntlProvider>
  );
};

export default LanguageSelector;
