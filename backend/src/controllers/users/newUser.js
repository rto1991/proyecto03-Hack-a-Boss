'use strict';
const { newError} = require('../../../helps');
const { registerNewUser } = require('../../database');
const path = require("path");
const fs = require("fs/promises");
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
    try {
        let {email, password, name, last_name, tel, zipcode, addres, city, province, role} = req.body;
        // const connect = await getConnection();
        // espero la validación del Joi
        await users.validateAsync(req.body)

        if (!email || !password || !name || !last_name || !tel || !zipcode || !addres || !city || !province) {
            throw newError('Todos los campos son obligatorios', 411);
         }

        if (email && password && name && last_name && tel && zipcode && addres && city && province) {
            const validation = users.validate(email)
            // Aquí dentro verifico está correcto, si no emito error.
        if (validation.error) {
         console.log('Por favor verifique la información e introduzca los datos correctamente');
         }
        }

        const id = await registerNewUser(email, password, name, last_name, tel, zipcode, addres, city, province, role);
        console.log(id);
        
        // genero regCode
        const { v4: uuidv4 } = require("uuid");
        const regCode = uuidv4();
        
        // Validar el envío de email...
        /*
        // Mando un mail al usuario con el link de confirmación de email
        const emailBody = `
          Acabas de registrarte correctamente en tu ☁️⎨Disco duro ONLINE⎬☁️. 
          Pulsa en este link para validar tu nuevo email: ${process.env.PUBLIC_HOST}${regCode}
        `;
        
        const sendMail = require("../../services/sendMail");
        sendMail(email, "Correo de verificación My Cloud Drive", emailBody);

        await sendMail(email, 'Confirma tu registro', emailBody);

        const [ proband ] = await connect.query(
            `INSERT INTO probando (email, password, regCode, name, last_name, tel, zipcode, addres, city, province) VALUES (?,SHA2(?,512),?,?,?,?,?,?,?)`,
            [email, password, regCode, name, last_name, tel, zipcode, addres, city, province]
        )
        
        let userId = proband.insertId;

        let userPath = path.join(process.env.ROOT_DIR, userId + "");

        if (role == "admin") {
            userPath = path.join(process.env.ROOT_DIR);
        }

        //creamos la carpeta física en el disco en el direcotorio estático
        try {
            await fs.access(process.env.ROOT_DIR);
        } catch (error) {
            await fs.mkdir(process.env.ROOT_DIR);
        }
  
        if (role == "normal") {
            await fs.mkdir(path.join(process.env.ROOT_DIR, userId + ""));
        }
  
        const [files] = await connect.query(
            `
        INSERT INTO files (id_user,date_add,date_upd,fileDescription, fileName, is_folder, filePath) VALUES (?,?,?,?,?,?,?)
            `,
        [userId, new Date(), new Date(), "Carpeta Root", "/", 1, userPath]
        );
  
        let fileId = files.insertId; // obtenemos la ID de fila insertada en la la tabla files, pues necesitamos dicha ID para actualizar el campo currentFolder en la tabla users
        await connect.query(`UPDATE users SET currentFolder_id=? WHERE id=?`, [
            fileId,
            userId,
        ]);

        connect.release();
        */
        res.send({
            status: 'ok',
            message: `Usuario creado con id: ${id}`
        })
    } catch (error) {
        next(error)
    }
    };


module.exports = {
    newUser,
}