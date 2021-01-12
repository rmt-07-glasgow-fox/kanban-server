const express = require('express')
const app = express()
const PORT = 3000
const router = require('./routes')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')

app.use(express.urlencoded({extended : true}))
app.use(cors())
app.use(router)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}`)
})