"use stricit";

const getDB = require("../../database/db");
const fs = require("fs/promises");
const path = require("path");
const fileUrl = require("url");

const downloadFile = async (req, res) => {
  try {
    const { fileId } = req.params; // obtenemos el id del archivo a descargar
    const userInfo = req.userInfo; // obtenemos la info del usuario
    const idUser = userInfo.id;
    const connect = await getDB();

    // buscamos el archivo en la base de datos
    const [file] = await connect.query(
      "SELECT * FROM files WHERE id = ? AND id_user = ? and in_recycle_bin = 0",
      [fileId, idUser]
    );

    // verificamos si el archivo existe
    if (!file.length) {
      return res.status(404).send("El archivo no existe");
    }

    const filePath = file[0].filePath;
    const fileName = file[0].fileName;

    // creamos un objeto con la URI para la descargar del fichero
    let downloadObject = {};
    downloadObject = {
      "download url": fileUrl.pathToFileURL(path.join(filePath, fileName)),
    };
    res.status(200).send(downloadObject);
    //res.download(path.join(filePath , fileName));
  } catch (error) {
    console.log(error);
  }
};

module.exports = downloadFile;
