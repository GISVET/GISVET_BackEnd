const router = require('express').Router()
const {getProductFarmacia} = require('../../controller/users/controllerUserFarmacia')

router.post('/getProductFarmacia',getProductFarmacia)

module.exports = router