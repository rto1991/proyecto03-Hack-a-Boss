import { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import Login from "../Login/";
import "./Init.css";

const Init = () => {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowForm(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (credentials) => {
    const response = await fetch("http://46.183.113.60/users/login", {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      ("Bienvenido");
    } else {
      ("Algo ha salido mal");
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

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
          <button onClick={handleLoginClick}>
            <FormattedMessage id="iniciarSesion" />
          </button>
          <Login onSubmit={handleSubmit} />
        </form>
      )}
    </section>
  );
};

export default Init;
