const express = require('express')
const router  = express.Router()
const proyectosController = require('../controllers/proyectosController')

router.post('/', proyectosController.crearProyecto)

module.exports = router