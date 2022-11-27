const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

const sendProducts = async (req, res) =>{
    try {
        const data = await prisma.persons.findUnique({
            where:{
                DOCUMENT: req.body.document
            }
        })
        if(data !== null){
            res.send({
                message: "Se verifico el pedido"
            })
        }else{
            res.status(400).send({
                message: "El usuario no se encuentra registrado"
            })
        }
        console.log(data)
        
    } catch(error) {
        res.send({
            message: "Ocurrió un error al momento de realizar el pedido"
        })
        console.log(error)
    }
}


module.exports = {
    sendProducts
}