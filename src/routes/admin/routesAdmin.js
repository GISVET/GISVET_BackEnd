const router = require('express').Router()

const {createDependencie, getDependencies, getIdDependencies, updateDependecie, createDependencieUser} = require("../../controller/admin/controllerDependecies")
const {createPatient,getPatient,getPatiensOrderAZ, getPatiensOrderZA,getSpecificPatient, getNamePatient, updatePatient} = require("../../controller/admin/controllerPatients")
const {createProductTracings, getProductTraicing} = require ('../../controller/admin/controllerProductTracings')


/**
 * @swagger
 * components:
 *  schemas:
 *      Crear dependecia:
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
 *      Obtener dependecia:
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
 *      Obtener dependecia en especifico:
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
 *      Asignar dependencie a una persona:
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
 *      Actualizar dependencia:
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


// --------------------------- Product Tracings ----------------------

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
 *      Obtener el seguimiento:
 *          type: object
 *          description: El endpoint /Admin/getProductTraicing permite obtener un seguimiento de un producto por medio de los siguintes parametros id_person, id_clinic_history, destiny_service, id_item
 */
router.post('/getProductTracing', getProductTraicing)

//-------------------------Item---------------------------------

router.use('/Item', require('./routesAdminItem'))

//-------------------------Users---------------------------------

router.use('/Users', require('./routesAdminUsers'))




module.exports = router