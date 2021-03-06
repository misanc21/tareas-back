const Usuario = require('../models/Usuario')
const bcryptjs = require('bcryptjs')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')

exports.autenticarUsuario = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errores: errors.array()
        })
    }


    const { email, password } = req.body

    try {
        //validacion
        let usuario = await Usuario.findOne({ email })
        if(!usuario){
            return res.status(400).json({ msg: 'el usuario no existe'})
        }

        const passCorrecto = await bcryptjs.compare(password, usuario.password)
        if(!passCorrecto){
            return res.status(400).json({ msg: 'password incorrecto'})
        }

        //jwt
        const payload = {
            id: usuario.id
        }

        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600
        }, (error, token) => {
            if(error) throw error

            res.json({
                token
            })
        })
        
    } catch (error) {
        res.status(500).send('Hubo un error')
    }

}

exports.usuarioAutenticado = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario).select('-password')
        res.json({usuario})
    } catch (error) {
        console.log(error.response)
        res.status(500).json({msg:'Hubo un error'})
    }
}