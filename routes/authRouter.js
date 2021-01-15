const express = require('express');
const authRouter = express.Router();
const UserController = require('../controllers/userController');

authRouter.post('/register', UserController.register);
authRouter.post('/login', UserController.login);

module.exports = authRouter;