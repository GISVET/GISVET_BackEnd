const router = require('express').Router()
const {sendProducts} = require('../../controller/users/controllerUserFarmacia')
const {generateToken, getProducts} = require('../../controller/users/general')
const {createPatient,getPatient,getPatiensOrderAZ, getPatiensOrderZA,getSpecificPatient, getNamePatient, updatePatient} = require("../../controller/admin/controllerPatients")

router.post('/getProducts',getProducts)
router.post('/sendProducts',sendProducts)
router.post('/generateToken', generateToken)

//------------------------Patients -----------------------------------

router.post('/createPatient', createPatient)
router.get('/getPatient', getPatient)
router.get('/getPatientsOrderAZ',getPatiensOrderAZ)
router.get('/getPatientsOrderZA',getPatiensOrderZA)
router.post('/getSpecificPatient', getSpecificPatient)
router.post('/getNamePatient', getNamePatient)
router.put('/updatePatient', updatePatient)

module.exports = router