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
const taskRouter = require('./routers/taskRouter')
const categoryRouter = require('./routers/categoryRouter')
const errorHandlers = require('./middlewares/errorHandlers')
const { authenticate } = require('./middlewares/auth')

app.use('/user', userRouter)
app.use('/task', authenticate, taskRouter)
app.use('/category', authenticate, categoryRouter)
app.use(errorHandlers)

app.listen(PORT, () => { console.log(` >>> SERVER PORT : ${PORT}`) })