if (process.env.NODE_ENV === "development") {
    require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const errorHandler = require('./middlewares/errorHandlers')
const router = require('./routes/index')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/',  router)
app.use(errorHandler)


app.listen(port, ()=> {
    console.log(`listen on port ${3000}`);
})