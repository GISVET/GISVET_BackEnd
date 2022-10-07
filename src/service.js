const express = require('express')
const gisvet = require('./routes/routes')
const app = express()
const port = 3000

app.use(express.json())
app.use(gisvet)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})