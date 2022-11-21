const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')

const getProductConsultorio = async (req, res) =>{
    try {
        const data = await prisma.dependencies.findMany({
            where:{
                TYPE_DEPENDENCIE: "C",
                DEPENDENCIE_NAME: req.body.name_consultorio 
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

const generateToken = async (req, res) =>{
    try {
        const data = await prisma.persons.findUnique({
            where:{
                DOCUMENT: req.body.document
            }
        })
        console.log()
        // const object = [
        //     {
        //         TOKEN: 
        //     }
        // ]
        // jwt.sign({object},object[0].NAME_ROL,(error,token)=>{
        //     res.json({
        //         token: token
        //     })
        // })
        res.json(data)
    } catch (error) {
        res.send({
            message: "Ocurrió un error al momento de generar el token"
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

module.exports = {
    getProductConsultorio,
    generateToken
}