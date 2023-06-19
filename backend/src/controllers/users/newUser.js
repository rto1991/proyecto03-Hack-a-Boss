'use strict';
const { newError} = require('../../../helps');
const { registerNewUser } = require('../../database');
const { sendMail } = require('../../services/sendMail');
// const path = require("path");
// const fs = require("fs/promises");
const Joi = require('joi');

const users = Joi.object({
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().required().pattern(new RegExp(`^[a-zA-Z0-9]{3,30}$`)),
    name: Joi.string().alphanum().min(3).max(30).required(),
    last_name: Joi.string().alphanum().min(3).max(30).required(),
    tel: Joi.number().integer(),
    zipcode: Joi.number().integer(),
    addres: Joi.string().min(3).max(255),
    city: Joi.string().min(3).max(255),
    province: Joi.string().min(3).max(255),
    })

const newUser = async (req, res, next) =>{
    let connect;
    try {
        let {email, password, name, last_name, tel, zipcode, addres, city, province, role} = req.body;
        // const connect = await getConnection();
        // espero la validación del Joi
        await users.validateAsync(req.body)

        if (!email || !password || !name || !last_name || !tel || !zipcode || !addres || !city || !province) {
            throw newError('Todos los campos son obligatorios', 411);
         }

        if (email && password && name && last_name && tel && zipcode && addres && city && province) {
            const validation = users.validate(email, password, name, last_name, tel, zipcode, addres, city, province)
            // Aquí dentro verifico está correcto, si no emito error.
        if (!validation.error) {
         console.log('Por favor verifique la información e introduzca los datos correctamente');
         }
        }

        const id = await registerNewUser(email, password, name, last_name, tel, zipcode, addres, city, province, role);
        console.log(id);
        
        // genero regCode
        const { v4: uuidv4 } = require("uuid");
        const regCode = uuidv4();
        
        // Validar el envío de email...
        
        // Mando un mail al usuario con el link de confirmación de email
        const emailBody = `
          Acabas de registrarte correctamente en tu ☁️⎨Disco duro ONLINE⎬☁️. 
          Pulsa en este link para validar tu nuevo email: ${process.env.PUBLIC_HOST}${regCode}
        `;
        
        // var sendMail = require("../../services/sendMail");
        sendMail(email, "Correo de verificación My Cloud Drive", emailBody);

        await sendMail(email, 'Confirma tu registro', emailBody);
        
        res.send({
            status: 'ok',
            message: `Usuario creado con id: ${id}`
        })
    } catch (error) {
        next(error)
    }finally{
        if (connect) {
            connect.release();
        }
    }  
    };


module.exports = {
    newUser,
}