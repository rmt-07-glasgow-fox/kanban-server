const userControl = require('../controller/userController')

const user = require('express').Router()

user.post('/register', userControl.register)
user.post('/login', userControl.login)
user.post('/googleLogin', userControl.googleLogin)


module.exports = user