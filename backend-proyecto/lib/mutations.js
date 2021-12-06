"use strict";
// Implementar las mutaciones
const connectDb = require("./db");
const { ObjectId } = require("mongodb");
const errorHandler = require("./errorHandler");

module.exports = {
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
};
