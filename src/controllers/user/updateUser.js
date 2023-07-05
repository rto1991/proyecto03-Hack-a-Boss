const getDB = require("../../database/db");
const sendMail = require("../../services/sendMail");
const savePhoto = require("../../services/savePhoto");

const updateUser = async (req, res, next) => {
  let connect;
  try {
    const { id } = req.params;
    const { name, mail, last_name, tel, zipcode, address, city, province } =
      req.body;
    connect = await getDB();
    console.log(parseInt(id));
    console.log(req.userInfo.id);

    if (req.userInfo.id !== parseInt(id) && req.userInfo.role != "admin") {
      const error = new Error("No tienes permiso para modificar este usuario");
      error.httpStatus = 403;
      throw error;
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
        [mail]
      );

      if (existingEmail.length > 0) {
        const error = new Error("Ya existe un usuario con ese email");
        error.httpStatus = 409;
        throw error;
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
        [name, mail, new Date(), regCode, id]
      );

      // Dar una respuesta
      res.send({
        status: "ok",
        message:
          "Datos de usuario actualizados. Mira tu email para validar la nueva dirección",
      });
    } else {
      const [users] = await connect.query(
        `UPDATE users SET name=?, last_name=?, tel=?, zipcode=?, address=?, city=?, province=? WHERE id=?`,
        [name, last_name, tel, zipcode, address, city, province, id]
      );
      res.status(200).send({
        status: "ok",
        message: "Usuario modificado correctamente",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  } finally {
    connect?.release();
  }
};

module.exports = updateUser;
