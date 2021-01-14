const express = require('express')
const app = express()
const port = 3000
const router = require('./routes')
const cors = require('cors')
const { errorHandlers } = require('./middlewares/errorHandler')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.use(router)
app.use(errorHandlers)

app.listen(port, () => {
  console.log(`Bismillah jalan di port ${port}`)
})