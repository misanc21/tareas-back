const Proyecto =  require('../models/Proyecto')
const { validationResult } = require('express-validator')

exports.crearProyecto = async (req, res) =>{
    
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errores: errors.array()
        })
    }

    try {
        const proyecto = new Proyecto(req.body)

        proyecto.creador = req.usuario
        proyecto.save()
        res.json(proyecto)
    } catch (error) {
        res.status(500).send('hubo un error')
    }
} 