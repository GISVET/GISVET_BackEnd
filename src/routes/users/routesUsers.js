const router = require('express').Router()
const {getDependeciePersons} =  require('../../controller/admin/persons/controllerPerson')
const {getPatient} = require("../../controller/admin/controllerPatients")
const {getProductTraicing} =  require("../../controller/admin/controllerProductTracings")

router.use("/Bodega", require('./routesBodega'))
router.use("/Farmacia", require('./routesFarmcia'))
router.use("/Consultorio", require('./routesConsultorio'))

router.post('/getDependeciePersons', getDependeciePersons)
router.get('/getPatient', getPatient)
router.post('/getProductTraicing', getProductTraicing)

module.exports = router