const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

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
                ID_PERSON: req.body.id_person
            }, 
            include:{
                accounts: true
            }
        })
        const object = [getToken(data)]
        jwt.sign({object},data.DOCUMENT,{expiresIn: '72000s'},(error,token)=>{
            enviarMail(data.accounts[0].EMAIL, token).then((data)=>{
                res.json(data)
            })
        })
    } catch (error) {
        res.send({
            message: "Ocurrió un error al momento de generar el token"
        })
        console.log(error)
    }
}

function parseJwt (token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

async function enviarMail (email, token) {
    const config = {
        host : 'smtp.gmail.com',
        port : 587,
        auth : {
            user : "raulvalencia932@gmail.com",
            pass: "gwchqpdocynnujzu"
        }
    }

    const mensaje = {
        from : "raulvalencia932@gmail.com",
        to: email, 
        subject: "Token GISVET",
        text: "Este código temporal tiene una validez de 20 horas: "+parseJwt(token).object[0].token
    }

    await prisma.accounts.update({
        where:{
            EMAIL: email
        },
        data: {
            TEM_TOKEN :token
        }
    })
    const transport = nodemailer.createTransport(config);
    const info = await transport.sendMail(mensaje )
    return info
}

function getToken(data){
    const code = data.DOCUMENT
    const type_document = data.DOCUMENT_TYPE
    const time = new Date().getTime().toString()
    let ran1= Math.trunc(Math.random()*10) 
    let ran2= Math.trunc(Math.random()*10)
    return { token: ran1+code.substring(code.length -2)+type_document+time.substring(time.length -2)+ ran2}
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