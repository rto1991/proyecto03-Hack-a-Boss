import { useState } from "react";
import { IntlProvider } from "react-intl";
import esMessages from "../views/components/intl/es.json";
import enMessages from "../views/components/intl/en.json";
import itMessages from "../views/components/intl/it.json";
// import "./LanguageSelector.css";

const messages = {
  es: esMessages,
  en: enMessages,
  it: itMessages,
};

function LanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = useState("es");

  function handleChangeLanguage(event) {
    const selectedLanguage = event.target.value;
    setSelectedLanguage(selectedLanguage);
  }

  return (
    <IntlProvider
      locale={selectedLanguage}
      messages={messages[selectedLanguage]}
    >
      <section className="language-selector">
        <select
          id="language"
          value={selectedLanguage}
          onChange={handleChangeLanguage}
          className="language-selector__select"
        >
          <option value="es">
            <img src="./espana.png" alt="Español" />
          </option>
          <option value="en">EN</option>
          <option value="it">IT</option>
        </select>
      </section>
    </IntlProvider>
  );
}

export default LanguageSelector;
