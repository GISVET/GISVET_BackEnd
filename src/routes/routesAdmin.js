const router = require('express').Router()
const {createDependencie, getDependencies, getIdDependencies, updateDependecie} = require("../controller/admin/controllerDependecies")
const {createPatient,getPatient,getSpecificPatient, updatePatient} = require("../controller/admin/controllerPatients")
const {createProductTracings, getItemTracingProduct, getPersonProductTracing, getPacientProductTracing} = require ('../controller/admin/controllerProductTracings')

//---------------------Dependencies--------------------------------
router.post('/createDependecie', createDependencie)
router.post('/getDependencies', getDependencies)
router.post('/getIdDependencies', getIdDependencies)
router.put('/updateDependecie', updateDependecie)

//------------------------Patients -----------------------------------

router.post('/createPatient', createPatient)
router.get('/getPatient',getPatient)
router.post('/getSpecificPatient', getSpecificPatient)
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