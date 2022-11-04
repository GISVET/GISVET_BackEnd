const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

const createItem = async (req, res) =>{
    try {
        const product = await prisma.products.create({
            data:{
                ID_PRODUCT: req.body.id_product,
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
                MANUFACTURING_DATE: new Date (req.body.manufacturing_date)                           
            }
        })

        await prisma.item.create({
            data:{
                PRESENTATION: req.body.presentation,
                QUANTITY: req.body.quantity,
                ID_PRODUCT: product.ID_PRODUCT,
                ID_FEATURE: feature.ID_FEATURE,
                ID_DEPENDENCIE: req.body.id_dependencie
            }
        })
        console.log(product)
        // res.send({
        //     message: "Item creado con éxito"
        // });
    } catch (error) {
        res.send({
            message: "Ocurrió un error al momento de crear el item"
        });
        console.log(error)
    }
}

const assingItem = async (req, res) =>{
    try {
        const idBrand =  req.body.id_brand
        const nameBrand = req.body.name_brand
        const product = req.body.id_product

        const data = await prisma.brands.findUnique({
            where:{
                ID_BRAND: idBrand
            }
        })

        if (data === null){
            await prisma.brands.create({
                data:{
                    ID_BRAND: idBrand,
                    NAME_BRAND: nameBrand
                }
            })
            await prisma.product_brand.create({
                data:{
                    ID_BRAND: idBrand,
                    ID_PRODUCT: product,
                }       
            })

        }else{
            await prisma.product_brand.create({
                data:{
                    ID_BRAND: idBrand,
                    ID_PRODUCT: product,
                }       
            })
        }

        const feature = await prisma.feature_products.create({
            data:{
                EXPIRATION_DATE : new Date (req.body.expiration_date),
                QUANTITY_PER_UNIT: req.body.quantity_per_unit,
                PRICE_PER_UNIT: req.body.price_per_unit,
                INVIMA: req.body.invima,
                MANUFACTURING_DATE: new Date (req.body.manufacturing_date)                           
            }
        })

        await prisma.item.create({
            data:{
                PRESENTATION: req.body.presentation,
                QUANTITY: req.body.quantity,
                ID_PRODUCT: product,
                ID_FEATURE: feature.ID_FEATURE,
                ID_DEPENDENCIE: req.body.id_dependencie
            }
        })
        res.send({
            message: "Item asignado con éxito"
        });
    } catch (error) {
        res.send({
            message: "Ocurrió un error al momento de asignar un item"
        });
        console.log(error)
    }
}



module.exports = {
    createItem,
    assingItem
}