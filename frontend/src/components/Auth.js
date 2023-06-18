import { Link } from 'react-router-dom';
import React, { useContext } from 'react';


const Auth = () => {

    return (
        <section className='initial'>
           <Link to='/login' ><button className='button'> Login</button></Link>
           <Link to='/user' ><button className='button'>Registro</button></Link>
        {/* <section><strong>Estamos en la home</strong></section> */}
        </section>
    );
}

export default Auth;
