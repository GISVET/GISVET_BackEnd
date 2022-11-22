const router = require('express').Router()
const {getProductBodega, createItem,createBrand,assingItem} = require('../../controller/users/controllerUserBodega')

router.put('/createItem',createItem)
router.post('/getProduct',getProductBodega)
router.post('/createBrand',createBrand)
router.post('/assingItem',assingItem)

module.exports = router