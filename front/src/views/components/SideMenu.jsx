import "./SideMenu.css";
import Swal from "sweetalert2";

function SideMenu({ makeFolder, dir, info, setInfo }) {
  function closeMenu() {
    document.getElementById("mySidenav").style.width = "0";
  }

  const crearCarpeta = async (folderName) => {
    await makeFolder(folderName);
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
        closeMenu();
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
      }
    });
  };

  if (info) {
    console.log(info);
    Swal.fire({
      title: info.status + "!",
      text: info.message,
      icon: info.status,
      confirmButtonText: "Ok",
    });
    dir();
    setInfo();
  }

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
