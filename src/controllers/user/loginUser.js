const getDB = require("../../database/db");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res, next) => {
  try {
    const connect = await getDB();
    const { mail, pwd } = req.body;

    if (!mail || !pwd)
      return res.status(404).send({
        status: "error",
        message: "Falta email o falta contraseña",
      });

    //comprobar que exista el usuario
    const [user] = await connect.query(
      `
            SELECT u.id, u.role, u.active, u.currentFolder_id, u.name, f.fileName, f.breadCrumb
            FROM users u
            INNER JOIN files f on u.currentFolder_id = f.id
            WHERE email = ? AND password = SHA2(?, 512)
            `,
      [mail, pwd]
    );

    if (user.length === 0)
      return res.status(401).send({
        status: "error",
        message: "Email o password incorrectos",
      });

    //jsonwebtoken
    const info = {
      id: user[0].id,
      role: user[0].role,
      name: user[0].name,
      currentFolder_id: user[0].currentFolder_id,
      fileName: user[0].fileName,
      breadCrumb: user[0].breadCrumb,
    };

    //está el usuario activo?
    if (user[0].active == 0) {
      return res.status(402).send({
        status: "error",
        message:
          "El usuario aún no está activo, por favor, valida tu usuario en el enlace que te hemos enviado al correo electrónico. Revisa tu carpeta SPAM",
      });
    }

    //generar el token con el método "sign" el cuál recibe como argumentos un objeto con la info
    //una palabra secreta (nuestra/servidor) (.env SECRET_TOKEN) y el tiempo de vencimiento del token
    //palabra secreta la usa para poder desencriptar la información, codigo una clave o un hash
    const token = jwt.sign(info, process.env.SECRET_TOKEN, { expiresIn: "1d" });

    //se lo envío al usuario
    return res.status(200).send({
      status: "ok",
      message: "Login efectuado correctamente",
      data: {
        token,
      },
      info: info,
    });
    connect.release();
  } catch (error) {
    return res.status(200).send({
      status: "error",
      message: "Error interno del servidor",
      data: error,
    });
  }
};

module.exports = loginUser;
