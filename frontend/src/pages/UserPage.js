import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services';

const UserPage = () => {

  const navigate = useNavigate();
  const [ name, setName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ pass, setPass ] = useState('');
  const [ pass1, setPass1 ] = useState('');
  const [ tel, setTel ] = useState('');
  const [ cp, setCp ] = useState('');
  const [ addres, setAddress ] = useState('');
  const [ city, setCity ] = useState('');
  const [ province, setProvince ] = useState('');
  const [ error, setError ] = useState('');

  const handleForm = async (e) => {
    e.preventDefault();
    setError('')

    if(pass !== pass1){
      setError('Las passwords deben coincidir');
      return
    }
    try {
      await registerUser({
        email,
        password: pass,
        name,
        last_name: lastName,
        tel,
        zipcode: cp,
        addres,
        city,
        province})
        // if(registerUser) return <Register />
        navigate('/login');
    } catch (error) {
      setError(error.message)
    
    }
    
  }
    return (
        <>
        <form onSubmit={handleForm}>
          <fieldset>
        <h2>Regístrate</h2>
            <label htmlFor='name'>
              <input
              name="name"
              type="name"
              required
              autoComplete="given-name"
              placeholder='Nombre*'
              onChange={(e) => setName(e.target.value)}/>
            </label>
            <label htmlFor='last_name'>
              <input
              name="last_name"
              type="last_name"
              required
              placeholder='Apellido*'
              autoComplete="family-name"
              onChange={(e) => setLastName(e.target.value)}/>
            </label>
            <label htmlFor='email'>
              <input
              name="email"
              type="email"
              required
              placeholder='Email*'
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}/>
            </label>          
            <label htmlFor='pass'>
              <input
              name="password"
              type="password"
              required
              placeholder='Password*'
              autoComplete='new-password'
              onChange={(e) => setPass(e.target.value)}/>
            </label>
            <label htmlFor='pass'>
              <input
              name="pass1"
              type="password"
              required
              placeholder='Repeat password*'
              autoComplete='new-password'
              onChange={(e) => setPass1(e.target.value)}/>
            </label>          
            <label htmlFor='tel'>
              <input
              name="telf"
              type="tel"
              required
              placeholder='Teléfono*'
              onChange={(e) => setTel(e.target.value)}/>
            </label>         
            <label htmlFor='cp'>
              <input
              name="zipcode" 
              type="zipcode" 
              required
              placeholder='C.P.*'
              onChange={(e) => setCp(e.target.value)}/>
            </label>         
            <label htmlFor='address'> 
              <input
              name="addres" 
              type="addres" 
              required
              placeholder='Dirección*'
              onChange={(e) => setAddress(e.target.value)}/>
            </label>       
            <label htmlFor='city'>
              <input 
              name="city"
              type="city" 
              required
              placeholder='Ciudad*'
              onChange={(e) => setCity(e.target.value)}/>
              </label>       
            <label htmlFor='province'>
              <input
              name="province" 
              type="province" 
              required
              placeholder='Provincia*'
              onChange={(e) => setProvince(e.target.value)}/> 
              </label>          
            <button className='button'>Regístrarme</button>
            <p>
              ¿Ya tienes cuenta?
              <Link to="/login">Inicia sesión</Link>
            </p>
            {error ? <p>{error}</p> : null}
          </fieldset>
        </form>

        </>
    );
}

export default UserPage;
