const express = require('express')
const gisvet = require('./routes/routes')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3001

app.use(express.json())
app.use(cors())
app.use(gisvet)


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})