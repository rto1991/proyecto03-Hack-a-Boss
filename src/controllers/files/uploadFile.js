"use strict";

/*
Controlador que se encargará de subir un fichero, el fichero vendrá por BODY en una petición POST
El campo que traerá el fichero en el form-data se llamará "uploadedFile";
*/
const getDB = require("../../database/db");
const path = require("path");

const uploadFile = async (req, res) => {
  try {
    const userInfo = req.userInfo;
    const idUser = userInfo.id;
    const connect = await getDB();
    //obtenemos el path actual donde se encuentra el usuario
    const [pathUser] = await connect.query(
      `
      SELECT f.fileName, f.filePath, u.currentFolder_id FROM users u INNER JOIN files f ON f.id = u.currentFolder_id WHERE u.id = ?`,
      [idUser]
    );
    let uploadedFile;
    let uploadPath;
    let relativePath;
    relativePath = path.join(pathUser[0].filePath,pathUser[0].fileName);

    //verificamos si viene ficheros
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("¡No hay ficheros para subir!");
    }

    //subimos el fichero capturado por BODY
    uploadedFile = req.files.uploadedFile;
    uploadPath = path.join(pathUser[0].filePath, pathUser[0].fileName, uploadedFile.name);

    //pero antes verificamos que no existe un fichero con exactamente el mismo nombre en el directorio

    const [dirList] = await connect.query(
      `
      SELECT f.filename as 'File Name', if(f.is_folder=1,'Folder','File') as Type FROM files f INNER JOIN users u ON f.parent_dir_id = u.currentFolder_id WHERE f.id_user = ?`,
      [idUser]
    );

    uploadedFile.mv(uploadPath, async (err) => {
      if (err) {
        res.status(500).send("Error subiendo el fichero: " + err);
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
      res.status(200).send("El fichero se subió correctamente al servidor");
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = uploadFile;
