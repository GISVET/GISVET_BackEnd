const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

const getProductBodega = async (req, res) =>{
    try {
        const data = await prisma.dependencies.findMany({
            where:{
                TYPE_DEPENDENCIE: "B",
                DEPENDENCIE_NAME: req.body.name_dependencie 
            },
            include:{
                item: {
                    include:{
                        products: true,                       
                        feature_products: true,
                        products:{
                            include:{
                                product_brand:{
                                    include:{
                                        brands:true                                        
                                    }
                                }
                            }
                        }
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
            // res.json(data) 
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
        const brands = []
        for (let j = 0; j < data[i].products.product_brand.length; j++) {
            brands[j] = data[i].products.product_brand[j].brands.NAME_BRAND
        }
        const object = {
            PRESENTATION: data[i].PRESENTATION,
            QUANTITY: data[i].QUANTITY,
            PRODUCT_NAME: data[i].products.PRODUCT_NAME,
            MEASUREMENT_UNITS: data[i].products.MEASUREMENT_UNITS,
            TYPE_PRODUCT: data[i].products.TYPE_PRODUCT,
            EXPIRATION_DATE: data[i].feature_products.EXPIRATION_DATE,
            QUANTITY_PER_UNIT: data[i].feature_products.QUANTITY_PER_UNIT,
            PRICE_PER_UNIT: data[i].feature_products.PRICE_PER_UNIT,
            INVIMA: data[i].feature_products.INVIMA,
            IUP: data[i].feature_products.ID_BOX,
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
    try {
        
        const searchProduct = await prisma.products.findMany({
            where: {
                PRODUCT_NAME: req.body.product_name.charAt(0).toUpperCase() +req.body.product_name.slice(1)
            }
        })

        const searchBrand = await prisma.brands.findUnique({
            where:{
                ID_BRAND: req.body.id_brand
            }
        })

        if(searchProduct == null){
            if(searchBrand != null){
                const product = await prisma.products.create({
                    data:{
                        PRODUCT_NAME: req.body.product_name.charAt(0).toUpperCase() +req.body.product_name.slice(1),
                        MEASUREMENT_UNITS: req.body.measurement_units,
                        TYPE_PRODUCT: req.body.type_product
                    }
                })
        
                const feature = await prisma.feature_products.create({            
                    data:{
                        EXPIRATION_DATE : new Date (req.body.expiration_date),
                        QUANTITY_PER_UNIT: req.body.quantity_per_unit,
                        PRICE_PER_UNIT: req.body.price_per_unit,
                        INVIMA: req.body.invima,
                        MANUFACTURING_DATE: new Date (req.body.manufacturing_date),
                        ID_BOX: req.body.id_box,
                        STATE: "AC"
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
            }else if(searchBrand === null){
                const brand = await prisma.brands.create({
                    data:{
                        NAME_BRAND: req.body.name_brand
                    }
                })
                await prisma.product_brand.create({
                    data:{
                        ID_BRAND: brand.ID_BRAND,
                        ID_PRODUCT: product.id_product,
                    }       
                })
                res.send({
                    message: "Item creado con éxito"
                });
            }        
            
        }else{
            res.status(400).send({
                message: "El producto registrado ya existe"
            }) 
        }  
        
    } catch (error) {
        res.send({
            message: "Ocurrió un error al momento de crear el item"
        });
        console.log(error)
    }
}



module.exports = {
    getProductBodega,
    createItem
}