import { useContext } from "react";
import es from "../img/espana.png";
import en from "../img/reino-unido.png";
import it from "../img/italia.png";
import fr from "../img/francia.png";
import { langContext } from "../LangContext";
import "./LanguageSelector.css";

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
      <button onClick={() => idioma.establecerLenguaje("it")}>
        <img src={it} alt="" />
      </button>
      <button onClick={() => idioma.establecerLenguaje("fr")}>
        <img src={fr} alt="" />
      </button>
    </div>
  );
};

export default LanguageSelector;
