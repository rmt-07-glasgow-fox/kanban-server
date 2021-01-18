if(process.env.NODE_ENV != 'production'){
    require('dotenv').config()
}

const express = require('express')

const cors = require('cors')
const errorHandle = require('./middleware/errorHandle')
 
const app = express()
const port = process.env.PORT || 4400

const router = require('./routes/index')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use(router)
app.use(errorHandle)

app.listen(port, () => {
    console.log(`Listen in port ${port}`)
})