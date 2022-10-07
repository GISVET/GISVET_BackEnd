const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

const createRole = async (req, res) =>{
    try {
        await prisma.roles.create({
            data:{
                NAME: req.body.name,
                DESCRIPTION: req.body.description
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
            ID_ROL: req.body.id_rol
        }

    })
}

module.exports = {
    createRole,
    getRoles
}