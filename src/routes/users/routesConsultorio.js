const router = require('express').Router()
const {getProductConsultorio, generateToken} = require('../../controller/users/controllerUserConsultorio')

router.post('/getProduct',getProductConsultorio)
router.post('/generateToken',generateToken)

module.exports = router