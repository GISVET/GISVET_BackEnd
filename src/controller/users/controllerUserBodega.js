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
                                TYPE_PRODUCT: true,
                                brands: {
                                    select:{
                                        NAME_BRAND: true
                                    }
                                }
                            }
                        },
                        feature_products: true
                    }
                }
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
    for (let i = 0; i < data.length; i++) {
        const object= {
            PRESENTATION: data[i].PRESENTATION,
            QUANTITY: data[i].QUANTITY,
            PRODUCT_NAME: data[i].products.PRODUCT_NAME,
            MEASUREMENT_UNITS: data[i].products.MEASUREMENT_UNITS,
            TYPE_PRODUCT: data[i].products.TYPE_PRODUCT,
            NAME_BRAND: data[i].products.brands.NAME_BRAND,
            EXPIRATION_DATE: data[i].feature_products.EXPIRATION_DATE,
            QUANTITY_PER_UNIT: data[i].feature_products.QUANTITY_PER_UNIT,
            PRICE_PER_UNIT: data[i].feature_products.PRICE_PER_UNIT,
            INVIMA: data[i].feature_products.INVIMA,
            MANUFACTURING_DATE: data[i].feature_products.MANUFACTURING_DATE
        }
        json[i]= object
    }
    return json
}

module.exports = {
    getProductBodega
}

// prueba