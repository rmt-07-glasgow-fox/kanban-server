if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const router = require('./routes')
const { errorHandler } = require('./middlewares/errorHandler')

app.use(express.urlencoded({ extended: true }))
app.use('/', router)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`You're connected on port: ${port} (👍≖‿‿≖)👍 👍(≖‿‿≖👍)`)
})