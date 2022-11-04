const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

const createProducts = async (req, res) =>{
    try {
        await prisma.products.create({
            data:{
                ID_PRODUCT: req.body.id_product,
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
   try {
        const valueName = typeof(req.body.value) === "string"? req.body.value: undefined
        const valueId = typeof(req.body.value) === "number"? req.body.value: undefined
        const data = await prisma.products .findMany({
            where:{
                PRODUCT_NAME:{
                    contains: valueName
                },
                ID_PRODUCT: valueId
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
            res.json(formtGetProductJson(data))
        }
   } catch (error) {
        res.send({
            message: "Ocurrió un error al momento obtener los productos"
        })
        console.log(error)
   }    
}

const getItemProduct =  async (req, res) =>{
    try{        
        const data = await prisma.item .findMany({
            include:{
                products:{
                    include:{
                        product_brand:{
                            include:{
                                brands: true
                            }
                        }
                    }                     
                },
                feature_products:true,
            }
        })    
        if (data[0] === undefined){
            res.status(400).send({
                message: "No se encuentra la dependencia ingresada"
            })
        }else{
            res.json(formtJson(data)) 
        }
    } catch (error) {
        res.send({
            message: "Ocurrió un error al momento obtener los productos"
        })
        console.log(error)
    }
}

const getItemProductDepartment = async (req, res) =>{ 
    try{
        const data = await prisma.item .findUnique({
            where:{
                ID_ITEM: req.body.id_item
            }, 
            include: {
                dependencies: true, 
                products: true
            }           
        })          
        if (data === null){
            res.status(400).send({
                message: "No se encuentra el item ingresado"
            })
        }else{
            res.json(formtJsonDependece(data)) 
        }
    }catch (error) {
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

function formtJson(data){
    const json = []
    console.log(data)
    for (let i = 0; i < data.length; i++) {
        const object= {
            ID_ITEM: data[i].ID_ITEM,
            PRESENTATION: data[i].PRESENTATION,
            QUANTITY: data[i].QUANTITY,
            ID_PRODUCT: data[i].products.ID_PRODUCT,
            PRODUCT_NAME: data[i].products.PRODUCT_NAME,
            MEASUREMENT_UNITS: data[i].products.MEASUREMENT_UNITS,
            TYPE_PRODUCT: data[i].products.TYPE_PRODUCT,
            PRODUCTS: data[i].products.product_brand,
            // NAME_BRAND: data[i].products.product_brand.brand.NAME_BRAND = []? "vacío" : 33 
        }
        json[i]= object
    }
    return json
}

function formtGetProductJson(data){
    const json = []
    const objt = {
        products: data,
        size: data.length
    }
    json[0]= objt
    return json
}

function formtJsonDependece(data){
    const object= {
        ID_ITEM: data.ID_ITEM,
        PRODUCT_NAME: data.products.PRODUCT_NAME,
        PRESENTATION: data.PRESENTATION, 
        QUANTITY: data.QUANTITY,
        ID_DEPENDENCIE: data.ID_DEPENDENCIE,
        DEPENDENCIE_NAME: data.dependencies.DEPENDENCIE_NAME,
        TYPE_DEPENDENCIE: data.dependencies.TYPE_DEPENDENCIE          
    }
    return object
}

module.exports = {
    createProducts,
    getItemProduct,
    getProduct,
    getItemProductDepartment,
    getNameProducts,
    updateProduct
}