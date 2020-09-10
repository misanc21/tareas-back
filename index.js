const express = require('express');

//crear el servidor
const app = express();
//puerto de l app
const PORT = process.env.PORT || 4000;

//arrancar la app
app.listen(PORT, () => {
    console.log(`el servidor corre en elpuerto ${PORT}`)
})