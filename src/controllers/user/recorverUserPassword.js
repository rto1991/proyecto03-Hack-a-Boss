const getDB = require("../../database/db");

const recorverUserPassword = async (req, res) => {
  try {
    const connect = await getDB();

    const { mail } = req.body;

    if (!mail) return res.status(400).send("Faltan campos");

    //comprobamos que el email exsita en la BD
    const [currentMail] = await connect.query(
      `
            SELECT id
            FROM users
            WHERE email=?
            `,
      [mail]
    );

    if (currentMail === 0)
      return res.status(404).send("No hay usuario registrado con ese email");

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
        Si no fuiste tú el que solicitaste el cambio, por favor ignora este email.
        Puedes hacer login con tu password habitual.
        Gracias!
        `;
    const sendMail = require("../../services/sendMail");
    await sendMail(mail, "Cambio de contraseña en MyCloudDrive", mailBody);

    connect.release();

    res.status(200).send({
      status: "ok",
      message: "Email enviado",
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

module.exports = recorverUserPassword;
