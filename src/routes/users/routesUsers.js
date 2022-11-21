const router = require('express').Router()

router.use("/Bodega", require('./routesBodega'))
router.use("/Farmacia", require('./routesFarmcia'))
router.use("/Consultorio", require('./routesConsultorio'))


module.exports = router