const router = require('express').Router()
const taskRouter = require('../routes/tasks')
const categoryRouter = require('../routes/category')
const Controller = require('../controllers/userController.js')
const { authentication } = require('../middlewares/auth')


router.get('/', Controller.home)
router.post('/login', Controller.login)
router.post('/loginGoogle', Controller.loginGoogle)
router.post('/register', Controller.register)

router.use(authentication)
router.use('/tasks', taskRouter)
router.use('/categories', categoryRouter)

module.exports = router