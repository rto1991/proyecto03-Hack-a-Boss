const getDB = require("../../database/db");

const listDirectory = async (req, res, next) => {
  let connect;
  try {
    const userInfo = req.userInfo;
    const idUser = userInfo.id;
    const { trash } = req.params;

    connect = await getDB();
    //obtenemos el path actual donde se encuentra el usuario
    const [pathUser] = await connect.query(
      `
      SELECT f.filename, u.role FROM users u INNER JOIN files f ON f.id = u.currentFolder_id WHERE u.id = ?`,
      [idUser]
    );

    let dirList;
    //listamos el contenido del path donde está el usuario, son los registros que coincidan con parent_dir_id de la tabla files
    if (!trash) {
      [dirList] = await connect.query(
        `
      SELECT f.id, f.in_recycle_bin, f.filename as 'fileName', if(f.is_folder=1,'Folder','File') as 'type' FROM files f INNER JOIN users u ON f.parent_dir_id = u.currentFolder_id WHERE f.id_user = ? and f.in_recycle_bin = 0 ORDER BY f.is_folder DESC`,
        [idUser]
      );
    } else {
      [dirList] = await connect.query(
        `
      SELECT f.id, f.in_recycle_bin, f.filename as 'fileName', if(f.is_folder=1,'Folder','File') as 'type' FROM files f WHERE f.id_user = ? and f.in_recycle_bin = 1 ORDER BY f.fileName ASC`,
        [idUser]
      );
    }

    let responseObject = {};
    responseObject = { currentDir: pathUser[0].filename, content: dirList };

    res.status(200).send({
      status: "info",
      data: responseObject,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connect) {
      connect?.release();
    }
  }
};

module.exports = listDirectory;
