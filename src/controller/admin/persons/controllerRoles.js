const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

const createRole = async (req, res) =>{
    await prisma.roles.create({
        data:{
            NAME_ROL: req.body.name_rol.charAt(0).toUpperCase()  + req.body.name_rol.slice(1),
            DESCRIPTION_ROL: req.body.description_rol,
            STATE_ROL: "AC",
        }
    })
    res.send({
        message: "Rol creado con éxito"
    });
}


const getRoles = async(req,res) =>{
    const data = await prisma.roles.findMany({
        where: {
            STATE_ROL: "AC"
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
            NAME_ROL: req.body.name_rol.charAt(0).toUpperCase()  + req.body.name_rol.slice(1),
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
            STATE_ROL: "IC"
        }
    })
    res.send({
        message: "El rol borrada con éxito."
    });
}

module.exports = {
    createRole,
    getRoles,
    getIdRoles,
    updateRol, 
    deleteRoles
}