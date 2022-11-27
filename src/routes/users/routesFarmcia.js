const router = require('express').Router()
const {sendProducts} = require('../../controller/users/controllerUserFarmacia')
const {generateToken, getProducts} = require('../../controller/users/general')

router.post('/getProducts',getProducts)
router.post('/sendProducts',sendProducts)
router.post('/generateToken', generateToken)

module.exports = router