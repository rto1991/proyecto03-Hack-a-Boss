import { FormattedMessage } from "react-intl";
import { useUserActions } from "../../hooks/api";
import "./TopNavBar.css";

function TopNavBar() {
  const { logout } = useUserActions();

  function showMenu() {
    document.getElementById("mySidenav").style.width = "300px";
  }

  return (
    <section className="topnavbar">
      <div className="hamburguerMenu">
        <img
          onClick={() => showMenu()}
          src="/menu.png"
          alt="menu"
          title="menu"
        ></img>
      </div>
      <h3>
        <FormattedMessage id="topNavBarCabecera" />
      </h3>
      <div className="userLogo">
        <img
          onClick={() => logout()}
          src="/boton-de-encendido.png"
          alt="Salir"
          title="Salir"
        />
      </div>
    </section>
  );
}

export default TopNavBar;
