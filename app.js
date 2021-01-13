if(process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}



const express = require('express');
const cors = require('cors');
const router = require('./routes/index.js');
const errorHandler = require('./middlewares/errorHandler.js');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use('/', router);

app.use(errorHandler);


app.listen(port, () => {
  console.log(`This app is running on port: ${port}`);
});


