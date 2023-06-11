import { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import "./Init.css";

const Init = () => {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowForm(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="init-container">
      <h1 id="init">
        <FormattedMessage id="init" className="init-message" />
      </h1>
      {showForm && (
        <form className="form-container">
          <button>
            <FormattedMessage id="registrarse" />
          </button>
          <button>
            <FormattedMessage id="iniciarSesion" />
          </button>
        </form>
      )}
    </section>
  );
};

export default Init;
