const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const { encrypt, compare } = require('../helpers/handleBcrypt')
const jwt = require('jsonwebtoken')

const loginUser = async (req, res) => {
    try{
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
                const person = await prisma.persons.findUnique({
                    where:{
                        ID_PERSON: verify[0].ID_PERSON
                    },
                    include:{
                        user_roles:{
                            include:{
                                roles: true
                            }
                        }, 
                        person_dependencies:{
                            include:{
                                dependencies:true
                            }
                        }
                    }
                })
                const object = [
                    {
                        ID_ACCOUNTS : verify[0].ID_ACCOUNTS,
                        EMAIL : verify[0].EMAIL,
                        PASSWORD_ACCOUNT : verify[0].PASSWORD_ACCOUNT,
                        STATE : verify[0].STATE,
                        ID_PERSON : verify[0].ID_PERSON,
                        NAME_ROL: person.user_roles[0].roles.NAME_ROL,
                        DEPENDECIES:[]
                        
                    }
                ]
                let arrayAux =[]
                person.person_dependencies.map((dependencie)=>{
                    arrayAux.push({
                        ID_DEPENDECIE:dependencie.dependencies.ID_DEPENDENCIE,
                        DEPENDECIE_NAME:dependencie.dependencies.DEPENDENCIE_NAME,
                        DEPENDECIE_TYPE:dependencie.dependencies.TYPE_DEPENDENCIE
                    })
                })
                object[0].DEPENDECIES = arrayAux
                console.log(object)
                jwt.sign({object},object[0].NAME_ROL,(error,token)=>{
                    console.log(parseJwt(token))
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
    }catch (error) {
        if(error.code === undefined){
            res.status(400).send({
                message: "Ocurrió un error al ingresar con el usuario registrado"
            })
        }else{
            res.status(400).send({
                message: "Ocurrió un error al ingresar con el usuario registrado"
            });  
        }
        console.log(error)
    }    
}


function parseJwt (token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

const changeRol = async (req, res) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']
    token = token.split(" ")[1]
    const verify = parseJwt(token).object
    const rol = req.body.name_rol
    const person = await prisma.persons.findUnique({
        where:{
            ID_PERSON: verify[0].ID_PERSON
        },
        include:{
            user_roles:{
                include:{
                    roles: true
                }
            }, 
            person_dependencies:{
                include:{
                    dependencies:true
                }
            }
        }
    })
    try {
        if(person.user_roles[0].roles.NAME_ROL === rol || person.user_roles[1].roles.NAME_ROL === rol || person.user_roles[2].roles.NAME_ROL === rol){
            const object = [
                {
                    ID_ACCOUNTS : verify[0].ID_ACCOUNTS,
                    EMAIL : verify[0].EMAIL,
                    PASSWORD_ACCOUNT : verify[0].PASSWORD_ACCOUNT,
                    STATE : verify[0].STATE,
                    ID_PERSON : verify[0].ID_PERSON,
                    NAME_ROL: person.user_roles[0].roles.NAME_ROL,
                    DEPENDECIES:[]
                    
                }
            ]
            let arrayAux =[]
            person.person_dependencies.map((dependencie)=>{
                arrayAux.push({
                    ID_DEPENDECIE:dependencie.dependencies.ID_DEPENDENCIE,
                    DEPENDECIE_NAME:dependencie.dependencies.DEPENDENCIE_NAME,
                    DEPENDECIE_TYPE:dependencie.dependencies.TYPE_DEPENDENCIE
                })
            })
            object[0].DEPENDECIES = arrayAux
            jwt.sign({object},object[0].NAME_ROL,(error,token)=>{
                console.log(parseJwt(token))
                res.json({
                    token: token
                })
            })
        }
    } catch (error) {
        res.status(400).send({
            message: "Ocurrió un error al momento de cambiar el rol"
        })
    }
}

const registerUser = async (req, res) => {
    try{
        const user = req.body.email
        const password = req.body.password_account
    
        if(password.length < 8 ) {
            res.send({message: "La contraseña debe tener mínimo 8 caracteres"}) 
            return
        }else{

            await prisma.accounts.create({
                data: {
                    EMAIL: user,
                    PASSWORD_ACCOUNT: await encrypt(password),
                    STATE: "AC",
                    ID_PERSON: req.body.id_person
                }
            })
            res.send({
                message: "Usuario registrado con éxito."
            })
        }    
    }catch (error) {
        if(error.code === undefined){
            res.status(400).send({
                message: "Ocurrió un error al registrar el usuario"
            })
        }else{
            res.send({
                message: "Ocurrió el error al registrar al usuario"
            });  
        }
        console.log(error)
    }
}

const updateUser = async (req, res) => {
    try {
        const user = req.body.email
        const password = req.body.password_account
        
        if(password.length < 8 ) {
            res.send({message: "La contraseña debe tener minimo 8 caracteres"}) 
            return
        }else{
            await prisma.accounts.update({
                where:{
                    EMAIL: user
                },
                data: {
                    EMAIL: req.body.email_new,
                    PASSWORD_ACCOUNT: await encrypt(password)
                }
            })
            res.send({
                message: "Usuario Actualizado con éxito."
            })
        } 
    } catch (error) {
        res.status(400).send({
            message: "Ocurrió un error al momento actualizar el usuario"
        })
        console.log(error)
    }   
}

module.exports = {
    loginUser,
    registerUser,
    changeRol,
    updateUser
}