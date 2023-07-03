import { FormattedMessage } from "react-intl";
import { useUserActions } from "../../hooks/api";
import { useIntl } from "react-intl";
import { useUser } from "../../UserContext";
import "./TopNavBar.css";

function TopNavBar() {
  const { logout } = useUserActions();
  const intl = useIntl();
  const [user] = useUser();
  console.log(user);

  function showMenu() {
    document.getElementById("mySidenav").style.width = "300px";
  }
  console.log(user.info.name);
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
