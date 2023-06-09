import { useEffect } from "react";
import { useUser } from "../../UserContext";
import "./FileArea.css";
import Swal from "sweetalert2";
import { Menu, Item, useContextMenu } from "react-contexify";
import "react-contexify/ReactContexify.css";
import { FormattedMessage, useIntl } from "react-intl";

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
  const intl = useIntl();

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
    setEnPapelera(false);
  }

  async function deleteFil(fileName) {
    await deleteFile(fileName);
    await dir();
    setEnPapelera(false);
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
    await filesInTrash();
  }

  const subirArchivo = async () => {
    const { value: file } = await Swal.fire({
      title: intl.formatMessage({ id: "fileAreaFichero" }),
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
        .then(async (response) => {
          const resp = await response.json();

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
            icon: resp.status,
            title: resp.message,
          });
        })
        .then(() => dir())
        .catch((error) => {
          console.log("error", error);
          throw error;
        });
    }
  };

  const bajarFichero = async (fileId, fileName) => {
    await downloadFile(fileId, fileName);
  };

  function handleContextMenu(event, data) {
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
    try {
      switch (id) {
        case "rename":
          if (props.key.type == "Folder") {
            //renombramos carpeta
            Swal.fire({
              title:
                intl.formatMessage({ id: "editProfileCarpeta" }) +
                props.key.fileName,
              text: intl.formatMessage({ id: "toastMensajeCarpeta" }),
              input: "text",
              inputAttributes: {
                autocapitalize: "off",
              },
              showCancelButton: true,
              confirmButtonText: intl.formatMessage({
                id: "editProfileRenombrar",
              }),
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
              title:
                intl.formatMessage({ id: "fileAreaNombre" }) +
                props.key.fileName,
              text: intl.formatMessage({ id: "toastMensajeCarpeta" }),
              input: "text",
              inputAttributes: {
                autocapitalize: "off",
              },
              showCancelButton: true,
              confirmButtonText: intl.formatMessage({
                id: "fileAreaRenombrar",
              }),
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
              title:
                intl.formatMessage({ id: "fileAreaBorrar" }) +
                ` ${props.key.fileName} ${
                  props.key.type == "Folder"
                    ? intl.formatMessage({ id: "fileAreaInfo" })
                    : ""
                }`,
              showCancelButton: true,
              confirmButtonText: intl.formatMessage({ id: "fileAreaBorrar2" }),
              cancelButtonText: intl.formatMessage({ id: "fileAreaAtras" }),
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
            title: intl.formatMessage({ id: "fileAreaCrear" }),
            text: intl.formatMessage({ id: "toastMensajeCarpeta" }),
            input: "text",
            inputAttributes: {
              autocapitalize: "off",
            },
            showCancelButton: true,
            confirmButtonText: intl.formatMessage({ id: "fileAreaCrear" }),
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
                ? intl.formatMessage({ id: "fileAreaComp" })
                : intl.formatMessage({ id: "fileAreaDes" }),
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
            title: intl.formatMessage({ id: "fileAreaMov" }),
            input: "text",
            inputAttributes: {
              autocapitalize: "off",
            },
            showCancelButton: true,
            confirmButtonText: intl.formatMessage({ id: "fileAreaMover" }),
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
    } catch (error) {
      Swal.fire({
        title: intl.formatMessage({ id: "singInError" }),
        text: intl.formatMessage({ id: "renameDirectoryProblema" }),
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const dobleClickHandler = async (f) => {
    if (f.in_recycle_bin === 1) {
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
        title: intl.formatMessage({ id: "fileAreaInfo2" }),
      });
    }

    if (f.type == "Folder" && f.in_recycle_bin == 0) {
      await changeDir(f.fileName);
      await dir();
    } else {
      if (f.in_recycle_bin == 0) {
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
          title: intl.formatMessage({ id: "fileAreaDescarga" }),
        });
        bajarFichero(f.id, f.fileName);
      }
    }
  };

  if (files) {
    if (files.status == "error") {
      Swal.fire({
        title: intl.formatMessage({ id: "singInError" }),
        text: user.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
      setFiles();
    }
  }

  if (info) {
    if (info.status == "error") {
      Swal.fire({
        title: intl.formatMessage({ id: "singInError" }),
        text: info.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  }

  return (
    <div
      onContextMenu={(e) => handleContextMenu(e, { menu_id: MAIN_AREA_MENU })}
      className="fileArea"
    >
      <Menu id={MENU_ID}>
        <Item id="move" onClick={handleItemClick}>
          <FormattedMessage id="popUpMover" />
        </Item>
        <Item id="rename" onClick={handleItemClick}>
          <FormattedMessage id="popUpRenombrar" />
        </Item>
        <Item id="delete" onClick={handleItemClick}>
          {enPapelera
            ? intl.formatMessage({ id: "fileAreaDelete" })
            : intl.formatMessage({ id: "fileAreaTrash" })}
        </Item>
        <Item id="download" onClick={handleItemClick}>
          <FormattedMessage id="popUpDescargar" />
        </Item>
        {enPapelera ? (
          <Item id="recover" onClick={handleItemClick}>
            <FormattedMessage id="popUpRecuperar" />
          </Item>
        ) : (
          ""
        )}
      </Menu>

      <Menu id={MAIN_AREA_MENU}>
        <Item id="makeFolder" onClick={handleItemClick}>
          <FormattedMessage id="sideMenuCarpeta" />
        </Item>
        <Item id="uploadFile" onClick={handleItemClick}>
          <FormattedMessage id="sideMenuSubir" />
        </Item>
      </Menu>

      {files?.data.content.map((f) => (
        <li
          title={intl.formatMessage({ id: "fileAreaBorrar2" })}
          id={`${f.id}`}
          onContextMenu={(e) =>
            handleContextMenu(e, {
              menu_id: MENU_ID,
              id: f.id,
              fileName: f.fileName,
              type: f.type,
              in_recycle_bin: f.in_recycle_bin,
            })
          }
          onDoubleClick={() => dobleClickHandler(f)}
          key={f.id}
          className="fileItem"
        >
          <div>
            <img
              src={
                f.type == "Folder"
                  ? "/carpeta.png"
                  : f.fileName.substring(f.fileName.length - 3) == "pdf"
                  ? "/archivo-pdf.png"
                  : f.fileName.substring(f.fileName.length - 3) == "png"
                  ? "/png-file.png"
                  : f.fileName.substring(f.fileName.length - 3) == "jpg"
                  ? "/jpg.png"
                  : f.fileName.substring(f.fileName.length - 3) == "doc" ||
                    f.fileName.substring(f.fileName.length - 3) == "docx"
                  ? "/archivo-docx.png"
                  : f.fileName.substring(f.fileName.length - 3) == "xlsx"
                  ? "/xlsx.png"
                  : "/file.png"
              }
            ></img>
            <p title={f.fileName} className="fileName">
              {f.fileName}
            </p>
            <small>
              {f.type != "Folder"
                ? `${
                    f.size > 1024
                      ? parseFloat(f.size / 1024).toFixed(2) + " Mb"
                      : f.size + " Kb"
                  }`
                : ""}
            </small>
          </div>
        </li>
      ))}
    </div>
  );
}

export default FileArea;
