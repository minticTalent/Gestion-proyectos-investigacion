import React, { useState } from "react";
import { useMutation, gql, useQuery } from "@apollo/client";
import { OverlayTrigger, Tooltip, Modal, Button } from "react-bootstrap";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import { useAlert } from "react-alert";
import { LISTAR_PROYECTOS, ADD_AVANCE } from "../../useRequest.js";
function ProyectoStudents() {
  const alert = useAlert(); // constante para las alertas
  //ESTADOS
  const [visible, setVisible] = useState(false); // Mostrar y ocultar los lideres
  const [visibleIns, setVisibleIns] = useState(false); // Mostrar y ocultar las inscripciones
  const [visibleAvances, setVisibleAvance] = useState(false); // Mostrar y ocultar los avances
  const [show, setShow] = useState(false);
  const [idProyecto, setIdProyecto] = useState({
    // id del proyecto para solo mostrar y ocultar en un solo proyecto
    id: "",
  });
  const [stateEditarAvances, setStateEditarAvence] = useState({
    id: "",
    documento: "",
    fecha_avances: "",
    descripcion: "",
  });

  //QUERYS
  const { data, loading, error } = useQuery(LISTAR_PROYECTOS);
  console.log(data);
  //MUTACIONES
  const [mutationAddAvances] = useMutation(ADD_AVANCE, {
    variables: {
      id: stateEditarAvances.id,
      documento: stateEditarAvances.documento,
      addInput: {
        documento: stateEditarAvances.documento,
        fecha_avances: stateEditarAvances.fecha_avances,
        descripcion: stateEditarAvances.descripcion,
      },
    },
    onCompleted(data) {
      if (data) {
        alert.success("avance agregado");
      }
    },
  });

  // FUNCIONES
  //Metodo para mostrar titulo en los iconos de lideres
  const renderTooltipListar = (props) => (
    <Tooltip {...props}>Mostrar lideres </Tooltip>
  );
  //Metodo para mostrar titulo en los iconos de inscripciones
  const renderTooltipIns = (props) => (
    <Tooltip {...props}>Mostrar inscripciones </Tooltip>
  );
  //Metodo para mostrar titulo en los iconos de avances
  const renderTooltipAvances = (props) => (
    <Tooltip {...props}>Mostrar avances </Tooltip>
  );
  //Metodo para inscribrime en un proyecto
  const renderTooltipInsProyect = (props) => (
    <Tooltip {...props}>agregar avance </Tooltip>
  );

  //Funcion para mostrar y ocultar los lideres
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
  //Funcion para recibir el id del proyecto y enviarlo al estado
  const handleClose = () => setShow(false);
  const HandleClickAddAvance = (id) => {
    setStateEditarAvence({
      ...stateEditarAvances,
      id: id,
    });
    setShow(true);
  };
  const handleSubmitAvance = (event) => {
    event.preventDefault();
    mutationAddAvances();
    setShow(false);
  };
  const handleChangeAvance = (event) => {
    setStateEditarAvence({
      ...stateEditarAvances,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <>
      <h3 style={{ marginLeft: "10px" }}>
        Espacio para tus proyectos si tienes proyectos
      </h3>
      {/**MODAL AGRGAR AVANCE */}
      <Modal show={show} size="lg" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar avance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <form onSubmit={handleSubmitAvance}>
              <div className="row">
                <div className="col-md-3">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Digite tu documento"
                    required
                    name="documento"
                    onChange={handleChangeAvance}
                  />
                </div>
                <div className="col-md-3">
                  <input
                    className="form-control"
                    type="date"
                    placeholder="Digite la fecha"
                    required
                    name="fecha_avances"
                    onChange={handleChangeAvance}
                  />
                </div>
                <div className="col-md-3">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Digite la descripcion"
                    required
                    name="descripcion"
                    onChange={handleChangeAvance}
                  />
                </div>
                <div className="col-md-3">
                  <button className="btn btn-dark">Enviar avance</button>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="row">
        {data
          ? data.getProyectos.map((items) => {
              return (
                <>
                  {items.inscripciones.map((item) => {
                    return (
                      <>
                        {item.estado_inscripcion == "aceptado" ? (
                          <>
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
                                        <p className="card-text">
                                          Objetivos generales:
                                        </p>
                                      </div>
                                      <div className="col-md-7 align-self-start">
                                        <p className="card-text">
                                          {items.objetivos_generales}
                                        </p>
                                      </div>
                                      <hr></hr>
                                      <div className="col-md-5 align-self-start">
                                        <p className="card-text">
                                          Objetivos especificos:
                                        </p>
                                      </div>
                                      <div className="col-md-7 align-self-start">
                                        <p className="card-text">
                                          {items.objetivos_especificos}
                                        </p>
                                      </div>
                                      <hr></hr>
                                      <div className="col-md-5 align-self-start">
                                        <p className="card-text">
                                          Presupuesto:
                                        </p>
                                      </div>
                                      <div className="col-md-7 align-self-start">
                                        <p className="card-text">
                                          {items.presupuesto}
                                        </p>
                                      </div>
                                      <hr></hr>
                                      <div className="col-md-5 align-self-start">
                                        <p className="card-text">
                                          Fecha inicio:
                                        </p>
                                      </div>
                                      <div className="col-md-7 align-self-start">
                                        <p className="card-text">
                                          {items.fecha_inicio}
                                        </p>
                                      </div>
                                      <hr></hr>
                                      <div className="col-md-5 align-self-start">
                                        <p className="card-text">Fecha fin:</p>
                                      </div>
                                      <div className="col-md-7 align-self-start">
                                        <p className="card-text">
                                          {items.fecha_fin}
                                        </p>
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
                                              onClick={() =>
                                                visibilidad(items._id)
                                              }
                                              style={{ cursor: "pointer" }}
                                            />
                                          </OverlayTrigger>
                                        </p>
                                      </div>
                                      <hr></hr>
                                      {items.lideres.map((item) => {
                                        return (
                                          <>
                                            <div
                                              className={
                                                visible &&
                                                idProyecto == `${items._id}`
                                                  ? "row visible"
                                                  : "row invisible"
                                              }
                                            >
                                              <div className="col-md-5 align-self-start">
                                                <p className="card-text lideres">
                                                  Nombre:
                                                </p>
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
                                        <p className="card-text">
                                          Inscripciones:
                                        </p>
                                      </div>
                                      <div className="col-md-7 align-self-start">
                                        <p className="card-text">
                                          Mostrar inscripciones{" "}
                                          <OverlayTrigger
                                            placement="top"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={renderTooltipIns}
                                          >
                                            <AddCircleRoundedIcon
                                              color="secondary"
                                              style={{ cursor: "pointer" }}
                                              title="Mostrar inscripciones"
                                              onClick={() =>
                                                visibilidadIns(items._id)
                                              }
                                            />
                                          </OverlayTrigger>
                                        </p>
                                      </div>
                                      <hr></hr>
                                      {items.inscripciones.map((item) => {
                                        return (
                                          <>
                                            <div
                                              className={
                                                visibleIns &&
                                                idProyecto == `${items._id}`
                                                  ? "row visible"
                                                  : "row invisible"
                                              }
                                            >
                                              <div className="col-md-5 align-self-start">
                                                <p className="card-text lideres">
                                                  Nombre:
                                                </p>
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
                                                <p className="card-text lideres">
                                                  Estado:
                                                </p>
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
                                        <p className="card-text">
                                          Mostrar Avances{" "}
                                          <OverlayTrigger
                                            placement="top"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={renderTooltipAvances}
                                          >
                                            <AddCircleRoundedIcon
                                              color="secondary"
                                              onClick={() =>
                                                visibilidadAvances(items._id)
                                              }
                                            />
                                          </OverlayTrigger>
                                          {items.estado_proyecto == "activo" &&
                                          items.fase_proyecto !==
                                            "terminado" ? (
                                            <OverlayTrigger
                                              placement="top"
                                              delay={{ show: 250, hide: 400 }}
                                              overlay={renderTooltipInsProyect}
                                            >
                                              <AppRegistrationIcon
                                                style={{ cursor: "pointer" }}
                                                color="secondary"
                                                title="Inscribirme a este proyecto"
                                                onClick={() =>
                                                  HandleClickAddAvance(
                                                    items._id
                                                  )
                                                }
                                              />
                                            </OverlayTrigger>
                                          ) : null}
                                        </p>
                                      </div>
                                      <hr></hr>
                                      {items.avances.map((item) => {
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
                                                <p className="card-text lideres">
                                                  Fecha:
                                                </p>
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
                                        <p className="card-text">
                                          Estado del proyecto:
                                        </p>
                                      </div>
                                      <div className="col-md-7 align-self-start">
                                        <p className="card-text">
                                          {items.estado_proyecto}
                                        </p>
                                      </div>
                                      <hr></hr>
                                      <div className="col-md-5 align-self-start">
                                        <p className="card-text">
                                          Fase del proyecto:
                                        </p>
                                      </div>
                                      <div className="col-md-7 align-self-start">
                                        <p className="card-text">
                                          {items.fase_proyecto}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : null}
                      </>
                    );
                  })}
                </>
              );
            })
          : null}
      </div>
    </>
  );
}

export default ProyectoStudents;
