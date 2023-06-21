import { TextField } from "@mui/material";
import "./FileSearch.css";
import Swal from "sweetalert2";

function FileSearch({ files, changeDir, info, setInfo }) {
  const upLevel = async () => {
    try {
      await changeDir("..p");
    } catch (error) {
      console.log("error chachi");
    }
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
          margin="normal"
          required
          fullWidth
          name="fileSearch"
          label="Buscar un archivo"
          type="text"
        ></TextField>
        <img src="/lupa.png" alt="Salir" title="Salir" />
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
