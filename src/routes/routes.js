const {Router} = require("express")
const router = Router()
const verificationAdmin = Router()
const verificationUser = Router()
const verificationAudi = Router()
const jwt = require('jsonwebtoken')
const {loginUser, registerUser, changeRol, updateUser} = require("../controller/controllerAuthentication")
const {getAudit} = require("../controller/auditor")

//------------------ Cuentas-----------------------

/**
 * @swagger
 * components:
 *  schemas:
 *      Login:
 *          type: object
 *          description: El endpoint /login permite al usuario iniciar sesión creando un token 
 *          properties:
 *              email:
 *                  type: string
 *                  description: El correo del usuario 
 *              password_account:
 *                  type: string
 *                  description: La contraseña del usuario
 *          require:
 *               - email
 *               - password_account
 *          example:
 *              email: correo@edu.co
 *              password_account: contraseña123
 *      SignUp:
 *          type: object
 *          description: El endpoint /register permite al usuario registrar las credenciales de un usuario ya creadó
 *          properties:
 *              email:
 *                  type: string
 *                  description: El correo del usuario 
 *              password_account:
 *                  type: string
 *                  description: La contraseña del usuario
 *              id_person:
 *                  type: integer
 *                  description: El id de la persona a registrar
 *          require:
 *               - email
 *               - password_account
 *               - id_person
 *          example:
 *              email: correo@edu.co
 *              password_account: contraseña123
 *              id_person: 1
 *      changeRol:
 *          type: object
 *          description: El endpoint /changeRol en caso de tener varios roles permite cambiar el rol que se encuentra actualmente, esto se hace con ayuda del token ya asignado al momento de iniciar sesión
 *          properties:
 *              name_rol:
 *                  type: string
 *                  description: Nombre del rol al que se quiere cambiar  
 *          require:
 *               - name_rol
 *          example:
 *              name_rol: Administrador
 *      Update credenciales:
 *          type: object
 *          description: El endpoint /updateUser permite actulizar las credenciales del usuario
 *          properties:
 *              email:
 *                  type: string
 *                  description: El correo del usuario 
 *              password_account:
 *                  type: string
 *                  description: La nueva contraseña del usuario
 *              email_new:
 *                  type: string
 *                  description: El nuevo correo del usuario
 *          require:
 *               - email
 *               - password_account
 *               - email_new
 *          example:
 *              email: correo@edu.co
 *              password_account: nueva_contraseña123
 *              email_new: nuevo_correo@edu.co
 *      GetAudit:
 *          type: object
 *          description: El endpoint /getAudit permite obtener los registros de la tabla de auditoria
 */


router.post('/login', loginUser)
router.post('/register', registerUser)
router.post('/changeRol', changeRol)
router.put('/updateUser', updateUser)
router.get('/getAudit', getAudit)

//-------------------Rutas-----------------------

router.use('/Admin',require('./admin/routesAdmin'))
router.use('/Auditor',require('./admin/routesAdmin'))
router.use('/Users',require('./users/routesUsers'))

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