const getDB = require("../../database/db");
const sendMail = require("../../services/sendMail");
const savePhoto = require("../../services/savePhoto");

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, mail } = req.body;
    const connect = await getDB();
    console.log(parseInt(id));
    console.log(req.userInfo.id);

    if (req.userInfo.id !== parseInt(id) && req.userInfo.role != "admin") {
      return res
        .status(401)
        .send("No tiene permiso para modificar este usuario");
    }

    const [currentUser] = await connect.query(
      `
            SELECT email
            FROM users
            WHERE id=?
          `,
      [id]
    );

    console.log(req.files);
    if (req.files && req.files.avatar) {
      const userAvatar = await savePhoto(req.files.avatar);

      await connect.query(
        `
              UPDATE users
              SET avatar=?
              WHERE id=?
            `,
        [userAvatar, id]
      );
    }

    if (mail && mail !== currentUser[0].email) {
      // Comprobar que no exista otro usuario con el nuevo email
      const [existingEmail] = await connect.query(
        `
              SELECT id
              FROM users
              WHERE email=?
            `,
        [email]
      );

      if (existingEmail.length > 0) {
        return res.status(409).send("Ya existe un usuario con ese email");
      }

      // Creo un código de registro (contraseña temporal de un solo uso)
      // genero regCode
      const regCode = uuidv4();

      // Mando un mail al usuario con el link de confirmación de email
      const emailBody = `
              Acabas de modificar tu email en la app MyCloudDrive. 
              Pulsa en este link para validar tu nuevo email: ${process.env.PUBLIC_HOST}${regCode}
            `;

      await sendMail(mail, "Confirma tu nuevo email", emailBody);

      // Actualizar los datos finales

      await connect.query(
        `
              UPDATE users
              SET name=?, email=?, lastAuthUpdate=?, active=0, regCode=?
              WHERE id=?
            `,
        [name, email, new Date(), regCode, id]
      );
      connect.release();
      // Dar una respuesta
      res.send({
        status: "ok",
        message:
          "Datos de usuario actualizados. Mira tu email para validar la nueva dirección",
      });
    } else {
      const [users] = await connect.query(
        `UPDATE users SET name=? WHERE id=?`,
        [name, id]
      );
      connect.release();
      return res.status(200).send({
        status: "ok",
        mensaje: "Usuario modificado correctamente",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = updateUser;
