const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const router = require('./routers')
const errHandler = require('./middlewear/errhandles')

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(router)
app.use(errHandler)

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})