const getDB = require("../../database/db");

const listDirectory = async (req, res) => {
  try {
    const userInfo = req.userInfo;
    const idUser = userInfo.id;
    const connect = await getDB();
    //obtenemos el path actual donde se encuentra el usuario
    const [pathUser] = await connect.query(
      `
      SELECT f.filename, u.role FROM users u INNER JOIN files f ON f.id = u.currentFolder_id WHERE u.id = ?`,
      [idUser]
    );

    //listamos el contenido del path donde está el usuario, son los registros que coincidan con parent_dir_id de la tabla files
    const [dirList] = await connect.query(
      `
    SELECT f.id, f.filename as 'fileName', if(f.is_folder=1,'Folder','File') as 'type' FROM files f INNER JOIN users u ON f.parent_dir_id = u.currentFolder_id WHERE f.id_user = ? and f.in_recycle_bin = 0`,
      [idUser]
    );

    let responseObject = {};
    responseObject = { currentDir: pathUser[0].filename, content: dirList };

    return res.status(200).send({
      status: "info",
      data: responseObject,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message:
        "Error interno del servidor en la obtención del directorio " + error,
    });
  }
};

module.exports = listDirectory;
