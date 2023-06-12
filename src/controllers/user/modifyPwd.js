const getDB = require('../../database/db');


const modifyPwd = async (req, res) => {
  try {
            
        const connect = await getDB();
        const { oldPwd, newPwd } = req.body;
        const { id } = req.params;
        
        const [user] = await connect.query(
            `
                SELECT id
                FROM users
                WHERE id=? AND password=SHA2(?, 512)
            `,
            [id, oldPwd]
        );

        
        if (user.length === 0) {
            return res.status(401).send('Antigua password incorrecta')
        }

        
        await connect.query(
            `
                UPDATE users
                SET password=SHA2(?, 512), lastAuthUpdate=?
                WHERE id=?
            `,
            [newPwd, new Date(), id]
        );
        connect.release();
        res.send({
            status: 'ok',
            message: 'Password cambiada',
        });
  } catch (error) {
    console.log(error);
  } 
};

module.exports = modifyPwd;
