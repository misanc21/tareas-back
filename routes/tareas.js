const express = require('express')
const router  = express.Router()
const tareasController = require('../controllers/tareasController')
const auth = require('../middleware/auth')
const { check } = require('express-validator')

router.post('/', 
    auth,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty()
    ],
    tareasController.crearTarea
)

router.get('/', 
    auth,
    tareasController.getTareas
)

router.put('/:id', 
    auth,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty()
    ],
    tareasController.updateTarea
)

module.exports = router