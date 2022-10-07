const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

const createDependencie = async (req, res) =>{
    try {
        await prisma.dependencies.create({
            data:{
                DEPARTMENT_NAME: req.body.department_name,
                TYPE_DEPARTMENT: req.body.type_deparment
            }
        })
        res.send({
            message: "Dependencia creada con exito"
        });
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createDependencie
}