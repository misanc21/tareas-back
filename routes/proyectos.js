const express = require('express')
const router  = express.Router()
const proyectosController = require('../controllers/proyectosController')
const auth = require('../middleware/auth')
const { check } = require('express-validator')


router.post('/',
    auth,
    [
        check('nombre', 'nombre de proyecto es obligatorio').not().isEmpty()
    ],
    proyectosController.crearProyecto)

module.exports = router