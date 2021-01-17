const UserController = require('../controllers/userController')
const router = require('express').Router();

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.post('/loginGoogle', UserController.loginGoogle)

module.exports = router