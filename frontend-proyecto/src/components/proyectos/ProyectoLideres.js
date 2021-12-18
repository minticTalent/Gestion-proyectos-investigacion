import React, { useState } from "react";
import { useMutation, gql, useQuery } from "@apollo/client";
import { OverlayTrigger, Tooltip, Modal, Button } from "react-bootstrap";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import { useAlert } from "react-alert";
import {
  LISTAR_PROYECTOS,
  UPDATE_ESTADO_INSCRIPCION,
  UPDATE_PROYECTO,
  EDIT_AVANCE,
} from "../../useRequest.js";
import { display, style } from "@mui/system";
import "./Misproyectos.css";
function ProyectoLideres() {
  const alert = useAlert(); // constante para las alertas
  //ESTADOS
  const [idProyecto, setIdProyecto] = useState({
    // id del proyecto para solo mostrar y ocultar en un solo proyecto
    id: "",
  });
  const [visible, setVisible] = useState(false); // Mostrar y ocultar los lideres
  const [visibleIns, setVisibleIns] = useState(false); // Mostrar y ocultar las inscripciones
  const [visibleAvances, setVisibleAvance] = useState(false); // Mostrar y ocultar los avances
  const [showUpdateIns, setShowUpdateIns] = useState(false); // Estado para aceptar un estudiante
  const [showUpdateAvance, setShowUpdateAvance] = useState(false); // Estado para aceptar un estudiante
  const [showFormUpdate, setShowFormUpdate] = useState(false);
  const [updateDatosBasic, setUpdateDatosBasic] = useState({
    id_proyecto: "",
    nombre_proyecto: "",
    presupuesto: "",
    objetivos_especificos: "",
    objetivos_generales: "",
  });
  const [updateInscripcion, setUpdateInscripcion] = useState({
    id: "",
    estado: "",
    documento: "",
  });
  const [updateAvances, setUpdateAvances] = useState({
    id_proyecto: "",
    observaciones: "",
    documento: "",
  });
  //QUERYS
  const { data, loading, error } = useQuery(LISTAR_PROYECTOS);
  //MUTACIONES
  //Actualizar una inscripcion
  const [updateInscripcionEstado] = useMutation(UPDATE_ESTADO_INSCRIPCION, {
    variables: {
      id: updateInscripcion.id,
      documento: updateInscripcion.documento,
      updateInput: {
        estado_inscripcion: updateInscripcion.estado,
      },
    },
    onCompleted(data) {
      if (data) {
        alert.success("actualización exitosa!");
        setUpdateInscripcion({
          id: "",
          estado: "",
          documento: "",
        });
      } else {
        console.log("no funciono");
      }
    },
  });
  //Actualizar datos basicos
  const [updateDataBasic] = useMutation(UPDATE_PROYECTO, {
    variables: {
      id: updateDatosBasic.id_proyecto,
      updateInput: {
        nombre_proyecto: updateDatosBasic.nombre_proyecto,
        objetivos_generales: updateDatosBasic.objetivos_generales,
        objetivos_especificos: updateDatosBasic.objetivos_especificos,
        presupuesto: parseInt(updateDatosBasic.presupuesto),
      },
    },
    onCompleted(data) {
      if (data) {
        alert.success("actualización exitosa!");
        setUpdateDatosBasic({
          id_proyecto: "",
          nombre_proyecto: "",
          presupuesto: "",
          objetivos_especificos: "",
          objetivos_generales: "",
        });
      } else {
        console.log("no funciono");
      }
    },
  });
  //Actualizar observaciones de un avance
  const [editeOneAvance] = useMutation(EDIT_AVANCE, {
    variables: {
      id: updateAvances.id_proyecto,
      documento: updateAvances.documento,
      editInput: {
        observaciones: updateAvances.observaciones,
      },
    },
    onCompleted(data) {
      if (data) {
        alert.success("actualización exitosa!");
        setUpdateAvances({
          id_proyecto: "",
          observaciones: "",
          documento: "",
          observaciones: "",
        });
      } else {
        console.log("no funciono");
      }
    },
  });
  //FUNCIONES
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
  //Metodo para mostrar titulo en los iconos de avances
  const renderTooltipUpdateIns = (props) => (
    <Tooltip {...props}>Actualizar inscripción </Tooltip>
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
  //Funcion para cerrar el modal de actulizar una inscripcion
  const handleClose = () => setShowUpdateIns(false);
  //Funcion para cerrar el modal de actulizar una inscripcion
  const handleCloseAvance = () => setShowUpdateAvance(false);
  //Funcion enviar id proyecto y documento del estudiante
  const UpdateInscripcion = (id, documento) => {
    setUpdateInscripcion({
      id: id,
      documento: documento,
    });
    setShowUpdateIns(true);
  };
  //Funcion para valida formulario de aceptar o rechazar una inscripcion
  const handleSubmitUpdateIns = (event) => {
    event.preventDefault();
    updateInscripcionEstado();
  };
  // Funcion para obtener el dato enviado del fomulario de actualizar unscripcion
  const handleChangeUpdateIns = (event) => {
    setUpdateInscripcion({
      ...updateInscripcion,
      estado: event.target.value,
    });
  };
  //Funcion para obtener los value del form update datos basicos
  const handleChangeBasicos = (event) => {
    setUpdateDatosBasic({
      ...updateDatosBasic,
      [event.target.name]: event.target.value,
    });
  };
  //Funcion para el envio de el formulario datos basicos
  const handleSubmitBasicos = (event) => {
    event.preventDefault();
    event.target.reset();
    updateDataBasic();
  };
  // Funcion para llenar los input de actualizar datos basicos
  const handleClickDatosBasic = (
    id_proyecto,
    nombre,
    presupuesto,
    generales,
    especificos
  ) => {
    setUpdateDatosBasic({
      id_proyecto: id_proyecto,
      nombre_proyecto: nombre,
      presupuesto: presupuesto,
      objetivos_especificos: especificos,
      objetivos_generales: generales,
    });
    setShowFormUpdate(!showFormUpdate);
  };
  //Funcion submit para agrgar observacion a un avance
  const UpdateAvance = (id, documento, observacion) => {
    setShowUpdateAvance(true);
    setUpdateAvances({
      ...updateAvances,
      id_proyecto: id,
      observaciones: observacion,
      documento: documento,
    });
  };
  const handleSubmitUpdateAvances = (event) => {
    editeOneAvance();
    event.preventDefault();
    event.target.reset();
  };
  const handleChangeUpdateAvances = (event) => {
    setUpdateAvances({
      ...updateAvances,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <>
      {/**Modal para observacion de un avances */}
      <Modal show={showUpdateAvance} onHide={handleCloseAvance}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Avances</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmitUpdateAvances}>
            <div className="row">
              <div className="col-md-auto mt-2">
                <label className="form-label">Observación a un avance:</label>
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  defaultValue={updateAvances.observaciones}
                  required
                  className="form-control"
                  name="observaciones"
                  onChange={handleChangeUpdateAvances}
                />
              </div>
              <div className="col-md-6 m-auto pt-3">
                <button
                  type="submit"
                  onClick={handleCloseAvance}
                  className="btn btn-secondary"
                >
                  Enviar Observación
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAvance}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      {/**Modal para actualizar el estado de una inscripcion */}
      <Modal show={showUpdateIns} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar inscripción</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmitUpdateIns}>
            <div className="row">
              <div className="col-md-auto mt-2">
                <label className="form-label">Actualizar Inscripción:</label>
              </div>
              <div className="col-md-6">
                <select
                  className="form-select"
                  name="updateInscripcion"
                  aria-label="Default select"
                  onChange={handleChangeUpdateIns}
                >
                  <option defaultValue>Elija una opción</option>
                  <option value="aceptado">Aceptar</option>
                  <option value="rechazado">Rechazar</option>
                </select>
              </div>
              <div className="col-md-6 m-auto pt-3">
                <button
                  type="submit"
                  onClick={handleClose}
                  className="btn btn-secondary"
                >
                  Enviar inscripción
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      {/**Formulario para validar los datos basicos */}
      <div
        className={
          showFormUpdate
            ? "card-colums visibleUpdateMisProyecto"
            : "invisibleUpdateMisProyecto"
        }
      >
        <div className="card">
          <div className="card-body">
            <div className="card-title pt-3 pb-3">
              <h5>Actualizar el proyecto: </h5>
            </div>
            <form onSubmit={handleSubmitBasicos}>
              <div className="row">
                <div className="col-md-3">
                  <label>Nombre del proyecto:</label>
                  <input
                    type="text"
                    required
                    defaultValue={updateDatosBasic.nombre_proyecto}
                    onChange={handleChangeBasicos}
                    className="form-control"
                    name="nombre_proyecto"
                  />
                </div>
                <div className="col-md-3">
                  <label>Objectivos generales:</label>
                  <input
                    type="text"
                    required
                    defaultValue={updateDatosBasic.objetivos_generales}
                    onChange={handleChangeBasicos}
                    className="form-control"
                    name="objectivos_generales"
                  />
                </div>
                <div className="col-md-3">
                  <label>Objectivos especificos:</label>
                  <input
                    type="text"
                    required
                    defaultValue={updateDatosBasic.objetivos_especificos}
                    onChange={handleChangeBasicos}
                    className="form-control"
                    name="objetivos_especificos"
                  />
                </div>
                <div className="col-md-2">
                  <label>Presupuesto:</label>
                  <input
                    type="text"
                    required
                    defaultValue={updateDatosBasic.presupuesto}
                    onChange={handleChangeBasicos}
                    className="form-control"
                    name="presupuesto"
                  />
                </div>
                <div className="col-sm-1 text-center pt-4">
                  <button
                    className="btn btn-dark"
                    style={{ marginRight: "10px" }}
                    type="submit"
                  >
                    {" "}
                    Actualizar
                  </button>
                </div>
              </div>
            </form>
            <div className="col-md-1 pt-3 m-auto">
              <button
                className="btn btn-danger"
                type="buttom"
                onClick={() => {
                  setUpdateDatosBasic({
                    id_proyecto: "",
                    nombre_proyecto: "",
                    presupuesto: "",
                    objetivos_especificos: "",
                    objetivos_generales: "",
                  });
                  setShowFormUpdate(!showFormUpdate);
                }}
              >
                {" "}
                cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {data &&
          data.getProyectos.map((items) => {
            return (
              <>
                {items.lideres.map((lideres) => {
                  return (
                    <>
                      {localStorage.getItem("documento") ==
                      lideres.documento ? (
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
                                      <p className="card-text">Presupuesto:</p>
                                    </div>
                                    <div className="col-md-7 align-self-start">
                                      <p className="card-text">
                                        {items.presupuesto}
                                      </p>
                                    </div>
                                    <hr></hr>
                                    <div className="col-md-5 align-self-start">
                                      <p className="card-text">Fecha inicio:</p>
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
                                            {items.fase_proyecto !==
                                            "terminado" ? (
                                              <>
                                                <div className="col-md-5 align-self-start">
                                                  <p
                                                    className="card-text lideres"
                                                    style={{ color: "green" }}
                                                  >
                                                    Actualizar el estado
                                                  </p>
                                                </div>
                                                <div className="col-md-5 align-self-start">
                                                  <OverlayTrigger
                                                    placement="top"
                                                    delay={{
                                                      show: 250,
                                                      hide: 400,
                                                    }}
                                                    overlay={
                                                      renderTooltipUpdateIns
                                                    }
                                                  >
                                                    <AssignmentLateIcon
                                                      color="secondary"
                                                      style={{
                                                        cursor: "pointer",
                                                      }}
                                                      onClick={() =>
                                                        UpdateInscripcion(
                                                          items._id,
                                                          item.documento
                                                        )
                                                      }
                                                    />
                                                  </OverlayTrigger>
                                                </div>
                                              </>
                                            ) : null}
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
                                            onClick={() =>
                                              visibilidadAvances(items._id)
                                            }
                                          />
                                        </OverlayTrigger>
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
                                            <div className="col-md-5 align-self-start">
                                              <p
                                                className="card-text lideres"
                                                style={{ color: "green" }}
                                              >
                                                Agregar observación
                                              </p>
                                            </div>
                                            <div className="col-md-5 align-self-start">
                                              <OverlayTrigger
                                                placement="top"
                                                delay={{ show: 250, hide: 400 }}
                                                overlay={renderTooltipAvances}
                                              >
                                                <AssignmentLateIcon
                                                  color="secondary"
                                                  style={{ cursor: "pointer" }}
                                                  onClick={() =>
                                                    UpdateAvance(
                                                      items._id,
                                                      item.documento,
                                                      item.observaciones
                                                    )
                                                  }
                                                />
                                              </OverlayTrigger>
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
                                    {items.estado_proyecto == "activo" ? (
                                      <div className="col-md-5 align-self-start m-auto pt-3">
                                        <button
                                          type="button"
                                          className="btn btn-dark"
                                          onClick={() =>
                                            handleClickDatosBasic(
                                              items._id,
                                              items.nombre_proyecto,
                                              items.presupuesto,
                                              items.objetivos_generales,
                                              items.objetivos_especificos
                                            )
                                          }
                                        >
                                          Actualizar datos basicos
                                        </button>
                                      </div>
                                    ) : null}
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
          })}
      </div>
    </>
  );
}

export default ProyectoLideres;
