import { Link } from 'react-router-dom';
import React from 'react';

const Auth = () => {
    return (
        <>
           <Link to='/login' ><button className='button'> Login</button></Link>
           <Link to='/user' ><button className='button'>Register</button></Link>
        {/* <section><strong>Estamos en la home</strong></section> */}
        </>
    );
}

export default Auth;
