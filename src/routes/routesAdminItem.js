const router = require('express').Router()
const {getBrand, createBrand, updateBrand} = require('../controller/admin/item/controllerBrands')

//---------------------- Brands -----------------------------------

router.get('/getBrand',getBrand)
router.post('/createBrand',createBrand)
router.put('/updateBrand',updateBrand)

module.exports = router