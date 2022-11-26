const router = require('express').Router()
const {getProductFarmacia, sendProducts} = require('../../controller/users/controllerUserFarmacia')

router.post('/getProductFarmacia',getProductFarmacia)
router.post('/sendProducts',sendProducts)

module.exports = router