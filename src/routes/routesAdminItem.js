const router = require('express').Router()
const {getBrand, createBrand, updateBrand} = require('../controller/admin/item/controllerBrands')
const {getFeatureProduct, updateFeatureProduct, createFeatureProducts} = require('../controller/admin/item/controllerFeatureProduct')
const {getProduct, createProducts, updateProduct} = require('../controller/admin/item/controllerProduct')

//---------------------- Brands -----------------------------------

router.get('/getBrand',getBrand)
router.post('/createBrand',createBrand)
router.put('/updateBrand',updateBrand)

// ------------------------ FeatureProducts --------------------------------

router.get('/getFeatureProduct',getFeatureProduct)
router.post('/createFeatureProducts',createFeatureProducts)
router.put('/updateFeatureProduct',updateFeatureProduct)

// --------------------------- Product ----------------------

router.get('/getProduct',getProduct)
router.post('/createProducts',createProducts)
router.put('/updateProduct',updateProduct)

module.exports = router