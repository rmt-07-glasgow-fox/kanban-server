const router = require('express').Router()
const home = require('../controllers/home')
const UserController = require('../controllers/user')
const { authentication } = require('../middlewares/auth')
const {errHandler} = require('../middlewares/errhandler')
const kanban = require('../routes/kanban')

router.get('/',home)
router.post('/login',UserController.login)
router.post('/register',UserController.register)
router.post('/googleLogin',UserController.googleLogin)

router.use(authentication)
router.use('/kanban',kanban)
router.use(errHandler)

module.exports = router