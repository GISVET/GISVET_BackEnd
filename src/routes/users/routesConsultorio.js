const router = require('express').Router()
const {generateToken, getProducts} = require('../../controller/users/general')
const {createProductTracings} =  require("../../controller/admin/controllerProductTracings")

router.post('/getProducts',getProducts)
router.post('/generateToken', generateToken)
router.post('/createProductTracing', createProductTracings)

module.exports = router