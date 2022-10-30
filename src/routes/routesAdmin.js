const router = require('express').Router()
const {createDependencie} = require("../controller/admin/controllerDependecies")
const {createPatient,getPatient,getPatiensOrderAZ, getPatiensOrderZA,getSpecificPatient, getNamePatient, updatePatient} = require("../controller/admin/controllerPatients")
const {createProductTracings, getItemTracingProduct, getPersonProductTracing, getPacientProductTracing} = require ('../controller/admin/controllerProductTracings')

//---------------------Dependencies--------------------------------
router.post('/createDependecie', createDependencie)

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
router.post('/getItemProductsTracing', getItemTracingProduct)
router.post('/getPersonProductsTracing', getPersonProductTracing)
router.post('/getPacientProductsTracing', getPacientProductTracing)

//-------------------------Item---------------------------------

router.use('/Item', require('./routesAdminItem'))

//-------------------------Users---------------------------------

router.use('/Users', require('./routesAdminUsers'))




module.exports = router