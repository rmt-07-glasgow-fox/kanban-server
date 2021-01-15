if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
// body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome KABAN'})
})
// router
app.use('/', router)
// errorhandler
app.use(errorHandler)

app.listen(PORT, () => {
  console.log('This app is running on port:', PORT)
})