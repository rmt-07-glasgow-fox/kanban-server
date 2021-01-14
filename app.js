if (process.env === "development") require('dotenv').config();
const express = require('express');
const error = require('./middlewares/error');
const router = require('./routes')
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(router);
app.use(error);
app.listen(PORT, () => {
    console.log('Listening on localhost:' + PORT);
})