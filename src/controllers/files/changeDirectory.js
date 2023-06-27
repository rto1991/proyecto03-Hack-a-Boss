"use strict";

/*Este controlador hará el cambio de directorio actual almacenado en la tabla "users", el directorio de destino vendrá por "param", los valores posibles son
".." <-- retornamos al directorio anterior (siempre que no estemos en el directorio RAIZ (filePath = "/"))
[nombreCarpeta] <-- entramos en la carpeta nombrada
Cualquier otro parámetro lanzará un error como "Directorio inexistente"

RUTA /cd/[nombre de la carpeta]
METODO: GET
Middlewares usados: isUser (comprueba si el usuario está logueado y tiene un token válido) en otro caso lanzará un error de autenticación
*/

const getDB = require("../../database/db");
const changeDirectory = async (req, res, next) => {
  let connect;
  try {
    const userInfo = req.userInfo;
    const { destinationDirectory } = req.params;
    const idUser = userInfo.id;
    connect = await getDB();
    //obtenemos el path actual donde se encuentra el usuario
    const [pathUser] = await connect.query(
      `
    SELECT f.id, f.filePath, f.fileName, f.parent_dir_id FROM users u INNER JOIN files f ON f.id = u.currentFolder_id WHERE u.id = ?`,
      [idUser]
    );

    //verificamos si en el path actual del usuario existe la carpeta a la que nos queremos mover
    if (destinationDirectory != "..p") {
      //queremos movernos a un directorio, obtener lista de carpetas en este directorio
      const [dirList] = await connect.query(
        `
          SELECT f.filename as 'File Name' FROM files f INNER JOIN users u ON f.parent_dir_id = u.currentFolder_id WHERE f.id_user = ? and f.parent_dir_id = ? and is_folder = 1 and f.filename = ?`,
        [idUser, pathUser[0].id, destinationDirectory]
      );

      if (dirList.length === 0) {
        //no existe el directorio, informar al FRONT
        const error = new Error(
          `No existe la carpeta ${destinationDirectory} en el directorio actual`
        );
        error.httpStatus = 404;
        throw error;
      } else {
        //el directorio existe, hacer el "change" hacia él en la BD (en sistema de ficheros no hay que hacer nada)
        //esta consulta extrae un solo registro, la carpeta a la que nos vamos a cambiar
        const [selectedDir] = await connect.query(
          `
        SELECT f.id, f.filename FROM files f WHERE f.id_user = ? and f.filename = ?
        `,
          [idUser, destinationDirectory]
        );
        //cambiamos el campo currentFolder_id de la tabla users
        await connect.query(
          `
              UPDATE users SET currentFolder_id = ? WHERE id = ?`,
          [selectedDir[0].id, idUser]
        );
        //informamos al front
        res.status(200).send({
          status: "info",
          message: `Directorio cambiado correctamente, directorio actual "${selectedDir[0].filename}"`,
        });
      }
    } else {
      //usamos el parámetro ".." que hace subir un nivel
      //primero verificamos si no estamos en el ROOT del usuario
      if (pathUser[0].fileName != "/") {
        //no estamos en top level, retroceder un directorio
        //el directorio al que hay que retroceder es el valor "parent_dir_id" del path actual del usuario, que debe ser distinto de 0 si el filePath es distinto a "/"
        //cambiamos el campo currentFolder_id de la tabla users
        await connect.query(
          `
            UPDATE users SET currentFolder_id = ? WHERE id = ?`,
          [pathUser[0].parent_dir_id, idUser]
        );
        //informamos al front
        const [selectedDir] = await connect.query(
          `
          SELECT f.id, f.filename FROM files f WHERE f.id = ?
          `,
          [pathUser[0].parent_dir_id]
        );
        res.status(200).send({
          status: "info",
          message: `Directorio cambiado correctamente, directorio actual "${selectedDir[0].filename}"`,
        });
      } else {
        //estamos en el top level, informar de que no puede retroceder más
        const error = new Error(
          `No es posible subir más niveles, estás en tu carpeta raiz ahora mismo`
        );
        error.httpStatus = 404;
        throw error;
      }
    }
  } catch (error) {
    console.log(error);
    next(error);
  } finally {
    connect.release();
  }
};

module.exports = changeDirectory;
