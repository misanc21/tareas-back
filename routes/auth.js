const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const { check } = require('express-validator')

router.post('/', [
    check('email', 'Agrega un email valido'),
    check('password', 'El password debe de ser minimo de 6 caracteres')
], authController.autenticarUsuario)

module.exports = router