const getDB = require('../../database/db');


const validateUser = async (req,res) => {
    try {
        const connect = await getDB();

        const {regCode} = req.params;

        const [user] = await connect.query(
            `
            SELECT id
            FROM users
            WHERE regCode=?
            `,
            [regCode]
        )

        //si no existe retorno un error
        if(user.length === 0) return res.status(404).send('Ningun usuario con ese código');

        //activamos el usuario u eliminamos el codigo de registro
        await connect.query(
            `
            UPDATE users
            SET active=true, regCode=NULL
            WHERE regCode = ?
            `,
            [regCode]
        )
        
        connect.release();

        res.status(200).send({
            status: 'ok',
            message: 'Usuario validado'
        });

    } catch (error) {
        console.log(error);
        res.send(error);
    }
}


module.exports = validateUser;