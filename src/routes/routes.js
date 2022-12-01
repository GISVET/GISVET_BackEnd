const {Router} = require("express")
const router = Router()
const verificationAdmin = Router()
const verificationUser = Router()
const verificationAudi = Router()
const jwt = require('jsonwebtoken')
const {loginUser, registerUser, changeRol, updateUser} = require("../controller/controllerAuthentication")
const {getAudit} = require("../controller/auditor")

//------------------ Cuentas-----------------------

router.post('/login', loginUser)
router.post('/register', registerUser)
router.post('/changeRol', changeRol)
router.put('/updateUser', updateUser)
router.get('/getAudit', getAudit)

//-------------------Rutas-----------------------

router.use('/Admin',verificationAdmin,require('./admin/routesAdmin'))
router.use('/Auditor',verificationAudi,require('./admin/routesAdmin'))
router.use('/Users',verificationUser,require('./users/routesUsers'))

//-------------------Verificar token --------------------

verificationAdmin.use((req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']

    if(!token){
        res.sendStatus().send({
            error: 'Es necesario un token de autenticacion'
        })
        return
    }
    const aux = token.split(" ")
    if(aux[0] === 'Bearer'){
        token = aux[1]
    }
    if(token){
        jwt.verify(token, 'Administrador', (error, token) => {
            if(error){
                return res.json({
                    message: 'El token no es valido'
                })
            }else{
                req.token = token
                next()
            }
        })
    }
})


verificationUser.use((req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']

    if(!token){
        res.sendStatus().send({
            error: 'Es necesario un token de autenticacion'
        })
        return
    }
    const aux = token.split(" ")
    if(aux[0] === 'Bearer'){
        token = aux[1]
    }
    if(token){
        jwt.verify(token, 'Usuario', (error, token) => {
            if(error){
                return res.json({
                    message: 'El token no es valido'
                })
            }else{
                req.token = token
                next()
            }
        })
    }
})

verificationAudi.use((req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']

    if(!token){
        res.sendStatus().send({
            error: 'Es necesario un token de autenticacion'
        })
        return
    }
    const aux = token.split(" ")
    if(aux[0] === 'Bearer'){
        token = aux[1]
    }
    if(token){
        jwt.verify(token, 'Auditor', (error, token) => {
            if(error){
                return res.json({
                    message: 'El token no es valido'
                })
            }else{
                req.token = token
                next()
            }
        })
    }
})

module.exports = router