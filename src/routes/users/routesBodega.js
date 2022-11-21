const router = require('express').Router()
const {getProductBodega, createItem} = require('../../controller/users/controllerUserBodega')

router.post('/createItem',createItem)
router.post('/getProduct',getProductBodega)

module.exports = router