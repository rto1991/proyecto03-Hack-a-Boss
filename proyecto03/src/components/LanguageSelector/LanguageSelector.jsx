import { useState } from "react";
import "./LanguageSelector.css";

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("es");

  const handleChangeLanguage = (event) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <header className="language-selector">
      <label htmlFor="language" className="language-selector__label" />
      <select
        id="language"
        value={selectedLanguage}
        onChange={handleChangeLanguage}
        className="language-selector__select"
      >
        <option value="es">Español</option>

        <option value="en">Inglés</option>

        <option value="it">Italiano</option>
      </select>
    </header>
  );
};

export default LanguageSelector;
