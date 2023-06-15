import { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    zipcode: "",
    address: "",
    city: "",
    province: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    // Realizar la solicitud POST al servidor
    fetch("http://46.183.113.60/newUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          ("Registrado con éxito");
        } else {
          ("Error en el registro");
        }
      })
      .catch((error) => {
        // Error en la solicitud
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

        <label htmlFor="lastName">Apellido:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
          required
        />

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

        <label htmlFor="phone">Teléfono:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />

        <label htmlFor="zipcode">Código Postal:</label>
        <input
          type="text"
          id="zipcode"
          name="zipcode"
          value={formData.zipcode}
          onChange={(e) =>
            setFormData({ ...formData, zipcode: e.target.value })
          }
          required
        />

        <label htmlFor="address">Dirección:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          required
        />

        <label htmlFor="city">Ciudad:</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          required
        />

        <label htmlFor="province">Provincia:</label>
        <input
          type="text"
          id="province"
          name="province"
          value={formData.city}
          onChange={(e) =>
            setFormData({ ...formData, province: e.target.value })
          }
          required
        />

        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};
export default Signup;
