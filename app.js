if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const { authenticate } = require('./middleware/auth')
const task = require('./routers/tasks')
const user = require('./routers/user')

app.get('/', (req, res) => {
    res.send('hello')
})

app.use(express.urlencoded({ extended:true }))

app.use(user)
app.use(authenticate)
app.use(task)

app.listen(port, () => {
    console.log(`connected on http://localhost:${port}`);
})

//R6oQGEbVQwcaGT0SuBQeGMh8