const router = require('express').Router()

const {createPersons, createPersonAll, getPersons, getIdPersons,updatePersons,deletePersons} = require("../../controller/admin/persons/controllerPerson")
const {createRole,getRoles,getIdRoles, updateRol, deleteRoles} = require("../../controller/admin/persons/controllerRoles")
const {createUserRoles, getUserRoles, getIdUserRoles, updateUserRoles, deleteUserRoles} = require ("../../controller/admin/persons/controllerUserRoles")

//---------------------- Users -----------------------------------

/**
 * @swagger
 * components:
 *  schemas:
 *      Crear una persona:
 *          type: object
 *          description: El endpoint /Admin/Users/createUser permite crear una persona
 *          properties:
 *              full_name:
 *                  type: string
 *                  description: Nombre completo del usuario
 *              document_type:
 *                  type: string
 *                  description: Tipo de documento del usuario
 *              document:
 *                  type: string
 *                  description: Número de documento del usuario 
 *              gender:
 *                  type: string
 *                  description: Genero del usurio 
 *              professional_id:
 *                  type: string
 *                  description: Número de la tarjeta profesional del usuario
 *          require:
 *               - full_name
 *               - document_type
 *               - document
 *               - gender
 *               - professional_id
 *          example:
 *              full_name: Raúl Valencia
 *              document_type: CC
 *              document: 21313231
 *              gender: M
 *              professional_id: 213123
 */
router.post('/createUser', createPersons)

/**
 * @swagger
 * components:
 *  schemas:
 *      Crear una persona con credenciales:
 *          type: object
 *          description: El endpoint /Admin/Users/createPersonAll permite crear una persona con credenciales y rol
 *          properties:
 *              full_name:
 *                  type: string
 *                  description: Nombre completo del usuario
 *              document_type:
 *                  type: string
 *                  description: Tipo de documento del usuario
 *              document:
 *                  type: string
 *                  description: Número de documento del usuario 
 *              gender:
 *                  type: string
 *                  description: Genero del usurio 
 *              professional_id:
 *                  type: string
 *                  description: Número de la tarjeta profesional del usuario
 *              email:
 *                  type: string
 *                  description: El correo del usuario 
 *              password_account:
 *                  type: string
 *                  description: La contraseña del usuario
 *              name_rol:
 *                  type: string
 *                  description: Nombre del rol a asignar
 *          require:
 *               - full_name
 *               - document_type
 *               - document
 *               - gender
 *               - professional_id
 *               - email
 *               - password_account
 *               - name_rol
 *          example:
 *              full_name: Raúl Valencia
 *              document_type: CC
 *              document: 21313231
 *              gender: M
 *              professional_id: 213123
 *              email: correo@gmail.com
 *              password_account: contraseña123
 *              name_rol: Administrador
 */
router.post('/createPersonAll', createPersonAll)

/**
 * @swagger
 * components:
 *  schemas:
 *      Obtener todas las personas:
 *          type: object
 *          description: El endpoint /Admin/Users/getPersons permite obtener todos los usuarios registrados
 */
router.post('/persons',getPersons)

/**
 * @swagger
 * components:
 *  schemas:
 *      Obtener un usuario en especifico:
 *          type: object
 *          description: El endpoint /Admin/Users/getPersons permite obtener todos los usuarios registrados
 *          properties:
 *              id_person:
 *                  type: integer
 *                  description: Id de la persona a buscar
 *              document:
 *                  type: string
 *                  description: Número de documento del usuario a buscar 
 *          require:
 *               - id_person
 *               - document
 *          example:
 *              document: 21313231
 *              id_person: 1
 */
router.post('/personsId',getIdPersons)

/**
 * @swagger
 * components:
 *  schemas:
 *      Actulizar un usuario en especifico:
 *          type: object
 *          description: El endpoint /Admin/Users/updatePersons actulizar un usuario en especifico
 *          properties:
 *              id_person:
 *                  type: integer
 *                  description: Id de la persona a actilizar
 *              full_name:
 *                  type: string
 *                  description: Nombre completo del usuario
 *              document_type:
 *                  type: string
 *                  description: Tipo de documento del usuario
 *              document:
 *                  type: string
 *                  description: Número de documento del usuario 
 *              gender:
 *                  type: string
 *                  description: Genero del usurio 
 *              professional_id:
 *                  type: string
 *                  description: Número de la tarjeta profesional del usuario
 *          require:
 *               - id_person
 *               - full_name
 *               - document_type
 *               - document
 *               - gender
 *               - professional_id
 *          example:
 *              full_name: Raúl Valencia
 *              document_type: CC
 *              document: 21313231
 *              gender: M
 *              professional_id: 213123
 *              id_person: 1
 */
router.put('/updatePerson',updatePersons)

/**
 * @swagger
 * components:
 *  schemas:
 *      Eliminar un usuario:
 *          type: object
 *          description: El endpoint /Admin/Users/deletePersons permite eliminar un usuario
 *          properties:
 *              id_person:
 *                  type: integer
 *                  description: Id de la persona a eliminar
 *          require:
 *               - id_person
 *          example:
 *              id_person: 1
 */
router.patch('/deletePerson', deletePersons)

//-------------------------Roles------------------------------

/**
 * @swagger
 * components:
 *  schemas:
 *      Crear un rol:
 *          type: object
 *          description: El endpoint /Admin/Users/createRole permite crear un rol
 *          properties:
 *              name_rol:
 *                  type: string
 *                  description: Nombre del rol
 *              description_rol:
 *                  type: string
 *                  description: Descripción del rol
 *          require:
 *               - name_rol
 *               - description_rol
 *          example:
 *              name_rol: Administrador
 *              description_rol: descripción del rol
 */
router.post('/createRol', createRole)

/**
 * @swagger
 * components:
 *  schemas:
 *      Obtener todas los roles:
 *          type: object
 *          description: El endpoint /Admin/Users/getRoles permite obtener todos los roles registrados
 */
router.get('/getRoles', getRoles)

/**
 * @swagger
 * components:
 *  schemas:
 *      Obtener un rol por id:
 *          type: object
 *          description: El endpoint /Admin/Users/getIdRoles permite un rol en especifico
 *          properties:
 *              id_rol:
 *                  type: integer
 *                  description: Id del rol
 *          require:
 *               - id_rol
 *          example:
 *              id_rol: 1
 */
router.get('/getIdRoles', getIdRoles)

/**
 * @swagger
 * components:
 *  schemas:
 *      Actualizar un rol:
 *          type: object
 *          description: El endpoint /Admin/Users/updateRol permite actulizar un rol
 *          properties:
 *              id_rol:
 *                  type: integer
 *                  description: Id del rol a buscar
 *              name_rol:
 *                  type: string
 *                  description: Nombre del rol
 *              description_rol:
 *                  type: string
 *                  description: Descripción del rol
 *          require:
 *               - id_rol
 *               - name_rol
 *               - description_rol
 *          example:
 *              id_rol: 1
 *              name_rol: Administrador
 *              description_rol: descripción del rol
 */
router.put('/updateRol', updateRol)

/**
 * @swagger
 * components:
 *  schemas:
 *      Eliminar un rol:
 *          type: object
 *          description: El endpoint /Admin/Users/deleteRol permite eliminar un rol
 *          properties:
 *              id_rol:
 *                  type: integer
 *                  description: Id del rol a eliminar
 *          require:
 *               - id_rol
 *          example:
 *              id_rol: 1
 */
router.patch('/deleteRol', deleteRoles)

//------------------------User Roles------------------------------

/**
 * @swagger
 * components:
 *  schemas:
 *      Asignar un rol a una persona:
 *          type: object
 *          description: El endpoint /Admin/Users/createUserRoles permite asignar un rol a una persona
 *          properties:
 *              id_rol:
 *                  type: integer
 *                  description: Id del rol
 *              id_person:
 *                  type: integer
 *                  description: Id de la persona 
 *          require:
 *               - id_rol
 *               - id_person
 *          example:
 *              id_rol: 1
 *              id_person: 1
 */
router.post('/createUserRoles', createUserRoles)

/**
 * @swagger
 * components:
 *  schemas:
 *      Obtener todas los roles asignaos:
 *          type: object
 *          description: El endpoint /Admin/Users/getUserRoles permite obtener todos lo roles que han sido asignados a un usuario
 */
router.get('/getUserRoles', getUserRoles)

/**
 * @swagger
 * components:
 *  schemas:
 *      Obtener una asignación de rol en especifico:
 *          type: object
 *          description: El endpoint /Admin/Users/getIdUserRoles permite obtener un rol asignado en especifico
 *          properties:
 *              id_rol:
 *                  type: integer
 *                  description: Id del rol
 *              id_person:
 *                  type: integer
 *                  description: Id de la persona 
 *          require:
 *               - id_rol
 *               - id_person
 *          example:
 *              id_rol: 1
 *              id_person: 1
 */
router.get('/getIdUserRoles', getIdUserRoles)

/**
 * @swagger
 * components:
 *  schemas:
 *      Actualizar una asignación de un rol:
 *          type: object
 *          description: El endpoint /Admin/Users/updateUserRoles permite actualizar un rol asignado 
 *          properties:
 *              id_rol:
 *                  type: integer
 *                  description: Id del rol
 *              id_person:
 *                  type: integer
 *                  description: Id de la persona
 *              state:
 *                  type: string
 *                  description: Estado de la asignacón  
 *          require:
 *               - id_rol
 *               - id_person
 *               - state
 *          example:
 *              id_rol: 1
 *              id_person: 1
 *              state: AC
 */
router.put('/updateUserRoles', updateUserRoles)

/**
 * @swagger
 * components:
 *  schemas:
 *      Eliminar una asignación de rol:
 *          type: object
 *          description: El endpoint /Admin/Users/getIdUserRoles permite eliminar un rol asignado en especifico
 *          properties:
 *              id_rol:
 *                  type: integer
 *                  description: Id del rol
 *              id_person:
 *                  type: integer
 *                  description: Id de la persona 
 *          require:
 *               - id_rol
 *               - id_person
 *          example:
 *              id_rol: 1
 *              id_person: 1
 */
router.patch('/deleteUserRoles', deleteUserRoles)

module.exports = router