import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { loginService } from '../services';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {

  const { token, user, logOut } = useContext(AuthContext);
  const [ email, setEmail] = useState();
  const [ password, setPassword] = useState();
  const [ error, setError ] = useState();
  const { login } = useContext(AuthContext);

  const handleForm  = async (e) => {
    e.preventDefault();
    setError('')


    try {
      const token = await loginService({email, password});

      console.log(token);
      login(token)
    } catch (error) {
      setError(error.message)
    }
  }

  

    return user ? <p>usuario validado {user.email}</p>:  (
        <>
        <form onSubmit={handleForm}>
          <fieldset>
        <h2>Inicia sesión</h2>
            <label>
              <input
              name="email"
              type="email"
              required
              placeholder='Email*'
              onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              <input
              name="password"
              type="password"
              required
              placeholder='Password*'
              onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <li>Token: {token}</li>
            <button className='button'>Login</button>
            <p>
              Todavía no tienes cuenta?
              <Link to="/user">Regístrate</Link>
            </p>
          </fieldset>
          { error ? <p>{error}</p> : null }
        </form>
        </>
    );
}

export default LoginPage;
