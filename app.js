if(process.env.NODE_ENV === "development") require('dotenv').config()
const express = require('express')
const app = express()
const router = require('./routes/index')
const errorHandler = require('./middleware/errorhandler')
const cors = require('cors')
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())


app.get('/', (req, res, next) => {
      res.send("hello world");
})
app.use('/', router)
app.use(errorHandler)

app.listen(PORT, () => {
      console.log(`connected to ${PORT}`);
})