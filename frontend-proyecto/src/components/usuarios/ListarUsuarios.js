import React from "react";

function Listar(props) {
  const { sidebar } = props; // recibimos el estado mediante las props y lo pasamos a una constante para su uso
  return (
    //clasName principal que tiene que llevar todas las paginas para acomodar su container dependiendo si esta abierto o cerrado el navbar
    <div className={sidebar ? "container-on" : "container-off"}>
      <h1>Hola desde listar Usuarios</h1>
    </div>
  );
}

export default Listar;
