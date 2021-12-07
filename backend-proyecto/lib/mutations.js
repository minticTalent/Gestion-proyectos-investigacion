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
      if (
        usuario.rol == "estudiante" &&
        input.documento !== String(usuario.identificacion)
      ) {
        validar = true;
      }
      console.log(validar);
      if (!proyecto || validar == false)
        throw new Error(
          "El proyecto o estudiante no existe, o ya te encuentras registrado"
        );
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
};
