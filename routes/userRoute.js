const express = require('express')
const router = express.Router()

const { UserControler } = require('../controllers/userController')

router.get('/',UserControler.welcome)
router.post('/users/login',UserControler.login)
router.post('/users/register',UserControler.register)
router.post('/users/loginGoogle',UserControler.loginGoogle)

module.exports = router