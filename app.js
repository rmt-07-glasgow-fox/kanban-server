if(process.env.NODE_ENV === 'development'){
  require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000 || process.env.PORT
const errorHandler = require('./middlewares/errorHandler')
const routes = require('./routes')

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(routes)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})