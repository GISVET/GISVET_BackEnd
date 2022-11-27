const router = require('express').Router()
const {createItem, sendProducts} = require('../../controller/users/controllerUserBodega')
const {getProducts} = require('../../controller/users/general') 

router.put('/createItem',createItem)
router.post('/getProduct',getProducts)
router.post('/sendProducts',sendProducts)

router.use('/Item', require('../admin/routesAdminItem'))

module.exports = router