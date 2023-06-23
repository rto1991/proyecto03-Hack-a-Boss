'use strict';

const { newError } = require('../../helps');
const jwt = require('jsonwebtoken');

const validateUser = (req, res, next) => {

    let connection;

    try {
        const { authorization } = req.headers;

        if (!authorization) {
            throw newError('Falta Authorization', 406);
        }

        // console.log(req.headers);
        // console.log('pasamos al controlador');

        let token;

        try {
            token = jwt.verify(authorization, process.env.SECRET);
        } catch {
            throw newError('Token incorrecto');
        }

        console.log(token);
        
        next();
    } catch (error) {
        next(error);
    } finally{
        if (connection) {
            connection.release();
        }
    }
};

module.exports = {
    validateUser,
}