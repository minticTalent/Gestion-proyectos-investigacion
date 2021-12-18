import React, { useState } from "react";
import { useMutation, gql, useQuery } from "@apollo/client";
import { OverlayTrigger, Tooltip, Modal, Button } from "react-bootstrap";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { LISTAR_PROYECTOS } from "../../useRequest.js";
function ProyectoLideres() {
  //ESTADOS
  const [idProyecto, setIdProyecto] = useState({
    // id del proyecto para solo mostrar y ocultar en un solo proyecto
    id: "",
  });
  const [visible, setVisible] = useState(false); // Mostrar y ocultar los lideres
  const [visibleIns, setVisibleIns] = useState(false); // Mostrar y ocultar las inscripciones
  const [visibleAvances, setVisibleAvance] = useState(false); // Mostrar y ocultar los avances
  //QUERYS
  const { data, loading, error } = useQuery(LISTAR_PROYECTOS);
  //MUTACIONES

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
  return (
    <div className="row">
      {data &&
        data.getProyectos.map((items) => {
          return (
            <>
              {items.lideres.map((lideres) => {
                return (
                  <>
                    {localStorage.getItem("documento") == lideres.documento ? (
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
                                          onClick={() => visibilidad(items._id)}
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
                                    <p className="card-text">Inscripciones:</p>
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
        })}
    </div>
  );
}

export default ProyectoLideres;
