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

  const acercaDe = () => {
    Swal.fire({
      title: "MY CLOUD DRIVE",
      html: `<p>Un proyecto de final de Bootcamp</p>
      <p>(c) 2023 - JSB18RT - A-TEAM</p>
      <p> Joffrey Arias <p> 
      <p> Juan Carlos Vez Vazquez <p>
      <p> Rubén Taibo <p>
      <p> Mario J. Rodríguez <p>
      <p> Ni derechos reservados ni "ná", podéis hacer con este proyecto lo que queráis y esperamos que os sirva para aprender tanto como nos ha servido a nosotros</p>
      <p> Hecho con mucho 💖 en España (Spain)`,

      confirmButtonText: "Me encanta 😍 !!",
    });
  };

  const showInputModal = () => {
    Swal.fire({
      title: "Crear nueva carpeta",
      text: "Se permite solo letras [a-z][A-Z] y números [0-9]",
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
    const Toast = Swal.mixin({
      toast: true,
      position: "top-right",
      iconColor: "white",
      customClass: {
        popup: "colored-toast",
      },
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });

    Toast.fire({
      icon: "success",
      title: info.message,
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
        .then(async (response) => {
          const resp = await response.json();

          const Toast = Swal.mixin({
            toast: true,
            position: "top-right",
            iconColor: "white",
            customClass: {
              popup: "colored-toast",
            },
            showConfirmButton: false,
            timer: 3500,
            timerProgressBar: true,
          });

          Toast.fire({
            icon: resp.status,
            title: resp.message,
          });
        })
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
      <a href="/editProfile">⚙️ Editar perfil</a>
      <a onClick={() => acercaDe()}> 🥳 Acerca de este programa</a>
    </div>
  );
}

export default SideMenu;
