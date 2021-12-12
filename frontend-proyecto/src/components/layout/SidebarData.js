import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
export const SidebarData = [
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
];
