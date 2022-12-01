const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const {createAudit} = require("../../auditor")

const createFeatureProducts = async (req, res) =>{
    try {
        const info = await prisma.feature_products.create({
            data:{
                EXPIRATION_DATE : new Date (req.body.expiration_date),
                QUANTITY_PER_UNIT: req.body.quantity_per_unit,
                PRICE_PER_UNIT: req.body.price_per_unit,
                INVIMA: req.body.invima,
                MANUFACTURING_DATE: new Date (req.body.manufacturing_date)
            }
        })
        createAudit(req, res, "Creó la característica con el id "+ info.ID_FEATURE)
        res.json(info)        
    } catch (error) {
        if(error.code === undefined){
            res.send({
                message: "Ocurrió un error al momento de crear la característica"
            });
        }else{
            res.send({
                message: "Ocurrió el error "+error.code+ " al momento de crear la característica"
            });  
        }
        console.log(error)
    }
}

const getFeatureProducts = async (req, res) =>{
    const data = await prisma.feature_products.findMany({
        where:{
            EXPIRATION_DATE : req.body.expiration_date,
            QUANTITY_PER_UNIT: req.body.quantity_per_unit,
            PRICE_PER_UNIT: req.body.price_per_unit,
            INVIMA: req.body.invima
        },
        orderBy:{
            INVIMA: req.body.order
        }
    })
    if (data[0] === undefined){
        res.status(400).send({
            message: "No se encontraron características del producto"
        })
    }else if(data === null){
        res.status(400).send({
            message: "Las características del producto no existen"
        })
    }else{
        res.json(data)
    }    
}

const updateFeatureProduct = async (req, res) =>{
    try {
        const updateFePro = await prisma.feature_products.update({
            where:{
                ID_FEATURE: req.body.id_feature
            },
            data:{
                EXPIRATION_DATE : new Date (req.body.expiration_date),
                QUANTITY_PER_UNIT: req.body.quantity_per_unit,
                PRICE_PER_UNIT: req.body.price_per_unit,
                INVIMA: req.body.invima,
                MANUFACTURING_DATE: new Date (req.body.manufacturing_date)
            }
        })
        createAudit(req, res, "Se actualizó la característica con el id "+ updateFePro.ID_FEATURE)
        res.send({
            message: "La característica se actualizó con éxito"
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
    getFeatureProducts,
    updateFeatureProduct
}