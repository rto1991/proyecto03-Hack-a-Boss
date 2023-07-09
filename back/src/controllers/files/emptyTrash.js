"use strict";

const getDB = require("../../database/db");
const path = require("path");
const fs = require("fs/promises");

const emptyTrash = async (req, res) => {
  try {
    const idUser = req.userInfo.id;
    const connect = await getDB();
    const [files] = await connect.query(
      `SELECT * FROM files WHERE id_user = ? AND in_recycle_bin = 1`,
      [idUser]
    );

    if (files.length === 0) {
      res.status(400).send("La papelera está vacía, no hay nada que vaciar");
    }
    //borrar ficheros del sistema de archivos
    for (const file of files) {
      const filePath = path.join(file.filePath, file.fileName);
      await fs.rm(filePath, { force: true });
    }

    //borrado en la BD
    await connect.query(
      `DELETE FROM files WHERE in_recycle_bin = 1 AND id_user = ?`,
      [idUser]
    );

    res.status(200).send(`La papelera se ha vaciado correctamente.`);
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error al vaciar la papelera.`);
  }
};

module.exports = emptyTrash;
