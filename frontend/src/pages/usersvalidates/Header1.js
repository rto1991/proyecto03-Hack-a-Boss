import React, { useState } from 'react';
import './Header1.css';
import { Link } from 'react-router-dom';

const Header1 = () => {

    const [ id, setId ] = useState();
    console.log(id);
    
    return (
        <section>
            <ul>
                <li><h2>{`Bienvenido a tu nube: ${id}`}</h2></li>
                <li><Link to='/' ><button>LogOut 👋🏻</button></Link></li>
            </ul>
        </section>
    );
}

export default Header1;
