'use strict';
// const fs = require('fs');
const { newError } = require('../../../helps');
const { createFile } = require('../../database/createFile');

const newCarpet = async (req, res, next) => {
    try {
        const id = await createFile(req.id_probando);
        
            const { id_probando, fileName, email } = req.body;
        
            if(!id_probando && !fileName && !email){
                throw newError('Los campos id, fileName y email son obligatorios', 409);
            }
            
            /*
        // console.log(id);
        // Pensar aca que creo que podria meter esta carpeta en la bbdd o al menos la dirname asociada a cada id
        const charpet = fs.mkdirSync(`../users/`, { recursive: true });

        console.log(charpet);
        
        // requerir fileName de bbdd
        */
        res.send({
            status: 'ok',
            message: `Carpeta creada correctamente para el usuario de id: ${id}`,
        })
    } catch (error) {
        next(error)
    }
};

module.exports = {
    newCarpet,
}