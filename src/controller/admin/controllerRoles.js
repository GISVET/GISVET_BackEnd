const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

const createRole = async (req, res) =>{
    try {
        await prisma.roles.create({
            data:{
                NAME: req.body.name,
                DESCRIPTION: req.body.description,
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
    const data = await prisma.roles.findUnique({
        where: {
            STATE_ROL: "A"
        }
    })
    res.json(data)
}

const getIdRoles = async(req,res) =>{
    const data = await prisma.roles.findMany({
        where: {
            NAME: req.body.NAME
        }
    })
    res.json(data)
}

const updateRol = async (req, res) =>{
    await prisma.roles.update({
        where: {
            ID_ROL: req.body.ID_ROL
        },
        data: {
            NAME: req.body.name,
            DESCRIPTION: req.body.description
        }
    })
    res.send({
        message: "Rol actualizado con éxito."
    });
}

module.exports = {
    createRole,
    getRoles,
    getIdRoles,
    updateRol
}