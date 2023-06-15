import { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import Signup from "../Singup/Singnup";
import "./Init.css";

const Init = () => {
  const [showForm, setShowForm] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowForm(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSignupClick = () => {
    setShowSignup(true);
  };

  return (
    <section className="init-container">
      <h1 id="init">
        <FormattedMessage id="init" className="init-message" />
      </h1>
      {showForm && (
        <form className="form-container">
          <button onClick={handleSignupClick}>
            <FormattedMessage id="registrarse" />
          </button>
          <button>
            <FormattedMessage id="iniciarSesion" />
          </button>
        </form>
      )}
      <Signup />
    </section>
  );
};

export default Init;
