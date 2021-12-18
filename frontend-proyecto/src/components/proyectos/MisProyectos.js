import React from "react";
import ProyectoLideres from "./ProyectoLideres.js";
import ProyectoStudents from "./ProyectoStudents";
function MisProyectos(props) {
  const { sidebar } = props;
  return (
    <div className={sidebar ? "container-on" : "container-off"}>
      {localStorage.getItem("rol") == "lider" && <ProyectoLideres />}
      {localStorage.getItem("rol") == "estudiante" && <ProyectoStudents />}
    </div>
  );
}

export default MisProyectos;
