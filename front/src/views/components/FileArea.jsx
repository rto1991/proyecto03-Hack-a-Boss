import { useEffect } from "react";
import { useUser } from "../../UserContext";
import "./FileArea.css";
import Swal from "sweetalert2";
import {
  Menu,
  Item,
  Separator,
  Submenu,
  useContextMenu,
} from "react-contexify";
import "react-contexify/ReactContexify.css";

const MENU_ID = "contextMenu1";

function FileArea({ dir, setFiles, files, changeDir }) {
  const [user] = useUser();
  const { show } = useContextMenu({
    id: MENU_ID,
  });

  useEffect(() => {
    async function getFiles() {
      await dir();
    }
    getFiles();
  }, []);

  function handleContextMenu(e) {
    show({
      e,
      props: {
        key: e.target,
      },
    });
  }

  const handleItemClick = ({ id, event, props }) => {
    switch (id) {
      case "rename":
        console.log(event, props);
        break;
      case "delete":
        console.log(event, props);
        break;
    }
  };

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
      <Menu id={MENU_ID}>
        <Item id="rename" onClick={handleItemClick}>
          Renombrar
        </Item>
        <Item id="delete" onClick={handleItemClick}>
          Eliminar
        </Item>
      </Menu>

      {files?.data.content.map((f) => (
        <li
          onContextMenu={handleContextMenu}
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
