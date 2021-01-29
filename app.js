if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000
const { authenticate } = require('./middleware/auth')
const category = require('./routers/category')
const task = require('./routers/tasks')
const user = require('./routers/user')

app.get('/', (req, res) => {
    res.send('hello')
})

app.use(express.urlencoded({ extended:true }))
app.use(express.json())
app.use(cors())

app.use(user)
app.use(authenticate)
app.use(task)
app.use(category)

app.listen(port, () => {
    console.log(`connected on http://localhost:${port}`);
})