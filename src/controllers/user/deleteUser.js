const getDB = require("../../database/db");

const deleteUser = async (req, res, next) => {
  let connect;
  try {
    const { id } = req.params;
    connect = await getDB();

    //agragar esto
    // Si el usuario que viene del token no tiene rol de admin o no es el usuario que queremos eliminar
    // lanzamos un error
    if (req.userInfo.id !== id || req.userInfo.role != "admin") {
      const error = new Error("No tiene permiso para eliminar este usuario");
      error.httpStatus = 401;
      throw error;
    }

    await connect.query(
      `
              UPDATE users
              SET password="[borrado]", name="[borrado]", avatar=NULL, active=0, deleted=1, lastAuthUpdate=?
              WHERE id=?
            `,
      [new Date(), id]
    );

    res.send({
      status: "ok",
      message: `El usuario con id: ${id} eliminado`,
    });
  } catch (error) {
    console.log(error);
    next(error);
  } finally {
    connect.release();
  }
};

module.exports = deleteUser;
