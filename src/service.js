const express = require('express')
const gisvet = require('./routes/routes')
const path =  require("path")
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3001

//swagger
const swaggerUI = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")
const SwaggerSpec = {
  definition:{
    openapi: "3.0.0",
    info:{
      title: "GISVET Manual del programador",
      version: "1.0.0"
    },
    servers:[
      {
        url: "http://localhost:3001"
      }
    ]
  },
  apis:[`${path.join(__dirname,"./routes/routes")}`]
}

app.use(express.json())
app.use(cors())
app.use(gisvet)
app.use('/Service_doc', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(SwaggerSpec)))


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})