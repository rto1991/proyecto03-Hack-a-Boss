"use strict";

const getDB = require("../../database/db");
const fs = require("fs/promises");
const path = require("path");

const renameDirectory = async (req, res, next) => {
  let connect;
  try {
    //definimos las constantes necesarias para realizar la operación
    const userInfo = req.userInfo; //aquí nos traemos la info del usuario
    const idUser = userInfo.id;
    const folderName = req.params.oldName; //aquí nos traemos el nombre de carpeta a la que queremos cambiar el nombre
    const newName = req.params.newName; //aquí nos traemos el nuevo nombre para la carpeta
    connect = await getDB();
    const [user] = await connect.query(`SELECT * FROM users WHERE id = ?`, [
      idUser,
    ]);
    const currentFolder_id = user[0].currentFolder_id;

    //buscamos la carpeta que queremos renombrar en la BD
    const [folder] = await connect.query(
      `SELECT * FROM files WHERE fileName = ? and id_user = ? and parent_dir_id = ? and is_folder = 1`,
      [folderName, idUser, currentFolder_id]
    );

    //verificamos que la carpeta exista en el directorio actual del usuario
    if (folder.length === 0) {
      const error = new Error(`La carpeta ${folderName} no existe.`);
      error.httpStatus = 500;
      throw error;
    }

    //verificamos que el nuevo nombre no exista en el directorio actual del usuario
    const [fileExists] = await connect.query(
      `SELECT fileName FROM files WHERE fileName = ? and id_user = ? and parent_dir_id = ?`,
      [newName, idUser, currentFolder_id]
    );

    //no puede haber en el directorio actual una carpeta que se llame igual a la propuesta (ojo, si puede haber ese nombre en otros directorios, por eso el filtro en la tabla con 3 condicionantes)
    if (fileExists.length > 0) {
      const error = new Error(
        `No podemos renombrar la carpeta, ya existe una carpeta con el nombre ${newName} en el directorio actual.`
      );
      error.httpStatus = 500;
      throw error;
    }

    //renombramos la carpeta en la BD
    await connect.query(
      "UPDATE files SET fileName = ?, date_upd = ? WHERE id = ?",
      [newName, new Date(), folder[0].id]
    );

    //renombramos la carpeta en el sistema de archivos
    await fs.rename(
      path.join(folder[0].filePath, folderName),
      path.join(folder[0].filePath, newName)
    );

    //enviamos respuesta de que la operación finalizó correctamente
    res.status(200).send({
      status: "info",
      message: `La carpeta ${folderName} se ha renombrado correctamente a ${newName}.`,
    });
  } catch (error) {
    console.log(error);
    next(error);
  } finally {
    connect.release();
  }
};

module.exports = renameDirectory;
