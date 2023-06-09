import { useState, useEffect } from "react";
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
      <h1 className="init-message">Bienvenido a MyCloudDrive </h1>
      {showForm && (
        <form className="form-container">
          <button>REGISTRARSE</button>
          <button>INICIAR SESIÓN</button>
        </form>
      )}
    </section>
  );
};

export default Init;
