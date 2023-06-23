import { useUser } from "../../UserContext";
import "./SideMenu.css";
import Swal from "sweetalert2";

function SideMenu({ makeFolder, dir, info, setInfo }) {
  const [user] = useUser();

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
        .then((response) => response.text())
        .then(() => dir())
        .catch((error) => console.log("error", error));
    }
    closeMenu();
  };

  return (
    <div id="mySidenav" className="sidenav">
      <a onClick={() => closeMenu()} className="closebtn">
        &times;
      </a>
      <a onClick={() => showInputModal()}>📂 Crear carpeta</a>
      <a onClick={() => subirArchivo()}>📄 Subir archivo</a>
      <a href="#">⚙️ Editar perfil</a>
      <a href="#">🐜 Reportar un bug</a>
    </div>
  );
}

export default SideMenu;
