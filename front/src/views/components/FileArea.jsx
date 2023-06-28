import { useEffect } from "react";
import { useUser } from "../../UserContext";
import "./FileArea.css";
import Swal from "sweetalert2";
import { Menu, Item, useContextMenu } from "react-contexify";
import "react-contexify/ReactContexify.css";

const MENU_ID = "contextMenu1";
const MAIN_AREA_MENU = "mainAreaMenu";

function FileArea({
  dir,
  setFiles,
  files,
  changeDir,
  renameDir,
  renameFile,
  makeFolder,
  deleteDir,
  deleteFile,
  uploadFile,
  downloadFile,
  info,
  moveFile,
  enPapelera,
  moveToTrash,
  recoverFromTrash,
  filesInTrash,
  setEnPapelera,
}) {
  const [user] = useUser();
  const { show } = useContextMenu();

  useEffect(() => {
    async function getFiles() {
      await dir();
    }
    getFiles();
  }, []);

  async function moverFichero(fileId, destinationFolderName) {
    await moveFile(fileId, destinationFolderName);
    await dir();
  }

  async function renameDirectory(oldName, newName) {
    await renameDir(oldName, newName);
    await dir();
  }

  async function renameFil(oldName, newName) {
    await renameFile(oldName, newName);
    await dir();
  }

  async function deleteDirectory(folderName) {
    await deleteDir(folderName);
    await dir();
  }

  async function deleteFil(fileName) {
    await deleteFile(fileName);
    await dir();
  }

  const crearCarpeta = async (folderName) => {
    await makeFolder(folderName);
    await dir();
  };

  async function moverAPapelera(id) {
    await moveToTrash(id);
    await dir();
  }

  async function recuperarDeLaPapelera(id) {
    await recoverFromTrash(id);
    setEnPapelera(false);
  }

  const subirArchivo = async () => {
    const { value: file } = await Swal.fire({
      title: "Selecciona un fichero",
      input: "file",
    });

    if (file) {
      const formData = new FormData();
      formData.append("uploadedFile", file);
      const myHeaders = new Headers();
      myHeaders.append("authorization", user.data.token);
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formData,
        redirect: "follow",
      };

      fetch("http://localhost:3000/uploadFile", requestOptions)
        .then((response) => response.text())
        .then(() => dir())
        .catch((error) => console.log("error", error));
    }
  };

  const bajarFichero = async (fileId, fileName) => {
    await downloadFile(fileId, fileName);
  };

  function handleContextMenu(event, data) {
    console.log(event, data.menu_id);
    if (event.target.className != "fileArea" && data.menu_id == MENU_ID)
      show({
        id: data.menu_id,
        event: event,
        props: { key: data },
      });

    if (
      event.target.className == "fileArea" &&
      data.menu_id == MAIN_AREA_MENU
    ) {
      show({
        id: data.menu_id,
        event: event,
        props: { key: data },
      });
    }
  }

  const handleItemClick = ({ id, event, props }) => {
    switch (id) {
      case "rename":
        if (props.key.type == "Folder") {
          //renombramos carpeta
          Swal.fire({
            title: "Nuevo nombre para la carpeta " + props.key.fileName,
            input: "text",
            inputAttributes: {
              autocapitalize: "off",
            },
            showCancelButton: true,
            confirmButtonText: "Renombrar carpeta",
            showLoaderOnConfirm: true,
            preConfirm: async (folderName) => {
              await renameDirectory(props.key.fileName, folderName);
            },
            allowOutsideClick: () => !Swal.isLoading(),
          }).then((result) => {
            if (result.isConfirmed) {
            }
          });
        } else {
          //renombramos archivo
          Swal.fire({
            title: "Nuevo nombre para el fichero " + props.key.fileName,
            input: "text",
            inputAttributes: {
              autocapitalize: "off",
            },
            showCancelButton: true,
            confirmButtonText: "Renombrar fichero",
            showLoaderOnConfirm: true,
            preConfirm: async (fileName) => {
              await renameFil(props.key.fileName, fileName);
            },
            allowOutsideClick: () => !Swal.isLoading(),
          }).then((result) => {
            if (result.isConfirmed) {
            }
          });
        }

        break;
      case "delete":
        if (enPapelera) {
          Swal.fire({
            title: `¿Seguro de borrar "${props.key.fileName}"? ${
              props.key.type == "Folder"
                ? ", este elemento es de tipo carpeta, se borrarán todos los elementos que contenga"
                : ""
            }`,
            showCancelButton: true,
            confirmButtonText: "Si, borrar",
            cancelButtonText: "Atrás",
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              props.key.type == "Folder"
                ? deleteDirectory(props.key.fileName)
                : deleteFil(props.key.fileName);
            }
          });
        } else {
          moverAPapelera(props.key.id);
        }

        break;
      case "makeFolder":
        Swal.fire({
          title: "Crear nueva carpeta",
          input: "text",
          inputAttributes: {
            autocapitalize: "off",
          },
          showCancelButton: true,
          confirmButtonText: "Crear carpeta",
          showLoaderOnConfirm: true,
          preConfirm: async (folderName) => {
            await crearCarpeta(folderName);
          },
          allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
          if (result.isConfirmed) {
          }
        });
        break;
      case "uploadFile":
        subirArchivo();
        break;
      case "download":
        const Toast = Swal.mixin({
          toast: true,
          position: "top-right",
          iconColor: "white",
          customClass: {
            popup: "colored-toast",
          },
          showConfirmButton: false,
          timer: 3500,
          timerProgressBar: true,
        });

        Toast.fire({
          icon: "success",
          title:
            props.key.type == "Folder"
              ? "Comprimiendo y descargando carpeta"
              : "Descargando tu archivo",
        });

        bajarFichero(
          props.key.id,
          props.key.type == "Folder"
            ? props.key.fileName + ".tar"
            : props.key.fileName
        );
        break;
      case "move":
        Swal.fire({
          title: "Especifica el nombre de la carpeta de destino",
          input: "text",
          inputAttributes: {
            autocapitalize: "off",
          },
          showCancelButton: true,
          confirmButtonText: "Mover fichero",
          showLoaderOnConfirm: true,
          preConfirm: async (folderName) => {
            await moverFichero(props.key.id, folderName);
          },
          allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
          if (result.isConfirmed) {
          }
        });
        break;
      case "recover":
        recuperarDeLaPapelera(props.key.id);
        break;
    }
  };

  const dobleClickHandler = async (f) => {
    if (f.type == "Folder") {
      await changeDir(f.fileName);
      await dir();
    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-right",
        iconColor: "white",
        customClass: {
          popup: "colored-toast",
        },
        showConfirmButton: false,
        timer: 3500,
        timerProgressBar: true,
      });

      Toast.fire({
        icon: "success",
        title: "Descargando tu archivo",
      });
      bajarFichero(f.id, f.fileName);
    }
  };

  if (files) {
    if (files.status == "error") {
      Swal.fire({
        title: "Error!",
        text: user.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
      setFiles();
    }
  }

  return (
    <div
      onContextMenu={(e) => handleContextMenu(e, { menu_id: MAIN_AREA_MENU })}
      className="fileArea"
    >
      <Menu id={MENU_ID}>
        <Item id="move" onClick={handleItemClick}>
          Mover
        </Item>
        <Item id="rename" onClick={handleItemClick}>
          Renombrar
        </Item>
        <Item id="delete" onClick={handleItemClick}>
          {enPapelera ? "Eliminar definitivamente" : "Enviar a papelera"}
        </Item>
        <Item id="download" onClick={handleItemClick}>
          Descargar
        </Item>
        {enPapelera ? (
          <Item id="recover" onClick={handleItemClick}>
            Recuperar
          </Item>
        ) : (
          ""
        )}
      </Menu>

      <Menu id={MAIN_AREA_MENU}>
        <Item id="makeFolder" onClick={handleItemClick}>
          Crear nueva carpeta
        </Item>
        <Item id="uploadFile" onClick={handleItemClick}>
          Subir nuevo archivo
        </Item>
      </Menu>

      {files?.data.content.map((f) => (
        <li
          title="Botón derecho para menú contextual de opciones"
          id={`${f.id}`}
          onContextMenu={(e) =>
            handleContextMenu(e, {
              menu_id: MENU_ID,
              id: f.id,
              fileName: f.fileName,
              type: f.type,
            })
          }
          onDoubleClick={() => dobleClickHandler(f)}
          key={f.id}
          className="fileItem"
        >
          <div>
            <img src={f.type == "Folder" ? "/carpeta.png" : "file.png"}></img>
            <p title={f.fileName} className="fileName">
              {f.fileName}
            </p>
          </div>
        </li>
      ))}
    </div>
  );
}

export default FileArea;
