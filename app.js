if (process.env.NODE_ENV === "development") {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const port = process.env.PORT || 5001
const cors = require('cors')
const router = require('./routes/')

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(router)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
