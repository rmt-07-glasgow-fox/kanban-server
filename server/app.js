require('dotenv').config()

// require
const express = require('express')
const app = express()
const port = 7000
const userRoute = require('./routes/user-route')
const taskRoute = require('./routes/task-route')
const { errorHandle } = require('./middlewares/error-handling')
const cors = require('cors')

// setting
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// routing
app.use(userRoute)
app.use(taskRoute)
app.use(errorHandle)

// listening
app.listen(port, () => {
    console.log('masuk di port', port)
})