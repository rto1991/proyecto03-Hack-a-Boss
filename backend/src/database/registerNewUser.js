'use strict';

const { getConnection } = require('./getConnection');
const {newError} = require('../../helps');
const brcypt = require('bcrypt');

// Primero creo esta función
const registerNewUser = async ( email, password, name, last_name, tel, zipcode, addres, city, province ) => {
    let connection; 
    try {
     connection = await getConnection();

     // comprobar que no existe email
     const [user] = await connection.query(`
     SELECT id FROM probando WHERE email = ?
     `,
     [email]
     );

     if (user.length > 0) {
        throw newError ('Ya existe un usuario registrado con ese correo', 409);
     }
    

     // encriptamos la password
     // esto del final le define el numero de intentos que lo valida
     const passHash = await brcypt.hash(password, 8);

     // Crear el usuario
     const [createUser] = await connection.query(`
     INSERT INTO probando (email, password, name, last_name, tel, zipcode, addres, city, province) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)
     `,
     [email, passHash, name, last_name, tel, zipcode, addres, city, province]
     );

     // Devuelvo el id del elemento nuevo guardado
     return createUser.insertId;
     
    // } catch (error) {    
    }finally{
        if (connection) {
            connection.release();
        }
    }   

};

module.exports = {
    registerNewUser,
}