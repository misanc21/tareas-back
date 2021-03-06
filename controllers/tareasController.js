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
        const {proyecto} = req.query
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

exports.updateTarea = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errores: errors.array()
        })
    }

    try {
        const {proyecto, nombre, estado} = req.body
        let tarea = await Tarea.findById(req.params.id)

        if(!tarea){
            return res.status(401).json('No existe la tarea')
        }

        const existsProyecto = await Proyecto.findById(proyecto)
        if(existsProyecto.creador.toString() !== req.usuario){
            return res.status(401).json('No autorizado')
        }

        const nuevaTarea = {
            nombre : nombre,
            estado : estado
        }
        
        tarea = await Tarea.findOneAndUpdate({_id: req.params.id}, nuevaTarea, {new: true})
        res.json({tarea})


    } catch (error) {
        console.log(error)
        res.status(500).send('hubo un error')
    }
}

exports.deleteTarea = async (req, res) => {
    try {
        const {proyecto} = req.query

        let tarea = await Tarea.findById(req.params.id)
        if(!tarea) {
            return res.status(404).json('tarea no encontrada')
        }

        const existsProyecto = await Proyecto.findById(proyecto);
        if(existsProyecto.creador.toString() !== req.usuario){
            return res.status(401).json('No autorizado')
        }

        await Tarea.findOneAndRemove({_id: req.params.id})
        res.json('tarea eliminada')
    } catch (error) {
        console.log(error)
        res.status(500).send('hubo un error')
    }
}