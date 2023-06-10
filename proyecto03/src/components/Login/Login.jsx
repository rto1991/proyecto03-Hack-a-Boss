import { useState } from "react";

function Login({ setUser }) {
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");
    const res = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    console.log("Got:", data);
    if (res.ok) {
      setStatus("success");
      setUser(data);
    } else {
      setStatus("error");
    }
  };

  if (status === "loading") {
    return <div>Cargando...</div>;
  }

  if (status === "success") {
    return <div>Bienvenido :)</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="mail"
        />
      </label>
      <label>
        Contraseña:
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button>Entrar</button>
      {status === "error" && (
        <p className="error">Usuario o contraseña incorrectos.</p>
      )}
    </form>
  );
}

export default Login;
