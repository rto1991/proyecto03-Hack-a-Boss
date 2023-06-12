"use strict";

const getDB = require("../../database/db");
const fs = require("fs/promises");
const path = require("path");

const recoverFile = async (req, res) => {
  try {
    // Obtenemos la información del archivo a recuperar de los parámetros de la solicitud
    const fileName = req.params.fileName;
    const idUser = req.userInfo.id;

    // Nos conectamos a la base de datos y buscamos el archivo a recuperar
    const connect = await getDB();
    const [file] = await connect.query(
      `SELECT u.*, f.*, f.id as file_id FROM files f INNER JOIN users u ON u.id = f.id_user WHERE f.fileName = ? and f.id_user = ? and f.in_recycle_bin = 1`,
      [fileName, idUser]
    );

    // Verificamos si el archivo ya está fuera de la papelera
    if (file.length === 0) {
      return res
        .status(400)
        .send(`El archivo ${fileName} no está en la papelera`);
    }

    // Actualizamos el estado del archivo en la base de datos
    await connect.query(`UPDATE files SET in_recycle_bin = 0 WHERE id = ?`, [
      file[0].id,
    ]);

    // Enviamos una respuesta al cliente indicando que la operación se realizó correctamente
    res
      .status(200)
      .send(`El archivo ${fileName} se ha recuperado correctamente.`);
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error al recuperar el archivo ${fileName}`);
  }
};

module.exports = recoverFile;
