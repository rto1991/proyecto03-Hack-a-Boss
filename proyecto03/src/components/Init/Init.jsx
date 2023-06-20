import { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import "./Init.css";

const Init = () => {
  const [showForm, setShowForm] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

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

  const handleLoginClick = (event) => {
    event.preventDefault();
    setShowLogin(true);
  };

  if (showSignup) {
    return <Signup />;
  }

  if (showLogin) {
    return <Login />;
  }

  return (
    <section className="init-container">
      <h1 id="init">
        <FormattedMessage id="init" className="init-message" />
      </h1>
      {showForm && (
        <form className="form-container">
          <button onClick={handleSignupClick}>
            <FormattedMessage id="initRegistrarse" />
          </button>
          <button onClick={handleLoginClick}>
            <FormattedMessage id="initLogin" />
          </button>
        </form>
      )}
    </section>
  );
};

export default Init;
