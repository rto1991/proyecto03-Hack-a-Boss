const getDB = require('../../database/db');

const getUser = async (req,res) => {
    
    try {
        const {id, name} = req.params;
        const connect = await getDB();
        const [users] = await connect.query(
            `SELECT * FROM users WHERE id=?`,[id]
        )
        connect.release();
        if(users.length){
            return res.send({
                "status": "ok",
                "data": users
            });
        }else{
            res.status(400).send('Usuario no encontrado')
        }
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = getUser;