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

module.exports = {
    createPersons
}