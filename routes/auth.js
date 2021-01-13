const router = require('express').Router()
const AuthController = require('../controllers/controllerAuth.js')

router.get('/register', AuthController.getUsers)
router.post('/register', AuthController.createUser)
router.delete('/register/:id', AuthController.deleteUser)

router.post('/login', AuthController.login)
router.post('/loginGoogle', AuthController.loginGoogle)

module.exports = router