if (process.env.NODE_ENV != "production") {
    require('dotenv').config()
}
const cors = require('cors')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const rout = require('./routs/index')
const errorHandler = require('./midleware/errHandler')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(rout)
app.use(errorHandler)

app.listen(port,()=>{
    console.log(port);
})