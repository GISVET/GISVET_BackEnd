const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const { encrypt, compare } = require('../../../helpers/handleBcrypt')
const {createAudit} = require("../../auditor")

const createPersons = async (req, res) =>{
    try {
        const person = await prisma.persons.create({
            data:{
                FULL_NAME: req.body.full_name.charAt(0).toUpperCase() + req.body.full_name.slice(1),
                DOCUMENT_TYPE: req.body.document_type,
                DOCUMENT: req.body.document,
                STATE: "AC",
                GENDER: req.body.gender,
                PROFESSIONAL_ID: req.body.professional_id             
            }
        })
        createAudit(req, res, "Creó el usuario con el id "+person.ID_PERSON)
        res.send({
            message: "Persona creada con éxito"
        });
    } catch (error) {
        if(error.code === undefined){
            res.status(400).send({
                message: "Ocurrió un error al crear a la persona ingresada"
            })
        }else{
            res.status(400).send({
                message: "Ocurrió un error al crear a la persona ingresada"
            }) 
        }
        console.log(error)
    }
}

const createPersonAll = async (req, res) =>{
    try {
        const user = req.body.email
        const password = req.body.password_account

        if(password.length < 8 ) {
            res.status(400).send({message: "La contraseña debe tener minimo 8 caracteres"}) 
            return
        }else{
            const data = await prisma.persons.create({
                data:{
                    FULL_NAME: req.body.full_name,
                    DOCUMENT_TYPE: req.body.document_type,
                    DOCUMENT: req.body.document,
                    STATE: "AC",
                    GENDER: req.body.gender,
                    PROFESSIONAL_ID: req.body.professional_id           
                }
            })

            await prisma.accounts.create({
                data: {
                    EMAIL: user,
                    PASSWORD_ACCOUNT: await encrypt(password),
                    STATE: "AC",
                    ID_PERSON: data.ID_PERSON
                }
            })

            const rol = await prisma.roles.findMany({
                where : {
                    NAME_ROL:{
                        contains: req.body.name_rol
                    }
                }
            })

            await prisma.user_roles.create({
                data:{
                    ID_ROL : rol[0].ID_ROL,
                    ID_PERSON : data.ID_PERSON,
                    STATE : "AC"
                }
            })
            res.send({
                message: "Usuario registrado con éxito."
            })
            createAudit(req, res, "Creó un usuario con cuenta y rol, con el id "+data.ID_PERSON)
        } 
    } catch (error) {
        if(error.code === undefined){
            res.status(400).send({
                message: "Ocurrió un error al crear a la persona ingresada"
            })
        }else{
            res.status(400).send({
                message: "Ocurrió un error al crear a la persona ingresada"
            }) 
        }
        console.log(error)
    }
}

const getPersons = async (req, res) =>{
    try {
        const value = req.body.value
        const data = await prisma.persons.findMany({
            where : {
                STATE: "AC",
                FULL_NAME:{
                    contains: parseInt(value).toString() === "NaN"? value: undefined
                },
                DOCUMENT:{
                    contains: parseInt(value).toString() !== "NaN"? value: undefined
                }
            },
            orderBy: {
                FULL_NAME: req.body.order_name
            }, 
            include:{
                user_roles: {
                    include:{
                        roles: true
                    }
                },
                accounts: true,
                person_dependencies:{
                    include:{
                        dependencies: true
                    }
                }
            }
        })
        res.json(data)
    } catch (error) {
        res.status(400).send({
            message: "Ocurrió un error al momento obtener los usuarios"
        })
        console.log(error)
    } 
}

const getIdPersons = async (req, res) =>{
    try{
        const data = await prisma.persons.findMany({
            where:{
                ID_PERSON: req.body.id_person,
                DOCUMENT: req.body.document
            },
            include:{
                user_roles: {
                    include:{
                        roles: true
                    }
                },
                accounts: true,
                person_dependencies:{
                    include:{
                        dependencies: true
                    }
                }
            }
        })
        if(data[0] === undefined){
            res.status(400).send({
                message: "El usuario no existe"
            })
        }else{
            res.json(data[0])
        } 
    }catch (error) {
        if(error.code === undefined){
            res.status(400).send({
                message: "Ocurrió un error al obtener la persona solicitada"
            })
        }else{
            res.status(400).send({
                message: "Ocurrió un error al obtener la persona solicitada"
            }) 
        }
        console.log(error)
    }
}

const updatePersons = async (req, res) =>{
    try{
        const person = await prisma.persons.update({
            where: {
                ID_PERSON: req.body.id_person
            },
            data: {
                FULL_NAME: req.body.full_name.charAt(0).toUpperCase() + req.body.full_name.slice(1),
                DOCUMENT_TYPE: req.body.document_type,
                DOCUMENT: req.body.document,
                GENDER: req.body.gender,
                PROFESSIONAL_ID: req.body.professional_id
            }
        })
        createAudit(req, res, "Se actualizo la persona con el id "+person.ID_PERSON)
        res.send({
            message: "Persona actualizada con éxito."
        });
    }catch (error) {
        if(error.code === undefined){
            res.status(400).send({
                message: "Ocurrió un error al actualizar al usuario"
            })
        }else{
            res.status(400).send({
                message:  "Ocurrió un error al actualizar al usuario"
            }) 
        }
        console.log(error)
    }
}

const getDependeciePersons = async (req, res) =>{
    try {
        const person = await prisma.persons.findUnique({
            where:{
                DOCUMENT: req.body.document
            },
            include:{
                person_dependencies:{
                    include:{
                        dependencies: true
                    }
                }
            }
        })
        res.json(jsonDependeciePerson(person))
    } catch (error) {
        console.log(error)
        res.status(400).send({
            message:  "Ocurrió un error al buscar el usuario"
        })
    }
}

function jsonDependeciePerson(data){
    let dependecia = []
    for (let i = 0; i < data.person_dependencies.length; i++) {
        dependecia[i] = data.person_dependencies[i].dependencies.DEPENDENCIE_NAME
    }
    return dependecia
}

const deletePersons = async (req, res) =>{
    try{
        const person = await prisma.persons.update({
            where: {
                ID_PERSON: req.body.id_person
            },
            data:{
                STATE: "DC",
            }
        })
        createAudit(req, res, "Se elimino la persona con el id "+person.ID_PERSON)
        res.send({
            message: "Persona borrada con éxito."
        });
    }catch (error) {
        if(error.code === undefined){
            res.status(400).send({
                message: "Ocurrió un error al eliminar el usuario"
            })
        }else{
            res.status(400).send({
                message:  "Ocurrió un error al eliminar el usuario"
            }) 
        }
        console.log(error)
    }
}

module.exports = {
    createPersons,
    createPersonAll,
    getPersons,
    getIdPersons,
    updatePersons,
    deletePersons,
    getDependeciePersons
}
