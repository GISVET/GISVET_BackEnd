const router = require('express').Router()
const {sendProducts} = require('../../controller/users/controllerUserFarmacia')
const {generateToken, getProducts} = require('../../controller/users/general')
const {createPatient,getPatient,getPatiensOrderAZ, getPatiensOrderZA,getSpecificPatient, getNamePatient, updatePatient} = require("../../controller/admin/controllerPatients")

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
 *      Enviar productos:
 *          type: object
 *          description: El endpoint /Users/Farmacia/sendProducts permite enviar un listado de productos a una dependecia en especifico, por medio de un token que llega a el usuario que se le requira enviar los productos
 */
router.post('/sendProducts',sendProducts)
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

//------------------------Patients -----------------------------------

/**
 * @swagger
 * components:
 *  schemas:
 *      Crear paciente:
 *          type: object
 *          description: El endpoint /Admin/createPatient permite crear un paciente
 *          properties:
 *              id_clinic_history:
 *                  type: integer
 *                  description: Id de la historia clinica del paciente
 *              name_patient:
 *                  type: string
 *                  description: Nombre del paciente
 *          require:
 *               - id_clinic_history
 *               - name_patient
 *          example:
 *              id_clinic_history: 13213
 *              name_patient: Lupe
 */
router.post('/createPatient', createPatient)

/**
 * @swagger
 * components:
 *  schemas:
 *      Obtener paciente:
 *          type: object
 *          description: El endpoint /Admin/getPatient permite obtener todos los pacientes
 */
router.get('/getPatient', getPatient)
router.get('/getPatientsOrderAZ',getPatiensOrderAZ)
router.get('/getPatientsOrderZA',getPatiensOrderZA)

/**
 * @swagger
 * components:
 *  schemas:
 *      Obtener paciente en especifico:
 *          type: object
 *          description: El endpoint /Admin/getSpecificPatient permite obtener un paciente en especifico por medio de la historia clinica y el nombre del paciente
 *          properties:
 *              id_clinic_history:
 *                  type: integer
 *                  description: Id de la historia clinica del paciente
 *              name_patient:
 *                  type: string
 *                  description: Nombre del paciente
 *          require:
 *               - id_clinic_history
 *               - name_patient
 *          example:
 *              id_clinic_history: 13213
 *              name_patient: Lupe
 */
router.post('/getSpecificPatient', getSpecificPatient)
router.post('/getNamePatient', getNamePatient)

/**
 * @swagger
 * components:
 *  schemas:
 *      Actualizar un paciente en especifico:
 *          type: object
 *          description: El endpoint /Admin/updatePatient permite actulizar un paciente en especifico
 *          properties:
 *              id_clinic_history:
 *                  type: integer
 *                  description: Id de la historia clinica del paciente a buscar
 *              name_patient:
 *                  type: string
 *                  description: Nuevo nombre del paciente
 *          require:
 *               - id_clinic_history
 *               - name_patient
 *          example:
 *              id_clinic_history: 13213
 *              name_patient: Lupe nuevo
 */
router.put('/updatePatient', updatePatient)

module.exports = router