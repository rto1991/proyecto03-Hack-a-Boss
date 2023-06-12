const getDB = require("../../database/db");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  try {
    const connect = await getDB();

    const { mail, pwd } = req.body;

    if (!mail || !pwd) return res.status(400).send("Faltan datos");

    //comprobar que exista el usuario
    const [user] = await connect.query(
      `
            SELECT id, role, active, currentFolder_id
            FROM users
            WHERE email = ? AND password = SHA2(?, 512)
            `,
      [mail, pwd]
    );

    if (user.length === 0)
      return res.status(401).send("Email o password incorrectos");
    //res.send(user);

    //jsonwebtoken
    const info = {
      id: user[0].id,
      role: user[0].role,
    };

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
    connect.release();
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

module.exports = loginUser;
