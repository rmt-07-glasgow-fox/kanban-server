if (process.env.NODE_ENV === "development") {
    require("dotenv").config()
}

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const cors = require('cors')
const routers = require('./routes/')
const errHandlers = require('./middlewares/errHandlers')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(routers)
app.use(errHandlers)

app.listen(PORT, () => {
    console.log(`Welcome on PORT: ${PORT} Sir`);
})