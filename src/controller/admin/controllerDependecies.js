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

const getDependencies = async (req, res) =>{
    const data = await prisma.dependencies .findMany()
    if (data[0] === undefined){
        res.status(400).send({
            message: "No se encontraron dependencias registradas"
        })
    }else if(data === null){
        res.status(400).send({
            message: "La dependencia no existe"
        })
    }else{
        res.json(data)
    }    
}


module.exports = {
    createDependencie,
    getDependencies
}