if (process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const port = 3000;

const indexRouter = require('./routes')
const errorHandlder = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(indexRouter);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`listen to http://localhost:${port}`);
})