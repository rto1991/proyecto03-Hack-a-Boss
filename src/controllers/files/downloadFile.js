"use stricit";

const getDB = require("../../database/db");
const path = require("path");
const fs = require("fs");
const fileUrl = require("url");
const cors = require("cors");
const { Stream } = require("stream");
const compressing = require("compressing");

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
    let fileName = file[0].fileName;

    // creamos un objeto con la URI para la descargar del fichero
    let downloadObject = {};
    downloadObject = {
      downloadUrl: fileUrl.pathToFileURL(path.join(filePath, fileName)),
    };

    const pathToFile = fileUrl.pathToFileURL(path.join(filePath, fileName));
    let finalPath = pathToFile;
    let compressFileName = fileName + ".tar";

    if (file[0].is_folder == 1) {
      finalPath = fileUrl.pathToFileURL(path.join(filePath, compressFileName));
      //comprimir carpeta y enviar ZIP
      compressing.tar
        .compressDir(
          path.join(filePath, fileName),
          path.join(filePath, compressFileName)
        )
        .then(() => {
          fs.readFile(finalPath, (err, data) => {
            console.log("Intento leer", finalPath);
            console.log("fichero", compressFileName);
            if (err) {
              return next(err);
            }
            res.setHeader(
              "Content-Disposition",
              'attachment: filename="' + compressFileName + '"'
            );
            res.send(data);
          });
        })
        .catch((err) => {
          throw err;
        });
    } else {
      fs.readFile(pathToFile, (err, data) => {
        if (err) {
          return next(err);
        }
        res.setHeader(
          "Content-Disposition",
          'attachment: filename="' + fileName + '"'
        );
        res.send(data);
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  } finally {
    connect.release();
  }
};

module.exports = downloadFile;
