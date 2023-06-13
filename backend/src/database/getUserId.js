'use strict';
const { getConnection } = require('./getConnection');
const {newError} = require('../../helps');

// Segundo creo esta función
const getUserId = async (id) => {
    let connection;

    try {
        connection = await getConnection();

        // aqui debo incertar el INNER JOIN para mostrar datos y archivos del id
        const [result] = await connection.query(`
        SELECT id, email, name, avatar, role, lastAuthUpdate
        FROM probando p
        WHERE id=?
        `,
        [id]
        );

        if(result.length === 0){
            throw newError('No hay usuario con ese id', 404);
        }

        return result[0];

    } finally{
        if (connection) {
            connection.release();
        }
    }
};

module.exports = {
    getUserId,
}