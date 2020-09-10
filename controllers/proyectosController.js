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

exports.obtenerProyectos = async (req, res) => {
    try {
        const proyectos = await Proyecto.find({ creador:req.usuario }).sort({ creado: -1})
        res.json(proyectos)
    } catch (error) {
        res.status(500).send('hubo un error')
    }
}

exports.updateProyecto = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errores: errors.array()
        })
    }

    const {nombre} = req.body
    const nuevoProyecto = {}

    if( nombre ) {
        nuevoProyecto.nombre = nombre
    }

    try {
        let proyecto = await Proyecto.findById(req.params.id);
        if (!proyecto){
            return res.status(404).json('proyecto no encontrado')
        }

        if(proyecto.creador.toString() !== req.usuario){
            return res.status(401).json('No autorizado')
        }

        proyecto = await Proyecto.findByIdAndUpdate({ _id:req.params.id}, {$set: nuevoProyecto},{new: true})
        res.json({proyecto})

    } catch (error) {
        res.status(500).send('hubo un error')
    }
}

exports.deleteProyecto =  async (req, res) => {
    try {
        let proyecto = await Proyecto.findById(req.params.id);
        if (!proyecto){
            return res.status(404).json('proyecto no encontrado')
        }

        if(proyecto.creador.toString() !== req.usuario){
            return res.status(401).json('No autorizado')
        }

        await Proyecto.findByIdAndDelete({ _id:req.params.id})
        res.json({msg:'proyecto eliminado correctamente'})

    } catch (error) {
        res.status(500).send('hubo un error')
    }
}