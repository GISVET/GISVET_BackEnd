const router = require('express').Router()
const {generateToken, getProducts} = require('../../controller/users/general')
const {createProductTracings, getProductTracingsWithPrice, getProductTraicing} =  require("../../controller/admin/controllerProductTracings")
const {returnProducts} =  require("../../controller/users/controllerUserConsultorio")

/**
 * @swagger
 * components:
 *  schemas:
 *      Obtener los productos de cada dependecia:
 *          type: object
 *          description: El endpoint /Users/Farmacia/getProducts permite obtener los productos de cada una de las dependecias
 *          properties:
 *              type_dependecie:
 *                  type: string
 *                  description: Tipo de dependecia 
 *              name_dependencie:
 *                  type: string
 *                  description: Nombre de la dependecia 
 *          require:
 *               - type_dependecie
 *               - name_dependencie
 *          example:
 *              type_dependecie: B
 *              name_dependencie: Bodega
 */
router.post('/getProducts',getProducts)
/**
 * @swagger
 * components:
 *  schemas:
 *      Generar token:
 *          type: object
 *          description: El endpoint /Users/Farmacia/generateToken permite generar un token para que le lleguen productos
 *          properties:
 *              id_person:
 *                  type: integer
 *                  description: Id de la persona 
 *          require:
 *               - id_person
 *          example:
 *              id_person: 1
 */
router.post('/generateToken', generateToken)

/**
 * @swagger
 * components:
 *  schemas:
 *      Crer seguimiento de un producto:
 *          type: object
 *          description: El endpoint /Admin/createProductTracing permite actulizar un paciente en especifico
 *          properties:
 *              id_person:
 *                  type: integer
 *                  description: Id de la persona que usará el producto
 *              id_clinic_history:
 *                  type: integer
 *                  description: Historia clinica del paciente que se le asignará el producto
 *              destiny_service:
 *                  type: string
 *                  description: Destino del producto
 *              date_product_tracing:
 *                  type: string
 *                  description: Fecha en que se le asigno el producto
 *              id_item:
 *                  type: integer
 *                  description: Id del item a asignar
 *              quantity_used:
 *                  type: integer
 *                  description: Cantidad de producto asignado
 *              unit_measurement:
 *                  type: string
 *                  description: Unidad de medida
 *          require:
 *               - id_person
 *               - id_clinic_history
 *               - destiny_service
 *               - date_product_tracing
 *               - id_item
 *               - quantity_used
 *               - unit_measurement
 *          example:
 *              id_person: 1
 *              id_clinic_history: 13213
 *              destiny_service: CR
 *              date_product_tracing: 2018-12-8
 *              products:
 *                  id_item: 1
 *                  quantity_used: 1
 *                  unit_measurement: ML
 */
router.post('/createProductTracing', createProductTracings)
/**
 * @swagger
 * components:
 *  schemas:
 *      Obtener el seguimiento de productos con precio:
 *          type: object
 *          description: El endpoint /User/Consultorio/getProductTracingsWithPrice permite obtener el seguimiento de los productos con precio
 */
router.post('/getProductTracingsWithPrice', getProductTracingsWithPrice)
/**
 * @swagger
 * components:
 *  schemas:
 *      Obtener el seguimiento de productos:
 *          type: object
 *          description: El endpoint /User/Consultorio/getProductTracing permite obtener el seguimiento de los productos
 */
router.post('/getProductTracing', getProductTraicing)
/**
 * @swagger
 * components:
 *  schemas:
 *      Devolver un producto a farmacia:
 *          type: object
 *          description: El endpoint /User/Consultorio/returnProducts permite devolver un producto a farmcia con el token de una persona en farmacia
 */
router.post('/returnProducts', returnProducts)

module.exports = router