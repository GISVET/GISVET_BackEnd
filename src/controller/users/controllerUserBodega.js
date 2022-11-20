const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

const getProductBodega = async (req, res) =>{
    try {
        const data = await prisma.dependencies.findMany({
            where:{
                TYPE_DEPENDENCIE: "B",
                DEPENDENCIE_NAME: req.body.name_dependencie 
            },
            select:{
                item: {
                    select:{
                        PRESENTATION: true,
                        QUANTITY: true,
                        products:{
                            select:{
                                PRODUCT_NAME: true,
                                MEASUREMENT_UNITS: true,
                                TYPE_PRODUCT: true
                            }
                        },                        
                        feature_products: true,
                        products:{
                            select:{
                                product_brand:{
                                    select:{
                                        brands:{
                                            select:{
                                                NAME_BRAND: true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },

            }
        })
        if (data[0] === undefined){
            res.status(400).send({
                message: "No se encuentra la dependencia ingresada"
            })
        }else{
            res.json(formtJson(data[0].item)) 
        }
    } catch (error) {
        res.send({
            message: "Ocurrió un error al momento obtener los productos"
        })
        console.log(error)
    }
}


function formtJson(data){
    const json = []
    const brands = []
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].products.product_brand.length; j++) {
            brands[j] =data[i].products.product_brand[j].brands.NAME_BRAND
        }
        const object= {
            PRESENTATION: data[i].PRESENTATION,
            QUANTITY: data[i].QUANTITY,
            PRODUCT_NAME: data[i].products.PRODUCT_NAME,
            MEASUREMENT_UNITS: data[i].products.MEASUREMENT_UNITS,
            TYPE_PRODUCT: data[i].products.TYPE_PRODUCT,
            EXPIRATION_DATE: data[i].feature_products.EXPIRATION_DATE,
            QUANTITY_PER_UNIT: data[i].feature_products.QUANTITY_PER_UNIT,
            PRICE_PER_UNIT: data[i].feature_products.PRICE_PER_UNIT,
            INVIMA: data[i].feature_products.INVIMA,
            MANUFACTURING_DATE: data[i].feature_products.MANUFACTURING_DATE,           
            NAME_BRAND: brands,            
            DATE_EXPIRATION: calculateDate(data[i].feature_products.EXPIRATION_DATE)
            
        }
        json[i]= object
    }
    return json
}

function calculateDate(date){
    const diff = Math.trunc((new Date(date).getTime() - (new Date(new Date()-3600*1000*5).getTime()))/(1000*60*60*24))
    return diff > 0 ? diff + " días" :"Producto vencido"
}

const createItem = async (req, res) =>{
    try{
        const item = await prisma.item.create({
            data:{
                PRODUCT_NAME: req.body.product_name.charAt(0).toUpperCase() +req.body.product_name.slice(1),
                MEASUREMENT_UNITS: req.body.measurement_units,
                TYPE_PRODUCT: req.body.type_product
            }
        })
        await prisma.item.create({
            data:{
                PRESENTATION: req.body.presentation,
                QUANTITY: req.body.quantity,
                ID_PRODUCT: product.ID_PRODUCT,
                ID_FEATURE: feature.ID_FEATURE,
                ID_DEPENDENCIE: req.body.id_dependencie
            }
        })
        res.send({
            message: "Item creado con éxito"
        });
    }catch(error){
        res.send({
            message: "Ocurrió un error al momento de crear el item"
        });
        console.log(error)
    }
}

module.exports = {
    getProductBodega
}