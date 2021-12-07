"use strict";
const connectDb = require("./db");
const { ObjectId } = require("mongodb");
const errorHandler = require("./errorHandler");
const { GraphQLScalarType } = require("graphql");
module.exports = {
  Proyecto: {
    __resolverType: (item, context, info) => {
      const dateScalar = new GraphQLScalarType({
        name: "Date",
        parseValue(value) {
          return new Date(value);
        },
        serialize(value) {
          return value.toISOString();
        },
      });
    },
    lideres: async ({ lideres }) => {
      let lideresData;
      try {
        lideresData = lideres ? lideres.map((lideres) => lideres) : [];
      } catch (error) {
        errorHandler(error);
      }
      return lideresData;
    },
    inscripciones: async ({ inscripciones }) => {
      let inscripcionesData;
      try {
        inscripcionesData = inscripciones
          ? inscripciones.map((inscripciones) => inscripciones)
          : [];
      } catch (error) {
        errorHandler(error);
      }
      return inscripcionesData;
    },
    avances: async ({ avances }) => {
      let avancesData;
      try {
        avancesData = avances ? avances.map((avances) => avances) : [];
      } catch (error) {
        errorHandler(error);
      }
      return avancesData;
    },
  },
};
