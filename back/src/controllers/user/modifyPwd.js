const getDB = require("../../database/db");

const modifyPwd = async (req, res, next) => {
  let connect;
  try {
    connect = await getDB();
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
      const error = new Error("Antigua password incorrecta");
      error.httpStatus = 401;
      throw error;
    }

    await connect.query(
      `
                UPDATE users
                SET password=SHA2(?, 512), lastAuthUpdate=?
                WHERE id=?
            `,
      [newPwd, new Date(), id]
    );

    res.send({
      status: "ok",
      message: "Password cambiada",
    });
  } catch (error) {
    console.log(error);
    next(error);
  } finally {
    connect?.release();
  }
};

module.exports = modifyPwd;
