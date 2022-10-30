const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

const createDependencie = async (req, res) =>{
    try {
        await prisma.dependencies.create({
            data:{
                DEPENDENCIE_NAME: req.body.dependencie_name,
                TYPE_DEPENDENCIE: req.body.type_dependencie
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
    const data = await prisma.dependencies .findMany({
        where:{
            DEPENDENCIE_NAME:{
                contains: req.body.dependencie_name
            },
            TYPE_DEPENDENCIE:{
                contains: req.body.type_dependencie
            }
        },
        orderBy:{
            DEPENDENCIE_NAME: req.body.order_name
        }
    })
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

const getIdDependencies = async (req, res) =>{
    const data = await prisma.dependencies.findUnique({
        where:{
            ID_DEPENDENCIE: req.body.id_dependencie
        },
        include:{
            person_dependencies:{
                include:{
                    persons: true
                }
            }
        }
    })
    if(data === null){
        res.status(400).send({
            message: "La dependencia no existe"
        })
    }else{
        res.json(data)
    }    
}


const updateDependecie = async (req, res) =>{
    try {
        await prisma.dependencies.update({
            where: {
                ID_DEPENDENCIE: req.body.id_dependencie
            },
            data: {
                DEPENDENCIE_NAME: req.body.dependencie_name,
                TYPE_DEPENDENCIE: req.body.type_dependencie
            }
        })
        res.send({
            message: "Dependencia actualizada con exito."
        });
    } catch (error) {
        console.log(error)
        res.send({
            message: "Ocurrió un error al momento de modificar la dependecia"
        });
    }
}

module.exports = {
    createDependencie,
    getDependencies,
    getIdDependencies,
    updateDependecie
}