import { useEffect, useState } from "react";
import { useUser } from "../../UserContext";
import { useFilesActions } from "../../hooks/api";
import "./FileArea.css";

function FileArea() {
  const [user] = useUser();
  const { dir, files } = useFilesActions();

  useEffect(() => {
    async function getFiles() {
      await dir();
    }
    getFiles();
  }, []);

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
    <div className="fileArea">
      {files?.data.content.map((f) => (
        <li key={f.id} className="fileItem">
          <div>
            <img src={f.type == "Folder" ? "/carpeta.png" : "file.png"}></img>
            <p>{f.fileName}</p>
          </div>
        </li>
      ))}
    </div>
  );
}

export default FileArea;
