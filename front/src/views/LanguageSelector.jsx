import { IntlProvider } from "react-intl";
import esMessages from "../views/components/intl/es.json";
import enMessages from "../views/components/intl/en.json";
import itMessages from "../views/components/intl/it.json";
import "./LanguageSelector.css";
import { useUser } from "../UserContext";

const messages = {
  es: esMessages,
  en: enMessages,
  it: itMessages,
};

function LanguageSelector() {
  const [, , userLanguage, setUserLanguage] = useUser();

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    setUserLanguage(selectedLanguage);
  };

  return (
    <IntlProvider locale={userLanguage} messages={messages[userLanguage]}>
      <section className="language-selector">
        <select
          id="language"
          value={userLanguage}
          onChange={handleLanguageChange}
          className="language-selector__select"
        >
          <option value="es">
            <img src="./espana.png" alt="Español" />
            ES
          </option>
          <option value="en">EN</option>
          <option value="it">IT</option>
        </select>
      </section>
    </IntlProvider>
  );
}

export default LanguageSelector;
