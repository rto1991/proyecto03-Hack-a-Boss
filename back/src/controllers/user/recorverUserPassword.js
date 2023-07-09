const getDB = require("../../database/db");

const recorverUserPassword = async (req, res, next) => {
  let connect;
  try {
    connect = await getDB();
    const { mail } = req.body;

    //comprobamos que el email exsita en la BD
    const [currentMail] = await connect.query(
      `
            SELECT id
            FROM users
            WHERE email=?
            `,
      [mail]
    );

    if (currentMail.length === 0) {
      const error = new Error("No hay usuario registrado con ese email");
      error.httpStatus = 404;
      throw error;
    }

    //generamos un codigo de recuiperacion
    const { v4: uuidv4 } = require("uuid");
    const recoverCode = uuidv4();

    //actualizamos la BD
    await connect.query(
      `
            UPDATE users
            SET recoverCode=?, lastAuthUpdate=?
            WHERE email=?
          `,
      [recoverCode, new Date(), mail]
    );

    //enviamos el codigo por email
    const mailBody = `
        Se solicitó cambio de contraseña para el usuario registrado con este email en MyCloudDrive.
        El código de recuperación es: ${recoverCode}
        Si no fuiste tú el que solicitaste el cambio, por favor ignora este email, puedes hacer login con tu password habitual.
        Gracias!
        `;
    const sendMail = require("../../services/sendMail");
    await sendMail(mail, "Cambio de contraseña en MyCloudDrive", mailBody);

    res.status(200).send({
      status: "info",
      message:
        "Hemos enviado un email a tu cuenta con un código de reseteo, úsalo en el siguiente formulario para poder establecer una nueva contraseña",
    });
  } catch (error) {
    console.log(error);
    next(error);
  } finally {
    connect?.release();
  }
};

module.exports = recorverUserPassword;
