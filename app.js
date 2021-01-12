if(process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const express = require("express");
const router = require('./routers')
const errorHandlers = require('./middlewares/errorHandlers')
const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router)
app.use(errorHandlers)

app.listen(port, () => {
  console.log(`this app listening at http://localhost:${port}`)
})
