const Usuario = require ('../models/Usuario')
const bcryptjs = require('bcryptjs')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')

exports.crearUsuario = async (req, res) => {
    //validacion por express validator
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errores: errors.array()
        })
    }


    const { email, password }  = req.body;
    
    try {
        //validacion de correo existente por express
        let usuario = await Usuario.findOne({email})
        if (usuario) {
            return res.status(400).json({
                msg: 'el correo ya esta registrado'
            })
        }


        //generacion del modelo y creacion
        usuario = new Usuario(req.body)
        
        const salt = await bcryptjs.genSalt(10)
        usuario.password = await bcryptjs.hash(password, salt)
        
        await usuario.save()



        const payload = {
            id: usuario.id
        }

        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600
        }, (error, token) => {
            if(error) throw error;
            
            res.json({
                token
            })
        })


    } catch (error) {
        console.log(error)
        res.status(400).send('Hubo un error')
    }
}