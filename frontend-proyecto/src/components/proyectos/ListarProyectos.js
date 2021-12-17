import React, { useState, useEffect } from "react";
import { useMutation, gql, useQuery } from "@apollo/client";
import {
  ADD_ESTUDIANTE,
  client,
  LISTAR_PROYECTOS,
  EDIT_PROYECTO,
} from "../../useRequest.js";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import SecurityUpdateWarningRoundedIcon from "@mui/icons-material/SecurityUpdateWarningRounded";
import { useAlert } from "react-alert";
import { OverlayTrigger, Tooltip, Modal, Button } from "react-bootstrap";
import "./ListarProyecto.css";
import CrearProyecto from "./CrearProyecto.js";

function ListarProyectos(props) {
  const alert = useAlert(); // constante para las alertas

  // TODOS LOS ESTADOS QUE SE UTILIZAN
  const { sidebar } = props; // recibimos el estado mediante las props y lo pasamos a una constante para su uso
  const [visible, setVisible] = useState(false); // Mostrar y ocultar los lideres
  const [visibleIns, setVisibleIns] = useState(false); // Mostrar y ocultar las inscripciones
  const [visibleAvances, setVisibleAvance] = useState(false); // Mostrar y ocultar los avances
  const [idProyecto, setIdProyecto] = useState({
    // id del proyecto para solo mostrar y ocultar en un solo proyecto
    id: "",
  });
  const [mutationInscripcion, setMutationInscripcion] = useState({
    //Estado mutacion inscripcion proyecto
    fecha_egreso: "",
    documento: "",
    nombre: "",
    estado_inscripcion: "pendiente",
    fecha_ingreso: "",
    id_proyecto: "",
    id_estudiante: "",
    nombreProyecto: "",
  });
  const [show, setShow] = useState(false); //Estado para modal inscripcion
  const [showEstado, setShowEstado] = useState(false); // Estado para modal actualizar estado
  //FIN DE LOS ESTADOS QUE SE UTILIZAN

  //TODAS LAS FUNCIONES PARA LOS MODALES
  const handleClose = () => setShow(false); //Funciones para el modal
  const handleCloseStado = () => setShowEstado(false); // Funcion para cerrar modal update estado
  //FIN FUNCIONES MODALES

  //QUERYS
  // Query que consulta todos los proyectos en el archivo useRequest traigo el type query
  const { data, loading, error } = useQuery(LISTAR_PROYECTOS);
  //FIN QUERYS

  //MUTACIONES
  const [addEstudiantes] = useMutation(ADD_ESTUDIANTE, {
    // Agregar inscripcion de un estudiante
    variables: {
      proyectoid: mutationInscripcion.id_proyecto,
      usuarioid: mutationInscripcion.id_estudiante,
      createInput: {
        documento: mutationInscripcion.documento,
        nombre: mutationInscripcion.nombre,
        estado_inscripcion: mutationInscripcion.estado_inscripcion,
        fecha_ingreso: mutationInscripcion.fecha_ingreso,
        fecha_egreso: mutationInscripcion.fecha_egreso,
      },
    },
    onCompleted(data) {
      if (data.addEstuadiante !== null) {
        alert.success("Tu inscripcion fue exitosa!");
      } else {
        alert.error("Ya te encuentras registrado");
      }
    },
    refetchQueries: [{ query: LISTAR_PROYECTOS }],
  });
  // FIN MUTACIONES

  //FUNCIONES AL UTILIZAR EN EL PROYECTO
  const visibilidad = (id) => {
    setIdProyecto(id);
    setVisible(!visible);
  };
  //Funcion para cambiar el estado para mostar las inscripciones
  const visibilidadIns = (id) => {
    setIdProyecto(id);
    setVisibleIns(!visibleIns);
  };
  //Funcion para cambiar el estado para mostar los avances
  const visibilidadAvances = (id) => {
    setIdProyecto(id);
    setVisibleAvance(!visibleAvances);
  };
  //Metodo para mostrar titulo en los iconos de lideres
  const renderTooltipListar = (props) => (
    <Tooltip {...props}>Mostrar lideres </Tooltip>
  );
  //Metodo para mostrar titulo en los iconos de inscripciones
  const renderTooltipIns = (props) => (
    <Tooltip {...props}>Mostrar inscripciones </Tooltip>
  );
  //Metodo para inscribrime en un proyecto
  const renderTooltipInsProyect = (props) => (
    <Tooltip {...props}>Inscribirme a este proyecto </Tooltip>
  );
  //Metodo para mostrar titulo en los iconos de avances
  const renderTooltipAvances = (props) => (
    <Tooltip {...props}>Mostrar avances </Tooltip>
  );
  //Metodo para mostrar titulo en los iconos de estado
  const renderTooltipEstado = (props) => (
    <Tooltip {...props}>
      Actualiza el estado si es activo a inactivo y viceversa{" "}
    </Tooltip>
  );
  //Metodos para agregar estuadiante a un proyecto
  async function HandleClickInscripcion(id, nombreProyecto) {
    setMutationInscripcion({
      ...mutationInscripcion,
      id_proyecto: id,
      nombreProyecto: nombreProyecto,
      id_estudiante: localStorage.getItem("ID"),
    });
    setShow(true);
  }
  //funcion para envio de formulario add estaudiantes
  function handleSubmitIns(event) {
    event.preventDefault();
    event.target.reset();
    addEstudiantes();
  }
  //funcion con evento para almacenar en el estado lo del formulario de add estudents
  function handleChangeIns(event) {
    setMutationInscripcion({
      ...mutationInscripcion,
      fecha_ingreso: new Date(),
      [event.target.name]: event.target.value,
    });
  }
  // metodo para motrar el modal de actualizar un estado
  const updateProyectoEstado = (id, estado) => {
    setShowEstado(true);
  };
  // metodo para envio de formulario
  const handleSubmitEstado = (event) => {
    event.preventDefault();
  };
  //metodo para el evento que captura el form de actualizar estado
  const handleChangeEstado = (e) => {
    console.log(e.target.value);
  };
  return (
    //clasName={sidebar ...} principal que tiene que llevar todas las paginas para acomodar su container dependiendo si esta abierto o cerrado el navbar
    <>
      <div className={sidebar ? "container-on" : "container-off"}>
        {localStorage.getItem("rol") == "lider" ? <CrearProyecto /> : null}
        {/* Modal para actualizar el estado de un proyecto */}
        <Modal show={showEstado} onHide={handleCloseStado}>
          <Modal.Header closeButton>
            <Modal.Title>Actualizar estado</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmitEstado}>
              <div className="row">
                <div className="col-md-auto mt-2">
                  <label className="form-label">Actualizar estado:</label>
                </div>
                <div className="col-md-6">
                  <select
                    className="form-select"
                    name="updateEstado"
                    aria-label="Default select example"
                    onChange={handleChangeEstado}
                  >
                    <option defaultValue>Open this select menu</option>
                    <option value="activo">activo</option>
                    <option value="inactivo">inactivo</option>
                  </select>
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseStado}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Modal para agregar estudiante a un proyecto */}
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              {mutationInscripcion.nombreProyecto} : {mutationInscripcion.id}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmitIns}>
              <div className="row">
                <div className="col-md-12">
                  <h6 htmlFor="proyectoId" className="form-label">
                    Al inscribirte quedaras en estado pendiente, esperando que
                    te acepten o no al proyecto
                  </h6>
                </div>
                <div className="col-md-6 pt-3">
                  <input
                    type="text"
                    required
                    className="form-control"
                    onChange={handleChangeIns}
                    id="nombre"
                    name="nombre"
                    placeholder="Digite tu nombre"
                  />
                </div>
                <div className="col-md-6 pt-3">
                  <input
                    type="text"
                    required
                    className="form-control"
                    onChange={handleChangeIns}
                    id="documento"
                    name="documento"
                    placeholder="Digite tu documento"
                  />
                </div>
              </div>
              <div className="d-grid gap-2 col-md-5 mx-auto pt-3">
                <button
                  type="submit"
                  onClick={handleClose}
                  className="btn btn-secondary"
                >
                  Enviar inscripción
                </button>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="row">
          {data &&
            data.getProyectos.map((items) => {
              return (
                <div className="col-md-6 p-4" key={items._id}>
                  <div className="card-columns">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title pb-2">
                          proyecto: <i>{items.nombre_proyecto}</i>
                        </h5>
                        <div className="row">
                          <div className="col-md-5 align-self-start">
                            <p className="card-text">_id:</p>
                          </div>
                          <div className="col-md-7 align-self-start">
                            <p className="card-text">{items._id}</p>
                          </div>
                          <hr></hr>
                          <div className="col-md-5 align-self-start">
                            <p className="card-text">Objetivos generales:</p>
                          </div>
                          <div className="col-md-7 align-self-start">
                            <p className="card-text">
                              {items.objetivos_generales}
                            </p>
                          </div>
                          <hr></hr>
                          <div className="col-md-5 align-self-start">
                            <p className="card-text">Objetivos especificos:</p>
                          </div>
                          <div className="col-md-7 align-self-start">
                            <p className="card-text">
                              {items.objetivos_especificos}
                            </p>
                          </div>
                          <hr></hr>
                          <div className="col-md-5 align-self-start">
                            <p className="card-text">Presupuesto:</p>
                          </div>
                          <div className="col-md-7 align-self-start">
                            <p className="card-text">{items.presupuesto}</p>
                          </div>
                          <hr></hr>
                          <div className="col-md-5 align-self-start">
                            <p className="card-text">Fecha inicio:</p>
                          </div>
                          <div className="col-md-7 align-self-start">
                            <p className="card-text">{items.fecha_inicio}</p>
                          </div>
                          <hr></hr>
                          <div className="col-md-5 align-self-start">
                            <p className="card-text">Fecha fin:</p>
                          </div>
                          <div className="col-md-7 align-self-start">
                            <p className="card-text">{items.fecha_fin}</p>
                          </div>
                          <hr></hr>
                          <div className="col-md-5 align-self-start">
                            <p className="card-text">Lideres:</p>
                          </div>
                          <div className="col-md-7 align-self-start">
                            <p className="card-text">
                              Mostrar lideres{" "}
                              <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltipListar}
                              >
                                <AddCircleRoundedIcon
                                  color="secondary"
                                  onClick={() => visibilidad(items._id)}
                                  style={{ cursor: "pointer" }}
                                />
                              </OverlayTrigger>
                            </p>
                          </div>
                          <hr></hr>
                          {items.lideres.map((item, index) => {
                            return (
                              <>
                                <div
                                  className={
                                    visible && idProyecto == `${items._id}`
                                      ? "row visible"
                                      : "row invisible"
                                  }
                                >
                                  <div className="col-md-5 align-self-start">
                                    <p className="card-text lideres">Nombre:</p>
                                  </div>
                                  <div className="col-md-5 align-self-start">
                                    <p className="card-text lideres">
                                      {item.nombre}
                                    </p>
                                  </div>
                                  <div className="col-md-5 align-self-start">
                                    <p className="card-text lideres">
                                      Documento:
                                    </p>
                                  </div>
                                  <div className="col-md-5 align-self-start">
                                    <p className="card-text lideres">
                                      {item.documento}
                                    </p>
                                  </div>
                                  <hr></hr>
                                </div>
                              </>
                            );
                          })}
                          <div className="col-md-5 align-self-start">
                            <p className="card-text">Inscripciones:</p>
                          </div>
                          <div className="col-md-7 align-self-start">
                            <p
                              className="card-text"
                              style={{ cursor: "pointer" }}
                            >
                              Mostrar inscripciones{" "}
                              <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltipIns}
                              >
                                <AddCircleRoundedIcon
                                  color="secondary"
                                  title="Mostrar inscripciones"
                                  onClick={() => visibilidadIns(items._id)}
                                />
                              </OverlayTrigger>
                              {localStorage.getItem("rol") == "estudiante" &&
                              items.estado_proyecto == "activo" ? (
                                <OverlayTrigger
                                  placement="top"
                                  delay={{ show: 250, hide: 400 }}
                                  overlay={renderTooltipInsProyect}
                                >
                                  <AppRegistrationIcon
                                    color="secondary"
                                    title="Inscribirme a este proyecto"
                                    onClick={() =>
                                      HandleClickInscripcion(
                                        items._id,
                                        items.nombre_proyecto
                                      )
                                    }
                                  />
                                </OverlayTrigger>
                              ) : null}
                            </p>
                          </div>
                          <hr></hr>
                          {items.inscripciones.map((item, index) => {
                            return (
                              <>
                                <div
                                  className={
                                    visibleIns && idProyecto == `${items._id}`
                                      ? "row visible"
                                      : "row invisible"
                                  }
                                >
                                  <div className="col-md-5 align-self-start">
                                    <p className="card-text lideres">Nombre:</p>
                                  </div>
                                  <div className="col-md-5 align-self-start">
                                    <p className="card-text lideres">
                                      {item.nombre}
                                    </p>
                                  </div>
                                  <div className="col-md-5 align-self-start">
                                    <p className="card-text lideres">
                                      Documento:
                                    </p>
                                  </div>
                                  <div className="col-md-5 align-self-start">
                                    <p className="card-text lideres">
                                      {item.documento}
                                    </p>
                                  </div>
                                  <div className="col-md-5 align-self-start">
                                    <p className="card-text lideres">Estado:</p>
                                  </div>
                                  <div className="col-md-5 align-self-start">
                                    <p className="card-text lideres">
                                      {item.estado_inscripcion}
                                    </p>
                                  </div>
                                  <div className="col-md-5 align-self-start">
                                    <p className="card-text lideres">
                                      Fecha ingreso
                                    </p>
                                  </div>
                                  <div className="col-md-5 align-self-start">
                                    <p className="card-text lideres">
                                      {item.fecha_ingreso}
                                    </p>
                                  </div>
                                  <div className="col-md-5 align-self-start">
                                    <p className="card-text lideres">
                                      Fecha egreso
                                    </p>
                                  </div>
                                  <div className="col-md-5 align-self-start">
                                    <p className="card-text lideres">
                                      {item.fecha_egreso}
                                    </p>
                                  </div>
                                  <hr></hr>
                                </div>
                              </>
                            );
                          })}
                          <div className="col-md-5 align-self-start">
                            <p className="card-text">Avances:</p>
                          </div>
                          <div className="col-md-7 align-self-start">
                            <p
                              className="card-text"
                              style={{ cursor: "pointer" }}
                            >
                              Mostrar Avances{" "}
                              <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltipAvances}
                              >
                                <AddCircleRoundedIcon
                                  color="secondary"
                                  onClick={() => visibilidadAvances(items._id)}
                                />
                              </OverlayTrigger>
                            </p>
                          </div>
                          <hr></hr>
                          {items.avances.map((item, index) => {
                            return (
                              <>
                                <div
                                  className={
                                    visibleAvances &&
                                    idProyecto == `${items._id}`
                                      ? "row visible"
                                      : "row invisible"
                                  }
                                >
                                  <div className="col-md-5 align-self-start">
                                    <p className="card-text lideres">
                                      Documento:
                                    </p>
                                  </div>
                                  <div className="col-md-5 align-self-start">
                                    <p className="card-text lideres">
                                      {item.documento}
                                    </p>
                                  </div>
                                  <div className="col-md-5 align-self-start">
                                    <p className="card-text lideres">Fecha:</p>
                                  </div>
                                  <div className="col-md-5 align-self-start">
                                    <p className="card-text lideres">
                                      {item.fecha_avances}
                                    </p>
                                  </div>
                                  <div className="col-md-5 align-self-start">
                                    <p className="card-text lideres">
                                      Descripcion:
                                    </p>
                                  </div>
                                  <div className="col-md-5 align-self-start">
                                    <p className="card-text lideres">
                                      {item.descripcion}
                                    </p>
                                  </div>
                                  <div className="col-md-5 align-self-start">
                                    <p className="card-text lideres">
                                      Observaciones:
                                    </p>
                                  </div>
                                  <div className="col-md-5 align-self-start">
                                    <p className="card-text lideres">
                                      {item.observaciones}
                                    </p>
                                  </div>
                                  <hr></hr>
                                </div>
                              </>
                            );
                          })}
                          <div className="col-md-5 align-self-start">
                            <p className="card-text">Estado del proyecto:</p>
                          </div>
                          <div className="col-md-7 align-self-start">
                            <p className="card-text">
                              {items.estado_proyecto}{" "}
                              {localStorage.getItem("rol") ==
                              "administrador" ? (
                                <OverlayTrigger
                                  placement="top"
                                  delay={{ show: 250, hide: 400 }}
                                  overlay={renderTooltipEstado}
                                >
                                  <SecurityUpdateWarningRoundedIcon
                                    style={{ cursor: "pointer" }}
                                    color="secondary"
                                    onClick={() =>
                                      updateProyectoEstado(
                                        items._id,
                                        items.estado_proyecto
                                      )
                                    }
                                  />
                                </OverlayTrigger>
                              ) : null}
                            </p>
                          </div>
                          <hr></hr>
                          <div className="col-md-5 align-self-start">
                            <p className="card-text">Fase del proyecto:</p>
                          </div>
                          <div className="col-md-7 align-self-start">
                            <p className="card-text">{items.fase_proyecto}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default ListarProyectos;
