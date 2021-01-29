const express = require('express')
const router = require('./routes/index')
const cors = require('cors')
const { errorHandlers } = require('./middlewares/error_handlers')


const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', router)
app.use(errorHandlers)
app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})