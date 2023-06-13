import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useUser } from "./UserContext";

function Signup() {
  const [ user ] = useUser()


  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    
  }

  if (user) {
    return <Navigate to="/" />
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input value={name} onChange={e => setName(e.target.value)} name="name" />
      </label>
      <label>
        Email:
        <input value={email} onChange={e => setEmail(e.target.value)} name="email" type="email" />
      </label>
      <label>
        Contraseña:
        <input name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <button>Registro</button>
      <p>
        Ya estás registrado?
        <Link to="/login">Inicia sesión</Link>
      </p>
    </form>
  )
}

export default Signup
