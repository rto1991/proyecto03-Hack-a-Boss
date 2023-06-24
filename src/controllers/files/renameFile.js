"use strict";

const getDB = require("../../database/db");
const fs = require("fs/promises");
const path = require("path");

const renameFile = async (req, res) => {
  try {
    const userInfo = req.userInfo; // Aquí nos traemos la info del usuario
    const idUser = userInfo.id;
    const { fileName, newFileName } = req.body; // Aquí nos traemos el nombre actual del archivo y el nuevo nombre
    const connect = await getDB();
    const [file] = await connect.query(
      `SELECT u.*, f.*, f.id as file_id FROM files f INNER JOIN users u ON u.currentFolder_id = f.parent_dir_id WHERE f.fileName = ? and f.id_user = ?`,
      [fileName, idUser]
    );

    // Si el archivo no existe en la BD, devolver un mensaje de error
    if (file.length === 0) {
      return res
        .status(404)
        .send(`El archivo ${fileName} no existe en el directorio actual`);
    }

    // Actualizar el nombre del archivo en la BD
    await connect.query(`UPDATE files SET fileName = ? WHERE id = ?`, [
      newFileName,
      file[0].file_id,
    ]);

    // Renombrar el archivo físicamente en el sistema de archivos
    await fs.rename(
      path.join(file[0].filePath, fileName),
      path.join(file[0].filePath, newFileName)
    );

    res
      .status(200)
      .send(
        `El archivo ${fileName} se ha renombrado correctamente a ${newFileName}`
      );
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al renombrar el archivo");
  }
};

module.exports = renameFile;
