const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

const createPersons = async (req, res) =>{
    try {
        await prisma.persons.create({
            data:{
                FULL_NAME: req.body.full_name,
                DOCUMENT_TYPE: req.body.document_type,
                DOCUMENT: req.body.document,
                STATE: "A",
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
    const data = await prisma.persons.findMany({
        where : {
            STATE: "A"
        },
        include:{
            dependencies: true,
            user_roles: true 
        }
    })
    res.json(data) 
}

const getPersonsOrderAZ = async (req, res) =>{
    const data = await prisma.persons.findMany({
        where : {
            STATE: "A"
        },
        orderBy: {
            FULL_NAME: 'asc'
        }         
    })
    res.json(data) 
}

const getPersonsOrderZA = async (req, res) =>{
    const data = await prisma.persons.findMany({
        where : {
            STATE: "A"
        },
        orderBy: {
            FULL_NAME: 'desc'
        }         
    })
    res.json(data) 
}

const getIdPersons = async (req, res) =>{
    const data = await prisma.persons.findUnique({
        where:{
            ID_PERSON: req.body.id_person
        }
    })
    res.json(data)
}


const updatePersons = async (req, res) =>{
    await prisma.persons.update({
        where: {
            ID_PERSON: req.body.id_person
        },
        data: {
            FULL_NAME: req.body.full_name,
            DOCUMENT_TYPE: req.body.document_type,
            DOCUMENT: req.body.document,
            GENDER: req.body.gender,
            PROFESSIONAL_ID: req.body.professional_id,
            ID_DEPARTMENT: req.body.id_department
        }
    })
    res.send({
        message: "Persona actualizada con exito."
    });
}

const deletePersons = async (req, res) =>{
    await prisma.persons.update({
        where: {
            ID_PERSON: req.body.id_person
        },
        data:{
            STATE: "D",
        }
    })
    res.send({
        message: "Persona borrada con exito."
    });
}

module.exports = {
    createPersons,
    getPersons,
    getIdPersons,
    updatePersons,
    deletePersons,
    getPersonsOrderAZ,
    getPersonsOrderZA
}