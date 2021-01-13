if (process.env.NODE_ENV === 'development') require('dotenv').config();
const cors = require('cors');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

const router = require('./routers/index.js');
// Error Handler

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router); 
// Error Handler

app.listen(PORT, () => console.log(`Kanboard Server is running on port: ${PORT}`));