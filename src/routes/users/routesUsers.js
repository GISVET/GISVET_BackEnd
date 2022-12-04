const router = require('express').Router()
const {getDependeciePersons} =  require('../../controller/admin/persons/controllerPerson')

router.use("/Bodega", require('./routesBodega'))
router.use("/Farmacia", require('./routesFarmcia'))
router.use("/Consultorio", require('./routesConsultorio'))

router.post('/getDependeciePersons', getDependeciePersons)

module.exports = router