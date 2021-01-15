if(process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const express = require("express");
const router = require('./routers')
const cors = require('cors')
const errorHandlers = require('./middlewares/errorHandlers')
const app = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router)
app.use(errorHandlers)

app.listen(port, () => {
  console.log(`this app listening at http://localhost:${port}`)
})

// 278741965998-msp7rco7ssptqgr6q4pgqlu5i7lgc8eg.apps.googleusercontent.com
