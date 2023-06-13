'use strict';

const { getUserEmail } = require('../../database/getUserEmail');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { newError } = require('../../../helps');

const loginController = async (req, res, next) =>{
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw newError('Debe introducir un email y password obligatorios', 403);
        }
        
        const user = await getUserEmail(email);
        
        // console.log(user);
        
        const passwordValidate = await bcrypt.compare(password, user.password);
        
        if (!passwordValidate) {
            throw newError('Por favor verifique email y passwords correctos', 401);
        }
        
        // Creo el payload del token (como mostrará esta data el json)
        const payload = { id: user.id };

        if (passwordValidate) {
            const token = jwt.sign(payload, process.env.SECRET, {
                expiresIn: '1h',
            })
            
        // console.log(user);
        
        res.send({
            id: user.id,
            status: 'ok',
            message: 'usuario validado correctamente', 
            token: token
        })
       
    }
    } catch (error) {
        next(error)
    }
};


module.exports = {
    loginController,
}