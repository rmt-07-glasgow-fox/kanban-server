if (process.env.NODE_ENV === "development") {
    require("dotenv").config()
}

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.listen(PORT, () => {
    console.log(`Welcome on PORT: ${PORT} Sir`);
})