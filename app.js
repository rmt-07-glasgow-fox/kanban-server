const express = require('express')
const app = express()
const PORT = 3000
const cors = require('cors')
const router = require('./routers/index')

//cors
app.use(cors())

//buat ngebaca body
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//arahin ke main router
app.use(router)

//errorHandlers
app.use(errorHandlers)

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`)
})

function errorHandlers(err, req, res, next) {
  if (err.name === 'JsonWebTokenError') {
    return res.status(400).json({message: 'Invalid token!'})
  }
  if (err.name === 'SequelizeValidationError') {
    let errMessages = []
    err.errors.forEach(element => {
      errMessages.push(element.message)
    });
    return res.status(400).json({message: errMessages})
  }


  // console.log(err);
  res.status(500).json(err)
}