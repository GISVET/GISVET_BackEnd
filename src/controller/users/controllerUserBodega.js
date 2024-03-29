const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')
const {createAudit} = require('../auditor')

const createItem = async (req, res) =>{
    try {
        const nameBrand = req.body.name_brand
        const productName = req.body.product_name.charAt(0).toUpperCase() + req.body.product_name.slice(1)
        
        const searchProduct = await prisma.products.findMany({
            where: {
                PRODUCT_NAME: productName
            }
        })

        const searchBrand = await prisma.brands.findUnique({
            where:{
                NAME_BRAND: nameBrand
            }
        })

        if(searchProduct[0] === undefined){
            if(searchBrand != null){

                addProduct(res, req, searchBrand)
                res.send({
                    message: "Item creado con éxito"
                });            
            }else{
                const brand = await prisma.brands.create({
                    data:{
                        NAME_BRAND: nameBrand
                    }
                })           

                addProduct(res, req, searchBrand)
                res.send({
                    message: "Item creado con éxito"
                });
            }        
            
        }else{
            res.status(400).send({
                message: "El producto ingresado ya existe"
            }) 
        }  
        
    } catch (error) {
        res.send({
            message: "Ocurrió un error al momento de crear el item"
        });
        console.log(error)
    }
}

const sendProducts = async (req, res) =>{
    try {
        const dependencia = req.body.name_dependecie
        const tokenTem = req.body.token_tem
        const data = await prisma.persons.findUnique({
            where:{
                DOCUMENT: req.body.document
            },
            include:{
                accounts: true
            }
        })
        if(data !== null){
            if(data.accounts[0].TEM_TOKEN !== ""){
                jwt.verify(data.accounts[0].TEM_TOKEN , data.DOCUMENT, (error, token) => {
                    if(error){
                        res.status(400).send({
                            message: "El token ya expiro"
                        })
                    }else{
                        if(parseJwt(data.accounts[0].TEM_TOKEN).object[0].token === tokenTem){
                            veifyDependencie(dependencia).then(
                                veri =>{
                                    if(veri){
                                        sendProductsBodega(req, res)
                                    }else{
                                        res.status(400).send({
                                            message: "El nombre de la dependecia no es valido"
                                        })
                                    }
                                }
                            )
                        }else{
                            res.status(400).send({
                                message: "El token no es valido"
                            })
                        } 
                    }
                })
            }else{
                res.status(400).send({
                    message: "El usuario no tienen token"
                })
            }
        }else{
            res.status(400).send({
                message: "El usuario no se encuentra registrado"
            })
        }
    } catch(error) {
        res.status(400).send({
            message: "Ocurrió un error al momento de realizar la validación del token"
        })
        console.log(error)
    }
}

async function veifyDependencie(name){
    const dependencie = await prisma.dependencies.findMany({
        where:{
            TYPE_DEPENDENCIE: "F",
            DEPENDENCIE_NAME: name
        }
    })
    if(dependencie[0] === undefined){
        return false
    }
    return true
}

function parseJwt (token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

const sendProductsBodega = async (req, res) =>{
    try {   
        const products = req.body.products
        for (let i = 0; i < products.length; i++) {
            const item = await prisma.item.findUnique({
                where:{
                    ID_ITEM: products[i].id_item
                },
                include:{
                    feature_products: true 
                }
            })
            const dependencie = await prisma.dependencies.findMany({
                where:{
                    TYPE_DEPENDENCIE: "F",
                    DEPENDENCIE_NAME: req.body.name_dependecie
                }
            })
            
            const product = await prisma.product_brand.findUnique({
                where:{
                    ID_PRODUCT_BRAND: item.ID_PRODUCT_BRAND
                },
                include:{
                    products: {
                        select:{
                            MEASUREMENT_UNITS:true
                        }
                    }
                }
                
            })
            const item_new = await prisma.item.findMany({
                where:{
                    PRESENTATION: product.products.MEASUREMENT_UNITS,
                    ID_DEPENDENCIE: dependencie[0].ID_DEPENDENCIE,
                    ID_FEATURE: item.ID_FEATURE,
                    ID_PRODUCT_BRAND: item.ID_PRODUCT_BRAND
                }
            })
            await prisma.item.update({
                where:{
                    ID_ITEM: products[i].id_item
                },
                data:{
                    QUANTITY: (item.QUANTITY - products[i].quantity)
                }
            })
            if(item_new[0] === undefined){
                await prisma.item.create({
                    data:{
                        PRESENTATION: product.products.MEASUREMENT_UNITS,
                        QUANTITY: products[i].quantity* item.feature_products.QUANTITY_PER_UNIT,
                        ID_DEPENDENCIE: dependencie[0].ID_DEPENDENCIE,
                        ID_FEATURE: item.ID_FEATURE,
                        ID_PRODUCT_BRAND: item.ID_PRODUCT_BRAND
                    }
                })
            }else{
                await prisma.item.update({
                    where:{
                        ID_ITEM: item_new[0].ID_ITEM
                    },
                    data:{
                        QUANTITY: item_new[0].QUANTITY + (products[i].quantity* item.feature_products.QUANTITY_PER_UNIT)
                    }
                })
            }
        }
        createAudit(req, res, "Se enviaron productos de bodega a farmcia")
        res.send({
            message: "Se registraron los productos en en farmacia con exito"
        })
    } catch (error) {
        res.status(400).send({
            message: "Ocurrió un error al momento de realizar el pedido"
        })
        console.log(error)
    }
}



const addProduct = async (res, req, brand) =>{
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
            IUP: req.body.iup,
            STATE: "AC"
        }
    })

    const productBrand = await prisma.product_brand.create({
        data:{
            ID_BRAND: brand.ID_BRAND,
            ID_PRODUCT: product.ID_PRODUCT,
        }       
    })

    const item = await prisma.item.create({
        data:{
            PRESENTATION: req.body.presentation,
            QUANTITY: req.body.quantity,                        
            ID_PRODUCT_BRAND: productBrand.ID_PRODUCT_BRAND,
            ID_FEATURE: feature.ID_FEATURE,
            ID_DEPENDENCIE: req.body.id_dependencie
        }
    })
    createAudit(req, res, "Se creo el item con el id "+item.ID_ITEM)
}

module.exports = {
    createItem,
    sendProducts
}