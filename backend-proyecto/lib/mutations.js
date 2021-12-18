"use strict";
// Implementar las mutaciones
const connectDb = require("./db");
const { ObjectId } = require("mongodb");
const errorHandler = require("./errorHandler");

module.exports = {
  // Crea un proyecto
  createProyecto: async (root, { input }) => {
    const defaults = {
      lideres: [],
      inscripciones: [],
      avances: [],
    };
    const newProyecto = Object.assign(defaults, input);

    let db;
    let proyecto;
    try {
      db = await connectDb();
      proyecto = await db.collection("proyectos").insertOne(newProyecto);
      newProyecto._id = proyecto.insertedId;
    } catch (error) {
      errorHandler(error);
    }
    return newProyecto;
  },
  // Edita un proyecto
  editProyecto: async (root, { _id, input }) => {
    let db;
    let proyecto;
    try {
      db = await connectDb();
      if (input.fase_proyecto == "terminado") {
        await db.collection("proyectos").updateMany(
          {
            _id: ObjectId(_id),
            "inscripciones.fecha_egreso": "",
          },
          { $set: { "inscripciones.$.fecha_egreso": new Date() } },
          { multi: true }
        );
      }
      await db
        .collection("proyectos")
        .updateOne({ _id: ObjectId(_id) }, { $set: input });
      proyecto = await db
        .collection("proyectos")
        .findOne({ _id: ObjectId(_id) });
    } catch (error) {
      errorHandler(error);
    }
    return proyecto;
  },
  // Elimina un proyecto
  removeProyecto: async (root, { _id }) => {
    let db;
    let proyecto = [];
    try {
      db = await connectDb();
      await db.collection("proyectos").deleteOne({ _id: ObjectId(_id) });
      proyecto = await db.collection("proyectos").find().toArray();
    } catch (error) {
      errorHandler(error);
    }
    return proyecto;
  },
  // Agrega lider a un proyecto
  addLider: async (root, { proyectoId, input }) => {
    let db;
    let proyecto;
    let newProyecto;
    try {
      db = await connectDb();
      proyecto = await db
        .collection("proyectos")
        .findOne({ _id: ObjectId(proyectoId) });
      if (!proyecto) throw new Error("El proyecto no existe");
      await db
        .collection("proyectos")
        .updateOne(
          { _id: ObjectId(proyectoId) },
          { $addToSet: { lideres: input } },
          { new: true }
        );
      newProyecto = await db
        .collection("proyectos")
        .findOne({ _id: ObjectId(proyectoId) });
    } catch (error) {
      errorHandler(error);
    }
    return newProyecto;
  },
  // Agrega estudiantes a un proyecto
  addEstuadiante: async (root, { proyectoId, usuarioId, input }) => {
    let db;
    let proyecto;
    let usuario;
    let rol;
    let newProyecto;
    let estudianteData;
    let validar = false;
    let validarDocumento = true;
    const defaults = {
      fecha_egreso: "",
    };
    const newEstudiante = Object.assign(defaults, input);
    try {
      db = await connectDb();
      proyecto = await db
        .collection("proyectos")
        .findOne({ _id: ObjectId(proyectoId) });
      usuario = await db
        .collection("usuarios")
        .findOne({ _id: ObjectId(usuarioId) });
      estudianteData = proyecto.inscripciones.map((inscripciones) => {
        if (input.documento == inscripciones.documento) {
          validarDocumento = false;
        }
      });
      if (usuario.rol == "estudiante" && validarDocumento) {
        validar = true;
      }
      console.log(validar);
      if (!proyecto || validar == false) {
        return null;
      }
      await db
        .collection("proyectos")
        .updateOne(
          { _id: ObjectId(proyectoId) },
          { $addToSet: { inscripciones: newEstudiante } },
          { new: true }
        );
      newProyecto = await db
        .collection("proyectos")
        .findOne({ _id: ObjectId(proyectoId) });
    } catch (error) {
      errorHandler(error);
    }
    return newProyecto;
  },
  // Agrega avances a un proyecto
  addAvance: async (root, { proyectoId, documento, input }) => {
    let db;
    let proyecto;
    let newProyecto;
    let estudianteData;
    let validar = false;
    const defaults = {
      observaciones: "",
    };
    const newAvance = Object.assign(defaults, input);
    try {
      db = await connectDb();
      proyecto = await db
        .collection("proyectos")
        .findOne({ _id: ObjectId(proyectoId) });
      estudianteData = proyecto.inscripciones.map((inscripciones) => {
        if (
          inscripciones.documento == `${documento}` &&
          inscripciones.estado_inscripcion == "aceptado"
        ) {
          validar = true;
        }
        // return false;
      });
      if (!proyecto || validar == false)
        throw new Error(
          "El proyecto o estudiante no existen, o el estudiante no a sido aceptado"
        );
      await db
        .collection("proyectos")
        .updateOne(
          { _id: ObjectId(proyectoId) },
          { $addToSet: { avances: newAvance } },
          { new: true }
        );
      newProyecto = await db
        .collection("proyectos")
        .findOne({ _id: ObjectId(proyectoId) });
    } catch (error) {
      errorHandler(error);
    }
    return newProyecto;
  },
  // Actualizar una inscripcion de un estudiante
  editInscripcion: async (root, { proyectoId, documento, input }) => {
    let db;
    let proyecto;
    let update;
    try {
      db = await connectDb();
      proyecto = await db
        .collection("proyectos")
        .findOne({ _id: ObjectId(proyectoId) });
      if (!proyecto) throw new Error("El proyecto no existe");
      if (input.nombre) {
        await db.collection("proyectos").updateOne(
          {
            _id: ObjectId(proyectoId),
            "inscripciones.documento": `${documento}`,
          },
          { $set: { "inscripciones.$.nombre": input.nombre } }
        );
      }
      if (input.estado_inscripcion) {
        await db.collection("proyectos").updateOne(
          {
            _id: ObjectId(proyectoId),
            "inscripciones.documento": `${documento}`,
          },
          {
            $set: {
              "inscripciones.$.estado_inscripcion": input.estado_inscripcion,
            },
          }
        );
      }
      if (input.fecha_ingreso) {
        await db.collection("proyectos").updateOne(
          {
            _id: ObjectId(proyectoId),
            "inscripciones.documento": `${documento}`,
          },
          {
            $set: {
              "inscripciones.$.fecha_ingreso": input.fecha_ingreso,
            },
          }
        );
      }
      if (input.fecha_egreso) {
        await db.collection("proyectos").updateOne(
          {
            _id: ObjectId(proyectoId),
            "inscripciones.documento": `${documento}`,
          },
          {
            $set: {
              "inscripciones.$.fecha_egreso": input.fecha_egreso,
            },
          }
        );
      }
      update = await db
        .collection("proyectos")
        .findOne({ _id: ObjectId(proyectoId) });
    } catch (error) {
      errorHandler(error);
    }
    return update;
  },
  // Agregar una observacion a un proyecto
  editAvance: async (root, { proyectoId, documento, input }) => {
    let db;
    let proyecto;
    let update;
    try {
      db = await connectDb();
      proyecto = await db
        .collection("proyectos")
        .findOne({ _id: ObjectId(proyectoId) });
      if (!proyecto) throw new Error("El proyecto no existe");
      if (input.observaciones) {
        await db.collection("proyectos").updateOne(
          {
            _id: ObjectId(proyectoId),
            "avances.documento": `${documento}`,
          },
          { $set: { "avances.$.observaciones": input.observaciones } }
        );
      }
      if (input.fecha_avances) {
        await db.collection("proyectos").updateOne(
          {
            _id: ObjectId(proyectoId),
            "avances.documento": `${documento}`,
          },
          { $set: { "avances.$.fecha_avances": input.fecha_avances } }
        );
      }
      if (input.descripcion) {
        await db.collection("proyectos").updateOne(
          {
            _id: ObjectId(proyectoId),
            "avances.documento": `${documento}`,
          },
          { $set: { "avances.$.descripcion": input.descripcion } }
        );
      }
      update = await db
        .collection("proyectos")
        .findOne({ _id: ObjectId(proyectoId) });
    } catch (error) {
      errorHandler(error);
    }
    return update;
  },
  // editar lider de un proyecto
  editLider: async (root, { proyectoId, documento, input }) => {
    let db;
    let proyecto;
    let update;
    try {
      db = await connectDb();
      proyecto = await db
        .collection("proyectos")
        .findOne({ _id: ObjectId(proyectoId) });
      if (!proyecto) throw new Error("El proyecto no existe");
      if (input.nombre) {
        await db.collection("proyectos").updateOne(
          {
            _id: ObjectId(proyectoId),
            "lideres.documento": `${documento}`,
          },
          { $set: { "lideres.$.nombre": input.nombre } }
        );
      }
      update = await db
        .collection("proyectos")
        .findOne({ _id: ObjectId(proyectoId) });
    } catch (error) {
      errorHandler(error);
    }
    return update;
  },
  // Crear un usuario
  createUsuario: async (root, { input }) => {
    const defaults = {
      identification: "",
      estado: "",
      rol: "",
    };
    const newUsuario = Object.assign(defaults, input);
    let db;
    let usuario;
    try {
      db = await connectDb();
      usuario = await db.collection("usuarios").insertOne(newUsuario);
      newUsuario._id = usuario.insertedId;
    } catch (error) {
      errorHandler(error);
    }
    return newUsuario;
  },
  // Editar un usuario por medio de ID
  editUsuario: async (root, { _id, input }) => {
    let db;
    let usuario;
    try {
      db = await connectDb();
      await db
        .collection("usuarios")
        .updateOne({ _id: ObjectId(_id) }, { $set: input });
      usuario = await db.collection("usuarios").findOne({ _id: ObjectId(_id) });
    } catch (error) {
      errorHandler(error);
    }
    return usuario;
  },
  //Elimina un usuario por ID
  deleteUsuario: async (root, { _id }) => {
    let db;

    try {
      db = await connectDb();
      await db.collection("usuarios").deleteOne({
        _id: ObjectId(_id),
      });
    } catch (error) {
      console.error(error);
    }
    return true;
  },
};
