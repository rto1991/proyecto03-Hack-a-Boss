"use strict";

const getDB = require("../../database/db");
const fs = require("fs/promises");
const path = require("path");
const Joi = require("joi");

const renameFile = async (req, res, next) => {
  let connect;
  try {
    const userInfo = req.userInfo; // Aquí nos traemos la info del usuario
    const idUser = userInfo.id;
    const { fileName, newFileName } = req.body; // Aquí nos traemos el nombre actual del archivo y el nuevo nombre
    connect = await getDB();

    //validaciones (by @joffrey)
    const schema = Joi.object({
      folderName: Joi.string().pattern(new RegExp("^[A-Za-z0-9\\s]+$")),
    });
    try {
      await schema.validateAsync({
        folderName: newName,
      });
    } catch (err) {
      const error = new Error(
        "El nuevo nombre del fichero tiene caracteres no permitidos, por favor, utiliza sólo los carácteres permitidos"
      );
      error.httpStatus = 404;
      throw error;
    }

    const [file] = await connect.query(
      `SELECT u.*, f.*, f.id as file_id FROM files f INNER JOIN users u ON u.currentFolder_id = f.parent_dir_id WHERE f.fileName = ? and f.id_user = ?`,
      [fileName, idUser]
    );

    // Si el archivo no existe en la BD, devolver un mensaje de error
    if (file.length === 0) {
      const error = new Error(
        `El archivo ${fileName} no existe en el directorio actual`
      );
      error.httpStatus = 404;
      throw error;
    }

    // Renombrar el archivo físicamente en el sistema de archivos
    await fs.rename(
      path.join(file[0].filePath, fileName),
      path.join(file[0].filePath, newFileName)
    );

    // Actualizar el nombre del archivo en la BD
    await connect.query(`UPDATE files SET fileName = ? WHERE id = ?`, [
      newFileName,
      file[0].file_id,
    ]);

    res.status(200).send({
      status: "info",
      message: "renameDirectoryOk",
    });
  } catch (error) {
    console.log(error);
    next(error);
  } finally {
    connect?.release();
  }
};

module.exports = renameFile;
