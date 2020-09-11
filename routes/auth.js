const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const authController = require('../controllers/authController')
const { check } = require('express-validator')

router.post('/', [
    check('email', 'Agrega un email valido'),
    check('password', 'El password debe de ser minimo de 6 caracteres')
], authController.autenticarUsuario)


router.get('/',
    auth,
    authController.usuarioAutenticado)

module.exports = router