if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const {OAuth2Client} = require ('google-auth-library')
const express = require ('express')
const router = require ('./routes/indexRouter')
const { errorHandler } = require ('./middlewares/errorHandler')
var cors = require('cors')
const app = express()
const port = process.env.PORT


app.use (cors())

app.use (express.json())

app.use (express.urlencoded ({extended: false}))

app.use ('/', router)

app.use (errorHandler)

app.listen(port, () => {
  console.log(`Kanban app listening at http://localhost:${port}`)
})