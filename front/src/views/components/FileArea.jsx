import { useEffect } from "react";
import { useUser } from "../../UserContext";
import "./FileArea.css";
import Swal from "sweetalert2";

function FileArea({ dir, setFiles, files, changeDir }) {
  const [user] = useUser();

  useEffect(() => {
    async function getFiles() {
      await dir();
    }
    getFiles();
  }, []);

  const dobleClickHandler = async (f) => {
    if (f.type == "Folder") {
      await changeDir(f.fileName);
      await dir();
    } else {
      alert("Pinchaste en archivo");
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
    <div className="fileArea">
      {files?.data.content.map((f) => (
        <li
          onDoubleClick={() => dobleClickHandler(f)}
          key={f.id}
          className="fileItem"
        >
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
