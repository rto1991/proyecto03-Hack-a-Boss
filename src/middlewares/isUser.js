const jwt = require("jsonwebtoken");
const getDB = require("../database/db");

const isUser = async (req, res, next) => {
  try {
    const connect = await getDB();

    const authorization = req.headers["authorization"];

    if (!authorization)
      return res.status(401).send("Falta cabecera de autorización");

    let tokenInfo;
    try {
      tokenInfo = jwt.verify(authorization, process.env.SECRET_TOKEN);
    } catch (error) {
      res.status(401).send("Token no valido");
    }

    /**Comprobamos que el token sea valido respecto a lastAuthUpdate */
    //es decir cuand fue usado por ultima vez para saber si caducó o no
    const [user] = await connect.query(
      `
            SELECT lastAuthUpdate
            FROM users
            WHERE id=?
            `,
      [tokenInfo.id]
    );

    const lastAuthUpdate = new Date(user[0].lastAuthUpdate);
    const timestampCreateToken = new Date(tokenInfo.iat * 1000);
    //iat representa un timestapm (fecha y hora del jwt fue usado por ultima vez)

    if (timestampCreateToken < lastAuthUpdate) {
      res.status(401).send("Token caducado");
    }

    // añadimos a la req las informaciones del usuario que hace la petición (payload token)
    req.userInfo = tokenInfo;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = isUser;
