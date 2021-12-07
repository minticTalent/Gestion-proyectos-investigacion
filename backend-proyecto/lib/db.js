'use strict' 
const {MongoClient} = require('mongodb')
// Crear el archivo .env con las variables de entorno asi :
// DB_USER= juanespp
// DB_PASSWD= 12345
// DB_HOST= cluster0
// DB_NAME= MinticTalent
const{
    DB_USER,
    DB_PASSWD,
    DB_HOST,
    DB_NAME
} = process.env 

// Conexion a la base de datos ya con mongodb atlas funcionando
const mongoUrl= `mongodb+srv://${DB_USER}:${DB_PASSWD}@${DB_HOST}.jtko1.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
let connection 

//mongodb+srv://juanespp:<password>@cluster0.jtko1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
async function connectDB(){
    if(connection) return connection 

    let client
    try{
        client = await MongoClient.connect(mongoUrl, {
            useNewUrlParser: true
        })
        connection = client.db(DB_NAME)
    }catch (error){
        console.error('Could not connect to db', mongoUrl, error)
        process.exit(1)
    }
    return connection
}
module.exports = connectDB    