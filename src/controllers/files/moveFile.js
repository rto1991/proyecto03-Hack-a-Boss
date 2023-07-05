"use strict";

const fs = require("fs");
const move = require("fs-move");
const path = require("path");
const getDB = require("../../database/db");

const moveFile = async (req, res, next) => {
  let connect;
  try {
    const { fileId, destinationFolderName } = req.body;
    const userInfo = req.userInfo;
    const idUser = userInfo.id;
    connect = await getDB();

    const [user] = await connect.query(
      `SELECT u.*, f.fileName FROM users u INNER JOIN files f ON f.id = u.currentFolder_id WHERE u.id = ?`,
      [idUser]
    );

    // Verificar si el archivo pertenece al usuario actual y existe en el current_dir
    const [file] = await connect.query(
      `SELECT * FROM files WHERE id = ? AND id_user = ? AND in_recycle_bin = 0 AND parent_dir_id = ?`,
      [fileId, idUser, user[0].currentFolder_id]
    );

    if (file.length === 0) {
      const error = new Error("Archivo no encontrado");
      error.httpStatus = 404;
      throw error;
    }

    // Verificar si la nueva carpeta existe y pertenece al usuario actual
    const [newFolder] = await connect.query(
      `SELECT * FROM files WHERE filename = ? AND id_user = ? AND is_folder = 1 AND in_recycle_bin = 0`,
      [destinationFolderName, idUser]
    );

    if (newFolder.length === 0) {
      const error = new Error("Carpeta no encontrada");
      error.httpStatus = 404;
      throw error;
    }

    // Mover el archivo a la nueva carpeta
    const fileName = file[0].fileName;
    const oldPath = path.join(file[0].filePath, fileName);
    const newPath = path.join(
      newFolder[0].filePath,
      newFolder[0].fileName,
      fileName
    );
    (async () => {
      await move(oldPath, newPath, {
        merge: false,
        overwrite: false,
        purge: false,
        filter(oldPath, newPath) {
          return true;
        },
      });
    })();

    await connect.query(
      `UPDATE files SET parent_dir_id = ?, date_upd = now(), filePath = ? WHERE id = ?`,
      [
        newFolder[0].id,
        path.join(newFolder[0].filePath, newFolder[0].fileName),
        fileId,
      ]
    );

    res.status(200).send({
      status: "info",
      message: "Archivo movido exitosamente",
    });
  } catch (error) {
    console.log(error);
    next(error);
  } finally {
    connect?.release();
  }
};

module.exports = moveFile;
