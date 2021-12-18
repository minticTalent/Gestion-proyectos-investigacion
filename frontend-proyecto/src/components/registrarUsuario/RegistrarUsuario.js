import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Modal, Button, FloatingLabel, Form } from "react-bootstrap";
import { CREATE_USUARIO } from "../../useRequest.js";
function RegistrarUsuario() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [registrar, setRegistrar] = useState({
    identificacion: "",
    estado: "pendiente",
    nombre: "",
    password: "",
    rol: "",
    email: "",
  });

  const [crear, { data, loading, error }] = useMutation(CREATE_USUARIO, {
    variables: {
      createinput: {
        nombre: registrar.nombre,
        identificacion: registrar.identificacion,
        email: registrar.email,
        estado: registrar.estado,
        password: registrar.password,
        rol: registrar.rol,
      },
    },
  });
  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;
  const handleChange = (event) => {
    setRegistrar({
      ...registrar,
      [event.target.name]: event.target.value,
    });
  };
  async function handleSubmit(event) {
    event.preventDefault();
    // console.log("si");
    crear();
  }
  return (
    <>
      <Button variant="link" onClick={handleShow}>
        Registrate aquí
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <div className="container">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 ">
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
                  {/* <div className="col-md-6 ">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Estado
                    </label>
                    <select
                      className="form-select"
                      onChange={handleChange}
                      name="estado"
                      aria-label="Default select example"
                    >
                      <option selected defaultValue="">
                        {" "}
                        select menu
                      </option>
                      <option defaultValue="autorizado">autorizado</option>
                      <option defaultValue="pendiente">pendiente</option>
                    </select>
                  </div> */}
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
                      Contraseña
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
                      Rol
                    </label>
                    <select
                      onChange={handleChange}
                      className="form-select"
                      name="rol"
                      aria-label="Default select example"
                    >
                      <option defaultValue=""> select menu</option>
                      <option defaultValue="administrador">
                        administrador
                      </option>
                      <option defaultValue="estudiante">estudiante</option>
                      <option defaultValue="lider">lider</option>
                    </select>
                  </div>
                  <div className="col-md-6 ">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
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
                      registrar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Registrar
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RegistrarUsuario;
