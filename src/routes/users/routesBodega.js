const router = require('express').Router()
const {getProductBodega, createItem,createBrand} = require('../../controller/users/controllerUserBodega')

router.put('/createItem',createItem)
router.post('/getProduct',getProductBodega)
router.post('/createBrand',createBrand)

module.exports = router