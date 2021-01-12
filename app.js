const express = require('express')
const app = express()
const PORT = 3000
const routes = require('./routes')
const errorHeandler = require('./middleware/errorHandler')

app.use(express.urlencoded({extended: false}))

app.use('/', routes)
app.use(errorHeandler)

app.listen(PORT, () => {
  console.log('Running and listening on port: ', PORT)
})