const express = require('express')
const router = express.Router()
const Controller = require('../controller/userCont')

router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.post('/GLogin', Controller.gLogin)

module.exports = router;