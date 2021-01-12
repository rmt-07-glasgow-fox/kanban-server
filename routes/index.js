const router = require('express').Router()
const taskRouter = require('./taskRouter')

router.get('/', (req, res) => {
    res.send('Hello World!')
})

router.post('/login', (req, res) => {

})

router.post('/register', (req, res) => {

})

router.use('/tasks', taskRouter)


module.exports = router
