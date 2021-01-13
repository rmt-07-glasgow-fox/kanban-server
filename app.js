const express = require('express')
const app = express()
const port = 4000
const cors = require('cors')
const router = require('./routes')

app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('ok')
})

app.use(router)

app.listen(port, () => {
    console.log('Apps berjalan di port', port)
})