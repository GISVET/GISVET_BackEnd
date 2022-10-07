const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

const createRole = async (req, res) =>{
    try {
        await prisma.roles.create({
            data:{
                ID_ROL: req.body.id_rol,
                NAME_ROL: req.body.name_rol,
                DESCRIPTION_ROL: req.body.description_rol,
                STATE_ROL: "A",
            }
        })
        res.send({
            message: "Rol creado con éxito"
        });
    } catch (error) {
        console.log(error)
    }
}


const getRoles = async(req,res) =>{
    const data = await prisma.roles.findMany({
        where: {
            STATE_ROL: "A"
        }
    })
    res.json(data)
}

const getIdRoles = async(req,res) =>{
    const data = await prisma.roles.findUnique({
        where: {
            ID_ROL: req.body.id_rol
        }
    })
    res.json(data)
}

const updateRol = async (req, res) =>{
    await prisma.roles.update({
        where: {
            ID_ROL: req.body.id_rol
        },
        data: {
            NAME_ROL: req.body.name_rol,
            DESCRIPTION_ROL: req.body.description_rol,
            STATE_ROL: req.body.state_rol
        }
    })
    res.send({
        message: "Rol actualizado con éxito."
    });
}

const deleteRoles = async (req, res) =>{
    await prisma.roles.update({
        where: {
            ID_ROL: req.body.id_rol
        },
        data:{
            STATE_ROL: "I"
        }
    })
    res.send({
        message: "El rol borrada con exito."
    });
}

module.exports = {
    createRole,
    getRoles,
    getIdRoles,
    updateRol, 
    deleteRoles
}