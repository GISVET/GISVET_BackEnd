const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

const createFeatureProducts = async (req, res) =>{
    try {
        await prisma.feature_products.create({
            data:{
                EXPIRATION_DATE : req.body.expiration_date,
                QUANTITY_PER_UNIT: req.body.quantity_per_unit,
                PRICE_PER_UNIT: req.body.price_per_unit,
                INVIMA: req.body.invima,
                MANUFACTURING_DATE: req.body.manufacturing_date
            }
        })
        res.send({
            message: "Característica creada con exito"
        });
    } catch (error) {
        if(error.code === undefined){
            res.send({
                message: "Ocurrio un error al momento de crear la caracteristica"
            });
        }else{
            res.send({
                message: "Ocurrio el error "+error.code+ " al momento de crear la característica"
            });  
        }
        console.log(error)
    }
}

const getFeatureProduct = async (req, res) =>{
    try {
        const data = await prisma.feature_products.findMany()
        res.json(data)
    } catch (error) {
        res.send({
            message: "Ocurrió un error al momento obtener las características del producto"
        })
        console.log(error)
    }
}

const updateFeatureProduct = async (req, res) =>{
    try {
        await prisma.feature_products.update({
            where:{
                ID_FEATURE: req.body.id_feature
            },
            data:{
                EXPIRATION_DATE : req.body.expiration_date,
                QUANTITY_PER_UNIT: req.body.quantity_per_unit,
                PRICE_PER_UNIT: req.body.price_per_unit,
                INVIMA: req.body.invima,
                MANUFACTURING_DATE: req.body.manufacturing_date
            }
        })
        res.send({
            message: "La característica se actualizo con exito"
        })
    } catch (error) {
        res.send({
            message: "Ocurrió un error al momento de actualizar las características del producto"
        })
        console.log(error)
    }
}

module.exports = {
    createFeatureProducts,
    getFeatureProduct,
    updateFeatureProduct
}