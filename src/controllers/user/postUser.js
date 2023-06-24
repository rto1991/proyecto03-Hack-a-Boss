const getDB = require("../../database/db");
const fs = require("fs/promises");
const path = require("path");

const postUser = async (req, res) => {
  try {
    let { mail, pwd, role, name, last_name } = req.body;
    const connect = await getDB();

    //la variable "role" especificará que tipo de usuario se crea, actualmente para el usuario ADMIN no hay lógica creada en el programa, por tanto
    //si se crea un usuario con el parémtro ROLE = 'admin' en el bojeto BODY de esta petición, se creará un usuario ADMIN pero no funcionará correctamente
    //está para implementarse en futuras versiones de esta aplicación
    //JSB18RT GRUPO A

    if (!role) {
      role = "normal";
    }

    const [userExist] = await connect.query(
      `SELECT id, date FROM users WHERE email=?`,
      [mail]
    );

    if (userExist.length > 0) {
      return res.status(409).send({
        status: "error",
        message: "El usuario ya existe",
      });
    }

    /**preparo para mandar mail de confirmacion */
    //primero generamos un codigo de registro con uuidv4
    const { v4: uuidv4 } = require("uuid");
    const regCode = uuidv4();

    /**armamos el body del mail */
    const bodyMail = `
        Te registraste en My Cloud Drive.
        Pulsa el enlace para activar la cuenta: ${process.env.PUBLIC_HOST}${regCode}
        `;
    /**llamo a enviar mail */
    const sendMail = require("../../services/sendMail");
    sendMail(mail, "Correo de verificación My Cloud Drive", bodyMail);

    const [users] = await connect.query(
      //SHA2 es un estandar de cifrado que recibe como parámetro la llave que se utilizara y el número de bits del HASH,
      //de esta forma el valor será cifrado y se almacenará en la base de datos
      //SHA --> Secure Hash Algorithm
      `INSERT INTO users (email, password, regCode, role, name, last_name) VALUES (?,SHA2(?,512),?,?,?,?)`,
      [mail, pwd, regCode, role, name, last_name]
    );

    //crear su carpeta personal

    let userId = users.insertId; //obtenemos el id de usuario de la instancia USERS
    //creamos el registro en la BD del fichero inicial de la carpeta ROOT

    let userPath = path.join(process.env.ROOT_DIR, userId + "");

    //creamos la carpeta física en el disco en el direcotorio estático
    try {
      await fs.access(process.env.ROOT_DIR);
    } catch (error) {
      await fs.mkdir(process.env.ROOT_DIR);
    }

    if (role == "normal") {
      await fs.mkdir(path.join(process.env.ROOT_DIR, userId + ""));
    }

    const [files] = await connect.query(
      `
    INSERT INTO files (id_user,date_add,date_upd,fileDescription, fileName, is_folder, filePath) VALUES (?,?,?,?,?,?,?)
    `,
      [userId, new Date(), new Date(), "Carpeta Root", "/", 1, userPath]
    );

    let fileId = files.insertId; // obtenemos la ID de fila insertada en la la tabla files, pues necesitamos dicha ID para actualizar el campo currentFolder en la tabla users
    await connect.query(`UPDATE users SET currentFolder_id=? WHERE id=?`, [
      fileId,
      userId,
    ]);

    //liberamos la conexión usada
    connect.release();

    return res.status(200).send({
      status: "ok",
      message: "Usuario creado correctamente",
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error,
      data: error,
    });
  }
};

module.exports = postUser;
