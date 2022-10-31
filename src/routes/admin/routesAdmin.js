const router = require('express').Router()

const {createDependencie, getDependencies, getIdDependencies, updateDependecie} = require("../../controller/admin/controllerDependecies")
const {createPatient,getPatient,getPatiensOrderAZ, getPatiensOrderZA,getSpecificPatient, getNamePatient, updatePatient} = require("../../controller/admin/controllerPatients")
const {createProductTracings, getItemPT, getPersonPT, getPacientPT, getItemPacientPT, getItemPersonPT, getItemDestinyPT,getPacientDestinyPT,
        getPersonPacientPT, getPersonDestinyPT} = require ('../../controller/admin/controllerProductTracings')

//---------------------Dependencies--------------------------------
router.post('/createDependecie', createDependencie)
router.get('/getDependencies', getDependencies)
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
router.post('/getItemProductsTracing', getItemPT)
router.post('/getPersonProductsTracing', getPersonPT)
router.post('/getPacientProductsTracing', getPacientPT)
router.post('/getItemPersonProductsTracing', getItemPersonPT)
router.post('/getItemPacientProductsTracing', getItemPacientPT)
router.post('/getItemDestinyProductsTracing', getItemDestinyPT)
router.post('/getPersonPacientProductsTracing', getPersonPacientPT)
router.post('/getPersonDestinyProductsTracing', getPersonDestinyPT)
router.post('/getPacientDestinyProductsTracing', getPacientDestinyPT)


//-------------------------Item---------------------------------

router.use('/Item', require('./routesAdminItem'))

//-------------------------Users---------------------------------

router.use('/Users', require('./routesAdminUsers'))




module.exports = router