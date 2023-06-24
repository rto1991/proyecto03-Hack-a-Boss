import "./SideMenu.css";

function SideMenu() {
  function closeMenu() {
    document.getElementById("mySidenav").style.width = "0";
  }

  return (
    <div id="mySidenav" className="sidenav">
      <a onClick={() => closeMenu()} className="closebtn">
        &times;
      </a>
      <a href="#">📂 Crear carpeta</a>
      <a href="#">📄 Subir archivo</a>
      <a href="#">⚙️ Editar perfil</a>
      <a href="#">🐜 Reportar un bug</a>
    </div>
  );
}

export default SideMenu;
