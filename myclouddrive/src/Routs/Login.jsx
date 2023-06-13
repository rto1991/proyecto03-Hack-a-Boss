import { useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { useUser } from "./UserContext"

function Login() {
  const [ user ] = useUser()

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
        Email:
        <input value={email} onChange={e => setEmail(e.target.value)} name="email" type="email" />
      </label>
      <label>
        Contraseña:
        <input name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <button>Entrar</button>
      <p>
        Todavía no tienes cuenta?
        <Link to="/signup">Regístrate</Link>
      </p>
    </form>
  )
}

export default Login
