const router = require('express').Router()
const {generateToken, getProducts} = require('../../controller/users/general')
const {createProductTracings, getProductTracingsWithPrice} =  require("../../controller/admin/controllerProductTracings")
const {returnProducts} =  require("../../controller/users/controllerUserConsultorio")

router.post('/getProducts',getProducts)
router.post('/generateToken', generateToken)
router.post('/createProductTracing', createProductTracings)
router.post('/getProductTracing', getProductTracingsWithPrice)
router.post('/returnProducts', returnProducts)

module.exports = router