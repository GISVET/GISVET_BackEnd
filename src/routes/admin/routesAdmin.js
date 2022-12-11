const router = require('express').Router()

const {createDependencie, getDependencies, getIdDependencies, updateDependecie, createDependencieUser} = require("../../controller/admin/controllerDependecies")
const {createPatient,getPatient,getPatiensOrderAZ, getPatiensOrderZA,getSpecificPatient, getNamePatient, updatePatient} = require("../../controller/admin/controllerPatients")
const {createProductTracings, getProductTraicing} = require ('../../controller/admin/controllerProductTracings')


/**
 * @swagger
 * components:
 *  schemas:
 *      Create dependecia:
 *          type: object
 *          description: El endpoint /Admin/createDependecie permite crear una dependecia 
 *          properties:
 *              dependencie_name:
 *                  type: string
 *                  description: Nombre de la dependecia
 *              type_dependencie:
 *                  type: string
 *                  description: Tipo de dependecia, puede ser C (Consultorio), F (Farmacia) o B (Bodega)
 *          require:
 *               - dependencie_name
 *               - type_dependencie
 *          example:
 *              dependencie_name: Bodega Ejemplo
 *              type_dependencie: B
 */

//---------------------Dependencies--------------------------------
router.post('/createDependecie', createDependencie)

/**
 * @swagger
 * components:
 *  schemas:
 *      Get dependecia:
 *          type: object
 *          description: El endpoint /Admin/getDependencies permite obtener todas las dependecias o ser filtra y organizada por los siguientes parametros
 *          properties:
 *              dependencie_name:
 *                  type: string
 *                  description: Nombre de la dependecia
 *              type_dependencie:
 *                  type: string
 *                  description: Tipo de dependecia, puede ser C (Consultorio), F (Farmacia) o B (Bodega)
 *              order_name:
 *                  type: string
 *                  description: Orden los nombrede de mandera asc (Asendente) o desc (descendente)
 *          require:
 *               - dependencie_name
 *               - type_dependencie
 *               - order_name 
 *          example:
 *              dependencie_name: Bodega Ejemplo
 *              type_dependencie: B
 *              order_name: asc
 */
router.post('/getDependencies', getDependencies)
router.post('/getIdDependencies', getIdDependencies)
router.post('/createDependencieUser', createDependencieUser)
router.put('/updateDependecie', updateDependecie)

//------------------------Patients -----------------------------------

router.post('/createPatient', createPatient)
router.get('/getPatient', getPatient)
router.get('/getPatientsOrderAZ',getPatiensOrderAZ)
router.get('/getPatientsOrderZA',getPatiensOrderZA)
router.post('/getSpecificPatient', getSpecificPatient)
router.post('/getNamePatient', getNamePatient)
router.put('/updatePatient', updatePatient)


// --------------------------- Product Tracings ----------------------

router.post('/createProductTracing', createProductTracings)
router.post('/getProductTracing', getProductTraicing)

//-------------------------Item---------------------------------

router.use('/Item', require('./routesAdminItem'))

//-------------------------Users---------------------------------

router.use('/Users', require('./routesAdminUsers'))




module.exports = router