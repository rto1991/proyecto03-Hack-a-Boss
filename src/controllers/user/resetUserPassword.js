const getDB = require('../../database/db');

const resetUserPassword = async (req, res, next) => {
  

  try {
    const connect = await getDB();

    // Sacar de req.body los campos recoverCode y newPassword
    const { recoverCode, newPassword } = req.body;

    // Si alguno de esos campos está vacío devolver un error
    if (!recoverCode || !newPassword || newPassword.length < 8) {
      return res.status(400).send({
        status: "error",
        message: "Faltan campos o la nueva contraseña es muy corta"});
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
        return res.status(400).send({
          status: "error",
          message: "Código de recuperación incorrecto"});
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
    
    connect.release();
    // Devolver una response
    return res.send({
      status: 'info',
      message: 'Password del usuario cambiada con éxito',
    });
  } catch (error) {
    return res.status(500).send({
      error: "error",
      message: error});
  }
};

module.exports = resetUserPassword;