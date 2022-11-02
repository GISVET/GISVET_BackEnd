const router = require('express').Router()

const {createDependencie, getDependencies, getIdDependencies, updateDependecie} = require("../../controller/admin/controllerDependecies")
const {createPatient,getPatient,getPatiensOrderAZ, getPatiensOrderZA,getSpecificPatient, getNamePatient, updatePatient} = require("../../controller/admin/controllerPatients")
const {createProductTracings, getProductTraicing} = require ('../../controller/admin/controllerProductTracings')


//---------------------Dependencies--------------------------------
router.post('/createDependecie', createDependencie)
router.post('/getDependencies', getDependencies)
router.post('/getIdDependencies', getIdDependencies)
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
router.get('/getProductTracing', getProductTraicing)

//-------------------------Item---------------------------------

router.use('/Item', require('./routesAdminItem'))

//-------------------------Users---------------------------------

router.use('/Users', require('./routesAdminUsers'))




module.exports = router