if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
  }
  const express = require('express')
  const router = require ('./routes/index.js')
  const app = express()
  const port = process.env.PORT || 3000
  const errorHandler = require('./middlewares/errorHandler')
  const cors = require('cors')
  
  app.use(cors())
  app.use (express.urlencoded ({extended: true}))
  app.use(express.json())
  app.use ('/', router)
  app.use (errorHandler)
  
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })