"use strict";

const getDB = require("../../database/db");
const fs = require("fs/promises");
const path = require("path");

const deleteDirectory = async (req, res, next) => {
  let connect;
  try {
    //definimos las constantes necesarias para realizar la operación
    const userInfo = req.userInfo; //aquí nos traemos la info del usuario
    const idUser = userInfo.id;
    const folderName = req.params.directoryToDelete; //aquí nos traemos el nombre de carpeta deseado para borrar
    connect = await getDB();

    //debemos comprobar en que directorio estamos exactamente
    const [user] = await connect.query(
      `SELECT u.*, f.fileName, f.filePath FROM users u INNER JOIN files f ON f.id = u.currentFolder_id WHERE u.id = ?`,
      [idUser]
    );
    const currentFolder_id = user[0].currentFolder_id;

    //verificar si existe dentro de este directorio el directorio que queremos borrar
    const [fileExists] = await connect.query(
      `SELECT id, fileName, filePath FROM files WHERE fileName = ? and id_user = ? and parent_dir_id = ?`,
      [folderName, idUser, currentFolder_id]
    );

    //si no existe, retornar respuesta
    if (fileExists.length === 0) {
      const error = new Error(
        `El nombre de carpeta ${folderName} no existe en el directorio actual`
      );
      error.httpStatus = 500;
      throw error;
    }

    const [directoryEmtpy] = await connect.query(
      `
    SELECT * FROM files WHERE parent_dir_id = ?
    `,
      [fileExists[0].id]
    );

    //borrar todo el contenido del directorio, esa acción se lleva a cabo si el directorio no está vacío
    const currentPath = user[0].filePath; //en la consulta primera que compruebo la ruta donde estoy, me traigo ya de paso el filePath de la tabla "files" enlazando por currentFolder_id de la tabla "users"

    //borramos la carpeta física del sistema de archivos
    const [fileToDelete] = await connect.query(
      `SELECT * FROM files WHERE fileName = ? and parent_dir_id = ?`,
      [folderName, currentFolder_id]
    );
    await fs.rmdir(path.join(currentPath, folderName), {
      recursive: true,
      force: true,
    });

    //Si el borrado de la carpeta en el filesystem no da error, continuar borrando de la BD
    //borrado del contenido (si lo hubiere)
    await connect.query(
      `
        DELETE FROM files WHERE parent_dir_id = ?
        `,
      [fileExists[0].id]
    );

    await connect.query("DELETE FROM files WHERE id = ?", [fileToDelete[0].id]);

    //enviamos respuesta de que la operación finalizó correctamente
    res.status(200).send({
      status: "info",
      message: `La carpeta "${folderName}" (y todo su contenido su lo tuviere) se borró correctamente de la carpeta "${user[0].fileName}"`,
    });
  } catch (error) {
    console.log(error);
    next(error);
  } finally {
    connect.release();
  }
};

module.exports = deleteDirectory;
