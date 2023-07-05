import { TextField } from "@mui/material";
import "./FileSearch.css";
import Swal from "sweetalert2";
import { useState } from "react";
import { useIntl, FormattedMessage } from "react-intl";
import { useUser } from "../../UserContext";

function FileSearch({
  files,
  changeDir,
  info,
  setInfo,
  setFiles,
  dir,
  filesInTrash,
  enPapelera,
  setEnPapelera,
  makeFolder,
}) {
  const [searchString, setSearchString] = useState();
  const [user] = useUser();
  const intl = useIntl();

  const subirArchivo = async () => {
    const { value: file } = await Swal.fire({
      title: intl.formatMessage({ id: "sideMenuFichero" }),
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
        .catch((error) => console.log("error", error));
    }
  };

  const crearCarpeta = async (folderName) => {
    await makeFolder(folderName);
  };

  const upLevel = async () => {
    try {
      await changeDir("..p");
    } catch (error) {}
  };

  const trashFiles = () => {
    if (!enPapelera) {
      filesInTrash();
      setEnPapelera(true);
    } else {
      dir();
      setEnPapelera(false);
    }
  };

  const searchFiles = () => {
    if (searchString == "") {
      dir();
    }

    const newFiles = {
      status: "info",
      data: {
        content: files.data.content?.filter(
          (e) =>
            e.fileName.toUpperCase().indexOf(searchString.toUpperCase()) >= 0
        ),
        currentDir: "/",
      },
    };
    setFiles(newFiles);
  };

  if (info) {
    Swal.fire({
      title: info.status + "!",
      text: info.message,
      icon: info.status,
      confirmButtonText: "Ok",
    });
    setInfo();
  }

  const handleKeyboardEvent = (e) => {
    if (e.keyCode == 13) {
      searchFiles();
    }
  };

  const showInputModal = () => {
    Swal.fire({
      title: intl.formatMessage({ id: "sideMenuCarpeta" }),
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
  };

  return (
    <>
      <div className="searchForm">
        <img
          className="btnMakeFolder"
          onClick={() => showInputModal()}
          src="/nueva_carpeta.png"
          alt="Crear carpeta"
          title="Nueva carpeta"
        />
        <img
          className="btnUploadFile"
          onClick={() => subirArchivo()}
          src="/subir.png"
          alt={intl.formatMessage({ id: "sideMenuFichero" })}
          title={intl.formatMessage({ id: "sideMenuFichero" })}
        />
        <TextField
          onChange={(e) => {
            dir();
            setSearchString(e.target.value);
          }}
          onKeyDown={handleKeyboardEvent}
          margin="normal"
          required
          fullWidth
          name="fileSearch"
          label={intl.formatMessage({ id: "buscadorLabel" })}
          type="text"
        ></TextField>
        <img
          className="btnBuscar"
          onClick={() => {
            searchFiles();
          }}
          src="/lupa.png"
          alt={intl.formatMessage({ id: "buscadorImagen" })}
          title={intl.formatMessage({ id: "buscadorImagen" })}
        />
        <img
          className="btnTrash"
          onClick={() => trashFiles()}
          src={!enPapelera ? "/basura.png" : "/volver.png"}
          alt="Papelera"
          title={
            !enPapelera
              ? intl.formatMessage({ id: "papelera" })
              : intl.formatMessage({ id: "papeleraVolver" })
          }
        />
      </div>
      <div className="breadCrumb">
        <p>
          {!enPapelera
            ? intl.formatMessage(
                { id: "directorio" },
                { directorio: files?.data.currentDir }
              )
            : intl.formatMessage({ id: "directorioPapelera" })}
        </p>
        {!enPapelera ? (
          <button
            onClick={() => upLevel()}
            title={intl.formatMessage({ id: "botonAtras" })}
            type="button"
          >
            🔙
          </button>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
export default FileSearch;
