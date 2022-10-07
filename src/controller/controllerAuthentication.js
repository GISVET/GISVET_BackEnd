const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const { encrypt, compare } = require('../helpers/handleBcrypt')
const jwt = require('jsonwebtoken')

const loginUser = async (req, res) => {
    const user =  req.body.email
    const password = req.body.password
    const verify = await prisma.accesos.findMany({
        where:{
            email: user 
        }
    })
    if(verify.length === 0){
        res.json({
            message : "email o contraseña incorrecta"
        })
    }else{
        const validate = await compare(password, verify[0].password)
        if(validate){
            jwt.sign({verify},"secretkey",{expiresIn: '120s'},(error,token)=>{
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
    const password = req.body.password
    
    if(password.length < 8 ) {
        res.send({message: "La contraseña debe tener minimo 8 caracteres"}) 
        return
    }else{
        try {
            await prisma.accesos.create({
                data: {
                    email: user,
                    password: await encrypt(password),
                    state: "A"
                  },
            })
            res.send({
                message: "Usuario registrado con exito."
            })
        } catch (error) {
            res.send({
                message: error
            })
        }
    }
}

module.exports = {
    loginUser,
    registerUser
}