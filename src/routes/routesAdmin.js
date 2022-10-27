const router = require('express').Router()
const {createDependencie} = require("../controller/admin/controllerDependecies")
const {createPersons,getPersons, getIdPersons,getRolPersons,updatePersons,deletePersons, getPersonsOrderAZ, getPersonsOrderZA} = require("../controller/admin/persons/controllerPerson")
const {createPatient,getPatient,getSpecificPatient, updatePatient, deletePatient} = require("../controller/admin/controllerPatients")
const {createRole,getRoles,getIdRoles, updateRol, deleteRoles} = require("../controller/admin/persons/controllerRoles")
const {createUserRoles, getUserRoles, getIdUserRoles, updateUserRoles, deleteUserRoles} = require ("../controller/admin/persons/controllerUserRoles")

//---------------------Dependencies--------------------------------
router.post('/createDependecie', createDependencie)

//---------------------- Users -----------------------------------

router.post('/createUser', createPersons)
router.get('/persons',getPersons)
router.get('/personsAZ',getPersonsOrderAZ)
router.get('/personsZA',getPersonsOrderZA)
router.get('/personsId',getIdPersons)
router.put('/updatePerson',updatePersons)
router.patch('/deletePerson', deletePersons)

//-------------------------Roles------------------------------

router.post('/createRol', createRole)
router.get('/getRoles', getRoles)
router.get('/getIdRoles', getIdRoles)
router.put('/updateRol', updateRol)
router.patch('/deleteRol', deleteRoles)

//------------------------User Roles------------------------------

router.post('/createUserRoles', createUserRoles)
router.get('/getUserRoles', getUserRoles)
router.get('/getIdUserRoles', getIdUserRoles)
router.put('/updateUserRoles', updateUserRoles)
router.patch('/deleteUserRoles', deleteUserRoles)

//------------------------Patients -----------------------------------

router.get('/getPatients',getPatient)
router.get('/getSpecificPatient', getSpecificPatient)
router.post('/createPatient', createPatient)
router.put('/updatePatient', updatePatient)
router.patch('/deletePatient', deletePatient)

//-------------------------Item---------------------------------

router.use('/Item', require('./routesAdminItem'))

module.exports = router