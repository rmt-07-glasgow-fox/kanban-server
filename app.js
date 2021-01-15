if (process.env.NODE_ENV == "development") {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`App running on port: ${PORT}`);
});