"use strict";

const getDB = require("../../database/db");
const fs = require("fs/promises");
const path = require("path");
let connect;
const moveToTrash = async (req, res, next) => {
  try {
    // Definimos las constantes necesarias para realizar la operación
    const id = req.params.id; // Aquí nos traemos la información del archivo a mover a la papelera
    const idUser = req.userInfo.id;
    connect = await getDB();
    const [file] = await connect.query(
      `SELECT u.*, f.*, f.id as file_id FROM files f INNER JOIN users u ON u.currentFolder_id = f.parent_dir_id WHERE f.id = ? AND f.id_user = ?`,
      [id, idUser]
    );

    // Verificar si el archivo ya se encuentra en la papelera
    if (file[0].in_recycle_bin === 1) {
      const error = new Error(
        `El archivo ${file[0].fileName} ya se encuentra en la papelera.`
      );
      error.httpStatus = 404;
      throw error;
    }

    // Actualizar el estado del archivo en la base de datos
    await connect.query(`UPDATE files SET in_recycle_bin = 1 WHERE id = ?`, [
      file[0].file_id,
    ]);

    // Enviamos respuesta de que la operación finalizó correctamente
    res.status(200).send({
      status: "info",
      message: `El archivo ${file[0].fileName} se ha movido a la papelera correctamente.`,
    });
  } catch (error) {
    next(error);
  } finally {
    connect.release();
  }
};

module.exports = moveToTrash;
