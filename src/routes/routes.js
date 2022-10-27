const {Router} = require("express")
const router = Router()
const verification = Router()
const jwt = require('jsonwebtoken')
const {loginUser, registerUser} = require("../controller/controllerAuthentication")

//------------------ Cuentas-----------------------

router.post('/login', loginUser)
router.post('/register', registerUser)

//-------------------Rutas-----------------------

router.use('/Admin', require('./routesAdmin'))

//-------------------Verificar token --------------------

verification.use((req, res, next) => {
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
        jwt.verify(token, 'secretkey', (error, token) => {
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