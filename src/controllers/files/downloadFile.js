"use stricit";

const getDB = require("../../database/db");
const path = require("path");
const fs = require("fs");
const fileUrl = require("url");
const cors = require("cors");
const { Stream } = require("stream");

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

    const pathToFile = fileUrl.pathToFileURL(path.join(filePath, fileName));

    const fileContents = fs.readFileSync(path.join(filePath, fileName)); // read the file from the uploads folder with the path of the file in the database
      const readStream = new Stream.PassThrough(); // create a stream to read the file
      readStream.end(fileContents); // end the stream
      res.set('Content-disposition', 'attachment; filename=' + fileName); // set the name of the file to download with the name of the file in the database
      res.set('Content-Type', 'application/pdf');
      const fileToSend = readStream.pipe(res); // pipe the stream to the response
      return fileToSend;
    

  } catch (error) {
    console.log(error);
    next(error);
  } finally {
    connect.release();
  }
};

module.exports = downloadFile;
