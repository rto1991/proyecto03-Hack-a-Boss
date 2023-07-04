import { TextField } from "@mui/material";
import "./FileSearch.css";
import Swal from "sweetalert2";
import { useState } from "react";
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
      title: "Crear nueva carpeta",
      text: "Se permite solo letras [a-z][A-Z] y números [0-9]",
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
          alt="Subir fichero"
          title="Subir fichero"
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
          label="Buscar un archivo"
          type="text"
        ></TextField>
        <img
          className="btnBuscar"
          onClick={() => {
            searchFiles();
          }}
          src="/lupa.png"
          alt="Buscar"
          title="Buscar"
        />
        <img
          className="btnTrash"
          onClick={() => trashFiles()}
          src={!enPapelera ? "/basura.png" : "/volver.png"}
          alt="Papelera"
          title={
            !enPapelera ? "Ver papelera" : "Volver a la carpeta donde estabas"
          }
        />
      </div>
      <div className="breadCrumb">
        <p>
          {!enPapelera
            ? `Estás en: ${files?.data.currentDir}`
            : `Estás en Papelera`}
        </p>
        {!enPapelera ? (
          <button
            onClick={() => upLevel()}
            title="subir un nivel"
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
