const jwt = require("jsonwebtoken");
const getDB = require("../database/db");

const isUser = async (req, res, next) => {
  let connect;
  try {
    connect = await getDB();

    const authorization = req.headers["authorization"];
    if (!authorization) {
      const error = new Error("Falta cabecera de autorización");
      error.httpStatus = 401;
      throw error;
    }

    let tokenInfo;
    try {
      tokenInfo = jwt.verify(authorization, process.env.SECRET_TOKEN);
    } catch (error) {
      error.message = "Token no válido, debes loguearte de nuevo";
      error.httpStatus = 401;
      throw error;
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
      const error = new Error("Token expirado, debes loguearte de nuevo");
      error.httpStatus = 401;
      throw error;
    }

    // añadimos a la req las informaciones del usuario que hace la petición (payload token)
    req.userInfo = tokenInfo;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  } finally {
    if (connect) connect.release();
  }
};

module.exports = isUser;
