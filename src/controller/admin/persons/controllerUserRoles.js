const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const {createAudit} = require("../../auditor")

const createUserRoles = async (req, res) =>{
    try {
        const usrol = await prisma.user_roles.create({
            data:{
                ID_ROL : req.body.id_rol,
                ID_PERSON : req.body.id_person,
                STATE : "AC"
            }
        })
        createAudit(req, res, "Creó el rol de usuario con el id "+ usrol.ID_ROL + " " + usrol.ID_PERSON)
        res.send({
            message: "Roles asignado con exito"
        });
    } catch (error) {
        console.log(error)
    }
}

const getUserRoles = async (req, res) =>{
    const data = await prisma.user_roles.findMany({
        where : {
            STATE: "AC"
        }
    })
    res.json(data) 
}

const getIdUserRoles = async (req, res) =>{
    const data = await prisma.user_roles.findUnique({
        where:{
            ID_ROL: req.body.id_rol,
            ID_PERSON : req.body.id_person
        }
    })
    res.json(data)
}


const updateUserRoles = async (req, res) =>{
    const updateUsRol = await prisma.user_roles.update({
        where: {
            ID_ROL : req.body.id_rol,
            ID_PERSON: req.body.id_person
        },
        data: {
            STATE : req.body.state
        }
    })
    createAudit(req, res, "Creó el rol de usuario con el id "+ updateUsRol.ID_ROL + " " + updateUsRol.ID_PERSON)
    res.send({
        message: "El rol de usuario ha sido actualizado con éxito."
    });
}

const deleteUserRoles = async (req, res) =>{
    const deleteUsRol = await prisma.persons.update({
        where: {
            ID_ROL : req.body.id_rol,
            ID_PERSON: req.body.id_person
        },
        data:{
            STATE: "IC",
        }
    })
    createAudit(req, res, "Se eliminó rol de usuario con el id "+ deleteUsRol.ID_ROL + " " + deleteUsRol.ID_PERSON)
    res.send({
        message: "El rol de usuario ha sido borrado con éxito."
    });
}


module.exports = {
    createUserRoles,
    getUserRoles,
    getIdUserRoles,
    updateUserRoles,
    deleteUserRoles
}