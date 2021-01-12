if(process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const express = require('express');
const router = require('./routes/index.js');
const errorHandler = require('./middlewares/errorHandler.js');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.use(errorHandler);


app.listen(port, () => {
  console.log(`This app is running on port: ${port}`);
});


