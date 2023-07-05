"use strict";

/*
Controlador que se encargará de subir un fichero, el fichero vendrá por BODY en una petición POST
El campo que traerá el fichero en el form-data se llamará "uploadedFile";
*/
const getDB = require("../../database/db");
const path = require("path");

const uploadFile = async (req, res, next) => {
  let connect;
  try {
    const userInfo = req.userInfo;
    const idUser = userInfo.id;
    connect = await getDB();
    //obtenemos el path actual donde se encuentra el usuario
    const [pathUser] = await connect.query(
      `
      SELECT f.fileName, f.filePath, u.currentFolder_id FROM users u INNER JOIN files f ON f.id = u.currentFolder_id WHERE u.id = ?`,
      [idUser]
    );
    let uploadedFile;
    let uploadPath;
    let relativePath;
    relativePath = path.join(pathUser[0].filePath, pathUser[0].fileName);

    //verificamos si viene ficheros
    console.log(req.files);
    if (!req.files || Object.keys(req.files).length === 0) {
      const error = new Error("fileUploadErrorSubida");
      error.httpStatus = 400;
      throw error;
    }

    //subimos el fichero capturado por BODY
    uploadedFile = req.files.uploadedFile;
    uploadPath = path.join(
      pathUser[0].filePath,
      pathUser[0].fileName,
      uploadedFile.name
    );

    //pero antes verificamos que no existe un fichero con exactamente el mismo nombre en el directorio

    const [dirList] = await connect.query(
      `
      SELECT f.filename, if(f.is_folder=1,'Folder','File') as Type FROM files f INNER JOIN users u ON f.parent_dir_id = u.currentFolder_id WHERE f.filename = ?`,
      [uploadedFile.name]
    );

    if (dirList.length > 0) {
      const error = new Error("fileUploadError");
      error.httpStatus = 400;
      throw error;
    }

    uploadedFile.mv(uploadPath, async (err) => {
      if (err) {
        const error = new Error("Error subiendo el fichero " + err.message);
        error.httpStatus = 500;
        throw error;
      }
      //subida con éxito, guardamos el registro en la bd
      await connect.query(
        `INSERT INTO files (id_user,date_add, date_upd, fileDescription, fileName, filePath, is_folder, parent_dir_id, size)
            VALUES (?,?,?,?,?,?,?,?,?)`,
        [
          idUser,
          new Date(),
          new Date(),
          uploadedFile.name,
          uploadedFile.name,
          relativePath,
          0,
          pathUser[0].currentFolder_id,
          uploadedFile.size,
        ]
      );
      res.status(200).send({
        status: "success",
        message: "fileUploadOk",
      });
    });
  } catch (error) {
    console.log(error);
    next(error);
  } finally {
    connect.release();
  }
};

module.exports = uploadFile;
