"use strict";

const getDB = require("../../database/db");
const fs = require("fs/promises");
const path = require("path");

const makeFolder = async (req, res) => {
  try {
    //definimos las constantes necesarias para realizar la operación
    const userInfo = req.userInfo; //aquí nos traemos la info del usuario
    const idUser = userInfo.id;
    const folderName = req.params.folderName; //aquí nos traemos el nombre de carpeta deseado
    const connect = await getDB();
    const [user] = await connect.query(`SELECT u.*, f.fileName FROM users u INNER JOIN files f ON f.id = u.currentFolder_id WHERE u.id = ?`, [
      idUser,
    ]);
    const currentFolder_id = user[0].currentFolder_id;

    //creamos el directorio primero en la BD
    // en currentFolder_id tenemos el directorio actual, pues el nuevo será un registro en la tabla "files" cuyo parent_dir_id será ese currentFolder_id
    // por parametros nos traemos el nombre de la carpeta

    //primero verificar que el nombre no existe en la BD
    const [fileExists] = await connect.query(
      `SELECT fileName FROM files WHERE fileName = ? and id_user = ? and parent_dir_id = ?`,
      [folderName, idUser, currentFolder_id]
    );

    //no puede haber en el directorio actual una carpeta que se llame igual a la propuesta (ojo, si puede haber ese nombre en otros directorios, por eso el filtro en la tabla con 3 condicionantes)
    if (fileExists.length > 0) {
      return res
        .status(500)
        .send(
          `El nombre de carpeta ${folderName} ya existe en el directorio actual`
        );
    }

    //creamos la carpeta en la BD
    //para ello, lo primero es obtener la fila del directorio acutal (currentFolder_id) ya que en este obtendremos el path donde estamos creando la nueva carpeta
    const [currentFolder] = await connect.query(
      "SELECT * FROM files WHERE id = ?",
      [currentFolder_id]
    );

    const currentPath = currentFolder[0].filePath;

    await connect.query(
      `
    INSERT INTO files (id_user, date_add, date_upd, fileDescription, fileName, filePath, is_folder, parent_dir_id) VALUES (?,?,?,?,?,?,?,?)
    `,
      [
        idUser,
        new Date(),
        new Date(),
        folderName,
        folderName,
        path.join( currentPath , currentFolder[0].fileName),
        1,
        currentFolder_id,
      ]
    );

    //creamos físicamente el fichero
    await fs.mkdir(
      path.join(currentPath,currentFolder[0].fileName, folderName)
    );

    //enviamos respuesta de que la operación finalizó correctamente
    res
      .status(200)
      .send(
        `El directorio ${folderName} se creó correctamente en la ruta ${user[0].fileName}`
      );
  } catch (error) {
    console.log(error);
  }
};

module.exports = makeFolder;
