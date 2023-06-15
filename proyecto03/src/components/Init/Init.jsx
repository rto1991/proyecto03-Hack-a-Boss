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
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleSignupClick = (event) => {
    event.preventDefault();
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
          {showSignup && <Signup />}
          <button>
            <FormattedMessage id="iniciarSesion" />
          </button>
        </form>
      )}
    </section>
  );
};

export default Init;
