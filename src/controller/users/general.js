const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

const getProducts = async (req, res) =>{
    try {
        const data = await prisma.dependencies.findMany({
            where:{
                TYPE_DEPENDENCIE: req.body.type_dependecie,
                DEPENDENCIE_NAME: req.body.name_dependencie 
            },
            include:{
                item: {
                    include:{                      
                        feature_products: true,
                        product_brand:{
                            include:{
                                brands: true,
                                products:true
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
        const object = {
            ID_ITEM: data[i].ID_ITEM,
            PRESENTATION: data[i].PRESENTATION,
            QUANTITY: data[i].QUANTITY,
            EXPIRATION_DATE: data[i].feature_products.EXPIRATION_DATE,
            QUANTITY_PER_UNIT: data[i].feature_products.QUANTITY_PER_UNIT,
            PRICE_PER_UNIT: data[i].feature_products.PRICE_PER_UNIT,
            INVIMA: data[i].feature_products.INVIMA,
            MANUFACTURING_DATE: data[i].feature_products.MANUFACTURING_DATE,           
            IUP: data[i].feature_products.IUP,
            PRODUCT_NAME: data[i].product_brand.products.PRODUCT_NAME,
            MEASUREMENT_UNITS: data[i].product_brand.products.MEASUREMENT_UNITS,
            TYPE_PRODUCT: data[i].product_brand.products.TYPE_PRODUCT,
            NAME_BRAND: data[i].product_brand.brands.NAME_BRAND,           
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
        jwt.sign({object},data.DOCUMENT,{expiresIn: '20h'},(error,token)=>{
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

module.exports = {
    generateToken,
    getProducts
}