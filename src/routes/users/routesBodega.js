const router = require('express').Router()
const {getProductBodega} = require('../../controller/users/controllerUserBodega')

router.post('/getProduct',getProductBodega)

module.exports = router