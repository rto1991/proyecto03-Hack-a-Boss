const getDB = require("../../database/db");

const resetUserPassword = async (req, res, next) => {
  let connect;
  try {
    connect = await getDB();

    // Sacar de req.body los campos recoverCode y newPassword
    const { recoverCode, newPassword } = req.body;

    // Si alguno de esos campos está vacío devolver un error
    if (!recoverCode || !newPassword || newPassword.length < 8) {
      const error = new Error(
        "Faltan campos o la nueva contraseña es muy corta"
      );
      error.httpStatus = 400;
      throw error;
    }

    // Comprobar que existe un usuario en la base de datos con ese código de recuperación activo
    const [user] = await connect.query(
      `
      SELECT id
      FROM users
      WHERE recoverCode=?
    `,
      [recoverCode]
    );

    // Si no lo hay devolver un error
    if (user.length === 0) {
      const error = new Error("Código de recuperación incorrecto");
      error.httpStatus = 400;
      throw error;
    }

    // Establecer la contraseña proporcionada a ese usuario
    await connect.query(
      `
      UPDATE users
      SET password=SHA2(?, 512), lastAuthUpdate=?, recoverCode=NULL
      WHERE id=?
    `,
      [newPassword, new Date(), user[0].id]
    );

    // Devolver una response
    res.status(200).send({
      status: "info",
      message: "Password del usuario cambiada con éxito",
    });
  } catch (error) {
    console.log(error);
    next(error);
  } finally {
    connect.release();
  }
};

module.exports = resetUserPassword;
