import React, { useState, useEffect } from "react";
import ViewHeadlineIcon from "@material-ui/icons/ViewHeadline"; // icono de material ui
import CloseIcon from "@material-ui/icons/Close"; // icono de material ui
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, NavLink } from "react-router-dom"; // enrutado con reactrouter dom
import { SidebarData } from "./SidebarData"; // Importamos el archivo SidebarData que es donde esta el array para el navbar
import "./Navbar.css";
function Navbar(props) {
  const { showSidebarApp } = props; // función traia desde app.js para enviar el estado sideba
  const [sidebar, setSidebar] = useState(false); // Estado para mostrar u ocultar el sidebar
  const showSidebar = () => setSidebar(!sidebar); // funcion para mostrar u ocultar el sidebar
  useEffect(() => {
    // enviando el estado sidebar a traves de las props al archivo app.js
    showSidebarApp(sidebar);
  }, [sidebar]); // cada que sidebar obtenga un cambio se genera este evento
  // Cerrar sesion
  const logout = () => {
    localStorage.clear();
    location.href = "/";
  };
  return (
    <div className="navbar sticky-top">
      <Link to="#" className="menu-bars menu-left">
        {/* icono con evento onClick para cambiar el estado */}
        <ViewHeadlineIcon onClick={showSidebar} />{" "}
      </Link>
      <button
        type="button"
        className="btn btn-outline-secondary logout"
        onClick={logout}
      >
        logout
        <LogoutIcon sx={{ fontSize: 13 }} className="logout-icon" />
      </button>{" "}
      {/**Evento para cerrar sesion */}
      {/*condicion para colocar la clase css dependiento si el estado es true o false para mostrar y ocultar elnavbar*/}
      <nav className={sidebar ? "nav-menu-active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <NavLink to="#" className="menu-bars">
              <CloseIcon />
            </NavLink>
          </li>
          {/*Se recorre el array con los datos traidos para mostrarlos en el navbar */}
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <NavLink
                  to={item.path}
                  title={item.title}
                  activeClassName="nav-link-active"
                >
                  {item.icon}
                  <span className="responsive">{item.title}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
