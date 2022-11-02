const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

const createProducts = async (req, res) =>{
    try {
        await prisma.products.create({
            data:{
                ID_PRODUCT: req.body.id_product,
                ID_BRAND: req.body.id_brand,
                PRODUCT_NAME: req.body.product_name.charAt(0).toUpperCase() +req.body.product_name.slice(1),
                MEASUREMENT_UNITS: req.body.measurement_units,
                TYPE_PRODUCT: req.body.type_product,
            }
        })
        res.send({
            message: "Producto creado con éxito"
        });
    } catch (error) {
        if(error.code === undefined){
            res.send({
                message: "Ocurrió un error al momento de crear el producto"
            });
        }else{
            res.send({
                message: "Ocurrió el error "+error.code+ " al momento de crear el producto"
            });  
        }
        console.log(error)
    }
}

const getProduct = async (req, res) =>{
    const data = await prisma.products .findMany({
        where:{
            PRODUCT_NAME:{
                contains: req.body.getNameProducts
            },
            ID_PRODUCT:req.body.id_product,
            ID_BRAND:req.body.id_brand
        },
        orderBy:{
            PRODUCT_NAME: req.body.order_name
        }
    })
    if (data[0] === undefined){
        res.status(400).send({
            message: "No se encontraron productos registrados"
        })
    }else if(data === null){
        res.status(400).send({
            message: "El producto no existe"
        })
    }else{
        res.json(data)
    }    
}

const getItemProduct =  async (req, res) =>{
    try{        
        const data = await prisma.item .findMany({
            select:{
                products: true
        }
    })    
        if (data[0] === undefined){
            res.status(400).send({
                message: "No se encuentra la dependencia ingresada"
            })
        }else{
            res.json(data) 
        }
    } catch (error) {
        res.send({
            message: "Ocurrió un error al momento obtener los productos"
        })
        console.log(error)
    }
}

const getNameProducts = async (req, res) =>{    
    try{
        const data = await prisma.products .findMany({
            where: {
                PRODUCT_NAME: {
                    contains: req.body.product_name
                }
            }
        })        
        if(data === null){
            res.status(400).send({
                message: "El producto no existe"
            })
        }else {
            res.json(data)
        }
    }catch(error){
        res.status(400).send({
            message: "Ocurrió el error "+ error.code+ " al momento de registrar el producto"
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
            message: "El producto se actualizó con éxito"
        })
    } catch (error) {
        res.send({
            message: "Ocurrió un error al momento de actualizar el producto"
        })
        console.log(error)
    }
}

module.exports = {
    createProducts,getItemProduct,
    getProduct,
    getNameProducts,
    updateProduct
}