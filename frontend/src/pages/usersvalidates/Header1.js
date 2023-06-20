import React from 'react';
import './Header1.css';
import { Link } from 'react-router-dom';

const Header1 = () => {
    return (
        <section>
            <ul>
                <li><h2>Bienvenido a tu nube: usuario</h2></li>
                <li><Link to='/' ><button>LogOut 👋🏻</button></Link></li>
            </ul>
        </section>
    );
}

export default Header1;
