import { Link } from 'react-router-dom';
import React from 'react';

const NotFound = () => {
    return (
        <>
            <h1>Disculpe las molestias, la página a la que intenta ingresar no existe o no es válida.</h1>
            <Link to='/'>Volver a home</Link>
        </>
    );
}

export default NotFound;
