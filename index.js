const express = require('express');
const conectarDB = require('./config/db')

//crear el servidor
const app = express();

//conectar a la db
conectarDB()
//puerto de l app
const PORT = process.env.PORT || 4000;

//arrancar la app
app.listen(PORT, () => {
    console.log(`el servidor corre en elpuerto ${PORT}`)
})