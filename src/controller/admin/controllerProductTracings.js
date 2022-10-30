const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

const createProductTracings = async (req, res) =>{     
    try{
        await prisma.product_tracings .create({
            data:{
                ID_PERSON : req.body.id_person,
                ID_ITEM : req.body.id_item,
                ID_CLINIC_HISTORY: req.body.id_clinic_history,
                QUANTITY_USED : req.body.quantity_used,
                UNIT_MEASUREMENT : req.body.unit_measurement,
                DESTINY_SERVICE : req.body.destiny_service,                
                DATE_PRODUCT_TRACING :  new Date(new Date()-3600*1000*5).toISOString()
            }
        })
        res.send({
            message: "Trazabilidad registrada del producto registrada con éxito"
        });
    }catch (error) {
        if(error.code === undefined){
        res.send({
            message: "Ocurrio un error al registrar la trazabilidad del producto"
        });
    }else{
        res.send({
            message: "Ocurrio el error "+ error.code+ " al resgistrar la trazabilidad del producto"
        });  
    }
    console.log(error) 
    }
}

const getItemTracingProduct = async (req, res) =>{
    try{
        const data = await prisma.product_tracings .findMany({
            where: {
                ID_ITEM : req.body.id_item
            }
        })
        if(data === null){
            res.status(400).send({
                message: "No existe trazabilidad del item ingresado"
            })
        }else{
            res.json(data)
        }
    }catch(error){
        res.status(400).send({
            message: "Ocurrio el error "+ error.code+ " al consultar la información"
        })
    }        
}

const getPersonProductTracing = async (req, res) =>{
    try{
        const data = await prisma.product_tracings .findMany({
            where: {
                ID_PERSON : req.body.id_person
            }
        })
        if(data === null){
            res.status(400).send({
                message: "No existe trazabilidad relacionada con el usuario ingresado"
            })
        }else{
            res.json(data)
        }
    }catch(error){
        res.status(400).send({
            message: "Ocurrio el error "+ error.code+ " al consultar la información"
        })
    }        
}

const getPacientProductTracing = async (req, res) =>{
    try{
        const data = await prisma.product_tracings .findMany({
            where: {
                ID_CLINIC_HISTORY : req.body.id_clinic_history
            }
        })
        if(data === null){
            res.status(400).send({
                message: "No existe trazabilidad relacionada con el paciente ingresado"
            })
        }else{
            res.json(data)
        }
    }catch(error){
        res.status(400).send({
            message: "Ocurrio el error "+ error.code+ " al consultar la información"
        })
    }        
}


module.exports = {
    createProductTracings,
    getItemTracingProduct,
    getPersonProductTracing,
    getPacientProductTracing
}