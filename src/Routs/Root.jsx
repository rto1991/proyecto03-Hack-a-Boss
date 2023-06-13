import { Link, Outlet } from "react-router-dom"
import { useUser } from './UserContext'
import './Root.css'

function Root() {
  const [ user ] = useUser()

  const handleSubmit = async e => {
    e.preventDefault()
  }

  return (
    <>
      <header>
        <div className="content">
          <Link to="/">
            <h1>Overflow</h1>
          </Link>
          {user
            ? <span>{user.name} <span onClick={handleSubmit}>⏻</span></span>
            : <Link to="/login">Iniciar sesión</Link>
        }
        </div>
      </header>
      <main className="content">
        <Outlet />
      </main>
    </>
  )
}

export default Root
