"use stricit";

const getDB = require("../../database/db");
const path = require("path");
const fs = require("fs");
const fileUrl = require("url");

const downloadFile = async (req, res, next) => {
  let connect;
  try {
    const { fileId } = req.params; // obtenemos el id del archivo a descargar
    const userInfo = req.userInfo; // obtenemos la info del usuario
    const idUser = userInfo.id;
    connect = await getDB();

    // buscamos el archivo en la base de datos
    const [file] = await connect.query(
      "SELECT * FROM files WHERE id = ? AND id_user = ? and in_recycle_bin = 0",
      [fileId, idUser]
    );

    // verificamos si el archivo existe
    if (!file.length) {
      const error = new Error("El archivo no existe");
      error.httpStatus = 404;
      throw error;
    }

    const filePath = file[0].filePath;
    const fileName = file[0].fileName;

    // creamos un objeto con la URI para la descargar del fichero
    let downloadObject = {};
    downloadObject = {
      downloadUrl: fileUrl.pathToFileURL(path.join(filePath, fileName)),
    };

    const stream = fs.createReadStream(path.join(filePath, fileName));
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename = "${fileName}"`);
    stream.pipe(res);
    console.log(stream);
    res.status(200).send({
      status: "info",
      message: "Fichero descargado correctamente",
    });
  } catch (error) {
    console.log(error);
    next(error);
  } finally {
    connect.release();
  }
};

module.exports = downloadFile;
