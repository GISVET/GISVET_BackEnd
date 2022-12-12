const router = require('express').Router()

const {getBrand, createBrand, updateBrand} = require('../../controller/admin/item/controllerBrands')
const {getFeatureProducts, updateFeatureProduct, createFeatureProducts} = require('../../controller/admin/item/controllerFeatureProduct')
const {getProduct, getItemProductDepartment,getSpecificProduct,createProducts, updateProduct, getItemProduct} = require('../../controller/admin/item/controllerProduct')
const {createItem, assingItem} = require("../../controller/admin/item/controllerItem")

//---------------------- Brands -----------------------------------

/**
 * @swagger
 * components:
 *  schemas:
 *      Obtener marcas:
 *          type: object
 *          description: El endpoint /Admin/Item/getBrand permite obtener las marcas que se encuentran registradas
 *          properties:
 *              id_brand:
 *                  type: integer
 *                  description: Id de la marca
 *              name_brand:
 *                  type: string
 *                  description: Nombre de la marca
 *          require:
 *               - id_brand
 *               - name_brand
 *          example:
 *              id_brand: 1
 *              name_brand: Marca
 */
router.get('/getBrand',getBrand)

/**
 * @swagger
 * components:
 *  schemas:
 *      Crear marca:
 *          type: object
 *          description: El endpoint /Admin/Item/createBrand permite crear las marcas 
 *          properties:
 *              name_brand:
 *                  type: string
 *                  description: Nombre de la marca
 *          require:
 *               - name_brand
 *          example:
 *              name_brand: Marca
 */
router.post('/createBrand',createBrand)

/**
 * @swagger
 * components:
 *  schemas:
 *      Actualizar marcas:
 *          type: object
 *          description: El endpoint /Admin/Item/updateBrand permite actulizar las marcas que se encunetran registradas
 *          properties:
 *              id_brand:
 *                  type: integer
 *                  description: Id de la marca a actulizar
 *              name_brand:
 *                  type: string
 *                  description: Nuevo nombre de la marca
 *          require:
 *               - id_brand
 *               - name_brand
 *          example:
 *              id_brand: 1
 *              name_brand: Marca Nueva
 */
router.put('/updateBrand',updateBrand)

// ------------------------ FeatureProducts --------------------------------

/**
 * @swagger
 * components:
 *  schemas:
 *      Obtener caracteristicas de un producto:
 *          type: object
 *          description: El endpoint /Admin/Item/getFeatureProduct permite obtener las caracteristicas, se puede filtrar por fecha de vencimiento, invima, precio por unidad
 */
router.post('/getFeatureProduct',getFeatureProducts)

/**
 * @swagger
 * components:
 *  schemas:
 *      Crear caracteristica del producto:
 *          type: object
 *          description: El endpoint /Admin/Item/createFeatureProducts permite crear las caractericas de un producto
 *          properties:
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
 *          require:
 *               - expiration_date
 *               - quantity_per_unit
 *               - price_per_unit
 *               - invima
 *               - manufacturing_date
 *          example:
 *              expiration_date: 2025-07-08
 *              quantity_per_unit: 100
 *              price_per_unit: 2000
 *              invima: S2121
 *              manufacturing_date: 2022-12-9
 */
router.post('/createFeatureProducts',createFeatureProducts)

/**
 * @swagger
 * components:
 *  schemas:
 *      Actualizar caracteristica del producto:
 *          type: object
 *          description: El endpoint /Admin/Item/updateFeatureProduct permite actulizar las caractericas de un producto
 *          properties:
 *              id_feature:
 *                  type: integer
 *                  description: Id de la caracteristica a modificar
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
 *          require:
 *               - expiration_date
 *               - quantity_per_unit
 *               - price_per_unit
 *               - invima
 *               - manufacturing_date
 *          example:
 *              expiration_date: 2025-07-08
 *              quantity_per_unit: 100
 *              price_per_unit: 2000
 *              invima: S2121
 *              manufacturing_date: 2022-12-9
 */
router.put('/updateFeatureProduct',updateFeatureProduct)

// --------------------------- Product ----------------------

/**
 * @swagger
 * components:
 *  schemas:
 *      Crear producto:
 *          type: object
 *          description: El endpoint /Admin/Item/createProducts permite crear los productos
 *          properties:
 *              product_name:
 *                  type: string
 *                  description: Nombre del producto
 *              measurement_units:
 *                  type: string
 *                  description: Unidad de medida del producto
 *              type_product:
 *                  type: string
 *                  description: Tipo de producto
 *          require:
 *               - product_name
 *               - measurement_units
 *               - type_product
 *          example:
 *              product_name: Jeringa
 *              measurement_units: ML
 *              type_product: M
 */
router.post('/createProducts',createProducts)

/**
 * @swagger
 * components:
 *  schemas:
 *      Obtener productos:
 *          type: object
 *          description: El endpoint /Admin/Item/createProducts permite obtener todos los productos
 */
router.post('/getProduct',getProduct)

/**
 * @swagger
 * components:
 *  schemas:
 *      Obtener los productos de las dependecias:
 *          type: object
 *          description: El endpoint /Admin/Item/getItemProductDepartment permite obtener los productos de cada una de las dependecias
 *          properties:
 *              id_item:
 *                  type: integer
 *                  description: Id del item donde se encuentra asociado los productos 
 *          require:
 *               - id_item
 *          example:
 *              id_item: 1
 */
router.get('/getItemProductDepartment',getItemProductDepartment)

/**
 * @swagger
 * components:
 *  schemas:
 *      Obtener un producto en especifico:
 *          type: object
 *          description: El endpoint /Admin/Item/getSpecificProduct permite obtener el producto en especifico
 *          properties:
 *              id_product:
 *                  type: integer
 *                  description: Id del producto a buscar 
 *          require:
 *               - id_product
 *          example:
 *              id_product: 1
 */
router.post('/getSpecificProduct',getSpecificProduct)

/**
 * @swagger
 * components:
 *  schemas:
 *      Actualizar un producto:
 *          type: object
 *          description: El endpoint /Admin/Item/getSpecificProduct permite actulizar un producto
 *          properties:
 *              id_product:
 *                  type: integer
 *                  description: Id del producto a actulizar 
 *              product_name:
 *                  type: string
 *                  description: Nombre del producto
 *              measurement_units:
 *                  type: string
 *                  description: Unidad de medida del producto
 *              type_product:
 *                  type: string
 *                  description: Tipo de producto
 *          require:
 *               - id_product
 *               - product_name
 *               - measurement_units
 *               - type_product
 *          example:
 *              id_product: 1
 *              product_name: Jeringa
 *              measurement_units: ML
 *              type_product: M
 */
router.put('/updateProduct',updateProduct)

/**
 * @swagger
 * components:
 *  schemas:
 *      Obtener item con productos:
 *          type: object
 *          description: El endpoint /Admin/Item/getItemProduct permite obtener los item con sus productos
 */
router.get('/getItemProduct', getItemProduct)

//-------------------------------- Item -------------------------------


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
router.post('/createItem',createItem)
router.post('/assingItem',assingItem)

module.exports = router