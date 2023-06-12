const getDB = require('../../database/db');

const deleteUser = async (req,res) => {
    try {
        const {id} = req.params;
        const connect = await getDB();

        //agragar esto
        // Si el usuario que viene del token no tiene rol de admin o no es el usuario que queremos eliminar
        // lanzamos un error
        if(req.userInfo.id !== id || req.userInfo.role != 'admin'){
            return res.status(401).send('No tiene permiso para eliminar este usuario')
        }

        await connect.query(
            `
              UPDATE users
              SET password="[borrado]", name="[borrado]", avatar=NULL, active=0, deleted=1, lastAuthUpdate=?
              WHERE id=?
            `,
            [new Date(), id]
        );
        
        connect.release();
        res.send({
            status: 'ok',
            message: `El usuario con id: ${id} eliminado`,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

module.exports = deleteUser;