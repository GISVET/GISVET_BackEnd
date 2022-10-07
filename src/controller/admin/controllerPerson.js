const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

const createPersons = async (req, res) =>{
    try {
        await prisma.persons.create({
            data:{
                FULL_NAME: req.body.full_name,
                DOCUMENT_TYPE: req.body.document_type,
                DOCUMENT: req.body.document,
                GENDER: req.body.gender,
                PROFESSIONAL_ID: req.body.professional_id,
                ID_DEPARTMENT: req.body.id_department
            }
        })
        res.send({
            message: "Persona creada con exito"
        });
    } catch (error) {
        console.log(error)
    }
}

const getPersons = async (req, res) =>{
    const data = await prisma.persons.findMany()
    res.json(data) 
}

const getIdPersons = async (req, res) =>{
    
}

const getRolPersons = async (req, res) =>{
    
}

const updatePersons = async (req, res) =>{
    
}

const deletePersons = async (req, res) =>{
    
}

const createRole = async (req, res) =>{
    try {
        await prisma.roles.create({
            data:{
                NAME: req.body.NAME,
                DESCRIPTION: req.body.DESCRIPTION
            }
        })
        res.send({
            message: "Rol creado con éxito"
        });
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    createPersons,
    createRole,
    getPersons,
    getIdPersons,
    getRolPersons,
    updatePersons,
    deletePersons
}