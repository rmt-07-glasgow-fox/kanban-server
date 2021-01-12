require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3000

// middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routers
const userRouter = require('./routers/userRouter')
const errorHandlers = require('./middlewares/errorHandlers')

app.use('/user', userRouter)
app.use(errorHandlers)

app.listen(PORT, () => { console.log(` >>> SERVER PORT : ${PORT}`) })