const express = require('express');
const router = express.Router();

const { create } = require('../controllers/organization');

router.post('/', create);

module.exports = router;
