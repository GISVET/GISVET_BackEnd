const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const { encrypt, compare } = require('../helpers/handleBcrypt')
const jwt = require('jsonwebtoken')

const loginUser = async (req, res) => {
    const user =  req.body.email
    const password = req.body.password_account
    const verify = await prisma.accounts.findMany({
        where:{
            EMAIL: user 
        }
    })
    if(verify.length === 0){
        res.json({
            message : "email o contraseña incorrecta"
        })
    }else{
        const validate = await compare(password, verify[0].PASSWORD_ACCOUNT)
        if(validate){
            jwt.sign({verify},"secretkey",(error,token)=>{
                res.json({
                    token: token
                })
            })
        }else{
            res.json({
                message : "email o contraseña incorrecta"
            })
        }
    }
}

const registerUser = async (req, res) => {
    const user = req.body.email
    const password = req.body.password_account
    
    if(password.length < 8 ) {
        res.send({message: "La contraseña debe tener minimo 8 caracteres"}) 
        return
    }else{
        
        await prisma.accounts.create({
            data: {
                EMAIL: user,
                PASSWORD_ACCOUNT: await encrypt(password),
                STATE: "A",
                ID_PERSON: req.body.id_person
            }
        })
        res.send({
            message: "Usuario registrado con exito."
        })
    }    
}

module.exports = {
    loginUser,
    registerUser
}