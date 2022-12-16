const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const {createAudit} = require('../auditor')
const jwt = require('jsonwebtoken')

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
                                        sendProductsFarmacia(req, res)
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
            TYPE_DEPENDENCIE: "C",
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

const sendProductsFarmacia = async (req, res) =>{
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
                    TYPE_DEPENDENCIE: "C",
                    DEPENDENCIE_NAME: req.body.name_dependecie
                }
            })
            const item_new = await prisma.item.findMany({
                where:{
                    PRESENTATION: item.PRESENTATION,
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
                        PRESENTATION: item.PRESENTATION,
                        QUANTITY: products[i].quantity,
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
                        QUANTITY: item_new[0].QUANTITY + products[i].quantity
                    }
                })
            }
        }
        createAudit(req, res, "Se enviaron productos de Farmacia a Consultorio")
        res.send({
            message: "Se registraron los productos en el consultorio con exito"
        })
    } catch (error) {
        res.status(400).send({
            message: "Ocurrió un error al momento de realizar el pedido"
        })
        console.log(error)
    }
}




module.exports = {
    sendProducts
}