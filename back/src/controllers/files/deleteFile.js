"use strict";

const getDB = require("../../database/db");
const fs = require("fs/promises");
const path = require("path");

const deleteFile = async (req, res, next) => {
  let connect;
  try {
    // Definimos las constantes necesarias para realizar la operación
    const fileInfo = req.params; // Aquí nos traemos la información del archivo a borrar
    const idUser = req.userInfo.id;
    connect = await getDB();

    const [user] = await connect.query(
      `SELECT u.*, f.fileName FROM users u INNER JOIN files f ON f.id = u.currentFolder_id WHERE u.id = ?`,
      [idUser]
    );

    //buscamos el fichero en la carpeta actual del usuario
    const [file] = await connect.query(
      `SELECT * FROM files WHERE fileName = ? AND id_user = ? AND parent_dir_id = ?`,
      [fileInfo.fileName, idUser, user[0].currentFolder_id]
    );

    //SE ENTIENDE QUE ESTE ERROR NO VIENE A CUENTO YA QUE EN UNA INTERFAZ GRÁFICA ESTA SITUACIÓN NUNCA PODRÁ PRODUCIRSE
    if (file.length === 0) {
      const error = new Error(
        `El archivo ${fileInfo.fileName} no se encuentra en el directorio "${user[0].fileName}"`
      );
      error.httpStatus = 404;
      throw error;
    }

    const filePath = file[0].filePath;

    // Borramos el archivo físicamente en el sistema de archivos
    await fs.unlink(path.join(filePath, file[0].fileName));

    // Borramos el archivo en la base de datos (ya nos traemos la info del fichero en la constante file, podemos borrar por ID tranquilamente)
    await connect.query(`DELETE FROM files WHERE id = ?`, [file[0].id]);

    // Enviamos respuesta de que la operación finalizó correctamente
    res.status(200).send({
      status: "info",
      message: "deleteFile",
    });
  } catch (error) {
    console.log(error);
    next(error);
  } finally {
    connect?.release();
  }
};

module.exports = deleteFile;
