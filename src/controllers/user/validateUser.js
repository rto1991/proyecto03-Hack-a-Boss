const getDB = require("../../database/db");
const validateUser = async (req, res) => {
  let connect;
  try {
    connect = await getDB();
    const { regCode } = req.params;
    const [user] = await connect.query(
      `
            SELECT id
            FROM users
            WHERE regCode=?
            `,
      [regCode]
    );

    //si no existe retorno un error
    if (user.length === 0) {
      const error = new Error("Ningún usuario con ese código");
      error.httpStatus = 404;
      throw error;
    }

    //activamos el usuario u eliminamos el codigo de registro
    await connect.query(
      `
            UPDATE users
            SET active=1, regCode=NULL
            WHERE regCode = ?
            `,
      [regCode]
    );

    res.status(200).send({
      status: "info",
      message: "Usuario validado",
    });
  } catch (error) {
    console.log(error);
    next(error);
  } finally {
    connect.release();
  }
};

module.exports = validateUser;
