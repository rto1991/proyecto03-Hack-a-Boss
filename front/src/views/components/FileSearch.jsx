import { TextField } from "@mui/material";
import "./FileSearch.css";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

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
}) {
  const [searchString, setSearchString] = useState();
  let searchStringAnterior = "";
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
    console.log(info);
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

  return (
    <>
      <div className="searchForm">
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
