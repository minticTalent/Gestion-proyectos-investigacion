import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";
import { EDITAR_USUARIO } from "../../useRequest";

function Actualizarusuario() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [actualizar, setActualizar] = useState({
    identificacion: "",
    estado: "",
    nombre: "",
    password: "",
    rol: "",
    email: "",
  });
  const [editar, { data, loading, error }] = useMutation(EDITAR_USUARIO, {
    UsuarioEditInput: {
      nombre: actualizar.nombre,
      identificacion: actualizar.identificacion,
      email: actualizar.email,
      estado: actualizar.estado,
      password: actualizar.password,
      rol: actualizar.rol,
    },
  });
  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

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

  return (
    <>
      <Button variant="link" onClick={handleShow}>
        Actualizar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
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
                </div>
                <div className="col-md-6">
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
                </div>
                <div className="col-md-6 ">
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
                </div>
                <div className="col-md-6 ">
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
                </div>
                <div className="col-md-6 ">
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
                </div>
                <div className="col-md-6 ">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    estado
                  </label>
                  <input
                    type="text"
                    name="estado"
                    onChange={handleChange}
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="col-md-6 ">
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
                </div>
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
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Actualizarusuario;
