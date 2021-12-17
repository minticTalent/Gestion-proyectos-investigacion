import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import SchoolIcon from "@mui/icons-material/School";
export const SidebarData = [
  {
    title: "Home", // titulo que va a tener el menu
    path: "/Home", // ruta a donde se muestra la pagina
    icon: <HomeIcon />, // icono a mostrar en el menu
    cName: "nav-text", // clase css para el menu
  },
  {
    title: "Listar usuarios", // titulo que va a tener el menu
    path: "/listar-usuarios", // ruta a donde se muestra la pagina
    icon: <AccountBoxIcon />, // icono a mostrar en el menu
    cName: "nav-text", // clase css para el menu
  },
  {
    title: "Listar proyectos",
    path: "/listar-proyectos",
    icon: <AssignmentTurnedInIcon />,
    cName: "nav-text",
  },
  {
    title: "Listar estudiante",
    path: "/listar-estudiante",
    icon: <SchoolIcon />,
    cName: "nav-text",
  },
];
