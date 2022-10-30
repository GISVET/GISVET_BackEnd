const {PrismaClient} = require("@prisma/client");
const { json } = require("body-parser");
const prisma = new PrismaClient()

const createBrand = async (req, res) =>{
    try {
        await prisma.brands.create({
            data:{
                ID_BRAND: req.body.id_brand,
                NAME_BRAND: req.body.name_brand.charAt(0).toUpperCase() + req.body.name_brand.slice(1)
            }
        })
        res.send({
            message: "Marca creada con éxito"
        });
    } catch (error) {
        if(error.code === undefined){
            res.send({
                message: "Ocurrió un error al momento de crear la marca"
            });
        }else{
            res.send({
                message: "Ocurrió el error "+error.code+ " al momento de crear la marca"
            });  
        }
        console.log(error)
    }
}

const updateBrand = async (req, res)=>{
    try {
        await prisma.brands.update({
            where:{
                ID_BRAND: req.body.id_brand
            },
            data:{
                ID_BRAND: req.body.id_brand,
                NAME_BRAND: req.body.name_brand.charAt(0).toUpperCase() + req.body.name_brand.slice(1)
            }
        })
        res.send({
            message: "La marca se actualizó de manera exitosa"
        })
    } catch (error) {
        if(error.code === undefined){
            res.send({
                message: "Ocurrió un error al momento de crear la marca"
            });
        }else{
            res.send({
                message: "Ocurrió el error "+error.code+ " al momento de crear la marca"
            });  
        }
        console.log(error)
    }
}

const getBrand = async (req, res) =>{
    try {
        const data = await prisma.brands.findMany()
        res.json(data)
    } catch (error) {
        res.send({
            message: "Ocurrió un error al momento de obtener las marcas"
        })
        console.log(error)
    }
}

module.exports = {
    createBrand,
    getBrand, 
    updateBrand
}