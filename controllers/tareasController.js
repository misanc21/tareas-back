const Tarea = require('../models/Tarea')
const Proyecto =  require('../models/Proyecto')
const { validationResult } = require('express-validator')

exports.crearTarea = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errores: errors.array()
        })
    }
    const {proyecto} = req.body

    try {

        const existsProyecto = await Proyecto.findById(proyecto)
        if(!existsProyecto){
            return res.status(404).send('proyecto no encontrado')
        }

        if(existsProyecto.creador.toString() !== req.usuario){
            return res.status(401).json('No autorizado')
        }

        const tarea = new Tarea(req.body)
        await tarea.save()
        res.json({tarea})
    } catch (error) {
        res.status(500).send('hubo un error')
    }
}

exports.getTareas = async (req, res) => {
    try {
        const {proyecto} = req.body
        const existsProyecto = await Proyecto.findById(proyecto)
        if(!existsProyecto){
            return res.status(404).send('proyecto no encontrado')
        }

        if(existsProyecto.creador.toString() !== req.usuario){
            return res.status(401).json('No autorizado')
        }

        const tareas = await Tarea.find({ proyecto })
        res.json(tareas)
    } catch (error) {
        res.status(500).send('hubo un error')
    }
}