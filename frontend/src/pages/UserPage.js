import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../services';

const UserPage = () => {

  const [ name, setName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ pass, setPass ] = useState('');
  const [ tel, setTel ] = useState('');
  const [ cp, setCp ] = useState('');
  const [ address, setAddress ] = useState('');
  const [ city, setCity ] = useState('');
  const [ province, setProvince ] = useState('');
  const [ error, setError ] = useState('');

  const handleForm = async (e) => {
    e.preventDefault();
    setError('')

    try {
      await registerUser({
        email,
        password: pass,
        name,
        last_name: lastName,
        tel,
        zipcode: cp,
        address,
        city,
        province})
    } catch (error) {
      setError(error.message)
    
    }
  }
    return (
        <>
        <h2>Regístrate para disfrutar de nuestros servicios</h2>
        <form onSubmit={handleForm}>
            <label htmlFor='name'>
              Nombre:
              </label>
              <input
              name="name"
              type="name"
              required
              autoComplete="given-name"
              onChange={(e) => setName(e.target.value)}/>
            <label htmlFor='last_name'>
              Apellido:
              </label>
              <input
              name="last_name"
              type="last_name"
              required
              autoComplete="family-name"
              onChange={(e) => setLastName(e.target.value)}/>
            <label htmlFor='email'>
              Email:
              </label>
              <input
              name="email"
              type="email"
              required
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}/>            
            <label htmlFor='pass'>
              Password:
              </label>
              <input
              name="password"
              type="password"
              required
              autoComplete='new-password'
              onChange={(e) => setPass(e.target.value)}/>           
            <label htmlFor='tel'>
              Teléfono:
              </label>
              <input
              name="telf"
              type="tel"
              required
              onChange={(e) => setTel(e.target.value)}/>           
            <label htmlFor='cp'>
              C.P:
              </label>
              <input
              name="zipcode" 
              type="zipcode" 
              required
              onChange={(e) => setCp(e.target.value)}/>           
            <label htmlFor='address'>
              Dirección:
              </label>
              <input
              name="addres" 
              type="addres" 
              required
              onChange={(e) => setAddress(e.target.value)}/>           
            <label htmlFor='city'>
              Ciudad:
              </label>
              <input 
              name="city"
              type="city" 
              required
              onChange={(e) => setCity(e.target.value)}/>           
            <label htmlFor='province'>
              Provincia:
              </label>
              <input
              name="province" 
              type="province" 
              required
              onChange={(e) => setProvince(e.target.value)}/>           
            <p>
              ¿Ya tienes cuenta?
              <Link to="/login">Inicia sesión</Link>
            </p>
            <button className='button'>Regístrarme</button>
            {error ? <p>{error}</p> : null}
        </form>
        </>
    );
}

export default UserPage;
