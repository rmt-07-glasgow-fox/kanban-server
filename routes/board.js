const express = require('express');
const router = express.Router();

const { create } = require('../controllers/board');

router.post('/', create);

module.exports = router;
