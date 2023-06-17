import { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Realizar la solicitud POST al servidor
    await fetch("http://46.183.113.60/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Inicio de sesión exitoso");
        } else {
          console.log("Error en el inicio de sesión");
        }
      })
      .catch((error) => {
        // Error en la solicitud
        console.error(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Correo electrónico:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />

        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />

        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
