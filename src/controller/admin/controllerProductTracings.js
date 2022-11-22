const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

const createProductTracings = async (req, res) =>{     
    try{
        await prisma.product_tracings .create({
            data:{
                ID_PERSON : req.body.id_person,
                ID_ITEM : req.body.id_item,
                ID_CLINIC_HISTORY: req.body.id_clinic_history,
                QUANTITY_USED : req.body.quantity_used,
                UNIT_MEASUREMENT : req.body.unit_measurement,
                DESTINY_SERVICE : req.body.destiny_service,                
                DATE_PRODUCT_TRACING :  new Date(new Date()-3600*1000*5).toISOString()
            }
        })
        res.send({
            message: "Trazabilidad registrada del producto registrada con éxito"
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

const getProductTraicing = async (req, res) =>{
    const data = await prisma.product_tracings .findMany({
        where:{
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
                    }
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
            PRODUCT_NAME: data[i].item.product_brand.products.PRODUCT_NAME
        }
        json[i] = objt
    }
    return json
}

module.exports = {
    createProductTracings,
    getProductTraicing,
}