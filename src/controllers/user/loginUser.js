const getDB = require("../../database/db");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res, next) => {
  console.log("Petición desde FRONT");
  let connect;
  try {
    connect = await getDB();
    const { mail, pwd } = req.body;

    if (!mail || !pwd) {
      //return res.status(404).send({
      //  status: "error",
      //  message: "Falta email o falta contraseña",
      //});
      const error = new Error("Falta email o falta contraseña");
      error.httpStatus = 401;
      throw error;
    }

    //comprobar que exista el usuario
    const [user] = await connect.query(
      `
            SELECT u.*, f.fileName, f.breadCrumb
            FROM users u
            INNER JOIN files f on u.currentFolder_id = f.id
            WHERE email = ? AND password = SHA2(?, 512)
            `,
      [mail, pwd]
    );

    if (user.length === 0) {
      const error = new Error("Email o password incorrectos");
      error.httpStatus = 401;
      throw error;
    }

    //jsonwebtoken
    const info = {
      id: user[0].id,
      role: user[0].role,
      name: user[0].name,
      currentFolder_id: user[0].currentFolder_id,
      fileName: user[0].fileName,
      breadCrumb: user[0].breadCrumb,
      last_name: user[0].last_name,
      tel: user[0].tel,
      mail: user[0].email,
      zipcode: user[0].zipcode,
      address: user[0].address,
      city: user[0].city,
      province: user[0].province,
    };

    //está el usuario activo?
    if (user[0].active == 0) {
      const error = new Error(
        "El usuario aún no está activo, por favor, valida tu usuario en el enlace que te hemos enviado al correo electrónico. Revisa tu carpeta SPAM"
      );
      error.httpStatus = 402;
      throw error;
    }

    //generar el token con el método "sign" el cuál recibe como argumentos un objeto con la info
    //una palabra secreta (nuestra/servidor) (.env SECRET_TOKEN) y el tiempo de vencimiento del token
    //palabra secreta la usa para poder desencriptar la información, codigo una clave o un hash
    const token = jwt.sign(info, process.env.SECRET_TOKEN, { expiresIn: "1d" });

    //se lo envío al usuario
    res.status(200).send({
      status: "ok",
      message: "Login efectuado correctamente",
      data: {
        token,
      },
      info: info,
    });
  } catch (error) {
    console.log(error);
    next(error);
  } finally {
    if (connect) {
      connect.release();
    }
  }
};

module.exports = loginUser;
