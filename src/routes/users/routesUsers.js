const router = require('express').Router()

//-------------------------Bodega---------------------------------

router.use('/Bodega', require('./routesBodega'))

//-------------------------Bodega---------------------------------

router.use('/Farmacia', require(''))

//-------------------------Bodega---------------------------------

router.use('/Consultorio', require(''))


module.exports = router