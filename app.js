if(process.env.NODE_ENV === "development") require('dotenv').config()
const express = require('express')
const app = express()
const router = require('./routes/index')
const cors = require('cors')
const port = 3000

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
app.get('/', (req, res, next) => {
      console.log("hello world");
})
app.use('/', router)

app.listen(port, () => {
      console.log(`connected to ${port}`);
})