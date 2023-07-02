import { useUser } from "../../UserContext";
import "./SideMenu.css";
import Swal from "sweetalert2";
import { FormattedMessage } from "react-intl";
import { useIntl } from "react-intl";
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

  const showInputModal = () => {
    Swal.fire({
      title: intl.formatMessage({ id: "sideMenuCarpeta" }),
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
      title: info.message,
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
      <a href="#">
        🐜 <FormattedMessage id="sideMenuBug" />
      </a>
    </div>
  );
}

export default SideMenu;
