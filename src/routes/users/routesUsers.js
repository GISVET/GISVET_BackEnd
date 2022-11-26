const router = require('express').Router()

router.use("/Bodega", require('./routesBodega'))
router.use("/Farmacia", require('./routesFarmcia'))

module.exports = router