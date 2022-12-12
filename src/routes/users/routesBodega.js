const router = require('express').Router()
const {createItem, sendProducts} = require('../../controller/users/controllerUserBodega')
const {getProducts} = require('../../controller/users/general') 

/**
 * @swagger
 * components:
 *  schemas:
 *      Crear un item:
 *          type: object
 *          description: El endpoint /Admin/Item/createItem permite actulizar un producto
 *          properties:
 *              iup:
 *                  type: string
 *                  description: identifcador unico del producto
 *              expiration_date:
 *                  type: string
 *                  description: Fecha de vencimiento del producto
 *              quantity_per_unit:
 *                  type: integer
 *                  description: Cantidad del producto
 *              price_per_unit:
 *                  type: integer
 *                  description: Precio por unidad del producto
 *              invima:
 *                  type: string
 *                  description: Registro invima del producto
 *              manufacturing_date:
 *                  type: string
 *                  description: Fecha en que se registro el producto
 *              product_name:
 *                  type: string
 *                  description: Nombre del producto
 *              name_brand:
 *                  type: string
 *                  description: Nombre de la marca
 *              presentation:
 *                  type: string
 *                  description: Presentación del producto
 *              id_dependencie:
 *                  type: string
 *                  description: Id de la dependecia que se asignará
 *              quantity:
 *                  type: integer
 *                  description: Cantidad del producto 
 *          require:
 *               - iup
 *               - expiration_date
 *               - quantity_per_unit
 *               - price_per_unit
 *               - invima
 *               - manufacturing_date
 *               - measurement_units
 *               - product_name
 *               - name_brand
 *               - presentation
 *               - id_dependencie
 *               - quantity
 *          example:
 *              iup: 123dada
 *              expiration_date: 2025-12-9
 *              quantity_per_unit: 10
 *              price_per_unit: 2000
 *              invima: sasad123
 *              manufacturing_date: 2022-12-3
 *              measurement_units: ML
 *              product_name: Jeringa
 *              name_brand: Marca
 *              presentation: C
 *              id_dependencie: 1
 *              quantity: 20
 */
router.put('/createItem',createItem)

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
router.post('/getProduct',getProducts)

/**
 * @swagger
 * components:
 *  schemas:
 *      Enviar productos:
 *          type: object
 *          description: El endpoint /Users/Farmacia/sendProducts permite enviar un listado de productos a una dependecia en especifico, por medio de un token que llega a el usuario que se le requira enviar los productos
 */
router.post('/sendProducts',sendProducts)

router.use('/Item', require('../admin/routesAdminItem'))

module.exports = router