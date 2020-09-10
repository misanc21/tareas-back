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

router.get('/',
    auth,
    proyectosController.obtenerProyectos)

router.put('/:id',
    auth,
    [
        check('nombre', 'nombre de proyecto es obligatorio').not().isEmpty()
    ],
    proyectosController.updateProyecto)

router.delete('/:id',
    auth,
    proyectosController.deleteProyecto)

module.exports = router