if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const errorHandlers = require('./middlewares/errorHandlers')
const routes = require('./routes/index')

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(routes)

app.use(errorHandlers)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})