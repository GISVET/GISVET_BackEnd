const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

const createProducts = async (req, res) =>{
    try {
        await prisma.products.create({
            data:{
                ID_PRODUCT: req.body.id_product,
                ID_BRAND: req.body.id_brand,
                PRODUCT_NAME: req.body.product_name,
                MEASUREMENT_UNITS: req.body.measurement_units,
                TYPE_PRODUCT: req.body.type_product,
            }
        })
        res.send({
            message: "Producto creado con exito"
        });
    } catch (error) {
        if(error.code === undefined){
            res.send({
                message: "Ocurrio un error al momento de crear el producto"
            });
        }else{
            res.send({
                message: "Ocurrio el error "+error.code+ " al momento de crear el producto"
            });  
        }
        console.log(error)
    }
}

const getProduct = async (req, res) =>{
    try {
        const data = await prisma.products.findMany({
            orderBy:{
                PRODUCT_NAME: req.body.order_product_name
            },
            include:{
                brands: true
            }
        })
        res.json(data)
    } catch (error) {
        res.send({
            message: "Ocurrió un error al momento obtener los productos"
        })
        console.log(error)
    }
}

const getProductOrderAZ = async (req, res) =>{
    const data = await prisma.products.findMany({        
        orderBy: {
            PRODUCT_NAME: 'asc'
        }         
    })
    if (data[0] === undefined){
        res.status(400).send({
            message: "No se encontraron productos relacionados"
        })
    }else if(data === null){
        res.status(400).send({
            message: "No existen productos"
        })
    }else{
        res.json(data)
    }  
}

const getProductOrderZA = async (req, res) =>{
    const data = await prisma.products.findMany({        
        orderBy: {
            PRODUCT_NAME: 'desc'
        }         
    })
    if (data[0] === undefined){
        res.status(400).send({
            message: "No se encontraron productos relacionados"
        })
    }else if(data === null){
        res.status(400).send({
            message: "No existen productos"
        })
    }else{
        res.json(data)
    }  
}

const getNameProducts = async (req, res) =>{    
    try{
        const data = await prisma.products .findMany({
            where: {
                PRODUCT_NAME: {
                    startsWith: req.body.product_name
                }
            }
        })        
        if(data === null){
            res.status(400).send({
                message: "El paciente no existe"
            })
        }else {
            res.json(data)
        }
    }catch(error){
        res.status(400).send({
            message: "Ocurrio el error "+ error.code+ " al momento de registrar al paciente"
        })
    }        
}


const updateProduct = async (req, res) =>{
    try {
        await prisma.products.update({
            where:{
                ID_PRODUCT: req.body.id_product
            },
            data:{
                ID_BRAND: req.body.id_brand,
                PRODUCT_NAME: req.body.product_name,
                MEASUREMENT_UNITS: req.body.measurement_units,
                TYPE_PRODUCT: req.body.type_product
            }
        })
        res.send({
            message: "El producto se actualizo con exito"
        })
    } catch (error) {
        res.send({
            message: "Ocurrió un error al momento de actualizar el producto"
        })
        console.log(error)
    }
}

module.exports = {
    createProducts,
    getProduct,
    getNameProducts,
    getProductOrderAZ,
    getProductOrderZA,
    updateProduct
}