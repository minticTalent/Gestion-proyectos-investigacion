'use strict' 
// Implementar los querys
const connectDb = require("./db");
const {ObjectId} = require("mongodb");
const errorHandler = require("./errorHandler")

module.exports = {
    getProyectos: async () =>{
        let db;
        let proyectos= [];
        try{
            db = await connectDb();
            proyectos = await db.collection("proyectos").find().toArray();
        }catch (error){
            errorHandler(error);
        }
        return proyectos;
    },
   getProyecto: async (root,{id}) => {
       let db
       let proyecto
       try{
           db = await connectDb()
           proyecto = await db.collection("proyectos").findOne({_id: ObjectId(id)})
       }catch (error){
           errorHandler(error);
       }
       return proyecto

   },
   getUsuarios: async () =>{
    let db;
    let usuarios= [];
    try{
        db = await connectDb();
        usuarios = await db.collection("usuarios").find().toArray();
    }catch (error){
        errorHandler(error);
    }
    return usuarios;
    },
    getUsuario: async (root,{id}) => {
    let db
    let usuarios
    try{
        db = await connectDb()
        proyecto = await db.collection("usuarios").findOne({_id: ObjectId(id)})
    }catch (error){
        errorHandler(error);
    }
    return usuarios;
    }

}