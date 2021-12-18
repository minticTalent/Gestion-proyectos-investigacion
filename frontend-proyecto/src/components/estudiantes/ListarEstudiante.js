import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";

function ListarEstudiante(props) {
  const { sidebar } = props;
  const [estudiante, setEstudiante] = useState({
    nombre: "",
    identificacion: "",
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    setEstudiante({
      ...estudiante,
      [event.target.name]: event.target.value,
    });
  };
  async function handleSubmit(event) {
    event.preventDefault();
    event.target.reset();
    console.log(estudiante);
  }
  return (
    //clasName={sidebar ...} principal que tiene que llevar todas las paginas para acomodar su container dependiendo si esta abierto o cerrado el navbar
    <div>
      <div className={sidebar ? "container-on" : "container-off"}>
        <div className="container">
          <div class="card">
            <div class="card-body">Perfil del estudiante</div>
            <form onSubmit={handleSubmit}>
              <div
                class="row"
                style={{ marginLeft: "10px", marginRight: "10px" }}
              >
                <div class="col-md-6 pb-5 pt3">
                  <laber htmlFor="exampleInputEmail1" className="form-label">
                    Nombre
                  </laber>
                  <input
                    type="text"
                    name="nombre"
                    onChange={handleChange}
                    class="form-control"
                    placeholder="nombre"
                    aria-label="First name"
                  />
                </div>
                <div class="col-md-6">
                  <laber htmlFor="exampleInputEmail1" className="form-label">
                    Identificacion
                  </laber>
                  <input
                    type="text"
                    name="identificacion"
                    onChange={handleChange}
                    class="form-control"
                    placeholder="numero de identificacion"
                    aria-label="Last name"
                  />
                </div>
                <div class="col-md-6">
                  <laber htmlFor="exampleInputEmail1" className="form-label">
                    Email
                  </laber>
                  <input
                    type="text"
                    name="email"
                    onChange={handleChange}
                    class="form-control"
                    placeholder="correo electronico"
                    aria-label="Last name"
                  />
                </div>
                <div class="col-md-6">
                  <laber htmlFor="exampleInputEmail1" className="form-label">
                    Password
                  </laber>
                  <input
                    type="text"
                    name="password"
                    onChange={handleChange}
                    class="form-control"
                    placeholder="escriba tu contraseña"
                    aria-label="Last name"
                  />
                </div>
                <div className="col-md-12 pt-3 pb-3">
                  <button className="btn btn-dark btn-block" type="submit">
                    Actualizar datos
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ListarEstudiante;

{
}
