const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const { encrypt, compare } = require('../../../helpers/handleBcrypt')

const createPersons = async (req, res) =>{
    try {
        await prisma.persons.create({
            data:{
                FULL_NAME: req.body.full_name.charAt(0).toUpperCase() + req.body.full_name.slice(1),
                DOCUMENT_TYPE: req.body.document_type,
                DOCUMENT: req.body.document,
                STATE: "AC",
                GENDER: req.body.gender,
                PROFESSIONAL_ID: req.body.professional_id             
            }
        })
        res.send({
            message: "Persona creada con éxito"
        });
    } catch (error) {
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
                message: "Usuario registrado con exito."
            })
        } 
    } catch (error) {
        console.log(error)
    }
}

const getPersons = async (req, res) =>{
    const data = await prisma.persons.findMany({
        where : {
            STATE: "AC",
            FULL_NAME:{
                contains: req.body.name_person
            }
        },
        orderBy: {
            FULL_NAME: req.body.order_name
        }, 
        include:{
            user_roles: true,
            accounts: true,
            person_dependencies:{
                include:{
                    dependencies: true
                }
            }
        }
    })
    res.json(data) 
}

const getIdPersons = async (req, res) =>{
    const data = await prisma.persons.findUnique({
        where:{
            ID_PERSON: req.body.id_person
        }
    })
    res.json(data)
}

const updatePersons = async (req, res) =>{
    await prisma.persons.update({
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
    res.send({
        message: "Persona actualizada con éxito."
    });
}

const deletePersons = async (req, res) =>{
    await prisma.persons.update({
        where: {
            ID_PERSON: req.body.id_person
        },
        data:{
            STATE: "DC",
        }
    })
    res.send({
        message: "Persona borrada con éxito."
    });
}

module.exports = {
    createPersons,
    createPersonAll,
    getPersons,
    getIdPersons,
    updatePersons,
    deletePersons
}
