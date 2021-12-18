import React, { useState } from "react";
import { REGISTER_PROYECTO, LISTAR_PROYECTOS } from "../../useRequest.js";
import { useMutation } from "@apollo/client";
import { useAlert } from "react-alert";
function CrearProyecto() {
  const alert = useAlert();
  const [registerProject, setRegisterProject] = useState({
    nombre_proyecto: "",
    generales: "",
    especificos: "",
    presupuesto: 0,
    fecha_inicio: "",
    fecha_fin: "",
    documento: "",
    nombre_lider: "",
    estado_proyecto: "inactivo",
  });
  // Agregar un proyecto
  const [crearProyecto] = useMutation(REGISTER_PROYECTO, {
    variables: {
      createInput: {
        nombre_proyecto: registerProject.nombre_proyecto,
        objetivos_generales: registerProject.generales,
        objetivos_especificos: registerProject.especificos,
        presupuesto: parseInt(registerProject.presupuesto),
        fecha_inicio: registerProject.fecha_inicio,
        fecha_fin: registerProject.fecha_fin,
        lideres: [
          {
            documento: registerProject.documento,
            nombre: registerProject.nombre_lider,
          },
        ],
        estado_proyecto: "inactivo",
        fase_proyecto: "",
      },
    },
    onCompleted(data) {
      if (data) {
        alert.success("Tu inscripcion fue exitosa!");
        setRegisterProject({
          nombre_proyecto: "",
          generales: "",
          especificos: "",
          presupuesto: "",
          fecha_inicio: "",
          fecha_fin: "",
          documento: "",
          nombre_lider: "",
        });
      } else {
        alert.error("Ya te encuentras registrado");
      }
    },
    refetchQueries: [{ query: LISTAR_PROYECTOS }],
  });

  function handleChange(event) {
    setRegisterProject({
      ...registerProject,
      [event.target.name]: event.target.value,
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    event.target.reset();
    crearProyecto();
  }
  return (
    <>
      <div className="row" style={{ marginLeft: "6px", marginRight: "10px" }}>
        <div className="col-md-12">
          <h6 className="pb-3">Crear Proyecto:</h6>
        </div>
        <div className="card">
          <form onSubmit={handleSubmit} className="mt-4 mb-4">
            <div className="row">
              <div className="col-md-4">
                <label className="form-label">Nombre proyecto</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  name="nombre_proyecto"
                  placeholder="Digite su nombre"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Presupuesto</label>
                <input
                  type="number"
                  required
                  className="form-control"
                  name="presupuesto"
                  placeholder="Digite el presupuesto"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Objectivos generales</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  name="generales"
                  placeholder="Digite el presupuesto"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4 mt-3">
                <label className="form-label">Objectivos especificos</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  name="especificos"
                  placeholder="Digite el presupuesto"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4 mt-3">
                <label className="form-label">Fecha inicio</label>
                <input
                  type="date"
                  required
                  name="fecha_inicio"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4 mt-3">
                <label className="form-label">Fecha fin</label>
                <input
                  type="date"
                  required
                  name="fecha_fin"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-12 mt-5">
                <h3>Lider:</h3>
              </div>
              <div className="col-md-4 mt-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  required
                  name="nombre_lider"
                  placeholder="Digite su nombre"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4 mt-3">
                <label className="form-label">Documento</label>
                <input
                  type="text"
                  required
                  name="documento"
                  placeholder="Digite su documento"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-3 mt-5">
                <button
                  className="btn btn-dark btn-block"
                  type="submit"
                  style={{ width: "100%" }}
                >
                  Registrar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CrearProyecto;
