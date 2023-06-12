"use strict";

const getDB = require("../../database/db");
const fs = require("fs/promises");
const path = require("path");

const moveToTrash = async (req, res) => {
  try {
    // Definimos las constantes necesarias para realizar la operación
    const fileName = req.params.fileName; // Aquí nos traemos la información del archivo a mover a la papelera
    const idUser = req.userInfo.id;
    const connect = await getDB();
    const [file] = await connect.query(
      `SELECT u.*, f.*, f.id as file_id FROM files f  INNER JOIN users u ON u.parentFolder_id = f.parent_dir_id WHERE f.fileName = ? AND f.id_user = ?`,
      [fileName, idUser]
    );

    // Verificar si el archivo ya se encuentra en la papelera
    if (file[0].in_recycle_bin === 1) {
      return res
        .status(400)
        .send(`El archivo ${fileName} ya se encuentra en la papelera.`);
    }

    // Actualizar el estado del archivo en la base de datos
    await connect.query(`UPDATE files SET in_recycle_bin = 1 WHERE id = ?`, [
      file[0].file_id,
    ]);

    // Enviamos respuesta de que la operación finalizó correctamente
    res
      .status(200)
      .send(`El archivo ${fileName} se ha movido a la papelera correctamente.`);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(`Error al mover el archivo ${fileName} a la papelera.`);
  }
};

module.exports = moveToTrash;
