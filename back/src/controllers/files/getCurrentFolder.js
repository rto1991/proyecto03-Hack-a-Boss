const getDB = require("../../database/db");
//ESTE MÓDULO NO SE USA EN EL PROYECTO 3
const getCurrentFolder = async (req, res) => {
  try {
    const userInfo = req.userInfo;
    const idUser = userInfo.id;
    const connect = await getDB();
    //obtenemos el path actual donde se encuentra el usuario
    const [pathUser] = await connect.query(
      `
    SELECT f.fileName FROM users u INNER JOIN files f ON f.id = u.currentFolder_id WHERE u.id = ?`,
      [idUser]
    );

    res.status(200).send(`El directorio actual es "${pathUser[0].fileName}"`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = getCurrentFolder;
