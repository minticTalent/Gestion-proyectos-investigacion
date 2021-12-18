import React, { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { gql, useQuery, useMutation } from "@apollo/client";
import { USUARIOS, client } from "../../useRequest";
import { Modal, Button } from "react-bootstrap";
import { EDITAR_USUARIO } from "../../useRequest";

function Listar(props) {
  const { sidebar } = props; // recibimos el estado mediante las props y lo pasamos a una constante para su uso
  useEffect(() => {
    consultarUsuario();
  });
  const [listarusuario, setListarusuario] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [actualizar, setActualizar] = useState({
    id: "",
    estado: "",
    // nombre: "",
    // password: "",
    // rol: "",
    // email: "",
  });
  const [editar, { data }] = useMutation(EDITAR_USUARIO, {
    variables: {
      id: actualizar.id,
      createinput: {
        // nombre: actualizar.nombre,
        // identificacion: actualizar.identificacion,
        // email: actualizar.email,
        estado: actualizar.estado,
        // password: actualizar.password,
        // rol: actualizar.rol,
      },
    },
    onCompleted(data) {
      if (data) {
        console.log(data);
      }
    },
     
  });
  const handleChange = (event) => {
    setActualizar({
      ...actualizar,
      [event.target.name]: event.target.value,
    });
  };
  async function handleSubmit(event) {
    event.preventDefault();
    // console.log(actualizar);
    editar();
  }
  const actualizarUsuario = (id) => {
    setActualizar({
      ...actualizar,
      id: id,
    });
    setShow(true);
  };

  async function consultarUsuario() {
    await client
      .query({
        query: gql`
          query {
            getUsuarios {
              _id
              identificacion
              nombre
              password
              rol
              estado
              email
            }
          }
        `,
      })
      .then((result) => setListarusuario(result.data.getUsuarios));
  }
  return (
    //clasName principal que tiene que llevar todas las paginas para acomodar su container dependiendo si esta abierto o cerrado el navbar
    <div className={sidebar ? "container-on" : "container-off"}>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <form onSubmit={handleSubmit}>
              <div className="row">
                {/* <div className="col-md-6">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    ID
                  </label>
                  <input
                    type="text"
                    name="id"
                    onChange={handleChange}
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div> */}
                {/* <div className="col-md-6">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Identificacion
                  </label>
                  <input
                    type="text"
                    name="identificacion"
                    onChange={handleChange}
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div> */}
                {/* <div className="col-md-6 ">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    onChange={handleChange}
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div> */}
                {/* <div className="col-md-6 ">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    password
                  </label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div> */}
                {/* <div className="col-md-6 ">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    rol
                  </label>
                  <input
                    type="text"
                    name="rol"
                    onChange={handleChange}
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div> */}
                <div className="col-md-6 ">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Estado
                  </label>
                  <select
                    onChange={handleChange}
                    className="form-select"
                    name="estado"
                    aria-label="Default select example"
                  >
                    <option defaultValue=""> seleccione estado</option>
                    <option defaultValue="administrador">autorizado</option>
                    <option defaultValue="estudiante">pendiente</option>
                    <option defaultValue="lider">rechazado</option>
                  </select>
                </div>
                {/* <div className="col-md-6 ">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    email
                  </label>
                  <input
                    type="text"
                    name="email"
                    onChange={handleChange}
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div> */}
                <div className="col-md-12 pt-3">
                  <button
                    className="btn btn-dark btn-block"
                    onClick={handleClose}
                    type="submit"
                  >
                    Actualizar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
      {/* tabla para listar usuario */}
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">identificacion</th>
            <th scope="col">nombre</th>
            <th scope="col">password</th>
            <th scope="col">rol</th>
            <th scope="col">estado</th>
            <th scope="col">email</th>
          </tr>
        </thead>

        <tbody>
          {listarusuario.map((Usuario) => {
            return (
              <>
                <tr key={Usuario._id}>
                  <th scope="row">{Usuario._id}</th>
                  <td>{Usuario.identificacion}</td>
                  <td>{Usuario.nombre}</td>
                  <td>{Usuario.password}</td>
                  <td>{Usuario.rol}</td>
                  <td>{Usuario.estado}</td>
                  <td>{Usuario.email}</td>
                  <Button
                    variant="link"
                    onClick={() => actualizarUsuario(Usuario._id)}
                  >
                    Actualizar
                  </Button>
                  {/* <EditIcon
                    sx={{ fontSize: 40 }}
                    id="editar"
                    style={{ cursor: "pointer" }}
            
                  />
                  */}
                  {/* <DeleteIcon
                    sx={{ fontSize: 40 }}
                    id="eliminar"
                    style={{ cursor: "pointer" }}
                  /> */}
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Listar;
