const { error } = require("console");
const getDB = require("../../database/db");

const getUser = async (req, res, next) => {
  let connect;
  try {
    const { id, name } = req.params;
    connect = await getDB();
    const [users] = await connect.query(`SELECT * FROM users WHERE id=?`, [id]);
    connect.release();
    if (users.length) {
      res.send({
        status: "ok",
        data: users,
      });
    } else {
      const error = new Error("Usuario no encontrado");
      error.httpStatus = 404;
      throw error;
    }
  } catch (error) {
    console.log(error);
    next(error);
  } finally {
    connect?.release();
  }
};

module.exports = getUser;
