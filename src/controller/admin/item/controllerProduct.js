const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

const createProducts = async (req, res) =>{
    try {
        await prisma.products.create({
            data:{
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
            include:{
                item: true
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
            // res.json(data)
        }
   } catch (error) {
        res.status(400).send({
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

const getSpecificProduct = async (req, res) =>{      
    try{
        const data = await prisma.products.findUnique({
            where: {
                ID_PRODUCT: req.body.id_product
            },
            select:{
                PRODUCT_NAME: true,
                MEASUREMENT_UNITS: true,
                TYPE_PRODUCT: true,
                product_brand:{
                    select:{
                        brands:{
                            select:{
                                NAME_BRAND: true
                            }
                        }
                    }
                },
                item:{
                    select:{
                        PRESENTATION: true,
                        QUANTITY: true,
                        feature_products:true
                    }
                }
            }
        })      
        if(data === null){
            res.status(400).send({
                message: "El producto no existe"
            })
        }else {            
            res.json(formtJsonSpecific(data))
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
    for (let i = 0; i < data.length; i++) {
        const object= {
            ID_ITEM: data[i].ID_ITEM,
            PRESENTATION: data[i].PRESENTATION,
            QUANTITY: data[i].QUANTITY,
            ID_PRODUCT: data[i].products.ID_PRODUCT,
            PRODUCT_NAME: data[i].products.PRODUCT_NAME,
            MEASUREMENT_UNITS: data[i].products.MEASUREMENT_UNITS,
            TYPE_PRODUCT: data[i].products.TYPE_PRODUCT,
            PRODUCTS: data[i].products.product_brand
        }
        json[i]= object
    }
    return json
}

function formtGetProductJson(data){
    const json = []
    let count = -1
    for (let i = 0; i < data.length; i++) {
        let obj
        let present = getPresentationItems(data[i].item)
        if(data[i].item.length > 1){
            for (let j = 0; j < present.length; j++) {
                count +=1
                obj = {
                    ID_PRODUCT: data[i].ID_PRODUCT,
                    PRODUCT_NAME: data[i].PRODUCT_NAME,
                    MEASUREMENT_UNITS: data[i].MEASUREMENT_UNITS,
                    TYPE_PRODUCT: data[i].TYPE_PRODUCT,
                    PRESENTATION: present[j],
                    TOTAL_PRODUCT: countTotalProductOneMore(data[i].item, present[j])
                }
                json[count] = obj 
            }
        }else{
            count +=1 
            obj = {
                ID_PRODUCT: data[i].ID_PRODUCT,
                PRODUCT_NAME: data[i].PRODUCT_NAME,
                MEASUREMENT_UNITS: data[i].MEASUREMENT_UNITS,
                TYPE_PRODUCT: data[i].TYPE_PRODUCT,
                PRESENTATION: data[i].item[0] === undefined ? "U": data[i].item[0].PRESENTATION,
                TOTAL_PRODUCT: countTotalProductOne(data[i].item)
            }
            json[count] = obj
        }
    }
    return json
}

function countTotalProductOneMore(data, present){
    let aux = 0
    for (let i = 0; i < data.length; i++) {
        if(data[i].PRESENTATION === present){
            aux += data[i].QUANTITY
        }
    }
    return aux
}
function countTotalProductOne(data){
    let aux = 0
    for (let i = 0; i < data.length; i++) {
        aux += data[i].QUANTITY
    }
    return aux
}

function getPresentationItems(data){
    const array = []
    for (let i = 0; i < data.length; i++) {
        if(array.find(element => element === data[i].PRESENTATION) === undefined){
            array[i] = data[i].PRESENTATION
        }   
    }
    return array
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

function formtJsonSpecific(data){
    console.log(data)
    const brands = []
    for (let i = 0; i <data.product_brand.length; i++) {
        brands[i] = data.product_brand[i].brands.NAME_BRAND
    }
    const object= {
        PRODUCT_NAME: data.PRODUCT_NAME,
        MEASUREMENT_UNITS: data.MEASUREMENT_UNITS,
        TYPE_PRODUCT: data.TYPE_PRODUCT,   
        BRANS: brands, 
        LOTES: data.item
    }
    return object
}

module.exports = {
    createProducts,
    getItemProduct,
    getProduct,
    getItemProductDepartment,
    getSpecificProduct,
    updateProduct
}