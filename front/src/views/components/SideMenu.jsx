import { useFilesActions } from "../../hooks/api";
import "./SideMenu.css";
import Swal from "sweetalert2";

function SideMenu() {
  function closeMenu() {
    document.getElementById("mySidenav").style.width = "0";
  }

  const { makeFolder, dir } = useFilesActions();
  const info = useFilesActions();

  const crearCarpeta = (folderName) => {
    makeFolder(folderName);
  };

  const getDir = async () => {
    await dir();
  };

  const showInputModal = () => {
    Swal.fire({
      title: "Crear nueva carpeta",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Crear carpeta",
      showLoaderOnConfirm: true,
      preConfirm: async (folderName) => {
        await crearCarpeta(folderName);
        Swal.fire({
          title: info.status + "!",
          text: info.message,
          icon: info.status,
          confirmButtonText: "Ok",
        });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        closeMenu();
        getDir();
      }
    });
  };

  return (
    <div id="mySidenav" className="sidenav">
      <a onClick={() => closeMenu()} className="closebtn">
        &times;
      </a>
      <a onClick={() => showInputModal()}>📂 Crear carpeta</a>
      <a href="#">📄 Subir archivo</a>
      <a href="#">⚙️ Editar perfil</a>
      <a href="#">🐜 Reportar un bug</a>
    </div>
  );
}

export default SideMenu;
