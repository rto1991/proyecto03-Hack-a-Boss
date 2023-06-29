import { useContext } from "react";
import es from "../img/spain.png";
import en from "../img/united-kingdom.png";
import { langContext } from "../LangContext";

const LanguageSelector = () => {
  const idioma = useContext(langContext);

  return (
    <div className="banderas">
      <button onClick={() => idioma.establecerLenguaje("es")}>
        <img src={es} alt="" />
      </button>
      <button onClick={() => idioma.establecerLenguaje("en")}>
        <img src={en} alt="" />
      </button>
      <button onClick={() => idioma.establecerLenguaje("it")}>IT</button>
    </div>
  );
};

export default LanguageSelector;
