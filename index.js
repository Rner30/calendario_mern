const express = require("express");
const { dbConnection } = require("./database/config");
const cors = require('cors')
require('dotenv').config()
//crear el server de express

const app = express();

//base de datos
dbConnection()

app.use(cors())

//directorio publico
app.use(express.static('public'))

//lectura y parseo de body
app.use(express.json())


app.use('/api/auth',require('./routes/auth'))

app.use('/api/events',require('./routes/events'))
//escuchar peticiones

app.listen(process.env.PORT, () => {
	console.log("servidor corriendo");
});
