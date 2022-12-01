const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

const createAudit = async(req, res, message) =>{
    try {
        let token = req.headers['x-access-token'] || req.headers['authorization']
        const aux = token.split(" ")
        token = aux[1]
        const email = parseJwt(token).object[0].EMAIL
        await prisma.history_user.create({
            data:{
                DESCRIPTION_HISTORY_USER:"El usuario: "+email+" realizo la siguiente operación: "+ message
            }
        })
    } catch (error) {
        res.status(400).send({
            message: "Ocurrió un error al momento de almacenar la incidencia"
        })
        console.log(error)
    }
}

const getAudit = async(req, res) =>{
    try {
        const audi = await prisma.history_user.findMany()
        res.json(audi)
    } catch (error) {
        res.status(400).send({
            message: "Ocurrió un error al momento obtener las auditorias"
        })
        console.log(error)
    }
}


function parseJwt (token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

module.exports = {
    createAudit,
    getAudit
}