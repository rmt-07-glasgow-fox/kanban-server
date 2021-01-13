if(process.env.NODE_ENV === 'development') {
    require("dotenv").config()
}

const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const cors = require("cors")
const router = require('./routes')

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send("alohaaayooo!!!")
})
app.use(router)
app.use((err, req, res, next) => {
    res.status(err.code).json({ msg: err.message, from: err.from })
})

app.listen(port, () => {
    console.log(`Listen on port ${port}`)
})