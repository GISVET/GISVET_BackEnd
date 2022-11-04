const router = require('express').Router()

const {getBrand, createBrand, updateBrand} = require('../../controller/admin/item/controllerBrands')
const {getFeatureProducts, updateFeatureProduct, createFeatureProducts} = require('../../controller/admin/item/controllerFeatureProduct')
const {getProduct, getItemProductDepartment,getSpecificProduct,createProducts, updateProduct, getItemProduct} = require('../../controller/admin/item/controllerProduct')
const {createItem, assingItem} = require("../../controller/admin/item/controllerItem")

//---------------------- Brands -----------------------------------

router.get('/getBrand',getBrand)
router.post('/createBrand',createBrand)
router.put('/updateBrand',updateBrand)

// ------------------------ FeatureProducts --------------------------------

router.post('/getFeatureProduct',getFeatureProducts)
router.post('/createFeatureProducts',createFeatureProducts)
router.put('/updateFeatureProduct',updateFeatureProduct)

// --------------------------- Product ----------------------

router.post('/createProducts',createProducts)
router.post('/getProduct',getProduct)
router.get('/getItemProductDepartment',getItemProductDepartment)
router.post('/getSpecificProduct',getSpecificProduct)
router.put('/updateProduct',updateProduct)
router.get('/getItemProduct', getItemProduct)

//-------------------------------- Item -------------------------------

router.post('/createItem',createItem)
router.post('/assingItem',assingItem)

module.exports = router