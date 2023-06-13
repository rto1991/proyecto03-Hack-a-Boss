'use strict';
const { getConnection } = require('./getConnection');
const {newError} = require('../../helps');

// Segundo creo esta función
const getUserEmail = async (email) => {
    let connection;

    try {
        connection = await getConnection();

        // aqui debo insertar el INNER JOIN para mostrar datos y archivos del id
        const [result] = await connection.query(`
        SELECT id, email, name, avatar, role, password
        FROM probando p
        WHERE email=?
        `,
        [email]
        );

        if(result.length === 0){
            throw newError('No hay usuario con ese email', 404);
        }

        return result[0];

    } finally{
        if (connection) {
            connection.release();
        }
    }
};

module.exports = {
    getUserEmail,
}
