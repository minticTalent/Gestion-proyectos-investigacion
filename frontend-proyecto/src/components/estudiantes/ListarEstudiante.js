import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { CONSULTAR_ID } from "../../useRequest";
import { EDITAR_USUARIO } from "../../useRequest";
import { useAlert } from "react-alert";

function ListarEstudiante(props) {
  const alert = useAlert();
  //estados
  const { sidebar } = props;
  const [estudiante, setEstudiante] = useState({
    nombre: "",
    identificacion: "",
    email: "",
    password: "",
  });
  //consultas querys
  const { loading, error, data } = useQuery(CONSULTAR_ID, {
    variables: {
      id: localStorage.getItem("ID"),
    },
  });
  //mutaciones
  const [update] = useMutation(EDITAR_USUARIO, {
    variables: {
      id: localStorage.getItem("ID"),
      createinput: {
        nombre: estudiante.nombre,
        identificacion: estudiante.identificacion,
        email: estudiante.email,
      },
    },
    onCompleted(data) {
      alert.success("Actualizacion exitosa!");
    },
  });

  console.log(data);
  const handleChange = (event) => {
    setEstudiante({
      ...estudiante,
      [event.target.name]: event.target.value,
    });
  };
  async function handleSubmit(event) {
    update();
    event.preventDefault();
    event.target.reset();
    console.log(estudiante);
  }
  const handleClickUpdate = (event) => {
    setEstudiante({
      nombre: data.getUsuario.nombre,
      identificacion: data.getUsuario.identificacion,
      email: data.getUsuario.email,
      estado: data.getUsuario.estado,
    });
  };
  return (
    //clasName={sidebar ...} principal que tiene que llevar todas las paginas para acomodar su container dependiendo si esta abierto o cerrado el navbar
    <div>
      <div className={sidebar ? "container-on" : "container-off"}>
        <div className="container">
          <div className="card-colums pb-5">
            <div className="card">
              <div className="card-body">
                <div className="title p-4">
                  <h5>Mi perfil</h5>
                  <hr></hr>
                </div>
                <div className="row">
                  {/* <div className="col-md-12"> */}
                  <div className="col-md-4">
                    <img
                      style={{ marginLeft: "25px" }}
                      src="https://key0.cc/images/small/13432_b910e004944736a5585726f2991f0443.png"
                    ></img>
                  </div>
                  <div className="col-md-4">
                    {data ? (
                      <>
                        <p>nombre:{data.getUsuario.nombre}</p>
                        <p>identificacion:{data.getUsuario.identificacion}</p>
                        <p>email:{data.getUsuario.email}</p>
                        <p>estado:{data.getUsuario.estado}</p>
                      </>
                    ) : null}
                  </div>
                  <div className="col-md-4 pt-3 pb-3 ">
                    <button
                      className="btn btn-dark btn-block "
                      type="submit"
                      onClick={handleClickUpdate}
                    >
                      Editar
                    </button>
                  </div>

                  {/* </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div class="card-body">Editar perfil</div>
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
                    defaultValue={estudiante.nombre}
                    // placeholder="nombre"
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
                    defaultValue={estudiante.identificacion}
                    // placeholder="numero de identificacion"
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
                    defaultValue={estudiante.email}
                    // placeholder="correo electronico"
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
