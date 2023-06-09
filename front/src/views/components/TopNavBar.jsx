import { FormattedMessage } from "react-intl";
import { useUserActions } from "../../hooks/api";
import { useIntl } from "react-intl";
import { useUser } from "../../UserContext";
import "./TopNavBar.css";

function TopNavBar() {
  const [user] = useUser();
  const { logout } = useUserActions();
  const intl = useIntl();

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
          title={intl.formatMessage({ id: "topNavBarMenu" })}
        ></img>
      </div>
      <h3>
        <FormattedMessage
          id="topNavBarCabecera"
          values={{
            name: user.info.name,
          }}
        />
      </h3>
      <div className="userLogo">
        <img
          onClick={() => logout()}
          src="/boton-de-encendido.png"
          alt="Salir"
          title={intl.formatMessage({ id: "botonSalir" })}
        />
      </div>
    </section>
  );
}

export default TopNavBar;
