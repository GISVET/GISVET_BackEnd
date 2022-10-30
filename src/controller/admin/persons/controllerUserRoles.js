const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

const createUserRoles = async (req, res) =>{
    try {
        await prisma.user_roles.create({
            data:{
                ID_ROL : req.body.id_rol,
                ID_PERSON : req.body.id_person,
                STATE : "AC"
            }
        })
        res.send({
            message: "Roles de usuario ha creada con éxito"
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
    await prisma.user_roles.update({
        where: {
            ID_ROL : req.body.id_rol,
            ID_PERSON: req.body.id_person
        },
        data: {
            STATE : req.body.state
        }
    })
    res.send({
        message: "El rol de usuario ha sido actualizado con éxito."
    });
}

const deleteUserRoles = async (req, res) =>{
    await prisma.persons.update({
        where: {
            ID_ROL : req.body.id_rol,
            ID_PERSON: req.body.id_person
        },
        data:{
            STATE: "IC",
        }
    })
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