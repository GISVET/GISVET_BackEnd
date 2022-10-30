const router = require('express').Router()
const {getBrand, createBrand, updateBrand} = require('../controller/admin/item/controllerBrands')
const {getFeatureProduct, updateFeatureProduct, createFeatureProducts} = require('../controller/admin/item/controllerFeatureProduct')
const {getProduct,getNameProducts, getProductOrderAZ, getProductOrderZA, createProducts, updateProduct} = require('../controller/admin/item/controllerProduct')

//---------------------- Brands -----------------------------------

router.get('/getBrand',getBrand)
router.post('/createBrand',createBrand)
router.put('/updateBrand',updateBrand)

// ------------------------ FeatureProducts --------------------------------

router.get('/getFeatureProduct',getFeatureProduct)
router.post('/createFeatureProducts',createFeatureProducts)
router.put('/updateFeatureProduct',updateFeatureProduct)

// --------------------------- Product ----------------------

router.post('/createProducts',createProducts)
router.get('/getProduct',getProduct)
router.get('/getNameProduct',getNameProducts)
router.get('/getProductOrderAZ',getProductOrderAZ)
router.get('/getProductOrderZA',getProductOrderZA)
router.put('/updateProduct',updateProduct)

module.exports = router