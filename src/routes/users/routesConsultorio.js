const router = require('express').Router()
const {generateToken, getProducts} = require('../../controller/users/general')

router.post('/getProducts',getProducts)
router.post('/generateToken', generateToken)

module.exports = router