import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    return (
        <>
        {/* <p>Formulario de login</p> */}
        <form >
            <label>
              Email:
              <input name="email" type="email" required/>
            </label>
            <label>
              Password:
              <input name="password" type="password" required/>
            </label>
            <button className='button'>Entrar</button>
            <p>
              Todavía no tienes cuenta?
              <Link to="/user">Regístrate</Link>
            </p>
        </form>
        </>
    );
}

export default LoginPage;
