'use strict';

/*

esta ruta está en desarrollo porque para que funcione al 100% habría
además que aplicar otro endpoint en el cual se permita la creación
del archivo.

*/

const { newError } = require('../../../helps');
const jwt = require('jsonwebtoken');
const { getConnection } = require('../../database');
const Joi = require('joi');

const users = Joi.object({
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    })

const uploadFileAnonimous = async (req, res, next, email) => {

    try {

        await users.validateAsync(req.body);

        const connections = await getConnection();
        
        const [result] = await connections.query(`
        SELECT email
        FROM probando p
        WHERE email=?
        `,
        [email]
        );

        if(result.length === 0){
            const regCode = uuidv4();

            const emailAnonimus = `
              Hemos validado tu correo correctamente.
              Gracias por utilizar nuestra plataforma, te envíamos un código de duración determinada
              que deberás utilizar para subir tus archivos. 
              Pulsa en el siguiente link para confirmar tu clave temporal: ${process.env.PUBLIC_HOST}${regCode}
            `;

            await emailAnonimus(email, "Confirma tu nuevo email", emailAnonimus);

            // Actualizar los datos finales

            await connections.query(`
              UPDATE users
              SET email=?, lastAuthUpdate=?, active=0, regCode=?
              WHERE email=?
            `,
            [email, new Date(), regCode]
            );
            connections.release();

            res.send({
                status: "ok",
                message:
                    "Clave validada correctamente",
                });
            
                const { authorization } = req.headers;
    
            if (!authorization) {
                throw newError('Falta Authorization', 406);
            }
            // let token;
    
            try {
               let token = jwt.verify(authorization, process.env.SECRET);
            } catch {
                throw newError('Token incorrecto');
            }

        } else {
            return res.status(409).send("Ya existe un usuario con ese email");
        }
        
        next();
    } catch (error) {
        next(error);

    }
};

module.exports = {
    uploadFileAnonimous,
}