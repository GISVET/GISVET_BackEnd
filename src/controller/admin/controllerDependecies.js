const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const {createAudit} = require("../auditor")

const createDependencie = async (req, res) =>{
    try {
        const depe = await prisma.dependencies.create({
            data:{
                DEPENDENCIE_NAME: req.body.dependencie_name,
                TYPE_DEPENDENCIE: req.body.type_dependencie
            }
        })
        createAudit(req, res, "Creó la dependecia con el id "+depe.ID_DEPENDENCIE)
        res.send({
            message: "Dependencia creada con exito"
        });
    } catch (error) {
        res.status(400).send({
            message: "Ocurrio un error al momento de crear una dependecia"
        })
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

const createDependencieUser = async (req, res) =>{
    try {
        const depe = await prisma.person_dependencies.create({
            data:{
                ID_PERSON : req.body.id_person,
                ID_DEPENDENCIE : req.body.id_dependencie,
                STATE : "AC",
                DATE_PERSON_DEPENDENCIES: new Date(new Date()-3600*1000*5).toISOString()
            }
        })
        createAudit(req, res, "Se asigno la dependecia "+depe.ID_DEPENDENCIE+" al usuario " + depe.ID_PERSON)
        res.send({
            message: "Dependiencia asignada correctamente"
        });
    } catch (error) {
        res.status(400).send({
            message: "Ocurrio un error al momento de asignar una dependecia"
        });
        console.log(error)
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
        const depe = await prisma.dependencies.update({
            where: {
                ID_DEPENDENCIE: req.body.id_dependencie
            },
            data: {
                DEPENDENCIE_NAME: req.body.dependencie_name,
                TYPE_DEPENDENCIE: req.body.type_dependencie
            }
        })
        createAudit(req, res, "Se actualizó la dependecia con el id "+depe.ID_DEPENDENCIE)
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
    updateDependecie,
    createDependencieUser
}