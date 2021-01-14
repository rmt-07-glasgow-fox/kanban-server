const express = require('express')
const app = express()
const PORT = 3000
const cors = require('cors')
const router = require('./routers/index')

//cors
app.use(cors())

//buat ngebaca body
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
    return res.status(500).json({message: 'Invalid token!'})
  }
  res.status(500).json(err)
}