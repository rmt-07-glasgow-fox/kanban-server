const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 3000
const routes = require('./routes')
const errorHeandler = require('./middleware/errorHandler')

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(cors())

app.use('/', routes)
app.use(errorHeandler)

app.listen(PORT, () => {
  console.log('Running and listening on port: ', PORT)
})