import { useUser } from "../../UserContext";
import "./SideMenu.css";
import Swal from "sweetalert2";
import { useIntl, FormattedMessage } from "react-intl";
import LanguageSelector from "../LanguageSelector";

function SideMenu({ makeFolder, dir, info, setInfo }) {
  const [user] = useUser();
  const intl = useIntl();

  function closeMenu() {
    document.getElementById("mySidenav").style.width = "0";
  }

  const crearCarpeta = async (folderName) => {
    await makeFolder(folderName);
  };

  const acercaDe = () => {
    Swal.fire({
      title: "MY CLOUD DRIVE",
      html: `<p>${intl.formatMessage({ id: "aboutIntro" })}</p>
      <p>(c) 2023 - JSB18RT - A-TEAM</p>
      <p> Validaciones: Joffrey Arias <p> 
      <p> Testing: Juan Carlos Vez Vazquez <p>
      <p> Internacionalizacion: Rubén Taibo <p>
      <p> Program Glue: Mario J. Rodríguez <p>
      <p> ${intl.formatMessage({ id: "aboutDerechos" })}</p>
      <p> ${intl.formatMessage({ id: "aboutAmor" })}`,

      confirmButtonText: intl.formatMessage({ id: "aboutButton" }),
    });
  };

  const showInputModal = () => {
    Swal.fire({
      title: intl.formatMessage({ id: "sideMenuCarpeta" }),
      text: "Se permite solo letras [a-z][A-Z] y números [0-9]",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: intl.formatMessage({ id: "sideMenuCrearCarpeta" }),
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
      title: intl.formatMessage({ id: "changeDirectory" }),
    });

    dir();
    setInfo();
  }

  const subirArchivo = async () => {
    const { value: file } = await Swal.fire({
      title: intl.formatMessage({ id: "sideMenuSeleccionar" }),
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
      <LanguageSelector />
      <a onClick={() => showInputModal()}>
        📂 <FormattedMessage id="sideMenuCarpeta" />
      </a>
      <a onClick={() => subirArchivo()}>
        📄 <FormattedMessage id="sideMenuSubir" />
      </a>
      <a href="/editProfile">
        ⚙️ <FormattedMessage id="sideMenuPerfil" />
      </a>
      <a onClick={() => acercaDe()}>
        {" "}
        🥳 <FormattedMessage id="sideMenuBug" />
      </a>
    </div>
  );
}

export default SideMenu;
