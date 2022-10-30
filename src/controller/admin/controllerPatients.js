const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

const createPatient = async (req, res) =>{
    
    try{
        await prisma.clinic_histories .create({
            data:{
                ID_CLINIC_HISTORY: req.body.id_clinic_history,
                NAME_PATIENT: req.body.name_patient.toUpperCase()
            }
        })
        res.send({
            message: "El paciente se ha registrado con éxito"
        });
    }catch (error) {
        if(error.code === undefined){
        res.send({
            message: "Ocurrio un error al momento de registrar al paciente"
        });
    }else{
        res.send({
            message: "Ocurrio el error "+ error.code+ " al momento de registrar al paciente"
        });  
    }
    console.log(error) 
    }    
}

const getPatient = async (req, res) =>{
    const data = await prisma.clinic_histories .findMany()
    if (data[0] === undefined){
        res.status(400).send({
            message: "No se encontró el paciente solicitado"
        })
    }else if(data === null){
        res.status(400).send({
            message: "El paciente no existe"
        })
    }else{
        res.json(data)
    }    
}

const getPatiensOrderAZ = async (req, res) =>{
    const data = await prisma.clinic_histories.findMany({        
        orderBy: {
            NAME_PATIENT: 'asc'
        }         
    })
    if (data[0] === undefined){
        res.status(400).send({
            message: "No se encontró el paciente solicitado"
        })
    }else if(data === null){
        res.status(400).send({
            message: "El paciente no existe"
        })
    }else{
        res.json(data)
    }  
}

const getPatiensOrderZA = async (req, res) =>{
    const data = await prisma.clinic_histories.findMany({        
        orderBy: {
            NAME_PATIENT: 'desc'
        }         
    })
    if (data[0] === undefined){
        res.status(400).send({
            message: "No se encontró el paciente solicitado"
        })
    }else if(data === null){
        res.status(400).send({
            message: "El paciente no existe"
        })
    }else{
        res.json(data)
    }  
}


const getSpecificPatient = async (req, res) =>{
    try{
        const data = await prisma.clinic_histories .findUnique({
            where: {
                ID_CLINIC_HISTORY: req.body.id_clinic_history,
                NAME_PATIENT : res.name_patient.sort()
            }
        })
        if(data === null){
            res.status(400).send({
                message: "El paciente no existe"
            })
        }else{
            res.json(data)
        }
    }catch(error){
        res.status(400).send({
            message: "Ocurrio el error "+ error.code+ " al momento de registrar al paciente"
        })
    }        
}

const getNamePatient = async (req, res) =>{    
    try{
        const data = await prisma.clinic_histories .findMany({
            where: {
                NAME_PATIENT: {
                    startsWith: req.body.name_patient
                }
            }
        })        
        if(data === null){
            res.status(400).send({
                message: "El paciente no existe"
            })
        }else {
            res.json(data)
        }
    }catch(error){
        res.status(400).send({
            message: "Ocurrio el error "+ error.code+ " al momento de registrar al paciente"
        })
    }        
}

const updatePatient = async (req, res) =>{ 
    try{
        await prisma.clinic_histories.update({
            where: {
                ID_CLINIC_HISTORY: req.body.id_clinic_history
            },
            data: {
                ID_CLINIC_HISTORY: req.body.id_clinic_history,
                NAME_PATIENT: req.body.name_patient
            }
        })
        res.send({
            message: "El paciente ha sido actualizado con éxito."
        });
    }catch (error) {
        console.log(error)
        res.status(400).send({
            message: "Ocurrio un error"
        })
    }       
}

module.exports = {
    createPatient,
    getPatient,
    getPatiensOrderAZ,
    getPatiensOrderZA,
    getSpecificPatient,
    getNamePatient,
    updatePatient
}