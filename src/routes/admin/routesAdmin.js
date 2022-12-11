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
/**
 * @swagger
 * components:
 *  schemas:
 *      Get id dependencies:
 *          type: object
 *          description: El endpoint /Admin/getIdDependencies permite obtener una dependecia en especifico por medio del id
 *          properties:
 *              id_dependencie:
 *                  type: integer
 *                  description: Id de la dependecia que se desea obtner
 *          require:
 *               - id_dependencie
 *          example:
 *              id_dependencie: 1
 */
router.post('/getIdDependencies', getIdDependencies)
/**
 * @swagger
 * components:
 *  schemas:
 *      Assing dependencie to person:
 *          type: object
 *          description: El endpoint /Admin/createDependencieUser permite asignarle una dependecia a un usuario
 *          properties:
 *              id_person:
 *                  type: integer
 *                  description: Id de la persona que se le asignará la dependecia
 *              id_dependencie:
 *                  type: integer
 *                  description: Id de la dependecia que se le asignará a el usuario
 *          require:
 *               - id_person
 *               - id_dependencie
 *          example:
 *              id_person: 1
 *              id_dependencie: 1
 */
router.post('/createDependencieUser', createDependencieUser)

/**
 * @swagger
 * components:
 *  schemas:
 *      Actualizara dependencia:
 *          type: object
 *          description: El endpoint /Admin/updateDependecie permite actulizara una dependecia
 *          properties:
 *              id_dependencie:
 *                  type: integer
 *                  description: Id de la dependecia a actulizar
 *              dependencie_name:
 *                  type: string
 *                  description: Nuevo nombre de la dependecia
 *              type_dependencie: 
 *                  type: string
 *                  description: Nuevo tipo de dependecia
 *          require:
 *               - id_dependencie
 *               - dependencie_name
 *               - type_dependencie
 *          example:
 *              id_dependencie: 1
 *              dependencie_name: nueva dependecia
 *              type_dependencie: B
 */
router.put('/updateDependecie', updateDependecie)

//------------------------Patients -----------------------------------

/**
 * @swagger
 * components:
 *  schemas:
 *      Crear paciente:
 *          type: object
 *          description: El endpoint /Admin/updateDependecie permite actulizara una dependecia
 *          properties:
 *              id_dependencie:
 *                  type: integer
 *                  description: Id de la dependecia a actulizar
 *              dependencie_name:
 *                  type: string
 *                  description: Nuevo nombre de la dependecia
 *              type_dependencie: 
 *                  type: string
 *                  description: Nuevo tipo de dependecia
 *          require:
 *               - id_dependencie
 *               - dependencie_name
 *               - type_dependencie
 *          example:
 *              id_dependencie: 1
 *              dependencie_name: nueva dependecia
 *              type_dependencie: B
 */
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