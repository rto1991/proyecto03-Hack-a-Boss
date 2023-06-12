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
    SELECT f.filename as 'File Name', if(f.is_folder=1,'Folder','File') as Type FROM files f INNER JOIN users u ON f.parent_dir_id = u.currentFolder_id WHERE f.id_user = ? and f.in_recycle_bin = 0`,
      [idUser]
    );

    let responseObject = {};
    responseObject = { currentDir: pathUser[0].filename, content: dirList };

    res.status(200).send(responseObject);
  } catch (error) {
    console.log(error);
  }
};

module.exports = listDirectory;
