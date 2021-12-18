import React, { useState, useEffect } from "react";
import ViewHeadlineIcon from "@material-ui/icons/ViewHeadline"; // icono de material ui
import CloseIcon from "@material-ui/icons/Close"; // icono de material ui
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@material-ui/icons/Home";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import SchoolIcon from "@mui/icons-material/School";
import { Link, NavLink } from "react-router-dom"; // enrutado con reactrouter dom
import { SidebarData } from "./SidebarData"; // Importamos el archivo SidebarData que es donde esta el array para el navbar
import BadgeIcon from "@mui/icons-material/Badge";
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
    window.location.href = "/";
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
          <li className="nav-text">
            <NavLink to="/Home" title="Home" activeClassName="nav-link-active">
              <HomeIcon />
              <span className="responsive">Home</span>
            </NavLink>
          </li>
          {localStorage.getItem("rol") == "administrador" ? (
            <li className="nav-text">
              <NavLink
                to="/listar-usuarios"
                title="Listar usuarios"
                activeClassName="nav-link-active"
              >
                <AccountBoxIcon />
                <span className="responsive">Listar usuarios</span>
              </NavLink>
            </li>
          ) : null}

          <li className="nav-text">
            <NavLink
              to="/listar-proyectos"
              title="Listar proyectos"
              activeClassName="nav-link-active"
            >
              <AssignmentTurnedInIcon />
              <span className="responsive">Listar proyectos</span>
            </NavLink>
          </li>
          <li className="nav-text">
            <NavLink
              to="/listar-estudiante"
              title="Listar estudiantes"
              activeClassName="nav-link-active"
            >
              <SchoolIcon />
              <span className="responsive">Perfil Usuario</span>
            </NavLink>
          </li>
          {localStorage.getItem("rol") == "estudiante" ||
          localStorage.getItem("rol") == "lider" ? (
            <li className="nav-text">
              <NavLink
                to="/mis-proyectos"
                title="mis proyectos"
                activeClassName="nav-link-active"
              >
                <BadgeIcon />
                <span className="responsive">Mis proyectos</span>
              </NavLink>
            </li>
          ) : null}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
