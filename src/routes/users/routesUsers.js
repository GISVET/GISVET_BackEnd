const router = require('express').Router()
const {getDependeciePersons} =  require('../../controller/admin/persons/controllerPerson')
const {getPatient} = require("../../controller/admin/controllerPatients")
const {getProductTraicing} =  require("../../controller/admin/controllerProductTracings")

router.use("/Bodega", require('./routesBodega'))
router.use("/Farmacia", require('./routesFarmcia'))
router.use("/Consultorio", require('./routesConsultorio'))


/**
 * @swagger
 * components:
 *  schemas:
 *      Dependecias de una persona:
 *          type: object
 *          description: El endpoint /Users/getDependeciePersons permite obtener todas las depencias de una persona
 *          properties:
 *              document:
 *                  type: string
 *                  description: Número de documento de un usuario 
 *          require:
 *               - document
 *          example:
 *              document: 213131
 */
router.post('/getDependeciePersons', getDependeciePersons)

/**
 * @swagger
 * components:
 *  schemas:
 *      Obtener paciente:
 *          type: object
 *          description: El endpoint /Admin/getPatient permite obtener todos los pacientes
 */
router.get('/getPatient', getPatient)

/**
 * @swagger
 * components:
 *  schemas:
 *      Obtener el seguimiento:
 *          type: object
 *          description: El endpoint /Admin/getProductTraicing permite obtener un seguimiento de un producto por medio de los siguintes parametros id_person, id_clinic_history, destiny_service, id_item
 */
router.post('/getProductTraicing', getProductTraicing)

module.exports = router