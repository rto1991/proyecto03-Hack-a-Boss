import { TextField } from "@mui/material";
import "./FileSearch.css";
import Swal from "sweetalert2";
import { useState } from "react";
// import { Link } from "react-router-dom";

function FileSearch({ files, changeDir, info, setInfo, setFiles, dir }) {
  const [searchString, setSearchString] = useState();
  const upLevel = async () => {
    try {
      await changeDir("..p");
    } catch (error) {
      console.log("error chachi");
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
          label="Buscar un archivo"
          type="text"
        ></TextField>
        <img
          className="btnBuscar"
          onClick={() => searchFiles()}
          src="/lupa.png"
          alt="Buscar"
          title="Buscar"
        />
        {/* <nav>
          🗑️
          <Link to="/trash">Papelera</Link>
        </nav> */}
      </div>
      <div className="breadCrumb">
        <p>Estás en: {files?.data.currentDir}</p>
        <button onClick={() => upLevel()} title="subir un nivel" type="button">
          🔙
        </button>
      </div>
    </>
  );
}
export default FileSearch;
