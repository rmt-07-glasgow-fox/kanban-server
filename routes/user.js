const express = require('express');
const router = express.Router();

const { login, register, google } = require('../controllers/user');

router.post('/login', login);
router.post('/register', register);
router.post('/google', google);

module.exports = router;
