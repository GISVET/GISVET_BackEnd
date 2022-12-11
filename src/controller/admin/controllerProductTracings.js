const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const {createAudit} = require("../auditor")

const createProductTracings = async (req, res) =>{     
    try{
        let price = 0
        let pc_array = []
        let date = new Date(req.body.date_product_tracing)
        date.setHours(date.getHours() - 5)
        const products = req.body.products
        for (let i = 0; i < products.length; i++) {
            let pct = await prisma.product_tracings.create({
                data:{
                    ID_PERSON : req.body.id_person,
                    ID_ITEM : products[i].id_item,
                    ID_CLINIC_HISTORY: req.body.id_clinic_history,
                    QUANTITY_USED: products[i].quantity_used,
                    UNIT_MEASUREMENT : products[i].unit_measurement,
                    DESTINY_SERVICE : req.body.destiny_service,                
                    DATE_PRODUCT_TRACING :  date
                }
            })
            const item = await prisma.item.findUnique({
                where:{
                    ID_ITEM: products[i].id_item
                },
                include:{
                    feature_products: true 
                }
            })
            pct["price_unit"] = item.feature_products.PRICE_PER_UNIT
            pct["price_per_product"] = item.feature_products.PRICE_PER_UNIT* products[i].quantity_used
            price += item.feature_products.PRICE_PER_UNIT* products[i].quantity_used
            pc_array[i] = pct
            await prisma.item.update({
                where:{
                    ID_ITEM: products[i].id_item
                },
                data:{
                    QUANTITY: (item.QUANTITY - products[i].quantity_used)
                }
            })
        }
        
        createAudit(req, res, "Se creo trazabilidad de productos a la historia clinica "+req.body.id_clinic_history)
        res.send({
            Total_price: price,
            Products: pc_array
        });
    }catch (error) {
        if(error.code === undefined){
        res.send({
            message: "Ocurrio un error al registrar la trazabilidad del producto"
        });
    }else{
        res.send({
            message: "Ocurrio el error "+ error.code+ " al resgistrar la trazabilidad del producto"
        });  
    }
    console.log(error) 
    }
}

const getProductTracingsWithPrice = async (req, res) =>{     
    try{
        let pct = await prisma.product_tracings.findMany({
            where:{
                ID_PRODUCT_TC: req.body.id_product_tracing
            }
        })
        const item = await prisma.item.findUnique({
            where:{
                ID_ITEM: pct[0].ID_ITEM
            },
            include:{
                feature_products: true 
            }
        })
        pct[0]["price_unit"] = item.feature_products.PRICE_PER_UNIT
        pct[0]["price_per_product"] = item.feature_products.PRICE_PER_UNIT* pct[0].QUANTITY_USED

        res.json(pct[0]);
    }catch (error) {
        res.status(400).send({
            message: "Ocurrio un error al registrar la trazabilidad del producto"
        });
        console.log(error) 
    }
}

const getProductTraicing = async (req, res) =>{
    const data = await prisma.product_tracings.findMany({
        where:{
            ID_PRODUCT_TC: req.body.id_product_tracing,
            ID_PERSON:req.body.id_person,
            ID_ITEM:req.body.id_item,
            ID_CLINIC_HISTORY:req.body.id_clinic_history,
            DESTINY_SERVICE:req.body.destiny_service
        },
        include:{
            persons: true,
            item: {
                include:{
                    product_brand:{
                        include:{
                            products:true
                        }
                    },
                    feature_products:true
                }
            },
            clinic_histories: true
        }
    })
    if (data[0] === undefined){
        res.status(400).send({
            message: "No se encontró la trazabilidad del producto"
        })
    }else if(data === null){
        res.status(400).send({
            message: "La trazabilidad del producto no existe"
        })
    }else{
        res.json(formGetProductTraicing(data))
        // res.json(data)
    }    
}

function formGetProductTraicing(data){
    let json =[]
    for (let i = 0; i < data.length; i++) {
        const objt ={
            ID_PRODUCT_TC: data[i].ID_PRODUCT_TC,
            ID_CLINIC_HISTORY: data[i].ID_CLINIC_HISTORY,
            NAME_PATIENT: data[i].clinic_histories.NAME_PATIENT,
            QUANTITY_USED: data[i].QUANTITY_USED,
            UNIT_MEASUREMENT: data[i].UNIT_MEASUREMENT,
            DESTINY_SERVICE: data[i].DESTINY_SERVICE,
            DATE_PRODUCT_TRACING: data[i].DATE_PRODUCT_TRACING,
            FULL_NAME_PERSON: data[i].persons.FULL_NAME,
            DOCUMENT_PERSON: data[i].persons.DOCUMENT,
            PRODUCT_NAME: data[i].item.product_brand.products.PRODUCT_NAME,
            price_unit: data[i].item.feature_products.PRICE_PER_UNIT,
            price_per_product: data[i].item.feature_products.PRICE_PER_UNIT * data[i].QUANTITY_USED
        }
        json[i] = objt
    }
    return json
}

module.exports = {
    createProductTracings,
    getProductTraicing,
    getProductTracingsWithPrice
}