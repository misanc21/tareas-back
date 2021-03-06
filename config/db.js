const mongoose = require ('mongoose')
require('dotenv').config({path: 'variables.env'})

const conectarDB = async () => {
    try{
        await mongoose.connect(process.env.DB_MONGO, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        console.log('db conectada alv')

    }catch(error){
        console.log('no se conecto')
        process.exit(1)
    }
}

module.exports = conectarDB