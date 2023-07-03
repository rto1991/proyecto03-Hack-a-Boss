import { TextField } from "@mui/material";
import "./FileSearch.css";
import Swal from "sweetalert2";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useIntl } from "react-intl";

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
  const intl = useIntl();

  const upLevel = async () => {
    try {
      await changeDir("..p");
    } catch (error) {
      console.log("error chachi");
    }
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

  return (
    <>
      <div className="searchForm">
        <TextField
          onChange={(e) => setSearchString(e.target.value)}
          margin="normal"
          required
          fullWidth
          name="fileSearch"
          label={<FormattedMessage id="buscadorLabel" />}
          type="text"
        ></TextField>
        <img
          className="btnBuscar"
          onClick={() => searchFiles()}
          src="/lupa.png"
          alt="Buscar"
          title={<FormattedMessage id="buscadorImagen" />}
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
      console.log(files);
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
