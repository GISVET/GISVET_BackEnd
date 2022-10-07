const router = require('express').Router()
const {createDependencie} = require("../controller/admin/controllerDependecies")
const {createPersons,getPersons, getIdPersons,getRolPersons,updatePersons,deletePersons} = require("../controller/admin/controllerPerson")
const {createPatient,getPatient,getSpecificPatient, updatePatient, deletePatient} = require("../controller/admin/controllerPatients")
const {createRole,getRoles,getIdRoles, updateRol } = require("../controller/admin/controllerRoles")

//---------------------Dependencies--------------------------------
router.post('/createDependecie', createDependencie)

//---------------------- Users -----------------------------------

router.post('/createUser', createPersons)
router.get('/persons',getPersons)
router.get('/personsId',getIdPersons)
router.put('/updatePerson',updatePersons)
router.patch('/deletePerson', deletePersons)

//-------------------------Roles------------------------------

router.post('/createRol', createRole)
router.get('/getRoles', getRoles)
router.get('/getIdRoles', getIdRoles)
router.put('/updateRol', updateRol)

//------------------------Patients -----------------------------------

router.get('/getPatients',getPatient)
router.get('/getSpecificPatient', getSpecificPatient)
router.post('/createPatient', createPatient)
router.put('/updatePatient', updatePatient)
router.patch('/deletePatient', deletePatient)

module.exports = router