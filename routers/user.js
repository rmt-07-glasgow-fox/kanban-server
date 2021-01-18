const router = require('express').Router();
const UserController = require('../controllers/userController.js');

router.post('/register', UserController.register);

router.post('/login', UserController.login);

router.post('/glogin', UserController.gLogin);

router.get('/getuser', UserController.getUser);

module.exports = router;